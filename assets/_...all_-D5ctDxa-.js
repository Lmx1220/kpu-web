
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{d as r,a as i,b as u,r as _,l as d,m as f,c as x,j as s,e as t,w as m,q as p,o as v,s as w,t as g,f as h,_ as B}from"./index-nFO8NRRw.js";const N={class:"absolute left-[50%] top-[50%] flex flex-col items-center justify-between lg:flex-row -translate-x-50% -translate-y-50% lg:gap-12"},S={class:"flex flex-col gap-4"},b=t("h1",{class:"m-0 text-6xl font-sans"}," 404 ",-1),k=t("div",{class:"desc mx-0 text-xl text-stone-5"}," 抱歉，你访问的页面不存在 ",-1),j=r({__name:"[...all]",setup(I){const o=i(),a=u(),e=_({inter:Number.NaN,countdown:5});d(()=>{e.value.inter&&window.clearInterval(e.value.inter)}),f(()=>{e.value.inter=window.setInterval(()=>{e.value.countdown--,e.value.countdown===0&&(e.value.inter&&window.clearInterval(e.value.inter),n())},1e3)});function n(){o.push(a.settings.home.fullPath)}return(y,C)=>{const l=B,c=p;return v(),x("div",N,[s(l,{name:"404",class:"text-[300px] lg:text-[400px]"}),t("div",S,[b,k,t("div",null,[s(c,{onClick:n},{default:m(()=>[w(g(h(e).countdown)+" 秒后，返回首页 ",1)]),_:1})])])])}}});export{j as default};
