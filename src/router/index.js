import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '@/views/LoginView.vue'
import DashboardView from '@/views/DashboardView.vue'
import PaintListView from '@/views/PaintListView.vue'
import UserListView from '@/views/UserListView.vue'
import EditUserView from '@/views/EditUserView.vue'
import NotFound from '@/views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/loggedinUser/:currentUserId/dashboard',
      name: 'dashboard',
      props: true,
      component: DashboardView
    },
    {
      path: '/loggedinUser/:currentUserId/paints',
      name: 'paints-list',
      props: true,
      component: PaintListView
  },
  {
        path: '/loggedinUser/:currentUserId/users',
        name: 'users-list',
        props: true,
        component: UserListView
    },
  {
      path: '/loggedinUser/:currentUserId/user/edit/:userId',
      name: 'edit-user',
      props: true,
      component: EditUserView
  },
  {
      path: '/:pathMatch(.*)*',
      component: NotFound
  }]

})

export default router
