import {Component} from "react";
import {QuizMarvel} from "../quizMarvel";
import Levels from "../Levels";
import ProgressBar from "../ProgressBar";

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
    }

    loadQuestion = level =>{
        const fetchArrayQuiz = QuizMarvel[0].quizz[level];
        if(fetchArrayQuiz.length >= this.state.maxQuestions){
            console.log("ok pour le chargement des questions");
            const newArray = fetchArrayQuiz.map(({aswer, ...keepRest}) => keepRest);
            this.setState({storeQuestions: newArray});
        }else{
            console.log("pas assez de questions pour ce niveau");
        }
    }

    componentDidMount() {
        this.loadQuestion(this.state.levelName[this.state.quizLevel]);
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.state.storeQuestions !== prevState.storeQuestions && this.state.storeQuestions.length > 0){
            this.setState({
                question: this.state.storeQuestions[this.state.idQuestion].question,
                options: this.state.storeQuestions[this.state.idQuestion].options,
            });
        }
    }

    submitAnswer = selectedAnswer => {
        this.setState({
            btnDisabled: false,
            userAnswer: selectedAnswer,
        });

    }

    render() {

        const displayOption = this.state.options.map((option, index) => {
            return(
                <p key={index} className={`answerOptions ${this.state.userAnswer === option ? "selected" : null} `} onClick={() => this.submitAnswer(option)}>{option}</p>
            )
        })

        return(
            <div>
                <Levels />
                <ProgressBar />
                <h2>{this.state.question}</h2>
                {displayOption}
                <button disabled={this.state.btnDisabled} className={"btnSubmit"}>Suivant</button>
            </div>
        )
    }
}



export default Quiz;