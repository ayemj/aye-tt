import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { SearchPipe } from '../searchPipe';
import { HttpClient, HttpHeaders } from '@angular/common/http';
 
@Component({
  selector: 'app-adjustment',
  
  templateUrl: './adjustment.component.html',
  styleUrls: ['./adjustment.component.css']
})
export class AdjustmentComponent implements OnInit {

  public confirmationSummary = true;
  public addAdjustments = false;
  public selectedTeachers : any = [];
  public searchText = '';

  public data : any = [];

  constructor(private router: Router, private http : HttpClient) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1YTdmMmEwMTgyODA1YjRhMTUyOTY3ODciLCJlbWFpbCI6IlNhYWhiQGdtYWlsLmNvbSIsIm5hbWUiOiJCaHVzaGFuIiwiZXhwIjoxNTIwMDYwMzExLCJpYXQiOjE1MTk0NTU1MTF9.yzONNWBA0QBIBz0PKsbcQ17OncpSc4RN67RJHjNMp44' })
    };
    this.http.get('http://localhost:3000/api/getAllTeachers', httpOptions).subscribe(data => {
      this.data = data;
    });
   }

  ngOnInit() {
    
  }

  confirmationSummaryPage() {

    this.confirmationSummary = false;
    this.addAdjustments = true;

  }

  chooseAgain() {

    this.confirmationSummary = true;
    this.addAdjustments = false;

  }

  initiateAdjustments() {

    this.router.navigate(['adjustments','viewAdjustments'])

  }
  
  save(x,e) {

    if (e.target.checked) {
      if (!(this.selectedTeachers.indexOf(x) > -1)) {
        this.selectedTeachers.push(x)
      }
    } else {
      if (this.selectedTeachers.indexOf(x) > -1) {
        this.selectedTeachers.splice(this.selectedTeachers.indexOf(x),1)
      }
    }

  }
}
