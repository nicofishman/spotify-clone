import React from 'react';
import { type FC } from 'react';

import { Icons } from '@/types/Icons';

type IconProps = React.SVGAttributes<SVGElement> & {
	name: keyof typeof Icons;
};

const Icon: FC<IconProps> = ({ name, ...props }) => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const IconComp: React.FunctionComponent<React.SVGAttributes<SVGElement>> =
		Icons[name];

	return <IconComp color={props.color ?? '#fff'} {...props} />;
};

export default Icon;
