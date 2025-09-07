# AI Image Caption Generator - Setup Guide

## Step 1: Get Your Hugging Face API Key
1. Go to https://huggingface.co/
2. Sign up for a free account
3. Click your profile picture  Settings
4. Click 'Access Tokens' in the sidebar
5. Click 'New token'
6. Give it a name like 'AI Caption Generator'
7. Select 'Read' permission
8. Click 'Generate a token'
9. Copy the token (starts with hf_)

## Step 2: Update Your API Key
1. Open the .env.local file in your project
2. Replace 'your_huggingface_api_key_here' with your actual API key
3. Save the file

## Step 3: Restart the Development Server
1. Stop the current server (Ctrl+C)
2. Run: npm run dev
3. Open http://localhost:5173

## Step 4: Test with Images
- Upload any image to test real AI caption generation
- The app will now use the Hugging Face API for real captions!

## Troubleshooting
- Make sure your API key starts with 'hf_'
- Ensure the .env.local file is in the project root
- Restart the server after updating the API key
