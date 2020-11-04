import { Pagination } from 'antd';
import React, { FC } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import styles from './pagination-box.module.scss';
import './antd-pagination-box.scss';
import { StateModel } from '../../../../types/models/state.model';
import { Dispatch } from '../../../../store/store';
import { fetchArticles, setCurrentPage } from '../../../../store/article-list';

const { container, containerHide } = styles;

interface Props {
  loading: boolean;
  currentPage: number;
  articlesCount: number;
  changePage: (page: number) => void;
  getArticles: (page: number) => void;
}

const PaginationBox: FC<Props> = ({ loading, currentPage, articlesCount, changePage, getArticles }: Props) => {
  const paginationClasses = classNames(container, { [containerHide]: loading });
  return (
    <div className={paginationClasses}>
      <Pagination
        hideOnSinglePage
        showSizeChanger={false}
        pageSize={20}
        defaultCurrent={1}
        current={currentPage}
        total={articlesCount}
        onChange={async (page) => {
          await getArticles(page);
          changePage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
};

const mapStateToProps = (state: StateModel) => {
  const { loading, currentPage, articlesCount } = state.articleList;
  return { loading, currentPage, articlesCount };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    changePage: (page: number) => dispatch(setCurrentPage(page)),
    getArticles: (page: number) => dispatch(fetchArticles(page)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PaginationBox);
