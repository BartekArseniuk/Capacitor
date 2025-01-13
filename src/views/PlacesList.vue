<template>
  <ion-page>
    <ion-header>
      <ion-toolbar style="--background: #222428;">
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>Lista miejsc</ion-title>
        <ion-buttons slot="end">
          <button class="add-button" @click="addPlace">
            <ion-icon :icon="addIcon"></ion-icon>
          </button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content style="--background: #1a1a1a;">
      <div class="places-list">
        <p class="no-places" v-if="places == 0">Brak danych</p>
        <div class="place-item" v-for="(place, index) in places" :key="index">
          <div class="place-thumbnail">
            <img :src="place.image" alt="Obrazek miejsca" />
          </div>
          <div class="place-info">
            <h2>{{ place.name }}</h2>
            <p>Data: {{ place.date }}</p>
          </div>
          <div class="place-actions">
            <button class="delete-button" @click="removePlace(index)">
              <ion-icon :icon="trashIcon"></ion-icon>
            </button>
            <button class="details-button" @click="viewDetails(place)">
              <ion-icon :icon="arrowIcon"></ion-icon>
            </button>
          </div>
        </div>
      </div>
    </ion-content>

    <AddPlace :isOpen="isModalOpen" @close="isModalOpen = false" @add-place="handleAddPlace" />
  </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton } from '@ionic/vue';
import { trash as trashIcon, add as addIcon, arrowForward as arrowIcon } from 'ionicons/icons';
import AddPlace from './AddPlace.vue';

export default {
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonMenuButton,
    AddPlace
  },
  data() {
    return {
      isModalOpen: false,
      trashIcon,
      addIcon,
      arrowIcon,
      places: []
    };
  },
  created() {
    const storedPlaces = localStorage.getItem('places');
    if (storedPlaces) {
      this.places = JSON.parse(storedPlaces);
    }
  },
  methods: {
    viewDetails(place) {
      this.$router.push({ name: 'PlaceDetails', params: { name: place.name }, query: { place: JSON.stringify(place) } });
    },
    addPlace() {
      this.isModalOpen = true;
    },
    handleAddPlace(newPlace) {
      this.places.push(newPlace);
      this.isModalOpen = false;
      localStorage.setItem('places', JSON.stringify(this.places));
    },
    removePlace(index) {
      this.places.splice(index, 1);
      localStorage.setItem('places', JSON.stringify(this.places));
    },
  }
};
</script>

<style scoped>
ion-title {
  color: #abaaaa;
}

.no-places {
  text-align: center;
}

.places-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px;
}

.place-item {
  display: flex;
  align-items: center;
  border-radius: 15px;
  padding: 10px;
  margin: 0 10px;
  background-color: #292727;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.place-thumbnail {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  overflow: hidden;
  margin-right: 10px;
}

.place-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.place-info h2 {
  font-size: 18px;
  font-weight: bold;
  margin: 0;
  color: #666;
}

.place-info p {
  margin: 4px 0 0;
  color: #666;
  font-size: 14px;
}

.place-actions {
  margin-left: auto;
  display: flex;
  gap: 8px;
}

.details-button,
.add-button,
.delete-button {
  padding: 5px 10px;
  font-size: 18px;
  color: white;
  background-color: transparent;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.add-button {
  font-size: 24px;
}

.details-button:hover,
.add-button:hover,
.delete-button:hover {
  transform: scale(1.2);
}
</style>