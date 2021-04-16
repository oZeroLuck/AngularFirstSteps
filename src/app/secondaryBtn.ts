import { MyButtonConfig } from './button-config';

export const SecondaryButton: MyButtonConfig = {
  customCssClass: 'btn btn-secondary',
  text: 'Secondary Button',
  icon: 'edit',
  btnClick(input: any): any {
    const result = [];
    result.push(input);
    result.push('Primary');
    return result;
  }
};
