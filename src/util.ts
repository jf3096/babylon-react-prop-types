function extractComment(comment: string) {
    if (!comment) {
        return ``;
    }
    const regex = /([\u4e00-\u9fa5]|\w).*/igm;
    return comment.match(regex).join(`\r\n`).trim();
}

const util = {extractComment};

export default util;