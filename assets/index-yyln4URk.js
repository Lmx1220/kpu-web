
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{aS as St,aj as Bt,aT as wt,d as Pt,aU as It,j as I,u as Wt,a as Ot,c as Nt,a7 as Rt,aV as Et,a6 as _t,F as Tt,G as Se,r as He,a8 as jt,a9 as Vt,B as Xe,H as Ze,a3 as Ht,s as Be,I as qe,J as Ft,o as te,f as se,i as re,h as Fe,w as Lt,O as At,X as zt,K as Le,M as Je,N as Ae,q as $t,t as Qe,x as me,k as Dt,v as Kt,a5 as Ut,_ as Yt,p as Gt,l as Xt,z as Zt}from"./index-RH8yPTKC.js";import{S as qt}from"./sortable.esm-C0-Qcoum.js";import{i as et}from"./index.es-DQP9qc4Z.js";import Jt from"./moreAction-nwK0V-Yp.js";import{u as Qt}from"./useTabbar-D1GJj3hP.js";import{u as en}from"./useMainPage-DzCmlBAe.js";import"./HDropdown-Bi0Ornjg.js";import"./HTooltip.vue_vue_type_script_setup_true_lang-7CqZUj50.js";var ze={exports:{}};(function(ue,we){(function(_,e){e(we,St)})(Bt,function(_,e){let b=null;function T(){return b!==null}function pe(t){b&&U(),b=t}function he(t){t===b&&(b=null)}function U(){b&&(b.closeMenu(),b=null)}const z={defaultDirection:"br",defaultMinWidth:100,defaultMaxWidth:600,defaultZindex:100,defaultAdjustPadding:{x:0,y:10}};function S(t,n){let i=t.offsetTop;return t.offsetParent!=null&&t.offsetParent!=n&&(i-=t.offsetParent.scrollTop,i+=S(t.offsetParent,n)),i}function Z(t,n){let i=t.offsetLeft;return t.offsetParent!=null&&t.offsetParent!=n&&(i-=t.offsetParent.scrollLeft,i+=Z(t.offsetParent,n)),i}function ne(t,n,i,d){return{x:Z(t,d)+n,y:S(t,d)+i}}const oe="mx-menu-default-container",Q="mx-menu-container-";let Pe=0;function ve(t){const{getContainer:n,zIndex:i}=t;if(n){const h=typeof n=="function"?n():n;if(h){let k=h.getAttribute("id");return k||(k=Q+Pe++,h.setAttribute("id",k)),{eleId:k,container:h,isNew:!1}}}let d=document.getElementById(oe);return d||(d=document.createElement("div"),d.setAttribute("id",oe),d.setAttribute("class","mx-menu-ghost-host fullscreen"),document.body.appendChild(d)),d.style.zIndex=(i==null?void 0:i.toString())||z.defaultZindex.toString(),{eleId:oe,container:d,isNew:!0}}function ae(t){return typeof t=="number"?`${t}px`:t}const V=e.defineComponent({props:{vnode:{type:null},data:{type:null,default:null}},setup(t){const{vnode:n,data:i}=e.toRefs(t);return()=>typeof n.value=="function"?n.value(i.value):n.value}}),le=(t,n)=>{const i=t.__vccOpts||t;for(const[d,h]of n)i[d]=h;return i},Ie={},We={class:"mx-checked-mark","aria-hidden":"true",viewBox:"0 0 1024 1024"},Oe=[e.createElementVNode("path",{d:"M129.3,428.6L52,512l345,372.5l575-620.8l-69.5-75L400.4,718.2L129.3,428.6z"},null,-1)];function Ne(t,n){return e.openBlock(),e.createElementBlock("svg",We,Oe)}const Re=le(Ie,[["render",Ne]]),be={},f={class:"mx-right-arrow","aria-hidden":"true",viewBox:"0 0 1024 1024"},r=[e.createElementVNode("path",{d:"M307.018 49.445c11.517 0 23.032 4.394 31.819 13.18L756.404 480.18c8.439 8.438 13.181 19.885 13.181 31.82s-4.741 23.38-13.181 31.82L338.838 961.376c-17.574 17.573-46.065 17.573-63.64-0.001-17.573-17.573-17.573-46.065 0.001-63.64L660.944 512 275.198 126.265c-17.574-17.573-17.574-46.066-0.001-63.64C283.985 53.839 295.501 49.445 307.018 49.445z"},null,-1)];function M(t,n){return e.openBlock(),e.createElementBlock("svg",f,r)}const s=le(be,[["render",M]]),Y={class:"mx-item-row"},ee=["xlink:href"],ke={key:1,class:"label"},X={class:"mx-item-row"},tt={class:"mx-shortcut"},Ce=e.defineComponent({__name:"ContextMenuItem",props:{disabled:{type:Boolean,default:!1},hidden:{type:Boolean,default:!1},customRender:{type:Function,default:null},customClass:{type:String,default:""},clickHandler:{type:Function,default:null},label:{type:[String,Object,Function],default:""},icon:{type:[String,Object,Function],default:""},iconFontClass:{type:String,default:"iconfont"},checked:{type:Boolean,default:!1},shortcut:{type:String,default:""},svgIcon:{type:String,default:""},svgProps:{type:Object,default:null},preserveIconWidth:{type:Boolean,default:!0},showRightArrow:{type:Boolean,default:!1},hasChildren:{type:Boolean,default:!1},clickClose:{type:Boolean,default:!0},clickableWhenHasChildren:{type:Boolean,default:!1},rawMenuItem:{type:Object,default:void 0}},emits:["click","subMenuOpen","subMenuClose"],setup(t,{expose:n,emit:i}){const d=t,h=i,{clickHandler:k,clickClose:l,clickableWhenHasChildren:N,disabled:y,hidden:m,label:o,icon:j,iconFontClass:E,showRightArrow:$,shortcut:O,hasChildren:C}=e.toRefs(d),x=e.ref(!1),p=e.ref(!1),c=e.ref(),v=e.inject("globalOptions"),B=e.inject("globalHasSlot"),u=e.inject("globalRenderSlot"),R=e.inject("globalCloseMenu"),W=e.inject("menuContext"),H={showSubMenu:()=>x.value?(W.markActiveMenuItem(H,!0),!0):C.value?(G(),!0):!1,isDisabledOrHidden:()=>y.value||m.value,getElement:()=>c.value,focus:()=>p.value=!0,blur:()=>p.value=!1,click:D};e.onMounted(()=>{W.isMenuItemDataCollectedFlag()?e.nextTick(()=>{let g=0;const K=W.getElement();if(K){let q=0;for(let w=0;w<K.children.length;w++){const J=K.children[w];if(J.getAttribute("data-type")==="ContextMenuItem"){if(J===c.value){g=q;break}q++}}}W.addChildMenuItem(H,g)}):W.addChildMenuItem(H)}),e.onBeforeUnmount(()=>{W.removeChildMenuItem(H)});function D(g){if(!y.value){if(g){const K=g.target;if(K.classList.contains("mx-context-no-clickable")||v.value.ignoreClickClassName&&K.classList.contains(v.value.ignoreClickClassName))return;if(v.value.clickCloseClassName&&K.classList.contains(v.value.clickCloseClassName)){g.stopPropagation(),R(d.rawMenuItem);return}}C.value?N.value?(typeof k.value=="function"&&k.value(g),h("click",g)):x.value||G():(typeof k.value=="function"&&k.value(g),h("click",g),l.value&&R(d.rawMenuItem))}}function G(g){p.value=!1,W.checkCloseOtherSubMenuTimeOut()||W.closeOtherSubMenu(),y.value||(W.markActiveMenuItem(H),C.value&&(g||W.markThisOpenedByKeyBoard(),W.addOpenedSubMenu(()=>{p.value=!1,x.value=!1,h("subMenuClose")}),x.value=!0,h("subMenuOpen")))}function A(){return{disabled:y.value,label:o.value,icon:j.value,iconFontClass:E.value,showRightArrow:$.value,clickClose:l.value,clickableWhenHasChildren:N.value,shortcut:O.value,theme:v.value.theme,isOpen:x,hasChildren:C,onClick:D,onMouseEnter:G,closeMenu:R}}return n({showSubMenu:x,keyBoardFocusMenu:p}),(g,K)=>e.unref(m)?e.createCommentVNode("",!0):(e.openBlock(),e.createElementBlock("div",{key:0,class:"mx-context-menu-item-wrapper",ref_key:"menuItemRef",ref:c,"data-type":"ContextMenuItem"},[e.unref(B)("itemRender")?(e.openBlock(),e.createBlock(e.unref(V),{key:0,vnode:()=>e.unref(u)("itemRender",A())},null,8,["vnode"])):t.customRender?(e.openBlock(),e.createBlock(e.unref(V),{key:1,vnode:t.customRender,data:A()},null,8,["vnode","data"])):(e.openBlock(),e.createElementBlock("div",{key:2,class:e.normalizeClass(["mx-context-menu-item",e.unref(y)?"disabled":"",p.value?"keyboard-focus":"",t.customClass?" "+t.customClass:"",x.value?"open":""]),onClick:D,onMouseenter:G},[e.renderSlot(g.$slots,"default",{},()=>[e.createElementVNode("div",Y,[e.createElementVNode("div",{class:e.normalizeClass(["mx-icon-placeholder",t.preserveIconWidth?"preserve-width":""])},[e.renderSlot(g.$slots,"icon",{},()=>[e.unref(B)("itemIconRender")?(e.openBlock(),e.createBlock(e.unref(V),{key:0,vnode:()=>e.unref(u)("itemIconRender",A())},null,8,["vnode"])):typeof t.svgIcon=="string"&&t.svgIcon?(e.openBlock(),e.createElementBlock("svg",e.mergeProps({key:1,class:"icon svg"},t.svgProps),[e.createElementVNode("use",{"xlink:href":t.svgIcon},null,8,ee)],16)):typeof e.unref(j)!="string"?(e.openBlock(),e.createBlock(e.unref(V),{key:2,vnode:e.unref(j),data:e.unref(j)},null,8,["vnode","data"])):typeof e.unref(j)=="string"&&e.unref(j)!==""?(e.openBlock(),e.createElementBlock("i",{key:3,class:e.normalizeClass(e.unref(j)+" icon "+e.unref(E)+" "+e.unref(v).iconFontClass)},null,2)):e.createCommentVNode("",!0)]),t.checked?e.renderSlot(g.$slots,"check",{key:0},()=>[e.unref(B)("itemCheckRender")?(e.openBlock(),e.createBlock(e.unref(V),{key:0,vnode:()=>e.unref(u)("itemCheckRender",A())},null,8,["vnode"])):e.createCommentVNode("",!0),e.createVNode(Re)]):e.createCommentVNode("",!0)],2),e.renderSlot(g.$slots,"label",{},()=>[e.unref(B)("itemLabelRender")?(e.openBlock(),e.createBlock(e.unref(V),{key:0,vnode:()=>e.unref(u)("itemLabelRender",A())},null,8,["vnode"])):typeof e.unref(o)=="string"?(e.openBlock(),e.createElementBlock("span",ke,e.toDisplayString(e.unref(o)),1)):(e.openBlock(),e.createBlock(e.unref(V),{key:2,vnode:e.unref(o),data:e.unref(o)},null,8,["vnode","data"]))])]),e.createElementVNode("div",X,[e.unref(O)?e.renderSlot(g.$slots,"shortcut",{key:0},()=>[e.unref(B)("itemShortcutRender")?(e.openBlock(),e.createBlock(e.unref(V),{key:0,vnode:()=>e.unref(u)("itemShortcutRender",A())},null,8,["vnode"])):e.createCommentVNode("",!0),e.createElementVNode("span",tt,e.toDisplayString(e.unref(O)),1)]):e.createCommentVNode("",!0),e.unref($)?e.renderSlot(g.$slots,"rightArrow",{key:1},()=>[e.unref(B)("itemRightArrowRender")?(e.openBlock(),e.createBlock(e.unref(V),{key:0,vnode:()=>e.unref(u)("itemRightArrowRender",A())},null,8,["vnode"])):e.createCommentVNode("",!0),e.createVNode(s)]):e.createCommentVNode("",!0)])])],34)),e.unref(v).menuTransitionProps?(e.openBlock(),e.createBlock(e.Transition,e.normalizeProps(e.mergeProps({key:3},e.unref(v).menuTransitionProps)),{default:e.withCtx(()=>[x.value?e.renderSlot(g.$slots,"submenu",{key:0}):e.createCommentVNode("",!0)]),_:3},16)):x.value?e.renderSlot(g.$slots,"submenu",{key:4}):e.createCommentVNode("",!0)],512))}}),nt=e.defineComponent({name:"ContextMenuSperator",components:{VNodeRender:V},setup(){const t=e.inject("globalHasSlot"),n=e.inject("globalRenderSlot");return{globalHasSlot:t,globalRenderSlot:n}}}),ot={key:1,class:"mx-context-menu-item-sperator mx-context-no-clickable"};function lt(t,n,i,d,h,k){const l=e.resolveComponent("VNodeRender");return t.globalHasSlot("separatorRender")?(e.openBlock(),e.createBlock(l,{key:0,vnode:()=>t.globalRenderSlot("separatorRender",{})},null,8,["vnode"])):(e.openBlock(),e.createElementBlock("div",ot))}const xe=le(nt,[["render",lt]]),at=e.defineComponent({name:"ContextSubMenu",components:{ContextMenuItem:Ce,ContextMenuSeparator:xe,ContextMenuIconRight:s},props:{items:{type:Object,default:null},maxWidth:{type:[String,Number],default:0},minWidth:{type:[String,Number],default:0},adjustPosition:{type:Boolean,default:!0},direction:{type:String,default:"br"}},setup(t){const n=e.inject("menuContext"),i=e.inject("globalOptions"),d=e.inject("globalHasSlot"),h=e.inject("globalRenderSlot"),{zIndex:k,getParentWidth:l,getParentHeight:N}=n,{adjustPosition:y}=e.toRefs(t),m=e.ref(),o=e.ref(),j=e.ref(),E=[],$=e.inject("globalSetCurrentSubMenu"),O=[];let C=null,x=0;function p(){C&&C.blur()}function c(a,P){if(a){for(let F=P!==void 0?P:0;F<O.length;F++)if(!O[F].isDisabledOrHidden()){v(F);break}}else for(let F=P!==void 0?P:O.length-1;F>=0;F--)if(!O[F].isDisabledOrHidden()){v(F);break}}function v(a){if(C&&p(),a!==void 0&&(C=O[Math.max(0,Math.min(a,O.length-1))]),!!C&&(C.focus(),q.value)){const P=C.getElement();P&&(D.value=Math.min(Math.max(-G.value,-P.offsetTop-P.offsetHeight+J.value),0))}}function B(){$(u)}const u={isTopLevel:()=>n.getParentContext()===null,closeSelfAndActiveParent:()=>{const a=H.getParentContext();if(a){a.closeOtherSubMenu();const P=a.getSubMenuInstanceContext();if(P)return P.focusCurrentItem(),!0}return!1},closeCurrentSubMenu:()=>{var a;return(a=H.getParentContext())==null?void 0:a.closeOtherSubMenu()},moveCurrentItemFirst:()=>c(!0),moveCurrentItemLast:()=>c(!1),moveCurrentItemDown:()=>c(!0,C?O.indexOf(C)+1:0),moveCurrentItemUp:()=>c(!1,C?O.indexOf(C)-1:0),focusCurrentItem:()=>v(),openCurrentItemSubMenu:()=>C?C==null?void 0:C.showSubMenu():!1,triggerCurrentItemClick:a=>C==null?void 0:C.click(a)};let R=!1,W=!1;const H={zIndex:k+1,container:n.container,adjustPadding:i.value.adjustPadding||z.defaultAdjustPadding,getParentWidth:()=>{var a;return((a=m.value)==null?void 0:a.offsetWidth)||0},getParentHeight:()=>{var a;return((a=m.value)==null?void 0:a.offsetHeight)||0},getParentX:()=>w.value.x,getParentY:()=>w.value.y,getParentAbsX:()=>m.value?Z(m.value,n.container):0,getParentAbsY:()=>m.value?S(m.value,n.container):0,getPositon:()=>[0,0],addOpenedSubMenu(a){E.push(a)},closeOtherSubMenu(){E.forEach(a=>a()),E.splice(0,E.length),$(u)},checkCloseOtherSubMenuTimeOut(){return x?(clearTimeout(x),x=0,!0):!1},closeOtherSubMenuWithTimeOut(){x=setTimeout(()=>{x=0,this.closeOtherSubMenu()},200)},addChildMenuItem:(a,P)=>{P===void 0?O.push(a):O.splice(P,0,a)},removeChildMenuItem:a=>{O.splice(O.indexOf(a),1)},markActiveMenuItem:(a,P=!1)=>{p(),C=a,P&&v()},markThisOpenedByKeyBoard:()=>{R=!0},isOpenedByKeyBoardFlag:()=>R?(R=!1,!0):!1,isMenuItemDataCollectedFlag:()=>W,getElement:()=>m.value||null,getParentContext:()=>n,getSubMenuInstanceContext:()=>u};e.provide("menuContext",H);const D=e.ref(0),G=e.ref(0);function A(a){a?D.value=Math.min(Math.max(D.value-50,-G.value),0):D.value=Math.min(D.value+50,0)}function g(a){a.preventDefault(),a.stopPropagation(),A(a.deltaY>0)}function K(a){i.value.mouseScroll&&(a.preventDefault(),a.stopPropagation(),A(a.deltaY>0))}const q=e.ref(!1),w=e.ref({x:0,y:0}),J=e.ref(0);return e.onMounted(()=>{const a=n.getPositon();w.value={x:a[0]??i.value.xOffset??0,y:a[1]??i.value.yOffset??0},$(u),e.nextTick(()=>{var P,F;const L=m.value;if(L&&o.value){const{container:ie}=n,_e=(l==null?void 0:l())??0,Ct=(N==null?void 0:N())??0,ye=typeof n.adjustPadding=="number"?n.adjustPadding:((P=n.adjustPadding)==null?void 0:P.x)??0,Me=typeof n.adjustPadding=="number"?n.adjustPadding:((F=n.adjustPadding)==null?void 0:F.y)??0,ce=Ct>0?Me:0,xt=document.documentElement.scrollHeight,gt=document.documentElement.scrollWidth,yt=Math.min(gt,ie.offsetWidth),Te=Math.min(xt,ie.offsetHeight);let je=Z(L,ie),Ve=S(L,ie);t.direction.includes("l")?w.value.x-=L.offsetWidth+ye:t.direction.includes("r")?w.value.x+=_e+ye:(w.value.x+=_e/2,w.value.x-=(L.offsetWidth+ye)/2),t.direction.includes("t")?w.value.y-=L.offsetHeight+Me*2:t.direction.includes("b")?w.value.y-=Me:w.value.y-=(L.offsetHeight+Me)/2,y.value&&e.nextTick(()=>{je=Z(L,ie),Ve=S(L,ie);const Mt=je+L.offsetWidth-yt,Ge=Ve+L.offsetHeight+ce*2-Te;if(q.value=Ge>0,G.value=L.offsetHeight-Te+ce*2,Mt>0){const de=_e+L.offsetWidth-ye,fe=je;de>fe?w.value.x-=fe:w.value.x-=de}if(q.value){const de=Ge,fe=Ve;de>fe?w.value.y-=fe-ce:w.value.y-=de-ce,J.value=Te-ce*2}else J.value=0})}L==null||L.focus({preventScroll:!0}),n.isOpenedByKeyBoardFlag()&&c(!0),W=!0})}),{menu:m,scroll:o,options:i,zIndex:k,constOptions:z,scrollValue:D,upScrollButton:j,overflow:q,position:w,scrollHeight:G,maxHeight:J,globalHasSlot:d,globalRenderSlot:h,onScroll:A,onSubMenuBodyClick:B,onMouseWhell:K,onMouseWhellMx:g,solveNumberOrStringSize:ae}}}),it={key:0,class:"mx-context-menu-updown placeholder"},st={key:1,class:"mx-context-menu-updown placeholder"},rt={class:"mx-context-menu-scroll",ref:"scroll"};function ut(t,n,i,d,h,k){const l=e.resolveComponent("ContextMenuSeparator"),N=e.resolveComponent("ContextSubMenu",!0),y=e.resolveComponent("ContextMenuItem"),m=e.resolveComponent("ContextMenuIconRight");return e.openBlock(),e.createElementBlock("div",{class:e.normalizeClass(["mx-context-menu",t.options.customClass?t.options.customClass:"",t.options.theme??""]),style:e.normalizeStyle({maxWidth:t.maxWidth?t.solveNumberOrStringSize(t.maxWidth):`${t.constOptions.defaultMaxWidth}px`,minWidth:t.minWidth?t.solveNumberOrStringSize(t.minWidth):`${t.constOptions.defaultMinWidth}px`,maxHeight:t.overflow&&t.maxHeight>0?`${t.maxHeight}px`:void 0,zIndex:t.zIndex,left:`${t.position.x}px`,top:`${t.position.y}px`}),"data-type":"ContextSubMenu",onClick:n[4]||(n[4]=(...o)=>t.onSubMenuBodyClick&&t.onSubMenuBodyClick(...o)),onWheel:n[5]||(n[5]=(...o)=>t.onMouseWhell&&t.onMouseWhell(...o))},[e.createElementVNode("div",{class:e.normalizeClass(["mx-context-menu-items"]),ref:"menu",style:e.normalizeStyle({top:`${t.scrollValue}px`})},[e.renderSlot(t.$slots,"default",{},()=>[t.overflow&&t.options.updownButtonSpaceholder?(e.openBlock(),e.createElementBlock("div",it)):e.createCommentVNode("",!0),(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(t.items,(o,j)=>(e.openBlock(),e.createElementBlock(e.Fragment,{key:j},[o.hidden!==!0&&o.divided==="up"?(e.openBlock(),e.createBlock(l,{key:0})):e.createCommentVNode("",!0),o.hidden!==!0&&o.divided==="self"?(e.openBlock(),e.createBlock(l,{key:1})):(e.openBlock(),e.createBlock(y,{key:2,clickHandler:o.onClick?E=>o.onClick(E):void 0,disabled:o.disabled,hidden:o.hidden,icon:o.icon,iconFontClass:o.iconFontClass,svgIcon:o.svgIcon,svgProps:o.svgProps,label:o.label,customRender:o.customRender,customClass:o.customClass,checked:o.checked,shortcut:o.shortcut,clickClose:o.clickClose,clickableWhenHasChildren:o.clickableWhenHasChildren,preserveIconWidth:o.preserveIconWidth!==void 0?o.preserveIconWidth:t.options.preserveIconWidth,showRightArrow:o.children&&o.children.length>0,hasChildren:o.children&&o.children.length>0,rawMenuItem:o,onSubMenuOpen:o.onSubMenuOpen,onSubMenuClose:o.onSubMenuClose},e.createSlots({_:2},[o.children&&o.children.length>0?{name:"submenu",fn:e.withCtx(()=>[e.createVNode(N,{items:o.children,maxWidth:o.maxWidth,minWidth:o.minWidth,adjustPosition:o.adjustSubMenuPosition!==void 0?o.adjustSubMenuPosition:t.options.adjustPosition,direction:o.direction!==void 0?o.direction:t.options.direction},null,8,["items","maxWidth","minWidth","adjustPosition","direction"])]),key:"0"}:void 0]),1032,["clickHandler","disabled","hidden","icon","iconFontClass","svgIcon","svgProps","label","customRender","customClass","checked","shortcut","clickClose","clickableWhenHasChildren","preserveIconWidth","showRightArrow","hasChildren","rawMenuItem","onSubMenuOpen","onSubMenuClose"])),o.hidden!==!0&&(o.divided==="down"||o.divided===!0)?(e.openBlock(),e.createBlock(l,{key:3})):e.createCommentVNode("",!0)],64))),128)),t.overflow&&t.options.updownButtonSpaceholder?(e.openBlock(),e.createElementBlock("div",st)):e.createCommentVNode("",!0)])],4),e.createElementVNode("div",rt,[e.withDirectives(e.createElementVNode("div",{ref:"upScrollButton",class:e.normalizeClass("mx-context-menu-updown mx-context-no-clickable up"+(t.overflow&&t.scrollValue<0?"":" disabled")),onClick:n[0]||(n[0]=o=>t.onScroll(!1)),onWheel:n[1]||(n[1]=(...o)=>t.onMouseWhellMx&&t.onMouseWhellMx(...o))},[e.createVNode(m)],34),[[e.vShow,t.overflow]]),e.withDirectives(e.createElementVNode("div",{class:e.normalizeClass("mx-context-menu-updown mx-context-no-clickable down"+(t.overflow&&t.scrollValue>-t.scrollHeight?"":" disabled")),onClick:n[2]||(n[2]=o=>t.onScroll(!0)),onWheel:n[3]||(n[3]=(...o)=>t.onMouseWhellMx&&t.onMouseWhellMx(...o))},[e.createVNode(m)],34),[[e.vShow,t.overflow]])],512)],38)}const ge=le(at,[["render",ut]]),ct={class:"mx-menu-ghost-host"},De=e.defineComponent({__name:"ContextSubMenuWrapper",props:{options:{type:Object,default:null},show:{type:Object,default:null},container:{type:Object,default:null},isFullScreenContainer:{type:Boolean,default:!0}},emits:["close","closeAnimFinished"],setup(t,{expose:n,emit:i}){const d=t,h=i,k=e.useSlots(),{options:l,show:N,container:y}=e.toRefs(d);e.onMounted(()=>{N.value&&j()}),e.onBeforeUnmount(()=>{C()}),e.watch(N,u=>{u?j():(he(m),C())});const m={closeMenu:E,isClosed:$};let o=!1;function j(){O(),pe(m)}function E(u){o=!0,h("close",u),l.value.menuTransitionProps||h("closeAnimFinished"),he(m)}function $(){return o}function O(){setTimeout(()=>{document.addEventListener("click",v,!0),document.addEventListener("contextmenu",v,!0),document.addEventListener("scroll",c,!0),!d.isFullScreenContainer&&y.value&&y.value.addEventListener("scroll",c,!0),l.value.keyboardControl!==!1&&document.addEventListener("keydown",p)},50)}function C(){document.removeEventListener("contextmenu",v,!0),document.removeEventListener("click",v,!0),document.removeEventListener("scroll",c,!0),!d.isFullScreenContainer&&y.value&&y.value.removeEventListener("scroll",c,!0),l.value.keyboardControl!==!1&&document.removeEventListener("keydown",p)}const x=e.ref();e.provide("globalSetCurrentSubMenu",u=>x.value=u);function p(u){var R,W,H,D,G,A,g,K,q,w,J,a,P;let F=!0;switch(u.key){case"Escape":{((R=x.value)==null?void 0:R.isTopLevel())===!1?(W=x.value)==null||W.closeCurrentSubMenu():E();break}case"ArrowDown":(H=x.value)==null||H.moveCurrentItemDown();break;case"ArrowUp":(D=x.value)==null||D.moveCurrentItemUp();break;case"Home":(G=x.value)==null||G.moveCurrentItemFirst();break;case"End":(A=x.value)==null||A.moveCurrentItemLast();break;case"ArrowLeft":{(g=x.value)!=null&&g.closeSelfAndActiveParent()||(q=(K=l.value).onKeyFocusMoveLeft)==null||q.call(K);break}case"ArrowRight":(w=x.value)!=null&&w.openCurrentItemSubMenu()||(a=(J=l.value).onKeyFocusMoveRight)==null||a.call(J);break;case"Enter":(P=x.value)==null||P.triggerCurrentItemClick(u);break;default:F=!1;break}F&&x.value&&(u.stopPropagation(),u.preventDefault())}function c(){l.value.closeWhenScroll!==!1&&E()}function v(u){B(u.target,u)}function B(u,R){for(var W,H;u;){if(u.classList&&u.classList.contains("mx-menu-host"))return;u=u.parentNode}l.value.clickCloseOnOutside!==!1?(C(),E()):(H=(W=l.value).onClickOnOutside)==null||H.call(W,R)}return e.provide("globalOptions",l),e.provide("globalCloseMenu",E),e.provide("globalIsFullScreenContainer",d.isFullScreenContainer),e.provide("globalHasSlot",u=>k[u]!==void 0),e.provide("globalRenderSlot",(u,R)=>e.renderSlot(k,u,{...R},()=>[e.h("span","Render slot failed")],!1)),e.provide("menuContext",{zIndex:l.value.zIndex||z.defaultZindex,container:y.value,adjustPadding:{x:0,y:0},getParentAbsY:()=>l.value.x,getParentAbsX:()=>l.value.y,getParentX:()=>0,getParentY:()=>0,getParentWidth:()=>0,getParentHeight:()=>0,getPositon:()=>[l.value.x,l.value.y],closeOtherSubMenuWithTimeOut:()=>{},checkCloseOtherSubMenuTimeOut:()=>!1,addOpenedSubMenu:()=>{},closeOtherSubMenu:()=>{},getParentContext:()=>null,getSubMenuInstanceContext:()=>null,getElement:()=>null,addChildMenuItem:()=>{},removeChildMenuItem:()=>{},markActiveMenuItem:()=>{},markThisOpenedByKeyBoard:()=>{},isOpenedByKeyBoardFlag:()=>!1,isMenuItemDataCollectedFlag:()=>!1}),n(m),(u,R)=>(e.openBlock(),e.createElementBlock("div",ct,[e.unref(l).menuTransitionProps?(e.openBlock(),e.createBlock(e.Transition,e.mergeProps({key:0,appear:""},e.unref(l).menuTransitionProps,{onAfterLeave:R[0]||(R[0]=W=>h("closeAnimFinished"))}),{default:e.withCtx(()=>[e.unref(N)?(e.openBlock(),e.createBlock(ge,{key:0,class:"mx-menu-host",items:e.unref(l).items,adjustPosition:e.unref(l).adjustPosition,maxWidth:e.unref(l).maxWidth||e.unref(z).defaultMaxWidth,minWidth:e.unref(l).minWidth||e.unref(z).defaultMinWidth,direction:e.unref(l).direction||e.unref(z).defaultDirection},{default:e.withCtx(()=>[e.renderSlot(u.$slots,"default")]),_:3},8,["items","adjustPosition","maxWidth","minWidth","direction"])):e.createCommentVNode("",!0)]),_:3},16)):e.unref(N)?(e.openBlock(),e.createBlock(ge,{key:1,class:"mx-menu-host",items:e.unref(l).items,adjustPosition:e.unref(l).adjustPosition,maxWidth:e.unref(l).maxWidth||e.unref(z).defaultMaxWidth,minWidth:e.unref(l).minWidth||e.unref(z).defaultMinWidth,direction:e.unref(l).direction||e.unref(z).defaultDirection},{default:e.withCtx(()=>[e.renderSlot(u.$slots,"default")]),_:3},8,["items","adjustPosition","maxWidth","minWidth","direction"])):e.createCommentVNode("",!0)]))}}),Ke=e.defineComponent({name:"ContextMenu",emits:["update:show","close"],props:{options:{type:Object,default:null},show:{type:Boolean,default:!1}},setup(t,n){const{options:i,show:d}=e.toRefs(t);return n.expose({closeMenu:()=>n.emit("update:show",!1),isClosed:()=>!d.value}),()=>{const{isNew:h,container:k,eleId:l}=ve(i.value);return[e.h(e.Teleport,{to:`#${l}`},[e.h(De,{options:i,show:d,container:k,isFullScreenContainer:!h,onClose:N=>{var y,m;n.emit("update:show",!1),n.emit("close"),(m=(y=i.value).onClose)==null||m.call(y,N)}},n.slots)])]}}}),Ue=e.defineComponent({name:"ContextMenuGroup",props:{disabled:{type:Boolean,default:!1},hidden:{type:Boolean,default:!1},clickHandler:{type:Function,default:null},label:{type:String,default:""},icon:{type:String,default:""},iconFontClass:{type:String,default:"iconfont"},checked:{type:Boolean,default:!1},shortcut:{type:String,default:""},svgIcon:{type:String,default:""},svgProps:{type:Object,default:null},preserveIconWidth:{type:Boolean,default:!0},showRightArrow:{type:Boolean,default:!1},clickClose:{type:Boolean,default:!0},adjustSubMenuPosition:{type:Boolean,default:void 0},maxWidth:{type:[String,Number],default:0},minWidth:{type:[String,Number],default:0}},setup(t,n){const i=e.inject("globalOptions"),{adjustSubMenuPosition:d,maxWidth:h,minWidth:k}=e.toRefs(t),l=typeof d.value<"u"?d.value:i.value.adjustPosition;return()=>e.h(Ce,{...t,showRightArrow:!0,maxWidth:void 0,minWidth:void 0,adjustSubMenuPosition:void 0,hasChildren:typeof n.slots.default!==void 0},n.slots.default?{submenu:()=>e.h(ge,{maxWidth:h.value,minWidth:k.value,adjustPosition:l},{default:n.slots.default})}:void 0)}});function dt(t,n,i,d){const h=e.ref(!0),k=e.h(De,{options:t,show:h,container:n,isFullScreenContainer:!i,onCloseAnimFinished:()=>{e.render(null,n)},onClose:l=>{var N;(N=t.onClose)==null||N.call(t,l),h.value=!1}},d);return e.render(k,n),k.component}function Ye(t,n){const i=ve(t);return dt(t,i.container,i.isNew,n).exposed}const Ee={install(t){t.config.globalProperties.$contextmenu=Ye,t.component("ContextMenu",Ke),t.component("ContextMenuItem",Ce),t.component("ContextMenuGroup",Ue),t.component("ContextMenuSperator",xe),t.component("ContextMenuSeparator",xe),t.component("ContextSubMenu",ge)},showContextMenu(t,n){return Ye(t,n)},isAnyContextMenuOpen(){return T()},closeContextMenu:U,transformMenuPosition:ne},ft={},mt={class:"mx-menu-bar-icon-menu",viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg",width:"200",height:"200"},pt=[e.createElementVNode("path",{d:"M133.310936 296.552327l757.206115 0c19.781623 0 35.950949-16.169326 35.950949-35.950949 0-19.781623-15.997312-35.950949-35.950949-35.950949L133.310936 224.650428c-19.781623 0-35.950949 16.169326-35.950949 35.950949C97.359987 280.383 113.529313 296.552327 133.310936 296.552327z"},null,-1),e.createElementVNode("path",{d:"M890.51705 476.135058 133.310936 476.135058c-19.781623 0-35.950949 16.169326-35.950949 35.950949 0 19.781623 16.169326 35.950949 35.950949 35.950949l757.206115 0c19.781623 0 35.950949-16.169326 35.950949-35.950949C926.467999 492.304384 910.298673 476.135058 890.51705 476.135058z"},null,-1),e.createElementVNode("path",{d:"M890.51705 727.447673 133.310936 727.447673c-19.781623 0-35.950949 15.997312-35.950949 35.950949s16.169326 35.950949 35.950949 35.950949l757.206115 0c19.781623 0 35.950949-15.997312 35.950949-35.950949S910.298673 727.447673 890.51705 727.447673z"},null,-1)];function ht(t,n){return e.openBlock(),e.createElementBlock("svg",mt,pt)}const vt=le(ft,[["render",ht]]),bt=["onClick","onMouseenter"],kt=e.defineComponent({__name:"MenuBar",props:{options:{type:Object,default:null}},setup(t){const n=t,i=e.ref(),d=e.ref(!1),h=e.ref([]),k=e.ref(null);function l(){d.value=!0}function N(){d.value=!1}e.onMounted(()=>{h.value=n.options.items||[]}),e.watch(()=>n.options,()=>{h.value=n.options.items||[]});let y=null,m=-1;function o(){m<h.value.length-1?m++:m=0,$(m,h.value[m])}function j(){m>0?m--:m=h.value.length-1,$(m,h.value[m])}function E(p){const c=n.options.barPopDirection??"bl";let v=0,B=0;return c.startsWith("b")?B=S(p)+p.offsetHeight:c.startsWith("t")?B=S(p):B=S(p)+p.offsetHeight/2,c.endsWith("l")?v=Z(p):c.startsWith("r")?v=Z(p)+p.offsetWidth:v=Z(p)+p.offsetWidth/2,{x:v,y:B}}function $(p,c){var v;if(m=p,!c.children)return;y&&(y.closeMenu(),y=null,d.value=!0),k.value=c;const B=(v=i.value)==null?void 0:v.children[p];if(B){const{x:u,y:R}=E(B);y=Ee.showContextMenu({...n.options,items:c.children,x:u,y:R,onKeyFocusMoveLeft(){j()},onKeyFocusMoveRight(){o()},onClose(){k.value==c&&(d.value=!1,k.value=null)}})}}function O(){m=0;const p=i.value;if(p){const{x:c,y:v}=E(p);y=Ee.showContextMenu({...n.options,x:c,y:v})}}function C(p,c){c?(d.value=!0,$(p,c),c.onClick&&(c.clickableWhenHasChildren===!0&&c.children&&c.children.length>0||!c.children||c.children.length===0)&&c.onClick()):O()}function x(p,c){d.value&&$(p,c)}return(p,c)=>(e.openBlock(),e.createElementBlock("div",{class:e.normalizeClass(["mx-menu-bar",t.options.theme??"",t.options.mini?"mini":""]),onFocus:l,onBlur:N},[e.renderSlot(p.$slots,"prefix"),t.options.mini?(e.openBlock(),e.createElementBlock("div",{key:0,ref_key:"menuBarContent",ref:i,class:"mx-menu-bar-content"},[e.createElementVNode("div",{class:"mx-menu-bar-item",onClick:c[0]||(c[0]=v=>C(0,null))},[e.createVNode(vt)])],512)):(e.openBlock(),e.createElementBlock("div",{key:1,ref_key:"menuBarContent",ref:i,class:"mx-menu-bar-content"},[(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(h.value,(v,B)=>(e.openBlock(),e.createElementBlock("div",{key:B,class:e.normalizeClass(["mx-menu-bar-item",v==k.value?"active":""]),onClick:u=>C(B,v),onMouseenter:u=>x(B,v)},e.toDisplayString(v.label),43,bt))),128))],512)),e.renderSlot(p.$slots,"suffix")],34))}});_.ContextMenu=Ke,_.ContextMenuGroup=Ue,_.ContextMenuItem=Ce,_.ContextMenuSeparator=xe,_.MenuBar=kt,_.default=Ee,Object.defineProperties(_,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})})})(ze,ze.exports);var tn=ze.exports;const nn=wt(tn),$e=ue=>(Gt("data-v-a8c647dc"),ue=ue(),Xt(),ue),on={class:"tabbar-container"},ln=["data-index","title","onClick","onDblclick","onContextmenu"],an=$e(()=>re("div",{class:"tab-dividers"},null,-1)),sn=$e(()=>re("div",{class:"tab-background"},null,-1)),rn={class:"tab-content"},un={key:0,class:"action-icon"},cn=["onClick"],dn=$e(()=>re("div",{class:"drag-handle"},null,-1)),fn=Pt({name:"Tabbar",__name:"index",setup(ue){It(f=>({c3d7ca1a:I(Pe),c370f752:I(ve)}));const we=Wt(),_=Ot(),e=Nt(),b=Rt(),T=Qt(),pe=en(),he=Et({reactive:!0}),{t:U}=_t(),{generateI18nTitle:z}=Tt(),S=Se(()=>T.getId()),Z=Se(()=>b.list.length>1&&(T.checkCloseOtherSide()||T.checkCloseLeftSide()||T.checkCloseRightSide())),ne=He(),oe=He(),Q=jt([]);Vt(()=>{Q.value=[]});const Pe=Se(()=>{var r,M;const f=b.list.findIndex(s=>s.tabId===S.value);return e.settings.app.direction==="ltr"?`${((r=Q.value.find(s=>Number.parseInt(s.dataset.index)===f))==null?void 0:r.offsetLeft)||0}px`:`${ne.value.offsetWidth-(((M=Q.value.find(s=>Number.parseInt(s.dataset.index)===f))==null?void 0:M.getBoundingClientRect().right)||0)}px`}),ve=Se(()=>{var r;const f=b.list.findIndex(M=>M.tabId===S.value);return`${((r=Q.value.find(M=>Number.parseInt(M.dataset.index)===f))==null?void 0:r.offsetWidth)||0}px`}),ae=He(!1);let V;Xe(()=>{V=new qt(oe.value.$el,{animation:200,ghostClass:"tab-ghost",draggable:".tab",handle:".drag-handle",filter:".no-drag",onStart:()=>{ae.value=!0},onEnd:()=>{ae.value=!1},onUpdate:f=>{f.newIndex!==void 0&&f.oldIndex!==void 0&&b.sort(f.newIndex,f.oldIndex)}})}),Ze([()=>e.mode,()=>e.settings.app.direction],f=>{Ht(()=>{V==null||V.option("disabled",f[0]==="mobile"||f[1]==="rtl")})},{immediate:!0}),Ze(()=>we,f=>{e.settings.tabbar.enable&&b.add(f).then(()=>{const r=b.list.findIndex(M=>M.tabId===S.value);r!==-1&&(Oe(Q.value[r].offsetLeft),le())})},{immediate:!0,deep:!0});function le(){oe.value.$el.clientWidth>ne.value.clientWidth&&!Be.local.has("tabbarScrollTip")&&(Be.local.set("tabbarScrollTip",""),et.info("标签栏数量超过展示区域范围，可以将鼠标移到标签栏上，通过鼠标滚轮滑动浏览",{title:"温馨提示",duration:5e3,closable:!0,zIndex:2e3}))}function Ie(){Be.local.has("tabbarMaximizeTip")||(Be.local.set("tabbarMaximizeTip",""),et.info("可以通过双击标签栏进行最大化操作",{title:"温馨提示",duration:5e3,closable:!0,zIndex:2e3}))}function We(f){ne.value.scrollBy({left:f.deltaY||f.detail})}function Oe(f){ne.value.scrollTo({left:f-50,behavior:"smooth"})}function Ne(f){switch(e.settings.tabbar.dblclickAction){case"reload":pe.reload();break;case"close":T.closeById(f.tabId);break;case"pin":f.isPin?b.unPin(f.tabId):b.pin(f.tabId);break;case"maximize":e.setMainPageMaximize();break;case"window":window.open(_.resolve(f.fullPath).href,"_blank");break}}function Re(f,r){f.preventDefault(),nn.showContextMenu({x:f.x,y:f.y,zIndex:1050,iconFontClass:"",customClass:"tabbar-contextmenu",items:[{label:U("app.tabbar.reload"),icon:"i-ri:refresh-line",disabled:r.tabId!==S.value,onClick:()=>pe.reload()},{label:U("app.tabbar.close"),icon:"i-ri:close-line",disabled:b.list.length<=1||r.isPin||r.isPermanent,divided:!0,onClick:()=>{T.closeById(r.tabId)}},{label:r.isPin?U("app.tabbar.unpin"):U("app.tabbar.pin"),icon:r.isPin?"i-lucide:pin-off":"i-lucide:pin",disabled:r.fullPath===e.settings.home.fullPath||r.isPermanent,onClick:()=>{r.isPin?b.unPin(r.tabId):b.pin(r.tabId)}},{label:U("app.tabbar.maximize"),icon:"i-ri:picture-in-picture-exit-line",onClick:()=>{r.tabId!==S.value&&_.push(r.fullPath),Ie(),e.setMainPageMaximize()}},{label:U("app.tabbar.newWindow"),icon:"i-ci:window",divided:!0,onClick:()=>{const M=_.resolve(r.fullPath);window.open(M.href,"_blank")}},{label:U("app.tabbar.closeOtherSide"),disabled:!T.checkCloseOtherSide(r.tabId),onClick:()=>{T.closeOtherSide(r.tabId)}},{label:U("app.tabbar.closeLeftSide"),disabled:!T.checkCloseLeftSide(r.tabId),onClick:()=>{T.closeLeftSide(r.tabId)}},{label:U("app.tabbar.closeRightSide"),disabled:!T.checkCloseRightSide(r.tabId),onClick:()=>{T.closeRightSide(r.tabId)}}]})}function be(f,r,M){let s;return!f&&r||f&&!M?s=r:f&&M&&(s=M),s}return Xe(()=>{qe("alt+left,alt+right,alt+w,alt+1,alt+2,alt+3,alt+4,alt+5,alt+6,alt+7,alt+8,alt+9,alt+0",(f,r)=>{var M,s;if(e.settings.tabbar.enable&&e.settings.tabbar.enableHotkeys)switch(f.preventDefault(),r.key){case"alt+left":if(b.list[0].tabId!==S.value){const Y=b.list.findIndex(ee=>ee.tabId===S.value);_.push(b.list[Y-1].fullPath)}break;case"alt+right":if(((M=b.list.at(-1))==null?void 0:M.tabId)!==S.value){const Y=b.list.findIndex(ee=>ee.tabId===S.value);_.push(b.list[Y+1].fullPath)}break;case"alt+w":T.closeById(S.value);break;case"alt+1":case"alt+2":case"alt+3":case"alt+4":case"alt+5":case"alt+6":case"alt+7":case"alt+8":case"alt+9":{const Y=Number(r.key.split("+")[1]);(s=b.list[Y-1])!=null&&s.fullPath&&_.push(b.list[Y-1].fullPath);break}case"alt+0":_.push(b.list[b.list.length-1].fullPath);break}})}),Ft(()=>{qe.unbind("alt+left,alt+righ,alt+w,alt+1,alt+2,alt+3,alt+4,alt+5,alt+6,alt+7,alt+8,alt+9,alt+0")}),(f,r)=>{const M=Yt;return te(),se("div",on,[re("div",{ref_key:"tabsRef",ref:ne,class:Le(["tabs",{"tabs-ontop":I(e).settings.topbar.switchTabbarAndToolbar,[`tabs-${I(e).settings.tabbar.style}`]:I(e).settings.tabbar.style!==""}]),onWheel:me(We,["prevent"])},[Fe(Ut,{ref_key:"tabContainerRef",ref:oe,name:I(ae)?void 0:"tabbar",tag:"div",class:Le(["tab-container",{dragging:I(ae)}])},{default:Lt(()=>[(te(!0),se(At,null,zt(I(b).list,(s,Y)=>{var ee,ke;return te(),se("div",{key:I(e).settings.tabbar.mergeTabsBy==="routeName"&&s.routeName?s.routeName:s.tabId,ref_for:!0,ref_key:"tabRef",ref:Q,"data-index":Y,class:Le(["tab",{"tab-ontop":I(e).settings.topbar.switchTabbarAndToolbar,actived:s.tabId===I(S),"no-drag":s.isPermanent||s.isPin}]),title:((ee=s.customTitleList.find(X=>X.fullPath===s.fullPath))==null?void 0:ee.title)||I(z)(s.title),onClick:X=>I(_).push(s.fullPath),onDblclick:X=>Ne(s),onContextmenu:X=>Re(X,s)},[an,sn,re("div",rn,[(te(),se("div",{key:s.tabId,class:"title"},[I(e).settings.tabbar.enableIcon&&be(s.tabId===I(S),s.icon,s.activeIcon)?(te(),Je(M,{key:0,name:be(s.tabId===I(S),s.icon,s.activeIcon),class:"icon"},null,8,["name"])):Ae("",!0),$t(" "+Qe(((ke=s.customTitleList.find(X=>X.fullPath===s.fullPath))==null?void 0:ke.title)||I(z)(s.title)),1)])),!s.isPermanent&&s.isPin?(te(),se("div",un,[Fe(M,{name:"i-ri:pushpin-2-fill",onClick:me(X=>I(b).unPin(s.tabId),["stop"]),onDblclick:r[0]||(r[0]=me(()=>{},["stop"]))},null,8,["onClick"])])):!s.isPermanent&&I(b).list.length>1?(te(),se("div",{key:1,class:"action-icon",onClick:me(X=>I(T).closeById(s.tabId),["stop"]),onDblclick:r[1]||(r[1]=me(()=>{},["stop"]))},[Fe(M,{name:"i-ri:close-fill"})],40,cn)):Ae("",!0),Dt(re("div",{class:"hotkey-number"},Qe(Y+1),513),[[Kt,I(he).alt&&Y<9]]),dn])],42,ln)}),128))]),_:1},8,["name","class"])],34),I(Z)?(te(),Je(Jt,{key:0,class:"more-action"})):Ae("",!0)])}}}),gn=Zt(fn,[["__scopeId","data-v-a8c647dc"]]);export{gn as default};
