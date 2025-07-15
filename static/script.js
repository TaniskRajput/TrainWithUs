// Global Variables
let currentTimer = null;
let timerInterval = null;
let timerStartTime = 0;
let timerDuration = 0;
let timerPaused = false;

// Motivational Quotes
const motivationalQuotes = [
    "The only bad workout is the one that didn't happen.",
    "Your body can do it. It's your mind you have to convince.",
    "Success is the sum of small efforts repeated day in and day out.",
    "Don't wish for a good body, work for it.",
    "The pain you feel today will be the strength you feel tomorrow.",
    "Every workout is progress, no matter how small.",
    "Strong is the new beautiful.",
    "Fitness is not about being better than someone else. It's about being better than you used to be.",
    "The hardest lift of all is lifting your butt off the couch.",
    "Sweat is fat crying.",
    "Your only limit is you.",
    "Champions train, losers complain.",
    "Make yourself proud.",
    "Progress, not perfection.",
    "Believe in yourself and all that you are.",
    "You are stronger than your excuses.",
    "Every rep counts.",
    "Mind over matter.",
    "Turn your setbacks into comebacks.",
    "Consistency is key to achieving your goals."
];
// Daily Quote System
function setupDailyQuote() {
    const quoteElement = document.getElementById('daily-quote');
    if (quoteElement) {
        const today = new Date().toDateString();
        const savedQuote = localStorage.getItem('dailyQuote');
        const savedDate = localStorage.getItem('quoteDate');
        
        if (savedQuote && savedDate === today) {
            quoteElement.textContent = savedQuote;
        } else {
            const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
            quoteElement.textContent = randomQuote;
            localStorage.setItem('dailyQuote', randomQuote);
            localStorage.setItem('quoteDate', today);
        }
    }
}
  const cards = document.querySelectorAll(".testimonial-card");
    let current = 0;

    function showCard(index) {
        cards.forEach((card, i) => {
            card.classList.remove("active");
        });
        cards[index].classList.add("active");
    }

    document.getElementById("nextBtn").addEventListener("click", () => {
        current = (current + 1) % cards.length;
        showCard(current);
    });

    document.getElementById("prevBtn").addEventListener("click", () => {
        current = (current - 1 + cards.length) % cards.length;
        showCard(current);
    });

    // ✅ show the first card on load
    showCard(current);
// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});
document.addEventListener('DOMContentLoaded', function () {
    setupDailyQuote();
});

// Initialize App
function initializeApp() {
    setupNavigation();
    setupThemeToggle();
    setupMobileMenu();
    setupDailyQuote();
    setupWorkoutTimers();
    setupSchedule();
    setupScrollAnimations();
    setupContactForm();
    loadUserProgress();
}

// Navigation System
document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll(".section");
    const ctaButton = document.querySelector(".cta-button");

    navLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            const isProtected = link.classList.contains("protected");
            const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

            // 🔒 Handle protected links
            if (isProtected && !isLoggedIn) {
                e.preventDefault(); // ⛔ Stop default navigation
                alert("❌ You must log in first to access this section.");
                window.location.href = "/login";
                return;
            }

            // ✅ Handle in-page section navigation
            const targetSection = link.getAttribute("data-section");
            if (targetSection) {
                e.preventDefault(); // ⛔ Stop anchor default
                showSection(targetSection);
                updateActiveNavLink(this);
            }

            // Close mobile nav
            document.getElementById("nav-menu").classList.remove("active");
            document.getElementById("hamburger").classList.remove("active");
        });
    });
    });

//     // 🔒 Optional: CTA button protection
//     if (ctaButton) {
//         ctaButton.addEventListener("click", function () {
//             const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
//             if (!isLoggedIn) {
//                 alert("⚠️ Please login to start your journey.");
//                 window.location.href = "/login";
//                 return;
//             }
//             showSection("workouts");
//             updateActiveNavLink(document.querySelector('[data-section="workouts"]'));
//         });
//     }



function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        
        // Trigger animations for tips section
        if (sectionId === 'tips') {
            triggerTipAnimations();
        }
    }
}

function updateActiveNavLink(activeLink) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    activeLink.classList.add('active');
}
function showModal(id) {
    document.getElementById(id).style.display = "block";
    document.body.classList.add("modal-open");
}

function closeModal(id) {
    document.getElementById(id).style.display = "none";
    document.body.classList.remove("modal-open");
}


function updateThemeToggleIcon(theme) {
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
}
// Theme Toggle System
function setupThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Set initial theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeToggleIcon(currentTheme);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeToggleIcon(newTheme);
    });
}
// document.addEventListener("DOMContentLoaded", () => {
//   const protectedLinks = document.querySelectorAll("a.protected");

//   protectedLinks.forEach(link => {
//     link.addEventListener("click", function (e) {
//       const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

//       if (!isLoggedIn) {
//         e.preventDefault();
//         alert("🚫 Please log in to access this section.");

//         // Try modal or fallback to login page
//         const modal = document.getElementById("loginModal");
//         if (modal) {
//           modal.style.display = "block";
//         } else {
//           window.location.href = "/login";
//         }
//       }
//     });
//   });
// });
// document.addEventListener("DOMContentLoaded", () => {
//   const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
//   const loginBtn = document.querySelector(".login-btn");

//   if (isLoggedIn && loginBtn) {
//     loginBtn.textContent = "Profile";
//     loginBtn.href = "/profile";  // Or your actual profile route
//   }
// });
// Mobile Menu
function setupMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}
 // Modal functionality
        function showModal(modalId) {
            // Close all modals first
            const modals = document.querySelectorAll('.modal');
            modals.forEach(modal => modal.style.display = 'none');
            
            // Show the requested modal
            document.getElementById(modalId).style.display = 'block';
            
            // Clear any previous messages
            const messages = document.querySelectorAll('.message');
            messages.forEach(msg => {
                msg.style.display = 'none';
                msg.className = 'message';
            });
        }

        function closeModal(modalId) {
            document.getElementById(modalId).style.display = 'none';
        }

        // Show message function
        function showMessage(messageId, text, type) {
            const messageEl = document.getElementById(messageId);
            messageEl.textContent = text;
            messageEl.className = `message ${type}`;
            messageEl.style.display = 'block';
        }

        // Login button click
        document.getElementById('login-btn').addEventListener('click', function() {
            showModal('loginModal');
        });

        // Close modal when clicking outside
        window.addEventListener('click', function(event) {
            const modals = document.querySelectorAll('.modal');
            modals.forEach(modal => {
                if (event.target === modal) {
                    modal.style.display = 'none';
                }
            });
        });

        // Form submissions
        document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            // Simple validation
            if (!email || !password) {
                showMessage('loginMessage', 'Please fill in all fields', 'error');
                return;
            }
            
            // Simulate login process
            showMessage('loginMessage', 'Logging in...', 'success');
            
            setTimeout(() => {
                showMessage('loginMessage', 'Login successful! Welcome back!', 'success');
                setTimeout(() => {
                    closeModal('loginModal');
                    // Here you would typically redirect or update the UI
                }, 1500);
            }, 1000);
        });

        document.getElementById('signupForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('signupName').value;
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            // Validation
            if (!name || !email || !password || !confirmPassword) {
                showMessage('signupMessage', 'Please fill in all fields', 'error');
                return;
            }
            
            if (password !== confirmPassword) {
                showMessage('signupMessage', 'Passwords do not match', 'error');
                return;
            }
            
            if (password.length < 6) {
                showMessage('signupMessage', 'Password must be at least 6 characters', 'error');
                return;
            }
            
            // Simulate signup process
            showMessage('signupMessage', 'Creating your account...', 'success');
            
            setTimeout(() => {
                showMessage('signupMessage', 'Account created successfully! Please login.', 'success');
                setTimeout(() => {
                    showModal('loginModal');
                }, 1500);
            }, 1000);
        });

        document.getElementById('forgotForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('forgotEmail').value;
            
            if (!email) {
                showMessage('forgotMessage', 'Please enter your email address', 'error');
                return;
            }
            
            // Simulate password reset process
            showMessage('forgotMessage', 'Sending reset link...', 'success');
            
            setTimeout(() => {
                showMessage('forgotMessage', 'Reset link sent! Check your email.', 'success');
                setTimeout(() => {
                    showModal('loginModal');
                }, 2000);
            }, 1000);
        });


//youtube link
   function handleClick(event) {
            // You can replace this URL with your actual YouTube link
            const youtubeUrl = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
            
            // Optional: Add some feedback
            console.log("Redirecting to:", youtubeUrl);
            
            // The link will naturally redirect due to the href attribute
            // This function is here if you need to add any additional logic
        }

        // Add some extra interactivity
        document.querySelector('.tutorial-btn').addEventListener('mouseenter', function() {
            this.style.setProperty('--glow', '0 0 20px rgba(255, 107, 107, 0.6)');
        });

        document.querySelector('.tutorial-btn').addEventListener('mouseleave', function() {
            this.style.setProperty('--glow', 'none');
        });
// Workout Timer System
function setupWorkoutTimers() {
    const timerButtons = document.querySelectorAll('.timer-btn');
    const timerModal = document.getElementById('timer-modal');
    const timerDisplay = document.getElementById('timer-display');
    const timerExercise = document.getElementById('timer-exercise');
    const startPauseBtn = document.getElementById('start-pause-btn');
    const resetBtn = document.getElementById('reset-btn');
    const closeTimerBtn = document.getElementById('close-timer');
    
    timerButtons.forEach(button => {
        button.addEventListener('click', function() {
            const duration = parseInt(this.getAttribute('data-time'));
            const exerciseCard = this.closest('.workout-card');
            const exerciseName = exerciseCard.querySelector('h3').textContent;
            
            openTimer(exerciseName, duration);
        });
    });
    
    startPauseBtn.addEventListener('click', toggleTimer);
    resetBtn.addEventListener('click', resetTimer);
    closeTimerBtn.addEventListener('click', closeTimer);
    
    // Close modal when clicking outside
    timerModal.addEventListener('click', function(e) {
        if (e.target === timerModal) {
            closeTimer();
        }
    });
}

function openTimer(exerciseName, duration) {
    const timerModal = document.getElementById('timer-modal');
    const timerExercise = document.getElementById('timer-exercise');
    const startPauseBtn = document.getElementById('start-pause-btn');
    
    timerExercise.textContent = exerciseName;
    timerDuration = duration;
    currentTimer = duration;
    timerPaused = false;
    
    updateTimerDisplay();
    startPauseBtn.textContent = 'Start';
    timerModal.classList.add('active');
}

function toggleTimer() {
    const startPauseBtn = document.getElementById('start-pause-btn');
    
    if (timerInterval) {
        // Pause timer
        clearInterval(timerInterval);
        timerInterval = null;
        timerPaused = true;
        startPauseBtn.textContent = 'Resume';
    } else {
        // Start/Resume timer
        if (!timerPaused) {
            timerStartTime = Date.now();
        } else {
            timerStartTime = Date.now() - (timerDuration - currentTimer) * 1000;
        }
        
        timerInterval = setInterval(updateTimer, 100);
        startPauseBtn.textContent = 'Pause';
        timerPaused = false;
    }
}

function updateTimer() {
    const elapsed = (Date.now() - timerStartTime) / 1000;
    currentTimer = Math.max(0, timerDuration - elapsed);
    
    updateTimerDisplay();
    
    if (currentTimer <= 0) {
        // Timer finished
        clearInterval(timerInterval);
        timerInterval = null;
        playTimerAlert();
        document.getElementById('start-pause-btn').textContent = 'Finished!';
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    currentTimer = timerDuration;
    timerPaused = false;
    updateTimerDisplay();
    document.getElementById('start-pause-btn').textContent = 'Start';
}

function closeTimer() {
    const timerModal = document.getElementById('timer-modal');
    clearInterval(timerInterval);
    timerInterval = null;
    timerModal.classList.remove('active');
}

function updateTimerDisplay() {
    const timerDisplay = document.getElementById('timer-display');
    const minutes = Math.floor(currentTimer / 60);
    const seconds = Math.floor(currentTimer % 60);
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function playTimerAlert() {
    // Create audio context for timer alert
    if ('AudioContext' in window || 'webkitAudioContext' in window) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const audioContext = new AudioContext();
        
        // Create a simple beep sound
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 1);
    }
}

// // Schedule System
// function setupSchedule() {
//     const scheduleDays = document.querySelectorAll('.schedule-day');
//     const dayCheckboxes = document.querySelectorAll('.day-checkbox');
    
//     // Toggle day content
//     scheduleDays.forEach(day => {
//         const header = day.querySelector('.day-header');
//         header.addEventListener('click', function(e) {
//             if (e.target.type !== 'checkbox') {
//                 day.classList.toggle('active');
//             }
//         });
//     });
    
//     // Handle checkbox changes
//     dayCheckboxes.forEach(checkbox => {
//         checkbox.addEventListener('change', function() {
//             saveScheduleProgress();
//         });
//     });
    
//     // Load saved progress
//     loadScheduleProgress();
// }

// function saveScheduleProgress() {
//     const checkboxes = document.querySelectorAll('.day-checkbox');
//     const progress = {};
    
//     checkboxes.forEach(checkbox => {
//         progress[checkbox.id] = checkbox.checked;
//     });
    
//     localStorage.setItem('scheduleProgress', JSON.stringify(progress));
// }

// function loadScheduleProgress() {
//     const savedProgress = localStorage.getItem('scheduleProgress');
//     if (savedProgress) {
//         const progress = JSON.parse(savedProgress);
        
//         Object.keys(progress).forEach(checkboxId => {
//             const checkbox = document.getElementById(checkboxId);
//             if (checkbox) {
//                 checkbox.checked = progress[checkboxId];
//             }
//         });
//     }
// }

// Scroll Animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe tip cards
    const tipCards = document.querySelectorAll('.tip-card');
    tipCards.forEach(card => {
        observer.observe(card);
    });
}

function triggerTipAnimations() {
    const tipCards = document.querySelectorAll('.tip-card');
    tipCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('fade-in');
        }, index * 200);
    });
}

// Contact Form System
function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const messageField = document.getElementById('message');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            submitForm();
        }
    });
    
    // Real-time validation
    nameField.addEventListener('blur', () => validateField('name'));
    emailField.addEventListener('blur', () => validateField('email'));
    messageField.addEventListener('blur', () => validateField('message'));
}

function validateForm() {
    let isValid = true;
    
    isValid = validateField('name') && isValid;
    isValid = validateField('email') && isValid;
    isValid = validateField('message') && isValid;
    
    return isValid;
}

function validateField(fieldName) {
    const field = document.getElementById(fieldName);
    const errorElement = document.getElementById(`${fieldName}-error`);
    let isValid = true;
    let errorMessage = '';
    
    // Clear previous error state
    field.classList.remove('error');
    errorElement.classList.remove('show');
    
    switch (fieldName) {
        case 'name':
            if (!field.value.trim()) {
                errorMessage = 'Name is required';
                isValid = false;
            } else if (field.value.trim().length < 2) {
                errorMessage = 'Name must be at least 2 characters';
                isValid = false;
            }
            break;
            
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!field.value.trim()) {
                errorMessage = 'Email is required';
                isValid = false;
            } else if (!emailRegex.test(field.value.trim())) {
                errorMessage = 'Please enter a valid email address';
                isValid = false;
            }
            break;
            
        case 'message':
            if (!field.value.trim()) {
                errorMessage = 'Message is required';
                isValid = false;
            } else if (field.value.trim().length < 10) {
                errorMessage = 'Message must be at least 10 characters';
                isValid = false;
            }
            break;
    }
    
    if (!isValid) {
        field.classList.add('error');
        errorElement.textContent = errorMessage;
        errorElement.classList.add('show');
    }
    
    return isValid;
}

function submitForm() {
    const submitBtn = document.querySelector('.submit-btn');
    const formSuccess = document.getElementById('form-success');
    const form = document.getElementById('contact-form');
    
    // Show loading state
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    form.classList.add('loading');
    
    // Simulate form submission
    setTimeout(() => {
        // Reset form
        form.reset();
        
        // Show success message
        formSuccess.classList.add('show');
        
        // Reset button
        submitBtn.textContent = 'Send Message';
        submitBtn.disabled = false;
        form.classList.remove('loading');
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            formSuccess.classList.remove('show');
        }, 5000);
    }, 2000);
}

// User Progress System
function loadUserProgress() {
    // Load any saved user preferences or progress
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeToggleIcon(savedTheme);
    }
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Keyboard Navigation Support
document.addEventListener('keydown', function(e) {
    // Close timer modal with Escape key
    if (e.key === 'Escape') {
        const timerModal = document.getElementById('timer-modal');
        if (timerModal.classList.contains('active')) {
            closeTimer();
        }
    }
    
    // Start/pause timer with spacebar when modal is open
    if (e.key === ' ' || e.key === 'Spacebar') {
        const timerModal = document.getElementById('timer-modal');
        if (timerModal.classList.contains('active')) {
            e.preventDefault();
            toggleTimer();
        }
    }
});

// Handle page visibility changes (pause timer when tab is hidden)
document.addEventListener('visibilitychange', function() {
    if (document.hidden && timerInterval) {
        // Page is hidden, pause timer
        toggleTimer();
    }
});

// Performance optimization: lazy loading for images (if added later)
function setupLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}
// function showLogin() {
//             hideAllPages();
//             document.getElementById('login-page').classList.add('active');
//         }

//         function showSignup() {
//             hideAllPages();
//             document.getElementById('signup-page').classList.add('active');
//         }

//         function showForgotPassword() {
//             hideAllPages();
//             document.getElementById('forgot-password-page').classList.add('active');
//         }

//         function hideAllPages() {
//             document.getElementById('home-page').style.display = 'none';
//             document.querySelectorAll('.auth-page').forEach(page => {
//                 page.classList.remove('active');
//             });
//         }

//         // Password Toggle
//         function togglePassword(inputId, button) {
//             const input = document.getElementById(inputId);
//             if (input.type === 'password') {
//                 input.type = 'text';
//                 button.textContent = '🙈';
//             } else {
//                 input.type = 'password';
//                 button.textContent = '👁️';
//             }
//         }

//         // Form Handlers
//         document.getElementById('login-form').addEventListener('submit', function(e) {
//             e.preventDefault();
//             const email = document.getElementById('login-email').value;
//             const phone = document.getElementById('login-phone').value;
            
//             if (email && phone) {
//                 showMessage('login-success', 'Login successful! Welcome back!');
//                 // Here you would typically send data to your backend
//                 setTimeout(() => {
//                     showHome();
//                 }, 2000);
//             } else {
//                 showMessage('login-error', 'Please fill in all required fields.');
//             }
//         });

//         document.getElementById('signup-form').addEventListener('submit', function(e) {
//             e.preventDefault();
//             const name = document.getElementById('signup-name').value;
//             const email = document.getElementById('signup-email').value;
//             const phone = document.getElementById('signup-phone').value;
//             const password = document.getElementById('signup-password').value;
//             const confirmPassword = document.getElementById('signup-confirm-password').value;
            
//             if (password !== confirmPassword) {
//                 showMessage('signup-error', 'Passwords do not match!');
//                 return;
//             }
            
//             if (name && email && phone && password) {
//                 showMessage('signup-success', 'Account created successfully! You can now sign in.');
//                 // Here you would typically send data to your backend
//                 setTimeout(() => {
//                     showLogin();
//                 }, 2000);
//             } else {
//                 showMessage('signup-error', 'Please fill in all required fields.');
//             }
//         });

//         document.getElementById('forgot-form').addEventListener('submit', function(e) {
//             e.preventDefault();
//             const email = document.getElementById('forgot-email').value;
//             const phone = document.getElementById('forgot-phone').value;
            
//             if (email || phone) {
//                 showMessage('forgot-success', 'Password reset link has been sent! Please check your email or SMS.');
//                 // Here you would typically send data to your backend
//                 setTimeout(() => {
//                     showLogin();
//                 }, 3000);
//             } else {
//                 showMessage('forgot-error', 'Please enter either your email or phone number.');
//             }
//         });

//         function showMessage(elementId, message) {
//             const element = document.getElementById(elementId);
//             element.textContent = message;
//             element.style.display = 'block';
            
//             // Hide other messages
//             const isSuccess = elementId.includes('success');
//             const otherType = isSuccess ? 'error' : 'success';
//             const pagePrefix = elementId.split('-')[0];
//             document.getElementById(pagePrefix + '-' + otherType).style.display = 'none';
            
//             // Auto hide after 5 seconds
//             setTimeout(() => {
//                 element.style.display = 'none';
//             }, 5000);
//         }


// // Error handling
// window.addEventListener('error', function(e) {
//     console.error('Application error:', e.error);
//     // You could implement user-friendly error reporting here
// });



