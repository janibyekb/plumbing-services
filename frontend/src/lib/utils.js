export const BACKEND_PATH = "/api/";

export const formateDate = (date, config) => {
  const defaultOptions = { day: "numeric", month: "long", year: "numeric" };

  const options = config ? config : defaultOptions;

  return new Date(date).toLocaleDateString("en-US", options);
};

export async function fetchAddress(latitude, longitude) {
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.display_name;
  } catch (error) {
    console.error("Error fetching address:", error);
    return null;
  }
}

export const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};
