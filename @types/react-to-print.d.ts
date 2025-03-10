declare module 'react-to-print' {
    import { ComponentType } from 'react';
  
    export interface UseReactToPrintOptions {
      content: () => HTMLElement | null;
      onBeforeGetContent?: () => Promise<void> | void;
      onAfterPrint?: () => void;
      onBeforePrint?: () => void;
      removeAfterPrint?: boolean;
    }
  
    export function useReactToPrint(options: UseReactToPrintOptions): () => void;
  }