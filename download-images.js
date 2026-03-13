const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const projects = [
  { url: 'https://fourthlayer.itch.io/furrybets', file: 'furrybets.png', selector: '.screenshot_list img' },
  { url: 'https://fourthlayer.itch.io/zootherapy', file: 'zootherapy.png', selector: '.screenshot_list img' },
  { url: 'https://fourthlayer.itch.io/tails-cones', file: 'tailsandcones.png', selector: '.screenshot_list img' },
];

async function downloadImages() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  for (const item of projects) {
    try {
      console.log(`Scraping ${item.url}...`);
      await page.goto(item.url, { waitUntil: 'networkidle2' });
      
      const imgUrl = await page.evaluate((sel) => {
        const img = document.querySelector(sel);
        return img ? img.src : null;
      }, item.selector);

      if (imgUrl) {
         console.log(`Found image: ${imgUrl}`);
         const response = await fetch(imgUrl);
         const arrayBuffer = await response.arrayBuffer();
         const buffer = Buffer.from(arrayBuffer);
         const dest = path.join(__dirname, 'public', item.file);
         fs.writeFileSync(dest, buffer);
         console.log(`Saved ${item.file}`);
      } else {
         console.log(`No image found for ${item.file}`);
      }
    } catch (e) {
      console.error(`Failed to process ${item.file}:`, e);
    }
  }

  await browser.close();
}

downloadImages();
