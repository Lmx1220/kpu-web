
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{d as u,u as i,r as d,t as f,v as x,b as _,j as s,e as n,w as p,l as v,p as m,o as w,x as g,y as B,f as N,_ as y}from"./index-putfknEa.js";const S={class:"absolute left-[50%] top-[50%] flex flex-col items-center justify-between lg-flex-row -translate-x-50% -translate-y-50% lg-gap-12"},b={class:"flex flex-col gap-4"},C=u({__name:"[...all]",setup(h){const a=v(),l=i(),e=d({inter:Number.NaN,countdown:5});f(()=>{e.value.inter&&window.clearInterval(e.value.inter)}),x(()=>{e.value.inter=window.setInterval(()=>{e.value.countdown--,e.value.countdown===0&&(e.value.inter&&window.clearInterval(e.value.inter),o())},1e3)});function o(){a.push(l.settings.home.fullPath)}return(k,t)=>{const r=y,c=m;return w(),_("div",S,[s(r,{name:"404",class:"text-[300px] lg-text-[400px]"}),n("div",b,[t[0]||(t[0]=n("h1",{class:"m-0 text-6xl font-sans"}," 404 ",-1)),t[1]||(t[1]=n("div",{class:"mx-0 text-xl text-secondary-foreground/50"}," 抱歉，你访问的页面不存在 ",-1)),n("div",null,[s(c,{onClick:o},{default:p(()=>[g(B(N(e).countdown)+" 秒后，返回首页 ",1)]),_:1})])])])}}});export{C as default};
