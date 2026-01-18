import React from 'react';
import { camera } from 'ionicons/icons';
import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonFab, 
  IonFabButton, 
  IonIcon, 
  IonGrid, 
  IonRow, 
  IonCol, 
  IonImg 
} from '@ionic/react';

import { usePhotoGallery } from '../src/hooks/usePhotoGallery';

import './Tab2.css';

const Tab2: React.FC = () => {
  const { photos, addNewToGallery } = usePhotoGallery();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Photo Gallery</IonTitle>
          {/* เก็บชื่อและรหัสนักศึกษาของคุณไว้เหมือนเดิม */}
          <IonTitle size="small">Lab 05 - โดย นายณัฐพัฒน์ แสนตรี 663380012-6</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Photo Gallery</IonTitle>
            <IonTitle size="small">Lab 05 - โดย นายณัฐพัฒน์ แสนตรี 663380012-6</IonTitle>
          </IonToolbar>
        </IonHeader>

        {/* CHANGE 4: เพิ่ม Grid สำหรับแสดงรูปภาพที่ถ่ายมา */}
        <IonGrid>
          <IonRow>
            {photos.map((photo, index) => (
              <IonCol size="6" key={index}>
                <IonImg src={photo.webviewPath} />
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>

        <IonFab vertical="bottom" horizontal="center" slot="fixed">
          <IonFabButton onClick={() => addNewToGallery()}>
            <IonIcon icon={camera}></IonIcon>
          </IonFabButton>
        </IonFab>

      </IonContent>
    </IonPage>
  );
};

export default Tab2;