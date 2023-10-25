import { Link } from "react-router-dom";
import { ListItemButton } from "@mui/material";

import { AiFillCaretRight } from "react-icons/ai";

const SidebarItem = ({ item }) => {
	return item.sidebarProps && item.path ? (
		<ListItemButton
			component={Link}
			to={item.path}
			style={{ display: "flex", justifyContent: "space-between" }}
			sx={{
				"&: hover": {
					backgroundColor: "#0e141f",
				},
				backgroundColor: true === item.state ? "#232c3d" : "unset",
				paddingY: "10px",
				paddingX: "20px",
			}}
		>
			{item.sidebarProps.displayText}

			{item.hasChildren ? <AiFillCaretRight /> : null}
		</ListItemButton>
	) : null;
};

export default SidebarItem;
