import { atom, useRecoilState } from 'recoil';
import {recoilPersist} from "recoil-persist";
const { persistAtom } = recoilPersist();

export const companyIdState = atom({
  key: 'companyIdState',
  default: 0,
  effects_UNSTABLE: [persistAtom],
});

export const companyNameState = atom({
  key: 'companyNameState',
  default: "",
});
