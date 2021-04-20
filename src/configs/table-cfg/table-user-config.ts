import {CustomTableConfig, MyHeaders, MyOrder, MyPagination, MySearch} from './table-config';
import {PrimaryButton} from '../buttons/primaryBtn';
import {EditBtn} from '../buttons/edit-btn';
import {DeleteBtn} from '../buttons/delete-btn';

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

export const UserTable: CustomTableConfig = {
  headers: TheHeaders,
  order : TheOrder,
  search: TheSearch,
  pagination: ThePagination,
  actions: [PrimaryButton, EditBtn, DeleteBtn]
};
