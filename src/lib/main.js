import * as KeyCode from 'keycode-js';
import Copyray from './copyray';
import { isMac } from './util';

export const start = async (url) => {
  const data = {};
  const copyray = new Copyray(url, data);

  document.addEventListener('keydown', (event) => {
    if (copyray.isShowing && event.keyCode === KeyCode.KEY_ESCAPE) {
      copyray.hide();
      return;
    }

    if (((isMac && event.metaKey) || (!isMac && event.ctrlKey)) && event.shiftKey && event.keyCode === KeyCode.KEY_K) {
      copyray.toggle();
    }
  });

  if (console) {
    // eslint-disable-next-line no-console
    console.log(`Ready to Copyray. Press ${isMac ? 'cmd+shift+k' : 'ctrl+shift+k'} to scan your UI.`);
  }

  window.copyray = copyray;
};
