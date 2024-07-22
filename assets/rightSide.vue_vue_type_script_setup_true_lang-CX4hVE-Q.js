
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{_}from"./HDropdownMenu.vue_vue_type_script_setup_true_lang-CuSAKVBE.js";import{d,a as h,c as f,b as g,a6 as b,F as v,r as x,H as S,o as r,f as c,h as n,w as k,i as y,j as e,M as w,q as B,t as I,S as i,_ as M}from"./index-Cv74hUM5.js";import{_ as N}from"./tools.vue_vue_type_script_setup_true_lang-DJNe4IO1.js";const T={class:"flex items-center"},V={class:"flex-center gap-1"},$=["src","onerror"],j=d({name:"ToolbarRightSide",__name:"rightSide",setup(C){const u=h(),t=f(),a=g(),{t:o}=b(),{generateI18nTitle:m}=v(),s=x(!1);return S(()=>a.avatar,()=>{s.value&&(s.value=!1)}),(D,E)=>{const l=M,p=_;return r(),c("div",T,[n(N,{mode:"right-side"}),n(p,{items:[[{label:e(m)(e(t).settings.home.title),handle:()=>e(u).push({path:e(t).settings.home.fullPath}),hide:!e(t).settings.home.enable},{label:e(o)("app.preferences"),handle:()=>e(i).emit("global-preferences-toggle"),hide:!e(t).settings.userPreferences.enable}],[{label:e(o)("app.hotkeys"),handle:()=>e(i).emit("global-hotkeys-intro-toggle"),hide:e(t).mode!=="pc"}],[{label:e(o)("app.logout"),handle:()=>e(a).logout()}]],class:"flex-center cursor-pointer px-2"},{default:k(()=>[y("div",V,[e(a).avatar&&!e(s)?(r(),c("img",{key:0,src:e(a).avatar,onerror:()=>s.value=!0,class:"h-[24px] w-[24px] rounded-full"},null,8,$)):(r(),w(l,{key:1,name:"i-carbon:user-avatar-filled-alt",size:24,class:"text-gray-400"})),B(" "+I(e(a).account)+" ",1),n(l,{name:"i-ep:caret-bottom"})])]),_:1},8,["items"])])}}});export{j as _};
