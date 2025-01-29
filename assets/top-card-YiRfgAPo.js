
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{d as p,aI as f,o as r,f as m,w as C,M as i,N as l,t as u,h as a,b as o,i as t,a as g,n as v,m as _,s as h}from"./bootstrap-CFLGDgEx.js";import{_ as k}from"./index.vue_vue_type_script_setup_true_lang-Cz6qBXkw.js";import{_ as V}from"./lodash-BZCfa4Ax.js";import"./index-CWw-wBac.js";const $={key:1,class:"right-icon"},w={class:"bottom"},N=p({__name:"top-card",props:{background:{default:"white"},title:{default:"Test"},icon:{default:""},percentage:{default:"10%"},countConfig:{default:()=>({startValue:0,endValue:V.random(1e3,2e4),decimals:0,prefix:"",suffix:"",separator:",",duration:8e3})}},setup(b){return(e,n)=>{const d=k,s=_,c=f("ElCard");return r(),m(c,{class:v(["top-card",`top-card-${e.background}`]),shadow:"hover"},{default:C(()=>[i(l(e.title)+" ",1),e.$slots.tag?u(e.$slots,"tag",{key:0},void 0,!0):a("",!0),o("p",null,[t(d,{decimals:e.countConfig.decimals,duration:e.countConfig.duration,"end-val":e.countConfig.endValue,prefix:e.countConfig.prefix,separator:e.countConfig.separator,"start-val":e.countConfig.startValue,suffix:e.countConfig.suffix},null,8,["decimals","duration","end-val","prefix","separator","start-val","suffix"])]),e.icon?(r(),g("div",$,[t(s,{name:e.icon},null,8,["name"])])):a("",!0),o("div",w,[n[0]||(n[0]=i(" 自上周以来 ")),t(s,{name:"ri:arrow-up-line"}),o("span",null,l(e.percentage),1)]),e.$slots.chart?u(e.$slots,"chart",{key:2},void 0,!0):a("",!0)]),_:3},8,["class"])}}}),I=h(N,[["__scopeId","data-v-8ec90c89"]]);export{I as default};
