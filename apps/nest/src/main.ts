import { bootstrap } from '@/bootstrap';

const port = process.env.NODE_SERVER_PORT

bootstrap()
  .then((app) => app.listen(port))
  .then(() => {
    console.log(`server running on port ${port}`);
  })
  .catch((err) => {
    console.error('An error occurred', err);
    process.exit(1);
  });
