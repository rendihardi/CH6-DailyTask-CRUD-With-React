import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AddCar from "./components/AddCar";
import UpdateCar from "./components/UpdateCar";
import Home from "./components/Home";

function App() {
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home></Home>} />
          <Route path="add" element={<AddCar />} />
          <Route path="update/:id" element={<UpdateCar />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
