import { useState, useEffect } from 'react';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import type { Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';

import { isPlatform } from '@ionic/react';
import { Capacitor } from '@capacitor/core';

export function usePhotoGallery() {
  const [photos, setPhotos] = useState<UserPhoto[]>([]);
  const PHOTO_STORAGE = 'photos';

  useEffect(() => {
    const loadSaved = async () => {
      const { value } = await Preferences.get({ key: PHOTO_STORAGE });
      const photosInPreferences = (value ? JSON.parse(value) : []) as UserPhoto[];

      if (!isPlatform('hybrid')) {
        for (let photo of photosInPreferences) {
          const file = await Filesystem.readFile({
            path: photo.filepath,
            directory: Directory.Data,
          });
          photo.webviewPath = `data:image/jpeg;base64,${file.data}`;
        }
      }
      setPhotos(photosInPreferences);
    };
    loadSaved();
  }, []);

  const addNewToGallery = async () => {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    });

    const fileName = new Date().getTime() + '.jpeg';
    const savedFileImage = await savePicture(capturedPhoto, fileName);

    const newPhotos = [savedFileImage, ...photos];
    setPhotos(newPhotos);

    Preferences.set({ key: PHOTO_STORAGE, value: JSON.stringify(newPhotos) });
  };

  const savePicture = async (photo: Photo, fileName: string): Promise<UserPhoto> => {
    let base64Data: string;

    if (isPlatform('hybrid')) {

      const file = await Filesystem.readFile({
        path: photo.path!,
      });
      base64Data = file.data as string;
    } else {

      base64Data = await base64FromPath(photo.webPath!);
    }

    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data,
    });

    if (isPlatform('hybrid')) {

      return {
        filepath: savedFile.uri,
        webviewPath: Capacitor.convertFileSrc(savedFile.uri),
      };
    } else {

      return {
        filepath: fileName,
        webviewPath: photo.webPath,
      };
    }
  };

  return {
    photos,
    addNewToGallery,
  };
}

async function base64FromPath(path: string): Promise<string> {
  const response = await fetch(path);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject('method did not return a string');
      }
    };
    reader.readAsDataURL(blob);
  });
}

export interface UserPhoto {
  filepath: string;
  webviewPath?: string;
}