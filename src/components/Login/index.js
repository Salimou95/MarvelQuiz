import {Link, useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../Firebase/firebaseConfig";
const Login = () => {

    const navigate = useNavigate();
    const data = {
        email: "",
        password: "",
    }
    const [loginData, setLoginData] = useState(data);
    const [error, setError] = useState(null);
    const {email, password} = loginData;


    useEffect(() => {
        if(password.length > 5 && email !== ""){
            setBtn(true);
        } else if (btn){
            setBtn(false);
        }
    }, [data]);

    const[btn, setBtn] = useState(false);


    const handleChange = (e) => {
        setLoginData({...loginData, [e.target.id]: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, loginData.email, loginData.password)
            .then(user => {
                setLoginData({...data});
                navigate("/welcome", {replace : true});
            })
            .catch(error => {
                setError(error.message);
                setLoginData({...data});
            });

    }
    const errorMessage = error !== null && <span className={"errorMessage"}>{error}</span>

    return (
        <div className={"signUpLoginBox"}>
            <div className={"slContainer"}>
                <div className={"formBoxLeftLogin"}>
                </div>
                <div className={"formBoxRight"}>
                    <div className={"formContent"}>
                        {errorMessage}
                        <h2>Connexion</h2>
                        <form onSubmit={handleSubmit}>
                            <div className={"inputBox"}>
                                <input type="text" id={"email"} value={email} onChange={handleChange} autoComplete={"off"} required/>
                                <label htmlFor={"email"}>Email</label>
                            </div>
                            <div className={"inputBox"}>
                                <input type="password" id={"password"} value={password} onChange={handleChange} autoComplete={"off"} required/>
                                <label htmlFor={"password"}>Mot de passe</label>
                            </div>
                            {btn ? <button>Connexion</button> : <button disabled>Connexion</button>}
                        </form>
                        <div className={"linkContainer"}>
                            <Link className={"simpleLink"} to={"/signup"}>Nouveau sur marvel Quiz ? Incrivez-vous maintenant .</Link>
                            <Link className={"simpleLink"} to={"/forgetpassword"}>Mot de passe oublié ?</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;