import { Navigate, Route, Routes } from 'react-router-dom';
import { useContext } from 'react';

import Login from './pages/login/Login.jsx';
import Main from './pages/main/Main.jsx';
import { AuthContext } from './context/AuthContext.jsx';


import './App.css';

function App() {
  const { authUser } = useContext(AuthContext);

  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={!authUser ? <Navigate to='/login' /> : <Main />} />
        <Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />} />
      </Routes>

    </div>
  );
}

export default App;
