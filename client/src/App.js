import './App.css';
import {Routes, Route, useLocation} from 'react-router-dom';

import Home from './components/home.jsx';
import Form from './components/form.jsx';
import LandingPage from './components/landingPage';
import NavBar from './components/navBar.jsx'
import Detail from './components/detail.jsx'
function App() {

  const location = useLocation()

  return (
    <div className="App">
        {location.pathname === '/' ? <LandingPage/> : <NavBar/>}
      <Routes>
        <Route exact path="/home" element={<Home/>}/>
        <Route exact path="/create" element={<Form/>} />
        <Route exact path='/detail' element={<Detail/>} />
      </Routes>

    </div>
  );
}

export default App;
