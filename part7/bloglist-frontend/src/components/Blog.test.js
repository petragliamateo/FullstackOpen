import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

describe('Blog test', () => {
  let component;
  const testBlog = {
    title: 'testTitle', author: 'testAuthor', url: 'testUrl', likes: 1, user: { name: 'root' },
  };
  beforeEach(() => {
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
    expect(component.container).toHaveTextContent('testUrl');
    expect(component.container).toHaveTextContent('likes: 1');
  });

  test('Test clicking on like button twice', () => {
    const eventHandler = jest.fn();
    const componentEvent = render(
      <Blog blog={testBlog} username="testUser" handleLike={eventHandler} />,
    );
    const viewButton = componentEvent.container.querySelector('.viewButton');
    fireEvent.click(viewButton);
    // likeButton aparece luego de presionar viewButton
    const likeButton = componentEvent.container.querySelector('.likeButton');
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);

    expect(eventHandler.mock.calls).toHaveLength(2);
  });
});
