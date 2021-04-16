import { MyButtonConfig } from './button-config';

export const WarningButton: MyButtonConfig = {
  customCssClass: 'btn btn-danger',
  text: 'Warning Button',
  icon: 'error_outline',
  btnClick(input: any): any {
    const result = [];
    result.push(input);
    result.push('Warning');
    return result;
  }
};
