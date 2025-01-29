
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{_ as m}from"./index.vue_vue_type_script_setup_true_lang-CjgLcnfR.js";import{_ as d}from"./index.vue_vue_type_script_setup_true_lang-Cmc5FAQ9.js";import{d as p,u as _,aB as f,ay as g,aI as B,o as b,a as w,i as n,w as o,b as M,e as S,M as h}from"./bootstrap-CFLGDgEx.js";import{b as s}from"./route-block-B_A1xBdJ.js";import"./index-CWw-wBac.js";const k=p({__name:"menuswitch",setup(v){const a=_(),t=f(),i=g();function u(){i.switchTo(t.actived+1<t.allMenus.length?t.actived+1:0)}return(x,e)=>{const r=d,c=B("ElButton"),l=m;return b(),w("div",null,[n(r,{title:"主导航切换",content:"可切换并激活指定的主导航"}),n(l,null,{default:o(()=>[e[1]||(e[1]=M("p",null,"该特性只有在导航模式为 side 和 head 时生效。",-1)),n(c,{disabled:!["side","head"].includes(S(a).settings.menu.mode),onClick:u},{default:o(()=>e[0]||(e[0]=[h(" 切换下一个 ")])),_:1},8,["disabled"])]),_:1})])}}});typeof s=="function"&&s(k);export{k as default};
