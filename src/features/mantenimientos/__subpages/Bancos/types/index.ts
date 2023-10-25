export interface BankProps {
	id?: string;
	name: string;
	address: string;
	ruc: string;
	phone1: string | undefined;
	phone2: string | undefined;
}

export interface BankDataProps extends Omit<BankProps, "phone1" | "phone2"> {
	phones: [string | undefined, string | undefined];
}
