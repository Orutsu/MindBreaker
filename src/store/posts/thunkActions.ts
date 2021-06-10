import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppState } from '../index';
import { getPosts } from '../../api/posts/posts';

export const fetchPosts = createAsyncThunk<
  { posts: any[] },
  void,
  { state: AppState }
>('posts/fetchPosts', async () => {
  const posts = await getPosts();
  return { posts };
});
