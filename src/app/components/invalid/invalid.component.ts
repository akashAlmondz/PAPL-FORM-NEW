import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/services/user.service';

import  confetti from 'canvas-confetti';

@Component({
  selector: 'app-invalid',
  templateUrl: './invalid.component.html',
  styleUrls: ['./invalid.component.css']
})
export class InvalidComponent implements OnInit {
  language: string = 'english';
  
 
  constructor(private router: ActivatedRoute,private userService:UserService) { 

  }
  
  value= localStorage.getItem('key');
  value2=JSON.parse(this.value);
  ngOnInit(): void {
    this.router.params.subscribe(route => {
      this.language = route.lang;
    }, err => {
      console.log(err);
    });
    
   // confetti blast
    var end = Date.now() + (70 * 1000);

 // go Buckeyes!
   var colors = ['#bb0000', '#ffffff'];

  (function frame() {
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors
    });
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  }());
  
  }

 

}
