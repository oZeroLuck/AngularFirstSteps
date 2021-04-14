import {CustomTableConfig, MyHeaders, MyOrder, MySearch} from './tableConfig';

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

export const VehicleTable: CustomTableConfig = {
  headers: TheHeaders,
  order: TheOrder,
  search: TheSearch
};

