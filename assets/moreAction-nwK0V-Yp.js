
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import L from"./HDropdown-Bi0Ornjg.js";import{_ as N}from"./HTooltip.vue_vue_type_script_setup_true_lang-7CqZUj50.js";import{d as R,a as H,c as M,a7 as D,a6 as O,F as V,G as q,r as T,H as z,o as l,f as u,h as s,w as d,i as b,j as a,N as k,ag as E,a5 as F,K as P,O as G,X as j,M as v,q as A,t as K,x as y,S as U,_ as X,z as J}from"./index-RH8yPTKC.js";import{S as Q}from"./sortable.esm-C0-Qcoum.js";import{u as W}from"./useTabbar-D1GJj3hP.js";import"./index.es-DQP9qc4Z.js";const Y={class:"h-6 w-6 flex-center cursor-pointer rounded-1 bg-[var(--g-container-bg)] text-lg shadow transition-background-color transition-shadow"},Z={class:"quick-button"},tt=["disabled"],at=["disabled"],et=["disabled"],ot=["title","onClick"],st=R({name:"TabbarMoreAction",__name:"moreAction",setup(nt){const $=H(),x=M(),f=D(),n=W(),{t:p}=O(),{generateI18nTitle:w}=V(),g=q(()=>n.getId()),m=T(),h=T(!1);z(()=>m.value,i=>{i&&new Q(m.value.$el,{animation:200,ghostClass:"ghost",draggable:".tab",filter:".no-drag",onStart:()=>{h.value=!0},onEnd:()=>{h.value=!1},onUpdate:e=>{e.newIndex!==void 0&&e.oldIndex!==void 0&&f.sort(e.newIndex,e.oldIndex)}})});function _(i){switch(i){case"search-tabs":U.emit("global-search-toggle","tab");break;case"other-side":n.closeOtherSide();break;case"left-side":n.closeLeftSide();break;case"right-side":n.closeRightSide();break}}function C(i,e,o){let r;return!i&&e||i&&!o?r=e:i&&o&&(r=o),r}return(i,e)=>{const o=X,r=N,B=L;return l(),u("div",null,[s(B,{placement:"bottom-end","popper-class":"tabbar-dropdown"},{dropdown:d(()=>[b("div",Z,[a(x).settings.toolbar.navSearch?(l(),u("button",{key:0,class:"button",onClick:e[0]||(e[0]=t=>_("search-tabs"))},[s(r,{text:a(p)("app.tabbar.searchTabs")},{default:d(()=>[s(o,{name:"i-ri:search-line"})]),_:1},8,["text"])])):k("",!0),b("button",{class:"button",disabled:!a(n).checkCloseOtherSide(),onClick:e[1]||(e[1]=t=>_("other-side"))},[s(r,{text:a(p)("app.tabbar.closeOtherSide")},{default:d(()=>[s(o,{name:"i-ri:close-fill"})]),_:1},8,["text"])],8,tt),b("button",{class:"button",disabled:!a(n).checkCloseLeftSide(),onClick:e[2]||(e[2]=t=>_("left-side"))},[s(r,{text:a(p)("app.tabbar.closeLeftSide")},{default:d(()=>[s(o,{name:"i-ph:arrow-line-left"})]),_:1},8,["text"])],8,at),b("button",{class:"button",disabled:!a(n).checkCloseRightSide(),onClick:e[3]||(e[3]=t=>_("right-side"))},[s(r,{text:a(p)("app.tabbar.closeRightSide")},{default:d(()=>[s(o,{name:"i-ph:arrow-line-right"})]),_:1},8,["text"])],8,et)]),s(a(E),{options:{scrollbars:{autoHide:"leave",autoHideDelay:300}},defer:"",class:"max-h-[300px]"},{default:d(()=>[s(F,{ref_key:"dropdownTabContainerRef",ref:m,name:a(h)?void 0:"dropdown-tab",tag:"div",class:P(["tabs",{dragging:a(h)}])},{default:d(()=>[(l(!0),u(G,null,j(a(f).list,t=>{var S,I;return l(),u("div",{key:t.tabId,class:P(["tab",{actived:t.tabId===a(g),"no-drag":t.isPermanent||t.isPin}])},[(l(),u("div",{key:t.tabId,class:"title",title:((S=t.customTitleList.find(c=>c.fullPath===t.fullPath))==null?void 0:S.title)||a(w)(t.title),onClick:c=>a($).push(t.fullPath)},[a(x).settings.tabbar.enableIcon&&C(t.tabId===a(g),t.icon,t.activeIcon)?(l(),v(o,{key:0,name:C(t.tabId===a(g),t.icon,t.activeIcon)},null,8,["name"])):k("",!0),A(" "+K(((I=t.customTitleList.find(c=>c.fullPath===t.fullPath))==null?void 0:I.title)||a(w)(t.title)),1)],8,ot)),!t.isPermanent&&t.isPin?(l(),v(o,{key:0,name:"i-ri:pushpin-2-fill",class:"action-icon",onClick:y(c=>a(f).unPin(t.tabId),["stop"])},null,8,["onClick"])):!t.isPermanent&&a(f).list.length>1?(l(),v(o,{key:1,name:"ri:close-fill",class:"action-icon",onClick:y(c=>a(n).closeById(t.tabId),["stop"])},null,8,["onClick"])):k("",!0)],2)}),128))]),_:1},8,["name","class"])]),_:1})]),default:d(()=>[b("div",Y,[s(o,{name:"i-ri:arrow-down-s-fill"})])]),_:1})])}}}),bt=J(st,[["__scopeId","data-v-f0235a7c"]]);export{bt as default};
