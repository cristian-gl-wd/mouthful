import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

import { TableModule } from 'primeng/table';

import { DataService, DataSourceConfig } from '../../core/services/data.service';

@Component({
  selector: 'app-generic-table',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './generic-table.component.html',
})
export class GenericTableComponent implements OnInit {
  @Input() config: any;
  @Input() dataSource!: DataSourceConfig;

  private dataService = inject(DataService);

  public data$!: Observable<any[]>;

  ngOnInit(): void {
    this.data$ = this.dataService.fetchData(this.dataSource);
  }
}
