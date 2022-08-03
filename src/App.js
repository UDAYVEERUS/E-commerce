import './App.css';
import {Routes,Route} from 'react-router-dom'
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Navbar from './components/Navbar';
import Grocery from './components/Grocery';
import Pharmacy from './components/Pharmacy';
import ProductDetail from './components/ProductDetail';
import CartData from './components/CartData';
import Success from './components/Success';
import History from './components/History';
import { useSelector } from 'react-redux';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/grocery' element={<Grocery/>}></Route>
        <Route path='/pharmacy' element={<Pharmacy/>}></Route>
        <Route path='/:id' element={<ProductDetail/>}></Route>
        <Route path='/cartdata' element={<CartData/>}></Route>
        <Route path='/success' element={<Success/>}></Route>
        <Route path='/history' element={<History/>}></Route>
      </Routes>
    </div>
  );
}

export default App;