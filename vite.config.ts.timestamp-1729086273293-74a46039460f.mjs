// vite.config.ts
import react from "file:///C:/Users/ymijs/OneDrive/Documents/Internship/LNCO%20Graasp/Analytics/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { resolve } from "path";
import { defineConfig, loadEnv } from "file:///C:/Users/ymijs/OneDrive/Documents/Internship/LNCO%20Graasp/Analytics/node_modules/vite/dist/node/index.js";
import checker from "file:///C:/Users/ymijs/OneDrive/Documents/Internship/LNCO%20Graasp/Analytics/node_modules/vite-plugin-checker/dist/esm/main.js";
import istanbul from "file:///C:/Users/ymijs/OneDrive/Documents/Internship/LNCO%20Graasp/Analytics/node_modules/vite-plugin-istanbul/dist/index.mjs";
var __vite_injected_original_dirname = "C:\\Users\\ymijs\\OneDrive\\Documents\\Internship\\LNCO Graasp\\Analytics";
var config = ({ mode }) => {
  process.env = {
    VITE_VERSION: "default",
    VITE_BUILD_TIMESTAMP: (/* @__PURE__ */ new Date()).toISOString(),
    ...process.env,
    ...loadEnv(mode, process.cwd())
  };
  return defineConfig({
    base: "/",
    server: {
      port: parseInt(process.env.VITE_PORT || "3113", 10),
      // only auto open the app when in dev mode
      open: mode === "development",
      watch: {
        ignored: ["**/coverage/**", "**/cypress/downloads/**"]
      }
    },
    preview: {
      port: parseInt(process.env.VITE_PORT || "3333", 10),
      strictPort: true
    },
    build: {
      outDir: "build",
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes("mockServerEntry")) {
              return "mockServerEntry";
            }
          }
        }
      }
    },
    optimizeDeps: {
      include: ["@emotion/react", "@emotion/styled", "@mui/material/Tooltip"]
    },
    plugins: [
      checker({
        typescript: true,
        eslint: { lintCommand: 'eslint "./**/*.{ts,tsx}"' },
        overlay: { initialIsOpen: false }
      }),
      react({
        jsxImportSource: "@emotion/react",
        babel: {
          plugins: ["@emotion/babel-plugin"]
        }
      }),
      istanbul({
        include: "src/*",
        exclude: ["node_modules", "test/", ".nyc_output", "coverage"],
        extension: [".js", ".ts", ".tsx"],
        requireEnv: false,
        forceBuildInstrument: mode === "test",
        checkProd: true
      })
    ],
    resolve: {
      alias: {
        "@": resolve(__vite_injected_original_dirname, "src")
      }
    }
  });
};
var vite_config_default = config;
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFx5bWlqc1xcXFxPbmVEcml2ZVxcXFxEb2N1bWVudHNcXFxcSW50ZXJuc2hpcFxcXFxMTkNPIEdyYWFzcFxcXFxBbmFseXRpY3NcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXHltaWpzXFxcXE9uZURyaXZlXFxcXERvY3VtZW50c1xcXFxJbnRlcm5zaGlwXFxcXExOQ08gR3JhYXNwXFxcXEFuYWx5dGljc1xcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMveW1panMvT25lRHJpdmUvRG9jdW1lbnRzL0ludGVybnNoaXAvTE5DTyUyMEdyYWFzcC9BbmFseXRpY3Mvdml0ZS5jb25maWcudHNcIjsvLy8gPHJlZmVyZW5jZSB0eXBlcz1cIi4vc3JjL2Vudi5kLnRzXCIvPlxyXG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnO1xyXG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCc7XHJcbmltcG9ydCB7IFVzZXJDb25maWdFeHBvcnQsIGRlZmluZUNvbmZpZywgbG9hZEVudiB9IGZyb20gJ3ZpdGUnO1xyXG5pbXBvcnQgY2hlY2tlciBmcm9tICd2aXRlLXBsdWdpbi1jaGVja2VyJztcclxuaW1wb3J0IGlzdGFuYnVsIGZyb20gJ3ZpdGUtcGx1Z2luLWlzdGFuYnVsJztcclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmNvbnN0IGNvbmZpZyA9ICh7IG1vZGUgfTogeyBtb2RlOiBzdHJpbmcgfSk6IFVzZXJDb25maWdFeHBvcnQgPT4ge1xyXG4gIHByb2Nlc3MuZW52ID0ge1xyXG4gICAgVklURV9WRVJTSU9OOiAnZGVmYXVsdCcsXHJcbiAgICBWSVRFX0JVSUxEX1RJTUVTVEFNUDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLFxyXG4gICAgLi4ucHJvY2Vzcy5lbnYsXHJcbiAgICAuLi5sb2FkRW52KG1vZGUsIHByb2Nlc3MuY3dkKCkpLFxyXG4gIH07XHJcblxyXG4gIHJldHVybiBkZWZpbmVDb25maWcoe1xyXG4gICAgYmFzZTogJy8nLFxyXG4gICAgc2VydmVyOiB7XHJcbiAgICAgIHBvcnQ6IHBhcnNlSW50KHByb2Nlc3MuZW52LlZJVEVfUE9SVCB8fCAnMzExMycsIDEwKSxcclxuICAgICAgLy8gb25seSBhdXRvIG9wZW4gdGhlIGFwcCB3aGVuIGluIGRldiBtb2RlXHJcbiAgICAgIG9wZW46IG1vZGUgPT09ICdkZXZlbG9wbWVudCcsXHJcbiAgICAgIHdhdGNoOiB7XHJcbiAgICAgICAgaWdub3JlZDogWycqKi9jb3ZlcmFnZS8qKicsICcqKi9jeXByZXNzL2Rvd25sb2Fkcy8qKiddLFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHByZXZpZXc6IHtcclxuICAgICAgcG9ydDogcGFyc2VJbnQocHJvY2Vzcy5lbnYuVklURV9QT1JUIHx8ICczMzMzJywgMTApLFxyXG4gICAgICBzdHJpY3RQb3J0OiB0cnVlLFxyXG4gICAgfSxcclxuICAgIGJ1aWxkOiB7XHJcbiAgICAgIG91dERpcjogJ2J1aWxkJyxcclxuICAgICAgcm9sbHVwT3B0aW9uczoge1xyXG4gICAgICAgIG91dHB1dDoge1xyXG4gICAgICAgICAgbWFudWFsQ2h1bmtzOiAoaWQ6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ21vY2tTZXJ2ZXJFbnRyeScpKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuICdtb2NrU2VydmVyRW50cnknO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgb3B0aW1pemVEZXBzOiB7XHJcbiAgICAgIGluY2x1ZGU6IFsnQGVtb3Rpb24vcmVhY3QnLCAnQGVtb3Rpb24vc3R5bGVkJywgJ0BtdWkvbWF0ZXJpYWwvVG9vbHRpcCddLFxyXG4gICAgfSxcclxuICAgIHBsdWdpbnM6IFtcclxuICAgICAgY2hlY2tlcih7XHJcbiAgICAgICAgdHlwZXNjcmlwdDogdHJ1ZSxcclxuICAgICAgICBlc2xpbnQ6IHsgbGludENvbW1hbmQ6ICdlc2xpbnQgXCIuLyoqLyoue3RzLHRzeH1cIicgfSxcclxuICAgICAgICBvdmVybGF5OiB7IGluaXRpYWxJc09wZW46IGZhbHNlIH0sXHJcbiAgICAgIH0pLFxyXG4gICAgICByZWFjdCh7XHJcbiAgICAgICAganN4SW1wb3J0U291cmNlOiAnQGVtb3Rpb24vcmVhY3QnLFxyXG4gICAgICAgIGJhYmVsOiB7XHJcbiAgICAgICAgICBwbHVnaW5zOiBbJ0BlbW90aW9uL2JhYmVsLXBsdWdpbiddLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0pLFxyXG4gICAgICBpc3RhbmJ1bCh7XHJcbiAgICAgICAgaW5jbHVkZTogJ3NyYy8qJyxcclxuICAgICAgICBleGNsdWRlOiBbJ25vZGVfbW9kdWxlcycsICd0ZXN0LycsICcubnljX291dHB1dCcsICdjb3ZlcmFnZSddLFxyXG4gICAgICAgIGV4dGVuc2lvbjogWycuanMnLCAnLnRzJywgJy50c3gnXSxcclxuICAgICAgICByZXF1aXJlRW52OiBmYWxzZSxcclxuICAgICAgICBmb3JjZUJ1aWxkSW5zdHJ1bWVudDogbW9kZSA9PT0gJ3Rlc3QnLFxyXG4gICAgICAgIGNoZWNrUHJvZDogdHJ1ZSxcclxuICAgICAgfSksXHJcbiAgICBdLFxyXG4gICAgcmVzb2x2ZToge1xyXG4gICAgICBhbGlhczoge1xyXG4gICAgICAgICdAJzogcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMnKSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgfSk7XHJcbn07XHJcbmV4cG9ydCBkZWZhdWx0IGNvbmZpZztcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUNBLE9BQU8sV0FBVztBQUNsQixTQUFTLGVBQWU7QUFDeEIsU0FBMkIsY0FBYyxlQUFlO0FBQ3hELE9BQU8sYUFBYTtBQUNwQixPQUFPLGNBQWM7QUFMckIsSUFBTSxtQ0FBbUM7QUFRekMsSUFBTSxTQUFTLENBQUMsRUFBRSxLQUFLLE1BQTBDO0FBQy9ELFVBQVEsTUFBTTtBQUFBLElBQ1osY0FBYztBQUFBLElBQ2QsdUJBQXNCLG9CQUFJLEtBQUssR0FBRSxZQUFZO0FBQUEsSUFDN0MsR0FBRyxRQUFRO0FBQUEsSUFDWCxHQUFHLFFBQVEsTUFBTSxRQUFRLElBQUksQ0FBQztBQUFBLEVBQ2hDO0FBRUEsU0FBTyxhQUFhO0FBQUEsSUFDbEIsTUFBTTtBQUFBLElBQ04sUUFBUTtBQUFBLE1BQ04sTUFBTSxTQUFTLFFBQVEsSUFBSSxhQUFhLFFBQVEsRUFBRTtBQUFBO0FBQUEsTUFFbEQsTUFBTSxTQUFTO0FBQUEsTUFDZixPQUFPO0FBQUEsUUFDTCxTQUFTLENBQUMsa0JBQWtCLHlCQUF5QjtBQUFBLE1BQ3ZEO0FBQUEsSUFDRjtBQUFBLElBQ0EsU0FBUztBQUFBLE1BQ1AsTUFBTSxTQUFTLFFBQVEsSUFBSSxhQUFhLFFBQVEsRUFBRTtBQUFBLE1BQ2xELFlBQVk7QUFBQSxJQUNkO0FBQUEsSUFDQSxPQUFPO0FBQUEsTUFDTCxRQUFRO0FBQUEsTUFDUixlQUFlO0FBQUEsUUFDYixRQUFRO0FBQUEsVUFDTixjQUFjLENBQUMsT0FBZTtBQUM1QixnQkFBSSxHQUFHLFNBQVMsaUJBQWlCLEdBQUc7QUFDbEMscUJBQU87QUFBQSxZQUNUO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0EsY0FBYztBQUFBLE1BQ1osU0FBUyxDQUFDLGtCQUFrQixtQkFBbUIsdUJBQXVCO0FBQUEsSUFDeEU7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNQLFFBQVE7QUFBQSxRQUNOLFlBQVk7QUFBQSxRQUNaLFFBQVEsRUFBRSxhQUFhLDJCQUEyQjtBQUFBLFFBQ2xELFNBQVMsRUFBRSxlQUFlLE1BQU07QUFBQSxNQUNsQyxDQUFDO0FBQUEsTUFDRCxNQUFNO0FBQUEsUUFDSixpQkFBaUI7QUFBQSxRQUNqQixPQUFPO0FBQUEsVUFDTCxTQUFTLENBQUMsdUJBQXVCO0FBQUEsUUFDbkM7QUFBQSxNQUNGLENBQUM7QUFBQSxNQUNELFNBQVM7QUFBQSxRQUNQLFNBQVM7QUFBQSxRQUNULFNBQVMsQ0FBQyxnQkFBZ0IsU0FBUyxlQUFlLFVBQVU7QUFBQSxRQUM1RCxXQUFXLENBQUMsT0FBTyxPQUFPLE1BQU07QUFBQSxRQUNoQyxZQUFZO0FBQUEsUUFDWixzQkFBc0IsU0FBUztBQUFBLFFBQy9CLFdBQVc7QUFBQSxNQUNiLENBQUM7QUFBQSxJQUNIO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDUCxPQUFPO0FBQUEsUUFDTCxLQUFLLFFBQVEsa0NBQVcsS0FBSztBQUFBLE1BQy9CO0FBQUEsSUFDRjtBQUFBLEVBQ0YsQ0FBQztBQUNIO0FBQ0EsSUFBTyxzQkFBUTsiLAogICJuYW1lcyI6IFtdCn0K
