const request = require('supertest');
const express = require('express');
const app = express();

// Importa el modelo de Producto y la configuración de rutas
const Product = require('../models/Product');
const productRoutes = require('../routes/productRoutes'); // Asegúrate de que las rutas estén configuradas correctamente

// Mock del modelo de Producto y configuración de la aplicación Express
jest.mock('../models/Product', () => ({
  find: jest.fn(),
}));

// Configura la aplicación Express con las rutas
app.use(express.json());
app.use('/', productRoutes);

describe('Product Routes', () => {
  it('should respond with JSON product data on successful retrieval', async () => {
    // Configura el mock para devolver un arreglo simulado de productos
    const mockProducts = [
      {
        _id: 'product1',
        name: 'Product 1',
        price: 10,
        // Otros campos del producto
      },
      {
        _id: 'product2',
        name: 'Product 2',
        price: 20,
        // Otros campos del producto
      },
      // Otros productos simulados
    ];
    Product.find.mockResolvedValue(mockProducts);

    const response = await request(app).get('/');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockProducts);
  });

  it('should respond with a 400 status code and an error message on retrieval error', async () => {
    // Configura el mock para arrojar un error simulado
    const errorMessage = 'Error retrieving products';
    Product.find.mockRejectedValue(new Error(errorMessage));

    const response = await request(app).get('/');

    expect(response.status).toBe(400);
    expect(response.text).toBe(errorMessage);
  });
});
