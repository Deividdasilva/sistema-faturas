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
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error fetching invoices: {error}</p>;
    }

    return (
        <div>
            <h1>Invoices</h1>
            <table>
                <thead>
                    <tr>
                        <th>Client Number</th>
                        <th>Reference Month</th>
                        <th>Electric Energy (kWh)</th>
                        <th>Electric Energy Value</th>
                        <th>Scree Energy (kWh)</th>
                        <th>Scree Energy Value</th>
                        <th>Compensated Energy (kWh)</th>
                        <th>Compensated Energy Value</th>
                        <th>Municipal Public Lighting Contribution</th>
                    </tr>
                </thead>
                <tbody>
                    {invoices.map((invoice) => (
                        <tr key={invoice.id}>
                            <td>{invoice.clientNumber}</td>
                            <td>{invoice.referenceMonth}</td>
                            <td>{invoice.electricEnergyKWh}</td>
                            <td>{invoice.electricEnergyValue}</td>
                            <td>{invoice.screeEnergyKWh}</td>
                            <td>{invoice.screeEnergyValue}</td>
                            <td>{invoice.compensatedEnergyKWh}</td>
                            <td>{invoice.compensatedEnergyValue}</td>
                            <td>{invoice.municipalPublicLightingContribution}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default InvoiceList;
