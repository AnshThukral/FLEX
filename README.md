# Flex - AI Resume Parser & Skill Matcher

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-blue?logo=vercel)](https://flex-fd4dlb5od-ansh-thukrals-projects.vercel.app/)

> An AI-powered recruitment tool that analyzes resumes and GitHub profiles to deliver confidence-scored matches for project requirements, streamlining hiring workflows.

---

## 🚀 Live Demo

🌐 [Flex Live on Vercel](https://flex-fd4dlb5od-ansh-thukrals-projects.vercel.app/)

---

## ✨ Features

- **AI Resume Parsing**: Uses OpenAI NLP to extract and infer skills from uploaded resumes.
- **GitHub Analysis**: Integrates GitHub API to analyze public repositories and extract real-world tech stacks.
- **Confidence Scoring**: Generates a match confidence score based on extracted skills vs. project requirements.
- **Recruiter Dashboard**: Allows recruiters to enter project requirements and see top-ranked candidates.
- **Efficient Hiring Pipeline**: Reduces manual screening time by up to 60%, while improving match quality.

---

## 🗺️ How It Works

✅ **Employers / Candidates Side**
- User submits their resume and GitHub username.
- System parses the resume using OpenAI and fetches GitHub repo languages/technologies.
- Outputs a combined skill profile and confidence score.

✅ **Recruiter Side**
- Recruiter logs in to dashboard.
- Enters project requirements (desired skills/stack).
- System ranks and displays top-matching candidates with confidence scores.

---

## ⚙️ Tech Stack

- **Frontend**: React, React Router, CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **APIs**:
  - OpenAI API (NLP for resume parsing)
  - GitHub API (repo analysis)
- **Hosting/Deployment**:
  - Frontend on Vercel
  - Backend on Vercel/Railway/Heroku (depending on deployment)

---

## 📦 Installation & Local Development

Clone the repo:

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME
