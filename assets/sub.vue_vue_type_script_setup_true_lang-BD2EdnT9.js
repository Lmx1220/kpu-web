
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{d as I,aE as M,aq as S,A as h,G as N,o,c as f,j as T,f as r,h as g,T as F,ac as J,b6 as O,w as k,aL as P,n as W,e as $,F as p,ad as b,i as v,aY as L,K as w,a2 as _}from"./index-fOXGxjjY.js";import{r as j,I as A}from"./item-Ci3fcfhX.js";const V={class:"columns-3 p-4 2xl:columns-4"},Y=I({name:"SubMenu",__name:"sub",props:{uniqueKey:{},menu:{},level:{default:0}},setup(q){const t=q,m=t.menu.path??JSON.stringify(t.menu),y=M(),a=M(),n=S(j),R=h(()=>n.openedMenus.includes(t.uniqueKey.at(-1))),B=h(()=>({enter(e){e.offsetHeight>window.innerHeight&&(e.style.height=`${window.innerHeight}px`)},afterEnter:()=>{},beforeLeave:e=>{e.style.overflow="hidden",e.style.maxHeight=`${e.offsetHeight}px`},leave:e=>{e.style.maxHeight="0"},afterLeave(e){e.style.overflow="",e.style.maxHeight=""}})),E=h(()=>({enterActiveClass:"ease-in-out duration-300",enterFromClass:"opacity-0 translate-x-4",enterToClass:"opacity-100",leaveActiveClass:"ease-in-out duration-300",leaveFromClass:"opacity-100",leaveToClass:"opacity-0"})),d=h(()=>{let e=!0;return t.menu.children?t.menu.children.every(u=>{var s;return((s=u.meta)==null?void 0:s.menu)===!1})&&(e=!1):e=!1,e});function H(){d.value&&n.handleMenuItemClick(m)}let i;function K(){t.level===0&&(n.mouseInMenu=t.uniqueKey,i==null||i(),{stop:i}=w(()=>{if(d.value)n.openMenu(m,t.uniqueKey),_(()=>{const e=y.value.ref;let u=0,s=0;n.props.mode==="vertical"||t.level!==0?(u=e.getBoundingClientRect().top+e.scrollTop,s=(n.props.direction==="ltr"?e.getBoundingClientRect().left:document.documentElement.clientWidth-e.getBoundingClientRect().right)+e.getBoundingClientRect().width,u+a.value.getElement().offsetHeight>window.innerHeight&&(u=window.innerHeight-a.value.getElement().offsetHeight)):(u=e.getBoundingClientRect().top+e.getBoundingClientRect().height,s=n.props.direction==="ltr"?e.getBoundingClientRect().left:document.documentElement.clientWidth-e.getBoundingClientRect().right,u+a.value.getElement().offsetHeight>window.innerHeight&&(a.value.getElement().style.height=`${window.innerHeight-u}px`)),s+a.value.getElement().offsetWidth>document.documentElement.clientWidth&&(s=(n.props.direction==="ltr"?e.getBoundingClientRect().left:document.documentElement.clientWidth-e.getBoundingClientRect().right)-e.getBoundingClientRect().width),a.value.getElement().style.top=`${u}px`,a.value.getElement().style.insetInlineStart=`${s}px`});else{const e=t.menu.children?n.subMenus[m].indexPath.at(-1):n.items[m].indexPath.at(-1);n.openMenu(e,n.subMenus[e].indexPath)}},300))}function C(){t.level===0&&(n.mouseInMenu=[],i==null||i(),{stop:i}=w(()=>{n.mouseInMenu.length===0?n.closeMenu(t.uniqueKey):d.value&&!n.mouseInMenu.includes(t.uniqueKey.at(-1))&&n.closeMenu(t.uniqueKey.at(-1))},300))}function x(){i==null||i()}return(e,u)=>{const s=N("SubMenu");return o(),f(p,null,[T(A,{ref_key:"itemRef",ref:y,"unique-key":e.uniqueKey,item:e.menu,level:e.level,"sub-menu":r(d),onClick:H,onMouseenter:K,onMouseleave:C},null,8,["unique-key","item","level","sub-menu"]),r(d)?(o(),g(L,{key:0,to:"body",disabled:e.level!==0},[e.level===0?(o(),g(F,J({key:0},r(E),O(r(B))),{default:k(()=>[r(R)?(o(),g(r(P),{key:0,ref_key:"subMenuRef",ref:a,options:{scrollbars:{visibility:"hidden"}},defer:"",class:W(["sub-menu fixed z-3000 bg-[var(--g-sub-sidebar-bg)] px-1 shadow-xl ring-1 ring-stone-2 dark-ring-stone-8",{"rounded-lg":r(n).props.rounded}]),onMouseenter:x,onMouseleave:C},{default:k(()=>[$("div",V,[(o(!0),f(p,null,b(e.menu.children,l=>{var c;return o(),f("div",{key:l.path??JSON.stringify(l),class:"w-[200px] break-inside-avoid"},[((c=l.meta)==null?void 0:c.menu)!==!1?(o(),g(s,{key:0,"unique-key":[...e.uniqueKey,l.path??JSON.stringify(l)],menu:l,level:e.level+1},null,8,["unique-key","menu","level"])):v("",!0)])}),128))])]),_:1},8,["class"])):v("",!0)]),_:1},16)):(o(!0),f(p,{key:1},b(e.menu.children,l=>{var c;return o(),f(p,{key:l.path??JSON.stringify(l)},[((c=l.meta)==null?void 0:c.menu)!==!1?(o(),g(s,{key:0,"unique-key":[...e.uniqueKey,l.path??JSON.stringify(l)],menu:l,level:e.level+1},null,8,["unique-key","menu","level"])):v("",!0)],64)}),128))],8,["disabled"])):v("",!0)],64)}}});export{Y as _};
