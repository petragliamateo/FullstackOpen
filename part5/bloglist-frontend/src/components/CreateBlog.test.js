import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import CreateBlog from './CreateBlog';

describe('CreateBlog test', () => {
  test('Test form is correct?', () => {
    const eventBlog = jest.fn();
    const component = render(
      <CreateBlog handleSubmit={eventBlog} />,
    );

    const form = component.container.querySelector('form');
    const title = component.container.querySelector('#title');
    fireEvent.change(title, { target: { value: 'title' } });
    const author = component.container.querySelector('#author');
    fireEvent.change(author, { target: { value: 'author' } });
    const url = component.container.querySelector('#url');
    fireEvent.change(url, { target: { value: 'url' } });
    fireEvent.submit(form);

    expect(eventBlog.mock.calls).toHaveLength(1);
    expect(eventBlog.mock.calls[0][0].title).toBe('title');
    expect(eventBlog.mock.calls[0][0].author).toBe('author');
    expect(eventBlog.mock.calls[0][0].url).toBe('url');
  });
});
