
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{d as S,u as $,c as C,D as N,F as w,o as s,M as u,w as B,j as e,f as l,h as R,i as g,K as r,O as T,X as j,N as d,t as I,T as V,_ as z,z as D}from"./index-De2lUAjd.js";import{_ as F}from"./index.vue_vue_type_script_setup_true_lang-CwfaJKnM.js";import{_ as E}from"./index.vue_vue_type_script_setup_true_lang-D6Iq5yz0.js";import{_ as K}from"./index.vue_vue_type_script_setup_true_lang-rL198W94.js";import"./logo-D-CqFC5K.js";import"./sub.vue_vue_type_script_setup_true_lang-Bt7L98HD.js";import"./item-CjxTxwxz.js";import"./HTooltip.vue_vue_type_script_setup_true_lang-BkeSQ_ey.js";import"./HBadge.vue_vue_type_script_setup_true_lang-B_H8y5To.js";import"./sub.vue_vue_type_script_setup_true_lang-CZeEZQMB.js";import"./item-BoLTcxrD.js";const L={key:0,class:"main-sidebar-container"},O={class:"menu"},X=["title","onClick"],q={class:"w-full inline-flex flex-1 flex-col items-center justify-center gap-1"},G={class:"w-full flex-1 truncate text-center text-sm transition-height transition-opacity transition-width"},H=S({name:"MainSidebar",__name:"index",setup(J){const m=$(),t=C(),a=N(),{switchTo:M}=w(),{generateI18nTitle:_}=w();function f(c,p,o){let n;return!c&&p||c&&!o?n=p:c&&o&&(n=o),n}return(c,p)=>{const o=z;return s(),u(V,{name:"main-sidebar"},{default:B(()=>[["side","only-side","side-panel"].includes(e(t).settings.menu.mode)||e(t).mode==="mobile"&&e(t).settings.menu.mode!=="single"?(s(),l("div",L,[R(F,{"show-title":!1,class:"sidebar-logo"}),g("div",O,[e(t).settings.menu.mode==="side"||e(t).mode==="mobile"&&e(t).settings.menu.mode!=="single"?(s(),l("div",{key:0,class:r(["w-full flex flex-col of-hidden transition-all",{[`menu-active-${e(t).settings.menu.style}`]:e(t).settings.menu.style!==""}])},[(s(!0),l(T,null,j(e(a).allMenus,(n,i)=>{var v,h,y,b,x,k;return s(),l("div",{key:i,class:r(["menu-item relative px-2 py-1 transition-all",{active:i===e(a).actived}])},[n.children&&n.children.length!==0?(s(),l("div",{key:0,class:r(["group menu-item-container h-full w-full flex cursor-pointer items-center justify-between gap-1 py-4 text-[var(--g-main-sidebar-menu-color)] transition-all hover-bg-[var(--g-main-sidebar-menu-hover-bg)] hover-text-[var(--g-main-sidebar-menu-hover-color)] px-2!",{"text-[var(--g-main-sidebar-menu-active-color)]! bg-[var(--g-main-sidebar-menu-active-bg)]!":i===e(a).actived,"rounded-lg":e(t).settings.menu.isRounded}]),title:e(_)((v=n.meta)==null?void 0:v.title),onClick:P=>e(M)(i)},[g("div",q,[f(i===e(a).actived,(h=n.meta)==null?void 0:h.icon,(y=n.meta)==null?void 0:y.activeIcon)?(s(),u(o,{key:0,name:f(i===e(a).actived,(b=n.meta)==null?void 0:b.icon,(x=n.meta)==null?void 0:x.activeIcon),class:"menu-item-container-icon transition-transform group-hover-scale-120"},null,8,["name"])):d("",!0),g("span",G,I(e(_)((k=n.meta)==null?void 0:k.title)),1)])],10,X)):d("",!0)],2)}),128))],2)):e(t).settings.menu.mode==="only-side"?(s(),u(E,{key:1,menu:e(a).allMenus,value:e(m).meta.activeMenu||e(m).path,"show-collapse-name":"",collapse:"",rounded:e(t).settings.menu.isRounded,direction:e(t).settings.app.direction,class:r(["-mt-2",{[`menu-active-${e(t).settings.menu.style}`]:e(t).settings.menu.style!==""}])},null,8,["menu","value","rounded","direction","class"])):e(t).settings.menu.mode==="side-panel"?(s(),u(K,{key:2,menu:e(a).allMenus,value:e(m).meta.activeMenu||e(m).path,"show-collapse-name":"",collapse:"",rounded:e(t).settings.menu.isRounded,direction:e(t).settings.app.direction,class:r(["-mt-2",{[`menu-active-${e(t).settings.menu.style}`]:e(t).settings.menu.style!==""}])},null,8,["menu","value","rounded","direction","class"])):d("",!0)])])):d("",!0)]),_:1})}}}),ie=D(H,[["__scopeId","data-v-78f4812d"]]);export{ie as default};