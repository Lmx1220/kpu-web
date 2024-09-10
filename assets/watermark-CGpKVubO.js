
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{d as C,b as V,x as W,B as n,o as r,c as v,j as o,w as e,f as l,W as w,p as s,h as f,i as _,bi as R,L as b}from"./index-CzepmmFI.js";import{_ as y}from"./index.vue_vue_type_script_setup_true_lang-DyOOhC82.js";import{u as Y}from"./watermark-CEnKQPBM.js";const j=C({__name:"watermark",setup($){const u=V(),m=Y(),a=W({get(){return u.settings.app.enableWatermark},set(p){u.$patch(t=>{t.settings.app.enableWatermark=p})}});function c(){m.update({text:`${R().format("YYYY-MM-DD HH:mm:ss")}`})}function k(){m.update()}return(p,t)=>{const E=y,d=n("ElRadioButton"),B=n("ElRadioGroup"),i=n("ElButton"),g=n("ElSpace"),S=b;return r(),v("div",null,[o(E,{title:"页面水印",content:"在某些场景下，不希望用户将系统里的信息随意截图并转发，这时可开启页面水印，以减少这种情况发生"}),o(S,{title:"可在 /src/store/modules/watermark.ts 文件里定制水印文案内容"},{default:e(()=>[o(g,null,{default:e(()=>[o(B,{modelValue:l(a),"onUpdate:modelValue":t[0]||(t[0]=x=>w(a)?a.value=x:null)},{default:e(()=>[o(d,{value:!0},{default:e(()=>t[1]||(t[1]=[s(" 开启 ")])),_:1}),o(d,{value:!1},{default:e(()=>t[2]||(t[2]=[s(" 关闭 ")])),_:1})]),_:1},8,["modelValue"]),l(a)?(r(),f(i,{key:0,onClick:c},{default:e(()=>t[3]||(t[3]=[s(" 更新水印 ")])),_:1})):_("",!0),l(a)?(r(),f(i,{key:1,onClick:k},{default:e(()=>t[4]||(t[4]=[s(" 重置水印 ")])),_:1})):_("",!0)]),_:1})]),_:1})])}}});export{j as default};
