import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { HighlightButton } from './highlight';
import { setup } from './setup';
import { startHighlight } from './highlight';

setup();
ReactDOM.render(
    <HighlightButton/>,
    document.getElementById('root')   
);
 checkHighlight();

export function checkHighlight () {
    let highlightBtn = document.getElementById("highlightBtn");
    highlightBtn?.addEventListener("click", (e:Event) => startHighlight());
}

