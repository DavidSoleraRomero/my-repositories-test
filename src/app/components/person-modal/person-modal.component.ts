import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Person } from 'src/app/core/models/person';

@Component({
  selector: 'app-person-modal',
  templateUrl: './person-modal.component.html',
  styleUrls: ['./person-modal.component.scss'],
})
export class PersonModalComponent  implements OnInit {

  formGroup: FormGroup;
  @Input() person:Person | undefined;

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
  ) { 
    this.formGroup = this.formBuilder.group({
      name:["", [Validators.required, Validators.minLength(2)]],
      surnames:["", [Validators.required, Validators.minLength(2)]],
      age: ["", [Validators.required]]
    });
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


}
