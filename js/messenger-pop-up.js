
document.querySelectorAll('.message-button').forEach(button => {
  button.addEventListener('click', function (e) {
    const wrapper = this.parentElement;
    wrapper.classList.toggle('active');

    // Close other popups
    document.querySelectorAll('.message-wrapper').forEach(w => {
      if (w !== wrapper) {
        w.classList.remove('active');
      }
    });

    e.stopPropagation();
  });
});

// Close popup when clicking outside
document.addEventListener('click', function () {
  document.querySelectorAll('.message-wrapper').forEach(w => {
    w.classList.remove('active');
  });
});

// ✨ New: Close popup when clicking a messenger link
document.querySelectorAll('.messenger-icon').forEach(icon => {
  icon.addEventListener('click', function () {
    document.querySelectorAll('.message-wrapper').forEach(w => {
      w.classList.remove('active');
    });
  });
});

