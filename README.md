# DECI-Term-II-Project

## Overview

This project is a full-stack TypeScript + Node.js + Express application designed to resize `.jpg` images using the Sharp library. It provides both:
- A **RESTful API** for uploading, resizing, and serving images, and
- A **simple frontend interface** that allows users to upload images, view them in a gallery, select images to resize, and preview results in the browser.
The project supports image caching for optimized performance and follows best practices for modular and scalable Express development. It also includes linting, formatting, and unit testing to ensure code quality and reliability.

---

## Key Features

- **Interactive Web Interface**: Includes a frontend UI to upload images, preview them in a gallery, select files from a dropdown, and trigger resizing directly from the browser.
- **Resize `.jpg` Images**: Resize images by specifying width and height via the API or the web interface.
- **API Endpoint for Resizing**: Accessible API endpoint (GET `/api/resize`) for handling image resizing requests.
- **Upload Endpoint**: Upload new images through a POST `/api/upload` endpoint, either via form or UI.
- **Image Gallery**: Automatically displays uploaded images in a gallery view.
- **Dynamic Image Selection**: Select images for resizing from a dropdown populated with available uploaded filenames.
- **Image Caching**: Avoids redundant processing by caching resized images.
- **Scalable Express Server**: Modular structure allows for maintainability and growth.
- **Image Processing with Sharp**: Fast, efficient, and production-grade image manipulation.
- **Unit Testing**: Jasmine tests to validate both resizing logic and API behavior.
- **Prettier and ESLint Integration**: Enforces clean, consistent code through automated formatting and linting.

---

## Installation and Usage Instructions

### Step 1: Clone the Repository
```bash
git clone <your-repo-url>
cd <project-folder>
```

### Step 2: Install Dependencies
Navigate to the project folder and install the required dependencies:
```bash
npm install
```

### Step 3: Create Necessary Folders
Ensure the following folders exist within the `starter/` directory:
```bash
mkdir starter/images
mkdir starter/cache
```

### Step 4: Add an Image to Test
Add a `.jpg` image (e.g., `fjord.jpg`) inside the `starter/images/` folder. This will be used for testing the resizing functionality.

### Step 5: Start the Server
Start the server by running:
```bash
npm run start
```
This launches the server on port `3000`, assuming you are using `ts-node` to run the `server.ts` file.

### Step 6: Use the API
To resize an image, make a GET request to the `/api/resize` endpoint with the required query parameters (`filename`, `width`, and `height`).

#### Example Request
```http
GET http://localhost:3000/api/resize?filename=fjord.jpg&width=300&height=300
```

### Step 7: Formatting and Linting (Optional)
- To format the code using Prettier:
  ```bash
  npm run format
  ```
- To check the code for linting issues using ESLint:
  ```bash
  npm run lint
  ```

### Step 8: Enable FrontEnd Interface

1. Serve Static Frontend Files
- In `server.ts`, serve the frontend HTML and script files by adding:
  ```ts
  app.use(express.static(path.join(__dirname, `..`, `starter`, `public`)))
  ```
- Ensure you have a `starter/public/` directory with:
  - `index.html`
  - `style.css`
  - `script.js`

2. Update Folder Structure
- Ensure these folders exist:
  ```bash
  mkdir -p starter/public uploads starter/images starter/cache
  ```

3. Fix Upload Path and Serve Uploaded Images
- In `uploadConfig.ts`, change the upload destination to:
  ```ts
  destination: (req, file, cb) => {
    // Define the uplaods folder path
    cb(null, path.join(__dirname, '../uploads'))
  }
  ```
- In `server.ts`, serve uploaded images statically:
  ```ts
  app.use(`/uploads`, express.static(path.join(__dirname, `..`, `uploads`)))
  ```

4. Update Filename Generation Logic
- Modify file naming logic in `uploadConfig.ts` to retain the original filename instead of generating random ones. This makes uploaded files recognizable in the dropdown menu:
  ```ts
  filename: (req, file, cb) => {
    // Use original filename
    cb(null, file.originalname)
  }
  ```

5. Fix JSON Structure for Image List API
- In `listImagesHandler` inside `imageRoutes.ts`, return just an array of strings instead of an object:
  ```ts
  res.status(200).json(images)
  ```

6. Frontend Gallery Script Enhancements
- The script.js was updated to:
  - Fetch uploaded image filenames from `/api/images`
  - Populate a `<select>` dropdown and display a preview gallery
  - Submit uploads using a form and reload the gallery after upload
  - Open the resized image in a new tab using query parameters
- Example request:
  ```js
  GET http://localhost:3000/api/resize?filename=fjord.jpg&width=300&height=300
  ```

---

## Testing

- This project uses Jasmine for unit testing backend functionality and includes manual testing guidelines for the frontend interface.

1. Backend Tests (Automated)
- Location: `tests/` directory (e.g., `imageService.spec.ts`)
- Covered:
  - Image Processing with Sharp
    - Resizes image to specified dimensions
    - Handles invalid image inputs
  - API Endpoint `/api/resize`
    - Returns status 200 for valid requests
    - Returns 400 or 500 for missing/invalid parameters

2. Frontend Tests (Manual)
- Since the frontend is lightweight, manual testing is currently recommended.
- Test the following manually:
  - Image Upload Flow
    - Upload an image via the form
    - Confirm it's visible in the gallery and dropdown list
  - Resizing Functionality
    - Select an image, input valid width/height
    - Click Resize and verify output image opens correctly in a new tab
  - Dynamic UI Updates
    - New uploads appear without refreshing
    - Gallery and dropdown update immediately

---

## API Endpoints
- This project exposes the following RESTful API endpoints:

### `GET /api/resize`
- Resizes an existing image with specified dimensions using Sharp.
- **Query Parameters**:
  - `filename` (string, required): Name of the image (e.g., `fjord.jpg`)
  - `width` (number, required): Desired width (e.g., `300`)
  - `height` (number, required): Desired height (e.g., `300`)
- Example Request:
  ```bash
  curl "http://localhost:3000/api/resize?filename=fjord.jpg&width=300&height=300" --output resized_image.jpg
  ```
- Success Response:
  - Returns the resized image file.
- Error Responses:
  - `400`: Invalid or missing query parameters
  - `500`: Failed to process image

### `POST /api/upload`
- Uploads a new image file to the server.
- **Form Data**:
  - `image` (File, required): The image file to upload (JPG)
- Success Response:
  ```JSON
  {
    "message": "File Uploaded Successfully",
    "file": "your_uploaded_filename.jpg"
  }
  ```
- Error Response:
  - `400`: No file was uploaded or the file type is not accepted
- Notes:
  - Maximum file size is `15MB`
  - Accepted formats: `.jpg`.
  - Uploaded files are saved in the `/uploads/` directory

### `GET /api/images`
- Returns a list of uploaded image filenames.
- Success Response:
  ```JSON
  [
    "uploadedImage.jpg"
  ]
  ```
- Error Response:
  - 500: Could not read uploads folder
- Use Case:
  - Useful for dynamically loading available images in the frontend (e.g., in a gallery or dropdown selector).

---

## Contributing
Contributions are welcome! Feel free to fork the repository and submit a pull request.

---

## Contact
For any questions or suggestions, please reach out to the repository owner.
