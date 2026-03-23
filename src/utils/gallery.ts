import { readdir } from 'node:fs/promises';
import { join } from 'node:path';

type GalleryImage = {
  src: string;
  alt: string;
};

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg', '.avif']);

const hasSupportedImageExtension = (fileName: string) => {
  const extensionIndex = fileName.lastIndexOf('.');
  if (extensionIndex === -1) return false;
  return IMAGE_EXTENSIONS.has(fileName.slice(extensionIndex).toLowerCase());
};

export const getPublicGalleryImages = async (
  folderName: string,
  altPrefix: string,
): Promise<GalleryImage[]> => {
  const absoluteGalleryPath = join(process.cwd(), 'public', 'images', 'gallery', folderName);

  let fileNames: string[] = [];
  try {
    fileNames = await readdir(absoluteGalleryPath);
  } catch {
    return [];
  }

  return fileNames
    .filter(hasSupportedImageExtension)
    .sort((a, b) => a.localeCompare(b))
    .map((fileName, index) => ({
      src: `/images/gallery/${folderName}/${fileName}`,
      alt: `${altPrefix} ${index + 1}`,
    }));
};