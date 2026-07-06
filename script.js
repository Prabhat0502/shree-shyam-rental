const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');

// WhatsApp Configuration
// Note: Include country code without '+' or spaces (e.g. '917248002608' for India)
const WHATSAPP_NUMBER = '917248002608'; 

// Mobile menu toggle
menuButton.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', isOpen);
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

// Redirect to WhatsApp helper
function sendWhatsAppMessage(messageText) {
  const encodedText = encodeURIComponent(messageText);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText}`;
  window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
}

// Handle Book buttons on vehicle cards
document.querySelectorAll('.book-button').forEach(button => {
  button.addEventListener('click', () => {
    const vehicle = button.dataset.vehicle;
    const message = `Hello! I am interested in booking the ${vehicle}. Please share availability and rates.`;
    sendWhatsAppMessage(message);
  });
});

// Handle main "Book via WhatsApp" CTA button
const openBookingBtn = document.querySelector('.open-booking');
if (openBookingBtn) {
  openBookingBtn.addEventListener('click', () => {
    const message = `Hello! I would like to inquire about renting a vehicle from Shree Shyam Bike Rentals.`;
    sendWhatsAppMessage(message);
  });
}

// Dynamic updates for floating WhatsApp link
const whatsappFloat = document.querySelector('.whatsapp-float');
if (whatsappFloat) {
  const defaultMessage = encodeURIComponent("Hello! I would like to inquire about renting a vehicle.");
  whatsappFloat.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${defaultMessage}`;
}

// Fleet Slider (Autoplay & Controls)
const scrollContainer = document.querySelector('.vehicle-scroll');
const cards = document.querySelectorAll('.vehicle-card');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.slider-arrow.prev');
const nextBtn = document.querySelector('.slider-arrow.next');

if (scrollContainer && cards.length > 0) {
  let currentIndex = 0;
  let autoplayTimer = null;

  // Synchronize active dot with scroll position
  function updateActiveDot() {
    const scrollLeft = scrollContainer.scrollLeft;
    
    // Calculate current slide index based on the center of scroll area
    currentIndex = Math.round(scrollLeft / (scrollContainer.scrollWidth / cards.length));
    
    dots.forEach((dot, index) => {
      if (index === currentIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  // Scroll to a specific card index smoothly
  function scrollToCard(index) {
    if (index < 0) index = cards.length - 1;
    if (index >= cards.length) index = 0;
    
    const targetCard = cards[index];
    if (targetCard) {
      scrollContainer.scrollTo({
        left: targetCard.offsetLeft - scrollContainer.offsetLeft,
        behavior: 'smooth'
      });
      currentIndex = index;
    }
  }

  // Start the 5-second autoplay timer
  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(() => {
      scrollToCard(currentIndex + 1);
    }, 5000);
  }

  // Stop the autoplay timer
  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
    }
  }

  // Dots click navigation
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      scrollToCard(index);
      startAutoplay(); // Restart timer after user interaction
    });
  });

  // Arrows click navigation
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      scrollToCard(currentIndex - 1);
      startAutoplay();
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      scrollToCard(currentIndex + 1);
      startAutoplay();
    });
  }

  // Update visual dot active class on scroll
  scrollContainer.addEventListener('scroll', updateActiveDot);

  // Pause autoplay on mouse/touch hover to avoid shifting while reading
  scrollContainer.addEventListener('mouseenter', stopAutoplay);
  scrollContainer.addEventListener('mouseleave', startAutoplay);
  scrollContainer.addEventListener('touchstart', stopAutoplay, { passive: true });
  scrollContainer.addEventListener('touchend', startAutoplay);

  // Initialize
  startAutoplay();
}
