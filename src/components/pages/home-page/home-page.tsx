import React, { FC } from 'react';
import PaginationBox from './pagination-box';
import ArticleList from './blog-article-list/article-list';

const HomePage: FC = () => {
  return (
    <>
      <ArticleList />
      <PaginationBox />
    </>
  );
};

export default HomePage;
