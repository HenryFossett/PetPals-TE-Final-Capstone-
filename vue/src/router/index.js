import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Logout from '../views/Logout.vue'
import Register from '../views/Register.vue'
import store from '../store/index'
import petRegistration from '../views/PetRegistration'
import playDateList from '../components/PlayDateList.vue'
import aboutUs from '../views/AboutUs.vue'
import playdateview from '../views/playdateview.vue'
import playdatejoinview from '../views/JoinPlaydate.vue'

import forums from '../components/Forums.vue'

import Messages from '../views/Messages.vue';
import AddMessage from '../views/AddMessage.vue';
import AddTopic from '../views/AddTopic.vue';
import EditTopic from '../views/EditTopic.vue';
import NotFound from '../views/NotFound.vue';
import EditMessage from '../views/EditMessage.vue';
import allPetCards from "../components/AllPetCardsList.vue";
import schedulePlayDates from "../components/schedulePlayDate.vue"

Vue.use(Router)

/**
 * The Vue Router is used to "direct" the browser to render a specific view component
 * inside of App.vue depending on the URL.
 *
 * It also is used to detect whether or not a route requires the user to have first authenticated.
 * If the user has not yet authenticated (and needs to) they are redirected to /login
 * If they have (or don't need to) they're allowed to go about their way.
 */

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior(to) {
    if (to.hash) {
      return {
        selector: to.hash
      }
    }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/logout",
      name: "logout",
      component: Logout,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/register",
      name: "register",
      component: Register,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/pets/register",
      name: "petRegistration",
      component: petRegistration,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/playdates",
      name: "playDates",
      component: playDateList,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/playdates/:id",
      name: "playdatedetails",
      component: playdateview,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/playdates/:id/join",
      name: "playdatejoin",
      component: playdatejoinview,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/forums",
      name: "forums",
      component: forums,
      meta: {
        requiresAuth: true
      }
    },

    {
      path: "/forums/not-found",
      name: "NotFound",
      component: NotFound,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/forums/add-topic',
      name: 'AddTopic',
      component: AddTopic
    },
    {
      path: '/forums/edit-topic/:id',
      name: 'EditTopic',
      component: EditTopic
    },
    {
      path: '/forums/:id',
      name: 'Messages',
      component: Messages
    },
    {
      path: '/forums/:id/add-message',
      name: 'AddMessage',
      component: AddMessage
    },
    {
      path: '/forums/:id/edit-message/:messageId',
      name: 'EditMessage',
      component: EditMessage
    },
    {
      path: "/findPets",
      name: "ViewPets",
      component: allPetCards
    },
    {
      path: "/playdates/schedule",
      name: "schedule",
      component: schedulePlayDates,
      meta: {
        requiresAuth: true
      }
    },
    // {
    //   path: '/forum',
    //   name: 'ForumHome',
    //   component: ForumHome
    // },
    {
      path: "/aboutUs",
      name: "aboutUs",
      component: aboutUs,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  // Determine if the route requires Authentication
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);

  // If it does and they are not logged in, send the user to "/login"
  if (requiresAuth && store.state.token === '') {
    next("/login");
  } else {
    // Else let them go to their next destination
    next();
  }
});

export default router;
