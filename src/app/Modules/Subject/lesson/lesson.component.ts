import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StudentService } from '../../../student.service';

@Component({
  selector: 'app-lesson',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './lesson.component.html',
  styleUrl: './lesson.component.css'
})
export class LessonComponent implements OnInit {

  lessons: any
  moduleID: any
  modulename: any
  admin_name: any
  subname: any

  constructor(private studentservice: StudentService) {}

  ngOnInit(): void {
    this.moduleID = localStorage.getItem('moduleID');
    this.modulename = localStorage.getItem('moduletitle');
    this.admin_name = localStorage.getItem('admin_name');
    this.subname = localStorage.getItem('subname');
    this.getLessons(this.moduleID);
    // this.getModules(this.moduleID);
  }

  getLessons(moduleID: any) {
    this.studentservice.getLessons(moduleID).subscribe((result:any)=> {
    this.lessons = result;
    })
  }

  // getModules(moduleID:any ) {
  //   this.studentservice.getModules(moduleID).subscribe((result: any) => {
  //   this.modulename = result;
  //   })
  // }

}
