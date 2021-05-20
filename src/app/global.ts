import { Injectable } from '@angular/core';
import { IntitiativeRecordClass } from '../shared/models';

@Injectable()
export class Globals {
  //role: string = 'test';
  initiativesList: IntitiativeRecordClass[] = [];
}
