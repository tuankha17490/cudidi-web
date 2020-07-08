import process from "process"
import dotenv from "dotenv"
dotenv.config({ silent: process.env.NODE_ENV === 'production' });
import knexfile from '../../knexfile'
import knex from 'knex'
const environment = process.env.ENVIRONMENT || 'development'
const config = knexfile[environment];
export default knex(config);
