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

// export const getFilesFromZip = async (zipFile) => {
//   const jsZip = JSZip();
//   const zip = await jsZip.loadAsync(zipFile);
//   const filenames = Object.keys(zip.files).map((filename) => {
//     return zip.files[filename].async("uint8array");
//   });
//   console.log(await Promise.all(filenames));
// };

// # # # # #  # # BASE
// jsZip.loadAsync(zipFile).then((zip) => {
//   Object.keys(zip.files).forEach((filename) => {
//     zip.files[filename].async("string").then((fileData) => {
//       console.log(fileData); // These are your file contents
//     });
//   });
// });

// try {
//   const res = await jsZip.loadAsync(zipFile).then((zip) => {
//     Object.keys(zip.files).forEach((filename) => {
//       zip.files[filename].async("string").then((fileData) => {
//         files.push(fileData);
//         console.log(files.length);
//       });
//     });
//   });
//   console.log("I want this to be 3:", files.length);
// } catch (error) {
//   throw error;
// }
// };

// try {
//   const res = await zip.loadAsync(zipFile).then((r) => {
//     console.log(r);
//     const files = Object.keys(r.files).map((key) => r.files[key]);

//     // console.log(files);
//     const file = files[0];
//     console.log(file);
//     // console.log(file.name);
//     // console.log(file._data);

//     // const fileObj = new File([file._data], file.name);

//     // saveAs(fileObj);

//     // console.log(fileObj);
//   });
// } catch (error) {
//   throw error;
// }
