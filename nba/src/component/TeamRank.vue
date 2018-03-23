<template>
<ScrollView>
  <div class="root">
    <div class="line">
      <span>{{title}}</span>
      <span>胜负</span>
      <span>胜场差</span>
      <span>近况</span>
    </div>
    <div class="line item" v-for="team in teams">
      <div>
        <span class="rank-span">{{team.rank}}</span>
        <div class="img-wrapper">
          <img :src="team.banner"/>
        </div>
        <span>{{team.team_name}}</span>
      </div>
      <span>{{team.wins}}-{{team.losses}}</span>
      <span>{{team.games_behind}}</span>
      <span>{{team.streak}}</span>
    </div>
  </div>
</ScrollView>
</template>
<script>
import Api from '../api/rank.js';
import ScrollView from './ScrollView.vue';
export default {
    "methods": {
        loadData(){
              Api.getRank().then((data)=>{
                let {western,eastern} = data.data.result.data;
                if(this.part=='west'){
                  this.teams=western;
                }else if(this.part=='east'){
                  this.teams=eastern;
                }
                this.teams.forEach(team=>{
                   team.banner=`http://www.sinaimg.cn/lf/sports/2017nba/${team.tid}.png`;
                   team.streak=team.streak_length+(team.streak_kind === 'win'?'连胜':'连负');
                })
             });
           }
    },
    data(){
      return {
        teams:[]
      }
    },
    components:{
      ScrollView
    },
    computed:{
      part:{
        get(){
          let part=this.$route.query.part;
          return part;
        }
      },
      title(){
        if(this.part=='west'){
          return '西部排名';
        }else if(this.part=='east'){
          return '东部排名';
        }
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
