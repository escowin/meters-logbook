import Header from './components/Header';
import Footer from './components/Footer';
import Signup from './pages/Signup';
// import Login from './pages/Login';
import './App.css';

function App() {
  const date = new Date().getFullYear();

  return (
    <>
      <Header/>
      <main>
        <Signup/>
        {/* <Login/> */}
      </main>
      <Footer date={date}/>
    </>
  );
}

export default App;
