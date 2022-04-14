import './App.css';
import { Routes, Route } from "react-router-dom";
import SearchPage from './components/SearchPage';
import Home from './components/Home';
import BookInfo from './components/BookInfo';
import NotFound from './components/NotFound';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="SearchPage" element={<SearchPage />} />
        <Route exact path="BookInfo/:id" element={<BookInfo />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
