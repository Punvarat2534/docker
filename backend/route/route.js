import scholar_controller from './../controller/scholar_controller.js'
import auth_controller from './../controller/auth_controller.js'
import jwtValidate  from '../config/jwt.js';

import cookie from '@fastify/cookie'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const scholar = new scholar_controller();
const Login = new auth_controller();


async function routes (fastify, options) {

    fastify.get('/', async (request, reply) => {
      return "Welcome fastify node 2024";
    });

    fastify.get('/all/:page',scholar.all)
    fastify.post('/create',scholar.create);
    fastify.post('/update',scholar.update);
    fastify.post('/login',Login.login);

    fastify.delete('/delete/:code',scholar.delete);
    fastify.get('/search/:text/:typ/:sts',scholar.search);
    fastify.get('/pagecount',scholar.pagecount);
    fastify.get('/detail/:code',scholar.detail);  
    fastify.get('/scholarcode',scholar.scholarcode);
    fastify.get('/statuscnt',scholar.statuscnt);
    fastify.get('/track/:text',scholar.track);

    fastify.get("/api/me",{credentials: 'include'},Login.me);
    fastify.post("/logout",Login.logout);

    /*fastify.post('/create',{onRequest : jwtValidate },Book.create);
    //fastify.get('/all/:page',{onRequest : jwtValidate },Book.all);
    fastify.get('/all/:page',Book.all);
    fastify.get('/search/:text/:page',Book.search);
    fastify.get('/pagecount',Book.pagecount);
    fastify.post('/update',{onRequest : jwtValidate }, Book.update);

    fastify.get('/detail/:isbn',Login.test_api);
    fastify.delete('/delete/:isbn',Book.delete);
    
    fastify.post('/upload',Book.upload);
    fastify.get('/isbn/:isbn',Book.checkisbn);
    
    fastify.post('/imgupdate',Book.img_update);
    fastify.post('/profile',Book.upload);

    fastify.post('/login',Login.login);*/

   /* fastify.post('/profile',async function(req, reply) {
  
      //console.log(files.file);
      
      const data = await req.file();
      //const data = req.body.myfiles;
      data.file 
      data.fields
      data.fieldname
      data.filename
      data.encoding
      data.mimetype
    
      const storedFile = fs.createWriteStream('./uploads/'+data.filename);
      await pump(data.file, storedFile);
      
      //reply.send(req.body.isbn.value);
      reply.send(data.fields.isbn.value);
    
    });*/

}
  
export default routes