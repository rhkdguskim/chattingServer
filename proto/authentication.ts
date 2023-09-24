/* eslint-disable */
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "authentication";

export interface HeroById {
  id: number;
}

export interface Hero {
  id: number;
  name: string;
}

function createBaseHeroById(): HeroById {
  return { id: 0 };
}

export const HeroById = {
  encode(message: HeroById, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).int32(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HeroById {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHeroById();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.id = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): HeroById {
    return { id: isSet(object.id) ? Number(object.id) : 0 };
  },

  toJSON(message: HeroById): unknown {
    const obj: any = {};
    if (message.id !== 0) {
      obj.id = Math.round(message.id);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<HeroById>, I>>(base?: I): HeroById {
    return HeroById.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<HeroById>, I>>(object: I): HeroById {
    const message = createBaseHeroById();
    message.id = object.id ?? 0;
    return message;
  },
};

function createBaseHero(): Hero {
  return { id: 0, name: "" };
}

export const Hero = {
  encode(message: Hero, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).int32(message.id);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Hero {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHero();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.id = reader.int32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.name = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Hero {
    return { id: isSet(object.id) ? Number(object.id) : 0, name: isSet(object.name) ? String(object.name) : "" };
  },

  toJSON(message: Hero): unknown {
    const obj: any = {};
    if (message.id !== 0) {
      obj.id = Math.round(message.id);
    }
    if (message.name !== "") {
      obj.name = message.name;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Hero>, I>>(base?: I): Hero {
    return Hero.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Hero>, I>>(object: I): Hero {
    const message = createBaseHero();
    message.id = object.id ?? 0;
    message.name = object.name ?? "";
    return message;
  },
};

export interface HeroesService {
  FindOne(request: HeroById): Promise<Hero>;
}

export const HeroesServiceServiceName = "authentication.HeroesService";
export class HeroesServiceClientImpl implements HeroesService {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || HeroesServiceServiceName;
    this.rpc = rpc;
    this.FindOne = this.FindOne.bind(this);
  }
  FindOne(request: HeroById): Promise<Hero> {
    const data = HeroById.encode(request).finish();
    const promise = this.rpc.request(this.service, "FindOne", data);
    return promise.then((data) => Hero.decode(_m0.Reader.create(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
