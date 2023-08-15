import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class AppService {
    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) { 
    }

    async set(number : number) : Promise<void> {
        return await this.cacheManager.set('key', number);
    }

    async get() : Promise<number> {
        return await this.cacheManager.get('key')
    }

    async reset() : Promise<void> {
        return await this.cacheManager.reset();
    }
  
}
