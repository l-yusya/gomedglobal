// const regionsData = {
//   "Europe": [
//     "🇪🇺 European Union",
//     "🇨🇭 Switzerland",
//     "🇬🇧 United Kingdom",
//   ],
//   "Americas": [
//     "🇨🇦 Canada",
//     "🇺🇸 United States",
//     "🇦🇷 Argentina",
//     "🇨🇴 Colombia",
//     "🇲🇽 Mexico"
//   ],
//   "EEMEA": [
//     "🇦🇱 Albania",
//     "🇦🇿 Azerbaijan",
//     "🇧🇦 Bosnia",
//     "🇧🇾 Belarus",
//     "🇮🇱 Israel",
//     "🇮🇶 Iraq",
//     "🇯🇴 Jordan",
//     "🇰🇬 Kyrgyzstan",
//     "🇰🇿 Kazakhstan",
//     "🇱🇧 Lebanon",
//     "🇲🇩 Moldova",
//     "🇲🇪 Montenegro",
//     "🇲🇰 Macedonia",
//     "🇵🇰 Pakistan",
//     "🇷🇸 Serbia",
//     // "🇷🇺 Russia",
//     "🇹🇷 Turkey",
//     "🇺🇦 Ukraine",
//     "🇺🇿 Uzbekistan",
//   ],
//   "APAC": [
//     "🇦🇺 Australia",
//     "🇮🇳 India",
//     "🇯🇵 Japan",
//     "🇰🇷 South Korea"
//   ]
// };

// const tooltip = document.getElementById('tooltip');
// const tooltipTitle = document.getElementById('tooltip-title');
// const tooltipList = document.getElementById('tooltip-list');
// const points = document.querySelectorAll('.map-point');

// points.forEach(point => {
//   point.addEventListener('mouseenter', showTooltip);
//   point.addEventListener('click', showTooltip);
//   point.addEventListener('mouseleave', hideTooltip);
//   point.addEventListener('touchstart', showTooltip); // mobile touch fix
// });

// document.addEventListener('click', function (event) {
//   if (!event.target.classList.contains('map-point')) {
//     hideTooltip();
//   }
// });

// function showTooltip(e) {
//   e.stopPropagation();
//   const region = e.target.dataset.region;
//   if (region && regionsData[region]) {
//     tooltipTitle.textContent = region;
//     tooltipList.innerHTML = regionsData[region].map(country => `<li>${country}</li>`).join('');

//     if (region === "EEMEA") {
//       tooltipList.classList.add('three-columns');
//       tooltip.classList.add('three-columns');
//     } else {
//       tooltipList.classList.remove('three-columns');
//       tooltip.classList.remove('three-columns');
//     }

//     const rect = e.target.getBoundingClientRect();
//     const containerRect = document.querySelector('.markets__map-container').getBoundingClientRect();

//     let left = rect.left - containerRect.left + 25;
//     let top = rect.top - containerRect.top - 20;

//     if (left + tooltip.offsetWidth > containerRect.width) {
//       left = containerRect.width - tooltip.offsetWidth - 10;
//     }
//     if (top < 0) {
//       top = rect.top - containerRect.top + 25;
//     }
//     if (top + tooltip.offsetHeight > containerRect.height) {
//       top = containerRect.height - tooltip.offsetHeight - 10;
//     }

//     tooltip.style.left = left + 'px';
//     tooltip.style.top = top + 'px';

//     tooltip.classList.add('active');
//   }
// }

// function hideTooltip() {
//   tooltip.classList.remove('active');
// }

const regionsData = {
  Europe: ["🇪🇺 European Union", "🇨🇭 Switzerland", "🇬🇧 United Kingdom"],
  Americas: [
    "🇨🇦 Canada",
    "🇺🇸 United States",
    "🇦🇷 Argentina",
    "🇨🇴 Colombia",
    "🇲🇽 Mexico",
  ],
  EEMEA: [
    "🇦🇱 Albania",
    "🇦🇿 Azerbaijan",
    "🇧🇦 Bosnia",
    "🇧🇾 Belarus",
    "🇮🇱 Israel",
    "🇮🇶 Iraq",
    "🇯🇴 Jordan",
    "🇰🇬 Kyrgyzstan",
    "🇰🇿 Kazakhstan",
    "🇱🇧 Lebanon",
    "🇲🇩 Moldova",
    "🇲🇪 Montenegro",
    "🇲🇰 Macedonia",
    "🇵🇰 Pakistan",
    "🇷🇸 Serbia",
    // "🇷🇺 Russia",
    "🇹🇷 Turkey",
    "🇺🇦 Ukraine",
    "🇺🇿 Uzbekistan",
  ],
  APAC: ["🇦🇺 Australia", "🇮🇳 India", "🇯🇵 Japan", "🇰🇷 South Korea"],
};

const tooltip = document.getElementById("tooltip");
const tooltipTitle = document.getElementById("tooltip-title");
const tooltipList = document.getElementById("tooltip-list");
const points = document.querySelectorAll(".map-point");

// let currentRegion = null; // Track currently shown region

// points.forEach(point => {
//   point.addEventListener('mouseenter', showTooltip);
//   point.addEventListener('click', showTooltip);
//   point.addEventListener('mouseleave', hideTooltip);
//   point.addEventListener('touchstart', showTooltip, { passive: true });
// });

// document.addEventListener('click', function (event) {
//   if (!event.target.closest('.map-point')) {
//     hideTooltip();
//   }
// });

let currentRegion = null;
let touchTriggered = false; // 👈 new

const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

points.forEach((point) => {
  point.addEventListener("touchstart", function (e) {
    touchTriggered = true;
    showTooltip(e);
  });
  point.addEventListener("click", function (e) {
    if (touchTriggered) {
      touchTriggered = false;
      return;
    }
    showTooltip(e);
  });

  if (!isTouchDevice) {
    point.addEventListener("mouseenter", showTooltip);
    point.addEventListener("mouseleave", hideTooltip);
  }
});

document.addEventListener("pointerdown", function (event) {
  if (
    !event.target.closest(".map-point") &&
    !event.target.closest("#tooltip")
  ) {
    hideTooltip();
  }
});


// points.forEach((point) => {
//   point.addEventListener("touchstart", function (e) {
//     touchTriggered = true;
//     showTooltip(e);
//   });
//   point.addEventListener("click", function (e) {
//     if (touchTriggered) {
//       touchTriggered = false;
//       return; // 👈 Skip click if it was right after touch
//     }
//     showTooltip(e);
//   });
//   point.addEventListener("mouseenter", showTooltip);
//   point.addEventListener("mouseleave", hideTooltip);
// });

// points.forEach((point) => {
//   point.addEventListener("touchstart", function (e) {
//     touchTriggered = true;
//     showTooltip(e);
//   });
//   point.addEventListener("click", function (e) {
//     if (touchTriggered) {
//       touchTriggered = false;
//       return; // Skip click if it was right after touch
//     }
//     showTooltip(e);
//   });
// });

// document.addEventListener("click", function (event) {
//   if (!event.target.classList.contains("map-point")) {
//     hideTooltip();
//   }
// });

// document.addEventListener("click", function (event) {
//   // 🛠 Only hide tooltip if clicked OUTSIDE both a map point and the tooltip itself
//   if (
//     !event.target.closest(".map-point") &&
//     !event.target.closest("#tooltip")
//   ) {
//     hideTooltip();
//   }
// });

// document.addEventListener("pointerdown", function (event) {
//   if (
//     !event.target.closest(".map-point") &&
//     !event.target.closest("#tooltip")
//   ) {
//     hideTooltip();
//   }
// });

// function showTooltip(e) {
//   e.stopPropagation();
//   const region = e.target.dataset.region;

//   if (!region || !regionsData[region]) return;

//   if (currentRegion !== region) {
//     currentRegion = region; // Update current region

//     tooltipTitle.textContent = region;
//     tooltipList.innerHTML = regionsData[region].map(country => `<li>${country}</li>`).join('');

//     if (region === "EEMEA") {
//       tooltipList.classList.add('three-columns');
//       tooltip.classList.add('three-columns');
//     } else {
//       tooltipList.classList.remove('three-columns');
//       tooltip.classList.remove('three-columns');
//     }
//   }

//   const rect = e.target.getBoundingClientRect();
//   const containerRect = document.querySelector('.markets__map-container').getBoundingClientRect();

//   let left, top;

//   if (region === "APAC") {
//     left = rect.left - containerRect.left - tooltip.offsetWidth - 15;
//   } else {
//     left = rect.left - containerRect.left + 25;
//   }

//   top = rect.top - containerRect.top - 20;

//   if (left + tooltip.offsetWidth > containerRect.width) {
//     left = containerRect.width - tooltip.offsetWidth - 10;
//   }
//   if (left < 0) {
//     left = 10;
//   }
//   if (top < 0) {
//     top = rect.top - containerRect.top + 25;
//   }
//   if (top + tooltip.offsetHeight > containerRect.height) {
//     top = containerRect.height - tooltip.offsetHeight - 10;
//   }

//   tooltip.style.left = left + 'px';
//   tooltip.style.top = top + 'px';

//   tooltip.classList.add('active');
// }

// function hideTooltip() {
//   tooltip.classList.remove('active');
//   currentRegion = null; // Reset
// }

// function showTooltip(e) {
//   e.stopPropagation();
//   const region = e.currentTarget.dataset.region;


//   // 🛑 If the tooltip is already showing for this region, do nothing
//   if (currentRegion === region) {
//     return;
//   }

//   currentRegion = region; // Update the current region

//   if (region && regionsData[region]) {
//     tooltipTitle.textContent = region;
//     tooltipList.innerHTML = regionsData[region]
//       .map((country) => `<li>${country}</li>`)
//       .join("");

//     if (region === "EEMEA") {
//       tooltipList.classList.add("three-columns");
//       tooltip.classList.add("three-columns");
//     } else {
//       tooltipList.classList.remove("three-columns");
//       tooltip.classList.remove("three-columns");
//     }

//     const rect = e.currentTarget.getBoundingClientRect();
//     const containerRect = document
//       .querySelector(".markets__map-container")
//       .getBoundingClientRect();

//     let left = rect.left - containerRect.left + 60;
//     let top = rect.top - containerRect.top - 30;

//     if (region === "APAC") {
//       left = rect.left - containerRect.left - tooltip.offsetWidth - 25; // Left side for APAC
//     }

//     if (left + tooltip.offsetWidth > containerRect.width) {
//       left = containerRect.width - tooltip.offsetWidth - 10;
//     }
//     if (top < 0) {
//       top = rect.top - containerRect.top + 25;
//     }
//     if (top + tooltip.offsetHeight > containerRect.height) {
//       top = containerRect.height - tooltip.offsetHeight - 10;
//     }

//     tooltip.style.left = left + "px";
//     tooltip.style.top = top + "px";

//     tooltip.classList.add("active");
//   }
// }

function showTooltip(e) {
  e.stopPropagation();
  const region = e.currentTarget.dataset.region; // 👈 FIXED HERE!!

  if (currentRegion === region) {
    return;
  }

  currentRegion = region;

  if (region && regionsData[region]) {
    tooltipTitle.textContent = region;
    tooltipList.innerHTML = regionsData[region]
      .map((country) => `<li>${country}</li>`)
      .join("");

    if (region === "EEMEA") {
      tooltipList.classList.add("three-columns");
      tooltip.classList.add("three-columns");
    } else {
      tooltipList.classList.remove("three-columns");
      tooltip.classList.remove("three-columns");
    }

    const mq = window.matchMedia( "(max-width: 500px)" );
    const rect = e.currentTarget.getBoundingClientRect(); // 👈 Also changed to currentTarget!
    const containerRect = document
      .querySelector(".markets__map-container")
      .getBoundingClientRect();

    let left = rect.left - containerRect.left + 60;
    let top = rect.top - containerRect.top - 30;

    if (region === "APAC") {
      left = rect.left - containerRect.left - tooltip.offsetWidth - 25;
    }

    // if (region === "EEMEA") {
    //   if (mq.matches) {
    //     left = rect.left - containerRect.left - tooltip.offsetWidth + 660;
    //   } else {
    //     left = rect.left - containerRect.left + 60;
    //   }
      
    // }

    if (left + tooltip.offsetWidth > containerRect.width) {
      left = containerRect.width - tooltip.offsetWidth - 4;
    }
    if (top < 0) {
      top = rect.top - containerRect.top + 25;
    }
    if (top + tooltip.offsetHeight > containerRect.height) {
      top = containerRect.height - tooltip.offsetHeight - 10;
    }

    tooltip.style.left = left + "px";
    tooltip.style.top = top + "px";

    tooltip.classList.add("active");
  }
}


function hideTooltip() {
  tooltip.classList.remove("active");
  currentRegion = null; // reset when hiding
}
