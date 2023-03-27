import { useState } from "react";
import Modal from "../../Components/Modal/Modal";
import * as AiIcons from 'react-icons/ai';
import LogicTest from './TestDatas/LogicTest';
import ForeignLanguageTest from './TestDatas/ForeignLanguageTest';
import ProgrammingTest from './TestDatas/ProgrammingTest';

const ApplicantTestData = (props: {active: boolean, applicantId: string, setActive: (active: boolean) => void, testData: {foreignLanguageTests:never[], logicTests: never[], programmingTests: never[]}, token: string | null}) => {
    const [modalAddLogicActive, setModalAddLogicActive] = useState(false);
    const [modalAddProgrammingActive, setModalAddProgrammingActive] = useState(false);
    const [modalAddForeignLangActive, setModalAddForeignLangActive] = useState(false);
    
    const testData = props.testData;
    const id = props.applicantId;

    const addLogicTest = async () => {
        setModalAddLogicActive(true);
        props.setActive(false);
    };

    const addProgrammingTest = async () => {
        setModalAddProgrammingActive(true);
        props.setActive(false);
    };

    const addForeignLangTest = async () => {
        setModalAddForeignLangActive(true);
        props.setActive(false);
    };

    return (
        <>
        <Modal active={props.active} setActive={props.setActive} type=''>
            <label className="modal_label_decoration">Logic</label>
            <button className='modal_button_add' onClick={() => addLogicTest()}><AiIcons.AiOutlinePlusCircle/></button>
            <table>
                <thead>
                    <tr>
                        <th className="modal_data">
                            Result
                        </th>
                        <th className="modal_data">
                            Date
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {testData.logicTests.map(item => ( 
                        <tr>
                            <td className="modal_label">{item['result']}%</td>
                            <td className="modal_label">{JSON.stringify(item['date']).split("T")[0].split('"')[1]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br/>
            <label className="modal_label_decoration">Programming</label>
            <button className='modal_button_add' onClick={() => addProgrammingTest()}><AiIcons.AiOutlinePlusCircle/></button>
            <table>
                <thead>
                    <tr className="modal_table_td">
                        <th className="modal_data">
                            Language
                        </th>
                        <th className="modal_data">
                            Result
                        </th>
                        <th className="modal_data">
                            Date
                        </th>
                    </tr>
                </thead>
                <tbody>
                {testData.programmingTests.map(item => (
                        <tr className="modal_table_td">
                            <td className="modal_label">{item['programmingLanguage']}</td>
                            <td className="modal_label">{item['result']}%</td>
                            <td className="modal_label">{JSON.stringify(item['date']).split("T")[0].split('"')[1]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br/>
            <label className="modal_label_decoration">Foreign Language</label>
            <button className='modal_button_add' onClick={() => addForeignLangTest()}><AiIcons.AiOutlinePlusCircle/></button>
            <table>
                <thead>
                    <tr className="modal_table_td">
                        <th className="modal_data">
                            Language
                        </th>
                        <th className="modal_data">
                            Result
                        </th>
                        <th className="modal_data">
                            Date
                        </th>
                    </tr>
                </thead>
                <tbody>
                {testData.foreignLanguageTests.map(item => (
                        <tr className="modal_table_td">
                            <td className="modal_label">{item['foreignLanguage']}</td>
                            <td className="modal_label">{item['result']}%</td>
                            <td className="modal_label">{JSON.stringify(item['date']).split("T")[0].split('"')[1]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Modal>
        <LogicTest active={modalAddLogicActive} applicantId={id} setActive={setModalAddLogicActive} token={props.token}/>
        <ForeignLanguageTest active={modalAddForeignLangActive} applicantId={id} setActive={setModalAddForeignLangActive} token={props.token}/>
        <ProgrammingTest active={modalAddProgrammingActive} applicantId={id} setActive={setModalAddProgrammingActive} token={props.token}/>
        </>
    )
}

export default ApplicantTestData;