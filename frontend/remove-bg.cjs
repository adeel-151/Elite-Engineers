const Jimp = require('jimp');

async function removeBackground() {
  try {
    const image = await Jimp.read('./src/assets/logo.jpeg');
    
    // Flood fill algorithm to remove background from edges
    const width = image.bitmap.width;
    const height = image.bitmap.height;
    
    // Threshold for considering a pixel 'white'
    const isWhite = (idx) => {
      return image.bitmap.data[idx] > 220 && 
             image.bitmap.data[idx + 1] > 220 && 
             image.bitmap.data[idx + 2] > 220;
    };

    // We will just make all near-white pixels transparent, but to avoid jagged edges,
    // we can use a basic distance based alpha blending
    image.scan(0, 0, width, height, function(x, y, idx) {
      const r = this.bitmap.data[idx];
      const g = this.bitmap.data[idx + 1];
      const b = this.bitmap.data[idx + 2];
      
      // Calculate brightness
      const brightness = (r + g + b) / 3;
      
      if (brightness > 200) {
        // Linear fade for anti-aliasing near edges
        // Brightness 200 -> Alpha 255 (fully opaque)
        // Brightness 255 -> Alpha 0 (fully transparent)
        let alpha = 255 - ((brightness - 200) / 55) * 255;
        this.bitmap.data[idx + 3] = Math.max(0, Math.min(255, alpha));
      }
    });
    
    await image.writeAsync('./src/assets/logo-transparent.png');
    console.log('Background removed! Saved as logo-transparent.png');
  } catch (err) {
    console.error(err);
  }
}

removeBackground();
