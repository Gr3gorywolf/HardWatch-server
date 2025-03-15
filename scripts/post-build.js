const fs = require("fs");
const path = require("path");
const fse = require("fs-extra");

const ROOT_DIR = path.resolve(__dirname, "..");
const DEST_DIR = path.join(ROOT_DIR, "dist/apps/web");

// Archivos y carpetas a copiar
const FILES_TO_COPY = [
  { src: path.join(ROOT_DIR, "~config.json"), dest: path.join(DEST_DIR, "~config.json") },
  { src: path.join(ROOT_DIR, "config.json"), dest: path.join(DEST_DIR, "config.json") },
  { src: path.join(ROOT_DIR, "docker"), dest: path.join(DEST_DIR) },
];

function copyFiles() {
  FILES_TO_COPY.forEach(({ src, dest }) => {
    if (fs.existsSync(src)) {
      try {
        if (fs.lstatSync(src).isDirectory()) {
          fse.copySync(src, dest, { overwrite: true });
          console.log(`✅ Copying folder: ${src} -> ${dest}`);
        } else {
          fs.copyFileSync(src, dest);
          console.log(`✅ Copying file: ${src} -> ${dest}`);
        }
      } catch (error) {
        console.error(`❌Error Copying ${src}:`, error);
      }
    } else {
      console.warn(`⚠️ Warning: ${src} does not exists.`);
    }
  });
}

// Ejecutar script
copyFiles();
