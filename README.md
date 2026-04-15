# M.Tech Q&A Web App

A lightweight, subject-wise web app for browsing M.Tech question papers, solved answers, and syllabus PDFs with a global search experience.

## Features

- Subject-wise dashboard cards on the home page
- Direct links to each subject paper
- Syllabus PDF links per subject
- Global search across all indexed questions
- Deep-link navigation to specific questions (where anchors are available)
- Quick floating **Home** button on subject pages

## Project Structure

```
mtech_second_sem_qna/
├── index.html
├── app.css
├── app.js
├── search-index.js
├── Big_Data_Analytics/
│   ├── BTCS816PET-Big Data Analytics - 2024.html
│   └── MTCS246PET-Big Data Analytics - 2025.html
├── Blockchain_Technology/
│   ├── MTCS231PET (Blockchain Technology) - 2023.html
│   └── MTCS231PET-Blockchain Technology - 2025.html
└── syllabus/
		├── Big_Data_Analytics_syllabus.pdf
		└── Blockchain_syllabus.pdf
```

## How to Run

### Option 1 (recommended)

- Open this folder in VS Code.
- Install and use **Live Server**.
- Start from `index.html`.

### Option 2

- Open `index.html` directly in a browser.
- For best navigation/search reliability, serving over a local web server is preferred.

## How to Use

1. Open `index.html`.
2. Use the subject cards to open papers or syllabus.
3. Use the global search box to find topics/questions quickly.
4. Click a result to jump to the target paper/question.

Tip: press `/` on the home page to focus the global search box.

## Global Search Notes

- Search data comes from `search-index.js`.
- Current index includes questions from:
	- Big Data Analytics (2024, 2025)
	- Blockchain Technology (2023, 2025)
- Some pages support exact question anchors directly; others are mapped through generated IDs.

## Maintenance

If you edit question titles or add new subject files, update `search-index.js` so global search stays accurate.

Recommended workflow:

- Edit/prepare subject HTML files.
- Regenerate or manually update `search-index.js` entries.
- Verify links by opening `index.html` and testing a few searches.

## Tech Stack

- Plain HTML, CSS, JavaScript (no framework)
- Static-file friendly design

## Future Improvements (optional)

- Auto-generate `search-index.js` from source HTML files via script
- Add filters (subject/year) on search results
- Add dark/light theme toggle on dashboard

