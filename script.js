// ===== DOM Elements =====
const tabs = document.querySelectorAll('.tab');
const navLinks = document.querySelectorAll('.nav-links a');
const uploadBtn = document.querySelector('.upload-btn');
const loadMoreBtn = document.querySelector('.btn-outline');
const searchButtons = document.querySelectorAll('.search-btn, .search-banner button');
const likeButtons = document.querySelectorAll('.icon-btn:not(.download)');
const downloadButtons = document.querySelectorAll('.icon-btn.download');

// ===== Tab Switching =====
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    
    // Add animation effect
    const wallpaperGrid = document.querySelector('.wallpaper-grid');
    wallpaperGrid.style.opacity = '0.5';
    setTimeout(() => {
      wallpaperGrid.style.opacity = '1';
    }, 300);
  });
});

// ===== Navigation Links Active State =====
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  });
});

// ===== Upload Button =====
uploadBtn.addEventListener('click', () => {
  alert('Upload feature coming soon! 📤');
});

// ===== Load More Functionality =====
let cardCount = 8;
loadMoreBtn.addEventListener('click', () => {
  const wallpaperGrid = document.querySelector('.wallpaper-grid');
  
  for (let i = 0; i < 8; i++) {
    const newCard = createWallpaperCard(cardCount + i);
    wallpaperGrid.appendChild(newCard);
    
    // Add entrance animation
    setTimeout(() => {
      newCard.style.animation = 'slideIn 0.5s ease-out';
    }, i * 50);
  }
  
  cardCount += 8;
  
  // Show feedback
  loadMoreBtn.textContent = `✓ Loaded ${cardCount} wallpapers`;
  setTimeout(() => {
    loadMoreBtn.textContent = 'Load More Wallpapers';
  }, 2000);
});

// ===== Create Wallpaper Card =====
function createWallpaperCard(index) {
  const card = document.createElement('div');
  card.className = 'wallpaper-card';
  
  const thumbClass = `thumb thumb-${(index % 8) + 1}`;
  const resolution = ['3840×2160', '7680×4320', '5120×1440'][Math.floor(Math.random() * 3)];
  const badge = ['4K', '8K', 'DUAL'][Math.floor(Math.random() * 3)];
  const likes = Math.floor(Math.random() * 5000) + 500;
  
  card.innerHTML = `
    <div class="${thumbClass}"></div>
    <div class="card-overlay">
      <div class="card-info">
        <span class="badge">${badge}</span>
        <span class="res">${resolution}</span>
      </div>
      <div class="card-actions">
        <button class="icon-btn">♡ ${likes}</button>
        <button class="icon-btn download">⬇ Download</button>
      </div>
    </div>
  `;
  
  // Add like and download listeners
  const likeBtn = card.querySelector('.icon-btn:not(.download)');
  const downloadBtn = card.querySelector('.icon-btn.download');
  
  likeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    handleLike(likeBtn);
  });
  
  downloadBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    handleDownload();
  });
  
  return card;
}

// ===== Like Functionality =====
function handleLike(button) {
  const textContent = button.textContent;
  const likeCount = parseInt(textContent.match(/\d+/)[0]);
  
  if (button.textContent.includes('♡')) {
    button.textContent = `♥ ${likeCount + 1}`;
    button.style.color = '#ff0080';
    button.style.borderColor = '#ff0080';
  } else {
    button.textContent = `♡ ${likeCount - 1}`;
    button.style.color = 'var(--primary-color)';
    button.style.borderColor = 'var(--primary-color)';
  }
}

// Add like listeners to existing buttons
likeButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    handleLike(btn);
  });
});

// ===== Download Functionality =====
function handleDownload() {
  const resolutions = ['3840×2160', '7680×4320', '5120×1440'];
  const randomRes = resolutions[Math.floor(Math.random() * resolutions.length)];
  alert(`🎉 Wallpaper (${randomRes}) is downloading!\n\nThank you for using fighter.wall.com!`);
}

downloadButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    handleDownload();
  });
});

// ===== Search Functionality =====
searchButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const input = btn.previousElementSibling || document.querySelector('input[placeholder="Search wallpapers..."]');
    const searchTerm = input.value.trim();
    
    if (searchTerm) {
      alert(`🔍 Searching for: "${searchTerm}"\n\nFound 42 results!`);
      input.value = '';
    } else {
      alert('Please enter a search term!');
    }
  });
});

// ===== Keyboard Navigation =====
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const activeElement = document.activeElement;
    if (activeElement.tagName === 'INPUT') {
      const button = activeElement.nextElementSibling;
      if (button && button.classList.contains('search-btn')) {
        button.click();
      }
    }
  }
});

// ===== Smooth Scroll for Navigation =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== Add CSS Animation =====
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .wallpaper-grid {
    transition: opacity 0.3s ease;
  }

  .wallpaper-card {
    animation: slideIn 0.5s ease-out;
  }
`;
document.head.appendChild(style);

// ===== Initialize =====
console.log('🎮 Fighter Wallpapers - Website Loaded Successfully!');
console.log('Total wallpapers loaded:', document.querySelectorAll('.wallpaper-card').length);
