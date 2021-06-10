import React, { useEffect } from 'react';
// Components
import { SafeAreaView, Text } from 'react-native';

// Libs & utills
import { useTypedSelector } from '../../../store';

// Types & Redux
import { useDispatch } from 'react-redux';

// Styles && Assets
import { fetchPosts } from '../../../store/posts';

const HomePageScreen = () => {
  const dispatch = useDispatch();
  const { posts, loading } = useTypedSelector((store) => store.posts);

  useEffect(() => {
    const getHome = async () => {
      dispatch(fetchPosts());
    };

    getHome();
  }, []);

  return (
    <SafeAreaView>
      <Text>
        {loading ? 'Loading...' : `Home - posts length: ${posts.length}`}
      </Text>
    </SafeAreaView>
  );
};

export default HomePageScreen;
