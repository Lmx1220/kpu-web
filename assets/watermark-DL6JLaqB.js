
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{d as C,c as v,A as w,e as n,o as r,f as x,h as t,w as e,j as l,Z as R,q as s,N as d,O as i,b5 as W,V as y}from"./index-D6ceO_Rb.js";import{_ as N}from"./index.vue_vue_type_script_setup_true_lang-bcVZrhLq.js";import{u as Y}from"./watermark-D9nrg8t7.js";const h=C({__name:"watermark",setup($){const u=v(),c=Y(),a=w({get(){return u.settings.app.enableWatermark},set(m){u.$patch(o=>{o.settings.app.enableWatermark=m})}});function f(){c.update({text:`${W().format("YYYY-MM-DD HH:mm:ss")}`})}function k(){c.update()}return(m,o)=>{const E=N,p=n("ElRadioButton"),g=n("ElRadioGroup"),_=n("ElButton"),B=n("ElSpace"),S=y;return r(),x("div",null,[t(E,{title:"页面水印",content:"在某些场景下，不希望用户将系统里的信息随意截图并转发，这时可开启页面水印，以减少这种情况发生"}),t(S,{title:"可在 /src/store/modules/watermark.ts 文件里定制水印文案内容"},{default:e(()=>[t(B,null,{default:e(()=>[t(g,{modelValue:l(a),"onUpdate:modelValue":o[0]||(o[0]=V=>R(a)?a.value=V:null)},{default:e(()=>[t(p,{value:!0},{default:e(()=>[s(" 开启 ")]),_:1}),t(p,{value:!1},{default:e(()=>[s(" 关闭 ")]),_:1})]),_:1},8,["modelValue"]),l(a)?(r(),d(_,{key:0,onClick:f},{default:e(()=>[s(" 更新水印 ")]),_:1})):i("",!0),l(a)?(r(),d(_,{key:1,onClick:k},{default:e(()=>[s(" 重置水印 ")]),_:1})):i("",!0)]),_:1})]),_:1})])}}});export{h as default};
