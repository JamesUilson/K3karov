// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Navigation elements
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileNav = document.getElementById('mobileNav');
    const sections = document.querySelectorAll('section');
    
    // Form elements
    const payBtn = document.getElementById('payBtn');
    const successModal = document.getElementById('successModal');
    const successClose = document.getElementById('successClose');
    const enrollButtons = document.querySelectorAll('#btnEnroll, #advantagesEnroll');
    
    // Set current year
    const yearElement = document.getElementById('yr');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Navigation functionality
    function showSection(sectionId) {
        // Hide all sections
        sections.forEach(section => {
            section.classList.add('hidden');
        });
        
        // Remove active class from all nav links
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        // Show selected section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.remove('hidden');
        }
        
        // Add active class to corresponding nav link
        const activeNavLink = document.querySelector(`[data-link="${sectionId}"]`);
        if (activeNavLink) {
            activeNavLink.classList.add('active');
        }
        
        // Update mobile select
        if (mobileNav) {
            mobileNav.value = sectionId;
        }
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // Desktop nav link click events
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const sectionId = this.getAttribute('data-link');
            showSection(sectionId);
        });
    });
    
    // Mobile nav change event
    if (mobileNav) {
        mobileNav.addEventListener('change', function() {
            showSection(this.value);
        });
    }
    
    // Secondary buttons navigation
    const secondaryButtons = document.querySelectorAll('.btn-secondary');
    secondaryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const sectionId = this.getAttribute('data-link');
            if (sectionId) {
                showSection(sectionId);
            }
        });
    });
    
    // Payment form submission
    if (payBtn) {
        payBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('inputName').value;
            const phone = document.getElementById('inputPhone').value;
            const email = document.getElementById('inputEmail').value;
            
            // Basic validation
            if (!name || !phone) {
                alert('Iltimos, ismingiz va telefon raqamingizni kiriting!');
                return;
            }
            
            // Phone number validation
            const phoneRegex = /^\+998\d{9}$/;
            if (!phoneRegex.test(phone)) {
                alert('Iltimos, to‘g‘ri telefon raqam kiriting (masalan: +998901234567)');
                return;
            }
            
            // Create Telegram message
            const message = `📋 Yangi ariza:\n\n👤 Ism: ${name}\n📞 Tel: ${phone}\n📧 Email: ${email || 'Ko‘rsatilmagan'}\n💳 Kurs: Premium (2,000,000 UZS)\n\n⏰ Vaqt: ${new Date().toLocaleString('uz-UZ')}`;
            
            // Telegram bot URL
            const telegramUrl = `https://t.me/K3karovBot`;
            
            // Open Telegram
            window.open(telegramUrl, '_blank');
            
            // Show success modal
            if (successModal) {
                successModal.style.display = 'flex';
            }
            
            // Clear form
            document.getElementById('inputName').value = '';
            document.getElementById('inputPhone').value = '';
            document.getElementById('inputEmail').value = '';
        });
    }
    
    // Enroll buttons - go to payment section
    enrollButtons.forEach(button => {
        button.addEventListener('click', function() {
            showSection('payment');
        });
    });
    
    // Secret button functionality
    const secretBtn = document.getElementById('inviteTop');
    if (secretBtn) {
        secretBtn.addEventListener('click', function() {
            alert('🎉 Maxsus taklif! Birinchi 5 ta ro\'yxatdan o\'tganlar uchun qo\'shimcha 10% chegirma!');
        });
    }
    
    // Close modal
    if (successClose) {
        successClose.addEventListener('click', function() {
            if (successModal) {
                successModal.style.display = 'none';
            }
        });
    }
    
    // Close modal when clicking outside
    if (successModal) {
        successModal.addEventListener('click', function(e) {
            if (e.target === successModal) {
                successModal.style.display = 'none';
            }
        });
    }
    
    // ============================
    // O'QUVCHI PORTFOLIO MODALLARI
    // ============================
    
    // O'quvchi gallery itemlari
    const galleryItems = document.querySelectorAll('.gallery-item');
    const studentModals = document.querySelectorAll('.student-modal');
    const closeModalButtons = document.querySelectorAll('.close-modal');
    const viewPortfolioButtons = document.querySelectorAll('.view-portfolio');
    
    // Gallery item bosilganda modal ochish
    galleryItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Agar view portfolio tugmasi bosilgan bo'lsa, eventni to'xtatamiz
            if (e.target.closest('.view-portfolio')) {
                return;
            }
            
            const studentId = this.getAttribute('data-student');
            openStudentModal(studentId);
        });
    });
    
    // View portfolio tugmalari
    viewPortfolioButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // Bubblingni to'xtatish
            const studentId = this.closest('.gallery-item').getAttribute('data-student');
            openStudentModal(studentId);
        });
    });
    
    // Modal ochish funksiyasi
    function openStudentModal(studentId) {
        const modal = document.getElementById(`student${studentId}-modal`);
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            
            // Modalga fade in effekti
            modal.style.opacity = '0';
            modal.style.transition = 'opacity 0.3s ease';
            
            setTimeout(() => {
                modal.style.opacity = '1';
            }, 10);
        }
    }
    
    // Modal yopish funksiyasi
    function closeStudentModal(modal) {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }
    
    // Close tugmalari
    closeModalButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.student-modal');
            closeStudentModal(modal);
        });
    });
    
    // Tashqariga bosilganda modal yopish
    studentModals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeStudentModal(this);
            }
        });
    });
    
    // ESC tugmasi bilan modal yopish
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.student-modal[style*="display: block"]');
            if (openModal) {
                closeStudentModal(openModal);
            }
        }
    });
    
    // Gallery item hover effektlari
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Portfolio galereya itemlari
    const portfolioGalleryItems = document.querySelectorAll('.gallery-item-modal');
    portfolioGalleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const certificateName = this.querySelector('span').textContent;
            alert('📄 ' + certificateName + ' sertifikati\n\nBu sertifikat haqida batafsil ma\'lumot!');
        });
        
        // Hover effektlari
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 10px 25px rgba(0, 255, 255, 0.3)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Add some interactive effects
    const advantageCards = document.querySelectorAll('.advantage-card');
    advantageCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Form input animations
    const formInputs = document.querySelectorAll('.form-input');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });
    
    // Initialize first section
    showSection('home');
});

// Floating particles efekti
function createFloatingParticles() {
    const colors = ['#00ffff', '#0099ff', '#0066ff'];
    
    setInterval(() => {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.width = Math.random() * 4 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.top = '-10px';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '1';
        particle.style.opacity = Math.random() * 0.6 + 0.2;
        
        document.body.appendChild(particle);
        
        const animation = particle.animate([
            { transform: 'translateY(0) rotate(0deg)', opacity: particle.style.opacity },
            { transform: 'translateY(100vh) rotate(' + Math.random() * 360 + 'deg)', opacity: 0 }
        ], {
            duration: Math.random() * 3000 + 2000,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
        });
        
        animation.onfinish = () => {
            particle.remove();
        };
    }, 500);
}

// Sayt yuklanganda partikllarni ishga tushirish
window.addEventListener('load', function() {
    // createFloatingParticles(); // Agar kerak bo'lsa yoqing
});

// Smooth scroll efekti
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Carousel functionality
function initCarousel() {
    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    // Slidelarni ko'rsatish funksiyasi
    function showSlide(index) {
        // Faqat bitta slideni ko'rsatish
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        
        currentSlide = index;
    }
    
    // Keyingi slide
    function nextSlide() {
        let nextIndex = currentSlide + 1;
        if (nextIndex >= totalSlides) {
            nextIndex = 0;
        }
        showSlide(nextIndex);
    }
    
    // Oldingi slide
    function prevSlide() {
        let prevIndex = currentSlide - 1;
        if (prevIndex < 0) {
            prevIndex = totalSlides - 1;
        }
        showSlide(prevIndex);
    }
    
    // Tugmalarga event listener qo'shish
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    
    // Nuqtalarga event listener qo'shish
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });
    
    // Avtomatik aylanish
    let autoSlide = setInterval(nextSlide, 5000);
    
    // Carousel ustiga chiqilganda avtomatik to'xtatish
    const carousel = document.querySelector('.carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', () => {
            clearInterval(autoSlide);
        });
        
        carousel.addEventListener('mouseleave', () => {
            autoSlide = setInterval(nextSlide, 5000);
        });
    }
    
    // Touch events for mobile
    let startX = 0;
    let endX = 0;
    
    if (carousel) {
        carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        carousel.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            handleSwipe();
        });
    }
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide(); // Chapdan o'ngga surish
            } else {
                prevSlide(); // O'ngdan chapga surish
            }
        }
    }
}

// DOM yuklanganda carousel ni ishga tushirish
document.addEventListener('DOMContentLoaded', function() {
    initCarousel();
});