
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{d as _,u as h,a as b,b4 as y,x as w,r as C,z as P,o as a,c as r,e as i,f as t,F as m,h as c,i as x,j as d,w as I,U as S,t as z,a0 as $,G as B,H as F,q as v,aH as H,_ as N,k as R}from"./index-BSkZKgnl.js";import{S as V}from"./sortable.esm-Cw1ESr5Y.js";const j={class:"favorites-container w-80"},A={class:"flex items-center justify-between px-4 py-3"},D=["title","onClick"],M={class:"name flex-1 truncate pe-4"},T={class:"right-1 h-5 w-6 rounded-full text-stone-3 !absolute dark-text-stone-7 hover-text-stone-7 dark-hover-text-stone-3"},U={key:1,flex:"center col","py-6":"","text-stone-5":""},q={"m-0":"","flex-center":"","text-sm":"","op-75":""},E=_({name:"FavoritesPanel",__name:"panel",setup(G){const l=h(),g=b(),s=y(),{generateI18nTitle:f}=w(),u=C();return P(()=>u.value,p=>{p&&new V(u.value,{animation:200,ghostClass:"draggable-ghost",draggable:".draggable-item",onUpdate:e=>{e.newIndex!==void 0&&e.oldIndex!==void 0&&s.sort(e.newIndex,e.oldIndex)}})}),(p,e)=>{const n=N;return a(),r("div",j,[i("div",A,[e[2]||(e[2]=i("div",{class:"text-sm font-bold"}," 我的收藏夹 ",-1)),t(s).canAdd(t(l).fullPath)?(a(),r(m,{key:0},[t(s).isAdd(t(l).fullPath)?(a(),c(n,{key:1,class:"cursor-pointer text-xl",name:"i-mdi:star-remove",title:"从收藏夹删除",onClick:e[1]||(e[1]=o=>t(s).remove(t(l).fullPath))})):(a(),c(n,{key:0,class:"cursor-pointer text-xl",name:"i-mdi:star-plus-outline",title:"添加到收藏夹",onClick:e[0]||(e[0]=o=>t(s).add(t(l)))}))],64)):x("",!0)]),d(t(H),{options:{scrollbars:{autoHide:"leave",autoHideDelay:300}},defer:"",class:"max-h-220px"},{default:I(()=>[t(s).list.length>0?(a(),r("div",{key:0,ref_key:"favoritesContainerRef",ref:u,class:"flex flex-wrap items-center justify-between gap-2 px-4 pb-4"},[(a(!0),r(m,null,S(t(s).list,o=>(a(),r("div",{key:o.fullPath,title:t(f)(o.title),class:"draggable-item relative w-[calc(50%-0.25rem)] flex cursor-pointer items-center gap-1 rounded px-2 py-2 ring-1 ring-stone-3 ring-inset hover-bg-stone-1 dark-ring-stone-7 dark-hover-bg-dark/50",onClick:k=>t(g).push(o.fullPath)},[o.icon?(a(),c(n,{key:0,name:o.icon,size:18},null,8,["name"])):x("",!0),i("div",M,z(t(f)(o.title)),1),i("div",T,[d(n,{name:"i-ep:delete",size:14,onClick:$(k=>t(s).remove(o.fullPath),["stop"])},null,8,["onClick"])])],8,D))),128))],512)):(a(),r("div",U,[d(n,{name:"i-tabler:mood-empty",size:40}),e[5]||(e[5]=i("p",{"m-2":"","text-base":""}," 收藏夹是空的 ",-1)),B(i("p",q,[e[3]||(e[3]=v(" 点击右上角 ")),d(n,{name:"i-mdi:star-plus-outline",size:20,"mx-1":"","text-stone-6":"","dark-text-stone-4":""}),e[4]||(e[4]=v(" 将当前页面添加到收藏夹 "))],512),[[F,t(s).canAdd(t(l).fullPath)]])]))]),_:1})])}}}),K=R(E,[["__scopeId","data-v-e8035b18"]]);export{K as default};
