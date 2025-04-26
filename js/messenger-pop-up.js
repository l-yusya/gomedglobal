
// document.querySelectorAll('.message-button').forEach(button => {
//   button.addEventListener('click', function (e) {
//     const wrapper = this.parentElement;
//     wrapper.classList.toggle('active');

//     // Close other popups
//     document.querySelectorAll('.message-wrapper').forEach(w => {
//       if (w !== wrapper) {
//         w.classList.remove('active');
//       }
//     });

//     e.stopPropagation();
//   });
// });

// // Close popup when clicking outside
// document.addEventListener('click', function () {
//   document.querySelectorAll('.message-wrapper').forEach(w => {
//     w.classList.remove('active');
//   });
// });

// // Close popup when clicking a messenger link
// document.querySelectorAll('.messenger-icon').forEach(icon => {
//   icon.addEventListener('click', function () {
//     document.querySelectorAll('.message-wrapper').forEach(w => {
//       w.classList.remove('active');
//     });
//   });
// });

// const messageWrappers = document.querySelectorAll('.message-wrapper');

// messageWrappers.forEach(wrapper => {
//   const button = wrapper.querySelector('.message-button');

//   button.addEventListener('click', function (e) {
//     e.stopPropagation(); // Prevent closing when clicking inside
//     // First, close all popups
//     messageWrappers.forEach(w => w.classList.remove('active'));
//     // Then, open only the clicked one
//     wrapper.classList.toggle('active');
//   });
// });

// // Clicking outside closes all popups
// document.addEventListener('click', function (e) {
//   messageWrappers.forEach(wrapper => {
//     wrapper.classList.remove('active');
//   });
// });


// Updated popup logic
document.querySelectorAll('.message-button').forEach(button => {
  button.addEventListener('click', function (e) {
    e.stopPropagation();
    const wrapper = this.closest('.message-wrapper');

    // Close any other open popups first
    document.querySelectorAll('.message-wrapper.active').forEach(activeWrapper => {
      if (activeWrapper !== wrapper) {
        closePopup(activeWrapper);
      }
    });

    // Toggle this popup
    if (wrapper.classList.contains('active')) {
      closePopup(wrapper);
    } else {
      wrapper.classList.add('active');
    }
  });
});

// Close popups when clicking outside
document.addEventListener('click', function () {
  document.querySelectorAll('.message-wrapper.active').forEach(wrapper => {
    closePopup(wrapper);
  });
});

// Function to close with fade-out
function closePopup(wrapper) {
  wrapper.classList.remove('active');
  wrapper.classList.add('closing');

  setTimeout(() => {
    wrapper.classList.remove('closing');
  }, 400); // match fade-out animation time
}
