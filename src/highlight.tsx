
export const startHighlight = ()  => {
    document.addEventListener("mouseup", () => {

      const selection: Selection | null = document.getSelection();
      if (selection == null || selection.rangeCount === 0) {
        return;
      }
      
      const range: Range = selection.getRangeAt(0);
      let highlighted = range.extractContents();
      
      const node: Node | null = range.startContainer.parentNode;
      if (node != null) {
        let newNode = document.createElement("span");

        newNode.appendChild(highlighted);
        let selectedNode = (newNode as HTMLElement);
        selectedNode.style.backgroundColor = "yellow";
        range.insertNode(newNode);
      }
    })
}
    
    
   

// check.children length = 0 --> leaf node
// check selected start --> selected end
// check if each has children, find leaf and highlight leaf
