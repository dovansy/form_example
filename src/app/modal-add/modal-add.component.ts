import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../user.service';

@Component({
  selector: 'app-modal-add',
  templateUrl: './modal-add.component.html',
  styleUrls: ['./modal-add.component.scss'],
})
export class ModalAddComponent implements OnInit {
  addForm: any = FormGroup;
  closeResult: any = '';
  constructor(
    private modalService: NgbModal,
    public fb: FormBuilder,
    private userService: UserService
  ) {
    this.createForm();
  }

  createForm() {
    this.addForm = this.fb.group({
      name: this.fb.control('', [
        Validators.required,
        Validators.maxLength(50),
      ]),
      address: this.fb.control('', [Validators.required]),
      age: this.fb.control('', [Validators.required]),
      createdAt: this.fb.control(new Date()),
    });
  }

  ngOnInit(): void {}

  openModal(content: any) {
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

  onSubmit = async () => {
    let value = this.addForm.value;
    this.userService.createUser(value).subscribe((res) => {
      console.log(res);
    });
    location.reload();
    this.createForm();
  };
}
