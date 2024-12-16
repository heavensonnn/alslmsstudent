import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { StudentService } from '../student.service';
import Swal from 'sweetalert2';
import { ProfileserviceService } from '../profileservice.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {
  // profilePic: string = 'assets/icon.jpg'; // Default profile picture

  tok:any;
  lrn: any;
  learner: any;
  profilePic: string = 'assets/icon.jpg';
  unreadMessagesCount = 0; // Variable to hold the badge count

  ngOnInit(): void {
      const authToken = localStorage.getItem('authToken');
      this.lrn = localStorage.getItem('LRN');
      const token = localStorage.getItem('authToken'); // Retrieve Token from localStorage

        // Set an interval to periodically call fetchUnreadMessages
      setInterval(() => {
          this.fetchUnreadMessages();
      }, 1000); // Interval time in milliseconds (e.g., 5000ms = 5 seconds)


      // if (token) {
      //   this.studentservice.getLearnerByToken(token).subscribe({
      //     next: (data) => {
      //       this.learner = data;
      //       // Assuming the LRN is a property of the returned data
      //       const lrn = data.lrn; // Adjust this based on the structure of your data
      //       if (lrn) {
      //         localStorage.setItem('LRN', lrn); // Store the actual LRN in localStorage
      //         this.lrn = lrn; // Store the LRN in the component's property
              
      //       } else {
      //         console.error('LRN not found in learner data');
      //       }
      //     },
      //     error: (err) => {
      //       console.error('Error fetching learner data', err);
      //     }
      //   });
      // } else {
      //   console.error('No Token Found. User is not authenticated');
      // }


      this.getLearnerInfo(this.lrn); //Get Learner Info through LRN
      this.tok = authToken;
      console.log(this.profilePic);
      this.profileservice.currentProfilePic.subscribe((newPicUrl) => {
        if(newPicUrl) {
          this.profilePic = newPicUrl || 'assets/icon.jpg';
        }
      })
  }

  constructor(private studentservice: StudentService, private profileservice: ProfileserviceService, private route: Router) {}

  toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
      sidebar.classList.toggle('show');
    }
  }
  logout(token:any) {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "You are now logged out!",
      showConfirmButton: false,
      timer: 1500
    });
    if(token) {
      this.studentservice.logoutLearner(token).subscribe(
        (response:any) => {
          console.log(response);
          localStorage.removeItem('authToken'); //Removing token from localstorage
          localStorage.removeItem('LRN');
          this.route.navigate(['/login']); //Navigate to login
        },
        (error: any) => {
          if(error.status === 401) {
            console.error('Unauthenticated. Please login again');
            this.route.navigate(['/login']) //Redirect to login if unauthenticated
          } else {
            console.error('Error occurred while logging out', error);
          }
        }
      );
    } else {
      console.error('No token found');
    }
  }

  getLearnerInfo(lrn: string): void {
    this.studentservice.getLearner(lrn).subscribe(
      (data: any) => {
        this.learner = data.learner;
        // Check if the learner has a profile picture, else use icon.jpg
        if (data.image) {
          this.profilePic = `http://localhost:8000/assets/profile_pictures/${data.image}`;
        } else {
          this.profilePic = 'assets/icon.jpg'; // Fallback to default icon
        }
      },
      (error) => {
        console.error('Error fetching learner data', error);
      }
    );
  }

    // Fetch unread messages and update count
  fetchUnreadMessages(): void {
    console.log(this.lrn);
    this.studentservice.getUnreadMessages(this.lrn).subscribe((response: any) => {
      this.unreadMessagesCount = response;
      // console.log(this.unreadMessagesCount);
      console.log(response);
      localStorage.setItem('messagecount', response);
    });
  }

  // Clear messages count when button is clicked
  // clearMessages(): void {
  //   this.unreadMessagesCount = 0;
  //   this.studentservice.clearUnreadMessages(this.lrn).subscribe();
  // }

  countclear() {
    this.unreadMessagesCount = 0; 
    this.route.navigate(['/main/Message'])
  }
  
  
}
