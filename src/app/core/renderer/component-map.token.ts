import { InjectionToken, Type } from '@angular/core';

export const COMPONENT_MAP = new InjectionToken<Record<string, Type<any>>>('COMPONENT_MAP');