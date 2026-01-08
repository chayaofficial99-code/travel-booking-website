// Main JavaScript File for Travel Booking Website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all modules
    initializeNavigation();
    initializeSearchFilter();
    initializeDestinationGrid();
    initializeBookingSystem();
    initializeReviews();
    initializeLanguageCurrency();
    initializeModals();
    initializeChat();
    initializeNewsletter();
    
    // Check for stored user data
    checkUserSession();
});

// Navigation Module
function initializeNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.innerHTML = navMenu.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
                
                // Close mobile menu
                navMenu.classList.remove('active');
                hamburger.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });
}

// Search & Filter Module
function initializeSearchFilter() {
    const searchBtn = document.getElementById('searchBtn');
    const destinationInput = document.getElementById('destination');
    const travelTypeSelect = document.getElementById('travelType');
    const budgetSelect = document.getElementById('budget');
    const tabBtns = document.querySelectorAll('.tab-btn');
    
    // Tab switching
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Update form based on selected tab
            const tab = btn.dataset.tab;
            updateSearchForm(tab);
        });
    });
    
    // Search functionality
    searchBtn.addEventListener('click', performSearch);
    
    // Real-time filtering for destination input
    destinationInput.addEventListener('input', debounce(filterDestinations, 300));
    travelTypeSelect.addEventListener('change', filterDestinations);
    budgetSelect.addEventListener('change', filterDestinations);
}

function updateSearchForm(tab) {
    const destinationInput = document.getElementById('destination');
    
    switch(tab) {
        case 'flights':
            destinationInput.placeholder = 'Flying to?';
            break;
        case 'hotels':
            destinationInput.placeholder = 'City or hotel name?';
            break;
        case 'packages':
            destinationInput.placeholder = 'Destination or package name?';
            break;
    }
}

function performSearch() {
    const destination = document.getElementById('destination').value;
    const checkin = document.getElementById('checkin').value;
    const checkout = document.getElementById('checkout').value;
    const travelType = document.getElementById('travelType').value;
    const budget = document.getElementById('budget').value;
    
    if (!destination) {
        alert('Please enter a destination');
        return;
    }
    
    // Show loading state
    const searchBtn = document.getElementById('searchBtn');
    const originalText = searchBtn.innerHTML;
    searchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Searching...';
    
    // Simulate API call
    setTimeout(() => {
        // Reset button
        searchBtn.innerHTML = originalText;
        
        // Show results
        showSearchResults({
            destination,
            checkin,
            checkout,
            travelType,
            budget
        });
    }, 1500);
}

function filterDestinations() {
    const destination = document.getElementById('destination').value.toLowerCase();
    const travelType = document.getElementById('travelType').value;
    const budget = document.getElementById('budget').value;
    
    const destinationCards = document.querySelectorAll('.destination-card');
    
    destinationCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const type = card.dataset.type;
        const price = parseInt(card.dataset.price);
        
        let matches = true;
        
        if (destination && !title.includes(destination)) {
            matches = false;
        }
        
        if (travelType && type !== travelType) {
            matches = false;
        }
        
        if (budget) {
            const [min, max] = budget.includes('+') 
                ? [parseInt(budget.replace('+', '')), Infinity]
                : budget.split('-').map(Number);
            
            if (price < min || price > max) {
                matches = false;
            }
        }
        
        card.style.display = matches ? 'block' : 'none';
    });
}

function showSearchResults(criteria) {
    // In a real application, this would fetch from an API
    // For demo, we'll just scroll to destinations and filter them
    const destinationsSection = document.getElementById('destinations');
    window.scrollTo({
        top: destinationsSection.offsetTop - 80,
        behavior: 'smooth'
    });
    
    // Apply filters
    document.getElementById('destination').value = criteria.destination;
    document.getElementById('travelType').value = criteria.travelType;
    document.getElementById('budget').value = criteria.budget;
    
    filterDestinations();
}

// Destination Grid Module
function initializeDestinationGrid() {
    const destinations = [
        {
            id: 1,
            name: "Bali, Indonesia",
            image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1",
            description: "Tropical paradise with beautiful beaches and temples",
            price: 899,
            type: "adventure",
            rating: 4.8
        },
        {
            id: 2,
            name: "Tokyo, Japan",
            image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf",
            description: "Modern city with rich culture and technology",
            price: 1299,
            type: "business",
            rating: 4.7
        },
        {
            id: 3,
            name: "Paris, France",
            image: "https://images.unsplash.com/photo-1502602897457-92b8ec8c44f1",
            description: "City of love with iconic landmarks",
            price: 1099,
            type: "luxury",
            rating: 4.9
        },
        {
            id: 4,
            name: "Dubai, UAE",
            image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c",
            description: "Luxury shopping and modern architecture",
            price: 1599,
            type: "luxury",
            rating: 4.6
        },
        {
            id: 5,
            name: "Maldives",
            image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8",
            description: "Pristine beaches and overwater bungalows",
            price: 1999,
            type: "luxury",
            rating: 4.9
        },
        {
            id: 6,
            name: "Cox's Bazar, Bangladesh",
            image: "https://images.unsplash.com/photo-1593693399740-5c6a7825a1d2",
            description: "World's longest natural sea beach",
            price: 499,
            type: "family",
            rating: 4.4
        }
    ];
    
    const destinationGrid = document.getElementById('destinationGrid');
    
    destinations.forEach(dest => {
        const card = createDestinationCard(dest);
        destinationGrid.appendChild(card);
    });
}

function createDestinationCard(destination) {
    const card = document.createElement('div');
    card.className = 'destination-card';
    card.dataset.type = destination.type;
    card.dataset.price = destination.price;
    
    card.innerHTML = `
        <img src="${destination.image}" alt="${destination.name}" class="destination-img">
        <div class="destination-content">
            <h3>${destination.name}</h3>
            <p>${destination.description}</p>
            <div class="rating">
                ${generateStars(destination.rating)}
                <span>${destination.rating}</span>
            </div>
            <div class="destination-price">$${destination.price}</div>
            <button class="btn btn-primary book-destination" data-id="${destination.id}">
                <i class="fas fa-bookmark"></i> Book Now
            </button>
        </div>
    `;
    
    return card;
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

// Language & Currency Module
function initializeLanguageCurrency() {
    const languageSelect = document.getElementById('languageSelect');
    const currencySelect = document.getElementById('currencySelect');
    
    // Load saved preferences
    const savedLanguage = localStorage.getItem('travelLanguage') || 'en';
    const savedCurrency = localStorage.getItem('travelCurrency') || 'USD';
    
    languageSelect.value = savedLanguage;
    currencySelect.value = savedCurrency;
    
    // Add event listeners
    languageSelect.addEventListener('change', (e) => {
        const language = e.target.value;
        localStorage.setItem('travelLanguage', language);
        updateLanguage(language);
    });
    
    currencySelect.addEventListener('change', (e) => {
        const currency = e.target.value;
        localStorage.setItem('travelCurrency', currency);
        updateCurrency(currency);
    });
}

function updateLanguage(language) {
    // Demo language texts
    const translations = {
        en: {
            heroTitle: "Discover Amazing Places Around The World",
            heroSubtitle: "Book flights, hotels, and tour packages with the best prices",
            searchBtn: "Search"
        },
        bn: {
            heroTitle: "বিশ্বের আশ্চর্যজনক স্থানগুলি আবিষ্কার করুন",
            heroSubtitle: "সেরা মূল্যে ফ্লাইট, হোটেল এবং ট্যুর প্যাকেজ বুক করুন",
            searchBtn: "অনুসন্ধান করুন"
        },
        ar: {
            heroTitle: "اكتشف أماكن مذهلة حول العالم",
            heroSubtitle: "احجز رحلات طيران وفنادق وباقات سياحية بأفضل الأسعار",
            searchBtn: "بحث"
        }
    };
    
    const texts = translations[language];
    
    // Update page texts
    document.querySelector('.hero h1').textContent = texts.heroTitle;
    document.querySelector('.hero p').textContent = texts.heroSubtitle;
    document.getElementById('searchBtn').innerHTML = `<i class="fas fa-search"></i> ${texts.searchBtn}`;
}

function updateCurrency(currency) {
    const conversionRates = {
        USD: 1,
        BDT: 109.50,
        AED: 3.67
    };
    
    const rate = conversionRates[currency];
    const symbol = currency === 'USD' ? '$' : currency === 'BDT' ? '৳' : 'د.إ';
    
    // Update all prices on the page
    document.querySelectorAll('.destination-price').forEach(priceElement => {
        const originalPrice = parseFloat(priceElement.dataset.originalPrice || priceElement.textContent.replace(/[^0-9.-]+/g, ""));
        const convertedPrice = Math.round(originalPrice * rate);
        priceElement.textContent = `${symbol}${convertedPrice}`;
        priceElement.dataset.originalPrice = originalPrice;
    });
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

function checkUserSession() {
    const userData = localStorage.getItem('userData');
    if (userData) {
        const user = JSON.parse(userData);
        updateUserUI(user);
    }
}

function updateUserUI(user) {
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    
    if (user) {
        loginBtn.innerHTML = `<i class="fas fa-user"></i> ${user.name}`;
        registerBtn.innerHTML = `<i class="fas fa-sign-out-alt"></i> Logout`;
        
        registerBtn.addEventListener('click', logout);
    } else {
        loginBtn.innerHTML = '<i class="fas fa-user"></i> Login';
        registerBtn.innerHTML = '<i class="fas fa-user-plus"></i> Register';
    }
}

function logout() {
    localStorage.removeItem('userData');
    location.reload();
}
