import { Drawer } from "antd";

const Filter = (props: {
	isActive: boolean;
	setActive: (active: boolean) => void;
	children: any;
}) => {
	const onClose = () => {
		props.setActive(false);
	};

	return (
		<Drawer
			title="Filter"
			closable={false}
			onClose={onClose}
			open={props.isActive}
		>
			{props.children}
		</Drawer>
	);
};

export default Filter;
