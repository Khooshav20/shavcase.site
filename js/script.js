/*==================== toggle icon navbar ====================*/
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};


/*==================== scroll sections active link ====================*/
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });

    /*==================== sticky navbar ====================*/
    let header = document.querySelector('header');

    header.classList.toggle('sticky', window.scrollY > 100);

    
    /*==================== remove toggle icon and navbar when click navbar link (scroll) ====================*/
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};


/*==================== scroll reveal ====================*/
const sr = ScrollReveal({
    /* reset: true, */
    distance: '80px',
    duration: 2000,
    delay: 150
});

sr.reveal('.home-content, .heading', { origin: 'top' });
sr.reveal('.home-img, .project-container, .contact form', { origin: 'bottom' });
sr.reveal('.home-content h1, .about-img', { origin: 'left' });
sr.reveal('.home-content p, .about-content', { origin: 'right' });


/*==================== typed js ====================*/

const typed = new Typed('.multiple-text', {
    strings: ['Software Engineer', 'Web Developer'],
    typeSpeed:200,
    backSpeed:400,
    backDelay: 2000,
    loop: true
});

/*==================== Show sucess message ====================*/
document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission

    let form = this;
    let formStatus = document.getElementById("form-status");

    fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            formStatus.innerHTML = "✅ Message sent successfully!";
            formStatus.style.color = "green";
            form.reset();
        } else {
            formStatus.innerHTML = "❌ Error sending message. Please try again.";
            formStatus.style.color = "red";
        }
    }).catch(error => {
        formStatus.innerHTML = "❌ Something went wrong.";
        formStatus.style.color = "red";
    });
});

/*==================== toggle description on and off ====================*/

function toggleDescription(id) {
    document.querySelectorAll('.project-description').forEach(description => {
        if (description.id !== id) {
            description.style.transform = "scaleY(0)"; // Collapse smoothly
            description.style.opacity = "0";
            description.style.padding = "0px 15px"; // Reduce padding smoothly
            setTimeout(() => description.style.maxHeight = "0px", 400); // Hides after animation
        }
    });

    var desc = document.getElementById(id);

    if (desc.style.transform === "scaleY(0)" || desc.style.opacity === "0") {
        desc.style.display = "block"; // Ensure it stays visible
        desc.style.maxHeight = "500px"; // Expand dynamically
        desc.style.padding = "15px"; // Restore padding
        desc.style.opacity = "1"; // Fade in
        desc.style.transform = "scaleY(1)"; // Expand smoothly
    } else {
        desc.style.transform = "scaleY(0)"; // Collapse smoothly
        desc.style.opacity = "0"; // Fade out
        desc.style.padding = "0px 15px"; // Shrink padding
        setTimeout(() => desc.style.maxHeight = "0px", 400); // Hide after animation
    }
}

/*==================== Flip to reveal ====================*/
function revealNumber() {
    document.querySelector(".flip-container").classList.toggle("active");
}


/*==================== Drop Songs ====================*/
// Open the modal when clicking the button
document.getElementById('submit-btn').addEventListener('click', function (event) {
    event.preventDefault(); // Prevent default link behavior

    const playlistInput = document.getElementById('playlist-input').value;

    if (playlistInput.trim() === "") {
        alert("Please enter a playlist or song!");
        return;
    }

    // Send data to Formspree
    fetch('https://formspree.io/f/xwpvrdkb', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ playlist: playlistInput }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            alert("Thanks for sharing your playlist! �");
            document.getElementById('playlist-input').value = ""; // Clear the input field
        } else {
            alert("Oops! Something went wrong. Please try again.");
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert("Oops! Something went wrong. Please try again.");
    });
});

