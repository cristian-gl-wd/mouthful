import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';

import { ViewNode } from '../../core/services/view-schema.service';

@Component({
  selector: 'app-settings-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, MenuModule],
  templateUrl: './settings-layout.component.html',
  styleUrls: ['./settings-layout.component.scss'],
})
export class SettingsLayoutComponent implements OnInit {
  node: ViewNode | null = null;
  menuItems: MenuItem[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.node = this.route.snapshot.data['node'];

    const menuConfig = this.node?.config?.menuItems;
    if (menuConfig && menuConfig.length > 0) {
      this.menuItems = menuConfig.map((item: any) => ({
        label: item.label,
        icon: item.icon,
        routerLink: item.route,
      }));
    }
  }
}
