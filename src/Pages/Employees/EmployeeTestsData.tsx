import ModalWindow from "../../Components/Modal/Modal";

const EmployeeTestData = (props: {active: boolean, setActive: (active: boolean) => void, testData: never[]}) => {
    const testData = props.testData;
    
    return (
        <ModalWindow title='' isActive={props.active}>
            <table>
                <thead>
                    <tr className="modal_table_td">
                        <th className="modal_data">
                            Title
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
                    {testData ? testData.map(({title, testResult, date}) => (
                        <tr className="modal_table_td">
                            <td className="modal_label">{title}</td>
                            <td className="modal_label">{testResult}%</td>
                            <td className="modal_label">{JSON.stringify(date).split("T")[0].split('"')[1]}</td>
                        </tr>
                    )): ''}
                </tbody>
            </table>
        </ModalWindow>
    )
}

export default EmployeeTestData;