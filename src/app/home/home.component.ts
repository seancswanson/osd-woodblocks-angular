import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  selectedSection: string = 'about';
  constructor() { }

  ngOnInit(): void {
  }

  setSection(event: any) {
    console.log(event);
    this.selectedSection = event;
  }
}
