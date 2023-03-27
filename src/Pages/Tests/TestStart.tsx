import { SyntheticEvent, useEffect, useState } from "react";
import Modal from "../../Components/Modal/Modal";
import'../../Components/Modal/Modal.css';

const TestStart = (props: {active: boolean, setActive: (active: boolean) => void, testData: {question:string, answers: never[]}[], testName: string, username: string, token: string | null}) => {
    const testData = props.testData;
    const [isNotConfirmed, setIsNotConfirmed] = useState(true);
    const title = props.testName;
    const [answersState, setAnswersState] = useState({answers: [{question: '', value: '', checked: false, isCorrect: false}]});
    const user = props.username;
    const [result, setResult] = useState(0);
    const [ minutes, setMinutes ] = useState(30);
    const [ seconds, setSeconds ] = useState(0);
    const [ timerActive, setTimerActive ] = useState(true);
    const [answersData, setAnswersData] = useState(true);

    useEffect(() => {
        if (seconds > 0 && timerActive) {
            setTimeout(setSeconds, 1000, seconds - 1);
        }
        else if(seconds === 0 && timerActive)
        {
            setMinutes(minutes - 1);
            setSeconds(59);
        }
    }, [seconds, minutes, timerActive]);

    const handleChange = (value: string, checked: boolean) => {
        if(answersData)
        {
            testData.map(item => (
                    item.answers.map(answerItem => (
                        answersState.answers.push({question: item['question'], value: answerItem['answer'], checked: false, isCorrect: answerItem['isCorrect']})
                    ))
                ));
            console.log(answersState.answers);
            setAnswersData(false);
        }
        
        answersState.answers.forEach((item) => {
            if (item.value === value) item.checked = checked;
        });        
    }

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        setTimerActive(false);

        let numCorrectByUser = 0;
        let numIsCorrectAnswers = 0;

        answersState.answers.forEach((item, index, answers) => {
            if (item.checked === true && item.isCorrect === true) numCorrectByUser++;

            if (item.isCorrect === true) numIsCorrectAnswers++;
        });

        setResult(Math.round((numCorrectByUser * 100) / numIsCorrectAnswers));

        const response = await fetch("http://localhost:8000/api/TestCompetencies/Complete", {
            method: 'POST',
            headers: { 'Accept': '*/*', "Authorization": "Bearer " + props.token, 'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                title,
                user,
                result: Math.round((numCorrectByUser * 100) / numIsCorrectAnswers),
            })
        });

        if(!response.ok)
        {
            console.log('Error');
        }

        setIsNotConfirmed(false);
    }
    
    return (
        <Modal active={props.active} setActive={props.setActive} type='test'>
            {isNotConfirmed ?
            <form onSubmit={submit}>
                <table className="modal_table_tests">
                    <td>
                        <label className="modal_label">Time: {seconds >= 10 ? minutes+':'+seconds : minutes+':0'+seconds}</label>
                        {testData.map(item => (
                            <tr>
                                <label className="modal_label">{item.question}</label>
                                {item.answers.map(answerItem => ( 
                                    <div>
                                        <input type="checkbox" className="modal_label" onChange={(e) => handleChange(e.target.value, e.target.checked)} value={answerItem['answer']}/>
                                        &nbsp;
                                        <label className="modal_label">{answerItem['answer']}</label>
                                    </div>
                                ))}
                                <br/>
                            </tr>
                        ))}
                    </td>
                </table>
                <button className="modal_button" type="submit" name="submit">Confirm</button>
            </form>
            : 
            <form>
                <label className="modal_label">Result: {result}%</label>
                <br/>
                <label className="modal_label">Designations: <label className="modal_label_green">Correct</label> <label className="modal_label_orange">Not selected correctly</label> <label className="modal_label_red">Incorrect</label></label>
                    
                <table className="modal_table_tests">
                    <td>
                        <br/>
                        {testData.map(item => (
                            <tr>
                                <label className="modal_label">{item.question}</label>
                                {item.answers.map(answerItem => ( 
                                    <div>
                                        <label className={(answersState.answers.find(x => x.value === answerItem['answer'] && x.checked === true && 
                                            x.isCorrect === true) != null) ? "modal_label_green" : 
                                            (answersState.answers.find(x => x.value === answerItem['answer'] && x.checked === true && 
                                            x.isCorrect === false) != null ? "modal_label_red" :
                                            (answersState.answers.find(x => x.value === answerItem['answer'] && x.checked === false && 
                                            x.isCorrect === true) != null ? "modal_label_orange" :
                                            "modal_label")) }>{answerItem['answer']}</label>
                                    </div>
                                ))}
                                <br/>
                            </tr>
                        ))}
                    </td>
                </table>
            </form>
            }
        </Modal>
    )
}

export default TestStart;