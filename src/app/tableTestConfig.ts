import {CustomTableConfig, MyHeaders, MyOrder, MySearch} from './tableConfig';

const TheHeaders: MyHeaders[] = [
  {key: 'name', label: 'Name'},
  {key: 'lastName', label: 'Surname'},
];

const TheOrder: MyOrder = {
  defaultColumn: 'name',
  orderType: 'ascending'
};

const TheSearch: MySearch = {
  columns: ['name', 'lastName']
};

export const TestTable: CustomTableConfig = {
  headers: TheHeaders,
  order : TheOrder,
  search: TheSearch
};
