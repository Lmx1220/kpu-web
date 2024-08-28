
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{d,b as _,x as r,y as m,D as f,o as p,c as h,j as t,w as n,f as g,s as w,e as x,N as B,Q as s}from"./index-nFO8NRRw.js";import{_ as S}from"./index.vue_vue_type_script_setup_true_lang-CKnag4rP.js";const b=x("p",null,"该特性只有在导航模式为 side 和 head 时生效。",-1),k=d({__name:"menuswitch",setup(v){const o=_(),e=r(),a=m();function c(){a.switchTo(e.actived+1<e.allMenus.length?e.actived+1:0)}return(C,M)=>{const i=S,u=f("ElButton"),l=B;return p(),h("div",null,[t(i,{title:"主导航切换",content:"可切换并激活指定的主导航"}),t(l,null,{default:n(()=>[b,t(u,{disabled:!["side","head"].includes(g(o).settings.menu.mode),onClick:c},{default:n(()=>[w(" 切换下一个 ")]),_:1},8,["disabled"])]),_:1})])}}});typeof s=="function"&&s(k);export{k as default};
