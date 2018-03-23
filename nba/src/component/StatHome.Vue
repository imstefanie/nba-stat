<template>
  <div>
   <div class="left">
    <ScrollView>
      <ul>
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
    this.$router.push('/stat/sub?type=points')
  },
  computed:{
    leftLinks(){
      let personStat=DataDict.personStat;
      return personStat.map(item=>{
        item.url=`/stat/sub?type=${item.type}`;
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
