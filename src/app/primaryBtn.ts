import { MyButtonConfig } from './button-config';

export const PrimaryButton: MyButtonConfig = {
  customCssClass: 'btn btn-primary',
  text: 'Primary',
  icon: 'star_outline',
  btnAction(stringa: string): void {
    this.text = stringa;
  }
};
