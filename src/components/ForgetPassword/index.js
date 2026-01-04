import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {auth} from "../Firebase/firebaseConfig";
import {sendPasswordResetEmail} from "firebase/auth";

const ForgetPassword = props => {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);


    const handleSubmit = (e) => {
        e.preventDefault();
        sendPasswordResetEmail(auth, email)
            .then((res) => {
                setError(null);
                setSuccess(`Un email de réinitialisation a été envoyé à ${email}`);
                setEmail("");

                setTimeout(() => {
                navigate("/login");}, 5000);

            })
            .catch((error) => {
                setSuccess(null);
                setError(error.message);
                setEmail("");

            });
    }
    const disabled = email === ""

    return (
        <div className={"signUpLoginBox"}>
            <div className={"slContainer"}>
                <div className={"formBoxLeftForget"}>
                </div>
                <div className={"formBoxRight"}>
                    <div className={"formContent"}>

                        {success && <span style={{
                            border: "1px solid green",
                            backgroundColor: "green",
                            color: "#ffffff",
                        }}>{success}</span>}
                        {error && <span>{error}</span>}

                        <h2>Mot de passe oublié</h2>
                        <form onSubmit={handleSubmit}>
                            <div className={"inputBox"}>
                                <input type="text" id={"email"} value={email} onChange={e => setEmail(e.target.value)} autoComplete={"off"} required/>
                                <label htmlFor={"email"}>Email</label>
                            </div>
                            <button>Récuperer</button>
                        </form>
                        <div className={"linkContainer"}>
                            <Link className={"simpleLink"} to={"/login"}>Déjà inscrit ? Connecte toi.</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgetPassword;