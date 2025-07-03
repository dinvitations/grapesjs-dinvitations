export default (editor) => {
  const tm = editor.TraitManager;

  tm.addType("file-asset", {
    createInput() {
      const el = document.createElement("div");
      const input = document.createElement("input");
      input.setAttribute("type", "text");
      input.value = this.model.get("value") || "";

      const button = document.createElement("button");
      button.innerHTML = "Choose Video";
      button.type = "button";
      button.className = "gjs-file-asset-btn";
      button.style = "margin-left: 5px;";

      button.addEventListener("click", () => {
        const target = this.target;
        if (!target) return;

        editor.AssetManager.open({
          types: ['video'],
          accept: 'video/*',
          select(asset) {
            const url = asset.get("src");
            target.set("video-src", url);
            target.addAttributes({ "video-src": url });
            target.view && target.view.render();
          },
        });
      });

      el.appendChild(input);
      el.appendChild(button);

      this.inputEl = input;
      return el;
    },

    onUpdate() {
      const value = this.model.get("value") || "";
      if (this.inputEl) {
        this.inputEl.value = value;
      }
    },

    onEvent() {
      if (!this.inputEl) return;
      const value = this.inputEl.value.trim();
      this.model.set("value", value);
      this.target.set("video-src", value);
      this.target.addAttributes({ "video-src": value });
    },
  });
};
