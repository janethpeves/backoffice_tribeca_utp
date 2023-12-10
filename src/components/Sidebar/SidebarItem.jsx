import { Link, useLocation } from "react-router-dom";
import { ListItemButton } from "@mui/material";

const SidebarItem = ({ item }) => {
	const location = useLocation();
	const isActive = item.path === location.pathname;

	return item.sidebarProps && item.path ? (
		<ListItemButton
			component={Link}
			to={item.path}
			style={{
				display: "flex",
				justifyContent: "space-between",
				borderRadius: "5px",
			}}
			sx={{
				"&:hover": {
					backgroundColor: "#0e141f",
				},
				backgroundColor: isActive ? "#0e141f" : "unset",
			}}
		>
			<div style={{ paddingLeft: "20px" }}>{item.sidebarProps.displayText}</div>
		</ListItemButton>
	) : null;
};

export default SidebarItem;
