
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{d as i,a as u,b as d,r as f,k as x,l as _,c as m,j as o,e as n,w as p,m as v,o as w,p as g,t as B,f as N,_ as k}from"./index-BESVIvMK.js";const S={class:"absolute left-[50%] top-[50%] flex flex-col items-center justify-between lg:flex-row -translate-x-50% -translate-y-50% lg:gap-12"},b={class:"flex flex-col gap-4"},C=i({__name:"[...all]",setup(h){const a=u(),l=d(),e=f({inter:Number.NaN,countdown:5});x(()=>{e.value.inter&&window.clearInterval(e.value.inter)}),_(()=>{e.value.inter=window.setInterval(()=>{e.value.countdown--,e.value.countdown===0&&(e.value.inter&&window.clearInterval(e.value.inter),s())},1e3)});function s(){a.push(l.settings.home.fullPath)}return(I,t)=>{const r=k,c=v;return w(),m("div",S,[o(r,{name:"404",class:"text-[300px] lg:text-[400px]"}),n("div",b,[t[0]||(t[0]=n("h1",{class:"m-0 text-6xl font-sans"}," 404 ",-1)),t[1]||(t[1]=n("div",{class:"desc mx-0 text-xl text-stone-5"}," 抱歉，你访问的页面不存在 ",-1)),n("div",null,[o(c,{onClick:s},{default:p(()=>[g(B(N(e).countdown)+" 秒后，返回首页 ",1)]),_:1})])])])}}});export{C as default};
