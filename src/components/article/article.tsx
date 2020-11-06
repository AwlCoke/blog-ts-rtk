import React, { FC, useState } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import { format } from 'date-fns';
import { Avatar, List, Modal } from 'antd';
import { HeartOutlined, HeartFilled, ExclamationCircleFilled } from '@ant-design/icons';
import ReactMarkdown from 'react-markdown';
import classNames from 'classnames';
import { StateModel } from '../../types/models/state.model';
import { AuthorModel } from '../../types/models/author.model';
import { UserModel } from '../../types/models/user.model';
import styles from './article.module.scss';
import { Dispatch } from '../../store/store';
import { fetchArticles, toFavoritedArticle } from '../../store/article-list';
import { ArticleType } from '../../types/forms';
import { deleteArticle } from '../../service/production-ready-service';

interface Props extends RouteComponentProps {
  mode: 'full' | 'short';
  isLogin: boolean;
  user: UserModel;
  title: string;
  slug: string;
  body: string;
  author: AuthorModel;
  createdAt: string;
  favorited: boolean;
  tagList: string[];
  description: string;
  favoritesCount: number;
  setFavoritedArticle: (favorited: boolean, slug: string) => void;
  getArticles: () => void;
}

const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const Article: FC<ArticleType & Props> = ({
  mode,
  title,
  slug,
  body,
  author,
  favorited,
  tagList,
  createdAt,
  description,
  favoritesCount,
  user,
  isLogin,
  setFavoritedArticle,
  getArticles,
}: Props) => {
  const [isFavorited, setFavorited] = useState(favorited);
  const [countLikes, setCountLikes] = useState(favoritesCount);
  const [visible, setVisible] = useState(false);
  const history = useHistory();

  const onDelete = async () => {
    await deleteArticle(slug);
    getArticles();
    history.push('/articles');
  };

  const style = {
    article: classNames({ [styles.listItem]: mode === 'short', [styles.fullArticle]: mode === 'full' }),
    articleBody: classNames(styles.body, { [styles['body--full']]: mode === 'full' }),
    articleDescription: classNames(styles.description, { [styles['description--full']]: mode === 'full' }),
    deleteBtn: classNames(styles.btn, styles['btn--remove'], {
      [styles['btn--hide']]: author.username !== user.username,
    }),
    editBtn: classNames(styles.btn, styles['btn--edit'], { [styles['btn--hide']]: author.username !== user.username }),
  };

  const tags = tagList.map((tag: string) => {
    return (
      <button key={`${slug}_${tag}`} type="button" disabled className={styles.tagBtn}>
        {tag}
      </button>
    );
  });

  const ModalWindow = () => (
    <Modal
      visible={visible}
      width={240}
      className="modal-delete"
      bodyStyle={{ height: 104, display: 'flex', alignItems: 'baseline' }}
      okText="Yes"
      cancelText="No"
      closeIcon={false}
      onOk={() => {
        setVisible(false);
        onDelete();
      }}
      onCancel={() => setVisible(false)}
    >
      <ExclamationCircleFilled style={{ color: '#FAAD14', marginRight: 10 }} />
      <p>Are you sure to delete this article?</p>
    </Modal>
  );

  const EditPanel = () => (
    <>
      <button
        type="button"
        className={style.deleteBtn}
        onClick={() => {
          setVisible(true);
        }}
      >
        Delete
      </button>
      <button
        type="button"
        onClick={() => {
          history.push(`/articles/${slug}/edit`);
        }}
        className={style.editBtn}
      >
        Edit
      </button>
      <ModalWindow />
    </>
  );

  const formatDate = format(new Date(createdAt).getTime(), 'PP');

  let formatTitle = capitalizeFirstLetter(title).split(' ').slice(0, 5).join(' ');
  formatTitle = formatTitle.length > 30 ? `${formatTitle.split('').slice(0, 30).join('')}...` : formatTitle;

  const onLike = () => {
    if (isFavorited) setCountLikes(countLikes - 1);
    if (!isFavorited) setCountLikes(countLikes + 1);
    setFavorited(!isFavorited);
    setFavoritedArticle(favorited, slug);
  };

  return (
    <List.Item key={slug} style={{ alignItems: 'flex-start' }} className={style.article}>
      <List.Item.Meta
        avatar={
          <Avatar
            src={author.image}
            style={{
              position: 'absolute',
              right: '30px',
              width: 46,
              height: 46,
            }}
          />
        }
        title={
          <div className={styles.titleBlock}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <button
                className={styles.title}
                type="button"
                onClick={() => {
                  history.push(`/articles/${slug}`);
                }}
              >
                {formatTitle}
              </button>
              <div>
                <button className={styles.like} type="button" disabled={!isLogin} onClick={onLike}>
                  {isFavorited && <HeartFilled style={{ color: 'red' }} />}
                  {!isFavorited && <HeartOutlined />}
                </button>
                <span>{countLikes}</span>
              </div>
            </div>
            <div>{tags}</div>
            <div className={styles.nicknameBlock}>
              <div className={styles.nickname}>{author.username}</div>
              <div className={styles.date}>{formatDate}</div>
            </div>
          </div>
        }
        description={
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div className={style.articleDescription}>{description}</div>
              {mode === 'full' && <EditPanel />}
            </div>
            {mode === 'full' && (
              <div className={style.articleBody}>
                <ReactMarkdown source={body} />
              </div>
            )}
          </div>
        }
      />
    </List.Item>
  );
};

const mapStateToProps = (state: StateModel) => {
  const {
    userState: { user, isLogin },
  } = state;
  return { user, isLogin };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    getArticles: () => dispatch(fetchArticles()),
    setFavoritedArticle: async (favorited: boolean, slug: string) => dispatch(toFavoritedArticle(favorited, slug)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Article);
