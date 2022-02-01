import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  @Input() selectedSection: string = 'about';

  @Output() sectionSet = new EventEmitter();

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  emitSectionSelection(sectionTitle: string) {
    this.sectionSet.emit(sectionTitle);
  }

  navigateToViewer() {
    this.router.navigateByUrl('/viewer');
  }
}
