import { Component, OnInit } from '@angular/core';
import { MatCardHeader, MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { StudentService } from '../../../student.service';
import { CommonModule, formatDate } from '@angular/common';

@Component({
  selector: 'app-learningmaterials',
  standalone: true,
  imports: [RouterModule, MatCardModule, MatCardHeader, CommonModule],
  templateUrl: './learningmaterials.component.html',
  styleUrl: './learningmaterials.component.css'
})
export class LearningmaterialsComponent implements OnInit {

  cid: any;
  subid: any
  modules: any;
  admin_name: any;
  subname: any;
  modulecount: any;
  lrn: any;
  progress: any;
  pendingassessments: any;
  announcements: any;
  today: string = '';
  // Loaders
  isLoading = false;


  constructor (private studentservice: StudentService, private router: Router) {
    this.today = formatDate(new Date(), 'yyyy-MM-dd', 'en');
  }

  ngOnInit(): void {
      this.subid = localStorage.getItem('subjectid');
      this.cid = localStorage.getItem('cid');
      this.admin_name = localStorage.getItem('adminname');
      this.lrn = localStorage.getItem('LRN');
      this.subname = localStorage.getItem('sub_name');
      console.log(this.cid);
      console.log(this.subid);
      // this.getModules(this.cid);
      // this.pendingassessments(this.lrn);
      this.modulecount = 1;
      this.spinner(this.cid);
  }

  getModules(classid:any) {
    this.studentservice.getModules(classid).subscribe((result: any) => {
      this.modules = result;
      console.log(this.modules);
    })
  }


  getLessons(mid: any, title: any, description: any) {
    localStorage.setItem('moduleID', mid);
    localStorage.setItem('moduletitle', title);
    localStorage.setItem('modesc', description);
  }

  checkProgress() {
    // this.studentservice.checkProgress(this.cid, this.lrn).subscribe((result: any) => {
    //   this.progress = result;
    //   console.log(result);
    // })
    this.router.navigate(['/main/Subject/subjectmain/modules/progress'])
  }

  // getPendingAssessments(lrn: any) {
  //   this.studentservice.getPendingAssessments(lrn).subscribe((result: any) => {
  //     this.pendingassessments = result;
  //     console.log(result);
  //   })
  // }



  getAnnouncements(cid: any) {
    this.studentservice.getAnnouncements(cid).subscribe((result: any) => {
      this.announcements = result;
      console.log(cid);
      console.log(result);
    })
  }

  spinner(cid: any) {
    this.isLoading = true;
    this.getModules(cid);
    setTimeout(() => {
      this.isLoading = false;
    }, 1500);
  }

  isModuleOpen(moduleDate:any): boolean {
    const moduleDateParsed = new Date(moduleDate)
    const todayParse = new Date(this.today);

    return moduleDateParsed <= todayParse;
  }
}
