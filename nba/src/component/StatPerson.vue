<template>
<ScrollView :has-more="hasMore" @load-more="loadMore" ref="scroll">
<div class="root">
 <div class="line">
   <span>{{title}}</span>
   <span>球队</span>
   <span>数据</span>
 </div>
 <div class="line item" v-for="player in players">
   <div>
     <span class="rank-span">{{player.rank}}</span>
     <div class="img-wrapper">
      <img :src="player.banner"></img>
     </div>
     <div>
         <p class='name'>{{player.first_name}}·{{player.last_name}}</p>
         <p class='main-stat'>{{player.points}}分 {{player.rebounds}}板 {{player.assists}}助</p>
     </div>
   </div>
   <span>{{player.team_name}}</span>
   <span>{{player.currStat}}</span>
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
        loadData(cb){
              let type=this.type;
              if(!type){
                return;
              }
              Api.getPersonStat(type,this.currPage).then((data)=>{
                let {players,paginator} = data.data.result.data;
                players.forEach(player=>{
                   player.banner=`http://www.sinaimg.cn/ty/nba/player/NBA_1_1/${player.pid}.png`;
                   player.currStat=player[type];
                })
                this.players=this.players.concat(players);
                if(this.maxPage == 0){
                  this.maxPage=Math.ceil(paginator.total / paginator.limit);
                }
                if(cb){
                  cb();
                }
             },err =>{
               if(cb){
                 cb();
               }
               this.hasMore=false;
             });
           },
        loadMore(cb){
          if(this.currPage >= this.maxPage){
            this.hasMore=false;
            cb();
          }else{
            this.currPage++;
            this.loadData(cb);
          }
        }
    },
    data(){
      return {
        players:[],
        hasMore:true,
        maxPage:0,
        currPage:1
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
         return DataDict.personStat.filter(item => item.type == type)[0].name;
        }
        return ""
      }
    },
    created(){
      this.loadData();
    },
    watch:{
      $route(){
        this.hasMore=true;
        this.maxPage=0;
        this.currPage=1;
        this.players=[];
        this.$refs.scroll.scrollTop();
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
.line p{
  float:none;
  line-height:1;
  margin:0;
}
p.name{
  font-size:12px;
}
p.main-stat{
  font-size:10px;
}
.line > *{
  width:20%;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
.line > *:first-child{
  width:60%;
}
.line span{
  line-height:1.5;
}
.rank-span{
  width:30px;
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
