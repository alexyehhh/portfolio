
document.addEventListener('DOMContentLoaded', () => {
    // Hamburger menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinkItems = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Smooth scrolling and active link highlighting
    navLinkItems.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            const navHeight = document.querySelector('nav').offsetHeight;
            const targetPosition = targetSection.offsetTop - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Intersection Observer for active link highlighting on scroll
    const sections = document.querySelectorAll('.section');
    const observerOptions = {
        threshold: 0.3
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinkItems.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Contact form submission using EmailJS
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Collect form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const time = new Date().toLocaleString();

    if (!name || !email || !message) {
        formStatus.className = 'form-status error';
        formStatus.textContent = 'Please fill in all fields.';
        return;
    }

    formStatus.className = 'form-status';
    formStatus.textContent = 'Sending...';

    // Send email using EmailJS
    emailjs.send("service_0qw6k3h", "template_0p5hrz2", {
    name: name,
    email: email,
    message: message,
    time: time
    }).then(() => {
        formStatus.className = 'form-status success';
        formStatus.textContent = 'Message sent successfully!';

        // Fade out smoothly after 3 seconds
        setTimeout(() => {
            formStatus.classList.add('fade-out');
        }, 3000);

        // Hide and reset the message completely after fade
        setTimeout(() => {
            formStatus.className = 'form-status';
            formStatus.textContent = '';
        }, 4500);

        contactForm.reset();
    }).catch((error) => {
        console.error('EmailJS Error:', error);
        formStatus.className = 'form-status error';
        formStatus.textContent = 'Failed to send message. Please try again later.';

        // Fade out the error too
        setTimeout(() => {
            formStatus.classList.add('fade-out');
        }, 4000);

        setTimeout(() => {
            formStatus.className = 'form-status';
            formStatus.textContent = '';
        }, 6000);
    });
});

    // Navbar shadow on scroll
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('nav');
        if (window.scrollY > 100) {
            nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        } else {
            nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
});

// Automatically switch images in project sliders
document.addEventListener("DOMContentLoaded", function () {
    const sliders = document.querySelectorAll(".project-image-slider");

    sliders.forEach(slider => {
        const images = slider.querySelectorAll("img");
        let index = 0;

        if (images.length > 1) {
            setInterval(() => {
                images[index].classList.remove("active");
                index = (index + 1) % images.length;
                images[index].classList.add("active");
            }, 3000); // Switch every 3 seconds
        }
    });
});
