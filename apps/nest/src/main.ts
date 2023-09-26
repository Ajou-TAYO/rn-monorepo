import { bootstrap } from '@/bootstrap';
import { TcpServerService } from './config/tcpsocket/TcpSocket.service';

const port = process.env.NODE_SERVER_PORT;

bootstrap()
  .then((app) => {
    const tcpService = app.get(TcpServerService);
    tcpService.start(9001);
    app.listen(port);
  })
  .then(() => {
    console.log(`server running on port ${port}`);
  })
  .catch((err) => {
    console.error('An error occurred', err);
    process.exit(1);
  });
