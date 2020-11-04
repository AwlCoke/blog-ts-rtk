import { UserFormValidProps } from '../../../types/forms';

const ArticleFormProps: UserFormValidProps[] = [
  {
    name: 'title',
    label: 'Title',
    type: 'text',
    placeholder: 'Title',
    id: `${Math.random()}`,
    errorMessage: 'should not be empty',
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
    id: `${Math.random()}`,
    placeholder: 'Title',
    errorMessage: 'should not be empty',
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
    id: `${Math.random()}`,
    style: { minHeight: '168px', maxHeight: 'fitContent' },
    errorMessage: 'should not be empty',
    responseError: null,
    rules: {
      required: true,
      minLength: 1,
    },
  },
];

const TagFormProps: UserFormValidProps = {
  name: 'tag',
  type: 'text',
  placeholder: 'Tag',
  style: { width: '300px' },
  errorMessage: 'should not be empty',
  responseError: null,
  rules: {
    required: true,
    minLength: 1,
  },
};

export { ArticleFormProps, TagFormProps };
