import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'
import PlaceDetails from '@/views/PlaceDetails.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/tab1'
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/tab1'
      },
      {
        path: 'tab1',
        name: 'PlacesList',
        component: () => import('@/views/PlacesList.vue')
      },
      {
        path: 'tab2',
        name: 'AddPlace',
        component: () => import('@/views/AppInfo.vue')
      }
    ]
  },
  {
    path: '/place/:name',
    name: 'PlaceDetails',
    component: PlaceDetails,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router