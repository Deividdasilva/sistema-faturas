export interface InvoiceData {
    clientNumber: number;
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
    const lines = text.split('\n');
    let currentInvoice: Partial<InvoiceData> = {};
    let collectNextElectric = false;
    let collectNextScree = false;
    let collectNextCompensated = false;

    lines.forEach((line, index) => {
        if (line.includes('Nº DO CLIENTE')) {
            currentInvoice.clientNumber = parseInt(line.split(' ').pop() || '0', 10);
        }
        if (line.includes('Referente a')) {
            currentInvoice.referenceMonth = line.split(' ').pop() || '';
        }
        if (line.includes('Energia Elétrica kWh')) {
            const parts = line.split(' ');
            const kWhIndex = parts.findIndex(part => part.includes('kWh'));
            currentInvoice.electricEnergyKWh = parseFloat(parts[kWhIndex + 1]);
            collectNextElectric = true;
        } else if (collectNextElectric && lines[index + 1]) {
            currentInvoice.electricEnergyValue = parseFloat(lines[index + 1].split(' ')[0]);
            collectNextElectric = false;
        }
        if (line.includes('Energia SCEE ISENTA kWh') || line.includes('Energia SCEE s/ ICMS kWh')) {
            const parts = line.split(' ');
            const kWhIndex = parts.findIndex(part => part.includes('kWh'));
            currentInvoice.screeEnergyKWh = parseFloat(parts[kWhIndex + 1]);
            collectNextScree = true;
        } else if (collectNextScree && lines[index + 1]) {
            currentInvoice.screeEnergyValue = parseFloat(lines[index + 1].split(' ')[0]);
            collectNextScree = false;
        }
        if (line.includes('Energia compensada GD I kWh')) {
            const parts = line.split(' ');
            const kWhIndex = parts.findIndex(part => part.includes('kWh'));
            currentInvoice.compensatedEnergyKWh = parseFloat(parts[kWhIndex + 1]);
            collectNextCompensated = true;
        } else if (collectNextCompensated) {
            currentInvoice.compensatedEnergyValue = parseFloat(line.split(' ')[1]);
            collectNextCompensated = false;
        }
        if (line.includes('Contrib Ilum Publica Municipal')) {
            const contribution = parseFloat(line.split(' ')[5]);
            currentInvoice.municipalPublicLightingContribution = contribution;
        }
        if ((line.includes('TOTAL') || index === lines.length - 1) && currentInvoice.clientNumber) {
            invoices.push(currentInvoice as InvoiceData);
            currentInvoice = {};
        }
    });

    return invoices;
}







