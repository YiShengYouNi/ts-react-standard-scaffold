// src/mocks/browser.ts
import { setupWorker } from 'msw/browser';

import { todoHandlers } from './todoHandlers';

export const worker = setupWorker(...todoHandlers);
