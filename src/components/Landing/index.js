import {useRef, useEffect, useState, Fragment} from "react";

const Landing = () => {

    const [btn, setbtn] = useState(false);
    const refWolverine = useRef(null);

    useEffect(() => {

        setTimeout(() => {
            refWolverine.current.classList.add("startingImg");
            setbtn(true);
        },1000)
    }, []);

    const displayBtn = btn &&(
        <Fragment>
            <div className="leftBox">
                <button className="btn-welcome">
                    Inscription
                </button>
            </div>
            <div className="rightBox">
                <button className="btn-welcome">
                    Connexion
                </button>
            </div>
        </Fragment>
    )

    return (
        <main ref={refWolverine} className="welcomePage">
            {displayBtn}
        </main>
    );
}

export default Landing;