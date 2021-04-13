import { MyButtonConfig } from './button-config';

export const WarningButton: MyButtonConfig = {
  customCssClass: 'btn btn-danger',
  text: 'Warning Button',
  icon: 'error_outline',
  btnAction(stringa: string): void {
    this.text = stringa.concat('Warning');
  }
};
