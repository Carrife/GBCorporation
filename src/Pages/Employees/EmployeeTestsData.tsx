import Modal from "../../Components/Modal";

const EmployeeTestData = (props: {active: boolean, setActive: (active: boolean) => void, testData: never[]}) => {
    const testData = props.testData;
    
    return (
        <Modal active={props.active} setActive={props.setActive} type=''>
            <table>
                <thead>
                    <tr className="modal_table_td">
                        <th className="modal_label">
                            Title
                        </th>
                        <th className="modal_label">
                            Result
                        </th>
                        <th className="modal_label">
                            Date
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {testData.map(({title, testResult, date}) => (
                        <tr className="modal_table_td">
                            <td className="modal_label">{title}</td>
                            <td className="modal_label">{testResult}%</td>
                            <td className="modal_label">{JSON.stringify(date).split("T")[0].split('"')[1]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Modal>
    )
}

export default EmployeeTestData;