// User Account System Module

document.addEventListener('DOMContentLoaded', function() {
    initializeUserSystem();
});

function initializeUserSystem() {
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
    
    // Check if user is already logged in
    const userData = localStorage.getItem('userData');
    if (userData) {
        const user = JSON.parse(userData);
        showUserDashboard(user);
    }
    
    // Login button click
    loginBtn.addEventListener('click', () => {
        if (userData) {
            // Already logged in, show dashboard
            showUserDashboard(JSON.parse(userData));
        } else {
            // Show login modal
            loginModal.classList.add('active');
        }
    });
    
    // Register button click
    registerBtn.addEventListener('click', () => {
        if (userData) {
            // Logout
            logout();
        } else {
            // Show register modal
            registerModal.classList.add('active');
        }
    });
    
    // Close modals when clicking X
    document.querySelectorAll('.close-modal').forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            loginModal.classList.remove('active');
            registerModal.classList.remove('active');
        });
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            loginModal.classList.remove('active');
        }
        if (e.target === registerModal) {
            registerModal.classList.remove('active');
        }
    });
    
    // Login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Register form submission
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
    
    // Social login buttons
    document.querySelectorAll('.btn-social').forEach(btn => {
        btn.addEventListener('click', handleSocialLogin);
    });
}

function handleLogin(e) {
    e.preventDefault();
    
    const email = this.querySelector('input[type="email"]').value;
    const password = this.querySelector('input[type="password"]').value;
    
    // Basic validation
    if (!validateEmail(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    if (password.length < 6) {
        alert('Password must be at least 6 characters');
        return;
    }
    
    // Simulate API call
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        // Check if user exists in localStorage
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            // Login successful
            const userData = {
                id: user.id,
                name: user.name,
                email: user.email
            };
            
            localStorage.setItem('userData', JSON.stringify(userData));
            
            // Close modal
            document.getElementById('loginModal').classList.remove('active');
            
            // Update UI
            updateUserUI(userData);
            
            // Show welcome message
            alert(`Welcome back, ${user.name}!`);
        } else {
            // Login failed
            alert('Invalid email or password');
        }
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 1500);
}

function handleRegister(e) {
    e.preventDefault();
    
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelectorAll('input[type="email"]')[0].value;
    const password = this.querySelectorAll('input[type="password"]')[0].value;
    const confirmPassword = this.querySelectorAll('input[type="password"]')[1].value;
    
    // Validation
    if (!name.trim()) {
        alert('Please enter your full name');
        return;
    }
    
    if (!validateEmail(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    if (password.length < 6) {
        alert('Password must be at least 6 characters');
        return;
    }
    
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }
    
    // Simulate API call
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating account...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        // Check if user already exists
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        if (users.some(u => u.email === email)) {
            alert('An account with this email already exists');
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            return;
        }
        
        // Create new user
        const newUser = {
            id: 'U' + Date.now(),
            name: name,
            email: email,
            password: password, // In real app, this would be hashed
            createdAt: new Date().toISOString()
        };
        
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        
        // Auto login
        const userData = {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email
        };
        
        localStorage.setItem('userData', JSON.stringify(userData));
        
        // Close modal
        document.getElementById('registerModal').classList.remove('active');
        
        // Update UI
        updateUserUI(userData);
        
        // Show welcome message
        alert(`Welcome to TravelEase, ${name}!`);
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 1500);
}

function handleSocialLogin(e) {
    e.preventDefault();
    
    const provider = this.classList.contains('google') ? 'Google' : 'Facebook';
    
    // Show loading
    this.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Connecting to ${provider}...`;
    this.disabled = true;
    
    setTimeout(() => {
        // Simulate social login
        const userData = {
            id: 'S' + Date.now(),
            name: provider === 'Google' ? 'Google User' : 'Facebook User',
            email: `${provider.toLowerCase()}_user@example.com`,
            socialLogin: true
        };
        
        localStorage.setItem('userData', JSON.stringify(userData));
        
        // Close modal
        document.getElementById('loginModal').classList.remove('active');
        
        // Update UI
        updateUserUI(userData);
        
        // Show welcome message
        alert(`Welcome, ${userData.name}!`);
    }, 2000);
}

function showUserDashboard(user) {
    // Create dashboard HTML
    const dashboardHTML = `
        <div class="dashboard">
            <div class="sidebar">
                <div class="user-profile">
                    <div class="avatar">
                        <i class="fas fa-user-circle"></i>
                    </div>
                    <h3>${user.name}</h3>
                    <p>${user.email}</p>
                </div>
                <nav class="sidebar-nav">
                    <ul>
                        <li><a href="#dashboard" class="active"><i class="fas fa-home"></i> Dashboard</a></li>
                        <li><a href="#bookings"><i class="fas fa-calendar-alt"></i> My Bookings</a></li>
                        <li><a href="#wishlist"><i class="fas fa-heart"></i> Wishlist</a></li>
                        <li><a href="#saved"><i class="fas fa-bookmark"></i> Saved Destinations</a></li>
                        <li><a href="#profile"><i class="fas fa-user-cog"></i> Profile Settings</a></li>
                        <li><a href="#logout"><i class="fas fa-sign-out-alt"></i> Logout</a></li>
                    </ul>
                </nav>
            </div>
            <div class="dashboard-content">
                <div class="dashboard-header">
                    <h2>Welcome back, ${user.name}!</h2>
                    <p>Here's an overview of your travel activities</p>
                </div>
                <div class="dashboard-grid">
                    <div class="dashboard-card">
                        <h3><i class="fas fa-calendar-alt"></i> Upcoming Trips</h3>
                        <div class="upcoming-trips" id="upcomingTrips">
                            <!-- Will be populated by JavaScript -->
                        </div>
                    </div>
                    <div class="dashboard-card">
                        <h3><i class="fas fa-heart"></i> Wishlist</h3>
                        <div class="wishlist-items" id="wishlistItems">
                            <!-- Will be populated by JavaScript -->
                        </div>
                    </div>
                    <div class="dashboard-card">
                        <h3><i class="fas fa-chart-line"></i> Travel Stats</h3>
                        <div class="travel-stats">
                            <p>Total Bookings: <span id="totalBookings">0</span></p>
                            <p>Countries Visited: <span id="countriesVisited">0</span></p>
                            <p>Total Spent: $<span id="totalSpent">0</span></p>
                        </div>
                    </div>
                </div>
                <div class="recent-bookings">
                    <h3>Recent Bookings</h3>
                    <div class="bookings-list" id="bookingsList">
                        <!-- Will be populated by JavaScript -->
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Replace main content with dashboard
    const main = document.querySelector('main');
    main.innerHTML = dashboardHTML;
    
    // Load user data
    loadUserData(user);
    
    // Add event listeners for sidebar navigation
    initializeDashboardNavigation();
}

function loadUserData(user) {
    // Load bookings
    const bookings = JSON.parse(localStorage.getItem('userBookings') || '[]');
    const userBookings = bookings.filter(b => b.userId === user.id || !b.userId);
    
    // Update stats
    document.getElementById('totalBookings').textContent = userBookings.length;
    document.getElementById('totalSpent').textContent = userBookings.reduce((sum, b) => sum + (b.price || 0), 0);
    
    // Load wishlist
    const wishlist = JSON.parse(localStorage.getItem(`wishlist_${user.id}`) || '[]');
    document.getElementById('wishlistItems').innerHTML = wishlist.length > 0 
        ? `<p>${wishlist.length} items in your wishlist</p>`
        : `<p>No items in wishlist yet</p>`;
    
    // Populate upcoming trips
    populateUpcomingTrips(userBookings);
    
    // Populate recent bookings
    populateRecentBookings(userBookings);
}

function populateUpcomingTrips(bookings) {
    const upcomingTrips = bookings.filter(booking => {
        const bookingDate = new Date(booking.date || booking.departure || booking.startDate);
        return bookingDate >= new Date();
    });
    
    const container = document.getElementById('upcomingTrips');
    
    if (upcomingTrips.length === 0) {
        container.innerHTML = '<p>No upcoming trips</p>';
        return;
    }
    
    container.innerHTML = upcomingTrips.slice(0, 3).map(booking => `
        <div class="trip-item">
            <h4>${booking.type.charAt(0).toUpperCase() + booking.type.slice(1)}</h4>
            <p>${booking.to || booking.location || booking.destination || ''}</p>
            <p><small>${booking.date || booking.departure || booking.startDate || ''}</small></p>
        </div>
    `).join('');
}

function populateRecentBookings(bookings) {
    const container = document.getElementById('bookingsList');
    
    if (bookings.length === 0) {
        container.innerHTML = '<p>No bookings yet</p>';
        return;
    }
    
    const recentBookings = bookings.slice(-5).reverse();
    
    container.innerHTML = recentBookings.map(booking => `
        <div class="booking-item">
            <div class="booking-info">
                <h4>${booking.type.charAt(0).toUpperCase() + booking.type.slice(1)} Booking</h4>
                <p>Booking ID: ${booking.id}</p>
                <p>Date: ${booking.date}</p>
                <p>Amount: $${booking.price || '0'}</p>
            </div>
            <div class="booking-status">
                <span class="status-${booking.status.toLowerCase()}">${booking.status}</span>
            </div>
        </div>
    `).join('');
}

function initializeDashboardNavigation() {
    // Sidebar navigation
    document.querySelectorAll('.sidebar-nav a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all links
            document.querySelectorAll('.sidebar-nav a').forEach(l => {
                l.classList.remove('active');
            });
            
            // Add active class to clicked link
            link.classList.add('active');
            
            // Handle different sections
            const section = link.getAttribute('href').substring(1);
            showDashboardSection(section);
        });
    });
    
    // Logout functionality
    const logoutLink = document.querySelector('a[href="#logout"]');
    if (logoutLink) {
        logoutLink.addEventListener('click', (e) => {
            e.preventDefault();
            logout();
        });
    }
}

function showDashboardSection(section) {
    const dashboardContent = document.querySelector('.dashboard-content');
    
    switch(section) {
        case 'bookings':
            dashboardContent.innerHTML = `
                <h2>My Bookings</h2>
                <div class="bookings-container" id="allBookings">
                    <!-- All bookings will be loaded here -->
                </div>
            `;
            loadAllBookings();
            break;
            
        case 'wishlist':
            dashboardContent.innerHTML = `
                <h2>My Wishlist</h2>
                <div class="wishlist-container" id="wishlistContainer">
                    <!-- Wishlist items will be loaded here -->
                </div>
            `;
            loadWishlist();
            break;
            
        case 'profile':
            dashboardContent.innerHTML = `
                <h2>Profile Settings</h2>
                <form class="profile-form">
                    <div class="form-group">
                        <label>Full Name</label>
                        <input type="text" id="profileName">
                    </div>
                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" id="profileEmail" disabled>
                    </div>
                    <div class="form-group">
                        <label>Phone Number</label>
                        <input type="tel" id="profilePhone">
                    </div>
                    <button type="submit" class="btn btn-primary">Save Changes</button>
                </form>
            `;
            loadProfile();
            break;
            
        default:
            // Default dashboard view
            showUserDashboard(JSON.parse(localStorage.getItem('userData')));
            break;
    }
}

function loadAllBookings() {
    const user = JSON.parse(localStorage.getItem('userData'));
    const bookings = JSON.parse(localStorage.getItem('userBookings') || '[]');
    
    const container = document.getElementById('allBookings');
    
    if (bookings.length === 0) {
        container.innerHTML = '<p>No bookings found</p>';
        return;
    }
    
    container.innerHTML = bookings.map(booking => `
        <div class="booking-card-full">
            <div class="booking-header">
                <h3>${booking.type.charAt(0).toUpperCase() + booking.type.slice(1)} Booking</h3>
                <span class="booking-id">${booking.id}</span>
            </div>
            <div class="booking-details">
                ${booking.type === 'flight' ? `
                    <p><strong>Route:</strong> ${booking.from} → ${booking.to}</p>
                    <p><strong>Date:</strong> ${booking.departure}</p>
                ` : ''}
                ${booking.type === 'hotel' ? `
                    <p><strong>Hotel:</strong> ${booking.location}</p>
                    <p><strong>Check-in:</strong> ${booking.checkin}</p>
                ` : ''}
                ${booking.type === 'tour' ? `
                    <p><strong>Destination:</strong> ${booking.destination}</p>
                    <p><strong>Start Date:</strong> ${booking.startDate}</p>
                ` : ''}
                <p><strong>Amount:</strong> $${booking.price || '0'}</p>
                <p><strong>Status:</strong> <span class="status-${booking.status.toLowerCase()}">${booking.status}</span></p>
            </div>
        </div>
    `).join('');
}

function loadWishlist() {
    const user = JSON.parse(localStorage.getItem('userData'));
    const wishlist = JSON.parse(localStorage.getItem(`wishlist_${user.id}`) || '[]');
    
    const container = document.getElementById('wishlistContainer');
    
    if (wishlist.length === 0) {
        container.innerHTML = '<p>Your wishlist is empty</p>';
        return;
    }
    
    container.innerHTML = wishlist.map(item => `
        <div class="wishlist-item">
            <h4>${item.name}</h4>
            <p>${item.description}</p>
            <p><strong>Price:</strong> $${item.price}</p>
            <button class="btn btn-outline remove-wishlist" data-id="${item.id}">Remove</button>
        </div>
    `).join('');
    
    // Add remove functionality
    document.querySelectorAll('.remove-wishlist').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const itemId = e.target.dataset.id;
            removeFromWishlist(user.id, itemId);
        });
    });
}

function loadProfile() {
    const user = JSON.parse(localStorage.getItem('userData'));
    
    document.getElementById('profileName').value = user.name;
    document.getElementById('profileEmail').value = user.email;
    document.getElementById('profilePhone').value = user.phone || '';
    
    // Add save functionality
    const profileForm = document.querySelector('.profile-form');
    profileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const updatedUser = {
            ...user,
            name: document.getElementById('profileName').value,
            phone: document.getElementById('profilePhone').value
        };
        
        localStorage.setItem('userData', JSON.stringify(updatedUser));
        
        // Update users array
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const userIndex = users.findIndex(u => u.email === user.email);
        if (userIndex !== -1) {
            users[userIndex].name = updatedUser.name;
            users[userIndex].phone = updatedUser.phone;
            localStorage.setItem('users', JSON.stringify(users));
        }
        
        alert('Profile updated successfully!');
    });
}

function removeFromWishlist(userId, itemId) {
    let wishlist = JSON.parse(localStorage.getItem(`wishlist_${userId}`) || '[]');
    wishlist = wishlist.filter(item => item.id !== itemId);
    localStorage.setItem(`wishlist_${userId}`, JSON.stringify(wishlist));
    
    // Reload wishlist
    loadWishlist();
}

function updateUserUI(user) {
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    
    if (user) {
        loginBtn.innerHTML = `<i class="fas fa-user"></i> ${user.name}`;
        registerBtn.innerHTML = `<i class="fas fa-sign-out-alt"></i> Logout`;
    }
}

function logout() {
    localStorage.removeItem('userData');
    location.reload();
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Reviews Module
function initializeReviews() {
    const reviewForm = document.querySelector('.review-form');
    if (!reviewForm) return;
    
    // Star rating
    const starInputs = document.querySelectorAll('.stars-input i');
    starInputs.forEach(star => {
        star.addEventListener('click', () => {
            const rating = parseInt(star.dataset.rating);
            setStarRating(rating);
        });
    });
    
    // Submit review
    const submitBtn = document.getElementById('submitReview');
    if (submitBtn) {
        submitBtn.addEventListener('click', submitReview);
    }
    
    // Load existing reviews
    loadReviews();
}

function setStarRating(rating) {
    const stars = document.querySelectorAll('.stars-input i');
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.remove('far');
            star.classList.add('fas', 'active');
        } else {
            star.classList.remove('fas', 'active');
            star.classList.add('far');
        }
    });
}

function submitReview() {
    const stars = document.querySelectorAll('.stars-input i.fas.active').length;
    const text = document.getElementById('reviewText').value;
    
    if (stars === 0) {
        alert('Please select a rating');
        return;
    }
    
    if (!text.trim()) {
        alert('Please enter your review');
        return;
    }
    
    // Get user data
    const userData = JSON.parse(localStorage.getItem('userData'));
    const userName = userData ? userData.name : 'Anonymous';
    
    // Create review object
    const review = {
        id: 'R' + Date.now(),
        user: userName,
        rating: stars,
        text: text,
        date: new Date().toLocaleDateString()
    };
    
    // Save to localStorage
    let reviews = JSON.parse(localStorage.getItem('travelReviews') || '[]');
    reviews.unshift(review); // Add to beginning
    localStorage.setItem('travelReviews', JSON.stringify(reviews));
    
    // Clear form
    setStarRating(0);
    document.getElementById('reviewText').value = '';
    
    // Reload reviews
    loadReviews();
    
    alert('Thank you for your review!');
}

function loadReviews() {
    const reviews = JSON.parse(localStorage.getItem('travelReviews') || '[]');
    const container = document.getElementById('reviewsList');
    
    if (!container) return;
    
    // Add some demo reviews if empty
    if (reviews.length === 0) {
        reviews.push(
            {
                id: 'R1',
                user: 'John Doe',
                rating: 5,
                text: 'Amazing experience! The booking process was smooth and the trip was fantastic.',
                date: '2024-01-15'
            },
            {
                id: 'R2',
                user: 'Jane Smith',
                rating: 4,
                text: 'Great service. The hotel was exactly as described. Would recommend!',
                date: '2024-01-10'
            }
        );
    }
    
    container.innerHTML = reviews.slice(0, 5).map(review => `
        <div class="review-item">
            <div class="review-header">
                <div>
                    <strong>${review.user}</strong>
                    <div class="stars">
                        ${generateStars(review.rating)}
                    </div>
                </div>
                <span class="review-date">${review.date}</span>
            </div>
            <p>${review.text}</p>
        </div>
    `).join('');
}

// Initialize Reviews
document.addEventListener('DOMContentLoaded', initializeReviews);
