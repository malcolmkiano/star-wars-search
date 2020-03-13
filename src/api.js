function getData(endpoint, query, page=1) {
  const URL = `https://swapi.co/api/${endpoint}?search=${query}&page=${page}`;
  let error;
  return fetch(URL)
    .then(res => {
      if (!res.ok) error = res.status;

      return res.json();
    })
    .then(data => {
      if (error) {
        return Promise.reject(error);
      }

      return data;
    });
}

export default {
  getData
}