let slideIndex = 1;

function openModal() {
    document.getElementById("modal").style.display = "block";
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function showSlides(n) {
    let i;
    const slides = document.getElementsByClassName("mySlides");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
}

// Initialize the gallery
showSlides(slideIndex);

// Preview the selected image
function previewImage() {
    const input = document.getElementById('imageInput');
    const preview = document.getElementById('imagePreview');

    if (input.files && input.files[0]) {
        const file = input.files[0];
        const reader = new FileReader();

        reader.onload = function (e) {
            // Clear previous content
            preview.innerHTML = '';

            // Create and display the image
            const img = document.createElement('img');
            img.src = e.target.result;
            img.alt = file.name;

            // Add the image to the preview section
            preview.appendChild(img);
        };

        reader.readAsDataURL(file);
    } else {
        preview.innerHTML = '<p>No image chosen</p>';
    }
}

// Add the selected image to the gallery
function addImage() {
    const input = document.getElementById('imageInput');
    const gallery = document.getElementById('gallery');
    const modalContent = document.getElementById('modalContent');

    if (input.files && input.files[0]) {
        const file = input.files[0];
        const reader = new FileReader();

        reader.onload = function (e) {
            // Add to gallery
            const thumbnail = document.createElement('div');
            thumbnail.classList.add('thumbnail');
            thumbnail.setAttribute('onclick', `openModal(); currentSlide(${gallery.children.length + 1})`);

            const img = document.createElement('img');
            img.src = e.target.result;
            img.alt = file.name;

            thumbnail.appendChild(img);
            gallery.appendChild(thumbnail);

            // Add to modal
            const slide = document.createElement('div');
            slide.classList.add('mySlides');

            const slideImg = document.createElement('img');
            slideImg.src = e.target.result;
            slideImg.alt = file.name;

            slide.appendChild(slideImg);
            modalContent.insertBefore(slide, modalContent.querySelector('.prev'));

            // Clear the preview after adding
            document.getElementById('imagePreview').innerHTML = '<p>No image chosen</p>';
        };

        reader.readAsDataURL(file);
    } else {
        alert('Please select an image file.');
    }
}
