class NTRComment {
    text: string;
    nodeID: string;
    startOffset: number;
    endOffset: number;

    constructor(text: string, nodeID: string, startOffset: number, endOffset: number) {
        this.text = text;
        this.nodeID = nodeID;
        this.startOffset = startOffset;
        this.endOffset = endOffset;
    }
}

/// Temporary function for interpreting the demo comments
const interpComments = (comments: string): NTRComment[] => {
    if (comments === "") {
        return [];
    }

    let text: string;
    let nodeID: string;
    let startOffset: number;
    let endOffset: number;

    let i: number = 1;

    if (comments[0] === "\"") {
        while (comments[i] !== "\"") i++;
        text = comments.substring(1, i - 1);
    }
    else {
        text = "";
    }

    let afterComma: number = i + 2;
    i += 2;

    while (comments[i] !== ",") i++;
    nodeID = comments.substring(afterComma, i - 1);

    afterComma = i + 1;
    i++;

    while (comments[i] !== ",") i++;
    startOffset = Number(comments.substring(afterComma, i - 1));

    afterComma = i + 1;
    i++;

    while (comments[i] !== "\n") i++;
    endOffset = Number(comments.substring(afterComma, i - 1));

    return [NTRComment.constructor(text, nodeID, startOffset, endOffset),
        ...(interpComments(comments.substring(i + 1)))];
}


/// Currently reads from text file - change to read from database later
/// May require adjustment for formatting
const getComments = () => {
    fetch('testComments.txt')
        .then((response: Response): Promise<string> => {
            return response.text();
        })
        .then((data: string): NTRComment[] => {
            return interpComments(data);
        });
}

export { getComments }