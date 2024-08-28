
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{d as x,u as b,b as v,aV as I,z as S,r as k,B as P,a2 as T,o as r,c as i,F as L,ad as V,n as z,f as t,j as u,w as B,I as d,J as m,e as p,T as C,_ as M,l as R}from"./index-D8CVJ9uq.js";import{u as y}from"./useMainPage-D9Hx1XS-.js";import"./useTabbar-BT8Tbh1A.js";const E={class:"iframe-view absolute left-0 top-0 h-full w-full flex flex-col"},F=["data-path","src"],N={class:"absolute left-0 top-0 h-full w-full flex-center bg-stone-2/75 dark-bg-stone-8/75"},j=x({name:"IframeView",__name:"iframe",setup(D){const o=b(),f=v(),n=I(),{generateI18nTitle:_}=S(),{setCustomTitle:h}=y(),c=k();return P(()=>o.fullPath,a=>{T(()=>{var l;(l=c.value)==null||l.forEach(s=>{if(s.dataset.path===a){const e=n.openedList.find(w=>w.path===a),g=e==null?void 0:e.title;h(_(g)),s.onload=()=>{n.closeLoading(a)}}})})},{immediate:!0}),(a,l)=>{const s=M;return r(),i("div",E,[(r(!0),i(L,null,V(t(n).openedList,e=>(r(),i("div",{key:e.path,class:z(["absolute left-0 top-0 h-full w-full flex flex-col",{"z-1":t(o).fullPath===e.path}])},[u(C,{name:t(f).settings.mainPage.enableTransition?t(f).settings.mainPage.transitionMode:"",mode:"out-in",appear:""},{default:B(()=>[d(p("iframe",{ref_for:!0,ref_key:"iframeRef",ref:c,"data-path":e.path,src:e.src,frameborder:"0",class:"h-full w-full flex-1"},null,8,F),[[m,t(o).fullPath===e.path]])]),_:2},1032,["name"]),d(p("div",N,[u(s,{name:"i-line-md:loading-twotone-loop",size:36})],512),[[m,e.isLoading]])],2))),128))])}}}),A=R(j,[["__scopeId","data-v-1d396fc0"]]);export{A as default};
