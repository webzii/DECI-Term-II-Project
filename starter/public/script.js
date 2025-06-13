// Get references to DOM elements
const gallery = document.getElementById('gallery')
const imgSelect = document.getElementById('imgSelect')
const uploadForm = document.getElementById('uploadForm')
const resizeBtn = document.getElementById('resizeBtn')

const widthInput = document.getElementById('widthInput')
const heightInput = document.getElementById('heightInput')

// Fetch Image List from Server
async function loadImgs() {
    try {
        const res = await fetch('/api/images')
        const filenames = await res.json()

        // Clear previous content
        gallery.innerHTML = ''
        imgSelect.innerHTML = ''

        filenames.forEach((filename) => {
            const img = document.createElement('img')
            img.src = `/uploads/${filename}`
            img.alt = filename
            img.width = 100
            gallery.appendChild(img)

            const option = document.createElement('option')
            option.value = filename
            option.textContent = filename
            imgSelect.appendChild(option)
        })
    } catch (err) {
        console.error('Error loading images:', err)
    }
}

// Upload Image
uploadForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    const fileInput = document.querySelector('input[type="file"]')
    if (!fileInput.files.length) {
        alert('Please select a file.')
        return
    }

    const formData = new FormData()
    formData.append('image', fileInput.files[0])

    try {
        const res = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
        })

        const contentType = res.headers.get('content-type')

        if (!res.ok) {
            const errorText = contentType?.includes('application/json')
                ? (await res.json()).error
                : await res.text()
            throw new Error(errorText || 'Upload failed')
        }

        const result = await res.json()
        alert(result.message)
        console.log(result)

        loadImgs() // Refresh gallery
    } catch (err) {
        alert('Upload Failed: ' + err.message)
        console.error(err)
    }
})

// Resize Image
resizeBtn.addEventListener('click', () => {
    const filename = imgSelect.value
    const width = widthInput.value
    const height = heightInput.value

    if (!filename || !width || !height) {
        alert('Please provide filename, width, and height')
        return
    }

    const resizedURL = `/api/resize?filename=${filename}&width=${width}&height=${height}`
    window.open(resizedURL, '_blank')
})

// Initial Load
loadImgs()