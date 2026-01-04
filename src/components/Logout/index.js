import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {signOut} from "firebase/auth";
import {auth} from "../Firebase/firebaseConfig";

const Logout = () => {
    const navigate = useNavigate();

    const [checked, setChecked] = useState(false);

    console.log(checked)
    useEffect(() => {
        if(checked){
            console.log("User logged out");
            signOut(auth)
                .then(() => {
                    console.log("Sign-out successful.");
                    navigate("/", {replace: true});
                })
                .catch((error) => {
                    console.log("An error happened during sign-out:", error);
                })
        }
    }, [checked]);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    }

    return(
        <div className={"logoutContainer"}>
            <label className={"switch"}>
                <input
                    onChange={handleChange}
                    type={"checkbox"}
                    checked={checked}/>
                <span className={"slider round"}></span>
            </label>
        </div>
    )
}

export default Logout;