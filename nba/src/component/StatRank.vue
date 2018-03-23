<template>
<ScrollView>
<div class="root">
 <div class="line">
   <span>{{title}}</span>
   <span>胜负</span>
   <span>数据</span>
 </div>
 <div class="line item" v-for="team in teams">
   <div>
     <span class="rank-span">{{team.rank}}</span>
     <div class="img-wrapper">
      <img :src="team.banner"></img>
     </div>
     <span>{{team.team_name}}</span>
   </div>
   <span>{{team.wins}}-{{team.losses}}</span>
   <span>{{team.currStat}}</span>
 </div>
</div>
</ScrollView>
</template>
<script>
import Api from '../api/rank.js';
import ScrollView from './ScrollView.vue';
import DataDict from '../assets/dataDict'
export default {
    "methods": {
        loadData(){
              let type=this.type;
              if(!type){
                return;
              }
              Api.getTeamStat(type).then((data)=>{
                let {teams} = data.data.result.data;
                this.teams=teams;
                this.teams.forEach(team=>{
                   team.banner=`http://www.sinaimg.cn/lf/sports/2017nba/${team.tid}.png`;
                   team.streak=team.streak_length+(team.streak_kind === 'win'?'连胜':'连负');
                   team.currStat=team[type];
                })
             });
           }
    },
    data(){
      return {
        teams:[],
        hasMore:true
      }
    },
    components:{
      ScrollView
    },
    computed:{
      type(){
          return this.$route.query.type;
      },
      title(){
        let type=this.type;
        if(type){
          return DataDict.teamStat.filter(item => item.type == type)[0].name + '排名';
        }
        return "";
      }
    },
    created(){
      this.loadData();
    },
    watch:{
      $route(){
        this.loadData();
      }
    }
}
</script>
<style scoped>
.root{
  width:100%;
}
.line{
  border-bottom:1px solid #ccc;
  height:30px;
}
.line::after{
  clear:both;
  content:" ";
  display:block;
}
.line *{
  float:left;
}
.line > *{
  width:25%;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
.line > *:first-child{
  width:50%;
}
.line span{
  line-height:1.5;
}
.rank-span{
  width:20px;
}
.img-wrapper{
   width:20px;
   height:20px;
   margin-top:3px;
   margin-right:5px;
}
.img-wrapper img{
   width:100%;
   height:100%;
}
</style>
