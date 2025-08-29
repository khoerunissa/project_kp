document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

   
    const revealElements = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        for (let i = 0; i < revealElements.length; i++) {
            const windowHeight = window.innerHeight;
            const elementTop = revealElements[i].getBoundingClientRect().top;
            const elementVisible = 150; 
            if (elementTop < windowHeight - elementVisible) {
                revealElements[i].classList.add('active');
            } else {
                revealElements[i].classList.remove('active');
            }
        }
    };

    


    window.addEventListener('scroll', revealOnScroll);
    
    revealOnScroll();

    const contactForm = document.querySelector('form'); 
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); 
           
            let isValid = true;
            contactForm.querySelectorAll('[required]').forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('is-invalid'); 
                } else {
                    input.classList.remove('is-invalid');
                }
            });

            if (isValid) {
                alert('Pesan Anda telah terkirim! Kami akan segera menghubungi Anda.');
                this.reset();
                contactForm.querySelectorAll('.is-valid').forEach(input => {
                    input.classList.remove('is-valid');
                });
            } else {
                alert('Harap lengkapi semua kolom yang wajib diisi.');
            }
        });
    }
});
