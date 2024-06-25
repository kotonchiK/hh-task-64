import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import {globalValidationPipe} from "./infrastructure/pipes/globalValidationPipe";

async function startApp():Promise<void> {
  const PORT = 3000
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(globalValidationPipe)

  await app.listen(PORT, () => console.log(`Server started on port - ${PORT}`))
}

startApp()