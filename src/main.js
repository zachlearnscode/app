import Vue from 'vue'
import App from './App.vue'

//Bootstrap Styles Install
import 'bootstrap/dist/css/bootstrap.min.css'

//Font Awesome Install
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { faMoneyBillWaveAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faPlus)
library.add(faTimes)
library.add(faCheck)
library.add(faMoneyBillWaveAlt)

Vue.component('font-awesome-icon', FontAwesomeIcon)

//Vue Currency Input Import
import VueCurrencyInput from 'vue-currency-input'

Vue.use(VueCurrencyInput, {
  globalOptions: {
    currency: 'USD',
    locale: 'en',
    autoDecimalMode: true,
    distractionFree: false
  },
  componentName: 'MoneyInput'
})

//Bootstrap Vue Components Import
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { BootstrapVue } from 'bootstrap-vue'
import { ModalPlugin } from 'bootstrap-vue'
import { ButtonPlugin } from 'bootstrap-vue'
import { TooltipPlugin } from 'bootstrap-vue'

Vue.use(BootstrapVue)
Vue.use(ModalPlugin)
Vue.use(ButtonPlugin)
Vue.use(TooltipPlugin)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
