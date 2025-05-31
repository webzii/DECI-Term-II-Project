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
// Upload Image
uploadForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    const formData = new FormData(uploadForm)
    const fileInput = document.querySelector('input[type="file"]')
    const file = fileInput?.files[0]

    if (!file) {
        alert('Please select a file to upload.')
        return
    }

    try {
        const res = await fetch('/api/images/upload', {
            method: 'POST',
            body: formData,
        })

        const contentType = res.headers.get('content-type')

        if (contentType && contentType.includes('application/json')) {
            const data = await res.json()
            if (!res.ok) {
                throw new Error(data.error || 'Unknown upload error')
            }
            alert(data.message)
            loadImgs() // Refresh gallery on success
        } else {
            const text = await res.text()
            console.error('Non-JSON response from server:', text)
            alert('Upload failed. Server returned invalid response.')
        }
    } catch (err) {
        console.error('Upload error:', err)
        alert(err.message || 'Failed to upload image')
    }
})

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