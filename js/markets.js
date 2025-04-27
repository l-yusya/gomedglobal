
const regionsData = {
  "Europe": [
    "🇪🇺 European Union",
    "🇨🇭 Switzerland",
    "🇬🇧 United Kingdom",
  ],
  "Americas": [
    "🇨🇦 Canada",
    "🇺🇸 United States",
    "🇦🇷 Argentina",
    "🇨🇴 Colombia",
    "🇲🇽 Mexico"
  ],
  "EEMEA": [
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
  "APAC": [
    "🇦🇺 Australia",
    "🇮🇳 India",
    "🇯🇵 Japan",
    "🇰🇷 South Korea"
  ]
};

const tooltip = document.getElementById('tooltip');
const tooltipTitle = document.getElementById('tooltip-title');
const tooltipList = document.getElementById('tooltip-list');
const points = document.querySelectorAll('.map-point');

points.forEach(point => {
  point.addEventListener('mouseenter', showTooltip);
  point.addEventListener('click', showTooltip);
  point.addEventListener('mouseleave', hideTooltip);
  point.addEventListener('touchstart', showTooltip); // mobile touch fix
});

document.addEventListener('click', function (event) {
  if (!event.target.classList.contains('map-point')) {
    hideTooltip();
  }
});

function showTooltip(e) {
  e.stopPropagation();
  const region = e.target.dataset.region;
  if (region && regionsData[region]) {
    tooltipTitle.textContent = region;
    tooltipList.innerHTML = regionsData[region].map(country => `<li>${country}</li>`).join('');

    if (region === "EEMEA") {
      tooltipList.classList.add('three-columns');
      tooltip.classList.add('three-columns');
    } else {
      tooltipList.classList.remove('three-columns');
      tooltip.classList.remove('three-columns');
    }



    const rect = e.target.getBoundingClientRect();
    const containerRect = document.querySelector('.markets__map-container').getBoundingClientRect();

    let left = rect.left - containerRect.left + 25;
    let top = rect.top - containerRect.top - 20;

    if (left + tooltip.offsetWidth > containerRect.width) {
      left = containerRect.width - tooltip.offsetWidth - 10;
    }
    if (top < 0) {
      top = rect.top - containerRect.top + 25;
    }
    if (top + tooltip.offsetHeight > containerRect.height) {
      top = containerRect.height - tooltip.offsetHeight - 10;
    }

    tooltip.style.left = left + 'px';
    tooltip.style.top = top + 'px';

    tooltip.classList.add('active');
  }
}

function hideTooltip() {
  tooltip.classList.remove('active');
}


