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

// Dynamic updates for floating WhatsApp link (makes it easy to modify number in one place)
const whatsappFloat = document.querySelector('.whatsapp-float');
if (whatsappFloat) {
  const defaultMessage = encodeURIComponent("Hello! I would like to inquire about renting a vehicle.");
  whatsappFloat.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${defaultMessage}`;
}
