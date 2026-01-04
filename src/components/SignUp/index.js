import {useState, useContext} from "react";
import {Link, useNavigate} from "react-router-dom";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {setDoc, doc} from "firebase/firestore";
import {auth,user} from "../Firebase/firebaseConfig";

const Signup = (props) => {

    const navigate = useNavigate();

    const data = {
        pseudo: "",
        email: "",
        password: "",
        confirmpassword: ""
    }
    const [loginData, setLoginData] = useState(data);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setLoginData({...loginData, [e.target.id]: e.target.value});
    }
    // javascript
    const handleSubmit = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, loginData.email, loginData.password)
            .then(authUser => {
                return setDoc(user(authUser.user.uid), {
                    pseudo: loginData.pseudo,
                    email: loginData.email
                });
            })
            .then(() => {
                setLoginData({...data});
                navigate("/");
            })
            .catch(error => {
                setError(error.message);
                setLoginData({...data});
            });
    };

    console.log(loginData);

    const {pseudo, email, password, confirmpassword} = loginData;

    const btn = pseudo === "" || email === "" || password === "" || password !== confirmpassword ? <button disabled>Inscription</button> : <button>Inscription</button>;

    const errorMessage = error !== null && <span className={"errorMessage"}>{error}</span>

    return (
        <div className={"signUpLoginBox"}>
            <div className={"slContainer"}>
                <div className={"formBoxLeftSignup"}>
                </div>
                <div className={"formBoxRight"}>
                    <div className={"formContent"}>
                        {errorMessage}
                        <h2>Inscription</h2>
                        <form onSubmit={handleSubmit}>
                            <div className={"inputBox"}>
                                <input type="text" id={"pseudo"} value={pseudo} onChange={handleChange} autoComplete={"off"} required/>
                                <label htmlFor={"pseudo"}>Pseudo</label>
                            </div>

                            <div className={"inputBox"}>
                                <input type="text" id={"email"} value={email} onChange={handleChange} autoComplete={"off"} required/>
                                <label htmlFor={"email"}>Email</label>
                            </div>
                            <div className={"inputBox"}>
                                <input type="password" id={"password"} value={password} onChange={handleChange} autoComplete={"off"} required/>
                                <label htmlFor={"password"}>Mot de passe</label>
                            </div>
                            <div className={"inputBox"}>
                                <input type="password" id={"confirmpassword"} value={confirmpassword} onChange={handleChange} autoComplete={"off"} required/>
                                <label htmlFor={"confirmpassword"}>Confirmer l mot de passe</label>
                            </div>
                            {btn}
                        </form>
                        <div className={"linkContainer"}>
                            <Link className={"simpleLink"} to={"/login"}>Déjà inscrit ? Connecte toi.</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup;