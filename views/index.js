const config = {
  cUrl: 'https://api.countrystatecity.in/v1/countries'
}

const toggleAddLocation = () => {
  const addLocationSection = document.getElementById('addLocationSection');
  if (isNewTrip) {
    addLocationSection.style.display = 'block';
  } else {
    addLocationSection.style.display = 'none';
  }
};

toggleAddLocation();

