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
        const res = await fetch(`/api/images`)
        const filenames = await res.json()

        gallery.innerHTML = ``
        imgSelect.innerHTML = ``

        filenames.forEach((filename) => {
            const img = document.createElement(`img`)
            img.src = `../uploads/${filename}`
            img.alt = filename
            img.width = 100
            gallery.appendChild(img)

            const option = document.createElement(`option`)
            option.value = filename
            option.textContent = filename
            imgSelect.appendChild(option)
        })
    } catch (err) {
        console.error(`Error loading image: `, err)
    }
}

// Upload Image
uploadForm.addEventListener(`submit`, async (e) => {
    e.preventDefault()

    const fileInput = document.getElementById(`imgUpload`)
    const file = fileInput.files[0]
    if (!file) {
        alert(`Please choose a file to upload`)
        return
    }

    const formData = new FormData()
    formData.append(`image`, file)

    try {
        const res = await fetch(`/api/upload/`, {
            method: `POST`,
            body: formData
        })

        if (!res.ok) {
            const data = await res.json()
            alert(`Upload failed: ${data.error}`)
        }

        await loadImgs()
    } catch (err) {
        console.error(`Upload Failed: `, err)
    }
})

// Resize Image
resizeBtn.addEventListener(`click`, () => {
    const filename = imgSelect.value
    const width = widthInput.value
    const height = heightInput.value

    if (!filename || !width || !height) {
        alert(`Please provide filename, width, and height`)
        return
    }

    const resizedURL = `/api/resize?filename=${filename}&&width=${width}&&height=${height}`
    window.open(resizedURL, `_blank`)
})

// Initial Load
loadImgs()