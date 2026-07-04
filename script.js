const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');
const modal = document.querySelector('.booking-modal');
const form = document.querySelector('#booking-form');
const toast = document.querySelector('.toast');

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

function openBooking(vehicle) {
  if (vehicle) form.elements.vehicle.value = vehicle;
  form.elements.date.min = new Date().toISOString().split('T')[0];
  modal.showModal();
}

document.querySelectorAll('.book-button').forEach(button => {
  button.addEventListener('click', () => openBooking(button.dataset.vehicle));
});

document.querySelector('.open-booking').addEventListener('click', () => openBooking());
document.querySelector('.modal-close').addEventListener('click', () => modal.close());
modal.addEventListener('click', event => {
  if (event.target === modal) modal.close();
});

form.addEventListener('submit', event => {
  event.preventDefault();
  modal.close();
  toast.classList.add('show');
  form.reset();
  setTimeout(() => toast.classList.remove('show'), 3500);
});
