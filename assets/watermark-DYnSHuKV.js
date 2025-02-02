
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{_ as V}from"./index.vue_vue_type_script_setup_true_lang-By6yHxyk.js";import{_ as v}from"./index.vue_vue_type_script_setup_true_lang-3Yu1E9T9.js";import{d as w,u as R,c as W,aJ as n,o as s,a as x,i as o,w as e,e as l,S as y,M as r,f,h as _,aT as M}from"./bootstrap-aYN_ym_b.js";import{u as Y}from"./watermark-liUp8A1-.js";import"./index-CbsWY-kb.js";const K=w({__name:"watermark",setup(H){const u=R(),m=Y(),a=W({get(){return u.settings.app.enableWatermark},set(p){u.$patch(t=>{t.settings.app.enableWatermark=p})}});function c(){m.update({content:M().format("YYYY-MM-DD HH:mm:ss")})}function k(){m.update()}return(p,t)=>{const E=v,d=n("ElRadioButton"),S=n("ElRadioGroup"),i=n("ElButton"),g=n("ElSpace"),B=V;return s(),x("div",null,[o(E,{title:"页面水印",content:"在某些场景下，不希望用户将系统里的信息随意截图并转发，这时可开启页面水印，以减少这种情况发生"}),o(B,{title:"可在 /src/store/modules/watermark.ts 文件里定制水印文案内容"},{default:e(()=>[o(g,null,{default:e(()=>[o(S,{modelValue:l(a),"onUpdate:modelValue":t[0]||(t[0]=C=>y(a)?a.value=C:null)},{default:e(()=>[o(d,{value:!0},{default:e(()=>t[1]||(t[1]=[r(" 开启 ")])),_:1}),o(d,{value:!1},{default:e(()=>t[2]||(t[2]=[r(" 关闭 ")])),_:1})]),_:1},8,["modelValue"]),l(a)?(s(),f(i,{key:0,onClick:c},{default:e(()=>t[3]||(t[3]=[r(" 更新水印 ")])),_:1})):_("",!0),l(a)?(s(),f(i,{key:1,onClick:k},{default:e(()=>t[4]||(t[4]=[r(" 重置水印 ")])),_:1})):_("",!0)]),_:1})]),_:1})])}}});export{K as default};
