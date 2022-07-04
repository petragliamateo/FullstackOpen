const listHelper = require('../utils/list_helper');

const blogs = require('../utils/initialBlogs');

test('dummy returns one', () => {
  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe('total likes', () => {
  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([]);
    expect(result).toBe(0);
  });

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes([blogs[0]]);
    expect(result).toBe(7);
  });

  test('the sum of all blogs', () => {
    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(36);
  });
});

describe('favorite blog', () => {
  test('of empty list is null', () => {
    const result = listHelper.favoriteBlog([]);
    expect(result).toEqual(null);
  });

  test('of a one blog is itself', () => {
    const result = listHelper.favoriteBlog([blogs[0]]);
    expect(result).toEqual(blogs[0]);
  });

  test('of a all blogs', () => {
    const result = listHelper.favoriteBlog(blogs);
    expect(result).toEqual(blogs[2]);
  });
});

describe('most blogs', () => {
  const mostBlogged = { author: 'Robert C. Martin', blogs: 3 };
  test('the author with most of blogs', () => {
    const result = listHelper.mostBlogs(blogs);
    expect(result).toEqual(mostBlogged);
  });
});

describe('most likes', () => {
  const mostLiked = { author: 'Edsger W. Dijkstra', likes: 17 };
  test('the author with most of likes', () => {
    const result = listHelper.mostLikes(blogs);
    expect(result).toEqual(mostLiked);
  });
});
