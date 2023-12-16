export const addStyleToHtml = (html: string): string => {
  const body = document.createElement("body");
  body.innerHTML = html;
  body.querySelectorAll("p")?.forEach((paragraph) => {
    paragraph.innerHTML = `<span style>${paragraph.innerHTML}</span>`
  });
  const result = body.innerHTML
  body.remove()
  return result
};
