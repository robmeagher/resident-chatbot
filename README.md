# Resident Chatbot – Setup Guide

## What's in this folder

```
resident-chatbot/
├── api/
│   └── chat.js         ← Secure backend (hides your API key)
├── public/
│   └── index.html      ← The chatbot frontend residents see
├── vercel.json         ← Tells Vercel how to run the app
├── package.json        ← Project info
└── README.md           ← This file
```

---

## Step 1 — Create a GitHub account (if you don't have one)
1. Go to https://github.com
2. Click "Sign up" and create a free account

---

## Step 2 — Upload this project to GitHub
1. Once logged in, click the **+** button (top right) → **New repository**
2. Name it: `resident-chatbot`
3. Leave it set to **Private** and click **Create repository**
4. Click **uploading an existing file** (you'll see this link on the next page)
5. Drag and drop ALL the files from this folder into the browser window
   - Make sure to upload the files inside `api/` and `public/` folders too
6. Click **Commit changes**

---

## Step 3 — Create a Vercel account
1. Go to https://vercel.com
2. Click **Sign up** → choose **Continue with GitHub**
3. This links your GitHub and Vercel accounts automatically

---

## Step 4 — Deploy the project
1. From your Vercel dashboard, click **Add New Project**
2. Find `resident-chatbot` in your GitHub repos and click **Import**
3. Leave all settings as-is and click **Deploy**
4. Vercel will build and deploy in about 60 seconds

---

## Step 5 — Add your API key (IMPORTANT — do this before sharing the link)
1. In your Vercel project, click **Settings** (top menu)
2. Click **Environment Variables** (left sidebar)
3. Fill in:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** paste your API key here (starts with `sk-ant-...`)
4. Click **Save**
5. Go back to **Deployments** and click **Redeploy** on the latest deployment

---

## Step 6 — Share your link
1. Click **Domains** in your Vercel project settings
2. Your public URL will look like: `resident-chatbot-abc123.vercel.app`
3. Share this link with your testers — no login required!

---

## Troubleshooting
- **Chatbot doesn't respond:** Double-check your API key was saved correctly in Step 5
- **Page doesn't load:** Make sure all files were uploaded including the `api/` and `public/` folders
- **Want a custom URL:** Vercel lets you add a custom domain in Settings → Domains

---

## Questions?
Ask Claude to walk you through any step — just describe where you're stuck.
