// utils/convertToFormData.js
export const convertToFormData = (obj) => {
  const formData = new FormData();

  const appendFormData = (key, value) => {
    if (value instanceof File || value instanceof Blob) {
      // Handle File or Blob types
      formData.append(key, value);
    } else if (Array.isArray(value)) {
      // Handle arrays
      value.forEach((item, index) => {
        if (typeof item === 'object' && item !== null) {
          // Recursively handle nested objects in arrays
          appendFormData(`${key}[${index}]`, item);
        } else {
          formData.append(`${key}[${index}]`, item);
        }
      });
    } else if (typeof value === 'object' && value !== null) {
      // Handle objects
      Object.keys(value).forEach((subKey) => {
        appendFormData(`${key}[${subKey}]`, value[subKey]);
      });
    } else {
      // Handle primitive values
      formData.append(key, value);
    }
  };

  Object.keys(obj).forEach((key) => {
    appendFormData(key, obj[key]);
  });

  return formData;
};



export const imgUrl = process.env.REACT_APP_IMG_URL;
