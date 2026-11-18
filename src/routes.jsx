import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import FormLogin from "./components/FormLogin/FormLogin";
import Profile from './components/Profile/Profile'
import Header from "./components/Header/Header";
import FormRegister from "./components/FormRegister/FormRegister";
import Footer from "./components/Footer/Footer";
import About from "./components/About/About";
import Terms from "./components/Terms/Terms";

export default function AppRoutes(){
    return(
    <BrowserRouter>
        <Header />
        <Routes>
            <Route path="/" element={<App />}/>
            <Route path="/login" element = {<FormLogin />} />
            <Route path="/register" element = {<FormRegister />} />
            <Route path="/profile" element = {<Profile/>} />
            <Route path="/about" element = {<About />} />
            <Route path="/terms" element ={<Terms />} />
        </Routes>
        <Footer />
    </BrowserRouter>
    )
}