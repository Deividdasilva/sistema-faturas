import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface FaturaData {
  id: number;
  clientNumber: string;
  referenceMonth: string;
  electricEnergyKWh: number;
  electricEnergyValue: number;
  screeEnergyKWh: number;
  screeEnergyValue: number;
  compensatedEnergyKWh: number;
  compensatedEnergyValue: number;
  municipalPublicLightingContribution: number;
}

interface GroupedData {
  [key: string]: {
    electricEnergyKWh: number;
    screeEnergyKWh: number;
    compensatedEnergyKWh: number;
    electricEnergyValue: number;
    screeEnergyValue: number;
    compensatedEnergyValue: number;
    municipalPublicLightingContribution: number;
  };
}

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
  }[];
}

const Dashboard = () => {
  const [chartData, setChartData] = useState<ChartData>({ labels: [], datasets: [] });
  const [valueChartData, setValueChartData] = useState<ChartData>({ labels: [], datasets: [] });
  const [clientNumber, setClientNumber] = useState('');
  const [clients, setClients] = useState<string[]>([]);

  useEffect(() => {
    axios.get<FaturaData[]>('http://localhost:3000/api/invoices/list')
      .then(response => {
        const uniqueClients = new Set(response.data.map(data => data.clientNumber));
        setClients(Array.from(uniqueClients));
        const filteredData = clientNumber ? response.data.filter(data => data.clientNumber === clientNumber) : response.data;
        updateChartData(filteredData);
      })
      .catch(error => console.error('Erro ao buscar dados:', error));
  }, [clientNumber]);

  const updateChartData = (data: FaturaData[]) => {
    const groupedData: GroupedData = data.reduce<GroupedData>((acc, cur) => {
      const month = cur.referenceMonth;
      if (!acc[month]) {
        acc[month] = { ...cur };
      } else {
        acc[month].electricEnergyKWh += cur.electricEnergyKWh;
        acc[month].screeEnergyKWh += cur.screeEnergyKWh;
        acc[month].compensatedEnergyKWh += cur.compensatedEnergyKWh;
        acc[month].electricEnergyValue += cur.electricEnergyValue;
        acc[month].screeEnergyValue += cur.screeEnergyValue;
        acc[month].compensatedEnergyValue += cur.compensatedEnergyValue;
        acc[month].municipalPublicLightingContribution += cur.municipalPublicLightingContribution;
      }
      return acc;
    }, {});

    const months = Object.keys(groupedData);
    const energyData = months.map(month => groupedData[month].electricEnergyKWh + groupedData[month].screeEnergyKWh);
    const gdData = months.map(month => groupedData[month].compensatedEnergyKWh);
    const valueData = months.map(month => groupedData[month].electricEnergyValue + groupedData[month].screeEnergyValue + groupedData[month].municipalPublicLightingContribution);
    const economyData = months.map(month => groupedData[month].compensatedEnergyValue);

    setChartData({
      labels: months,
      datasets: [
        { label: 'Consumo de Energia (kWh)', data: energyData, backgroundColor: 'rgba(53, 162, 235, 0.5)' },
        { label: 'Energia Compensada (kWh)', data: gdData, backgroundColor: 'rgba(75, 192, 192, 0.5)' }
      ]
    });

    setValueChartData({
      labels: months,
      datasets: [
        { label: 'Valor Total sem GD (R$)', data: valueData, backgroundColor: 'rgba(255, 99, 132, 0.5)' },
        { label: 'Economia GD (R$)', data: economyData, backgroundColor: 'rgba(255, 205, 86, 0.5)' }
      ]
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', height: '100vh' }}>
      <div style={{ margin: '5px', width: '100%', textAlign: 'center' }}>
        <label htmlFor="clientNumber">Selecione um cliente: </label>
        <select id="clientNumber" value={clientNumber} onChange={e => setClientNumber(e.target.value)} style={{ padding: '10px', margin: '10px', width: '200px', borderRadius: '5px' }}>
          <option value="">Todos</option>
          {clients.map(client => (
            <option key={client} value={client}>{client}</option>
          ))}
        </select>
      </div>
      <div style={{ width: '90%', height: '35%', margin: '5px 0' }}>
        <h2>Dashboard de Consumo de Energia</h2>
        <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true } } }} />
      </div>
      <div style={{ width: '90%', height: '35%', padding: '40px', marginTop: '20px' }}>
        <h2>Dashboard Financeiro</h2>
        <Bar data={valueChartData} options={{ responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true } } }} />
      </div>
    </div>
  );
};

export default Dashboard;
