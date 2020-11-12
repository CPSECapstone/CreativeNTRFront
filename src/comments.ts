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
    if (comments.length === 1) {
        return [];
    }

    let text: string;
    let nodeID: string;
    let startOffset: number;
    let endOffset: number;

    let i: number = 1;

    if (comments[0] === "\"") {
        while (comments[i] !== "\"") i++;
        text = comments.substring(1, i);
    }
    else {
        text = "";
    }

    let data: string[] = comments.substring(i + 2).split(",");
    nodeID = data[0];
    startOffset = Number(data[1]);
    endOffset = Number(data[2]);

    while (comments[i] !== "\n") i++;

    console.log(text);
    console.log(nodeID);

    let commentArray: NTRComment[] = [];
    commentArray.push(new NTRComment(text, nodeID, startOffset, endOffset));
    commentArray.concat(interpComments(comments.substring(i)));
    return commentArray;
}


/// Currently reads from text file - change to read from database later
/// May require adjustment for formatting
const getComments = (): Promise<NTRComment[]> => {
    return fetch('testComments.txt')
        .then((response: Response): Promise<string> => {
            return response.text();
        })
        .then((data: string): NTRComment[] => {
            return interpComments(data);
        });
}

export { NTRComment, getComments }