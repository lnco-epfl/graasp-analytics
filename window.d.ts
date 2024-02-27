import type { Database } from './types/database';

declare global {
  interface Window {
    Cypress?: any;
    database?: Database;
  }
}

export {};
