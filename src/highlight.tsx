import * as React from 'react';

export const HighlightButton = () => {
  return (
    <button id="highlightBtn"></button>
  );
}

//start highlight tool
//selection
  //ended?
  //which direction?
//has children?
  //highlight leaves only

export const startHighlight = ()  => {
  console.log("here")
  let lastSelected: HTMLElement | undefined = undefined;
  let highlightBackground: string = "";
  document.addEventListener("selectionchange", () => {
    document.addEventListener("mouseup", () => {

      const selection: Selection | null = document.getSelection();
      if (selection == null || selection.rangeCount === 0) {
        return;
      }
      
      const range: Range = selection.getRangeAt(0);
      let highlighted = range.extractContents();
      
      const node: Node | null = range.startContainer.parentNode;
      if (node != null) {
        let newNode = document.createElement("div");

        newNode.appendChild(highlighted);
        newNode.setAttribute("display", "inline;");
        node.parentNode?.insertBefore(newNode, node);

        // node.insertBefore(newNode, highlighted);
        //let text = document.getElementById(node.id);
        console.log(node);



      }

      console.log(node);
      if (node) {
        //get starting node to ending node and highlight all children

        if (lastSelected) {
          lastSelected.style.backgroundColor = highlightBackground;
        }
        lastSelected = (node as HTMLElement);
        highlightBackground = (node as HTMLElement).style.backgroundColor = "yellow";
      }
    })
  })
}
    
    
   

// check.children length = 0 --> leaf node
// check selected start --> selected end
// check if each has children, find leaf and highlight leaf
