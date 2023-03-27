import { defineConfig, loadEnv } from "vite";
import createVitePlugins from './vite/plugins'

// https://vitejs.dev/config/
export default ({mode,command}) => {
  const env = loadEnv(mode, process.cwd());
  return defineConfig({
     resolve: {
      alias: {
        "@": "/src",
        "#": "/src/types",
      },
    },
    plugins: createVitePlugins(env, command === 'build'),
  });
};
