import { RequestHandler } from 'express';

/**
 * @description função para middlewares
 * @param {middlewares} - middlewares
 * @return array
 */
export const compose = (...middlewares: RequestHandler[]):RequestHandler[] => {
  return middlewares;
}