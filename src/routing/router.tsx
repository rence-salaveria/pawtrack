import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Register from "../pages/Register.tsx";
import Login from "../pages/Login.tsx";
import Home from "../pages/Home.tsx";
import Dashboard from "../pages/AuthGuarded/Dashboard.tsx";
import PetSlug from "../pages/AuthGuarded/PetSlug.tsx";
import PetAdd from "../pages/AuthGuarded/PetAdd.tsx";
import AuthGuard from "../components/auth-guard.tsx";
import Contact from "@/pages/Contact.tsx";

export function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/u/*" element={<AuthGuard>
          <Routes>
            <Route path="pets" element={<Dashboard/>} />
            <Route path="pets/:id" element={<PetSlug/>} />
            <Route path="pets/add" element={<PetAdd/>} />
          </Routes>
        </AuthGuard>} />
      </Routes>
    </Router>
  );
}

export default AppRouter;