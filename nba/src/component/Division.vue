<template>
<ScrollView>
<div class="root">
 <div v-for="area in areas">
   <div class="line">
     <span>{{area.title}}</span>
     <span>胜负</span>
     <span>胜场差</span>
     <span>近况</span>
   </div>
   <div class="line item" v-for="team in area.teams">
     <div>
       <span class="rank-span">{{team.rank}}</span>
       <div class="img-wrapper">
        <img :src="team.banner"></img>
       </div>
       <span>{{team.team_name}}</span>
     </div>
     <span>{{team.wins}}-{{team.losses}}</span>
     <span>{{team.games_behind}}</span>
     <span>{{team.streak}}</span>
   </div>
 </div>
</div>
</ScrollView>
</template>
<script>
import Api from '../api/rank.js';
import ScrollView from './ScrollView.vue';
let areaDict={
  atlantic:'大西洋赛区',
  central:'中部赛区',
  southeast:'东南赛区',
  northwest:'西北赛区',
  pacific:'太平洋赛区',
  southwest:'西南赛区'
}
export default {
  data(){
    return {
      areas:[]
    };
  },
  methods:{
  loadData(){
        Api.getDivision().then((data)=>{

          let {western,eastern} = data.data.result.data;
          let area;
          for(name in western){
            area={};
            area.teams=western[name];
            area.title=areaDict[name];
            this.areas.push(area);
          }
          for(name in eastern){
            area={};
            area.teams=eastern[name];
            area.title=areaDict[name];
            this.areas.push(area);
          }

          this.areas.forEach(area=>{
            area.teams.forEach(team=>{
              team.banner=`http://www.sinaimg.cn/lf/sports/2017nba/${team.tid}.png`;
              team.streak=team.streak_length+(team.streak_kind === 'win'?'连胜':'连负');
            });
          })
       });
     }
  },
  components:{
    ScrollView
  },
  created(){
    this.loadData();
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
  width:20%;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
.line > *:first-child{
  width:40%;
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
