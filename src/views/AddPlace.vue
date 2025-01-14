<template>
  <ion-modal :is-open="isOpen" @ionModalDidDismiss="closeModal" @ionModalWillPresent="getLocation">
    <ion-header>
      <ion-toolbar style="--background: #222428;">
        <ion-title>Dodaj miejsce</ion-title>
        <ion-buttons slot="end">
          <button class="close-button" @click="closeModal">
            <ion-icon :icon="closeIcon"></ion-icon>
          </button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content style="--background: #1a1a1a;">
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="name">Nazwa miejsca</label>
          <input id="name" v-model="place.name" required />
        </div>
        <div class="form-group">
          <label for="date">Data</label>
          <input id="date" type="date" v-model="place.date" disabled readonly />
        </div>
        <div class="form-group">
          <label for="location">Lokalizacja</label>
          <input id="location" type="text" v-model="place.location" placeholder="Wczytywanie lokalizacji..." disabled />
        </div>
        <div class="form-group">
          <label for="description">Opis</label>
          <textarea id="description" v-model="place.description" required></textarea>
        </div>
        <div class="form-group">
          <label for="image">Dodaj zdjęcie</label>
          <div class="file-upload-wrapper">
            <input id="image" type="file" @change="onFileChange" class="file-input" />
            <button type="button" class="file-button" @click="triggerFileInput">
              <ion-icon :icon="ImageIcon"></ion-icon>
            </button>
            <button type="button" class="camera-button" @click="openCamera">
              <ion-icon :icon="CameraIcon"></ion-icon>
            </button>
          </div>
        </div>
        <span v-if="file" class="file-name">Zdjęcie dodane</span>
        <button class="submit-button" type="submit">Dodaj</button>
      </form>
    </ion-content>
  </ion-modal>
</template>

<script>
import { IonModal, IonHeader, IonToolbar, IonTitle } from '@ionic/vue';
import { close as closeIcon, camera as CameraIcon, image as ImageIcon } from 'ionicons/icons';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

export default {
  components: { IonModal, IonHeader, IonToolbar, IonTitle },
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      place: {
        name: '',
        date: '',
        location: '',
        description: '',
        image: '',
      },
      file: null,
      closeIcon,
      CameraIcon,
      ImageIcon
    };
  },
  mounted() {
    const today = new Date().toISOString().split('T')[0];
    this.place.date = today;
  },
  methods: {
    closeModal() {
      this.$emit('close');
      this.resetForm();
    },
    triggerFileInput() {
      document.getElementById('image').click();
    },
    onFileChange(event) {
      this.file = event.target.files[0];
    },
    async openCamera() {
      const image = await Camera.getPhoto({
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
      });
      this.file = image.dataUrl;
    },
    resetForm() {
      this.place = {
        name: '',
        date: this.place.date,
        location: '',
        description: '',
        image: '',
      };
      this.file = null;
    },
    async submitForm() {
      if (!this.file) {
        alert("Zrób zdjęcie lub wybierz z galerii.");
        return;
      }
      if (this.file instanceof Blob) {
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
          this.place.image = e.target.result;
          this.$emit('add-place', { ...this.place });
          this.resetForm();
          this.closeModal();
        };
        fileReader.readAsDataURL(this.file);
      } else if (typeof this.file === 'string') {
        this.place.image = this.file;
        this.$emit('add-place', { ...this.place });
        this.resetForm();
        this.closeModal();
      }
    },
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            this.fetchAddressFromCoordinates(latitude, longitude);
          },
          (error) => {
            console.error("Błąd geolokalizacji: ", error);
            alert("Nie udało się uzyskać lokalizacji.");
          }
        );
      } else {
        alert("Geolokalizacja nie jest wspierana w tej przeglądarce.");
      }
    },
    async fetchAddressFromCoordinates(latitude, longitude) {
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1`);
        const data = await response.json();
        if (data && data.address) {
          const city = data.address.city || data.address.town || data.address.village;
          const country = data.address.country;
          this.place.location = `${city}, ${country}`;
        }
      } catch (error) {
        console.error("Błąd podczas pobierania adresu:", error);
        this.place.location = "Nie udało się uzyskać lokalizacji";
      }
    }
  },
};
</script>

<style scoped>
ion-title {
  color: #abaaaa;
}

form {
  padding: 20px;
}

ion-item {
  margin-bottom: 16px;
}

ion-footer {
  padding: 20px;
}

.close-button {
  padding: 5px 10px;
  font-size: 24px;
  color: white;
  background-color: transparent;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.close-button:hover {
  transform: scale(1.2);
}

.modal-content {
  margin-top: 15px;
}

.form-group {
  margin-bottom: 15px;
  color: white;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #5c5c5c;
}

.form-group input,
.form-group textarea {
  background-color: #413d3d;
  width: 100%;
  padding: 8px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  resize: none;
}

.file-upload-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
}

.file-input {
  display: none;
}

.file-button,
.camera-button {
  background-color: #413d3d;
  color: white;
  padding: 10px 15px;
  border-radius: 12px;
  cursor: pointer;
  border: none;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.file-button:hover,
.camera-button:hover {
  background-color: #575757;
}

.file-name {
  margin-top: 10px;
  font-size: 16px;
  color: #ccc;
  font-style: italic;
}

.submit-button {
  width: 100%;
  padding: 10px;
  background-color: #413d3d;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #575757;
}
</style>