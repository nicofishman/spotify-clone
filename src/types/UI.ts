export type DropdownItem = {
	disabled?: boolean;
} & (
	| {
			name: string;
			onClick?: () => void;
	  }
	| {
			separator: true;
	  }
	| {
			name: string;
			sub: true;
			content: React.ReactNode;
	  }
);
