import './App.css';
import { Routes, Route } from "react-router-dom";
import SearchPage from './components/SearchPage';
import Home from './components/Home';
import BookInfo from './components/BookInfo';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="SearchPage" element={<SearchPage />} />
        <Route path="BookInfo/:id" element={<BookInfo />} />
      </Routes>
    </div>
  );
}

export default App;
