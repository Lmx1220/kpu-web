
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{d,c as _,D as r,F as m,e as f,o as p,f as h,h as t,w as n,j as g,q as w,i as B,U as S,V as s}from"./index-RH8yPTKC.js";import{_ as k}from"./index.vue_vue_type_script_setup_true_lang-CCZndBIO.js";const v=B("p",null,"该特性只有在导航模式为 side 和 head 时生效。",-1),x=d({__name:"menuswitch",setup(C){const o=_(),e=r(),a=m();function c(){a.switchTo(e.actived+1<e.allMenus.length?e.actived+1:0)}return(M,V)=>{const i=k,u=f("ElButton"),l=S;return p(),h("div",null,[t(i,{title:"主导航切换",content:"可切换并激活指定的主导航"}),t(l,null,{default:n(()=>[v,t(u,{disabled:!["side","head"].includes(g(o).settings.menu.mode),onClick:c},{default:n(()=>[w(" 切换下一个 ")]),_:1},8,["disabled"])]),_:1})])}}});typeof s=="function"&&s(x);export{x as default};
