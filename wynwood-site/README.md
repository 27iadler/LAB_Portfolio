# Wynwood Tech District

This site pulls companies straight from your Notion database. Anything checked
"On Portfolio List?" shows up on the site. Uncheck it, it disappears. No code
edits needed after setup.

## Get this live (no installs needed)

### 1. Put this code on GitHub
- Go to github.com, log in (or sign up — it's free)
- Click the "+" in the top right → "New repository"
- Name it `wynwood-tech-district`, leave it Public or Private, click "Create repository"
- On the next page, click "uploading an existing file"
- Drag every file and folder from this project into the upload box
- Click "Commit changes"

### 2. Deploy it on Vercel
- Go to vercel.com, click "Sign up," choose "Continue with GitHub"
- Click "Add New" → "Project"
- Find `wynwood-tech-district` in the list and click "Import"
- Before clicking deploy, open "Environment Variables" and add two:
  - `NOTION_TOKEN` → paste your secret token from Notion
  - `NOTION_DATABASE_ID` → `383b2b87db5d80fe947ed2223fb3dffa`
- Click "Deploy"

That's it. Vercel gives you a live URL. Every hour it automatically re-checks
Notion, so changes you make there show up on the site without redeploying
anything yourself.

## Notion database requirements

The code expects these exact property names in your database:
- `Company` — title property
- `What They Do` — text property
- `On Portfolio List?` — checkbox property

If you rename any of these in Notion, update the matching name in
`lib/notion.ts`.
