export function convertToMB(bytes) {
  return bytes / 1024 / 1024;
}

export function getTotalSize(files) {
  var size = 0;
  files.forEach((f) => {
    size += f.size;
  });
  return size;
}

export function addNewFiles(files, newFiles) {
  let fileNames = new Set();
  let newFileList = [...files];
  let errors = null;

  files.forEach((f) => {
    fileNames.add(f.name);
  });

  newFiles.forEach((f) => {
    if (fileNames.has(f.name)) {
      errors = "DUPLICATE_FILE_NAME";
    } else {
      newFileList.push(f);
    }
  });

  return { errors, newFileList };
}
