import { createRouter, createWebHistory } from 'vue-router';
import CoachesList from './pages/coaches/CoachesList.vue';
//import CoachesPage from './pages/coaches/CoachesPage.vue';
//import CoachRegister from './pages/coaches/CoachRegister.vue';
//import Contact from './pages/requests/Contact.vue';
//import Requests from './pages/requests/Requests.vue';
import NotFound from './pages/NotFound.vue';
//import UserAuth from './pages/auth/UserAuth.vue';
import store from './store/index.js';


const CoachesPage = () => import('./pages/coaches/CoachesPage.vue');
const CoachRegister = () => import('./pages/coaches/CoachRegister.vue');
const Contact = () => import('./pages/requests/Contact.vue');
const Requests = () => import('./pages/requests/Requests.vue');
const UserAuth = () => import('./pages/auth/UserAuth.vue');

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {path: '/', redirect: '/coaches'},
    { path: '/coaches', component: CoachesList },
    {
      path: '/coaches/:id',
      component: CoachesPage,
      props: true,
      children: [{ path: 'contact', component: Contact }],
    },
    { path: '/register', component: CoachRegister, meta: { requiresAuth: true} },
    { path: '/requests', component: Requests, meta: { requiresAuth: true} },
    { path: '/auth', component: UserAuth, meta: { requiresUnauth: true}},
    { path: '/:notFound(.*)', component: NotFound},
  ],
});

router.beforeEach(function(to, _, next){
  if(to.meta.requiresAuth && !store.getters.isAuth){
    next('/auth');
  } else if(to.meta.requiresUnauth && store.getters.isAuth){
    next('/coaches');
  } else {
    next();
  }
});

export default router;
