import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app/app.module";
import Consul from "consul";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  const port = Number(process.env.PORT) || 3005;

  // Register the service with Consul
  const consul = new Consul({
    host:  "localhost",
    port: 8500,
  });

  const serviceId = `payment-unique-id-1`;
  const registrationDetails = {
    name: 'payment-service',
    id: serviceId,
    address: 'host.docker.internal',
    port: port,
    check:{
        name: 'payment-service-health-check',
        http: `http://host.docker.internal:${port}/api/health`,
        interval: '10s',
        timeout: '5s',
    }
  }
  await consul.agent.service.register(registrationDetails)
  process.on('SIGINT', async () => {
    await consul.agent.service.deregister(serviceId);
    process.exit();
  });

  await app.listen(port);
  console.log(`Payment service is running on http://localhost:${port} registered with Consul`);
}

bootstrap();