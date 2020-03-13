/* eslint-disable no-template-curly-in-string */

export default {
  form: {
    validateMessages: {
      required: 'This field is required.',
      number: {
        min: 'This field is invalid (should be greater than ${min})',
        range: 'This field is invalid (should be between ${min} and ${max})',
      },
    },
  },
};
