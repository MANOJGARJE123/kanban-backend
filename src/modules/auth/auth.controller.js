import * as authService from './auth.service.js';

export const register = async (req, res, next) => {
  try {
    console.log('Request body', req.body);
    console.log('Content-Type', req.headers['content-type']);
    const data = await authService.register(req.body);
    res.status(201).json(data);
  } catch (error) {
    console.error('Register error:', error);
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const data = await authService.login(req.body);
    res.status(200).json(data);
  } catch (error) {
    console.error('Login error:', error);
    next(error);
  }
};

export const refresh = async (req, res, next) => {
  try {
    const data = await authService.refresh(req.body.refreshToken);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
