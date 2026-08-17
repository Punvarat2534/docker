import Fastify from 'fastify';
import multipart from '@fastify/multipart';
import Route from './route/route.js';
import cors from '@fastify/cors';
import dotenv from 'dotenv';
import jwt from './route/jwt.js';
import util from 'util';
import { pipeline } from 'stream';
import fastifyStatic from "@fastify/static";
import path from 'path';
import { fileURLToPath } from 'url';
import frombody from '@fastify/formbody';

import cookie from '@fastify/cookie'
import bcrypt from 'bcrypt'


const pump = util.promisify(pipeline);
const fastify = Fastify({logger: false});

const port = process.env.PORT || 5000;
const host = '0.0.0.0';

dotenv.config();
//console.log('JWT_SECRET:', process.env.JWT_SECRET);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

fastify.register(fastifyStatic, { root: path.join(__dirname, '/uploads') })
.get('/images/:name', async (req, reply) => {
    await reply.sendFile(req.params.name);
});

fastify.register(cookie)

fastify.register(multipart, {
  attachFieldsToBody: 'keyValues'
})
fastify.register(Route);
fastify.register(jwt);
fastify.register(frombody);

fastify.register(cors, {
    origin: 'http://localhost:3000',
    allowedHeaders: ['Origin', 'X-Requested-With', 'Accept', 'Content-Type', 'Authorization','x-api-key'],
    methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE']
});

const start = async () => {
    try {
      fastify.listen({ port,host }, function (err, address) {
        if (err) {
          fastify.log.error(err)
          process.exit(1)
        }
      });
    } catch (err) {
      fastify.log.error(err)
      process.exit(1)
    }
  }
  
start();