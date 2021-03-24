import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../user.service';

@Component({
  selector: 'app-table-user',
  templateUrl: './table-user.component.html',
  styleUrls: ['./table-user.component.scss'],
})
export class TableUserComponent {
  displayedColumns: string[] = ['position', 'name', 'address', 'age'];
  dataSource: any;
  addForm: any = FormGroup;
  closeResult: any = '';
  name: string = '';
  address: string = '';
  age: any;
  id: any;
  loading: boolean = false;

  constructor(
    private userService: UserService,
    private modalService: NgbModal,
    public fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.loading = true;
    this.userService.getAll().subscribe((res) => {
      this.dataSource = res;
      this.loading = false;
    });
  }

  changeUser(id: number) {
    this.userService.getDetail(id).subscribe((res) => console.log('res', res));
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe((res) => {
      console.log('res', res);
      location.reload();
    });
  }

  //this is modal init
  openModal(content: any, item: any) {
    this.addForm = this.fb.group({
      name: this.fb.control(item.name, [
        Validators.required,
        Validators.maxLength(50),
      ]),
      address: this.fb.control(item.address, [Validators.required]),
      age: this.fb.control(item.age, [Validators.required]),
      createdAt: this.fb.control(new Date()),
    });
    this.id = item.id;
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onSubmit() {
    this.loading = true;
    let value = this.addForm.value;

    this.userService.updateUser(this.id, value).subscribe((res) => {
      console.log(res);
      location.reload();
      this.loading = false;
    });
  }
}
