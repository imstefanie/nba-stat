let express =require('express');
let fetch=require('fetch').fetchUrl;
let server=express();
function getData(data){
  return data;
}
server.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","*");
  next();
})
server.get('/rank',(req,res)=>{
  fetch(`http://slamdunk.sports.sina.cn/api?p=radar&s=team_standing&a=${req.query.a}&callback=getData`,(err,meta,body)=>{
    res.send(eval(body.toString()));
  })
});
server.get('/teamStat',(req,res)=>{
  fetch(`https://slamdunk.sports.sina.cn/api?p=radar&s=leaders&a=teams&callback=getData&season_type=reg&item_type=average&item=${req.query.item}`,(err,meta,body)=>{
    res.send(eval(body.toString()));
  })
});
server.get('/personStat',(req,res)=>{
   fetch(`https://slamdunk.sports.sina.cn/api?p=radar&s=leaders&a=players&callback=getData&page=${req.query.page}&limit=15&season_type=reg&item=${req.query.item}&item_type=average`,(err,meta,body)=>{
     res.send(eval(body.toString()));
   })
});
server.get('/schedule',(req,res)=>{
   fetch(`https://slamdunk.sports.sina.cn/api?p=radar&s=schedule&a=date_limit&order=1&date=${req.query.date}&callback=getData`,(err,meta,body)=>{
     res.send(eval(body.toString()));
   })
});

server.listen(3000);
