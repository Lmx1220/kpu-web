
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{d as b,u as B,c as N,G as z,H as $,r as T,o as a,N as u,w as j,j as e,f as m,i as d,h as S,x as H,L as l,P as I,Y as L,O as p,t as V,T as Y,_ as D,z as E}from"./index-D6ceO_Rb.js";import{_ as F}from"./index.vue_vue_type_script_setup_true_lang-BwBch-tW.js";import{_ as G}from"./rightSide.vue_vue_type_script_setup_true_lang-CoV3AR3a.js";import{_ as O}from"./index.vue_vue_type_script_setup_true_lang-CFdZIWUc.js";import{_ as P}from"./index.vue_vue_type_script_setup_true_lang-BiA_9xFw.js";import"./logo-D-CqFC5K.js";import"./HDropdownMenu.vue_vue_type_script_setup_true_lang-D7zjQdsi.js";import"./tools.vue_vue_type_script_setup_true_lang-BH-9kzo4.js";import"./index-DwjQTqVf.js";import"./index-C3VssulX.js";import"./item.vue_vue_type_script_setup_true_lang-CkgfX4zL.js";import"./index.vue_vue_type_script_setup_true_lang-uG6gP8ji.js";import"./HDropdown-CLLtrMJd.js";import"./HTabList.vue_vue_type_script_setup_true_lang-DabaQfvA.js";import"./use-resolve-button-type-JCC0XtAz.js";import"./index.vue_vue_type_script_setup_true_lang-DEsWP-w_.js";import"./panel-CBxJFMxe.js";import"./sortable.esm-C0-Qcoum.js";import"./index.vue_vue_type_script_setup_true_lang-CE78MtSw.js";import"./index-BptTxHvN.js";import"./index.vue_vue_type_script_setup_true_lang-BpS_7Bsf.js";import"./index.vue_vue_type_script_setup_true_lang-QJmP17GD.js";import"./HKbd-DUWY4SV_.js";import"./index-BgKTVELf.js";import"./HBadge.vue_vue_type_script_setup_true_lang-BPE0O9kb.js";import"./panel-D69evf5O.js";import"./notification-2ujn3zdu.js";import"./index-GZ64sOxf.js";import"./useMainPage-B9Bch9Vd.js";import"./useTabbar-BPuGGY7H.js";import"./sub.vue_vue_type_script_setup_true_lang-BY9n09vi.js";import"./item-Ctx7MOHd.js";import"./HTooltip.vue_vue_type_script_setup_true_lang-B1vxTOPB.js";import"./sub.vue_vue_type_script_setup_true_lang-DLczZQ1O.js";import"./item-y8pf2695.js";const W={key:0},q={class:"header-container"},J=["title","onClick"],K={class:"inline-flex flex-1 items-center justify-center gap-1"},Q={class:"w-full flex-1 truncate text-sm transition-height transition-opacity transition-width"},U=b({name:"LayoutHeader",__name:"index",setup(X){const c=B(),t=N(),o=z(),{switchTo:C}=$(),{generateI18nTitle:f}=$();function _(s,h,r){let n;return!s&&h||s&&!r?n=h:s&&r&&(n=r),n}const g=T();function R(s){(s.deltaY||s.detail!==0)&&g.value.scrollBy({left:(s.deltaY||s.detail)>0?50:-50})}return(s,h)=>{const r=D;return a(),u(Y,{name:"header"},{default:j(()=>[e(t).mode==="pc"&&["head","only-head","head-panel"].includes(e(t).settings.menu.mode)?(a(),m("header",W,[d("div",q,[S(F,{class:"title"}),d("div",{ref_key:"menuRef",ref:g,class:"menu-container",onWheel:H(R,["prevent"])},[e(t).settings.menu.mode==="head"?(a(),m("div",{key:0,class:l(["menu h-full flex of-hidden transition-all",{[`menu-active-${e(t).settings.menu.style}`]:e(t).settings.menu.style!==""}])},[(a(!0),m(I,null,L(e(o).allMenus,(n,i)=>{var v,y,k,x,w,M;return a(),m("div",{key:i,class:l(["menu-item relative mx-1 py-2 transition-all",{active:i===e(o).actived}])},[n.children&&n.children.length!==0?(a(),m("div",{key:0,class:l(["group menu-item-container h-full w-full flex cursor-pointer items-center justify-between gap-1 px-3 text-[var(--g-header-menu-color)] transition-all hover-bg-[var(--g-header-menu-hover-bg)] hover-text-[var(--g-header-menu-hover-color)]",{"text-[var(--g-header-menu-active-color)]! bg-[var(--g-header-menu-active-bg)]!":i===e(o).actived,"rounded-2":e(t).settings.menu.isRounded}]),title:e(f)((v=n.meta)==null?void 0:v.title),onClick:Z=>e(C)(i)},[d("div",K,[_(i===e(o).actived,(y=n.meta)==null?void 0:y.icon,(k=n.meta)==null?void 0:k.activeIcon)?(a(),u(r,{key:0,name:_(i===e(o).actived,(x=n.meta)==null?void 0:x.icon,(w=n.meta)==null?void 0:w.activeIcon),class:"menu-item-container-icon transition-transform group-hover-scale-120"},null,8,["name"])):p("",!0),d("span",Q,V(e(f)((M=n.meta)==null?void 0:M.title)),1)])],10,J)):p("",!0)],2)}),128))],2)):e(t).settings.menu.mode==="only-head"?(a(),u(O,{key:1,menu:e(o).allMenus,value:e(c).meta.activeMenu||e(c).path,mode:"horizontal","show-collapse-name":"",rounded:e(t).settings.menu.isRounded,direction:e(t).settings.app.direction,class:l(["menu",{[`menu-active-${e(t).settings.menu.style}`]:e(t).settings.menu.style!==""}])},null,8,["menu","value","rounded","direction","class"])):e(t).settings.menu.mode==="head-panel"?(a(),u(P,{key:2,menu:e(o).allMenus,value:e(c).meta.activeMenu||e(c).path,mode:"horizontal","show-collapse-name":"",rounded:e(t).settings.menu.isRounded,panel:"",direction:e(t).settings.app.direction,class:l(["menu",{[`menu-active-${e(t).settings.menu.style}`]:e(t).settings.menu.style!==""}])},null,8,["menu","value","rounded","direction","class"])):p("",!0)],544),S(G)])])):p("",!0)]),_:1})}}}),He=E(U,[["__scopeId","data-v-47e79324"]]);export{He as default};
