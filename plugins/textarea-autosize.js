import Vue from 'vue'

function resize(event) {
  const el = event.target;
  el.style.height = 'auto'
  el.style.height = el.scrollHeight + 'px'
}

function delayResize(event) {
  window.setTimeout(function() {
    resize(event)
  }, 0)
}

Vue.directive('textarea-autosize', {
  inserted: function(el, binding, vnode) {
    resize({ target: el });

    el.addEventListener('change', resize, true);
    el.addEventListener('cut', delayResize, true);
    el.addEventListener('paste', delayResize, true);
    el.addEventListener('drop', delayResize, true);
    el.addEventListener('keydown', delayResize, true);
  },

  unbind: function(el, binding, vnode) {
    el.removeEventListener('change', resize, true);
    el.removeEventListener('cut', delayResize, true);
    el.removeEventListener('paste', delayResize, true);
    el.removeEventListener('drop', delayResize, true);
    el.removeEventListener('keydown', delayResize, true);
  }
})