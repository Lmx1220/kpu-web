
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{d,b as _,y as r,z as m,G as f,o as p,c as h,j as t,w as n,f as g,t as w,e as B,O as S,R as s}from"./index-D8CVJ9uq.js";import{_ as b}from"./index.vue_vue_type_script_setup_true_lang-CwqCei2-.js";const k=B("p",null,"该特性只有在导航模式为 side 和 head 时生效。",-1),v=d({__name:"menuswitch",setup(x){const o=_(),e=r(),a=m();function c(){a.switchTo(e.actived+1<e.allMenus.length?e.actived+1:0)}return(C,M)=>{const i=b,u=f("ElButton"),l=S;return p(),h("div",null,[t(i,{title:"主导航切换",content:"可切换并激活指定的主导航"}),t(l,null,{default:n(()=>[k,t(u,{disabled:!["side","head"].includes(g(o).settings.menu.mode),onClick:c},{default:n(()=>[w(" 切换下一个 ")]),_:1},8,["disabled"])]),_:1})])}}});typeof s=="function"&&s(v);export{v as default};
