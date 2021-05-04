import { CustomTableConfig, MyHeaders, MyOrder, MyPagination, MySearch } from './table-config';
import { ReservationsBtn } from '../buttons/reservations-btn';
import { EditBtn } from '../buttons/edit-btn';
import { DeleteBtn } from '../buttons/delete-btn';
import { AddBtn } from '../buttons/add-btn';

const TheHeaders: MyHeaders[] = [
  {key: 'username', label: 'Username'},
  {key: 'firstName', label: 'Name'},
  {key: 'lastName', label: 'Surname'},
  {key: 'email', label: 'E-mail'},
  {key: 'birthDate', label: 'Date of Birth'}
];

const TheOrder: MyOrder = {
  defaultColumn: 'name',
  orderType: 'ascending'
};

const TheSearch: MySearch = {
  columns: ['firstName', 'lastName', 'username', 'email', 'birthDate']
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
  actions: [ReservationsBtn, EditBtn, DeleteBtn, AddBtn]
};
