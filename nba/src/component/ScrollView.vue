<template>
  <div ref="main">
  <slot></slot>
  <RefreshHeader v-if="enableRefresh" ref="header"></RefreshHeader>
  </div>
</template>
<script>
import RefreshHeader from './RefreshHeader.vue'
export default {
  data(){
    return {
      loading:false,
      refreshing:false
    };
  },
  methods:{
    getOffsetTop(el){
      let top=0;
      let curr=el;
      while(curr.parentNode != null){
        top+=curr.offsetTop;
        curr=curr.parentNode;
      }
      return top;
    },
    scrollTop(){
      var main=this.$refs.main;
      var child=main.childNodes[0];
      child.style.transform=`translateY(0px)`;
    }
  },
  props:{
    hasMore:{
      default:false
    },
    loadMoreTheshold:{
      default:50
    },
    enableRefresh:{
      default:false
    }
  },
  components:{
    RefreshHeader
  },
  mounted(){
    var main=this.$refs.main;
    var header=this.$refs.header;
    var child=main.childNodes[0];
    let offsetHeight=this.getOffsetTop(main);
    let clientHeight=window.document.documentElement.clientHeight;
    let navHeight=30;
    main.style.height=(clientHeight-offsetHeight-navHeight)+'px';
    main.style.overflow='hidden';
    main.style.position='relative';
    child.style.position='absolute';
    child.style.transform=`translateY(0px)`;

    let startY=0;
    let currY=0;
    let maxOffset=0;
    let that=this;
    let finishedCallBack=function(){
      that.loading=false;
      that.$nextTick();
    }
    let oldTop=0;
    main.addEventListener('touchstart',function(e){
       startY=e.touches[0].clientY;
       maxOffset=child.offsetHeight-main.clientHeight;
       oldTop=parseFloat(child.style.transform.match(/-?[0-9\.]+/g)[0]);
    });
    main.addEventListener('touchmove',function(e){
       if(that.refreshing){
        return;
       }
       if(!that.enableRefresh && maxOffset<=0){
         if(that.hasMore && !that.loading){
           that.loading = true;
           that.$nextTick();
           that.$emit('load-more',finishedCallBack);
         }
         return;
       }
       console.log(oldTop);
       let offsetY=startY-e.touches[0].clientY;
       currY=oldTop-offsetY;
       if(maxOffset >0 && currY<=-maxOffset){
         currY=-maxOffset;
       }else if(that.enableRefresh){
         if(currY >= 0 && currY <= header.height){
           header.pullDown(currY);
         }else if(currY > header.height){
           currY = header.height;
           header.pullDown(currY);
         }
       }else if(currY>0){
         currY=0;
       }
       child.style.transform=`translateY(${currY}px)`;

       if(that.hasMore){
         if(-currY >= maxOffset - that.loadMoreTheshold && !that.loading ){
           that.loading = true;
           that.$nextTick();
           that.$emit('load-more',finishedCallBack);
         }
       }

    });
    main.addEventListener('touchend',function(e){
       if(that.refreshing){
         return;
       }
       if(that.enableRefresh && currY > 0){
         header.release(currY,child,function(){
           that.$emit('refresh-start');
         },function(type){
           that.refreshing=false;
           that.$nextTick();
           if(type){
             that.$emit('refresh-finish');
           }
         });
         that.refreshing=true;
       }
    });
  }
}
</script>
<style scoped>
</style>
