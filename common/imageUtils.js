
import Resizer from "react-image-file-resizer";


export const compressImage = (file, maxWidth, maxHeight, quality) =>
  new Promise((resolve, reject) => {
    try {
      Resizer.imageFileResizer(
        file, // The image file
        maxWidth, // Maximum width
        maxHeight, // Maximum height
        'PNG', // Output format (you can adjust it as needed)
        quality, // Output quality (0.1 to 1, adjust as needed)
        0, // Rotation (optional, set to 0 if not needed)
        (resizedImage) => {
          resolve(resizedImage);
        },
        'base64', // Output type (base64 or file, adjust as needed)
        200, // Maximum file size (optional, set to 200KB if needed)
        100 // Maximum width/height after resizing (optional, set to 1000 if needed)
      );
    } catch (error) {
      reject(error);
    }
  });

  export default compressImage

