
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{_}from"./HDropdownMenu.vue_vue_type_script_setup_true_lang-G_4EBxNt.js";import{d as h,a as d,c as f,b as g,a6 as b,F as v,r as x,H as S,o as r,f as c,h as n,w as k,i as y,j as e,M as w,q as B,t as I,S as i,_ as M}from"./index-DWg0Z22n.js";import{_ as N}from"./tools.vue_vue_type_script_setup_true_lang-kDeMeSM7.js";const P={class:"flex items-center"},T={class:"flex-center gap-1"},V=["src","onerror"],j=h({name:"ToolbarRightSide",__name:"rightSide",setup($){const u=d(),t=f(),s=g(),{t:o}=b(),{generateI18nTitle:m}=v(),a=x(!1);return S(()=>s.avatar,()=>{a.value&&(a.value=!1)}),(C,D)=>{const l=M,p=_;return r(),c("div",P,[n(N,{mode:"right-side"}),n(p,{items:[[{label:e(m)(e(t).settings.home.title),handle:()=>e(u).push({path:e(t).settings.home.fullPath}),hide:!e(t).settings.home.enable},{label:e(o)("app.preferences"),handle:()=>e(i).emit("global-preferences-toggle"),hide:!e(t).settings.userPreferences.enable}],[{label:e(o)("app.hotkeys"),handle:()=>e(i).emit("global-hotkeys-intro-toggle"),hide:e(t).mode!=="pc"}],[{label:e(o)("app.logout"),handle:()=>e(s).logout(e(t).settings.home.fullPath)}]],class:"flex-center cursor-pointer px-2"},{default:k(()=>[y("div",T,[e(s).avatar&&!e(a)?(r(),c("img",{key:0,src:e(s).avatar,onerror:()=>a.value=!0,class:"h-[24px] w-[24px] rounded-full"},null,8,V)):(r(),w(l,{key:1,name:"i-carbon:user-avatar-filled-alt",size:24,class:"text-gray-400"})),B(" "+I(e(s).account)+" ",1),n(l,{name:"i-ep:caret-bottom"})])]),_:1},8,["items"])])}}});export{j as _};
