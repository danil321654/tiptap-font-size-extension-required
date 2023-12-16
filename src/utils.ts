export const addStyleToHtml = (html: string) => {
  const template = document.createElement("template");
  template.innerHTML = html;
  template.querySelectorAll("p").forEach((paragraph) => {
    paragraph.innerHTML = `<span style>${paragraph.innerHTML}</span>`
  });
  return template.innerHTML
};
