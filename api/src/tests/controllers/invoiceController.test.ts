import request from 'supertest';
import app from '../../app';

jest.mock('../../models/Invoice', () => ({
  __esModule: true,
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
      expect(res.body.message).toBe('Nenhum arquivo enviado!');
    });
  });

  describe('getAllInvoices', () => {
    it('should return all invoices when no client number is specified', async () => {
      const res = await request(app).get('/api/invoices/list');
      expect(res.status).toBe(200);
      expect(res.body).toEqual([]);
    });
  });
});