import { CustomTableConfig, MyHeaders, MyOrder, MyPagination, MySearch } from './table-config';
import { ReserveBtn } from '../buttons/reserve-btn';

const TheHeaders: MyHeaders[] = [
  {key: 'licencePlate', label: 'Licence Plate'},
  {key: 'brand', label: 'Brand'},
  {key: 'model', label: 'Model'},
  {key: 'registrationYear', label: 'Year of Registration'}
];

const TheOrder: MyOrder = {
  defaultColumn: 'licencePlate',
  orderType: 'ascending'
};

const TheSearch: MySearch = {
  columns: ['licencePlate', 'brand', 'model']
};

const ThePagination: MyPagination = {
  itemPerPage: 3,
  itemPerPageOptions: [3, 6, 9, 12]
};

export const NewResTable: CustomTableConfig = {
  headers: TheHeaders,
  order: TheOrder,
  search: TheSearch,
  pagination: ThePagination,
  actions: [ReserveBtn]
};

