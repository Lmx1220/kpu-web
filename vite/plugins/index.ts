import { PluginOption } from "vite";
import vue from "@vitejs/plugin-vue";
import createI18n from "./i8n";
export default function creactVitePlugins(viteEnv, isBuild = false) {
  const vitePlugins: (PluginOption | PluginOption[])[] = [vue()];
  vitePlugins.push(createI18n());
  return vitePlugins;
}
