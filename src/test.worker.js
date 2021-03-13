/* eslint-disable-next-line no-restricted-globals */
self.addEventListener("message", startCounter);

function startCounter(event) {
    let initial = event.data;
    setInterval(() => this.postMessage(initial++), 1000);
}