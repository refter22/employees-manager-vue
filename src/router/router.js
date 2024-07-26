import Vue from 'vue'
import VueRouter from 'vue-router'
import EmployeesList from '@/views/EmployeesList.vue'
import EmployeeSubordinates from '@/views/EmployeeSubordinates.vue'
import NotFound from '@/views/NotFound.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/employees' },
  { path: '/employees', component: EmployeesList },
  { path: '/employees/:employeeId', component: EmployeeSubordinates, props: true },
  { path: '*', component: NotFound }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
