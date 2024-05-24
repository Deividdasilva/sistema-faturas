// src/services/dataParser.ts

export interface InvoiceData {
    clientId: number;
    referenceMonth: string;
    electricEnergyKWh: number;
    electricEnergyValue: number;
    screeEnergyKWh: number;
    screeEnergyValue: number;
    compensatedEnergyKWh: number;
    compensatedEnergyValue: number;
    municipalPublicLightingContribution: number;
}

export function parseInvoiceData(text: string): InvoiceData[] {
    const invoices: InvoiceData[] = [];
    // Simulação do processo de parseamento; deve ser adaptado ao seu caso de uso específico
    const lines = text.split('\n');
    lines.forEach(line => {
        if (line.includes('Energia Elétrica')) { // Adapte esta condição ao formato do seu PDF
            const data = line.split(/\s+/); // Adapte esta lógica de extração ao formato do seu PDF
            const invoice: InvoiceData = {
                clientId: 1,
                referenceMonth: '2023-12',
                electricEnergyKWh: parseFloat(data[2]),
                electricEnergyValue: parseFloat(data[3]),
                screeEnergyKWh: 0,
                screeEnergyValue: 0,
                compensatedEnergyKWh: 0,
                compensatedEnergyValue: 0,
                municipalPublicLightingContribution: parseFloat(data[4])
            };
            invoices.push(invoice);
        }
    });
    return invoices;
}
