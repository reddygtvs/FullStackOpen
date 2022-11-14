const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes;
  };
  return blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  const reducer = (maximum, item) => {
    console.log(maximum);
    console.log(item);
    console.log("----------------------");
    //item.likes > maximum.likes ? item : maximum;
    if (item.likes > maximum.likes) {
      return item;
    } else {
      return maximum;
    }
  };
  return blogs.reduce(reducer, blogs[0]);
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
