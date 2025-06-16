import { resizeImage } from '../utils/imageProcessor.js';
import fs from 'fs';

describe('Image Processing', () => {
  it('resizes an image', async () => {
    const out = await resizeImage('boy.jpg', 100, 100);
    expect(fs.existsSync(out)).toBeTrue();
  });
});
