import {CustomTableConfig, MyHeaders, MyOrder, MySearch, MyPagination} from './tableConfig';

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

const ThePagination: MyPagination = {
  itemPerPage: 5,
  itemPerPageOptions: [5, 10, 15, 20]
};

export const TestTable: CustomTableConfig = {
  headers: TheHeaders,
  order : TheOrder,
  search: TheSearch,
  pagination: ThePagination
};
