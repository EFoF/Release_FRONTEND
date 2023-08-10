import { atom, useRecoilState } from 'recoil';

export const isLoginState = atom({
  key: 'isLoginState',
  default: false, // 로그인되어 있지 않은 초기 상태
});
