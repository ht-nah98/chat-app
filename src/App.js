import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AuthProvider from "./contexts/auth";
import { PrivateRoute } from "./components/PrivateRoute";
import Profile from "./pages/Profile";
import { Landing } from "./pages/Landing";
import { Image } from "./pages/Image";
import Landing_noAuth from "./pages/Landing_noAuth";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/homepage" element={<Landing_noAuth />}></Route>
          <Route element={<PrivateRoute />}>
            <Route path="/landing" element={<Landing />}></Route>
            <Route path="/" element={<Home />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/myimage" element={<Image />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
