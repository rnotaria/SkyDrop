export function convertToMB(bytes) {
  return bytes >> 20;
}

export function getTotalSize(files) {
  var size = 0;
  files.forEach((f) => {
    size += f.size;
  });
  return size;
}

export function filterDupes(files, newFiles) {
  let fileNames = new Set(files.map((f) => f.name));

  newFiles.forEach((file) => {
    if (!fileNames.has(file.name)) {
      fileNames.add(file.name);
      files.push(file);
    }
  });

  return files;
}

export function containsDupes(files, newFiles) {
  let fileNames = new Set(files.map((f) => f.name));
  let dupes = false;

  newFiles.forEach((file) => {
    if (fileNames.has(file.name)) {
      dupes = true;
    }
    fileNames.add(file.name);
  });

  return dupes;
}

export function sanitizeName(name, maxLength = 15) {
  if (name.length - 3 > maxLength) {
    return name.substring(0, maxLength) + "...";
  }
  return name;
}
