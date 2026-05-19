import { UnavailabilityError } from 'expo-modules-core';
import { Platform } from 'react-native';

import { Album } from './Album';
import ExpoMediaLibraryNext from '../native';
import type { AssetInfo, Location, MediaSubtype, MediaType, Shape } from '../types';

/**
 * Represents a media asset in the device media library.
 */
export class Asset extends ExpoMediaLibraryNext.Asset {
  /**
   * Reinitializes an instance of an asset with a given ID.
   * @param id - The asset identifier. On Android, this is a `content://` URI. On iOS, this is a `PHAsset` local identifier URI.
   */
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(id: string) {
    super(id);
  }

  /**
   * Asset identifier.
   * Can be used to re-instantiate an [`Asset`](#asset) later.
   */
  declare id: string;

  /**
   * Gets the asset creation time.
   * @returns A promise resolving to a timestamp in seconds, or `null` when the value is unavailable.
   */
  getCreationTime(): Promise<number | null> {
    return super.getCreationTime();
  }

  /**
   * Gets the asset duration.
   * @returns A promise resolving to the duration in seconds, or `null` when the value is unavailable.
   */
  getDuration(): Promise<number | null> {
    return super.getDuration();
  }

  /**
   * Gets the asset filename.
   * @returns A promise resolving to the asset filename.
   */
  getFilename(): Promise<string> {
    return super.getFilename();
  }

  /**
   * Gets the asset height.
   * @returns A promise resolving to the asset height in pixels.
   */
  getHeight(): Promise<number> {
    return super.getHeight();
  }

  /**
   * Gets the asset media type.
   * @returns A promise resolving to the asset media type.
   */
  getMediaType(): Promise<MediaType> {
    return super.getMediaType();
  }

  /**
   * Gets the asset modification time.
   * @returns A promise resolving to a timestamp in seconds, or `null` when the value is unavailable.
   */
  getModificationTime(): Promise<number | null> {
    return super.getModificationTime();
  }

  /**
   * Gets the asset dimensions.
   * @returns A promise resolving to the asset shape, or `null` when the value is unavailable.
   */
  getShape(): Promise<Shape | null> {
    return super.getShape();
  }

  /**
   * Gets the asset URI.
   * @returns A promise resolving to the asset URI.
   */
  getUri(): Promise<string> {
    return super.getUri();
  }

  /**
   * Gets the asset width.
   * @returns A promise resolving to the asset width in pixels.
   */
  getWidth(): Promise<number> {
    return super.getWidth();
  }

  /**
   * Gets complete information about the asset.
   * @returns A promise resolving to an [`AssetInfo`](#assetinfo) object.
   */
  getInfo(): Promise<AssetInfo> {
    return super.getInfo();
  }

  /**
   * Gets the asset location.
   * @returns A promise resolving to the asset location, or `null` when location is unavailable.
   */
  getLocation(): Promise<Location | null> {
    return super.getLocation();
  }

  /**
   * Gets the asset EXIF metadata.
   * @returns A promise resolving to a map of EXIF tags.
   */
  getExif(): Promise<{ [key: string]: any }> {
    return super.getExif();
  }

  /**
   * Deletes the asset from the media library.
   * @returns A promise resolving once the deletion has completed.
   */
  delete(): Promise<void> {
    return super.delete();
  }

  /**
   * Gets albums that contain the asset.
   * @returns A promise resolving to an array of [`Album`](#album) objects.
   */
  async getAlbums(): Promise<Album[]> {
    const natives = await super.getAlbums();
    return natives.map((a) => new Album(a.id));
  }

  /**
   * Creates an asset from a local file path.
   * @param filePath - Local file URI of the asset to create.
   * @param album - Optional album to add the created asset to.
   * @returns A promise resolving to the created [`Asset`](#asset).
   */
  static async create(filePath: string, album?: Album): Promise<Asset> {
    const native = await super.create(filePath, album);
    return new Asset(native.id);
  }

  /**
   * Deletes multiple assets from the media library.
   * @param assets - Assets to delete.
   * @returns A promise resolving once deletion has completed.
   */
  static async delete(assets: Asset[]): Promise<void> {
    return await super.delete(assets);
  }

  /**
   * Gets whether the asset is marked as a favorite.
   * On iOS, this checks if the asset is part of the system "Favorites" smart album.
   * @returns A promise resolving to `true` if the asset is marked as favorite, otherwise `false`.
   * @platform ios
   */
  getFavorite(): Promise<boolean> {
    if (Platform.OS !== 'ios') {
      throw new UnavailabilityError('MediaLibrary', 'getFavorite is only available on iOS');
    }
    return super.getFavorite();
  }

  /**
   * Marks or unmarks the asset as a favorite. On iOS, this adds or removes the asset from the system "Favorites" smart album.
   * @param isFavorite - Whether the asset should be marked as favorite.
   * @returns A promise that resolves once the favorite state has been updated.
   * @platform ios
   */
  setFavorite(isFavorite: boolean): Promise<void> {
    if (Platform.OS !== 'ios') {
      throw new UnavailabilityError('MediaLibrary', 'setFavorite is only available on iOS');
    }
    return super.setFavorite(isFavorite);
  }

  /**
   * Gets the media subtypes of the asset, describing specific variations such as Live Photo, panorama, HDR, etc.
   * @returns A promise resolving to an array of [`MediaSubtype`](#mediasubtype) values.
   * @platform ios
   */
  getMediaSubtypes(): Promise<MediaSubtype[]> {
    if (Platform.OS !== 'ios') {
      throw new UnavailabilityError('MediaLibrary', 'getMediaSubtypes is only available on iOS');
    }
    return super.getMediaSubtypes();
  }

  /**
   * Gets the URI of the paired video for a Live Photo asset.
   * The video is extracted to a temporary file.
   * @returns A promise resolving to the paired video URI, or `null` if the asset is not a Live Photo or no paired video is available.
   * @platform ios
   */
  getLivePhotoVideoUri(): Promise<string | null> {
    if (Platform.OS !== 'ios') {
      throw new UnavailabilityError(
        'MediaLibrary',
        'getLivePhotoVideoUri is only available on iOS'
      );
    }
    return super.getLivePhotoVideoUri();
  }

  /**
   * Gets whether the asset is stored in iCloud and not available locally.
   * This does not trigger a download of the asset.
   * @returns A promise resolving to `true` if the asset is stored in iCloud and unavailable locally, otherwise `false`.
   * @platform ios
   */
  getIsInCloud(): Promise<boolean> {
    if (Platform.OS !== 'ios') {
      throw new UnavailabilityError('MediaLibrary', 'getIsInCloud is only available on iOS');
    }
    return super.getIsInCloud();
  }

  /**
   * Gets the EXIF display orientation of the asset.
   * Only applicable for assets with media type `MediaType.IMAGE`.
   * @returns A promise resolving to the EXIF orientation value, or `null` when unavailable.
   * @platform ios
   */
  getOrientation(): Promise<number | null> {
    if (Platform.OS !== 'ios') {
      throw new UnavailabilityError('MediaLibrary', 'getOrientation is only available on iOS');
    }
    return super.getOrientation();
  }
}
