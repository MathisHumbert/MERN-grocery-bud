import { useGlobalContext } from '../context/context';

const Form = () => {
  const {
    inputValue,
    handleFormChange,
    addGroceryItem,
    isEditing,
    updateGroceryItem,
  } = useGlobalContext();

  const onSubmit = (e) => {
    e.preventDefault();

    if (!inputValue) {
      // alert
      return;
    }

    if (isEditing) {
      updateGroceryItem();
    } else {
      addGroceryItem();
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className='form-control'>
        <input
          type='text'
          className='grocery'
          placeholder='bread'
          value={inputValue}
          onChange={handleFormChange}
        />
        <button className='submit-btn'>{isEditing ? 'edit' : 'submit'}</button>
      </div>
    </form>
  );
};

export default Form;
