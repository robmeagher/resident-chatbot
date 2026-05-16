const https = require('https');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'No text provided' });
  }

  // Strip URLs and markdown formatting before speaking
  const cleanText = text
    .replace(/https?:\/\/[^\s]+/g, '')
    .replace(/\*\*/g, '')
    .replace(/\*/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .replace(/\. /g, '.  ')
    .replace(/\? /g, '?  ')
    .replace(/\! /g, '!  ')
    .trim();


  const voiceId = process.env.ELEVENLABS_VOICE_ID;
  const payload = JSON.stringify({
    text: cleanText,
    model_id: 'eleven_multilingual_v2',
voice_settings: {
  stability: 0.35,
  similarity_boost: 0.85,
  style: 0.45,
  use_speaker_boost: true,
},
  });

  const options = {
    hostname: 'api.elevenlabs.io',
    path: `/v1/text-to-speech/${voiceId}`,
    method: 'POST',
    headers: {
      'xi-api-key': process.env.ELEVENLABS_API_KEY,
      'Content-Type': 'application/json',
      'Accept': 'audio/mpeg',
      'Content-Length': Buffer.byteLength(payload),
    },
  };

  const audioChunks = [];

  const apiReq = https.request(options, (apiRes) => {
    if (apiRes.statusCode !== 200) {
      let errData = '';
      apiRes.on('data', chunk => { errData += chunk; });
      apiRes.on('end', () => {
        res.status(500).json({ error: `ElevenLabs error: ${errData}` });
      });
      return;
    }

    res.setHeader('Content-Type', 'audio/mpeg');
    apiRes.on('data', chunk => {
      audioChunks.push(chunk);
    });
    apiRes.on('end', () => {
      const audioBuffer = Buffer.concat(audioChunks);
      res.send(audioBuffer);
    });
  });

  apiReq.on('error', err => {
    res.status(500).json({ error: err.message });
  });

  apiReq.write(payload);
  apiReq.end();
};
