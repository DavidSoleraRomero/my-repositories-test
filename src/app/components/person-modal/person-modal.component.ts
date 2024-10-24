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
  genderList: string[] = [
    "Male",
    "Female",
    "Other"
  ];
  mode:'new'|'edit' = 'new';

  @Input() set person(_person: Person) {
    if(_person && _person.id) this.mode = 'edit';
    console.log(_person.group_id)
    this.formGroup.controls['name'].setValue(_person.name);
    this.formGroup.controls['surnames'].setValue(_person.surnames);
    this.formGroup.controls['age'].setValue(_person.age);
    this.formGroup.controls['email'].setValue(_person.email);
    this.formGroup.controls['gender'].setValue(_person.gender);
    this.formGroup.controls['country_code'].setValue(_person.country_code);
    this.formGroup.controls['group_id'].setValue(_person.group_id);
  }

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private groupsService: GroupsService,
  ) { 

    this.formGroup = this.formBuilder.group({
      name:["", [Validators.required, Validators.minLength(2)]],
      surnames:["", [Validators.required, Validators.minLength(2)]],
      age: ["", [Validators.required, Validators.min(0), Validators.max(110)]],
      email: ["", [Validators.required, Validators.email]],
      gender: ["", [Validators.required]],
      country_code: ["", [Validators.required]],
      group_id: ["", [Validators.required]]
    });

    this.groupsService.getAll(1, 100).subscribe({
      next:(groupListResponse) => {
        this.groupList = groupListResponse.data
      },
      error:(error) => {
        console.log(`GroupService Error: ${error}`)
      }
    });

  }

  ngOnInit() {}
  
  onSubmit() {
    if (this.formGroup.valid) {
      if (this.mode == "new") this.modalController.dismiss(this.formGroup.value);
      else this.modalController.dismiss(this.getDirtyValues(this.formGroup))
    } 
    else console.log('Formulario inválido');
  }

  getDirtyValues(formGroup: FormGroup): any {
    const dirtyValues: any = {};
  
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      if (control?.dirty) {
        dirtyValues[key] = control.value;
      }
    });
  
    return dirtyValues;
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

  get country_code() {
    return this.formGroup.get('country_code');
  }

  get group_id() {
    return this.formGroup.get('group_id');
  }

}
