export const assignParentKey = (
  obj: any,
  key1: any,
  key2?: any,
  key3?: any
) => {
  obj[key1] = obj[key1] ?? {};
  if (key2) {
    obj[key1][key2] = obj[key1][key2] ?? {};
  }
  if (key3) {
    obj[key1][key2][key3] = obj[key1][key2][key3] ?? {};
  }
};
// key: general, key1: currenies, key2: sar
export const getArabic = (obj: any, key: any, key1?: any, key2?: any) => {
  if (key1) {
    if (key2) {
      console.log("inside key2", obj[key][key1] ? obj[key][key1][key2] : "");
      return obj[key] ? (obj[key][key1] ? obj[key][key1][key2] : "") : "";
    }
    return obj[key] ? obj[key][key1] : "";
  }
  return obj[key];
};
