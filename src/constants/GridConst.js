export const GridAll = {
  student: [
    {
      headerName: "Name",
      field: "name",
      sortable: true,
      filter: "agTextColumnFilter",
      cellRenderer: "CellLinkRenderer",
      pinned: "left",
    },
    {
      headerName: "SPR No",
      field: "spr",
      width: 110,
      filter: "agNumberColumnFilter",
    },
    {
      headerName: "Nick Name",
      field: "othername",
      filter: "agTextColumnFilter",
    },
    {
      headerName: "Current Location",
      field: "location",
      sortable: true,
      filter: "agTextColumnFilter",
    },
    {
      headerName: "Native ",
      field: "native",
      sortable: true,
      filter: "agTextColumnFilter",
    },
    {
      headerName: "DOB ",
      field: "dob",
      sortable: true,
    },
  ],
};
