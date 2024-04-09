import axios from 'axios';

// Define a function to fetch data from the API
const fetchCountryData = async () => {
  try {
    // Fetch country data from Geonames API
    const geonamesResponse = await axios.get('http://api.geonames.org/countryInfoJSON?username=demo');
    const geonamesData = geonamesResponse.data.geonames;

    console.log(geonamesData);
    return geonamesData;
  } catch (error) {
    console.error('Error fetching country data.', error);
    throw new Error('Failed to fetch country data');
  }
};

fetchCountryData()
  .then(data => {
    // Do something with the data
    console.log('Fetched country data:', data);
  })
  .catch(error => {
    // Handle errors
    console.error('Error fetching country data:', error);
  });
