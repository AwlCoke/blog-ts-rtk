import { nanoid } from 'nanoid';
import { UserFormValidProps } from '../../../types/forms';

const ArticleFormProps: UserFormValidProps[] = [
  {
    name: 'title',
    label: 'Title',
    type: 'text',
    placeholder: 'Title',
    id: `${nanoid()}`,
    errorMessage: 'Should not be empty',
    responseError: null,
    rules: {
      required: true,
      minLength: 1,
    },
  },
  {
    name: 'description',
    label: 'Short description',
    type: 'text',
    id: `${nanoid()}`,
    placeholder: 'Title',
    errorMessage: 'Should not be empty',
    responseError: null,
    rules: {
      required: true,
      minLength: 1,
    },
  },
  {
    name: 'body',
    label: 'Text',
    type: 'text',
    placeholder: 'Text',
    textarea: true,
    id: `${nanoid()}`,
    style: { minHeight: '168px', maxHeight: 'fitContent' },
    errorMessage: 'Should not be empty',
    responseError: null,
    rules: {
      required: true,
      minLength: 1,
    },
  },
];

export default ArticleFormProps;
