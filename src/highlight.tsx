const handleHighlight = () => {
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
    let selectedNode = newNode as HTMLElement;
    selectedNode.style.backgroundColor = "yellow";
    range.insertNode(newNode);
  }
};

export const startHighlight = () => {
  document.addEventListener("mouseup", handleHighlight);
};

export const endHighlight = () => {
  document.removeEventListener("mouseup", handleHighlight);
};
