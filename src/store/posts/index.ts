import postsSlice from './slice';
import { fetchPosts } from './thunkActions';
export const PostsReducer = postsSlice.reducer;
export { fetchPosts };
