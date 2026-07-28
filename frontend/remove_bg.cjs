const Jimp = require('jimp');

async function removeBackground() {
  const image = await Jimp.read('./src/assets/logo-transparent.png');
  const width = image.bitmap.width;
  const height = image.bitmap.height;
  
  // Get the background color from the top-left pixel
  const bgColorHex = image.getPixelColor(0, 0);
  const bgColor = Jimp.intToRGBA(bgColorHex);

  const tolerance = 15; // Tolerance for nearly matching colors

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const colorHex = image.getPixelColor(x, y);
      const color = Jimp.intToRGBA(colorHex);

      const rDiff = Math.abs(color.r - bgColor.r);
      const gDiff = Math.abs(color.g - bgColor.g);
      const bDiff = Math.abs(color.b - bgColor.b);

      if (rDiff <= tolerance && gDiff <= tolerance && bDiff <= tolerance && color.a > 0) {
        // Set alpha to 0 for background
        image.setPixelColor(Jimp.rgbaToInt(color.r, color.g, color.b, 0), x, y);
      }
    }
  }

  await image.writeAsync('./src/assets/logo-transparent-nobg.png');
  console.log("Background removed successfully!");
}

removeBackground().catch(console.error);
