const hasMixedTextHtml = (nodes: ChildNode[]): boolean => {
  let hasTextNode: boolean = false;
  let hasHtmlNode: boolean = false;

  nodes.forEach((node: ChildNode) => {
    if (node instanceof Text) {
      if (node.textContent && node.textContent.replace(/\n/g, "") !== "") {
        hasTextNode = true;
      }
    } else {
      hasHtmlNode = true;
    }
  });
  return hasTextNode && hasHtmlNode;
};

const labelNodes = () => {
  const pageElements: NodeListOf<Element> = document.querySelectorAll("body *");
  pageElements.forEach((element: Element, index: number) => {
    if (element.id === "") {
      element.id = "annotator_elem_" + index;
    }
    /* Some nodes are like this: <div>
     *      <h1>Text here</h1>
     *      more text adjacent to a node
     * </div>
     *
     * Note the mixed text/HTML elements. This makes things harder for us.
     * So we want to wrap all these text elements with a <span> tag with an id
     */
    const children: ChildNode[] = Array.from(element.childNodes);

    if (hasMixedTextHtml(children)) {
      element.innerHTML = "";
      children.forEach((child: ChildNode, index: number) => {
        if (child instanceof Text) {
          if (
            child.textContent &&
            child.textContent.replace(/\n/g, "") !== ""
          ) {
            const span = document.createElement("span");
            span.innerText = child.textContent
              ? child.textContent.replace(/\n/g, "")
              : "";
            span.id = element.id + "_text_" + index;
            element.appendChild(span);
          }
        } else {
          element.appendChild(child);
        }
      });
    }
  });
};

const setup = () =>
  (window.onload = () => {
    labelNodes();
  });

export { setup };
