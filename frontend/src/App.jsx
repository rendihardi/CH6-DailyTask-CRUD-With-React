import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ListCar from "./components/ListCar";
import AddCar from "./components/AddCar";
import UpdateCar from "./components/UpdateCar";

function App() {
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ListCar />} />
          <Route path="add" element={<AddCar />} />
          <Route path="update/:id" element={<UpdateCar />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
