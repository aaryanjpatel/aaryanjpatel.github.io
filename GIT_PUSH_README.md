# Git Push Instructions

This guide explains how to push your portfolio changes to GitHub.

## Prerequisites
- Git installed on your system
- GitHub account with repository access
- Personal Access Token (if not using SSH)

## Initial Setup (Already Done)
```bash
# Set remote origin (replace with your repo URL)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Or update existing remote
git remote set-url origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
```

## Regular Workflow

### 1. Check Status
```bash
git status
```
This shows which files have been modified or added.

### 2. Add Changes
```bash
# Add all changes
git add .

# Or add specific files
git add index.md about.md style.css
```

### 3. Commit Changes
```bash
git commit -m "Your commit message here"
```
Use descriptive messages like:
- "Update about section"
- "Add new project to portfolio"
- "Fix navigation styling"

### 4. Push to GitHub
```bash
git push origin main
```

## Authentication

### Option A: Personal Access Token (Recommended)
When prompted for credentials:
- **Username**: Your GitHub username
- **Password**: Your Personal Access Token (starts with `ghp_`)

The credentials will be cached by Git Credential Manager.

### Option B: SSH Key
If you have SSH keys set up:
```bash
git remote set-url origin git@github.com:YOUR_USERNAME/YOUR_REPO.git
git push origin main
```

## Troubleshooting

### Permission Denied
- Make sure you have write access to the repository
- Verify your Personal Access Token has `repo` permissions
- Check that you're using the correct repository URL

### Repository Moved
If you see "repository moved" message, update the remote:
```bash
git remote set-url origin https://github.com/CORRECT_OWNER/CORRECT_REPO.git
```

### Uncommitted Changes
If you have uncommitted changes and want to pull:
```bash
git stash
git pull origin main
git stash pop
```

## GitHub Pages Deployment
After pushing, your site will be available at:
`https://YOUR_USERNAME.github.io/YOUR_REPO/`

For repositories named `YOUR_USERNAME.github.io`, the URL is:
`https://YOUR_USERNAME.github.io/`

## Useful Commands
```bash
# View commit history
git log --oneline

# See differences
git diff

# Undo last commit (if not pushed)
git reset --soft HEAD~1

# Create new branch
git checkout -b new-feature
```