# My Portfolio Website

This is a simple website to show off your projects and info. It uses easy files that anyone can edit!

## What You Need
- A computer with internet
- A GitHub account (free!)

## Step 1: Get the Website Files
You already have them! They're in this folder.

## Step 2: Add Your Info
Edit these files in the `content/` folder (open them in any text editor):

- `about.md`: Write about yourself. Like: "Hi, I'm [Your Name]. I love coding!"
- `projects.md`: List your cool projects. Like: "## My Game - [Link to it](https://github.com/yourname/game)"
- `contact.md`: How to reach you. Like: "Email: me@email.com"

Change `style.css` to make it look pretty (colors, fonts, etc.).

## Step 3: Test It Locally (Optional)
To see it on your computer:
1. Download Ruby from https://rubyinstaller.org/ (for Windows).
2. Open a terminal (command prompt) in this folder.
3. Type: `gem install jekyll bundler`
4. Type: `jekyll serve`
5. Open http://localhost:4000 in your browser.

## Step 4: Put It Online with GitHub
1. Go to https://github.com and sign in.
2. Click "New repository".
3. Name it "portfolio" (or anything you like).
4. Make it **public** (so anyone can see it).
5. Don't add README or anything, just create it.
6. Copy the link, like: https://github.com/yourusername/portfolio.git

### Push Your Files to GitHub
You need to "push" your files to GitHub.

#### Option A: Use VS Code (Easy!)
1. Open this folder in VS Code.
2. Click the Source Control icon (looks like a branch).
3. Click "Publish to GitHub" or "Push".
4. Sign in to GitHub when asked.
5. Choose your new repo.

#### Option B: Use Terminal with Personal Access Token
1. Go to https://github.com/settings/tokens
2. Click "Generate new token (classic)".
3. Name it "Portfolio".
4. Check "repo" (for full access).
5. Click "Generate token". **Copy it now!**
6. In terminal (in this folder):
   - Type: `git remote add origin https://github.com/yourusername/portfolio.git` (replace with your link)
   - Type: `git push -u origin main`
   - Username: your GitHub username
   - Password: paste the token

## Step 5: Make It Live
1. Go to your GitHub repo (the link you copied).
2. Click "Settings" (top right).
3. Scroll to "Pages" (left side).
4. Under "Source", choose "Deploy from a branch".
5. Select "main" branch.
6. Click "Save".
7. Wait 5-10 minutes. Your site will be at: https://yourusername.github.io/portfolio/

## Tips
- Edit the files anytime and push again to update.
- Add images in a new `images/` folder and link them like `![Alt text](images/my-pic.jpg)`
- If stuck, ask for help!

Enjoy your new website! 🚀