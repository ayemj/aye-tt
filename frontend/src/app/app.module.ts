import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Component } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShowOnDirtyErrorStateMatcher, ErrorStateMatcher, MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule } from '@angular/material';
import { AppComponent } from './app.component';
import { MasterComponent } from './master/master.component';
import { TimeTableComponent } from './time-table/time-table.component';
import { ClassSubjectDetailsComponent } from './master/class-subject-details/class-subject-details.component';
import { TeacherDetailsComponent } from './master/teacher-details/teacher-details.component';
import { LeavesDetailsComponent } from './master/leaves-details/leaves-details.component';
import { LoginComponent } from './login/login.component';
import { AddEditDetailsComponent } from './master/class-subject-details/add-edit-details/add-edit-details.component';
import { ViewDetailsComponent } from './master/class-subject-details/view-details/view-details.component';
import { StudentTimeTableComponent } from './time-table/student-time-table/student-time-table.component';
import { TeacherTimeTableComponent } from './time-table/teacher-time-table/teacher-time-table.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { AdjustmentComponent } from './adjustment/adjustment.component';
import { AddAdjustmentsComponent } from './adjustment/add-adjustments/add-adjustments.component';
import { ViewResultComponent } from './adjustment/view-result/view-result.component';
import { SearchPipe } from './searchPipe';
import { HomeComponent } from './home/home.component';
import { UploadFilesComponent } from './upload-files/upload-files.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'uploadFiles', component: UploadFilesComponent },
  { path: 'adjustments', component: AdjustmentComponent },
  { path: 'adjustments/viewAdjustments', component: ViewResultComponent }
 ];

@NgModule({
  declarations: [
    AppComponent,
    MasterComponent,
    TimeTableComponent,
    ClassSubjectDetailsComponent,
    TeacherDetailsComponent,
    LeavesDetailsComponent,
      LoginComponent,
     AddEditDetailsComponent,
     ViewDetailsComponent,
     StudentTimeTableComponent,
     TeacherTimeTableComponent,
     DashboardComponent,
     AdjustmentComponent,
     AddAdjustmentsComponent,
     ViewResultComponent,
     SearchPipe,
     HomeComponent,
     UploadFilesComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    NgbModule.forRoot(),
    BrowserAnimationsModule,
    MatButtonModule, 
    MatCardModule, 
    MatMenuModule, 
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
    
  ],
  providers: [HttpClientModule,{provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}],
  bootstrap: [AppComponent],
  exports : [SearchPipe]
})


export class AppModule {



 }

