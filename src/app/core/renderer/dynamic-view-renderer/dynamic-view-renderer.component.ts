import { Component, Input, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewSchemaService, ViewSchema } from '../../services/view-schema.service';
import { GenericCardComponent } from '../../../components/generic-card/generic-card.component'; // Importaremos esto luego

@Component({
  selector: 'app-dynamic-view-renderer',
  standalone: true,
  // Aquí le decimos al robot qué piezas de LEGO conoce
  imports: [CommonModule, GenericCardComponent],
  templateUrl: './dynamic-view-renderer.component.html',
  styleUrls: ['./dynamic-view-renderer.component.scss']
})
export class DynamicViewRendererComponent implements OnInit {
  @Input() viewId!: string; // El robot recibe como orden el NOMBRE de la receta a construir

  // Inyectamos a nuestro mayordomo de recetas
  private schemaService = inject(ViewSchemaService);

  // Una "pizarra mágica" donde el robot guarda la receta. Si cambia, se reconstruye solo.
  schema = signal<ViewSchema | null>(null);

  ngOnInit(): void {
    // Al encenderse, el robot pide la receta al mayordomo
    this.schemaService.getViewSchema(this.viewId).subscribe(schema => {
      if (schema) {
        this.schema.set(schema); // Y la apunta en su pizarra mágica
      }
    });
  }
}