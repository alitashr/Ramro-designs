
export const readImage = (url:any):PromiseLike<HTMLImageElement> => {
  let imageUrl = url;
  if (url instanceof Blob) {
    imageUrl = URL.createObjectURL(url);
  }
  return new Promise((resolve, reject) => {
    let image = new Image();
    image.crossOrigin = "Anonymous";
    image.src = imageUrl;
    image.onload = () => {
      resolve(image);
    };
    image.onerror = reject;
  });
};