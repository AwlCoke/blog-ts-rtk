import React, { FC } from 'react';
import {RouteComponentProps} from "react-router-dom";
import ArticleForm from "../../forms/article-form/article-form";
import {ArticleType} from "../../../types/forms";

const EditArticlePage: FC<ArticleType & RouteComponentProps> = ({match}) => {

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
    const {slug} = match.params;
  return (
      <>
        <ArticleForm mode='edit' slug={slug}/>
      </>
  );
};

export default EditArticlePage;
