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

export function addNewFiles(files, newFiles, setError) {
  let fileNames = new Set();

  files.forEach((f) => {
    fileNames.add(f.name);
  });

  newFiles.forEach((f) => {
    if (fileNames.has(f.name)) {
      setError({
        type: "DuplicateFileName",
        message: "File names must be unique!",
        severity: "error",
      });
    } else {
      files.push(f);
    }
  });

  return files;
}
