import type { NativeAsset } from './NativeAsset.types';

export declare class NativeAlbum {
  constructor(id: string);
  id: string;
  getAssets(): Promise<NativeAsset[]>;
  getTitle(): Promise<string>;
  delete(): Promise<void>;
  add(assets: NativeAsset | NativeAsset[]): Promise<void>;
  removeAssets(assets: NativeAsset[]): Promise<void>;
  static create(
    name: string,
    assetsRefs: string[] | NativeAsset[],
    moveAssets?: boolean
  ): Promise<NativeAlbum>;
  static delete(albums: NativeAlbum[], deleteAssets?: boolean): Promise<void>;
  static get(title: string): Promise<NativeAlbum | null>;
  static getAll(): Promise<NativeAlbum[]>;
}
