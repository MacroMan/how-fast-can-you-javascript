import Vue from 'vue'
import VueJSModal from 'vue-js-modal'

Vue.use(VueJSModal, {
  dynamicDefaults: {
    clickToClose: false,
    resizable: true,
    height: 'auto',
  }
});
