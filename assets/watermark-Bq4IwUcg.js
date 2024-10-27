
/**
 * 由 admin 提供技术支持
 * Powered by admin
 * 代码仓库
 * Github https://github.com/Lmx1220/kpu-web
 */
    
import{d as V,u as v,y as w,I as n,o as r,c as x,h as o,w as e,b as l,Z as y,q as s,e as f,f as _,b2 as R,M as W}from"./index-DI_iSbuB.js";import{_ as b}from"./index.vue_vue_type_script_setup_true_lang-DN1ItRwK.js";import{u as M}from"./watermark-Cj9Mn-ni.js";const D=V({__name:"watermark",setup(Y){const u=v(),m=M(),a=w({get(){return u.settings.app.enableWatermark},set(p){u.$patch(t=>{t.settings.app.enableWatermark=p})}});function c(){m.update({text:`${R().format("YYYY-MM-DD HH:mm:ss")}`})}function k(){m.update()}return(p,t)=>{const E=b,d=n("ElRadioButton"),g=n("ElRadioGroup"),i=n("ElButton"),B=n("ElSpace"),S=W;return r(),x("div",null,[o(E,{title:"页面水印",content:"在某些场景下，不希望用户将系统里的信息随意截图并转发，这时可开启页面水印，以减少这种情况发生"}),o(S,{title:"可在 /src/store/modules/watermark.ts 文件里定制水印文案内容"},{default:e(()=>[o(B,null,{default:e(()=>[o(g,{modelValue:l(a),"onUpdate:modelValue":t[0]||(t[0]=C=>y(a)?a.value=C:null)},{default:e(()=>[o(d,{value:!0},{default:e(()=>t[1]||(t[1]=[s(" 开启 ")])),_:1}),o(d,{value:!1},{default:e(()=>t[2]||(t[2]=[s(" 关闭 ")])),_:1})]),_:1},8,["modelValue"]),l(a)?(r(),f(i,{key:0,onClick:c},{default:e(()=>t[3]||(t[3]=[s(" 更新水印 ")])),_:1})):_("",!0),l(a)?(r(),f(i,{key:1,onClick:k},{default:e(()=>t[4]||(t[4]=[s(" 重置水印 ")])),_:1})):_("",!0)]),_:1})]),_:1})])}}});export{D as default};
