// === Smooth scroll for nav links and Start Exploring ===
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth' });
  });
});

// === Fade-in on scroll ===
const faders = document.querySelectorAll('.fade-in');
const appearOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver((entries, appearOnScroll) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('appear');
    appearOnScroll.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});

// === Typing effect in Problem ===
const typingText = `"I gave up on cooking after burning pasta... SageBook changed everything!"`;
const typingEl = document.getElementById('typing-quote');
let i = 0;

function typeWriter() {
  if (i < typingText.length) {
    typingEl.innerHTML += typingText.charAt(i);
    i++;
    setTimeout(typeWriter, 50);
  }
}

window.addEventListener('scroll', () => {
  if (typingEl.getBoundingClientRect().top < window.innerHeight - 100 && typingEl.innerHTML === '') {
    typeWriter();
  }
});

// === Tab switcher for Solution section ===
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    const tab = button.getAttribute('data-tab');

    // Update button states
    tabButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    // Show corresponding tab content
    tabContents.forEach(content => {
      if (content.id === 'tab-' + tab) {
        content.classList.add('active');
      } else {
        content.classList.remove('active');
      }
    });
  });
});

// === Highlight active nav link based on URL ===
const navLinks = document.querySelectorAll('.nav-links a');
let currentPage = location.pathname.split('/').pop() || 'index.html';

navLinks.forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === 'index.html' && (href === 'index.html' || href === './' || href === '/'))) {
    link.classList.add('active');
  }
});

// === Toggle View Button ===
const toggleBtn = document.getElementById('toggleView');
const listView = document.getElementById('listView');
let showingList = false;

if (toggleBtn) {
  toggleBtn.addEventListener('click', () => {
    showingList = !showingList;
    listView.style.display = showingList ? 'block' : 'none';
    toggleBtn.textContent = showingList ? 'Switch to Gantt View' : 'Switch to List View';
  });
}

// === Smooth Scroll for anchor links ===
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    target?.scrollIntoView({ behavior: 'smooth' });
  });
});

// === Toggle sticky notes (click expands tooltip) ===
document.querySelectorAll('.gantt-cell.timeline .bar').forEach(bar => {
  bar.addEventListener('click', () => {
    bar.classList.toggle('expanded');
  });
});

// === Toggle quote bubbles ===
document.querySelectorAll('.quote-toggle').forEach(button => {
  button.addEventListener('click', () => {
    const quotes = button.nextElementSibling;
    quotes.classList.toggle('show');
  });
});

// === Target Audience Card Hover Effect ===
document.querySelectorAll('.audience-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.querySelector('.card-front').style.transform = 'rotateY(-180deg)';
    card.querySelector('.card-back').style.transform = 'rotateY(0deg)';
  });
  
  card.addEventListener('mouseleave', () => {
    card.querySelector('.card-front').style.transform = 'rotateY(0deg)';
    card.querySelector('.card-back').style.transform = 'rotateY(180deg)';
  });
});

// === Key Assumptions Accordion ===
document.querySelectorAll('.assumption-header').forEach(header => {
  header.addEventListener('click', () => {
    const assumption = header.parentElement;
    const isActive = assumption.classList.contains('active');
    
    // Close all assumptions first
    document.querySelectorAll('.assumption').forEach(a => {
      a.classList.remove('active');
    });
    
    // Open clicked one if it wasn't active
    if (!isActive) {
      assumption.classList.add('active');
    }
  });
});

// === Research Questions Accordion ===
document.querySelectorAll('.question-header').forEach(header => {
  header.addEventListener('click', () => {
    const question = header.parentElement;
    question.classList.toggle('active');
  });
});

// === Toggle All Research Questions ===
const toggleQuestionsBtn = document.getElementById('toggleQuestions');
if (toggleQuestionsBtn) {
  toggleQuestionsBtn.addEventListener('click', () => {
    const questions = document.querySelectorAll('.question');
    const allOpen = Array.from(questions).every(q => q.classList.contains('active'));
    
    questions.forEach(q => {
      if (allOpen) {
        q.classList.remove('active');
      } else {
        q.classList.add('active');
      }
    });
    
    toggleQuestionsBtn.textContent = allOpen ? 'Show All Answers' : 'Hide All Answers';
  });
}

// === Data Analysis Page Specific JS ===

// Initialize Mermaid diagrams
document.addEventListener('DOMContentLoaded', function() {
  if (typeof mermaid !== 'undefined') {
    mermaid.initialize({ 
      startOnLoad: true,
      theme: 'default',
      flowchart: {
        useMaxWidth: true,
        htmlLabels: true,
        curve: 'basis'
      }
    });
  }

  // Animate progress bars on scroll
  const progressBars = document.querySelectorAll('.progress-bar');
  const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const width = entry.target.style.width;
        entry.target.style.width = '0';
        setTimeout(() => {
          entry.target.style.width = width;
        }, 300);
      }
    });
  }, { threshold: 0.5 });

  progressBars.forEach(bar => {
    progressObserver.observe(bar);
  });

  // Persona card hover effect
  const personaCards = document.querySelectorAll('.synthesis-card');
  personaCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      const emoji = card.querySelector('.card-emoji');
      emoji.style.transform = 'scale(1.2) rotate(10deg)';
    });
    card.addEventListener('mouseleave', () => {
      const emoji = card.querySelector('.card-emoji');
      emoji.style.transform = 'scale(1) rotate(0)';
    });
  });

  // Feature card hover effect
  const featureCards = document.querySelectorAll('.feature-card');
  featureCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      const icon = card.querySelector('.feature-icon');
      icon.style.transform = 'scale(1.3)';
      icon.style.transition = 'transform 0.3s ease';
    });
    card.addEventListener('mouseleave', () => {
      const icon = card.querySelector('.feature-icon');
      icon.style.transform = 'scale(1)';
    });
  });

  // Timeline animation
  const timelineItems = document.querySelectorAll('.timeline-item');
  timelineItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-20px)';
    item.style.transition = `all 0.5s ease ${index * 0.2}s`;
    
    const timelineObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateX(0)';
        }
      });
    }, { threshold: 0.1 });
    
    timelineObserver.observe(item);
  });
});

// === Takeaway Card Hover Effect ===
document.querySelectorAll('.takeaway-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.querySelector('.card-front').style.transform = 'rotateY(-180deg)';
    card.querySelector('.card-back').style.transform = 'rotateY(0deg)';
  });
  
  card.addEventListener('mouseleave', () => {
    card.querySelector('.card-front').style.transform = 'rotateY(0deg)';
    card.querySelector('.card-back').style.transform = 'rotateY(180deg)';
  });
});

// Tab functionality for findings section
document.querySelectorAll('.findings-tabs .tab-button').forEach(button => {
  button.addEventListener('click', () => {
    const tabId = button.getAttribute('data-tab');
    const tabsContainer = button.closest('#findings');
    
    // Remove active class from all buttons and tabs
    tabsContainer.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    tabsContainer.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    
    // Add active class to clicked button and corresponding tab
    button.classList.add('active');
    tabsContainer.querySelector(`#tab-${tabId}`).classList.add('active');
  });
});

// Animate stats cards on scroll
const statCards = document.querySelectorAll('.stat-card');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

statCards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = 'all 0.6s ease-out';
  observer.observe(card);
});

// Animate insight cards with staggered delay
const insightCards = document.querySelectorAll('.insight-card');
insightCards.forEach((card, index) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
  
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });
  
  cardObserver.observe(card);
});

// Add hover effect to file cards
document.querySelectorAll('.file-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.querySelector('.file-icon').style.transform = 'scale(1.1)';
    card.querySelector('.file-icon').style.transition = 'transform 0.3s ease';
  });
  
  card.addEventListener('mouseleave', () => {
    card.querySelector('.file-icon').style.transform = 'scale(1)';
  });
});
