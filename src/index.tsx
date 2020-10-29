import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { HelloComponent } from './hello';
import { setup } from './setup';
import { getComments } from './comments';

setup();
getComments();
ReactDOM.render(
    <HelloComponent/>,
    document.getElementById('root')
);

