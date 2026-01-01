import axios from 'axios';

import { BASE_URL, ENDPOINTS } from '../paths';

export const getCharacters = async () => {
  const URL = `${BASE_URL}${ENDPOINTS.characters}`;

  const characters = await axios.get(URL);

  return characters.data.results;
};
