
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{d as K,ab as $,v as H,r as T,x as l,B as V,o as n,c as m,j as x,w as f,f as t,h as c,e as A,n as s,i,t as D,C as O,U as R,aX as _,I as U,_ as W,aq as X}from"./index-vu1a6MAo.js";import{_ as F}from"./HBadge.vue_vue_type_script_setup_true_lang-B8L-RQkF.js";import{_ as G}from"./_plugin-vue_export-helper-DlAUqK2U.js";const J=Symbol("rootMenu"),L=K({__name:"item",props:{uniqueKey:{},item:{},level:{default:0},subMenu:{type:Boolean,default:!1},expand:{type:Boolean,default:!1},alwaysExpand:{type:Boolean,default:!1}},setup(I,{expose:B}){const o=I,a=$(J),{generateI18nTitle:p}=H(),d=T(),v=l(()=>o.subMenu?a.subMenus[o.uniqueKey.at(-1)].active:a.activeIndex===o.uniqueKey.at(-1)),b=l(()=>v.value&&(!o.subMenu||a.isMenuPopup)),y=l(()=>{var u,r;let e;return(u=o.item.meta)!=null&&u.icon&&(e=o.item.meta.icon),v.value&&(r=o.item.meta)!=null&&r.activeIcon&&(e=o.item.meta.activeIcon),e}),N=l(()=>a.isMenuPopup?"":`padding-inline-start: ${20*(o.level??0)}px`);return B({ref:d}),(e,u)=>{const r=W,j=F,S=X,z=V("router-link");return n(),m("div",{ref_key:"itemRef",ref:d,class:s(["menu-item relative transition-all",{active:t(b),"py-1 px-2":t(a).isMenuPopup&&t(a).props.mode==="vertical"||t(a).isMenuPopup&&e.level!==0&&t(a).props.mode==="horizontal"||!t(a).isMenuPopup,"px-1 py-2":t(a).isMenuPopup&&e.level===0&&t(a).props.mode==="horizontal"}])},[x(z,{custom:"",to:e.uniqueKey.at(-1)??""},{default:f(({href:q,navigate:E})=>{var M;return[x(S,{enable:t(a).isMenuPopup&&e.level===0&&!e.subMenu,text:t(p)((M=e.item.meta)==null?void 0:M.title),placement:"right",class:"h-full w-full"},{default:f(()=>{var g,h,w,P;return[(n(),c(U(e.subMenu?"div":"a"),R({...!e.subMenu&&{href:(g=e.item.meta)!=null&&g.link?e.item.meta.link:q,target:(h=e.item.meta)!=null&&h.newWindow||(w=e.item.meta)!=null&&w.link?"_blank":"_self",class:"no-underline"}},{class:["group menu-item-container h-full w-full flex items-center justify-between gap-1 px-4 py-3",{...t(a).isMenuPopup||!e.alwaysExpand?{"cursor-pointer text-[var(--g-sub-sidebar-menu-color)] transition-all hover-bg-[var(--g-sub-sidebar-menu-hover-bg)] hover-text-[var(--g-sub-sidebar-menu-hover-color)]":!0,"text-[var(--g-sub-sidebar-menu-active-color)]! bg-[var(--g-sub-sidebar-menu-active-bg)]!":t(b),"rounded-2":t(a).props.rounded,"px-3!":t(a).isMenuPopup&&e.level===0,"py-3!":t(a).props.rounded&&t(a).isMenuPopup&&e.level!==0}:{"py-2! opacity-30":!0}}],title:t(p)((P=e.item.meta)==null?void 0:P.title)},_({...!e.subMenu&&{click:E}})),{default:f(()=>{var k,C;return[A("div",{class:s(["inline-flex flex-1 items-center justify-center gap-[12px]",{"flex-col":t(a).isMenuPopup&&e.level===0&&t(a).props.mode==="vertical","gap-1!":t(a).isMenuPopup&&e.level===0&&t(a).props.showCollapseName,"w-full":t(a).isMenuPopup&&e.level===0&&t(a).props.showCollapseName&&t(a).props.mode==="vertical"}]),style:O(t(N))},[t(y)?(n(),c(r,{key:0,name:t(y),size:18,class:s(["menu-item-container-icon",{"transition-transform group-hover-scale-120":t(a).isMenuPopup||!e.alwaysExpand}])},null,8,["name","class"])):i("",!0),t(a).isMenuPopup&&e.level===0&&!t(a).props.showCollapseName?i("",!0):(n(),m("span",{key:1,class:s(["w-0 flex-1 truncate text-sm transition-height transition-opacity transition-width",{"opacity-0 w-0 h-0":t(a).isMenuPopup&&e.level===0&&!t(a).props.showCollapseName,"w-full text-center":t(a).isMenuPopup&&e.level===0&&t(a).props.showCollapseName}])},D(t(p)((k=e.item.meta)==null?void 0:k.title)),3)),(C=e.item.meta)!=null&&C.badge&&!(t(a).isMenuPopup&&e.level===0)?(n(),c(j,{key:2,value:typeof e.item.meta.badge=="function"?e.item.meta.badge():e.item.meta.badge,class:"badge"},null,8,["value"])):i("",!0)],6),e.subMenu&&(!t(a).isMenuPopup||e.level!==0)&&(t(a).isMenuPopup||!e.alwaysExpand)?(n(),m("i",{key:0,class:s(["relative ms-1 w-[10px] after:absolute before:absolute after:h-[1.5px] after:w-[6px] before:h-[1.5px] before:w-[6px] after:bg-current before:bg-current after:transition-transform-200 before:transition-transform-200 after:content-empty before:content-empty after:-translate-y-[1px] before:-translate-y-[1px]",[e.expand?"before--rotate-45 before--translate-x-[2px] after-rotate-45 after-translate-x-[2px]":"before-rotate-45 before--translate-x-[2px] after--rotate-45 after-translate-x-[2px]",t(a).isMenuPopup&&e.level===0&&"opacity-0",t(a).isMenuPopup&&e.level!==0&&"-rotate-90 -top-[1.5px]"]])},null,2)):i("",!0)]}),_:2},1040,["class","title"]))]}),_:2},1032,["enable","text"])]}),_:1},8,["to"])],2)}}}),Q=G(L,[["__scopeId","data-v-a0574417"]]),te=Object.freeze(Object.defineProperty({__proto__:null,default:Q},Symbol.toStringTag,{value:"Module"}));export{Q as I,te as i,J as r};
