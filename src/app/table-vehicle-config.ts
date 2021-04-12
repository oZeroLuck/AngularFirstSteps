import {CustomTableConfig, MyHeaders} from './tableConfig';

const TheHeaders: MyHeaders[] = [
  {key: 'plate', label: 'Licence Plate'},
  {key: 'brand', label: 'Brand'},
  {key: 'model', label: 'Model'}
];

export const VehicleTable: CustomTableConfig = {
  headers: TheHeaders
};

