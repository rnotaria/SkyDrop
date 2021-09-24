import JSZip from "jszip";

export const getZipFromResponse = (res) => {
  const filename = res.config.headers.address + ".zip";
  return new File([res.data], filename);
};

export const getFilesFromZip = async (zipFile) => {
  try {
    var jsZip = JSZip();

    const files = [];
    const filenames = [];
    const promises = [];

    const zip = await jsZip.loadAsync(zipFile);
    const loadedZip = Object.keys(zip.files).map((key) => zip.files[key]);

    loadedZip.forEach((f) => {
      filenames.push(f.name);
      promises.push(f.async("uint8array"));
    });

    const resolvedPromises = await Promise.all(promises);

    for (var i = 0; i < filenames.length; i++) {
      const blob = new Blob([resolvedPromises[i]], {
        type: "application/octet-stream",
      });

      files.push(new File([blob], filenames[i]));
    }
    return files;
  } catch (error) {
    throw error;
  }
};
