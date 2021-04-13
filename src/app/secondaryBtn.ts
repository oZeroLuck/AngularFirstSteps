import { MyButtonConfig } from './button-config';

export const SecondaryButton: MyButtonConfig = {
  customCssClass: 'btn btn-secondary',
  text: 'Secondary Button',
  icon: 'edit',
  btnAction(stringa: string): void {
    this.text = stringa.toUpperCase();
  }
};
