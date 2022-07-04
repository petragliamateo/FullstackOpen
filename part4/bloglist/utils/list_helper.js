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

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  const authors = blogs.map((b) => b.author);
  const totalOfAuthors = authors.filter((a, i) => authors.lastIndexOf(a) === i);

  const authorAndBlogs = [];
  for (let i = 0; i < totalOfAuthors.length; i += 1) {
    const orderedBlog = blogs.filter((b) => b.author === totalOfAuthors[i]);
    authorAndBlogs.push({
      author: totalOfAuthors[i],
      blogs: orderedBlog.length,
    });
  }
  authorAndBlogs.sort((a, b) => b.blogs - a.blogs);
  return authorAndBlogs[0];
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  const authors = blogs.map((b) => b.author);
  const totalOfAuthors = authors.filter((a, i) => authors.lastIndexOf(a) === i);

  const authorAndLikes = [];
  for (let i = 0; i < totalOfAuthors.length; i += 1) {
    const orderedBlog = blogs.filter((b) => b.author === totalOfAuthors[i]);
    authorAndLikes.push({
      author: totalOfAuthors[i],
      likes: orderedBlog.map((b) => b.likes).reduce((a, b) => a + b),
    });
  }
  authorAndLikes.sort((a, b) => b.likes - a.likes);
  return authorAndLikes[0];
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
