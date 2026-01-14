# GitHub Repository Setup Instructions

## Step 1: Create the Repository on GitHub
1. Go to https://github.com/new
2. Fill in:
   - Repository name: `portfolio`
   - Description: `Personal portfolio website with interactive animations`
   - Visibility: **Public**
   - **DO NOT** check "Initialize this repository with a README"
3. Click "Create repository"

## Step 2: Push Your Code

Once the repo is created, run these commands in your terminal:

```bash
cd /Users/adarshaprasai/Desktop/Job/portfolio

# Add the remote repository
git remote add origin https://github.com/Adarsha23/portfolio.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 3: Deploy to Vercel

1. Go to https://vercel.com
2. Click "Add New" → "Project"
3. Import your `Adarsha23/portfolio` repository
4. Vercel will auto-detect it's a Vite project
5. Click "Deploy"

Your portfolio will be live in ~2 minutes! 🚀

## Repository URL
Once created, your repo will be at: **https://github.com/Adarsha23/portfolio**
