import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-top-bar',
  templateUrl: './app-top-bar.component.html',
  styleUrls: ['./app-top-bar.component.scss']
})
export class AppTopBarComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

}
