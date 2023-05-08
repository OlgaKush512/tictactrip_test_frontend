export interface City {
  city_id: number;
  local_name: string;
}

export function fetchData(
  url: string,
  setResults: React.Dispatch<React.SetStateAction<City[]>>
) {
  fetch(url, {
    method: 'GET',
    headers: {
      'Access-Control-Allow-Origin': 'https://mywebsite.com',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      setResults(data);
      console.log(data);
    })
    .catch((error) => {
      console.error(error);
    });
}
