
import { readFileSync } from 'fs';
import pdf from 'pdf-parse';

const extractDataFromPDF = async (filePath: string): Promise<any> => {
    try {
        const dataBuffer = readFileSync(filePath);
        const data = await pdf(dataBuffer);

        // Melhora a formatação do texto extraído
        const formattedText = formatExtractedText(data.text);

        return { data: formattedText };
    } catch (error) {
        console.error('Error extracting data from PDF:', error);
        throw new Error('Failed to extract data from PDF');
    }
};

const formatExtractedText = (text: string) => {
    // Adicionar espaço antes de "kWh" se estiver colado a palavras ou números
    text = text.replace(/(\d)(kWh)/g, '$1 $2')
               .replace(/(\w)(kWh)/g, '$1 $2');

    // Substituir vírgulas por pontos em números
    text = text.replace(/,/g, '.');

    // Reformatar quebras de linha entre dígitos e pontos para evitar a separação de valores decimais
    text = text.replace(/(\d)\s+(\.\d+)/g, '$1$2')
               .replace(/(\d)\s+(\d+)/g, '$1\n$2');

    // Reformatação em torno de palavras-chave para garantir quebra de linha adequada
    text = text.replace(/(Nº DO CLIENTE)/g, '\n$1')
               .replace(/(Referente a)/g, '\n$1\n')
               .replace(/(Energia Elétrica)/g, ' \n$1')
               .replace(/(Energia SCEE ISENTA)/g, '$1')
               .replace(/(Energia compensada GD I)/g, '$1')
               .replace(/(Contrib Ilum Publica Municipal)/g, '\n$1')
               .replace(/(TOTAL)/g, '\n$1');

    // Limpar espaços extras e formatação
    return text.replace(/\s{2,}/g, ' ').trim();
};

export default extractDataFromPDF;






















































// const formatExtractedText = (text: string): string => {
//     return text.replace(/(\d{2}\/\d{2}\/\d{4})/g, '\n$1\n')  // Adiciona quebras de linha após datas
//                .replace(/(Nº DO CLIENTE)/g, '\n$1\n')        // Adiciona quebra de linha antes do número do cliente
//                .replace(/(Referente a)/g, '\n$1\n')          // Adiciona quebra de linha antes da referência
//                .replace(/(Energia Elétrica)/g, '\n$1\n')     // Adiciona quebra de linha antes da energia elétrica
//                .replace(/(Energia SCEE s\/ ICMS)/g, '\n$1\n')// Adiciona quebra de linha antes da energia SCEE
//                .replace(/(Energia compensada GD I)/g, '\n$1\n')// Adiciona quebra de linha antes da energia compensada
//                .replace(/(Contrib Ilum Publica Municipal)/g, '\n$1\n') // Adiciona quebra de linha antes da contribuição de iluminação pública
//                .replace(/(\d+\s+\d+,\d+)/g, '\n$1\n')        // Adiciona quebra de linha antes e depois de números seguidos por valores decimais
//                .replace(/\s{2,}/g, ' ')                      // Remove espaços em excesso, preservando um espaço entre palavras
//                .trim();                                      // Remove espaços em branco no início e no fim do texto
// };

// import { readFileSync } from 'fs';
// import pdf from 'pdf-parse';

// const extractDataFromPDF = async (filePath: string): Promise<any> => {
//     try {
//         const dataBuffer = readFileSync(filePath);
//         const data = await pdf(dataBuffer);

//         // Melhorar a formatação do texto extraído
//         const formattedText = formatExtractedText(data.text);
//         console.log('Formatted Text:', formattedText);  // Exibe o texto extraído e formatado do PDF no console

//         return { data: formattedText };
//     } catch (error) {
//         console.error('Error extracting data from PDF:', error);
//         throw new Error('Failed to extract data from PDF');
//     }
// };

// // Função para formatar o texto extraído
// const formatExtractedText = (text: string): string => {
//     // Adiciona quebras de linha para facilitar a extração
//     return text.replace(/(\d{2}\/\d{2}\/\d{4})/g, '\n$1\n')  // Adiciona quebras de linha após datas
//                .replace(/(Nº DO CLIENTE)/g, '\n$1')          // Adiciona quebra de linha antes do número do cliente
//                .replace(/(Referente a)/g, '\n$1')            // Adiciona quebra de linha antes da referência
//                .replace(/(Energia Elétrica)/g, '\n$1')       // Adiciona quebra de linha antes da energia elétrica
//                .replace(/(Energia SCEE s\/ ICMS)/g, '\n$1')  // Adiciona quebra de linha antes da energia SCEE
//                .replace(/(Energia compensada GD I)/g, '\n$1')// Adiciona quebra de linha antes da energia compensada
//                .replace(/(Contrib Ilum Publica Municipal)/g, '\n$1') // Adiciona quebra de linha antes da contribuição de iluminação pública
//                .replace(/(\d+)\s+(\d+,\d+)/g, '$1 $2')  // Mantém números e valores juntos
//                .replace(/\s+/g, ' '); // Remove espaços em excesso
// };

// export default extractDataFromPDF;




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

// export default extractDataFromPDF;

