/*
 * @Author: yuguangzhou
 * @Date: 2021-04-19 14:34:50
 * @LastEditTime: 2021-05-11 15:05:29
 * @LastEditors: yuguangzhou
 * @Description:项目配置
 */
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import styleImport from "vite-plugin-style-import";
// import vitePluginImport from 'vite-plugin-babel-import';

const { getThemeVariables } = require('ant-design-vue/dist/theme');
export default ({mode}) => defineConfig({
  plugins: [
    vue(),
    // styleImport({
    //   libs: [
    //     {
    //       libraryName: "ant-design-vue",
    //       esModule: true,
    //       resolveStyle: (name) => {
    //         return `ant-design-vue/es/${name}/style/index`;
    //       },
    //     },
    //   ],
    // }),

    styleImport(
    {
    libs: [{
      libraryName: 'ant-design-vue',
      esModule: true,
      resolveStyle: (name) => {
        return `ant-design-vue/es/${name}/style/css`;
      },
    }]
  }
  ),
  ],
  css: {
    preprocessorOptions: {
      less: {
        // 主题色配置
        modifyVars:
        getThemeVariables({
            // dark: true, // 开启暗黑模式
          }),
        //  {
        //   "primary-color": "#1DA57A",
        //   "link-color": "#1DA57A",
        //   "border-radius-base": "2px",
        // },
        javascriptEnabled: true,
      },
    },
  },
  // base: "./",
  resolve: {
    alias: {
      "~": path.join(__dirname, "./"),
      "@": path.join(__dirname, "/src"),
    },
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"], // 默认值--表示import时这些文件类型的扩展名可以不写
  },
  // 根据环境引入不同地址的静态资源路径
  base: mode == "development" ? "./" : mode == "beta" ? "//s.baidu.com/beta/xxx" : "//s.baidu.com/release/xxx",
  server: {
    proxy: {
      "/api": {
        target: "http://backend-api-02.newbee.ltd/manage-api/v1/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
