// import request from 'supertest';
// import app from '../../app';  // Ajuste o caminho conforme a estrutura do seu projeto

// jest.mock('../../models/Invoice', () => {
//   return {
//     __esModule: true,
//     default: jest.fn().mockImplementation(() => ({
//       findAll: jest.fn().mockResolvedValue([]),
//       findByPk: jest.fn().mockResolvedValue(null)
//     }))
//   };
// });

// describe('Invoice Controller', () => {
//   describe('extractAndSaveInvoices', () => {
//     it('should return 400 if no file is provided', async () => {
//       const res = await request(app).post('/api/invoices/extract-invoice').send();
//       expect(res.status).toBe(400);
//       expect(res.body.message).toBe('No file provided');
//     });
//   });

//   describe('getAllInvoices', () => {
//     it('should return all invoices when no client number is specified', async () => {
//       const res = await request(app).get('/api/invoices/list');
//       expect(res.status).toBe(200);
//       expect(res.body).toEqual([]);
//     });
//   });
// });


// No início do arquivo de teste
import request from 'supertest';
import app from '../../app';  // Certifique-se de que o caminho está correto

// Mockando o módulo Invoice
jest.mock('../../models/Invoice', () => ({
  __esModule: true, // Isto permite o mock de módulos ES6
  default: {
    findAll: jest.fn().mockResolvedValue([]),
    findByPk: jest.fn().mockResolvedValue(null),
  }
}));

describe('Invoice Controller', () => {
  describe('extractAndSaveInvoices', () => {
    it('should return 400 if no file is provided', async () => {
      const res = await request(app).post('/api/invoices/extract-invoice').send();
      expect(res.status).toBe(400);
      expect(res.body.message).toBe('No file provided');
    });
  });

  describe('getAllInvoices', () => {
    it('should return all invoices when no client number is specified', async () => {
      const res = await request(app).get('/api/invoices/list');
      expect(res.status).toBe(200);  // Certifique-se de que o controller esteja de fato retornando 200
      expect(res.body).toEqual([]);
    });
  });
});

