import { RequestHandler } from 'express';

export const compose = (...middlewares: RequestHandler[]):RequestHandler[] => {
  return middlewares;
}