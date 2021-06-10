import { createSlice } from '@reduxjs/toolkit';
import { fetchPosts } from './thunkActions';

export interface AboutUsState {
  loading: boolean;
  error: null | string;
  posts: any; // any only for dummy data
}

const initialState: AboutUsState = {
  loading: false,
  error: null,
  posts: [],
};

const aboutUsSlice = createSlice({
  name: 'Home',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.posts;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.error = action.error.message || '';
      });
  },
});

export default aboutUsSlice;
