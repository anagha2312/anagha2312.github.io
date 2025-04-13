
# Personal Website - Anagha Prajapati

## Project Overview
This repository contains a personal website hosted on GitHub Pages. The website showcases my profile, education, projects, skills, and includes an interactive text analyzer tool as required by the assignment.

## Features
1. Responsive personal website with mobile-friendly design  
2. Click event tracking for all interactive elements (Question 2)  
3. Text analyzer tool for processing text input (Question 3)  
4. PDF resume download functionality  

## Folder Structure
```
personal-website/
├── index.html          # Main home page
├── styles/
│   └── main.css        # Main stylesheet
├── scripts/
│   ├── tracking.js     # Event tracking (Q2)
│   └── textAnalyzer.js # Text analysis functionality (Q3)
├── assets/
│   ├── images/
│   │   ├── profile.jpg        # Your profile picture
│   │   ├── birthplace1.jpg    # Birthplace images
│   │   ├── birthplace2.jpg
│   │   └── birthplace3.jpg
│   └── documents/
│       └── cv.pdf      # Your CV/resume
└── README.txt          # Documentation and assumptions
```

## Assumptions
1. For the birthplace images, I've used placeholder images that should be replaced with actual images from my hometown.  
2. The CV PDF file contains the information from my resume formatted appropriately.  
3. For the text analyzer tool, I've assumed that:  
   - Users will paste text with at least 10,000 words  
   - The tool analyzes and displays results on the same page  
   - Special symbols include all non-alphabetic characters  
