<template>
  <div class="editor">
    <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
      <div class="menubar">
        <div class="toolbar">
          <button class="menubar__button" @click="commands.undo">
            <IconUndo class="icon" />
          </button>

          <button class="menubar__button" @click="commands.redo">
            <IconRedo class="icon" />
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.bold() }"
            @click="commands.bold"
          >
            <IconBold class="icon" />
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.italic() }"
            @click="commands.italic"
          >
            <IconItalic class="icon" />
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.strike() }"
            @click="commands.strike"
          >
            <IconStrike class="icon" />
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.underline() }"
            @click="commands.underline"
          >
            <IconUnderline class="icon" />
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.code() }"
            @click="commands.code"
          >
            <IconCode class="icon" />
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.paragraph() }"
            @click="commands.paragraph"
          >
            <IconParagraph class="icon" />
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 1 }) }"
            @click="commands.heading({ level: 1 })"
          >H1</button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 2 }) }"
            @click="commands.heading({ level: 2 })"
          >H2</button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 3 }) }"
            @click="commands.heading({ level: 3 })"
          >H3</button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.bullet_list() }"
            @click="commands.bullet_list"
          >
            <IconBulletList class="icon" />
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.ordered_list() }"
            @click="commands.ordered_list"
          >
            <IconOrderList class="icon" />
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.blockquote() }"
            @click="commands.blockquote"
          >
            <IconQuote class="icon" />
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.code_block() }"
            @click="commands.code_block"
          >
            <IconCode class="icon" />
          </button>

          <button
            class="menubar__button"
            @click="commands.createTable({rowsCount: 3, colsCount: 3, withHeaderRow: false })"
          >
            <IconTable class="icon" />
          </button>

          <span v-if="isActive.table()">
            <button class="menubar__button" @click="commands.deleteTable">
              <icon name="delete_table" />
              <IconTableDelete class="icon" />
            </button>
            <button class="menubar__button" @click="commands.addColumnBefore">
              <IconTableAddColBefore class="icon" />
            </button>
            <button class="menubar__button" @click="commands.addColumnAfter">
              <IconTableAddColAfter class="icon" />
            </button>
            <button class="menubar__button" @click="commands.deleteColumn">
              <IconTableDeleteCol class="icon" />
            </button>
            <button class="menubar__button" @click="commands.addRowBefore">
              <IconTableAddRowBefore class="icon" />
            </button>
            <button class="menubar__button" @click="commands.addRowAfter">
              <IconTableAddRowAfter class="icon" />
            </button>
            <button class="menubar__button" @click="commands.deleteRow">
              <IconTableDeleteRow class="icon" />
            </button>
            <button class="menubar__button" @click="commands.toggleCellMerge">
              <IconTableCombineCells class="icon" />
            </button>
          </span>
        </div>
      </div>
    </editor-menu-bar>

    <editor-content class="editor__content" :editor="editor" />
  </div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from "tiptap";
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  Strike,
  Underline,
  History
} from "tiptap-extensions";
import IconUndo from "~/assets/svg/text-editor/undo.svg?inline";
import IconRedo from "~/assets/svg/text-editor/redo.svg?inline";
import IconBold from "~/assets/svg/text-editor/bold.svg?inline";
import IconItalic from "~/assets/svg/text-editor/italic.svg?inline";
import IconStrike from "~/assets/svg/text-editor/strike.svg?inline";
import IconUnderline from "~/assets/svg/text-editor/underline.svg?inline";
import IconCode from "~/assets/svg/text-editor/code.svg?inline";
import IconParagraph from "~/assets/svg/text-editor/paragraph.svg?inline";
import IconBulletList from "~/assets/svg/text-editor/ul.svg?inline";
import IconOrderList from "~/assets/svg/text-editor/ol.svg?inline";
import IconQuote from "~/assets/svg/text-editor/quote.svg?inline";
import IconTable from "~/assets/svg/text-editor/table.svg?inline";
import IconTableDelete from "~/assets/svg/text-editor/delete-table.svg?inline";
import IconTableAddColBefore from "~/assets/svg/text-editor/add-col-before.svg?inline";
import IconTableAddColAfter from "~/assets/svg/text-editor/add-col-after.svg?inline";
import IconTableDeleteCol from "~/assets/svg/text-editor/delete-col.svg?inline";
import IconTableAddRowBefore from "~/assets/svg/text-editor/add-row-before.svg?inline";
import IconTableAddRowAfter from "~/assets/svg/text-editor/add-row-after.svg?inline";
import IconTableDeleteRow from "~/assets/svg/text-editor/delete-row.svg?inline";
import IconTableCombineCells from "~/assets/svg/text-editor/combine-cells.svg?inline";

export default {
  components: {
    EditorContent,
    EditorMenuBar,
    IconUndo,
    IconRedo,
    IconBold,
    IconItalic,
    IconStrike,
    IconUnderline,
    IconCode,
    IconParagraph,
    IconBulletList,
    IconOrderList,
    IconQuote,
    IconTable,
    IconTableDelete,
    IconTableAddColBefore,
    IconTableAddColAfter,
    IconTableDeleteCol,
    IconTableAddRowBefore,
    IconTableAddRowAfter,
    IconTableDeleteRow,
    IconTableCombineCells
  },

  data() {
    return {
      editor: null
    };
  },

  mounted() {
    this.editor = new Editor({
      extensions: [
        new Blockquote(),
        new BulletList(),
        new CodeBlock(),
        new HardBreak(),
        new Heading({ levels: [1, 2, 3] }),
        new ListItem(),
        new OrderedList(),
        new TodoItem(),
        new TodoList(),
        new Link(),
        new Bold(),
        new Code(),
        new Italic(),
        new Strike(),
        new Underline(),
        new History(),
        new Table({
          resizable: true
        }),
        new TableHeader(),
        new TableCell(),
        new TableRow()
      ],
      content: `
            <h2>
              Tables
            </h2>
            <p>
              Tables come with some useful commands like adding, removing or merging rows and columns. Navigate with <code>tab</code> or arrow keys. Resizing is also supported.
            </p>
            <table>
              <tr>
                <th colspan="3" data-colwidth="100,0,0">Wide header</th>
              </tr>
              <tr>
                <td>One</td>
                <td>Two</td>
                <td>Three</td>
              </tr>
              <tr>
                <td>Four</td>
                <td>Five</td>
                <td>Six</td>
              </tr>
            </table>
          `
    });
  },

  beforeDestroy() {
    this.editor.destroy();
  }
};
</script>
