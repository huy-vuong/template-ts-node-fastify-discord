import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { getHello } from 'template-ts-node-fastify/hello';

export function get(fastify: FastifyInstance) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    reply.send({
      message: getHello(fastify.config.HELLO),
      method: request.method,
      url: request.url,
      query: request.query,
      headers: request.headers,
    });
  };
}

export function post(fastify: FastifyInstance) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    reply.send({
      message: getHello(fastify.config.HELLO),
      method: request.method,
      url: request.url,
      query: request.query,
      headers: request.headers,
      body: request.body,
    });
  };
}
