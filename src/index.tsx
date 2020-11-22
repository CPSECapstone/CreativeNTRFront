import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { setup } from './setup';
import Toolbar from './toolbar';


setup();
ReactDOM.render(
    <div className="column"><Toolbar/></div>,
    document.getElementById('root')   
);

