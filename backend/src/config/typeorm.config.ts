import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { join } from 'path';

export const typeOrmConfig = (configService: ConfigService): TypeOrmModuleOptions => {
  /* console.log('DB HOST:', configService.get('DATABASE_HOST'));
  console.log('DB USER:', configService.get('DATABASE_USER')); */

  return {
    type: 'postgres',
    host: configService.get('DATABASE_HOST'),
    port: parseInt(configService.get('DATABASE_PORT') || '5432', 10),
    username: configService.get('DATABASE_USER'),
    password: configService.get('DATABASE_PASS'),
    database: configService.get('DATABASE_NAME'),
    ssl: {
      rejectUnauthorized: false // Necesario para Render
    },
    //logging: true,
    // Registra las entidades, creando las tablas o colecciones en caso de no existir dentro de la db
    entities: [join(__dirname + '../../**/*.entity.{js,ts}')],
    synchronize: true //NO EMPLEAR EN PRODUCCION DIRECTAMENTE, SOLO DESARROLLO
  };
};
