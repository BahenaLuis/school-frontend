import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { RequestService } from "../app/services/request.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  formRegister: FormGroup;
  registerClick: boolean = false;
  students: any;

  constructor(private modalService: NgbModal, private formBuilder: FormBuilder,
    private request_s: RequestService) {
    this.loadValidations();
    this.getStudents();
  }

  // Falto agregar los mensajes de validacion en el form, es muy importante
  loadValidations(){
    this.formRegister = this.formBuilder.group({
      firstName: ['Luis', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(45)])],
      middleName: ['Alberto', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(45)])],
      lastName: ['Bahena', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(45)])],
      gender: ['Masculino', Validators.compose([Validators.required])],
      email: ['bahena@gmail.com', Validators.compose([Validators.required, Validators.email, Validators.maxLength(100)])],
      emailType: ['Personal', Validators.compose([Validators.required])],
      phone: ['1372242', Validators.compose([Validators.required, Validators.minLength(7), Validators.maxLength(7)])],
      phoneType: ['Personal', Validators.compose([Validators.required])],
      countryCode: ['52', Validators.compose([Validators.required, Validators.pattern('[0-9]*')])],
      areaCode: ['631', Validators.compose([Validators.required, Validators.pattern('[0-9]*')])],
      addressLine: ['Carlos Caturegli 102A', Validators.compose([Validators.required, Validators.maxLength(100)])],
      city: ['Hermosillo', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z ]*')])],
      zipCode: ['83180', Validators.compose([Validators.required, Validators.pattern('[0-9]*')])],
      state: ['Sonora', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z ]*')])]
    });
  }

  getStudents(){
    this.request_s.get('students/get_students').then((result: any)=>{
      if (result.error) {
        console.log("Hubo un error");
      } else {
        this.students = result.data;               
      }
    });
  }

  openModalRegister(content){    
    this.modalService.open(content, { size: 'lg' });
  } 

  removeStudent(student_id: number){
    let data = {
      "student_id": student_id
    }
    this.request_s.post('students/remove_student', data).then((result: any)=>{
      if (result.error) {
        console.log(result.message);
      } else {
        let index = this.students.findIndex(student => student.student_id === student_id);        
        this.students.splice(index, 1);
        console.log("Eliminacion exitosa");
      }
    });
  }

  closeModal(){
    this.modalService.dismissAll();
  }

  registerStudent(){
    this.registerClick = true;
    if (this.formRegister.valid) {
      let data = {
        student_data: {
          first_name: this.formRegister.value.firstName,
          middle_name: this.formRegister.value.middleName,
          last_name: this.formRegister.value.lastName,
          gender: this.formRegister.value.gender
        },
        email_data: {
          email: this.formRegister.value.email,
          email_type: this.formRegister.value.emailType
        },
        phone_data: {
          phone: this.formRegister.value.phone,
          phone_type: this.formRegister.value.phoneType,
          country_code: this.formRegister.value.countryCode,
          area_code: this.formRegister.value.areaCode
        },
        address_data: {
          address_line: this.formRegister.value.addressLine,
          city: this.formRegister.value.city,
          zip_postcode: this.formRegister.value.zipCode,
          state: this.formRegister.value.state
        }
      }      
      this.request_s.post('students/register_student', data).then((result: any)=>{        
        if (result.error) {                               
          console.log(result.message);
        } else {          
          this.getStudents(); // Es innecesario llamar este metodo de nuevo, sin embargo ya no tuve tiempo de hacerlo mejor
          this.modalService.dismissAll();
          console.log("Registro Exitoso");
        }
      });
    }
  }

}
