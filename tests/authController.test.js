
// Mock del modelo de usuario y configuración de la aplicación Express
const request = require('supertest');
const express = require('express');
const app = express();

// Importa los modelos y las rutas
const User = require('../models/User');
const Order = require('../models/Order');
const userRoutes = require('../routes/userRoutes');

// Mock del modelo de Usuario y configuración de la aplicación Express
jest.mock('../models/User', () => ({
  create: jest.fn(),
  findByCredentials: jest.fn(),
  find: jest.fn(),
  findById: jest.fn(),
}));
jest.mock('../models/Order', () => ({
  // Configura mocks para el modelo Order si es necesario
}));

// Configura la aplicación Express con las rutas
app.use(express.json());
app.use('/', userRoutes);

describe('User Routes', () => {
  // Pruebas para la ruta de registro '/signup'
  it('should respond with JSON user data on successful signup', async () => {
    // Configura el mock para devolver un usuario simulado
    const mockUser = {
      _id: 'mockUserId',
      name: 'Test User',
      email: 'test@example.com',
      // Otros campos del usuario
    };
    User.create.mockResolvedValue(mockUser);

    const response = await request(app)
      .post('/signup')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUser);
  });

  it('should respond with a 400 status code and an error message on signup error', async () => {
    // Configura el mock para arrojar un error simulado
    const errorMessage = 'User registration error';
    User.create.mockRejectedValue(new Error(errorMessage));

    const response = await request(app)
      .post('/signup')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      });

    expect(response.status).toBe(400);
    expect(response.text).toBe(errorMessage);
  });

  // Pruebas para la ruta de inicio de sesión '/login'
  it('should respond with JSON user data on successful login', async () => {
    // Configura el mock para devolver un usuario simulado
    const mockUser = {
      _id: 'mockUserId',
      name: 'Test User',
      email: 'test@example.com',
      // Otros campos del usuario
    };
    User.findByCredentials.mockResolvedValue(mockUser);

    const response = await request(app)
      .post('/login')
      .send({
        email: 'test@example.com',
        password: 'password123',
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUser);
  });

  it('should respond with a 400 status code and an error message on login error', async () => {
    // Configura el mock para arrojar un error simulado
    const errorMessage = 'Invalid credentials';
    User.findByCredentials.mockRejectedValue(new Error(errorMessage));

    const response = await request(app)
      .post('/login')
      .send({
        email: 'test@example.com',
        password: 'wrongPassword',
      });

    expect(response.status).toBe(400);
    expect(response.text).toBe(errorMessage);
  });

});
