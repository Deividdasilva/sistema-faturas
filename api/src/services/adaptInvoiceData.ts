import { InvoiceData } from './dataParser';

type AdaptedInvoiceData = {
  [K in keyof InvoiceData]: InvoiceData[K];
} & { [index: number]: any };

export function adaptInvoiceData(invoices: InvoiceData[]): AdaptedInvoiceData[] {
  return invoices.map(invoice => ({
    ...invoice,
    0: { ...invoice }
  })) as AdaptedInvoiceData[];
}
