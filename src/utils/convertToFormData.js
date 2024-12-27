// utils/convertToFormData.js
export const convertToFormData = (obj) => {
  const formData = new FormData();
  Object.keys(obj).forEach((key) => {
    formData.append(key, obj[key]);
  });
  return formData;
};

export const imgUrl = process.env.REACT_APP_IMG_URL;
