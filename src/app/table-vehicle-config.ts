import {CustomTableConfig, MyHeaders, MyOrder, MyPagination, MySearch} from './tableConfig';
import {PrimaryButton} from './primaryBtn';
import {SecondaryButton} from './secondaryBtn';

const TheHeaders: MyHeaders[] = [
  {key: 'plate', label: 'Licence Plate'},
  {key: 'brand', label: 'Brand'},
  {key: 'model', label: 'Model'}
];

const TheOrder: MyOrder = {
  defaultColumn: 'plate',
  orderType: 'ascending'
};

const TheSearch: MySearch = {
  columns: ['plate', 'brand', 'model']
};

const ThePagination: MyPagination = {
  itemPerPage: 3,
  itemPerPageOptions: [3, 6, 9, 12]
};

export const VehicleTable: CustomTableConfig = {
  headers: TheHeaders,
  order: TheOrder,
  search: TheSearch,
  pagination: ThePagination,
  actions: [PrimaryButton, SecondaryButton]
};

