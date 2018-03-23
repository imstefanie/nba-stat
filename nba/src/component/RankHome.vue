<template>
  <div>
   <div class="left">
    <ScrollView>
      <ul>
        <router-link to="/rank/team?part=west" tag="li"><span>西部排名</span></router-link>
        <router-link to="/rank/team?part=east" tag="li"><span>东部排名</span></router-link>
        <router-link to="/rank/division" tag="li"><span>分区排名</span></router-link>
        <router-link v-for="link in leftLinks" :to="link.url" tag="li"><span>{{link.name}}</span></router-link>
      </ul>
    </ScrollView>
  </div>
  <div class="right">
      <router-view></router-view>
   </div>
  </div>
</template>
<script>
import ScrollView from './ScrollView.vue'
import DataDict from '../assets/dataDict'
export default {
  data(){
    return {};
  },
  methods:{},
  components:{
    ScrollView
  },
  activated(){
    this.$router.push('/rank/team?part=west');
  },
  computed:{
    leftLinks(){
      let teamStat=DataDict.teamStat;
      return teamStat.map(item=>{
        item.url=`/rank/stat?type=${item.type}`;
        return item;
      })
    }
  }
}
</script>
<style scoped>
  *{
    padding:0;
    margin:0;
  }
 .left{
   width:20%;
   float:left;
 }
 ul{
   width:100%;
 }
 li{
   list-style:none;
   height:30px;
   line-height:30px;
   text-align:center;
   background-color:#efeff4;
   color:#666;
   border-bottom:1px solid #ddd;
   border-right:1px solid #ddd;
 }

 li.router-link-exact-active{
   background-color:#008af5;
   color:white;
 }
 .right{
   width:80%;
   float:left;
 }
</style>
