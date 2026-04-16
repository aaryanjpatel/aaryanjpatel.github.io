# My Portfolio Website

This is a simple website to show off your projects and info. It uses easy files that anyone can edit!

## What You Need
- A computer with internet
- A GitHub account (free!)

## Step 1: Get the Website Files
You already have them! They're in this folder.

## Step 2: Add Your Content

### About Page (`about.md`)
Tell visitors who you are! Edit this file to include:

```markdown
# About Me

Hi! I'm [Your Name], a [your profession/field] based in [your location].

## What I Do
- [Skill 1]
- [Skill 2]
- [Skill 3]

## My Interests
I'm passionate about [your interests] and always looking to learn new technologies.

## Experience
- [Job/Position] at [Company] - [Brief description]
- [Education/School] - [Degree/Major]

Feel free to reach out if you'd like to collaborate!
```

### Projects Page (`projects.md`)
Showcase your work! Each project should include:

```markdown
# My Projects

## Project Name
**Technologies:** [List technologies used]  
**Description:** Brief description of what the project does and your role.  
**Links:** [Live Demo](https://your-project-link.com) | [Source Code](https://github.com/yourusername/project-repo)

## Another Project
**Technologies:** React, Node.js, MongoDB  
**Description:** A full-stack web application for [purpose]. Features include user authentication, real-time updates, and responsive design.  
**Links:** [Live Demo](https://demo-link.com) | [Source Code](https://github.com/yourusername/project)

## Project Ideas
- 🔧 **Tool/Utility**: [Description]
- 🎮 **Game/App**: [Description]
- 📊 **Data Project**: [Description]
```

### Contact Page (`contact.md`)
Make it easy for people to reach you:

```markdown
# Get In Touch

I'm always interested in new opportunities and collaborations!

## Contact Information
- **Email:** [your.email@example.com](mailto:your.email@example.com)
- **LinkedIn:** [linkedin.com/in/yourprofile](https://linkedin.com/in/yourprofile)
- **GitHub:** [github.com/yourusername](https://github.com/yourusername)
- **Portfolio:** [yourwebsite.com](https://yourwebsite.com)

## Let's Connect
Whether you have a project in mind, want to discuss technology, or just want to say hello, I'd love to hear from you!

Drop me a message and I'll get back to you as soon as possible.
```

### Customization Tips

#### Styling (`style.css`)
- Change colors: Look for CSS variables at the top of the file
- Modify fonts: Update font-family properties
- Adjust spacing: Change padding/margin values
- Customize buttons: Update the `.neural-link` styles

#### Adding Images
1. Create an `images/` folder in your project root
2. Add your images there
3. Reference them in markdown: `![Alt text](images/your-image.jpg)`
4. Or in HTML: `<img src="images/your-image.jpg" alt="Description">`

#### Navigation
The navigation menu is in `_layouts/default.html`. To add new pages:
1. Create a new `.md` file (e.g., `blog.md`)
2. Add the link to the navigation in `_layouts/default.html`
3. Push your changes

### File Structure
```
your-portfolio/
├── _layouts/          # Layout templates
│   └── default.html   # Main layout
├── content/           # Source content (optional)
├── images/            # Your images
├── _config.yml        # Jekyll configuration
├── about.md          # About page
├── projects.md       # Projects page
├── contact.md        # Contact page
├── index.md          # Home page
├── style.css         # Your styles
├── script.js         # JavaScript
└── README.md         # This file
```

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

## Tips & Best Practices

### Content Updates
- **Test locally first**: Run `jekyll serve` to preview changes before pushing
- **Use descriptive commit messages**: "Add new project: Weather App" instead of "update"
- **Keep it updated**: Regularly add new projects and update your skills

### SEO & Performance
- Use descriptive headings (H1, H2, H3)
- Add alt text to images for accessibility
- Keep page load times fast by optimizing images

### Customization Ideas
- **Color schemes**: Try different color palettes in `style.css`
- **Fonts**: Experiment with Google Fonts
- **Animations**: Add CSS transitions for interactive elements
- **Icons**: Use Font Awesome or similar icon libraries

### Troubleshooting
- **Site not updating**: Wait 5-10 minutes after pushing for GitHub Pages
- **Local server issues**: Make sure Ruby and Jekyll are properly installed
- **Styling not working**: Check for syntax errors in CSS

### Advanced Features
- **Blog posts**: Add a `_posts/` folder with dated markdown files
- **Collections**: Group related content (tutorials, case studies)
- **Data files**: Use YAML/JSON files for structured data
- **Plugins**: Add Jekyll plugins for extra functionality

For detailed Git instructions, see `GIT_PUSH_README.md`.

Enjoy your new website! 🚀