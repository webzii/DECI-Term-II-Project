## API Endpoints

### Resize Image
**GET** `/api/images?filename=your-image.jpg&width=200&height=200`

- `filename`: Name of the image in `images/full/` (e.g. `boy.jpg`)
- `width`: Desired width (e.g. `200`)
- `height`: Desired height (e.g. `200`)

Returns the resized image.

---

### Upload Image
**POST** `/api/upload`

- Accepts `.jpg` file using `multipart/form-data` with the key `image`
- Stores the image in `images/uploads/`

---

### Start the Server

```bash
npm install
npm run build
npm run start
