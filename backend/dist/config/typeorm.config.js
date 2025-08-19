"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmConfig = void 0;
const path_1 = require("path");
const typeOrmConfig = (configService) => {
    return {
        type: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: parseInt(configService.get('DATABASE_PORT') || '5432', 10),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASS'),
        database: configService.get('DATABASE_NAME'),
        ssl: {
            rejectUnauthorized: false
        },
        entities: [(0, path_1.join)(__dirname + '../../**/*.entity.{js,ts}')],
        synchronize: true
    };
};
exports.typeOrmConfig = typeOrmConfig;
//# sourceMappingURL=typeorm.config.js.map