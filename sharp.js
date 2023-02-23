const sharp = require('sharp');
const { readdir, mkdir, access, rm } = require('fs').promises;

const target = 'src/public/images';
const destination = 'sharp';
const percentageImgSmaller = 25;

const excludes = [
  'android',
  'ios',
  'windows11',
  'apple-touch-icon.png',
  'favicon-16x16.png',
  'favicon-32x32.png',
  'favicon.ico',
  'maskable_icon_x192.png',
];

async function getFiles(dir) {
  const dirents = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    dirents.map((dirent) => {
      const res = `${dir}/${dirent.name}`;
      if (!excludes.includes(dirent.name))
        return dirent.isDirectory() ? getFiles(res) : res;

      return null;
    }),
  );
  return Array.prototype.concat(...files).filter(Boolean);
}

module.exports = async () => {
  try {
    await access(destination);
    await rm(destination, { recursive: true, force: true });
  } catch (error) {
    await mkdir(destination, { recursive: true });
  }

  const files = await getFiles(target);

  await Promise.all(
    files.map(async (image) => {
      const imageSharp = sharp(`${image}`);

      // small file (resize by percentage smaller)
      const info = await imageSharp.metadata();

      const width = Math.round((info.width * percentageImgSmaller) / 100);
      const height = Math.round((info.height * percentageImgSmaller) / 100);

      await mkdir(
        `${destination}/${image
          .replace(target, '')
          .split('.')
          .slice(0, -1)
          .join('.')
          .split('/')
          .slice(0, -1)
          .join('/')}`,
        { recursive: true },
      );
      imageSharp
        .resize(width, height)
        .toFile(
          `${destination}/${image
            .replace(target, '')
            .split('.')
            .slice(0, -1)
            .join('.')}-small.${image.split('.')[1]}`,
        );
    }),
  );
};
