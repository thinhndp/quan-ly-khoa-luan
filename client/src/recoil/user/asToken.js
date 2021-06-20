import { selector } from 'recoil';
import userAtom from './atom';

import { DEFAULT_USER } from '../../constants/constants';

const userAsToken = selector({
  key: 'userAsToken',
  get: ({ get }) => {
    return localStorage.getItem('token');
  },
});

export default userAsToken;
