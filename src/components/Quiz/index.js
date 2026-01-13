import React,{Component, Fragment} from "react";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {QuizMarvel} from "../quizMarvel";
import Levels from "../Levels";
import ProgressBar from "../ProgressBar";
import QuizOver from "../QuizOver";


class Quiz extends Component {

    state = {
        levelName : ["debutant", "confirme", "expert"],
        quizLevel: 0,
        maxQuestions: 10,
        storeQuestions: [],
        question: null,
        options: [],
        idQuestion: 0,
        btnDisabled: true,
        userAnswer: null,
        score: 0,
        showWelcomeMsg: false,
        quizEnd: false,
    }

    storeDataRef = React.createRef();

    loadQuestion = level =>{
        const fetchArrayQuiz = QuizMarvel[0].quizz[level];
        if(fetchArrayQuiz.length >= this.state.maxQuestions){
            this.storeDataRef.current = fetchArrayQuiz;
            console.log(this.storeDataRef);
            console.log("ok pour le chargement des questions");
            const newArray = fetchArrayQuiz.map(({answer, ...keepRest}) => keepRest);
            this.setState({storeQuestions: newArray});
        }else{
            console.log("pas assez de questions pour ce niveau");
        }
    }

    showWelcomeMsg = pseudo => {
        if(!this.state.showWelcomeMsg){

            this.setState({showWelcomeMsg: true});

            console.log("showWelcomeMsg appelé avec pseudo:", pseudo);
            toast.warn(`Bienvenue ${pseudo}! `, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }

    }

    componentDidMount() {
        this.loadQuestion(this.state.levelName[this.state.quizLevel]);

        if(this.props.userData && this.props.userData.pseudo){
            this.showWelcomeMsg(this.props.userData.pseudo);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.state.storeQuestions !== prevState.storeQuestions && this.state.storeQuestions.length > 0){
            this.setState({
                question: this.state.storeQuestions[this.state.idQuestion].question,
                options: this.state.storeQuestions[this.state.idQuestion].options,
            });
        }

        if(this.state.idQuestion !== prevState.idQuestion){
            this.setState({
                question: this.state.storeQuestions[this.state.idQuestion].question,
                options: this.state.storeQuestions[this.state.idQuestion].options,
                userAnswer: null,
                btnDisabled: true,
            })
        }

        if(this.props.userData && this.props.userData.pseudo && (!prevProps.userData || !prevProps.userData.pseudo)){
            this.showWelcomeMsg(this.props.userData.pseudo);
        }
    }

    submitAnswer = selectedAnswer => {
        this.setState({
            btnDisabled: false,
            userAnswer: selectedAnswer,
        });

    }

    gameOver = () => {
        this.setState({
            quizEnd: true,
        });
        console.log("Le jeu est terminé");
    }

    nextQuestion = () => {
        const goodAnswer = this.storeDataRef.current[this.state.idQuestion].answer;

        console.log("Réponse utilisateur:", this.state.userAnswer);
        console.log("Bonne réponse:", goodAnswer);

        if (this.state.userAnswer === goodAnswer){
            this.setState(prevState => ({
                score: prevState.score + 1,
            }));

            console.log("Bonne réponse!");
            toast.success('Bonne Réponse!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        } else {
            console.log("Mauvaise réponse");
            toast.error('❌ Oops! Mauvaise réponse', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }

        if (this.state.idQuestion === this.state.maxQuestions - 1){
            this.gameOver();
            console.log("Fin du quiz");
        } else {
            this.setState(prevState => ({
                idQuestion: prevState.idQuestion + 1,
            }));
        }





    }

    render() {
        const displayOption = this.state.options.map((option, index) => {
            return(
                <p key={index} className={`answerOptions ${this.state.userAnswer === option ? "selected" : null} `} onClick={() => this.submitAnswer(option)}>{option}</p>
            )
        })

        return (this.state.quizEnd) ? (
            <QuizOver />
        ) : (
            <Fragment>
                <ToastContainer />
                <Levels />
                <ProgressBar />
                <h2>{this.state.question}</h2>
                {displayOption}
                <button disabled={this.state.btnDisabled} className={"btnSubmit"} onClick={this.nextQuestion}>Suivant</button>
            </Fragment>
        )
    }
}



export default Quiz;