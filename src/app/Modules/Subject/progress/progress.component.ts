import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { MatCardModule, MatCardHeader } from '@angular/material/card';
// import { MatPseudoCheckbox, MatPseudoCheckboxModule } from '@angular/material/core';
import { RouterModule } from '@angular/router';
import { StudentService } from '../../../student.service';


@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [RouterModule ,MatCardModule, MatCardHeader],
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.css'
})
export class ProgressComponent implements OnInit {
  isChecked = true;
  progress: any;
  cid: any;
  lrn: any;
  subname: any;
  admin_name: any;

  constructor(private studentservice: StudentService) {}

  ngOnInit(): void {
    this.subname = localStorage.getItem('sub_name');
    this.admin_name = localStorage.getItem('adminname');
    this.cid = localStorage.getItem('cid');
    this.lrn = localStorage.getItem('LRN');
    this.checkProgress(this.cid, this.lrn);
  }

  checkProgress(cid: any, lrn: any) {
      this.studentservice.checkProgress(cid, lrn).subscribe((result: any) => {
      this.progress = result;
      console.log(result);
    })
  }

  getAssessmentID(aid: any, title: any){
    localStorage.setItem('assessmentID', aid);
    localStorage.setItem('assessmenttitle', title);
  }
}
