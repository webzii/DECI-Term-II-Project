# My Image App

A simple and modular Node.js API for image processing , built with TypeScript. This app allows users to resize images and generate thumbnails through HTTP endpoints.

## 🚀 Features

- Load and process images from a static folder
- Validate query parameters
- Resize images using Sharp
- Save and serve thumbnails
- Fully written in TypeScript
- Includes Jasmine test coverage

## 🧰 Tech Stack

- **Backend:** Node.js, Express, TypeScript
- **Image Processing:** Sharp
- **Frontend:** HTML, CSS, JavaScript
- **Testing:** Jasmine
- **File Upload:** Multer

## 🛠️ Setup Instructions

1. Extract the project archive
2. Navigate to the project directory:

```bash
cd My-image-app
```

3. Install dependencies:

```bash
npm install
```

4. Build the project:

```bash
npm run build
```

5. Start the server:

```bash
npm run start
```
## 🧪 Run Tests

Run unit and integration tests using Jasmine:

```bash
npm test
```

Test files are located in the `dist/tests/` directory.

## 📷 API Example

Resize and serve an image using a GET request:

```
GET /api/images?filename=rahul-mishra-aZsn0bJYqBU-unsplash&width=200&height=200
```

### Query Parameters:
- `filename`: Image name without extension
- `width`: Desired width in pixels
- `height`: Desired height in pixels

The API will return a resized version of the image if valid, or an error message if parameters are incorrect.


## 📁 Project Structure

```

My-image-app/
│
├── src/
│ ├── routes/ # API routes
│ ├── tests/ # Jasmine unit tests
│ ├── helpers/ # Utility modules (e.g., image processing)
│ ├── index.ts # Server entry point
│
├── frontend/ # Frontend HTML/CSS/JS
│ └── index.html
│── spec/
├   ├── support/ #jasmine tests
├   ├── jasmine.json
├── assets/
│ ├── images/ # Original uploaded images
│ └── Thumb_Images/ # Cached resized images
│
├── package.json
├── tsconfig.json
├── README.md
├── .prettierrc
```

