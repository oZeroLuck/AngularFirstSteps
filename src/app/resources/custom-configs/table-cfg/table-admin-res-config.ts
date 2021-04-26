import { CustomTableConfig, MyHeaders, MyOrder, MyPagination, MySearch } from './table-config';
import { AcceptBtn } from '../buttons/accept-btn';
import { DenyBtn } from '../buttons/deny-button';

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

export const AdminResTable: CustomTableConfig = {
  headers: TheHeaders,
  order: TheOrder,
  search: TheSearch,
  pagination: ThePagination,
  actions: [AcceptBtn, DenyBtn]
};


