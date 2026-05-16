const https = require('https');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const chunks = [];
  req.on('data', chunk => chunks.push(chunk));
  req.on('end', async () => {
    const audioBuffer = Buffer.concat(chunks);

    const options = {
      hostname: 'api.deepgram.com',
      path: '/v1/listen?model=nova-2&language=multi&smart_format=true&detect_language=true',
      method: 'POST',
      headers: {
        'Authorization': `Token ${process.env.DEEPGRAM_API_KEY}`,
        'Content-Type': req.headers['content-type'] || 'audio/webm',
        'Content-Length': audioBuffer.length,
      },
    };

    const apiReq = https.request(options, (apiRes) => {
      let data = '';
      apiRes.on('data', chunk => { data += chunk; });
      apiRes.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          const transcript = parsed?.results?.channels?.[0]?.alternatives?.[0]?.transcript || '';
          const detectedLanguage = parsed?.results?.channels?.[0]?.detected_language || 'en';
          res.status(200).json({ transcript, detectedLanguage });
        } catch {
          res.status(500).json({ error: 'Failed to parse Deepgram response' });
        }
      });
    });

    apiReq.on('error', err => {
      res.status(500).json({ error: err.message });
    });

    apiReq.write(audioBuffer);
    apiReq.end();
  });
};
