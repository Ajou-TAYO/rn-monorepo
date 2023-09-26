import { RedisService } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';
import * as net from 'net';

@Injectable()
export class TcpServerService {
  private server: net.Server;

  constructor(private readonly redisService: RedisService) {
    this.server = new net.Server();
    const redisClient = this.redisService.getClient();

    this.server.on('connection', (socket) => {
      console.log('Client connected');

      socket.on('data', async (data) => {
        const str = data.toString().split(',');
        if (str.length > 3) {
          await redisClient.set(
            'bus' + str[0].padStart(2, '0'),
            str[2] + ',' + str[3],
          );
        } else {
          await redisClient.set(
            'bus' + str[0].padStart(2, '0'),
            '37.28148,127.04353',
          );
        }
        console.log(
          `Received data from ${str[0]}, when ${str[1]}: ${
            str[3] ? str[2] + ',' + str[3] : str[2]
          }`,
        );
      });

      socket.on('end', () => {
        console.log('Client disconnected');
      });
    });
  }

  start(port: number) {
    this.server.listen(port, () => {
      console.log(`TCP server is listening on port ${port}`);
    });
  }
}
