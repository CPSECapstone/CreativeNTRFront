import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { setup } from './setup';
import { startHighlight } from './highlight';
import Toolbar from './toolbar';


setup();
ReactDOM.render(
    <div className="column">
    <Toolbar/>
    </div>,
    document.getElementById('root')   
);
 checkHighlight();

export function checkHighlight () {
    let highlightBtn = document.getElementById("highlightBtn");
    highlightBtn?.addEventListener("click", (e:Event) => startHighlight());
}

