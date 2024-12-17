import './App.css';
import Marquee from './components/Marquee.jsx';
import Login from './pages/login/Login.jsx';

function App() {
  return (
    <div className='App'>
      <Marquee text='Only Google authentication works  ' />
      <Login />
    </div>
  );
}

export default App;
