// ===== Smooth Scroll & Active Navbar =====
const navLinks = document.querySelectorAll(".nav-links a");
navLinks.forEach(link => {
  link.addEventListener("click", function(e){
    e.preventDefault();
    const targetId = this.getAttribute("href").slice(1);
    const targetSection = document.getElementById(targetId);
    window.scrollTo({
      top: targetSection.offsetTop - 70,
      behavior: "smooth"
    });

    // Remove active from all links
    navLinks.forEach(l => l.classList.remove("active"));
    this.classList.add("active");
  });
});

// ===== Section Fade-in Animation =====
const sections = document.querySelectorAll(".section");
const observerOptions = { threshold: 0.2 };
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("fade-in");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

sections.forEach(section => observer.observe(section));

// ===== Navbar Active Link on Scroll =====
window.addEventListener("scroll", () => {
  const scrollPos = window.scrollY + 80; // Offset for header
  sections.forEach(section => {
    if(scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight){
      navLinks.forEach(link => link.classList.remove("active"));
      const activeLink = document.querySelector(`.nav-links a[href="#${section.id}"]`);
      if(activeLink) activeLink.classList.add("active");
    }
  });
});

// ===== Toggle More Personal Details =====
const moreBtn = document.getElementById("more-details-btn");
const moreDetails = document.getElementById("more-details");

moreBtn.addEventListener("click", () => {
  if(moreDetails.style.display === "block"){
    moreDetails.style.display = "none";
    moreBtn.textContent = "More Personal Details";
  } else {
    moreDetails.style.display = "block";
    moreBtn.textContent = "Less Personal Details";
  }
});

// Contact Item Animations
function triggerAnimation(type) {
  const item = document.querySelector(`.contact-item[data-type="${type}"]`);
  
  // Reset any ongoing animations
  item.classList.remove('animate-email', 'animate-phone', 'animate-location', 'animate-github');
  
  // Trigger reflow to restart animation
  void item.offsetWidth;
  
  // Add the specific animation class
  item.classList.add(`animate-${type}`);
  
  // Perform type-specific actions
  switch(type) {
    case 'email':
      copyToClipboard('shrabonigoswami77@gmail.com');
      showNotification('Email copied to clipboard!');
      break;
      
    case 'phone':
      // In a real implementation, you would initiate a phone call
      showNotification('Calling +8801992270782...');
      break;
      
    case 'location':
      // In a real implementation, you would open a map
      showNotification('Opening location in maps...');
      break;
      
    case 'github':
      // GitHub link already works via the anchor tag
      break;
  }
  
  // Remove animation class after it completes
  setTimeout(() => {
    item.classList.remove(`animate-${type}`);
  }, 1000);
}

// Helper function to copy to clipboard
function copyToClipboard(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
}

// Helper function to show notification
function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.add('show');
  }, 10);
  
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Add notification style
const style = document.createElement('style');
style.textContent = `
.notification {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%) translateY(100%);
  background: #5a67d8;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  z-index: 1000;
  transition: transform 0.3s ease;
}
.notification.show {
  transform: translateX(-50%) translateY(0);
}
`;
document.head.appendChild(style);