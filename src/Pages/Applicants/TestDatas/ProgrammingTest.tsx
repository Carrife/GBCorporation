import { Button, Col, DatePicker, Form, InputNumber, Row, Select, theme } from "antd";
import { useEffect, useState } from "react";
import { CreateProgrammingLanguageTest, GetProgrammingLanguages, Language } from "../../../Actions/ApplicantActions";
import ModalWindow from "../../../Components/Modal/Modal";
import ModalTitles from "../../../Enums/ModalTitles";

const ProgrammingTest = (props: {active: boolean, applicantId: string, setActive: (active: boolean) => void, token: string | null}) => {
    const [languages, setLanguages] = useState<Language[]>([]);
    const { token } = theme.useToken();
    const [form] = Form.useForm();

    const formStyle = {
        background: '#ffffff',
        borderRadius: token.borderRadiusLG,
        padding: 10,
      };

    const onFinish = (values: any) => {
        CreateProgrammingLanguageTest(props.token, values, props.setActive, props.applicantId);
    };

    useEffect(() => {
        GetProgrammingLanguages(props.token).then(result => setLanguages(result));
    }, [props.active, props.token]);
    
    return (
        <ModalWindow title={ModalTitles.CREATE_PROGRAMMING_TEST} isActive={props.active} setActive={props.setActive}>
            <Form form={form} name="applicant_create" style={formStyle} onFinish={onFinish}>
                <Row gutter={25}>
                    <Col span={25} key={1}>
                        <Form.Item
                            name={`language`}
                            label={`Language`}
                            rules={[{
                                required: true,
                                message: 'Empty field',
                            },]}
                        >
                            <Select>
                                {languages.map(item => 
                                    (<Select.Option value={item.id}>{item.name}</Select.Option>)
                                )}
                            </Select>
                        </Form.Item>
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

export default ProgrammingTest;