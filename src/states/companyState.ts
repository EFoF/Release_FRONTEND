import { atom, useRecoilState } from 'recoil';

export const companyIdState = atom({
  key: 'companyIdState',
  default: 0,
});
