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
