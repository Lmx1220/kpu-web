
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{d as r,u as m,v as _,x as f,I as p,o as g,c as h,h as n,w as s,a as v,b as w,q as x,M as B,P as o}from"./index-BhImQte4.js";import{_ as M}from"./index.vue_vue_type_script_setup_true_lang-HdufEI_y.js";const S=r({__name:"menuswitch",setup(b){const a=m(),t=_(),i=f();function c(){i.switchTo(t.actived+1<t.allMenus.length?t.actived+1:0)}return(k,e)=>{const u=M,l=p("ElButton"),d=B;return g(),h("div",null,[n(u,{title:"主导航切换",content:"可切换并激活指定的主导航"}),n(d,null,{default:s(()=>[e[1]||(e[1]=v("p",null,"该特性只有在导航模式为 side 和 head 时生效。",-1)),n(l,{disabled:!["side","head"].includes(w(a).settings.menu.mode),onClick:c},{default:s(()=>e[0]||(e[0]=[x(" 切换下一个 ")])),_:1},8,["disabled"])]),_:1})])}}});typeof o=="function"&&o(S);export{S as default};
