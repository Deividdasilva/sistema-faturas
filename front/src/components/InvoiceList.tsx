// import React, { useEffect, useState } from 'react';

// interface Invoice {
//     id: number;
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

// const InvoiceList: React.FC = () => {
//     const [invoices, setInvoices] = useState<Invoice[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         const fetchInvoices = async () => {
//             try {
//                 const response = await fetch('http://localhost:3000/api/invoices/list');
//                 if (!response.ok) {
//                     throw new Error(`Erro no servidor: ${response.status}`);
//                 }
//                 const data = await response.json();
//                 setInvoices(data);
//                 setLoading(false);
//             } catch (err: any) {
//                 setError(err.message || 'Erro desconhecido');
//                 setLoading(false);
//             }
//         };

//         fetchInvoices();
//     }, []);

//     if (loading) {
//         return <p>Carregando...</p>;
//     }

//     if (error) {
//         return <p>Erro ao buscar faturas: {error}</p>;
//     }

//     return (
//         <div style={{ width: '100%', padding: '20px' }}>
//             <h1 style={{ textAlign: 'center' }}>Faturas</h1>
//             <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
//                 <thead>
//                     <tr style={{ backgroundColor: '#f2f2f2', textAlign: 'center' }}>
//                         <th style={{ border: '1px solid #ccc', padding: '8px' }}>Nº do Cliente</th>
//                         <th style={{ border: '1px solid #ccc', padding: '8px' }}>Mês de Referência</th>
//                         <th style={{ border: '1px solid #ccc', padding: '8px' }}>Energia Elétrica (kWh)</th>
//                         <th style={{ border: '1px solid #ccc', padding: '8px' }}>Energia Elétrica (R$)</th>
//                         <th style={{ border: '1px solid #ccc', padding: '8px' }}>Energia SCEEE (kWh)</th>
//                         <th style={{ border: '1px solid #ccc', padding: '8px' }}>Energia SCEEE (R$)</th>
//                         <th style={{ border: '1px solid #ccc', padding: '8px' }}>Energia Compensada (kWh)</th>
//                         <th style={{ border: '1px solid #ccc', padding: '8px' }}>Energia Compensada (R$)</th>
//                         <th style={{ border: '1px solid #ccc', padding: '8px' }}>Contribuição para Iluminação Pública Municipal (R$)</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {invoices.map((invoice) => (
//                         <tr key={invoice.id} style={{ textAlign: 'center', backgroundColor: '#fff', borderBottom: '1px solid #eee' }}>
//                             <td style={{ border: '1px solid #ccc', padding: '8px' }}>{invoice.clientNumber}</td>
//                             <td style={{ border: '1px solid #ccc', padding: '8px' }}>{invoice.referenceMonth}</td>
//                             <td style={{ border: '1px solid #ccc', padding: '8px' }}>{invoice.electricEnergyKWh}</td>
//                             <td style={{ border: '1px solid #ccc', padding: '8px' }}>{invoice.electricEnergyValue}</td>
//                             <td style={{ border: '1px solid #ccc', padding: '8px' }}>{invoice.screeEnergyKWh}</td>
//                             <td style={{ border: '1px solid #ccc', padding: '8px' }}>{invoice.screeEnergyValue}</td>
//                             <td style={{ border: '1px solid #ccc', padding: '8px' }}>{invoice.compensatedEnergyKWh}</td>
//                             <td style={{ border: '1px solid #ccc', padding: '8px' }}>{invoice.compensatedEnergyValue}</td>
//                             <td style={{ border: '1px solid #ccc', padding: '8px' }}>{invoice.municipalPublicLightingContribution}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default InvoiceList;





// // src/components/InvoiceList.tsx
// import React, { useEffect, useState } from 'react';

// interface Invoice {
//     id: number;
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

// const InvoiceList: React.FC = () => {
//     const [invoices, setInvoices] = useState<Invoice[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         const fetchInvoices = async () => {
//             try {
//                 const response = await fetch('http://localhost:3000/api/invoices/list');
//                 if (!response.ok) {
//                     throw new Error(`Erro no servidor: ${response.status}`);
//                 }
//                 const data = await response.json();
//                 setInvoices(data);
//                 setLoading(false);
//             } catch (err: any) {
//                 setError(err.message || 'Erro desconhecido');
//                 setLoading(false);
//             }
//         };

//         fetchInvoices();
//     }, []);

//     const handleDownload = (clientNumber: number, referenceMonth: string) => {
//         const url = `http://localhost:3000/api/invoices/download?clientNumber=${clientNumber}&referenceMonth=${referenceMonth}`;
//         window.open(url, '_blank');
//     };

//     if (loading) {
//         return <p>Carregando...</p>;
//     }

//     if (error) {
//         return <p>Erro ao buscar faturas: {error}</p>;
//     }

//     return (
//         <div style={{ width: '100%', padding: '20px' }}>
//             <h1 style={{ textAlign: 'center' }}>Faturas</h1>
//             <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
//                 <thead>
//                     <tr style={{ backgroundColor: '#f2f2f2', textAlign: 'center' }}>
//                         <th style={{ border: '1px solid #ccc', padding: '8px' }}>Nº do Cliente</th>
//                         <th style={{ border: '1px solid #ccc', padding: '8px' }}>Mês de Referência</th>
//                         <th style={{ border: '1px solid #ccc', padding: '8px' }}>Energia Elétrica (kWh)</th>
//                         <th style={{ border: '1px solid #ccc', padding: '8px' }}>Energia Elétrica (R$)</th>
//                         <th style={{ border: '1px solid #ccc', padding: '8px' }}>Energia SCEEE (kWh)</th>
//                         <th style={{ border: '1px solid #ccc', padding: '8px' }}>Energia SCEEE (R$)</th>
//                         <th style={{ border: '1px solid #ccc', padding: '8px' }}>Energia Compensada (kWh)</th>
//                         <th style={{ border: '1px solid #ccc', padding: '8px' }}>Energia Compensada (R$)</th>
//                         <th style={{ border: '1px solid #ccc', padding: '8px' }}>Contribuição para Iluminação Pública Municipal (R$)</th>
//                         <th style={{ border: '1px solid #ccc', padding: '8px' }}>Ações</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {invoices.map((invoice) => (
//                         <tr key={invoice.id} style={{ textAlign: 'center', backgroundColor: '#fff', borderBottom: '1px solid #eee' }}>
//                             <td style={{ border: '1px solid #ccc', padding: '8px' }}>{invoice.clientNumber}</td>
//                             <td style={{ border: '1px solid #ccc', padding: '8px' }}>{invoice.referenceMonth}</td>
//                             <td style={{ border: '1px solid #ccc', padding: '8px' }}>{invoice.electricEnergyKWh}</td>
//                             <td style={{ border: '1px solid #ccc', padding: '8px' }}>{invoice.electricEnergyValue}</td>
//                             <td style={{ border: '1px solid #ccc', padding: '8px' }}>{invoice.screeEnergyKWh}</td>
//                             <td style={{ border: '1px solid #ccc', padding: '8px' }}>{invoice.screeEnergyValue}</td>
//                             <td style={{ border: '1px solid #ccc', padding: '8px' }}>{invoice.compensatedEnergyKWh}</td>
//                             <td style={{ border: '1px solid #ccc', padding: '8px' }}>{invoice.compensatedEnergyValue}</td>
//                             <td style={{ border: '1px solid #ccc', padding: '8px' }}>{invoice.municipalPublicLightingContribution}</td>
//                             <td style={{ border: '1px solid #ccc', padding: '8px' }}>
//                                 <button onClick={() => handleDownload(invoice.clientNumber, invoice.referenceMonth)}>Baixar</button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default InvoiceList;
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

interface Invoice {
    id: number;
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

const InvoiceList: React.FC = () => {
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filter, setFilter] = useState<string>('all');

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/invoices/list');
                if (!response.ok) {
                    throw new Error(`Erro no servidor: ${response.status}`);
                }
                const data = await response.json();
                setInvoices(data);
                setLoading(false);
            } catch (err: any) {
                setError(err.message || 'Erro desconhecido');
                setLoading(false);
            }
        };

        fetchInvoices();
    }, []);

    const handleDownload = (clientNumber: number, referenceMonth: string) => {
        const url = `http://localhost:3000/api/invoices/download?clientNumber=${clientNumber}&referenceMonth=${referenceMonth}`;
        window.open(url, '_blank');
    };

    const uniqueClientNumbers = Array.from(new Set(invoices.map(invoice => invoice.clientNumber)));

    const filteredInvoices = filter === 'all' ? invoices : invoices.filter(invoice =>
        invoice.clientNumber.toString() === filter
    );

    if (loading) {
        return <p>Carregando...</p>;
    }

    if (error) {
        return <p>Erro ao buscar faturas: {error}</p>;
    }

    return (
        <div style={{ width: '100%', padding: '20px', display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '95%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h1 style={{ textAlign: 'center' }}>Faturas</h1>
                    <div style={{ marginBottom: '20px', marginRight: '30px' }}>
                        <label htmlFor="clientNumberFilter">Filtrar por Nº do Cliente: </label>
                        <select
                            id="clientNumberFilter"
                            value={filter}
                            onChange={e => setFilter(e.target.value)}
                            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                        >
                            <option value="all">Todos</option>
                            {uniqueClientNumbers.map(clientNumber => (
                                <option key={clientNumber} value={clientNumber.toString()}>{clientNumber}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f2f2f2', textAlign: 'center' }}>
                            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Nº do Cliente</th>
                            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Mês de Referência</th>
                            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Energia Elétrica (kWh)</th>
                            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Energia Elétrica (R$)</th>
                            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Energia SCEEE (kWh)</th>
                            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Energia SCEEE (R$)</th>
                            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Energia Compensada (kWh)</th>
                            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Energia Compensada (R$)</th>
                            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Contribuição para Iluminação Pública Municipal (R$)</th>
                            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredInvoices.map((invoice) => (
                            <tr key={invoice.id} style={{ textAlign: 'center', backgroundColor: '#fff', borderBottom: '1px solid #eee' }}>
                                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{invoice.clientNumber}</td>
                                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{invoice.referenceMonth}</td>
                                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{invoice.electricEnergyKWh}</td>
                                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{invoice.electricEnergyValue}</td>
                                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{invoice.screeEnergyKWh}</td>
                                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{invoice.screeEnergyValue}</td>
                                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{invoice.compensatedEnergyKWh}</td>
                                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{invoice.compensatedEnergyValue}</td>
                                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{invoice.municipalPublicLightingContribution}</td>
                                <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                                    <button onClick={() => handleDownload(invoice.clientNumber, invoice.referenceMonth)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                                        <FontAwesomeIcon icon={faDownload} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default InvoiceList;

