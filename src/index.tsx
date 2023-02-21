// /* global Office */
// /* eslint-disable @typescript-eslint/no-var-requires */
// /* eslint-disable global-require */
// import { AppContainer } from 'react-hot-loader';
// import { initializeIcons } from '@fluentui/font-icons-mdl2';
// import { ThemeProvider } from '@fluentui/react';
// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './app/App';
// import RouteApp from './app/RouteApp';

import React from 'react';
import ReactDOM from 'react-dom';
import RouteApp from './app/RouteApp';

// initializeIcons();

// let isOfficeInitialized = false;

// const title = 'Contoso Task Pane Add-in';

// const render = (Component) => {
//     ReactDOM.render(
//         <AppContainer>
//             <ThemeProvider>
//                 <Component title={title} isOfficeInitialized={isOfficeInitialized} />
//             </ThemeProvider>
//         </AppContainer>,
//         document.getElementById('container'),
//     );
// };

// /* Render application after Office initializes */
// Office.onReady(() => {
//     isOfficeInitialized = true;
//     render(RouteApp);
// });

// if ((module as any).hot) {
//     (module as any).hot.accept('./app/App.tsx', () => {
//         const NextApp = require('./app/App.tsx').default;
//         render(NextApp);
//     });
// }

const render = () => {
    ReactDOM.render(<RouteApp />, document.getElementById('container'));
};

Office.onReady(() => {
    render();
});
