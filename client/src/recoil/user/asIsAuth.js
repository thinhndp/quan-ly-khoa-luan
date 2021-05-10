import { selector } from 'recoil';

import userAsSafeVal from './asSafeVal';
import { USER_ROLE_GUEST } from '../../constants/constants';

const userAsIsAuth = selector({
  key: 'userAsIsAuth',
  get: ({ get }) => {
    const user = get(userAsSafeVal);
    return user.role !== USER_ROLE_GUEST;
  },
});

export default userAsIsAuth;
