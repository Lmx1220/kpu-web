
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{_}from"./HDropdownMenu.vue_vue_type_script_setup_true_lang-BoDp80gj.js";import{d as h,a as d,b as f,N as g,aA as v,v as b,r as x,y as S,o as r,c,j as n,w as k,e as y,f as e,h as w,p as B,t as N,J as i,_ as I}from"./index-D4b_dGnp.js";import{_ as P}from"./tools.vue_vue_type_script_setup_true_lang-Bp2Vd73U.js";const T={class:"flex items-center"},V={class:"flex-center gap-1"},$=["src","onerror"],z=h({name:"ToolbarRightSide",__name:"rightSide",setup(C){const u=d(),t=f(),s=g(),{t:o}=v(),{generateI18nTitle:m}=b(),a=x(!1);return S(()=>s.avatar,()=>{a.value&&(a.value=!1)}),(D,E)=>{const l=I,p=_;return r(),c("div",T,[n(P,{mode:"right-side"}),n(p,{items:[[{label:e(m)(e(t).settings.home.title),handle:()=>e(u).push({path:e(t).settings.home.fullPath}),hide:!e(t).settings.home.enable},{label:e(o)("app.preferences"),handle:()=>e(i).emit("global-preferences-toggle"),hide:!e(t).settings.userPreferences.enable}],[{label:e(o)("app.hotkeys"),handle:()=>e(i).emit("global-hotkeys-intro-toggle"),hide:e(t).mode!=="pc"}],[{label:e(o)("app.logout"),handle:()=>e(s).logout(e(t).settings.home.fullPath)}]],class:"flex-center cursor-pointer px-2"},{default:k(()=>[y("div",V,[e(s).avatar&&!e(a)?(r(),c("img",{key:0,src:e(s).avatar,onerror:()=>a.value=!0,class:"h-[24px] w-[24px] rounded-full"},null,8,$)):(r(),w(l,{key:1,name:"i-carbon:user-avatar-filled-alt",size:24,class:"text-gray-400"})),B(" "+N(e(s).account)+" ",1),n(l,{name:"i-ep:caret-bottom"})])]),_:1},8,["items"])])}}});export{z as _};