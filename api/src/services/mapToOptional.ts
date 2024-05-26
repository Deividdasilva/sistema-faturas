// // src/services/mapToOptional.ts
// import { InvoiceData } from './dataParser';

// type OptionalInvoice = {
//     [K in keyof InvoiceData]: InvoiceData[K];
// } & { [sym: symbol]: any };  // Esta linha é apenas um exemplo, ajuste conforme necessário.

// export function mapToOptional(invoices: InvoiceData[]): OptionalInvoice[] {
//     return invoices.map(invoice => {
//         const symbolKey: unique symbol = Symbol('index');
//         return { ...invoice, [symbolKey]: {} }; // Adaptado para incluir um símbolo como chave
//     }) as OptionalInvoice[];
// }

import { Optional } from 'sequelize';
import { InvoiceData } from './dataParser';

export function mapToOptional(invoicesData: InvoiceData[]): Optional<InvoiceData, any>[] {
  return invoicesData.map(invoice => ({
    clientNumber: invoice.clientNumber,
    referenceMonth: invoice.referenceMonth,
    electricEnergyKWh: invoice.electricEnergyKWh,
    electricEnergyValue: invoice.electricEnergyValue,
    screeEnergyKWh: invoice.screeEnergyKWh,
    screeEnergyValue: invoice.screeEnergyValue,
    compensatedEnergyKWh: invoice.compensatedEnergyKWh,
    compensatedEnergyValue: invoice.compensatedEnergyValue,
    municipalPublicLightingContribution: invoice.municipalPublicLightingContribution,
  }));
}
