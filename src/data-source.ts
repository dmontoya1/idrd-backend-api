import { DataSource } from 'typeorm';
import { join } from 'path';

export const AppDataSource = new DataSource({
  type: 'postgres', // ajusta según tu base de datos
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '',
  database: 'idrd',
  entities: [join(__dirname, '**', '*.entity{.ts,.js}')],
  migrations: [join(__dirname, 'migrations', '**', '*{.ts,.js}')],
  synchronize: false,
  logging: true,
});