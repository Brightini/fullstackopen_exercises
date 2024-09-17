import axios from "axios";
const url = "api/persons";

const getAllPersons = () => {
  const request = axios.get(url);
  return request.then((response) => response.data);
};

const create = (personObject) => {
  const request = axios.post(url, personObject);
  return request.then((response) => response.data);
};

const deletePerson = (id) => {
  const request = axios.delete(url + `/${id}`);
};

const updatePerson = (id, personObject) => {
  const request = axios.put(url + `/${id}`, personObject);
  return request.then((response) => response.data);
};

export default { getAllPersons, create, deletePerson, updatePerson };
