import { imgUrl } from "./convertToFormData";

export const fetchImageFile = async (imgPath) => {
  const Url = `${imgUrl}/${imgPath}`;

  const imgFileBlob = await fetch(Url).then((res) => res.blob());
  const file = new File([imgFileBlob], imgPath.split("/").pop(), {
    type: imgFileBlob.type,
  });
  return file;
};
