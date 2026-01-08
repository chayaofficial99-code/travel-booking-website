// Booking System Module

document.addEventListener('DOMContentLoaded', function() {
    initializeBooking();
});

function initializeBooking() {
    const bookingCards = document.querySelectorAll('[data-booking]');
    const destinationBookBtns = document.querySelectorAll('.book-destination');
    
    // Booking card clicks
    bookingCards.forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn')) {
                const type = e.target.dataset.booking;
                showBookingForm(type);
            }
        });
    });
    
    // Destination book buttons
    destinationBookBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.closest('.book-destination').dataset.id;
            showTourPackageForm(id);
        });
    });
}

function showBookingForm(type) {
    const bookingForms = document.getElementById('bookingForms');
    
    // Clear previous form
    bookingForms.innerHTML = '';
    
    // Create form based on type
    let formHTML = '';
    
    switch(type) {
        case 'flight':
            formHTML = createFlightForm();
            break;
        case 'hotel':
            formHTML = createHotelForm();
            break;
        case 'tour':
            formHTML = createTourForm();
            break;
    }
    
    bookingForms.innerHTML = formHTML;
    
    // Scroll to form
    bookingForms.scrollIntoView({ behavior: 'smooth' });
    
    // Initialize form validation
    initializeBookingValidation(type);
    
    // Initialize payment selection
    initializePaymentSelection();
}

function createFlightForm() {
    return `
        <div class="booking-form active" id="flightForm">
            <h3>Flight Booking</h3>
            <form id="flightBookingForm">
                <div class="form-group">
                    <label for="flightFrom">From</label>
                    <input type="text" id="flightFrom" placeholder="Departure city" required>
                </div>
                <div class="form-group">
                    <label for="flightTo">To</label>
                    <input type="text" id="flightTo" placeholder="Destination city" required>
                </div>
                <div class="form-group">
                    <label for="departureDate">Departure Date</label>
                    <input type="date" id="departureDate" required>
                </div>
                <div class="form-group">
                    <label for="returnDate">Return Date</label>
                    <input type="date" id="returnDate">
                </div>
                <div class="form-group">
                    <label for="passengers">Passengers</label>
                    <select id="passengers">
                        <option value="1">1 Passenger</option>
                        <option value="2">2 Passengers</option>
                        <option value="3">3 Passengers</option>
                        <option value="4">4 Passengers</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="flightClass">Class</label>
                    <select id="flightClass">
                        <option value="economy">Economy</option>
                        <option value="business">Business</option>
                        <option value="first">First Class</option>
                    </select>
                </div>
                <div class="payment-form">
                    <h4>Payment Details</h4>
                    ${createPaymentForm()}
                </div>
                <button type="submit" class="btn btn-primary">Book Flight</button>
            </form>
        </div>
    `;
}

function createHotelForm() {
    return `
        <div class="booking-form active" id="hotelForm">
            <h3>Hotel Booking</h3>
            <form id="hotelBookingForm">
                <div class="form-group">
                    <label for="hotelLocation">Location</label>
                    <input type="text" id="hotelLocation" placeholder="City or hotel name" required>
                </div>
                <div class="form-group">
                    <label for="checkinDate">Check-in Date</label>
                    <input type="date" id="checkinDate" required>
                </div>
                <div class="form-group">
                    <label for="checkoutDate">Check-out Date</label>
                    <input type="date" id="checkoutDate" required>
                </div>
                <div class="form-group">
                    <label for="rooms">Rooms</label>
                    <select id="rooms">
                        <option value="1">1 Room</option>
                        <option value="2">2 Rooms</option>
                        <option value="3">3 Rooms</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="guests">Guests</label>
                    <select id="guests">
                        <option value="1">1 Guest</option>
                        <option value="2">2 Guests</option>
                        <option value="3">3 Guests</option>
                        <option value="4">4 Guests</option>
                    </select>
                </div>
                <div class="payment-form">
                    <h4>Payment Details</h4>
                    ${createPaymentForm()}
                </div>
                <button type="submit" class="btn btn-primary">Book Hotel</button>
            </form>
        </div>
    `;
}

function createTourForm() {
    return `
        <div class="booking-form active" id="tourForm">
            <h3>Tour Package Booking</h3>
            <form id="tourBookingForm">
                <div class="form-group">
                    <label for="tourDestination">Destination</label>
                    <input type="text" id="tourDestination" placeholder="Select destination" required>
                </div>
                <div class="form-group">
                    <label for="tourStartDate">Start Date</label>
                    <input type="date" id="tourStartDate" required>
                </div>
                <div class="form-group">
                    <label for="tourDuration">Duration</label>
                    <select id="tourDuration">
                        <option value="3">3 Days</option>
                        <option value="5">5 Days</option>
                        <option value="7">7 Days</option>
                        <option value="10">10 Days</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="tourTravelers">Travelers</label>
                    <select id="tourTravelers">
                        <option value="1">1 Traveler</option>
                        <option value="2">2 Travelers</option>
                        <option value="3">3 Travelers</option>
                        <option value="4">4 Travelers</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="tourPackage">Package Type</label>
                    <select id="tourPackage">
                        <option value="basic">Basic</option>
                        <option value="standard">Standard</option>
                        <option value="premium">Premium</option>
                    </select>
                </div>
                <div class="payment-form">
                    <h4>Payment Details</h4>
                    ${createPaymentForm()}
                </div>
                <button type="submit" class="btn btn-primary">Book Tour</button>
            </form>
        </div>
    `;
}

function createPaymentForm() {
    return `
        <div class="payment-cards">
            <div class="payment-card" data-type="credit">
                <i class="fas fa-credit-card"></i>
                <span>Credit Card</span>
            </div>
            <div class="payment-card" data-type="paypal">
                <i class="fab fa-paypal"></i>
                <span>PayPal</span>
            </div>
            <div class="payment-card" data-type="bank">
                <i class="fas fa-university"></i>
                <span>Bank Transfer</span>
            </div>
        </div>
        <div class="card-details" id="creditCardForm">
            <div class="form-group">
                <label for="cardNumber">Card Number</label>
                <input type="text" id="cardNumber" placeholder="1234 5678 9012 3456" maxlength="19">
            </div>
            <div class="form-group">
                <label for="cardName">Name on Card</label>
                <input type="text" id="cardName" placeholder="John Doe">
            </div>
            <div class="form-group">
                <label for="expiryDate">Expiry Date</label>
                <input type="text" id="expiryDate" placeholder="MM/YY" maxlength="5">
            </div>
            <div class="form-group">
                <label for="cvv">CVV</label>
                <input type="password" id="cvv" placeholder="123" maxlength="3">
            </div>
        </div>
        <div class="paypal-details hidden" id="paypalForm">
            <p>You will be redirected to PayPal to complete your payment.</p>
        </div>
        <div class="bank-details hidden" id="bankForm">
            <p>Bank Transfer Details:</p>
            <p>Account: 1234-5678-9012</p>
            <p>Routing: 021000021</p>
            <p>Please include your booking reference.</p>
        </div>
    `;
}

function showTourPackageForm(destinationId) {
    // This would fetch destination details in a real app
    showBookingForm('tour');
    
    // Simulate setting destination
    setTimeout(() => {
        const destinationInput = document.getElementById('tourDestination');
        if (destinationInput) {
            const destinations = {
                '1': 'Bali, Indonesia',
                '2': 'Tokyo, Japan',
                '3': 'Paris, France',
                '4': 'Dubai, UAE',
                '5': 'Maldives',
                '6': "Cox's Bazar, Bangladesh"
            };
            destinationInput.value = destinations[destinationId] || '';
        }
    }, 100);
}

function initializeBookingValidation(type) {
    const formId = `${type}BookingForm`;
    const form = document.getElementById(formId);
    
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        if (validateBookingForm(type)) {
            processBooking(type);
        }
    });
    
    // Add real-time validation for credit card
    const cardNumber = document.getElementById('cardNumber');
    if (cardNumber) {
        cardNumber.addEventListener('input', formatCardNumber);
    }
    
    const expiryDate = document.getElementById('expiryDate');
    if (expiryDate) {
        expiryDate.addEventListener('input', formatExpiryDate);
    }
    
    const cvv = document.getElementById('cvv');
    if (cvv) {
        cvv.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/\D/g, '');
        });
    }
}

function formatCardNumber(e) {
    let value = e.target.value.replace(/\D/g, '');
    let formatted = '';
    
    for (let i = 0; i < value.length; i++) {
        if (i > 0 && i % 4 === 0) {
            formatted += ' ';
        }
        formatted += value[i];
    }
    
    e.target.value = formatted.substring(0, 19);
}

function formatExpiryDate(e) {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    
    e.target.value = value.substring(0, 5);
}

function initializePaymentSelection() {
    const paymentCards = document.querySelectorAll('.payment-card');
    
    paymentCards.forEach(card => {
        card.addEventListener('click', () => {
            // Remove active class from all cards
            paymentCards.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked card
            card.classList.add('active');
            
            // Show corresponding payment form
            const paymentType = card.dataset.type;
            showPaymentForm(paymentType);
        });
    });
    
    // Set default to credit card
    const creditCard = document.querySelector('.payment-card[data-type="credit"]');
    if (creditCard) {
        creditCard.classList.add('active');
        showPaymentForm('credit');
    }
}

function showPaymentForm(type) {
    // Hide all payment forms
    document.getElementById('creditCardForm')?.classList.add('hidden');
    document.getElementById('paypalForm')?.classList.add('hidden');
    document.getElementById('bankForm')?.classList.add('hidden');
    
    // Show selected payment form
    const formId = `${type}Form`;
    const form = document.getElementById(formId);
    if (form) {
        form.classList.remove('hidden');
    }
}

function validateBookingForm(type) {
    let isValid = true;
    const errors = [];
    
    // Common validation for all booking types
    const today = new Date().toISOString().split('T')[0];
    
    switch(type) {
        case 'flight':
            const from = document.getElementById('flightFrom');
            const to = document.getElementById('flightTo');
            const departure = document.getElementById('departureDate');
            
            if (!from.value.trim()) {
                errors.push('Please enter departure city');
                isValid = false;
            }
            if (!to.value.trim()) {
                errors.push('Please enter destination city');
                isValid = false;
            }
            if (!departure.value) {
                errors.push('Please select departure date');
                isValid = false;
            } else if (departure.value < today) {
                errors.push('Departure date cannot be in the past');
                isValid = false;
            }
            break;
            
        case 'hotel':
            const location = document.getElementById('hotelLocation');
            const checkin = document.getElementById('checkinDate');
            const checkout = document.getElementById('checkoutDate');
            
            if (!location.value.trim()) {
                errors.push('Please enter hotel location');
                isValid = false;
            }
            if (!checkin.value) {
                errors.push('Please select check-in date');
                isValid = false;
            } else if (checkin.value < today) {
                errors.push('Check-in date cannot be in the past');
                isValid = false;
            }
            if (!checkout.value) {
                errors.push('Please select check-out date');
                isValid = false;
            } else if (checkout.value <= checkin.value) {
                errors.push('Check-out date must be after check-in date');
                isValid = false;
            }
            break;
            
        case 'tour':
            const destination = document.getElementById('tourDestination');
            const startDate = document.getElementById('tourStartDate');
            
            if (!destination.value.trim()) {
                errors.push('Please enter destination');
                isValid = false;
            }
            if (!startDate.value) {
                errors.push('Please select start date');
                isValid = false;
            } else if (startDate.value < today) {
                errors.push('Start date cannot be in the past');
                isValid = false;
            }
            break;
    }
    
    // Validate payment
    const activePayment = document.querySelector('.payment-card.active');
    if (!activePayment) {
        errors.push('Please select a payment method');
        isValid = false;
    } else if (activePayment.dataset.type === 'credit') {
        // Validate credit card
        const cardNumber = document.getElementById('cardNumber').value.replace(/\s/g, '');
        const cardName = document.getElementById('cardName').value.trim();
        const expiryDate = document.getElementById('expiryDate').value;
        const cvv = document.getElementById('cvv').value;
        
        if (cardNumber.length !== 16) {
            errors.push('Please enter a valid 16-digit card number');
            isValid = false;
        }
        if (!cardName) {
            errors.push('Please enter name on card');
            isValid = false;
        }
        if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
            errors.push('Please enter valid expiry date (MM/YY)');
            isValid = false;
        }
        if (cvv.length !== 3) {
            errors.push('Please enter valid 3-digit CVV');
            isValid = false;
        }
    }
    
    // Show errors if any
    if (errors.length > 0) {
        alert(errors.join('\n'));
    }
    
    return isValid;
}

function processBooking(type) {
    // Get booking details
    const bookingDetails = getBookingDetails(type);
    
    // Show loading
    const submitBtn = document.querySelector(`#${type}BookingForm button[type="submit"]`);
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Show confirmation
        showBookingConfirmation(bookingDetails);
        
        // Save to local storage
        saveBookingToHistory(bookingDetails);
    }, 2000);
}

function getBookingDetails(type) {
    const details = {
        type: type,
        id: 'BK' + Date.now(),
        date: new Date().toLocaleDateString(),
        status: 'Confirmed'
    };
    
    switch(type) {
        case 'flight':
            details.from = document.getElementById('flightFrom').value;
            details.to = document.getElementById('flightTo').value;
            details.departure = document.getElementById('departureDate').value;
            details.passengers = document.getElementById('passengers').value;
            details.class = document.getElementById('flightClass').value;
            details.price = calculateFlightPrice();
            break;
            
        case 'hotel':
            details.location = document.getElementById('hotelLocation').value;
            details.checkin = document.getElementById('checkinDate').value;
            details.checkout = document.getElementById('checkoutDate').value;
            details.rooms = document.getElementById('rooms').value;
            details.guests = document.getElementById('guests').value;
            details.price = calculateHotelPrice();
            break;
            
        case 'tour':
            details.destination = document.getElementById('tourDestination').value;
            details.startDate = document.getElementById('tourStartDate').value;
            details.duration = document.getElementById('tourDuration').value;
            details.travelers = document.getElementById('tourTravelers').value;
            details.package = document.getElementById('tourPackage').value;
            details.price = calculateTourPrice();
            break;
    }
    
    return details;
}

function calculateFlightPrice() {
    const passengers = parseInt(document.getElementById('passengers').value);
    const flightClass = document.getElementById('flightClass').value;
    
    let basePrice = 299;
    
    switch(flightClass) {
        case 'business':
            basePrice = 799;
            break;
        case 'first':
            basePrice = 1299;
            break;
    }
    
    return basePrice * passengers;
}

function calculateHotelPrice() {
    const rooms = parseInt(document.getElementById('rooms').value);
    const guests = parseInt(document.getElementById('guests').value);
    const checkin = new Date(document.getElementById('checkinDate').value);
    const checkout = new Date(document.getElementById('checkoutDate').value);
    
    const nights = Math.ceil((checkout - checkin) / (1000 * 60 * 60 * 24));
    
    return nights * rooms * 120;
}

function calculateTourPrice() {
    const duration = parseInt(document.getElementById('tourDuration').value);
    const travelers = parseInt(document.getElementById('tourTravelers').value);
    const packageType = document.getElementById('tourPackage').value;
    
    let basePrice = 200;
    
    switch(packageType) {
        case 'standard':
            basePrice = 300;
            break;
        case 'premium':
            basePrice = 500;
            break;
    }
    
    return duration * travelers * basePrice;
}

function showBookingConfirmation(details) {
    const confirmationHTML = `
        <div class="confirmation-modal">
            <h3><i class="fas fa-check-circle"></i> Booking Confirmed!</h3>
            <p>Your booking has been successfully confirmed.</p>
            
            <div class="confirmation-details">
                <p><strong>Booking ID:</strong> ${details.id}</p>
                <p><strong>Type:</strong> ${details.type.charAt(0).toUpperCase() + details.type.slice(1)}</p>
                ${details.type === 'flight' ? `
                    <p><strong>Route:</strong> ${details.from} → ${details.to}</p>
                    <p><strong>Departure:</strong> ${details.departure}</p>
                ` : ''}
                ${details.type === 'hotel' ? `
                    <p><strong>Location:</strong> ${details.location}</p>
                    <p><strong>Check-in:</strong> ${details.checkin}</p>
                ` : ''}
                ${details.type === 'tour' ? `
                    <p><strong>Destination:</strong> ${details.destination}</p>
                    <p><strong>Start Date:</strong> ${details.startDate}</p>
                ` : ''}
                <p><strong>Total Price:</strong> $${details.price}</p>
                <p><strong>Status:</strong> <span class="status-confirmed">${details.status}</span></p>
            </div>
            
            <p>Confirmation email has been sent to your registered email address.</p>
            <button class="btn btn-primary" onclick="this.closest('.confirmation-modal').remove()">Close</button>
        </div>
    `;
    
    // Create and show modal
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `<div class="modal-content">${confirmationHTML}</div>`;
    
    document.body.appendChild(modal);
    
    // Add close functionality
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

function saveBookingToHistory(booking) {
    let bookings = JSON.parse(localStorage.getItem('userBookings') || '[]');
    bookings.push(booking);
    localStorage.setItem('userBookings', JSON.stringify(bookings));
                  }
