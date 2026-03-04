import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule,HttpClientModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginObj: any = {
    email: '',
    state: ''
  }


  http = inject(HttpClient);
  router = inject(Router);
  onLogin() {
    this.http.post('https://employeemanagementsystembackendapi-e5dygyamb3bpc4c6.canadacentral-01.azurewebsites.net/api/EmployeeMaster/login', this.loginObj).subscribe({
      next: (res: any) => {
        console.log('Login response:', res);
        
        // Check if response has data property, otherwise use the response directly
        const userData = res.data || res;
        
        try {
          localStorage.setItem('employeeLoginUser', JSON.stringify(userData));
          console.log('User data saved to localStorage:', localStorage.getItem('employeeLoginUser'));
        } catch (error) {
          console.error('Failed to save to localStorage:', error);
          alert('Failed to save login data');
          return;
        }
        
        if (userData.role == 'Employee') {
          this.router.navigateByUrl('new-employee/' + userData.employeeId);
        } else {
          this.router.navigateByUrl("dashboard");
        }

      },
      error: (error: any) => { 
        console.error('Login error:', error);
        alert(error.error?.message || 'Failed to login');
      }
    })
  }
}
