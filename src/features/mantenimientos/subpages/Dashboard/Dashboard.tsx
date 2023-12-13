import React, { useState, useEffect } from "react";
import style from "./Dashboard.module.css";
import { Chart } from "primereact/chart";

import { MainContentStructure } from "@/components/MainContentStructure/MainContentStructure";
import { ContentBox } from "@/components/ContentBox/ContentBox";
import { SectionStructure } from "@/components/SectionStructure/SectionStructure";

export function Dashboard() {
	const [chartData, setChartData] = useState({});
	const [chartOptions, setChartOptions] = useState({});

	useEffect(() => {
		const data = {
			labels: ["Q1", "Q2", "Q3", "Q4"],
			datasets: [
				{
					label: "Team",
					data: [540, 325, 702, 620],
					backgroundColor: [
						"rgba(255, 159, 64, 0.2)",
						"rgba(75, 192, 192, 0.2)",
						"rgba(54, 162, 235, 0.2)",
						"rgba(153, 102, 255, 0.2)",
					],
					borderColor: [
						"rgb(255, 159, 64)",
						"rgb(75, 192, 192)",
						"rgb(54, 162, 235)",
						"rgb(153, 102, 255)",
					],
					borderWidth: 1,
				},
			],
		};
		const options = {
			scales: {
				y: {
					beginAtZero: true,
				},
			},
		};

		setChartData(data);
		setChartOptions(options);
	}, []);
	return (
		<MainContentStructure titleText="Dashboard">
			<div className={style.dashboard__container}>
				<div className={style.item}>
					<p className={style.item__title}>Número de leads</p>
					<p className={style.item__text}>17</p>
				</div>
				<div className={style.item}>
					<p className={style.item__title}>Leads sin procesar</p>
					<p className={style.item__text}>2</p>
				</div>
				<div className={style.item}>
					<p className={style.item__title}>Citas agendadas</p>
					<p className={style.item__text}>15</p>
				</div>
			</div>
			<br />
			<SectionStructure additionalClassName={style.section__structure__container}>
				<ContentBox>
					<Chart type="bar" data={chartData} options={chartOptions} />
				</ContentBox>
				<ContentBox>
					<Chart type="line" data={chartData} options={chartOptions} />
				</ContentBox>
			</SectionStructure>
			<br />
			<SectionStructure additionalClassName={style.section__structure__container}>
				<ContentBox>
					<Chart type="pie" data={chartData} options={chartOptions} className="w-full md:w-30rem" />
				</ContentBox>
				<ContentBox>
					<Chart type="pie" data={chartData} options={chartOptions} className="w-full md:w-30rem" />
				</ContentBox>
			</SectionStructure>
		</MainContentStructure>
	);
}
