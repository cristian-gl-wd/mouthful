import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';

import { ViewNode } from '../../../core/services/view-schema.service';

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule, TagModule],
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss'],
})
export class RecipeCardComponent {
  @Input() node!: ViewNode;

  get recipe() {
    return this.node.config;
  }
}
