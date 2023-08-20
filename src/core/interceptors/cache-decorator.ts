import { CustomDecorator, SetMetadata } from "@nestjs/common";
import { CACHE_ACTION_METADATA, CACHE_EVICT_METADATA } from "./cache.constants";

export const CacheEvict = (
  ...cacheEvictKeys: string[]
): CustomDecorator<string> => SetMetadata(CACHE_EVICT_METADATA, cacheEvictKeys);

export const CacheAction = (cacheActions: string): CustomDecorator<string> =>
  SetMetadata(CACHE_ACTION_METADATA, cacheActions);
