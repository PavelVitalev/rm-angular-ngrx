import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-delete-button',
  templateUrl: './delete-button.component.html',
  styleUrls: ['./delete-button.component.scss']
})
export class DeleteButtonComponent implements OnInit {
  @Input() classes: string;

  constructor() { }

  ngOnInit(): void {
  }

}
