const regionsData = {
  Europe: ["🇪🇺 European Union", "🇨🇭 Switzerland", "🇬🇧 United Kingdom"],
  NORAM: [
    "🇨🇦 Canada",
    "🇺🇸 United States",
    "🇲🇽 Mexico",
  ],
  LATAM: [
    "🇦🇷 Argentina",
    "🇨🇴 Colombia",
  ],
  EEMEA: [
    "🇦🇱 Albania",
    "🇦🇿 Azerbaijan",
    "🇧🇦 Bosnia",
    "🇧🇾 Belarus",
    "🇮🇱 Israel",
    "🇯🇴 Jordan",
    "🇰🇬 Kyrgyzstan",
    "🇰🇿 Kazakhstan",
    "🇱🇧 Lebanon",
    "🇲🇩 Moldova",
    "🇲🇪 Montenegro",
    "🇲🇰 Macedonia",
    "🇵🇰 Pakistan",
    "🇷🇸 Serbia",
    "🇷🇺 Russia",
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


let currentRegion = null;
let touchTriggered = false;

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


// function showTooltip(e) {
//   e.stopPropagation();
//   const region = e.currentTarget.dataset.region;

//   if (currentRegion === region) {
//     return;
//   }

//   currentRegion = region;

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

//     const mq = window.matchMedia("(max-width: 500px)");
//     const rect = e.currentTarget.getBoundingClientRect();
//     const containerRect = document
//       .querySelector(".markets__map-container")
//       .getBoundingClientRect();

//     let left = rect.left - containerRect.left + 60;
//     let top = rect.top - containerRect.top - 30;

//     if (region === "APAC") {
//       left = rect.left - containerRect.left - tooltip.offsetWidth - 25;
//     }

//     if (left + tooltip.offsetWidth > containerRect.width) {
//       left = containerRect.width - tooltip.offsetWidth - 4;
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

// Detect Windows OS
const isWindows = /Win/.test(navigator.platform);


function showTooltip(e) {
  e.stopPropagation();
  const region = e.currentTarget.dataset.region;

  if (currentRegion === region) {
    return;
  }

  currentRegion = region;

  if (region && regionsData[region]) {
    tooltipTitle.textContent = region;
    
    // Check if user is on Windows → remove flags
    if (isWindows) {
      tooltipList.innerHTML = regionsData[region]
        .map((country) => {
          // Remove flag emojis by taking the part after the first space
          const parts = country.split(" ");
          parts.shift(); // remove the first part (flag)
          return `<li>${parts.join(" ")}</li>`;
        })
        .join("");
    } else {
      tooltipList.innerHTML = regionsData[region]
        .map((country) => `<li>${country}</li>`)
        .join("");
    }

    if (region === "EEMEA") {
      tooltipList.classList.add("three-columns");
      tooltip.classList.add("three-columns");
    } else {
      tooltipList.classList.remove("three-columns");
      tooltip.classList.remove("three-columns");
    }

    const mq = window.matchMedia("(max-width: 500px)");
    const rect = e.currentTarget.getBoundingClientRect();
    const containerRect = document
      .querySelector(".markets__map-container")
      .getBoundingClientRect();

    let left = rect.left - containerRect.left + 60;
    let top = rect.top - containerRect.top - 30;

    if (region === "APAC") {
      left = rect.left - containerRect.left - tooltip.offsetWidth - 25;
    }

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
  currentRegion = null;
}
