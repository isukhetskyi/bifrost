import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ReduxRoot from './ReduxRoot';

window.addEventListener('error', function(e: any) {
    let doc = document;
    let errorText = [
        e.message,
        'URL: ' + e.filename,
        'Line: ' + e.lineno + ', Column: ' + e.colno,
        'Stack: ' + (e.error && e.error.stack || '(no stack trace)')
    ].join('\n');

    // Example: log errors as visual output into the host page.
    // Note: you probably don’t want to show such errors to users, or
    //       have the errors get indexed by Googlebot; however, it may
    //       be a useful feature while actively debugging the page.
    let DOM_ID = 'rendering-debug-pre';
    if (!doc.getElementById(DOM_ID)) {
        var log = document.createElement('pre');
        log.id = DOM_ID;
        log.style.whiteSpace = 'pre-wrap';
        log.textContent = errorText;
        if (!document.body) { document.body = document.createElement('body'); }
        document.body.insertBefore(log, document.body.firstChild);
    } else {
        doc.getElementById(DOM_ID).textContent += '\n\n' + errorText;
    }

    // Example: log the error to remote service.
    // Note: you can log errors to a remote service, to understand
    //       and monitor the types of errors encountered by regular users,
    //       Googlebot, and other crawlers.
    var client = new XMLHttpRequest();
    client.open('POST', 'https://example.com/logError');
    client.setRequestHeader('Content-Type', 'text/plain;charset=UTF-8');
    client.send(errorText);

});

const rootEl = document.getElementById('root');
ReactDOM.render(<ReduxRoot />, rootEl);

if (module.hot) {
    module.hot.accept('./ReduxRoot', () => {
        const NextApp = require('./ReduxRoot').default;
        ReactDOM.render(
            <NextApp />,
            rootEl
        );
    });
}