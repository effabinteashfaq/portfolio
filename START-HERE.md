# Start here (Effa)

## 1. One-time setup on Ubuntu
Check what you already have:

    node -v      # need v20 or newer
    git --version
    claude --version

If Node is missing or old, install it with nvm:

    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
    source ~/.bashrc
    nvm install --lts

## 2. Make the repo
1. On GitHub, create a new empty repository called `portfolio` (no README, no .gitignore).
2. On your machine:

        mkdir -p ~/projects && cd ~/projects
        unzip ~/Downloads/portfolio-kit.zip -d portfolio
        cd portfolio
        git init
        git branch -M main
        git remote add origin https://github.com/<your-username>/portfolio.git

## 3. Start Claude Code
From inside the `portfolio` folder:

    claude

Then paste this as your first message:

> Read CLAUDE.md, then docs/portfolio-content.md, docs/portfolio-design-brief.md and reference/mockup/Journey.dc.html. Build my portfolio step by step following the suggested order in CLAUDE.md. Start with step 1 and show me the result with npm run dev before moving on. Ask me before pushing anything.

## 4. Later: go live
When you're happy with the local version, ask Claude Code to push to GitHub. Then on vercel.com: Add New → Project → import `portfolio` → Deploy. You'll get a free `portfolio-xxxx.vercel.app` link, and every push after that updates the site automatically.

## Still to send when you have them
- DeepTrace repo link
- ADSScanner screenshots
- Experience certificates (Haumaru Whānau, National CERT): search for these
- Photos and paintings for the scenes and Beyond the Screen
