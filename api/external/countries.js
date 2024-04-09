import axios from 'axios';

export const fetchCountryData = async () => {
  try {
    const response = await axios.get('https://restcountries.com/v3.1/all');
    const countryData = response.data;

    // Extract country name and capital from each country object
    const filteredData = countryData.map(country => ({
      name: country.name.common,
      capital: country.capital[0] // Capital is an array, so we take the first element
    }));

    return filteredData;
  } catch (error) {
    console.error('Error fetching country data:', error);
    throw new Error('Failed to fetch country data');
  }
};

fetchCountryData()
  .then(data => {
    console.log('Filtered country data:', data);
  })
  .catch(error => {
    console.error('Error fetching country data:', error)
  });

