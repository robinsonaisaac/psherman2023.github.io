'use strict';

/**
 * Page navigation handler
 * Controls switching between different content sections
 */
document.addEventListener('DOMContentLoaded', () => {
  const navigationLinks = document.querySelectorAll('[data-nav-link]');
  const pages = document.querySelectorAll('[data-page]');
  
  // Set initial active page
  const setInitialPage = () => {
    const activeNavLink = document.querySelector('.navbar-link.active');
    if (activeNavLink) {
      const targetPage = activeNavLink.innerHTML.toLowerCase();
      pages.forEach(page => {
        if (page.dataset.page === targetPage) {
          page.classList.add('active');
        } else {
          page.classList.remove('active');
        }
      });
    }
  };
  
  // Handle navigation click
  navigationLinks.forEach(link => {
    link.addEventListener('click', () => {
      // Update active navigation link
      navigationLinks.forEach(navLink => navLink.classList.remove('active'));
      link.classList.add('active');
      
      // Update active page with smooth transition
      const targetPage = link.innerHTML.toLowerCase();
      pages.forEach(page => {
        if (page.dataset.page === targetPage) {
          // First remove active class from all pages
          pages.forEach(p => p.classList.remove('active'));
          
          // Small delay for animation effect
          setTimeout(() => {
            page.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }, 50);
        }
      });
    });
  });
  
  // Set initial state
  setInitialPage();
  
  /**
   * Animate expertise bars on scroll
   */
  const animateExpertiseBars = () => {
    const expertiseBars = document.querySelectorAll('.expertise-fill');
    
    if (expertiseBars.length > 0) {
      expertiseBars.forEach(bar => {
        // Reset width to 0 initially for animation
        bar.style.width = '0';
      });
      
      // Create intersection observer
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Animate to the specified width when visible
            const targetWidth = entry.target.getAttribute('style').split('width:')[1].trim();
            entry.target.style.width = '0'; // Reset first
            
            setTimeout(() => {
              entry.target.style.width = targetWidth;
            }, 100);
            
            // Unobserve after animation
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      
      // Observe each expertise bar
      expertiseBars.forEach(bar => {
        observer.observe(bar);
      });
    }
  };
  
  // Call on page load
  setTimeout(animateExpertiseBars, 300);
  
  /**
   * Publications filter functionality
   */
  const filterButtons = document.querySelectorAll('[data-filter-btn]');
  const publications = document.querySelectorAll('.publication');
  
  if (filterButtons.length > 0 && publications.length > 0) {
    // Filter publications by category with animation
    const filterPublications = (category) => {
      publications.forEach(publication => {
        if (category === 'all' || publication.dataset.category === category) {
          // First set opacity to 0
          publication.style.opacity = '0';
          publication.style.transform = 'translateY(10px)';
          
          // Then show and animate in
          publication.style.display = 'block';
          setTimeout(() => {
            publication.style.opacity = '1';
            publication.style.transform = 'translateY(0)';
          }, 50);
        } else {
          // Fade out then hide
          publication.style.opacity = '0';
          publication.style.transform = 'translateY(10px)';
          
          setTimeout(() => {
            publication.style.display = 'none';
          }, 300);
        }
      });
    };
    
    // Handle filter button clicks
    let activeFilterButton = filterButtons[0]; // Default to first button (All)
    
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Update active button
        activeFilterButton.classList.remove('active');
        button.classList.add('active');
        activeFilterButton = button;
        
        // Filter publications
        const category = button.innerHTML.toLowerCase();
        filterPublications(category);
      });
    });
    
    // Set initial styles for publications
    publications.forEach(publication => {
      publication.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    });
  }
  
  /**
   * Contact form validation
   */
  const form = document.querySelector('[data-form]');
  
  if (form) {
    const formInputs = form.querySelectorAll('[data-form-input]');
    const submitButton = form.querySelector('[data-form-btn]');
    
    // Validate form inputs
    const validateForm = () => {
      if (form.checkValidity()) {
        submitButton.removeAttribute('disabled');
      } else {
        submitButton.setAttribute('disabled', '');
      }
    };
    
    // Add input event listeners
    formInputs.forEach(input => {
      input.addEventListener('input', validateForm);
      
      // Add focus styles
      input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
      });
      
      input.addEventListener('blur', () => {
        input.parentElement.classList.remove('focused');
      });
    });
  }
  
  /**
   * Add hover effects for interactive elements
   */
  const addHoverEffects = () => {
    // Paper links hover effect
    const paperLinks = document.querySelectorAll('.paper-link');
    paperLinks.forEach(link => {
      link.addEventListener('mouseenter', () => {
        link.style.color = getComputedStyle(document.documentElement).getPropertyValue('--link-hover');
      });
      
      link.addEventListener('mouseleave', () => {
        link.style.color = getComputedStyle(document.documentElement).getPropertyValue('--link-color');
      });
    });
  };
  
  addHoverEffects();
});