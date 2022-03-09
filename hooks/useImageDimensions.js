import { useState, useEffect } from "react";

export default function useImageDimensions(imageUrl) {
  const [size, setSize] = useState([0, 0]);

  useEffect(() => {
    if (!imageUrl) return;
    const img = document.createElement("img");
    img.addEventListener("load", (e) => {
      const { naturalHeight, naturalWidth } = e.target;
      setSize([naturalWidth, naturalHeight]);
    });
    img.src = imageUrl;
  }, [imageUrl]);

  return size;
}
