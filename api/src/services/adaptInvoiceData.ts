// // src/services/adaptInvoiceData.ts

// import { InvoiceData } from './dataParser';

// type AdaptedInvoiceData = {
//     [index: number]: any;
// } & InvoiceData;

// export function adaptInvoiceData(invoices: InvoiceData[]): AdaptedInvoiceData[] {
//     return invoices.map(invoice => ({ ...invoice, 0: { ...invoice } })) as AdaptedInvoiceData[];
// }

// src/services/adaptInvoiceData.ts

import { InvoiceData } from './dataParser';

type AdaptedInvoiceData = {
  [K in keyof InvoiceData]: InvoiceData[K];
} & { [index: number]: any };  // Adicione um índice numérico para evitar erros de tipo

export function adaptInvoiceData(invoices: InvoiceData[]): AdaptedInvoiceData[] {
  return invoices.map(invoice => ({
    ...invoice,
    0: { ...invoice } // Isso é apenas ilustrativo; ajuste conforme necessário
  })) as AdaptedInvoiceData[];
}
