import * as logger from 'firebase-functions/logger';
import { onDocumentWritten } from 'firebase-functions/v2/firestore';
import { z } from 'zod';

// =================================================================
// 1. DEFINICIÓN DE LOS ESQUEMAS CON ZOD (ESTO NO CAMBIA)
// =================================================================

const DataSourceSchema = z.object({
  collection: z.string().min(1, 'La colección es obligatoria.'),
  limit: z.number().optional(),
  orderBy: z.string().optional(),
  filters: z
    .array(
      z.object({
        field: z.string(),
        operator: z.enum(['==', '<', '>', '<=', '>=', 'in']),
        value: z.any(),
      })
    )
    .optional(),
});

const ActionSchema = z.object({
  type: z.enum(['navigate', 'submit-form', 'dispatch-event']),
  payload: z.any(),
});

const BaseViewNodeSchema = z.object({
  viewId: z.string().optional(),
  component: z.string().min(1, 'El tipo de componente es obligatorio.'),
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
// 2. LA LÓGICA DE VALIDACIÓN (REUTILIZABLE)
// =================================================================

const validateSchemaLogic = async (event: any) => {
  const params = event.params;
  const change = event.data;

  // Obtenemos el ID del documento y la colección del propio evento
  const docId = Object.values(params)[0]; // Funciona sin importar el nombre del parámetro
  const collectionPath = event.document.split('/')[0];

  if (!change) {
    logger.warn(`Evento para ${collectionPath}/${docId} sin datos. Saliendo.`);
    return;
  }

  if (!change.after.exists) {
    logger.info(`Esquema ${collectionPath}/${docId} eliminado. No se valida.`);
    return;
  }

  const schemaData = change.after.data();
  logger.info(`Validando esquema: ${collectionPath}/${docId}`, { data: schemaData });

  try {
    ViewNodeSchema.parse(schemaData);
    logger.info(`✅ Esquema ${collectionPath}/${docId} válido.`);
  } catch (error) {
    logger.error(`❌ Esquema ${collectionPath}/${docId} INVÁLIDO. Borrando.`, error);
    await change.after.ref.delete();
  }
};

// =================================================================
// 3. EXPORTAMOS UN TRIGGER POR CADA COLECCIÓN
// =================================================================

export const validateView = onDocumentWritten('views/{viewId}', validateSchemaLogic);
export const validateLayout = onDocumentWritten('layouts/{layoutId}', validateSchemaLogic);
export const validatePanel = onDocumentWritten('panels/{panelId}', validateSchemaLogic);
