import {onDocumentWritten} from "firebase-functions/v2/firestore";
import * as logger from "firebase-functions/logger";
import {z} from "zod";

// =================================================================
// 1. DEFINICIÓN DE LOS ESQUEMAS CON ZOD (ESTO NO CAMBIA)
// =================================================================

const DataSourceSchema = z.object({
  collection: z.string().min(1, "La colección es obligatoria."),
  limit: z.number().optional(),
  orderBy: z.string().optional(),
  filters: z.array(z.object({
    field: z.string(),
    operator: z.enum(["==", "<", ">", "<=", ">=", "in"]),
    value: z.any(),
  })).optional(),
});

const ActionSchema = z.object({
  type: z.enum(["navigate", "submit-form", "dispatch-event"]),
  payload: z.any(),
});

const BaseViewNodeSchema = z.object({
  viewId: z.string().optional(),
  component: z.string().min(1, "El tipo de componente es obligatorio."),
  config: z.any().optional(),
  dataSource: DataSourceSchema.optional(),
  action: ActionSchema.optional(),
});

type ViewNode = z.infer<typeof BaseViewNodeSchema> & {
  children?: ViewNode[];
};

const ViewNodeSchema: z.ZodType<ViewNode> = BaseViewNodeSchema.extend({
  children: z.lazy(() => ViewNodeSchema.array()).optional(),
});


// =================================================================
// 2. LA CLOUD FUNCTION CON SINTAXIS V2 (CON LA VALIDACIÓN EXTRA)
// =================================================================

export const validateViewSchema = onDocumentWritten(
  {
    document: "view-schemas/{schemaId}",
    region: "europe-west1",
  },
  async (event) => {
    const schemaId = event.params.schemaId;
    const change = event.data;

    // AÑADIMOS ESTA VALIDACIÓN PARA SATISFACER A TYPESCRIPT
    if (!change) {
      logger.warn(`Evento para ${schemaId} no contenía datos. Saliendo.`);
      return;
    }

    if (!change.after.exists) {
      logger.info(
        `Esquema ${schemaId} eliminado. No se valida.`
      );
      return;
    }

    const schemaData = change.after.data();
    logger.info(
      `Validando esquema: ${schemaId}`, {data: schemaData}
    );

    try {
      ViewNodeSchema.parse(schemaData);
      logger.info(`✅ Esquema ${schemaId} válido.`);
    } catch (error) {
      logger.error(
        `❌ Esquema ${schemaId} INVÁLIDO. Borrando escritura.`, error
      );
      await change.after.ref.delete();
    }
  });
