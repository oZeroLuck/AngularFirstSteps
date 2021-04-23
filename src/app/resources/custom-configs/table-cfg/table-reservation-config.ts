import { CustomTableConfig, MyHeaders, MyOrder, MyPagination, MySearch } from './table-config';
import { EditBtn } from '../buttons/edit-btn';
import { DeleteBtn } from '../buttons/delete-btn';
import { AddBtn } from '../buttons/add-btn';

const TheHeaders: MyHeaders[] = [
  {key: 'vehicleId', label: 'Vehicles Id'},
  {key: 'startDate', label: 'Start Date'},
  {key: 'endDate', label: 'End Date'},
  {key: 'status', label: 'Status'}
];

const TheOrder: MyOrder = {
  defaultColumn: 'startDate',
  orderType: 'ascending'
};

const TheSearch: MySearch = {
  columns: ['vehicleId', 'startDate', 'endDate']
};

const ThePagination: MyPagination = {
  itemPerPage: 4,
  itemPerPageOptions: [4, 8, 12, 16]
};

export const ReservationTable: CustomTableConfig = {
  headers: TheHeaders,
  order: TheOrder,
  search: TheSearch,
  pagination: ThePagination,
  actions: [EditBtn, DeleteBtn, AddBtn]
};


