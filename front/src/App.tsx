import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ExtractInvoice from './components/ExtractInvoice';
import InvoiceList from './components/InvoiceList';
import './App.css';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ flex: 1, padding: '10px' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/extract-invoice" element={<ExtractInvoice />} />
            <Route path="/list" element={<InvoiceList />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
