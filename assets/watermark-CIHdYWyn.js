
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{d as V,b as v,z as w,D as n,o as r,c as x,j as t,w as e,f as l,Y as R,s,h as d,i,bk as W,N as Y}from"./index-nFO8NRRw.js";import{_ as b}from"./index.vue_vue_type_script_setup_true_lang-CKnag4rP.js";import{u as y}from"./watermark-j_oNlnmh.js";const M=V({__name:"watermark",setup(N){const u=v(),c=y(),a=w({get(){return u.settings.app.enableWatermark},set(m){u.$patch(o=>{o.settings.app.enableWatermark=m})}});function f(){c.update({text:`${W().format("YYYY-MM-DD HH:mm:ss")}`})}function k(){c.update()}return(m,o)=>{const E=b,p=n("ElRadioButton"),g=n("ElRadioGroup"),_=n("ElButton"),B=n("ElSpace"),S=Y;return r(),x("div",null,[t(E,{title:"页面水印",content:"在某些场景下，不希望用户将系统里的信息随意截图并转发，这时可开启页面水印，以减少这种情况发生"}),t(S,{title:"可在 /src/store/modules/watermark.ts 文件里定制水印文案内容"},{default:e(()=>[t(B,null,{default:e(()=>[t(g,{modelValue:l(a),"onUpdate:modelValue":o[0]||(o[0]=C=>R(a)?a.value=C:null)},{default:e(()=>[t(p,{value:!0},{default:e(()=>[s(" 开启 ")]),_:1}),t(p,{value:!1},{default:e(()=>[s(" 关闭 ")]),_:1})]),_:1},8,["modelValue"]),l(a)?(r(),d(_,{key:0,onClick:f},{default:e(()=>[s(" 更新水印 ")]),_:1})):i("",!0),l(a)?(r(),d(_,{key:1,onClick:k},{default:e(()=>[s(" 重置水印 ")]),_:1})):i("",!0)]),_:1})]),_:1})])}}});export{M as default};
