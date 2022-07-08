import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

describe('Blog test', () => {
  let component;
  beforeEach(() => {
    const testBlog = {
      title: 'testTitle', author: 'testAuthor', url: 'testUrl', likes: 1, user: { name: 'root' },
    };
    component = render(
      <Blog blog={testBlog} username="testUser" />,
    );
  });

  test('Is blog render OK', () => {
    expect(component.container).toHaveTextContent('testTitle');
    expect(component.container).toHaveTextContent('testAuthor');
    expect(component.container).not.toHaveTextContent('testUrl');
    expect(component.container).not.toHaveTextContent('likes: 1');
  });

  test('When click on view the note expands', () => {
    const viewButton = component.getByText('view');
    fireEvent.click(viewButton);
    expect(component.container).toHaveTextContent('testTitle');
    expect(component.container).toHaveTextContent('testAuthor');
    expect(component.container).toHaveTextContent('testUrl');
    expect(component.container).toHaveTextContent('likes: 1');
  });
});
