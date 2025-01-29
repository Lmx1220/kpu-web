
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{L as d,i as f}from"./index-BCfGw-_2.js";import{_ as e}from"./lodash-CEMzXMls.js";import{d as c,r as s,aa as n,aj as m,o as p,a as u,b as i,s as h}from"./bootstrap-CKvMAU9X.js";import"./index-DW2EscPo.js";const v={class:"echarts vab-chart"},_=c({__name:"active-users-bar",setup(x){let r;const a=s({grid:{left:"20px",top:"5px",right:"20px",bottom:0},xAxis:{type:"category",data:["00:00","1:00","2:00","3:00","4:00","5:00"],boundaryGap:!1},yAxis:{type:"value",splitLine:{show:!1},axisTick:{show:!1},axisLine:{show:!1},axisLabel:{show:!1}},series:{barWidth:18,name:"",type:"bar",data:[e.random(50,100),e.random(10,100),e.random(10,100),e.random(10,100),e.random(10,100),e.random(50,100)],itemStyle:{color:new d(0,0,1,0,[{offset:0,color:"#0f0f0f"},{offset:1,color:"#0f0f0f"}])}}});n(()=>{r=setInterval(()=>{a.value.series.data=[e.random(50,100),e.random(10,100),e.random(10,100),e.random(10,100),e.random(10,100),e.random(50,100)],a.value.series.type=a.value.series.type==="bar"?"line":"bar",t&&t.setOption(a.value)},3e3)}),m(()=>{r&&clearInterval(r)});const o=s();let t;n(()=>{l(),window.addEventListener("resize",()=>{t.resize()})});function l(){t=f(o.value),t.setOption(a.value)}return(b,y)=>(p(),u("div",null,[i("div",v,[i("div",{ref_key:"chart1Ref",ref:o,style:{width:"100%",height:"100%"}},null,512)])]))}}),k=h(_,[["__scopeId","data-v-ae4a52f5"]]);export{k as default};
