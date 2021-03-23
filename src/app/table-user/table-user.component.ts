import { Component } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-table-user',
  templateUrl: './table-user.component.html',
  styleUrls: ['./table-user.component.scss'],
})
export class TableUserComponent {
  displayedColumns: string[] = ['position', 'name', 'address', 'age'];

  dataSource: any;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.userService.getAll().subscribe((res) => {
      this.dataSource = res;
    });
  }

  changeUser(id: number) {
    this.userService.getDetail(id).subscribe((res) => console.log('res', res));
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe((res) => console.log('res', res));
    location.reload();
  }
}
