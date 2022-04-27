let listeners = {};

export default {
  listen: function(name: string, callback: Function) {
    // @ts-ignore
    if (!listeners[name]) {
      // @ts-ignore
      listeners[name] = [];
    }

    // @ts-ignore
    listeners[name].push(callback);
  },
  fire(name: string, ...args: any[]) {
    // @ts-ignore
    if (listeners[name]) {
      // @ts-ignore
      listeners[name].forEach(listener => {
        listener(...args);
      })
    }
  }
}
