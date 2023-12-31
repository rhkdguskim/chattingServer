export interface BcryptService {
  compare(cmp1: string, cmp2: string): boolean;
  hash(payload: string): string;
}
