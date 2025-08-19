"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const seeder_module_1 = require("./seeder/seeder.module");
const seeder_service_1 = require("./seeder/seeder.service");
async function bootstrap() {
    const app = await core_1.NestFactory.create(seeder_module_1.SeederModule);
    const seeder = app.get(seeder_service_1.SeederService);
    await seeder.seed();
    await app.close();
}
bootstrap();
//# sourceMappingURL=seeder.js.map