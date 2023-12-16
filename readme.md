
# Tiptap font size extension

An extension for tiptap, which handles working with font sizes.

Fixed comparing to https://github.com/TheNaschkatze/tiptap-extension-font-size :

1. Fixed ordered and unordered list marker size 
2. Font size now is required property, you can configure default font size


## To start

1. `yarn add tiptap-extension-font-size`
2. import extensions and styles **TextStyle** is required
```
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import {
  FontSize,
  ListItemMarker,
  addStyleToHtml,
} from "tiptap-extension-font-size-required";
import "../node_modules/tiptap-extension-font-size-required/dist/style.css";

const extensions = [
  StarterKit,
  TextStyle,
  FontSize.configure({
    defaultFontSize: "18px",
  }),
  ListItemMarker,
];

const content =
  "<ol><li><p>Hello World!</p></li><li><p><span style='font-size: 36px;'>Hello World!</span></p></li></ol><p>sjjsjsjsjjs  </p>";

export const Editor = () => {
  const editor = useEditor({
    extensions,
    content: addStyleToHtml(content),
  });
  return <EditorContent editor={editor} />;
};

```

## FontSize extension
Can be configured with default font size value (valid css value)
```
FontSize.configure({
    defaultFontSize: "18px",
}),
```

1. **TextStyle extension is required**
2. To add default styles you should transform content with util function `addStyleToHtml`
`import { addStyleToHtml } from "tiptap-extension-font-size-required";`
```
const editor = useEditor({
    extensions,
    content: addStyleToHtml(content),
});
```

## ListItemMarker
Can't be configured. It's **required to import styles** to use this decorator
`import "../node_modules/tiptap-extension-font-size-required/dist/style.css";`
