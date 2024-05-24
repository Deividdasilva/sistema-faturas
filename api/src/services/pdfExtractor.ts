// services/pdfExtractor.ts
import { readFileSync } from 'fs';
import pdf from 'pdf-parse';

const extractDataFromPDF = async (filePath: string): Promise<any> => {
    try {
        const dataBuffer = readFileSync(filePath);
        const data = await pdf(dataBuffer);
        console.log(data.text);  // Exibe o texto extraído do PDF no console

        return { data: data.text };
    } catch (error) {
        console.error('Error extracting data from PDF:', error);
        throw new Error('Failed to extract data from PDF');
    }
};

// Definindo um tipo para os dados das faturas
// interface InvoiceData {
//     clientId?: number;
//     referenceMonth?: string;
//     electricEnergyKWh?: number;
//     electricEnergyValue?: number;
//     screeEnergyKWh?: number;
//     screeEnergyValue?: number;
//     compensatedEnergyKWh?: number;
//     compensatedEnergyValue?: number;
//     municipalPublicLightingContribution?: number;
// }

// const extractDataFromPDF = async (filePath: string): Promise<InvoiceData[]> => {
//     const dataBuffer = readFileSync(filePath);
//     const data = await pdf(dataBuffer);
//     const lines = data.text.split('\n');

//     // Valores padrão para garantir que todos os campos necessários estão presentes
//     let currentInvoice: InvoiceData = {};

//     const invoices: InvoiceData[] = [];

//     lines.forEach(line => {
//         const parts = line.split(/\s+/); // Dividindo a linha em partes por espaços

//         if (line.includes('Cliente ID')) {
//             currentInvoice.clientId = parseInt(parts[1], 10);
//         } else if (line.includes('Mês de Referência')) {
//             currentInvoice.referenceMonth = parts[2];
//         } else if (line.includes('Energia Elétrica')) {
//             currentInvoice.electricEnergyKWh = parseFloat(parts[2]);
//             currentInvoice.electricEnergyValue = parseFloat(parts[3]);
//         } else if (line.includes('Energia SCEE s/ ICMS')) {
//             currentInvoice.screeEnergyKWh = parseFloat(parts[2]);
//             currentInvoice.screeEnergyValue = parseFloat(parts[3]);
//         } else if (line.includes('Energia compensada GD I')) {
//             currentInvoice.compensatedEnergyKWh = parseFloat(parts[2]);
//             currentInvoice.compensatedEnergyValue = parseFloat(parts[3]);
//         } else if (line.includes('Contrib Ilum Publica Municipal')) {
//             currentInvoice.municipalPublicLightingContribution = parseFloat(parts[1]);
//         }

//         // Suponha que uma linha específica indica o fim de um bloco de fatura e o início de um novo
//         if (line.includes('Fim da Fatura')) {
//             invoices.push(currentInvoice);
//             currentInvoice = {}; // Resetar para a próxima fatura
//         }
//     });

//     return invoices;
// };

export default extractDataFromPDF;

