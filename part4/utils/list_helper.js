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
    if (item.likes > maximum.likes) {
      return item;
    } else {
      return maximum;
    }
  };
  return blogs.reduce(reducer, blogs[0]);
};

const mostBlogs = (blogs) => {
  let blogHash = new Map();
  const reducer = (most, item) => {
    if (most.title === "none") {
      blogHash.set(item.author, 1);
      return item;
    }
    if (!blogHash.has(item.author)) {
      blogHash.set(item.author, 1);
    } else {
      blogHash.set(item.author, blogHash.get(item.author) + 1);
    }
    if (blogHash.get(most.author) < blogHash.get(item.author)) {
      return item;
    } else {
      return most;
    }
  };
  return blogs.reduce(reducer, { title: "none" });
};

const mostLikes = (blogs) => {
  let blogHash = new Map();
  const reducer = (most, item) => {
    if (most.title === "none") {
      blogHash.set(item.author, item.likes);
      return item;
    }
    if (!blogHash.has(item.author)) {
      blogHash.set(item.author, item.likes);
    } else {
      blogHash.set(item.author, blogHash.get(item.author) + item.likes);
    }
    if (blogHash.get(most.author) < blogHash.get(item.author)) {
      return item;
    } else {
      return most;
    }
  };
  return blogs.reduce(reducer, { title: "none" });
};
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
