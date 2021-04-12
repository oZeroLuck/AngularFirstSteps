import {CustomTableConfig, MyHeaders} from './tableConfig';

const TheHeaders: MyHeaders[] = [
  {key: 'name', label: 'Name'},
  {key: 'lastName', label: 'Surname'},
];

export const TestTable: CustomTableConfig = {
  headers: TheHeaders
};
