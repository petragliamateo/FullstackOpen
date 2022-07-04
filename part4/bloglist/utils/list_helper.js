const dummy = () => 1;

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0;
  }
  return blogs.map((b) => b.likes).reduce((a, b) => a + b);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }
  const mostLikes = Math.max(...blogs.map((b) => b.likes));
  return blogs.find((b) => b.likes === mostLikes);
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
