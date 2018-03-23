<template>
  <div>
    <ScrollView :enable-refresh="true" :has-more="hasMore" @load-more="loadMore"
      @refresh-start="refreshStart" @refresh-finish="refreshFinish" >
      <div id="main">
        <div v-for="match in matches">
          <p class="date-nav">{{match.date}}</p>
          <div v-for="game in match.games" class="line">
            <div class="team away">
              <div class="img-wrapper">
                <img :src="game.awayBanner"/>
              </div>
              <p>{{game.away_name}}</p>
            </div>
            <div class="team home">
              <div class="img-wrapper">
                <img :src="game.homeBanner"/>
              </div>
              <p>{{game.home_name}}</p>
            </div>
            <div class="center">
              <p>
                <span class="type">{{game.type}}</span>
                <span class="status" :class="{'going':game.isGoing,'not-going':!game.isGoing}">{{game.status}}</span>
              </p>
              <div v-if="game.status_en == 'scheduled' " class="score">
                <span class="win">VS</span>
                <span class="divider">/</span>
                <div>
                  <p class="label">开赛时间</p>
                  <p class="time">{{game.time}}</p>
                </div>
              </div>
              <div v-else class="score">
                <span :class="{'win':!game.homeWin,'lose':game.homeWin}">{{game.away_score}}</span>
                <span class="divider dash">-</span>
                <span :class="{'win':game.homeWin,'lose':!game.homeWin}">{{game.home_score}}</span>
              </div>
              <p class="button">
                <span v-if="!game.isGoing">战报</span>
                <span>统计</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </ScrollView>
    <Popup></Popup>
  </div>
</template>
<script>
import ScrollView from './ScrollView.vue'
import Popup from './Popup.vue'
import Api from '../api/rank.js'
export default {
  data(){
    return {
      hasMore:true,
      threeDay:259200000,
      prevDay:0,
      nextDay:0,
      matches:[],
      dayList:[],
      tmpMatches:undefined,
      completeRefresh:false
    };
  },
  methods:{
    getInitDate(){
      let date=new Date();
      this.prevDay=date.getTime();
      this.nextDay=this.prevDay+this.threeDay;
    },
    computeDate(millisecond){
      function one2two(number){
        if(number < 10){
          return '0'+number;
        }
        return ''+number;
      }
      let date=new Date();
      date.setTime(millisecond)
      return `${date.getFullYear()}-${one2two(date.getMonth()+1)}-${one2two(date.getDate())}`;
    },
    concatGames(games,isBefore){
      if(games.length == 0){
        if(!isBefore){
          this.hasMore = false;
        }
      }else{
        if(isBefore){
          this.matches=games.concat(this.matches);
          this.prevDay-=this.threeDay;
        }else{
          this.matches=this.matches.concat(games);
          this.nextDay+=this.threeDay;
        }
      }
    },
    loadData(time,isBefore,next,cb){
      let timeStr=this.computeDate(time);
      console.log(timeStr);
      let that=this;
      let tmpMatches=[];
      Api.getSchedule(timeStr).then(data=>{
        let {matchs:matches}=data.data.result.data;
        matches.forEach(match=>{
          match.homeBanner=`http://www.sinaimg.cn/lf/sports/2017nba/${match.home_tid}.png`;
          match.awayBanner=`http://www.sinaimg.cn/lf/sports/2017nba/${match.away_tid}.png`;
          match.isGoing=match.status != '已结束';
          if(match.status_en != 'scheduled'){
            match.homeWin=match.home_score > match.away_score;
          }
          let foundIndex = -1;
          tmpMatches.forEach((dayMatch,index) => {
            if(dayMatch.date == match.date){
              foundIndex = index;
            }
          });
          if(foundIndex == -1 && that.dayList.indexOf(match.date) == -1){
            that.dayList.push(match.date);
            tmpMatches.push({date:match.date,games:[match]});
          }else if(foundIndex != -1){
            tmpMatches[foundIndex].games.push(match);
          }
        });
        next(tmpMatches);
        if(cb){
          cb();
        }
      },err=>{
        next([]);
        if(cb){
          cb();
        }
        if(!isBefore){
          this.hasMore=false;
        }
      })
    },
    loadMore(cb){
      this.loadData(this.nextDay,false,(tmpMatches)=>{
        this.concatGames(tmpMatches,false);
      },cb);
    },
    refreshStart(){
      this.loadData(this.prevDay,true,(tmpMatches)=>{
        if(this.completeRefresh){
          this.concatGames(tmpMatches,true);
          this.completeRefresh=false;
        }else{
          this.tmpMatches=tmpMatches;
        }
      });
    },
    refreshFinish(){
      if(this.tmpMatches){
        this.concatGames(this.tmpMatches,true);
        this.tmpMatches=undefined;
      }else{
        this.completeRefresh=true;
      }
    }
  },
  created(){
    this.getInitDate();
    this.loadMore();
  },
  components:{
    ScrollView,
    Popup
  }
}
</script>
<style scoped>
*{
  padding:0;
  margin:0;
  color:#333;
}
#main{
  width:100%;
}
.date-nav{
  background:#ccc;
  width:100%;
  height:24px;
  line-height:24px;
  font-size:16px;
  padding-left:10px;
}
.img-wrapper{
  width:60px;
  height:60px;
}
.img-wrapper img{
  width:100%;
  height:100%;
}
.line{
  width:100%;
  padding-top:10px;
  padding-bottom:5px;
  position:relative;
}
.line::after{
  content:' ';
  display:block;
  clear:both;
}
.away{
  float:left;
}
.home{
  float:right;
}
.team{
  width:100px;
}
.team > *{
  margin:0 auto;
}
.team p{
  width:100%;
  text-align:center;
}
.center{
  position:absolute;
  width:50%;
  left:50%;
  transform:translateX(-50%);
}
.center p{
  text-align:center;
}
.center p > span{
  font-size:12px;
}
.center .type{
  color:#999;
  margin-right:5px;
}
.center .status{
  line-height:1.5;
  padding-left:5px;
  padding-right:5px;
  border-radius:9px;
  color:white;
}
.center .status.going{
  background-color:#73b8ee;
}
.center .status.not-going{
  background-color:#a2a2a2;
}
.score{
  text-align:center;
  margin-top:3px;
}
.score > *{
  vertical-align:middle;
}
.score div{
  display:inline-block;
  font-size:12px;
}
.score .win{
  font-size:28px;
  color:#666;
}
.score .lose{
  font-size:28px;
  color:#a2a2a2;
}
.score .divider{
  color:#999;
  font-size:12px;
  margin-left:10px;
  margin-right:10px;
}
.score .divider.dash{
  font-size:24px;
}
.button > span{
  border:1px solid #96cef9;
  color:#73b8ee;
  border-radius:2px;
  padding-left:5px;
  padding-right:5px;
}
.button > span + span{
  margin-left:5px;
}
</style>
