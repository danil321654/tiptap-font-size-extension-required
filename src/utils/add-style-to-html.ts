export const addStyleToHtml = (html: string): string => {
  const template = document.createElement("template");
  template.innerHTML = html;
  console.log(template.innerHTML)
  template.querySelectorAll("p")?.forEach((paragraph) => {
    paragraph.innerHTML = `<span style>${paragraph.innerHTML}</span>`
  });
  
  console.log(template.innerHTML)
  return template.innerHTML
};
