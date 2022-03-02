import { FaTrash, FaEdit } from 'react-icons/fa';
import { useGlobalContext } from '../context/context';

const List = ({ value, _id }) => {
  const { deleteGroceryItem, setEdit } = useGlobalContext();

  return (
    <article className='grocery-item'>
      <p className='title'>{value}</p>
      <div className='btn-container'>
        <button
          type='button'
          className='edit-btn'
          onClick={() => setEdit(_id, value)}
        >
          <FaEdit />
        </button>
        <button
          type='button'
          className='delete-btn'
          onClick={() => deleteGroceryItem(_id)}
        >
          <FaTrash />
        </button>
      </div>
    </article>
  );
};

export default List;
