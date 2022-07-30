import './App.css';
import {Navbar}    from './components/Navbar';
import  Pages from './pages/Pages';
import {Login} from "./pages/Login";

function App() {
  return (
    <>
    <Navbar/>
    <Pages/>
    <Login />
    </>
  );
}

export default App;