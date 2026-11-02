// NAVBAR MENU
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

// Open and close the mobile navigation menu
menuToggle.addEventListener("click", function () {
    navLinks.classList.toggle("open");
    menuToggle.classList.toggle("active");
    const menuIsOpen = navLinks.classList.contains("open");
    menuToggle.setAttribute("aria-expanded", menuIsOpen);
});

// Close the mobile menu after clicking a navigation link
const navigationItems = document.querySelectorAll(".nav-links a");

navigationItems.forEach(function (item) {
    item.addEventListener("click", function () {
        navLinks.classList.remove("open");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
    });
});

// LIGHTBOX SLIDESHOW

// Select the gallery elements
const galleryImages = document.querySelectorAll(".gallery-image img");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const imageCaption = document.getElementById("imageCaption");
const closeLightbox = document.getElementById("lightboxClose");
const previousSlide = document.getElementById("previousSlide");
const nextSlide = document.getElementById("nextSlide");
const thumbnails = document.querySelectorAll(".thumbnail");
// Keep track of the currently displayed image
let currentImage = 0;

// Display the selected image
function showImage(imageNumber) {
    currentImage = imageNumber;
    const selectedImage = galleryImages[currentImage];
    // Change the large image
    lightboxImage.src = selectedImage.src;
    lightboxImage.alt = selectedImage.alt;
    // Update the image caption
    imageCaption.textContent = "Image " + (currentImage + 1) + " of " + galleryImages.length;
    // Remove the active class from all thumbnails
    thumbnails.forEach(function (thumbnail) {
        thumbnail.classList.remove("active");
    });
    // Highlight the selected thumbnail
    thumbnails[currentImage].classList.add("active");
}

// Open the slideshow when a gallery image is clicked
galleryImages.forEach(function (image, index) {
    image.parentElement.addEventListener("click", function () {
        lightbox.classList.add("show");
        lightbox.setAttribute("aria-hidden", "false");
        document.body.classList.add("no-scroll");
        showImage(index);
    });
});

// Close the slideshow
function hideLightbox() {
    lightbox.classList.remove("show");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
}
closeLightbox.addEventListener("click", hideLightbox);

// Previous image button
previousSlide.addEventListener("click", function () {
    currentImage = currentImage - 1;
    // Return to the last image if we reach the beginning
    if (currentImage < 0) {
        currentImage = galleryImages.length - 1;
    }
    showImage(currentImage);
});

// Next image button
nextSlide.addEventListener("click", function () {
    currentImage = currentImage + 1;
    // Return to the first image if we reach the end
    if (currentImage >= galleryImages.length) {
        currentImage = 0;
    }
    showImage(currentImage);
});

// Click on thumbnails to select an image
thumbnails.forEach(function (thumbnail) {
    thumbnail.addEventListener("click", function () {
        const imageNumber = Number(thumbnail.getAttribute("data-index"));
        showImage(imageNumber);
    });
});

// Close slideshow when clicking outside the image
lightbox.addEventListener("click", function (event) {
    if (event.target === lightbox) {
        hideLightbox();
    }
});

// CONTACT FORM MODAL

// Select contact form elements
const openContact = document.getElementById("openContact");
const contactModal = document.getElementById("contactModal");
const closeContact = document.getElementById("closeContact");
const contactForm = document.getElementById("contactForm");
const formFeedback = document.getElementById("formFeedback");

// Open the contact form
openContact.addEventListener("click", function () {
    contactModal.classList.add("show");
    contactModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
});

// Close the contact form
function hideContactForm() {
    contactModal.classList.remove("show");
    contactModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
}

closeContact.addEventListener("click", hideContactForm);

// Close popups using the Escape key
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        hideLightbox();
        hideContactForm();
    }
    // Navigate slideshow using keyboard arrows
    if (lightbox.classList.contains("show")) {
        if (event.key === "ArrowLeft") {
            previousSlide.click();
        }
        if (event.key === "ArrowRight") {
            nextSlide.click();
        }
    }
});

// Close contact form when clicking outside the form
contactModal.addEventListener("click", function (event) {
    if (event.target === contactModal) {
        hideContactForm();
    }
});

// Contact form submission
contactForm.addEventListener("submit", function (event) {
    // Prevent the page from refreshing
    event.preventDefault();
    formFeedback.textContent = "Thanks! Your form is ready to be connected to an email service.";
    // Clear the form
    contactForm.reset();
});
