import { Component } from '@angular/core';
import { USER } from '../mock-user';

@Component({
  selector: 'app-table-user',
  templateUrl: './table-user.component.html',
  styleUrls: ['./table-user.component.scss'],
})
export class TableUserComponent {
  displayedColumns: string[] = ['position', 'name', 'address', 'age'];
  dataSource = USER;
  constructor() {}

  ngOnInit(): void {}
}
