export const appRoutesMantenimientos = [
	{
		group: true,
		groupName: "Dashboard",
		routes: [
			{
				path: "/dashboard",
				sidebarProps: {
					displayText: "Dashboard",
				},
			},
		],
	},

	{
		group: true,
		groupName: "Usuarios",
		routes: [
			{
				path: "/usuarios",
				sidebarProps: {
					displayText: "Usuarios",
				},
			},
		],
	},

	{
		group: true,
		groupName: "Clientes",
		routes: [
			{
				path: "/seguimiento-clientes",
				sidebarProps: {
					displayText: "Seguimiento de clientes",
				},
			},
			{
				path: "/citas",
				sidebarProps: {
					displayText: "Citas agendadas",
				},
			},{
				path: "/clientes-archivados",
				sidebarProps: {
					displayText: "Clientes archivados",
				},
			},
		],
	},

	{
		group: true,
		groupName: "Inmobiliaria",
		routes: [
			{
				path: "/proyectos",
				sidebarProps: {
					displayText: "Proyectos",
				},
			},
			{
				path: "/departamento",
				sidebarProps: {
					displayText: "Departamentos",
				},
			},
			{
				path: "/promociones",
				sidebarProps: {
					displayText: "Ofertas",
				},
			},
		],
	},
];
