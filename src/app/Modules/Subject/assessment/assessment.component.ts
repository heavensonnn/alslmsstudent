import { Component, OnInit } from '@angular/core';
import { MatCardHeader, MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { StudentService } from '../../../student.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-assessment',
  standalone: true,
  imports: [RouterModule ,MatCardModule, MatCardHeader, CommonModule],
  templateUrl: './assessment.component.html',
  styleUrl: './assessment.component.css'
})
export class AssessmentComponent implements OnInit {

  subname: any
  admin_name: any
  lessonid: any;
  assessmentlist: any;
  lrn: any;
  progress: any;
  score: any;
  aid: any;

  constructor(private student: StudentService) {}

  ngOnInit(): void {
    this.subname = localStorage.getItem('subname');
    this.admin_name = localStorage.getItem('admin_name');
    this.lessonid = localStorage.getItem('lessonid');
    this.lrn = localStorage.getItem('LRN');
    this.aid = localStorage.getItem('assessmentID');
    // console.log(this.lessonid);
    // console.log(this.aid);
    // console.log(this.score);
    this.getAssessments(this.lessonid);
    // this.getAssessmentProgress(this.lrn);
    this.getScore(this.aid, this.lrn);

  }
  getAssessments(lid: any){
    this.student.getAssessments(lid, this.lrn).subscribe((result:any)=>{
      const today = new Date();
      this.assessmentlist = result;

      this.assessmentlist.forEach((assessment:any) => {
        const dueDate = new Date(assessment.due_date);
        assessment.isOpen = dueDate >= today ? true : false; //Close if due date has passed
      });
      
      console.log(result);
    })
  }
  getScore(aid: any, lrn: any){
    this.student.getScore(aid, lrn).subscribe((result:any)=>{
      this.score = result;
      console.log(this.score);
    });
  }
  getAssessmentID(aid: any, title: any){
    localStorage.setItem('assessmentID', aid);
    localStorage.setItem('assessmenttitle', title);
  }

  // getAssessmentProgress(lrn: any) {
  //   this.student.getAssessmentProgress(lrn).subscribe((result:any) => {
  //     this.progress = result;
  //     console.log(result);
  //   })
  // }


  

}
