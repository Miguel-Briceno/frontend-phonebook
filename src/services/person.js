import axios from "axios";
const baseUrl = "https://backend-phonebook-mongo.onrender.com/api/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newPerson) => {
  const request = axios.post(baseUrl, newPerson);
  return request.then((response) => response.data);
};

const update = (id, updatedPerson) => {
  const request = axios.put(`${baseUrl}/${id}`, updatedPerson);
  return request.then((response) => response.data);
};

const erase = (id) => {
  console.log("ID received for deletion:", id); // Verifica el valor de id
  if (!id) {
    throw new Error("Invalid ID: cannot delete");
  }
  const url = `${baseUrl}/${id}`;
  console.log("URL for deletion:", url); // Verifica la URL
  const request = axios.delete(url);
  return request
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error deleting person:", error);
      throw error;
    });
};

export default { getAll, create, update, erase };
