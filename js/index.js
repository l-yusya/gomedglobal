const scrollUpButton = document.querySelector('.scroll-up');

window.addEventListener('scroll', () => {
  if (window.scrollY > 200) {
    scrollUpButton.classList.add('show');
  } else {
    scrollUpButton.classList.remove('show');
  }
});

scrollUpButton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
