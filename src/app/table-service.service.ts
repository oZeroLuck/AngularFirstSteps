import { Injectable } from '@angular/core';
import { CustomTableConfig } from './tableConfig';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  getKeys(config: CustomTableConfig): string[] {
    return config.headers.map(h => h.key);
  }

  constructor() { }
}
