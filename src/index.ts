import dotenv from 'dotenv';
import express from 'express';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import createApolloServer from './graphql';
import UserService from './services/user/user';
dotenv.config();

async function init() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(cors<cors.CorsRequest>());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use('/graphql', expressMiddleware(await createApolloServer(), {
    context: async ({ req }) => {
      const token = req.headers["token"] || '';
      const decoded = UserService.decodeToken(token as string);
      interface CustomRequest extends express.Request {
        userId: string;
      }
      const customReq = req as CustomRequest;
      customReq.userId = decoded.id;
      return { req: customReq };
    }
  }));

  app.get('/', (req, res) => {
    res.json({ message: 'Server is up and running' });
  });

  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });

}

init()