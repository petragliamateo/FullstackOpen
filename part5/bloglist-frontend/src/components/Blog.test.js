import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import Blog from './Blog';

test('Is blog render OK', () => {
  const testBlog = {
    title: 'testTitle', author: 'testAuthor', url: 'testUrl', likes: 1,
  };

  const component = render(
    <Blog blog={testBlog} username="testUser" />,
  );

  expect(component.container).toHaveTextContent('testTitle');
  expect(component.container).toHaveTextContent('testAuthor');
  expect(component.container).not.toHaveTextContent('testUrl');
  expect(component.container).not.toHaveTextContent('likes: 1');
});
