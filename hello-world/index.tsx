import * as React from 'react';
import { render } from 'react-dom';

import { Hello } from './hello';

let div = document.createElement('div');
document.body.appendChild(div);

render(
	<Hello compiler="TypeScript" framework="React" />,
	div
);