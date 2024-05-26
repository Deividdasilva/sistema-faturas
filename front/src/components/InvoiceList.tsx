import React, { useEffect, useState } from 'react';

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

    if (loading) {
        return <p>Carregando...</p>;
    }

    if (error) {
        return <p>Erro ao buscar faturas: {error}</p>;
    }

    return (
        <div style={{ width: '100%', padding: '20px' }}>
            <h1 style={{ textAlign: 'center' }}>Faturas</h1>
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
                    </tr>
                </thead>
                <tbody>
                    {invoices.map((invoice) => (
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
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default InvoiceList;
