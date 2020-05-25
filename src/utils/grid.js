import isLocalHost from "./isLocalHost";

export const setDataFormat = (value, type) => {
  switch (type) {
    case "number":
      return Number(value);
    case "text":
    case "email":
      return String(value.trim());
    default:
      return value;
  }
};


export const getListData = (list, format) => {
  const result = [];
  console.log(list);
  const listArr = ["basic", "contact", "social"];
  list.forEach(function (item, i) {
    const ob = { data: [], id: item.id };
    const dataFormat = JSON.parse(JSON.stringify(format));
    dataFormat.forEach(function (tab, j) {
      if (tab.list && item[tab.tab]) {
        if (listArr.includes(tab.tab)) {
          tab.list.forEach(function (field, k) {
            field.val = item[tab.tab][k].val
              ? setDataFormat(item[tab.tab][k].val, field.type)
              : "";
          });
        } else {
          tab.list = item[tab.tab];
        }
      }
    });
    ob.data = dataFormat;
    result.push(ob);
  });
  return result;
};

export const getRecordID = (rec) => {
  if (!rec.ref) {
    return null;
  }
  return rec.ref["@ref"].id;
};

export const responseValidator = (response) => {
  if (response.message === "unauthorized") {
    if (isLocalHost()) {
      alert(
        "FaunaDB key is not unauthorized. Make sure you set it in terminal session where you ran `npm start`. Visit http://bit.ly/set-fauna-key for more info"
      );
    } else {
      alert(
        "FaunaDB key is not unauthorized. Verify the key `FAUNADB_SERVER_SECRET` set in Netlify enviroment variables is correct"
      );
    }
    return false;
  }
};
