import RankHome from '../component/RankHome.vue';
import TeamRank from "../component/TeamRank.vue"
import Division from "../component/Division.vue"
import StatRank from "../component/StatRank.vue"

import StatHome from '../component/StatHome.vue';
import StatPerson from '../component/StatPerson.vue';

import Schedule from '../component/Schedule.vue';

import Vue from 'vue'
import ViewRouter from "vue-router"
Vue.use(ViewRouter)

let routes=[
  {path:'/rank',component:RankHome,
  children:[
    {path:'team',component:TeamRank},
    {path:'division',component:Division},
    {path:'stat',component:StatRank}
  ]},
  {path:'/stat',component:StatHome,children:[
    {path:'sub',component:StatPerson}
  ]},
  {path:'/schedule',component:Schedule}
];
export default new ViewRouter({
  routes
});
