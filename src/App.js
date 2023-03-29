import { Routes, Route } from "react-router-dom";

import "./App.css";
import { MainPage } from "./pages/MainPage/MainPage";
import { ItemPage } from "./pages/ItemPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/item/:id" element={<ItemPage />} />
    </Routes>
  );
}

export default App;
