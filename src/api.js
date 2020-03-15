function get(url){
  let error;
  return fetch(url)
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

function getData(endpoint, query, page=1) {
  const URL = `https://swapi.co/api/${endpoint}?search=${query}&page=${page}`;
  return get(URL);
}

export default {
  getData,
  get
}