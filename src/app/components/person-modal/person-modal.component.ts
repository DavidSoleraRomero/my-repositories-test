import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Group } from 'src/app/core/models/group';
import { Person } from 'src/app/core/models/person';
import { GroupsService } from 'src/app/core/services/implementations/groups.service';

@Component({
  selector: 'app-person-modal',
  templateUrl: './person-modal.component.html',
  styleUrls: ['./person-modal.component.scss'],
})
export class PersonModalComponent  implements OnInit {

  formGroup: FormGroup;
  groupList: Group[] = [];
  @Input() person:Person | undefined;

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private groupsService: GroupsService,
  ) { 

    this.formGroup = this.formBuilder.group({
      name:["", [Validators.required, Validators.minLength(2)]],
      surnames:["", [Validators.required, Validators.minLength(2)]],
      age: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      gender: ["", [Validators.required]],
      countryCode: ["", [Validators.required]],
      groupId: ["", [Validators.required]]
    });

    groupsService.getAll(1, 20).subscribe({
      next:(groupListResponse) => {
        this.groupList = groupListResponse.data
      },
      error:(error) => {
        console.log(`GroupService Error: ${error}`)
      }
    })

  }

  ngOnInit() {}
  
  onSubmit() {
    if (this.formGroup.valid) {
      console.log('Formulario enviado:', this.formGroup.value);
      this.modalController.dismiss(this.formGroup.value);
    } else {
      console.log('Formulario inválido');
    }
  }

  get name() {
    return this.formGroup.get('name');
  }

  get surnames() {
    return this.formGroup.get('surnames');
  }

  get age() {
    return this.formGroup.get('age');
  }
  
  get email() {
    return this.formGroup.get('email');
  }

  get gender() {
    return this.formGroup.get('gender');
  }

  get countryCode() {
    return this.formGroup.get('countryCode');
  }

  get groupId() {
    return this.formGroup.get('groupId');
  }

}
