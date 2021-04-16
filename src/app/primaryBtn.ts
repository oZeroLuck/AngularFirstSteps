import { MyButtonConfig } from './button-config';

export const PrimaryButton: MyButtonConfig = {
  customCssClass: 'btn btn-primary',
  text: 'Primary',
  icon: 'star_outline',
  btnClick(input: any): any {
    const result = [];
    result.push(input);
    result.push('Primary');
    return result;
  }
};
