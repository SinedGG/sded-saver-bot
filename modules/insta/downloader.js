const puppeteer = require("puppeteer");

module.exports = (url) => {
  return new Promise(async (resolve, reject) => {
    try {
      let arg = {
        headless: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
        },
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      };
      if (process.platform == "linux")
        arg.executablePath = "/usr/bin/chromium-browser";

      const browser = await puppeteer.launch(arg);
      const page = await browser.newPage();

      await page.goto(url);
      await page.waitForSelector("video");

      const videoSrc = await page.evaluate(() => {
        const videoElement = document.querySelector("video");
        return videoElement ? videoElement.src : null;
      });

      await browser.close();
      if (videoSrc) {
        resolve(videoSrc);
      } else {
        reject("Video source not found");
      }
    } catch (error) {
      reject(error);
    }
  });
};
