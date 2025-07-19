// Dashboard Specific JavaScript

// Profile dropdown toggle
const memberProfile = document.getElementById('member-profile');
const profileDropdown = document.getElementById('profile-dropdown');

if (memberProfile && profileDropdown) {
    memberProfile.addEventListener('click', (e) => {
        e.stopPropagation();
        memberProfile.classList.toggle('active');
        profileDropdown.classList.toggle('active');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', () => {
        memberProfile.classList.remove('active');
        profileDropdown.classList.remove('active');
    });
}

// Floating Action Button
const fabMain = document.getElementById('fab-main');
const fabMenu = document.getElementById('fab-menu');

if (fabMain && fabMenu) {
    fabMain.addEventListener('click', () => {
        fabMain.classList.toggle('active');
        fabMenu.classList.toggle('active');
    });

    // Handle FAB menu item clicks
    const fabItems = document.querySelectorAll('.fab-item');
    fabItems.forEach(item => {
        item.addEventListener('click', () => {
            const action = item.getAttribute('data-action');
            handleFabAction(action);
            
            // Close FAB menu
            fabMain.classList.remove('active');
            fabMenu.classList.remove('active');
        });
    });
}

// Handle FAB actions
function handleFabAction(action) {
    switch(action) {
        case 'workout':
            showWorkoutModal();
            break;
        case 'class':
            showClassBookingModal();
            break;
        case 'meal':
            showMealLoggingModal();
            break;
        case 'progress':
            showProgressPhotoModal();
            break;
        default:
            console.log('Unknown action:', action);
    }
}

// Mock functions for FAB actions
function showWorkoutModal() {
    alert('Start Workout feature coming soon!');
}

function showClassBookingModal() {
    alert('Class booking feature coming soon!');
}

function showMealLoggingModal() {
    alert('Meal logging feature coming soon!');
}

function showProgressPhotoModal() {
    alert('Progress photo feature coming soon!');
}

// Book class functionality
const bookButtons = document.querySelectorAll('.book-btn');
bookButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const originalText = button.textContent;
        button.textContent = 'Booking...';
        button.disabled = true;
        
        // Simulate booking process
        setTimeout(() => {
            button.textContent = 'Booked!';
            button.style.background = '#4CAF50';
            
            setTimeout(() => {
                button.textContent = originalText;
                button.disabled = false;
                button.style.background = '';
            }, 2000);
        }, 1500);
    });
});

// Quick action buttons
const actionButtons = document.querySelectorAll('.action-btn');
actionButtons.forEach(button => {
    button.addEventListener('click', () => {
        const action = button.querySelector('span').textContent.toLowerCase();
        handleQuickAction(action);
    });
});

function handleQuickAction(action) {
    switch(action) {
        case 'start workout':
            showWorkoutModal();
            break;
        case 'book class':
            showClassBookingModal();
            break;
        case 'book trainer':
            alert('Personal trainer booking feature coming soon!');
            break;
        case 'meal plan':
            alert('Meal planning feature coming soon!');
            break;
        case 'progress photo':
            showProgressPhotoModal();
            break;
        case 'community':
            alert('Community features coming soon!');
            break;
        default:
            console.log('Unknown quick action:', action);
    }
}

// Animate dashboard widgets on load
function animateDashboardWidgets() {
    const widgets = document.querySelectorAll('.dashboard-widget');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    widgets.forEach(widget => {
        widget.style.opacity = '0';
        widget.style.transform = 'translateY(30px)';
        widget.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(widget);
    });
}

// Initialize dashboard animations
animateDashboardWidgets();

// Simulate real-time data updates
function updateDashboardData() {
    // Update calories burned
    const caloriesElement = document.querySelector('.stat-number');
    if (caloriesElement && caloriesElement.textContent === '847') {
        let calories = 847;
        setInterval(() => {
            calories += Math.floor(Math.random() * 3);
            caloriesElement.textContent = calories.toString();
        }, 30000); // Update every 30 seconds
    }
    
    // Update progress bars with animation
    const progressBars = document.querySelectorAll('.progress-fill, .macro-fill');
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });
}

// Initialize real-time updates
setTimeout(updateDashboardData, 1000);

// Chart.js integration for workout progress (if Chart.js is available)
function initializeWorkoutChart() {
    const canvas = document.getElementById('workoutChart');
    if (canvas && typeof Chart !== 'undefined') {
        const ctx = canvas.getContext('2d');
        
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Workouts',
                    data: [1, 0, 1, 1, 0, 1, 1],
                    borderColor: '#D4AF37',
                    backgroundColor: 'rgba(212, 175, 55, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 2,
                        ticks: {
                            stepSize: 1
                        }
                    }
                }
            }
        });
    } else {
        // Fallback: Create a simple visual representation
        if (canvas) {
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = '#D4AF37';
            ctx.fillRect(0, 150, 50, 50);
            ctx.fillRect(100, 100, 50, 100);
            ctx.fillRect(200, 120, 50, 80);
            ctx.fillRect(300, 80, 50, 120);
            ctx.fillRect(400, 140, 50, 60);
            
            ctx.fillStyle = '#333333';
            ctx.font = '14px Montserrat';
            ctx.textAlign = 'center';
            ctx.fillText('Weekly Workout Progress', 200, 30);
        }
    }
}

// Initialize chart
setTimeout(initializeWorkoutChart, 500);

// Time filter functionality
const timeFilter = document.querySelector('.time-filter');
if (timeFilter) {
    timeFilter.addEventListener('change', (e) => {
        const period = e.target.value;
        updateProgressData(period);
    });
}

function updateProgressData(period) {
    // Simulate data update based on time period
    const summaryValues = document.querySelectorAll('.summary-value');
    
    const data = {
        'This Week': ['24', '52 min', '8,420'],
        'This Month': ['96', '48 min', '32,800'],
        'This Year': ['1,152', '51 min', '394,560']
    };
    
    if (data[period]) {
        summaryValues.forEach((value, index) => {
            if (data[period][index]) {
                value.textContent = data[period][index];
            }
        });
    }
}

// Nutrition circle progress animation
function animateNutritionCircle() {
    const circle = document.querySelector('.circle-progress');
    if (circle) {
        const progress = circle.getAttribute('data-progress') || 68;
        const degrees = (progress / 100) * 360;
        
        circle.style.background = `conic-gradient(#D4AF37 0deg ${degrees}deg, #f0f0f0 ${degrees}deg 360deg)`;
    }
}

// Initialize nutrition circle
setTimeout(animateNutritionCircle, 1000);

// Goal progress animation
function animateGoalProgress() {
    const progressFills = document.querySelectorAll('.goal-item .progress-fill');
    
    progressFills.forEach(fill => {
        const width = fill.style.width;
        fill.style.width = '0%';
        
        setTimeout(() => {
            fill.style.width = width;
        }, 800);
    });
}

// Initialize goal progress animation
setTimeout(animateGoalProgress, 1200);

// Add meal functionality
const addMealBtn = document.querySelector('.nutrition-widget .widget-action');
if (addMealBtn) {
    addMealBtn.addEventListener('click', () => {
        showMealLoggingModal();
    });
}

// Set goal functionality
const setGoalBtn = document.querySelector('.goals-widget .widget-action');
if (setGoalBtn) {
    setGoalBtn.addEventListener('click', () => {
        alert('Goal setting feature coming soon!');
    });
}

// Mobile menu functionality (reuse from main script)
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const navMenu = document.getElementById('nav-menu');

if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        });
    });
}

// Dashboard-specific smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Auto-refresh dashboard data every 5 minutes
setInterval(() => {
    console.log('Refreshing dashboard data...');
    // Here you would typically fetch new data from your API
    updateDashboardData();
}, 300000);

// Welcome message based on time of day
function updateWelcomeMessage() {
    const welcomeTitle = document.querySelector('.welcome-title');
    const welcomeSubtitle = document.querySelector('.welcome-subtitle');
    
    if (welcomeTitle && welcomeSubtitle) {
        const hour = new Date().getHours();
        let greeting, message;
        
        if (hour < 12) {
            greeting = 'Good morning';
            message = 'Ready to start your day strong?';
        } else if (hour < 17) {
            greeting = 'Good afternoon';
            message = 'Time for your midday energy boost?';
        } else {
            greeting = 'Good evening';
            message = 'Ready to finish strong today?';
        }
        
        welcomeTitle.innerHTML = `${greeting}, <span class="highlight">Sarah!</span>`;
        welcomeSubtitle.textContent = message;
    }
}

// Update welcome message on load
updateWelcomeMessage();

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Alt + W: Start workout
    if (e.altKey && e.key === 'w') {
        e.preventDefault();
        showWorkoutModal();
    }
    
    // Alt + C: Book class
    if (e.altKey && e.key === 'c') {
        e.preventDefault();
        showClassBookingModal();
    }
    
    // Alt + M: Log meal
    if (e.altKey && e.key === 'm') {
        e.preventDefault();
        showMealLoggingModal();
    }
});

// Add keyboard shortcut hints
function showKeyboardShortcuts() {
    console.log('Keyboard Shortcuts:');
    console.log('Alt + W: Start Workout');
    console.log('Alt + C: Book Class');
    console.log('Alt + M: Log Meal');
}

// Show shortcuts on first load
setTimeout(showKeyboardShortcuts, 2000);