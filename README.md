# Personal Portfolio Website

A modern, responsive single-page portfolio built with semantic HTML, modular CSS, and progressively enhanced JavaScript. It showcases projects, skills, and contact details while offering subtle personalization touches such as theme preference, login state, and saved greetings.

## Features

- 🌓 Dark/Light theme with localStorage persistence
- 🔗 Live GitHub repository feed (REST API) with graceful error handling
- 📊 Animated skill bars powered by the Intersection Observer API
- 🧭 Sticky navigation with smooth scrolling and mobile hamburger menu
- 🎯 Project gallery with category filters, sorting, and detailed modal dialogs
- 📬 Client-side validated contact form and visit-duration timer
- 🙋 Navbar login toggle plus “Set Name” action that personalizes the hero greeting
- 👀 Quick “Hide Projects” button that remembers visibility across sessions

## Running Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/assignment-3-portfolio.git
   ```

2. Change into the project directory:
   ```bash
   cd assignment-3-portfolio
   ```

3. Serve the site (recommended to avoid CORS issues with local JSON/Font loading):
   ```bash
   # Python 3
   python -m http.server 8000

   # or Node (after `npm install -g http-server`)
   npx http-server -p 8000
   ```

4. Open your browser to `http://localhost:8000` and navigate to `index.html`.


## Personalization & State Management

- The navbar buttons manage login state and the saved visitor name; both values persist in `localStorage` and immediately refresh the hero greeting plus button labels.
- A dedicated toggle above the projects section shows/hides the gallery while remembering the choice for the next visit.
- Theme selection is stored globally so returning visitors keep their preferred appearance.

## AI Tools Used (Summary)

- GitHub Copilot for inline code completions and boilerplate suggestions.
- GPT-5.1-Codex (Preview) via GitHub Copilot Chat for higher-level refactors such as moving personalization controls into the navbar and refining documentation.

Full prompt/output details live in [`docs/ai-usage-report.md`](docs/ai-usage-report.md).

## Project Structure

```
assignment-3/
├── index.html
├── README.md
├── css/
│   └── styles.css
├── js/
│   └── script.js
└── docs/
    └── ai-usage-report.md
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License