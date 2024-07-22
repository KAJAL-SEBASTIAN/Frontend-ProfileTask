
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Auth from './Pages/Auth';
import Dashboard from './Pages/Dashboard';

function App() {
  return (
    <div className="App">
       <Routes>
<Route path='/' element={<Auth/>} />
<Route path='/register' element={<Auth register/>} />
<Route path='/dashboard' element={<Dashboard/>} />
     </Routes>
    </div>
  );
}

export default App;
