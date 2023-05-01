import { Col, Divider, Row, Space, Typography } from "antd";
import { EmployeeData, EmployeeTestData } from "../../Actions/EmployeeActions";
import ModalWindow from "../../Components/Modal/Modal";
import ModalTitles from "../../Enums/ModalTitles";
import Role from "../../Enums/RoleEnum";

const EmployeeDetails = (props: {
	active: boolean;
	setActive: (active: boolean) => void;
	employee: EmployeeData | undefined;
	userId: string;
	role: string;
	testData: EmployeeTestData[];
}) => {
	const { Text } = Typography;

	return (
		<ModalWindow
			title={ModalTitles.EMPLOYEE_DATA}
			isActive={props.active}
			setActive={props.setActive}
		>
			<Space direction="vertical" style={{ width: 450 }}>
				<Row>
					<Col span={10}>
						<Text>Name (Ru)</Text>
					</Col>
					<Col span={10}>
						<Text>
							{props.employee?.surnameRu} {props.employee?.nameRu}{" "}
							{props.employee?.patronymicRu}
						</Text>
					</Col>
				</Row>
				<Row>
					<Col span={10}>
						<Text>Name (En)</Text>
					</Col>
					<Col span={10}>
						<Text>
							{props.employee?.nameEn} {props.employee?.surnameEn}
						</Text>
					</Col>
				</Row>
				<Row>
					<Col span={10}>
						<Text>Login</Text>
					</Col>
					<Col span={10}>
						<Text>{props.employee?.login}</Text>
					</Col>
				</Row>
				<Row>
					<Col span={10}>
						<Text>Phone</Text>
					</Col>
					<Col span={10}>
						<Text>{props.employee?.phone}</Text>
					</Col>
				</Row>
				<Row>
					<Col span={10}>
						<Text>Status</Text>
					</Col>
					<Col span={10}>
						<Text>{props.employee?.status?.name}</Text>
					</Col>
				</Row>
				<Divider plain>Inner data</Divider>
				<Row>
					<Col span={10}>
						<Text>Email</Text>
					</Col>
					<Col span={10}>
						<Text>{props.employee?.email}</Text>
					</Col>
				</Row>
				<Row>
					<Col span={10}>
						<Text>Department</Text>
					</Col>
					<Col span={10}>
						<Text>{props.employee?.department?.name}</Text>
					</Col>
				</Row>
				<Row>
					<Col span={10}>
						<Text>Position</Text>
					</Col>
					<Col span={10}>
						<Text>{props.employee?.position?.name}</Text>
					</Col>
				</Row>
				{props.employee?.language?.name ? (
					<Row>
						<Col span={10}>
							<Text>Language</Text>
						</Col>
						<Col span={10}>
							<Text>{props.employee?.language?.name}</Text>
						</Col>
					</Row>
				) : (
					""
				)}
				{props.employee?.workPhone ? (
					<Row>
						<Col span={10}>
							<Text>Work Phone</Text>
						</Col>
						<Col span={10}>
							<Text>{props.employee?.workPhone}</Text>
						</Col>
					</Row>
				) : (
					""
				)}
				{props.employee?.id.toString() === props.userId ||
				props.role === Role.LM ||
				props.role === Role.ADMIN ? (
					<>
						<Divider plain>Test data</Divider>
						{props.testData?.map((item) => (
							<Row>
								<Col span={10}>
									<Text>{item.title}</Text>
								</Col>
								<Col span={10}>
									<Text>{item.testResult}%</Text>
								</Col>
								<Col>
									<Text>{item.date}</Text>
								</Col>
							</Row>
						))}
					</>
				) : (
					""
				)}
			</Space>
		</ModalWindow>
	);
};

export default EmployeeDetails;
