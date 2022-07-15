/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */
/* eslint-disable react/forbid-prop-types */
import propTypes from 'prop-types';
import { useDispatch } from 'react-redux/es/exports';
import { setItem } from '../reducer/appReducer';

function CreateBlog({
  blogService, showNotification, toggleVisibility, handleSubmit,
}) {
  const fields = ['title', 'author', 'url'];

  const dispatch = useDispatch();

  const createBlog = async (event) => {
    const { title, author, url } = event.target;
    const newBlog = {
      title: title.value,
      author: author.value,
      url: url.value,
    };
    if (handleSubmit) {
      handleSubmit(newBlog);
      return;
    }
    event.preventDefault();
    await blogService.postBlog(newBlog);
    const blogs = await blogService.getAll();
    dispatch(setItem('blogs', blogs));
    showNotification(`a new blog ${newBlog.title} by ${newBlog.author}`);
    title.value = '';
    author.value = '';
    url.value = '';
    toggleVisibility();
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createBlog}>
        {fields.map((name) => (
          <div key={name}>
            {name}
            <input name={name} />
          </div>
        ))}
        <button id="createButton" type="submit">create</button>
      </form>
    </div>
  );
}

export default CreateBlog;

CreateBlog.propTypes = {
  blogService: propTypes.object.isRequired,
  showNotification: propTypes.func.isRequired,
  toggleVisibility: propTypes.func.isRequired,
};
