import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { StudentService } from '../student.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { response } from 'express';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { HTTPResponse } from '../httpresponse';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private studentservice: StudentService, private route: Router, private http: HttpClient) {}

  lrn:any;
  learner: any;
  showPassword = false;

  loginLearner = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(8)])
  });

  onSubmit() {
    if (this.loginLearner.valid) {
      this.studentservice.loginLearner(this.loginLearner.value).subscribe({
        next: (response: any ) => {
          const token = response.token;
          if(response.token == null) {
            Swal.fire({
              position: "center",
              icon: "warning",
              title: "Provided Credentials are Incorrect",
              showConfirmButton: false,
              timer: 3000
            });
          } else {            
            console.log('Token:', token);
            localStorage.setItem('authToken', token);
            console.log('Login Successful', response)
            
            this.studentservice.getLearnerByToken(token).subscribe({
                  next: (data) => {
                    this.learner = data;
                    const lrn = data.lrn; // Adjust based on your API response structure
                    if (lrn) {
                      localStorage.setItem('LRN', lrn);
                      this.lrn = lrn;
                      Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "You are now logged in!",
                        showConfirmButton: false,
                        timer: 1000
                      });
                      this.route.navigate(['/main/Home']);
                    }
                  }
            })
          }
        },
        error: (error: any) => {
          if(error === 'Bad Request' && error.response == null) {
            Swal.fire({
              position: "center",
              icon: "warning",
              title: "You are not enrolled yet! (LRN Needed)",
              showConfirmButton: false,
              timer: 3000
            });
          }
        }
      })
    } else {
      Object.keys(this.loginLearner.controls).forEach((control) => {
        this.loginLearner.get(control)?.markAsTouched();
      });
      console.error('Form is not valid');
      return;
    }
  }

  // onSubmit() {
  //   this.loginService(this.loginLearner.value)
  //   .subscribe({
  //     next: (data) => console.log(data.message),
  //     error: (err) => console.log(err)
  //   })
  // }

  loginService(data: any): Observable<HTTPResponse> {
    return this.http.post<HTTPResponse>('http://localhost:8000/api/loginLearner', data)
  }
  

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
