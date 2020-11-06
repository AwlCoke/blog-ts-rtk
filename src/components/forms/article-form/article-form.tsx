import React, {FC, useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import { useHistory } from 'react-router-dom';
import { DeleteFilled } from "@ant-design/icons";
import { connect } from 'react-redux';
import classNames from "classnames";
import ArticleFormProps from "./config";
import {ArticleModel} from "../../../types/models/article.model";
import {FormDataArticle, ProfileForm} from "../../../types/forms";
import UserForm from "../user-form/user-form";
import {createArticle, getArticle, updateArticle} from "../../../service/production-ready-service";
import styles from './article-form.module.scss';
import {fetchArticles} from "../../../store/article-list";
import {Dispatch} from "../../../store/store";
import {updateCurrentUser} from "../../../store/user";

interface Props {
    mode: 'create' | 'edit';
    slug: string;
    getArticles: () => void;
}

const ArticleForm: FC<Props> = ({mode, slug, getArticles}: Props) => {
    const { register, handleSubmit, errors } = useForm<FormDataArticle>();
    const [isResponseError, setResponseError] = useState(false);
    const [article, setArticle] = useState<ArticleModel | null>(null);
    const [tags, setTags] = useState<string[]>([]);
    const [input, setInput] = useState<string>('');
    const history = useHistory();

    const addBtn = classNames(styles.btn, styles['btn--add']);

    useEffect(() => {
        if (mode === 'edit') {
            getArticle(slug).then(data => setArticle(data.article));
        }
    }, [mode, slug])

    useEffect(() => {
        if (article) {
            setTags(article.tagList)
        }
    }, [article])


    const titleForm = mode === 'create' ? 'Create New Article' : 'Edit Article';

    const onSubmit = (data: FormDataArticle ) => {
        const body = {article: {...data, tagList: tags}};
        const request = mode === 'edit' ? updateArticle(slug, body) : createArticle(body);
        try {
            request.then((response: any) => {
                if (response.ok) {
                    getArticles();
                    history.push('/');
                }
                setResponseError(true);
            })
        } catch (e) {
            console.log(e)
        }

    };

    const removeTag = (tag: string) => {
        const idx = tags.indexOf(tag);
        return setTags([...tags.slice(0, idx), ...tags.slice(idx + 1)]);
    };

    const handleChange = (event: any) => {
        event.preventDefault();
        setInput(event.target.value);
    }

    const addTag = () => {
        if (tags.find(tag => tag.toLowerCase() === input.toLowerCase()) || !input) {
            return;
        }
        setTags([...tags, input]);
        setInput('');
    }

    const articleFormContent = ArticleFormProps.map((field: any) => {
        const {rules, ...props} = field;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const defaultValue = article ? article[field.name] : '';
        const invalidProps = {...props, errors, defaultValue};
        return <UserForm key={`${field.name}_${props.id}`} {...invalidProps} ref={register(rules)} style={{width: '100%'}} />
    });
    
    const tagsContent = tags.map((tag) => {
        return (
            <li key={tag} className={styles.tag}>
                {tag}
                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <button type="button" onClick={() => removeTag(tag)}><DeleteFilled style={{color: '#F5222D', marginLeft: 5}} /></button>
            </li>
        )
    });

    const tagFormContent = (
        <label className={styles.tagBlock}>
            Tag
            <ul style={{paddingLeft: 0}}>
                {tagsContent}
                <input type='text' placeholder='Tag' value={input} onChange={handleChange} className={styles.tagInput} />
                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <button type='button' onClick={addTag} className={addBtn} >Add Tag</button>
            </ul>
        </label>
    );

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles['article-form']}>
            <h1 className={styles.header}>{titleForm}</h1>
            {isResponseError && <p>Something went wrong!</p>}
            {articleFormContent}
            {tagFormContent}
            <input type='submit' className={styles.submit} value="Send" />
        </form>
    )
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        getArticles: () => dispatch(fetchArticles()),
    };
};

export default connect(null, mapDispatchToProps)(ArticleForm);