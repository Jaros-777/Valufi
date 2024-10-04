
import './App.css'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from './HomePage';

function App() {

  return (
    <BrowserRouter>
      <Routes>
          <Route index element={<HomePage />} />
          {/* <Route path="blogs" element={<Blogs />} /> */}
          {/* <Route path="*" element={<NoPage />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
