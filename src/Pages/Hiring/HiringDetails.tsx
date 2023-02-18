import { useState } from "react";
import Modal from "../../Components/Modal";
import * as AiIcons from 'react-icons/ai';
import LMDescription from './Details/LMDescription';
import TLDescription from './Details/TLDescription';

const HiringDetails = (props: {active: boolean, applicantId: string, setActive: (active: boolean) => void, hitingData: never[], token: string | null}) => {
    const [modalAddLMDescriptionActive, setModalAddLMDescriptionActive] = useState(false);
    const [modalAddTLDescriptionActive, setModalAddTLDescriptionActive] = useState(false);
    
    const hitingData = props.hitingData;
    const id = props.applicantId;

    const addLMDescription = async () => {
        setModalAddLMDescriptionActive(true);
    };

    const addTLDescription = async () => {
        setModalAddTLDescriptionActive(true);
    };

    return (
        <>
        <Modal active={props.active} setActive={props.setActive} type=''>
            <table>
                <tr className="modal_table_td">
                    <th className="modal_data">
                        Applicant

                    </th>
                </tr>
                <tr>
                    <th className="modal_data">
                        Foreign language
                    </th>
                </tr>
                <tr>
                    <th className="modal_data">
                        Logic
                    </th>
                </tr>
                <tr>
                    <th className="modal_data">
                        Programming
                    </th>
                </tr>
                
                <tr>
                    <th className="modal_data">
                        Interview date
                    </th>
                </tr>
                <tr>
                    <th className="modal_data">
                        Line Manager
                    </th>
                </tr>
                <tr>
                    <th className="modal_data">
                        Description
                    </th>
                </tr>
                <tr>
                    <th className="modal_data">
                        Team Leader
                    </th>
                </tr>
                <tr>
                    <th className="modal_data">
                        Description
                    </th>
                </tr>
                {hitingData.map(item => (
                    <>
                        <tr className="modal_table_td">
                            <td className="modal_label">{item['applicant']['name']}</td>
                        </tr>
                        <tr>
                            <td className="modal_label">{item['logic']}</td>
                        </tr>
                        <tr>
                            <td className="modal_label">{item['programming']}</td>
                        </tr>
                        <tr>
                            <td className="modal_label">{item['foreignLanguage']}</td>
                        </tr>
                        <tr>
                            <td className="modal_label">{JSON.stringify(item['date']).split("T")[0].split('"')[1]}</td>
                        </tr>
                        <tr>
                            <td className="modal_label">{item['LM']}</td>
                        </tr>
                        <tr>
                            <td className="modal_label">{item['LMDescription']} <button className='modal_button_add' onClick={() => addLMDescription()}><AiIcons.AiOutlineEdit/></button></td>
                        </tr>
                        <tr>
                            <td className="modal_label">{item['TL']}</td>
                        </tr>
                        <tr>
                            <td className="modal_label">{item['TLDescription']} <button className='modal_button_add' onClick={() => addTLDescription()}><AiIcons.AiOutlineEdit/></button></td>
                        </tr>
                    </> 
                ))}
            </table>
        </Modal>
        <LMDescription active={modalAddLMDescriptionActive} applicantId={id} setActive={setModalAddLMDescriptionActive} token={props.token}/>
        <TLDescription active={modalAddTLDescriptionActive} applicantId={id} setActive={setModalAddTLDescriptionActive} token={props.token}/>
        </>
    )
}

export default HiringDetails;