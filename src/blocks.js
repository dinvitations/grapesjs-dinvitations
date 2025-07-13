export default (editor) => {
  const bm = editor.BlockManager;

  bm.add("background-video", {
    label: "Background Video",
    category: "Basic",
    media: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M2.5,4.5H21.5C22.34,4.5 23,5.15 23,6V17.5C23,18.35 22.34,19 21.5,19H2.5C1.65,19 1,18.35 1,17.5V6C1,5.15 1.65,4.5 2.5,4.5M9.71,8.5V15L15.42,11.7L9.71,8.5M17.25,21H6.65C6.35,21 6.15,20.8 6.15,20.5C6.15,20.2 6.35,20 6.65,20H17.35C17.65,20 17.85,20.2 17.85,20.5C17.85,20.8 17.55,21 17.25,21Z" />
      </svg>
    `,
    content: {
      type: "background-video",
    },
    select: true,
    activate: true,
  });

  bm.add("rsvp-buttons", {
    label: "RSVP Buttons",
    category: "DInvitations",
    media: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M6,1V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3H18V1H16V3H8V1H6M5,8H19V19H5V8M12.19,9C11.32,9 10.62,9.2 10.08,9.59C9.56,10 9.3,10.57 9.31,11.36L9.32,11.39H11.25C11.26,11.09 11.35,10.86 11.53,10.7C11.71,10.55 11.93,10.47 12.19,10.47C12.5,10.47 12.76,10.57 12.94,10.75C13.12,10.94 13.2,11.2 13.2,11.5C13.2,11.82 13.13,12.09 12.97,12.32C12.83,12.55 12.62,12.75 12.36,12.91C11.85,13.25 11.5,13.55 11.31,13.82C11.11,14.08 11,14.5 11,15H13C13,14.69 13.04,14.44 13.13,14.26C13.22,14.08 13.39,13.9 13.64,13.74C14.09,13.5 14.46,13.21 14.75,12.81C15.04,12.41 15.19,12 15.19,11.5C15.19,10.74 14.92,10.13 14.38,9.68C13.85,9.23 13.12,9 12.19,9M11,16V18H13V16H11Z" />
      </svg>
    `,
    content: () => {
      const id = `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      return `
        <div id="rsvp-container-${id}" class="rsvp-group" data-rsvp-block-id="${id}">
          <button id="rsvp-yes-${id}" class="btn-rsvp-yes">Yes</button>
          <button id="rsvp-no-${id}" class="btn-rsvp-no">No</button>
        </div>
      `;
    },
    select: true,
    activate: true,
  });

  bm.add("guest-name", {
    label: "Guest Name",
    category: "DInvitations",
    media: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M18 2H12V9L9.5 7.5L7 9V2H6A2 2 0 0 0 4 4V20A2 2 0 0 0 6 22H18A2 2 0 0 0 20 20V4A2 2 0 0 0 18 2M14 12A2 2 0 1 1 12 14A2 2 0 0 1 14 12M18 20H10V19C10 17.67 12.67 17 14 17S18 17.67 18 19Z" />
      </svg>
    `,
    content: {
      type: "text",
      content: "Guest Name",
      attributes: { class: "guest_name" },
    },
  });

  bm.add("guest-qrcode", {
    label: "QR Code",
    category: "DInvitations",
    media: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M3,11H5V13H3V11M11,5H13V9H11V5M9,11H13V15H11V13H9V11M15,11H17V13H19V11H21V13H19V15H21V19H19V21H17V19H13V21H11V17H15V15H17V13H15V11M19,19V15H17V19H19M15,3H21V9H15V3M17,5V7H19V5H17M3,3H9V9H3V3M5,5V7H7V5H5M3,15H9V21H3V15M5,17V19H7V17H5Z" />
      </svg>
    `,
    content: {
      tagName: "img",
      type: "image",
      attributes: {
        class: "qr_code",
      },
    },
  });

  bm.add("event-date", {
    label: "Event Date",
    category: "DInvitations",
    media: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M6 1V3H5C3.89 3 3 3.89 3 5V19C3 20.11 3.9 21 5 21H19C20.11 21 21 20.11 21 19V5C21 3.9 20.11 3 19 3H18V1H16V3H8V1H6M5 8H19V19H5V8M11 9V14H13V9H11M11 16V18H13V16H11Z" />
      </svg>
    `,
    content: {
      type: "text",
      content: "Event Date",
      attributes: { class: "event_date" },
    },
  });

  bm.add("address", {
    label: "Address",
    category: "DInvitations",
    media: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22S19 14.25 19 9C19 5.13 15.87 2 12 2M12 11.5C10.62 11.5 9.5 10.38 9.5 9S10.62 6.5 12 6.5 14.5 7.62 14.5 9 13.38 11.5 12 11.5Z" />
      </svg>
    `,
    content: {
      type: "text",
      content: "Address",
      attributes: {
        class: "address",
      },
    },
  });

  bm.add("location-link", {
    label: "Location Link",
    category: "DInvitations",
    media: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M3.05,13H1V11H3.05C3.5,6.83 6.83,3.5 11,3.05V1H13V3.05C17.17,3.5 20.5,6.83 20.95,11H23V13H20.95C20.5,17.17 17.17,20.5 13,20.95V23H11V20.95C6.83,20.5 3.5,17.17 3.05,13M12,5A7,7 0 0,0 5,12A7,7 0 0,0 12,19A7,7 0 0,0 19,12A7,7 0 0,0 12,5Z" />
      </svg>
    `,
    content: {
      tagName: "a",
      type: "link",
      content: "Open Maps",
      attributes: {
        target: "_blank",
        class: "location_link",
      },
    },
  });
};
