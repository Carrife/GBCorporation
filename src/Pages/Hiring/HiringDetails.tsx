import { useEffect, useState } from "react";
import ModalWindow from "../../Components/Modal/Modal";
import * as AiIcons from "react-icons/ai";
import { Reject, GetHiringById } from "../../Actions/HiringActions";
import { Button, Col, Divider, Row, Space, Typography } from "antd";
import ModalTitles from "../../Enums/ModalTitles";
import Role from "../../Enums/RoleEnum";
import Description from "./Details/Description";
import ApplicantHire from "./Details/ApplicantHire";
import { HiringData } from "../../Interfaces/Hirings";
const { Text } = Typography;

const HiringDetails = (props: {
	active: boolean;
	hiringId: string;
	setActive: (active: boolean) => void;
	role: string;
	token: string | null;
	userId: string;
}) => {
	const [modalDescriptionActive, setModalDescriptionActive] = useState(false);
	const [modalApplicantHireActive, setModalApplicantHireActive] =
		useState(false);
	const [description, setDescription] = useState("");
	const [hiringData, setHiringData] = useState<HiringData>();
	const [hiringInterviewerId, setHiringInterviewerId] = useState("");

	useEffect(() => {
		if (props.hiringId) {
			GetHiringById(props.token, props.hiringId).then((result) =>
				setHiringData(result)
			);
		}
	}, [props.token, props.hiringId]);

	const addDescription = async (description: string, id: string) => {
		setDescription(description);
		setHiringInterviewerId(id);
		setModalDescriptionActive(true);
		props.setActive(false);
	};

	const hire = async () => {
		setModalApplicantHireActive(true);
		props.setActive(false);
	};

	const reject = async () => {
		Reject(props.token, props.hiringId, props.setActive);
	};

	const onModalCancel = () => {
		props.setActive(false);
	};

	return (
		<>
			<ModalWindow
				title={ModalTitles.HIRING_DATA}
				isActive={props.active}
				onCancel={onModalCancel}
			>
				<Space direction="vertical" style={{ width: 450 }}>
					<Row>
						<Col span={10}>
							<Text>Applicant</Text>
						</Col>
						<Col span={10}>
							<Text>{hiringData?.applicant?.name}</Text>
						</Col>
					</Row>
					<Row>
						<Col span={10}>
							<Text>Position</Text>
						</Col>
						<Col span={10}>
							<Text>{hiringData?.position}</Text>
						</Col>
					</Row>
					<Row>
						<Col span={10}>
							<Text>Interview date</Text>
						</Col>
						<Col span={10}>
							<Text>{hiringData?.date}</Text>
						</Col>
					</Row>
					<Row>
						<Col span={10}>
							<Text>Status</Text>
						</Col>
						<Col span={10}>
							<Text>{hiringData?.status}</Text>
						</Col>
					</Row>
					<Divider plain>Tests</Divider>
					{hiringData?.foreignLanguageTest && (
						<Row>
							<Col span={10}>
								<Text>Foreign language</Text>
							</Col>
							<Col span={10}>
								<Text>
									{hiringData?.foreignLanguageTest?.name}
								</Text>
							</Col>
						</Row>
					)}
					{hiringData?.logicTest && (
						<Row>
							<Col span={10}>
								<Text>Logic</Text>
							</Col>
							<Col span={10}>
								<Text>{hiringData?.logicTest?.name}</Text>
							</Col>
						</Row>
					)}
					{hiringData?.programmingTest && (
						<Row>
							<Col span={10}>
								<Text>Programming</Text>
							</Col>
							<Col span={10}>
								<Text>{hiringData?.programmingTest?.name}</Text>
							</Col>
						</Row>
					)}
					<Divider plain>Interviewers</Divider>
					{hiringData?.interviewers?.map((item) => (
						<Col key={item.id}>
							<Row>
								<Col span={10}>
									<Text>{item.position?.name}</Text>
								</Col>
								<Col span={10}>
									<Text>{item.interviewer?.name}</Text>
								</Col>
							</Row>
							<Row>
								<Col span={10}>
									<Text>Description</Text>
								</Col>
								<Col span={10}>
									<Text>{item.description}</Text>
								</Col>
								<Col>
									{(props.userId === item.interviewer?.id ||
										props.role === Role.ADMIN) &&
										hiringData?.status !== "Closed" && (
											<Button
												type="text"
												onClick={() =>
													addDescription(
														item.description,
														item.id?.toString()
													)
												}
											>
												<AiIcons.AiOutlineEdit />
											</Button>
										)}
								</Col>
							</Row>
						</Col>
					))}
					{(props.role === Role.HR || props.role === Role.ADMIN) &&
						hiringData?.interviewers?.every(
							(item) => item.description != null
						) &&
						hiringData?.status !== "Closed" && (
							<Row style={{ marginTop: 15 }}>
								<Col span={24} style={{ textAlign: "right" }}>
									<Button
										type="primary"
										onClick={() => hire()}
									>
										Hire
									</Button>
									<Button
										style={{ margin: "0 8px" }}
										onClick={() => reject()}
									>
										Reject
									</Button>
								</Col>
							</Row>
						)}
				</Space>
			</ModalWindow>
			<Description
				active={modalDescriptionActive}
				hiringInterviewerId={hiringInterviewerId}
				setActive={setModalDescriptionActive}
				description={description}
				token={props.token}
			/>
			<ApplicantHire
				active={modalApplicantHireActive}
				hiringId={props.hiringId}
				setActive={setModalApplicantHireActive}
				role={props.role}
				token={props.token}
			/>
		</>
	);
};

export default HiringDetails;
