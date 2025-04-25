# DECI-Term-II-Project

## Overview

This project is a basic TypeScript + Node.js + Express application designed to resize `.jpg` images using the Sharp library. It provides a RESTful API for resizing images, caching them to optimize performance, and serving them back to the client. The project is beginner-friendly and follows best practices, making it an excellent learning resource for developers exploring Express and image processing.

---

## Key Features

- **Resize `.jpg` Images**: Resize images by specifying width and height through the API.
- **API Endpoint for Resizing**: Simple and accessible API endpoint (GET `/api/resize`) for handling image resizing requests.
- **Image Caching**: Caching of resized images to avoid redundant processing for repeated requests.
- **Scalable Express Server**: Modular server design for scalability and maintainability.
- **Image Processing with Sharp**: Leverages the Sharp library for fast and efficient image resizing and transformations.
- **Unit Testing**: Includes unit tests to validate the image resizing logic.
- **Beginner-Friendly**: Easy-to-follow code with best practices for TypeScript, Express, and image processing.
- **Prettier and ESLint Integration**: Automated code formatting and linting to ensure code quality.

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

---

## Testing
This project uses jasmine for testing image resizing functionality and the API endpoint.

### Setting Up Tests
1. Install dependencies: If you haven’t done so already, make sure all necessary dependencies, including Jasmine, are installed:
  ```bash
  npm install
  ```

2. Test Files: The tests are located in the `tests/` directory. The primary test file is `imageService.test.ts`, which contains the tests for the image processing logic.

3. Run Tests: To run the tests, you can use the following command:
  ```bash
  npm test
  ```

### Writing Tests
The project includes two key types of tests to ensure functionality and reliability:

#### 1. API Endpoint Test
This test verifies that the `/api/resize` endpoint behaves as expected by checking:

- Proper handling of valid inputs:
  - Filename
  - Width
  - Height
- Appropriate status codes returned for:
  - Invalid inputs
  - Error conditions

#### 1. Image Processing Test
This test validates the image resizing functionality using Sharp by checking:

- Correct image resizing operation
- Accurate output when resizing:
  - Different image types
  - Various dimension combinations


## Contributing
Contributions are welcome! Feel free to fork the repository and submit a pull request.

---

## License
This project is licensed under the [MIT License](LICENSE).

---

## Contact
For any questions or suggestions, please reach out to the repository owner.
