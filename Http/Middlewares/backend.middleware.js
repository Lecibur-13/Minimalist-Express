import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

export default function authenticateBackend(req, res, next) {
   const authHeader = req.headers.authorization;

   if (!authHeader || !authHeader.startsWith("Bearer ")) {
     res.status(401).send({ status: "fail", message: 'Unauthorized' }); 
     return;
   }

   const providedToken = authHeader.replace("Bearer ", "");

   bcrypt.compare(providedToken, process.env.API_TOKEN_HASH, (err, result) => {
     if (err) {
       res.status(500).send({
         status: "error",
         message: 'Internal Server Error'
       });
       return;
     }

     if (result) {
       next();
     } else {
       res.status(401).send({
         status: "fail",
         message: 'Unauthorized'
       });
     }
   });
};
