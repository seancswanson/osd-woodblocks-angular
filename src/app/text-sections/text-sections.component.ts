import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-text-sections',
  templateUrl: './text-sections.component.html',
  styleUrls: ['./text-sections.component.scss']
})
export class TextSectionsComponent implements OnInit {
  @Input() selectedSection: string = 'about'

  constructor() { }

  ngOnInit(): void {
  }
}
