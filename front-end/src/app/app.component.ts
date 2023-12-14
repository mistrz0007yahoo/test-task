import { AppService } from './app.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { Subject, Subscription } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { DetailsComponent } from './details/details.component';
import { SelectionState, TableDetails } from './app.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    DetailsComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'beaconetest';
  files: string[] = [];
  tables: string[] = [];
  details: TableDetails = {};
  fileSelection$: Subject<MatSelectChange> = new Subject();
  tableSelection$: Subject<MatSelectChange> = new Subject();

  private allSubscriptions: Subscription = new Subscription();
  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.allSubscriptions.add(
      this.appService.getFiles().subscribe((files: any) => {
        this.files = files;
      })
    );

    this.allSubscriptions.add(
      this.fileSelection$
        .pipe(
          switchMap(({ value }: MatSelectChange) => {
            this.tables = [];
            this.details = {};
            return this.appService.getTables(value).pipe(
              map((tables: string[]) => {
                return { tables, selectedFile: value } as SelectionState;
              })
            );
          }),
          switchMap((selectionState: SelectionState) => {
            this.tables = selectionState.tables;
            return this.tableSelection$.pipe(
              switchMap(({ value }: MatSelectChange) => {
                this.details = {};
                return this.appService.getTableDetails(
                  selectionState.selectedFile,
                  value
                );
              })
            );
          })
        )
        .subscribe((details: TableDetails) => {
          this.details = details;
        })
    );
  }

  ngOnDestroy(): void {
    this.allSubscriptions.unsubscribe();
  }
}
