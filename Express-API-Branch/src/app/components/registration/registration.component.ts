import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  constructor(private http: HttpClient) { 
    
  }
  registrationForm = new FormGroup( {
    username: new FormControl(''),
    password: new FormControl(''),
  })

  readonly ROOT_URL = "http://localhost:3000/users/signup"
  
  ngOnInit(): void {
  }

  onSubmit() {
    let data = this.registrationForm.value;
    this.http.post(this.ROOT_URL, data).subscribe( 
      (res) => console.log(res),
      (err) => console.log(err)
    )

  }

}
