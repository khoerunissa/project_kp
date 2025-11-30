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
    function initMap() {
    // Lokasi Pangandaran
    const pangandaran = { lat: -7.68485, lng: 108.65914 };

    // Custom style biar mirip peta COVID
    const styledMapType = [
        { elementType: "geometry", stylers: [{ color: "#e8edf1" }] },
        { elementType: "labels.text.fill", stylers: [{ color: "#424242" }] },
        { featureType: "water", stylers: [{ color: "#b4d6f2" }] },
        { featureType: "road", stylers: [{ color: "#ffffff" }] },
        { featureType: "landscape", stylers: [{ color: "#d6e2e8" }] },
    ];

    // Buat map
    const map = new google.maps.Map(document.getElementById("map"), {
        center: pangandaran,
        zoom: 12,
        styles: styledMapType,
    });

    // Marker lokasi
    new google.maps.Marker({
        position: pangandaran,
        map: map,
        title: "Pangandaran",
    });

    // Circle radius (optional)
    new google.maps.Circle({
        strokeColor: "#ff3b30",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#ff3b30",
        fillOpacity: 0.25,
        map,
        center: pangandaran,
        radius: 4000 // 4 KM
    });
}
// Script yang dipasang di halaman contact.html
let messages = JSON.parse(localStorage.getItem("messages") || "[]");
messages.push({ nama, email, isi });
localStorage.setItem("messages", JSON.stringify(messages));

});
document.querySelectorAll(".internet-tab").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".internet-tab").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        document.querySelectorAll(".internet-cards").forEach(s => s.style.display = "none");
        document.getElementById(btn.dataset.target).style.display = "grid";
    });
});
