/* eslint-disable no-restricted-globals */
/* eslint-disable no-nested-ternary */
/* global Office */

/**
 * Shows a notification when the add-in command is executed.
 * @param event
 */
function action(event: Office.AddinCommands.Event) {
    const message: Office.NotificationMessageDetails = {
        type: Office.MailboxEnums.ItemNotificationMessageType.InformationalMessage,
        message: 'Performed action.',
        icon: 'Icon.80x80',
        persistent: true,
    };

    // Show a notification message
    Office.context.mailbox.item.notificationMessages.replaceAsync('action', message);

    // Be sure to indicate when the add-in command function is complete
    event.completed();
}

function getGlobal() {
    return typeof self !== 'undefined'
        ? self
        : typeof window !== 'undefined'
            ? window
            : typeof global !== 'undefined'
                ? global
                : undefined;
}

Office.onReady(() => {
    const g = getGlobal() as any;

    // The add-in command functions need to be available in global scope
    g.action = action;

    // If needed, Office.js is ready to be called
});
