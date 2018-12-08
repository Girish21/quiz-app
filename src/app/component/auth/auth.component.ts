import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../service/auth/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  @ViewChild('form') verifyForm: NgForm;

  constructor(private auth: AuthService, private route: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    const entered = this.verifyForm.value.password;

    if (entered === 'Apple') {
      this.auth.logIn();
      this.route.navigate(['/quiz']);
    } else if (entered !== 'test123') {
      window.alert('Wrong PIN');
      this.verifyForm.resetForm();
    }
  }

}
