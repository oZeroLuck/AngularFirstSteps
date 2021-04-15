import {CustomTableConfig, MyHeaders, MyOrder, MyPagination, MySearch} from './tableConfig';
import {PrimaryButton} from './primaryBtn';
import {SecondaryButton} from './secondaryBtn';
import {WarningButton} from './warningBtn';

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
  pagination: ThePagination,
  actions: [PrimaryButton, SecondaryButton, WarningButton]
};
