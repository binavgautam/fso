const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum, likes) => {
    return sum + likes;
  };
  const likes = blogs.map((b) => b.likes);
  return likes.reduce(reducer, 0);
};

const favouriteBlog = (blogs) => {
  const maxL = Math.max(...blogs.map((b) => b.likes));
  const maxB = blogs.find((b) => b.likes === maxL);
  return maxB;
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
};
