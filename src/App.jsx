import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import UserList from './components/UserList'; // Import UserList component
import './App.css';

function App() {
  return (
    <div> 
      <nav>
        <Link to="/">Home</Link> | <Link to="/about">About</Link> | <Link to="/users">Users</Link> 
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/users" element={<UserList />} /> 
      </Routes>
    </div>
  );
}

export default App;
