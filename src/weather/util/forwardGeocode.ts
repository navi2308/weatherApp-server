import axios from 'axios';

const MAPBOX_KEY =
  'pk.eyJ1IjoibmF2aTIzMDgiLCJhIjoiY2twYzU4dDBmMDBxazJvcDcxb2d4Yjd4MiJ9.i1mlZ1G0qqBMxDsq75VLyQ';

export const forwardGeocode = async (location: string) => {
  const URL =
    'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
    location +
    '.json?access_token=' +
    MAPBOX_KEY;

  try {
    const response = await axios.get(URL);

    //     console.log('Data: ', response.data.features);

    const name = response.data.features[0].place_name;
    const long = response.data.features[0].geometry.coordinates[0];
    const lat = response.data.features[0].geometry.coordinates[1];

    return { long, lat, name };
  } catch (error) {
    console.log('Error from forwardGeocode: ', error);
    throw new Error(error);
  }
};

console.log(forwardGeocode('Surat'));
