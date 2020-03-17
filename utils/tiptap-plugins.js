import { Extension, Plugin } from "tiptap";

export class EnterHandler extends Extension {
  get name() {
    return "enter_handler";
  }

  get defaultOptions() {
    return {
      preventDefault: false,
      onEnter: null
    };
  }

  get plugins() {
    return [
      new Plugin({
        props: {
          handleKeyDown: (view, event) => {
            const { onEnter, preventDefault } = this.options;
            if (event.key === "Enter" && !event.shiftKey) {
              onEnter && onEnter();

              return !preventDefault;
            }

            return preventDefault;
          }
        }
      })
    ];
  }
}

export class PasteHandler extends Extension {
  get name() {
    return "paste_handler";
  }

  get defaultOptions() {
    return {
      onPaste: null
    };
  }

  get plugins() {
    return [
      new Plugin({
        props: {
          handlePaste: (view, event, slice) => {
            // console.log('event', event)
            // console.log('slice', event)
            const { onPaste } = this.options;
            onPaste && onPaste(view, event, slice);
          }
        }
      })
    ];
  }
}
