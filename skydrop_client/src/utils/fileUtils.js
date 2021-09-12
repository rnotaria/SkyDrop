export const getZipFromResponse = (res) => {
  return new File([res.data], res.config.headers.address + ".zip");
};
