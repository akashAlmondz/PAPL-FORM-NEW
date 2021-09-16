import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-invalid',
  templateUrl: './invalid.component.html',
  styleUrls: ['./invalid.component.css']
})
export class InvalidComponent implements OnInit {
  language: string = 'english';

  constructor(private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.router.params.subscribe(route => {
      this.language = route.lang;
    }, err => {
      console.log(err);
    });
  }

}
