import './App.css';
import {Routes, Route, Navigate} from 'react-router-dom';
import Navbar from "./components/navbar/Navbar";
import Home from "./components/home/Home";
import Create from "./components/create/Create";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import Type from "./components/type/Type";
import TypeDetail from "./components/typeDetail/TypeDetail";
import TypeSearch from "./components/typesearch/TypeSearch";

export const URL = process.env.REACT_APP_URL;

function App() {
  return (
    <div>
      <Navbar />
          <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/create' element={<Create /> } />
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/types/:type' element={<Type />} />
              <Route path='/types/:type/:place' element={<TypeSearch />} />
              <Route path='/typeDetail/:id' element={ <TypeDetail />} />
          </Routes>
    </div>
  );
}

export default App;
