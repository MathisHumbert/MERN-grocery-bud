import { useGlobalContext } from '../context/context';

const Header = () => {
  const { user, logoutUser } = useGlobalContext();

  return (
    <header>
      <h3>{user !== undefined && `${user.name}'s `}grocery bud</h3>
      <button className='login-btn' onClick={logoutUser}>
        logout
      </button>
    </header>
  );
};

export default Header;
