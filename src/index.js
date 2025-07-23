import "./styles.scss";

import loadComponents from "./components";
import loadBlocks from "./blocks";
import loadTraits from "./traits";
import en from "./locale/en";

export default (editor, opts = {}) => {
  const options = {
    ...{
      i18n: {},
      // default options
    },
    ...opts,
  };
  // Add traits
  loadTraits(editor, options);
  // Add components
  loadComponents(editor, options);
  // Add blocks
  loadBlocks(editor, options);
  // Load i18n files
  editor.I18n &&
    editor.I18n.addMessages({
      en,
      ...options.i18n,
    });

  editor.on("load", () => {
    try {
      const pn = editor.Panels;
      const cmdm = editor.Commands;

      // canvas-clear override
      cmdm.add("canvas-clear", () => {
        if (confirm("Are you sure to clean the canvas?")) {
          editor.runCommand("core:canvas-clear");
          setTimeout(() => {
            Object.keys(localStorage).forEach((key) => {
              if (key.startsWith("gjs-") || key.includes("grapes")) {
                localStorage.removeItem(key);
              }
            });
          }, 0);
        }
      });

      // Tooltips for panel buttons
      const optionTips = [
        ["sw-visibility", "Show Borders"],
        ["preview", "Preview"],
        ["fullscreen", "Fullscreen"],
        ["export-template", "Export"],
        ["undo", "Undo"],
        ["redo", "Redo"],
        ["gjs-open-import-webpage", "Import"],
        ["canvas-clear", "Clear canvas"],
      ];
      const viewTips = [
        ["open-sm", "Style Manager"],
        ["open-layers", "Layers"],
        ["open-blocks", "Blocks"],
      ];
      optionTips.forEach(([id, title]) => {
        const btn = pn.getButton("options", id);
        btn && btn.set("attributes", { title, "data-tooltip-pos": "bottom" });
      });
      viewTips.forEach(([id, title]) => {
        const btn = pn.getButton("views", id);
        btn && btn.set("attributes", { title, "data-tooltip-pos": "bottom" });
      });

      // Convert native title to custom tooltips
      editor.getEl().querySelectorAll("*[title]").forEach((el) => {
        const title = el.getAttribute("title")?.trim();
        if (title) {
          el.setAttribute("data-tooltip", title);
          el.setAttribute("title", "");
        }
      });

      // Show borders by default
      pn.getButton("options", "sw-visibility")?.set({
        command: "core:component-outline",
        active: true,
      });

      // Open style manager and remove trait button
      pn.getButton("views", "open-tm")?.set("active", 1);
      pn.getButton("views", "open-sm")?.set("active", 1);
      pn.removeButton("views", "open-tm");

      const editorEl = editor.getEl();
      const smSectors = editorEl.querySelector(".gjs-sm-sectors");
      const traitContainer = editorEl.querySelector(".gjs-traits-cs");

      if (smSectors && traitContainer) {
        // Create "Settings" sector above Style Manager
        const traitsSector = document.createElement("div");
        traitsSector.className = "gjs-sm-sector no-select";
        traitsSector.innerHTML = `
                <div class="gjs-sm-sector-title">
                  <span class="icon-settings fa fa-cog"></span>
                  <span class="gjs-sm-sector-label">Settings</span>
                </div>
                <div class="gjs-sm-properties" style="display: none;"></div>
              `;
        const traitsProps = traitsSector.querySelector(".gjs-sm-properties");
        traitsProps.appendChild(traitContainer);
        smSectors.parentNode.insertBefore(traitsSector, smSectors);
        traitsSector
          .querySelector(".gjs-sm-sector-title")
          .addEventListener("click", () => {
            const propsStyle = traitsProps.style;
            propsStyle.display =
              propsStyle.display === "none" ? "block" : "none";
          });
      }

      // Open blocks panel
      pn.getButton("views", "open-blocks")?.set("active", 1);
    } catch (err) {
      console.error("Editor load error:", err);
    }
  });
};
