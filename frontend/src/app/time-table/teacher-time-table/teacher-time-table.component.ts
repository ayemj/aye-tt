import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
@Component({
  selector: 'app-teacher-time-table',
  templateUrl: './teacher-time-table.component.html',
  styleUrls: ['./teacher-time-table.component.css']
})
export class TeacherTimeTableComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  adjustmentModule(){

    this.router.navigate(['/adjustments']);

  }

}
