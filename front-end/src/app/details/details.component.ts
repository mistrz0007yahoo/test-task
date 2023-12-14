import { Component, Input } from '@angular/core';
import { TableDetails } from './../app.model';
import { DetailsList } from './details.model';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  detailsList: DetailsList = [];
  @Input() set details(value: TableDetails) {
    this.detailsList = Object.entries(value) as DetailsList;
  }
}
