<template>
<div>
  <router-link to="/schedule">赛程</router-link>
  <router-link to="/stat">统计</router-link>
  <router-link to="/rank">排名</router-link>
</div>
</template>
<style scoped>
div{
  background:rgba(48,155,241,.98);
  position:fixed;
  width:100%;
  bottom:0;
}
div::after{
  display:block;
  content:'';
  clear:both;
  z-index:999;
}
a{
  text-decoration:none;
  color:white;
  height:40px;
  line-height:40px;
  font-size:16px;
  width:33.3%;
  box-sizing:border-box;
  float:left;
  text-align:center;
}
a::before{
  width:16px;
  height:16px;
  display:inline-block;
  vertical-align:baseline;
  content:'';
  background-size:16px 16px;
  margin-right:3px;
  background-repeat:no-repeat;
}
a:nth-child(1)::before{
  background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAgBAMAAAD3btVMAAAALVBMVEUAAAD///////////////////////////////////////////////////////+hSKubAAAADnRSTlMA9ELrtTo03KuhiVoaEprV4BYAAABlSURBVBjTY1BieIcAQJ4gMh/EQ+G/G3A+mvsw3M+Awmcggl8H5z4H89fB+a/A/Mtwvi2YzyoH5T4MYACDYCjflAECePrA3BcHGKCAbSKQK5nAgADZgtsYUMA7BhryWcDuccDGBwDaQ/yMZituhQAAAABJRU5ErkJggg==);
}
a:nth-child(2)::before{
  background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAgBAMAAAAcWW5PAAAAElBMVEUAAAD///////////////////8+Uq06AAAABXRSTlMA5ogGtTMIsugAAABUSURBVBjTYwADZkUhAwYkwBQaqoDMZwwNFUDms4aGBtCbD3Ekgg9xJIIPcSSCDyEguhB8iC4EH6ILwQeT9OajuwdBQNyLIKD+QRAEgWsoMnBA5wMAhYg/EeRPHqEAAAAASUVORK5CYII=);
}
a:nth-child(3)::before{
  background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAhCAMAAAD9NzvVAAAAM1BMVEUAAAD///////////////////////////////////////////////////////////////+3leKCAAAAEHRSTlMAvZx19CZY2ZQzDxU8sotlwbImewAAAKJJREFUKM/F0lsOAyEIQFEoUEfnUfa/2pKYGXxU/ez905MQo4IqgHbl3f8i0iEpyUHYIl87PO0Xl3gaCWFgDkhifDoSQER9wmhbN1qbVm1gZYGE2oQJ7txcs/jMbrIV9WexGcofeNWDRZ8EDMsVkC+PvURqjvrO6HPDCIMhj5CnOB27OhCNkAxlhOLX1yFOL372ZKvHXn2TwQfz2q9ZV33quy9SnSgcyCyp9AAAAABJRU5ErkJggg==);
}
</style>
