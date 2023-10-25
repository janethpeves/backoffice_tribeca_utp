import React, { ChangeEvent } from "react";
import style from "./CheckBoxField.module.css";

import Checkbox from "@mui/material/Checkbox";

interface CheckBoxFieldProps {
	textLabel: string;
	value: boolean;
	name: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	direction?: "row" | "column";
	reverseDirection?: boolean;
}

export const CheckBoxField = ({
	textLabel,
	value,
	name,
	onChange,
	direction,
	reverseDirection
}: CheckBoxFieldProps) => {
	return (
		<div
			className={`${style.item__group} ${
				direction === "column" ? style.item__column : style.item__row
			} ${reverseDirection ? style.item__reverse : ""}`}
		>
			<label style={{ whiteSpace: "nowrap" }}>{textLabel}</label>

			<Checkbox
				value={value}
				name={name}
				onChange={onChange}
				size="small"
				checked={value}
				style={{ display: "flex", justifyContent: "flex-start", width: "fit-content" }}
			/>
		</div>
	);
};
