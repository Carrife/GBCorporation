import { Button, Col, DatePicker, Form, InputNumber, Row, theme } from "antd";
import { CreateLogicTest } from "../../../Actions/ApplicantActions";
import ModalWindow from "../../../Components/Modal/Modal";
import ModalTitles from "../../../Enums/ModalTitles";

const LogicTest = (props: {active: boolean, applicantId: string, setActive: (active: boolean) => void, token: string | null}) => {
    const { token } = theme.useToken();
    const [form] = Form.useForm();

    const formStyle = {
        background: '#ffffff',
        borderRadius: token.borderRadiusLG,
        padding: 10,
      };

    const onFinish = (values: any) => {
        CreateLogicTest(props.token, values, props.setActive, props.applicantId);
    };
    
    return (
        <ModalWindow title={ModalTitles.CREATE_LOGIC_TEST} isActive={props.active} setActive={props.setActive}>
            <Form form={form} name="applicant_create" style={formStyle} onFinish={onFinish}>
                <Row gutter={25}>
                    <Col span={25} key={1}>
                        <Form.Item
                            name={`result`}
                            label={`Result`}
                            rules={[{
                                required: true,
                                message: 'Empty field',
                            },]}
                        >
                            <InputNumber placeholder="0" min={1} max={100}/>
                        </Form.Item>
                        <Form.Item
                            name={`date`}
                            label={`Date`}
                            rules={[{
                                required: true,
                                message: 'Empty field',
                            },]}
                        >
                            <DatePicker />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24} style={{ textAlign: 'right' }}>
                        <Button type="primary" htmlType="submit">
                            Create
                        </Button>
                        <Button
                            style={{ margin: '0 8px' }}
                            onClick={() => {
                            form.resetFields();
                            }}
                        >
                            Clear
                        </Button>
                    </Col>
                </Row>
            </Form>
        </ModalWindow>
    )
}

export default LogicTest;