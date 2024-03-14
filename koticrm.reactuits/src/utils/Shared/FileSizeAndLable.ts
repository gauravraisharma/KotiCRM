export const getFileSizeAndLabel = (fileSize: number) => {
    let fileSizeAndLebel = "";
    let fileSizeRe = 0;
    if (fileSize < 1024) {
        fileSizeAndLebel = fileSize + " B";
    } else if (fileSize < 1024 * 1024) {
        fileSizeRe = fileSize / 1024;
        fileSizeAndLebel = Math.floor(fileSizeRe) + " KB";
    } else if (fileSize < 1024 * 1024 * 1024) {
        fileSizeRe = fileSize / (1024 * 1024);
        fileSizeAndLebel = Math.floor(fileSizeRe) + " MB";
    }
    return fileSizeAndLebel
}