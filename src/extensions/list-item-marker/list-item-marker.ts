import { Extension } from '@tiptap/core'
import { Plugin, PluginKey } from 'prosemirror-state'
import { Node as ProseMirrorNode } from 'prosemirror-model'
import { Decoration, DecorationSet } from 'prosemirror-view'
import './list-item-marker.scss'

const styleMarker = (doc: ProseMirrorNode) => {
  const decorations: Decoration[] = []

  doc.descendants((listNode: ProseMirrorNode, listNodePos: number) => {
    const isBulletList = listNode.type.name === 'bulletList'
    const isOrderedList = listNode.type.name === 'orderedList'
    if (isBulletList && isOrderedList) {
      return
    }
    let marker = isOrderedList ? 0 : '•'
    listNode.descendants((listItem: ProseMirrorNode, listItemPos: number) => {
      if (listItem.type.name !== 'listItem') {
        return
      }
      let inserted = false
      listItem.descendants((textNode: ProseMirrorNode, textNodePos: number) => {
        if (inserted || textNode.type.name !== 'text') {
          return
        }
        const mark = textNode.marks.find(
          nodeMark => nodeMark.type.name === 'textStyle',
        )
        if (mark) {
          if (isOrderedList) {
            marker = +marker + 1
          }
          const widget = document.createElement('span')
          widget.innerText = isOrderedList ? `${marker}. ` : `${marker}\t`
          for (const styleProp in mark.attrs) {
            widget.style[styleProp as 'fontSize'] = String(mark.attrs[styleProp])
          }
          decorations.push(
            Decoration.widget(
              listNodePos + listItemPos + textNodePos + 1,
              widget,
            ),
          )
          inserted = true
        }
      })
    })
  })

  return DecorationSet.create(doc, decorations)
}

export const ListItemMarker = Extension.create({
  name: 'list-item-marker',
  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('customMarker'),
        state: {
          init(_, { doc }) {
            return styleMarker(doc)
          },
          apply(tr, _) {
            return tr.docChanged ? styleMarker(tr.doc) : _
          },
        },
        props: {
          decorations(state) {
            return this.getState(state)
          },
        },
      }),
    ]
  },
})
