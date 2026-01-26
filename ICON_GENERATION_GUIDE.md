# PWA Icon Generator Script

This script will help create all required PWA icon sizes from the base 512x512 icon.

## Required Icon Sizes

We need to create the following icon sizes for full PWA support:

- 72x72.png
- 96x96.png
- 128x128.png
- 144x144.png
- 152x152.png
- 192x192.png
- 384x384.png
- 512x512.png

## Steps to Create Icons

### Option 1: Online Tool (Easiest)
1. Visit: https://www.pwabuilder.com/imageGenerator
2. Upload the base icon (devport_icon_512.png from artifacts)
3. Download the generated icon pack
4. Extract all icons to `public/icons/` folder

### Option 2: Using ImageMagick (Command Line)
```bash
# Install ImageMagick first if not installed
# Then run these commands from the devport-frontend directory

convert source.png -resize 72x72 public/icons/icon-72x72.png
convert source.png -resize 96x96 public/icons/icon-96x96.png
convert source.png -resize 128x128 public/icons/icon-128x128.png
convert source.png -resize 144x144 public/icons/icon-144x144.png
convert source.png -resize 152x152 public/icons/icon-152x152.png
convert source.png -resize 192x192 public/icons/icon-192x192.png
convert source.png -resize 384x384 public/icons/icon-384x384.png
convert source.png -resize 512x512 public/icons/icon-512x512.png
```

### Option 3: Using Node.js Sharp Library
```javascript
// icon-generator.js
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const sourceIcon = 'devport_icon_512.png';
const outputDir = 'public/icons';

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

sizes.forEach(async (size) => {
  await sharp(sourceIcon)
    .resize(size, size)
    .toFile(path.join(outputDir, `icon-${size}x${size}.png`));
  console.log(`Created icon-${size}x${size}.png`);
});
```

## Current Status

✅ PWA manifest created
✅ Service worker configured
✅ Meta tags added to layout
✅ offline.html fallback created
✅ Next.js PWA plugin configured
⏳ Icons need to be created (use generated icon from artifacts)

## Next Steps

1. Save the generated icon from the artifacts folder
2. Use one of the methods above to create all icon sizes
3. Place all icons in `public/icons/` directory
4. Run `npm run build` to generate the production build with PWA
5. Test the PWA with `npm start`
