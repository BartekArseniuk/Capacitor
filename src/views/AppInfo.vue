<template>
    <ion-page>
        <ion-header>
            <ion-toolbar style="--background: #222428;">
                <ion-buttons slot="start">
                    <ion-menu-button color="primary"></ion-menu-button>
                </ion-buttons>
                <ion-title>O aplikacji</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content style="--background: #1a1a1a;">
            <div class="about-container">
                <h2>Capacitor</h2>
                <p>
                    Aplikacja "Capacitor" to dedykowana platforma dla miłośników podróży, którzy chcą przechowywać swoje
                    wspomnienia.
                </p>
                <p>
                    Dzięki tej aplikacji możesz zarządzać swoimi wspomnieniami z podróży, przechowując nie tylko
                    zdjęcia, ale także szczegóły dotyczące lokalizacji i czasu odwiedzenia. To idealne narzędzie, aby
                    utrwalić i porządkować niezapomniane chwile z różnych zakątków świata.
                </p>
                <div class="button-container">
                    <button class="back-button" @click="goBack">Wróć</button>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton } from '@ionic/vue';

export default {
    components: {
        IonPage,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonButtons,
        IonMenuButton,
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

.about-container {
    padding: 20px;
    text-align: center;
    color: #666;
}

.about-container h2 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 15px;
}

.about-container p {
    font-size: 16px;
    line-height: 1.6;
    margin-bottom: 15px;
    color: #666;
}

.button-container {
    display: flex;
    justify-content: center;
    margin-top: 20px;
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