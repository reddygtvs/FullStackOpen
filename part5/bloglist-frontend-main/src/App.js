import { useState, useEffect, useRef, createRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import BlogExpanded from "./components/BlogExpanded";
import LoginForm from "./components/LoginForm";
import "./App.css";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [user, setUser] = useState(null);
  const blogFormRef = useRef();
  // useEffect(() => {
  //   blogService.getAll().then((blogs) => setBlogs(blogs.sort()));
  // }, []);
  useEffect(() => {
    blogService.getAll().then((blogs) => {
      const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);
      setBlogs(sortedBlogs);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);
  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility();
    blogService
      .create(blogObject)
      .then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog));
        setMessage(
          `A new blog ${returnedBlog.title} by ${returnedBlog.author} added`
        );
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      })
      .catch((error) => {
        setMessage("Failed to add the blog. Please try again later.");
        console.error("Error adding blog:", error);
      });
  };
  const updateBlog = (id, blogObject) => {
    blogService
      .update(id, blogObject)
      .then((returnedBlog) => {
        console.log("Successfully updated blog");
        setBlogs(blogs.map((blog) => (blog.id !== id ? blog : returnedBlog)));
        setMessage(`Blog ${blogObject.title} by ${blogObject.author} updated`);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      })
      .catch((error) => {
        setMessage("Failed to update the blog. Please try again later.");
        console.error("Error updating blog:", error);
      });
  };
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);

      setUsername("");
      setPassword("");
      setMessage(`${user.name}, welcome! You're now logged in`);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (exception) {
      setMessage("Wrong username or password");
      setUsername("");
      setPassword("");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };
  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
  };

  const blogForm = () => (
    <div className="home">
      <h2>Blogs</h2>
      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>logout</button>
      <Togglable
        buttonLabel="new blog"
        buttonHideLabel="cancel"
        ref={blogFormRef}
      >
        <BlogForm createBlog={addBlog} />
      </Togglable>

      {blogs.map((blog) => (
        <div className="Blog">
          <Blog key={blog.id} blog={blog} />
          <Togglable
            buttonLabel="view"
            buttonHideLabel="hide"
            ref={createRef()}
          >
            <BlogExpanded handleUpdate={updateBlog} blog={blog} />
          </Togglable>
        </div>
      ))}
    </div>
  );

  const loginForm = () => (
    <LoginForm
      handleSubmit={handleLogin}
      username={username}
      password={password}
      setUsername={setUsername}
      setPassword={setPassword}
    />
  );
  return (
    <div>
      <Notification message={message} />
      {user === null ? loginForm() : blogForm()}
    </div>
  );
};

export default App;
