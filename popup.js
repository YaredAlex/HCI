//adding close_btn
let closeBtn = document.getElementById("close_btn");
let floatingBtn = document.getElementById("floating_btn");
closeBtn.addEventListener("click", () => {
  let container = document.getElementById("accessibility_window");
  floatingBtn.classList.toggle("hide");
  container.classList.toggle("show");
});

floatingBtn.addEventListener("click", function () {
  let container = document.getElementById("accessibility_window");
  container.classList.toggle("show");
  this.classList.toggle("hide");
});
let acc_color = [
  {
    icon: "/assets/invert_color.png",
    text: "Invert color",
    performAction: () => {
      document.body.style.filter =
        document.body.style.filter === "invert(1)" ? "none" : "invert(1)";
    },
  },
  {
    icon: "/assets/brightness.png",
    text: "Brightness",
    performAction: () => {
      let currentBrightness = parseFloat(
        document.body.style.filter.match(/brightness\(([^)]+)\)/)?.[1] || 1
      );
      document.body.style.filter = `brightness(${
        currentBrightness < 1.5 ? currentBrightness + 0.5 : 1
      })`;
    },
  },
  {
    icon: "/assets/contrast.png",
    text: "Contrast",
    performAction: () => {
      let currentContrast = parseFloat(
        document.body.style.filter.match(/contrast\(([^)]+)\)/)?.[1] || 1
      );
      document.body.style.filter = `contrast(${
        currentContrast < 2 ? currentContrast + 0.5 : 1
      })`;
    },
  },
  {
    icon: "/assets/saturation.png",
    text: "Saturation",
    performAction: () => {
      let currentSaturation = parseFloat(
        document.body.style.filter.match(/saturate\(([^)]+)\)/)?.[1] || 1
      );
      document.body.style.filter = `saturate(${
        currentSaturation < 2 ? currentSaturation + 0.5 : 1
      })`;
    },
  },
  {
    icon: "/assets/gray_scale.png",
    text: "Gray Scale",
    performAction: () => {
      document.body.style.filter =
        document.body.style.filter === "grayscale(1)" ? "none" : "grayscale(1)";
    },
  },
];
const acc_content = [
  {
    icon: "/assets/bigger_text.png",
    text: "Bigger Text",
    performAction: () => {
      document.body.style.fontSize =
        document.body.style.fontSize === "large" ? "initial" : "large";
    },
  },
  {
    icon: "/assets/bigger_cursor.png",
    text: "Bigger Cursor",
    performAction: () => {
      console.log(document.body.style.cursor);
      document.body.style.cursor =
        document.body.style.cursor === "default" ||
        document.body.style.cursor === ""
          ? "url('/assets/cursor.png'), auto"
          : "default";
    },
  },
  {
    icon: "/assets/tool_tip.png",
    text: "Tooltip",
    performAction: () => {
      const elements = document.querySelectorAll("*[title]");
      elements.forEach((el) => {
        if (!el.dataset.originalTitle) {
          el.dataset.originalTitle = el.title;
          el.title = `Tooltip: ${el.title}`;
        } else {
          el.title = el.dataset.originalTitle;
          el.removeAttribute("data-original-title");
        }
      });
    },
  },
  {
    icon: "/assets/bionic_reading.png",
    text: "Bionic Reading",
    performAction: () => {
      const textNodes = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT
      );
      while (textNodes.nextNode()) {
        const node = textNodes.currentNode;
        if (!node.parentNode.dataset.bionic) {
          node.parentNode.dataset.bionic = true;
          const words = node.textContent.split(" ");
          node.replaceWith(
            ...words.map((word) => {
              const span = document.createElement("span");
              span.innerHTML = `<b>${word.slice(
                0,
                Math.ceil(word.length / 2)
              )}</b>${word.slice(Math.ceil(word.length / 2))}`;
              return span;
            })
          );
        }
      }
    },
  },
  {
    icon: "/assets/hiding_image.png",
    text: "Hide Image",
    performAction: () => {
      const images = document.querySelectorAll("img");
      images.forEach((img) => {
        img.style.visibility =
          img.style.visibility === "hidden" ? "visible" : "hidden";
      });
    },
  },
  {
    icon: "/assets/stop_animation.png",
    text: "Stop Animation",
    performAction: () => {
      const animations = document.querySelectorAll("*");
      animations.forEach((el) => {
        const animationState = getComputedStyle(el).animationPlayState;
        el.style.animationPlayState =
          animationState === "paused" ? "running" : "paused";
      });
    },
  },
  {
    icon: "/assets/line_height.png",
    text: "Line Height",
    performAction: () => {
      document.body.style.lineHeight =
        document.body.style.lineHeight === "2" ? "1.5" : "2";
    },
  },
  {
    icon: "/assets/highlight_link.png",
    text: "Highlight Links",
    performAction: () => {
      const links = document.querySelectorAll("a");
      links.forEach((link) => {
        link.style.backgroundColor =
          link.style.backgroundColor === "yellow" ? "transparent" : "yellow";
      });
    },
  },
];
//populate accessibility_color
const populateAccessibilityColor = () => {
  //accessibility_color container
  const accessibility_color = document.getElementById("accessibility_color");
  let mapped = acc_color.map((e) => {
    let card = document.createElement("div");
    card.classList.add(...["card", "cursor_pointer"]);
    card.innerHTML = ` 
    <div class='img-container'><img src='${e.icon}' alt='${e.text}' /></div>
    <p>${e.text}</p>
    `;
    card.addEventListener("click", function () {
      e.performAction();
      this.classList.toggle("active");
    });
    return card;
  });
  //make a template
  console.log(mapped);
  accessibility_color.append(...mapped);
};
const populateAccessibilityContent = () => {
  //accessibility_content container
  const accessibility_content = document.getElementById(
    "accessibility_content"
  );
  let mapped = acc_content.map((e) => {
    let card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = ` 
    <div class='img-container'><img src='${e.icon}' alt='${e.text}' /></div>
    <p>${e.text}</p>
    `;
    card.addEventListener("click", function () {
      e.performAction();
      this.classList.toggle("active");
    });
    return card;
  });
  //make a template
  console.log(mapped);
  accessibility_content.append(...mapped);
};

populateAccessibilityColor();
populateAccessibilityContent();

const dialog = () => {};
