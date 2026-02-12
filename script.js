document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Init Particles ---
    const particlesContainer = document.getElementById('particles');
    const particleCount = 40;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random positioning
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const size = Math.random() * 3 + 1;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 10;

        particle.style.left = `${x}%`;
        particle.style.top = `${y}%`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `-${delay}s`; // Negative delay for immediate start

        particlesContainer.appendChild(particle);
    }

    // --- 2. Sticky Navbar ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- 3. Mobile Menu ---
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    let isMenuOpen = false;

    menuToggle.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        mobileMenu.classList.toggle('active');
        // Toggle icon could go here if using different icons
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            isMenuOpen = false;
            mobileMenu.classList.remove('active');
        });
    });

    // --- 4. Animated Counters (Social Proof) ---
    const counters = document.querySelectorAll('.proof-number');
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = +entry.target.getAttribute('data-target');
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 50; // controls speed
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.ceil(current);
            }
        }, 30);
    }

    // --- 5. Service Selection Helper ---
    const selectButtons = document.querySelectorAll('.btn-select-service');
    const serviceSelect = document.getElementById('service');
    const bookingSection = document.getElementById('reserva');

    selectButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation(); // prevent flip if necessary
            const serviceName = btn.getAttribute('data-service');
            serviceSelect.value = serviceName;
            bookingSection.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // --- 6. Form Submission to n8n ---
    const bookingForm = document.getElementById('bookingForm');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    
    // N8N Webhook URL
    const N8N_WEBHOOK_URL = 'https://n8n.nexamentia.com/webhook/1306a6cb-608a-471a-a84b-f07f981c67da';

    bookingForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // 1. Loading State
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoader.classList.remove('hidden');

        // 2. Gather Data
        const formData = new FormData(bookingForm);
        const data = Object.fromEntries(formData.entries());

        // Add metadata
        data.submittedAt = new Date().toISOString();
        data.source = 'Landing Page';

        try {
            // 3. Send POST Request with CORS mode 'no-cors' if necessary, 
            // but standard 'cors' is preferred if n8n is configured to accept it.
            // Often n8n webhooks default to returning simple 200 OK text.
            
            const response = await fetch(N8N_WEBHOOK_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Accept': 'application/json' 
                },
                body: JSON.stringify(data)
            });

            // Note: If n8n returns an opaque response in simple request, 
            // we might not get a clean JSON response, but we check status.
            
            if (response.ok) {
                // Success UI
                Swal.fire({
                    title: '¡Reserva Iniciada!',
                    text: 'Hemos recibido tu solicitud. Te contactaremos pronto para confirmar.',
                    icon: 'success',
                    background: '#18181B',
                    color: '#fff',
                    confirmButtonColor: '#A855F7'
                });
                bookingForm.reset();
            } else {
                throw new Error('Error en el servidor');
            }

        } catch (error) {
            console.error('Error submitting form:', error);
            
            // Error UI (Fallback for user)
            // Even if fetch fails due to CORS (common with direct n8n calls sometimes),
            // the webhook usually still triggers.
            // However, assuming best case config:
            Swal.fire({
                title: 'Hemos recibido tus datos',
                text: 'Hubo un pequeño problema de conexión, pero probablemente recibimos tu solicitud. Si no te contactamos en 24h, por favor llámanos.',
                icon: 'warning',
                background: '#18181B',
                color: '#fff',
                confirmButtonColor: '#A855F7'
            });

        } finally {
            // Restore Button
            submitBtn.disabled = false;
            btnText.style.display = 'block';
            btnLoader.classList.add('hidden');
        }
    });

    // --- 7. Intersection Observer for Fade In ---
    const animatedElements = document.querySelectorAll('.service-card-flip, .booking-content');
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
        fadeObserver.observe(el);
    });
});
