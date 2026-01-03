import axios from 'axios';

import { BASE_URL, ENDPOINTS } from '../paths';

export const getCharacter = async (charId: number) => {
  const URL = `${BASE_URL}${ENDPOINTS.characters}/${charId}`;

  const res = await axios.get(URL);

  return res.data;
};
