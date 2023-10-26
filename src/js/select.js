export function customSelect(){
const selects = document.querySelectorAll("select");
for (const select of selects) {
  const div = document.createElement("div");
  const header = document.createElement("div");
  const datalist = document.createElement("datalist");
  const optgroups = select.querySelectorAll("optgroup");
  const span = document.createElement("span");
  const options = select.options;
  const parent = select.parentElement;
  const multiple = select.hasAttribute("multiple");
  const placeholder = select.getAttribute("placeholder");
  const tabindex = select.getAttribute("tabindex");
  function onclick(e) {
    const disabled = this.hasAttribute("data-disabled");
    select.value = this.dataset.value;
    span.innerText = this.dataset.label;
    if (disabled) return;
    if (multiple) {
      if (e.shiftKey) {
        const checked = this.hasAttribute("data-checked");
        if (checked) {
          this.removeAttribute("data-checked");
        } else {
          this.setAttribute("data-checked", "");
        }
      } else {
        const options = div.querySelectorAll(".option");
        for (let i = 0; i < options.length; i++) {
          const option = options[i];
          option.removeAttribute("data-checked");
        }
        this.setAttribute("data-checked", "");
      }
    }
  }

  function onkeyup(e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.keyCode === 13) {
      this.click();
    }
  }

  div.classList.add("select");
  header.classList.add("header");
  div.tabIndex = tabindex;
  select.tabIndex = -1;
  // span.innerText = select.label;
  span.innerText = placeholder;
  header.appendChild(span);

  for (const attribute of select.attributes) {
    div.dataset[attribute.name] = attribute.value;
  }
  for (let i = 0; i < options.length; i++) {
    const option = document.createElement("div");
    const label = document.createElement("div");
    const o = options[i];
    for (const attribute of o.attributes) {
      option.dataset[attribute.name] = attribute.value;
    }
    option.classList.add("option");
    label.classList.add("label");
    label.innerText = o.label;
    option.dataset.value = o.value;
    option.dataset.label = o.label;
    option.onclick = onclick;
    option.onkeyup = onkeyup;
    option.tabIndex = i + 1;
    option.appendChild(label);
    datalist.appendChild(option);
  }
  div.appendChild(header);
  for (const o of optgroups) {
    const optgroup = document.createElement("div");
    const label = document.createElement("div");
    const options = o.querySelectorAll("option");

    Object.assign(optgroup, o);
    optgroup.classList.add("optgroup");
    label.classList.add("label");
    label.innerText = o.label;
    optgroup.appendChild(label);
    div.appendChild(optgroup);
    for (const o of options) {
      const option = document.createElement("div");
      const label = document.createElement("div");

      for (const attribute of o.attributes) {
        option.dataset[attribute.name] = attribute.value;
      }
      option.classList.add("option");
      label.classList.add("label");
      label.innerText = o.label;
      option.tabIndex = i + 1;
      option.dataset.value = o.value;
      option.dataset.label = o.label;
      option.onclick = onclick;
      option.onkeyup = onkeyup;
      option.tabIndex = i + 1;
      option.appendChild(label);
      optgroup.appendChild(option);
    }
  }

  div.onclick = (e) => {
    e.preventDefault();
  };

  parent.insertBefore(div, select);
  header.appendChild(select);
  div.appendChild(datalist);
  datalist.style.top = `${header.offsetTop + header.offsetHeight + 16}px`;

  div.onclick = (e) => {
    if (!multiple) {
      const open = div.hasAttribute("data-open");
      e.stopPropagation();
      if (open) {
        div.removeAttribute("data-open");
      } else {
        document.querySelectorAll('.select').forEach(s => {
          if (s !== select && s.hasAttribute("data-open")) {
            s.removeAttribute("data-open");
          }
        })
        div.setAttribute("data-open", "");
      }
    }
  };

  div.onkeyup = (event) => {
    event.preventDefault();
    if (event.keyCode === 13) {
      div.click();
    }
  };

  document.addEventListener("click", (e) => {
    if (div.hasAttribute("data-open")) {
      div.removeAttribute("data-open");
    }
  });

div.style.width = `${100}%`;
div.tabIndex = 1;
}


// document.forms[0].onsubmit = (e) => {
//   const data = new FormData(this);
//   e.preventDefault();
//   submit.innerText = JSON.stringify([...data.entries()]);
// };
}