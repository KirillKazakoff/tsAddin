/* eslint-disable no-console */
// consoleRedefine + renderToString method error disable in console
const consoleError = console.error;
const SUPPRESSED_WARNINGS = ['useLayoutEffect does nothing on the server'];

console.error = function filterWarnings(msg, ...args) {
    if (!SUPPRESSED_WARNINGS.some((entry) => msg.includes(entry))) {
        consoleError(msg, ...args);
    }
};
