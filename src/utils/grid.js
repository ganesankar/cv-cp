import isLocalHost from "./isLocalHost";
import { inputAll } from "../constants/Format";
export const setFlter = (type) => {
  switch (type) {
    case "number":
      return "agNumberColumnFilter";
    case "date":
      return "agDateColumnFilter";
    case "email":
      return "agTextColumnFilter";
    case "textarea":
      return "agLargeTextCellEditor";
    default:
      return "agTextColumnFilter";
  }
};

export const setEditor = (type) => {
  switch (type) {
    case "number":
      return "agNumberColumnFilter";
    case "date":
      return "agDateColumnFilter";
    case "select":
      return "agRichSelectCellEditor";
    case "textarea":
      return "agLargeTextCellEditor";
    default:
      return "";
  }
};
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
export const getFieldClass = (type) => {
  switch (type) {
    case "textarea":
      return "com-sm-12";
    default:
      return "com-sm-6";
  }
};

export const gridConfigure = (list) => {
  const gridConfig = [
    {
      headerName: "ID",
      field: "id",
      sortable: false,
      filter: false,
      width: 120,
      pinned: "left",
      cellRenderer: "CellLinkRenderer",
    },
  ];
  list.forEach(function (item) {
    item.list.forEach(function (i) {
      let col = {
        headerName: i.name,
        field: `${item.tab}_${i.field}`,
        sortable: true,
        filter: setFlter(i.type),
      };
      const listArr = ["fName", "title", "Name"];
      if (item.tab === "basic" && listArr.includes(i.field)) {
      } else {
      }
      gridConfig.push(col);
    });
  });
  console.log("gridConfig", gridConfig);
  return gridConfig;
};

export const gridStudConfigure = (list) => {
  const gridConfig = [
    {
      headerName: "ID",
      field: "id",
      sortable: false,
      filter: false,
      width: 120,
      pinned: "left",
      rowDrag: true,
    },
  ];
  list.forEach(function (item) {
    item.list.forEach(function (i, j) {
      let col = {
        headerName: i.name,
        field: `basic_${i.field}`,
        sortable: true,
        editable: true,
        filter: setFlter(i.type),
      };

      gridConfig.push(col);
    });
  });
  console.log("gridConfig", gridConfig);
  return gridConfig;
};
export const getGridData = (list, format) => {
  const result = [];
  list.forEach(function (item) {
    let row = {};

    Object.keys(item).forEach(function (i) {
      const backList = format.find((o) => o.tab === i);
      if (Array.isArray(item[i]) && item[i].length > 0) {
        item[i].forEach(function (j) {
          if (backList && backList.list) {
            const f = backList.list.find((o) => o.field === j.field);
            row[`${i}_${j.field}`] = j.val ? setDataFormat(j.val, f.type) : "";
          } else {
            row[`${i}_${j.field}`] = j.val ? setDataFormat(j.val, "text") : "";
          }
        });
      }
      if (i === "id") {
        row.id = item[i];
      }
    });
    result.push(row);
  });
  return result;
};

export const getListData = (list, format) => {
  const result = [];
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

export const downloadExcelFormat = (params) => {
  if (params.value) {
    if (params.column.colDef.filter === "agDateColumnFilter") {
      const replaceDate = new Date(params.value);
    }
  }

  return params.value;
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
