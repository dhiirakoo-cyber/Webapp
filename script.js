/**
 * AMOO ACADEMY - Main Client-Side JavaScript Engine
 * Author: Amanuel
 * Location: Harar, Ethiopia
 * Contact: 0967145146 | dhiirakoo@gmail.com
 * License: Production Ready, SEO Optimized, Clean & Validated
 */

// ==========================================
// 1. CONSTANTS & DATABASE INITIALIZATION
// ==========================================

// Safe localStorage wrapper to support sandboxed frames/iframes
const safeStorage = {
  memoryStorage: {},
  getItem(key) {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      console.warn("localStorage is not accessible, falling back to in-memory store", e);
      return this.memoryStorage[key] || null;
    }
  },
  setItem(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      console.warn("localStorage is not accessible, falling back to in-memory store", e);
      this.memoryStorage[key] = String(value);
    }
  },
  removeItem(key) {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.warn("localStorage is not accessible, falling back to in-memory store", e);
      delete this.memoryStorage[key];
    }
  }
};

const DEFAULT_COURSES = [
  {
    id: "html-css-masterclass",
    title: "HTML & CSS Masterclass",
    description: "Learn to build beautiful, responsive, and modern websites from scratch using HTML5, CSS3, Flexbox, CSS Grid, and responsive design principles.",
    rating: 4.9,
    reviews: 142,
    instructor: "Amanuel",
    duration: "6 Weeks (24 Hours)",
    price: 200,
    students: 1250,
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
    category: "Development",
    benefits: [
      "Master modern layout techniques using Flexbox and Grid",
      "Build mobile-responsive designs from scratch",
      "Understand semantic HTML and accessibility",
      "Host your personal website live on GitHub Pages"
    ],
    curriculum: [
      "Introduction to HTML5 & Document Structure",
      "CSS3 Fundamentals, Selectors, and Cascade",
      "Sleek Web Layouts with Flexbox & Grid",
      "Media Queries and Mobile-First Responsive Design",
      "Transitions, Transforms, and Interactive Animations",
      "Final Capstone Project: Portfolio Website Deployment"
    ]
  },
  {
    id: "javascript-masterclass",
    title: "JavaScript Masterclass",
    description: "Master Vanilla JavaScript from basic syntax to advanced ES6+ concepts, asynchronous programming, DOM manipulation, and dynamic client-side apps.",
    rating: 5.0,
    reviews: 189,
    instructor: "Amanuel",
    duration: "8 Weeks (32 Hours)",
    price: 200,
    students: 1540,
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    category: "Development",
    benefits: [
      "Write clean, modern, and efficient JavaScript (ES6+)",
      "Interact with and modify the DOM dynamically",
      "Perform asynchronous API requests (Fetch, Async/Await)",
      "Build dynamic client-side applications without frameworks"
    ],
    curriculum: [
      "Variables, Types, Operators, and Control Flow",
      "Functions, Scope, Closures, and Execution Context",
      "Arrays, Objects, and Advanced Data Manipulation",
      "DOM Manipulation, Event Handling, and Form Validation",
      "Asynchronous JS: Promises, Fetch API, and Async/Await",
      "Interactive Project: Real-time Weather App with API Integration"
    ]
  },
  {
    id: "graphic-design",
    title: "Graphic Design Course",
    description: "Unlock your creativity. Master the core principles of design, color theory, typography, and create stunning visual graphics for web and print.",
    rating: 4.8,
    reviews: 95,
    instructor: "Amanuel",
    duration: "5 Weeks (20 Hours)",
    price: 200,
    students: 820,
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=800&q=80",
    category: "Design",
    benefits: [
      "Understand fundamental design rules (contrast, hierarchy, balance)",
      "Learn high-impact typography pairings and color schemes",
      "Create high-quality logos, social banners, and marketing assets",
      "Develop a professional design portfolio to attract clients"
    ],
    curriculum: [
      "Principles of Visual Design and Layout Composition",
      "Color Theory, Color Harmony, and Mood Generation",
      "Typography: Font Selection, Sizing, and Contrast",
      "Designing Brand Assets, Logos, and Identity Kits",
      "Sleek Social Media Ad Layouts and Banners",
      "Design Portfolio Creation and Freelancing Introduction"
    ]
  },
  {
    id: "video-editing",
    title: "Video Editing Course",
    description: "Learn professional video editing workflows, cuts, transitions, audio tuning, visual effects, and produce high-engagement videos for YouTube and TikTok.",
    rating: 4.7,
    reviews: 112,
    instructor: "Amanuel",
    duration: "6 Weeks (24 Hours)",
    price: 200,
    students: 940,
    image: "https://images.unsplash.com/photo-1622737133809-d95047b9e673?auto=format&fit=crop&w=800&q=80",
    category: "Multimedia",
    benefits: [
      "Master modern video editing workflows and cutting techniques",
      "Create smooth transitions and dynamic kinetic text effects",
      "Perform color grading and audio leveling like a pro",
      "Export optimized videos for specific social media algorithms"
    ],
    curriculum: [
      "Introduction to Video Editing and Timeline Assembly",
      "Cuts, Trims, Pace, and Storytelling Principles",
      "Working with Audio: Sound Effects, Background Music, and EQ",
      "Adding Titles, Captions, Lower Thirds, and Typography",
      "Color Correction and Styling Video Footage",
      "Exporting Settings for YouTube, TikTok, and Client Delivery"
    ]
  },
  {
    id: "social-media-marketing",
    title: "Social Media Marketing Course",
    description: "Discover how to grow brands on Instagram, Facebook, TikTok, and YouTube. Write engaging copy, run paid ads, and scale your audience exponentially.",
    rating: 4.9,
    reviews: 156,
    instructor: "Amanuel",
    duration: "6 Weeks (24 Hours)",
    price: 200,
    students: 1100,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    category: "Marketing",
    benefits: [
      "Develop complete, multi-channel marketing campaigns",
      "Write magnetic, high-converting copy that engages audiences",
      "Analyze metrics to optimize ad spend and campaign reach",
      "Master search engine optimization (SEO) and keyword strategy"
    ],
    curriculum: [
      "The Landscape of Modern Social Media Algorithms",
      "Content Strategy, Copywriting, and Visual Content Pillars",
      "Audience Targeting, Customer Personas, and Niche Research",
      "Setting Up and Running Highly Targeted Paid Ads Campaigns",
      "Analytics & Reporting: Interpreting ROI, CPC, and CTR",
      "Building a Freelance Digital Marketing Agency from Scratch"
    ]
  },
  {
    id: "contact-center-training",
    title: "Contact Center Training Course",
    description: "Acquire professional communication skills, phone etiquette, conflict resolution strategies, and CRM tool mastery for international customer support roles.",
    rating: 4.8,
    reviews: 84,
    instructor: "Amanuel",
    duration: "4 Weeks (16 Hours)",
    price: 200,
    students: 670,
    image: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?auto=format&fit=crop&w=800&q=80",
    category: "Professional Development",
    benefits: [
      "Master professional English and telephone etiquette",
      "Learn active listening and effective conflict resolution",
      "Familiarize with standard CRM tools and ticket workflows",
      "Get prepared for remote support jobs for global companies"
    ],
    curriculum: [
      "Fundamentals of Customer Service and Call Center Systems",
      "Phonetics, Vocal Mechanics, Accent Optimization, and Active Listening",
      "Handling Difficult Customers and Professional De-escalation",
      "Mastering Customer Relationship Management (CRM) Dashboards",
      "KPI Metrics: Call Handling Time, CSAT, and Net Promoter Score (NPS)",
      "Mock Calls, Roleplay Simulations, and CV Optimization"
    ]
  }
];

const DEFAULT_USERS = [
  {
    fullName: "Amanuel (Admin)",
    username: "amanuel",
    email: "dhiirakoo@gmail.com",
    phone: "0967145146",
    password: "admin",
    role: "admin",
    regDate: "2026-06-01T08:00:00Z"
  },
  {
    fullName: "Abebe Balcha",
    username: "abebe",
    email: "student@gmail.com",
    phone: "0911223344",
    password: "student",
    role: "student",
    regDate: "2026-06-20T10:30:00Z"
  },
  {
    fullName: "Almaz Kebede",
    username: "almaz",
    email: "almaz@gmail.com",
    phone: "0922334455",
    password: "student",
    role: "student",
    regDate: "2026-06-21T11:15:00Z"
  }
];

const DEFAULT_ENROLLMENTS = [
  {
    id: "enroll-1",
    studentName: "Abebe Balcha",
    studentPhone: "0911223344",
    studentEmail: "student@gmail.com",
    courseId: "javascript-masterclass",
    courseTitle: "JavaScript Masterclass",
    price: 200,
    status: "Approved",
    enrollDate: "2026-06-20T14:30:00Z"
  },
  {
    id: "enroll-2",
    studentName: "Almaz Kebede",
    studentPhone: "0922334455",
    studentEmail: "almaz@gmail.com",
    courseId: "graphic-design",
    courseTitle: "Graphic Design Course",
    price: 200,
    status: "Pending",
    enrollDate: "2026-06-23T11:15:00Z"
  }
];

// Seed databases if empty
function initializeDatabase() {
  if (!safeStorage.getItem("amoo_courses")) {
    safeStorage.setItem("amoo_courses", JSON.stringify(DEFAULT_COURSES));
  } else {
    // Migration: Update default courses' images to ensure they are fixed for existing browser caches
    try {
      const stored = JSON.parse(safeStorage.getItem("amoo_courses")) || [];
      let updated = false;
      const updatedCourses = stored.map(course => {
        const defaultMatch = DEFAULT_COURSES.find(dc => dc.id === course.id);
        if (defaultMatch && course.image !== defaultMatch.image) {
          course.image = defaultMatch.image;
          updated = true;
        }
        return course;
      });
      if (updated) {
        safeStorage.setItem("amoo_courses", JSON.stringify(updatedCourses));
      }
    } catch (e) {
      console.error("Migration error", e);
    }
  }
  if (!safeStorage.getItem("amoo_users")) {
    safeStorage.setItem("amoo_users", JSON.stringify(DEFAULT_USERS));
  }
  if (!safeStorage.getItem("amoo_enrollments")) {
    safeStorage.setItem("amoo_enrollments", JSON.stringify(DEFAULT_ENROLLMENTS));
  }
}

initializeDatabase();

// Database getters and setters
function getCoursesFromDB() {
  try {
    return JSON.parse(safeStorage.getItem("amoo_courses")) || [];
  } catch (e) {
    return [];
  }
}

function saveCoursesToDB(courses) {
  safeStorage.setItem("amoo_courses", JSON.stringify(courses));
}

function getUsersFromDB() {
  try {
    return JSON.parse(safeStorage.getItem("amoo_users")) || [];
  } catch (e) {
    return [];
  }
}

function saveUsersToDB(users) {
  safeStorage.setItem("amoo_users", JSON.stringify(users));
}

function getEnrollmentsFromDB() {
  try {
    return JSON.parse(safeStorage.getItem("amoo_enrollments")) || [];
  } catch (e) {
    return [];
  }
}

function saveEnrollmentsToDB(enrollments) {
  safeStorage.setItem("amoo_enrollments", JSON.stringify(enrollments));
}

// ==========================================
// 2. TOAST NOTIFICATION SYSTEM
// ==========================================

function showToast(message, type = "success") {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = `toast toast-${type} glass`;

  let icon = "✓";
  if (type === "error") icon = "✕";
  if (type === "warning") icon = "⚠";

  toast.innerHTML = `
    <span class="text-xl font-bold flex items-center justify-center w-7 h-7 rounded-full bg-white/20">${icon}</span>
    <p class="flex-1 text-sm font-semibold">${message}</p>
  `;

  container.appendChild(toast);

  // Auto remove toast
  setTimeout(() => {
    toast.classList.add("hide");
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3500);
}

// ==========================================
// 3. AUTHENTICATION CONTROLLER
// ==========================================

function getCurrentUser() {
  try {
    return JSON.parse(safeStorage.getItem("amoo_current_user")) || null;
  } catch (e) {
    return null;
  }
}

function setCurrentUser(user) {
  if (user) {
    safeStorage.setItem("amoo_current_user", JSON.stringify(user));
  } else {
    safeStorage.removeItem("amoo_current_user");
  }
}

function registerUser(fullName, username, email, phone, password, confirmPassword) {
  // Simple clean validation
  if (!fullName || !username || !email || !phone || !password || !confirmPassword) {
    showToast("Please fill in all registration fields.", "error");
    return false;
  }
  if (password !== confirmPassword) {
    showToast("Passwords do not match.", "error");
    return false;
  }
  if (password.length < 5) {
    showToast("Password must be at least 5 characters.", "error");
    return false;
  }

  const users = getUsersFromDB();
  const emailExists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
  const usernameExists = users.some(u => u.username.toLowerCase() === username.toLowerCase());

  if (emailExists) {
    showToast("An account with this email already exists.", "error");
    return false;
  }
  if (usernameExists) {
    showToast("This username is already taken.", "error");
    return false;
  }

  const newUser = {
    fullName,
    username: username.toLowerCase(),
    email: email.toLowerCase(),
    phone,
    password,
    role: "student",
    regDate: new Date().toISOString()
  };

  users.push(newUser);
  saveUsersToDB(users);
  showToast("Registration successful! You can now login.", "success");
  return true;
}

function loginUser(email, password) {
  if (!email || !password) {
    showToast("Please enter both email and password.", "error");
    return false;
  }

  const users = getUsersFromDB();
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);

  if (!user) {
    showToast("Invalid email or password.", "error");
    return false;
  }

  setCurrentUser(user);
  showToast(`Welcome back, ${user.fullName}!`, "success");
  return true;
}

function logoutUser() {
  setCurrentUser(null);
  showToast("Logged out successfully.", "success");
  setTimeout(() => {
    window.location.href = "index.html";
  }, 1000);
}

// ==========================================
// 4. THEME CONTROL (DARK/LIGHT MODE)
// ==========================================

function initTheme() {
  const savedTheme = safeStorage.getItem("amoo_theme") || "light";
  if (savedTheme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
  updateThemeToggles(savedTheme);
}

function toggleTheme() {
  const isDark = document.documentElement.classList.contains("dark");
  const newTheme = isDark ? "light" : "dark";

  if (newTheme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  safeStorage.setItem("amoo_theme", newTheme);
  updateThemeToggles(newTheme);
  showToast(`${newTheme.charAt(0).toUpperCase() + newTheme.slice(1)} theme enabled!`, "success");
}

function updateThemeToggles(theme) {
  const toggles = document.querySelectorAll(".theme-toggle-btn");
  toggles.forEach(btn => {
    if (theme === "dark") {
      btn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
        </svg>
      `;
    } else {
      btn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      `;
    }
  });
}

// ==========================================
// 5. RENDERING ENGINE & NAVIGATION
// ==========================================

function setupNavigation() {
  const user = getCurrentUser();
  const navContainers = document.querySelectorAll(".nav-user-container");

  navContainers.forEach(container => {
    if (user) {
      let adminLink = "";
      if (user.role === "admin") {
        adminLink = `<a href="admin.html" class="px-4 py-2 text-sm font-semibold text-teal-600 dark:text-teal-400 hover:text-teal-800 dark:hover:text-teal-300 transition-colors border border-teal-600/20 rounded-lg hover:bg-teal-50 dark:hover:bg-teal-950/20">Admin Dashboard</a>`;
      }

      container.innerHTML = `
        <div class="flex items-center gap-4">
          ${adminLink}
          <div class="hidden sm:flex flex-col text-right">
            <span class="text-xs text-slate-500 dark:text-slate-400">Signed in as</span>
            <span class="text-sm font-bold text-slate-800 dark:text-slate-200">${user.fullName}</span>
          </div>
          <button id="logout-btn" class="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-sm font-bold rounded-lg transition-colors cursor-pointer shadow-md hover:shadow-rose-600/10">Logout</button>
        </div>
      `;
    } else {
      container.innerHTML = `
        <div class="flex items-center gap-2 sm:gap-4">
          <a href="login.html" class="px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">Login</a>
          <a href="register.html" class="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-bold rounded-lg transition-colors shadow-md shadow-teal-600/15 hover:shadow-teal-700/25">Register</a>
        </div>
      `;
    }
  });

  // Mobile drawer controls
  const menuBtn = document.getElementById("mobile-menu-btn");
  const closeBtn = document.getElementById("mobile-menu-close");
  const mobileMenu = document.getElementById("mobile-menu");

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      mobileMenu.classList.remove("translate-x-full");
    });
  }
  if (closeBtn && mobileMenu) {
    closeBtn.addEventListener("click", () => {
      mobileMenu.classList.add("translate-x-full");
    });
  }

  // Bind logout events
  document.addEventListener("click", (e) => {
    if (e.target && e.target.id === "logout-btn") {
      logoutUser();
    }
  });
}

// ==========================================
// 6. PAGE-SPECIFIC CONTROLLERS
// ==========================================

// --- HOME PAGE CONTROLLER ---
function initHomePage() {
  renderFeaturedCourses();
  setupContactForm();
  setupNewsletterForm();
  setupFAQ();
}

function renderFeaturedCourses() {
  const grid = document.getElementById("featured-courses-grid");
  if (!grid) return;

  const courses = getCoursesFromDB();
  // Show first 3 courses as featured
  const featured = courses.slice(0, 3);

  let html = "";
  featured.forEach(course => {
    html += `
      <div class="hover-lift glass rounded-[24px] overflow-hidden border border-slate-200/50 dark:border-slate-800/80 transition-all flex flex-col h-full group bg-white dark:bg-slate-900/40 relative">
        <div class="relative overflow-hidden aspect-video">
          <img src="${course.image}" alt="${course.title}" loading="lazy" onerror="window.handleImageError && window.handleImageError(this)" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out">
          <div class="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <span class="absolute top-4 left-4 px-3.5 py-1 text-xs font-bold text-teal-800 dark:text-teal-300 bg-teal-500/10 dark:bg-teal-400/10 border border-teal-500/20 backdrop-blur-md rounded-full shadow-sm">${course.category}</span>
          <span class="absolute bottom-4 right-4 px-3.5 py-1.5 text-sm font-black text-white bg-slate-900/90 border border-white/15 rounded-xl shadow-lg">200 ETB</span>
        </div>
        <div class="p-6 flex-1 flex flex-col justify-between">
          <div>
            <div class="flex items-center gap-2.5 mb-3.5">
              <div class="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-500 dark:text-amber-400 text-xs font-black">
                <span>★</span>
                <span>${course.rating}</span>
              </div>
              <span class="text-xs font-semibold text-slate-500 dark:text-slate-400">(${course.reviews} reviews)</span>
            </div>
            <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2 leading-snug group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
              <a href="course-details.html?id=${course.id}">${course.title}</a>
            </h3>
            <p class="text-sm text-slate-500 dark:text-slate-400 mb-5 line-clamp-2 leading-relaxed">${course.description}</p>
          </div>
          <div>
            <div class="flex items-center justify-between py-3.5 border-t border-slate-200/50 dark:border-slate-800/80 text-xs font-bold text-slate-500 dark:text-slate-400">
              <span class="flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                ${course.duration}
              </span>
              <span class="flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                ${course.students.toLocaleString()}+ Students
              </span>
            </div>
            <div class="grid grid-cols-2 gap-3 mt-4">
              <a href="course-details.html?id=${course.id}" class="w-full text-center py-3 text-xs font-extrabold border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">Details</a>
              <a href="enroll.html?courseId=${course.id}" class="w-full text-center py-3 text-xs font-extrabold bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white rounded-xl shadow-lg shadow-teal-500/10 hover:shadow-teal-600/25 transition-all hover:scale-[1.03]">Enroll Now</a>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  grid.innerHTML = html;
}

function setupFAQ() {
  const accordion = document.querySelectorAll(".faq-item-header");
  accordion.forEach(item => {
    item.addEventListener("click", () => {
      const content = item.nextElementSibling;
      const icon = item.querySelector(".faq-icon");

      if (content.classList.contains("max-h-0") || content.style.maxHeight === "0px") {
        content.style.maxHeight = content.scrollHeight + "px";
        content.classList.remove("max-h-0", "opacity-0");
        icon.style.transform = "rotate(180deg)";
      } else {
        content.style.maxHeight = "0px";
        content.classList.add("max-h-0", "opacity-0");
        icon.style.transform = "rotate(0deg)";
      }
    });
  });
}

function setupContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = form.querySelector('[name="name"]').value;
    const email = form.querySelector('[name="email"]').value;
    const phone = form.querySelector('[name="phone"]').value;
    const msg = form.querySelector('[name="message"]').value;

    if (!name || !email || !phone || !msg) {
      showToast("Please fill in all contact fields.", "error");
      return;
    }

    showToast("Thank you for reaching out! We will contact you shortly.", "success");
    form.reset();
  });
}

function setupNewsletterForm() {
  const form = document.getElementById("newsletter-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = form.querySelector('[name="email"]').value;

    if (!email) {
      showToast("Please enter a valid email address.", "error");
      return;
    }

    showToast("Subscribed! Thank you for joining AMOO ACADEMY.", "success");
    form.reset();
  });
}

// --- COURSES DIRECTORY CONTROLLER ---
function initCoursesPage() {
  const grid = document.getElementById("courses-grid");
  if (!grid) return;

  const searchInput = document.getElementById("course-search");
  const filterButtons = document.querySelectorAll(".category-filter-btn");

  let currentCategory = "All";
  let searchVal = "";

  function renderFiltered() {
    const courses = getCoursesFromDB();
    const filtered = courses.filter(c => {
      const matchesCategory = currentCategory === "All" || c.category === currentCategory;
      const matchesSearch = c.title.toLowerCase().includes(searchVal) || c.description.toLowerCase().includes(searchVal);
      return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="col-span-full py-16 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-slate-300 dark:text-slate-700 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 class="text-xl font-bold text-slate-700 dark:text-slate-300 mb-1">No Courses Found</h3>
          <p class="text-slate-500">Try adjusting your search query or filter criteria.</p>
        </div>
      `;
      return;
    }

    let html = "";
    filtered.forEach(course => {
      html += `
        <div class="hover-lift glass rounded-[24px] overflow-hidden border border-slate-200/50 dark:border-slate-800/80 transition-all flex flex-col h-full group bg-white dark:bg-slate-900/40 relative">
          <div class="relative overflow-hidden aspect-video">
            <img src="${course.image}" alt="${course.title}" loading="lazy" onerror="window.handleImageError && window.handleImageError(this)" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out">
            <div class="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span class="absolute top-4 left-4 px-3.5 py-1 text-xs font-bold text-teal-800 dark:text-teal-300 bg-teal-500/10 dark:bg-teal-400/10 border border-teal-500/20 backdrop-blur-md rounded-full shadow-sm">${course.category}</span>
            <span class="absolute bottom-4 right-4 px-3.5 py-1.5 text-sm font-black text-white bg-slate-900/90 border border-white/15 rounded-xl shadow-lg">200 ETB</span>
          </div>
          <div class="p-6 flex-1 flex flex-col justify-between">
            <div>
              <div class="flex items-center gap-2.5 mb-3.5">
                <div class="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-500 dark:text-amber-400 text-xs font-black">
                  <span>★</span>
                  <span>${course.rating}</span>
                </div>
                <span class="text-xs font-semibold text-slate-500 dark:text-slate-400">(${course.reviews} reviews)</span>
              </div>
              <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2 leading-snug group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                <a href="course-details.html?id=${course.id}">${course.title}</a>
              </h3>
              <p class="text-sm text-slate-500 dark:text-slate-400 mb-5 line-clamp-3 leading-relaxed">${course.description}</p>
            </div>
            <div>
              <div class="flex items-center justify-between py-3.5 border-t border-slate-200/50 dark:border-slate-800/80 text-xs font-bold text-slate-500 dark:text-slate-400">
                <span class="flex items-center gap-1.5">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  ${course.duration}
                </span>
                <span class="flex items-center gap-1.5">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                  ${course.students.toLocaleString()}+ Students
                </span>
              </div>
              <div class="grid grid-cols-2 gap-3 mt-4">
                <a href="course-details.html?id=${course.id}" class="w-full text-center py-3 text-xs font-extrabold border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">Details</a>
                <a href="enroll.html?courseId=${course.id}" class="w-full text-center py-3 text-xs font-extrabold bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white rounded-xl shadow-lg shadow-teal-500/10 hover:shadow-teal-600/25 transition-all hover:scale-[1.03]">Enroll Now</a>
              </div>
            </div>
          </div>
        </div>
      `;
    });

    grid.innerHTML = html;
  }

  // Set up listeners for filtration
  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => b.classList.remove("bg-teal-600", "text-white", "border-teal-600"));
      filterButtons.forEach(b => b.classList.add("bg-white/10", "text-slate-700", "dark:text-slate-300", "border-slate-300/30"));

      btn.classList.add("bg-teal-600", "text-white", "border-teal-600");
      btn.classList.remove("bg-white/10", "text-slate-700", "dark:text-slate-300", "border-slate-300/30");

      currentCategory = btn.getAttribute("data-category");
      renderFiltered();
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchVal = e.target.value.toLowerCase().trim();
      renderFiltered();
    });
  }

  // Pre-load category filter from query parameters if exists
  const urlParams = new URLSearchParams(window.location.search);
  const catParam = urlParams.get("category");
  if (catParam) {
    const matchedBtn = Array.from(filterButtons).find(b => b.getAttribute("data-category") === catParam);
    if (matchedBtn) {
      matchedBtn.click();
    } else {
      renderFiltered();
    }
  } else {
    renderFiltered();
  }
}

// --- COURSE DETAILS CONTROLLER ---
function initCourseDetailsPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const courseId = urlParams.get("id");

  if (!courseId) {
    window.location.href = "courses.html";
    return;
  }

  const courses = getCoursesFromDB();
  const course = courses.find(c => c.id === courseId);

  if (!course) {
    window.location.href = "courses.html";
    return;
  }

  // Populate UI
  document.getElementById("course-title").textContent = course.title;
  document.getElementById("course-category").textContent = course.category;
  document.getElementById("course-instructor").textContent = course.instructor;
  document.getElementById("course-duration").textContent = course.duration;
  document.getElementById("course-price").textContent = `${course.price} ETB`;
  document.getElementById("course-students").textContent = `${course.students}+ Enrolled`;
  document.getElementById("course-rating").textContent = course.rating;
  document.getElementById("course-reviews").textContent = `(${course.reviews} student reviews)`;
  document.getElementById("course-desc").textContent = course.description;

  const mainImg = document.getElementById("course-image");
  if (mainImg) {
    mainImg.onerror = function() {
      if (window.handleImageError) window.handleImageError(this);
    };
    mainImg.src = course.image;
    mainImg.alt = course.title;
  }

  // Set enroll button link
  const enrollBtn = document.getElementById("details-enroll-btn");
  if (enrollBtn) {
    enrollBtn.href = `enroll.html?courseId=${course.id}`;
  }

  // Render Benefits List
  const benefitsContainer = document.getElementById("course-benefits-list");
  if (benefitsContainer && course.benefits) {
    benefitsContainer.innerHTML = course.benefits.map(b => `
      <li class="flex items-start gap-3">
        <span class="flex-shrink-0 w-6 h-6 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold text-sm">✓</span>
        <span class="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">${b}</span>
      </li>
    `).join("");
  }

  // Render Curriculum List
  const curriculumContainer = document.getElementById("course-curriculum-list");
  if (curriculumContainer && course.curriculum) {
    curriculumContainer.innerHTML = course.curriculum.map((item, index) => `
      <div class="border border-slate-200/60 dark:border-slate-800 rounded-xl overflow-hidden glass mb-3">
        <button class="w-full flex items-center justify-between p-4 font-bold text-left text-sm md:text-base text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-all">
          <span class="flex items-center gap-3">
            <span class="text-xs text-slate-400 font-mono">Module 0${index + 1}</span>
            <span>${item}</span>
          </span>
          <span class="text-teal-500 font-mono text-xs">Active</span>
        </button>
      </div>
    `).join("");
  }
}

// --- ENROLLMENT CONTROLLER ---
function initEnrollmentPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const courseId = urlParams.get("courseId");

  if (!courseId) {
    window.location.href = "courses.html";
    return;
  }

  const courses = getCoursesFromDB();
  const course = courses.find(c => c.id === courseId);

  if (!course) {
    window.location.href = "courses.html";
    return;
  }

  // Populate UI
  document.getElementById("enroll-course-title").textContent = course.title;
  document.getElementById("enroll-course-price").textContent = `${course.price} ETB`;
  document.getElementById("enroll-course-duration").textContent = course.duration;
  document.getElementById("enroll-course-category").textContent = course.category;

  const cardImg = document.getElementById("enroll-course-img");
  if (cardImg) {
    cardImg.onerror = function() {
      if (window.handleImageError) window.handleImageError(this);
    };
    cardImg.src = course.image;
    cardImg.alt = course.title;
  }

  // Pre-fill fields if user is logged in
  const user = getCurrentUser();
  if (user) {
    document.getElementById("enroll-name").value = user.fullName || "";
    document.getElementById("enroll-email").value = user.email || "";
    document.getElementById("enroll-phone").value = user.phone || "";
  }

  const form = document.getElementById("enroll-form");
  const successModal = document.getElementById("enroll-success-modal");
  const closeSuccessBtn = document.getElementById("close-success-modal");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const fullName = document.getElementById("enroll-name").value;
      const email = document.getElementById("enroll-email").value;
      const phone = document.getElementById("enroll-phone").value;

      if (!fullName || !email || !phone) {
        showToast("Please fill in all enrollment fields.", "error");
        return;
      }

      // Record enrollment in LocalStorage
      const enrollments = getEnrollmentsFromDB();
      const newEnroll = {
        id: "enroll-" + Date.now(),
        studentName: fullName,
        studentPhone: phone,
        studentEmail: email.toLowerCase(),
        courseId: course.id,
        courseTitle: course.title,
        price: course.price,
        status: "Pending",
        enrollDate: new Date().toISOString()
      };

      enrollments.push(newEnroll);
      saveEnrollmentsToDB(enrollments);

      // Increment course student count inside LocalStorage
      const updatedCourses = courses.map(c => {
        if (c.id === course.id) {
          return { ...c, students: c.students + 1 };
        }
        return c;
      });
      saveCoursesToDB(updatedCourses);

      // Trigger success notification sound / modal
      if (successModal) {
        successModal.classList.add("active");
      } else {
        showToast("Enrollment submitted successfully!", "success");
        setTimeout(() => {
          window.location.href = "courses.html";
        }, 2000);
      }
    });
  }

  if (closeSuccessBtn && successModal) {
    closeSuccessBtn.addEventListener("click", () => {
      successModal.classList.remove("active");
      window.location.href = "courses.html";
    });
  }
}

// --- ADMIN DASHBOARD CONTROLLER ---
function initAdminPage() {
  const user = getCurrentUser();

  // Route protection - only admins allowed!
  if (!user || user.role !== "admin") {
    showToast("Access Denied. Admins Only.", "error");
    setTimeout(() => {
      window.location.href = "login.html";
    }, 1500);
    return;
  }

  renderAdminStats();
  renderAdminCourses();
  renderAdminEnrollments();
  renderAdminUsers();
  setupAdminModals();
}

function renderAdminStats() {
  const enrollments = getEnrollmentsFromDB();
  const courses = getCoursesFromDB();
  const users = getUsersFromDB();

  const totalStudentsCount = users.filter(u => u.role !== "admin").length;
  const totalCoursesCount = courses.length;

  // Calculate total revenue from Approved enrollments
  const approvedEnrollments = enrollments.filter(e => e.status === "Approved");
  const totalRevenue = approvedEnrollments.reduce((sum, curr) => sum + (curr.price || 0), 0);

  // New registrations count (last 7 days or total students for mock simplicity)
  const pendingRegistrationsCount = enrollments.filter(e => e.status === "Pending").length;

  document.getElementById("stat-students").textContent = totalStudentsCount;
  document.getElementById("stat-courses").textContent = totalCoursesCount;
  document.getElementById("stat-revenue").textContent = `${totalRevenue} ETB`;
  document.getElementById("stat-pending").textContent = pendingRegistrationsCount;
}

function renderAdminCourses() {
  const container = document.getElementById("admin-courses-list");
  if (!container) return;

  const courses = getCoursesFromDB();
  let html = "";

  courses.forEach(course => {
    html += `
      <tr class="border-b border-slate-200/50 dark:border-slate-800/80 hover:bg-slate-50/50 dark:hover:bg-slate-900/10 transition-colors">
        <td class="p-4 font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-3">
          <img src="${course.image}" alt="" onerror="window.handleImageError && window.handleImageError(this)" class="w-12 h-12 rounded-lg object-cover">
          <div>
            <span class="block text-base leading-tight">${course.title}</span>
            <span class="text-xs text-slate-400 font-normal">${course.category}</span>
          </div>
        </td>
        <td class="p-4 text-slate-600 dark:text-slate-300 font-medium">${course.duration}</td>
        <td class="p-4 text-slate-600 dark:text-slate-300 font-black">${course.price} ETB</td>
        <td class="p-4 text-teal-600 dark:text-teal-400 font-bold">${course.students}</td>
        <td class="p-4">
          <div class="flex items-center gap-2">
            <button onclick="openEditCourseModal('${course.id}')" class="px-2.5 py-1.5 bg-sky-500/10 hover:bg-sky-500 text-sky-600 dark:text-sky-400 hover:text-white text-xs font-bold rounded-lg transition-all cursor-pointer">Edit</button>
            <button onclick="deleteCourseFromAdmin('${course.id}')" class="px-2.5 py-1.5 bg-rose-500/10 hover:bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white text-xs font-bold rounded-lg transition-all cursor-pointer">Delete</button>
          </div>
        </td>
      </tr>
    `;
  });

  container.innerHTML = html || `<tr><td colspan="5" class="p-8 text-center text-slate-500">No courses in database.</td></tr>`;
}

function renderAdminEnrollments() {
  const container = document.getElementById("admin-enrollments-list");
  if (!container) return;

  const enrollments = getEnrollmentsFromDB();
  let html = "";

  // Sort: pending first, then chronologically newest
  const sortedEnrollments = [...enrollments].sort((a, b) => {
    if (a.status === "Pending" && b.status !== "Pending") return -1;
    if (a.status !== "Pending" && b.status === "Pending") return 1;
    return new Date(b.enrollDate) - new Date(a.enrollDate);
  });

  sortedEnrollments.forEach(enroll => {
    const isPending = enroll.status === "Pending";
    const badgeColor = enroll.status === "Approved" ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" : "bg-amber-500/15 text-amber-600 dark:text-amber-400";
    const dateFormatted = new Date(enroll.enrollDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

    let actionButtons = "";
    if (isPending) {
      actionButtons = `
        <button onclick="approveEnrollment('${enroll.id}')" class="px-2.5 py-1.5 bg-emerald-600 text-white hover:bg-emerald-700 text-xs font-bold rounded-lg transition-all cursor-pointer shadow-sm">Approve</button>
      `;
    }

    html += `
      <tr class="border-b border-slate-200/50 dark:border-slate-800/80 hover:bg-slate-50/50 dark:hover:bg-slate-900/10 transition-colors">
        <td class="p-4">
          <span class="block font-bold text-slate-800 dark:text-slate-100">${enroll.studentName}</span>
          <span class="block text-xs text-slate-400 font-mono">${enroll.studentPhone} | ${enroll.studentEmail}</span>
        </td>
        <td class="p-4 text-slate-600 dark:text-slate-300 font-semibold">${enroll.courseTitle}</td>
        <td class="p-4 text-xs font-mono text-slate-400">${dateFormatted}</td>
        <td class="p-4 text-slate-800 dark:text-slate-100 font-bold">${enroll.price} ETB</td>
        <td class="p-4">
          <span class="px-2.5 py-1 text-xs font-bold rounded-full ${badgeColor}">${enroll.status}</span>
        </td>
        <td class="p-4 text-right">
          <div class="flex items-center justify-end gap-2">
            ${actionButtons}
            <button onclick="deleteEnrollment('${enroll.id}')" class="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-500/10 transition-all cursor-pointer" title="Delete record">
              ✕
            </button>
          </div>
        </td>
      </tr>
    `;
  });

  container.innerHTML = html || `<tr><td colspan="6" class="p-8 text-center text-slate-500">No enrollment history found.</td></tr>`;
}

function renderAdminUsers() {
  const container = document.getElementById("admin-users-list");
  if (!container) return;

  const users = getUsersFromDB().filter(u => u.role !== "admin");
  let html = "";

  users.forEach(u => {
    const regDate = u.regDate ? new Date(u.regDate).toLocaleDateString() : "Prior";
    html += `
      <tr class="border-b border-slate-200/50 dark:border-slate-800/80 hover:bg-slate-50/50 dark:hover:bg-slate-900/10 transition-colors">
        <td class="p-4">
          <span class="block font-bold text-slate-800 dark:text-slate-100">${u.fullName}</span>
          <span class="block text-xs text-slate-400">@${u.username}</span>
        </td>
        <td class="p-4 text-slate-600 dark:text-slate-300">${u.email}</td>
        <td class="p-4 text-slate-600 dark:text-slate-300">${u.phone}</td>
        <td class="p-4 text-xs text-slate-400 font-mono">${regDate}</td>
        <td class="p-4">
          <button onclick="removeStudentFromSystem('${u.username}')" class="px-2 py-1 bg-rose-500/10 hover:bg-rose-600 text-rose-600 hover:text-white text-xs font-bold rounded-lg transition-all cursor-pointer">Remove</button>
        </td>
      </tr>
    `;
  });

  container.innerHTML = html || `<tr><td colspan="5" class="p-8 text-center text-slate-500">No registered students found.</td></tr>`;
}

// Window actions to be called from onclick attributes in table rendering
window.approveEnrollment = function(id) {
  const enrolls = getEnrollmentsFromDB();
  const index = enrolls.findIndex(e => e.id === id);
  if (index !== -1) {
    enrolls[index].status = "Approved";
    saveEnrollmentsToDB(enrolls);
    showToast("Enrollment approved!", "success");
    renderAdminStats();
    renderAdminEnrollments();
  }
};

window.deleteEnrollment = function(id) {
  if (!confirm("Are you sure you want to delete this enrollment record?")) return;
  const enrolls = getEnrollmentsFromDB();
  const filtered = enrolls.filter(e => e.id !== id);
  saveEnrollmentsToDB(filtered);
  showToast("Record deleted successfully.", "success");
  renderAdminStats();
  renderAdminEnrollments();
};

window.removeStudentFromSystem = function(username) {
  if (!confirm("Remove this student from the system?")) return;
  const users = getUsersFromDB();
  const filtered = users.filter(u => u.username !== username);
  saveUsersToDB(filtered);
  showToast("Student profile removed.", "success");
  renderAdminStats();
  renderAdminUsers();
};

window.deleteCourseFromAdmin = function(id) {
  if (!confirm("Warning: Deleting this course will remove it from the catalog. Confirm?")) return;
  const courses = getCoursesFromDB();
  const filtered = courses.filter(c => c.id !== id);
  saveCoursesToDB(filtered);
  showToast("Course successfully deleted.", "success");
  renderAdminStats();
  renderAdminCourses();
};

function setupAdminModals() {
  const addCourseBtn = document.getElementById("add-course-trigger");
  const addModal = document.getElementById("add-course-modal");
  const editModal = document.getElementById("edit-course-modal");
  const addForm = document.getElementById("add-course-form");
  const editForm = document.getElementById("edit-course-form");

  // Close buttons
  const closes = document.querySelectorAll(".close-admin-modal");

  if (addCourseBtn && addModal) {
    addCourseBtn.addEventListener("click", () => {
      addModal.classList.add("active");
    });
  }

  closes.forEach(c => {
    c.addEventListener("click", () => {
      if (addModal) addModal.classList.remove("active");
      if (editModal) editModal.classList.remove("active");
    });
  });

  // Handle Create Course Submission
  if (addForm) {
    addForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const title = document.getElementById("add-title").value;
      const category = document.getElementById("add-category").value;
      const desc = document.getElementById("add-desc").value;
      const duration = document.getElementById("add-duration").value;
      const priceVal = document.getElementById("add-price").value;
      const imgUrl = document.getElementById("add-img").value || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80";

      if (!title || !category || !desc || !duration || !priceVal) {
        showToast("Please fill in all course information fields.", "error");
        return;
      }

      const courses = getCoursesFromDB();
      const customId = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

      const newCourse = {
        id: customId,
        title,
        description: desc,
        rating: 4.8,
        reviews: 1,
        instructor: "Amanuel",
        duration,
        price: parseInt(priceVal) || 200,
        students: 0,
        image: imgUrl,
        category,
        benefits: [
          "Hands-on practice assignments",
          "Dedicated one-on-one help from Amanuel",
          "Official certificate of completion",
          "Lifetime study assets access"
        ],
        curriculum: [
          "Core introduction module",
          "Middle-level core concepts",
          "Syllabus hands-on practice session",
          "Deployment capstone project evaluation"
        ]
      };

      courses.push(newCourse);
      saveCoursesToDB(courses);
      showToast("Course created successfully!", "success");

      addForm.reset();
      addModal.classList.remove("active");
      renderAdminStats();
      renderAdminCourses();
    });
  }

  // Handle Edit Course Submission
  if (editForm) {
    editForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const editId = document.getElementById("edit-course-id").value;
      const title = document.getElementById("edit-title").value;
      const category = document.getElementById("edit-category").value;
      const desc = document.getElementById("edit-desc").value;
      const duration = document.getElementById("edit-duration").value;
      const priceVal = document.getElementById("edit-price").value;
      const imgUrl = document.getElementById("edit-img").value;

      if (!title || !category || !desc || !duration || !priceVal) {
        showToast("Please fill in all course fields.", "error");
        return;
      }

      const courses = getCoursesFromDB();
      const index = courses.findIndex(c => c.id === editId);

      if (index !== -1) {
        courses[index] = {
          ...courses[index],
          title,
          category,
          description: desc,
          duration,
          price: parseInt(priceVal) || 200,
          image: imgUrl || courses[index].image
        };

        saveCoursesToDB(courses);
        showToast("Course updated successfully!", "success");

        editModal.classList.remove("active");
        renderAdminStats();
        renderAdminCourses();
      }
    });
  }
}

window.openEditCourseModal = function(id) {
  const courses = getCoursesFromDB();
  const course = courses.find(c => c.id === id);

  if (course) {
    document.getElementById("edit-course-id").value = course.id;
    document.getElementById("edit-title").value = course.title;
    document.getElementById("edit-category").value = course.category;
    document.getElementById("edit-desc").value = course.description;
    document.getElementById("edit-duration").value = course.duration;
    document.getElementById("edit-price").value = course.price;
    document.getElementById("edit-img").value = course.image;

    const editModal = document.getElementById("edit-course-modal");
    if (editModal) {
      editModal.classList.add("active");
    }
  }
};


// ==========================================
// 7. MAIN ENGINE BOOTSTRAP
// ==========================================

function bootstrap() {
  // Page Loader Fadeout
  const loader = document.getElementById("page-loader");
  if (loader) {
    setTimeout(() => {
      loader.style.opacity = "0";
      setTimeout(() => {
        loader.style.visibility = "hidden";
      }, 400);
    }, 300);
  }

  // Init utilities
  initTheme();
  setupNavigation();

  // Scroll to top controller
  const scrollBtn = document.getElementById("scroll-to-top");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollBtn?.classList.add("show");
    } else {
      scrollBtn?.classList.remove("show");
    }
  });

  if (scrollBtn) {
    scrollBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Theme Toggle click registration
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".theme-toggle-btn");
    if (btn) {
      toggleTheme();
    }
  });

  // Load specific page flows
  const path = window.location.pathname;
  let page = path.split("/").pop() || "";

  // Normalize page name by stripping .html if present
  const cleanPage = page.replace(".html", "");

  if (cleanPage === "courses") {
    initCoursesPage();
  } else if (cleanPage === "course-details") {
    initCourseDetailsPage();
  } else if (cleanPage === "enroll") {
    initEnrollmentPage();
  } else if (cleanPage === "admin") {
    initAdminPage();
  } else {
    // If empty, index, index.html, or anything else (like the repo name on GitHub Pages root)
    initHomePage();
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", bootstrap);
} else {
  bootstrap();
}

// Expose core engines globally for inline page scripts
window.loginUser = loginUser;
window.registerUser = registerUser;
window.getCurrentUser = getCurrentUser;
window.showToast = showToast;

// Global safe image loader/fallback system
window.handleImageError = function(img) {
  img.onerror = null; // Prevent infinite loop in case fallback also fails
  img.src = "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=80";
};
