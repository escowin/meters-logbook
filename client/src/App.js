import Header from './components/Header';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import './App.css';

function App() {
  const date = new Date().getFullYear();

  return (
    <>
      <Header/>
      <main>
        <SignUp/>
        {/* <Login/> */}
      </main>
      <Footer date={date}/>
    </>
  );
}

export default App;
