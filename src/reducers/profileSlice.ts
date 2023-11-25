import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

export const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    isLoggedIn: false,
  } as ProfileRecordType,
  reducers: {
    signIn: (state, { payload }) => {
      const profile = { ...state, ...payload, isLoggedIn: true };
      return profile;
    },
    signOut: (state, { payload }) => {
      return { isLoggedIn: false };
    },
    update: (state, { payload }) => {
      const profile = { ...state, ...payload };
      return profile;
    },
  },
});

export const { signIn, signOut, update: saveProfile } = profileSlice.actions;

export const profileSelector = ({ profile }: RootState) => profile;

export default profileSlice;
