import { createStore } from "vuex";
import CoachModule from "./modules/coaches/index.js";
import requestsModule from './modules/requests/index.js';
import authModule from './modules/auth/index.js';
const store = createStore({
    modules: {
        coaches: CoachModule,
        requests: requestsModule,
        authModule: authModule
    },
});

export default store;