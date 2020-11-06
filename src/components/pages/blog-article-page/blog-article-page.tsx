import React, {FC, useEffect, useState} from 'react';
import { List } from 'antd';
import { useParams } from 'react-router-dom';
import { ArticleModel } from '../../../types/models/article.model';
import ErrorBoundary from '../../error-boundary';
import Article from '../../article/article';
import Spinner from '../../spinner';
import {getArticle} from "../../../service/production-ready-service";


const BlogArticlePage: FC = () => {
  const [currentArticle, setCurrentArticle] = useState<ArticleModel | null>(null);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const {slug} = useParams();

  useEffect(() => {
    getArticle(slug).then(data => setCurrentArticle(data.article));
  }, [slug])

  if (!currentArticle) return <Spinner/>

  return (
    <ErrorBoundary>
      <List>
        <Article mode="full" {...currentArticle} />
      </List>
    </ErrorBoundary>
  );
};

export default BlogArticlePage;
