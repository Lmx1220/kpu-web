
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import B from"./HDropdown-Dr1Tw6Rp.js";import{d as R,a as N,b as D,ax as H,aw as M,v as V,x as O,r as T,y as q,o as l,c as b,j as s,w as d,e as u,f as a,i as k,aG as E,aL as F,n as P,F as G,Q as j,h as v,p as z,t as A,$ as y,J,_ as Q,aq as U}from"./index-vu1a6MAo.js";import{S as K}from"./sortable.esm-Cw1ESr5Y.js";import{u as W}from"./useTabbar-dPwJjLUD.js";import{_ as X}from"./_plugin-vue_export-helper-DlAUqK2U.js";const Y={class:"h-6 w-6 flex-center cursor-pointer rounded-1 bg-[var(--g-container-bg)] text-lg shadow transition-background-color transition-shadow"},Z={class:"quick-button"},tt=["disabled"],at=["disabled"],et=["disabled"],ot=["title","onClick"],st=R({name:"TabbarMoreAction",__name:"moreAction",setup(nt){const $=N(),x=D(),f=H(),n=W(),{t:p}=M(),{generateI18nTitle:w}=V(),g=O(()=>n.getId()),m=T(),h=T(!1);q(()=>m.value,i=>{i&&new K(m.value.$el,{animation:200,ghostClass:"ghost",draggable:".tab",filter:".no-drag",onStart:()=>{h.value=!0},onEnd:()=>{h.value=!1},onUpdate:e=>{e.newIndex!==void 0&&e.oldIndex!==void 0&&f.sort(e.newIndex,e.oldIndex)}})});function _(i){switch(i){case"search-tabs":J.emit("global-search-toggle","tab");break;case"other-side":n.closeOtherSide();break;case"left-side":n.closeLeftSide();break;case"right-side":n.closeRightSide();break}}function C(i,e,o){let r;return!i&&e||i&&!o?r=e:i&&o&&(r=o),r}return(i,e)=>{const o=Q,r=U,L=B;return l(),b("div",null,[s(L,{placement:"bottom-end","popper-class":"tabbar-dropdown"},{dropdown:d(()=>[u("div",Z,[a(x).settings.toolbar.navSearch?(l(),b("button",{key:0,class:"button",onClick:e[0]||(e[0]=t=>_("search-tabs"))},[s(r,{text:a(p)("app.tabbar.searchTabs")},{default:d(()=>[s(o,{name:"i-ri:search-line"})]),_:1},8,["text"])])):k("",!0),u("button",{class:"button",disabled:!a(n).checkCloseOtherSide(),onClick:e[1]||(e[1]=t=>_("other-side"))},[s(r,{text:a(p)("app.tabbar.closeOtherSide")},{default:d(()=>[s(o,{name:"i-ri:close-fill"})]),_:1},8,["text"])],8,tt),u("button",{class:"button",disabled:!a(n).checkCloseLeftSide(),onClick:e[2]||(e[2]=t=>_("left-side"))},[s(r,{text:a(p)("app.tabbar.closeLeftSide")},{default:d(()=>[s(o,{name:"i-ph:arrow-line-left"})]),_:1},8,["text"])],8,at),u("button",{class:"button",disabled:!a(n).checkCloseRightSide(),onClick:e[3]||(e[3]=t=>_("right-side"))},[s(r,{text:a(p)("app.tabbar.closeRightSide")},{default:d(()=>[s(o,{name:"i-ph:arrow-line-right"})]),_:1},8,["text"])],8,et)]),s(a(E),{options:{scrollbars:{autoHide:"leave",autoHideDelay:300}},defer:"",class:"max-h-[300px]"},{default:d(()=>[s(F,{ref_key:"dropdownTabContainerRef",ref:m,name:a(h)?void 0:"dropdown-tab",tag:"div",class:P(["tabs",{dragging:a(h)}])},{default:d(()=>[(l(!0),b(G,null,j(a(f).list,t=>{var S,I;return l(),b("div",{key:t.tabId,class:P(["tab",{actived:t.tabId===a(g),"no-drag":t.isPermanent||t.isPin}])},[(l(),b("div",{key:t.tabId,class:"title",title:((S=t.customTitleList.find(c=>c.fullPath===t.fullPath))==null?void 0:S.title)||a(w)(t.title),onClick:c=>a($).push(t.fullPath)},[a(x).settings.tabbar.enableIcon&&C(t.tabId===a(g),t.icon,t.activeIcon)?(l(),v(o,{key:0,name:C(t.tabId===a(g),t.icon,t.activeIcon)},null,8,["name"])):k("",!0),z(" "+A(((I=t.customTitleList.find(c=>c.fullPath===t.fullPath))==null?void 0:I.title)||a(w)(t.title)),1)],8,ot)),!t.isPermanent&&t.isPin?(l(),v(o,{key:0,name:"i-ri:pushpin-2-fill",class:"action-icon",onClick:y(c=>a(f).unPin(t.tabId),["stop"])},null,8,["onClick"])):!t.isPermanent&&a(f).list.length>1?(l(),v(o,{key:1,name:"ri:close-fill",class:"action-icon",onClick:y(c=>a(n).closeById(t.tabId),["stop"])},null,8,["onClick"])):k("",!0)],2)}),128))]),_:1},8,["name","class"])]),_:1})]),default:d(()=>[u("div",Y,[s(o,{name:"i-ri:arrow-down-s-fill"})])]),_:1})])}}}),bt=X(st,[["__scopeId","data-v-916dbe41"]]);export{bt as default};
