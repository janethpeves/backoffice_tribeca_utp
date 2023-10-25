import { List } from "@mui/material";

import SidebarItem from "./SidebarItem";

import style from "./Sidebar.module.css";

const Sidebar = ({ appRoutes }) => {
	return (
		<>
			{appRoutes && (
				<div className={style.container__drawer}>
					<List disablePadding>
						{appRoutes &&
							appRoutes.map((route, index) =>
								route.sidebarProps ? <SidebarItem item={route} key={index} /> : null
							)}
					</List>
				</div>
			)}
		</>
	);
};

export default Sidebar;

{
	/* <img src={logo} alt='logo' style={{ width: "100%" }} /> */
}
