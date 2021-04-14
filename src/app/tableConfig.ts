export class CustomTableConfig {
  headers: MyHeaders[];
  order: MyOrder;
  search: MySearch;
}

export class MyHeaders {
  key: string;
  label: string;
}

export class MyOrder {
  defaultColumn: string;
  orderType: string;
}

export class MySearch {
  columns: string[];
}
