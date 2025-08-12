import { DataSource, DataSourceOptions } from 'typeorm';

export const AppDataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'nestjs-api-practica-1-db',
  entities: [__dirname + '/../**/*.entity.ts'],
  migrations: [__dirname + '/../migrations/*.ts'],
  synchronize: false,
  logging: true,
};

export const AppDataSource = new DataSource(AppDataSourceOptions);
