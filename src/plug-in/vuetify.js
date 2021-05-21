import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'


Vue.use(Vuetify);
export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#3f51b5',
        secondary: '#9c27b0',
        accent: '#e91e63',
        error: '#f44336',
        warning:'#ff5722',
        info: '#03a9f4',
        success: '#4caf50'
      },
    },
  },

})
