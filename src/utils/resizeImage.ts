import Resizer from "react-image-file-resizer";

export const resizeImage = (
  file: File,
  maxWidth: number,
  maxHeight: number,
  format: "JPEG" | "PNG" | "WEBP",
  quality: number,
  rotation: number
): Promise<File> => {
  return new Promise((resolve, reject) => {
    Resizer.imageFileResizer(
      file,
      maxWidth,
      maxHeight,
      format,
      quality,
      rotation,
      (uri) => {
        if (typeof uri === "string") {
          fetch(uri)
            .then((res) => res.blob())
            .then((blob) => {
              const resizedFile = new File([blob], file.name, {
                type: `image/${format.toLowerCase()}`,
              });
              resolve(resizedFile);
            })
            .catch(reject);
        }
      },
      "base64"
    );
  });
};

