// Customer Support & Chat Module
function initializeChat() {
    const chatToggle = document.getElementById('chatToggle');
    const chatWidget = document.getElementById('chatWidget');
    const closeChat = document.querySelector('.close-chat');
    const sendChatBtn = document.getElementById('sendChat');
    const chatInput = document.getElementById('chatInput');
    const liveChatBtn = document.getElementById('liveChatBtn');
    
    if (!chatToggle) return;
    
    // Toggle chat widget
    chatToggle.addEventListener('click', () => {
        chatWidget.classList.toggle('active');
    });
    
    // Close chat
    if (closeChat) {
        closeChat.addEventListener('click', () => {
            chatWidget.classList.remove('active');
        });
    }
    
    // Send message
    if (sendChatBtn && chatInput) {
        sendChatBtn.addEventListener('click', sendChatMessage);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendChatMessage();
            }
        });
    }
    
    // Live chat button in support section
    if (liveChatBtn) {
        liveChatBtn.addEventListener('click', () => {
            chatWidget.classList.add('active');
            chatInput.focus();
        });
    }
}

function sendChatMessage() {
    const input = document.getElementById('chatInput');
    const messagesContainer = document.getElementById('chatMessages');
    
    if (!input.value.trim()) return;
    
    // Add user message
    const userMessage = document.createElement('div');
    userMessage.className = 'message user';
    userMessage.innerHTML = `<p>${input.value}</p>`;
    messagesContainer.appendChild(userMessage);
    
    // Clear input
    const userText = input.value;
    input.value = '';
    
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    // Simulate bot response after delay
    setTimeout(() => {
        const botResponse = getBotResponse(userText);
        const botMessage = document.createElement('div');
        botMessage.className = 'message bot';
        botMessage.innerHTML = `<p>${botResponse}</p>`;
        messagesContainer.appendChild(botMessage);
        
        // Scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 1000);
}

function getBotResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    if (message.includes('hello') || message.includes('hi')) {
        return 'Hello! How can I assist you with your travel plans today?';
    } else if (message.includes('booking')) {
        return 'I can help you with booking flights, hotels, or tour packages. What would you like to book?';
    } else if (message.includes('price') || message.includes('cost')) {
        return 'Prices vary based on destination, travel dates, and package type. You can use our search tool to get specific pricing.';
    } else if (message.includes('cancel')) {
        return 'You can cancel your booking through your account dashboard. Please note cancellation policies may apply.';
    } else if (message.includes('support') || message.includes('help')) {
        return 'Our customer support team is available 24/7. You can call us at +1 (800) 123-4567 or email support@travelease.com';
    } else {
        return 'Thank you for your message. How else can I assist you with your travel needs?';
    }
}

// Newsletter Subscription
function initializeNewsletter() {
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]').value;
            
            if (!validateEmail(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Save subscription
            let subscriptions = JSON.parse(localStorage.getItem('newsletterSubscriptions') || '[]');
            if (!subscriptions.includes(email)) {
                subscriptions.push(email);
                localStorage.setItem('newsletterSubscriptions', JSON.stringify(subscriptions));
            }
            
            // Show success message
            alert('Thank you for subscribing to our newsletter!');
            newsletterForm.reset();
        });
    }
}

// Initialize Modals
function initializeModals() {
    // Close modals when clicking outside
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('active');
        }
    });
    
    // Add ESC key to close modals
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal.active').forEach(modal => {
                modal.classList.remove('active');
            });
        }
    });
}

// Date validation helpers
function setMinDates() {
    const today = new Date().toISOString().split('T')[0];
    
    // Set min dates for date inputs
    document.querySelectorAll('input[type="date"]').forEach(input => {
        input.min = today;
        
        // Set default values for demo
        if (!input.value) {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            const tomorrowStr = tomorrow.toISOString().split('T')[0];
            
            if (input.id.includes('checkin') || input.id.includes('departure') || input.id.includes('start')) {
                input.value = tomorrowStr;
            }
            
            if (input.id.includes('checkout') || input.id.includes('return')) {
                const nextWeek = new Date();
                nextWeek.setDate(nextWeek.getDate() + 7);
                const nextWeekStr = nextWeek.toISOString().split('T')[0];
                input.value = nextWeekStr;
            }
        }
    });
}

// Initialize dates when DOM is loaded
document.addEventListener('DOMContentLoaded', setMinDates);

// Wishlist functionality
function initializeWishlist() {
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('wishlist-btn')) {
            const userData = JSON.parse(localStorage.getItem('userData'));
            
            if (!userData) {
                alert('Please login to add items to your wishlist');
                return;
            }
            
            const item = {
                id: e.target.dataset.id,
                name: e.target.dataset.name,
                description: e.target.dataset.description,
                price: e.target.dataset.price
            };
            
            let wishlist = JSON.parse(localStorage.getItem(`wishlist_${userData.id}`) || '[]');
            
            // Check if already in wishlist
            if (wishlist.some(w => w.id === item.id)) {
                alert('This item is already in your wishlist');
                return;
            }
            
            wishlist.push(item);
            localStorage.setItem(`wishlist_${userData.id}`, JSON.stringify(wishlist));
            
            alert('Added to wishlist!');
        }
    });
}

// Share functionality
function initializeSharing() {
    document.addEventListener('click', (e) => {
        if (e.target.closest('.share-btn')) {
            const shareBtn = e.target.closest('.share-btn');
            const url = window.location.href;
            const title = document.title;
            
            if (navigator.share) {
                // Use Web Share API if available
                navigator.share({
                    title: title,
                    url: url
                });
            } else {
                // Fallback to copying to clipboard
                navigator.clipboard.writeText(url)
                    .then(() => alert('Link copied to clipboard!'))
                    .catch(err => console.error('Failed to copy:', err));
            }
        }
    });
}

// Initialize all features
document.addEventListener('DOMContentLoaded', function() {
    initializeWishlist();
    initializeSharing();
});
