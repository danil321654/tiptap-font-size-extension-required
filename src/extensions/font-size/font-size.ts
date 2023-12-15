import '@tiptap/extension-text-style'
import { Extension } from '@tiptap/core'

interface fontSizeOptions {
  types: string[]
  defaultFontSize: string
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    fontSize: {
      /**
       * Set the font family
       */
      setFontSize: (fontSize: string) => ReturnType
      /**
       * Unset the font family
       */
      unsetFontSize: () => ReturnType
    }
  }
}

export const FontSize = Extension.create<fontSizeOptions>({
  name: 'fontSize',

  defaultOptions: {
    types: ['textStyle'],
    defaultFontSize: '14px'
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: this.options.defaultFontSize,
            parseHTML: element => element.style.fontSize.replace(/['"]+/g, ''),
            renderHTML: attributes => {
              return {
                style: `font-size: ${attributes.fontSize || this.options.defaultFontSize};`,
              }
            },
          },
        },
      },
    ]
  },

  addCommands() {
    return {
      setFontSize:
        fontSize =>
        ({ chain }) =>
          chain().setMark('textStyle', { fontSize }).run(),
      unsetFontSize:
        () =>
        ({ chain }) =>
          chain()
            .setMark('textStyle', { fontSize: this.options.defaultFontSize })
            .removeEmptyTextStyle()
            .run(),
    }
  },
})

