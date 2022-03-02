import { useGlobalContext } from './context/context';
import Header from './components/Header';
import Form from './components/Form';
import Grocery from './components/Grocery';
import LoginSignUp from './components/LoginSignUp';

const App = () => {
  const { isUserLoggedIn } = useGlobalContext();

  if (!isUserLoggedIn) {
    return <LoginSignUp />;
  }

  return (
    <section className='section-center'>
      <Header />
      <Form />
      <Grocery />
    </section>
  );
};

export default App;
