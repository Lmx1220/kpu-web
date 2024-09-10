
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{d as r,b as m,s as _,v as f,B as p,o as g,c as B,j as n,w as s,e as v,f as w,p as S,L as b,O as o}from"./index-CzepmmFI.js";import{_ as h}from"./index.vue_vue_type_script_setup_true_lang-DyOOhC82.js";const k=r({__name:"menuswitch",setup(x){const a=m(),t=_(),i=f();function c(){i.switchTo(t.actived+1<t.allMenus.length?t.actived+1:0)}return(C,e)=>{const u=h,l=p("ElButton"),d=b;return g(),B("div",null,[n(u,{title:"主导航切换",content:"可切换并激活指定的主导航"}),n(d,null,{default:s(()=>[e[1]||(e[1]=v("p",null,"该特性只有在导航模式为 side 和 head 时生效。",-1)),n(l,{disabled:!["side","head"].includes(w(a).settings.menu.mode),onClick:c},{default:s(()=>e[0]||(e[0]=[S(" 切换下一个 ")])),_:1},8,["disabled"])]),_:1})])}}});typeof o=="function"&&o(k);export{k as default};
