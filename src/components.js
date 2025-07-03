export default (editor, options = {}) => {
  const domc = editor.DomComponents;

  domc.addType("background-video", {
    extend: "default",
    model: {
      defaults: {
        tagName: "div",
        draggable: true,
        droppable: true,
        attributes: { class: "background-video-wrapper" },
        provider: "html5",
        components: [],
        styles: `
          .background-video-wrapper {
            position: relative;
            width: 100%;
            height: 0;
            padding-bottom: 56.25%;
            overflow: hidden;
          }
          .background-video-wrapper iframe,
          .background-video-wrapper video {
            position: absolute;
            top: 0; left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        `,
        traits: [
          {
            type: "text",
            name: "overlayId",
            label: "Overlay ID",
            changeProp: 1,
          },
          {
            type: "select",
            name: "provider",
            label: "Video Provider",
            changeProp: 1,
            options: [
              { value: "html5", name: "Uploaded Video" },
              { value: "youtube", name: "YouTube" },
              { value: "youtube-nocookie", name: "YouTube (No Cookie)" },
              { value: "vimeo", name: "Vimeo" },
            ],
          },
          {
            type: "file-asset",
            label: "Upload Video",
            name: "video-src",
            changeProp: 1,
          },
          {
            type: "text",
            name: "embed-src",
            label: "Embed ID",
            changeProp: 1,
          },
          {
            type: "color",
            label: "Overlay Color",
            name: "overlay-color",
            changeProp: 1,
          },
        ],
      },

      init() {
        if (!this.get("overlayId")) {
          const id = `video-overlay-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
          this.set("overlayId", id);
        }

        this.listenTo(this, "change:provider", this.updateProvider);
        this.listenTo(this, "change:video-src", this.updateHtml5Src);
        this.listenTo(this, "change:embed-src", this.updateEmbedSrc);
        this.listenTo(this, "change:overlay-color", this.updateOverlayColor);

        this.updateProvider();
      },

      updateProvider() {
        const provider = this.get("provider");
        const comps = this.get("components");
        const overlayId = this.get("overlayId");

        const overlayComp = comps.find(
          (comp) => comp.getAttributes().id === overlayId
        );

        comps.filter((comp) => {
          const tag = comp.get("tagName");
          return tag === "video" || tag === "iframe";
        }).forEach((c) => comps.remove(c));

        let videoComp;
        if (provider === "html5") {
          videoComp = {
            tagName: "video",
            type: "video",
            attributes: {
              autoplay: true,
              loop: true,
              muted: true,
              playsinline: true,
              controls: false,
              src: this.get("video-src") || "",
              style: "width:100%; height:100%; object-fit:cover;",
            },
            draggable: false,
          };
        } else {
          const id = this.get("embed-src") || "";
          let embedUrl = "";

          if (provider === "youtube") {
            embedUrl = `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}`;
          } else if (provider === "youtube-nocookie") {
            embedUrl = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}`;
          } else if (provider === "vimeo") {
            embedUrl = `https://player.vimeo.com/video/${id}?autoplay=1&muted=1&loop=1&background=1`;
          }

          videoComp = {
            tagName: "iframe",
            attributes: {
              src: embedUrl,
              frameborder: 0,
              allow: "autoplay; fullscreen",
              allowfullscreen: true,
              style: "width:100%; height:100%;",
            },
            draggable: false,
          };
        }

        const overlayIndex = overlayComp ? comps.indexOf(overlayComp) : comps.length;
        comps.add(videoComp, { at: overlayIndex });

        this.updateOverlayColor();
      },

      updateHtml5Src() {
        if (this.get("provider") !== "html5") return;

        const videoWrapper = this.get("components").find(
          (comp) => comp.get("tagName") === "video"
        );

        if (videoWrapper) {
          videoWrapper.set("src", this.get("video-src"));
        }
      },

      updateEmbedSrc() {
        if (this.get("provider") === "html5") return;
        this.updateProvider();
      },

      updateOverlayColor() {
        const comps = this.get("components");
        const overlayId = this.get("overlayId");
        const color = this.get("overlay-color") || "rgba(0,0,0,0.3)";

        let overlay = comps.find(
          (comp) => comp.getAttributes().id === overlayId
        );

        // Create overlay if missing
        if (!overlay) {
          const newOverlay = this.addOverlayComponent(color);
          comps.add(newOverlay);

          overlay = comps.find(
            (comp) => comp.getAttributes().id === overlayId
          );
        }

        const style = overlay.getStyle() || {};
        overlay.setStyle({
          ...style,
          background: color,
        });
      },

      addOverlayComponent(color) {
        return {
          tagName: "div",
          attributes: {
            id: this.get("overlayId"),
            class: "video-overlay",
          },
          style: {
            position: "absolute",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            background: color,
          },
          draggable: false,
        };
      },
    },
  });
};
