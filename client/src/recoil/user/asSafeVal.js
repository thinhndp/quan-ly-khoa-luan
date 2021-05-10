import { selector } from 'recoil';
import userAtom from './atom';

import { DEFAULT_USER } from '../../constants/constants';

const userAsSafeVal = selector({
  key: 'userAsSafeVal',
  get: ({ get }) => {
    const user = get(userAtom);
    if (user == null) {
      return DEFAULT_USER;
    }
    return user;
  },
});

export default userAsSafeVal;
