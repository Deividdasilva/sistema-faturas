// src/services/dataParser.ts

// export interface InvoiceData {
//     clientNumber: number;
//     referenceMonth: string;
//     electricEnergyKWh: number;
//     electricEnergyValue: number;
//     screeEnergyKWh: number;
//     screeEnergyValue: number;
//     compensatedEnergyKWh: number;
//     compensatedEnergyValue: number;
//     municipalPublicLightingContribution: number;
// }

// export function parseInvoiceData(text: string): InvoiceData[] {
//     const invoices: InvoiceData[] = [];
//     // Simulação do processo de parseamento; deve ser adaptado ao seu caso de uso específico
//     const lines = text.split('\n');
//     lines.forEach(line => {
//         if (line.includes('Energia Elétrica')) { // Adapte esta condição ao formato do seu PDF
//             const data = line.split(/\s+/); // Adapte esta lógica de extração ao formato do seu PDF
//             const invoice: InvoiceData = {
//                 clientNumber: 1,
//                 referenceMonth: '2023-12',
//                 electricEnergyKWh: parseFloat(data[2]),
//                 electricEnergyValue: parseFloat(data[3]),
//                 screeEnergyKWh: 0,
//                 screeEnergyValue: 0,
//                 compensatedEnergyKWh: 0,
//                 compensatedEnergyValue: 0,
//                 municipalPublicLightingContribution: parseFloat(data[4])
//             };
//             invoices.push(invoice);
//         }
//     });
//     return invoices;
// }

// export interface InvoiceData {
//   clientNumber: number;
//   referenceMonth: string;
//   electricEnergyKWh: number;
//   electricEnergyValue: number;
//   screeEnergyKWh: number;
//   screeEnergyValue: number;
//   compensatedEnergyKWh: number;
//   compensatedEnergyValue: number;
//   municipalPublicLightingContribution: number;
// }

// export function parseInvoiceData(text: string): InvoiceData[] {
//   const invoices: InvoiceData[] = [];
//   const lines = text.split('\n');

//   let currentInvoice: Partial<InvoiceData> = {};
//   lines.forEach(line => {
//       if (line.includes('Nº DO CLIENTE')) {
//           const clientNumber = parseInt(line.split(' ').pop() || '0', 10);
//           currentInvoice.clientNumber = clientNumber;
//           console.log(`clientNumber: ${clientNumber}`);
//       } else if (line.includes('Referente a')) {
//           const referenceMonth = line.split(' ').pop() || '';
//           currentInvoice.referenceMonth = referenceMonth;
//           console.log(`referenceMonth: ${referenceMonth}`);
//       } else if (line.includes('Energia Elétrica')) {
//           const data = line.match(/(\d+)\s+(\d+,\d+)/);
//           if (data) {
//               currentInvoice.electricEnergyKWh = parseFloat(data[1].replace(',', '.'));
//               currentInvoice.electricEnergyValue = parseFloat(data[2].replace(',', '.'));
//               console.log(`electricEnergyKWh: ${data[1]}, electricEnergyValue: ${data[2]}`);
//           }
//       } else if (line.includes('Energia SCEE s/ ICMS')) {
//           const data = line.match(/(\d+)\s+(\d+,\d+)/);
//           if (data) {
//               currentInvoice.screeEnergyKWh = parseFloat(data[1].replace(',', '.'));
//               currentInvoice.screeEnergyValue = parseFloat(data[2].replace(',', '.'));
//               console.log(`screeEnergyKWh: ${data[1]}, screeEnergyValue: ${data[2]}`);
//           }
//       } else if (line.includes('Energia compensada GD I')) {
//           const data = line.match(/(\d+)\s+(\d+,\d+)/);
//           if (data) {
//               currentInvoice.compensatedEnergyKWh = parseFloat(data[1].replace(',', '.'));
//               currentInvoice.compensatedEnergyValue = parseFloat(data[2].replace(',', '.'));
//               console.log(`compensatedEnergyKWh: ${data[1]}, compensatedEnergyValue: ${data[2]}`);
//           }
//       } else if (line.includes('Contrib Ilum Publica Municipal')) {
//           const data = line.match(/(\d+,\d+)/);
//           if (data) {
//               currentInvoice.municipalPublicLightingContribution = parseFloat(data[1].replace(',', '.'));
//               console.log(`municipalPublicLightingContribution: ${data[1]}`);
//               invoices.push(currentInvoice as InvoiceData);
//               currentInvoice = {};  // Reset for the next invoice
//           }
//       }
//   });

//   // Adicionar validação para garantir que todos os campos necessários estejam presentes
//   return invoices.map(invoice => ({
//       clientNumber: invoice.clientNumber || 0,
//       referenceMonth: invoice.referenceMonth || '',
//       electricEnergyKWh: invoice.electricEnergyKWh || 0,
//       electricEnergyValue: invoice.electricEnergyValue || 0,
//       screeEnergyKWh: invoice.screeEnergyKWh || 0,
//       screeEnergyValue: invoice.screeEnergyValue || 0,
//       compensatedEnergyKWh: invoice.compensatedEnergyKWh || 0,
//       compensatedEnergyValue: invoice.compensatedEnergyValue || 0,
//       municipalPublicLightingContribution: invoice.municipalPublicLightingContribution || 0,
//   }));
// }


// export interface InvoiceData {
//   clientNumber: number;
//   referenceMonth: string;
//   electricEnergyKWh: number;
//   electricEnergyValue: number;
//   screeEnergyKWh: number;
//   screeEnergyValue: number;
//   compensatedEnergyKWh: number;
//   compensatedEnergyValue: number;
//   municipalPublicLightingContribution: number;
// }

// export function parseInvoiceData(text: string): InvoiceData[] {
//   const invoices: InvoiceData[] = [];
//   const lines = text.split('\n');

//   let currentInvoice: Partial<InvoiceData> = {};
//   lines.forEach((line, index) => {
//     if (line.includes('Nº DO CLIENTE')) {
//         const clientNumber = parseInt(line.split(' ').pop() || '0', 10);
//         currentInvoice.clientNumber = clientNumber;
//         console.log(`clientNumber: ${clientNumber}`);
//     } 
//     if (line.includes('Referente a')) {
//         const referenceMonth = line.split(' ').pop() || '';
//         currentInvoice.referenceMonth = referenceMonth;
//         console.log(`referenceMonth: ${referenceMonth}`);
//     } 
//     // if (line.includes('Energia Elétrica')) {
//     //   const kWh = parseFloat(line.split(' ')[2]); // Assuming kWh value is the third element
//     //   const value = parseFloat(line.split(' ')[4]); // Assuming price is the fifth element
//     //   currentInvoice.electricEnergyKWh = kWh;
//     //   currentInvoice.electricEnergyValue = value;
//     //   console.log(`electricEnergyKWh: ${kWh}, electricEnergyValue: ${value}`);
//     // }
//     // if (line.includes('Energia SCEE s/ ICMS')) {
//     //   const kWh = parseFloat(line.split(' ')[4]); // Assuming kWh value is the fifth element
//     //   const value = parseFloat(line.split(' ')[6]); // Assuming price is the seventh element
//     //   currentInvoice.screeEnergyKWh = kWh;
//     //   currentInvoice.screeEnergyValue = value;
//     //   console.log(`screeEnergyKWh: ${kWh}, screeEnergyValue: ${value}`);
//     // }
//     // if (line.includes('Energia compensada GD I')) {
//     //   const kWh = parseFloat(line.split(' ')[4]); // Assuming kWh value is the fifth element
//     //   const value = parseFloat(line.split(' ')[6]); // Assuming price is the seventh element, handle negatives
//     //   currentInvoice.compensatedEnergyKWh = kWh;
//     //   currentInvoice.compensatedEnergyValue = value;
//     //   console.log(`compensatedEnergyKWh: ${kWh}, compensatedEnergyValue: ${value}`);
//     // }
//     if (line.includes('Energia Elétrica kWh')) {
//         const kWh = parseFloat(lines[index + 1]);
//         const value = parseFloat(lines[index + 2]);
//         currentInvoice.electricEnergyKWh = kWh;
//         currentInvoice.electricEnergyValue = value;
//         console.log(`electricEnergyKWh: ${kWh}, electricEnergyValue: ${value}`);
//     }
//     if (line.includes('Energia SCEE s/ ICMS')) {
//         const kWh = parseFloat(lines[index + 1]);
//         const value = parseFloat(lines[index + 2]);
//         currentInvoice.screeEnergyKWh = kWh;
//         currentInvoice.screeEnergyValue = value;
//         console.log(`screeEnergyKWh: ${kWh}, screeEnergyValue: ${value}`);
//     }
//     if (line.includes('Energia compensada GD I')) {
//         const kWh = parseFloat(lines[index + 1]);
//         const value = parseFloat(lines[index + 2]);
//         currentInvoice.compensatedEnergyKWh = kWh;
//         currentInvoice.compensatedEnergyValue = value;
//         console.log(`compensatedEnergyKWh: ${kWh}, compensatedEnergyValue: ${value}`);
//     }
//     if (line.includes('Contrib Ilum Publica Municipal')) {
//         const contribution = parseFloat(line.split(' ')[5]); // Assuming the value is the sixth element
//         currentInvoice.municipalPublicLightingContribution = contribution;
//         console.log(`municipalPublicLightingContribution: ${contribution}`);
//     }
//   });

//   // Adicionar validação para garantir que todos os campos necessários estejam presentes
//   return invoices.map(invoice => ({
//       clientNumber: invoice.clientNumber || 0,
//       referenceMonth: invoice.referenceMonth || '',
//       electricEnergyKWh: invoice.electricEnergyKWh || 0,
//       electricEnergyValue: invoice.electricEnergyValue || 0,
//       screeEnergyKWh: invoice.screeEnergyKWh || 0,
//       screeEnergyValue: invoice.screeEnergyValue || 0,
//       compensatedEnergyKWh: invoice.compensatedEnergyKWh || 0,
//       compensatedEnergyValue: invoice.compensatedEnergyValue || 0,
//       municipalPublicLightingContribution: invoice.municipalPublicLightingContribution || 0,
//   }));
// }



// export interface InvoiceData {
//     clientNumber: number;
//     referenceMonth: string;
//     electricEnergyKWh: number;
//     electricEnergyValue: number;
//     screeEnergyKWh: number;
//     screeEnergyValue: number;
//     compensatedEnergyKWh: number;
//     compensatedEnergyValue: number;
//     municipalPublicLightingContribution: number;
//   }
  
//   export function parseInvoiceData(text: string): InvoiceData[] {
//     const invoices: InvoiceData[] = [];
//     const lines = text.split('\n');
  
//     let currentInvoice: Partial<InvoiceData> = {};
    
//     lines.forEach((line, index) => {
//       if (line.includes('Nº DO CLIENTE')) {
//           const clientNumber = parseInt(line.split(' ').pop() || '0', 10);
//           currentInvoice.clientNumber = clientNumber;
//           console.log(`clientNumber: ${clientNumber}`);
//       } 
//       if (line.includes('Referente a')) {
//           const referenceMonth = line.split(' ').pop() || '';
//           currentInvoice.referenceMonth = referenceMonth;
//           console.log(`referenceMonth: ${referenceMonth}`);
//       }
//     //   if (line.includes('Energia Elétrica kWh')) {
//     //       const kWh = parseFloat(lines[index + 1]);
//     //       const value = parseFloat(lines[index + 2]);
//     //       currentInvoice.electricEnergyKWh = kWh;
//     //       currentInvoice.electricEnergyValue = value;
//     //       console.log(`electricEnergyKWh: ${kWh}, electricEnergyValue: ${value}`);
//     //   }
//     //   if (line.includes('Energia SCEE s/ ICMS')) {
//     //       const kWh = parseFloat(lines[index + 1]);
//     //       const value = parseFloat(lines[index + 2]);
//     //       currentInvoice.screeEnergyKWh = kWh;
//     //       currentInvoice.screeEnergyValue = value;
//     //       console.log(`screeEnergyKWh: ${kWh}, screeEnergyValue: ${value}`);
//     //   }
//     //   if (line.includes('Energia compensada GD I')) {
//     //       const kWh = parseFloat(lines[index + 1]);
//     //       const value = parseFloat(lines[index + 2]);
//     //       currentInvoice.compensatedEnergyKWh = kWh;
//     //       currentInvoice.compensatedEnergyValue = value;
//     //       console.log(`compensatedEnergyKWh: ${kWh}, compensatedEnergyValue: ${value}`);
//     //   }
//     if (line.includes('Energia Elétrica')) {
//         const parts = line.split(' ');
//         const kWhIndex = parts.findIndex(part => part.includes('kWh'));
//         if (kWhIndex > -1 && parts.length > kWhIndex) {
//             const kWh = parseFloat(parts[kWhIndex + 1]);
//             const value = parseFloat(parts[kWhIndex + 3]);
//             currentInvoice.electricEnergyKWh = kWh;
//             currentInvoice.electricEnergyValue = value;
//             console.log(`Electric Energy kWh: ${kWh}, Value: ${value}`);
//         }
//     }
//     if (line.includes('Energia SCEE ISENTA')) {
//         const parts = line.split(' ');
//         const kWhIndex = parts.findIndex(part => part.includes('kWh'));
//         if (kWhIndex > -1 && parts.length > kWhIndex) {
//             const kWh = parseFloat(parts[kWhIndex + 1]);
//             const value = parseFloat(parts[kWhIndex + 3]);
//             currentInvoice.screeEnergyKWh = kWh;
//             currentInvoice.screeEnergyValue = value;
//             console.log(`SCEE Energy kWh: ${kWh}, Value: ${value}`);
//         }
//     }
//     if (line.includes('Energia compensada GD I')) {
//         const parts = line.split(' ');
//         const kWhIndex = parts.findIndex(part => part.includes('kWh'));
//         if (kWhIndex > -1 && parts.length > kWhIndex) {
//             const kWh = parseFloat(parts[kWhIndex + 1]);
//             const value = parseFloat(parts[kWhIndex - 2 ]);
//             currentInvoice.compensatedEnergyKWh = kWh;
//             currentInvoice.compensatedEnergyValue = value;
//             console.log(`Compensated Energy kWh: ${kWh}, Value: ${value}`);
//         }
//     }
//       if (line.includes('Contrib Ilum Publica Municipal')) {
//           const contribution = parseFloat(line.split(' ')[5]); // Assuming the value is the sixth element
//           currentInvoice.municipalPublicLightingContribution = contribution;
//           console.log(`municipalPublicLightingContribution: ${contribution}`);
//       }
//     });
  
//     // Adicionar validação para garantir que todos os campos necessários estejam presentes
//     return invoices.map(invoice => ({
//         clientNumber: invoice.clientNumber || 0,
//         referenceMonth: invoice.referenceMonth || '',
//         electricEnergyKWh: invoice.electricEnergyKWh || 0,
//         electricEnergyValue: invoice.electricEnergyValue || 0,
//         screeEnergyKWh: invoice.screeEnergyKWh || 0,
//         screeEnergyValue: invoice.screeEnergyValue || 0,
//         compensatedEnergyKWh: invoice.compensatedEnergyKWh || 0,
//         compensatedEnergyValue: invoice.compensatedEnergyValue || 0,
//         municipalPublicLightingContribution: invoice.municipalPublicLightingContribution || 0,
//     }));
//   }




// export function parseInvoiceData(text: string): InvoiceData[] {
//     const invoices: InvoiceData[] = [];
//     const lines = text.split('\n');
//     let currentInvoice: Partial<InvoiceData> = {};

//     lines.forEach((line) => {
//         if (line.includes('Nº DO CLIENTE')) {
//             const clientNumber = parseInt(line.split(' ').pop() || '0', 10);
//             currentInvoice.clientNumber = clientNumber;
//             console.log(`clientNumber: ${clientNumber}`);
//         } 
//         if (line.includes('Referente a')) {
//             const referenceMonth = line.split(' ').pop() || '';
//             currentInvoice.referenceMonth = referenceMonth;
//             console.log(`referenceMonth: ${referenceMonth}`);
//         }
//       if (line.includes('Energia Elétrica') || line.includes('Energia SCEE ISENTA') || line.includes('Energia compensada GD I')) {
//           const parts = line.split(' ');
//           const kWhIndex = parts.findIndex(part => part.includes('kWh'));
//           if (kWhIndex > -1 && parts.length > kWhIndex) {
//               const kWh = parseFloat(parts[kWhIndex + 1]);
//               let value = parseFloat(parts[kWhIndex + 3]); // Assume o valor após kWh

//               // Corrige para Energia compensada GD I onde o valor está antes do kWh
//               if (line.includes('Energia compensada GD I')) {
//                   value = parseFloat(parts[kWhIndex - 2]);
//               }

//               // Atualiza os valores no currentInvoice com base no tipo de linha
//               if (line.includes('Energia Elétrica')) {
//                   currentInvoice.electricEnergyKWh = kWh;
//                   currentInvoice.electricEnergyValue = value;
//               } else if (line.includes('Energia SCEE ISENTA')) {
//                   currentInvoice.screeEnergyKWh = kWh;
//                   currentInvoice.screeEnergyValue = value;
//               } else if (line.includes('Energia compensada GD I')) {
//                   currentInvoice.compensatedEnergyKWh = kWh;
//                   currentInvoice.compensatedEnergyValue = value;
//               }
//           }
//       }
//       if (line.includes('Contrib Ilum Publica Municipal')) {
//           currentInvoice.municipalPublicLightingContribution = parseFloat(line.split(' ')[5]);
//       }

//       // No final de cada fatura ou seção relevante, adicione ao array e limpe o currentInvoice
//       if (line.includes('TOTAL')) {
//           if (Object.keys(currentInvoice).length > 0) { // Confere se o objeto não está vazio
//               invoices.push({
//                   clientNumber: currentInvoice.clientNumber || 0,
//                   referenceMonth: currentInvoice.referenceMonth || '',
//                   electricEnergyKWh: currentInvoice.electricEnergyKWh || 0,
//                   electricEnergyValue: currentInvoice.electricEnergyValue || 0,
//                   screeEnergyKWh: currentInvoice.screeEnergyKWh || 0,
//                   screeEnergyValue: currentInvoice.screeEnergyValue || 0,
//                   compensatedEnergyKWh: currentInvoice.compensatedEnergyKWh || 0,
//                   compensatedEnergyValue: currentInvoice.compensatedEnergyValue || 0,
//                   municipalPublicLightingContribution: currentInvoice.municipalPublicLightingContribution || 0,
//               });
//               currentInvoice = {}; // Limpa o objeto para a próxima fatura
//           }
//       }
//     });

//     return invoices;
// }

// export function parseInvoiceData(text: string): InvoiceData[] {
//     const invoices: InvoiceData[] = [];
//     const lines = text.split('\n');
//     let currentInvoice: Partial<InvoiceData> = {};

//     lines.forEach((line) => {
//         if (line.includes('Nº DO CLIENTE')) {
//             const clientNumber = parseInt(line.split(' ').pop() || '0', 10);
//             currentInvoice.clientNumber = clientNumber;
//         } 
//         if (line.includes('Referente a')) {
//             const referenceMonth = line.split(' ').pop() || '';
//             currentInvoice.referenceMonth = referenceMonth;
//         }
//         if (line.includes('Energia Elétrica') || line.includes('Energia SCEE ISENTA') || line.includes('Energia compensada GD I')) {
//             const parts = line.split(' ');
//             const kWhIndex = parts.findIndex(part => part.includes('kWh'));
//             if (kWhIndex > -1 && parts.length > kWhIndex) {
//                 const kWh = parseFloat(parts[kWhIndex + 1]);
//                 let value = parseFloat(parts[kWhIndex + 3]); // Assume o valor após kWh

//                 if (line.includes('Energia compensada GD I')) {
//                     value = parseFloat(parts[kWhIndex - 2]);
//                 }

//                 if (line.includes('Energia Elétrica')) {
//                     currentInvoice.electricEnergyKWh = kWh;
//                     currentInvoice.electricEnergyValue = value;
//                 } else if (line.includes('Energia SCEE ISENTA')) {
//                     currentInvoice.screeEnergyKWh = kWh;
//                     currentInvoice.screeEnergyValue = value;
//                 } else if (line.includes('Energia compensada GD I')) {
//                     currentInvoice.compensatedEnergyKWh = kWh;
//                     currentInvoice.compensatedEnergyValue = value;
//                 }
//             }
//         }
//         if (line.includes('Contrib Ilum Publica Municipal')) {
//             currentInvoice.municipalPublicLightingContribution = parseFloat(line.split(' ')[5]);
//         }
//     });

//     // Adiciona o último invoice processado ao array
//     if (Object.keys(currentInvoice).length > 0) {
//         invoices.push({
//             clientNumber: currentInvoice.clientNumber || 0,
//             referenceMonth: currentInvoice.referenceMonth || '',
//             electricEnergyKWh: currentInvoice.electricEnergyKWh || 0,
//             electricEnergyValue: currentInvoice.electricEnergyValue || 0,
//             screeEnergyKWh: currentInvoice.screeEnergyKWh || 0,
//             screeEnergyValue: currentInvoice.screeEnergyValue || 0,
//             compensatedEnergyKWh: currentInvoice.compensatedEnergyKWh || 0,
//             compensatedEnergyValue: currentInvoice.compensatedEnergyValue || 0,
//             municipalPublicLightingContribution: currentInvoice.municipalPublicLightingContribution || 0,
//         });
//         currentInvoice = {}; // Limpa o objeto para a próxima fatura
//     }

//     return invoices;
// }

// export function parseInvoiceData(text: string): InvoiceData[] {
//     const invoices: InvoiceData[] = [];
//     const lines = text.split('\n');
//     let currentInvoice: Partial<InvoiceData> = {};
//     let lastEnergyType = '';

//     lines.forEach((line) => {
//         if (line.includes('Nº DO CLIENTE')) {
//             const clientNumber = parseInt(line.split(' ').pop() || '0', 10);
//             currentInvoice.clientNumber = clientNumber;
//         } 
//         if (line.includes('Referente a')) {
//             const referenceMonth = line.split(' ').pop() || '';
//             currentInvoice.referenceMonth = referenceMonth;
//         }
//         if (line.includes('Energia Elétrica')) {
//             lastEnergyType = 'electric';
//         } else if (line.includes('Energia SCEE ISENTA')) {
//             lastEnergyType = 'scree';
//         } else if (line.includes('Energia compensada GD I')) {
//             lastEnergyType = 'compensated';
//         }

//         // Extracting the kWh and monetary values
//         const parts = line.split(' ');
//         if (parts.includes('kWh')) {
//             const kWhIndex = parts.findIndex(part => part === 'kWh');
//             const kWh = parseFloat(parts[kWhIndex + 1]);
//             switch (lastEnergyType) {
//                 case 'electric':
//                     currentInvoice.electricEnergyKWh = kWh;
//                     break;
//                 case 'scree':
//                     currentInvoice.screeEnergyKWh = kWh;
//                     break;
//                 case 'compensated':
//                     currentInvoice.compensatedEnergyKWh = kWh;
//                     break;
//             }
//         } else if (!isNaN(parseFloat(parts[0])) && lastEnergyType) {
//             const value = parseFloat(parts[0]);
//             switch (lastEnergyType) {
//                 case 'electric':
//                     currentInvoice.electricEnergyValue = value;
//                     break;
//                 case 'scree':
//                     currentInvoice.screeEnergyValue = value;
//                     break;
//                 case 'compensated':
//                     currentInvoice.compensatedEnergyValue = value;
//                     break;
//             }
//         }

//         // If the line includes 'TOTAL' or it's the last line, finalize the current invoice
//         if (line.includes('TOTAL') || lines.indexOf(line) === lines.length - 1) {
//             if (Object.keys(currentInvoice).length > 0) {
//                 invoices.push(currentInvoice as InvoiceData);
//                 currentInvoice = {};
//                 lastEnergyType = '';
//             }
//         }
//     });

//     return invoices;
// }


// ----------------- ESSE PEGO CERTO, SÓ DOIS VALORES
// export function parseInvoiceData(text: string): InvoiceData[] {
//     const invoices: InvoiceData[] = [];
//     const lines = text.split('\n');
//     let currentInvoice: Partial<InvoiceData> = {};
//     let lastEnergyType = '';

//     lines.forEach((line, index) => {
//         if (line.includes('Nº DO CLIENTE')) {
//             currentInvoice.clientNumber = parseInt(line.split(' ').pop() || '0', 10);
//         } 
//         if (line.includes('Referente a')) {
//             currentInvoice.referenceMonth = line.split(' ').pop() || '';
//         }
//         if (line.includes('Energia Elétrica')) {
//             lastEnergyType = 'electric';
//         } else if (line.includes('Energia SCEE ISENTA')) {
//             lastEnergyType = 'scree';
//         } else if (line.includes('Energia compensada GD I')) {
//             lastEnergyType = 'compensated';
//         }

//         const parts = line.split(' ');
//         if (parts.includes('kWh')) {
//             const kWhIndex = parts.findIndex(part => part === 'kWh');
//             if (kWhIndex !== -1) {
//                 const kWh = parseFloat(parts[kWhIndex + 1]);
//                 if (!isNaN(kWh)) {
//                     switch (lastEnergyType) {
//                         case 'electric':
//                             currentInvoice.electricEnergyKWh = kWh;
//                             break;
//                         case 'scree':
//                             currentInvoice.screeEnergyKWh = kWh;
//                             break;
//                         case 'compensated':
//                             currentInvoice.compensatedEnergyKWh = kWh;
//                             break;
//                     }
//                 }
//             }
//         } else if (!isNaN(parseFloat(parts[0]))) {
//             const value = parseFloat(parts[0]);
//             if (!isNaN(value)) {
//                 switch (lastEnergyType) {
//                     case 'electric':
//                         currentInvoice.electricEnergyValue = value;
//                         break;
//                     case 'scree':
//                         currentInvoice.screeEnergyValue = value;
//                         break;
//                     case 'compensated':
//                         currentInvoice.compensatedEnergyValue = value;
//                         break;
//                 }
//             }
//         }

//         // Ensure each invoice is complete before adding to the list
//         if ((line.includes('TOTAL') || index === lines.length - 1) && currentInvoice.clientNumber) {
//             invoices.push(currentInvoice as InvoiceData);
//             currentInvoice = {}; // Reset for next invoice
//         }
//     });

//     return invoices;
// }

// --------- ESSE PEGA CERTO SÓ DOIS VALORES PEGA O TARIFA UNITARIO
// export function parseInvoiceData(text: string): InvoiceData[] {
//     const invoices: InvoiceData[] = [];
//     const lines = text.split('\n');
//     let currentInvoice: Partial<InvoiceData> = {};
//     let lastEnergyType = '';
//     let collectValueNextLine = false; // Flag to indicate if next line should be value

//     lines.forEach((line, index) => {
//         if (line.includes('Nº DO CLIENTE')) {
//             currentInvoice.clientNumber = parseInt(line.split(' ').pop() || '0', 10);
//         } 
//         if (line.includes('Referente a')) {
//             currentInvoice.referenceMonth = line.split(' ').pop() || '';
//         }
//         if (line.includes('Energia Elétrica')) {
//             lastEnergyType = 'electric';
//             collectValueNextLine = false;
//         } else if (line.includes('Energia SCEE ISENTA')) {
//             lastEnergyType = 'scree';
//             collectValueNextLine = false;
//         } else if (line.includes('Energia compensada GD I')) {
//             lastEnergyType = 'compensated';
//             collectValueNextLine = false;
//         }

//         const parts = line.split(' ');
//         if (parts.includes('kWh')) {
//             const kWhIndex = parts.findIndex(part => part === 'kWh');
//             if (kWhIndex !== -1) {
//                 const kWh = parseFloat(parts[kWhIndex + 1]);
//                 if (!isNaN(kWh)) {
//                     switch (lastEnergyType) {
//                         case 'electric':
//                             currentInvoice.electricEnergyKWh = kWh;
//                             break;
//                         case 'scree':
//                             currentInvoice.screeEnergyKWh = kWh;
//                             break;
//                         case 'compensated':
//                             currentInvoice.compensatedEnergyKWh = kWh;
//                             break;
//                     }
//                     collectValueNextLine = true;  // Set flag to collect monetary value on next line
//                 }
//             }
//         } else if (collectValueNextLine && !isNaN(parseFloat(parts[0]))) {
//             const value = parseFloat(parts[0]);
//             if (!isNaN(value)) {
//                 switch (lastEnergyType) {
//                     case 'electric':
//                         currentInvoice.electricEnergyValue = value;
//                         break;
//                     case 'scree':
//                         currentInvoice.screeEnergyValue = value;
//                         break;
//                     case 'compensated':
//                         currentInvoice.compensatedEnergyValue = value;
//                         break;
//                 }
//                 collectValueNextLine = false;  // Reset flag after collecting value
//             }
//         }

//         // Ensure each invoice is complete before adding to the list
//         if ((line.includes('TOTAL') || index === lines.length - 1) && currentInvoice.clientNumber) {
//             invoices.push(currentInvoice as InvoiceData);
//             currentInvoice = {}; // Reset for next invoice
//             lastEnergyType = '';
//         }
//     });

//     return invoices;
// }


// export function parseInvoiceData(text: string): InvoiceData[] {
//     const invoices: InvoiceData[] = [];
//     const lines = text.split('\n');
//     let currentInvoice: Partial<InvoiceData> = {};
//     let lastEnergyType = '';
//     let nextLineIsValue = false; // Flag to capture the value on the next line

//     lines.forEach((line, index) => {
//         if (line.includes('Nº DO CLIENTE')) {
//             currentInvoice.clientNumber = parseInt(line.split(' ').pop() || '0', 10);
//         } 
//         if (line.includes('Referente a')) {
//             currentInvoice.referenceMonth = line.split(' ').pop() || '';
//         }
//         if (line.includes('Energia Elétrica')) {
//             lastEnergyType = 'electric';
//         } else if (line.includes('Energia SCEE ISENTA')) {
//             lastEnergyType = 'scree';
//         } else if (line.includes('Energia compensada GD I')) {
//             lastEnergyType = 'compensated';
//         }

//         const parts = line.split(' ');
//         if (parts.includes('kWh')) {
//             const kWhIndex = parts.findIndex(part => part === 'kWh');
//             if (kWhIndex !== -1) {
//                 const kWh = parseFloat(parts[kWhIndex + 1]);
//                 if (!isNaN(kWh)) {
//                     switch (lastEnergyType) {
//                         case 'electric':
//                             currentInvoice.electricEnergyKWh = kWh;
//                             break;
//                         case 'scree':
//                             currentInvoice.screeEnergyKWh = kWh;
//                             break;
//                         case 'compensated':
//                             currentInvoice.compensatedEnergyKWh = kWh;
//                             break;
//                     }
//                     nextLineIsValue = true;  // Set flag to collect monetary value on the next line
//                 }
//             }
//         } else if (nextLineIsValue) {
//             const valueParts = line.split(' ');
//             const value = parseFloat(valueParts[valueParts.length - 1]); // Get the last number on the line
//             if (!isNaN(value)) {
//                 switch (lastEnergyType) {
//                     case 'electric':
//                         currentInvoice.electricEnergyValue = value;
//                         break;
//                     case 'scree':
//                         currentInvoice.screeEnergyValue = value;
//                         break;
//                     case 'compensated':
//                         currentInvoice.compensatedEnergyValue = value;
//                         break;
//                 }
//                 nextLineIsValue = false; // Reset the flag
//             }
//         }

//         // Ensure each invoice is complete before adding to the list
//         if ((line.includes('TOTAL') || index === lines.length - 1) && currentInvoice.clientNumber) {
//             invoices.push(currentInvoice as InvoiceData);
//             currentInvoice = {}; // Reset for next invoice
//             lastEnergyType = '';
//             nextLineIsValue = false;
//         }
//     });

//     return invoices;
// }


// export function parseInvoiceData(text: string): InvoiceData[] {
//     const invoices: InvoiceData[] = [];
//     const lines = text.split('\n');
//     let currentInvoice: Partial<InvoiceData> = {};
//     let collectNextElectric = false;
//     let collectNextScree = false;
//     let collectNextCompensated = false;

//     lines.forEach((line, index) => {
//         if (line.includes('Nº DO CLIENTE')) {
//             currentInvoice.clientNumber = parseInt(line.split(' ').pop() || '0', 10);
//         }
//         if (line.includes('Referente a')) {
//             currentInvoice.referenceMonth = line.split(' ').pop() || '';
//         }
//         if (line.includes('Energia Elétrica')) {
//             const parts = line.split(' ');
//             const kWhIndex = parts.findIndex(part => part.includes('kWh'));
//             currentInvoice.electricEnergyKWh = parseFloat(parts[kWhIndex + 1]);
//             collectNextElectric = true;
//         } else if (collectNextElectric) {
//             currentInvoice.electricEnergyValue = parseFloat(line.split(' ')[1]);
//             collectNextElectric = false;
//         }
//         if (line.includes('Energia SCEE ISENTA')) {
//             const parts = line.split(' ');
//             const kWhIndex = parts.findIndex(part => part.includes('kWh'));
//             currentInvoice.screeEnergyKWh = parseFloat(parts[kWhIndex + 1]);
//             collectNextScree = true;
//         } else if (collectNextScree) {
//             currentInvoice.screeEnergyValue = parseFloat(line.split(' ')[1]);
//             collectNextScree = false;
//         }
//         if (line.includes('Energia compensada GD I kWh')) {
//             const parts = line.split(' ');
//             const kWhIndex = parts.findIndex(part => part.includes('kWh'));
//             currentInvoice.compensatedEnergyKWh = parseFloat(parts[kWhIndex + 1]);
//             collectNextCompensated = true;
//         } else if (collectNextCompensated) {
//             currentInvoice.compensatedEnergyValue = parseFloat(line.split(' ')[1]);
//             collectNextCompensated = false;
//         }
//         if (line.includes('Contrib Ilum Publica Municipal')) {
//             const contribution = parseFloat(line.split(' ')[5]); // Assuming the value is the sixth element
//             currentInvoice.municipalPublicLightingContribution = contribution;
//             console.log(`municipalPublicLightingContribution: ${contribution}`);
//         }
//         // Ensure each invoice is complete before adding to the list
//         if ((line.includes('TOTAL') || index === lines.length - 1) && currentInvoice.clientNumber) {
//             invoices.push(currentInvoice as InvoiceData);
//             currentInvoice = {}; // Reset for next invoice
//         }
//     });

//     return invoices;
// }


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
            const contribution = parseFloat(line.split(' ')[5]); // Assuming the value is the sixth element
            currentInvoice.municipalPublicLightingContribution = contribution;
        }
        // Ensure each invoice is complete before adding to the list
        if ((line.includes('TOTAL') || index === lines.length - 1) && currentInvoice.clientNumber) {
            invoices.push(currentInvoice as InvoiceData);
            currentInvoice = {}; // Reset for next invoice
        }
    });

    return invoices;
}























// export interface InvoiceData {
//     clientNumber: number;
//     referenceMonth: string;
//     electricEnergyKWh: number;
//     electricEnergyValue: number;
//     screeEnergyKWh: number;
//     screeEnergyValue: number;
//     compensatedEnergyKWh: number;
//     compensatedEnergyValue: number;
//     municipalPublicLightingContribution: number;
// }

// export function parseInvoiceData(text: string): InvoiceData[] {
//     const invoices: InvoiceData[] = [];
//     const lines = text.split('\n');

//     let currentInvoice: Partial<InvoiceData> = {};
//     lines.forEach(line => {
//         console.log(`Processing line: ${line}`);  // Log cada linha processada

//         if (line.includes('Nº DO CLIENTE')) {
//             const match = line.match(/Nº DO CLIENTE\s+(\d+)/);
//             if (match) {
//                 const clientNumber = parseInt(match[1], 10);
//                 currentInvoice.clientNumber = clientNumber;
//                 console.log(`clientNumber: ${clientNumber}`);
//             }
//         } else if (line.includes('Referente a')) {
//             const match = line.match(/Referente a\s+(\w+\/\d+)/);
//             if (match) {
//                 const referenceMonth = match[1];
//                 currentInvoice.referenceMonth = referenceMonth;
//                 console.log(`referenceMonth: ${referenceMonth}`);
//             }
//         } else if (line.includes('Energia Elétrica')) {
//             const data = line.match(/(\d+)\s+(\d+,\d+)/);
//             if (data) {
//                 currentInvoice.electricEnergyKWh = parseFloat(data[1].replace(',', '.'));
//                 currentInvoice.electricEnergyValue = parseFloat(data[2].replace(',', '.'));
//                 console.log(`electricEnergyKWh: ${data[1]}, electricEnergyValue: ${data[2]}`);
//             }
//         } else if (line.includes('Energia SCEE s/ ICMS')) {
//             const data = line.match(/(\d+)\s+(\d+,\d+)/);
//             if (data) {
//                 currentInvoice.screeEnergyKWh = parseFloat(data[1].replace(',', '.'));
//                 currentInvoice.screeEnergyValue = parseFloat(data[2].replace(',', '.'));
//                 console.log(`screeEnergyKWh: ${data[1]}, screeEnergyValue: ${data[2]}`);
//             }
//         } else if (line.includes('Energia compensada GD I')) {
//             const data = line.match(/(\d+)\s+(\d+,\d+)/);
//             if (data) {
//                 currentInvoice.compensatedEnergyKWh = parseFloat(data[1].replace(',', '.'));
//                 currentInvoice.compensatedEnergyValue = parseFloat(data[2].replace(',', '.'));
//                 console.log(`compensatedEnergyKWh: ${data[1]}, compensatedEnergyValue: ${data[2]}`);
//             }
//         } else if (line.includes('Contrib Ilum Publica Municipal')) {
//             const data = line.match(/(\d+,\d+)/);
//             if (data) {
//                 currentInvoice.municipalPublicLightingContribution = parseFloat(data[1].replace(',', '.'));
//                 console.log(`municipalPublicLightingContribution: ${data[1]}`);
//                 invoices.push(currentInvoice as InvoiceData);
//                 currentInvoice = {};  // Reset for the next invoice
//             }
//         }
//     });

//     // Adicionar validação para garantir que todos os campos necessários estejam presentes
//     return invoices.map(invoice => ({
//         clientNumber: invoice.clientNumber || 0,
//         referenceMonth: invoice.referenceMonth || '',
//         electricEnergyKWh: invoice.electricEnergyKWh || 0,
//         electricEnergyValue: invoice.electricEnergyValue || 0,
//         screeEnergyKWh: invoice.screeEnergyKWh || 0,
//         screeEnergyValue: invoice.screeEnergyValue || 0,
//         compensatedEnergyKWh: invoice.compensatedEnergyKWh || 0,
//         compensatedEnergyValue: invoice.compensatedEnergyValue || 0,
//         municipalPublicLightingContribution: invoice.municipalPublicLightingContribution || 0,
//     }));
// }








