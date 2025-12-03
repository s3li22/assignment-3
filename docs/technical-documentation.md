# Technical Documentation

## Project Overview
This project is a personal portfolio website for Ali Almatrook. It highlights academic background, projects, skills, and contact information while supporting light/dark themes and interactive elements such as project modals and animated skill bars.

## Technology Stack
- **HTML5** for semantic structure
- **CSS3** (see `css/styles.css`) for responsive styling and theming
- **JavaScript** (see `js/script.js`) for interactive features like theme toggling, smooth scrolling, modal handling, and animated progress bars
- **Font Awesome** for scalable vector icons
- **Google Fonts (Inter)** for typography consistency

## Project Structure
```
assignment-3/
├── assets/
│   └── images/
├── css/
│   └── styles.css
├── docs/
│   ├── ai-usage-report.md
│   └── technical-documentation.md
├── js/
│   └── script.js
├── index.html
└── README.md
```

## Key Components
1. **Hero Section** – Introduces Ali with a KFUPM badge, CTA buttons, and a dynamic greeting that changes with the time of day.
2. **Projects Section** – Displays featured projects and a modal with richer details and technology tags.
3. **Skills Section** – Uses animated progress bars triggered via the Intersection Observer API.
4. **Contact Section** – Offers a form with basic client-side validation and a list of contact methods.
5. **Theme Toggle** – Remembers the user’s preferred theme via `localStorage`.

## Running the Project
1. Open `index.html` in any modern browser.
2. Ensure an internet connection is available for Google Fonts and Font Awesome CDN assets.

## Future Enhancements
- Replace placeholder image circles with personal photos or illustrations in `assets/images/`.
- Hook the contact form to a backend service (e.g., Firebase, email API).
- Add more portfolio items and include live demo/source links.
