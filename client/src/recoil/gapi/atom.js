import { atom } from "recoil";

import { localStorageEffect } from '../effects';
import { DEFAULT_USER } from '../../constants/constants';

const gapiAtom = atom({
  key: 'gapiAtom',
  default: null,
  // effects_UNSTABLE: [
  //   localStorageEffect('current_user'),
  // ]
});

export default gapiAtom;
