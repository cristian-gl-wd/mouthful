import { Directive, inject, Input, OnChanges, SimpleChanges, ViewContainerRef } from '@angular/core';
import { COMPONENT_MAP } from './component-map.token';
import { ViewNode } from '../services/view-schema.service';

@Directive({
  selector: '[appDynamicComponent]',
  standalone: true,
})
export class DynamicComponentDirective implements OnChanges {
  private readonly vcr = inject(ViewContainerRef);
  private readonly componentMap = inject(COMPONENT_MAP);

  @Input('appDynamicComponent') node!: ViewNode;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['node'] && this.node) {
      this.vcr.clear();
      const componentType = this.componentMap[this.node.component];

      if (componentType) {
        const componentRef = this.vcr.createComponent(componentType);
        componentRef.instance.node = this.node;
      } else {
        console.warn(`Componente desconocido: ${this.node.component}`);
      }
    }
  }
}