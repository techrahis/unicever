

export const fileNameShort = (fileName: string | null | undefined) => {
  if (fileName === null || fileName === undefined) return fileName;
  if (fileName.split(".")[0].length > 5) {
    const newFileName =
      fileName.slice(0, 3) +
      ".." +
      fileName.split(".")[0].charAt(fileName.split(".")[0].length-1) +
      "." +
      fileName.split(".")[1];
    return newFileName;
  } else {
    return fileName;
  }
};


export const fileNameShort2_0 = (fileName: string | null ) => {
  if (fileName === null) return fileName;
  if (fileName.split(".")[0].length > 5) {
    const newFileName =
      fileName.slice(0, 3) +
      ".." +
      fileName.split(".")[0].charAt(fileName.split(".")[0].length-1) +
      "." +
      fileName.split(".")[1];
    return newFileName;
  } else {
    return fileName;
  }
};
