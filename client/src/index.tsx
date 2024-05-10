import { createRoot } from 'react-dom/client'
// Axios
import axios from 'axios'
import { Chart, registerables } from 'chart.js'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
// Apps
import './assets/fonticon/fonticon.css'
import './assets/keenicons/duotone/style.css'
import './assets/keenicons/outline/style.css'
import './assets/keenicons/solid/style.css'
/**
 * TIP: Replace this style import with rtl styles to enable rtl mode
 *
 * import './_metronic/assets/css/style.rtl.css'
 **/
import './assets/sass/style.scss'
import './assets/sass/plugins.scss'
import './assets/sass/style.react.scss'
import { AppRoutes } from './routes/AppRoutes'
import { AuthProvider, setupAxios } from './auth'

/**
 * Creates `axios-mock-adapter` instance for provided `axios` instance, add
 * basic Metronic mocks and returns it.
 *
 * @see https://github.com/ctimmerm/axios-mock-adapter
 */
/**
 * Inject Metronic interceptors for axios.
 *
 * @see https://github.com/axios/axios#interceptors
 */
setupAxios(axios)
Chart.register(...registerables)

const queryClient = new QueryClient()
const container = document.getElementById('root')
if (container) {
  createRoot(container).render(
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} buttonPosition='bottom-left'/>
    </QueryClientProvider>
  )
}
