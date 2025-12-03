// JavaScript for Interactive Features

// Set default theme to dark
document.documentElement.setAttribute('data-theme', 'dark');

// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference or default to dark
const currentTheme = localStorage.getItem('theme') || 'dark';

// Apply the saved theme
if (currentTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
} else {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
}

// Toggle theme on button click
themeToggle.addEventListener('click', function() {
    const theme = document.documentElement.getAttribute('data-theme');
    
    if (theme === 'light') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        localStorage.setItem('theme', 'light');
    }
});

// Application state helpers
function getStoredBool(key, fallback) {
    const raw = localStorage.getItem(key);
    if (raw === null) {
        return fallback;
    }
    return raw === 'true';
}

const appState = {
    isLoggedIn: getStoredBool('isLoggedIn', false),
    projectsVisible: getStoredBool('projectsVisible', true),
    visitorName: localStorage.getItem('visitorName') || ''
};

// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Animate Skill Bars on Scroll
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const skillLevel = bar.getAttribute('data-skill');
        bar.style.width = skillLevel + '%';
    });
}

// Use Intersection Observer to trigger skill bar animation
const skillsSection = document.getElementById('skills');
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkillBars();
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

if (skillsSection) {
    observer.observe(skillsSection);
}

// Contact Form Handling
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

contactForm?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');

    const trimmedName = name.trim();
    const trimmedSubject = subject.trim();
    const trimmedMessage = message.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const errors = [];

    if (trimmedName.length < 2) {
        errors.push('Name must be at least 2 characters.');
    }

    if (!emailPattern.test(email)) {
        errors.push('Please provide a valid email address.');
    }

    if (trimmedSubject.length < 3) {
        errors.push('Subject should describe your message (min 3 characters).');
    }

    if (trimmedMessage.length < 20) {
        errors.push('Message must be at least 20 characters so I can respond properly.');
    }

    if (errors.length) {
        if (formStatus) {
            formStatus.textContent = errors.join(' ');
            formStatus.className = 'form-status error';
        }
        return;
    }

    if (formStatus) {
        formStatus.textContent = 'Message ready to send! (Demo only)';
        formStatus.className = 'form-status success';
    }
    this.reset();
});

// Dynamic Greeting Based on Time of Day
function updateGreeting() {
    const hour = new Date().getHours();
    let greeting;
    
    if (hour < 12) {
        greeting = "Good morning";
    } else if (hour < 18) {
        greeting = "Good afternoon";
    } else {
        greeting = "Good evening";
    }
    
    let greetingElement = document.querySelector('.greeting');
    
    if (!greetingElement) {
        greetingElement = document.createElement('p');
        greetingElement.className = 'greeting';
        document.querySelector('.hero-content').prepend(greetingElement);
    }
    
    const visitorName = appState.visitorName || localStorage.getItem('visitorName');
    if (visitorName) {
        greetingElement.textContent = `${greeting}, ${visitorName}! 👋`;
    } else {
        greetingElement.textContent = `${greeting}, I'm Ali 👋`;
    }
}

updateGreeting();
setInterval(updateGreeting, 60000); // Update every minute

// Scroll Animation for Elements
function checkScroll() {
    const elements = document.querySelectorAll('.project-card, .skill, .contact-info, .contact-form, .preference-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Set initial state for animated elements
document.querySelectorAll('.project-card, .skill, .contact-info, .contact-form, .preference-card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

// Check scroll position on load and scroll
window.addEventListener('load', checkScroll);
window.addEventListener('scroll', checkScroll);

// Navbar background on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'var(--bg-color)';
        navbar.style.boxShadow = 'var(--shadow)';
    } else {
        navbar.style.background = 'var(--bg-color)';
        navbar.style.boxShadow = 'none';
    }
});

// Project Details Modal Functionality
const modal = document.getElementById('project-modal');
const closeModal = document.querySelector('.close-modal');
const projectLinks = document.querySelectorAll('.project-link');
const projectsGrid = document.querySelector('.projects-grid');
const projectCards = Array.from(document.querySelectorAll('.project-card'));
const filterButtons = document.querySelectorAll('.filter-btn');
const sortSelect = document.getElementById('sort-projects');
const loginStatus = document.getElementById('login-status');
const loginToggleBtn = document.getElementById('login-toggle');
const nameToggleBtn = document.getElementById('name-toggle');
const projectVisibilityBtn = document.getElementById('projects-visibility');
const projectsSection = document.getElementById('projects');

// Project data
const projects = [
    {
        title: "Simple Banking System",
        icon: "fas fa-piggy-bank",
        description: "A comprehensive console-based banking application that allows users to create and manage bank accounts. Users can perform various banking operations including deposits, withdrawals, and balance inquiries. The system securely stores account information and transaction history using file I/O operations.",
        features: [
            "User account creation and management",
            "Secure deposit and withdrawal operations",
            "Balance inquiry functionality",
            "Transaction history tracking",
            "Data persistence using file storage"
        ],
        technologies: ["Python", "File I/O", "Data Structures"]
    },
    {
        title: "Word Guessing Game",
        icon: "fas fa-gamepad",
        description: "An engaging word guessing game built with Java Swing. Players attempt to guess a hidden word by suggesting letters within a limited number of attempts. The game features an intuitive graphical interface, multiple difficulty levels, and a diverse word database.",
        features: [
            "Interactive GUI built with Java Swing",
            "Multiple difficulty levels",
            "Score tracking system",
            "Hints and power-ups",
            "Customizable word categories"
        ],
        technologies: ["Java", "Swing GUI", "Object-Oriented Programming"]
    },
    {
        title: "Task Manager",
        icon: "fas fa-tasks",
        description: "A responsive web application for efficient task management. Users can create, edit, delete, and organize tasks with due dates and priority levels. The application features a clean, intuitive interface and local storage for data persistence.",
        features: [
            "Add, edit, and delete tasks",
            "Set due dates and priority levels",
            "Task categorization and filtering",
            "Local storage for data persistence",
            "Responsive design for all devices"
        ],
        technologies: ["HTML5", "CSS3", "JavaScript", "Local Storage API"]
    },
    {
        title: "Scientific Calculator",
        icon: "fas fa-calculator",
        description: "A feature-rich scientific calculator application that performs basic arithmetic operations along with advanced mathematical functions. The calculator includes trigonometric, logarithmic, and statistical functions with a user-friendly interface.",
        features: [
            "Basic arithmetic operations",
            "Scientific functions (trigonometry, logarithms)",
            "Memory functions (store, recall, clear)",
            "Expression evaluation with proper operator precedence",
            "Error handling for invalid inputs"
        ],
        technologies: ["C++", "Console Application", "Algorithms"]
    }
];

// Projects filtering and sorting logic
const projectDataset = projectCards.map(card => ({
    element: card,
    category: card.dataset.category,
    date: new Date(card.dataset.date),
    name: card.querySelector('.project-title').textContent.trim()
}));

function renderProjects(items) {
    if (!projectsGrid) return;
    projectsGrid.innerHTML = '';
    items.forEach(item => {
        projectsGrid.appendChild(item.element);
    });
}

function applyProjectLogic() {
    const activeFilter = document.querySelector('.filter-btn.active')?.dataset.filter || 'all';
    const sortMode = sortSelect?.value || 'recent';

    let filtered = projectDataset.filter(project => {
        return activeFilter === 'all' || project.category === activeFilter;
    });

    filtered.sort((a, b) => {
        if (sortMode === 'alpha') {
            return a.name.localeCompare(b.name);
        }
        return b.date - a.date;
    });

    renderProjects(filtered);
}

if (filterButtons.length) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            applyProjectLogic();
        });
    });
}

if (sortSelect) {
    sortSelect.addEventListener('change', applyProjectLogic);
}

if (projectDataset.length) {
    applyProjectLogic();
}

// Login state handling
function renderLoginState() {
    if (!loginToggleBtn) return;
    if (loginStatus) {
        loginStatus.textContent = appState.isLoggedIn
            ? 'You are logged in as a returning visitor.'
            : 'You are browsing as a guest.';
    }
    loginToggleBtn.textContent = appState.isLoggedIn ? 'Log Out' : 'Log In';
    loginToggleBtn.setAttribute('aria-pressed', appState.isLoggedIn.toString());
}

loginToggleBtn?.addEventListener('click', () => {
    appState.isLoggedIn = !appState.isLoggedIn;
    localStorage.setItem('isLoggedIn', appState.isLoggedIn);
    renderLoginState();
});

renderLoginState();

// Personalized greeting name handling via navbar action
function renderNameToggle() {
    if (!nameToggleBtn) return;
    if (appState.visitorName) {
        nameToggleBtn.textContent = `Hi, ${appState.visitorName}`;
        nameToggleBtn.setAttribute('aria-label', `Update saved name (current: ${appState.visitorName})`);
    } else {
        nameToggleBtn.textContent = 'Set Name';
        nameToggleBtn.setAttribute('aria-label', 'Set your preferred greeting name');
    }
}

function persistVisitorName(newName) {
    appState.visitorName = newName;
    if (newName) {
        localStorage.setItem('visitorName', newName);
    } else {
        localStorage.removeItem('visitorName');
    }
    updateGreeting();
    renderNameToggle();
}

nameToggleBtn?.addEventListener('click', () => {
    const current = appState.visitorName || '';
    const enteredName = window.prompt('Enter your preferred name (leave empty to clear):', current);

    if (enteredName === null) {
        return;
    }

    const trimmed = enteredName.trim();

    if (trimmed.length > 0 && trimmed.length < 2) {
        window.alert('Please enter at least 2 characters.');
        return;
    }

    persistVisitorName(trimmed);
});

renderNameToggle();

// Projects visibility toggle
function renderProjectsVisibility() {
    if (!projectsSection || !projectVisibilityBtn) return;
    if (appState.projectsVisible) {
        projectsSection.classList.remove('hidden');
        projectVisibilityBtn.textContent = 'Hide Projects';
    } else {
        projectsSection.classList.add('hidden');
        projectVisibilityBtn.textContent = 'Show Projects';
    }
}

projectVisibilityBtn?.addEventListener('click', () => {
    appState.projectsVisible = !appState.projectsVisible;
    localStorage.setItem('projectsVisible', appState.projectsVisible);
    renderProjectsVisibility();
});

renderProjectsVisibility();

// GitHub API Integration
const githubReposContainer = document.getElementById('github-repos');
const githubUsername = githubReposContainer?.dataset.username || 'octocat';

async function fetchGithubRepos() {
    if (!githubReposContainer) {
        return;
    }

    githubReposContainer.innerHTML = '<div class="github-message">Loading repositories...</div>';

    try {
        const apiUrl = `https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=4`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`GitHub API responded with ${response.status}`);
        }

        const repos = await response.json();

        if (!Array.isArray(repos) || repos.length === 0) {
            githubReposContainer.innerHTML = '<div class="github-message">No public repositories to display right now. Check back soon!</div>';
            return;
        }

        githubReposContainer.innerHTML = '';

        repos.forEach(repo => {
            const card = document.createElement('article');
            card.className = 'github-card';

            const description = repo.description ? repo.description : 'No description provided.';
            const languageTag = repo.language ? `<span class="tech-tag">${repo.language}</span>` : '';
            const stars = repo.stargazers_count ?? 0;

            card.innerHTML = `
                <h3 class="github-name">${repo.name}</h3>
                <p class="github-description">${description}</p>
                <div class="github-meta">
                    ${languageTag}
                    <span class="github-stars"><i class="fas fa-star"></i> ${stars}</span>
                </div>
                <a href="${repo.html_url}" class="github-link" target="_blank" rel="noopener noreferrer">View on GitHub</a>
            `;

            githubReposContainer.appendChild(card);
        });
    } catch (error) {
        console.error('GitHub API error:', error);
        githubReposContainer.innerHTML = '<div class="github-message">Unable to load GitHub activity right now. Please try again later.</div>';
    }
}

fetchGithubRepos();

// Open modal when project link is clicked
projectLinks.forEach(link => {
    link.addEventListener('click', function() {
        const projectIndex = this.getAttribute('data-project');
        openProjectModal(projectIndex);
    });
});

// Close modal when close button is clicked
closeModal.addEventListener('click', function() {
    closeProjectModal();
});

// Close modal when clicking outside the modal content
window.addEventListener('click', function(event) {
    if (event.target === modal) {
        closeProjectModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && modal.style.display === 'block') {
        closeProjectModal();
    }
});

// Function to open project modal with specific project data
function openProjectModal(projectIndex) {
    const project = projects[projectIndex];
    
    // Update modal content with project data
    document.querySelector('.modal-title').textContent = project.title;
    document.querySelector('.modal-image i').className = project.icon;
    document.querySelector('.modal-description p').textContent = project.description;
    
    // Update features list
    const featuresList = document.querySelector('.modal-features ul');
    featuresList.innerHTML = '';
    project.features.forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature;
        featuresList.appendChild(li);
    });
    
    // Update technologies
    const techContainer = document.querySelector('.modal-tech .project-tech');
    techContainer.innerHTML = '';
    project.technologies.forEach(tech => {
        const span = document.createElement('span');
        span.className = 'tech-tag';
        span.textContent = tech;
        techContainer.appendChild(span);
    });
    
    // Display the modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Function to close project modal
function closeProjectModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Visit duration timer
const visitTimerElement = document.getElementById('visit-timer');
let secondsOnSite = 0;

function formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
}

if (visitTimerElement) {
    visitTimerElement.textContent = formatTime(0);
    setInterval(() => {
        secondsOnSite += 1;
        visitTimerElement.textContent = formatTime(secondsOnSite);
    }, 1000);
}
