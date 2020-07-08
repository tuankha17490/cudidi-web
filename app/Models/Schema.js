import knex from 'knex'
import connection from "../../knexfile";
import { Model } from "objection";
const knexConnection = knex(connection.development)
Model.knex(knexConnection)

export default Model