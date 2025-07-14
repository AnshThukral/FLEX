import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Signup from './Signup';
import Login from './Login';
import EDashboard from './EDashboard';
import RDashboard from './RDashboard';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path = "/" element={<Signup/>}/>
        <Route path = "/login" element={<Login/>}/>
        <Route path = "/empDashboard" element={<EDashboard/>}/>
        <Route path = "/recDashboard" element={<RDashboard/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
