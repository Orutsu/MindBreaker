import axios from 'axios';

export const getPosts: () => Promise<any[]> = async () => {
  return await axios
    .get('https://jsonplaceholder.typicode.com/posts')
    .then((res) => res.data);
};
