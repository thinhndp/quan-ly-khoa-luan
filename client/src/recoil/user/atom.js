import { atom } from "recoil";

import { localStorageEffect } from '../effects';
import { DEFAULT_USER } from '../../constants/constants';

const userAtom = atom({
  key: 'userAtom',
  default: DEFAULT_USER,
  effects_UNSTABLE: [
    localStorageEffect('current_user'),
  ]
});

export default userAtom;
