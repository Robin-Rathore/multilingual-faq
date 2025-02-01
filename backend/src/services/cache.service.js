const redis = require('redis');

class CacheService {
  constructor() {
    this.client = redis.createClient({
      url: process.env.REDIS_URL || 'redis://localhost:6379'
    });

    this.client.on('error', (err) => console.error('Redis Client Error', err));
    
    this.connect();
  }

  async connect() {
    await this.client.connect();
  }

  async set(key, value, options = {}) {
    return this.client.set(key, value, options);
  }

  async get(key) {
    return this.client.get(key);
  }

  async del(key) {
    return this.client.del(key);
  }
}

module.exports = new CacheService();