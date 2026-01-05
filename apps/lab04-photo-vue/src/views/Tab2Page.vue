<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Photo Gallery</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Photo Gallery นายณัฐพัฒน์ แสนตรี 663380012-6</ion-title>
        </ion-toolbar>
      </ion-header>

      <!-- CHANGE: Add the floating action button -->
      <div class="ion-padding">
        <strong>โดย นายณัฐพัฒน์ แสนตรี รหัส 663380012-6</strong>
      </div>
      <ion-fab vertical="bottom" horizontal="center" slot="fixed">
        <ion-fab-button @click="addNewToGallery">
          <ion-icon :icon="camera"></ion-icon>
        </ion-fab-button>
      </ion-fab>

      <!-- CHANGE: Remove or comment out <ExploreContainer /> -->
      <!-- <ExploreContainer name="Tab 2 page" /> -->
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { camera } from 'ionicons/icons';
import { IonPage, IonHeader, IonFab, IonFabButton, IonIcon, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonImg } from '@ionic/vue';
import { usePhotoGallery } from '@/composables/usePhotoGallery';

const { addNewToGallery } = usePhotoGallery();
</script>