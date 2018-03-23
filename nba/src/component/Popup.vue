<template>
  <div ref="main">{{tip}}</div>
</template>
<script>
export default {
  data(){
    return {};
  },
  methods:{
    show(){
      let div=this.$refs.main;
      div.style.opacity=1;
      div.style.transition="0.5s opacity ease";
      setTimeout(function(){
         div.style.opacity=0;
         div.style.transition="2s opacity ease";
         setTimeout(function(){
            div.transition="";
         },2000)
      },2500)

    }
  },
  props:{
    tip:{
      default:'已为您加载更多赛程'
    }
  }
}
</script>
<style scoped>
div{
  background:green;
  color:white;
  position:fixed;
  left:50%;
  transform:translateX(-50%);
  top:100px;
  text-align:center;
  height:24px;
  line-height:24px;
  font-size:16px;
  padding-left:10px;
  padding-right:10px;
  border-radius:12px;
  opacity:0;
}
</style>
