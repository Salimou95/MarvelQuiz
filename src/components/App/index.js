import '../../App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Header from "../Header";
import Landing from "../Landing";
import Footer from "../Footer";
import Welcome from "../Welcome";
import Login from "../Login";
import Signup from "../SignUp";
import ForgetPassword from "../ForgetPassword";
import ErrorPage from "../ErrorPage";

function App() {
  return (
    <Router>
        <Header />
        <Routes>
                <Route exact path={"/"} element={<Landing/>}></Route>
                <Route path={"/welcome"} element={<Welcome/>}></Route>
                <Route path={"/login"} element={<Login/>}></Route>
                <Route path={"/signup"} element={<Signup/>}></Route>
                <Route path={"/forgetpassword"} element={<ForgetPassword/>}></Route>
                <Route path={"*"} element={<ErrorPage/>}></Route>
        </Routes>
        <Footer />
    </Router>
  );
}

export default App;
