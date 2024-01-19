"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cookieParser = require("cookie-parser");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true }));
    app.use(cookieParser());
    const corsOptions = {
        origin: ['*'],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    };
    app.enableCors(corsOptions);
    await app.listen(3313);
}
bootstrap();
//# sourceMappingURL=main.js.map