// Get references to DOM elements
const gallery = document.getElementById(`gallery`)
const imgSelect = document.getElementById(`imgSelect`)
const uploadForm = document.getElementById(`uploadForm`)
const imgSubmitBtn = document.getElementById(`imgSubmitBtn`)
const resizeBtn = document.getElementById(`resizeBtn`)

const widthInput = document.getElementById(`widthInput`)
const heightInput = document.getElementById(`heightInput`)

// Fetch Image List from Server
async function loadImgs() {
    try{
        // Fetch list of image filenames from backend
        const res = await fetch(`/api/images`)
        const filenames = await res.json()

        // Clear previous gallery content and dropdown options
        gallery.innerHTML = ``
        imgSelect.innerHTML = ``

        // Loop through filenames and display images in gallery and options in dropdown
        filenames.forEach((filename) => {
            const img = document.createElement(`img`)
            img.src = `../uploads/${filename}` // Set image source path
            img.alt = filename // Set alt text
            img.width = 100 // Thumbnail size
            gallery.appendChild(img) // Add image to gallery

            const option = document.createElement(`option`)
            option.value = filename // Set option value to filename
            option.textContent = filename // Display filename in dropdown
            imgSelect.appendChild(option) // Add option to select dropdown
        })
    } catch (err) {
        console.error(`Error loading image: `, err) // Log any fetch error
    }
}

// Upload Image
uploadForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(uploadForm);

    try {
        const res = await fetch('/api/images/upload', {
            method: 'POST',
            body: formData
        });

        const data = await res.json();

        if (!res.ok) {
            // Show error immediately
            alert(data.error || 'Upload failed. Unknown error.');
            return;
        }

        alert(data.message);
        loadImgs(); // Refresh gallery without page reload
    } catch (err) {
        alert('Upload failed. Server returned invalid response.');
    }
});

// Resize Image
resizeBtn.addEventListener(`click`, () => {
    const filename = imgSelect.value // Get selected filename
    const width = widthInput.value // Get width input value
    const height = heightInput.value // Get height input value

    if (!filename || !width || !height) {
        alert(`Please provide filename, width, and height`) // Validate inputs
        return
    }

    // Open resized image in a new browser tab
    const resizedURL = `/api/resize?filename=${filename}&&width=${width}&&height=${height}`
    window.open(resizedURL, `_blank`)
})

// Initial Load
loadImgs() // Load images when the page first loads