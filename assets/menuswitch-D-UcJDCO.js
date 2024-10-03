
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{d as r,b as m,v as _,x as f,C as p,o as g,c as v,j as n,w as s,e as w,f as x,q as B,M as C,P as o}from"./index-BSkZKgnl.js";import{_ as M}from"./index.vue_vue_type_script_setup_true_lang-DpWBfo0M.js";const S=r({__name:"menuswitch",setup(b){const a=m(),t=_(),i=f();function c(){i.switchTo(t.actived+1<t.allMenus.length?t.actived+1:0)}return(h,e)=>{const u=M,l=p("ElButton"),d=C;return g(),v("div",null,[n(u,{title:"主导航切换",content:"可切换并激活指定的主导航"}),n(d,null,{default:s(()=>[e[1]||(e[1]=w("p",null,"该特性只有在导航模式为 side 和 head 时生效。",-1)),n(l,{disabled:!["side","head"].includes(x(a).settings.menu.mode),onClick:c},{default:s(()=>e[0]||(e[0]=[B(" 切换下一个 ")])),_:1},8,["disabled"])]),_:1})])}}});typeof o=="function"&&o(S);export{S as default};
