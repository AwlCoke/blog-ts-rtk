import React, { FC } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { format } from 'date-fns';
import { Avatar, List } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import ReactMarkdown from 'react-markdown';
import { StateModel } from '../../types/models/state.model';
import { AuthorModel } from '../../types/models/author.model';
import { UserModel } from '../../types/models/user.model';
import styles from './article.module.scss';
import { favoriteArticle, unfavoriteArticle } from '../../service/production-ready-service';
import { Dispatch } from '../../store/store';
import { fetchArticle } from '../../store/article-list';
import { ArticleType } from '../../types/forms';

interface Props {
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
  setFavoritedArticle: (slug: string) => void;
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
}: Props) => {
  const history = useHistory();

  const tags = tagList.map((tag: string) => {
    return (
      <button key={`${slug}_${tag}`} type="button" disabled className={styles.tagBtn}>
        {tag}
      </button>
    );
  });

  const formatDate = format(new Date(createdAt).getTime(), 'PP');

  let formatTitle = capitalizeFirstLetter(title).split(' ').slice(0, 5).join(' ');
  formatTitle = formatTitle.length > 30 ? `${formatTitle.split('').slice(0, 30).join('')}...` : formatTitle;

  const onLike = () => {
    if (favorited) {
      unfavoriteArticle(slug).then((response) => {
        if (response.ok) {
          return setFavoritedArticle(slug);
        }
        return response;
      });
    } else {
      favoriteArticle(slug).then((response) => {
        if (response.ok) {
          return setFavoritedArticle(slug);
        }
        return response;
      });
    }
  };

  if (!isLogin) history.push('/sign-in');

  return (
    <List.Item key={slug} className="blog-list_item">
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
          <div className="item_title-block title-block">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <button
                className="title-block_title"
                type="button"
                onClick={() => {
                  // fetchArticle(slug);
                  history.push(`/articles/${slug}`);
                }}
              >
                {formatTitle}
              </button>
              <div>
                <button className="title-block_like-btn" type="button" disabled={!isLogin} onClick={onLike}>
                  {favorited && <HeartFilled style={{ color: 'red' }} />}
                  {!favorited && <HeartOutlined />}
                </button>
                <span>{favoritesCount}</span>
              </div>
            </div>
            <div className="title-block_tag-block">{tags}</div>
            <div className="title-block_nickname-block">
              <div className="title-block_nickname">{author.username}</div>
              <div className="title-block_date">{formatDate}</div>
            </div>
          </div>
        }
        description={
          <div>
            <div className="description-block">{description}</div>
            {mode === 'full' && (
              <div>
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
    setFavoritedArticle: async (slug: string) => dispatch(await favoriteArticle(slug)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Article);
