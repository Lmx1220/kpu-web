
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{d as c,aJ as f,o as r,f as m,w as C,M as i,N as l,t as d,h as a,b as o,i as t,a as g,n as v,m as _,s as h}from"./bootstrap-CKvMAU9X.js";import{_ as k}from"./index.vue_vue_type_script_setup_true_lang-CWF5QOtR.js";import{_ as V}from"./lodash-CEMzXMls.js";import"./index-DW2EscPo.js";const $={key:1,class:"right-icon"},b={class:"bottom"},w=c({__name:"top-card",props:{background:{default:"white"},title:{default:"Test"},icon:{default:""},percentage:{default:"10%"},countConfig:{default:()=>({startValue:0,endValue:V.random(1e3,2e4),decimals:0,prefix:"",suffix:"",separator:",",duration:8e3})}},setup(N){return(e,n)=>{const u=k,s=_,p=f("ElCard");return r(),m(p,{class:v(["top-card",`top-card-${e.background}`]),shadow:"hover"},{default:C(()=>[i(l(e.title)+" ",1),e.$slots.tag?d(e.$slots,"tag",{key:0},void 0,!0):a("",!0),o("p",null,[t(u,{decimals:e.countConfig.decimals,duration:e.countConfig.duration,"end-val":e.countConfig.endValue,prefix:e.countConfig.prefix,separator:e.countConfig.separator,"start-val":e.countConfig.startValue,suffix:e.countConfig.suffix},null,8,["decimals","duration","end-val","prefix","separator","start-val","suffix"])]),e.icon?(r(),g("div",$,[t(s,{name:e.icon},null,8,["name"])])):a("",!0),o("div",b,[n[0]||(n[0]=i(" 自上周以来 ")),t(s,{name:"ri:arrow-up-line"}),o("span",null,l(e.percentage),1)]),e.$slots.chart?d(e.$slots,"chart",{key:2},void 0,!0):a("",!0)]),_:3},8,["class"])}}}),I=h(w,[["__scopeId","data-v-4b807df0"]]);export{I as default};
