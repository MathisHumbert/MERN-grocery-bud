import { useEffect } from 'react';
import { useGlobalContext } from '../context/context';
import List from './List';

const Grocery = () => {
  const { getAllGroceries, grocery, deleteAllGroceries } = useGlobalContext();

  useEffect(() => {
    getAllGroceries();
    // eslint-disable-next-line
  }, []);

  if (!grocery) {
    return <></>;
  }

  return (
    <div className='grocery-container'>
      <div className='grocery-list'>
        {grocery.map((item) => {
          return <List key={item._id} {...item} />;
        })}
      </div>
      {grocery.length > 0 && (
        <button className='clear-btn' onClick={deleteAllGroceries}>
          clear items
        </button>
      )}
    </div>
  );
};

export default Grocery;
