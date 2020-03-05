import { Extension, Plugin } from "tiptap";

console.log('dattest Extension', Extension)

export class EnterHandler extends Extension {
  get name() {
    return "enter_handler";
  }

  get defaultOptions() {
    return {
      preventDefault: false,
      onEnter: null
    }
  }

  get plugins() {
    return [
      new Plugin({
        props: {
          handleKeyDown: (view, event) => {
            const { onEnter, preventDefault } = this.options;
            if (event.key === "Enter" && !event.shiftKey) {
              onEnter && onEnter();

              return preventDefault;
            }

            return preventDefault;
          }
        }
      })
    ];
  }
}
