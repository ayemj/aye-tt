import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app';
  showLogin: boolean = true;
  form: FormGroup;
  loading: boolean = false;

  @ViewChild('teacherTT') teacherTT: ElementRef;
  @ViewChild('classTT') classTT: ElementRef;
  constructor(private router: Router, private fb: FormBuilder, private http: HttpClient) {
    //call auth service
    // check if logged in ----> showLogin = false
    //check if not logged in ----> showLogin = true
    this.createForm();

  }

  login() {
    //login here
    //if succesfl ----> showLogin = false
    this.showLogin = false;
    this.router.navigate(['/home']);
  }

  createForm() {
    this.form = this.fb.group({
      classTT: null,
      teacherTT: [null, Validators.required]
    });
  }

  onClassTTFileChange(event) {
    if (event.target.files.length > 0) {
      let file = event.target.files[0];
      this.form.get('classTT').setValue(file);
    }
  }

  onTeacherTTFileChange(event) {
    if (event.target.files.length > 0) {
      let file = event.target.files[0];
      this.form.get('teacherTT').setValue(file);
      console.log(file);
      
    }
  }

  private prepareSave(): any {
    let input = new FormData();
    input.append('teacherCsvData', this.form.get('classTT').value);
    input.append('classCsvData', this.form.get('teacherTT').value);
    return input;
  }

  onSubmit() {
    const formModel = this.prepareSave();
    this.loading = true;
    // this.http.post('apiUrl', formModel)

    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1YTdmMmEwMTgyODA1YjRhMTUyOTY3ODciLCJlbWFpbCI6IlNhYWhiQGdtYWlsLmNvbSIsIm5hbWUiOiJCaHVzaGFuIiwiZXhwIjoxNTIwMDYwMzExLCJpYXQiOjE1MTk0NTU1MTF9.yzONNWBA0QBIBz0PKsbcQ17OncpSc4RN67RJHjNMp44' })
    };
    console.log(formModel);
    formModel.forEach(element => {
      console.log(element);
      
    });
    
    this.http.post('http://localhost:3000/api/uploadTTFiles', formModel, httpOptions)
      .subscribe(
        res => {
          alert('done!');
          this.loading = false;
        },
        err => {
          console.log(err);
          
          console.log("Error occured");
          this.loading = false;
        }
      );

  }
}
