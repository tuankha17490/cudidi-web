import redis from "redis"
import jwt_redis from "jwt-redis"
const redisClient = redis.createClient()
const jwtr = new jwt_redis(redisClient)

export default jwtr