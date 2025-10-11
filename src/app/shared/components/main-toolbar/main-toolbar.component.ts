import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';
import { MenuModule } from 'primeng/menu';
import { MenuItem, PrimeIcons } from 'primeng/api';

@Component({
  selector: 'app-main-toolbar',
  standalone: true,
  imports: [
    CommonModule,
    ToolbarModule,
    AvatarModule,
    ButtonModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    MenuModule,
  ],
  templateUrl: './main-toolbar.component.html',
  styleUrls: ['./main-toolbar.component.scss'],
})
export class MainToolbarComponent {
  private router = inject(Router);

  userMenuItems: MenuItem[] = [
    {
      label: 'Profile',
      icon: PrimeIcons.USER,
    },
    {
      label: 'Configuration',
      icon: PrimeIcons.COG,
    },
    {
      label: 'Log out',
      icon: PrimeIcons.SIGN_OUT,
    },
  ];

  public navigateToAddRecipe(): void {
    this.router.navigate(['/new-recipe']);
  }
}
