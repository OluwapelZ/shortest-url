import create from 'custom-error-generator';

export const InvalidUrlSlug = create('InvalidUrlSlug', { code: 'INVALID_URL_SLUG' });