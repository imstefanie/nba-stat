<template>
<div id="main" ref="main">
  <div id="circle" ref="circle">
    <div id="half" ref="half"></div>
    <div id="check" ref="check">
      <div id="check-mask" ref="check-mask"></div>
    </div>
  </div>
  <div id="mask" ref="mask"></div>
</div>
</template>
<script>
export default {
  data(){
    return {
      height:50
    };
  },
  computed:{
    main(){
      return this.$refs.main;
    },
    mask(){
      return this.$refs.mask;
    }
  },
  methods:{
    pullDown(offset){
       if(offset > height){
         return;
       }
       let height=this.height;
       this.main.style.transform=`translateY(${-height+offset}px)`;
       this.mask.style.height=`${height-offset}px`;
    },
    clearTransition(el,cb){
      let duration=parseFloat(window.getComputedStyle(el)['transition-duration'].slice(0,-1))*1000;
      let listener=function(){
        el.style.transition='';
        clearTimeout(id);
        if(cb){
          cb();
        }
      };
      let id=setTimeout(listener,duration);
    },
    release(currHeight,sibling,startCb,endCb){
      let height=this.height;
      let main=this.main;
      let mask=this.mask;
      let that=this;
      function withdraw(type){
        main.style.transform=`translateY(${-height}px)`;
        main.style.transition='0.6s transform ease';
        that.clearTransition(main);
        mask.style.height=`${height}px`;
        mask.style.transition='0.6s height ease';
        that.clearTransition(mask);
        sibling.style.transform=`translateY(0px)`;
        sibling.style.transition='0.6s transform ease';
        that.clearTransition(sibling,function(){
          endCb(type);
        });
      }
      if(currHeight < height){
        withdraw(false);
      }else{
        startCb();
        let half=this.$refs.half;
        let check=this.$refs.check;
        let checkMask=this.$refs['check-mask'];
        half.style.background='white';
        half.style.transform='rotate(720deg)';
        half.style.transition='2000ms transform linear';
        that.clearTransition(half,function(){
          half.style.transform='rotate(0deg)';
          half.style.background='transparent';
          check.style.display='block';
          checkMask.style.transition='1s width ease';
          checkMask.style.width='0px';
          that.clearTransition(checkMask,function(){
            checkMask.style.width='22px';
            check.style.display='none';
            withdraw(true);
          });
        });
      }
    }
  }
}
</script>
<style scoped>
#main{
  width:100%;
  height:50px;
  position:relative;
  background:white;
  transform:translateY(-50px);
}
#circle{
  width:40px;
  height:40px;
  margin:5px auto;
  border-radius:50%;
  border:2px solid green;
  box-sizing:border-box;
}
#half{
  width:48px;
  height:24px;
  margin-top:-4px;
  margin-left:-5px;
  border-top-left-radius:50% 100%;
  border-top-right-radius:50% 100%;
  background:transparent;
  transform:rotate(0deg);
  transform-origin:50% 100%;
}
#check{
  width:20px;
  height:10px;
  border-right:2px solid green;
  border-top:2px solid green;
  transform:rotate(135deg);
  transform-origin:50% 0;
  margin-left:11px;
  margin-top:2px;
  display:none;
  position:relative;
}
#check-mask{
  width:22px;
  height:4px;
  background:white;
  position:absolute;
  top:-3px;
  left:-2px;
}
#mask{
  width:100%;
  height:100%;
  position:absolute;
  bottom:0;
  background:white;
}
</style>
