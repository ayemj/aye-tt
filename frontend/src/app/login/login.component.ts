import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, ReactiveFormsModule  } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  model = {
    left: true,
    middle: false,
    right: false
  };
  constructor(private router:Router) { }

  ngOnInit() {

    this.loginForm = new FormGroup({

      userName: new FormControl(),
      password: new FormControl()

    });

  }

  loginSubmit() {

    this.router.navigate(['/home']);

  }

}
