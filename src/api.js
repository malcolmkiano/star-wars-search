/**
 * performs a fetch request from given url, with error handling
 * @param {string} url the url to make the fetch call from
 */
async function get(url){
  let error;
  const res = await fetch(url);
  if (!res.ok)
    error = res.status;
  const data = await res.json();
  if (error) {
    return Promise.reject(error);
  }
  return data;
}

/**
 * format a fetch request using different params
 * @param {string} endpoint the API endpoint to make a call to
 * @param {string} query the user's search query
 * @param {number} [page] the page to get the data from
 */
function getData(endpoint, query, page=1) {
  const URL = `https://swapi.co/api/${endpoint}?search=${query}&page=${page}`;
  return get(URL);
}

export default {
  getData,
  get
}