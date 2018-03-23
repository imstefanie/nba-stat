<template>
  <div>
    <NavBar></NavBar>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import router from './router'
import NavBar from './component/NavBar.vue'
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
  },
  components:{
    NavBar
  },
  router
}
</script>

<style>
</style>
