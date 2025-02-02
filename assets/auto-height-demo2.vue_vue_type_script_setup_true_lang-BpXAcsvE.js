
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{d,r as c,aD as m,ay as g,aJ as x,o as s,f as C,w as n,M as p,i as _,a as u,F as v,l as k,N as w,e as B}from"./bootstrap-aYN_ym_b.js";const E=d({__name:"auto-height-demo2",setup(y){const l=c([]),[f,o]=m({onCancel(){o.close()},onConfirm(){g.info("onConfirm",{position:"top-center"})},onOpenChange(t){t&&i(10)}});function i(t){o.setState({loading:!0}),setTimeout(()=>{l.value=Array.from({length:t},(e,a)=>a+1),o.setState({loading:!1})},2e3)}return(t,e)=>{const a=x("ElButton");return s(),C(B(f),{title:"自动计算高度","title-tooltip":"标题提示内容"},{extra:n(()=>e[1]||(e[1]=[p(" extra ")])),"prepend-footer":n(()=>[_(a,{link:"",onClick:e[0]||(e[0]=r=>i(6))},{default:n(()=>e[2]||(e[2]=[p(" 点击更新数据 ")])),_:1})]),default:n(()=>[(s(!0),u(v,null,k(l.value,r=>(s(),u("div",{key:r,class:"h-[220px] w-full flex-center bg-zinc-100 even:bg-zinc-200"},w(r),1))),128))]),_:1})}}});export{E as _};
