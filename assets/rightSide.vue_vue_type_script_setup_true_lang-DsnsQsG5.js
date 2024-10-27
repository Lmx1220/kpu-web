
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{_}from"./HDropdownMenu.vue_vue_type_script_setup_true_lang-C9GjONLd.js";import{d as h,j as d,u as f,O as g,ax as x,x as b,r as v,z as S,o as r,c,h as n,w as k,a as y,b as e,e as w,q as B,t as I,L as i,_ as N}from"./index-D_P7dC0L.js";import{_ as P}from"./tools.vue_vue_type_script_setup_true_lang-E10U4Eoz.js";const T={class:"flex items-center"},V={class:"flex-center gap-1"},$=["src","onerror"],j=h({name:"ToolbarRightSide",__name:"rightSide",setup(z){const u=d(),t=f(),s=g(),{t:o}=x(),{generateI18nTitle:m}=b(),a=v(!1);return S(()=>s.avatar,()=>{a.value&&(a.value=!1)}),(C,D)=>{const l=N,p=_;return r(),c("div",T,[n(P,{mode:"right-side"}),n(p,{items:[[{label:e(m)(e(t).settings.home.title),handle:()=>e(u).push({path:e(t).settings.home.fullPath}),hide:!e(t).settings.home.enable},{label:e(o)("app.preferences"),handle:()=>e(i).emit("global-preferences-toggle"),hide:!e(t).settings.userPreferences.enable}],[{label:e(o)("app.hotkeys"),handle:()=>e(i).emit("global-hotkeys-intro-toggle"),hide:e(t).mode!=="pc"}],[{label:e(o)("app.logout"),handle:()=>e(s).logout(e(t).settings.home.fullPath)}]],class:"flex-center cursor-pointer px-2"},{default:k(()=>[y("div",V,[e(s).avatar&&!e(a)?(r(),c("img",{key:0,src:e(s).avatar,onerror:()=>a.value=!0,class:"h-[24px] w-[24px] rounded-full"},null,8,$)):(r(),w(l,{key:1,name:"i-carbon:user-avatar-filled-alt",size:24,class:"text-gray-400"})),B(" "+I(e(s).account)+" ",1),n(l,{name:"i-ep:caret-bottom"})])]),_:1},8,["items"])])}}});export{j as _};
