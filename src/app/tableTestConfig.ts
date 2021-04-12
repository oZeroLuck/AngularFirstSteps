import {CustomTableConfig, MyHeaders} from './tableConfig';

const TheHeaders: MyHeaders[] = [
  {key: '1', label: 'Name'},
  {key: '2', label: 'Surname'},
  {key: '3', label: 'Action'}
];

export const TestTable: CustomTableConfig = {
  headers: TheHeaders
};
