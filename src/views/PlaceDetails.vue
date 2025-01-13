
<template>
  <ion-page>
      <ion-header>
          <ion-toolbar style="--background: #222428;">
              <ion-buttons slot="start">
                  <ion-menu-button color="primary"></ion-menu-button>
              </ion-buttons>
              <ion-title>{{ place.name }}</ion-title>
          </ion-toolbar>
      </ion-header>
      <ion-content style="--background: #1a1a1a;">
          <div class="place-details">
              <div class="place-image">
                  <img :src="place.image" alt="Place image" />
              </div>
              <div class="place-info">
                  <h2>{{ place.name }}</h2>
                  <p><strong>Data: </strong> {{ place.date }}</p>
                  <p><strong>Lokalizacja: </strong> {{ place.location }}</p>
                  <p><strong>Opis: </strong>{{ place.description }}</p>
              </div>
              <button class="back-button" @click="goBack">Wróć</button>
          </div>
      </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton, IonButton } from '@ionic/vue';

export default {
  components: {
      IonPage,
      IonHeader,
      IonToolbar,
      IonTitle,
      IonButtons,
      IonMenuButton,
      IonButton,
  },
  props: {
      name: {
          type: String,
          required: true,
      },
  },
  data() {
      return {
          place: {}
      }
  },
  created() {
      const placeData = this.$route.query.place;
      if (placeData) {
          this.place = JSON.parse(placeData);
      }
  },
  methods: {
      goBack() {
          this.$router.push({ name: 'PlacesList' });
      },
  },
};
</script>

<style scoped>
ion-title {
color: #abaaaa;
}

.place-details {
  padding: 20px;
  text-align: center;
}
.place-image img {
  width: 300px;
  height: auto;
  border-radius: 20px;
}

.place-info h2 {
  font-size: 18px;
  font-weight: bold;
  color: #666;
}

.place-info p {
  color: #666;
  font-size: 16px;
  padding: 0px 20px;
}

.back-button {
  padding: 10px 20px;
  font-size: 18px;
  background-color: #353131;
  color: white;
  border-radius: 12px;
  transition: transform 0.3s ease;
}

.back-button:hover {
  transform: scale(1.1);
}
</style>