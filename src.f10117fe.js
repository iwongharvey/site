// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/@thi.ng/api/api.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LogLevel = exports.NO_OP = exports.SEMAPHORE = exports.EVENT_DISABLE = exports.EVENT_ENABLE = exports.EVENT_ALL = exports.DEFAULT_EPS = void 0;
const DEFAULT_EPS = 1e-6;
exports.DEFAULT_EPS = DEFAULT_EPS;
const EVENT_ALL = "*";
exports.EVENT_ALL = EVENT_ALL;
const EVENT_ENABLE = "enable";
exports.EVENT_ENABLE = EVENT_ENABLE;
const EVENT_DISABLE = "disable";
/**
 * Internal use only. **Do NOT use in user land code!**
 */

exports.EVENT_DISABLE = EVENT_DISABLE;
const SEMAPHORE = Symbol();
/**
 * No-effect placeholder function.
 */

exports.SEMAPHORE = SEMAPHORE;

const NO_OP = () => {};

exports.NO_OP = NO_OP;
var LogLevel;
exports.LogLevel = LogLevel;

(function (LogLevel) {
  LogLevel[LogLevel["FINE"] = 0] = "FINE";
  LogLevel[LogLevel["DEBUG"] = 1] = "DEBUG";
  LogLevel[LogLevel["INFO"] = 2] = "INFO";
  LogLevel[LogLevel["WARN"] = 3] = "WARN";
  LogLevel[LogLevel["SEVERE"] = 4] = "SEVERE";
  LogLevel[LogLevel["NONE"] = 5] = "NONE";
})(LogLevel || (exports.LogLevel = LogLevel = {}));
},{}],"node_modules/parcel-bundler/src/builtins/_empty.js":[function(require,module,exports) {

},{}],"node_modules/@thi.ng/api/assert.js":[function(require,module,exports) {
var process = require("process");
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.assert = void 0;

var _api = require("./api");

/**
 * Takes a `test` result or predicate function without args and throws
 * error with given `msg` if test failed (i.e. is falsy). The function
 * is only enabled if `NODE_ENV != "production"` or if
 * `UMBRELLA_ASSERTS = 1`.
 */
const assert = typeof process === "undefined" || "development" !== "production" || undefined === "1" ? (test, msg = "assertion failed") => {
  if (typeof test === "function" && !test() || !test) {
    throw new Error(msg);
  }
} : _api.NO_OP;
exports.assert = assert;
},{"./api":"node_modules/@thi.ng/api/api.js","process":"node_modules/parcel-bundler/src/builtins/_empty.js"}],"node_modules/@thi.ng/api/logger.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConsoleLogger = exports.NULL_LOGGER = void 0;

var _api = require("./api");

const NULL_LOGGER = Object.freeze({
  level: _api.LogLevel.NONE,

  fine() {},

  debug() {},

  info() {},

  warn() {},

  severe() {}

});
exports.NULL_LOGGER = NULL_LOGGER;

class ConsoleLogger {
  constructor(id, level = _api.LogLevel.FINE) {
    this.id = id;
    this.level = level;
  }

  fine(...args) {
    this.level <= _api.LogLevel.FINE && this.log("FINE", args);
  }

  debug(...args) {
    this.level <= _api.LogLevel.DEBUG && this.log("DEBUG", args);
  }

  info(...args) {
    this.level <= _api.LogLevel.INFO && this.log("INFO", args);
  }

  warn(...args) {
    this.level <= _api.LogLevel.WARN && this.log("WARN", args);
  }

  severe(...args) {
    this.level <= _api.LogLevel.SEVERE && this.log("SEVERE", args);
  }

  log(level, args) {
    console.log(`[${level}] ${this.id}:`, ...args);
  }

}

exports.ConsoleLogger = ConsoleLogger;
},{"./api":"node_modules/@thi.ng/api/api.js"}],"node_modules/@thi.ng/api/mixin.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mixin = void 0;

/**
 * Class behavior mixin based on:
 * http://raganwald.com/2015/06/26/decorators-in-es7.html
 *
 * Additionally only injects/overwrites properties in target, which are
 * NOT marked with `@nomixin` (i.e. haven't set their `configurable`
 * property descriptor flag to `false`)
 *
 * @param behaviour to mixin
 * @param sharedBehaviour
 * @returns decorator function
 */
const mixin = (behaviour, sharedBehaviour = {}) => {
  const instanceKeys = Reflect.ownKeys(behaviour);
  const sharedKeys = Reflect.ownKeys(sharedBehaviour);
  const typeTag = Symbol("isa");

  function _mixin(clazz) {
    for (let key of instanceKeys) {
      const existing = Object.getOwnPropertyDescriptor(clazz.prototype, key);

      if (!existing || existing.configurable) {
        Object.defineProperty(clazz.prototype, key, {
          value: behaviour[key],
          writable: true
        });
      } else {
        console.log(`not patching: ${clazz.name}.${key.toString()}`);
      }
    }

    Object.defineProperty(clazz.prototype, typeTag, {
      value: true
    });
    return clazz;
  }

  for (let key of sharedKeys) {
    Object.defineProperty(_mixin, key, {
      value: sharedBehaviour[key],
      enumerable: sharedBehaviour.propertyIsEnumerable(key)
    });
  }

  Object.defineProperty(_mixin, Symbol.hasInstance, {
    value: x => !!x[typeTag]
  });
  return _mixin;
};

exports.mixin = mixin;
},{}],"node_modules/@thi.ng/api/decorators/configurable.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configurable = void 0;

/**
 * Property decorator factory. Sets `configurable` flag of PropertyDescriptor
 * to given state.
 *
 * @param state
 */
const configurable = state => function (_, __, descriptor) {
  descriptor.configurable = state;
};

exports.configurable = configurable;
},{}],"node_modules/@thi.ng/errors/illegal-arguments.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.illegalArgs = exports.IllegalArgumentError = void 0;

class IllegalArgumentError extends Error {
  constructor(msg) {
    super("illegal argument(s)" + (msg !== undefined ? ": " + msg : ""));
  }

}

exports.IllegalArgumentError = IllegalArgumentError;

const illegalArgs = msg => {
  throw new IllegalArgumentError(msg);
};

exports.illegalArgs = illegalArgs;
},{}],"node_modules/@thi.ng/errors/illegal-arity.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.illegalArity = exports.IllegalArityError = void 0;

class IllegalArityError extends Error {
  constructor(n) {
    super(`illegal arity: ${n}`);
  }

}

exports.IllegalArityError = IllegalArityError;

const illegalArity = n => {
  throw new IllegalArityError(n);
};

exports.illegalArity = illegalArity;
},{}],"node_modules/@thi.ng/errors/illegal-state.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.illegalState = exports.IllegalStateError = void 0;

class IllegalStateError extends Error {
  constructor(msg) {
    super("illegal state" + (msg !== undefined ? ": " + msg : ""));
  }

}

exports.IllegalStateError = IllegalStateError;

const illegalState = msg => {
  throw new IllegalStateError(msg);
};

exports.illegalState = illegalState;
},{}],"node_modules/@thi.ng/errors/unsupported.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unsupported = exports.UnsupportedOperationError = void 0;

class UnsupportedOperationError extends Error {
  constructor(msg) {
    super("unsupported operation" + (msg !== undefined ? ": " + msg : ""));
  }

}

exports.UnsupportedOperationError = UnsupportedOperationError;

const unsupported = msg => {
  throw new UnsupportedOperationError(msg);
};

exports.unsupported = unsupported;
},{}],"node_modules/@thi.ng/errors/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _illegalArguments = require("./illegal-arguments");

Object.keys(_illegalArguments).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _illegalArguments[key];
    }
  });
});

var _illegalArity = require("./illegal-arity");

Object.keys(_illegalArity).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _illegalArity[key];
    }
  });
});

var _illegalState = require("./illegal-state");

Object.keys(_illegalState).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _illegalState[key];
    }
  });
});

var _unsupported = require("./unsupported");

Object.keys(_unsupported).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _unsupported[key];
    }
  });
});
},{"./illegal-arguments":"node_modules/@thi.ng/errors/illegal-arguments.js","./illegal-arity":"node_modules/@thi.ng/errors/illegal-arity.js","./illegal-state":"node_modules/@thi.ng/errors/illegal-state.js","./unsupported":"node_modules/@thi.ng/errors/unsupported.js"}],"node_modules/@thi.ng/api/decorators/deprecated.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deprecated = void 0;

var _errors = require("@thi.ng/errors");

/**
 * Method property decorator factory. Augments original method with
 * deprecation message (via console), shown when method is invoked.
 * Accepts optional message arg. Throws error if assigned property
 * is not a function.
 *
 * @param msg deprecation message
 */
const deprecated = (msg, log = console.log) => function (target, prop, descriptor) {
  const signature = `${target.constructor.name}#${prop.toString()}`;
  const fn = descriptor.value;

  if (typeof fn !== "function") {
    (0, _errors.illegalArgs)(`${signature} is not a function`);
  }

  descriptor.value = function () {
    log(`DEPRECATED ${signature}: ${msg || "will be removed soon"}`);
    return fn.apply(this, arguments);
  };

  return descriptor;
};

exports.deprecated = deprecated;
},{"@thi.ng/errors":"node_modules/@thi.ng/errors/index.js"}],"node_modules/@thi.ng/api/decorators/nomixin.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nomixin = void 0;

/**
 * Method property decorator. Sets `configurable` flag of
 * PropertyDescriptor to `false` (same as `@configurable(false)`).
 * Intended to be used in combination with mixin decorators to enable
 * partial implementations of mixed-in behaviors in target class and
 * avoid them being overidden by mixed-in behaviour.
 */
const nomixin = (_, __, descriptor) => {
  descriptor.configurable = false;
};

exports.nomixin = nomixin;
},{}],"node_modules/@thi.ng/api/decorators/sealed.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sealed = void 0;

/**
 * Class decorator. Seals both constructor and prototype.
 *
 * @param constructor
 */
const sealed = constructor => {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
};

exports.sealed = sealed;
},{}],"node_modules/@thi.ng/api/mixins/ienable.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IEnableMixin = void 0;

var _api = require("../api");

var _mixin = require("../mixin");

/**
 * Mixin class decorator, injects IEnable default implementation, incl.
 * a `_enabled` property. If the target also implements the `INotify`
 * interface, `enable()` and `disable()` will automatically emit the
 * respective events.
 */
const IEnableMixin = (0, _mixin.mixin)({
  _enabled: true,

  isEnabled() {
    return this._enabled;
  },

  enable() {
    this._enabled = true;

    if (this.notify) {
      this.notify({
        id: _api.EVENT_ENABLE,
        target: this
      });
    }
  },

  disable() {
    this._enabled = false;

    if (this.notify) {
      this.notify({
        id: _api.EVENT_DISABLE,
        target: this
      });
    }
  },

  toggle() {
    this._enabled ? this.disable() : this.enable();
    return this._enabled;
  }

});
exports.IEnableMixin = IEnableMixin;
},{"../api":"node_modules/@thi.ng/api/api.js","../mixin":"node_modules/@thi.ng/api/mixin.js"}],"node_modules/@thi.ng/api/mixins/inotify.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.INotifyMixin = exports.inotify_dispatch = void 0;

var _api = require("../api");

var _mixin = require("../mixin");

const inotify_dispatch = (listeners, e) => {
  if (!listeners) return;

  for (let i = 0, n = listeners.length, l; i < n; i++) {
    l = listeners[i];
    l[0].call(l[1], e);

    if (e.canceled) {
      return;
    }
  }
};
/**
 * Mixin class decorator, injects INotify default implementation, incl.
 * a lazily instantiated `_listeners` property object, storing
 * registered listeners.
 */


exports.inotify_dispatch = inotify_dispatch;
const INotifyMixin = (0, _mixin.mixin)({
  addListener(id, fn, scope) {
    let l = (this._listeners = this._listeners || {})[id];

    if (!l) {
      l = this._listeners[id] = [];
    }

    if (this.__listener(l, fn, scope) === -1) {
      l.push([fn, scope]);
      return true;
    }

    return false;
  },

  removeListener(id, fn, scope) {
    if (!this._listeners) return false;
    const l = this._listeners[id];

    if (l) {
      const idx = this.__listener(l, fn, scope);

      if (idx !== -1) {
        l.splice(idx, 1);
        return true;
      }
    }

    return false;
  },

  notify(e) {
    if (!this._listeners) return;
    e.target === undefined && (e.target = this);
    inotify_dispatch(this._listeners[e.id], e);
    inotify_dispatch(this._listeners[_api.EVENT_ALL], e);
  },

  __listener(listeners, f, scope) {
    let i = listeners.length;

    while (--i >= 0) {
      const l = listeners[i];

      if (l[0] === f && l[1] === scope) {
        break;
      }
    }

    return i;
  }

});
exports.INotifyMixin = INotifyMixin;
},{"../api":"node_modules/@thi.ng/api/api.js","../mixin":"node_modules/@thi.ng/api/mixin.js"}],"node_modules/@thi.ng/api/mixins/iterable.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.iterable = void 0;

var _mixin = require("../mixin");

const iterable = prop => (0, _mixin.mixin)({
  *[Symbol.iterator]() {
    yield* this[prop];
  }

});

exports.iterable = iterable;
},{"../mixin":"node_modules/@thi.ng/api/mixin.js"}],"node_modules/@thi.ng/api/mixins/iwatch.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IWatchMixin = void 0;

var _mixin = require("../mixin");

const IWatchMixin = (0, _mixin.mixin)({
  addWatch(id, fn) {
    this._watches = this._watches || {};

    if (this._watches[id]) {
      return false;
    }

    this._watches[id] = fn;
    return true;
  },

  removeWatch(id) {
    if (!this._watches) return;

    if (this._watches[id]) {
      delete this._watches[id];
      return true;
    }

    return false;
  },

  notifyWatches(oldState, newState) {
    if (!this._watches) return;
    const w = this._watches;

    for (let id in w) {
      w[id](id, oldState, newState);
    }
  }

});
exports.IWatchMixin = IWatchMixin;
},{"../mixin":"node_modules/@thi.ng/api/mixin.js"}],"node_modules/@thi.ng/api/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _api = require("./api");

Object.keys(_api).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _api[key];
    }
  });
});

var _assert = require("./assert");

Object.keys(_assert).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _assert[key];
    }
  });
});

var _logger = require("./logger");

Object.keys(_logger).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _logger[key];
    }
  });
});

var _mixin = require("./mixin");

Object.keys(_mixin).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _mixin[key];
    }
  });
});

var _configurable = require("./decorators/configurable");

Object.keys(_configurable).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _configurable[key];
    }
  });
});

var _deprecated = require("./decorators/deprecated");

Object.keys(_deprecated).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _deprecated[key];
    }
  });
});

var _nomixin = require("./decorators/nomixin");

Object.keys(_nomixin).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _nomixin[key];
    }
  });
});

var _sealed = require("./decorators/sealed");

Object.keys(_sealed).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _sealed[key];
    }
  });
});

var _ienable = require("./mixins/ienable");

Object.keys(_ienable).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _ienable[key];
    }
  });
});

var _inotify = require("./mixins/inotify");

Object.keys(_inotify).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _inotify[key];
    }
  });
});

var _iterable = require("./mixins/iterable");

Object.keys(_iterable).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _iterable[key];
    }
  });
});

var _iwatch = require("./mixins/iwatch");

Object.keys(_iwatch).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _iwatch[key];
    }
  });
});
},{"./api":"node_modules/@thi.ng/api/api.js","./assert":"node_modules/@thi.ng/api/assert.js","./logger":"node_modules/@thi.ng/api/logger.js","./mixin":"node_modules/@thi.ng/api/mixin.js","./decorators/configurable":"node_modules/@thi.ng/api/decorators/configurable.js","./decorators/deprecated":"node_modules/@thi.ng/api/decorators/deprecated.js","./decorators/nomixin":"node_modules/@thi.ng/api/decorators/nomixin.js","./decorators/sealed":"node_modules/@thi.ng/api/decorators/sealed.js","./mixins/ienable":"node_modules/@thi.ng/api/mixins/ienable.js","./mixins/inotify":"node_modules/@thi.ng/api/mixins/inotify.js","./mixins/iterable":"node_modules/@thi.ng/api/mixins/iterable.js","./mixins/iwatch":"node_modules/@thi.ng/api/mixins/iwatch.js"}],"node_modules/@thi.ng/rstream/api.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setLogger = exports.LOGGER = void 0;

var _api = require("@thi.ng/api");

let LOGGER = _api.NULL_LOGGER;
exports.LOGGER = LOGGER;

const setLogger = logger => exports.LOGGER = LOGGER = logger;

exports.setLogger = setLogger;
},{"@thi.ng/api":"node_modules/@thi.ng/api/index.js"}],"node_modules/@thi.ng/checks/exists-not-null.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.existsAndNotNull = void 0;

const existsAndNotNull = x => x != null;

exports.existsAndNotNull = existsAndNotNull;
},{}],"node_modules/@thi.ng/checks/exists.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.exists = void 0;

const exists = x => x !== undefined;

exports.exists = exists;
},{}],"node_modules/@thi.ng/checks/has-crypto.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasCrypto = void 0;

const hasCrypto = () => typeof window !== "undefined" && window["crypto"] !== undefined;

exports.hasCrypto = hasCrypto;
},{}],"node_modules/@thi.ng/checks/has-max-length.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasMaxLength = void 0;

const hasMaxLength = (len, x) => x != null && x.length <= len;

exports.hasMaxLength = hasMaxLength;
},{}],"node_modules/@thi.ng/checks/has-min-length.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasMinLength = void 0;

const hasMinLength = (len, x) => x != null && x.length >= len;

exports.hasMinLength = hasMinLength;
},{}],"node_modules/@thi.ng/checks/is-function.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isFunction = void 0;

const isFunction = x => typeof x === "function";

exports.isFunction = isFunction;
},{}],"node_modules/@thi.ng/checks/has-performance.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasPerformance = void 0;

var _isFunction = require("./is-function");

const hasPerformance = () => typeof performance !== "undefined" && (0, _isFunction.isFunction)(performance.now);

exports.hasPerformance = hasPerformance;
},{"./is-function":"node_modules/@thi.ng/checks/is-function.js"}],"node_modules/@thi.ng/checks/has-wasm.js":[function(require,module,exports) {
var global = arguments[3];
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasWASM = void 0;

const hasWASM = () => typeof window !== "undefined" && typeof window["WebAssembly"] !== "undefined" || typeof global !== "undefined" && typeof global["WebAssembly"] !== "undefined";

exports.hasWASM = hasWASM;
},{}],"node_modules/@thi.ng/checks/has-webgl.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasWebGL = void 0;

const hasWebGL = () => {
  try {
    document.createElement("canvas").getContext("webgl");
    return true;
  } catch (e) {
    return false;
  }
};

exports.hasWebGL = hasWebGL;
},{}],"node_modules/@thi.ng/checks/has-websocket.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasWebSocket = void 0;

const hasWebSocket = () => typeof WebSocket !== "undefined";

exports.hasWebSocket = hasWebSocket;
},{}],"node_modules/@thi.ng/checks/implements-function.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.implementsFunction = void 0;

const implementsFunction = (x, fn) => x != null && typeof x[fn] === "function";

exports.implementsFunction = implementsFunction;
},{}],"node_modules/@thi.ng/checks/is-array.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isArray = void 0;
const isArray = Array.isArray;
exports.isArray = isArray;
},{}],"node_modules/@thi.ng/checks/is-arraylike.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isArrayLike = void 0;

const isArrayLike = x => x != null && typeof x !== "function" && x.length !== undefined;

exports.isArrayLike = isArrayLike;
},{}],"node_modules/@thi.ng/checks/is-blob.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isBlob = void 0;

const isBlob = x => x instanceof Blob;

exports.isBlob = isBlob;
},{}],"node_modules/@thi.ng/checks/is-boolean.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isBoolean = void 0;

const isBoolean = x => typeof x === "boolean";

exports.isBoolean = isBoolean;
},{}],"node_modules/@thi.ng/checks/is-chrome.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isChrome = void 0;

const isChrome = () => typeof window !== "undefined" && !!window["chrome"];

exports.isChrome = isChrome;
},{}],"node_modules/@thi.ng/checks/is-date.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isDate = void 0;

const isDate = x => x instanceof Date;

exports.isDate = isDate;
},{}],"node_modules/@thi.ng/checks/is-even.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isEven = void 0;

const isEven = x => x % 2 === 0;

exports.isEven = isEven;
},{}],"node_modules/@thi.ng/checks/is-false.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isFalse = void 0;

const isFalse = x => x === false;

exports.isFalse = isFalse;
},{}],"node_modules/@thi.ng/checks/is-file.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isFile = void 0;

const isFile = x => x instanceof File;

exports.isFile = isFile;
},{}],"node_modules/@thi.ng/checks/is-firefox.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isFirefox = void 0;

const isFirefox = () => typeof window !== "undefined" && !!window["InstallTrigger"];

exports.isFirefox = isFirefox;
},{}],"node_modules/@thi.ng/checks/is-ie.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isIE = void 0;

const isIE = () => typeof document !== "undefined" && (typeof document["documentMode"] !== "undefined" || navigator.userAgent.indexOf("MSIE") > 0);

exports.isIE = isIE;
},{}],"node_modules/@thi.ng/checks/is-in-range.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isInRange = void 0;

const isInRange = (min, max, x) => x >= min && x <= max;

exports.isInRange = isInRange;
},{}],"node_modules/@thi.ng/checks/is-int32.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isInt32 = void 0;

const isInt32 = x => typeof x === "number" && (x | 0) === x;

exports.isInt32 = isInt32;
},{}],"node_modules/@thi.ng/checks/is-iterable.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isIterable = void 0;

const isIterable = x => x != null && typeof x[Symbol.iterator] === "function";

exports.isIterable = isIterable;
},{}],"node_modules/@thi.ng/checks/is-map.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isMap = void 0;

const isMap = x => x instanceof Map;

exports.isMap = isMap;
},{}],"node_modules/@thi.ng/checks/is-mobile.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isMobile = void 0;

const isMobile = () => typeof navigator !== "undefined" && /mobile|tablet|ip(ad|hone|od)|android|silk/i.test(navigator.userAgent) && !/crios/i.test(navigator.userAgent);

exports.isMobile = isMobile;
},{}],"node_modules/@thi.ng/checks/is-nan.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isNaN = void 0;

const isNaN = x => x !== x;

exports.isNaN = isNaN;
},{}],"node_modules/@thi.ng/checks/is-negative.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isNegative = void 0;

const isNegative = x => typeof x === "number" && x < 0;

exports.isNegative = isNegative;
},{}],"node_modules/@thi.ng/checks/is-node.js":[function(require,module,exports) {
var process = require("process");
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isNode = void 0;

const isNode = () => {
  if (typeof process === "object") {
    if (typeof process.versions === "object") {
      if (typeof process.versions.node !== "undefined") {
        return true;
      }
    }
  }

  return false;
};

exports.isNode = isNode;
},{"process":"node_modules/parcel-bundler/src/builtins/_empty.js"}],"node_modules/@thi.ng/checks/is-not-string-iterable.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isNotStringAndIterable = void 0;

const isNotStringAndIterable = x => x != null && typeof x !== "string" && typeof x[Symbol.iterator] === "function";

exports.isNotStringAndIterable = isNotStringAndIterable;
},{}],"node_modules/@thi.ng/checks/is-null.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isNull = void 0;

const isNull = x => x === null;

exports.isNull = isNull;
},{}],"node_modules/@thi.ng/checks/is-number.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isNumber = void 0;

const isNumber = x => typeof x === "number";

exports.isNumber = isNumber;
},{}],"node_modules/@thi.ng/checks/is-object.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isObject = void 0;

const isObject = x => x !== null && typeof x === "object";

exports.isObject = isObject;
},{}],"node_modules/@thi.ng/checks/is-odd.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isOdd = void 0;

const isOdd = x => x % 2 !== 0;

exports.isOdd = isOdd;
},{}],"node_modules/@thi.ng/checks/is-plain-object.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isPlainObject = void 0;
const OBJP = Object.getPrototypeOf;
/**
 * Similar to `isObject()`, but also checks if prototype is that of
 * `Object` (or `null`).
 *
 * @param x
 */

const isPlainObject = x => {
  let p;
  return x != null && typeof x === "object" && ((p = OBJP(x)) === null || OBJP(p) === null);
};

exports.isPlainObject = isPlainObject;
},{}],"node_modules/@thi.ng/checks/is-positive.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isPosititve = void 0;

const isPosititve = x => typeof x === "number" && x > 0;

exports.isPosititve = isPosititve;
},{}],"node_modules/@thi.ng/checks/is-primitive.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isPrimitive = void 0;

const isPrimitive = x => {
  const t = typeof x;
  return t === "string" || t === "number";
};

exports.isPrimitive = isPrimitive;
},{}],"node_modules/@thi.ng/checks/is-promise.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isPromise = void 0;

const isPromise = x => x instanceof Promise;

exports.isPromise = isPromise;
},{}],"node_modules/@thi.ng/checks/is-promiselike.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isPromiseLike = void 0;

var _implementsFunction = require("./implements-function");

const isPromiseLike = x => x instanceof Promise || (0, _implementsFunction.implementsFunction)(x, "then") && (0, _implementsFunction.implementsFunction)(x, "catch");

exports.isPromiseLike = isPromiseLike;
},{"./implements-function":"node_modules/@thi.ng/checks/implements-function.js"}],"node_modules/@thi.ng/checks/is-regexp.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isRegExp = void 0;

const isRegExp = x => x instanceof RegExp;

exports.isRegExp = isRegExp;
},{}],"node_modules/@thi.ng/checks/is-safari.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isSafari = void 0;

var _isChrome = require("./is-chrome");

const isSafari = () => typeof navigator !== "undefined" && /Safari/.test(navigator.userAgent) && !(0, _isChrome.isChrome)();

exports.isSafari = isSafari;
},{"./is-chrome":"node_modules/@thi.ng/checks/is-chrome.js"}],"node_modules/@thi.ng/checks/is-set.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isSet = void 0;

const isSet = x => x instanceof Set;

exports.isSet = isSet;
},{}],"node_modules/@thi.ng/checks/is-string.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isString = void 0;

const isString = x => typeof x === "string";

exports.isString = isString;
},{}],"node_modules/@thi.ng/checks/is-symbol.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isSymbol = void 0;

const isSymbol = x => typeof x === "symbol";

exports.isSymbol = isSymbol;
},{}],"node_modules/@thi.ng/checks/is-transferable.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isTransferable = void 0;

const isTransferable = x => x instanceof ArrayBuffer || typeof SharedArrayBuffer !== "undefined" && x instanceof SharedArrayBuffer || typeof MessagePort !== "undefined" && x instanceof MessagePort;

exports.isTransferable = isTransferable;
},{}],"node_modules/@thi.ng/checks/is-true.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isTrue = void 0;

const isTrue = x => x === true;

exports.isTrue = isTrue;
},{}],"node_modules/@thi.ng/checks/is-typedarray.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isTypedArray = void 0;

const isTypedArray = x => x && (x.constructor === Float32Array || x.constructor === Uint32Array || x.constructor === Uint8Array || x.constructor === Uint8ClampedArray || x.constructor === Int8Array || x.constructor === Uint16Array || x.constructor === Int16Array || x.constructor === Int32Array || x.constructor === Float64Array);

exports.isTypedArray = isTypedArray;
},{}],"node_modules/@thi.ng/checks/is-uint32.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isUint32 = void 0;

const isUint32 = x => typeof x === "number" && x >>> 0 === x;

exports.isUint32 = isUint32;
},{}],"node_modules/@thi.ng/checks/is-undefined.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isUndefined = void 0;

const isUndefined = x => x === undefined;

exports.isUndefined = isUndefined;
},{}],"node_modules/@thi.ng/checks/is-uuid.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isUUID = void 0;
const RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const isUUID = x => RE.test(x);

exports.isUUID = isUUID;
},{}],"node_modules/@thi.ng/checks/is-uuid4.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isUUIDv4 = void 0;
const RE = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const isUUIDv4 = x => RE.test(x);

exports.isUUIDv4 = isUUIDv4;
},{}],"node_modules/@thi.ng/checks/is-zero.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isZero = void 0;

const isZero = x => x === 0;

exports.isZero = isZero;
},{}],"node_modules/@thi.ng/checks/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _existsNotNull = require("./exists-not-null");

Object.keys(_existsNotNull).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _existsNotNull[key];
    }
  });
});

var _exists = require("./exists");

Object.keys(_exists).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _exists[key];
    }
  });
});

var _hasCrypto = require("./has-crypto");

Object.keys(_hasCrypto).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _hasCrypto[key];
    }
  });
});

var _hasMaxLength = require("./has-max-length");

Object.keys(_hasMaxLength).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _hasMaxLength[key];
    }
  });
});

var _hasMinLength = require("./has-min-length");

Object.keys(_hasMinLength).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _hasMinLength[key];
    }
  });
});

var _hasPerformance = require("./has-performance");

Object.keys(_hasPerformance).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _hasPerformance[key];
    }
  });
});

var _hasWasm = require("./has-wasm");

Object.keys(_hasWasm).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _hasWasm[key];
    }
  });
});

var _hasWebgl = require("./has-webgl");

Object.keys(_hasWebgl).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _hasWebgl[key];
    }
  });
});

var _hasWebsocket = require("./has-websocket");

Object.keys(_hasWebsocket).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _hasWebsocket[key];
    }
  });
});

var _implementsFunction = require("./implements-function");

Object.keys(_implementsFunction).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _implementsFunction[key];
    }
  });
});

var _isArray = require("./is-array");

Object.keys(_isArray).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isArray[key];
    }
  });
});

var _isArraylike = require("./is-arraylike");

Object.keys(_isArraylike).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isArraylike[key];
    }
  });
});

var _isBlob = require("./is-blob");

Object.keys(_isBlob).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isBlob[key];
    }
  });
});

var _isBoolean = require("./is-boolean");

Object.keys(_isBoolean).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isBoolean[key];
    }
  });
});

var _isChrome = require("./is-chrome");

Object.keys(_isChrome).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isChrome[key];
    }
  });
});

var _isDate = require("./is-date");

Object.keys(_isDate).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isDate[key];
    }
  });
});

var _isEven = require("./is-even");

Object.keys(_isEven).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isEven[key];
    }
  });
});

var _isFalse = require("./is-false");

Object.keys(_isFalse).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isFalse[key];
    }
  });
});

var _isFile = require("./is-file");

Object.keys(_isFile).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isFile[key];
    }
  });
});

var _isFirefox = require("./is-firefox");

Object.keys(_isFirefox).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isFirefox[key];
    }
  });
});

var _isFunction = require("./is-function");

Object.keys(_isFunction).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isFunction[key];
    }
  });
});

var _isIe = require("./is-ie");

Object.keys(_isIe).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isIe[key];
    }
  });
});

var _isInRange = require("./is-in-range");

Object.keys(_isInRange).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isInRange[key];
    }
  });
});

var _isInt = require("./is-int32");

Object.keys(_isInt).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isInt[key];
    }
  });
});

var _isIterable = require("./is-iterable");

Object.keys(_isIterable).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isIterable[key];
    }
  });
});

var _isMap = require("./is-map");

Object.keys(_isMap).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isMap[key];
    }
  });
});

var _isMobile = require("./is-mobile");

Object.keys(_isMobile).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isMobile[key];
    }
  });
});

var _isNan = require("./is-nan");

Object.keys(_isNan).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isNan[key];
    }
  });
});

var _isNegative = require("./is-negative");

Object.keys(_isNegative).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isNegative[key];
    }
  });
});

var _isNode = require("./is-node");

Object.keys(_isNode).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isNode[key];
    }
  });
});

var _isNotStringIterable = require("./is-not-string-iterable");

Object.keys(_isNotStringIterable).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isNotStringIterable[key];
    }
  });
});

var _isNull = require("./is-null");

Object.keys(_isNull).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isNull[key];
    }
  });
});

var _isNumber = require("./is-number");

Object.keys(_isNumber).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isNumber[key];
    }
  });
});

var _isObject = require("./is-object");

Object.keys(_isObject).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isObject[key];
    }
  });
});

var _isOdd = require("./is-odd");

Object.keys(_isOdd).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isOdd[key];
    }
  });
});

var _isPlainObject = require("./is-plain-object");

Object.keys(_isPlainObject).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isPlainObject[key];
    }
  });
});

var _isPositive = require("./is-positive");

Object.keys(_isPositive).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isPositive[key];
    }
  });
});

var _isPrimitive = require("./is-primitive");

Object.keys(_isPrimitive).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isPrimitive[key];
    }
  });
});

var _isPromise = require("./is-promise");

Object.keys(_isPromise).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isPromise[key];
    }
  });
});

var _isPromiselike = require("./is-promiselike");

Object.keys(_isPromiselike).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isPromiselike[key];
    }
  });
});

var _isRegexp = require("./is-regexp");

Object.keys(_isRegexp).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isRegexp[key];
    }
  });
});

var _isSafari = require("./is-safari");

Object.keys(_isSafari).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isSafari[key];
    }
  });
});

var _isSet = require("./is-set");

Object.keys(_isSet).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isSet[key];
    }
  });
});

var _isString = require("./is-string");

Object.keys(_isString).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isString[key];
    }
  });
});

var _isSymbol = require("./is-symbol");

Object.keys(_isSymbol).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isSymbol[key];
    }
  });
});

var _isTransferable = require("./is-transferable");

Object.keys(_isTransferable).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isTransferable[key];
    }
  });
});

var _isTrue = require("./is-true");

Object.keys(_isTrue).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isTrue[key];
    }
  });
});

var _isTypedarray = require("./is-typedarray");

Object.keys(_isTypedarray).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isTypedarray[key];
    }
  });
});

var _isUint = require("./is-uint32");

Object.keys(_isUint).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isUint[key];
    }
  });
});

var _isUndefined = require("./is-undefined");

Object.keys(_isUndefined).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isUndefined[key];
    }
  });
});

var _isUuid = require("./is-uuid");

Object.keys(_isUuid).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isUuid[key];
    }
  });
});

var _isUuid2 = require("./is-uuid4");

Object.keys(_isUuid2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isUuid2[key];
    }
  });
});

var _isZero = require("./is-zero");

Object.keys(_isZero).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isZero[key];
    }
  });
});
},{"./exists-not-null":"node_modules/@thi.ng/checks/exists-not-null.js","./exists":"node_modules/@thi.ng/checks/exists.js","./has-crypto":"node_modules/@thi.ng/checks/has-crypto.js","./has-max-length":"node_modules/@thi.ng/checks/has-max-length.js","./has-min-length":"node_modules/@thi.ng/checks/has-min-length.js","./has-performance":"node_modules/@thi.ng/checks/has-performance.js","./has-wasm":"node_modules/@thi.ng/checks/has-wasm.js","./has-webgl":"node_modules/@thi.ng/checks/has-webgl.js","./has-websocket":"node_modules/@thi.ng/checks/has-websocket.js","./implements-function":"node_modules/@thi.ng/checks/implements-function.js","./is-array":"node_modules/@thi.ng/checks/is-array.js","./is-arraylike":"node_modules/@thi.ng/checks/is-arraylike.js","./is-blob":"node_modules/@thi.ng/checks/is-blob.js","./is-boolean":"node_modules/@thi.ng/checks/is-boolean.js","./is-chrome":"node_modules/@thi.ng/checks/is-chrome.js","./is-date":"node_modules/@thi.ng/checks/is-date.js","./is-even":"node_modules/@thi.ng/checks/is-even.js","./is-false":"node_modules/@thi.ng/checks/is-false.js","./is-file":"node_modules/@thi.ng/checks/is-file.js","./is-firefox":"node_modules/@thi.ng/checks/is-firefox.js","./is-function":"node_modules/@thi.ng/checks/is-function.js","./is-ie":"node_modules/@thi.ng/checks/is-ie.js","./is-in-range":"node_modules/@thi.ng/checks/is-in-range.js","./is-int32":"node_modules/@thi.ng/checks/is-int32.js","./is-iterable":"node_modules/@thi.ng/checks/is-iterable.js","./is-map":"node_modules/@thi.ng/checks/is-map.js","./is-mobile":"node_modules/@thi.ng/checks/is-mobile.js","./is-nan":"node_modules/@thi.ng/checks/is-nan.js","./is-negative":"node_modules/@thi.ng/checks/is-negative.js","./is-node":"node_modules/@thi.ng/checks/is-node.js","./is-not-string-iterable":"node_modules/@thi.ng/checks/is-not-string-iterable.js","./is-null":"node_modules/@thi.ng/checks/is-null.js","./is-number":"node_modules/@thi.ng/checks/is-number.js","./is-object":"node_modules/@thi.ng/checks/is-object.js","./is-odd":"node_modules/@thi.ng/checks/is-odd.js","./is-plain-object":"node_modules/@thi.ng/checks/is-plain-object.js","./is-positive":"node_modules/@thi.ng/checks/is-positive.js","./is-primitive":"node_modules/@thi.ng/checks/is-primitive.js","./is-promise":"node_modules/@thi.ng/checks/is-promise.js","./is-promiselike":"node_modules/@thi.ng/checks/is-promiselike.js","./is-regexp":"node_modules/@thi.ng/checks/is-regexp.js","./is-safari":"node_modules/@thi.ng/checks/is-safari.js","./is-set":"node_modules/@thi.ng/checks/is-set.js","./is-string":"node_modules/@thi.ng/checks/is-string.js","./is-symbol":"node_modules/@thi.ng/checks/is-symbol.js","./is-transferable":"node_modules/@thi.ng/checks/is-transferable.js","./is-true":"node_modules/@thi.ng/checks/is-true.js","./is-typedarray":"node_modules/@thi.ng/checks/is-typedarray.js","./is-uint32":"node_modules/@thi.ng/checks/is-uint32.js","./is-undefined":"node_modules/@thi.ng/checks/is-undefined.js","./is-uuid":"node_modules/@thi.ng/checks/is-uuid.js","./is-uuid4":"node_modules/@thi.ng/checks/is-uuid4.js","./is-zero":"node_modules/@thi.ng/checks/is-zero.js"}],"node_modules/@thi.ng/transducers/reduced.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unreduced = exports.ensureReduced = exports.isReduced = exports.reduced = exports.Reduced = void 0;

class Reduced {
  constructor(val) {
    this.value = val;
  }

  deref() {
    return this.value;
  }

}

exports.Reduced = Reduced;

const reduced = x => new Reduced(x);

exports.reduced = reduced;

const isReduced = x => x instanceof Reduced;

exports.isReduced = isReduced;

const ensureReduced = x => x instanceof Reduced ? x : new Reduced(x);

exports.ensureReduced = ensureReduced;

const unreduced = x => x instanceof Reduced ? x.deref() : x;

exports.unreduced = unreduced;
},{}],"node_modules/@thi.ng/transducers/reduce.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reduce = reduce;
exports.$$reduce = exports.reducer = void 0;

var _checks = require("@thi.ng/checks");

var _errors = require("@thi.ng/errors");

var _reduced = require("./reduced");

function reduce(...args) {
  let acc, xs;

  switch (args.length) {
    case 3:
      xs = args[2];
      acc = args[1];
      break;

    case 2:
      xs = args[1];
      break;

    default:
      (0, _errors.illegalArity)(args.length);
  }

  const rfn = args[0];
  const init = rfn[0];
  const complete = rfn[1];
  const reduce = rfn[2];
  acc = acc == null ? init() : acc;

  if ((0, _checks.implementsFunction)(xs, "$reduce")) {
    acc = xs.$reduce(reduce, acc);
  } else if ((0, _checks.isArrayLike)(xs)) {
    for (let i = 0, n = xs.length; i < n; i++) {
      acc = reduce(acc, xs[i]);

      if ((0, _reduced.isReduced)(acc)) {
        acc = acc.deref();
        break;
      }
    }
  } else {
    for (let x of xs) {
      acc = reduce(acc, x);

      if ((0, _reduced.isReduced)(acc)) {
        acc = acc.deref();
        break;
      }
    }
  }

  return (0, _reduced.unreduced)(complete(acc));
}
/**
 * Convenience helper for building a full `Reducer` using the identity
 * function (i.e. `(x) => x`) as completion step (true for 90% of all
 * bundled transducers).
 *
 * @param init init step of reducer
 * @param rfn reduction step of reducer
 */


const reducer = (init, rfn) => [init, acc => acc, rfn];

exports.reducer = reducer;

const $$reduce = (rfn, args) => {
  const n = args.length - 1;
  return (0, _checks.isIterable)(args[n]) ? args.length > 1 ? reduce(rfn.apply(null, args.slice(0, n)), args[n]) : reduce(rfn(), args[0]) : undefined;
};

exports.$$reduce = $$reduce;
},{"@thi.ng/checks":"node_modules/@thi.ng/checks/index.js","@thi.ng/errors":"node_modules/@thi.ng/errors/index.js","./reduced":"node_modules/@thi.ng/transducers/reduced.js"}],"node_modules/@thi.ng/transducers/rfn/push.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.push = push;

var _reduce = require("../reduce");

function push(xs) {
  return xs ? [...xs] : (0, _reduce.reducer)(() => [], (acc, x) => (acc.push(x), acc));
}
},{"../reduce":"node_modules/@thi.ng/transducers/reduce.js"}],"node_modules/@thi.ng/transducers/iterator.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.iterator = iterator;
exports.iterator1 = iterator1;
exports.$iter = void 0;

var _api = require("@thi.ng/api");

var _checks = require("@thi.ng/checks");

var _reduced = require("./reduced");

var _push = require("./rfn/push");

/**
 * Takes a transducer and input iterable. Returns iterator of
 * transformed results.
 *
 * @param xform
 * @param xs
 */
function* iterator(xform, xs) {
  const rfn = xform((0, _push.push)());
  const complete = rfn[1];
  const reduce = rfn[2];

  for (let x of xs) {
    const y = reduce([], x);

    if ((0, _reduced.isReduced)(y)) {
      yield* (0, _reduced.unreduced)(complete(y.deref()));
      return;
    }

    if (y.length) {
      yield* y;
    }
  }

  yield* (0, _reduced.unreduced)(complete([]));
}
/**
 * Optimized version of `iterator()` for transducers which are
 * guaranteed to:
 *
 * 1) Only produce none or a single result per input
 * 2) Do not require a `completion` reduction step
 *
 * @param xform
 * @param xs
 */


function* iterator1(xform, xs) {
  const reduce = xform([null, null, (_, x) => x])[2];

  for (let x of xs) {
    let y = reduce(_api.SEMAPHORE, x);

    if ((0, _reduced.isReduced)(y)) {
      y = (0, _reduced.unreduced)(y.deref());

      if (y !== _api.SEMAPHORE) {
        yield y;
      }

      return;
    }

    if (y !== _api.SEMAPHORE) {
      yield y;
    }
  }
}
/**
 * Helper function used by various transducers to wrap themselves as
 * transforming iterators. Delegates to `iterator1()` by default.
 *
 * @param xform
 * @param args
 * @param impl
 */


const $iter = (xform, args, impl = iterator1) => {
  const n = args.length - 1;
  return (0, _checks.isIterable)(args[n]) ? args.length > 1 ? impl(xform.apply(null, args.slice(0, n)), args[n]) : impl(xform(), args[0]) : undefined;
};

exports.$iter = $iter;
},{"@thi.ng/api":"node_modules/@thi.ng/api/index.js","@thi.ng/checks":"node_modules/@thi.ng/checks/index.js","./reduced":"node_modules/@thi.ng/transducers/reduced.js","./rfn/push":"node_modules/@thi.ng/transducers/rfn/push.js"}],"node_modules/@thi.ng/transducers/func/compr.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compR = void 0;

/**
 * Reducer composition helper. Takes existing reducer `rfn` (a 3-tuple)
 * and a reducing function `fn`. Returns a new reducer tuple of this
 * form:
 *
 * ```
 * [rfn[0], rfn[1], fn]
 * ```
 *
 * `rfn[2]` reduces values of type `B` into an accumulator of type `A`.
 * `fn` accepts values of type `C` and produces interim results of type
 * `B`, which are then (possibly) passed to the "inner" `rfn[2]`
 * function. Therefore the resulting reducer takes inputs of `C` and an
 * accumulator of type `A`.
 *
 * It is assumed that `fn` internally calls `rfn[2]` to pass its own
 * results for further processing by the nested reducer `rfn`.
 *
 * @param rfn
 * @param fn
 */
const compR = (rfn, fn) => [rfn[0], rfn[1], fn];

exports.compR = compR;
},{}],"node_modules/@thi.ng/transducers/xform/map.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.map = map;

var _compr = require("../func/compr");

var _iterator = require("../iterator");

function map(fn, src) {
  return src ? (0, _iterator.iterator1)(map(fn), src) : rfn => {
    const r = rfn[2];
    return (0, _compr.compR)(rfn, (acc, x) => r(acc, fn(x)));
  };
}
},{"../func/compr":"node_modules/@thi.ng/transducers/func/compr.js","../iterator":"node_modules/@thi.ng/transducers/iterator.js"}],"node_modules/@thi.ng/transducers/transduce.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transduce = transduce;

var _errors = require("@thi.ng/errors");

var _reduce = require("./reduce");

var _map = require("./xform/map");

function transduce(...args) {
  let acc, xs;

  switch (args.length) {
    case 4:
      xs = args[3];
      acc = args[2];
      break;

    case 3:
      xs = args[2];
      break;

    case 2:
      return (0, _map.map)(x => transduce(args[0], args[1], x));

    default:
      (0, _errors.illegalArity)(args.length);
  }

  return (0, _reduce.reduce)(args[0](args[1]), acc, xs);
}
},{"@thi.ng/errors":"node_modules/@thi.ng/errors/index.js","./reduce":"node_modules/@thi.ng/transducers/reduce.js","./xform/map":"node_modules/@thi.ng/transducers/xform/map.js"}],"node_modules/@thi.ng/transducers/run.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.run = run;

var _api = require("@thi.ng/api");

var _transduce = require("./transduce");

const NO_OP_REDUCER = [_api.NO_OP, _api.NO_OP, _api.NO_OP];

function run(tx, ...args) {
  if (args.length === 1) {
    (0, _transduce.transduce)(tx, NO_OP_REDUCER, args[0]);
  } else {
    const fx = args[0];
    (0, _transduce.transduce)(tx, [_api.NO_OP, _api.NO_OP, (_, x) => fx(x)], args[1]);
  }
}
},{"@thi.ng/api":"node_modules/@thi.ng/api/index.js","./transduce":"node_modules/@thi.ng/transducers/transduce.js"}],"node_modules/@thi.ng/transducers/step.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.step = void 0;

var _reduced = require("./reduced");

var _push = require("./rfn/push");

/**
 * Single-step transducer execution wrapper.
 * Returns array if transducer produces multiple results
 * and undefined if there was no output. Else returns single
 * result value.
 *
 * Likewise, once a transducer has produced a final / reduced
 * value, all further invocations of the stepper function will
 * return undefined.
 *
 * ```
 * // single result
 * step(map(x => x * 10))(1);
 * // 10
 *
 * // multiple results
 * step(mapcat(x => [x, x + 1, x + 2]))(1)
 * // [ 1, 2, 3 ]
 *
 * // no result
 * f = step(filter((x) => !(x & 1)))
 * f(1); // undefined
 * f(2); // 2
 *
 * // reduced value termination
 * f = step(take(2));
 * f(1); // 1
 * f(1); // 1
 * f(1); // undefined
 * f(1); // undefined
 * ```
 *
 * @param tx
 */
const step = tx => {
  const [_, complete, reduce] = tx((0, _push.push)());
  _;
  let done = false;
  return x => {
    if (!done) {
      let acc = reduce([], x);
      done = (0, _reduced.isReduced)(acc);

      if (done) {
        acc = complete(acc.deref());
      }

      return acc.length === 1 ? acc[0] : acc.length > 0 ? acc : undefined;
    }
  };
};

exports.step = step;
},{"./reduced":"node_modules/@thi.ng/transducers/reduced.js","./rfn/push":"node_modules/@thi.ng/transducers/rfn/push.js"}],"node_modules/@thi.ng/transducers/rfn/add.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.add = add;

var _reduce = require("../reduce");

function add(...args) {
  const res = (0, _reduce.$$reduce)(add, args);

  if (res !== undefined) {
    return res;
  }

  const init = args[0] || 0;
  return (0, _reduce.reducer)(() => init, (acc, x) => acc + x);
}
},{"../reduce":"node_modules/@thi.ng/transducers/reduce.js"}],"node_modules/@thi.ng/transducers/rfn/assoc-map.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.assocMap = assocMap;

var _reduce = require("../reduce");

function assocMap(xs) {
  return xs ? (0, _reduce.reduce)(assocMap(), xs) : (0, _reduce.reducer)(() => new Map(), (acc, [k, v]) => acc.set(k, v));
}
},{"../reduce":"node_modules/@thi.ng/transducers/reduce.js"}],"node_modules/@thi.ng/transducers/rfn/assoc-obj.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.assocObj = assocObj;

var _reduce = require("../reduce");

function assocObj(xs) {
  return xs ? (0, _reduce.reduce)(assocObj(), xs) : (0, _reduce.reducer)(() => new Object(), (acc, [k, v]) => (acc[k] = v, acc));
}
},{"../reduce":"node_modules/@thi.ng/transducers/reduce.js"}],"node_modules/@thi.ng/transducers/rfn/conj.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.conj = conj;

var _reduce = require("../reduce");

function conj(xs) {
  return xs ? (0, _reduce.reduce)(conj(), xs) : (0, _reduce.reducer)(() => new Set(), (acc, x) => acc.add(x));
}
},{"../reduce":"node_modules/@thi.ng/transducers/reduce.js"}],"node_modules/@thi.ng/transducers/rfn/count.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.count = count;

var _reduce = require("../reduce");

function count(...args) {
  const res = (0, _reduce.$$reduce)(count, args);

  if (res !== undefined) {
    return res;
  }

  let offset = args[0] || 0;
  let step = args[1] || 1;
  return (0, _reduce.reducer)(() => offset, (acc, _) => acc + step);
}
},{"../reduce":"node_modules/@thi.ng/transducers/reduce.js"}],"node_modules/@thi.ng/transducers/rfn/div.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.div = div;

var _reduce = require("../reduce");

function div(init, xs) {
  return xs ? (0, _reduce.reduce)(div(init), xs) : (0, _reduce.reducer)(() => init, (acc, x) => acc / x);
}
},{"../reduce":"node_modules/@thi.ng/transducers/reduce.js"}],"node_modules/@thi.ng/transducers/rfn/every.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.every = every;

var _reduce = require("../reduce");

var _reduced = require("../reduced");

function every(...args) {
  const res = (0, _reduce.$$reduce)(every, args);

  if (res !== undefined) {
    return res;
  }

  const pred = args[0];
  return (0, _reduce.reducer)(() => true, pred ? (acc, x) => pred(x) ? acc : (0, _reduced.reduced)(false) : (acc, x) => x ? acc : (0, _reduced.reduced)(false));
}
},{"../reduce":"node_modules/@thi.ng/transducers/reduce.js","../reduced":"node_modules/@thi.ng/transducers/reduced.js"}],"node_modules/@thi.ng/transducers/rfn/fill.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fill = fill;
exports.fillN = fillN;

var _reduce = require("../reduce");

function fill(...args) {
  const res = (0, _reduce.$$reduce)(fill, args);

  if (res !== undefined) {
    return res;
  }

  let start = args[0] || 0;
  return (0, _reduce.reducer)(() => [], (acc, x) => (acc[start++] = x, acc));
}

function fillN(...args) {
  return fill(...args);
}
},{"../reduce":"node_modules/@thi.ng/transducers/reduce.js"}],"node_modules/@thi.ng/compose/comp.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.comp = comp;
exports.compL = compL;
exports.compI = void 0;

var _errors = require("@thi.ng/errors");

function comp(...fns) {
  let [a, b, c, d, e, f, g, h, i, j] = fns;

  switch (fns.length) {
    case 0:
      (0, _errors.illegalArity)(0);

    case 1:
      return a;

    case 2:
      return (...xs) => a(b(...xs));

    case 3:
      return (...xs) => a(b(c(...xs)));

    case 4:
      return (...xs) => a(b(c(d(...xs))));

    case 5:
      return (...xs) => a(b(c(d(e(...xs)))));

    case 6:
      return (...xs) => a(b(c(d(e(f(...xs))))));

    case 7:
      return (...xs) => a(b(c(d(e(f(g(...xs)))))));

    case 8:
      return (...xs) => a(b(c(d(e(f(g(h(...xs))))))));

    case 9:
      return (...xs) => a(b(c(d(e(f(g(h(i(...xs)))))))));

    case 10:
    default:
      const fn = (...xs) => a(b(c(d(e(f(g(h(i(j(...xs))))))))));

      return fns.length === 10 ? fn : comp(fn, ...fns.slice(10));
  }
}

function compL(...fns) {
  return comp.apply(null, fns.reverse());
}
/**
 * @deprecated renamed to `compL`
 */


const compI = compL;
exports.compI = compI;
},{"@thi.ng/errors":"node_modules/@thi.ng/errors/index.js"}],"node_modules/@thi.ng/compose/complement.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.complement = complement;

function complement(f) {
  return (...xs) => !f(...xs);
}
},{}],"node_modules/@thi.ng/compose/constantly.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.constantly = void 0;

const constantly = x => () => x;

exports.constantly = constantly;
},{}],"node_modules/@thi.ng/compose/delay.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Delay = exports.delay = void 0;

const delay = body => new Delay(body);

exports.delay = delay;

class Delay {
  constructor(body) {
    this.body = body;
    this.realized = false;
  }

  deref() {
    if (!this.realized) {
      this.value = this.body();
      this.realized = true;
    }

    return this.value;
  }

  isRealized() {
    return this.realized;
  }

}

exports.Delay = Delay;
},{}],"node_modules/@thi.ng/compose/delayed.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.delayed = void 0;

const delayed = (x, t) => new Promise(resolve => setTimeout(() => resolve(x), t));

exports.delayed = delayed;
},{}],"node_modules/@thi.ng/compose/identity.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.identity = void 0;

const identity = x => x;

exports.identity = identity;
},{}],"node_modules/@thi.ng/compose/juxt.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.juxt = juxt;

function juxt(...fns) {
  const [a, b, c, d, e, f, g, h] = fns;

  switch (fns.length) {
    case 1:
      return x => [a(x)];

    case 2:
      return x => [a(x), b(x)];

    case 3:
      return x => [a(x), b(x), c(x)];

    case 4:
      return x => [a(x), b(x), c(x), d(x)];

    case 5:
      return x => [a(x), b(x), c(x), d(x), e(x)];

    case 6:
      return x => [a(x), b(x), c(x), d(x), e(x), f(x)];

    case 7:
      return x => [a(x), b(x), c(x), d(x), e(x), f(x), g(x)];

    case 8:
      return x => [a(x), b(x), c(x), d(x), e(x), f(x), g(x), h(x)];

    default:
      return x => {
        let res = new Array(fns.length);

        for (let i = fns.length; --i >= 0;) {
          res[i] = fns[i](x);
        }

        return res;
      };
  }
}
},{}],"node_modules/@thi.ng/compose/partial.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.partial = partial;
exports.foo = void 0;

var _errors = require("@thi.ng/errors");

function partial(fn, ...args) {
  let [a, b, c, d, e, f, g, h] = args;

  switch (args.length) {
    case 1:
      return (...xs) => fn(a, ...xs);

    case 2:
      return (...xs) => fn(a, b, ...xs);

    case 3:
      return (...xs) => fn(a, b, c, ...xs);

    case 4:
      return (...xs) => fn(a, b, c, d, ...xs);

    case 5:
      return (...xs) => fn(a, b, c, d, e, ...xs);

    case 6:
      return (...xs) => fn(a, b, c, d, e, f, ...xs);

    case 7:
      return (...xs) => fn(a, b, c, d, e, f, g, ...xs);

    case 8:
      return (...xs) => fn(a, b, c, d, e, f, g, h, ...xs);

    default:
      (0, _errors.illegalArgs)();
  }
}

const foo = partial((a, b) => a + b, "a");
exports.foo = foo;
},{"@thi.ng/errors":"node_modules/@thi.ng/errors/index.js"}],"node_modules/@thi.ng/compose/thread-first.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.threadFirst = void 0;

/**
 * Takes an `init` value and a number of functions and/or function
 * tuples, consisting of: `[fn, ...args]`. Executes each function
 * (or tuple) with the return value of the previous expression inserted
 * as first argument, using `init` for the first expression.
 *
 * ```
 * const neg = (x) => -x;
 * const sub = (a, b) => a - b;
 * const div = (a, b) => a / b;
 *
 * threadFirst(
 *   5,
 *   neg,       // -5
 *   [sub, 20], // -5 - 20 = -25
 *   [div, 10]  // -25 / 10 = -2.5
 * );
 *
 * // -2.5
 * ```
 *
 * @see threadLast
 *
 * @param init
 * @param fns
 */
const threadFirst = (init, ...fns) => fns.reduce((acc, expr) => typeof expr === "function" ? expr(acc) : expr[0](acc, ...expr.slice(1)), init);

exports.threadFirst = threadFirst;
},{}],"node_modules/@thi.ng/compose/thread-last.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.threadLast = void 0;

/**
 * Takes an `init` value and a number of functions and/or function
 * tuples, consisting of: `[fn, ...args]`. Executes each function
 * (or tuple) with the return value of the previous expression inserted
 * as last argument, using `init` for the first expression.
 *
 * ```
 * const neg = (x) => -x;
 * const sub = (a, b) => a - b;
 * const div = (a, b) => a / b;
 *
 * threadLast(
 *   5,
 *   neg,       // -5
 *   [sub, 10], // 20 - (-5) = 25
 *   [div, 10]  // 10 / 25 = 0.4
 * );
 *
 * // 0.4
 * ```
 *
 * @see threadFirst
 *
 * @param init
 * @param fns
 */
const threadLast = (init, ...fns) => fns.reduce((acc, expr) => typeof expr === "function" ? expr(acc) : expr[0](...expr.slice(1), acc), init);

exports.threadLast = threadLast;
},{}],"node_modules/@thi.ng/compose/trampoline.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.trampoline = void 0;

/**
 * Takes a function returning either a no-arg function (thunk) or its
 * already realized (non-function) result. Re-executes thunk for as long
 * as it returns another function/thunk. Once a non-function result has
 * been produced, `trampoline` returns that value itself. If the final
 * result should be function, it needs to wrapped (e.g. as a 1-elem
 * array).
 *
 * This function should be used for non-stack consuming recursion. I.e.
 * a trampoline is a form of continuation passing style and only ever
 * consumes max. 2 extra stack frames, independent from recursion depth.
 *
 * ```
 * const countdown = (acc, x) =>
 *   x >= 0 ?
 *     () => (acc.push(x), countdown(acc, x-1)) :
 *     acc;
 *
 * trampoline(countdown([], 4))
 * // [ 4, 3, 2, 1, 0 ]
 *
 * trampoline(countdown([], -1))
 * // []
 * ```
 *
 * @param f
 */
const trampoline = f => {
  while (typeof f === "function") {
    f = f();
  }

  return f;
};

exports.trampoline = trampoline;
},{}],"node_modules/@thi.ng/compose/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _comp = require("./comp");

Object.keys(_comp).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _comp[key];
    }
  });
});

var _complement = require("./complement");

Object.keys(_complement).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _complement[key];
    }
  });
});

var _constantly = require("./constantly");

Object.keys(_constantly).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _constantly[key];
    }
  });
});

var _delay = require("./delay");

Object.keys(_delay).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _delay[key];
    }
  });
});

var _delayed = require("./delayed");

Object.keys(_delayed).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _delayed[key];
    }
  });
});

var _identity = require("./identity");

Object.keys(_identity).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _identity[key];
    }
  });
});

var _juxt = require("./juxt");

Object.keys(_juxt).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _juxt[key];
    }
  });
});

var _partial = require("./partial");

Object.keys(_partial).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _partial[key];
    }
  });
});

var _threadFirst = require("./thread-first");

Object.keys(_threadFirst).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _threadFirst[key];
    }
  });
});

var _threadLast = require("./thread-last");

Object.keys(_threadLast).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _threadLast[key];
    }
  });
});

var _trampoline = require("./trampoline");

Object.keys(_trampoline).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _trampoline[key];
    }
  });
});
},{"./comp":"node_modules/@thi.ng/compose/comp.js","./complement":"node_modules/@thi.ng/compose/complement.js","./constantly":"node_modules/@thi.ng/compose/constantly.js","./delay":"node_modules/@thi.ng/compose/delay.js","./delayed":"node_modules/@thi.ng/compose/delayed.js","./identity":"node_modules/@thi.ng/compose/identity.js","./juxt":"node_modules/@thi.ng/compose/juxt.js","./partial":"node_modules/@thi.ng/compose/partial.js","./thread-first":"node_modules/@thi.ng/compose/thread-first.js","./thread-last":"node_modules/@thi.ng/compose/thread-last.js","./trampoline":"node_modules/@thi.ng/compose/trampoline.js"}],"node_modules/@thi.ng/transducers/rfn/group-by-map.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.groupByMap = groupByMap;

var _compose = require("@thi.ng/compose");

var _reduce = require("../reduce");

var _push = require("./push");

function groupByMap(...args) {
  const res = (0, _reduce.$$reduce)(groupByMap, args);

  if (res !== undefined) {
    return res;
  }

  const opts = Object.assign({
    key: _compose.identity,
    group: (0, _push.push)()
  }, args[0]);
  const [init, _, reduce] = opts.group;
  _;
  return (0, _reduce.reducer)(() => new Map(), (acc, x) => {
    const k = opts.key(x);
    return acc.set(k, acc.has(k) ? reduce(acc.get(k), x) : reduce(init(), x));
  });
}
},{"@thi.ng/compose":"node_modules/@thi.ng/compose/index.js","../reduce":"node_modules/@thi.ng/transducers/reduce.js","./push":"node_modules/@thi.ng/transducers/rfn/push.js"}],"node_modules/@thi.ng/transducers/rfn/frequencies.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.frequencies = frequencies;

var _compose = require("@thi.ng/compose");

var _reduce = require("../reduce");

var _count = require("./count");

var _groupByMap = require("./group-by-map");

function frequencies(...args) {
  return (0, _reduce.$$reduce)(frequencies, args) || (0, _groupByMap.groupByMap)({
    key: args[0] || _compose.identity,
    group: (0, _count.count)()
  });
}
},{"@thi.ng/compose":"node_modules/@thi.ng/compose/index.js","../reduce":"node_modules/@thi.ng/transducers/reduce.js","./count":"node_modules/@thi.ng/transducers/rfn/count.js","./group-by-map":"node_modules/@thi.ng/transducers/rfn/group-by-map.js"}],"node_modules/@thi.ng/transducers/rfn/group-by-obj.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.groupByObj = groupByObj;

var _compose = require("@thi.ng/compose");

var _reduce2 = require("../reduce");

var _push = require("./push");

function groupByObj(...args) {
  const res = (0, _reduce2.$$reduce)(groupByObj, args);

  if (res) {
    return res;
  }

  const _opts = Object.assign({
    key: _compose.identity,
    group: (0, _push.push)()
  }, args[0]);

  const [_init, _, _reduce] = _opts.group;
  _;
  return (0, _reduce2.reducer)(() => ({}), (acc, x) => {
    const k = _opts.key(x);

    acc[k] = acc[k] ? _reduce(acc[k], x) : _reduce(_init(), x);
    return acc;
  });
}
},{"@thi.ng/compose":"node_modules/@thi.ng/compose/index.js","../reduce":"node_modules/@thi.ng/transducers/reduce.js","./push":"node_modules/@thi.ng/transducers/rfn/push.js"}],"node_modules/@thi.ng/transducers/rfn/group-binary.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.groupBinary = void 0;

var _groupByObj = require("./group-by-obj");

var _push = require("./push");

const branchPred = (key, b, l, r) => x => key(x) & b ? r : l;
/**
 * Creates a bottom-up, unbalanced binary tree of desired depth and
 * choice of data structures. Any value can be indexed, as long as a
 * numeric representation (key) can be obtained. This numeric key is
 * produced by the supplied `key` function. IMPORTANT: the returned
 * values MUST be unsigned and less than the provided bit length (i.e.
 * `0 .. (2^bits) - 1` range).
 *
 * By default the tree is constructed using plain objects for branches,
 * with left branches stored as "l" and right ones as "r". The original
 * values are stored at the lowest tree level using a customizable
 * nested reducer. By default leaves are collected in arrays (using the
 * `push()` reducer), but any suitable reducer can be used (e.g.
 * `conj()` to collect values into sets).
 *
 * Index by lowest 4-bits of ID value:
 *
 * ```
 * tree = reduce(
 *   groupBinary(4, x => x.id & 0xf),
 *   [{id: 3}, {id: 8}, {id: 15}, {id: 0}]
 * )
 *
 * tree.l.l.l.l
 * // [ { id: 0 } ]
 * tree.r.r.r.r
 * // [ { id: 15 } ]
 * tree.l.l.r.r
 * // [ { id: 3 } ]
 * ```
 *
 * Collecting as array:
 *
 * ```
 * tree = reduce(
 *   groupBinary(4, identity, ()=>[], push(), 0, 1),
 *   [1,2,3,4,5,6,7]
 * )
 *
 * tree[0][1][0][1] // 0101 == 5 in binary
 * // [ 5 ]
 *
 * tree[0][1][1]    // 011* == branch
 * // [ [ 6 ], [ 7 ] ]
 * ```
 *
 * Using `frequencies` as leaf reducer:
 *
 * ```
 * tree = reduce(
 *   groupBinary(3, (x: string) => x.length, null, frequencies()),
 *   "aa bbb dddd ccccc bbb eeee fff".split(" ")
 * )
 * // [ [ undefined,
 * //     [ Map { 'aa' => 1 },
 * //       Map { 'bbb' => 2, 'fff' => 1 } ] ],
 * //   [ [ Map { 'dddd' => 1, 'eeee' => 1 },
 * //       Map { 'ccccc' => 1 } ] ] ]
 *
 * tree[0][1][1]
 * // Map { 'bbb' => 2, 'fff' => 1 }
 * ```
 *
 * @param bits index range (always from 0)
 * @param key key function
 * @param branch function to create a new branch container (object or
 * array)
 * @param leaf reducer for leaf collection
 * @param left key for storing left branches (e.g. `0` for arrays)
 * @param right key for storing right branches (e.g. `1` for arrays)
 */


const groupBinary = (bits, key, branch, leaf, left = "l", right = "r") => {
  const init = branch || (() => ({}));

  let rfn = (0, _groupByObj.groupByObj)({
    key: branchPred(key, 1, left, right),
    group: leaf || (0, _push.push)()
  });

  for (let i = 2, maxIndex = 1 << bits; i < maxIndex; i <<= 1) {
    rfn = (0, _groupByObj.groupByObj)({
      key: branchPred(key, i, left, right),
      group: [init, rfn[1], rfn[2]]
    });
  }

  return [init, rfn[1], rfn[2]];
};

exports.groupBinary = groupBinary;
},{"./group-by-obj":"node_modules/@thi.ng/transducers/rfn/group-by-obj.js","./push":"node_modules/@thi.ng/transducers/rfn/push.js"}],"node_modules/@thi.ng/transducers/rfn/last.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.last = last;

var _reduce = require("../reduce");

function last(xs) {
  return xs ? (0, _reduce.reduce)(last(), xs) : (0, _reduce.reducer)(() => undefined, (_, x) => x);
}
},{"../reduce":"node_modules/@thi.ng/transducers/reduce.js"}],"node_modules/@thi.ng/compare/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compare = void 0;

const compare = (a, b) => {
  if (a === b) {
    return 0;
  }

  if (a == null) {
    return b == null ? 0 : -1;
  }

  if (b == null) {
    return a == null ? 0 : 1;
  }

  if (typeof a.compare === "function") {
    return a.compare(b);
  }

  if (typeof b.compare === "function") {
    return -b.compare(a);
  }

  return a < b ? -1 : a > b ? 1 : 0;
};

exports.compare = compare;
},{}],"node_modules/@thi.ng/transducers/rfn/max-compare.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.maxCompare = maxCompare;

var _compare = require("@thi.ng/compare");

var _reduce = require("../reduce");

function maxCompare(...args) {
  const res = (0, _reduce.$$reduce)(maxCompare, args);

  if (res !== undefined) {
    return res;
  }

  const init = args[0];
  const cmp = args[1] || _compare.compare;
  return (0, _reduce.reducer)(init, (acc, x) => cmp(acc, x) >= 0 ? acc : x);
}
},{"@thi.ng/compare":"node_modules/@thi.ng/compare/index.js","../reduce":"node_modules/@thi.ng/transducers/reduce.js"}],"node_modules/@thi.ng/transducers/rfn/max.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.max = max;

var _reduce = require("../reduce");

function max(xs) {
  return xs ? (0, _reduce.reduce)(max(), xs) : (0, _reduce.reducer)(() => -Infinity, (acc, x) => Math.max(acc, x));
}
},{"../reduce":"node_modules/@thi.ng/transducers/reduce.js"}],"node_modules/@thi.ng/transducers/rfn/mean.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mean = mean;

var _reduce = require("../reduce");

function mean(xs) {
  let n = 0;
  return xs ? (0, _reduce.reduce)(mean(), xs) : [() => 0, acc => n > 1 ? acc / n : acc, (acc, x) => (n++, acc + x)];
}
},{"../reduce":"node_modules/@thi.ng/transducers/reduce.js"}],"node_modules/@thi.ng/transducers/rfn/min-compare.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.minCompare = minCompare;

var _compare = require("@thi.ng/compare");

var _reduce = require("../reduce");

function minCompare(...args) {
  const res = (0, _reduce.$$reduce)(minCompare, args);

  if (res !== undefined) {
    return res;
  }

  const init = args[0];
  const cmp = args[1] || _compare.compare;
  return (0, _reduce.reducer)(init, (acc, x) => cmp(acc, x) <= 0 ? acc : x);
}
},{"@thi.ng/compare":"node_modules/@thi.ng/compare/index.js","../reduce":"node_modules/@thi.ng/transducers/reduce.js"}],"node_modules/@thi.ng/transducers/rfn/min.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.min = min;

var _reduce = require("../reduce");

function min(xs) {
  return xs ? (0, _reduce.reduce)(min(), xs) : (0, _reduce.reducer)(() => Infinity, (acc, x) => Math.min(acc, x));
}
},{"../reduce":"node_modules/@thi.ng/transducers/reduce.js"}],"node_modules/@thi.ng/transducers/rfn/mul.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mul = mul;

var _reduce = require("../reduce");

function mul(...args) {
  const res = (0, _reduce.$$reduce)(mul, args);

  if (res !== undefined) {
    return res;
  }

  const init = args[0] || 1;
  return (0, _reduce.reducer)(() => init, (acc, x) => acc * x);
}
},{"../reduce":"node_modules/@thi.ng/transducers/reduce.js"}],"node_modules/@thi.ng/transducers/rfn/push-copy.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pushCopy = void 0;

var _reduce = require("../reduce");

const pushCopy = () => (0, _reduce.reducer)(() => [], (acc, x) => ((acc = acc.slice()).push(x), acc));

exports.pushCopy = pushCopy;
},{"../reduce":"node_modules/@thi.ng/transducers/reduce.js"}],"node_modules/@thi.ng/transducers/rfn/reductions.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reductions = reductions;

var _reduce2 = require("../reduce");

var _reduced = require("../reduced");

function reductions(rfn, xs) {
  const [init, complete, _reduce] = rfn;
  return xs ? (0, _reduce2.reduce)(reductions(rfn), xs) : [() => [init()], acc => (acc[acc.length - 1] = complete(acc[acc.length - 1]), acc), (acc, x) => {
    const res = _reduce(acc[acc.length - 1], x);

    if ((0, _reduced.isReduced)(res)) {
      acc.push(res.deref());
      return (0, _reduced.reduced)(acc);
    }

    acc.push(res);
    return acc;
  }];
}
},{"../reduce":"node_modules/@thi.ng/transducers/reduce.js","../reduced":"node_modules/@thi.ng/transducers/reduced.js"}],"node_modules/@thi.ng/transducers/rfn/some.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.some = some;

var _reduce = require("../reduce");

var _reduced = require("../reduced");

function some(...args) {
  const res = (0, _reduce.$$reduce)(some, args);

  if (res !== undefined) {
    return res;
  }

  const pred = args[0];
  return (0, _reduce.reducer)(() => false, pred ? (acc, x) => pred(x) ? (0, _reduced.reduced)(true) : acc : (acc, x) => x ? (0, _reduced.reduced)(true) : acc);
}
},{"../reduce":"node_modules/@thi.ng/transducers/reduce.js","../reduced":"node_modules/@thi.ng/transducers/reduced.js"}],"node_modules/@thi.ng/transducers/rfn/str.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.str = str;

var _reduce = require("../reduce");

function str(sep, xs) {
  sep = sep || "";
  let first = true;
  return xs ? [...xs].join(sep) : (0, _reduce.reducer)(() => "", (acc, x) => (acc = first ? acc + x : acc + sep + x, first = false, acc));
}
},{"../reduce":"node_modules/@thi.ng/transducers/reduce.js"}],"node_modules/@thi.ng/transducers/rfn/sub.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sub = sub;

var _reduce = require("../reduce");

function sub(...args) {
  const res = (0, _reduce.$$reduce)(sub, args);

  if (res !== undefined) {
    return res;
  }

  const init = args[0] || 0;
  return (0, _reduce.reducer)(() => init, (acc, x) => acc - x);
}
},{"../reduce":"node_modules/@thi.ng/transducers/reduce.js"}],"node_modules/@thi.ng/transducers/xform/benchmark.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.benchmark = benchmark;

var _compr = require("../func/compr");

var _iterator = require("../iterator");

function benchmark(src) {
  return src ? (0, _iterator.iterator1)(benchmark(), src) : rfn => {
    const r = rfn[2];
    let prev = Date.now();
    return (0, _compr.compR)(rfn, (acc, _) => {
      const t = Date.now();
      const x = t - prev;
      prev = t;
      return r(acc, x);
    });
  };
}
},{"../func/compr":"node_modules/@thi.ng/transducers/func/compr.js","../iterator":"node_modules/@thi.ng/transducers/iterator.js"}],"node_modules/@thi.ng/transducers/xform/cat.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cat = void 0;

var _compr = require("../func/compr");

var _reduced = require("../reduced");

/**
 * Transducer to concatenate iterable values. Iterates over each input
 * and emits individual values down stream, therefore removing one level
 * of nesting from the input. If, during processing, the transducer is
 * given a wrapped `reduced()` input iterable, it will still be
 * processed as normal, but then immediately triggers early termination
 * by wrapping its own result in `reduced()`. E.g. this behavior allows
 * a `mapcat()` user functions to benefit from `reduced` results.
 *
 * ```
 * [...iterator(comp(map((x) => [x, x]), cat()), [1, 2, 3, 4])]
 * // [ 1, 1, 2, 2, 3, 3, 4, 4 ]
 *
 * [...iterator(
 *   comp(
 *     mapIndexed((i, x) => [[i], [x, x]]),
 *     cat(),
 *     cat()
 *   ),
 *   "abc"
 * )]
 * // [ 0, 'a', 'a', 1, 'b', 'b', 2, 'c', 'c' ]
 *
 * [...mapcat((x)=>(x > 1 ? reduced([x, x]) : [x, x]), [1, 2, 3, 4])]
 * // [ 1, 1, 2, 2 ]
 * ```
 *
 * @see thi.ng/transducers/iter/concat
 * @see thi.ng/transducers/xform/mapcat
 */
const cat = () => rfn => {
  const r = rfn[2];
  return (0, _compr.compR)(rfn, (acc, x) => {
    if (x) {
      for (let y of (0, _reduced.unreduced)(x)) {
        acc = r(acc, y);

        if ((0, _reduced.isReduced)(acc)) {
          break;
        }
      }
    }

    return (0, _reduced.isReduced)(x) ? (0, _reduced.ensureReduced)(acc) : acc;
  });
};

exports.cat = cat;
},{"../func/compr":"node_modules/@thi.ng/transducers/func/compr.js","../reduced":"node_modules/@thi.ng/transducers/reduced.js"}],"node_modules/@thi.ng/transducers/xform/converge.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.converge = converge;

var _api = require("@thi.ng/api");

var _compr = require("../func/compr");

var _iterator = require("../iterator");

var _reduced = require("../reduced");

function converge(...args) {
  return (0, _iterator.$iter)(converge, args) || (rfn => {
    const r = rfn[2];
    const pred = args[0];
    let prev = _api.SEMAPHORE;
    let done = false;
    return (0, _compr.compR)(rfn, (acc, x) => {
      if (done || prev !== _api.SEMAPHORE && pred(prev, x)) {
        done = true;
        return (0, _reduced.ensureReduced)(r(acc, x));
      }

      prev = x;
      return r(acc, x);
    });
  });
}
},{"@thi.ng/api":"node_modules/@thi.ng/api/index.js","../func/compr":"node_modules/@thi.ng/transducers/func/compr.js","../iterator":"node_modules/@thi.ng/transducers/iterator.js","../reduced":"node_modules/@thi.ng/transducers/reduced.js"}],"node_modules/@thi.ng/transducers/iter/range.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.range = range;
exports.Range = void 0;

var _reduced = require("../reduced");

function range(from, to, step) {
  return new Range(from, to, step);
}
/**
 * Simple class wrapper around given range interval and implementing
 * `Iterable` and `IReducible` interfaces, the latter is used to
 * accelerate use with `reduce`.
 */


class Range {
  constructor(from, to, step) {
    if (from === undefined) {
      from = 0;
      to = Infinity;
    } else if (to === undefined) {
      to = from;
      from = 0;
    }

    step = step === undefined ? from < to ? 1 : -1 : step;
    this.from = from;
    this.to = to;
    this.step = step;
  }

  *[Symbol.iterator]() {
    const step = this.step;
    const to = this.to;
    let from = this.from;

    if (step > 0) {
      while (from < to) {
        yield from;
        from += step;
      }
    } else if (step < 0) {
      while (from > to) {
        yield from;
        from += step;
      }
    }
  }

  $reduce(rfn, acc) {
    const step = this.step;

    if (step > 0) {
      for (let i = this.from, n = this.to; i < n && !(0, _reduced.isReduced)(acc); i += step) {
        acc = rfn(acc, i);
      }
    } else {
      for (let i = this.from, n = this.to; i > n && !(0, _reduced.isReduced)(acc); i += step) {
        acc = rfn(acc, i);
      }
    }

    return acc;
  }

}

exports.Range = Range;
},{"../reduced":"node_modules/@thi.ng/transducers/reduced.js"}],"node_modules/@thi.ng/transducers/iter/range2d.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.range2d = range2d;

var _errors = require("@thi.ng/errors");

var _range = require("./range");

function* range2d(...args) {
  let fromX, toX, fromY, toY, stepX, stepY;

  switch (args.length) {
    case 6:
      stepX = args[4];
      stepY = args[5];

    case 4:
      [fromX, toX, fromY, toY] = args;
      break;

    case 2:
      [toX, toY] = args;
      fromX = fromY = 0;
      break;

    default:
      (0, _errors.illegalArity)(args.length);
  }

  const rx = (0, _range.range)(fromX, toX, stepX);

  for (let y of (0, _range.range)(fromY, toY, stepY)) {
    for (let x of rx) {
      yield [x, y];
    }
  }
}
},{"@thi.ng/errors":"node_modules/@thi.ng/errors/index.js","./range":"node_modules/@thi.ng/transducers/iter/range.js"}],"node_modules/@thi.ng/transducers/iter/zip.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zip = zip;
exports.tuples = void 0;

function* zip(...src) {
  const iters = src.map(s => s[Symbol.iterator]());

  while (true) {
    const tuple = [];

    for (let i of iters) {
      let v = i.next();

      if (v.done) {
        return;
      }

      tuple.push(v.value);
    }

    yield tuple;
  }
}
/**
 * @deprecated renamed to `zip`
 */


const tuples = zip;
exports.tuples = tuples;
},{}],"node_modules/@thi.ng/transducers/xform/convolve.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convolve1d = convolve1d;
exports.convolve2d = convolve2d;
exports.buildKernel2d = exports.buildKernel1d = void 0;

var _errors = require("@thi.ng/errors");

var _range = require("../iter/range");

var _range2d = require("../iter/range2d");

var _zip = require("../iter/zip");

var _iterator = require("../iterator");

var _add = require("../rfn/add");

var _transduce = require("../transduce");

var _map = require("./map");

const buildKernel1d = (weights, w) => {
  const w2 = w >> 1;
  return [...(0, _zip.zip)(weights, (0, _range.range)(-w2, w2 + 1))];
};

exports.buildKernel1d = buildKernel1d;

const buildKernel2d = (weights, w, h) => {
  const w2 = w >> 1;
  const h2 = h >> 1;
  return [...(0, _zip.zip)(weights, (0, _range2d.range2d)(-w2, w2 + 1, -h2, h2 + 1))];
};

exports.buildKernel2d = buildKernel2d;

const kernelLookup1d = (src, x, width, wrap, border) => wrap ? ([w, ox]) => {
  const xx = x < -ox ? width + ox : x >= width - ox ? ox - 1 : x + ox;
  return w * src[xx];
} : ([w, ox]) => {
  return x < -ox || x >= width - ox ? border : w * src[x + ox];
};

const kernelLookup2d = (src, x, y, width, height, wrap, border) => wrap ? ([w, [ox, oy]]) => {
  const xx = x < -ox ? width + ox : x >= width - ox ? ox - 1 : x + ox;
  const yy = y < -oy ? height + oy : y >= height - oy ? oy - 1 : y + oy;
  return w * src[yy * width + xx];
} : ([w, [ox, oy]]) => {
  return x < -ox || y < -oy || x >= width - ox || y >= height - oy ? border : w * src[(y + oy) * width + x + ox];
};

const kernelError = () => (0, _errors.illegalArgs)(`no kernel or kernel config`);

function convolve1d(opts, indices) {
  if (indices) {
    return (0, _iterator.iterator1)(convolve1d(opts), indices);
  }

  const {
    src,
    width
  } = opts;
  const wrap = opts.wrap !== false;
  const border = opts.border || 0;
  const rfn = opts.reduce || _add.add;
  let kernel = opts.kernel;

  if (!kernel) {
    !(opts.weights && opts.kwidth) && kernelError();
    kernel = buildKernel1d(opts.weights, opts.kwidth);
  }

  return (0, _map.map)(p => (0, _transduce.transduce)((0, _map.map)(kernelLookup1d(src, p, width, wrap, border)), rfn(), kernel));
}

function convolve2d(opts, indices) {
  if (indices) {
    return (0, _iterator.iterator1)(convolve2d(opts), indices);
  }

  const {
    src,
    width,
    height
  } = opts;
  const wrap = opts.wrap !== false;
  const border = opts.border || 0;
  const rfn = opts.reduce || _add.add;
  let kernel = opts.kernel;

  if (!kernel) {
    !(opts.weights && opts.kwidth && opts.kheight) && kernelError();
    kernel = buildKernel2d(opts.weights, opts.kwidth, opts.kheight);
  }

  return (0, _map.map)(p => (0, _transduce.transduce)((0, _map.map)(kernelLookup2d(src, p[0], p[1], width, height, wrap, border)), rfn(), kernel));
}
},{"@thi.ng/errors":"node_modules/@thi.ng/errors/index.js","../iter/range":"node_modules/@thi.ng/transducers/iter/range.js","../iter/range2d":"node_modules/@thi.ng/transducers/iter/range2d.js","../iter/zip":"node_modules/@thi.ng/transducers/iter/zip.js","../iterator":"node_modules/@thi.ng/transducers/iterator.js","../rfn/add":"node_modules/@thi.ng/transducers/rfn/add.js","../transduce":"node_modules/@thi.ng/transducers/transduce.js","./map":"node_modules/@thi.ng/transducers/xform/map.js"}],"node_modules/@thi.ng/transducers/xform/dedupe.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dedupe = dedupe;

var _api = require("@thi.ng/api");

var _compr = require("../func/compr");

var _iterator = require("../iterator");

function dedupe(...args) {
  return (0, _iterator.$iter)(dedupe, args) || (rfn => {
    const r = rfn[2];
    const equiv = args[0];
    let prev = _api.SEMAPHORE;
    return (0, _compr.compR)(rfn, equiv ? (acc, x) => {
      acc = prev !== _api.SEMAPHORE && equiv(prev, x) ? acc : r(acc, x);
      prev = x;
      return acc;
    } : (acc, x) => {
      acc = prev === x ? acc : r(acc, x);
      prev = x;
      return acc;
    });
  });
}
},{"@thi.ng/api":"node_modules/@thi.ng/api/index.js","../func/compr":"node_modules/@thi.ng/transducers/func/compr.js","../iterator":"node_modules/@thi.ng/transducers/iterator.js"}],"node_modules/@thi.ng/transducers/xform/delayed.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.delayed = void 0;

var _compose = require("@thi.ng/compose");

var _map = require("./map");

/**
 * Yields transducer which wraps incoming values in promises, which each
 * resolve after specified delay time (in ms).
 *
 * **Only to be used in async contexts and NOT with `transduce`
 * directly.**
 *
 * @param t
 */
const delayed = t => (0, _map.map)(x => (0, _compose.delayed)(x, t));

exports.delayed = delayed;
},{"@thi.ng/compose":"node_modules/@thi.ng/compose/index.js","./map":"node_modules/@thi.ng/transducers/xform/map.js"}],"node_modules/@thi.ng/transducers/xform/distinct.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.distinct = distinct;

var _compr = require("../func/compr");

var _iterator = require("../iterator");

function distinct(...args) {
  return (0, _iterator.$iter)(distinct, args) || (rfn => {
    const r = rfn[2];
    const opts = args[0] || {};
    const key = opts.key;

    const seen = (opts.cache || (() => new Set()))();

    return (0, _compr.compR)(rfn, key ? (acc, x) => {
      const k = key(x);
      return !seen.has(k) ? (seen.add(k), r(acc, x)) : acc;
    } : (acc, x) => !seen.has(x) ? (seen.add(x), r(acc, x)) : acc);
  });
}
},{"../func/compr":"node_modules/@thi.ng/transducers/func/compr.js","../iterator":"node_modules/@thi.ng/transducers/iterator.js"}],"node_modules/@thi.ng/transducers/xform/throttle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.throttle = throttle;

var _compr = require("../func/compr");

var _iterator = require("../iterator");

function throttle(pred, src) {
  return src ? (0, _iterator.iterator1)(throttle(pred), src) : rfn => {
    const r = rfn[2];

    const _pred = pred();

    return (0, _compr.compR)(rfn, (acc, x) => _pred(x) ? r(acc, x) : acc);
  };
}
},{"../func/compr":"node_modules/@thi.ng/transducers/func/compr.js","../iterator":"node_modules/@thi.ng/transducers/iterator.js"}],"node_modules/@thi.ng/transducers/xform/drop-nth.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dropNth = dropNth;

var _throttle = require("./throttle");

var _iterator = require("../iterator");

function dropNth(n, src) {
  if (src) {
    return (0, _iterator.iterator1)(dropNth(n), src);
  }

  n = Math.max(0, n - 1);
  return (0, _throttle.throttle)(() => {
    let skip = n;
    return () => skip-- > 0 ? true : (skip = n, false);
  });
}
},{"./throttle":"node_modules/@thi.ng/transducers/xform/throttle.js","../iterator":"node_modules/@thi.ng/transducers/iterator.js"}],"node_modules/@thi.ng/transducers/xform/drop-while.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dropWhile = dropWhile;

var _compr = require("../func/compr");

var _iterator = require("../iterator");

function dropWhile(...args) {
  return (0, _iterator.$iter)(dropWhile, args) || (rfn => {
    const r = rfn[2];
    const pred = args[0];
    let ok = true;
    return (0, _compr.compR)(rfn, (acc, x) => (ok = ok && pred(x)) ? acc : r(acc, x));
  });
}
},{"../func/compr":"node_modules/@thi.ng/transducers/func/compr.js","../iterator":"node_modules/@thi.ng/transducers/iterator.js"}],"node_modules/@thi.ng/transducers/xform/drop.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.drop = drop;

var _compr = require("../func/compr");

var _iterator = require("../iterator");

function drop(n, src) {
  return src ? (0, _iterator.iterator1)(drop(n), src) : rfn => {
    const r = rfn[2];
    let m = n;
    return (0, _compr.compR)(rfn, (acc, x) => m > 0 ? (m--, acc) : r(acc, x));
  };
}
},{"../func/compr":"node_modules/@thi.ng/transducers/func/compr.js","../iterator":"node_modules/@thi.ng/transducers/iterator.js"}],"node_modules/@thi.ng/transducers/xform/duplicate.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.duplicate = duplicate;

var _compr = require("../func/compr");

var _iterator = require("../iterator");

var _reduced = require("../reduced");

function duplicate(n = 1, src) {
  return src ? (0, _iterator.iterator)(duplicate(n), src) : rfn => {
    const r = rfn[2];
    return (0, _compr.compR)(rfn, (acc, x) => {
      for (let i = n; i >= 0 && !(0, _reduced.isReduced)(acc); i--) {
        acc = r(acc, x);
      }

      return acc;
    });
  };
}
},{"../func/compr":"node_modules/@thi.ng/transducers/func/compr.js","../iterator":"node_modules/@thi.ng/transducers/iterator.js","../reduced":"node_modules/@thi.ng/transducers/reduced.js"}],"node_modules/@thi.ng/transducers/xform/filter.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filter = filter;

var _iterator = require("../iterator");

var _compr = require("../func/compr");

function filter(pred, src) {
  return src ? (0, _iterator.iterator1)(filter(pred), src) : rfn => {
    const r = rfn[2];
    return (0, _compr.compR)(rfn, (acc, x) => pred(x) ? r(acc, x) : acc);
  };
}
},{"../iterator":"node_modules/@thi.ng/transducers/iterator.js","../func/compr":"node_modules/@thi.ng/transducers/func/compr.js"}],"node_modules/@thi.ng/arrays/binary-search.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.binarySearch = void 0;

var _compare = require("@thi.ng/compare");

/**
 * Returns the supposed index of `x` in pre-sorted array-like collection
 * `buf`. If `x` can't be found, returns `-index-1`.
 *
 * The optional `key` function is used to obtain the actual sort value
 * of `x` and each array item (default: identity).
 *
 * The optional `cmp` comparator (default: thi.ng/compare) is then used
 * to identify the index of `x`. The sort order of `buf` MUST be
 * compatible with that of `cmp`.
 *
 * @param buf
 * @param x
 * @param key
 * @param cmp
 */
const binarySearch = (buf, x, key = x => x, cmp = _compare.compare) => {
  const kx = key(x);
  let low = 0;
  let high = buf.length - 1;

  while (low <= high) {
    const mid = low + high >>> 1;
    const c = cmp(key(buf[mid]), kx);

    if (c < 0) {
      low = mid + 1;
    } else if (c > 0) {
      high = mid - 1;
    } else {
      return mid;
    }
  }

  return -low - 1;
};

exports.binarySearch = binarySearch;
},{"@thi.ng/compare":"node_modules/@thi.ng/compare/index.js"}],"node_modules/@thi.ng/equiv/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.equivObject = exports.equivMap = exports.equivSet = exports.equivArrayLike = exports.equiv = void 0;
const OBJP = Object.getPrototypeOf({});
const FN = "function";
const STR = "string";

const equiv = (a, b) => {
  let proto;

  if (a === b) {
    return true;
  }

  if (a != null) {
    if (typeof a.equiv === FN) {
      return a.equiv(b);
    }
  } else {
    return a == b;
  }

  if (b != null) {
    if (typeof b.equiv === FN) {
      return b.equiv(a);
    }
  } else {
    return a == b;
  }

  if (typeof a === STR || typeof b === STR) {
    return false;
  }

  if ((proto = Object.getPrototypeOf(a), proto == null || proto === OBJP) && (proto = Object.getPrototypeOf(b), proto == null || proto === OBJP)) {
    return equivObject(a, b);
  }

  if (typeof a !== FN && a.length !== undefined && typeof b !== FN && b.length !== undefined) {
    return equivArrayLike(a, b);
  }

  if (a instanceof Set && b instanceof Set) {
    return equivSet(a, b);
  }

  if (a instanceof Map && b instanceof Map) {
    return equivMap(a, b);
  }

  if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime();
  }

  if (a instanceof RegExp && b instanceof RegExp) {
    return a.toString() === b.toString();
  } // NaN


  return a !== a && b !== b;
};

exports.equiv = equiv;

const equivArrayLike = (a, b, _equiv = equiv) => {
  let l = a.length;

  if (l === b.length) {
    while (--l >= 0 && _equiv(a[l], b[l]));
  }

  return l < 0;
};

exports.equivArrayLike = equivArrayLike;

const equivSet = (a, b, _equiv = equiv) => a.size === b.size && _equiv([...a.keys()].sort(), [...b.keys()].sort());

exports.equivSet = equivSet;

const equivMap = (a, b, _equiv = equiv) => a.size === b.size && _equiv([...a].sort(), [...b].sort());

exports.equivMap = equivMap;

const equivObject = (a, b, _equiv = equiv) => {
  if (Object.keys(a).length !== Object.keys(b).length) {
    return false;
  }

  for (let k in a) {
    if (!b.hasOwnProperty(k) || !_equiv(a[k], b[k])) {
      return false;
    }
  }

  return true;
};

exports.equivObject = equivObject;
},{}],"node_modules/@thi.ng/arrays/ends-with.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.endsWith = void 0;

var _equiv = require("@thi.ng/equiv");

const endsWith = (buf, needle, equiv = _equiv.equiv) => {
  let i = buf.length;
  let j = needle.length;
  if (i < j) return false;

  while (--i, --j >= 0 && equiv(buf[i], needle[j])) {}

  return j < 0;
};

exports.endsWith = endsWith;
},{"@thi.ng/equiv":"node_modules/@thi.ng/equiv/index.js"}],"node_modules/@thi.ng/arrays/ensure-iterable.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensureIterable = void 0;

var _errors = require("@thi.ng/errors");

const ensureIterable = x => {
  if (!(x != null && x[Symbol.iterator])) {
    (0, _errors.illegalArgs)(`value is not iterable: ${x}`);
  }

  return x;
};

exports.ensureIterable = ensureIterable;
},{"@thi.ng/errors":"node_modules/@thi.ng/errors/index.js"}],"node_modules/@thi.ng/arrays/ensure-array.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensureArrayLike = exports.ensureArray = void 0;

var _checks = require("@thi.ng/checks");

var _ensureIterable = require("./ensure-iterable");

/**
 * Helper function to avoid unnecessary copying if `x` is already an
 * array. First checks if `x` is an array and if so returns it. Else
 * attempts to obtain an iterator from `x` and if successful collects it
 * as array and returns it. Throws error if `x` isn't iterable.
 *
 * @param x
 */
const ensureArray = x => (0, _checks.isArray)(x) ? x : [...(0, _ensureIterable.ensureIterable)(x)];

exports.ensureArray = ensureArray;

const ensureArrayLike = x => (0, _checks.isArrayLike)(x) ? x : [...(0, _ensureIterable.ensureIterable)(x)];

exports.ensureArrayLike = ensureArrayLike;
},{"@thi.ng/checks":"node_modules/@thi.ng/checks/index.js","./ensure-iterable":"node_modules/@thi.ng/arrays/ensure-iterable.js"}],"node_modules/@thi.ng/arrays/find.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findIndex = exports.find = void 0;

var _equiv2 = require("@thi.ng/equiv");

/**
 * Similar to `Array.find()`, but uses thi.ng/equiv as default
 * predicate.
 *
 * @param src
 * @param x
 * @param equiv
 */
const find = (src, x, equiv = _equiv2.equiv) => {
  const i = findIndex(src, x, equiv);
  return i !== -1 ? src[i] : undefined;
};
/**
 * Similar to `Array.findIndex()`, but uses thi.ng/equiv as default
 * predicate.
 *
 * @param src
 * @param x
 * @param equiv
 */


exports.find = find;

const findIndex = (src, x, equiv = _equiv2.equiv) => {
  for (let i = src.length; --i >= 0;) {
    if (equiv(x, src[i])) return i;
  }

  return -1;
};

exports.findIndex = findIndex;
},{"@thi.ng/equiv":"node_modules/@thi.ng/equiv/index.js"}],"node_modules/@thi.ng/arrays/fuzzy-match.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fuzzyMatch = void 0;

var _equiv = require("@thi.ng/equiv");

/**
 * Performs a fuzzy search of `query` in `domain` and returns `true` if
 * successful.
 *
 * The optional `equiv` predicate can be used to customize
 * item equality checking. Uses @thi.ng/equiv by default.
 *
 * Adapted and generalized from:
 * https://github.com/bevacqua/fufuzzyzzysearch (MIT)
 *
 * @see thi.ng/transducers/xform/filterFuzzy
 *
 * @param domain
 * @param query
 * @param equiv
 */
const fuzzyMatch = (domain, query, equiv = _equiv.equiv) => {
  const nd = domain.length;
  const nq = query.length;

  if (nq > nd) {
    return false;
  }

  if (nq === nd) {
    return equiv(query, domain);
  }

  next: for (let i = 0, j = 0; i < nq; i++) {
    const q = query[i];

    while (j < nd) {
      if (equiv(domain[j++], q)) {
        continue next;
      }
    }

    return false;
  }

  return true;
};

exports.fuzzyMatch = fuzzyMatch;
},{"@thi.ng/equiv":"node_modules/@thi.ng/equiv/index.js"}],"node_modules/@thi.ng/arrays/peek.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.peek = void 0;

/**
 * Returns last element of given array or `undefined` if array is empty.
 *
 * @param x
 */
const peek = x => x[x.length - 1];

exports.peek = peek;
},{}],"node_modules/@thi.ng/random/api.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ARandom = void 0;
const INV_MAX = 1 / 0xffffffff;

class ARandom {
  float(norm = 1) {
    return this.int() * INV_MAX * norm;
  }

  norm(norm = 1) {
    return this.int() * INV_MAX * norm * 2 - norm;
  }

  minmax(min, max) {
    return this.float() * (max - min) + min;
  }
  /**
   * Returns approx. normal distribution using CLT.
   *
   * https://en.wikipedia.org/wiki/Central_limit_theorem
   *
   * @param n
   * @param offset
   * @param scale
   */


  gaussian(n = 10, offset = -0.5, scale = 1) {
    let sum = 0;
    let m = n;

    while (m-- > 0) sum += this.float(scale);

    return sum / n + offset;
  }

}

exports.ARandom = ARandom;
},{}],"node_modules/@thi.ng/random/smush32.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Smush32 = void 0;

var _api = require("./api");

// https://github.com/thi-ng/ct-head/blob/master/random.h
// https://gist.github.com/voidqk/d112165a26b45244a65298933c0349a4
const DEFAULT_SEED = 0xdecafbad;

class Smush32 extends _api.ARandom {
  constructor(seed = DEFAULT_SEED) {
    super();
    this.buffer = new Uint32Array([seed, 0]);
  }

  copy() {
    const gen = new Smush32();
    gen.buffer.set(this.buffer);
    return gen;
  }

  seed(s) {
    this.buffer.set([s, 0]);
    return this;
  }

  int() {
    const b = this.buffer;
    const m = 0x5bd1e995;
    const k = b[1]++ * m >>> 0;
    const s = b[0] = (k ^ k >> 24 ^ b[0] * m >>> 0) * m >>> 0;
    return (s ^ s >>> 13) >>> 0;
  }

}

exports.Smush32 = Smush32;
},{"./api":"node_modules/@thi.ng/random/api.js"}],"node_modules/@thi.ng/random/system.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SYSTEM = exports.SystemRandom = void 0;

var _api = require("./api");

const random = Math.random;

class SystemRandom extends _api.ARandom {
  int() {
    return random() * 0xffffffff >>> 0;
  }

  float(norm = 1) {
    return random() * norm;
  }

}

exports.SystemRandom = SystemRandom;
const SYSTEM = new SystemRandom();
exports.SYSTEM = SYSTEM;
},{"./api":"node_modules/@thi.ng/random/api.js"}],"node_modules/@thi.ng/random/xorshift128.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.XorShift128 = void 0;

var _api = require("./api");

// https://en.wikipedia.org/wiki/Xorshift
const DEFAULT_SEED = [0xdecafbad, 0x2fa9d75b, 0xe41f67e3, 0x5c83ec1a];

class XorShift128 extends _api.ARandom {
  constructor(seed = DEFAULT_SEED) {
    super();
    this.buffer = new Uint32Array(4);
    this.seed(seed);
  }

  copy() {
    return new XorShift128(this.buffer);
  }

  bytes() {
    return new Uint8Array(this.buffer.buffer);
  }

  seed(seed) {
    this.buffer.set(seed);
    return this;
  }

  int() {
    const s = this.buffer;
    let t = s[3];
    let w;
    t ^= t << 11;
    t ^= t >>> 8;
    s[3] = s[2];
    s[2] = s[1];
    w = s[1] = s[0];
    return s[0] = (t ^ w ^ w >>> 19) >>> 0;
  }

}

exports.XorShift128 = XorShift128;
},{"./api":"node_modules/@thi.ng/random/api.js"}],"node_modules/@thi.ng/random/xorwow.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.XorWow = void 0;

var _api = require("./api");

// https://en.wikipedia.org/wiki/Xorshift#xorwow
const DEFAULT_SEED = [0xdecafbad, 0x2fa9d75b, 0xe41f67e3, 0x5c83ec1a, 0xf69a5c71];

class XorWow extends _api.ARandom {
  constructor(seed = DEFAULT_SEED) {
    super();
    this.buffer = new Uint32Array(5);
    this.seed(seed);
  }

  copy() {
    return new XorWow(this.buffer);
  }

  seed(seed) {
    this.buffer.set(seed);
    return this;
  }

  bytes() {
    return new Uint8Array(this.buffer.buffer);
  }

  int() {
    const s = this.buffer;
    let t = s[3];
    let w;
    t ^= t >>> 2;
    t ^= t << 1;
    s[3] = s[2];
    s[2] = s[1];
    w = s[1] = s[0];
    t ^= w;
    t ^= w << 4;
    s[0] = t;
    return t + (s[4] += 0x587c5) >>> 0;
  }

}

exports.XorWow = XorWow;
},{"./api":"node_modules/@thi.ng/random/api.js"}],"node_modules/@thi.ng/random/xsadd.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.XsAdd = void 0;

var _api = require("./api");

// https://github.com/MersenneTwister-Lab/XSadd/blob/master/xsadd.h
const DEFAULT_SEED = 0xdecafbad;

class XsAdd extends _api.ARandom {
  constructor(seed = DEFAULT_SEED) {
    super();
    this.buffer = new Uint32Array(4);
    this.seed(seed);
  }

  bytes() {
    return new Uint8Array(this.buffer.buffer);
  }

  copy() {
    const gen = new XsAdd();
    gen.buffer.set(this.buffer);
    return gen;
  }

  seed(seed) {
    const s = this.buffer;
    s.set([seed, 0, 0, 0]);

    for (let j = 0, i = 1; i < 8; j = i++) {
      let x = (s[j & 3] ^ s[j & 3] >>> 30) >>> 0;
      x = 0x8965 * x + ((0x6c07 * x & 0xffff) << 16) >>> 0;
      s[i & 3] ^= i + x >>> 0;
    }

    return this;
  }

  int() {
    const s = this.buffer;
    let t = s[0];
    t ^= t << 15;
    t ^= t >>> 18;
    t ^= s[3] << 11;
    s[0] = s[1];
    s[1] = s[2];
    s[2] = s[3];
    s[3] = t;
    return t + s[2] >>> 0;
  }

}

exports.XsAdd = XsAdd;
},{"./api":"node_modules/@thi.ng/random/api.js"}],"node_modules/@thi.ng/random/random-id.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.randomID = void 0;

var _system = require("./system");

/**
 * Generates and returns a random string of `len` characters (default
 * 4), plus optional given `prefix` and using only provided `syms`
 * characters (default lowercase a-z).
 *
 * ```
 * randomID()
 * "qgdt"
 *
 * randomID(8, "id-", "0123456789ABCDEF")
 * "id-94EF6E1A"
 * ```
 *
 * @param len
 * @param prefix
 * @param syms
 * @param rnd
 */
const randomID = (len = 4, prefix = "", syms = "abcdefghijklmnopqrstuvwxyz", rnd = _system.SYSTEM) => {
  for (const n = syms.length; --len >= 0;) {
    prefix += syms[rnd.float(n) | 0];
  }

  return prefix;
};

exports.randomID = randomID;
},{"./system":"node_modules/@thi.ng/random/system.js"}],"node_modules/@thi.ng/random/weighted-random.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.weightedRandom = void 0;

var _system = require("./system");

/**
 * Returns a no-arg function which produces a random choice of given
 * weighted `choices` and using given `IRandom` instance (default:
 * `SYSTEM`). If `weights` are given, it must be the same size as
 * `choices`. If omitted, each choice will have same probability.
 *
 * https://www.electricmonk.nl/log/2009/12/23/weighted-random-distribution/
 *
 * @param choices
 * @param weights
 */
const weightedRandom = (choices, weights, rnd = _system.SYSTEM) => {
  const opts = choices.map(weights ? (x, i) => [x, weights[i]] : x => [x, 1]).sort((a, b) => b[1] - a[1]);
  const n = choices.length;
  let total = 0,
      i,
      r,
      sum;

  for (i = 0; i < n; i++) {
    total += opts[i][1];
  }

  return () => {
    r = rnd.float(total);
    sum = total;

    for (i = 0; i < n; i++) {
      sum -= opts[i][1];

      if (sum <= r) {
        return opts[i][0];
      }
    }
  };
};

exports.weightedRandom = weightedRandom;
},{"./system":"node_modules/@thi.ng/random/system.js"}],"node_modules/@thi.ng/random/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _api = require("./api");

Object.keys(_api).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _api[key];
    }
  });
});

var _smush = require("./smush32");

Object.keys(_smush).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _smush[key];
    }
  });
});

var _system = require("./system");

Object.keys(_system).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _system[key];
    }
  });
});

var _xorshift = require("./xorshift128");

Object.keys(_xorshift).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _xorshift[key];
    }
  });
});

var _xorwow = require("./xorwow");

Object.keys(_xorwow).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _xorwow[key];
    }
  });
});

var _xsadd = require("./xsadd");

Object.keys(_xsadd).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _xsadd[key];
    }
  });
});

var _randomId = require("./random-id");

Object.keys(_randomId).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _randomId[key];
    }
  });
});

var _weightedRandom = require("./weighted-random");

Object.keys(_weightedRandom).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _weightedRandom[key];
    }
  });
});
},{"./api":"node_modules/@thi.ng/random/api.js","./smush32":"node_modules/@thi.ng/random/smush32.js","./system":"node_modules/@thi.ng/random/system.js","./xorshift128":"node_modules/@thi.ng/random/xorshift128.js","./xorwow":"node_modules/@thi.ng/random/xorwow.js","./xsadd":"node_modules/@thi.ng/random/xsadd.js","./random-id":"node_modules/@thi.ng/random/random-id.js","./weighted-random":"node_modules/@thi.ng/random/weighted-random.js"}],"node_modules/@thi.ng/arrays/shuffle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shuffle = void 0;

var _random = require("@thi.ng/random");

/**
 * Shuffles the first `n` items of given array, using Fisher-yates and
 * optional `rnd` PRNG. If `n` is `undefined`, the entire array will be
 * shuffled.
 *
 *
 * @param buf
 * @param n
 * @param rnd
 */
const shuffle = (buf, n = buf.length, rnd = _random.SYSTEM) => {
  n = Math.min(n, buf.length);
  const l = n;

  if (l > 1) {
    n = Math.min(n, l);

    while (--n >= 0) {
      const a = rnd.float(l) | 0;
      const b = rnd.float(l) | 0;
      const t = buf[a];
      buf[a] = buf[b];
      buf[b] = t;
    }
  }

  return buf;
};

exports.shuffle = shuffle;
},{"@thi.ng/random":"node_modules/@thi.ng/random/index.js"}],"node_modules/@thi.ng/arrays/starts-with.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startsWith = void 0;

var _equiv = require("@thi.ng/equiv");

const startsWith = (buf, needle, equiv = _equiv.equiv) => {
  let i = buf.length;
  let j = needle.length;
  if (i < j) return false;

  while (-j >= 0 && equiv(buf[j], needle[j])) {}

  return j < 0;
};

exports.startsWith = startsWith;
},{"@thi.ng/equiv":"node_modules/@thi.ng/equiv/index.js"}],"node_modules/@thi.ng/arrays/swizzle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.swizzle = void 0;

/**
 * Returns optimized function to immutably select, repeat, reshape and /
 * or reorder array / object values in the specified index order. Fast
 * paths for up to 8 indices are provided, before a loop based approach
 * is used.
 *
 * ```
 * swizzle([0, 0, 0])([1, 2, 3, 4])    // [ 1, 1, 1 ]
 * swizzle([1, 1, 3, 3])([1, 2, 3, 4]) // [ 2, 2, 4, 4 ]
 * swizzle([2, 0])([1, 2, 3])          // [ 3, 1 ]
 * ```
 *
 * Objects can be used as input to the generated function, but the
 * result will always be in array form.
 *
 * ```
 * swizzle(["a", "c", "b"])({a: 1, b: 2, c: 3}) // [ 1, 3, 2 ]
 * ```
 *
 * @param order indices
 */
const swizzle = order => {
  const [a, b, c, d, e, f, g, h] = order;

  switch (order.length) {
    case 0:
      return () => [];

    case 1:
      return x => [x[a]];

    case 2:
      return x => [x[a], x[b]];

    case 3:
      return x => [x[a], x[b], x[c]];

    case 4:
      return x => [x[a], x[b], x[c], x[d]];

    case 5:
      return x => [x[a], x[b], x[c], x[d], x[e]];

    case 6:
      return x => [x[a], x[b], x[c], x[d], x[e], x[f]];

    case 7:
      return x => [x[a], x[b], x[c], x[d], x[e], x[f], x[g]];

    case 8:
      return x => [x[a], x[b], x[c], x[d], x[e], x[f], x[g], x[h]];

    default:
      return x => {
        const res = [];

        for (let i = order.length; --i >= 0;) {
          res[i] = x[order[i]];
        }

        return res;
      };
  }
};

exports.swizzle = swizzle;
},{}],"node_modules/@thi.ng/arrays/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _binarySearch = require("./binary-search");

Object.keys(_binarySearch).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _binarySearch[key];
    }
  });
});

var _endsWith = require("./ends-with");

Object.keys(_endsWith).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _endsWith[key];
    }
  });
});

var _ensureArray = require("./ensure-array");

Object.keys(_ensureArray).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _ensureArray[key];
    }
  });
});

var _ensureIterable = require("./ensure-iterable");

Object.keys(_ensureIterable).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _ensureIterable[key];
    }
  });
});

var _find = require("./find");

Object.keys(_find).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _find[key];
    }
  });
});

var _fuzzyMatch = require("./fuzzy-match");

Object.keys(_fuzzyMatch).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _fuzzyMatch[key];
    }
  });
});

var _peek = require("./peek");

Object.keys(_peek).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _peek[key];
    }
  });
});

var _shuffle = require("./shuffle");

Object.keys(_shuffle).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _shuffle[key];
    }
  });
});

var _startsWith = require("./starts-with");

Object.keys(_startsWith).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _startsWith[key];
    }
  });
});

var _swizzle = require("./swizzle");

Object.keys(_swizzle).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _swizzle[key];
    }
  });
});
},{"./binary-search":"node_modules/@thi.ng/arrays/binary-search.js","./ends-with":"node_modules/@thi.ng/arrays/ends-with.js","./ensure-array":"node_modules/@thi.ng/arrays/ensure-array.js","./ensure-iterable":"node_modules/@thi.ng/arrays/ensure-iterable.js","./find":"node_modules/@thi.ng/arrays/find.js","./fuzzy-match":"node_modules/@thi.ng/arrays/fuzzy-match.js","./peek":"node_modules/@thi.ng/arrays/peek.js","./shuffle":"node_modules/@thi.ng/arrays/shuffle.js","./starts-with":"node_modules/@thi.ng/arrays/starts-with.js","./swizzle":"node_modules/@thi.ng/arrays/swizzle.js"}],"node_modules/@thi.ng/transducers/xform/filter-fuzzy.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterFuzzy = filterFuzzy;

var _arrays = require("@thi.ng/arrays");

var _iterator = require("../iterator");

var _filter = require("./filter");

function filterFuzzy(...args) {
  const iter = args.length > 1 && (0, _iterator.$iter)(filterFuzzy, args);

  if (iter) {
    return iter;
  }

  const query = args[0];
  const {
    key,
    equiv
  } = args[1] || {};
  return (0, _filter.filter)(x => (0, _arrays.fuzzyMatch)(key != null ? key(x) : x, query, equiv));
}
},{"@thi.ng/arrays":"node_modules/@thi.ng/arrays/index.js","../iterator":"node_modules/@thi.ng/transducers/iterator.js","./filter":"node_modules/@thi.ng/transducers/xform/filter.js"}],"node_modules/@thi.ng/transducers/xform/flatten-with.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.flattenWith = flattenWith;

var _compr = require("../func/compr");

var _iterator = require("../iterator");

var _reduced = require("../reduced");

function flattenWith(fn, src) {
  return src ? (0, _iterator.iterator)(flattenWith(fn), src) : rfn => {
    const reduce = rfn[2];

    const flatten = (acc, x) => {
      const xx = fn(x);

      if (xx) {
        for (let y of xx) {
          acc = flatten(acc, y);

          if ((0, _reduced.isReduced)(acc)) {
            break;
          }
        }

        return acc;
      }

      return reduce(acc, x);
    };

    return (0, _compr.compR)(rfn, flatten);
  };
}
},{"../func/compr":"node_modules/@thi.ng/transducers/func/compr.js","../iterator":"node_modules/@thi.ng/transducers/iterator.js","../reduced":"node_modules/@thi.ng/transducers/reduced.js"}],"node_modules/@thi.ng/transducers/xform/flatten.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.flatten = flatten;

var _flattenWith = require("./flatten-with");

function flatten(src) {
  return (0, _flattenWith.flattenWith)(x => x != null && x[Symbol.iterator] && typeof x !== "string" ? x : undefined, src);
}
},{"./flatten-with":"node_modules/@thi.ng/transducers/xform/flatten-with.js"}],"node_modules/@thi.ng/transducers/xform/map-indexed.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapIndexed = mapIndexed;

var _compr = require("../func/compr");

var _iterator = require("../iterator");

function mapIndexed(...args) {
  return (0, _iterator.$iter)(mapIndexed, args) || (rfn => {
    const r = rfn[2];
    const fn = args[0];
    let i = args[1] || 0;
    return (0, _compr.compR)(rfn, (acc, x) => r(acc, fn(i++, x)));
  });
}
},{"../func/compr":"node_modules/@thi.ng/transducers/func/compr.js","../iterator":"node_modules/@thi.ng/transducers/iterator.js"}],"node_modules/@thi.ng/transducers/xform/indexed.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.indexed = indexed;

var _iterator = require("../iterator");

var _mapIndexed = require("./map-indexed");

function indexed(...args) {
  const iter = (0, _iterator.$iter)(indexed, args);

  if (iter) {
    return iter;
  }

  const from = args[0] || 0;
  return (0, _mapIndexed.mapIndexed)((i, x) => [from + i, x]);
}
},{"../iterator":"node_modules/@thi.ng/transducers/iterator.js","./map-indexed":"node_modules/@thi.ng/transducers/xform/map-indexed.js"}],"node_modules/@thi.ng/transducers/xform/interleave.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.interleave = interleave;

var _compr = require("../func/compr");

var _iterator = require("../iterator");

var _reduced = require("../reduced");

function interleave(sep, src) {
  return src ? (0, _iterator.iterator)(interleave(sep), src) : rfn => {
    const r = rfn[2];

    const _sep = typeof sep === "function" ? sep : () => sep;

    return (0, _compr.compR)(rfn, (acc, x) => {
      acc = r(acc, _sep());
      return (0, _reduced.isReduced)(acc) ? acc : r(acc, x);
    });
  };
}
},{"../func/compr":"node_modules/@thi.ng/transducers/func/compr.js","../iterator":"node_modules/@thi.ng/transducers/iterator.js","../reduced":"node_modules/@thi.ng/transducers/reduced.js"}],"node_modules/@thi.ng/transducers/xform/interpose.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.interpose = interpose;

var _compr = require("../func/compr");

var _iterator = require("../iterator");

var _reduced = require("../reduced");

function interpose(sep, src) {
  return src ? (0, _iterator.iterator)(interpose(sep), src) : rfn => {
    const r = rfn[2];

    const _sep = typeof sep === "function" ? sep : () => sep;

    let first = true;
    return (0, _compr.compR)(rfn, (acc, x) => {
      if (first) {
        first = false;
        return r(acc, x);
      }

      acc = r(acc, _sep());
      return (0, _reduced.isReduced)(acc) ? acc : r(acc, x);
    });
  };
}
},{"../func/compr":"node_modules/@thi.ng/transducers/func/compr.js","../iterator":"node_modules/@thi.ng/transducers/iterator.js","../reduced":"node_modules/@thi.ng/transducers/reduced.js"}],"node_modules/@thi.ng/transducers/xform/keep.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.keep = keep;

var _compose = require("@thi.ng/compose");

var _compr = require("../func/compr");

var _iterator = require("../iterator");

function keep(...args) {
  return (0, _iterator.$iter)(keep, args) || (rfn => {
    const r = rfn[2];
    const pred = args[0] || _compose.identity;
    return (0, _compr.compR)(rfn, (acc, x) => pred(x) != null ? r(acc, x) : acc);
  });
}
},{"@thi.ng/compose":"node_modules/@thi.ng/compose/index.js","../func/compr":"node_modules/@thi.ng/transducers/func/compr.js","../iterator":"node_modules/@thi.ng/transducers/iterator.js"}],"node_modules/@thi.ng/transducers/xform/labeled.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.labeled = labeled;

var _checks = require("@thi.ng/checks");

var _iterator = require("../iterator");

var _map = require("./map");

function labeled(id, src) {
  return src ? (0, _iterator.iterator1)(labeled(id), src) : (0, _map.map)((0, _checks.isFunction)(id) ? x => [id(x), x] : x => [id, x]);
}
},{"@thi.ng/checks":"node_modules/@thi.ng/checks/index.js","../iterator":"node_modules/@thi.ng/transducers/iterator.js","./map":"node_modules/@thi.ng/transducers/xform/map.js"}],"node_modules/@thi.ng/transducers/func/deep-transform.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deepTransform = void 0;

var _checks = require("@thi.ng/checks");

/**
 * Higher-order deep object transformer. Accepts a nested `spec`
 * array reflecting same key structure as the object to be mapped,
 * but with functions or sub-specs as their values.
 * Returns a new function, which when called, recursively applies
 * nested transformers in post-order traversal (child transformers
 * are run first) and returns the result of the root transformer.
 *
 * The transform specs are given as arrays in this format:
 *
 * ```
 * [tx-function, {key1: [tx-function, {...}], key2: tx-fn}]
 * ```
 *
 * If a key in the spec has no further sub maps, its transform
 * function can be given directly without having to wrap it into
 * the usual array structure.
 *
 * ```
 * // source object to be transformed
 * src = {
 *    meta: {
 *      author: { name: "Alice", email: "a@b.com" },
 *      date: 1041510896000
 *    },
 *    type: "post",
 *    title: "Hello world",
 *    body: "Ratione necessitatibus doloremque itaque."
 * };
 *
 * // deep transformation spec
 * spec = [
 *    // root transform (called last)
 *    ({type, meta, title, body}) => ["div", {class: type}, title, meta, body],
 *    // object of transform sub-specs
 *    {
 *      meta: [
 *        ({author, date}) => ["div.meta", author, `(${date})`],
 *        {
 *          author: ({email, name}) => ["a", {href: `mailto:${email}`}, name],
 *          date: (d) => new Date(d).toLocaleString()
 *        }
 *      ],
 *      title: (title) => ["h1", title]
 *    }
 * ];
 *
 * // build transformer & apply to src
 * deepTransform(spec)(src);
 *
 * // [ "div",
 * //   { class: "article" },
 * //   [ "h1", "Hello world" ],
 * //   [ "div.meta",
 * //     [ "a", { href: "mailto:a@.b.com" }, "Alice" ],
 * //     "(1/2/2003, 12:34:56 PM)" ],
 * //   "Ratione necessitatibus doloremque itaque." ]
 * ```
 *
 * @param spec transformation spec
 */
const deepTransform = spec => {
  if ((0, _checks.isFunction)(spec)) {
    return spec;
  }

  const mapfns = Object.keys(spec[1] || {}).reduce((acc, k) => (acc[k] = deepTransform(spec[1][k]), acc), {});
  return x => {
    const res = Object.assign({}, x);

    for (let k in mapfns) {
      res[k] = mapfns[k](res[k]);
    }

    return spec[0](res);
  };
};

exports.deepTransform = deepTransform;
},{"@thi.ng/checks":"node_modules/@thi.ng/checks/index.js"}],"node_modules/@thi.ng/transducers/xform/map-deep.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapDeep = mapDeep;

var _deepTransform = require("../func/deep-transform");

var _iterator = require("../iterator");

var _map = require("./map");

function mapDeep(spec, src) {
  return src ? (0, _iterator.iterator1)(mapDeep(spec), src) : (0, _map.map)((0, _deepTransform.deepTransform)(spec));
}
},{"../func/deep-transform":"node_modules/@thi.ng/transducers/func/deep-transform.js","../iterator":"node_modules/@thi.ng/transducers/iterator.js","./map":"node_modules/@thi.ng/transducers/xform/map.js"}],"node_modules/@thi.ng/transducers/xform/map-keys.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapKeys = mapKeys;

var _iterator = require("../iterator");

var _map = require("./map");

function mapKeys(...args) {
  const iter = (0, _iterator.$iter)(mapKeys, args);

  if (iter) {
    return iter;
  }

  const keys = args[0];
  const copy = args[1] !== false;
  return (0, _map.map)(x => {
    const res = copy ? Object.assign({}, x) : x;

    for (let k in keys) {
      res[k] = keys[k](x[k]);
    }

    return res;
  });
}
},{"../iterator":"node_modules/@thi.ng/transducers/iterator.js","./map":"node_modules/@thi.ng/transducers/xform/map.js"}],"node_modules/@thi.ng/transducers/xform/map-nth.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapNth = mapNth;

var _compr = require("../func/compr");

var _iterator = require("../iterator");

function mapNth(...args) {
  const iter = (0, _iterator.$iter)(mapNth, args);

  if (iter) {
    return iter;
  }

  let n = args[0] - 1,
      offset,
      fn;

  if (typeof args[1] === "number") {
    offset = args[1];
    fn = args[2];
  } else {
    fn = args[1];
    offset = 0;
  }

  return rfn => {
    const r = rfn[2];
    let skip = 0,
        off = offset;
    return (0, _compr.compR)(rfn, (acc, x) => {
      if (off === 0) {
        if (skip === 0) {
          skip = n;
          return r(acc, fn(x));
        }

        skip--;
      } else {
        off--;
      }

      return r(acc, x);
    });
  };
}
},{"../func/compr":"node_modules/@thi.ng/transducers/func/compr.js","../iterator":"node_modules/@thi.ng/transducers/iterator.js"}],"node_modules/@thi.ng/transducers/xform/map-vals.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapVals = mapVals;

var _iterator = require("../iterator");

var _map = require("./map");

function mapVals(...args) {
  const iter = (0, _iterator.$iter)(mapVals, args);

  if (iter) {
    return iter;
  }

  const fn = args[0];
  const copy = args[1] !== false;
  return (0, _map.map)(x => {
    const res = copy ? {} : x;

    for (let k in x) {
      res[k] = fn(x[k]);
    }

    return res;
  });
}
},{"../iterator":"node_modules/@thi.ng/transducers/iterator.js","./map":"node_modules/@thi.ng/transducers/xform/map.js"}],"node_modules/@thi.ng/transducers/func/comp.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.comp = comp;

var _compose = require("@thi.ng/compose");

function comp(...fns) {
  return _compose.comp.apply(null, fns);
}
},{"@thi.ng/compose":"node_modules/@thi.ng/compose/index.js"}],"node_modules/@thi.ng/transducers/xform/mapcat.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapcat = mapcat;

var _comp = require("../func/comp");

var _iterator = require("../iterator");

var _cat = require("./cat");

var _map = require("./map");

function mapcat(fn, src) {
  return src ? (0, _iterator.iterator)(mapcat(fn), src) : (0, _comp.comp)((0, _map.map)(fn), (0, _cat.cat)());
}
},{"../func/comp":"node_modules/@thi.ng/transducers/func/comp.js","../iterator":"node_modules/@thi.ng/transducers/iterator.js","./cat":"node_modules/@thi.ng/transducers/xform/cat.js","./map":"node_modules/@thi.ng/transducers/xform/map.js"}],"node_modules/@thi.ng/transducers/xform/take.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.take = take;

var _compr = require("../func/compr");

var _iterator = require("../iterator");

var _reduced = require("../reduced");

function take(n, src) {
  return src ? (0, _iterator.iterator)(take(n), src) : rfn => {
    const r = rfn[2];
    let m = n;
    return (0, _compr.compR)(rfn, (acc, x) => --m > 0 ? r(acc, x) : m === 0 ? (0, _reduced.ensureReduced)(r(acc, x)) : (0, _reduced.reduced)(acc));
  };
}
},{"../func/compr":"node_modules/@thi.ng/transducers/func/compr.js","../iterator":"node_modules/@thi.ng/transducers/iterator.js","../reduced":"node_modules/@thi.ng/transducers/reduced.js"}],"node_modules/@thi.ng/transducers/xform/match-first.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.matchFirst = matchFirst;

var _comp = require("../func/comp");

var _iterator = require("../iterator");

var _filter = require("./filter");

var _take = require("./take");

function matchFirst(pred, src) {
  return src ? [...(0, _iterator.iterator1)(matchFirst(pred), src)][0] : (0, _comp.comp)((0, _filter.filter)(pred), (0, _take.take)(1));
}
},{"../func/comp":"node_modules/@thi.ng/transducers/func/comp.js","../iterator":"node_modules/@thi.ng/transducers/iterator.js","./filter":"node_modules/@thi.ng/transducers/xform/filter.js","./take":"node_modules/@thi.ng/transducers/xform/take.js"}],"node_modules/@thi.ng/transducers/xform/take-last.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.takeLast = takeLast;

var _iterator = require("../iterator");

var _reduced = require("../reduced");

function takeLast(n, src) {
  return src ? (0, _iterator.iterator)(takeLast(n), src) : ([init, complete, reduce]) => {
    const buf = [];
    return [init, acc => {
      while (buf.length && !(0, _reduced.isReduced)(acc)) {
        acc = reduce(acc, buf.shift());
      }

      return complete(acc);
    }, (acc, x) => {
      if (buf.length === n) {
        buf.shift();
      }

      buf.push(x);
      return acc;
    }];
  };
}
},{"../iterator":"node_modules/@thi.ng/transducers/iterator.js","../reduced":"node_modules/@thi.ng/transducers/reduced.js"}],"node_modules/@thi.ng/transducers/xform/match-last.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.matchLast = matchLast;

var _comp = require("../func/comp");

var _iterator = require("../iterator");

var _filter = require("./filter");

var _takeLast = require("./take-last");

function matchLast(pred, src) {
  return src ? [...(0, _iterator.iterator)(matchLast(pred), src)][0] : (0, _comp.comp)((0, _filter.filter)(pred), (0, _takeLast.takeLast)(1));
}
},{"../func/comp":"node_modules/@thi.ng/transducers/func/comp.js","../iterator":"node_modules/@thi.ng/transducers/iterator.js","./filter":"node_modules/@thi.ng/transducers/xform/filter.js","./take-last":"node_modules/@thi.ng/transducers/xform/take-last.js"}],"node_modules/@thi.ng/transducers/xform/moving-average.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.movingAverage = movingAverage;

var _errors = require("@thi.ng/errors");

var _compr = require("../func/compr");

var _iterator = require("../iterator");

function movingAverage(period, src) {
  return src ? (0, _iterator.iterator1)(movingAverage(period), src) : rfn => {
    period |= 0;
    period < 2 && (0, _errors.illegalArgs)("period must be >= 2");
    const reduce = rfn[2];
    const window = [];
    let sum = 0;
    return (0, _compr.compR)(rfn, (acc, x) => {
      const n = window.push(x);
      sum += x;
      n > period && (sum -= window.shift());
      return n >= period ? reduce(acc, sum / period) : acc;
    });
  };
}
},{"@thi.ng/errors":"node_modules/@thi.ng/errors/index.js","../func/compr":"node_modules/@thi.ng/transducers/func/compr.js","../iterator":"node_modules/@thi.ng/transducers/iterator.js"}],"node_modules/@thi.ng/transducers/xform/partition.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.partition = partition;

var _iterator = require("../iterator");

function partition(...args) {
  const iter = (0, _iterator.$iter)(partition, args, _iterator.iterator);

  if (iter) {
    return iter;
  }

  let size = args[0],
      all,
      step;

  if (typeof args[1] == "number") {
    step = args[1];
    all = args[2];
  } else {
    step = size;
    all = args[1];
  }

  return ([init, complete, reduce]) => {
    let buf = [];
    let skip = 0;
    return [init, acc => {
      if (all && buf.length > 0) {
        acc = reduce(acc, buf);
        buf = [];
      }

      return complete(acc);
    }, (acc, x) => {
      if (skip <= 0) {
        if (buf.length < size) {
          buf.push(x);
        }

        if (buf.length === size) {
          acc = reduce(acc, buf);
          buf = step < size ? buf.slice(step) : [];
          skip = step - size;
        }
      } else {
        skip--;
      }

      return acc;
    }];
  };
}
},{"../iterator":"node_modules/@thi.ng/transducers/iterator.js"}],"node_modules/@thi.ng/transducers/xform/moving-median.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.movingMedian = movingMedian;

var _compare = require("@thi.ng/compare");

var _compose = require("@thi.ng/compose");

var _comp = require("../func/comp");

var _iterator = require("../iterator");

var _map = require("./map");

var _partition = require("./partition");

function movingMedian(...args) {
  const iter = (0, _iterator.$iter)(movingMedian, args);

  if (iter) {
    return iter;
  }

  const {
    key,
    compare
  } = Object.assign({
    key: _compose.identity,
    compare: _compare.compare
  }, args[1]);
  const n = args[0];
  const m = n >> 1;
  return (0, _comp.comp)((0, _partition.partition)(n, 1, true), (0, _map.map)(window => window.slice().sort((a, b) => compare(key(a), key(b)))[m]));
}
},{"@thi.ng/compare":"node_modules/@thi.ng/compare/index.js","@thi.ng/compose":"node_modules/@thi.ng/compose/index.js","../func/comp":"node_modules/@thi.ng/transducers/func/comp.js","../iterator":"node_modules/@thi.ng/transducers/iterator.js","./map":"node_modules/@thi.ng/transducers/xform/map.js","./partition":"node_modules/@thi.ng/transducers/xform/partition.js"}],"node_modules/@thi.ng/transducers/xform/multiplex.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.multiplex = multiplex;

var _compose = require("@thi.ng/compose");

var _step = require("../step");

var _map = require("./map");

function multiplex(...args) {
  return (0, _map.map)(_compose.juxt.apply(null, args.map(_step.step)));
}
},{"@thi.ng/compose":"node_modules/@thi.ng/compose/index.js","../step":"node_modules/@thi.ng/transducers/step.js","./map":"node_modules/@thi.ng/transducers/xform/map.js"}],"node_modules/@thi.ng/transducers/func/renamer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renamer = void 0;

const renamer = kmap => {
  const ks = Object.keys(kmap);
  const [a2, b2, c2] = ks;
  const [a1, b1, c1] = ks.map(k => kmap[k]);

  switch (ks.length) {
    case 3:
      return x => {
        const res = {};
        let v;
        v = x[c1], v !== undefined && (res[c2] = v);
        v = x[b1], v !== undefined && (res[b2] = v);
        v = x[a1], v !== undefined && (res[a2] = v);
        return res;
      };

    case 2:
      return x => {
        const res = {};
        let v;
        v = x[b1], v !== undefined && (res[b2] = v);
        v = x[a1], v !== undefined && (res[a2] = v);
        return res;
      };

    case 1:
      return x => {
        const res = {};
        let v = x[a1];
        v !== undefined && (res[a2] = v);
        return res;
      };

    default:
      return x => {
        let k, v;
        const res = {};

        for (let i = ks.length - 1; i >= 0; i--) {
          k = ks[i], v = x[kmap[k]], v !== undefined && (res[k] = v);
        }

        return res;
      };
  }
};

exports.renamer = renamer;
},{}],"node_modules/@thi.ng/transducers/xform/rename.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rename = rename;

var _checks = require("@thi.ng/checks");

var _comp = require("../func/comp");

var _renamer = require("../func/renamer");

var _iterator = require("../iterator");

var _transduce = require("../transduce");

var _filter = require("./filter");

var _map = require("./map");

function rename(...args) {
  const iter = args.length > 2 && (0, _iterator.$iter)(rename, args);

  if (iter) {
    return iter;
  }

  let kmap = args[0];

  if ((0, _checks.isArray)(kmap)) {
    kmap = kmap.reduce((acc, k, i) => (acc[k] = i, acc), {});
  }

  if (args[1]) {
    const ks = Object.keys(kmap);
    return (0, _map.map)(y => (0, _transduce.transduce)((0, _comp.comp)((0, _map.map)(k => [k, y[kmap[k]]]), (0, _filter.filter)(x => x[1] !== undefined)), args[1], ks));
  } else {
    return (0, _map.map)((0, _renamer.renamer)(kmap));
  }
}
},{"@thi.ng/checks":"node_modules/@thi.ng/checks/index.js","../func/comp":"node_modules/@thi.ng/transducers/func/comp.js","../func/renamer":"node_modules/@thi.ng/transducers/func/renamer.js","../iterator":"node_modules/@thi.ng/transducers/iterator.js","../transduce":"node_modules/@thi.ng/transducers/transduce.js","./filter":"node_modules/@thi.ng/transducers/xform/filter.js","./map":"node_modules/@thi.ng/transducers/xform/map.js"}],"node_modules/@thi.ng/transducers/xform/multiplex-obj.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.multiplexObj = multiplexObj;

var _comp = require("../func/comp");

var _iterator = require("../iterator");

var _multiplex = require("./multiplex");

var _rename = require("./rename");

function multiplexObj(...args) {
  const iter = (0, _iterator.$iter)(multiplexObj, args);

  if (iter) {
    return iter;
  }

  const [xforms, rfn] = args;
  const ks = Object.keys(xforms);
  return (0, _comp.comp)(_multiplex.multiplex.apply(null, ks.map(k => xforms[k])), (0, _rename.rename)(ks, rfn));
}
},{"../func/comp":"node_modules/@thi.ng/transducers/func/comp.js","../iterator":"node_modules/@thi.ng/transducers/iterator.js","./multiplex":"node_modules/@thi.ng/transducers/xform/multiplex.js","./rename":"node_modules/@thi.ng/transducers/xform/rename.js"}],"node_modules/@thi.ng/transducers/xform/noop.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.noop = void 0;

/**
 * No-op / pass-through transducer, essentially the same as:
 * `map(identity)`, but faster. Useful for testing and / or to keep
 * existing values in a `multiplex()` tuple lane.
 */
const noop = () => rfn => rfn;

exports.noop = noop;
},{}],"node_modules/@thi.ng/transducers/xform/pad-last.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.padLast = padLast;

var _iterator = require("../iterator");

var _reduced = require("../reduced");

function padLast(n, fill, src) {
  return src ? (0, _iterator.iterator)(padLast(n, fill), src) : ([init, complete, reduce]) => {
    let m = 0;
    return [init, acc => {
      let rem = m % n;

      if (rem > 0) {
        while (++rem <= n && !(0, _reduced.isReduced)(acc)) {
          acc = reduce(acc, fill);
        }
      }

      return complete(acc);
    }, (acc, x) => (m++, reduce(acc, x))];
  };
}
},{"../iterator":"node_modules/@thi.ng/transducers/iterator.js","../reduced":"node_modules/@thi.ng/transducers/reduced.js"}],"node_modules/@thi.ng/transducers/xform/page.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.page = page;

var _comp = require("../func/comp");

var _iterator = require("../iterator");

var _drop = require("./drop");

var _take = require("./take");

function page(...args) {
  return (0, _iterator.$iter)(page, args) || (0, _comp.comp)((0, _drop.drop)(args[0] * (args[1] || 10)), (0, _take.take)(args[1] || 10));
}
},{"../func/comp":"node_modules/@thi.ng/transducers/func/comp.js","../iterator":"node_modules/@thi.ng/transducers/iterator.js","./drop":"node_modules/@thi.ng/transducers/xform/drop.js","./take":"node_modules/@thi.ng/transducers/xform/take.js"}],"node_modules/@thi.ng/transducers/xform/partition-by.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.partitionBy = partitionBy;

var _api = require("@thi.ng/api");

var _iterator = require("../iterator");

var _reduced = require("../reduced");

function partitionBy(...args) {
  return (0, _iterator.$iter)(partitionBy, args, _iterator.iterator) || (([init, complete, reduce]) => {
    const fn = args[0];
    const f = args[1] === true ? fn() : fn;
    let prev = _api.SEMAPHORE,
        chunk;
    return [init, acc => {
      if (chunk && chunk.length) {
        acc = reduce(acc, chunk);
        chunk = null;
      }

      return complete(acc);
    }, (acc, x) => {
      const curr = f(x);

      if (prev === _api.SEMAPHORE) {
        prev = curr;
        chunk = [x];
      } else if (curr === prev) {
        chunk.push(x);
      } else {
        chunk && (acc = reduce(acc, chunk));
        chunk = (0, _reduced.isReduced)(acc) ? null : [x];
        prev = curr;
      }

      return acc;
    }];
  });
}
},{"@thi.ng/api":"node_modules/@thi.ng/api/index.js","../iterator":"node_modules/@thi.ng/transducers/iterator.js","../reduced":"node_modules/@thi.ng/transducers/reduced.js"}],"node_modules/@thi.ng/transducers/xform/partition-of.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.partitionOf = partitionOf;

var _iterator = require("../iterator");

var _partitionBy = require("./partition-by");

function partitionOf(sizes, src) {
  return src ? (0, _iterator.iterator)(partitionOf(sizes), src) : (0, _partitionBy.partitionBy)(() => {
    let i = 0,
        j = 0;
    return () => {
      if (i++ === sizes[j]) {
        i = 1;
        j = (j + 1) % sizes.length;
      }

      return j;
    };
  }, true);
}
},{"../iterator":"node_modules/@thi.ng/transducers/iterator.js","./partition-by":"node_modules/@thi.ng/transducers/xform/partition-by.js"}],"node_modules/@thi.ng/transducers/xform/partition-sort.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.partitionSort = partitionSort;

var _compare = require("@thi.ng/compare");

var _compose = require("@thi.ng/compose");

var _comp = require("../func/comp");

var _iterator = require("../iterator");

var _mapcat = require("./mapcat");

var _partition = require("./partition");

function partitionSort(...args) {
  const iter = (0, _iterator.$iter)(partitionSort, args, _iterator.iterator);

  if (iter) {
    return iter;
  }

  const {
    key,
    compare
  } = Object.assign({
    key: _compose.identity,
    compare: _compare.compare
  }, args[1]);
  return (0, _comp.comp)((0, _partition.partition)(args[0], true), (0, _mapcat.mapcat)(window => window.slice().sort((a, b) => compare(key(a), key(b)))));
}
},{"@thi.ng/compare":"node_modules/@thi.ng/compare/index.js","@thi.ng/compose":"node_modules/@thi.ng/compose/index.js","../func/comp":"node_modules/@thi.ng/transducers/func/comp.js","../iterator":"node_modules/@thi.ng/transducers/iterator.js","./mapcat":"node_modules/@thi.ng/transducers/xform/mapcat.js","./partition":"node_modules/@thi.ng/transducers/xform/partition.js"}],"node_modules/@thi.ng/transducers/xform/partition-sync.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.partitionSync = partitionSync;

var _checks = require("@thi.ng/checks");

var _compose = require("@thi.ng/compose");

var _iterator = require("../iterator");

function partitionSync(...args) {
  return (0, _iterator.$iter)(partitionSync, args, _iterator.iterator) || (([init, complete, reduce]) => {
    let curr = {};
    let first = true;
    const currKeys = new Set();
    const {
      key,
      mergeOnly,
      reset,
      all
    } = Object.assign({
      key: _compose.identity,
      mergeOnly: false,
      reset: true,
      all: true
    }, args[1]);
    const ks = (0, _checks.isArray)(args[0]) ? new Set(args[0]) : args[0];
    return [init, acc => {
      if (reset && all && currKeys.size > 0 || !reset && first) {
        acc = reduce(acc, curr);
        curr = undefined;
        currKeys.clear();
        first = false;
      }

      return complete(acc);
    }, (acc, x) => {
      const k = key(x);

      if (ks.has(k)) {
        curr[k] = x;
        currKeys.add(k);

        if (mergeOnly || requiredInputs(ks, currKeys)) {
          acc = reduce(acc, curr);
          first = false;

          if (reset) {
            curr = {};
            currKeys.clear();
          } else {
            curr = Object.assign({}, curr);
          }
        }
      }

      return acc;
    }];
  });
}

const requiredInputs = (required, curr) => {
  if (curr.size < required.size) return false;

  for (let id of required) {
    if (!curr.has(id)) return false;
  }

  return true;
};
},{"@thi.ng/checks":"node_modules/@thi.ng/checks/index.js","@thi.ng/compose":"node_modules/@thi.ng/compose/index.js","../iterator":"node_modules/@thi.ng/transducers/iterator.js"}],"node_modules/@thi.ng/transducers/xform/pluck.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pluck = pluck;

var _iterator = require("../iterator");

var _map = require("./map");

function pluck(key, src) {
  return src ? (0, _iterator.iterator1)(pluck(key), src) : (0, _map.map)(x => x[key]);
}
},{"../iterator":"node_modules/@thi.ng/transducers/iterator.js","./map":"node_modules/@thi.ng/transducers/xform/map.js"}],"node_modules/@thi.ng/transducers/xform/sample.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sample = sample;

var _random = require("@thi.ng/random");

var _compr = require("../func/compr");

var _iterator = require("../iterator");

function sample(...args) {
  const iter = (0, _iterator.$iter)(sample, args);

  if (iter) {
    return iter;
  }

  const prob = args[0];
  const rnd = args[1] || _random.SYSTEM;
  return rfn => {
    const r = rfn[2];
    return (0, _compr.compR)(rfn, (acc, x) => rnd.float() < prob ? r(acc, x) : acc);
  };
}
},{"@thi.ng/random":"node_modules/@thi.ng/random/index.js","../func/compr":"node_modules/@thi.ng/transducers/func/compr.js","../iterator":"node_modules/@thi.ng/transducers/iterator.js"}],"node_modules/@thi.ng/transducers/xform/scan.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scan = scan;

var _iterator = require("../iterator");

var _reduced = require("../reduced");

function scan(...args) {
  return args.length > 2 && (0, _iterator.$iter)(scan, args, _iterator.iterator) || (([inito, completeo, reduceo]) => {
    const [initi, completei, reducei] = args[0];
    let acc = args.length > 1 && args[1] != null ? args[1] : initi();
    return [inito, _acc => {
      let a = completei(acc);

      if (a !== acc) {
        _acc = (0, _reduced.unreduced)(reduceo(_acc, a));
      }

      acc = a;
      return completeo(_acc);
    }, (_acc, x) => {
      acc = reducei(acc, x);

      if ((0, _reduced.isReduced)(acc)) {
        return (0, _reduced.ensureReduced)(reduceo(_acc, acc.deref()));
      }

      return reduceo(_acc, acc);
    }];
  });
}
},{"../iterator":"node_modules/@thi.ng/transducers/iterator.js","../reduced":"node_modules/@thi.ng/transducers/reduced.js"}],"node_modules/@thi.ng/transducers/func/key-selector.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.keySelector = void 0;

var _renamer = require("./renamer");

const keySelector = keys => (0, _renamer.renamer)(keys.reduce((acc, x) => (acc[x] = x, acc), {}));

exports.keySelector = keySelector;
},{"./renamer":"node_modules/@thi.ng/transducers/func/renamer.js"}],"node_modules/@thi.ng/transducers/xform/select-keys.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectKeys = selectKeys;

var _keySelector = require("../func/key-selector");

var _iterator = require("../iterator");

var _map = require("./map");

function selectKeys(keys, src) {
  return src ? (0, _iterator.iterator1)(selectKeys(keys), src) : (0, _map.map)((0, _keySelector.keySelector)(keys));
}
},{"../func/key-selector":"node_modules/@thi.ng/transducers/func/key-selector.js","../iterator":"node_modules/@thi.ng/transducers/iterator.js","./map":"node_modules/@thi.ng/transducers/xform/map.js"}],"node_modules/@thi.ng/transducers/xform/side-effect.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sideEffect = void 0;

var _map = require("./map");

/**
 * Helper transducer. Applies given `fn` to each input value, presumably
 * for side effects. Discards function's result and yields original
 * inputs.
 *
 * @param fn side effect
 */
const sideEffect = fn => (0, _map.map)(x => (fn(x), x));

exports.sideEffect = sideEffect;
},{"./map":"node_modules/@thi.ng/transducers/xform/map.js"}],"node_modules/@thi.ng/transducers/xform/sliding-window.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.slidingWindow = slidingWindow;

var _compr = require("../func/compr");

var _iterator = require("../iterator");

function slidingWindow(...args) {
  const iter = (0, _iterator.$iter)(slidingWindow, args);

  if (iter) {
    return iter;
  }

  const size = args[0];
  const partial = args[1] !== false;
  return rfn => {
    const reduce = rfn[2];
    let buf = [];
    return (0, _compr.compR)(rfn, (acc, x) => {
      buf.push(x);

      if (partial || buf.length === size) {
        acc = reduce(acc, buf);
        buf = buf.slice(buf.length === size ? 1 : 0);
      }

      return acc;
    });
  };
}
},{"../func/compr":"node_modules/@thi.ng/transducers/func/compr.js","../iterator":"node_modules/@thi.ng/transducers/iterator.js"}],"node_modules/@thi.ng/transducers/xform/stream-shuffle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.streamShuffle = streamShuffle;

var _arrays = require("@thi.ng/arrays");

var _iterator = require("../iterator");

var _reduced = require("../reduced");

function streamShuffle(...args) {
  return (0, _iterator.$iter)(streamShuffle, args, _iterator.iterator) || (([init, complete, reduce]) => {
    const n = args[0];
    const maxSwaps = args[1] || n;
    const buf = [];
    return [init, acc => {
      while (buf.length && !(0, _reduced.isReduced)(acc)) {
        (0, _arrays.shuffle)(buf, maxSwaps);
        acc = reduce(acc, buf.shift());
      }

      acc = complete(acc);
      return acc;
    }, (acc, x) => {
      buf.push(x);
      (0, _arrays.shuffle)(buf, maxSwaps);

      if (buf.length === n) {
        acc = reduce(acc, buf.shift());
      }

      return acc;
    }];
  });
}
},{"@thi.ng/arrays":"node_modules/@thi.ng/arrays/index.js","../iterator":"node_modules/@thi.ng/transducers/iterator.js","../reduced":"node_modules/@thi.ng/transducers/reduced.js"}],"node_modules/@thi.ng/transducers/xform/stream-sort.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.streamSort = streamSort;

var _arrays = require("@thi.ng/arrays");

var _compare = require("@thi.ng/compare");

var _compose = require("@thi.ng/compose");

var _iterator = require("../iterator");

var _reduced = require("../reduced");

function streamSort(...args) {
  const iter = (0, _iterator.$iter)(streamSort, args, _iterator.iterator);

  if (iter) {
    return iter;
  }

  const {
    key,
    compare
  } = Object.assign({
    key: _compose.identity,
    compare: _compare.compare
  }, args[1]);
  const n = args[0];
  return ([init, complete, reduce]) => {
    const buf = [];
    return [init, acc => {
      while (buf.length && !(0, _reduced.isReduced)(acc)) {
        acc = reduce(acc, buf.shift());
      }

      return complete(acc);
    }, (acc, x) => {
      const idx = (0, _arrays.binarySearch)(buf, x, key, compare);
      buf.splice(idx < 0 ? -(idx + 1) : idx, 0, x);

      if (buf.length === n) {
        acc = reduce(acc, buf.shift());
      }

      return acc;
    }];
  };
}
},{"@thi.ng/arrays":"node_modules/@thi.ng/arrays/index.js","@thi.ng/compare":"node_modules/@thi.ng/compare/index.js","@thi.ng/compose":"node_modules/@thi.ng/compose/index.js","../iterator":"node_modules/@thi.ng/transducers/iterator.js","../reduced":"node_modules/@thi.ng/transducers/reduced.js"}],"node_modules/@thi.ng/transducers/xform/struct.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.struct = struct;

var _comp = require("../func/comp");

var _iterator = require("../iterator");

var _mapKeys = require("./map-keys");

var _partition = require("./partition");

var _partitionOf = require("./partition-of");

var _rename = require("./rename");

function struct(fields, src) {
  return src ? (0, _iterator.iterator)(struct(fields), src) : (0, _comp.comp)((0, _partitionOf.partitionOf)(fields.map(f => f[1])), (0, _partition.partition)(fields.length), (0, _rename.rename)(fields.map(f => f[0])), (0, _mapKeys.mapKeys)(fields.reduce((acc, f) => f[2] ? (acc[f[0]] = f[2], acc) : acc, {}), false));
}
},{"../func/comp":"node_modules/@thi.ng/transducers/func/comp.js","../iterator":"node_modules/@thi.ng/transducers/iterator.js","./map-keys":"node_modules/@thi.ng/transducers/xform/map-keys.js","./partition":"node_modules/@thi.ng/transducers/xform/partition.js","./partition-of":"node_modules/@thi.ng/transducers/xform/partition-of.js","./rename":"node_modules/@thi.ng/transducers/xform/rename.js"}],"node_modules/@thi.ng/transducers/xform/swizzle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.swizzle = swizzle;

var _arrays = require("@thi.ng/arrays");

var _iterator = require("../iterator");

var _map = require("./map");

function swizzle(order, src) {
  return src ? (0, _iterator.iterator1)(swizzle(order), src) : (0, _map.map)((0, _arrays.swizzle)(order));
}
},{"@thi.ng/arrays":"node_modules/@thi.ng/arrays/index.js","../iterator":"node_modules/@thi.ng/transducers/iterator.js","./map":"node_modules/@thi.ng/transducers/xform/map.js"}],"node_modules/@thi.ng/transducers/xform/take-nth.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.takeNth = takeNth;

var _iterator = require("../iterator");

var _throttle = require("./throttle");

function takeNth(n, src) {
  if (src) {
    return (0, _iterator.iterator1)(takeNth(n), src);
  }

  n = Math.max(0, n - 1);
  return (0, _throttle.throttle)(() => {
    let skip = 0;
    return () => skip === 0 ? (skip = n, true) : (skip--, false);
  });
}
},{"../iterator":"node_modules/@thi.ng/transducers/iterator.js","./throttle":"node_modules/@thi.ng/transducers/xform/throttle.js"}],"node_modules/@thi.ng/transducers/xform/take-while.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.takeWhile = takeWhile;

var _compr = require("../func/compr");

var _iterator = require("../iterator");

var _reduced = require("../reduced");

function takeWhile(...args) {
  return (0, _iterator.$iter)(takeWhile, args) || (rfn => {
    const r = rfn[2];
    const pred = args[0];
    let ok = true;
    return (0, _compr.compR)(rfn, (acc, x) => (ok = ok && pred(x)) ? r(acc, x) : (0, _reduced.reduced)(acc));
  });
}
},{"../func/compr":"node_modules/@thi.ng/transducers/func/compr.js","../iterator":"node_modules/@thi.ng/transducers/iterator.js","../reduced":"node_modules/@thi.ng/transducers/reduced.js"}],"node_modules/@thi.ng/transducers/xform/throttle-time.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.throttleTime = throttleTime;

var _iterator = require("../iterator");

var _throttle = require("./throttle");

function throttleTime(delay, src) {
  return src ? (0, _iterator.iterator1)(throttleTime(delay), src) : (0, _throttle.throttle)(() => {
    let last = 0;
    return () => {
      const t = Date.now();
      return t - last >= delay ? (last = t, true) : false;
    };
  });
}
},{"../iterator":"node_modules/@thi.ng/transducers/iterator.js","./throttle":"node_modules/@thi.ng/transducers/xform/throttle.js"}],"node_modules/@thi.ng/transducers/xform/toggle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toggle = toggle;

var _iterator = require("../iterator");

function toggle(on, off, initial = false, src) {
  return src ? (0, _iterator.iterator1)(toggle(on, off, initial), src) : ([init, complete, reduce]) => {
    let state = initial;
    return [init, complete, acc => reduce(acc, (state = !state) ? on : off)];
  };
}
},{"../iterator":"node_modules/@thi.ng/transducers/iterator.js"}],"node_modules/@thi.ng/transducers/xform/trace.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.trace = void 0;

var _sideEffect = require("./side-effect");

const trace = (prefix = "") => (0, _sideEffect.sideEffect)(x => console.log(prefix, x));

exports.trace = trace;
},{"./side-effect":"node_modules/@thi.ng/transducers/xform/side-effect.js"}],"node_modules/@thi.ng/transducers/xform/word-wrap.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wordWrap = wordWrap;

var _iterator = require("../iterator");

var _partitionBy = require("./partition-by");

function wordWrap(...args) {
  const iter = (0, _iterator.$iter)(wordWrap, args, _iterator.iterator);

  if (iter) {
    return iter;
  }

  const lineLength = args[0];
  const {
    delim,
    always
  } = Object.assign({
    delim: 1,
    always: true
  }, args[1]);
  return (0, _partitionBy.partitionBy)(() => {
    let n = 0;
    let flag = false;
    return w => {
      n += w.length + delim;

      if (n > lineLength + (always ? 0 : delim)) {
        flag = !flag;
        n = w.length + delim;
      }

      return flag;
    };
  }, true);
}
},{"../iterator":"node_modules/@thi.ng/transducers/iterator.js","./partition-by":"node_modules/@thi.ng/transducers/xform/partition-by.js"}],"node_modules/@thi.ng/transducers/func/juxtr.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.juxtR = juxtR;

var _reduced = require("../reduced");

function juxtR(...rs) {
  let [a, b, c] = rs;
  const n = rs.length;

  switch (n) {
    case 1:
      {
        const r = a[2];
        return [() => [a[0]()], acc => [a[1](acc[0])], (acc, x) => {
          const aa1 = r(acc[0], x);

          if ((0, _reduced.isReduced)(aa1)) {
            return (0, _reduced.reduced)([(0, _reduced.unreduced)(aa1)]);
          }

          return [aa1];
        }];
      }

    case 2:
      {
        const ra = a[2];
        const rb = b[2];
        return [() => [a[0](), b[0]()], acc => [a[1](acc[0]), b[1](acc[1])], (acc, x) => {
          const aa1 = ra(acc[0], x);
          const aa2 = rb(acc[1], x);

          if ((0, _reduced.isReduced)(aa1) || (0, _reduced.isReduced)(aa2)) {
            return (0, _reduced.reduced)([(0, _reduced.unreduced)(aa1), (0, _reduced.unreduced)(aa2)]);
          }

          return [aa1, aa2];
        }];
      }

    case 3:
      {
        const ra = a[2];
        const rb = b[2];
        const rc = c[2];
        return [() => [a[0](), b[0](), c[0]()], acc => [a[1](acc[0]), b[1](acc[1]), c[1](acc[2])], (acc, x) => {
          const aa1 = ra(acc[0], x);
          const aa2 = rb(acc[1], x);
          const aa3 = rc(acc[2], x);

          if ((0, _reduced.isReduced)(aa1) || (0, _reduced.isReduced)(aa2) || (0, _reduced.isReduced)(aa3)) {
            return (0, _reduced.reduced)([(0, _reduced.unreduced)(aa1), (0, _reduced.unreduced)(aa2), (0, _reduced.unreduced)(aa3)]);
          }

          return [aa1, aa2, aa3];
        }];
      }

    default:
      return [() => rs.map(r => r[0]()), acc => rs.map((r, i) => r[1](acc[i])), (acc, x) => {
        let done = false;
        const res = [];

        for (let i = 0; i < n; i++) {
          let a = rs[i][2](acc[i], x);

          if ((0, _reduced.isReduced)(a)) {
            done = true;
            a = (0, _reduced.unreduced)(a);
          }

          res[i] = a;
        }

        return done ? (0, _reduced.reduced)(res) : res;
      }];
  }
}
},{"../reduced":"node_modules/@thi.ng/transducers/reduced.js"}],"node_modules/@thi.ng/transducers/func/lookup.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lookup3d = exports.lookup2d = exports.lookup1d = void 0;

/**
 * Returns function accepting a single index arg used to
 * lookup value in given array. No bounds checks are done.
 *
 * ```
 * [...map(lookup1d([10, 20, 30]), [2,0,1])]
 * // [ 30, 10, 20 ]
 * ```
 *
 * @param src source data
 */
const lookup1d = src => i => src[i];
/**
 * Returns function accepting a single `[x, y]` index tuple,
 * used to lookup value in given array. Useful for transducers
 * processing 2D data. **Note**: The source data MUST be in
 * row major linearized format, i.e. 1D representation of 2D data
 * (pixel buffer). No bounds checks are done.
 *
 * ```
 * [...map(lookup2d([...range(9)], 3), range2d(2, -1, 0, 3))]
 * // [ 2, 1, 0, 5, 4, 3, 8, 7, 6 ]
 * ```
 *
 * @param src source data
 * @param width number of items along X (columns)
 */


exports.lookup1d = lookup1d;

const lookup2d = (src, width) => i => src[i[0] + i[1] * width];
/**
 * Same as `lookup2d()`, but for 3D data. The index ordering of the
 * source data MUST be in Z, Y, X order (i.e. a stack of row major 2D slices).
 * No bounds checks are done.
 *
 * @param src source data
 * @param width number of items along X (columns)
 * @param height number of items along Y (rows)
 */


exports.lookup2d = lookup2d;

const lookup3d = (src, width, height) => {
  const stridez = width * height;
  return i => src[i[0] + i[1] * width + i[2] * stridez];
};

exports.lookup3d = lookup3d;
},{}],"node_modules/@thi.ng/transducers/iter/as-iterable.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.asIterable = asIterable;

/**
 * Helper function to (re)provide given iterable in iterator form.
 *
 * @param src
 */
function* asIterable(src) {
  yield* src;
}
},{}],"node_modules/@thi.ng/transducers/iter/repeatedly.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.repeatedly = repeatedly;

function* repeatedly(fn, n = Infinity) {
  while (n-- > 0) {
    yield fn();
  }
}
},{}],"node_modules/@thi.ng/transducers/iter/choices.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.choices = void 0;

var _arrays = require("@thi.ng/arrays");

var _random = require("@thi.ng/random");

var _repeatedly = require("./repeatedly");

/**
 * Returns an infinite iterator of random choices and their (optional)
 * weights. If `weights` is given, it must have at least the same size
 * as `choices`. If omitted, each choice will have same probability.
 *
 * ```
 * transduce(take(1000), frequencies(), choices("abcd", [1, 0.5, 0.25, 0.125]))
 * // Map { 'c' => 132, 'a' => 545, 'b' => 251, 'd' => 72 }
 * ```
 *
 * @see weightedRandom
 *
 * @param choices
 * @param weights
 */
const choices = (choices, weights, rnd = _random.SYSTEM) => (0, _repeatedly.repeatedly)(weights ? (0, _random.weightedRandom)((0, _arrays.ensureArray)(choices), weights, rnd) : () => choices[rnd.float(choices.length) | 0]);

exports.choices = choices;
},{"@thi.ng/arrays":"node_modules/@thi.ng/arrays/index.js","@thi.ng/random":"node_modules/@thi.ng/random/index.js","./repeatedly":"node_modules/@thi.ng/transducers/iter/repeatedly.js"}],"node_modules/@thi.ng/transducers/iter/concat.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.concat = concat;

var _arrays = require("@thi.ng/arrays");

/**
 * Yields iterator producing concatenation of given iterables.
 * Undefined & null inputs are silently ignored, however any
 * such values produced or contained in an input will remain.
 *
 * ```
 * [...concat([1, 2, 3], null, [4, 5])]
 * // [ 1, 2, 3, 4, 5 ]
 *
 * [...concat([1, 2, 3, undefined], null, [4, 5])]
 * // [ 1, 2, 3, undefined, 4, 5 ]
 * ```
 *
 * @param xs
 */
function* concat(...xs) {
  for (let x of xs) {
    x != null && (yield* (0, _arrays.ensureIterable)(x));
  }
}
},{"@thi.ng/arrays":"node_modules/@thi.ng/arrays/index.js"}],"node_modules/@thi.ng/transducers/iter/cycle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cycle = cycle;

function* cycle(input) {
  let cache = [];

  for (let i of input) {
    cache.push(i);
    yield i;
  }

  if (cache.length > 0) {
    while (true) {
      yield* cache;
    }
  }
}
},{}],"node_modules/@thi.ng/transducers/iter/norm-range.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.normRange = normRange;

/**
 * Yields sequence of `n+1` monotonically increasing numbers in the
 * closed interval (0.0 .. 1.0). If `n <= 0`, yields nothing.
 *
 * ```
 * [...normRange(4)]
 * // [0, 0.25, 0.5, 0.75, 1.0]
 * ```
 *
 * @param n number of steps
 * @param inclLast include last value (i.e. `1.0`)
 */
function* normRange(n, inclLast = true) {
  if (n > 0) {
    for (let i = 0, m = inclLast ? n + 1 : n; i < m; i++) {
      yield i / n;
    }
  }
}
},{}],"node_modules/@thi.ng/transducers/iter/repeat.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.repeat = repeat;

function* repeat(x, n = Infinity) {
  while (n-- > 0) {
    yield x;
  }
}
},{}],"node_modules/@thi.ng/transducers/iter/interpolate.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.interpolate = interpolate;

var _normRange = require("./norm-range");

var _repeat = require("./repeat");

/**
 * Takes a number of keyframe tuples (`stops`) and yields a sequence of
 * `n+1` equally spaced, interpolated values. Keyframes are defined as
 * `[pos, value]`. Only values in the closed `minPos` .. `maxPos`
 * interval will be computed.
 *
 * Interpolation happens in two stages: First the given `init` function
 * is called to transform/prepare pairs of consecutive keyframes into a
 * single interval (user defined). Then to produce each interpolated
 * value calls `mix` with the currently active interval and
 * interpolation time value `t` (re-normalized and relative to current
 * interval). The iterator yields results of these `mix()` function
 * calls.
 *
 * Depending on the overall number of samples requested and the distance
 * between keyframes, some keyframes MIGHT be skipped. E.g. if
 * requesting 10 samples within [0,1], the interval between two
 * successive keyframes at 0.12 and 0.19 would be skipped entirely,
 * since samples will only be taken at multiples of `1/n` (0.0, 0.1,
 * 0.2... in this example).
 *
 * The given keyframe positions can lie outside the `minPos`/`maxPos`
 * range and also don't need to cover the range fully. In the latter
 * case, interpolated values before the first or after the last keyframe
 * will yield the value of the 1st/last keyframe. If only a single
 * keyframe is given in total, all `n` yielded samples will be that
 * keyframe's transformed value.
 *
 * ```
 * [...interpolate(
 *   10,
 *   0,
 *   100,
 *   (a, b) => [a, b],
 *   ([a, b], t) => Math.floor(a + (b - a) * t),
 *   [20, 100],
 *   [50, 200],
 *   [80, 0]
 * )]
 * // [ 100, 100, 100, 133, 166, 200, 133, 66, 0, 0, 0 ]
 * ```
 *
 * Using easing functions (e.g. from thi.ng/math), non-linear
 * interpolation within each keyframe interval can be achieved:
 *
 * ```
 * import { mix, smoothStep } from "@thi.ng/math"
 *
 * [...interpolate(
 *   10,
 *   0,
 *   100,
 *   (a, b) => [a, b],
 *   ([a, b], t) => Math.floor(mix(a, b, smoothStep(0.1, 0.9, t))),
 *   [20, 100],
 *   [50, 200],
 *   [80, 0]
 * )]
 * // [ 100, 100, 100, 120, 179, 200, 158, 41, 0, 0, 0 ]
 * ```
 *
 * @param n
 * @param minPos
 * @param maxPos
 * @param init interval producer (from 2 keyframe values)
 * @param mix interval interpolator
 * @param stops keyframe / stops
 */
function* interpolate(n, minPos, maxPos, init, mix, ...stops) {
  let l = stops.length;
  if (l < 1) return;

  if (l === 1) {
    yield* (0, _repeat.repeat)(mix(init(stops[0][1], stops[0][1]), 0), n);
  }

  stops.sort((a, b) => a[0] - b[0]);

  if (stops[l - 1][0] < maxPos) {
    stops.push([maxPos, stops[l - 1][1]]);
  }

  if (stops[0][0] > minPos) {
    stops.unshift([minPos, stops[0][1]]);
  }

  const range = maxPos - minPos;
  let start = stops[0][0];
  let end = stops[1][0];
  let delta = end - start;
  let interval = init(stops[0][1], stops[1][1]);
  let i = 1;
  l = stops.length;

  for (let t of (0, _normRange.normRange)(n)) {
    t = minPos + range * t;

    if (t > end) {
      while (i < l && t > stops[i][0]) i++;

      start = stops[i - 1][0];
      end = stops[i][0];
      delta = end - start;
      interval = init(stops[i - 1][1], stops[i][1]);
    }

    yield mix(interval, delta !== 0 ? (t - start) / delta : 0);
  }
}
},{"./norm-range":"node_modules/@thi.ng/transducers/iter/norm-range.js","./repeat":"node_modules/@thi.ng/transducers/iter/repeat.js"}],"node_modules/@thi.ng/transducers/iter/iterate.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.iterate = iterate;

/**
 * Yields an infinite iterator of the inductive sequence:
 *
 * f(x+1) = f(f(x))
 *
 * The first value emitted always is `seed` itself, then f(seed),
 * f(f(seed)) etc. The given function is called with the current
 * iteration counter as 2nd arg.
 *
 * ```
 * [...take(5, iterate((x) => x * 2, 1))]
 * // [ 1, 2, 4, 8, 16 ]
 *
 * [...take(8, iterate((x, i) => x * 10 + i, 0))]
 * // [ 0, 1, 12, 123, 1234, 12345, 123456, 1234567 ]
 * ```
 *
 * @param fn
 * @param seed
 */
function* iterate(fn, seed) {
  let i = 0;

  while (true) {
    yield seed;
    seed = fn(seed, ++i);
  }
}
},{}],"node_modules/@thi.ng/transducers/iter/keys.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.keys = keys;

function* keys(x) {
  for (let k in x) {
    if (x.hasOwnProperty(k)) {
      yield k;
    }
  }
}
},{}],"node_modules/@thi.ng/transducers/iter/pairs.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pairs = pairs;

function* pairs(x) {
  for (let k in x) {
    if (x.hasOwnProperty(k)) {
      yield [k, x[k]];
    }
  }
}
},{}],"node_modules/@thi.ng/transducers/iter/permutations.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.permutations = permutations;
exports.permutationsN = void 0;

var _arrays = require("@thi.ng/arrays");

var _errors = require("@thi.ng/errors");

var _range = require("./range");

function* permutations(...src) {
  const n = src.length - 1;

  if (n < 0) {
    return;
  }

  const step = new Array(n + 1).fill(0);
  const realized = src.map(_arrays.ensureArrayLike);
  const total = realized.reduce((acc, x) => acc * x.length, 1);

  for (let i = 0; i < total; i++) {
    const tuple = [];

    for (let j = n; j >= 0; j--) {
      const r = realized[j];
      let s = step[j];

      if (s === r.length) {
        step[j] = s = 0;
        j > 0 && step[j - 1]++;
      }

      tuple[j] = r[s];
    }

    step[n]++;
    yield tuple;
  }
}
/**
 * Iterator yielding the Cartesian Product for `n` items of `m` values
 * each. If `m` is not given, defaults to value of `n`. The range of `m`
 * is `0..m-1`. The optional `offsets` array can be used to define start
 * values for each dimension.
 *
 * ```
 * [...permutationsN(2)]
 * // [ [0, 0], [0, 1], [1, 0], [1, 1] ]
 *
 * [...permutationsN(2, 3)]
 * // [ [0, 0], [0, 1], [0, 2],
 * //   [1, 0], [1, 1], [1, 2],
 * //   [2, 0], [2, 1], [2, 2] ]
 *
 * [...permutationsN(2, 3, [10, 20])]
 * // [ [ 10, 20 ], [ 10, 21 ], [ 11, 20 ], [ 11, 21 ] ]
 * ```
 *
 * @param n
 * @param m
 * @param offsets
 */


const permutationsN = (n, m = n, offsets) => {
  if (offsets && offsets.length < n) {
    (0, _errors.illegalArgs)(`insufficient offsets, got ${offsets.length}, needed ${n}`);
  }

  const seqs = [];

  while (--n >= 0) {
    const o = offsets ? offsets[n] : 0;
    seqs[n] = (0, _range.range)(o, o + m);
  }

  return permutations.apply(null, seqs);
};

exports.permutationsN = permutationsN;
},{"@thi.ng/arrays":"node_modules/@thi.ng/arrays/index.js","@thi.ng/errors":"node_modules/@thi.ng/errors/index.js","./range":"node_modules/@thi.ng/transducers/iter/range.js"}],"node_modules/@thi.ng/transducers/iter/range3d.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.range3d = range3d;

var _errors = require("@thi.ng/errors");

var _range = require("./range");

function* range3d(...args) {
  let fromX, toX, fromY, toY, fromZ, toZ, stepX, stepY, stepZ;

  switch (args.length) {
    case 9:
      stepX = args[6];
      stepY = args[7];
      stepZ = args[8];

    case 6:
      [fromX, toX, fromY, toY, fromZ, toZ] = args;
      break;

    case 3:
      [toX, toY, toZ] = args;
      fromX = fromY = fromZ = 0;
      break;

    default:
      (0, _errors.illegalArity)(args.length);
  }

  const rx = (0, _range.range)(fromX, toX, stepX);
  const ry = (0, _range.range)(fromY, toY, stepY);

  for (let z of (0, _range.range)(fromZ, toZ, stepZ)) {
    for (let y of ry) {
      for (let x of rx) {
        yield [x, y, z];
      }
    }
  }
}
},{"@thi.ng/errors":"node_modules/@thi.ng/errors/index.js","./range":"node_modules/@thi.ng/transducers/iter/range.js"}],"node_modules/@thi.ng/transducers/iter/reverse.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reverse = reverse;

var _arrays = require("@thi.ng/arrays");

/**
 * Yields iterator which consumes input and yield its values in reverse
 * order. Important: Input MUST be finite.
 *
 * ```
 * [...tx.reverse("hello world")]
 * // [ "d", "l", "r", "o", "w", " ", "o", "l", "l", "e", "h" ]
 * ```
 *
 * @param input
 */
function* reverse(input) {
  const _input = (0, _arrays.ensureArray)(input);

  let n = _input.length;

  while (--n >= 0) {
    yield _input[n];
  }
}
},{"@thi.ng/arrays":"node_modules/@thi.ng/arrays/index.js"}],"node_modules/@thi.ng/transducers/iter/vals.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.vals = vals;

function* vals(x) {
  for (let k in x) {
    if (x.hasOwnProperty(k)) {
      yield x[k];
    }
  }
}
},{}],"node_modules/@thi.ng/transducers/iter/wrap.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wrap = wrap;

var _arrays = require("@thi.ng/arrays");

var _errors = require("@thi.ng/errors");

/**
 * Yields iterator of `src` with the last `n` values of `src` prepended
 * at the beginning (if `left` is truthy) and/or the first `n` values
 * appended at the end (if `right` is truthy). Wraps both sides by
 * default and throws error if `n` < 0 or larger than `src.length`.
 *
 * @param src
 * @param n
 * @param left
 * @param right
 */
function* wrap(src, n = 1, left = true, right = true) {
  const _src = (0, _arrays.ensureArray)(src);

  (n < 0 || n > _src.length) && (0, _errors.illegalArgs)(`wrong number of wrap items: got ${n}, but max: ${_src.length}`);

  if (left) {
    for (let m = _src.length, i = m - n; i < m; i++) {
      yield _src[i];
    }
  }

  yield* _src;

  if (right) {
    for (let i = 0; i < n; i++) {
      yield _src[i];
    }
  }
}
},{"@thi.ng/arrays":"node_modules/@thi.ng/arrays/index.js","@thi.ng/errors":"node_modules/@thi.ng/errors/index.js"}],"node_modules/@thi.ng/transducers/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _iterator = require("./iterator");

Object.keys(_iterator).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _iterator[key];
    }
  });
});

var _reduce = require("./reduce");

Object.keys(_reduce).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _reduce[key];
    }
  });
});

var _reduced = require("./reduced");

Object.keys(_reduced).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _reduced[key];
    }
  });
});

var _run = require("./run");

Object.keys(_run).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _run[key];
    }
  });
});

var _step = require("./step");

Object.keys(_step).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _step[key];
    }
  });
});

var _transduce = require("./transduce");

Object.keys(_transduce).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _transduce[key];
    }
  });
});

var _add = require("./rfn/add");

Object.keys(_add).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _add[key];
    }
  });
});

var _assocMap = require("./rfn/assoc-map");

Object.keys(_assocMap).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _assocMap[key];
    }
  });
});

var _assocObj = require("./rfn/assoc-obj");

Object.keys(_assocObj).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _assocObj[key];
    }
  });
});

var _conj = require("./rfn/conj");

Object.keys(_conj).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _conj[key];
    }
  });
});

var _count = require("./rfn/count");

Object.keys(_count).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _count[key];
    }
  });
});

var _div = require("./rfn/div");

Object.keys(_div).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _div[key];
    }
  });
});

var _every = require("./rfn/every");

Object.keys(_every).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _every[key];
    }
  });
});

var _fill = require("./rfn/fill");

Object.keys(_fill).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _fill[key];
    }
  });
});

var _frequencies = require("./rfn/frequencies");

Object.keys(_frequencies).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _frequencies[key];
    }
  });
});

var _groupBinary = require("./rfn/group-binary");

Object.keys(_groupBinary).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _groupBinary[key];
    }
  });
});

var _groupByMap = require("./rfn/group-by-map");

Object.keys(_groupByMap).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _groupByMap[key];
    }
  });
});

var _groupByObj = require("./rfn/group-by-obj");

Object.keys(_groupByObj).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _groupByObj[key];
    }
  });
});

var _last = require("./rfn/last");

Object.keys(_last).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _last[key];
    }
  });
});

var _maxCompare = require("./rfn/max-compare");

Object.keys(_maxCompare).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _maxCompare[key];
    }
  });
});

var _max = require("./rfn/max");

Object.keys(_max).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _max[key];
    }
  });
});

var _mean = require("./rfn/mean");

Object.keys(_mean).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _mean[key];
    }
  });
});

var _minCompare = require("./rfn/min-compare");

Object.keys(_minCompare).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _minCompare[key];
    }
  });
});

var _min = require("./rfn/min");

Object.keys(_min).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _min[key];
    }
  });
});

var _mul = require("./rfn/mul");

Object.keys(_mul).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _mul[key];
    }
  });
});

var _pushCopy = require("./rfn/push-copy");

Object.keys(_pushCopy).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _pushCopy[key];
    }
  });
});

var _push = require("./rfn/push");

Object.keys(_push).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _push[key];
    }
  });
});

var _reductions = require("./rfn/reductions");

Object.keys(_reductions).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _reductions[key];
    }
  });
});

var _some = require("./rfn/some");

Object.keys(_some).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _some[key];
    }
  });
});

var _str = require("./rfn/str");

Object.keys(_str).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _str[key];
    }
  });
});

var _sub = require("./rfn/sub");

Object.keys(_sub).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _sub[key];
    }
  });
});

var _benchmark = require("./xform/benchmark");

Object.keys(_benchmark).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _benchmark[key];
    }
  });
});

var _cat = require("./xform/cat");

Object.keys(_cat).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _cat[key];
    }
  });
});

var _converge = require("./xform/converge");

Object.keys(_converge).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _converge[key];
    }
  });
});

var _convolve = require("./xform/convolve");

Object.keys(_convolve).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _convolve[key];
    }
  });
});

var _dedupe = require("./xform/dedupe");

Object.keys(_dedupe).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _dedupe[key];
    }
  });
});

var _delayed = require("./xform/delayed");

Object.keys(_delayed).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _delayed[key];
    }
  });
});

var _distinct = require("./xform/distinct");

Object.keys(_distinct).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _distinct[key];
    }
  });
});

var _dropNth = require("./xform/drop-nth");

Object.keys(_dropNth).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _dropNth[key];
    }
  });
});

var _dropWhile = require("./xform/drop-while");

Object.keys(_dropWhile).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _dropWhile[key];
    }
  });
});

var _drop = require("./xform/drop");

Object.keys(_drop).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _drop[key];
    }
  });
});

var _duplicate = require("./xform/duplicate");

Object.keys(_duplicate).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _duplicate[key];
    }
  });
});

var _filter = require("./xform/filter");

Object.keys(_filter).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _filter[key];
    }
  });
});

var _filterFuzzy = require("./xform/filter-fuzzy");

Object.keys(_filterFuzzy).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _filterFuzzy[key];
    }
  });
});

var _flattenWith = require("./xform/flatten-with");

Object.keys(_flattenWith).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _flattenWith[key];
    }
  });
});

var _flatten = require("./xform/flatten");

Object.keys(_flatten).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _flatten[key];
    }
  });
});

var _indexed = require("./xform/indexed");

Object.keys(_indexed).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _indexed[key];
    }
  });
});

var _interleave = require("./xform/interleave");

Object.keys(_interleave).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _interleave[key];
    }
  });
});

var _interpose = require("./xform/interpose");

Object.keys(_interpose).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _interpose[key];
    }
  });
});

var _keep = require("./xform/keep");

Object.keys(_keep).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _keep[key];
    }
  });
});

var _labeled = require("./xform/labeled");

Object.keys(_labeled).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _labeled[key];
    }
  });
});

var _mapDeep = require("./xform/map-deep");

Object.keys(_mapDeep).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _mapDeep[key];
    }
  });
});

var _mapIndexed = require("./xform/map-indexed");

Object.keys(_mapIndexed).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _mapIndexed[key];
    }
  });
});

var _mapKeys = require("./xform/map-keys");

Object.keys(_mapKeys).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _mapKeys[key];
    }
  });
});

var _mapNth = require("./xform/map-nth");

Object.keys(_mapNth).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _mapNth[key];
    }
  });
});

var _mapVals = require("./xform/map-vals");

Object.keys(_mapVals).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _mapVals[key];
    }
  });
});

var _map = require("./xform/map");

Object.keys(_map).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _map[key];
    }
  });
});

var _mapcat = require("./xform/mapcat");

Object.keys(_mapcat).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _mapcat[key];
    }
  });
});

var _matchFirst = require("./xform/match-first");

Object.keys(_matchFirst).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _matchFirst[key];
    }
  });
});

var _matchLast = require("./xform/match-last");

Object.keys(_matchLast).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _matchLast[key];
    }
  });
});

var _movingAverage = require("./xform/moving-average");

Object.keys(_movingAverage).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _movingAverage[key];
    }
  });
});

var _movingMedian = require("./xform/moving-median");

Object.keys(_movingMedian).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _movingMedian[key];
    }
  });
});

var _multiplex = require("./xform/multiplex");

Object.keys(_multiplex).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _multiplex[key];
    }
  });
});

var _multiplexObj = require("./xform/multiplex-obj");

Object.keys(_multiplexObj).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _multiplexObj[key];
    }
  });
});

var _noop = require("./xform/noop");

Object.keys(_noop).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _noop[key];
    }
  });
});

var _padLast = require("./xform/pad-last");

Object.keys(_padLast).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _padLast[key];
    }
  });
});

var _page = require("./xform/page");

Object.keys(_page).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _page[key];
    }
  });
});

var _partitionBy = require("./xform/partition-by");

Object.keys(_partitionBy).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _partitionBy[key];
    }
  });
});

var _partitionOf = require("./xform/partition-of");

Object.keys(_partitionOf).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _partitionOf[key];
    }
  });
});

var _partitionSort = require("./xform/partition-sort");

Object.keys(_partitionSort).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _partitionSort[key];
    }
  });
});

var _partitionSync = require("./xform/partition-sync");

Object.keys(_partitionSync).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _partitionSync[key];
    }
  });
});

var _partition = require("./xform/partition");

Object.keys(_partition).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _partition[key];
    }
  });
});

var _pluck = require("./xform/pluck");

Object.keys(_pluck).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _pluck[key];
    }
  });
});

var _rename = require("./xform/rename");

Object.keys(_rename).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _rename[key];
    }
  });
});

var _sample = require("./xform/sample");

Object.keys(_sample).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _sample[key];
    }
  });
});

var _scan = require("./xform/scan");

Object.keys(_scan).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _scan[key];
    }
  });
});

var _selectKeys = require("./xform/select-keys");

Object.keys(_selectKeys).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _selectKeys[key];
    }
  });
});

var _sideEffect = require("./xform/side-effect");

Object.keys(_sideEffect).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _sideEffect[key];
    }
  });
});

var _slidingWindow = require("./xform/sliding-window");

Object.keys(_slidingWindow).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _slidingWindow[key];
    }
  });
});

var _streamShuffle = require("./xform/stream-shuffle");

Object.keys(_streamShuffle).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _streamShuffle[key];
    }
  });
});

var _streamSort = require("./xform/stream-sort");

Object.keys(_streamSort).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _streamSort[key];
    }
  });
});

var _struct = require("./xform/struct");

Object.keys(_struct).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _struct[key];
    }
  });
});

var _swizzle = require("./xform/swizzle");

Object.keys(_swizzle).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _swizzle[key];
    }
  });
});

var _takeNth = require("./xform/take-nth");

Object.keys(_takeNth).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _takeNth[key];
    }
  });
});

var _takeLast = require("./xform/take-last");

Object.keys(_takeLast).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _takeLast[key];
    }
  });
});

var _takeWhile = require("./xform/take-while");

Object.keys(_takeWhile).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _takeWhile[key];
    }
  });
});

var _take = require("./xform/take");

Object.keys(_take).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _take[key];
    }
  });
});

var _throttle = require("./xform/throttle");

Object.keys(_throttle).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _throttle[key];
    }
  });
});

var _throttleTime = require("./xform/throttle-time");

Object.keys(_throttleTime).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _throttleTime[key];
    }
  });
});

var _toggle = require("./xform/toggle");

Object.keys(_toggle).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _toggle[key];
    }
  });
});

var _trace = require("./xform/trace");

Object.keys(_trace).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _trace[key];
    }
  });
});

var _wordWrap = require("./xform/word-wrap");

Object.keys(_wordWrap).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _wordWrap[key];
    }
  });
});

var _comp = require("./func/comp");

Object.keys(_comp).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _comp[key];
    }
  });
});

var _compr = require("./func/compr");

Object.keys(_compr).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _compr[key];
    }
  });
});

var _deepTransform = require("./func/deep-transform");

Object.keys(_deepTransform).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _deepTransform[key];
    }
  });
});

var _juxtr = require("./func/juxtr");

Object.keys(_juxtr).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _juxtr[key];
    }
  });
});

var _keySelector = require("./func/key-selector");

Object.keys(_keySelector).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _keySelector[key];
    }
  });
});

var _lookup = require("./func/lookup");

Object.keys(_lookup).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _lookup[key];
    }
  });
});

var _renamer = require("./func/renamer");

Object.keys(_renamer).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _renamer[key];
    }
  });
});

var _asIterable = require("./iter/as-iterable");

Object.keys(_asIterable).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _asIterable[key];
    }
  });
});

var _choices = require("./iter/choices");

Object.keys(_choices).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _choices[key];
    }
  });
});

var _concat = require("./iter/concat");

Object.keys(_concat).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _concat[key];
    }
  });
});

var _cycle = require("./iter/cycle");

Object.keys(_cycle).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _cycle[key];
    }
  });
});

var _interpolate = require("./iter/interpolate");

Object.keys(_interpolate).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _interpolate[key];
    }
  });
});

var _iterate = require("./iter/iterate");

Object.keys(_iterate).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _iterate[key];
    }
  });
});

var _keys = require("./iter/keys");

Object.keys(_keys).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _keys[key];
    }
  });
});

var _normRange = require("./iter/norm-range");

Object.keys(_normRange).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _normRange[key];
    }
  });
});

var _pairs = require("./iter/pairs");

Object.keys(_pairs).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _pairs[key];
    }
  });
});

var _permutations = require("./iter/permutations");

Object.keys(_permutations).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _permutations[key];
    }
  });
});

var _range = require("./iter/range");

Object.keys(_range).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _range[key];
    }
  });
});

var _range2d = require("./iter/range2d");

Object.keys(_range2d).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _range2d[key];
    }
  });
});

var _range3d = require("./iter/range3d");

Object.keys(_range3d).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _range3d[key];
    }
  });
});

var _repeat = require("./iter/repeat");

Object.keys(_repeat).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _repeat[key];
    }
  });
});

var _repeatedly = require("./iter/repeatedly");

Object.keys(_repeatedly).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _repeatedly[key];
    }
  });
});

var _reverse = require("./iter/reverse");

Object.keys(_reverse).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _reverse[key];
    }
  });
});

var _vals = require("./iter/vals");

Object.keys(_vals).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _vals[key];
    }
  });
});

var _wrap = require("./iter/wrap");

Object.keys(_wrap).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _wrap[key];
    }
  });
});

var _zip = require("./iter/zip");

Object.keys(_zip).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _zip[key];
    }
  });
});
},{"./iterator":"node_modules/@thi.ng/transducers/iterator.js","./reduce":"node_modules/@thi.ng/transducers/reduce.js","./reduced":"node_modules/@thi.ng/transducers/reduced.js","./run":"node_modules/@thi.ng/transducers/run.js","./step":"node_modules/@thi.ng/transducers/step.js","./transduce":"node_modules/@thi.ng/transducers/transduce.js","./rfn/add":"node_modules/@thi.ng/transducers/rfn/add.js","./rfn/assoc-map":"node_modules/@thi.ng/transducers/rfn/assoc-map.js","./rfn/assoc-obj":"node_modules/@thi.ng/transducers/rfn/assoc-obj.js","./rfn/conj":"node_modules/@thi.ng/transducers/rfn/conj.js","./rfn/count":"node_modules/@thi.ng/transducers/rfn/count.js","./rfn/div":"node_modules/@thi.ng/transducers/rfn/div.js","./rfn/every":"node_modules/@thi.ng/transducers/rfn/every.js","./rfn/fill":"node_modules/@thi.ng/transducers/rfn/fill.js","./rfn/frequencies":"node_modules/@thi.ng/transducers/rfn/frequencies.js","./rfn/group-binary":"node_modules/@thi.ng/transducers/rfn/group-binary.js","./rfn/group-by-map":"node_modules/@thi.ng/transducers/rfn/group-by-map.js","./rfn/group-by-obj":"node_modules/@thi.ng/transducers/rfn/group-by-obj.js","./rfn/last":"node_modules/@thi.ng/transducers/rfn/last.js","./rfn/max-compare":"node_modules/@thi.ng/transducers/rfn/max-compare.js","./rfn/max":"node_modules/@thi.ng/transducers/rfn/max.js","./rfn/mean":"node_modules/@thi.ng/transducers/rfn/mean.js","./rfn/min-compare":"node_modules/@thi.ng/transducers/rfn/min-compare.js","./rfn/min":"node_modules/@thi.ng/transducers/rfn/min.js","./rfn/mul":"node_modules/@thi.ng/transducers/rfn/mul.js","./rfn/push-copy":"node_modules/@thi.ng/transducers/rfn/push-copy.js","./rfn/push":"node_modules/@thi.ng/transducers/rfn/push.js","./rfn/reductions":"node_modules/@thi.ng/transducers/rfn/reductions.js","./rfn/some":"node_modules/@thi.ng/transducers/rfn/some.js","./rfn/str":"node_modules/@thi.ng/transducers/rfn/str.js","./rfn/sub":"node_modules/@thi.ng/transducers/rfn/sub.js","./xform/benchmark":"node_modules/@thi.ng/transducers/xform/benchmark.js","./xform/cat":"node_modules/@thi.ng/transducers/xform/cat.js","./xform/converge":"node_modules/@thi.ng/transducers/xform/converge.js","./xform/convolve":"node_modules/@thi.ng/transducers/xform/convolve.js","./xform/dedupe":"node_modules/@thi.ng/transducers/xform/dedupe.js","./xform/delayed":"node_modules/@thi.ng/transducers/xform/delayed.js","./xform/distinct":"node_modules/@thi.ng/transducers/xform/distinct.js","./xform/drop-nth":"node_modules/@thi.ng/transducers/xform/drop-nth.js","./xform/drop-while":"node_modules/@thi.ng/transducers/xform/drop-while.js","./xform/drop":"node_modules/@thi.ng/transducers/xform/drop.js","./xform/duplicate":"node_modules/@thi.ng/transducers/xform/duplicate.js","./xform/filter":"node_modules/@thi.ng/transducers/xform/filter.js","./xform/filter-fuzzy":"node_modules/@thi.ng/transducers/xform/filter-fuzzy.js","./xform/flatten-with":"node_modules/@thi.ng/transducers/xform/flatten-with.js","./xform/flatten":"node_modules/@thi.ng/transducers/xform/flatten.js","./xform/indexed":"node_modules/@thi.ng/transducers/xform/indexed.js","./xform/interleave":"node_modules/@thi.ng/transducers/xform/interleave.js","./xform/interpose":"node_modules/@thi.ng/transducers/xform/interpose.js","./xform/keep":"node_modules/@thi.ng/transducers/xform/keep.js","./xform/labeled":"node_modules/@thi.ng/transducers/xform/labeled.js","./xform/map-deep":"node_modules/@thi.ng/transducers/xform/map-deep.js","./xform/map-indexed":"node_modules/@thi.ng/transducers/xform/map-indexed.js","./xform/map-keys":"node_modules/@thi.ng/transducers/xform/map-keys.js","./xform/map-nth":"node_modules/@thi.ng/transducers/xform/map-nth.js","./xform/map-vals":"node_modules/@thi.ng/transducers/xform/map-vals.js","./xform/map":"node_modules/@thi.ng/transducers/xform/map.js","./xform/mapcat":"node_modules/@thi.ng/transducers/xform/mapcat.js","./xform/match-first":"node_modules/@thi.ng/transducers/xform/match-first.js","./xform/match-last":"node_modules/@thi.ng/transducers/xform/match-last.js","./xform/moving-average":"node_modules/@thi.ng/transducers/xform/moving-average.js","./xform/moving-median":"node_modules/@thi.ng/transducers/xform/moving-median.js","./xform/multiplex":"node_modules/@thi.ng/transducers/xform/multiplex.js","./xform/multiplex-obj":"node_modules/@thi.ng/transducers/xform/multiplex-obj.js","./xform/noop":"node_modules/@thi.ng/transducers/xform/noop.js","./xform/pad-last":"node_modules/@thi.ng/transducers/xform/pad-last.js","./xform/page":"node_modules/@thi.ng/transducers/xform/page.js","./xform/partition-by":"node_modules/@thi.ng/transducers/xform/partition-by.js","./xform/partition-of":"node_modules/@thi.ng/transducers/xform/partition-of.js","./xform/partition-sort":"node_modules/@thi.ng/transducers/xform/partition-sort.js","./xform/partition-sync":"node_modules/@thi.ng/transducers/xform/partition-sync.js","./xform/partition":"node_modules/@thi.ng/transducers/xform/partition.js","./xform/pluck":"node_modules/@thi.ng/transducers/xform/pluck.js","./xform/rename":"node_modules/@thi.ng/transducers/xform/rename.js","./xform/sample":"node_modules/@thi.ng/transducers/xform/sample.js","./xform/scan":"node_modules/@thi.ng/transducers/xform/scan.js","./xform/select-keys":"node_modules/@thi.ng/transducers/xform/select-keys.js","./xform/side-effect":"node_modules/@thi.ng/transducers/xform/side-effect.js","./xform/sliding-window":"node_modules/@thi.ng/transducers/xform/sliding-window.js","./xform/stream-shuffle":"node_modules/@thi.ng/transducers/xform/stream-shuffle.js","./xform/stream-sort":"node_modules/@thi.ng/transducers/xform/stream-sort.js","./xform/struct":"node_modules/@thi.ng/transducers/xform/struct.js","./xform/swizzle":"node_modules/@thi.ng/transducers/xform/swizzle.js","./xform/take-nth":"node_modules/@thi.ng/transducers/xform/take-nth.js","./xform/take-last":"node_modules/@thi.ng/transducers/xform/take-last.js","./xform/take-while":"node_modules/@thi.ng/transducers/xform/take-while.js","./xform/take":"node_modules/@thi.ng/transducers/xform/take.js","./xform/throttle":"node_modules/@thi.ng/transducers/xform/throttle.js","./xform/throttle-time":"node_modules/@thi.ng/transducers/xform/throttle-time.js","./xform/toggle":"node_modules/@thi.ng/transducers/xform/toggle.js","./xform/trace":"node_modules/@thi.ng/transducers/xform/trace.js","./xform/word-wrap":"node_modules/@thi.ng/transducers/xform/word-wrap.js","./func/comp":"node_modules/@thi.ng/transducers/func/comp.js","./func/compr":"node_modules/@thi.ng/transducers/func/compr.js","./func/deep-transform":"node_modules/@thi.ng/transducers/func/deep-transform.js","./func/juxtr":"node_modules/@thi.ng/transducers/func/juxtr.js","./func/key-selector":"node_modules/@thi.ng/transducers/func/key-selector.js","./func/lookup":"node_modules/@thi.ng/transducers/func/lookup.js","./func/renamer":"node_modules/@thi.ng/transducers/func/renamer.js","./iter/as-iterable":"node_modules/@thi.ng/transducers/iter/as-iterable.js","./iter/choices":"node_modules/@thi.ng/transducers/iter/choices.js","./iter/concat":"node_modules/@thi.ng/transducers/iter/concat.js","./iter/cycle":"node_modules/@thi.ng/transducers/iter/cycle.js","./iter/interpolate":"node_modules/@thi.ng/transducers/iter/interpolate.js","./iter/iterate":"node_modules/@thi.ng/transducers/iter/iterate.js","./iter/keys":"node_modules/@thi.ng/transducers/iter/keys.js","./iter/norm-range":"node_modules/@thi.ng/transducers/iter/norm-range.js","./iter/pairs":"node_modules/@thi.ng/transducers/iter/pairs.js","./iter/permutations":"node_modules/@thi.ng/transducers/iter/permutations.js","./iter/range":"node_modules/@thi.ng/transducers/iter/range.js","./iter/range2d":"node_modules/@thi.ng/transducers/iter/range2d.js","./iter/range3d":"node_modules/@thi.ng/transducers/iter/range3d.js","./iter/repeat":"node_modules/@thi.ng/transducers/iter/repeat.js","./iter/repeatedly":"node_modules/@thi.ng/transducers/iter/repeatedly.js","./iter/reverse":"node_modules/@thi.ng/transducers/iter/reverse.js","./iter/vals":"node_modules/@thi.ng/transducers/iter/vals.js","./iter/wrap":"node_modules/@thi.ng/transducers/iter/wrap.js","./iter/zip":"node_modules/@thi.ng/transducers/iter/zip.js"}],"node_modules/@thi.ng/rstream/utils/idgen.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nextID = void 0;
let NEXT_ID = 0;

const nextID = () => NEXT_ID++;

exports.nextID = nextID;
},{}],"node_modules/@thi.ng/rstream/subscription.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Subscription = exports.subscription = void 0;

var _api = require("@thi.ng/api");

var _checks = require("@thi.ng/checks");

var _errors = require("@thi.ng/errors");

var _transducers = require("@thi.ng/transducers");

var _api2 = require("./api");

var _idgen = require("./utils/idgen");

/**
 * Creates a new `Subscription` instance, the fundamental datatype &
 * building block provided by this package (`Stream`s are
 * `Subscription`s too). Subscriptions can be:
 *
 * - linked into directed graphs (if async, not necessarily DAGs)
 * - transformed using transducers (incl. early termination)
 * - can have any number of subscribers (optionally each w/ their own
 *   transducer)
 * - recursively unsubscribe themselves from parent after their last
 *   subscriber unsubscribed
 * - will go into a non-recoverable error state if NONE of the
 *   subscribers has an error handler itself
 * - implement the @thi.ng/api `IDeref` interface
 *
 * ```
 * // as reactive value mechanism (same as with stream() above)
 * s = rs.subscription();
 * s.subscribe(trace("s1"));
 * s.subscribe(trace("s2"), tx.filter((x) => x > 25));
 *
 * // external trigger
 * s.next(23);
 * // s1 23
 * s.next(42);
 * // s1 42
 * // s2 42
 * ```
 *
 * @param sub
 * @param xform
 * @param parent
 * @param id
 */
const subscription = (sub, xform, parent, id) => new Subscription(sub, xform, parent, id);

exports.subscription = subscription;

class Subscription {
  constructor(sub, xform, parent, id) {
    this.state = 0
    /* IDLE */
    ;
    this.parent = parent;
    this.id = id || `sub-${(0, _idgen.nextID)()}`;
    this.last = _api.SEMAPHORE;
    this.subs = [];

    if (sub) {
      this.subs.push(sub);
    }

    if (xform) {
      this.xform = xform((0, _transducers.push)());
    }
  }

  deref() {
    return this.last !== _api.SEMAPHORE ? this.last : undefined;
  }

  getState() {
    return this.state;
  }

  subscribe(...args) {
    this.ensureState();
    let sub, xform, id;

    switch (args.length) {
      case 1:
      case 2:
        if ((0, _checks.isFunction)(args[0])) {
          xform = args[0];
          id = args[1] || `xform-${(0, _idgen.nextID)()}`;
        } else {
          sub = args[0];

          if ((0, _checks.isFunction)(args[1])) {
            xform = args[1];
          } else {
            id = args[1];
          }
        }

        break;

      case 3:
        [sub, xform, id] = args;
        break;

      default:
        (0, _errors.illegalArity)(args.length);
    }

    if ((0, _checks.implementsFunction)(sub, "subscribe")) {
      sub.parent = this;
    } else {
      sub = subscription(sub, xform, this, id);
    }

    if (this.last !== _api.SEMAPHORE) {
      sub.next(this.last);
    }

    return this.addWrapped(sub);
  }
  /**
   * Returns array of new child subscriptions for all given
   * subscribers.
   *
   * @param subs
   */


  subscribeAll(...subs) {
    const wrapped = [];

    for (let s of subs) {
      wrapped.push(this.subscribe(s));
    }

    return wrapped;
  }

  transform(...xf) {
    const n = xf.length - 1;

    if ((0, _checks.isString)(xf[n])) {
      return this.subscribe((0, _transducers.comp)(...xf.slice(0, n)), xf[n]);
    } else {
      return this.subscribe((0, _transducers.comp)(...xf));
    }
  }
  /**
   * If called without arg, removes this subscription from parent (if
   * any), cleans up internal state and goes into DONE state. If
   * called with arg, removes the sub from internal pool and if no
   * other subs are remaining also cleans up itself and goes into DONE
   * state.
   *
   * @param sub
   */


  unsubscribe(sub) {
    _api2.LOGGER.debug(this.id, "unsub start", sub ? sub.id : "self");

    if (!sub) {
      let res = true;

      if (this.parent) {
        res = this.parent.unsubscribe(this);
      }

      this.state = 2
      /* DONE */
      ;
      this.cleanup();
      return res;
    }

    if (this.subs) {
      _api2.LOGGER.debug(this.id, "unsub child", sub.id);

      const idx = this.subs.indexOf(sub);

      if (idx >= 0) {
        this.subs.splice(idx, 1);

        if (!this.subs.length) {
          this.unsubscribe();
        }

        return true;
      }
    }

    return false;
  }

  next(x) {
    if (this.state < 2
    /* DONE */
    ) {
        if (this.xform) {
          const acc = this.xform[2]([], x);
          const uacc = (0, _transducers.unreduced)(acc);
          const n = uacc.length;

          for (let i = 0; i < n; i++) {
            this.dispatch(uacc[i]);
          }

          if ((0, _transducers.isReduced)(acc)) {
            this.done();
          }
        } else {
          this.dispatch(x);
        }
      }
  }

  done() {
    _api2.LOGGER.debug(this.id, "done start");

    if (this.state < 2
    /* DONE */
    ) {
        if (this.xform) {
          const acc = this.xform[1]([]);
          const uacc = (0, _transducers.unreduced)(acc);
          const n = uacc.length;

          for (let i = 0; i < n; i++) {
            this.dispatch(uacc[i]);
          }
        }

        this.state = 2
        /* DONE */
        ;

        for (let s of [...this.subs]) {
          s.done && s.done();
        }

        this.unsubscribe();

        _api2.LOGGER.debug(this.id, "done");
      }
  }

  error(e) {
    this.state = 3
    /* ERROR */
    ;
    let notified = false;

    if (this.subs && this.subs.length) {
      for (let s of this.subs.slice()) {
        if (s.error) {
          s.error(e);
          notified = true;
        }
      }
    }

    if (!notified) {
      _api2.LOGGER.warn(this.id, "unhandled error:", e);

      if (this.parent) {
        _api2.LOGGER.debug(this.id, "unsubscribing...");

        this.unsubscribe();
        this.state = 3
        /* ERROR */
        ;
      }
    }
  }

  addWrapped(wrapped) {
    this.subs.push(wrapped);
    this.state = 1
    /* ACTIVE */
    ;
    return wrapped;
  }

  dispatch(x) {
    // LOGGER.debug(this.id, "dispatch", x);
    this.last = x;
    const subs = this.subs;
    let s;

    if (subs.length == 1) {
      s = subs[0];

      try {
        s.next && s.next(x);
      } catch (e) {
        s.error ? s.error(e) : this.error(e);
      }
    } else {
      for (let i = subs.length - 1; i >= 0; i--) {
        s = subs[i];

        try {
          s.next && s.next(x);
        } catch (e) {
          s.error ? s.error(e) : this.error(e);
        }
      }
    }
  }

  ensureState() {
    if (this.state >= 2
    /* DONE */
    ) {
        (0, _errors.illegalState)(`operation not allowed in state ${this.state}`);
      }
  }

  cleanup() {
    _api2.LOGGER.debug(this.id, "cleanup");

    this.subs.length = 0;
    delete this.parent;
    delete this.xform;
    delete this.last;
  }

}

exports.Subscription = Subscription;
},{"@thi.ng/api":"node_modules/@thi.ng/api/index.js","@thi.ng/checks":"node_modules/@thi.ng/checks/index.js","@thi.ng/errors":"node_modules/@thi.ng/errors/index.js","@thi.ng/transducers":"node_modules/@thi.ng/transducers/index.js","./api":"node_modules/@thi.ng/rstream/api.js","./utils/idgen":"node_modules/@thi.ng/rstream/utils/idgen.js"}],"node_modules/@thi.ng/rstream/metastream.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MetaStream = exports.metaStream = void 0;

var _subscription = require("./subscription");

var _idgen = require("./utils/idgen");

/**
 * A `MetaStream` is a subscription type which transforms each incoming
 * value into a new stream, subscribes to it (via an hidden / internal
 * subscription) and then only passes values from that stream to its own
 * subscribers. If a new value is received, the meta stream first
 * unsubscribes from any still active stream, before creating and
 * subscribing to the new stream. Hence this stream type is useful for
 * cases where streams need to be dynamically created & inserted into an
 * existing dataflow topology.
 *
 * The user supplied `factory` function will be called for each incoming
 * value and is responsible for creating the new stream instances. If
 * the function returns null/undefined, no further action will be taken
 * (acts like a filter transducer).
 *
 * ```
 * // transform each received odd number into a stream
 * // producing 3 copies of that number in the metastream
 * // even numbers are ignored
 * a = metastream((x) => (x & 1) ? fromIterable(tx.repeat(x, 3), 100) : null)
 *
 * a.subscribe(trace())
 * a.next(23)
 *
 * // 23
 * // 23
 * // 23
 *
 * a.next(42) // ignored by factory fn
 *
 * a.next(43)
 * // 43
 * // 43
 * // 43
 * ```
 *
 * The factory function does NOT need to create new streams, but can
 * only merely return other existing streams, and so making the meta
 * stream act like a switch.
 *
 * If the meta stream is the only subscriber to these input streams,
 * you'll need to add a dummy subscription to each in order to keep them
 * alive and support dynamic switching between them. See issue #74
 *
 * ```
 * a = fromIterable(tx.repeat("a"), 1000);
 * b = fromIterable(tx.repeat("b"), 1000);
 *
 * // dummy subscriptions
 * a.subscribe({})
 * b.subscribe({})
 *
 * m = metaStream((x) => x ? a : b);
 * m.subscribe(trace("meta from: "));
 *
 * m.next(true);
 * // meta from: a
 *
 * m.next(false);
 * // meta from: b
 *
 * m.next(true);
 * // meta from: a
 * ```
 *
 * @param factory
 * @param id
 */
const metaStream = (factory, id) => new MetaStream(factory, id);

exports.metaStream = metaStream;

class MetaStream extends _subscription.Subscription {
  constructor(factory, id) {
    super(null, null, null, id || `metastram-${(0, _idgen.nextID)()}`);
    this.factory = factory;
  }

  next(x) {
    if (this.state < 2
    /* DONE */
    ) {
        if (this.stream) {
          this.stream.unsubscribe(this.sub);
        }

        let stream = this.factory(x);

        if (stream) {
          this.stream = stream;
          this.sub = this.stream.subscribe({
            next: x => {
              stream === this.stream && super.dispatch(x);
            },
            done: () => {
              this.stream.unsubscribe(this.sub);

              if (stream === this.stream) {
                this.stream = null;
                this.sub = null;
              }
            },
            error: e => super.error(e),
            __owner: this
          });
        }
      }
  }

  done() {
    if (this.stream) {
      this.detach();
    }

    super.done();
  }

  unsubscribe(sub) {
    if (this.stream && (!sub || this.subs.length === 1)) {
      this.detach();
    }

    return super.unsubscribe();
  }

  detach() {
    this.stream.unsubscribe(this.sub);
    delete this.stream;
    delete this.sub;
  }

}

exports.MetaStream = MetaStream;
},{"./subscription":"node_modules/@thi.ng/rstream/subscription.js","./utils/idgen":"node_modules/@thi.ng/rstream/utils/idgen.js"}],"node_modules/@thi.ng/associative/array-set.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ArraySet = void 0;

var _api = require("@thi.ng/api");

var _equiv = require("@thi.ng/equiv");

const __private = new WeakMap();
/**
 * An alternative set implementation to the native ES6 Set type. Uses
 * customizable equality/equivalence predicate and so is more useful
 * when dealing with structured data. Implements full API of native Set
 * and by the default uses `@thi.ng/equiv` for equivalence checking.
 *
 * Additionally, the type also implements the `ICopy`, `IEmpty` and
 * `IEquiv` interfaces itself.
 */


class ArraySet extends Set {
  constructor(vals, opts = {}) {
    super();

    __private.set(this, {
      equiv: opts.equiv || _equiv.equiv,
      vals: []
    });

    vals && this.into(vals);
  }

  *[Symbol.iterator]() {
    yield* __private.get(this).vals;
  }

  get [Symbol.species]() {
    return ArraySet;
  }

  get [Symbol.toStringTag]() {
    return "ArraySet";
  }

  get size() {
    return __private.get(this).vals.length;
  }

  copy() {
    const $this = __private.get(this);

    const s = new ArraySet(null, {
      equiv: $this.equiv
    });
    __private.get(s).vals = $this.vals.slice();
    return s;
  }

  empty() {
    return new ArraySet(null, this.opts());
  }

  clear() {
    __private.get(this).vals.length = 0;
  }

  first() {
    if (this.size) {
      return __private.get(this).vals[0];
    }
  }

  add(x) {
    !this.has(x) && __private.get(this).vals.push(x);
    return this;
  }

  into(xs) {
    for (let x of xs) {
      this.add(x);
    }

    return this;
  }

  has(x) {
    return this.get(x, _api.SEMAPHORE) !== _api.SEMAPHORE;
  }
  /**
   * Returns the canonical value for `x`, if present. If the set
   * contains no equivalent for `x`, returns `notFound`.
   *
   * @param x
   * @param notFound
   */


  get(x, notFound) {
    const $this = __private.get(this);

    const eq = $this.equiv;
    const vals = $this.vals;

    for (let i = vals.length - 1; i >= 0; i--) {
      if (eq(vals[i], x)) {
        return vals[i];
      }
    }

    return notFound;
  }

  delete(x) {
    const $this = __private.get(this);

    const eq = $this.equiv;
    const vals = $this.vals;

    for (let i = vals.length - 1; i >= 0; i--) {
      if (eq(vals[i], x)) {
        vals.splice(i, 1);
        return true;
      }
    }

    return false;
  }

  disj(xs) {
    for (let x of xs) {
      this.delete(x);
    }

    return this;
  }

  equiv(o) {
    if (this === o) {
      return true;
    }

    if (!(o instanceof Set)) {
      return false;
    }

    if (this.size !== o.size) {
      return false;
    }

    const vals = __private.get(this).vals;

    for (let i = vals.length - 1; i >= 0; i--) {
      if (!o.has(vals[i])) {
        return false;
      }
    }

    return true;
  }

  forEach(fn, thisArg) {
    const vals = __private.get(this).vals;

    for (let i = vals.length - 1; i >= 0; i--) {
      const v = vals[i];
      fn.call(thisArg, v, v, this);
    }
  }

  *entries() {
    for (let v of __private.get(this).vals) {
      yield [v, v];
    }
  }

  *keys() {
    yield* __private.get(this).vals;
  }

  *values() {
    yield* this.keys();
  }

  opts() {
    return {
      equiv: __private.get(this).equiv
    };
  }

}

exports.ArraySet = ArraySet;
},{"@thi.ng/api":"node_modules/@thi.ng/api/index.js","@thi.ng/equiv":"node_modules/@thi.ng/equiv/index.js"}],"node_modules/@thi.ng/associative/common-keys.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.commonKeysObj = exports.commonKeysMap = void 0;

/**
 * Like `commonKeysObj()`, but for ES6 Maps.
 *
 * @param a
 * @param b
 * @param out
 */
const commonKeysMap = (a, b, out = []) => {
  for (let k of a.keys()) {
    b.has(k) && out.push(k);
  }

  return out;
};
/**
 * Returns array of keys present in both args, i.e. the set intersection
 * of the given objects' key / property sets.
 *
 * ```
 * commonKeys({ a: 1, b: 2 }, { c: 10, b: 20, a: 30 })
 * // [ "a", "b" ]
 * ```
 *
 * @param a
 * @param b
 * @param out
 */


exports.commonKeysMap = commonKeysMap;

const commonKeysObj = (a, b, out = []) => {
  for (let k in a) {
    b.hasOwnProperty(k) && out.push(k);
  }

  return out;
};

exports.commonKeysObj = commonKeysObj;
},{}],"node_modules/@thi.ng/associative/into.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.into = into;

var _checks = require("@thi.ng/checks");

function into(dest, src) {
  if ((0, _checks.isMap)(dest)) {
    for (let x of src) {
      dest.set(x[0], x[1]);
    }
  } else {
    for (let x of src) {
      dest.add(x);
    }
  }

  return dest;
}
},{"@thi.ng/checks":"node_modules/@thi.ng/checks/index.js"}],"node_modules/@thi.ng/associative/utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensureSet = exports.ensureMap = exports.objValues = exports.first = exports.copy = exports.empty = void 0;

var _checks = require("@thi.ng/checks");

const empty = (x, ctor) => (0, _checks.implementsFunction)(x, "empty") ? x.empty() : new (x[Symbol.species] || ctor)();

exports.empty = empty;

const copy = (x, ctor) => (0, _checks.implementsFunction)(x, "copy") ? x.copy() : new (x[Symbol.species] || ctor)(x);

exports.copy = copy;

const first = x => x[Symbol.iterator]().next().value;

exports.first = first;

const objValues = src => {
  const vals = [];

  for (let k in src) {
    src.hasOwnProperty(k) && vals.push(src[k]);
  }

  return vals;
};

exports.objValues = objValues;

const ensureMap = x => (0, _checks.isMap)(x) ? x : new Map(x);

exports.ensureMap = ensureMap;

const ensureSet = x => (0, _checks.isSet)(x) ? x : new Set(x);

exports.ensureSet = ensureSet;
},{"@thi.ng/checks":"node_modules/@thi.ng/checks/index.js"}],"node_modules/@thi.ng/associative/difference.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.difference = void 0;

var _into = require("./into");

var _utils = require("./utils");

/**
 * Computes the difference of sets `a - b` and writes results to new set
 * or optionally given set `out` (assumed to be empty for correct
 * results).
 *
 * @param a
 * @param b
 * @param out
 */
const difference = (a, b, out) => {
  if (a === b) {
    return out || (0, _utils.empty)(a, Set);
  }

  out = out ? (0, _into.into)(out, a) : (0, _utils.copy)(a, Set);

  for (let i of b) {
    out.delete(i);
  }

  return out;
};

exports.difference = difference;
},{"./into":"node_modules/@thi.ng/associative/into.js","./utils":"node_modules/@thi.ng/associative/utils.js"}],"node_modules/@thi.ng/associative/equiv-map.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EquivMap = void 0;

var _api = require("@thi.ng/api");

var _equiv = require("@thi.ng/equiv");

var _arraySet = require("./array-set");

const __private = new WeakMap();

class EquivMap extends Map {
  /**
   * Creates a new instance with optional initial key-value pairs and
   * provided options. If no `opts` are given, uses `ArraySet` for
   * storing canonical keys and `@thi.ng/equiv` for checking key
   * equivalence.
   *
   * @param pairs
   * @param opts
   */
  constructor(pairs, opts) {
    super();

    const _opts = Object.assign({
      equiv: _equiv.equiv,
      keys: _arraySet.ArraySet
    }, opts);

    __private.set(this, {
      keys: new _opts.keys(null, {
        equiv: _opts.equiv
      }),
      map: new Map(),
      opts: _opts
    });

    if (pairs) {
      this.into(pairs);
    }
  }
  /**
   * Converts given vanilla object into an `EquivMap` instance with
   * default (or optionally provided) options and returns it. By
   * default uses strict `===` equality check for `equiv` option.
   *
   * @param obj
   * @param opts
   */


  static fromObject(obj, opts) {
    const m = new EquivMap(null, Object.assign({
      equiv: (a, b) => a === b
    }, opts));

    for (let k in obj) {
      obj.hasOwnProperty(k) && m.set(k, obj[k]);
    }

    return m;
  }

  [Symbol.iterator]() {
    return this.entries();
  }

  get [Symbol.species]() {
    return EquivMap;
  }

  get [Symbol.toStringTag]() {
    return "EquivMap";
  }

  get size() {
    return __private.get(this).keys.size;
  }

  clear() {
    const $this = __private.get(this);

    $this.keys.clear();
    $this.map.clear();
  }

  empty() {
    return new EquivMap(null, __private.get(this).opts);
  }

  copy() {
    const $this = __private.get(this);

    const m = new EquivMap();

    __private.set(m, {
      keys: $this.keys.copy(),
      map: new Map($this.map),
      opts: $this.opts
    });

    return m;
  }

  equiv(o) {
    if (this === o) {
      return true;
    }

    if (!(o instanceof Map)) {
      return false;
    }

    if (this.size !== o.size) {
      return false;
    }

    for (let p of __private.get(this).map.entries()) {
      if (!(0, _equiv.equiv)(o.get(p[0]), p[1])) {
        return false;
      }
    }

    return true;
  }

  delete(key) {
    const $this = __private.get(this);

    key = $this.keys.get(key, _api.SEMAPHORE);

    if (key !== _api.SEMAPHORE) {
      $this.map.delete(key);
      $this.keys.delete(key);
      return true;
    }

    return false;
  }

  dissoc(...keys) {
    for (let k of keys) {
      this.delete(k);
    }

    return this;
  }

  forEach(fn, thisArg) {
    for (let pair of __private.get(this).map) {
      fn.call(thisArg, pair[1], pair[0], this);
    }
  }

  get(key, notFound) {
    const $this = __private.get(this);

    key = $this.keys.get(key, _api.SEMAPHORE);

    if (key !== _api.SEMAPHORE) {
      return $this.map.get(key);
    }

    return notFound;
  }

  has(key) {
    return __private.get(this).keys.has(key);
  }

  set(key, value) {
    const $this = __private.get(this);

    const k = $this.keys.get(key, _api.SEMAPHORE);

    if (k !== _api.SEMAPHORE) {
      $this.map.set(k, value);
    } else {
      $this.keys.add(key);
      $this.map.set(key, value);
    }

    return this;
  }

  into(pairs) {
    for (let p of pairs) {
      this.set(p[0], p[1]);
    }

    return this;
  }

  entries() {
    return __private.get(this).map.entries();
  }

  keys() {
    return __private.get(this).map.keys();
  }

  values() {
    return __private.get(this).map.values();
  }

  opts() {
    return __private.get(this).opts;
  }

}

exports.EquivMap = EquivMap;
},{"@thi.ng/api":"node_modules/@thi.ng/api/index.js","@thi.ng/equiv":"node_modules/@thi.ng/equiv/index.js","./array-set":"node_modules/@thi.ng/associative/array-set.js"}],"node_modules/@thi.ng/binary/api.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MASKS = void 0;
const MASKS = new Array(33).fill(0).map((_, i) => Math.pow(2, i) - 1);
exports.MASKS = MASKS;
},{}],"node_modules/@thi.ng/binary/align.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAligned = exports.align = void 0;

/**
 * Aligns `addr` to next multiple of `size`. The latter must be a power
 * of 2.
 *
 * @param addr
 * @param size
 */
const align = (addr, size) => (size--, addr + size & ~size);
/**
 * Returns true if `addr` is aligned to wordsize `size`.
 */


exports.align = align;

const isAligned = (addr, size) => !(addr & size - 1);

exports.isAligned = isAligned;
},{}],"node_modules/@thi.ng/binary/count.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ctz32 = exports.clz32 = exports.hammingDist = exports.popCount = void 0;

/**
 * Returns number of 1 bits in `x`.
 *
 * @param x
 */
const popCount = x => (x = x - (x >>> 1 & 0x55555555), x = (x & 0x33333333) + (x >>> 2 & 0x33333333), (x + (x >>> 4) & 0xf0f0f0f) * 0x1010101 >>> 24);
/**
 * https://en.wikipedia.org/wiki/Hamming_distance
 *
 * @param x
 * @param y
 */


exports.popCount = popCount;

const hammingDist = (x, y) => popCount(x ^ y);
/**
 * Math.clz32() polyfill (corrected).
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/clz32$revision/1426816
 *
 * @param x
 */


exports.hammingDist = hammingDist;

const clz32 = x => x !== 0 ? 31 - (Math.log(x >>> 0) / Math.LN2 | 0) : 32;

exports.clz32 = clz32;

const ctz32 = x => {
  let c = 32;
  x &= -x;
  x && c--;
  x & 0x0000ffff && (c -= 16);
  x & 0x00ff00ff && (c -= 8);
  x & 0x0f0f0f0f && (c -= 4);
  x & 0x33333333 && (c -= 2);
  x & 0x55555555 && (c -= 1);
  return c;
};

exports.ctz32 = ctz32;
},{}],"node_modules/@thi.ng/binary/mask.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.maskH = exports.maskL = exports.defMask = void 0;

var _api = require("./api");

/**
 * Creates bit mask by enabling bit `a` to bit `b-1`, both in range
 * 0-32. `b` MUST be >= `a`.
 *
 * ```
 * defMask(1,31).toString(16) // 7ffffffe
 * defMask(3,8).toString(16)  // f8
 * ```
 *
 * @param a
 * @param b
 */
const defMask = (a, b) => (~_api.MASKS[a] & _api.MASKS[b]) >>> 0;
/**
 * Returns unsigned version of `x` with only lowest `n` bits.
 *
 * @param n
 * @param x
 */


exports.defMask = defMask;

const maskL = (n, x) => (x & _api.MASKS[n]) >>> 0;
/**
 * Returns unsigned version of `x` with only highest `n` bits.
 *
 * @param n
 * @param x
 */


exports.maskL = maskL;

const maskH = (n, x) => (x & ~_api.MASKS[n]) >>> 0;

exports.maskH = maskH;
},{"./api":"node_modules/@thi.ng/binary/api.js"}],"node_modules/@thi.ng/binary/edit.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bitClearWindow = exports.bitSetWindow = exports.bitSet = exports.bitFlip = exports.bitClear = void 0;

var _mask = require("./mask");

/**
 * Clears bit in given uint `x`.
 *
 * @param x value
 * @param bit bit number (0..31)
 */
const bitClear = (x, bit) => (x & ~(1 << bit)) >>> 0;
/**
 * Toggles bit in given uint `x`.
 *
 * @param x
 * @param bit
 */


exports.bitClear = bitClear;

const bitFlip = (x, bit) => (x ^ 1 << bit) >>> 0;
/**
 * Sets bit in given uint `x`.
 *
 * @param x value
 * @param bit bit number (0..31)
 */


exports.bitFlip = bitFlip;

const bitSet = (x, bit) => (x | 1 << bit) >>> 0;

exports.bitSet = bitSet;

const bitSetWindow = (x, y, from, to) => {
  const m = (0, _mask.defMask)(from, to);
  return x & ~m | y << (1 << from) & m;
};

exports.bitSetWindow = bitSetWindow;

const bitClearWindow = (x, from, to) => x & ~(0, _mask.defMask)(from, to);

exports.bitClearWindow = bitClearWindow;
},{"./mask":"node_modules/@thi.ng/binary/mask.js"}],"node_modules/@thi.ng/binary/float.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.floatToSortableInt = exports.uintBitsToFloat = exports.intBitsToFloat = exports.floatToUintBits = exports.floatToIntBits = void 0;
const F32 = new Float32Array(1);
const I32 = new Int32Array(F32.buffer);
const U32 = new Uint32Array(F32.buffer);

const floatToIntBits = x => (F32[0] = x, I32[0]);

exports.floatToIntBits = floatToIntBits;

const floatToUintBits = x => (F32[0] = x, U32[0]);

exports.floatToUintBits = floatToUintBits;

const intBitsToFloat = x => (I32[0] = x, F32[0]);

exports.intBitsToFloat = intBitsToFloat;

const uintBitsToFloat = x => (U32[0] = x, F32[0]);
/**
 * Converts given float into a sortable integer representation, using
 * raw bitwise conversion via `floatToIntBits()`.
 *
 * https://github.com/tzaeschke/phtree/blob/master/PhTreeRevisited.pdf
 * (page 3)
 *
 * @param x
 */


exports.uintBitsToFloat = uintBitsToFloat;

const floatToSortableInt = x => {
  if (x === -0) x = 0;
  const i = floatToIntBits(x);
  return x < 0 ? ~i | 1 << 31 : i;
};

exports.floatToSortableInt = floatToSortableInt;
},{}],"node_modules/@thi.ng/binary/gray.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decodeGray32 = exports.encodeGray32 = void 0;

/**
 * Converts 32bit unsigned int to Gray code (reflected binary). Gray
 * codes of successive values always have a Hamming distance of 1 (i.e.
 * only 1 bit changes at a time).
 *
 * https://en.wikipedia.org/wiki/Gray_code
 *
 * @param x u32
 */
const encodeGray32 = x => (x ^ x >>> 1) >>> 0;
/**
 * Converts 32bit Gray code to binary / unsigned int.
 *
 * https://en.wikipedia.org/wiki/Gray_code
 */


exports.encodeGray32 = encodeGray32;

const decodeGray32 = x => {
  x = x ^ x >>> 16;
  x = x ^ x >>> 8;
  x = x ^ x >>> 4;
  x = x ^ x >>> 2;
  x = x ^ x >>> 1;
  return x >>> 0;
};

exports.decodeGray32 = decodeGray32;
},{}],"node_modules/@thi.ng/binary/logic.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bitDemux = exports.bitMux = exports.bitOai22 = exports.bitAoi22 = exports.bitOai21 = exports.bitAoi21 = exports.bitImply = exports.bitXnor = exports.bitXor = exports.bitNor = exports.bitOr = exports.bitNand = exports.bitAnd = exports.bitNot = void 0;

var _mask = require("./mask");

const bitNot = (n, x) => (0, _mask.maskL)(n, ~x);

exports.bitNot = bitNot;

const bitAnd = (n, a, b) => (0, _mask.maskL)(n, a & b);

exports.bitAnd = bitAnd;

const bitNand = (n, a, b) => (0, _mask.maskL)(n, ~(a & b));

exports.bitNand = bitNand;

const bitOr = (n, a, b) => (0, _mask.maskL)(n, a | b);

exports.bitOr = bitOr;

const bitNor = (n, a, b) => (0, _mask.maskL)(n, ~(a & b));

exports.bitNor = bitNor;

const bitXor = (n, a, b) => (0, _mask.maskL)(n, a ^ b);

exports.bitXor = bitXor;

const bitXnor = (n, a, b) => (0, _mask.maskL)(n, ~(a ^ b));

exports.bitXnor = bitXnor;

const bitImply = (n, a, b) => (0, _mask.maskL)(n, ~a | b);

exports.bitImply = bitImply;

const bitAoi21 = (n, a, b, c) => (0, _mask.maskL)(n, ~(a | b & c));

exports.bitAoi21 = bitAoi21;

const bitOai21 = (n, a, b, c) => (0, _mask.maskL)(n, ~(a & (b | c)));

exports.bitOai21 = bitOai21;

const bitAoi22 = (n, a, b, c, d) => (0, _mask.maskL)(n, ~(a & b | c & d));

exports.bitAoi22 = bitAoi22;

const bitOai22 = (n, a, b, c, d) => (0, _mask.maskL)(n, ~((a | b) & (c | d)));

exports.bitOai22 = bitOai22;

const bitMux = (n, a, b, s) => (0, _mask.maskL)(n, a & ~s | b & s);

exports.bitMux = bitMux;

const bitDemux = (n, a, b, s) => [(0, _mask.maskL)(n, a & ~s), (0, _mask.maskL)(n, b & s)];

exports.bitDemux = bitDemux;
},{"./mask":"node_modules/@thi.ng/binary/mask.js"}],"node_modules/@thi.ng/binary/pow.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.floorPow2 = exports.ceilPow2 = exports.isPow2 = void 0;

// http://graphics.stanford.edu/~seander/bithacks.html
const isPow2 = x => !!x && !(x & x - 1);

exports.isPow2 = isPow2;

const ceilPow2 = x => {
  x += x === 0;
  --x;
  x |= x >>> 1;
  x |= x >>> 2;
  x |= x >>> 4;
  x |= x >>> 8;
  x |= x >>> 16;
  return x + 1;
};

exports.ceilPow2 = ceilPow2;

const floorPow2 = x => {
  x |= x >>> 1;
  x |= x >>> 2;
  x |= x >>> 4;
  x |= x >>> 8;
  x |= x >>> 16;
  return x - (x >>> 1);
};

exports.floorPow2 = floorPow2;
},{}],"node_modules/@thi.ng/binary/rotate.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rotateRight = exports.rotateLeft = void 0;

/**
 * Rotates `x` `n` bits to the left.
 *
 * @param x
 * @param n
 */
const rotateLeft = (x, n) => (x << n | x >>> 32 - n) >>> 0;
/**
 * Rotates `x` `n` bits to the right.
 *
 * @param x
 * @param n
 */


exports.rotateLeft = rotateLeft;

const rotateRight = (x, n) => (x >>> n | x << 32 - n) >>> 0;

exports.rotateRight = rotateRight;
},{}],"node_modules/@thi.ng/binary/splat.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.same8 = exports.same4 = exports.splat16_32 = exports.splat8_32 = exports.splat8_24 = exports.splat4_32 = exports.splat4_24 = void 0;

/**
 * Repeats lowest nibble of `x` as 24 bit uint.
 *
 * @param x
 */
const splat4_24 = x => (x &= 0xf, splat8_24(x | x << 4));
/**
 * Repeats lowest nibble of `x` as 32 bit uint.
 *
 * @param x
 */


exports.splat4_24 = splat4_24;

const splat4_32 = x => (x &= 0xf, splat8_32(x | x << 4));
/**
 * Repeats lowest byte of `x` as 24 bit uint.
 *
 * @param x
 */


exports.splat4_32 = splat4_32;

const splat8_24 = x => (x & 0xff) * 0x010101;
/**
 * Repeats lowest byte of `x` as 32 bit uint.
 *
 * @param x
 */


exports.splat8_24 = splat8_24;

const splat8_32 = x => (x & 0xff) * 0x01010101 >>> 0;
/**
 * Repeats lowest 16bit of `x` as 32 bit uint.
 *
 * @param x
 */


exports.splat8_32 = splat8_32;

const splat16_32 = x => (x &= 0xffff, (x << 16 | x) >>> 0);
/**
 * Returns true if bits 0-3 are same as bits 4-7.
 *
 * @param x
 */


exports.splat16_32 = splat16_32;

const same4 = x => (x >> 4 & 0xf) === (x & 0xf);
/**
 * Returns true if bits 0-7 are same as bits 8-15.
 *
 * @param x
 */


exports.same4 = same4;

const same8 = x => (x >> 8 & 0xff) === (x & 0xff);

exports.same8 = same8;
},{}],"node_modules/@thi.ng/binary/swizzle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.flipBytes = exports.swizzle4 = exports.swizzle8 = exports.lane2 = exports.lane4 = exports.lane8 = void 0;

/**
 * Extracts 8-bit lane from given 32bit uint.
 *
 * - Lane #0: bits 24-31
 * - Lane #1: bits 16-23
 * - Lane #2: bits 8-15
 * - Lane #3: bits 0-7
 *
 * @param x
 * @param l
 */
const lane8 = (x, l) => x >>> (3 - l << 3) & 0xff;
/**
 * Extracts 4-bit lane from given 32bit uint.
 *
 * - Lane #0: bits 28-31
 * - Lane #1: bits 24-27
 * - Lane #2: bits 20-23
 * - Lane #3: bits 16-19
 * - Lane #4: bits 12-15
 * - Lane #5: bits 8-11
 * - Lane #6: bits 4-7
 * - Lane #7: bits 0-3
 *
 * @param x
 * @param l
 */


exports.lane8 = lane8;

const lane4 = (x, l) => x >>> (7 - l << 2) & 0xf;

exports.lane4 = lane4;

const lane2 = (x, l) => x >>> (15 - l << 1) & 0x3;
/**
 * Re-orders byte lanes in given order (MSB).
 *
 * ```
 * swizzle(0x12345678, 3, 2, 1, 0) // 0x78563412
 * swizzle(0x12345678, 1, 0, 3, 2) // 0x34127856
 * swizzle(0x12345678, 2, 2, 0, 0) // 0x56561212
 * ```
 *
 * @param x
 * @param a
 * @param b
 * @param c
 * @param d
 */


exports.lane2 = lane2;

const swizzle8 = (x, a, b, c, d) => (lane8(x, a) << 24 | lane8(x, b) << 16 | lane8(x, c) << 8 | lane8(x, d)) >>> 0;
/**
 *
 * @param x
 * @param a
 * @param b
 * @param c
 * @param d
 * @param e
 * @param f
 * @param g
 * @param h
 */


exports.swizzle8 = swizzle8;

const swizzle4 = (x, a, b, c, d, e, f, g, h) => (lane4(x, a) << 28 | lane4(x, b) << 24 | lane4(x, c) << 20 | lane4(x, d) << 16 | lane4(x, e) << 12 | lane4(x, f) << 8 | lane4(x, g) << 4 | lane4(x, h)) >>> 0;
/**
 * Same as `swizzle8(x, 3, 2, 1, 0)`, but faster.
 *
 * @param x
 */


exports.swizzle4 = swizzle4;

const flipBytes = x => (x >>> 24 | x >> 8 & 0xff00 | (x & 0xff00) << 8 | x << 24) >>> 0;

exports.flipBytes = flipBytes;
},{}],"node_modules/@thi.ng/binary/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _api = require("./api");

Object.keys(_api).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _api[key];
    }
  });
});

var _align = require("./align");

Object.keys(_align).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _align[key];
    }
  });
});

var _count = require("./count");

Object.keys(_count).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _count[key];
    }
  });
});

var _edit = require("./edit");

Object.keys(_edit).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _edit[key];
    }
  });
});

var _float = require("./float");

Object.keys(_float).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _float[key];
    }
  });
});

var _gray = require("./gray");

Object.keys(_gray).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _gray[key];
    }
  });
});

var _logic = require("./logic");

Object.keys(_logic).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _logic[key];
    }
  });
});

var _mask = require("./mask");

Object.keys(_mask).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _mask[key];
    }
  });
});

var _pow = require("./pow");

Object.keys(_pow).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _pow[key];
    }
  });
});

var _rotate = require("./rotate");

Object.keys(_rotate).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _rotate[key];
    }
  });
});

var _splat = require("./splat");

Object.keys(_splat).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _splat[key];
    }
  });
});

var _swizzle = require("./swizzle");

Object.keys(_swizzle).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _swizzle[key];
    }
  });
});
},{"./api":"node_modules/@thi.ng/binary/api.js","./align":"node_modules/@thi.ng/binary/align.js","./count":"node_modules/@thi.ng/binary/count.js","./edit":"node_modules/@thi.ng/binary/edit.js","./float":"node_modules/@thi.ng/binary/float.js","./gray":"node_modules/@thi.ng/binary/gray.js","./logic":"node_modules/@thi.ng/binary/logic.js","./mask":"node_modules/@thi.ng/binary/mask.js","./pow":"node_modules/@thi.ng/binary/pow.js","./rotate":"node_modules/@thi.ng/binary/rotate.js","./splat":"node_modules/@thi.ng/binary/splat.js","./swizzle":"node_modules/@thi.ng/binary/swizzle.js"}],"node_modules/@thi.ng/associative/hash-map.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HashMap = void 0;

var _binary = require("@thi.ng/binary");

var _equiv = require("@thi.ng/equiv");

const __private = new WeakMap();

const DEFAULT_CAP = 16;
/**
 * Configurable hash map implementation w/ ES6 Map API and using open
 * addressing / linear probing to resolve key collisions. Supports any
 * key types, via user supplied hash function.
 *
 * See `HashMapOpts` for further configuration & behavior details.
 *
 * ```
 * import { HashMap } from "@thi.ng/associative"
 * import { hash } from "@thi.ng/vectors"
 *
 * m = new HashMap([], { hash })
 * m.set([1, 2], "a");
 * m.set([3, 4], "b");
 * m.set([1, 2], "c");
 * // HashMap { [ 1, 2 ] => 'c', [ 3, 4 ] => 'b' }
 * ```
 *
 */

class HashMap extends Map {
  constructor(pairs, opts) {
    super();
    const m = (0, _binary.ceilPow2)(Math.min(opts.cap || DEFAULT_CAP, 4)) - 1;

    __private.set(this, {
      hash: opts.hash,
      equiv: opts.equiv || _equiv.equiv,
      load: opts.load || 0.75,
      mask: m,
      bins: new Array(m + 1),
      size: 0
    });

    if (pairs) {
      this.into(pairs);
    }
  }

  get [Symbol.species]() {
    return HashMap;
  }

  get [Symbol.toStringTag]() {
    return "HashMap";
  }

  get size() {
    return __private.get(this).size;
  }

  [Symbol.iterator]() {
    return this.entries();
  }

  *entries() {
    for (let p of __private.get(this).bins) {
      if (p) yield [p[0], p[1]];
    }
  }

  *keys() {
    for (let p of __private.get(this).bins) {
      if (p) yield p[0];
    }
  }

  *values() {
    for (let p of __private.get(this).bins) {
      if (p) yield p[1];
    }
  }

  forEach(fn, thisArg) {
    for (let pair of __private.get(this).bins) {
      fn.call(thisArg, pair[1], pair[0], this);
    }
  }

  clear() {
    const $this = __private.get(this);

    $this.bins = new Array(DEFAULT_CAP);
    $this.mask = 15;
    $this.size = 0;
  }

  empty() {
    return new HashMap(null, this.opts({
      cap: DEFAULT_CAP
    }));
  }

  copy() {
    const $this = __private.get(this);

    const m = new HashMap(null, this.opts({
      cap: 4
    }));
    Object.assign(__private.get(m), {
      bins: $this.bins.slice(),
      mask: $this.mask,
      size: $this.size
    });
    return m;
  }

  equiv(o) {
    if (this === o) {
      return true;
    }

    if (!(o instanceof Map)) {
      return false;
    }

    if (this.size !== o.size) {
      return false;
    }

    for (let p of __private.get(this).bins) {
      if (p && !(0, _equiv.equiv)(o.get(p[0]), p[1])) {
        return false;
      }
    }

    return true;
  }

  has(key) {
    const $this = __private.get(this);

    const i = this.find(key, $this);
    return i >= 0 && $this.bins[i] != undefined;
  }

  get(key, notFound) {
    const $this = __private.get(this);

    const i = this.find(key, $this);
    return i >= 0 && $this.bins[i] ? $this.bins[i][1] : notFound;
  }

  set(key, val) {
    const $this = __private.get(this);

    let i = this.find(key, $this);

    if (i >= 0 && $this.bins[i]) {
      $this.bins[i][1] = val;
      return this;
    }

    if ($this.size > $this.mask * $this.load) {
      this.resize($this);
      i = this.find(key, $this);
    }

    $this.bins[i] = [key, val];
    $this.size++;
    return this;
  }

  delete(key) {
    const $this = __private.get(this);

    let i = this.find(key, $this);
    const bins = $this.bins;

    if (i >= 0 && !bins[i]) {
      return false;
    }

    $this.size--;
    const m = $this.mask;
    let j = i;
    let k;

    while (true) {
      bins[i] = undefined;

      do {
        j = j + 1 & m;
        if (!bins[j]) return true;
        k = $this.hash(bins[j][0]) & m;
      } while (i <= j ? i < k && k <= j : i < k || k <= j);

      bins[i] = bins[j];
      i = j;
    }
  }

  into(pairs) {
    for (let p of pairs) {
      this.set(p[0], p[1]);
    }

    return this;
  }

  dissoc(...keys) {
    for (let k of keys) {
      this.delete(k);
    }

    return this;
  }

  opts(overrides) {
    const $this = __private.get(this);

    return Object.assign({
      hash: $this.hash,
      equiv: $this.equiv,
      load: $this.load,
      cap: $this.mask + 1
    }, overrides);
  }

  find(key, $this) {
    const m = $this.mask;
    const bins = $this.bins;
    const equiv = $this.equiv;
    let i = m;
    let h = $this.hash(key) & m;

    while (bins[h] && !equiv(bins[h][0], key)) {
      i--;
      if (i < 0) return -1;
      h = h + 1 & $this.mask;
    }

    return h;
  }

  resize($this) {
    const src = $this.bins;
    const cap = ($this.mask + 1) * 2;
    $this.bins = new Array(cap);
    $this.mask = cap - 1;
    $this.size = 0;

    for (let p of src) {
      if (p) this.set(p[0], p[1]);
    }
  }

}

exports.HashMap = HashMap;
},{"@thi.ng/binary":"node_modules/@thi.ng/binary/index.js","@thi.ng/equiv":"node_modules/@thi.ng/equiv/index.js"}],"node_modules/@thi.ng/associative/select-keys.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectKeysObj = exports.selectKeysMap = void 0;

var _utils = require("./utils");

/**
 * Returns a new map of same type as input only containing given keys
 * (and only if they existed in the original map).
 *
 * @param src
 * @param ks selected keys
 */
const selectKeysMap = (src, ks) => {
  const dest = (0, _utils.empty)(src, Map);

  for (let k of ks) {
    src.has(k) && dest.set(k, src.get(k));
  }

  return dest;
};
/**
 * Returns a new object only containing given keys (and only if they
 * existed in the original).
 *
 * @param src
 * @param ks
 */


exports.selectKeysMap = selectKeysMap;

const selectKeysObj = (src, ks) => {
  const dest = {};

  for (let k of ks) {
    src.hasOwnProperty(k) && (dest[k] = src[k]);
  }

  return dest;
};

exports.selectKeysObj = selectKeysObj;
},{"./utils":"node_modules/@thi.ng/associative/utils.js"}],"node_modules/@thi.ng/associative/indexed.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.indexed = void 0;

var _equivMap = require("./equiv-map");

var _selectKeys = require("./select-keys");

var _utils = require("./utils");

/**
 * Takes an iterable of plain objects and array of indexing keys. Calls
 * `selectKeysObj` on each value and uses returned objects as new keys
 * to group original values. Returns a new `EquivMap` of sets.
 *
 * ```
 * indexed(
 *   new Set([{a: 1, b: 1}, {a: 1, b: 2}, {a: 1, b: 1, c: 2}]),
 *   ["a","b"]
 * )
 * // EquivMap {
 * //   { a: 1, b: 1 } => Set { { a: 1, b: 1 }, { a: 1, b: 1, c: 2 } },
 * //   { a: 1, b: 2 } => Set { { a: 1, b: 2 } } }
 * ```
 *
 * @param records objects to index
 * @param ks keys used for indexing
 */
const indexed = (records, ks) => {
  const res = new _equivMap.EquivMap();
  let x, ik, rv;

  for (x of records) {
    ik = (0, _selectKeys.selectKeysObj)(x, ks);
    rv = res.get(ik);
    !rv && res.set(ik, rv = (0, _utils.empty)(records, Set));
    rv.add(x);
  }

  return res;
};

exports.indexed = indexed;
},{"./equiv-map":"node_modules/@thi.ng/associative/equiv-map.js","./select-keys":"node_modules/@thi.ng/associative/select-keys.js","./utils":"node_modules/@thi.ng/associative/utils.js"}],"node_modules/@thi.ng/associative/intersection.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.intersection = void 0;

var _into = require("./into");

var _utils = require("./utils");

/**
 * Computes the intersection of sets `a` and `b` and writes results into
 * new set or optionally given set `out` (assumed to be empty for
 * correct results). If `out` is *not* given, the returned Set type will
 * be that of `a` (provided it defines `Symbol.species`).
 *
 * @param a
 * @param b
 * @param out
 */
const intersection = (a, b, out) => {
  out = out || (0, _utils.empty)(a, Set);

  if (a === b) {
    return (0, _into.into)(out, a);
  }

  if (b.size < a.size) {
    return intersection(b, a, out);
  }

  for (let i of b) {
    if (a.has(i)) {
      out.add(i);
    }
  }

  return out;
};

exports.intersection = intersection;
},{"./into":"node_modules/@thi.ng/associative/into.js","./utils":"node_modules/@thi.ng/associative/utils.js"}],"node_modules/@thi.ng/associative/invert.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.invertObj = exports.invertMap = void 0;

/**
 * Returns a new map in which the original values are used as keys and
 * original keys as values. If `dest` is given, writes results in that
 * map instead. Depending on the value type of `src` and/or if the
 * inverted map should use custom key equality semantics as provided by
 * the Map types in this package, you MUST provide a `dest` map, since
 * the default `dest` will only be a standard ES6 Map.
 *
 * ```
 * invertMap(new Map(), new Map([["a", 1], ["b", 2]]));
 * // Map { 1 => 'a', 2 => 'b' }
 * ```
 *
 * @param src
 * @param dest
 */
const invertMap = (src, dest) => {
  dest = dest || new Map();

  for (let p of src) {
    dest.set(p[1], p[0]);
  }

  return dest;
};
/**
 * Returns a new object in which the original values are used as keys
 * and original keys as values. If `dest` is given, writes results in
 * that object instead.
 *
 * ```
 * invertObj({a: 1, b: 2})
 * // { '1': 'a', '2': 'b' }
 * ```
 *
 * @param src
 * @param dest
 */


exports.invertMap = invertMap;

const invertObj = (src, dest = {}) => {
  for (let k in src) {
    dest[src[k]] = k;
  }

  return dest;
};

exports.invertObj = invertObj;
},{}],"node_modules/@thi.ng/associative/merge.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mergeObj = exports.mergeMap = void 0;

/**
 * Merges all given maps in left-to-right order into `dest`.
 * Returns `dest`.
 *
 * @param dest
 * @param xs
 */
const mergeMap = (dest, ...xs) => {
  for (let x of xs) {
    for (let pair of x) {
      dest.set(pair[0], pair[1]);
    }
  }

  return dest;
};
/**
 * Merges all given objects in left-to-right order into `dest`.
 * Returns `dest`.
 *
 * @param dest
 * @param xs
 */


exports.mergeMap = mergeMap;

const mergeObj = (dest, ...xs) => Object.assign(dest, ...xs);

exports.mergeObj = mergeObj;
},{}],"node_modules/@thi.ng/associative/rename-keys.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renameKeysObj = exports.renameKeysMap = void 0;

var _utils = require("./utils");

/**
 * Renames keys in `src` using mapping provided by key map `km`. Does
 * support key swapping / swizzling. Does not modify original.
 *
 * @param src
 * @param km
 * @param out
 */
const renameKeysMap = (src, km, out) => {
  out = out || (0, _utils.empty)(src, Map);

  for (let [k, v] of src) {
    out.set(km.has(k) ? km.get(k) : k, v);
  }

  return out;
};
/**
 * Renames keys in `src` using mapping provided by key map `km`. Does
 * support key swapping / swizzling. Does not modify original.
 *
 * ```
 * // swap a & b, rename c
 * renameKeysObj({a: 1, b: 2, c: 3}, {a: "b", b: "a", c: "cc"})
 * // {b: 1, a: 2, cc: 3}
 * ```
 *
 * @param src
 * @param km
 */


exports.renameKeysMap = renameKeysMap;

const renameKeysObj = (src, km, out = {}) => {
  for (let k in src) {
    out[km.hasOwnProperty(k) ? km[k] : k] = src[k];
  }

  return out;
};

exports.renameKeysObj = renameKeysObj;
},{"./utils":"node_modules/@thi.ng/associative/utils.js"}],"node_modules/@thi.ng/associative/join.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.joinWith = exports.join = void 0;

var _commonKeys = require("./common-keys");

var _indexed = require("./indexed");

var _invert = require("./invert");

var _merge = require("./merge");

var _renameKeys = require("./rename-keys");

var _selectKeys = require("./select-keys");

var _utils = require("./utils");

/**
 * Computes the natural join between the two sets of relations. Each set
 * is assumed to have plain objects as values with at least one of the
 * keys present in both sides. Furthermore the objects in each set are
 * assumed to have the same internal structure (i.e. sets of keys).
 * Returns new set of same type as `a`.
 *
 * ```
 * join(
 *   new Set([
 *     {id: 1, name: "foo"},
 *     {id: 2, name: "bar"},
 *     {id: 3, name: "baz"}]),
 *   new Set([
 *     {id: 1, color: "red"},
 *     {id: 2, color: "blue"}])
 * )
 * // Set {
 * //   { id: 1, color: 'red', name: 'foo' },
 * //   { id: 2, color: 'blue', name: 'bar' }
 * // }
 * ```
 *
 * @param a
 * @param b
 */
const join = (a, b) => {
  if (a.size && b.size) {
    const ks = (0, _commonKeys.commonKeysObj)((0, _utils.first)(a) || {}, (0, _utils.first)(b) || {});
    let aa, bb;

    if (a.size <= b.size) {
      aa = a;
      bb = b;
    } else {
      aa = b;
      bb = a;
    }

    const idx = (0, _indexed.indexed)(aa, ks);
    const res = (0, _utils.empty)(a, Set);

    for (let x of bb) {
      const found = idx.get((0, _selectKeys.selectKeysObj)(x, ks));

      if (found) {
        for (let f of found) {
          res.add((0, _merge.mergeObj)(Object.assign({}, f), x));
        }
      }
    }

    return res;
  }

  return (0, _utils.empty)(a, Set);
};
/**
 * Similar to `join()`, computes the join between two sets of relations,
 * using the given keys in `kmap` only for joining and ignoring others.
 * `kmap` can also be used to translate join keys in `b` where
 * needed. Else, if no renaming is desired, the values in `kmap` should
 * be the same as their respective keys, e.g. `{id: "id"}`. Returns new
 * set of same type as `a`.
 *
 * ```
 * joinWith(
 *   new Set([
 *     {id: 1, name: "foo"},
 *     {id: 2, name: "bar"},
 *     {id: 3, name: "baz"}]),
 *   new Set([
 *     {type: 1, color: "red"},
 *     {type: 2, color: "blue"}]),
 *   {id: "type"}
 * )
 * // Set {
 * //   { type: 1, color: 'red', id: 1, name: 'foo' },
 * //   { type: 2, color: 'blue', id: 2, name: 'bar' } }
 * ```
 *
 * @param a
 * @param b
 * @param kmap keys to compute join for
 */


exports.join = join;

const joinWith = (a, b, kmap) => {
  if (a.size && b.size) {
    let aa, bb;
    let k;

    if (a.size <= b.size) {
      aa = a;
      bb = b;
      k = (0, _invert.invertObj)(kmap);
    } else {
      aa = b;
      bb = a;
      k = kmap;
    }

    const idx = (0, _indexed.indexed)(aa, (0, _utils.objValues)(k));
    const ks = Object.keys(k);
    const res = (0, _utils.empty)(a, Set);

    for (let x of bb) {
      const found = idx.get((0, _renameKeys.renameKeysObj)((0, _selectKeys.selectKeysObj)(x, ks), k));

      if (found) {
        for (let f of found) {
          res.add((0, _merge.mergeObj)(Object.assign({}, f), x));
        }
      }
    }

    return res;
  }

  return (0, _utils.empty)(a, Set);
};

exports.joinWith = joinWith;
joinWith(new Set([{
  a: 1,
  b: 2
}]), new Set([{
  id: 1,
  c: 2
}]), {
  a: "id"
});
},{"./common-keys":"node_modules/@thi.ng/associative/common-keys.js","./indexed":"node_modules/@thi.ng/associative/indexed.js","./invert":"node_modules/@thi.ng/associative/invert.js","./merge":"node_modules/@thi.ng/associative/merge.js","./rename-keys":"node_modules/@thi.ng/associative/rename-keys.js","./select-keys":"node_modules/@thi.ng/associative/select-keys.js","./utils":"node_modules/@thi.ng/associative/utils.js"}],"node_modules/@thi.ng/dcons/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DCons = void 0;

var _checks = require("@thi.ng/checks");

var _compare = require("@thi.ng/compare");

var _equiv = require("@thi.ng/equiv");

var _errors = require("@thi.ng/errors");

var _transducers = require("@thi.ng/transducers");

class DCons {
  constructor(src) {
    this._length = 0;

    if (src) {
      this.into(src);
    }
  }

  get length() {
    return this._length;
  }

  copy() {
    return new DCons(this);
  }

  empty() {
    return new DCons();
  }

  clear() {
    this.release();
  }

  release() {
    let cell = this.head,
        next;

    while (cell) {
      next = cell.next;
      delete cell.value;
      delete cell.prev;
      delete cell.next;
      cell = next;
    }

    delete this.head;
    delete this.tail;
    this._length = 0;
    return true;
  }

  compare(o) {
    if (this._length < o._length) {
      return -1;
    } else if (this._length > o._length) {
      return 1;
    } else {
      let ca = this.head;
      let cb = o.head;
      let res = 0;

      while (ca && res == 0) {
        res = (0, _compare.compare)(ca.value, cb.value);
        ca = ca.next;
        cb = cb.next;
      }

      return res;
    }
  }

  equiv(o) {
    if ((o instanceof DCons || (0, _checks.isArrayLike)(o)) && this._length === o.length) {
      let cell = this.head;

      for (let x of o) {
        if (!(0, _equiv.equiv)(cell.value, x)) {
          return false;
        }

        cell = cell.next;
      }

      return true;
    }

    return false;
  }

  *[Symbol.iterator]() {
    let cell = this.head;

    while (cell) {
      yield cell.value;
      cell = cell.next;
    }
  }

  *cycle() {
    while (true) {
      yield* this;
    }
  }

  $reduce(rfn, acc) {
    let cell = this.head;

    while (cell && !(0, _transducers.isReduced)(acc)) {
      acc = rfn(acc, cell.value);
      cell = cell.next;
    }

    return acc;
  }

  drop() {
    const cell = this.head;

    if (cell) {
      this.head = cell.next;

      if (this.head) {
        delete this.head.prev;
      } else {
        delete this.tail;
      }

      this._length--;
      return cell.value;
    }
  }

  cons(value) {
    const cell = {
      value,
      next: this.head
    };

    if (this.head) {
      this.head.prev = cell;
    } else {
      this.tail = cell;
    }

    this.head = cell;
    this._length++;
    return this;
  }

  insertBefore(cell, value) {
    if (!cell) {
      (0, _errors.illegalArgs)("cell is undefined");
    }

    const newCell = {
      value,
      next: cell,
      prev: cell.prev
    };

    if (cell.prev) {
      cell.prev.next = newCell;
    } else {
      this.head = newCell;
    }

    cell.prev = newCell;
    this._length++;
    return this;
  }

  insertAfter(cell, value) {
    if (!cell) {
      (0, _errors.illegalArgs)("cell is undefined");
    }

    const newCell = {
      value,
      next: cell.next,
      prev: cell
    };

    if (cell.next) {
      cell.next.prev = newCell;
    } else {
      this.tail = newCell;
    }

    cell.next = newCell;
    this._length++;
    return this;
  }

  insertBeforeNth(n, x) {
    if (n < 0) {
      n += this._length;
    }

    if (n <= 0) {
      return this.cons(x);
    } else {
      return this.insertBefore(this.nthCell(n), x);
    }
  }

  insertAfterNth(n, x) {
    if (n < 0) {
      n += this._length;
    }

    if (n >= this._length - 1) {
      return this.push(x);
    } else {
      return this.insertAfter(this.nthCell(n), x);
    }
  }

  insertSorted(value, cmp) {
    cmp = cmp || _compare.compare;
    let cell = this.head;

    while (cell) {
      if (cmp(value, cell.value) <= 0) {
        return this.insertBefore(cell, value);
      }

      cell = cell.next;
    }

    return this.push(value);
  }

  find(value) {
    let cell = this.head;

    while (cell) {
      if (cell.value === value) {
        return cell;
      }

      cell = cell.next;
    }
  }

  findWith(fn) {
    let cell = this.head;

    while (cell) {
      if (fn(cell.value)) {
        return cell;
      }

      cell = cell.next;
    }
  }

  concat(...slices) {
    const res = this.copy();

    for (let slice of slices) {
      res.into(slice);
    }

    return res;
  }

  into(src) {
    for (let x of src) {
      this.push(x);
    }
  }

  slice(from = 0, to = this.length) {
    let a = from < 0 ? from + this._length : from;
    let b = to < 0 ? to + this._length : to;

    if (a < 0 || b < 0) {
      (0, _errors.illegalArgs)("invalid indices: ${from} / ${to}");
    }

    const res = new DCons();
    let cell = this.nthCell(a);

    while (cell && ++a <= b) {
      res.push(cell.value);
      cell = cell.next;
    }

    return res;
  }

  splice(at, del = 0, insert) {
    let cell;

    if (typeof at === "number") {
      if (at < 0) {
        at += this._length;
      }

      cell = this.nthCell(at);
    } else {
      cell = at;
    }

    const res = new DCons();

    if (del > 0) {
      while (cell && del-- > 0) {
        this.remove(cell);
        res.push(cell.value);
        cell = cell.next;
      }
    } else if (cell) {
      cell = cell.next;
    }

    if (insert) {
      if (cell) {
        for (let i of insert) {
          this.insertBefore(cell, i);
        }
      } else {
        for (let i of insert) {
          this.push(i);
        }
      }
    }

    return res;
  }

  remove(cell) {
    if (cell.prev) {
      cell.prev.next = cell.next;
    } else {
      this.head = cell.next;
    }

    if (cell.next) {
      cell.next.prev = cell.prev;
    } else {
      this.tail = cell.prev;
    }

    this._length--;
    return this;
  }

  swap(a, b) {
    if (a !== b) {
      const t = a.value;
      a.value = b.value;
      b.value = t;
    }

    return this;
  }

  push(value) {
    if (this.tail) {
      const cell = {
        value,
        prev: this.tail
      };
      this.tail.next = cell;
      this.tail = cell;
      this._length++;
      return this;
    } else {
      return this.cons(value);
    }
  }

  pop() {
    const cell = this.tail;
    !cell && (0, _errors.illegalState)("can't pop, empty");
    this.tail = cell.prev;

    if (this.tail) {
      delete this.tail.next;
    } else {
      delete this.head;
    }

    this._length--;
    return cell.value;
  }

  first() {
    return this.head && this.head.value;
  }

  peek() {
    return this.tail && this.tail.value;
  }

  setHead(v) {
    if (this.head) {
      this.head.value = v;
      return this;
    }

    return this.cons(v);
  }

  setTail(v) {
    if (this.tail) {
      this.tail.value = v;
      return this;
    }

    return this.push(v);
  }

  setNth(n, v) {
    const cell = this.nthCell(n);
    !cell && (0, _errors.illegalArgs)(`index out of bounds: ${n}`);
    cell.value = v;
    return this;
  }

  nth(n, notFound) {
    const cell = this.nthCell(n);
    return cell ? cell.value : notFound;
  }

  nthCell(n) {
    if (n < 0) {
      n += this._length;
    }

    if (n < 0 || n >= this._length) {
      return;
    }

    let cell, dir;

    if (n <= this._length >> 1) {
      cell = this.head;
      dir = "next";
    } else {
      cell = this.tail;
      dir = "prev";
      n = this._length - n - 1;
    }

    while (n-- > 0 && cell) {
      cell = cell[dir];
    }

    return cell;
  }

  rotateLeft() {
    switch (this._length) {
      case 0:
      case 1:
        return this;

      case 2:
        return this.swap(this.head, this.tail);

      default:
        return this.push(this.drop());
    }
  }

  rotateRight() {
    switch (this._length) {
      case 0:
      case 1:
        return this;

      case 2:
        return this.swap(this.head, this.tail);

      default:
        const x = this.peek();
        this.pop();
        return this.cons(x);
    }
  }

  map(fn) {
    const res = new DCons();
    let cell = this.head;

    while (cell) {
      res.push(fn(cell.value));
      cell = cell.next;
    }

    return res;
  }

  filter(pred) {
    const res = new DCons();
    let cell = this.head;

    while (cell) {
      pred(cell.value) && res.push(cell.value);
      cell = cell.next;
    }

    return res;
  }

  reduce(rfn, initial) {
    let acc = initial;
    let cell = this.head;

    while (cell) {
      // TODO add early termination support
      acc = rfn(acc, cell.value);
      cell = cell.next;
    }

    return acc;
  }

  shuffle() {
    let n = this._length;
    let cell = this.tail;

    while (n > 0) {
      let i = Math.floor(Math.random() * n);
      this.swap(this.nthCell(i), cell);
      cell = cell.prev;
      n--;
    }

    return this;
  }

  reverse() {
    let head = this.head;
    let tail = this.tail;
    let n = (this._length >>> 1) + (this._length & 1);

    while (head && tail && n > 0) {
      const t = head.value;
      head.value = tail.value;
      tail.value = t;
      head = head.next;
      tail = tail.prev;
      n--;
    }

    return this;
  }

  asHead(cell) {
    if (cell === this.head) {
      return this;
    }

    this.remove(cell);
    this.head.prev = cell;
    cell.next = this.head;
    cell.prev = undefined;
    this.head = cell;
    this._length++;
    return this;
  }

  asTail(cell) {
    if (cell === this.tail) {
      return this;
    }

    this.remove(cell);
    this.tail.next = cell;
    cell.prev = this.tail;
    cell.next = undefined;
    this.tail = cell;
    this._length++;
    return this;
  }

  toString() {
    let res = [];
    let cell = this.head;

    while (cell) {
      res.push(cell.value != null ? cell.value.toString() : cell.value === undefined ? "undefined" : "null");
      cell = cell.next;
    }

    return res.join(", ");
  }

  toJSON() {
    return [...this];
  }

}

exports.DCons = DCons;
},{"@thi.ng/checks":"node_modules/@thi.ng/checks/index.js","@thi.ng/compare":"node_modules/@thi.ng/compare/index.js","@thi.ng/equiv":"node_modules/@thi.ng/equiv/index.js","@thi.ng/errors":"node_modules/@thi.ng/errors/index.js","@thi.ng/transducers":"node_modules/@thi.ng/transducers/index.js"}],"node_modules/@thi.ng/associative/ll-set.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LLSet = void 0;

var _api = require("@thi.ng/api");

var _dcons = require("@thi.ng/dcons");

var _equiv = require("@thi.ng/equiv");

const __private = new WeakMap();
/**
 * Similar to `ArraySet`, this class is an alternative implementation of
 * the native ES6 Set API using a @thi.ng/dcons linked list as backing
 * store and a customizable value equality / equivalence predicate. By
 * the default uses `@thi.ng/equiv` for equivalence checking.
 *
 * Additionally, the type also implements the `ICopy`, `IEmpty` and
 * `IEquiv` interfaces itself.
 */


class LLSet extends Set {
  constructor(vals, opts = {}) {
    super();

    __private.set(this, {
      equiv: opts.equiv || _equiv.equiv,
      vals: new _dcons.DCons()
    });

    vals && this.into(vals);
  }

  *[Symbol.iterator]() {
    yield* __private.get(this).vals;
  }

  get [Symbol.species]() {
    return LLSet;
  }

  get [Symbol.toStringTag]() {
    return "LLSet";
  }

  get size() {
    return __private.get(this).vals.length;
  }

  copy() {
    const $this = __private.get(this);

    const s = new LLSet(null, this.opts());
    __private.get(s).vals = $this.vals.copy();
    return s;
  }

  empty() {
    return new LLSet(null, this.opts());
  }

  clear() {
    __private.get(this).vals.clear();
  }

  first() {
    if (this.size) {
      return __private.get(this).vals.head.value;
    }
  }

  add(x) {
    !this.has(x) && __private.get(this).vals.push(x);
    return this;
  }

  into(xs) {
    for (let x of xs) {
      this.add(x);
    }

    return this;
  }

  has(x) {
    return this.get(x, _api.SEMAPHORE) !== _api.SEMAPHORE;
  }
  /**
   * Returns the canonical value for `x`, if present. If the set
   * contains no equivalent for `x`, returns `notFound`.
   *
   * @param x
   * @param notFound
   */


  get(x, notFound) {
    const $this = __private.get(this);

    const eq = $this.equiv;
    let i = $this.vals.head;

    while (i) {
      if (eq(i.value, x)) {
        return i.value;
      }

      i = i.next;
    }

    return notFound;
  }

  delete(x) {
    const $this = __private.get(this);

    const eq = $this.equiv;
    let i = $this.vals.head;

    while (i) {
      if (eq(i.value, x)) {
        $this.vals.splice(i, 1);
        return true;
      }

      i = i.next;
    }

    return false;
  }

  disj(xs) {
    for (let x of xs) {
      this.delete(x);
    }

    return this;
  }

  equiv(o) {
    if (this === o) {
      return true;
    }

    if (!(o instanceof Set)) {
      return false;
    }

    if (this.size !== o.size) {
      return false;
    }

    let i = __private.get(this).vals.head;

    while (i) {
      if (!o.has(i.value)) {
        return false;
      }

      i = i.next;
    }

    return true;
  }

  forEach(fn, thisArg) {
    let i = __private.get(this).vals.head;

    while (i) {
      fn.call(thisArg, i.value, i.value, this);
      i = i.next;
    }
  }

  *entries() {
    for (let v of __private.get(this).vals) {
      yield [v, v];
    }
  }

  *keys() {
    yield* __private.get(this).vals;
  }

  *values() {
    yield* this.keys();
  }

  opts() {
    return {
      equiv: __private.get(this).equiv
    };
  }

}

exports.LLSet = LLSet;
},{"@thi.ng/api":"node_modules/@thi.ng/api/index.js","@thi.ng/dcons":"node_modules/@thi.ng/dcons/index.js","@thi.ng/equiv":"node_modules/@thi.ng/equiv/index.js"}],"node_modules/@thi.ng/associative/merge-apply.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mergeApplyObj = exports.mergeApplyMap = void 0;

var _checks = require("@thi.ng/checks");

var _utils = require("./utils");

/**
 * Similar to `mergeApplyObj()`, but for ES6 Maps instead of plain objects.
 *
 * @param src
 * @param xs
 */
const mergeApplyMap = (src, xs) => {
  const res = (0, _utils.copy)(src, Map);

  for (let [k, v] of xs) {
    res.set(k, (0, _checks.isFunction)(v) ? v(res.get(k)) : v);
  }

  return res;
};
/**
 * Similar to `mergeObjWith()`, but only supports 2 args and any
 * function values in `xs` will be called with respective value in `src`
 * to produce a new / derived value for that key, i.e.
 *
 * ```
 * dest[k] = xs[k](src[k])
 * ```
 *
 * Returns new merged object and does not modify any of the inputs.
 *
 * ```
 * mergeApplyObj(
 *   {a: "hello", b: 23, c: 12},
 *   {a: (x) => x + " world", b: 42}
 * );
 * // { a: 'hello world', b: 42, c: 12 }
 * ```
 *
 * @param src
 * @param xs
 */


exports.mergeApplyMap = mergeApplyMap;

const mergeApplyObj = (src, xs) => {
  const res = Object.assign({}, src);

  for (let k in xs) {
    const v = xs[k];
    res[k] = (0, _checks.isFunction)(v) ? v(res[k]) : v;
  }

  return res;
};

exports.mergeApplyObj = mergeApplyObj;
},{"@thi.ng/checks":"node_modules/@thi.ng/checks/index.js","./utils":"node_modules/@thi.ng/associative/utils.js"}],"node_modules/@thi.ng/associative/merge-with.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mergeObjWith = exports.mergeMapWith = void 0;

var _utils = require("./utils");

const mergeMapWith = (f, dest, ...xs) => {
  const res = (0, _utils.copy)(dest, Map);

  for (let x of xs) {
    for (let [k, v] of x) {
      res.set(k, res.has(k) ? f(res.get(k), v) : v);
    }
  }

  return res;
};

exports.mergeMapWith = mergeMapWith;

const mergeObjWith = (f, dest, ...xs) => {
  const res = Object.assign({}, dest);

  for (let x of xs) {
    for (let k in x) {
      const v = x[k];
      res[k] = res.hasOwnProperty(k) ? f(dest[k], v) : v;
    }
  }

  return res;
};

exports.mergeObjWith = mergeObjWith;
},{"./utils":"node_modules/@thi.ng/associative/utils.js"}],"node_modules/@thi.ng/associative/merge-deep.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mergeDeepObj = void 0;

var _checks = require("@thi.ng/checks");

var _mergeWith = require("./merge-with");

const mergeDeepObj = (dest, ...xs) => (0, _mergeWith.mergeObjWith)((a, b) => (0, _checks.isPlainObject)(a) && (0, _checks.isPlainObject)(b) ? mergeDeepObj(a, b) : b, dest, ...xs);

exports.mergeDeepObj = mergeDeepObj;
},{"@thi.ng/checks":"node_modules/@thi.ng/checks/index.js","./merge-with":"node_modules/@thi.ng/associative/merge-with.js"}],"node_modules/@thi.ng/associative/sorted-map.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SortedMap = void 0;

var _api = require("@thi.ng/api");

var _compare = require("@thi.ng/compare");

var _equiv = require("@thi.ng/equiv");

var _transducers = require("@thi.ng/transducers");

class Node {
  constructor(k, v, h) {
    this.k = k;
    this.v = v;
    this.next = new Array(h + 1);
  }

} // stores private properties for all instances
// http://fitzgeraldnick.com/2014/01/13/hiding-implementation-details-with-e6-weakmaps.html


const __private = new WeakMap();

class SortedMap extends Map {
  /**
   * Creates new `SortedMap` instance with optionally given pairs
   * and/or options.
   *
   * @param pairs
   * @param opts
   */
  constructor(pairs, opts = {}) {
    super();
    const cap = opts.capacity || SortedMap.DEFAULT_CAP;
    const maxh = Math.ceil(Math.log2(cap));

    __private.set(this, {
      head: new Node(null, null, 0),
      cap: Math.pow(2, maxh),
      cmp: opts.compare || _compare.compare,
      p: opts.probability || SortedMap.DEFAULT_P,
      maxh,
      length: 0,
      h: 0
    });

    if (pairs) {
      this.into(pairs);
    }
  }
  /**
   * Creates new `SortedMap` instance from given object's key-value
   * pairs.
   *
   * @param obj
   * @param opts
   */


  static fromObject(obj, opts) {
    const m = new SortedMap(null, Object.assign({
      capacity: Object.keys(obj).length
    }, opts));

    for (let k in obj) {
      obj.hasOwnProperty(k) && m.set(k, obj[k]);
    }

    return m;
  }

  get [Symbol.species]() {
    return SortedMap;
  }

  *[Symbol.iterator]() {
    let node = __private.get(this).head;

    while (node = node.next[0]) {
      yield [node.k, node.v];
    }
  }

  *entries(key, max = false) {
    const $this = __private.get(this);

    let node = $this.head;
    const cmp = $this.cmp;
    let code;

    if (max) {
      while (node = node.next[0]) {
        if (key === undefined || (code = cmp(node.k, key)) <= 0) {
          yield [node.k, node.v];
          if (code === 0) return;
        }
      }
    } else {
      while (node = node.next[0]) {
        if (key === undefined || (code = cmp(node.k, key)) >= 0) {
          yield [node.k, node.v];
        }
      }
    }
  }

  keys(key, max = false) {
    return (0, _transducers.map)(p => p[0], this.entries(key, max));
  }

  values(key, max = false) {
    return (0, _transducers.map)(p => p[1], this.entries(key, max));
  }

  get size() {
    return __private.get(this).length;
  }

  clear() {
    const $this = __private.get(this);

    $this.head = new Node(null, null, 0);
    $this.length = 0;
    $this.h = 0;
  }

  empty() {
    return new SortedMap(null, Object.assign({}, this.opts(), {
      capacity: SortedMap.DEFAULT_CAP
    }));
  }

  copy() {
    return new SortedMap(this, this.opts());
  }

  compare(o) {
    const n = this.size;
    const m = o.size;
    if (n < m) return -1;
    if (n > m) return 1;
    const i = this.entries();
    const j = o.entries();
    let x, y;
    let c;

    while (x = i.next(), y = j.next(), !x.done && !y.done) {
      if ((c = (0, _compare.compare)(x.value[0], y.value[0])) !== 0) {
        return c;
      }

      if ((c = (0, _compare.compare)(x.value[1], y.value[1])) !== 0) {
        return c;
      }
    }

    return 0;
  }

  equiv(o) {
    if (this === o) {
      return true;
    }

    if (!(o instanceof Map)) {
      return false;
    }

    if (this.size !== o.size) {
      return false;
    }

    for (let p of this.entries()) {
      if (!(0, _equiv.equiv)(o.get(p[0]), p[1])) {
        return false;
      }
    }

    return true;
  }

  first() {
    const node = __private.get(this).head.next[0];

    return node ? [node.k, node.v] : undefined;
  }

  get(k, notFound) {
    const node = this.findPredNode(k).next[0];
    return node && __private.get(this).cmp(node.k, k) === 0 ? node.v : notFound;
  }

  has(key) {
    return this.get(key, _api.SEMAPHORE) !== _api.SEMAPHORE;
  }

  set(k, v) {
    const $this = __private.get(this);

    let node = $this.head;
    let level = $this.h;
    let stack = new Array(level);
    const cmp = $this.cmp;
    let code;

    while (level >= 0) {
      while (node.next[level] && (code = cmp(node.next[level].k, k)) < 0) {
        node = node.next[level];
      }

      if (node.next[level] && code === 0) {
        do {
          node.next[level].v = v;
        } while (--level >= 0);

        return this;
      }

      stack[level--] = node;
    }

    const h = this.pickHeight($this.maxh, $this.h, $this.p);
    node = new Node(k, v, h);

    while ($this.h < h) {
      stack[++$this.h] = $this.head;
    }

    for (let i = 0; i <= h; i++) {
      node.next[i] = stack[i].next[i];
      stack[i].next[i] = node;
    }

    $this.length++;

    if ($this.length >= $this.cap) {
      $this.cap *= 2;
      $this.maxh++;
    }

    return this;
  }

  delete(k) {
    const $this = __private.get(this);

    let node = $this.head;
    let level = $this.h;
    let removed = false;
    const cmp = $this.cmp;
    let code;

    while (level >= 0) {
      while (node.next[level] && (code = cmp(node.next[level].k, k)) < 0) {
        node = node.next[level];
      }

      if (node.next[level] && code === 0) {
        removed = true;
        node.next[level] = node.next[level].next[level];

        if (node == $this.head && !node.next[level]) {
          $this.h = Math.max(0, $this.h - 1);
        }
      }

      level--;
    }

    if (removed) $this.length--;
    return removed;
  }

  into(pairs) {
    for (let p of pairs) {
      this.set(p[0], p[1]);
    }

    return this;
  }

  dissoc(...keys) {
    for (let k of keys) {
      this.delete(k);
    }

    return this;
  }

  forEach(fn, thisArg) {
    for (let p of this) {
      fn.call(thisArg, p[1], p[0], this);
    }
  }

  $reduce(rfn, acc) {
    let node = __private.get(this).head;

    while ((node = node.next[0]) && !(0, _transducers.isReduced)(acc)) {
      acc = rfn(acc, [node.k, node.v]);
    }

    return acc;
  }

  opts() {
    const $this = __private.get(this);

    return {
      capacity: $this.cap,
      compare: $this.cmp,
      probability: $this.p
    };
  }

  findPredNode(k) {
    const $this = __private.get(this);

    const cmp = $this.cmp;
    let node = $this.head;
    let level = $this.h;

    while (level >= 0) {
      while (node.next[level] && cmp(node.next[level].k, k) < 0) {
        node = node.next[level];
      }

      level--;
    }

    return node;
  }

  pickHeight(maxh, h, p) {
    const max = Math.min(maxh, h + 1);
    let level = 0;

    while (Math.random() < p && level < max) {
      level++;
    }

    return level;
  }

}

exports.SortedMap = SortedMap;
SortedMap.DEFAULT_CAP = 8;
SortedMap.DEFAULT_P = 1 / Math.E;
},{"@thi.ng/api":"node_modules/@thi.ng/api/index.js","@thi.ng/compare":"node_modules/@thi.ng/compare/index.js","@thi.ng/equiv":"node_modules/@thi.ng/equiv/index.js","@thi.ng/transducers":"node_modules/@thi.ng/transducers/index.js"}],"node_modules/@thi.ng/associative/sorted-set.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SortedSet = void 0;

var _compare = require("@thi.ng/compare");

var _transducers = require("@thi.ng/transducers");

var _sortedMap = require("./sorted-map");

const __private = new WeakMap();
/**
 * Sorted set implementation with standard ES6 Set API, customizable
 * value equality and comparison semantics and additional functionality:
 *
 * - range queries (via `entries`, `keys`, `values`)
 * - multiple value addition/deletion via `into()` and `disj()`
 *
 * Furthermore, this class implements the `ICopy`, IEmpty`, `ICompare`
 * and `IEquiv` interfaces defined by `@thi.ng/api`. The latter two
 * allow instances to be used as keys themselves in other data types
 * defined in this (and other) package(s).
 *
 * This set uses a `SortedMap` as backing store and therefore has the
 * same resizing characteristics.
 */


class SortedSet extends Set {
  /**
   * Creates new instance with optional given values and/or
   * implementation options. The options are the same as used by
   * `SortedMap`.
   *
   * @param values
   * @param opts
   */
  constructor(values, opts) {
    super();

    __private.set(this, new _sortedMap.SortedMap(values ? (0, _transducers.map)(x => [x, x], values) : null, opts));
  }

  [Symbol.iterator]() {
    return this.keys();
  }

  get [Symbol.species]() {
    return SortedSet;
  }

  get [Symbol.toStringTag]() {
    return "SortedSet";
  }

  get size() {
    return __private.get(this).size;
  }

  copy() {
    return new SortedSet(this.keys(), this.opts());
  }

  empty() {
    return new SortedSet(null, Object.assign({}, this.opts(), {
      capacity: _sortedMap.SortedMap.DEFAULT_CAP
    }));
  }

  compare(o) {
    const n = this.size;
    const m = o.size;
    if (n < m) return -1;
    if (n > m) return 1;
    const i = this.entries();
    const j = o.entries();
    let x, y;
    let c;

    while (x = i.next(), y = j.next(), !x.done && !y.done) {
      if ((c = (0, _compare.compare)(x.value[0], y.value[0])) !== 0) {
        return c;
      }
    }

    return 0;
  }

  equiv(o) {
    if (this === o) {
      return true;
    }

    if (!(o instanceof Set)) {
      return false;
    }

    if (this.size !== o.size) {
      return false;
    }

    for (let k of this.keys()) {
      if (!o.has(k)) {
        return false;
      }
    }

    return true;
  }

  $reduce(rfn, acc) {
    return __private.get(this).$reduce((_acc, x) => rfn(_acc, x[0]), acc);
  }

  entries(key, max = false) {
    return __private.get(this).entries(key, max);
  }

  keys(key, max = false) {
    return __private.get(this).keys(key, max);
  }

  values(key, max = false) {
    return __private.get(this).values(key, max);
  }

  add(value) {
    __private.get(this).set(value, value);

    return this;
  }

  into(xs) {
    for (let x of xs) {
      this.add(x);
    }

    return this;
  }

  clear() {
    __private.get(this).clear();
  }

  first() {
    const first = __private.get(this).first();

    return first ? first[0] : undefined;
  }

  delete(value) {
    return __private.get(this).delete(value);
  }

  disj(xs) {
    for (let x of xs) {
      this.delete(x);
    }

    return this;
  }

  forEach(fn, thisArg) {
    for (let p of this) {
      fn.call(thisArg, p[0], p[0], this);
    }
  }

  has(value) {
    return __private.get(this).has(value);
  }

  get(value, notFound) {
    return __private.get(this).get(value, notFound);
  }

  opts() {
    return __private.get(this).opts();
  }

}

exports.SortedSet = SortedSet;
},{"@thi.ng/compare":"node_modules/@thi.ng/compare/index.js","@thi.ng/transducers":"node_modules/@thi.ng/transducers/index.js","./sorted-map":"node_modules/@thi.ng/associative/sorted-map.js"}],"node_modules/@thi.ng/associative/union.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.union = void 0;

var _into = require("./into");

var _utils = require("./utils");

/**
 * Computes union of sets `a` and `b` and writes results to new set or
 * optionally given set `out` (assumed to be empty for correct results).
 *
 * @param a
 * @param b
 * @param out
 */
const union = (a, b, out) => {
  out = out ? (0, _into.into)(out, a) : (0, _utils.copy)(a, Set);
  return a === b ? out : (0, _into.into)(out, b);
};

exports.union = union;
},{"./into":"node_modules/@thi.ng/associative/into.js","./utils":"node_modules/@thi.ng/associative/utils.js"}],"node_modules/@thi.ng/associative/without-keys.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withoutKeysObj = exports.withoutKeysMap = void 0;

var _utils = require("./utils");

const withoutKeysMap = (src, keys) => {
  const ks = (0, _utils.ensureSet)(keys);
  const dest = (0, _utils.empty)(src, Map);

  for (let p of src.entries()) {
    const k = p[0];
    !ks.has(k) && dest.set(k, p[1]);
  }

  return dest;
};

exports.withoutKeysMap = withoutKeysMap;

const withoutKeysObj = (src, keys) => {
  const ks = (0, _utils.ensureSet)(keys);
  const dest = {};

  for (let k in src) {
    src.hasOwnProperty(k) && !ks.has(k) && (dest[k] = src[k]);
  }

  return dest;
};

exports.withoutKeysObj = withoutKeysObj;
},{"./utils":"node_modules/@thi.ng/associative/utils.js"}],"node_modules/@thi.ng/associative/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _arraySet = require("./array-set");

Object.keys(_arraySet).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _arraySet[key];
    }
  });
});

var _commonKeys = require("./common-keys");

Object.keys(_commonKeys).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _commonKeys[key];
    }
  });
});

var _difference = require("./difference");

Object.keys(_difference).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _difference[key];
    }
  });
});

var _equivMap = require("./equiv-map");

Object.keys(_equivMap).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _equivMap[key];
    }
  });
});

var _hashMap = require("./hash-map");

Object.keys(_hashMap).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _hashMap[key];
    }
  });
});

var _indexed = require("./indexed");

Object.keys(_indexed).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _indexed[key];
    }
  });
});

var _intersection = require("./intersection");

Object.keys(_intersection).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _intersection[key];
    }
  });
});

var _into = require("./into");

Object.keys(_into).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _into[key];
    }
  });
});

var _invert = require("./invert");

Object.keys(_invert).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _invert[key];
    }
  });
});

var _join = require("./join");

Object.keys(_join).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _join[key];
    }
  });
});

var _llSet = require("./ll-set");

Object.keys(_llSet).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _llSet[key];
    }
  });
});

var _mergeApply = require("./merge-apply");

Object.keys(_mergeApply).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _mergeApply[key];
    }
  });
});

var _mergeDeep = require("./merge-deep");

Object.keys(_mergeDeep).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _mergeDeep[key];
    }
  });
});

var _mergeWith = require("./merge-with");

Object.keys(_mergeWith).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _mergeWith[key];
    }
  });
});

var _merge = require("./merge");

Object.keys(_merge).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _merge[key];
    }
  });
});

var _renameKeys = require("./rename-keys");

Object.keys(_renameKeys).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _renameKeys[key];
    }
  });
});

var _selectKeys = require("./select-keys");

Object.keys(_selectKeys).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _selectKeys[key];
    }
  });
});

var _sortedMap = require("./sorted-map");

Object.keys(_sortedMap).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _sortedMap[key];
    }
  });
});

var _sortedSet = require("./sorted-set");

Object.keys(_sortedSet).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _sortedSet[key];
    }
  });
});

var _union = require("./union");

Object.keys(_union).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _union[key];
    }
  });
});

var _withoutKeys = require("./without-keys");

Object.keys(_withoutKeys).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _withoutKeys[key];
    }
  });
});
},{"./array-set":"node_modules/@thi.ng/associative/array-set.js","./common-keys":"node_modules/@thi.ng/associative/common-keys.js","./difference":"node_modules/@thi.ng/associative/difference.js","./equiv-map":"node_modules/@thi.ng/associative/equiv-map.js","./hash-map":"node_modules/@thi.ng/associative/hash-map.js","./indexed":"node_modules/@thi.ng/associative/indexed.js","./intersection":"node_modules/@thi.ng/associative/intersection.js","./into":"node_modules/@thi.ng/associative/into.js","./invert":"node_modules/@thi.ng/associative/invert.js","./join":"node_modules/@thi.ng/associative/join.js","./ll-set":"node_modules/@thi.ng/associative/ll-set.js","./merge-apply":"node_modules/@thi.ng/associative/merge-apply.js","./merge-deep":"node_modules/@thi.ng/associative/merge-deep.js","./merge-with":"node_modules/@thi.ng/associative/merge-with.js","./merge":"node_modules/@thi.ng/associative/merge.js","./rename-keys":"node_modules/@thi.ng/associative/rename-keys.js","./select-keys":"node_modules/@thi.ng/associative/select-keys.js","./sorted-map":"node_modules/@thi.ng/associative/sorted-map.js","./sorted-set":"node_modules/@thi.ng/associative/sorted-set.js","./union":"node_modules/@thi.ng/associative/union.js","./without-keys":"node_modules/@thi.ng/associative/without-keys.js"}],"node_modules/@thi.ng/rstream/pubsub.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pubsub = exports.PubSub = void 0;

var _associative = require("@thi.ng/associative");

var _errors = require("@thi.ng/errors");

var _api = require("./api");

var _subscription = require("./subscription");

var _idgen = require("./utils/idgen");

/**
 * Topic based stream splitter. Applies `topic` function to each
 * received value and only forwards it to child subscriptions for
 * returned topic. The actual topic (return value from `topic` fn) can
 * be of any type, apart from `undefined`. Complex topics (e.g objects /
 * arrays) are allowed and they're matched with registered topics using
 * @thi.ng/equiv by default (but customizable via `equiv` option).
 * Each topic can have any number of subscribers.
 *
 * If a transducer is specified for the `PubSub`, it is always applied
 * prior to passing the input to the topic function. I.e. in this case
 * the topic function will receive the transformed inputs.
 *
 * PubSub supports dynamic topic subscriptions and unsubscriptions via
 * `subscribeTopic()` and `unsubscribeTopic()`. However, the standard
 * `subscribe()` / `unsubscribe()` methods are NOT supported (since
 * meaningless) and will throw an error! `unsubscribe()` can only be
 * called WITHOUT argument to unsubscribe the entire `PubSub` instance
 * (incl. all topic subscriptions) from the parent stream.
 */
class PubSub extends _subscription.Subscription {
  constructor(opts) {
    opts = opts || {};
    super(null, opts.xform, null, opts.id || `pubsub-${(0, _idgen.nextID)()}`);
    this.topicfn = opts.topic;
    this.topics = new _associative.EquivMap(null, {
      equiv: opts.equiv
    });
  }
  /**
   * Unsupported. Use `subscribeTopic()` instead.
   */


  subscribe() {
    (0, _errors.unsupported)(`use subscribeTopic() instead`);
    return null;
  }
  /**
   * Unsupported. Use `subscribeTopic()` instead.
   */


  transform() {
    (0, _errors.unsupported)(`use subscribeTopic() instead`);
    return null;
  }

  subscribeTopic(topicID, sub, id) {
    let t = this.topics.get(topicID);

    if (!t) {
      this.topics.set(topicID, t = (0, _subscription.subscription)());
    }

    return t.subscribe(sub, id);
  }

  unsubscribeTopic(topicID, sub) {
    let t = this.topics.get(topicID);

    if (t) {
      return t.unsubscribe(sub);
    }

    return false;
  }

  unsubscribe(sub) {
    if (!sub) {
      for (let t of this.topics.values()) {
        t.unsubscribe();
      }

      this.topics.clear();
      return super.unsubscribe();
    }

    (0, _errors.unsupported)();
  }

  done() {
    for (let t of this.topics.values()) {
      t.done();
    }

    super.done();
  }

  dispatch(x) {
    _api.LOGGER.debug(this.id, "dispatch", x);

    const t = this.topicfn(x);

    if (t !== undefined) {
      const sub = this.topics.get(t);

      if (sub) {
        try {
          sub.next && sub.next(x);
        } catch (e) {
          sub.error ? sub.error(e) : this.error(e);
        }
      }
    }
  }

}
/**
 * Creates a new `PubSub` instance. See class docs for further details.
 *
 * @param opts
 */


exports.PubSub = PubSub;

const pubsub = opts => new PubSub(opts);

exports.pubsub = pubsub;
},{"@thi.ng/associative":"node_modules/@thi.ng/associative/index.js","@thi.ng/errors":"node_modules/@thi.ng/errors/index.js","./api":"node_modules/@thi.ng/rstream/api.js","./subscription":"node_modules/@thi.ng/rstream/subscription.js","./utils/idgen":"node_modules/@thi.ng/rstream/utils/idgen.js"}],"node_modules/@thi.ng/rstream/stream.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stream = stream;
exports.Stream = void 0;

var _checks = require("@thi.ng/checks");

var _errors = require("@thi.ng/errors");

var _api = require("./api");

var _subscription = require("./subscription");

var _idgen = require("./utils/idgen");

function stream(src, id) {
  return new Stream(src, id);
}

class Stream extends _subscription.Subscription {
  constructor(...args) {
    let src, id;

    switch (args.length) {
      case 0:
        break;

      case 1:
        if ((0, _checks.isString)(args[0])) {
          id = args[0];
        } else {
          src = args[0];
        }

        break;

      case 2:
        [src, id] = args;
        break;

      default:
        (0, _errors.illegalArity)(args.length);
    }

    super(null, null, null, id || `stream-${(0, _idgen.nextID)()}`);
    this.src = src;
  }

  subscribe(...args) {
    const wrapped = super.subscribe.apply(this, args);

    if (this.subs.length === 1) {
      this._cancel = this.src && this.src(this) || (() => void 0);
    }

    return wrapped;
  }

  unsubscribe(sub) {
    const res = super.unsubscribe(sub);

    if (res && (!sub || !this.subs || !this.subs.length)) {
      this.cancel();
    }

    return res;
  }

  done() {
    this.cancel();
    super.done();
    delete this.src;
    delete this._cancel;
  }

  error(e) {
    super.error(e);
    this.cancel();
  }

  cancel() {
    if (this._cancel) {
      _api.LOGGER.debug(this.id, "cancel");

      const f = this._cancel;
      delete this._cancel;
      f();
    }
  }

}

exports.Stream = Stream;
},{"@thi.ng/checks":"node_modules/@thi.ng/checks/index.js","@thi.ng/errors":"node_modules/@thi.ng/errors/index.js","./api":"node_modules/@thi.ng/rstream/api.js","./subscription":"node_modules/@thi.ng/rstream/subscription.js","./utils/idgen":"node_modules/@thi.ng/rstream/utils/idgen.js"}],"node_modules/@thi.ng/rstream/utils/close.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.closeMode = void 0;

const closeMode = close => close === true || close === undefined ? 2
/* LAST */
: close === false ? 0
/* NEVER */
: close;

exports.closeMode = closeMode;
},{}],"node_modules/@thi.ng/rstream/stream-merge.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StreamMerge = exports.merge = void 0;

var _subscription = require("./subscription");

var _close = require("./utils/close");

var _idgen = require("./utils/idgen");

/**
 * Returns a new `StreamMerge` instance, a subscription type consuming
 * inputs from multiple inputs and passing received values on to any
 * subscribers. Input streams can be added and removed dynamically. By
 * default, `StreamMerge` calls `done()` when the last active input is
 * done, but this behavior can be overridden via the `close` option.
 *
 * ```
 * merge({
 *     // input streams w/ different frequencies
 *     src: [
 *         fromIterable([1, 2, 3], 10),
 *         fromIterable([10, 20, 30], 21),
 *         fromIterable([100, 200, 300], 7)
 *     ]
 * }).subscribe(trace());
 * // 100
 * // 1
 * // 200
 * // 10
 * // 2
 * // 300
 * // 3
 * // 20
 * // 30
 * ```
 *
 * Use the `labeled()` transducer for each input to create a stream of
 * labeled values and track their provenance:
 *
 * ```ts
 * merge({
 *     src: [
 *         fromIterable([1, 2, 3]).transform(labeled("a")),
 *         fromIterable([10, 20, 30]).transform(labeled("b")),
 *     ]
 * }).subscribe(trace());
 * // ["a", 1]
 * // ["b", 10]
 * // ["a", 2]
 * // ["b", 20]
 * // ["a", 3]
 * // ["b", 30]
 * ```
 *
 * @see StreamMergeOpts
 *
 * @param opts
 */
const merge = opts => new StreamMerge(opts);

exports.merge = merge;

class StreamMerge extends _subscription.Subscription {
  constructor(opts) {
    opts = opts || {};
    super(null, opts.xform, null, opts.id || `streammerge-${(0, _idgen.nextID)()}`);
    this.sources = new Map();
    this.closeMode = (0, _close.closeMode)(opts.close);

    if (opts.src) {
      this.addAll(opts.src);
    }
  }

  add(src) {
    this.ensureState();
    this.sources.set(src, src.subscribe({
      next: x => {
        if (x instanceof _subscription.Subscription) {
          this.add(x);
        } else {
          this.next(x);
        }
      },
      done: () => this.markDone(src),
      __owner: this
    }, `in-${src.id}`));
  }

  addAll(src) {
    for (let s of src) {
      this.add(s);
    }
  }

  remove(src) {
    const sub = this.sources.get(src);

    if (sub) {
      this.sources.delete(src);
      sub.unsubscribe();
      return true;
    }

    return false;
  }

  removeID(id) {
    for (let s of this.sources) {
      if (s[0].id === id) {
        return this.remove(s[0]);
      }
    }

    return false;
  }

  removeAll(src) {
    let ok = true;

    for (let s of src) {
      ok = this.remove(s) && ok;
    }

    return ok;
  }

  removeAllIDs(ids) {
    let ok = true;

    for (let id of ids) {
      ok = this.removeID(id) && ok;
    }

    return ok;
  }

  unsubscribe(sub) {
    if (!sub) {
      for (let s of this.sources.values()) {
        s.unsubscribe();
      }

      this.state = 2
      /* DONE */
      ;
      this.sources.clear();
    }

    return super.unsubscribe(sub);
  }

  markDone(src) {
    this.remove(src);

    if (this.closeMode === 1
    /* FIRST */
    || this.closeMode === 2
    /* LAST */
    && !this.sources.size) {
      this.done();
    }
  }

}

exports.StreamMerge = StreamMerge;
},{"./subscription":"node_modules/@thi.ng/rstream/subscription.js","./utils/close":"node_modules/@thi.ng/rstream/utils/close.js","./utils/idgen":"node_modules/@thi.ng/rstream/utils/idgen.js"}],"node_modules/@thi.ng/rstream/stream-sync.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StreamSync = exports.sync = void 0;

var _checks = require("@thi.ng/checks");

var _transducers = require("@thi.ng/transducers");

var _api = require("./api");

var _subscription = require("./subscription");

var _close = require("./utils/close");

var _idgen = require("./utils/idgen");

/**
 * Similar to `StreamMerge`, but with extra synchronization of inputs.
 * Before emitting any new values, `StreamSync` collects values until at
 * least one has been received from *all* inputs. Once that's the case,
 * the collected values are sent as labeled tuple object to downstream
 * subscribers. Each value in the emitted tuple objects is stored under
 * their input stream's ID. Only the last value received from each input
 * is passed on. After the initial tuple has been emitted, you can
 * choose from two possible behaviors:
 *
 * 1) Any future change in any input will produce a new result tuple.
 *    These tuples will retain the most recently read values from other
 *    inputs. This behavior is the default and illustrated in the above
 *    schematic.
 * 2) If the `reset` option is `true`, every input will have to provide
 *    at least one new value again until another result tuple is
 *    produced.
 *
 * Any done inputs are automatically removed. By default, `StreamSync`
 * calls `done()` when the last active input is done, but this behavior
 * can be overridden via the `close` constructor option.
 *
 * ```ts
 * const a = rs.stream();
 * const b = rs.stream();
 * s = sync({ src: { a, b } }).subscribe(trace("result: "));
 * a.next(1);
 * b.next(2);
 * // result: { a: 1, b: 2 }
 * ```
 *
 * Input streams can be added and removed dynamically and the emitted
 * tuple size adjusts to the current number of inputs (the next time a
 * value is received from any input).
 *
 * If the `reset` option is enabled, the last emitted tuple is allowed
 * to be incomplete, by default. To only allow complete tuples, also set
 * the `all` option to `false`.
 *
 * The synchronization is done via the `partitionSync()` transducer from
 * the @thi.ng/transducers package. See this function's docs for further
 * details.
 *
 * @see StreamSyncOpts
 *
 * @param opts
 */
const sync = opts => new StreamSync(opts);

exports.sync = sync;

class StreamSync extends _subscription.Subscription {
  constructor(opts) {
    let srcIDs = new Set();
    let xform = (0, _transducers.comp)((0, _transducers.partitionSync)(srcIDs, {
      key: x => x[0],
      mergeOnly: opts.mergeOnly === true,
      reset: opts.reset === true,
      all: opts.all !== false
    }), (0, _transducers.mapVals)(x => x[1]));

    if (opts.xform) {
      xform = (0, _transducers.comp)(xform, opts.xform);
    }

    super(null, xform, null, opts.id || `streamsync-${(0, _idgen.nextID)()}`);
    this.sources = new Map();
    this.realSourceIDs = new Map();
    this.invRealSourceIDs = new Map();
    this.idSources = new Map();
    this.sourceIDs = srcIDs;
    this.closeMode = (0, _close.closeMode)(opts.close);

    if (opts.src) {
      this.addAll(opts.src);
    }
  }

  add(src, id) {
    id || (id = src.id);
    this.ensureState();
    this.sourceIDs.add(id);
    this.realSourceIDs.set(id, src.id);
    this.invRealSourceIDs.set(src.id, id);
    this.idSources.set(src.id, src);
    this.sources.set(src, src.subscribe({
      next: x => {
        if (x[1] instanceof _subscription.Subscription) {
          this.add(x[1]);
        } else {
          this.next(x);
        }
      },
      done: () => this.markDone(src),
      __owner: this
    }, (0, _transducers.labeled)(id), `in-${id}`));
  }

  addAll(src) {
    if ((0, _checks.isPlainObject)(src)) {
      // pre-add all source ids for partitionSync
      for (let id in src) {
        this.sourceIDs.add(id);
      }

      for (let id in src) {
        this.add(src[id], id);
      }
    } else {
      // pre-add all source ids for partitionSync
      for (let s of src) {
        this.sourceIDs.add(s.id);
      }

      for (let s of src) {
        this.add(s);
      }
    }
  }

  remove(src) {
    const sub = this.sources.get(src);

    if (sub) {
      const id = this.invRealSourceIDs.get(src.id);

      _api.LOGGER.info(`removing src: ${src.id} (${id})`);

      this.sourceIDs.delete(id);
      this.realSourceIDs.delete(id);
      this.idSources.delete(src.id);
      this.sources.delete(src);
      sub.unsubscribe();
      return true;
    }

    return false;
  }

  removeID(id) {
    const src = this.getSourceForID(id);

    if (src) {
      return this.remove(src);
    }

    return false;
  }

  removeAll(src) {
    // pre-remove all source ids for partitionSync
    for (let s of src) {
      this.sourceIDs.delete(this.invRealSourceIDs.get(s.id));
    }

    let ok = true;

    for (let s of src) {
      ok = this.remove(s) && ok;
    }

    return ok;
  }

  removeAllIDs(ids) {
    let ok = true;

    for (let id of ids) {
      ok = this.removeID(id) && ok;
    }

    return ok;
  }

  getSourceForID(id) {
    return this.idSources.get(this.realSourceIDs.get(id));
  }

  getSources() {
    const res = {};

    for (let [id, src] of this.idSources) {
      res[this.invRealSourceIDs.get(id)] = src;
    }

    return res;
  }

  unsubscribe(sub) {
    if (!sub) {
      for (let s of this.sources.values()) {
        s.unsubscribe();
      }

      this.state = 2
      /* DONE */
      ;
      this.sources.clear();
      this.sourceIDs.clear();
      this.realSourceIDs.clear();
      this.invRealSourceIDs.clear();
      this.idSources.clear();
    }

    return super.unsubscribe(sub);
  }

  markDone(src) {
    this.remove(src);

    if (this.closeMode === 1
    /* FIRST */
    || this.closeMode === 2
    /* LAST */
    && !this.sources.size) {
      this.done();
    }
  }

}

exports.StreamSync = StreamSync;
},{"@thi.ng/checks":"node_modules/@thi.ng/checks/index.js","@thi.ng/transducers":"node_modules/@thi.ng/transducers/index.js","./api":"node_modules/@thi.ng/rstream/api.js","./subscription":"node_modules/@thi.ng/rstream/subscription.js","./utils/close":"node_modules/@thi.ng/rstream/utils/close.js","./utils/idgen":"node_modules/@thi.ng/rstream/utils/idgen.js"}],"node_modules/@thi.ng/rstream/from/iterable.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fromIterableSync = exports.fromIterable = void 0;

var _stream = require("../stream");

var _idgen = require("../utils/idgen");

/**
 * Creates a new `Stream` of given iterable which asynchronously calls
 * `.next()` for each item of the iterable when the first (and in this
 * case the only one) subscriber becomes available. The values are
 * processed via `setInterval()` using the given `delay` value (default:
 * 0). Once the iterable is exhausted (if finite), then calls `.done()`
 * by default, but can be avoided by passing `false` as last argument.
 *
 * @param src
 * @param delay
 * @param close
 */
const fromIterable = (src, delay = 0, close = true) => new _stream.Stream(stream => {
  const iter = src[Symbol.iterator]();
  const id = setInterval(() => {
    let val;

    if ((val = iter.next()).done) {
      clearInterval(id);
      close && stream.done();
    } else {
      stream.next(val.value);
    }
  }, delay);
  return () => clearInterval(id);
}, `iterable-${(0, _idgen.nextID)()}`);
/**
 * Creates a new `Stream` of given iterable which synchronously calls
 * `.next()` for each item of the iterable when the first (and in this
 * case the only one) subscriber becomes available. Once the iterable is
 * exhausted (MUST be finite!), then calls `.done()` by default, but can
 * be avoided by passing `false` as last argument.
 *
 * @param src
 * @param close
 */


exports.fromIterable = fromIterable;

const fromIterableSync = (src, close = true) => new _stream.Stream(stream => {
  for (let s of src) {
    stream.next(s);
  }

  close && stream.done();
  return null;
}, `iterable-${(0, _idgen.nextID)()}`);

exports.fromIterableSync = fromIterableSync;
},{"../stream":"node_modules/@thi.ng/rstream/stream.js","../utils/idgen":"node_modules/@thi.ng/rstream/utils/idgen.js"}],"node_modules/@thi.ng/rstream/trigger.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.trigger = trigger;

var _iterable = require("./from/iterable");

function trigger(x = true) {
  return (0, _iterable.fromIterable)([x]);
}
},{"./from/iterable":"node_modules/@thi.ng/rstream/from/iterable.js"}],"node_modules/@thi.ng/rstream/from/interval.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fromInterval = void 0;

var _stream = require("../stream");

var _idgen = require("../utils/idgen");

/**
 * Returns a new `Stream` which emits a monotonically increasing counter
 * value at given `delay` interval, up to an optionally defined max
 * value (default: ∞), after which the stream is closed. The stream only
 * starts when the first subscriber becomes available.
 *
 * @param delay
 * @param count
 */
const fromInterval = (delay, count = Infinity) => new _stream.Stream(stream => {
  let i = 0;
  stream.next(i++);
  let id = setInterval(() => {
    stream.next(i++);

    if (--count <= 0) {
      clearInterval(id);
      stream.done();
    }
  }, delay);
  return () => clearInterval(id);
}, `interval-${(0, _idgen.nextID)()}`);

exports.fromInterval = fromInterval;
},{"../stream":"node_modules/@thi.ng/rstream/stream.js","../utils/idgen":"node_modules/@thi.ng/rstream/utils/idgen.js"}],"node_modules/@thi.ng/rstream/from/raf.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fromRAF = void 0;

var _checks = require("@thi.ng/checks");

var _stream = require("../stream");

var _idgen = require("../utils/idgen");

var _interval = require("./interval");

/**
 * Yields a stream of monotonically increasing counter, triggered by a
 * `requestAnimationFrame()` loop (only available in browser
 * environments). In NodeJS, this function falls back to
 * `fromInterval(16)`, yielding a similar (approximately 60fps) stream.
 *
 * Subscribers to this stream will be processed during that same loop
 * iteration.
 */
const fromRAF = () => (0, _checks.isNode)() ? (0, _interval.fromInterval)(16) : new _stream.Stream(stream => {
  let i = 0;
  let isActive = true;

  let loop = () => {
    isActive && stream.next(i++);
    isActive && (id = requestAnimationFrame(loop));
  };

  let id = requestAnimationFrame(loop);
  return () => (isActive = false, cancelAnimationFrame(id));
}, `raf-${(0, _idgen.nextID)()}`);

exports.fromRAF = fromRAF;
},{"@thi.ng/checks":"node_modules/@thi.ng/checks/index.js","../stream":"node_modules/@thi.ng/rstream/stream.js","../utils/idgen":"node_modules/@thi.ng/rstream/utils/idgen.js","./interval":"node_modules/@thi.ng/rstream/from/interval.js"}],"node_modules/@thi.ng/rstream/tween.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tweenNumber = exports.tween = void 0;

var _checks = require("@thi.ng/checks");

var _transducers = require("@thi.ng/transducers");

var _interval = require("./from/interval");

var _raf = require("./from/raf");

var _streamSync = require("./stream-sync");

/**
 * Takes an existing stream/subscription `src` and attaches new
 * subscription which interpolates between incoming values from `src`
 * using the given `mix` function. The returned construct produces
 * values at a rate controlled by the `clock` stream or frequency. If
 * omitted, `clock` defaults to `fromRAF()` (~60Hz). If given as number,
 * creates a `fromInterval(clock)` or else uses the given `clock` stream
 * directly. In general, the frequency of the `clock` should always be
 * higher than that of `src`.
 *
 * If `stop` is given as well, no values will be passed downstream if
 * that function returns true. This can be used to limit traffic once
 * the tween target value has been reached.
 *
 * The returned subscription closes automatically when either `src` or
 * `clock` is exhausted.
 *
 * ```
 * val = stream();
 *
 * rs.tween(
 *   // consume from `val` stream
 *   val,
 *   // initial start value to interpolate from
 *   0,
 *   // interpolation fn (LERP)
 *   (a, b) => a + (b - a) * 0.5,
 *   // stop emitting values if difference to previous result < 0.01
 *   (a, b) => Math.abs(a - b) < 0.01
 * ).subscribe(rs.trace("tweened"))
 *
 * a.next(10)
 * // 5
 * // 7.5
 * // ...
 * // 9.98046875
 *
 * a.next(100)
 * // 55
 * // 77.5
 * // ...
 * // 99.989013671875
 * ```
 *
 * @param src
 * @param initial
 * @param mix
 * @param stop
 * @param clock
 */
const tween = (src, initial, mix, stop, clock) => (0, _streamSync.sync)({
  src: {
    src,
    _: clock == null ? (0, _raf.fromRAF)() : (0, _checks.isNumber)(clock) ? (0, _interval.fromInterval)(clock) : clock
  },
  close: 1
  /* FIRST */

}).transform((0, _transducers.scan)((0, _transducers.reducer)(() => initial, (acc, {
  src
}) => mix(acc, src))), (0, _transducers.dedupe)(stop || (() => false)));
/**
 * Convenience version of `tween` for its most common use case, tweening
 * of numeric streams.
 *
 * @param src
 * @param init
 * @param speed
 * @param eps
 * @param clock
 */


exports.tween = tween;

const tweenNumber = (src, init = 0, speed = 0.05, eps = 1e-3, clock) => tween(src, init, (a, b) => a + (b - a) * speed, (a, b) => Math.abs(a - b) < eps, clock);

exports.tweenNumber = tweenNumber;
},{"@thi.ng/checks":"node_modules/@thi.ng/checks/index.js","@thi.ng/transducers":"node_modules/@thi.ng/transducers/index.js","./from/interval":"node_modules/@thi.ng/rstream/from/interval.js","./from/raf":"node_modules/@thi.ng/rstream/from/raf.js","./stream-sync":"node_modules/@thi.ng/rstream/stream-sync.js"}],"node_modules/@thi.ng/rstream/from/atom.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fromAtom = void 0;

var _stream = require("../stream");

var _idgen = require("../utils/idgen");

/**
 * Yields stream of value changes in given atom / cursor. Attaches watch
 * to atom and checks for value changes with given `changed` predicate
 * (`!==` by default). If the predicate returns truthy result, the new
 * value is emitted on the stream. If `emitFirst` is true (default),
 * also emits atom's current value when first subscriber attaches to
 * stream.
 *
 * See:
 * - fromView()
 * - @thi.ng/atom
 *
 * ```
 * db = new Atom({a: 23, b: 88});
 * cursor = new Cursor(db, "a")
 *
 * rs.fromAtom(cursor).subscribe(rs.trace("cursor val:"))
 * // cursor val: 23
 *
 * cursor.reset(42);
 * // cursor val: 42
 *
 * db.reset({a: 66})
 * // cursor val: 66
 * ```
 *
 * @param atom
 * @param emitFirst
 * @param changed
 */
const fromAtom = (atom, emitFirst = true, changed) => new _stream.Stream(stream => {
  changed = changed || ((a, b) => a !== b);

  atom.addWatch(stream.id, (_, prev, curr) => {
    if (changed(prev, curr)) {
      stream.next(curr);
    }
  });
  emitFirst && stream.next(atom.deref());
  return () => atom.removeWatch(stream.id);
}, `atom-${(0, _idgen.nextID)()}`);

exports.fromAtom = fromAtom;
},{"../stream":"node_modules/@thi.ng/rstream/stream.js","../utils/idgen":"node_modules/@thi.ng/rstream/utils/idgen.js"}],"node_modules/@thi.ng/rstream/from/event.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fromEvent = void 0;

var _stream = require("../stream");

var _idgen = require("../utils/idgen");

/**
 * Creates a new stream of DOM events attached to given element / event
 * target and using given event listener options (same as supported by
 * `addEventListener()`, default: false).
 *
 * @param src event target
 * @param name event name
 * @param opts listener opts
 */
const fromEvent = (src, name, opts = false) => new _stream.Stream(stream => {
  let listener = e => stream.next(e);

  src.addEventListener(name, listener, opts);
  return () => src.removeEventListener(name, listener, opts);
}, `event-${name}-${(0, _idgen.nextID)()}`);

exports.fromEvent = fromEvent;
},{"../stream":"node_modules/@thi.ng/rstream/stream.js","../utils/idgen":"node_modules/@thi.ng/rstream/utils/idgen.js"}],"node_modules/@thi.ng/rstream/from/promise.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fromPromise = void 0;

var _stream = require("../stream");

var _idgen = require("../utils/idgen");

/**
 * Yields a single-value stream of the resolved promise and then
 * automatically marks itself done. It doesn't matter if the promise
 * resolves before the first subscriber has attached.
 *
 * @param src
 */
const fromPromise = src => {
  let canceled = false;
  let isError = false;
  let err = {};
  src.catch(e => {
    err = e;
    isError = true;
  });
  return new _stream.Stream(stream => {
    src.then(x => {
      if (!canceled && stream.getState() < 2
      /* DONE */
      ) {
          if (isError) {
            stream.error(err);
            err = null;
          } else {
            stream.next(x);
            stream.done();
          }
        }
    }, e => stream.error(e));
    return () => {
      canceled = true;
    };
  }, `promise-${(0, _idgen.nextID)()}`);
};

exports.fromPromise = fromPromise;
},{"../stream":"node_modules/@thi.ng/rstream/stream.js","../utils/idgen":"node_modules/@thi.ng/rstream/utils/idgen.js"}],"node_modules/@thi.ng/rstream/from/promises.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fromPromises = void 0;

var _transducers = require("@thi.ng/transducers");

var _promise = require("./promise");

/**
 * Wraps given promises in `Promise.all()` to yield stream of results in
 * same order as arguments, then closes. If any of the promises rejects,
 * all others do too and calls `error()` in subscribers.
 *
 * ```
 * rs.fromPromises([
 *     Promise.resolve(1),
 *     Promise.resolve(2),
 *     Promise.resolve(3)
 * ]).subscribe(rs.trace())
 * // 1
 * // 2
 * // 3
 * // done
 * ```
 *
 * If individual error handling is required, an alternative is below
 * (however this approach provides no ordering guarantees):
 *
 * ```
 * rs.fromIterable([
 *     Promise.resolve(1),
 *     new Promise(()=> { setTimeout(()=> { throw new Error("eeek"); }, 10); }),
 *     Promise.resolve(3)
 * ]).subscribe(rs.resolve()).subscribe(rs.trace())
 * ```
 *
 * @param promises
 */
const fromPromises = promises => (0, _promise.fromPromise)(Promise.all(promises)).transform((0, _transducers.mapcat)(x => x));

exports.fromPromises = fromPromises;
},{"@thi.ng/transducers":"node_modules/@thi.ng/transducers/index.js","./promise":"node_modules/@thi.ng/rstream/from/promise.js"}],"node_modules/@thi.ng/paths/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mutInMany = exports.mutIn = exports.mutator = exports.deleteIn = exports.updateIn = exports.updater = exports.setInMany = exports.setIn = exports.getIn = exports.setter = exports.getter = exports.exists = exports.toPath = void 0;

var _checks = require("@thi.ng/checks");

var _errors = require("@thi.ng/errors");

const isa = Array.isArray;
const iss = _checks.isString;

const _copy = s => isa(s) ? s.slice() : Object.assign({}, s);

const compS = (k, f) => (s, v) => (s = _copy(s), s[k] = f ? f(s[k], v) : v, s);
/**
 * Converts the given key path to canonical form (array).
 *
 * ```
 * toPath("a.b.c");
 * // ["a", "b", "c"]
 *
 * toPath(0)
 * // [0]
 *
 * toPath(["a", "b", "c"])
 * // ["a", "b", "c"]
 * ```
 *
 * @param path
 */


const toPath = path => isa(path) ? path : iss(path) ? path.length > 0 ? path.split(".") : [] : path != null ? [path] : [];
/**
 * Takes an arbitrary object and lookup path. Descends into object along
 * path and returns true if the full path exists (even if final leaf
 * value is `null` or `undefined`). Checks are performed using
 * `hasOwnProperty()`.
 *
 * @param obj
 * @param path
 */


exports.toPath = toPath;

const exists = (obj, path) => {
  if (obj == null) {
    return false;
  }

  path = toPath(path);

  for (let n = path.length - 1, i = 0; i <= n; i++) {
    const k = path[i];

    if (!obj.hasOwnProperty(k)) {
      return false;
    }

    obj = obj[k];

    if (obj == null && i < n) {
      return false;
    }
  }

  return true;
};
/**
 * Composes a getter function for given nested lookup path. Optimized
 * fast execution paths are provided for path lengths less than 5.
 * Supports any `[]`-indexable data structure (arrays, objects,
 * strings).
 *
 * If `path` is given as string, it will be split using `.`. Returns
 * function which accepts single object and when called, returns value
 * at given path.
 *
 * If any intermediate key is not present in the given obj, descent
 * stops and the function returns `undefined`.
 *
 * If `path` is an empty string or array, the returned getter will
 * simply return the given state arg (identity function).
 *
 * Also see: `getIn()`
 *
 * ```
 * g = getter("a.b.c");
 * // or
 * g = getter(["a","b","c"]);
 *
 * g({a: {b: {c: 23}}}) // 23
 * g({x: 23}) // undefined
 * g() // undefined
 * ```
 *
 * @param path
 */


exports.exists = exists;

const getter = path => {
  const ks = toPath(path);
  let [a, b, c, d] = ks;

  switch (ks.length) {
    case 0:
      return s => s;

    case 1:
      return s => s != null ? s[a] : undefined;

    case 2:
      return s => s != null ? (s = s[a]) != null ? s[b] : undefined : undefined;

    case 3:
      return s => s != null ? (s = s[a]) != null ? (s = s[b]) != null ? s[c] : undefined : undefined : undefined;

    case 4:
      return s => s != null ? (s = s[a]) != null ? (s = s[b]) != null ? (s = s[c]) != null ? s[d] : undefined : undefined : undefined : undefined;

    default:
      return s => {
        const n = ks.length - 1;
        let res = s;

        for (let i = 0; res != null && i <= n; i++) {
          res = res[ks[i]];
        }

        return res;
      };
  }
};
/**
 * Composes a setter function for given nested update path. Optimized
 * fast execution paths are provided for path lengths less up to 4.
 * Supports both arrays and objects and creates intermediate shallow
 * copies at each level of the path. Thus provides structural sharing
 * with the original data for any branches not being updated by the
 * setter.
 *
 * If `path` is given as string, it will be split using `.`. Returns
 * function which accepts single object and when called, **immutably**
 * updates value at given path, i.e. produces a partial deep copy of obj
 * up until given path.
 *
 * If any intermediate key is not present in the given obj, creates a
 * plain empty object for that key and descends further.
 *
 * If `path` is an empty string or array, the returned setter will
 * simply return the new value.
 *
 * Also see: `setIn()`, `updateIn()`, `deleteIn()`
 *
 * ```
 * s = setter("a.b.c");
 * // or
 * s = setter(["a","b","c"]);
 *
 * s({a: {b: {c: 23}}}, 24)
 * // {a: {b: {c: 24}}}
 *
 * s({x: 23}, 24)
 * // { x: 23, a: { b: { c: 24 } } }
 *
 * s(null, 24)
 * // { a: { b: { c: 24 } } }
 * ```
 *
 * Only keys in the path will be modified, all other keys present in the
 * given object retain their original values to provide efficient
 * structural sharing / re-use.
 *
 * ```
 * s = setter("a.b.c");
 *
 * a = {x: {y: {z: 1}}};
 * b = s(a, 2);
 * // { x: { y: { z: 1 } }, a: { b: { c: 2 } } }
 *
 * a.x === b.x // true
 * a.x.y === b.x.y // true
 * ```
 *
 * @param path
 */


exports.getter = getter;

const setter = path => {
  const ks = toPath(path);
  let [a, b, c, d] = ks;

  switch (ks.length) {
    case 0:
      return (_, v) => v;

    case 1:
      return (s, v) => (s = _copy(s), s[a] = v, s);

    case 2:
      return (s, v) => {
        let x;
        s = _copy(s);
        s[a] = x = _copy(s[a]);
        x[b] = v;
        return s;
      };

    case 3:
      return (s, v) => {
        let x, y;
        s = _copy(s);
        s[a] = x = _copy(s[a]);
        x[b] = y = _copy(x[b]);
        y[c] = v;
        return s;
      };

    case 4:
      return (s, v) => {
        let x, y, z;
        s = _copy(s);
        s[a] = x = _copy(s[a]);
        x[b] = y = _copy(x[b]);
        y[c] = z = _copy(y[c]);
        z[d] = v;
        return s;
      };

    default:
      let f;

      for (let i = ks.length; --i >= 0;) {
        f = compS(ks[i], f);
      }

      return f;
  }
};
/**
 * Immediate use getter, i.e. same as: `getter(path)(state)`.
 *
 * ```
 * getIn({a: {b: {c: 23}}}, "a.b.c");
 * // 23
 * ```
 *
 * @param state
 * @param path
 */


exports.setter = setter;

const getIn = (state, path) => getter(path)(state);
/**
 * Immediate use setter, i.e. same as: `setter(path)(state, val)`.
 *
 * ```
 * setIn({}, "a.b.c", 23);
 * // {a: {b: {c: 23}}}
 * ```
 *
 * @param state
 * @param path
 */


exports.getIn = getIn;

const setIn = (state, path, val) => setter(path)(state, val);
/**
 * Like `setIn()`, but takes any number of path-value pairs and applies
 * them in sequence by calling `setIn()` for each. Any key paths missing
 * in the data structure will be created. Does *not* mutate original
 * (instead use `mutInMany()` for this purpose).
 *
 * ```
 * setInMany({}, "a.b", 10, "x.y.z", 20)
 * // { a: { b: 10 }, x: { y: { z: 20 } } }
 * ```
 *
 * @param state
 * @param pairs
 */


exports.setIn = setIn;

const setInMany = (state, ...pairs) => {
  const n = pairs.length;
  n & 1 && (0, _errors.illegalArgs)(`require even number of args (got ${pairs.length})`);

  for (let i = 0; i < n; i += 2) {
    state = setIn(state, pairs[i], pairs[i + 1]);
  }

  return state;
};
/**
 * Similar to `setter()`, returns a function to update values at given
 * `path` using provided update `fn`. The returned function accepts a
 * single object / array and applies `fn` to current path value (incl.
 * any additional/optional arguments passed) and uses result as new
 * value. Does not modify original state (unless given function does so
 * itself).
 *
 * ```
 * add = updater("a.b", (x, n) => x + n);
 *
 * add({a: {b: 10}}, 13);
 * // { a: { b: 23 } }
 * ```
 *
 * @param path
 * @param fn
 */


exports.setInMany = setInMany;

const updater = (path, fn) => {
  const g = getter(path);
  const s = setter(path);
  return (state, ...args) => s(state, fn.apply(null, (args.unshift(g(state)), args)));
};
/**
 * Similar to `setIn()`, but applies given function to current path
 * value (incl. any additional/optional arguments passed to `updateIn`)
 * and uses result as new value. Does not modify original state (unless
 * given function does so itself).
 *
 * ```
 * add = (x, y) => x + y;
 * updateIn({a: {b: {c: 23}}}, "a.b.c", add, 10);
 * // {a: {b: {c: 33}}}
 * ```
 *
 * @param state
 * @param path
 */


exports.updater = updater;

const updateIn = (state, path, fn, ...args) => setter(path)(state, fn.apply(null, (args.unshift(getter(path)(state)), args)));
/**
 * Uses `updateIn()` and returns updated state with key for given path
 * removed. Does not modify original state.
 *
 * Returns `undefined` if `path` is an empty string or array.
 *
 * ```
 * deleteIn({a:{b:{c: 23}}}, "a.b.c");
 * // {a: {b: {}}}
 * ```
 *
 * @param state
 * @param path
 */


exports.updateIn = updateIn;

const deleteIn = (state, path) => {
  const ks = [...toPath(path)];

  if (ks.length > 0) {
    const k = ks.pop();
    return updateIn(state, ks, x => (x = Object.assign({}, x), delete x[k], x));
  }
};
/**
 * Higher-order function, similar to `setter()`. Returns function which
 * when called mutates given object/array at given path location and
 * bails if any intermediate path values are non-indexable (only the
 * very last path element can be missing in the actual object
 * structure). If successful, returns original (mutated) object, else
 * `undefined`. This function provides optimized versions for path
 * lengths <= 4.
 *
 * @param path
 */


exports.deleteIn = deleteIn;

const mutator = path => {
  const ks = toPath(path);
  let [a, b, c, d] = ks;

  switch (ks.length) {
    case 0:
      return (_, x) => x;

    case 1:
      return (s, x) => s ? (s[a] = x, s) : undefined;

    case 2:
      return (s, x) => {
        let t;
        return s ? (t = s[a]) ? (t[b] = x, s) : undefined : undefined;
      };

    case 3:
      return (s, x) => {
        let t;
        return s ? (t = s[a]) ? (t = t[b]) ? (t[c] = x, s) : undefined : undefined : undefined;
      };

    case 4:
      return (s, x) => {
        let t;
        return s ? (t = s[a]) ? (t = t[b]) ? (t = t[c]) ? (t[d] = x, s) : undefined : undefined : undefined : undefined;
      };

    default:
      return (s, x) => {
        let t = s;
        const n = ks.length - 1;

        for (let k = 0; k < n; k++) {
          if (!(t = t[ks[k]])) return;
        }

        t[ks[n]] = x;
        return s;
      };
  }
};
/**
 * Immediate use mutator, i.e. same as: `mutator(path)(state, val)`.
 *
 * ```
 * mutIn({ a: { b: [10, 20] } }, "a.b.1", 23);
 * // { a: { b: [ 10, 23 ] } }
 *
 * // fails (see `mutator` docs)
 * mutIn({}, "a.b.c", 23);
 * // undefined
 * ```
 *
 * @param state
 * @param path
 * @param val
 */


exports.mutator = mutator;

const mutIn = (state, path, val) => mutator(path)(state, val);
/**
 * Like `mutIn()`, but takes any number of path-value pairs and applies
 * them in sequence. All key paths must already be present in the given
 * data structure until their penultimate key.
 *
 * ```
 * mutInMany({a: {b: 1}, x: {y: {z: 2}}}, "a.b", 10, "x.y.z", 20)
 * // { a: { b: 10 }, x: { y: { z: 20 } } }
 * ```
 *
 * @param state
 * @param pairs
 */


exports.mutIn = mutIn;

const mutInMany = (state, ...pairs) => {
  const n = pairs.length;
  n & 1 && (0, _errors.illegalArgs)(`require even number of args (got ${pairs.length})`);

  for (let i = 0; i < n && state; i += 2) {
    state = mutIn(state, pairs[i], pairs[i + 1]);
  }

  return state;
};

exports.mutInMany = mutInMany;
},{"@thi.ng/checks":"node_modules/@thi.ng/checks/index.js","@thi.ng/errors":"node_modules/@thi.ng/errors/index.js"}],"node_modules/@thi.ng/atom/idgen.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nextID = void 0;
let NEXT_ID = 0;

const nextID = () => NEXT_ID++;

exports.nextID = nextID;
},{}],"node_modules/@thi.ng/atom/view.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.View = void 0;

var _equiv2 = require("@thi.ng/equiv");

var _paths = require("@thi.ng/paths");

var _idgen = require("./idgen");

/**
 * This class implements readonly access to a deeply nested value with
 * in an Atom/Cursor. An optional transformer function can be supplied
 * at creation time to produce a derived/materialized view of the actual
 * value held in the atom. Views can be created directly or via the
 * `.addView()` method of the parent state. Views can be `deref()`'d
 * like atoms and polled for value changes using `changed()`. The
 * transformer is only applied once per value change and its result
 * cached until the next change.
 *
 * If the optional `lazy` is true (default), the transformer will only
 * be executed with the first `deref()` after each value change. If
 * `lazy` is false, the transformer function will be executed
 * immediately after a value change occurred and so can be used like a
 * watch which only triggers if there was an actual value change (in
 * contrast to normal watches, which execute with each update,
 * regardless of value change).
 *
 * Related, the actual value change predicate can be customized. If not
 * given, the default `@thi.ng/equiv` will be used.
 *
 * ```
 * a = new Atom({a: {b: 1}});
 * v = a.addView("a.b", (x) => x * 10);
 *
 * v.deref()
 * // 10
 *
 * // update atom state
 * a.swap((state) => setIn(state, "a.b", 2));
 * // {a: {b: 2}}
 *
 * v.changed()
 * // true
 * v.deref()
 * // 20
 *
 * v.release()
 * // remove view from parent state
 * ```
 */
class View {
  constructor(parent, path, tx, lazy = true, equiv = _equiv2.equiv) {
    this.parent = parent;
    this.id = `view-${(0, _idgen.nextID)()}`;

    this.tx = tx || (x => x);

    this.path = (0, _paths.toPath)(path);
    this.isDirty = true;
    this.isLazy = lazy;
    const lookup = (0, _paths.getter)(this.path);
    const state = this.parent.deref();
    this.unprocessed = state ? lookup(state) : undefined;

    if (!lazy) {
      this.state = this.tx(this.unprocessed);
      this.unprocessed = undefined;
    }

    parent.addWatch(this.id, (_, prev, curr) => {
      const pval = prev ? lookup(prev) : prev;
      const val = curr ? lookup(curr) : curr;

      if (!equiv(val, pval)) {
        if (lazy) {
          this.unprocessed = val;
        } else {
          this.state = this.tx(val);
        }

        this.isDirty = true;
      }
    });
  }

  get value() {
    return this.deref();
  }
  /**
   * Returns view's value. If the view has a transformer, the
   * transformed value is returned. The transformer is only run once
   * per value change. See class comments about difference between
   * lazy/eager behaviors.
   */


  deref() {
    if (this.isDirty) {
      if (this.isLazy) {
        this.state = this.tx(this.unprocessed);
        this.unprocessed = undefined;
      }

      this.isDirty = false;
    }

    return this.state;
  }
  /**
   * Returns true, if the view's value has changed since last
   * `deref()`.
   */


  changed() {
    return this.isDirty;
  }
  /**
   * Like `deref()`, but doesn't update view's cached state and dirty
   * flag if value has changed. If there's an unprocessed value
   * change, returns result of this sub's transformer or else the
   * cached value.
   *
   * **Important:** Use this function only if the view has none or or
   * a stateless transformer. Else might cause undefined/inconsistent
   * behavior when calling `view()` or `deref()` subsequently.
   */


  view() {
    return this.isDirty && this.isLazy ? this.tx(this.unprocessed) : this.state;
  }
  /**
   * Disconnects this view from parent state, marks itself
   * dirty/changed and sets its unprocessed raw value to `undefined`.
   */


  release() {
    this.unprocessed = undefined;

    if (!this.isLazy) {
      this.state = this.tx(undefined);
    }

    this.isDirty = true;
    return this.parent.removeWatch(this.id);
  }

}

exports.View = View;
},{"@thi.ng/equiv":"node_modules/@thi.ng/equiv/index.js","@thi.ng/paths":"node_modules/@thi.ng/paths/index.js","./idgen":"node_modules/@thi.ng/atom/idgen.js"}],"node_modules/@thi.ng/atom/atom.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Atom = void 0;

var _api = require("@thi.ng/api");

var _errors = require("@thi.ng/errors");

var _paths = require("@thi.ng/paths");

var _view = require("./view");

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

/**
 * Mutable wrapper for an (usually) immutable value. Support for
 * watches.
 */
let Atom = class Atom {
  constructor(val, valid) {
    if (valid && !valid(val)) {
      (0, _errors.illegalState)("initial state value did not validate");
    }

    this._value = val;
    this.valid = valid;
  }

  get value() {
    return this._value;
  }

  set value(val) {
    this.reset(val);
  }

  deref() {
    return this._value;
  }

  equiv(o) {
    return this === o;
  }

  reset(val) {
    const old = this._value;

    if (this.valid && !this.valid(val)) {
      return old;
    }

    this._value = val;
    this.notifyWatches(old, val);
    return val;
  }

  resetIn(path, val) {
    return this.reset((0, _paths.setIn)(this._value, path, val));
  }

  swap(fn, ...args) {
    return this.reset(fn.apply(null, [this._value, ...args]));
  }

  swapIn(path, fn, ...args) {
    return this.reset((0, _paths.updateIn)(this._value, path, fn, ...args));
  } // mixin stub

  /* istanbul ignore next */


  addWatch(_, __) {
    return false;
  } // mixin stub

  /* istanbul ignore next */


  removeWatch(_) {
    return false;
  } // mixin stub

  /* istanbul ignore next */


  notifyWatches(_, __) {}

  addView(path, tx, lazy = true) {
    return new _view.View(this, path, tx, lazy);
  }

  release() {
    delete this._watches;
    delete this._value;
    return true;
  }

};
exports.Atom = Atom;
exports.Atom = Atom = __decorate([_api.IWatchMixin], Atom);
},{"@thi.ng/api":"node_modules/@thi.ng/api/index.js","@thi.ng/errors":"node_modules/@thi.ng/errors/index.js","@thi.ng/paths":"node_modules/@thi.ng/paths/index.js","./view":"node_modules/@thi.ng/atom/view.js"}],"node_modules/@thi.ng/atom/cursor.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Cursor = void 0;

var _checks = require("@thi.ng/checks");

var _errors = require("@thi.ng/errors");

var _paths = require("@thi.ng/paths");

var _atom = require("./atom");

var _idgen = require("./idgen");

var _view = require("./view");

/**
 * A cursor provides read/write access to a path location within a
 * nested parent state (Atom or another Cursor). Cursors behave like
 * Atoms for all practical purposes, i.e. support `deref()`, `reset()`,
 * `swap()`, `addWatch()` etc. However, when updating a cursor's value,
 * the parent state will be updated at the cursor's path as well (incl.
 * triggering any watches and/or validators) attached to the parent.
 * Likewise, when the parent state is modified externally, the cursor's
 * value will automatically update as well. The update order of cursor's
 * sharing a common parent is undefined, but can be overridden by
 * extending this class with a custom `notifyWatches()` implementation.
 *
 * If creating multiple cursors w/ a shared parent and each cursor
 * configured with a custom ID (provided via config object to ctor),
 * it's the user's responsibility to ensure the given IDs are unique.
 * Cursors are implemented by attaching a watch to the parent and the ID
 * is used to identify each watch.
 *
 * When using the optional validator predicate (also specified via
 * config object to ctor), the cursor's validator MUST NOT conflict with
 * the one assigned to the parent or else both will go out-of-sync.
 * Therefore, when requiring validation and updating values via cursors
 * it's recommended to only specify validators for leaf-level cursors in
 * the hierarchy.
 */
class Cursor {
  constructor(...args) {
    let parent, id, lookup, update, validate, opts;

    switch (args.length) {
      case 1:
        opts = args[0];
        id = opts.id;
        parent = opts.parent;
        validate = opts.validate;

        if (opts.path) {
          if ((0, _checks.isArray)(opts.path) && (0, _checks.isFunction)(opts.path[0])) {
            [lookup, update] = opts.path;
          } else {
            lookup = (0, _paths.getter)(opts.path);
            update = (0, _paths.setter)(opts.path);
          }
        } else {
          (0, _errors.illegalArgs)("missing path config");
        }

        break;

      case 2:
        parent = args[0];
        lookup = (0, _paths.getter)(args[1]);
        update = (0, _paths.setter)(args[1]);
        break;

      case 3:
        [parent, lookup, update] = args;
        break;

      default:
        (0, _errors.illegalArity)(args.length);
    }

    this.parent = parent;
    this.id = id || `cursor-${(0, _idgen.nextID)()}`;
    this.selfUpdate = false;

    if (!lookup || !update) {
      (0, _errors.illegalArgs)();
    }

    this.local = new _atom.Atom(lookup(parent.deref()), validate);
    this.local.addWatch(this.id, (_, prev, curr) => {
      if (prev !== curr) {
        this.selfUpdate = true;
        parent.swap(state => update(state, curr));
        this.selfUpdate = false;
      }
    });
    parent.addWatch(this.id, (_, prev, curr) => {
      if (!this.selfUpdate) {
        const cval = lookup(curr);

        if (cval !== lookup(prev)) {
          this.local.reset(cval);
        }
      }
    });
  }

  get value() {
    return this.deref();
  }

  set value(val) {
    this.reset(val);
  }

  deref() {
    return this.local.deref();
  }

  release() {
    this.local.release();
    this.parent.removeWatch(this.id);
    delete this.local;
    delete this.parent;
    return true;
  }

  reset(val) {
    return this.local.reset(val);
  }

  resetIn(path, val) {
    return this.local.resetIn(path, val);
  }

  swap(fn, ...args) {
    return this.local.swap(fn, ...args);
  }

  swapIn(path, fn, ...args) {
    return this.local.swapIn(path, fn, ...args);
  }

  addWatch(id, fn) {
    return this.local.addWatch(id, fn);
  }

  removeWatch(id) {
    return this.local.removeWatch(id);
  }
  /* istanbul ignore next */


  notifyWatches(oldState, newState) {
    return this.local.notifyWatches(oldState, newState);
  }

  addView(path, tx, lazy = true) {
    return new _view.View(this, path, tx, lazy);
  }

}

exports.Cursor = Cursor;
},{"@thi.ng/checks":"node_modules/@thi.ng/checks/index.js","@thi.ng/errors":"node_modules/@thi.ng/errors/index.js","@thi.ng/paths":"node_modules/@thi.ng/paths/index.js","./atom":"node_modules/@thi.ng/atom/atom.js","./idgen":"node_modules/@thi.ng/atom/idgen.js","./view":"node_modules/@thi.ng/atom/view.js"}],"node_modules/@thi.ng/atom/history.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.History = void 0;

var _api = require("@thi.ng/api");

var _equiv = require("@thi.ng/equiv");

var _paths = require("@thi.ng/paths");

var _view = require("./view");

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var History_1;

/**
 * Undo/redo history stack wrapper for atoms and cursors. Implements
 * `IAtom` interface and so can be used directly in place and delegates
 * to wrapped atom/cursor. Value changes are only recorded in history if
 * `changed` predicate returns truthy value, or else by calling
 * `record()` directly. This class too implements the @thi.ng/api
 * `INotify` interface to support event listeners for `undo()`, `redo()`
 * and `record()`.
 */
let History = History_1 = class History {
  /**
   * @param state parent state
   * @param maxLen max size of undo stack
   * @param changed predicate to determine changed values (default `!equiv(a,b)`)
   */
  constructor(state, maxLen = 100, changed) {
    this.state = state;
    this.maxLen = maxLen;

    this.changed = changed || ((a, b) => !(0, _equiv.equiv)(a, b));

    this.clear();
  }

  get value() {
    return this.deref();
  }

  set value(val) {
    this.reset(val);
  }

  canUndo() {
    return this.history.length > 0;
  }

  canRedo() {
    return this.future.length > 0;
  }
  /**
   * Clears history & future stacks
   */


  clear() {
    this.history = [];
    this.future = [];
  }
  /**
   * Attempts to re-apply most recent historical value to atom and
   * returns it if successful (i.e. there's a history). Before the
   * switch, first records the atom's current value into the future
   * stack (to enable `redo()` feature). Returns `undefined` if
   * there's no history.
   *
   * If undo was possible, the `History.EVENT_UNDO` event is emitted
   * after the restoration with both the `prev` and `curr` (restored)
   * states provided as event value (and object with these two keys).
   * This allows for additional state handling to be executed, e.g.
   * application of the "Command pattern". See `addListener()` for
   * registering event listeners.
   */


  undo() {
    if (this.history.length) {
      const prev = this.state.deref();
      this.future.push(prev);
      const curr = this.state.reset(this.history.pop());
      this.notify({
        id: History_1.EVENT_UNDO,
        value: {
          prev,
          curr
        }
      });
      return curr;
    }
  }
  /**
   * Attempts to re-apply most recent value from future stack to atom
   * and returns it if successful (i.e. there's a future). Before the
   * switch, first records the atom's current value into the history
   * stack (to enable `undo()` feature). Returns `undefined` if
   * there's no future (so sad!).
   *
   * If redo was possible, the `History.EVENT_REDO` event is emitted
   * after the restoration with both the `prev` and `curr` (restored)
   * states provided as event value (and object with these two keys).
   * This allows for additional state handling to be executed, e.g.
   * application of the "Command pattern". See `addListener()` for
   * registering event listeners.
   */


  redo() {
    if (this.future.length) {
      const prev = this.state.deref();
      this.history.push(prev);
      const curr = this.state.reset(this.future.pop());
      this.notify({
        id: History_1.EVENT_REDO,
        value: {
          prev,
          curr
        }
      });
      return curr;
    }
  }
  /**
   * `IAtom.reset()` implementation. Delegates to wrapped atom/cursor,
   * but too applies `changed` predicate to determine if there was a
   * change and if the previous value should be recorded.
   *
   * @param val
   */


  reset(val) {
    const prev = this.state.deref();
    this.state.reset(val);
    const changed = this.changed(prev, this.state.deref());

    if (changed) {
      this.record(prev);
    }

    return val;
  }

  resetIn(path, val) {
    const prev = this.state.deref();
    const prevV = (0, _paths.getIn)(prev, path);
    const curr = (0, _paths.setIn)(prev, path, val);
    this.state.reset(curr);
    this.changed(prevV, (0, _paths.getIn)(curr, path)) && this.record(prev);
    return curr;
  }
  /**
   * `IAtom.swap()` implementation. Delegates to wrapped atom/cursor,
   * but too applies `changed` predicate to determine if there was a
   * change and if the previous value should be recorded.
   *
   * @param val
   */


  swap(fn, ...args) {
    return this.reset(fn(this.state.deref(), ...args));
  }

  swapIn(path, fn, ...args) {
    const prev = this.state.deref();
    const prevV = (0, _paths.getIn)(prev, path);
    const curr = (0, _paths.updateIn)(this.state.deref(), path, fn, ...args);
    this.state.reset(curr);
    this.changed(prevV, (0, _paths.getIn)(curr, path)) && this.record(prev);
    return curr;
  }
  /**
   * Records given state in history. This method is only needed when
   * manually managing snapshots, i.e. when applying multiple swaps on
   * the wrapped atom directly, but not wanting to create an history
   * entry for each change. **DO NOT call this explicitly if using
   * `History.reset()` / `History.swap()` etc.**
   *
   * If no `state` is given, uses the wrapped atom's current state
   * value (user code SHOULD always call without arg).
   *
   * If recording succeeded, the `History.EVENT_RECORD` event is
   * emitted with the recorded state provided as event value.
   *
   * @param state
   */


  record(state) {
    const history = this.history;
    const n = history.length;
    let ok = true; // check for arg given and not if `state == null` we want to
    // allow null/undefined as possible values

    if (!arguments.length) {
      state = this.state.deref();
      ok = !n || this.changed(history[n - 1], state);
    }

    if (ok) {
      if (n >= this.maxLen) {
        history.shift();
      }

      history.push(state);
      this.notify({
        id: History_1.EVENT_RECORD,
        value: state
      });
      this.future.length = 0;
    }
  }
  /**
   * Returns wrapped atom's **current** value.
   */


  deref() {
    return this.state.deref();
  }
  /**
   * `IWatch.addWatch()` implementation. Delegates to wrapped
   * atom/cursor.
   *
   * @param id
   * @param fn
   */


  addWatch(id, fn) {
    return this.state.addWatch(id, fn);
  }
  /**
   * `IWatch.removeWatch()` implementation. Delegates to wrapped
   * atom/cursor.
   *
   * @param id
   */


  removeWatch(id) {
    return this.state.removeWatch(id);
  }
  /**
   * `IWatch.notifyWatches()` implementation. Delegates to wrapped
   * atom/cursor.
   *
   * @param oldState
   * @param newState
   */


  notifyWatches(oldState, newState) {
    return this.state.notifyWatches(oldState, newState);
  }

  addView(path, tx, lazy = true) {
    return new _view.View(this, path, tx, lazy);
  }

  release() {
    this.state.release();
    delete this.state;
    return true;
  }

  addListener(_, __, ___) {
    return false;
  }

  removeListener(_, __, ___) {
    return false;
  }

  notify(_) {}

};
exports.History = History;
History.EVENT_UNDO = "undo";
History.EVENT_REDO = "redo";
History.EVENT_RECORD = "record";
exports.History = History = History_1 = __decorate([_api.INotifyMixin], History);
},{"@thi.ng/api":"node_modules/@thi.ng/api/index.js","@thi.ng/equiv":"node_modules/@thi.ng/equiv/index.js","@thi.ng/paths":"node_modules/@thi.ng/paths/index.js","./view":"node_modules/@thi.ng/atom/view.js"}],"node_modules/@thi.ng/atom/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _atom = require("./atom");

Object.keys(_atom).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _atom[key];
    }
  });
});

var _cursor = require("./cursor");

Object.keys(_cursor).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _cursor[key];
    }
  });
});

var _history = require("./history");

Object.keys(_history).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _history[key];
    }
  });
});

var _view = require("./view");

Object.keys(_view).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _view[key];
    }
  });
});
},{"./atom":"node_modules/@thi.ng/atom/atom.js","./cursor":"node_modules/@thi.ng/atom/cursor.js","./history":"node_modules/@thi.ng/atom/history.js","./view":"node_modules/@thi.ng/atom/view.js"}],"node_modules/@thi.ng/rstream/from/view.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fromView = void 0;

var _atom = require("@thi.ng/atom");

var _stream = require("../stream");

var _idgen = require("../utils/idgen");

/**
 * Similar to `fromAtom()`, but creates an eager derived view for a
 * nested value in atom / cursor and yields stream of its value changes.
 * Views are readonly versions of Cursors and more lightweight. The view
 * checks for value changes with given `equiv` predicate
 * (`@thi.ng/equiv` by default). If the predicate returns a falsy
 * result, the new value is emitted on the stream. The first value
 * emitted is always the (possibly transformed) current value at the
 * stream's start time (i.e. when the first subscriber attaches).
 *
 * If the optional `tx` is given, the raw value is first passed to this
 * transformer function and its result emitted on the stream.
 *
 * When the stream is cancelled the view is destroyed as well.
 *
 * See:
 * - fromAtom()
 * - @thi.ng/atom
 *
 * ```
 * db = new Atom({a: 1, b: {c: 2}});
 *
 * fromView(db, "b.c", (x) => x != null ? x : "n/a").subscribe(trace("view:"))
 * // view: 2
 *
 * db.swapIn("b.c", (x: number) => x + 1);
 * // view: 3
 *
 * db.reset({a: 10});
 * // view: n/a
 * ```
 *
 * @param atom
 * @param path
 * @param tx
 * @param equiv
 * @param id
 */
const fromView = (atom, path, tx, equiv, id) => new _stream.Stream(stream => {
  let isActive = true;
  const view = new _atom.View(atom, path, tx ? x => isActive && (x = tx(x), stream.next(x), x) : x => isActive && (stream.next(x), x), false, equiv);
  return () => (isActive = false, view.release());
}, id || `view-${(0, _idgen.nextID)()}`);

exports.fromView = fromView;
},{"@thi.ng/atom":"node_modules/@thi.ng/atom/index.js","../stream":"node_modules/@thi.ng/rstream/stream.js","../utils/idgen":"node_modules/@thi.ng/rstream/utils/idgen.js"}],"node_modules/@thi.ng/rstream/utils/worker.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeWorker = exports.inlineWorker = void 0;

const inlineWorker = src => makeWorker(new Blob([src], {
  type: "text/javascript"
}));

exports.inlineWorker = inlineWorker;

const makeWorker = worker => worker instanceof Worker ? worker : new Worker(worker instanceof Blob ? URL.createObjectURL(worker) : worker);

exports.makeWorker = makeWorker;
},{}],"node_modules/@thi.ng/rstream/from/worker.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fromWorker = void 0;

var _api = require("../api");

var _stream = require("../stream");

var _idgen = require("../utils/idgen");

var _worker2 = require("../utils/worker");

/**
 * Returns a new `Stream` instance which adds "message" and "error"
 * event listeners to given `worker` and then passes received values
 * downstream. If `terminate` is true (default), the worker will be
 * terminated when the stream is being closed (either directly or
 * indirectly, i.e. if the user called `.done()` on the stream or the
 * last child subscription has unsubscribed).
 *
 * As with `postWorker()`, the `worker` can be an existing `Worker`
 * instance, a JS source code `Blob` or an URL string. In the latter two
 * cases, a worker is created automatically using `utils/makeWorker()`.
 *
 * ```
 *
 * ```
 *
 * @param worker
 * @param terminate
 * @param id
 */
const fromWorker = (worker, terminate = true, id) => {
  const _worker = (0, _worker2.makeWorker)(worker);

  return new _stream.Stream(stream => {
    const ml = e => {
      stream.next(e.data);
    };

    const el = e => {
      stream.error(e.data);
    };

    _worker.addEventListener("message", ml);

    _worker.addEventListener("error", el);

    return () => {
      _worker.removeEventListener("message", ml);

      _worker.removeEventListener("error", el);

      if (terminate) {
        _api.LOGGER.info("terminating worker", _worker);

        _worker.terminate();
      }
    };
  }, id || `worker-${(0, _idgen.nextID)()}`);
};

exports.fromWorker = fromWorker;
},{"../api":"node_modules/@thi.ng/rstream/api.js","../stream":"node_modules/@thi.ng/rstream/stream.js","../utils/idgen":"node_modules/@thi.ng/rstream/utils/idgen.js","../utils/worker":"node_modules/@thi.ng/rstream/utils/worker.js"}],"node_modules/@thi.ng/rstream/subs/bisect.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bisect = void 0;

var _pubsub = require("../pubsub");

/**
 * Returns a new `PubSub` instance using given predicate `pred` as
 * boolean topic function and `a` & `b` as subscribers for truthy (`a`)
 * and falsy `b` values.
 *
 * ```
 * rs.fromIterable([1, 2, 3, 4]).subscribe(
 *   rs.bisect(
 *     (x) => !!(x & 1),
 *     rs.trace("odd"),
 *     rs.trace("even")
 *   )
 * );
 * // odd 1
 * // even 2
 * // odd 3
 * // even 4
 * // odd done
 * // even done
 * ```
 *
 * If `a` or `b` need to be subscribed to directly, then `a` / `b` MUST
 * be first created as `Subscription` (if not already) and a reference
 * kept prior to calling `bisect()`.
 *
 * ```
 * const odd = rs.subscription();
 * const even = rs.subscription();
 * odd.subscribe(rs.trace("odd"));
 * odd.subscribe(rs.trace("odd x10"), tx.map((x)=> x * 10));
 * even.subscribe(rs.trace("even"));
 *
 * rs.fromIterable([1, 2, 3, 4]).subscribe(
 *     rs.bisect((x) => !!(x & 1), odd, even)
 * );
 * ```
 *
 * @param pred predicate function
 * @param a subscription for truthy branch
 * @param b subscription for falsy branch
 */
const bisect = (pred, a, b) => {
  const sub = new _pubsub.PubSub({
    topic: pred
  });
  sub.subscribeTopic(true, a);
  sub.subscribeTopic(false, b);
  return sub;
};

exports.bisect = bisect;
},{"../pubsub":"node_modules/@thi.ng/rstream/pubsub.js"}],"node_modules/@thi.ng/rstream/subs/post-worker.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postWorker = void 0;

var _checks = require("@thi.ng/checks");

var _api = require("../api");

var _worker2 = require("../utils/worker");

/**
 * Creates a subscriber which forwards received values to given worker.
 * The `worker` can be an existing `Worker` instance, a JS source code
 * `Blob` or an URL string. In the latter two cases, a worker is created
 * automatically using `utils/makeWorker()`. If `transfer` is true, the
 * received values will be marked as *transferrable* and the host app
 * loses all access permissions to the transferred values. See
 * `Worker.postMessage()` for details.
 *
 * If `terminate` is set to a positive number, then the worker will be
 * automatically terminated after the stated number of milliseconds
 * **after** the parent subscription is done.
 *
 * ```
 * // worker source code
 * src = `self.onmessage = (e) => console.log("worker", e.data);`;
 *
 * a = rs.stream();
 * a.subscribe(
 *   rs.postWorker(new Blob([src], {type: "application/javascript"}))
 * );
 *
 * a.next(42)
 * // worker 42
 * ```
 *
 * @param worker
 * @param transfer
 * @param terminate worker termination delay (ms)
 */
const postWorker = (worker, transfer = false, terminate = 0) => {
  const _worker = (0, _worker2.makeWorker)(worker);

  return {
    next(x) {
      if (x instanceof Promise) {
        x.then(y => this.next(y));
        return;
      }

      let tx;

      if (transfer) {
        const ta = (0, _checks.isTypedArray)(x);

        if (ta || (0, _checks.isTransferable)(x)) {
          tx = [ta ? x.buffer : x];
        }
      }

      _worker.postMessage(x, tx);
    },

    done() {
      if (terminate > 0) {
        setTimeout(() => {
          _api.LOGGER.info("terminating worker...");

          _worker.terminate();
        }, terminate);
      }
    }

  };
};

exports.postWorker = postWorker;
},{"@thi.ng/checks":"node_modules/@thi.ng/checks/index.js","../api":"node_modules/@thi.ng/rstream/api.js","../utils/worker":"node_modules/@thi.ng/rstream/utils/worker.js"}],"node_modules/@thi.ng/rstream/subs/resolve.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Resolver = exports.resolve = void 0;

var _api = require("../api");

var _subscription = require("../subscription");

var _idgen = require("../utils/idgen");

/**
 * Creates a new subscription which receives promises, buffers them and
 * then passes their resolved values downstream. If the optional `fail`
 * handler is provided, it'll be called with the error of each failed
 * promise. If none is provided, the sub's `error()` handler is called,
 * which then stops the sub from receiving further values.
 *
 * ```
 * fromIterable([1, 2, 3], 100)
 *   .transform(tx.delayed(1000))
 *   .subscribe(resolve())
 *   .subscribe(trace("result"))
 * // result 1
 * // result 2
 * // result 3
 * // result done
 * ```
 *
 * @param opts
 */
const resolve = opts => new Resolver(opts);

exports.resolve = resolve;

class Resolver extends _subscription.Subscription {
  constructor(opts = {}) {
    super(null, null, null, opts.id || `resolve-${(0, _idgen.nextID)()}`);
    this.outstanding = 0;
    this.fail = opts.fail;
  }

  next(x) {
    this.outstanding++;
    x.then(y => {
      if (this.state < 2
      /* DONE */
      ) {
          this.dispatch(y);

          if (--this.outstanding === 0) {
            this.done();
          }
        } else {
        _api.LOGGER.warn(`resolved value in state ${this.state} (${x})`);
      }
    }, e => {
      if (this.fail) {
        this.fail(e);
      } else {
        this.error(e);
      }
    });
  }

  done() {
    if (this.parent.getState() === 2
    /* DONE */
    && this.outstanding === 0) {
      super.done();
    }
  }

}

exports.Resolver = Resolver;
},{"../api":"node_modules/@thi.ng/rstream/api.js","../subscription":"node_modules/@thi.ng/rstream/subscription.js","../utils/idgen":"node_modules/@thi.ng/rstream/utils/idgen.js"}],"node_modules/@thi.ng/rstream/subs/sidechain-partition.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SidechainPartition = exports.sidechainPartition = void 0;

var _subscription = require("../subscription");

var _idgen = require("../utils/idgen");

/**
 * Buffers values from `src` until side chain fires, then emits buffer
 * (unless empty) and repeats process until either input is done. By
 * default, the value read from the side chain is ignored, however the
 * optional predicate can be used to only trigger for specific values /
 * conditions.
 *
 * ```
 * // merge various event streams
 * events = merge([
 *     fromEvent(document,"mousemove"),
 *     fromEvent(document,"mousedown"),
 *     fromEvent(document,"mouseup")
 * ]);
 *
 * // queue event processing to only execute during the
 * // requestAnimationFrame cycle (RAF)
 * events.subscribe(sidechainPartition(fromRAF())).subscribe(trace())
 * ```
 *
 * @param side
 * @param pred
 * @param id
 */
const sidechainPartition = (side, pred, id) => new SidechainPartition(side, pred, id);

exports.sidechainPartition = sidechainPartition;

class SidechainPartition extends _subscription.Subscription {
  constructor(side, pred, id) {
    super(null, null, null, id || `sidepart-${(0, _idgen.nextID)()}`);
    this.buf = [];
    const $this = this;

    pred = pred || (() => true);

    this.sideSub = side.subscribe({
      next(x) {
        if ($this.buf.length && pred(x)) {
          $this.dispatch($this.buf);
          $this.buf = [];
        }
      },

      done() {
        if ($this.buf.length) {
          $this.dispatch($this.buf);
        }

        $this.done();
        delete $this.buf;
      }

    });
  }

  unsubscribe(sub) {
    const res = super.unsubscribe(sub);

    if (!sub || !this.subs.length) {
      this.sideSub.unsubscribe();
    }

    return res;
  }

  next(x) {
    if (this.state < 2
    /* DONE */
    ) {
        this.buf.push(x);
      }
  }

  done() {
    this.sideSub.unsubscribe();
    super.done();
  }

}

exports.SidechainPartition = SidechainPartition;
},{"../subscription":"node_modules/@thi.ng/rstream/subscription.js","../utils/idgen":"node_modules/@thi.ng/rstream/utils/idgen.js"}],"node_modules/@thi.ng/rstream/subs/sidechain-toggle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SidechainToggle = exports.sidechainToggle = void 0;

var _subscription = require("../subscription");

var _idgen = require("../utils/idgen");

/**
 * Filters values from input based on values received from side chain.
 * By default, the value read from the side chain is ignored, however
 * the optional predicate can be used to only trigger for specific
 * values/conditions. Every time the predicate fn returns true, the
 * filter will be toggled on/off. Whilst switched off, no input values
 * will be forwarded.
 *
 * ```
 * // use slower interval stream to toggle main stream on/off
 * fromInterval(500)
 *   .subscribe(sidechainToggle(fromInterval(1000)))
 *   .subscribe(trace());
 * // 0
 * // 3
 * // 4
 * // 7
 * // 8
 * ...
 * ```
 *
 * @param side
 * @param pred
 * @param initial initial switch state
 * @param id
 */
const sidechainToggle = (side, initial = true, pred, id) => new SidechainToggle(side, initial, pred, id);

exports.sidechainToggle = sidechainToggle;

class SidechainToggle extends _subscription.Subscription {
  constructor(side, initial = true, pred, id) {
    super(null, null, null, id || `sidetoggle-${(0, _idgen.nextID)()}`);
    this.isActive = initial;
    const $this = this;

    pred = pred || (() => true);

    this.sideSub = side.subscribe({
      next(x) {
        if (pred(x)) {
          $this.isActive = !$this.isActive;
        }
      },

      done() {
        $this.done();
      }

    });
  }

  unsubscribe(sub) {
    const res = super.unsubscribe(sub);

    if (!sub || !this.subs.length) {
      this.sideSub.unsubscribe();
    }

    return res;
  }

  next(x) {
    if (this.isActive) {
      super.next(x);
    }
  }

  done() {
    super.done();
    this.sideSub.unsubscribe();
  }

}

exports.SidechainToggle = SidechainToggle;
},{"../subscription":"node_modules/@thi.ng/rstream/subscription.js","../utils/idgen":"node_modules/@thi.ng/rstream/utils/idgen.js"}],"node_modules/@thi.ng/rstream/subs/trace.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.trace = void 0;

/**
 * Helper subscriber for inspection / debugging purposes. Simply logs
 * received values to console, optionally with given `prefix`.
 *
 * @param prefix
 */
const trace = prefix => ({
  next(x) {
    prefix ? console.log(prefix, x) : console.log(x);
  },

  done() {
    prefix ? console.log(prefix, "done") : console.log("done");
  },

  error(e) {
    prefix ? console.log(prefix, "error", e) : console.log("error", e);
  }

});

exports.trace = trace;
},{}],"node_modules/@thi.ng/rstream/subs/transduce.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transduce = void 0;

var _transducers = require("@thi.ng/transducers");

/**
 * Returns a promise which subscribes to given input and transforms
 * incoming values using given transducer `xform` and reducer `rfn`.
 * Once the input is done the promise will resolve with the final
 * reduced result (or fail with error).
 *
 * ```
 * rs.transduce(
 *   rs.fromIterable(tx.range(10)),
 *   tx.map((x) => x * 10),
 *   tx.add()
 * ).then((x) => console.log("result", x))
 *
 * // result 450
 * ```
 *
 * @param src
 * @param xform
 * @param rfn
 * @param init
 */
const transduce = (src, xform, rfn, init) => {
  let acc = init !== undefined ? init : rfn[0]();
  let sub;
  return new Promise((resolve, reject) => {
    sub = src.subscribe({
      next(x) {
        const _acc = rfn[2](acc, x);

        if ((0, _transducers.isReduced)(_acc)) {
          resolve(_acc.deref());
        } else {
          acc = _acc;
        }
      },

      done() {
        resolve(acc);
      },

      error(e) {
        reject(e);
      }

    }, xform);
  }).then(fulfilled => {
    sub.unsubscribe();
    return fulfilled;
  }, rejected => {
    sub.unsubscribe();
    throw rejected;
  });
};

exports.transduce = transduce;
},{"@thi.ng/transducers":"node_modules/@thi.ng/transducers/index.js"}],"node_modules/@thi.ng/rstream/subs/tunnel.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tunnel = exports.tunnel = void 0;

var _api = require("../api");

var _subscription = require("../subscription");

var _idgen = require("../utils/idgen");

var _worker = require("../utils/worker");

/**
 * Creates a new worker `Tunnel` instance with given options. This
 * subscription type processes received values via the configured
 * worker(s) and then passes any values received back from the worker(s)
 * on to downstream subscriptions, thereby allowing workers to be used
 * transparently for stream processing. Multiple worker instances are
 * supported for processing. See the `maxWorkers` option for details.
 *
 * @param opts
 */
const tunnel = opts => new Tunnel(opts);

exports.tunnel = tunnel;

class Tunnel extends _subscription.Subscription {
  constructor(opts) {
    super(null, null, null, opts.id || `tunnel-${(0, _idgen.nextID)()}`);
    this.src = opts.src;
    this.workers = new Array(opts.maxWorkers || 1);
    this.transferables = opts.transferables;
    this.terminate = opts.terminate || 1000;
    this.interrupt = opts.interrupt;
    this.index = 0;
  }

  next(x) {
    if (this.state < 2
    /* DONE */
    ) {
        let tx;

        if (this.transferables) {
          tx = this.transferables(x);
        }

        let worker = this.workers[this.index];

        if (this.interrupt && worker) {
          worker.terminate();
          worker = null;
        }

        if (!worker) {
          this.workers[this.index++] = worker = (0, _worker.makeWorker)(this.src);
          this.index %= this.workers.length;
          worker.addEventListener("message", e => this.dispatch(e.data));
          worker.addEventListener("error", e => this.error(e));
        }

        worker.postMessage(x, tx);
      }
  }

  done() {
    super.done();

    if (this.terminate > 0) {
      setTimeout(() => {
        _api.LOGGER.info("terminating workers...");

        this.workers.forEach(worker => worker && worker.terminate());
        delete this.workers;
      }, this.terminate);
    }
  }

}

exports.Tunnel = Tunnel;
},{"../api":"node_modules/@thi.ng/rstream/api.js","../subscription":"node_modules/@thi.ng/rstream/subscription.js","../utils/idgen":"node_modules/@thi.ng/rstream/utils/idgen.js","../utils/worker":"node_modules/@thi.ng/rstream/utils/worker.js"}],"node_modules/@thi.ng/rstream/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _api = require("./api");

Object.keys(_api).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _api[key];
    }
  });
});

var _metastream = require("./metastream");

Object.keys(_metastream).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _metastream[key];
    }
  });
});

var _pubsub = require("./pubsub");

Object.keys(_pubsub).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _pubsub[key];
    }
  });
});

var _stream = require("./stream");

Object.keys(_stream).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _stream[key];
    }
  });
});

var _streamMerge = require("./stream-merge");

Object.keys(_streamMerge).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _streamMerge[key];
    }
  });
});

var _streamSync = require("./stream-sync");

Object.keys(_streamSync).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _streamSync[key];
    }
  });
});

var _subscription = require("./subscription");

Object.keys(_subscription).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _subscription[key];
    }
  });
});

var _trigger = require("./trigger");

Object.keys(_trigger).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _trigger[key];
    }
  });
});

var _tween = require("./tween");

Object.keys(_tween).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _tween[key];
    }
  });
});

var _atom = require("./from/atom");

Object.keys(_atom).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _atom[key];
    }
  });
});

var _event = require("./from/event");

Object.keys(_event).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _event[key];
    }
  });
});

var _interval = require("./from/interval");

Object.keys(_interval).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _interval[key];
    }
  });
});

var _iterable = require("./from/iterable");

Object.keys(_iterable).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _iterable[key];
    }
  });
});

var _promise = require("./from/promise");

Object.keys(_promise).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _promise[key];
    }
  });
});

var _promises = require("./from/promises");

Object.keys(_promises).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _promises[key];
    }
  });
});

var _raf = require("./from/raf");

Object.keys(_raf).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _raf[key];
    }
  });
});

var _view = require("./from/view");

Object.keys(_view).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _view[key];
    }
  });
});

var _worker = require("./from/worker");

Object.keys(_worker).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _worker[key];
    }
  });
});

var _bisect = require("./subs/bisect");

Object.keys(_bisect).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _bisect[key];
    }
  });
});

var _postWorker = require("./subs/post-worker");

Object.keys(_postWorker).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _postWorker[key];
    }
  });
});

var _resolve = require("./subs/resolve");

Object.keys(_resolve).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _resolve[key];
    }
  });
});

var _sidechainPartition = require("./subs/sidechain-partition");

Object.keys(_sidechainPartition).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _sidechainPartition[key];
    }
  });
});

var _sidechainToggle = require("./subs/sidechain-toggle");

Object.keys(_sidechainToggle).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _sidechainToggle[key];
    }
  });
});

var _trace = require("./subs/trace");

Object.keys(_trace).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _trace[key];
    }
  });
});

var _transduce = require("./subs/transduce");

Object.keys(_transduce).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _transduce[key];
    }
  });
});

var _tunnel = require("./subs/tunnel");

Object.keys(_tunnel).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _tunnel[key];
    }
  });
});

var _idgen = require("./utils/idgen");

Object.keys(_idgen).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _idgen[key];
    }
  });
});

var _worker2 = require("./utils/worker");

Object.keys(_worker2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _worker2[key];
    }
  });
});
},{"./api":"node_modules/@thi.ng/rstream/api.js","./metastream":"node_modules/@thi.ng/rstream/metastream.js","./pubsub":"node_modules/@thi.ng/rstream/pubsub.js","./stream":"node_modules/@thi.ng/rstream/stream.js","./stream-merge":"node_modules/@thi.ng/rstream/stream-merge.js","./stream-sync":"node_modules/@thi.ng/rstream/stream-sync.js","./subscription":"node_modules/@thi.ng/rstream/subscription.js","./trigger":"node_modules/@thi.ng/rstream/trigger.js","./tween":"node_modules/@thi.ng/rstream/tween.js","./from/atom":"node_modules/@thi.ng/rstream/from/atom.js","./from/event":"node_modules/@thi.ng/rstream/from/event.js","./from/interval":"node_modules/@thi.ng/rstream/from/interval.js","./from/iterable":"node_modules/@thi.ng/rstream/from/iterable.js","./from/promise":"node_modules/@thi.ng/rstream/from/promise.js","./from/promises":"node_modules/@thi.ng/rstream/from/promises.js","./from/raf":"node_modules/@thi.ng/rstream/from/raf.js","./from/view":"node_modules/@thi.ng/rstream/from/view.js","./from/worker":"node_modules/@thi.ng/rstream/from/worker.js","./subs/bisect":"node_modules/@thi.ng/rstream/subs/bisect.js","./subs/post-worker":"node_modules/@thi.ng/rstream/subs/post-worker.js","./subs/resolve":"node_modules/@thi.ng/rstream/subs/resolve.js","./subs/sidechain-partition":"node_modules/@thi.ng/rstream/subs/sidechain-partition.js","./subs/sidechain-toggle":"node_modules/@thi.ng/rstream/subs/sidechain-toggle.js","./subs/trace":"node_modules/@thi.ng/rstream/subs/trace.js","./subs/transduce":"node_modules/@thi.ng/rstream/subs/transduce.js","./subs/tunnel":"node_modules/@thi.ng/rstream/subs/tunnel.js","./utils/idgen":"node_modules/@thi.ng/rstream/utils/idgen.js","./utils/worker":"node_modules/@thi.ng/rstream/utils/worker.js"}],"node_modules/@thi.ng/hdom/api.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setLogger = exports.LOGGER = void 0;

var _api = require("@thi.ng/api");

let LOGGER = _api.NULL_LOGGER;
exports.LOGGER = LOGGER;

const setLogger = logger => exports.LOGGER = LOGGER = logger;

exports.setLogger = setLogger;
},{"@thi.ng/api":"node_modules/@thi.ng/api/index.js"}],"node_modules/@thi.ng/diff/api.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DiffMode = void 0;
var DiffMode;
exports.DiffMode = DiffMode;

(function (DiffMode) {
  DiffMode[DiffMode["ONLY_DISTANCE"] = 0] = "ONLY_DISTANCE";
  DiffMode[DiffMode["ONLY_DISTANCE_LINEAR"] = 1] = "ONLY_DISTANCE_LINEAR";
  DiffMode[DiffMode["ONLY_DISTANCE_LINEAR_ONLY_CHANGES"] = 2] = "ONLY_DISTANCE_LINEAR_ONLY_CHANGES";
  DiffMode[DiffMode["FULL"] = 3] = "FULL";
})(DiffMode || (exports.DiffMode = DiffMode = {}));
},{}],"node_modules/@thi.ng/diff/array.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.diffArray = void 0;

var _equiv2 = require("@thi.ng/equiv");

let _cachedFP;

let _cachedPath;

let _cachedEPC = [];
let _cachedPathPos = [];

const cachedFP = size => _cachedFP && _cachedFP.length >= size ? _cachedFP : _cachedFP = new Int32Array(size);

const cachedPath = size => _cachedPath && _cachedPath.length >= size ? _cachedPath : _cachedPath = new Int32Array(size);

const simpleDiff = (state, src, key, logDir, mode) => {
  const n = src.length;
  const linear = state.linear;
  state.distance = n;

  if (mode !== 0
  /* ONLY_DISTANCE */
  ) {
      for (let i = 0, j = 0; i < n; i++, j += 3) {
        linear[j] = logDir;
        linear[j + 1] = i;
        linear[j + 2] = src[i];
      }

      if (mode === 3
      /* FULL */
      ) {
          const _state = state[key];

          for (let i = 0; i < n; i++) {
            _state[i] = src[i];
          }
        }
    }

  return state;
};
/**
 * Based on "An O(NP) Sequence Comparison Algorithm""
 * by Wu, Manber, Myers and Miller
 *
 * - http://www.itu.dk/stud/speciale/bepjea/xwebtex/litt/an-onp-sequence-comparison-algorithm.pdf
 * - https://github.com/cubicdaiya/onp
 *
 * Various optimizations, fixes & refactorings.
 * By default uses `@thi.ng/equiv` for equality checks.
 *
 * @param a "old" array
 * @param b "new" array
 * @param mode result mode
 * @param equiv equality predicate function
 */


const diffArray = (a, b, mode = 3
/* FULL */
, equiv = _equiv2.equiv) => {
  const state = {
    distance: 0,
    adds: {},
    dels: {},
    const: {},
    linear: []
  };

  if (a === b || a == null && b == null) {
    return state;
  } else if (a == null || a.length === 0) {
    return simpleDiff(state, b, "adds", 1, mode);
  } else if (b == null || b.length === 0) {
    return simpleDiff(state, a, "dels", -1, mode);
  }

  const reverse = a.length >= b.length;

  let _a, _b, na, nb;

  if (reverse) {
    _a = b;
    _b = a;
  } else {
    _a = a;
    _b = b;
  }

  na = _a.length;
  nb = _b.length;
  const offset = na + 1;
  const delta = nb - na;
  const doff = delta + offset;
  const size = na + nb + 3;
  const path = cachedPath(size).fill(-1, 0, size);
  const fp = cachedFP(size).fill(-1, 0, size);
  const epc = _cachedEPC;
  const pathPos = _cachedPathPos;
  epc.length = 0;
  pathPos.length = 0;

  const snake = (k, p, pp) => {
    const koff = k + offset;
    let r, y;

    if (p > pp) {
      r = path[koff - 1];
      y = p;
    } else {
      r = path[koff + 1];
      y = pp;
    }

    let x = y - k;

    while (x < na && y < nb && equiv(_a[x], _b[y])) {
      x++;
      y++;
    }

    path[koff] = pathPos.length / 3;
    pathPos.push(x, y, r);
    return y;
  };

  let p = -1,
      k,
      ko;

  do {
    p++;

    for (k = -p, ko = k + offset; k < delta; k++, ko++) {
      fp[ko] = snake(k, fp[ko - 1] + 1, fp[ko + 1]);
    }

    for (k = delta + p, ko = k + offset; k > delta; k--, ko--) {
      fp[ko] = snake(k, fp[ko - 1] + 1, fp[ko + 1]);
    }

    fp[doff] = snake(delta, fp[doff - 1] + 1, fp[doff + 1]);
  } while (fp[doff] !== nb);

  state.distance = delta + 2 * p;

  if (mode !== 0
  /* ONLY_DISTANCE */
  ) {
      p = path[doff] * 3;

      while (p >= 0) {
        epc.push(p);
        p = pathPos[p + 2] * 3;
      }

      if (mode === 3
      /* FULL */
      ) {
          buildFullLog(epc, pathPos, state, _a, _b, reverse);
        } else {
        buildLinearLog(epc, pathPos, state, _a, _b, reverse, mode === 1
        /* ONLY_DISTANCE_LINEAR */
        );
      }
    }

  return state;
};

exports.diffArray = diffArray;

const buildFullLog = (epc, pathPos, state, a, b, reverse) => {
  const linear = state.linear;
  const _const = state.const;
  let i = epc.length,
      px = 0,
      py = 0;
  let adds, dels, aID, dID;

  if (reverse) {
    adds = state.dels;
    dels = state.adds;
    aID = -1;
    dID = 1;
  } else {
    adds = state.adds;
    dels = state.dels;
    aID = 1;
    dID = -1;
  }

  for (; --i >= 0;) {
    const e = epc[i];
    const ppx = pathPos[e];
    const ppy = pathPos[e + 1];
    const d = ppy - ppx;

    while (px < ppx || py < ppy) {
      const dp = py - px;

      if (d > dp) {
        linear.push(aID, py, adds[py] = b[py]);
        py++;
      } else if (d < dp) {
        linear.push(dID, px, dels[px] = a[px]);
        px++;
      } else {
        linear.push(0, px, _const[px] = a[px]);
        px++;
        py++;
      }
    }
  }
};

const buildLinearLog = (epc, pathPos, state, a, b, reverse, inclConst) => {
  const linear = state.linear;
  const aID = reverse ? -1 : 1;
  const dID = reverse ? 1 : -1;
  let i = epc.length,
      px = 0,
      py = 0;

  for (; --i >= 0;) {
    const e = epc[i];
    const ppx = pathPos[e];
    const ppy = pathPos[e + 1];
    const d = ppy - ppx;

    while (px < ppx || py < ppy) {
      const dp = py - px;

      if (d > dp) {
        linear.push(aID, py, b[py]);
        py++;
      } else if (d < dp) {
        linear.push(dID, px, a[px]);
        px++;
      } else {
        inclConst && linear.push(0, px, a[px]);
        px++;
        py++;
      }
    }
  }
};
},{"@thi.ng/equiv":"node_modules/@thi.ng/equiv/index.js"}],"node_modules/@thi.ng/diff/object.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.diffObject = void 0;

var _equiv2 = require("@thi.ng/equiv");

const diffObject = (a, b, mode = 3
/* FULL */
, _equiv = _equiv2.equiv) => a === b ? {
  distance: 0
} : mode === 0
/* ONLY_DISTANCE */
? diffObjectDist(a, b, _equiv) : diffObjectFull(a, b, _equiv);

exports.diffObject = diffObject;

const diffObjectDist = (a, b, _equiv) => {
  let d = 0;

  for (let k in a) {
    const vb = b[k];
    (vb === undefined || !_equiv(a[k], vb)) && d++;
  }

  for (let k in b) {
    !(k in a) && d++;
  }

  return {
    distance: d
  };
};

const diffObjectFull = (a, b, _equiv) => {
  let d = 0;
  const adds = [];
  const dels = [];
  const edits = [];

  for (let k in a) {
    const vb = b[k];

    if (vb === undefined) {
      dels.push(k);
      d++;
    } else if (!_equiv(a[k], vb)) {
      edits.push(k, vb);
      d++;
    }
  }

  for (let k in b) {
    if (!(k in a)) {
      adds.push(k);
      d++;
    }
  }

  return {
    distance: d,
    adds,
    dels,
    edits
  };
};
},{"@thi.ng/equiv":"node_modules/@thi.ng/equiv/index.js"}],"node_modules/@thi.ng/diff/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _api = require("./api");

Object.keys(_api).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _api[key];
    }
  });
});

var _array = require("./array");

Object.keys(_array).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _array[key];
    }
  });
});

var _object = require("./object");

Object.keys(_object).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _object[key];
    }
  });
});
},{"./api":"node_modules/@thi.ng/diff/api.js","./array":"node_modules/@thi.ng/diff/array.js","./object":"node_modules/@thi.ng/diff/object.js"}],"node_modules/@thi.ng/hdom/diff.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.equiv = exports.releaseTree = exports.diffAttributes = exports.diffTree = void 0;

var _api = require("@thi.ng/api");

var _diff = require("@thi.ng/diff");

var _equiv2 = require("@thi.ng/equiv");

const isArray = Array.isArray;
const max = Math.max; // child index tracking template buffer

const INDEX = (() => {
  const res = new Array(2048);

  for (let i = 2, n = res.length; i < n; i++) {
    res[i] = i - 2;
  }

  return res;
})();

const buildIndex = n => {
  if (n <= INDEX.length) {
    return INDEX.slice(0, n);
  }

  const res = new Array(n);

  while (--n >= 2) {
    res[n] = n - 2;
  }

  return res;
};
/**
 * See `HDOMImplementation` interface for further details.
 *
 * @param opts
 * @param impl hdom implementation
 * @param parent
 * @param prev previous tree
 * @param curr current tree
 * @param child child index
 */


const diffTree = (opts, impl, parent, prev, curr, child = 0) => {
  const attribs = curr[1];

  if (attribs.__skip) {
    return;
  } // always replace element if __diff = false


  if (attribs.__diff === false) {
    releaseTree(prev);
    impl.replaceChild(opts, parent, child, curr);
    return;
  } // delegate to branch-local implementation


  let _impl = attribs.__impl;

  if (_impl && _impl !== impl) {
    return _impl.diffTree(opts, _impl, parent, prev, curr, child);
  }

  const delta = (0, _diff.diffArray)(prev, curr, 1
  /* ONLY_DISTANCE_LINEAR */
  , equiv);

  if (delta.distance === 0) {
    return;
  }

  const edits = delta.linear;
  const el = impl.getChild(parent, child);
  let i;
  let ii;
  let j;
  let idx;
  let k;
  let eq;
  let status;
  let val;

  if (edits[0] !== 0 || prev[1].key !== attribs.key) {
    // LOGGER.fine("replace:", prev, curr);
    releaseTree(prev);
    impl.replaceChild(opts, parent, child, curr);
    return;
  }

  if ((val = prev.__release) && val !== curr.__release) {
    releaseTree(prev);
  }

  if (edits[3] !== 0) {
    diffAttributes(impl, el, prev[1], curr[1]); // if attribs changed & distance == 2 then we're done here...

    if (delta.distance === 2) {
      return;
    }
  }

  const numEdits = edits.length;
  const prevLength = prev.length - 1;
  const equivKeys = extractEquivElements(edits);
  const offsets = buildIndex(prevLength + 1);

  for (i = 2, ii = 6; ii < numEdits; i++, ii += 3) {
    status = edits[ii];
    if (!status) continue;

    if (status === -1) {
      // element removed / edited?
      val = edits[ii + 2];

      if (isArray(val)) {
        k = val[1].key;

        if (k !== undefined && equivKeys[k][2] !== undefined) {
          eq = equivKeys[k];
          k = eq[0]; // LOGGER.fine(`diff equiv key @ ${k}:`, prev[k], curr[eq[2]]);

          diffTree(opts, impl, el, prev[k], curr[eq[2]], offsets[k]);
        } else {
          idx = edits[ii + 1]; // LOGGER.fine("remove @", offsets[idx], val);

          releaseTree(val);
          impl.removeChild(el, offsets[idx]);

          for (j = prevLength; j > idx; j--) {
            offsets[j] = max(offsets[j] - 1, 0);
          }
        }
      } else if (typeof val === "string") {
        impl.setContent(el, "");
      }
    } else {
      // element added/inserted?
      val = edits[ii + 2];

      if (typeof val === "string") {
        impl.setContent(el, val);
      } else if (isArray(val)) {
        k = val[1].key;

        if (k === undefined || equivKeys[k][0] === undefined) {
          idx = edits[ii + 1]; // LOGGER.fine("insert @", offsets[idx], val);

          impl.createTree(opts, el, val, offsets[idx]);

          for (j = prevLength; j >= idx; j--) {
            offsets[j]++;
          }
        }
      }
    }
  } // call __init after all children have been added/updated


  if ((val = curr.__init) && val != prev.__init) {
    val.apply(curr, [el, ...curr.__args]);
  }
};
/**
 * Helper function for `diffTree()` to compute & apply the difference
 * between a node's `prev` and `curr` attributes.
 *
 * @param impl
 * @param el
 * @param prev
 * @param curr
 */


exports.diffTree = diffTree;

const diffAttributes = (impl, el, prev, curr) => {
  const delta = (0, _diff.diffObject)(prev, curr, 3
  /* FULL */
  , _equiv2.equiv);
  impl.removeAttribs(el, delta.dels, prev);
  let val = _api.SEMAPHORE;
  let i, e, edits;

  for (edits = delta.edits, i = edits.length; (i -= 2) >= 0;) {
    const a = edits[i];

    if (a.indexOf("on") === 0) {
      impl.removeAttribs(el, [a], prev);
    }

    if (a !== "value") {
      impl.setAttrib(el, a, edits[i + 1], curr);
    } else {
      val = edits[i + 1];
    }
  }

  for (edits = delta.adds, i = edits.length; --i >= 0;) {
    e = edits[i];

    if (e !== "value") {
      impl.setAttrib(el, e, curr[e], curr);
    } else {
      val = curr[e];
    }
  }

  if (val !== _api.SEMAPHORE) {
    impl.setAttrib(el, "value", val, curr);
  }
};
/**
 * Recursively attempts to call the `release` lifecycle method on every
 * element in given tree (branch), using depth-first descent. Each
 * element is checked for the presence of the `__release` control
 * attribute. If (and only if) it is set to `false`, further descent
 * into that element's branch is skipped.
 *
 * @param tag
 */


exports.diffAttributes = diffAttributes;

const releaseTree = tag => {
  if (isArray(tag)) {
    let x;

    if ((x = tag[1]) && x.__release === false) {
      return;
    }

    if (tag.__release) {
      // LOGGER.fine("call __release", tag);
      tag.__release.apply(tag.__this, tag.__args);

      delete tag.__release;
    }

    for (x = tag.length; --x >= 2;) {
      releaseTree(tag[x]);
    }
  }
};

exports.releaseTree = releaseTree;

const extractEquivElements = edits => {
  let k;
  let val;
  let ek;
  const equiv = {};

  for (let i = edits.length; (i -= 3) >= 0;) {
    val = edits[i + 2];

    if (isArray(val) && (k = val[1].key) !== undefined) {
      ek = equiv[k];
      !ek && (equiv[k] = ek = [,,]);
      ek[edits[i] + 1] = edits[i + 1];
    }
  }

  return equiv;
};

const OBJP = Object.getPrototypeOf({});
const FN = "function";
const STR = "string";
/**
 * Customized version @thi.ng/equiv which takes `__diff` attributes into
 * account (at any nesting level). If an hdom element's attribute object
 * contains `__diff: false`, the object will ALWAYS be considered
 * unequal, even if all other attributes in the object are equivalent.
 *
 * @param a
 * @param b
 */

const equiv = (a, b) => {
  let proto;

  if (a === b) {
    return true;
  }

  if (a != null) {
    if (typeof a.equiv === FN) {
      return a.equiv(b);
    }
  } else {
    return a == b;
  }

  if (b != null) {
    if (typeof b.equiv === FN) {
      return b.equiv(a);
    }
  } else {
    return a == b;
  }

  if (typeof a === STR || typeof b === STR) {
    return false;
  }

  if ((proto = Object.getPrototypeOf(a), proto == null || proto === OBJP) && (proto = Object.getPrototypeOf(b), proto == null || proto === OBJP)) {
    return !(a.__diff === false || b.__diff === false) && (0, _equiv2.equivObject)(a, b, equiv);
  }

  if (typeof a !== FN && a.length !== undefined && typeof b !== FN && b.length !== undefined) {
    return (0, _equiv2.equivArrayLike)(a, b, equiv);
  }

  if (a instanceof Set && b instanceof Set) {
    return (0, _equiv2.equivSet)(a, b, equiv);
  }

  if (a instanceof Map && b instanceof Map) {
    return (0, _equiv2.equivMap)(a, b, equiv);
  }

  if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime();
  }

  if (a instanceof RegExp && b instanceof RegExp) {
    return a.toString() === b.toString();
  } // NaN


  return a !== a && b !== b;
};

exports.equiv = equiv;
},{"@thi.ng/api":"node_modules/@thi.ng/api/index.js","@thi.ng/diff":"node_modules/@thi.ng/diff/index.js","@thi.ng/equiv":"node_modules/@thi.ng/equiv/index.js"}],"node_modules/@thi.ng/hiccup/api.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ENTITY_RE = exports.NO_SPANS = exports.COMMENT = exports.ENTITIES = exports.VOID_TAGS = exports.SVG_TAGS = exports.PROC_TAGS = exports.TAG_REGEXP = exports.XHTML_NS = exports.XLINK_NS = exports.SVG_NS = void 0;
const SVG_NS = "http://www.w3.org/2000/svg";
exports.SVG_NS = SVG_NS;
const XLINK_NS = "http://www.w3.org/1999/xlink";
exports.XLINK_NS = XLINK_NS;
const XHTML_NS = "http://www.w3.org/1999/xhtml";
exports.XHTML_NS = XHTML_NS;
const TAG_REGEXP = /^([^\s\.#]+)(?:#([^\s\.#]+))?(?:\.([^\s#]+))?$/;
exports.TAG_REGEXP = TAG_REGEXP;
const PROC_TAGS = {
  "?xml": "?>\n",
  "!DOCTYPE": ">\n",
  "!ENTITY": ">\n",
  "!ELEMENT": ">\n",
  "!ATTLIST": ">\n"
}; // tslint:disable-next-line

exports.PROC_TAGS = PROC_TAGS;
const SVG_TAGS = "animate animateColor animateMotion animateTransform circle clipPath color-profile defs desc discard ellipse feBlend feColorMatrix feComponentTransfer feComposite feConvolveMatrix feDiffuseLighting feDisplacementMap feDistantLight feDropShadow feFlood feFuncA feFuncB feFuncG feFuncR feGaussianBlur feImage feMerge feMergeNode feMorphology feOffset fePointLight feSpecularLighting feSpotLight feTile feTurbulence filter font foreignObject g image line linearGradient marker mask metadata mpath path pattern polygon polyline radialGradient rect set stop style svg switch symbol text textPath title tref tspan use view".split(" ").reduce((acc, x) => (acc[x] = 1, acc), {}); // tslint:disable-next-line

exports.SVG_TAGS = SVG_TAGS;
const VOID_TAGS = "area base br circle col command ellipse embed hr img input keygen line link meta param path polygon polyline rect source stop track use wbr ?xml".split(" ").reduce((acc, x) => (acc[x] = 1, acc), {});
exports.VOID_TAGS = VOID_TAGS;
const ENTITIES = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&apos;"
};
exports.ENTITIES = ENTITIES;
const COMMENT = "__COMMENT__";
exports.COMMENT = COMMENT;
const NO_SPANS = {
  button: 1,
  option: 1,
  text: 1,
  textarea: 1
};
exports.NO_SPANS = NO_SPANS;
const ENTITY_RE = new RegExp(`[${Object.keys(ENTITIES)}]`, "g");
exports.ENTITY_RE = ENTITY_RE;
},{}],"node_modules/@thi.ng/hiccup/css.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.css = void 0;

var _checks = require("@thi.ng/checks");

const css = rules => {
  let css = "",
      v;

  for (let r in rules) {
    v = rules[r];

    if ((0, _checks.isFunction)(v)) {
      v = v(rules);
    }

    v != null && (css += `${r}:${v};`);
  }

  return css;
};

exports.css = css;
},{"@thi.ng/checks":"node_modules/@thi.ng/checks/index.js"}],"node_modules/@thi.ng/hiccup/deref.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.derefContext = void 0;

var _checks = require("@thi.ng/checks");

/**
 * Takes an arbitrary `ctx` object and array of `keys`. Attempts to call
 * `.deref()` on all given keys' values and stores result values instead
 * of original. Returns updated copy of `ctx` or original if `ctx` is
 * `null` or no keys were given.
 *
 * @param ctx
 * @param keys
 */
const derefContext = (ctx, keys) => {
  if (ctx == null || !keys || !keys.length) return ctx;
  const res = Object.assign({}, ctx);

  for (let k of keys) {
    const v = res[k];
    (0, _checks.implementsFunction)(v, "deref") && (res[k] = v.deref());
  }

  return res;
};

exports.derefContext = derefContext;
},{"@thi.ng/checks":"node_modules/@thi.ng/checks/index.js"}],"node_modules/@thi.ng/hiccup/escape.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.escape = void 0;

var _api = require("./api");

const escape = x => x.replace(_api.ENTITY_RE, y => _api.ENTITIES[y]);

exports.escape = escape;
},{"./api":"node_modules/@thi.ng/hiccup/api.js"}],"node_modules/@thi.ng/hiccup/serialize.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.normalize = exports.serialize = void 0;

var _checks = require("@thi.ng/checks");

var _errors = require("@thi.ng/errors");

var _api = require("./api");

var _css = require("./css");

var _escape = require("./escape");

/**
 * Recursively normalizes and serializes given tree as HTML/SVG/XML
 * string. Expands any embedded component functions with their results.
 * Each node of the input tree can have one of the following input
 * forms:
 *
 * ```js
 * ["tag", ...]
 * ["tag#id.class1.class2", ...]
 * ["tag", {other: "attrib"}, ...]
 * ["tag", {...}, "body", function, ...]
 * [function, arg1, arg2, ...]
 * [{render: (ctx,...) => [...]}, args...]
 * iterable
 * ```
 *
 * Tags can be defined in "Zencoding" convention, e.g.
 *
 * ```js
 * ["div#foo.bar.baz", "hi"] // <div id="foo" class="bar baz">hi</div>
 * ```
 *
 * The presence of the attributes object (2nd array index) is optional.
 * Any attribute values, incl. functions are allowed. If the latter, the
 * function is called with the full attribs object as argument and the
 * return value is used for the attribute. This allows for the dynamic
 * creation of attrib values based on other attribs. The only exception
 * to this are event attributes, i.e. attribute names starting with
 * "on". Function values assigned to event attributes will be omitted
 * from the output.
 *
 * ```js
 * ["div#foo", { bar: (attribs) => attribs.id + "-bar" }]
 * // <div id="foo" bar="foo-bar"></div>
 * ```
 *
 * The `style` attribute can ONLY be defined as string or object.
 *
 * ```js
 * ["div", {style: {color: "red", background: "#000"}}]
 * // <div style="color:red;background:#000;"></div>
 * ```
 *
 * Boolean attribs are serialized in HTML5 syntax (present or not).
 * `null`, `undefined` or empty string attrib values are ignored.
 *
 * Any `null` or `undefined` array values (other than in head position)
 * will also be removed, unless a function is in head position.
 *
 * A function in head position of a node acts as a mechanism for
 * component composition & delayed execution. The function will only be
 * executed at serialization time. In this case the optional global
 * context object and all other elements of that node / array are passed
 * as arguments when that function is called. The return value the
 * function MUST be a valid new tree (or `undefined`).
 *
 * If the `ctx` object it'll be passed to each embedded component fns.
 * Optionally call `derefContext()` prior to `serialize()` to auto-deref
 * context keys with values implementing the thi.ng/api `IDeref`
 * interface.
 *
 * ```js
 * const foo = (ctx, a, b) => ["div#" + a, ctx.foo, b];
 *
 * serialize([foo, "id", "body"], { foo: { class: "black" } })
 * // <div id="id" class="black">body</div>
 * ```
 *
 * Functions located in other positions are called ONLY with the global
 * context arg and can return any (serializable) value (i.e. new trees,
 * strings, numbers, iterables or any type with a suitable
 * `.toString()`, `.toHiccup()` or `.deref()` implementation).
 *
 * If the optional `span` flag is true (default: false), all text
 * content will be wrapped in <span> elements (this is to ensure DOM
 * compatibility with hdom). The only elements for spans are never
 * created are listed in `NO_SPANS` in `api.ts`.
 *
 * If the optional `keys` flag is true (default: false), all elements
 * will have an autogenerated `key` attribute injected. If `span` is
 * enabled, `keys` will be enabled by default too (since in this case we
 * assume the output is meant to be compatible with @thi.ng/hdom).
 *
 * hiccup & hdom control attributes (i.e. attrib names prefixed with
 * `__`) will be omitted from the output. The only control attrib
 * supported by this package is `__serialize`. If set to `false`, the
 * entire tree branch will be excluded from the output.
 *
 * Single or multiline comments can be included using the special
 * `COMMENT` tag (`__COMMENT__`) (always WITHOUT attributes!).
 *
 * ```
 * [COMMENT, "Hello world"]
 * // <!-- Hello world -->
 *
 * [COMMENT, "Hello", "world"]
 * <!--
 *     Hello
 *     world
 * -->
 * ```
 *
 * Currently, the only processing / DTD instructions supported are:
 *
 * - `?xml`
 * - `!DOCTYTPE`
 * - `!ELEMENT`
 * - `!ENTITY`
 * - `!ATTLIST`
 *
 * These are used as follows (attribs are only allowed for `?xml`, all
 * others only accept a body string which is taken as is):
 *
 * ```
 * ["?xml", { version: "1.0", standalone: "yes" }]
 * // <?xml version="1.0" standalone="yes"?>
 *
 * ["!DOCTYPE", "html"]
 * // <!DOCTYPE html>
 * ```
 *
 * @param tree hiccup elements / component tree
 * @param ctx arbitrary user context object
 * @param escape auto-escape entities
 * @param span use spans for text content
 * @param keys attach key attribs
 */
const serialize = (tree, ctx, escape = false, span = false, keys = span, path = [0]) => _serialize(tree, ctx, escape, span, keys, path);

exports.serialize = serialize;

const _serialize = (tree, ctx, esc, span, keys, path) => {
  if (tree == null) {
    return "";
  }

  if (Array.isArray(tree)) {
    if (!tree.length) {
      return "";
    }

    let tag = tree[0];

    if ((0, _checks.isFunction)(tag)) {
      return _serialize(tag.apply(null, [ctx, ...tree.slice(1)]), ctx, esc, span, keys, path);
    }

    if ((0, _checks.implementsFunction)(tag, "render")) {
      return _serialize(tag.render.apply(null, [ctx, ...tree.slice(1)]), ctx, esc, span, keys, path);
    }

    if ((0, _checks.isString)(tag)) {
      if (tag === _api.COMMENT) {
        return tree.length > 2 ? `\n<!--\n${tree.slice(1).map(x => "    " + x).join("\n")}\n-->\n` : `\n<!-- ${tree[1]} -->\n`;
      }

      tree = normalize(tree);
      tag = tree[0];
      const attribs = tree[1];

      if (attribs.__skip || attribs.__serialize === false) {
        return "";
      }

      let body = tree[2];
      let res = `<${tag}`;

      if (keys && attribs.key === undefined) {
        attribs.key = path.join("-");
      }

      for (let a in attribs) {
        if (a.startsWith("__")) continue;

        if (attribs.hasOwnProperty(a)) {
          let v = attribs[a];

          if (v != null) {
            if ((0, _checks.isFunction)(v)) {
              if (/^on\w+/.test(a) || (v = v(attribs)) == null) {
                continue;
              }
            }

            if (v === true) {
              res += " " + a;
            } else if (v !== false) {
              v = v.toString();

              if (v.length) {
                res += ` ${a}="${esc ? (0, _escape.escape)(v) : v}"`;
              }
            }
          }
        }
      }

      if (body) {
        if (_api.VOID_TAGS[tag]) {
          (0, _errors.illegalArgs)(`No body allowed in tag: ${tag}`);
        }

        const proc = _api.PROC_TAGS[tag];
        res += proc ? " " : ">";
        span = span && !proc && !_api.NO_SPANS[tag];

        for (let i = 0, n = body.length; i < n; i++) {
          res += _serialize(body[i], ctx, esc, span, keys, [...path, i]);
        }

        return res += proc || `</${tag}>`;
      } else if (!_api.VOID_TAGS[tag]) {
        return res += `></${tag}>`;
      }

      return res += _api.PROC_TAGS[tag] || "/>";
    }

    if ((0, _checks.isNotStringAndIterable)(tree)) {
      return _serializeIter(tree, ctx, esc, span, keys, path);
    }

    (0, _errors.illegalArgs)(`invalid tree node: ${tree}`);
  }

  if ((0, _checks.isFunction)(tree)) {
    return _serialize(tree(ctx), ctx, esc, span, keys, path);
  }

  if ((0, _checks.implementsFunction)(tree, "toHiccup")) {
    return _serialize(tree.toHiccup(ctx), ctx, esc, span, keys, path);
  }

  if ((0, _checks.implementsFunction)(tree, "deref")) {
    return _serialize(tree.deref(), ctx, esc, span, keys, path);
  }

  if ((0, _checks.isNotStringAndIterable)(tree)) {
    return _serializeIter(tree, ctx, esc, span, keys, path);
  }

  tree = esc ? (0, _escape.escape)(tree.toString()) : tree;
  return span ? `<span${keys ? ` key="${path.join("-")}"` : ""}>${tree}</span>` : tree;
};

const _serializeIter = (iter, ctx, esc, span, keys, path) => {
  const res = [];
  const p = path.slice(0, path.length - 1);
  let k = 0;

  for (let i of iter) {
    res.push(_serialize(i, ctx, esc, span, keys, [...p, k++]));
  }

  return res.join("");
};

const normalize = tag => {
  let el = tag[0];
  let match, id, clazz;
  const hasAttribs = (0, _checks.isPlainObject)(tag[1]);
  const attribs = hasAttribs ? Object.assign({}, tag[1]) : {};

  if (!(0, _checks.isString)(el) || !(match = _api.TAG_REGEXP.exec(el))) {
    (0, _errors.illegalArgs)(`"${el}" is not a valid tag name`);
  }

  el = match[1];
  id = match[2];
  clazz = match[3];

  if (id) {
    attribs.id = id;
  }

  if (clazz) {
    clazz = clazz.replace(/\./g, " ");

    if (attribs.class) {
      attribs.class += " " + clazz;
    } else {
      attribs.class = clazz;
    }
  }

  if (tag.length > 1) {
    if ((0, _checks.isPlainObject)(attribs.style)) {
      attribs.style = (0, _css.css)(attribs.style);
    }

    tag = tag.slice(hasAttribs ? 2 : 1).filter(x => x != null);

    if (tag.length > 0) {
      return [el, attribs, tag];
    }
  }

  return [el, attribs];
};

exports.normalize = normalize;
},{"@thi.ng/checks":"node_modules/@thi.ng/checks/index.js","@thi.ng/errors":"node_modules/@thi.ng/errors/index.js","./api":"node_modules/@thi.ng/hiccup/api.js","./css":"node_modules/@thi.ng/hiccup/css.js","./escape":"node_modules/@thi.ng/hiccup/escape.js"}],"node_modules/@thi.ng/hiccup/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _api = require("./api");

Object.keys(_api).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _api[key];
    }
  });
});

var _css = require("./css");

Object.keys(_css).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _css[key];
    }
  });
});

var _deref = require("./deref");

Object.keys(_deref).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _deref[key];
    }
  });
});

var _escape = require("./escape");

Object.keys(_escape).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _escape[key];
    }
  });
});

var _serialize = require("./serialize");

Object.keys(_serialize).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _serialize[key];
    }
  });
});
},{"./api":"node_modules/@thi.ng/hiccup/api.js","./css":"node_modules/@thi.ng/hiccup/css.js","./deref":"node_modules/@thi.ng/hiccup/deref.js","./escape":"node_modules/@thi.ng/hiccup/escape.js","./serialize":"node_modules/@thi.ng/hiccup/serialize.js"}],"node_modules/@thi.ng/hdom/dom.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeChild = exports.clearDOM = exports.removeListener = exports.setListener = exports.setStyle = exports.removeAttribs = exports.updateValueAttrib = exports.setAttrib = exports.setAttribs = exports.setContent = exports.cloneWithNewAttribs = exports.replaceChild = exports.getChild = exports.createTextElement = exports.createElement = exports.hydrateTree = exports.createTree = void 0;

var _checks = require("@thi.ng/checks");

var _hiccup = require("@thi.ng/hiccup");

const isArray = _checks.isArray;
const isNotStringAndIterable = _checks.isNotStringAndIterable;
/**
 * See `HDOMImplementation` interface for further details.
 *
 * @param opts
 * @param parent
 * @param tree
 * @param insert
 */

const createTree = (opts, impl, parent, tree, insert) => {
  if (isArray(tree)) {
    const tag = tree[0];

    if (typeof tag === "function") {
      return createTree(opts, impl, parent, tag.apply(null, [opts.ctx, ...tree.slice(1)]), insert);
    }

    const attribs = tree[1];

    if (attribs.__impl) {
      return attribs.__impl.createTree(opts, parent, tree, insert);
    }

    const el = impl.createElement(parent, tag, attribs, insert);

    if (tree.length > 2) {
      const n = tree.length;

      for (let i = 2; i < n; i++) {
        createTree(opts, impl, el, tree[i]);
      }
    }

    if (tree.__init) {
      tree.__init.apply(tree.__this, [el, ...tree.__args]);
    }

    return el;
  }

  if (isNotStringAndIterable(tree)) {
    const res = [];

    for (let t of tree) {
      res.push(createTree(opts, impl, parent, t));
    }

    return res;
  }

  if (tree == null) {
    return parent;
  }

  return impl.createTextElement(parent, tree);
};
/**
 * See `HDOMImplementation` interface for further details.
 *
 * @param opts
 * @param parent
 * @param tree
 * @param index
 */


exports.createTree = createTree;

const hydrateTree = (opts, impl, parent, tree, index = 0) => {
  if (isArray(tree)) {
    const el = impl.getChild(parent, index);

    if (typeof tree[0] === "function") {
      hydrateTree(opts, impl, parent, tree[0].apply(null, [opts.ctx, ...tree.slice(1)]), index);
    }

    const attribs = tree[1];

    if (attribs.__impl) {
      return attribs.__impl.hydrateTree(opts, parent, tree, index);
    }

    if (tree.__init) {
      tree.__init.apply(tree.__this, [el, ...tree.__args]);
    }

    for (let a in attribs) {
      if (a.indexOf("on") === 0) {
        impl.setAttrib(el, a, attribs[a]);
      }
    }

    for (let n = tree.length, i = 2; i < n; i++) {
      hydrateTree(opts, impl, el, tree[i], i - 2);
    }
  } else if (isNotStringAndIterable(tree)) {
    for (let t of tree) {
      hydrateTree(opts, impl, parent, t, index);
      index++;
    }
  }
};
/**
 * Creates a new DOM element of type `tag` with optional `attribs`. If
 * `parent` is not `null`, the new element will be inserted as child at
 * given `insert` index. If `insert` is missing, the element will be
 * appended to the `parent`'s list of children. Returns new DOM node.
 *
 * If `tag` is a known SVG element name, the new element will be created
 * with the proper SVG XML namespace.
 *
 * @param parent
 * @param tag
 * @param attribs
 * @param insert
 */


exports.hydrateTree = hydrateTree;

const createElement = (parent, tag, attribs, insert) => {
  const el = _hiccup.SVG_TAGS[tag] ? document.createElementNS(_hiccup.SVG_NS, tag) : document.createElement(tag);

  if (parent) {
    if (insert == null) {
      parent.appendChild(el);
    } else {
      parent.insertBefore(el, parent.children[insert]);
    }
  }

  if (attribs) {
    setAttribs(el, attribs);
  }

  return el;
};

exports.createElement = createElement;

const createTextElement = (parent, content, insert) => {
  const el = document.createTextNode(content);

  if (parent) {
    if (insert === undefined) {
      parent.appendChild(el);
    } else {
      parent.insertBefore(el, parent.children[insert]);
    }
  }

  return el;
};

exports.createTextElement = createTextElement;

const getChild = (parent, child) => parent.children[child];

exports.getChild = getChild;

const replaceChild = (opts, impl, parent, child, tree) => (impl.removeChild(parent, child), impl.createTree(opts, parent, tree, child));

exports.replaceChild = replaceChild;

const cloneWithNewAttribs = (el, attribs) => {
  const res = el.cloneNode(true);
  setAttribs(res, attribs);
  el.parentNode.replaceChild(res, el);
  return res;
};

exports.cloneWithNewAttribs = cloneWithNewAttribs;

const setContent = (el, body) => el.textContent = body;

exports.setContent = setContent;

const setAttribs = (el, attribs) => {
  for (let k in attribs) {
    setAttrib(el, k, attribs[k], attribs);
  }

  return el;
};
/**
 * Sets a single attribute on given element. If attrib name is NOT an
 * event name (prefix: "on") and its value is a function, it is called
 * with given `attribs` object (usually the full attrib object passed to
 * `setAttribs`) and the function's return value is used as the actual
 * attrib value.
 *
 * Special rules apply for certain attributes:
 *
 * - "style": delegated to `setStyle()`
 * - "value": delegated to `updateValueAttrib()`
 * - attrib IDs starting with "on" are treated as event listeners
 *
 * If the given (or computed) attrib value is `false` or `undefined` the
 * attrib is removed from the element.
 *
 * @param el
 * @param id
 * @param val
 * @param attribs
 */


exports.setAttribs = setAttribs;

const setAttrib = (el, id, val, attribs) => {
  if (id.startsWith("__")) return;
  const isListener = id.indexOf("on") === 0;

  if (!isListener && typeof val === "function") {
    val = val(attribs);
  }

  if (val !== undefined && val !== false) {
    switch (id) {
      case "style":
        setStyle(el, val);
        break;

      case "value":
        updateValueAttrib(el, val);
        break;

      case "id":
      case "checked":
      case "scrollTop":
      case "scrollLeft":
        // TODO add more native attribs?
        el[id] = val;
        break;

      default:
        if (isListener) {
          setListener(el, id.substr(2), val);
        } else {
          el.setAttribute(id, val);
        }

    }
  } else {
    el[id] != null ? el[id] = null : el.removeAttribute(id);
  }

  return el;
};
/**
 * Updates an element's `value` property. For form elements it too
 * ensures the edit cursor retains its position.
 *
 * @param el
 * @param v
 */


exports.setAttrib = setAttrib;

const updateValueAttrib = (el, v) => {
  let ev;

  switch (el.type) {
    case "text":
    case "textarea":
    case "password":
    case "search":
    case "number":
    case "email":
    case "url":
    case "tel":
    case "date":
    case "datetime-local":
    case "time":
    case "week":
    case "month":
      if ((ev = el.value) !== undefined && typeof v === "string") {
        const off = v.length - (ev.length - el.selectionStart);
        el.value = v;
        el.selectionStart = el.selectionEnd = off;
        break;
      }

    default:
      el.value = v;
  }
};

exports.updateValueAttrib = updateValueAttrib;

const removeAttribs = (el, attribs, prev) => {
  for (let i = attribs.length; --i >= 0;) {
    const a = attribs[i];

    if (a.indexOf("on") === 0) {
      removeListener(el, a.substr(2), prev[a]);
    } else {
      el.hasAttribute(a) ? el.removeAttribute(a) : el[a] = null;
    }
  }
};

exports.removeAttribs = removeAttribs;

const setStyle = (el, styles) => (el.setAttribute("style", (0, _hiccup.css)(styles)), el);
/**
 * Adds event listener (possibly with options).
 *
 * @param el
 * @param id event name (w/o `on` prefix)
 * @param listener
 */


exports.setStyle = setStyle;

const setListener = (el, id, listener) => {
  if (isArray(listener)) {
    el.addEventListener(id, ...listener);
  } else {
    el.addEventListener(id, listener);
  }
};
/**
 * Removes event listener (possibly with options).
 *
 * @param el
 * @param id event name (w/o `on` prefix)
 * @param listener
 */


exports.setListener = setListener;

const removeListener = (el, id, listener) => {
  if (isArray(listener)) {
    el.removeEventListener(id, ...listener);
  } else {
    el.removeEventListener(id, listener);
  }
};

exports.removeListener = removeListener;

const clearDOM = el => el.innerHTML = "";

exports.clearDOM = clearDOM;

const removeChild = (parent, childIdx) => {
  const n = parent.children[childIdx];
  n !== undefined && parent.removeChild(n);
};

exports.removeChild = removeChild;
},{"@thi.ng/checks":"node_modules/@thi.ng/checks/index.js","@thi.ng/hiccup":"node_modules/@thi.ng/hiccup/index.js"}],"node_modules/@thi.ng/hdom/normalize.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.normalizeTree = exports.normalizeElement = void 0;

var _checks = require("@thi.ng/checks");

var _errors = require("@thi.ng/errors");

var _hiccup = require("@thi.ng/hiccup");

const isArray = _checks.isArray;
const isNotStringAndIterable = _checks.isNotStringAndIterable;
const isPlainObject = _checks.isPlainObject;
/**
 * Expands single hiccup element/component into its canonical form:
 *
 * ```
 * [tagname, {attribs}, ...children]
 * ```
 *
 * Emmet-style ID and class names in the original tagname are moved into
 * the attribs object, e.g.:
 *
 * ```
 * ["div#foo.bar.baz"] => ["div", {id: "foo", class: "bar baz"}]
 * ```
 *
 * If both Emmet-style classes AND a `class` attrib exists, the former
 * are appended to the latter:
 *
 * ```
 * ["div.bar.baz", {class: "foo"}] => ["div", {class: "foo bar baz"}]
 * ```
 *
 * Elements with `__skip` attrib enabled and no children, will have an
 * empty text child element injected.
 *
 * @param spec
 * @param keys
 */

const normalizeElement = (spec, keys) => {
  let tag = spec[0],
      hasAttribs = isPlainObject(spec[1]),
      match,
      id,
      clazz,
      attribs;

  if (typeof tag !== "string" || !(match = _hiccup.TAG_REGEXP.exec(tag))) {
    (0, _errors.illegalArgs)(`${tag} is not a valid tag name`);
  } // return orig if already normalized and satisfies key requirement


  if (tag === match[1] && hasAttribs && (!keys || spec[1].key)) {
    return spec;
  }

  attribs = hasAttribs ? Object.assign({}, spec[1]) : {};
  id = match[2];
  clazz = match[3];

  if (id) {
    attribs.id = id;
  }

  if (clazz) {
    clazz = clazz.replace(/\./g, " ");

    if (attribs.class) {
      attribs.class += " " + clazz;
    } else {
      attribs.class = clazz;
    }
  }

  return attribs.__skip && spec.length < 3 ? [match[1], attribs, ""] : [match[1], attribs, ...spec.slice(hasAttribs ? 2 : 1)];
};
/**
 * See `HDOMImplementation` interface for further details.
 *
 * @param opts
 * @param tree
 */


exports.normalizeElement = normalizeElement;

const normalizeTree = (opts, tree) => _normalizeTree(tree, opts, opts.ctx, [0], opts.keys !== false, opts.span !== false);

exports.normalizeTree = normalizeTree;

const _normalizeTree = (tree, opts, ctx, path, keys, span) => {
  if (tree == null) {
    return;
  }

  if (isArray(tree)) {
    if (tree.length === 0) {
      return;
    }

    let norm,
        nattribs = tree[1],
        impl; // if available, use branch-local normalize implementation

    if (nattribs && (impl = nattribs.__impl) && (impl = impl.normalizeTree)) {
      return impl(opts, tree);
    }

    const tag = tree[0]; // use result of function call
    // pass ctx as first arg and remaining array elements as rest args

    if (typeof tag === "function") {
      return _normalizeTree(tag.apply(null, [ctx, ...tree.slice(1)]), opts, ctx, path, keys, span);
    } // component object w/ life cycle methods
    // (render() is the only required hook)


    if (typeof tag.render === "function") {
      const args = [ctx, ...tree.slice(1)];
      norm = _normalizeTree(tag.render.apply(tag, args), opts, ctx, path, keys, span);

      if (isArray(norm)) {
        norm.__this = tag;
        norm.__init = tag.init;
        norm.__release = tag.release;
        norm.__args = args;
      }

      return norm;
    }

    norm = normalizeElement(tree, keys);
    nattribs = norm[1];

    if (nattribs.__normalize === false) {
      return norm;
    }

    if (keys && nattribs.key === undefined) {
      nattribs.key = path.join("-");
    }

    if (norm.length > 2) {
      const tag = norm[0];
      const res = [tag, nattribs];
      span = span && !_hiccup.NO_SPANS[tag];

      for (let i = 2, j = 2, k = 0, n = norm.length; i < n; i++) {
        let el = norm[i];

        if (el != null) {
          const isarray = isArray(el);

          if (isarray && isArray(el[0]) || !isarray && isNotStringAndIterable(el)) {
            for (let c of el) {
              c = _normalizeTree(c, opts, ctx, path.concat(k), keys, span);

              if (c !== undefined) {
                res[j++] = c;
              }

              k++;
            }
          } else {
            el = _normalizeTree(el, opts, ctx, path.concat(k), keys, span);

            if (el !== undefined) {
              res[j++] = el;
            }

            k++;
          }
        }
      }

      return res;
    }

    return norm;
  }

  if (typeof tree === "function") {
    return _normalizeTree(tree(ctx), opts, ctx, path, keys, span);
  }

  if (typeof tree.toHiccup === "function") {
    return _normalizeTree(tree.toHiccup(opts.ctx), opts, ctx, path, keys, span);
  }

  if (typeof tree.deref === "function") {
    return _normalizeTree(tree.deref(), opts, ctx, path, keys, span);
  }

  return span ? ["span", keys ? {
    key: path.join("-")
  } : {}, tree.toString()] : tree.toString();
};
},{"@thi.ng/checks":"node_modules/@thi.ng/checks/index.js","@thi.ng/errors":"node_modules/@thi.ng/errors/index.js","@thi.ng/hiccup":"node_modules/@thi.ng/hiccup/index.js"}],"node_modules/@thi.ng/hdom/default.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_IMPL = void 0;

var _diff = require("./diff");

var _dom = require("./dom");

var _normalize = require("./normalize");

/**
 * Default target implementation to manipulate browser DOM.
 */
const DEFAULT_IMPL = {
  createTree(opts, parent, tree, child) {
    return (0, _dom.createTree)(opts, this, parent, tree, child);
  },

  hydrateTree(opts, parent, tree, child) {
    return (0, _dom.hydrateTree)(opts, this, parent, tree, child);
  },

  diffTree(opts, parent, prev, curr, child) {
    (0, _diff.diffTree)(opts, this, parent, prev, curr, child);
  },

  normalizeTree: _normalize.normalizeTree,

  getElementById(id) {
    return document.getElementById(id);
  },

  getChild: _dom.getChild,
  createElement: _dom.createElement,
  createTextElement: _dom.createTextElement,

  replaceChild(opts, parent, child, tree) {
    (0, _dom.replaceChild)(opts, this, parent, child, tree);
  },

  removeChild: _dom.removeChild,
  setContent: _dom.setContent,
  removeAttribs: _dom.removeAttribs,
  setAttrib: _dom.setAttrib
};
exports.DEFAULT_IMPL = DEFAULT_IMPL;
},{"./diff":"node_modules/@thi.ng/hdom/diff.js","./dom":"node_modules/@thi.ng/hdom/dom.js","./normalize":"node_modules/@thi.ng/hdom/normalize.js"}],"node_modules/@thi.ng/hdom/utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolveRoot = void 0;

var _checks = require("@thi.ng/checks");

const resolveRoot = (root, impl) => (0, _checks.isString)(root) ? impl.getElementById(root) : root;

exports.resolveRoot = resolveRoot;
},{"@thi.ng/checks":"node_modules/@thi.ng/checks/index.js"}],"node_modules/@thi.ng/hdom/render-once.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderOnce = void 0;

var _hiccup = require("@thi.ng/hiccup");

var _default = require("./default");

var _utils = require("./utils");

/**
 * One-off hdom tree conversion & target DOM application. Takes same
 * options as `start()`, but performs no diffing and only creates or
 * hydrates target once. The given tree is first normalized and if
 * result is `null` or `undefined` no further action will be taken.
 *
 * @param tree
 * @param opts
 * @param impl
 */
const renderOnce = (tree, opts = {}, impl = _default.DEFAULT_IMPL) => {
  opts = Object.assign({
    root: "app"
  }, opts);
  opts.ctx = (0, _hiccup.derefContext)(opts.ctx, opts.autoDerefKeys);
  const root = (0, _utils.resolveRoot)(opts.root, impl);
  tree = impl.normalizeTree(opts, tree);
  if (!tree) return;
  opts.hydrate ? impl.hydrateTree(opts, root, tree) : impl.createTree(opts, root, tree);
};

exports.renderOnce = renderOnce;
},{"@thi.ng/hiccup":"node_modules/@thi.ng/hiccup/index.js","./default":"node_modules/@thi.ng/hdom/default.js","./utils":"node_modules/@thi.ng/hdom/utils.js"}],"node_modules/@thi.ng/hdom/start.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.start = void 0;

var _hiccup = require("@thi.ng/hiccup");

var _default = require("./default");

var _utils = require("./utils");

/**
 * Takes an hiccup tree (array, function or component object w/ life
 * cycle methods) and an optional object of DOM update options. Starts
 * RAF update loop, in each iteration first normalizing given tree, then
 * computing diff to previous frame's tree and applying any changes to
 * the real DOM. The `ctx` option can be used for passing arbitrary
 * config data or state down into the hiccup component tree. Any
 * embedded component function in the tree will receive this context
 * object (shallow copy) as first argument, as will life cycle methods
 * in component objects. If the `autoDerefKeys` option is given, attempts
 * to auto-expand/deref the given keys in the user supplied context
 * object (`ctx` option) prior to *each* tree normalization. All of
 * these values should implement the thi.ng/api `IDeref` interface (e.g.
 * atoms, cursors, views, rstreams etc.). This feature can be used to
 * define dynamic contexts linked to the main app state, e.g. using
 * derived views provided by thi.ng/atom.
 *
 * **Selective updates**: No updates will be applied if the given hiccup
 * tree is `undefined` or `null` or a root component function returns no
 * value. This way a given root function can do some state handling of
 * its own and implement fail-fast checks to determine no DOM updates
 * are necessary, save effort re-creating a new hiccup tree and request
 * skipping DOM updates via this function. In this case, the previous
 * DOM tree is kept around until the root function returns a tree again,
 * which then is diffed and applied against the previous tree kept as
 * usual. Any number of frames may be skipped this way.
 *
 * **Important:** Unless the `hydrate` option is enabled, the parent
 * element given is assumed to have NO children at the time when
 * `start()` is called. Since hdom does NOT track the real DOM, the
 * resulting changes will result in potentially undefined behavior if
 * the parent element wasn't empty. Likewise, if `hydrate` is enabled,
 * it is assumed that an equivalent DOM (minus listeners) already exists
 * (i.e. generated via SSR) when `start()` is called. Any other
 * discrepancies between the pre-existing DOM and the hdom trees will
 * cause undefined behavior.
 *
 * Returns a function, which when called, immediately cancels the update
 * loop.
 *
 * @param tree hiccup DOM tree
 * @param opts options
 * @param impl hdom target implementation
 */
const start = (tree, opts = {}, impl = _default.DEFAULT_IMPL) => {
  const _opts = Object.assign({
    root: "app"
  }, opts);

  let prev = [];
  let isActive = true;
  const root = (0, _utils.resolveRoot)(_opts.root, impl);

  const update = () => {
    if (isActive) {
      _opts.ctx = (0, _hiccup.derefContext)(opts.ctx, _opts.autoDerefKeys);
      const curr = impl.normalizeTree(_opts, tree);

      if (curr != null) {
        if (_opts.hydrate) {
          impl.hydrateTree(_opts, root, curr);
          _opts.hydrate = false;
        } else {
          impl.diffTree(_opts, root, prev, curr);
        }

        prev = curr;
      } // check again in case one of the components called cancel


      isActive && requestAnimationFrame(update);
    }
  };

  requestAnimationFrame(update);
  return () => isActive = false;
};

exports.start = start;
},{"@thi.ng/hiccup":"node_modules/@thi.ng/hiccup/index.js","./default":"node_modules/@thi.ng/hdom/default.js","./utils":"node_modules/@thi.ng/hdom/utils.js"}],"node_modules/@thi.ng/hdom/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _api = require("./api");

Object.keys(_api).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _api[key];
    }
  });
});

var _default = require("./default");

Object.keys(_default).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _default[key];
    }
  });
});

var _diff = require("./diff");

Object.keys(_diff).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _diff[key];
    }
  });
});

var _dom = require("./dom");

Object.keys(_dom).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _dom[key];
    }
  });
});

var _normalize = require("./normalize");

Object.keys(_normalize).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _normalize[key];
    }
  });
});

var _renderOnce = require("./render-once");

Object.keys(_renderOnce).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _renderOnce[key];
    }
  });
});

var _start = require("./start");

Object.keys(_start).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _start[key];
    }
  });
});

var _utils = require("./utils");

Object.keys(_utils).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _utils[key];
    }
  });
});
},{"./api":"node_modules/@thi.ng/hdom/api.js","./default":"node_modules/@thi.ng/hdom/default.js","./diff":"node_modules/@thi.ng/hdom/diff.js","./dom":"node_modules/@thi.ng/hdom/dom.js","./normalize":"node_modules/@thi.ng/hdom/normalize.js","./render-once":"node_modules/@thi.ng/hdom/render-once.js","./start":"node_modules/@thi.ng/hdom/start.js","./utils":"node_modules/@thi.ng/hdom/utils.js"}],"node_modules/@thi.ng/interceptors/api.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EV_UNDO = exports.EV_REDO = exports.FX_STATE = exports.FX_FETCH = exports.FX_DELAY = exports.FX_DISPATCH_NOW = exports.FX_DISPATCH_ASYNC = exports.FX_DISPATCH = exports.FX_CANCEL = exports.EV_TOGGLE_VALUE = exports.EV_UPDATE_VALUE = exports.EV_SET_VALUE = void 0;
// Built-in event ID constants
const EV_SET_VALUE = "--set-value";
exports.EV_SET_VALUE = EV_SET_VALUE;
const EV_UPDATE_VALUE = "--update-value";
exports.EV_UPDATE_VALUE = EV_UPDATE_VALUE;
const EV_TOGGLE_VALUE = "--toggle-value"; // Built-in side effect ID constants

exports.EV_TOGGLE_VALUE = EV_TOGGLE_VALUE;
const FX_CANCEL = "--cancel";
exports.FX_CANCEL = FX_CANCEL;
const FX_DISPATCH = "--dispatch";
exports.FX_DISPATCH = FX_DISPATCH;
const FX_DISPATCH_ASYNC = "--dispatch-async";
exports.FX_DISPATCH_ASYNC = FX_DISPATCH_ASYNC;
const FX_DISPATCH_NOW = "--dispatch-now";
exports.FX_DISPATCH_NOW = FX_DISPATCH_NOW;
const FX_DELAY = "--delay";
exports.FX_DELAY = FX_DELAY;
const FX_FETCH = "--fetch";
exports.FX_FETCH = FX_FETCH;
const FX_STATE = "--state";
/**
 * Event ID to trigger redo action.
 * See `EventBus.addBuiltIns()` for further details.
 * Also see `snapshot()` interceptor docs.
 */

exports.FX_STATE = FX_STATE;
const EV_REDO = "--redo";
/**
 * Event ID to trigger undo action.
 * See `EventBus.addBuiltIns()` for further details.
 * Also see `snapshot()` interceptor docs.
 */

exports.EV_REDO = EV_REDO;
const EV_UNDO = "--undo";
exports.EV_UNDO = EV_UNDO;
},{}],"node_modules/@thi.ng/interceptors/event-bus.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EventBus = exports.StatelessEventBus = void 0;

var _atom = require("@thi.ng/atom");

var _checks = require("@thi.ng/checks");

var _errors = require("@thi.ng/errors");

var _paths = require("@thi.ng/paths");

var api = _interopRequireWildcard(require("./api"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const FX_CANCEL = api.FX_CANCEL;
const FX_DISPATCH_NOW = api.FX_DISPATCH_NOW;
const FX_STATE = api.FX_STATE;
/**
 * Batched event processor for using composable interceptors for event
 * handling and side effects to execute the result of handled events.
 *
 * Events processed by this class are simple 2-element tuples/arrays of
 * this form: `["event-id", payload?]`, where the `payload` is optional
 * and can be of any type.
 *
 * Events are processed by registered handlers which transform each
 * event into a number of side effect descriptions to be executed later.
 * This separation ensures event handlers themselves are pure functions
 * and leads to more efficient reuse of side effecting operations. The
 * pure data nature until the last stage of processing (the application
 * side effects) too means that event flow can be much easier inspected
 * and debugged.
 *
 * In this model a single event handler itself is an array of objects
 * with `pre` and/or `post` keys and functions attached to each key.
 * These functions are called interceptors, since each intercepts the
 * processing of an event and can contribute their own side effects.
 * Each event's interceptor chain is processed bi-directionally (`pre`
 * in forward, `post` in reverse order) and the effects returned from
 * each interceptor are merged/collected. The outcome of this setup is a
 * more aspect-oriented, composable approach to event handling and
 * allows to inject common, re-usable behaviors for multiple event types
 * (logging, validation, undo/redo triggers etc.).
 *
 * Side effects are only processed after all event handlers have run.
 * Furthermore, their order of execution can be configured with optional
 * priorities.
 *
 * See for further details:
 *
 * - `processQueue()`
 * - `processEvent()`
 * - `processEffects()`
 * - `mergeEffects()`
 *
 * The overall approach of this type of event processing is heavily
 * based on the pattern initially pioneered by @Day8/re-frame, with the
 * following differences:
 *
 * - stateless (see `EventBus` for the more common stateful alternative)
 * - standalone implementation (no assumptions about surrounding
 *   context/framework)
 * - manual control over event queue processing
 * - supports event cancellation (via FX_CANCEL side effect)
 * - side effect collection (multiple side effects for same effect type
 *   per frame)
 * - side effect priorities (to control execution order)
 * - dynamic addition/removal of handlers & effects
 */

class StatelessEventBus {
  /**
   * Creates a new event bus instance with given handler and effect
   * definitions (all optional).
   *
   * In addition to the user provided handlers & effects, a number of
   * built-ins are added automatically. See `addBuiltIns()`. User
   * handlers can override built-ins.
   *
   * @param handlers
   * @param effects
   */
  constructor(handlers, effects) {
    this.handlers = {};
    this.effects = {};
    this.eventQueue = [];
    this.priorities = [];
    this.addBuiltIns();

    if (handlers) {
      this.addHandlers(handlers);
    }

    if (effects) {
      this.addEffects(effects);
    }
  }
  /**
   * Adds built-in event & side effect handlers. Also see additional
   * built-ins defined by the stateful `EventBus` extension of this
   * class, as well as comments for these class methods:
   *
   * - `mergeEffects()`
   * - `processEvent()`
   *
   * ### Handlers
   *
   * currently none...
   *
   * ### Side effects
   *
   * #### `FX_CANCEL`
   *
   * If assigned `true`, cancels processing of current event, though
   * still applies any side effects already accumulated.
   *
   * #### `FX_DISPATCH`
   *
   * Dispatches assigned events to be processed in next frame.
   *
   * #### `FX_DISPATCH_ASYNC`
   *
   * Async wrapper for promise based side effects.
   *
   * #### `FX_DISPATCH_NOW`
   *
   * Dispatches assigned events as part of currently processed event
   * queue (no delay).
   *
   * #### `FX_DELAY`
   *
   * Async side effect. Only to be used in conjunction with
   * `FX_DISPATCH_ASYNC`. Triggers given event after `x` milliseconds.
   *
   * ```
   * // this triggers `[EV_SUCCESS, "ok"]` event after 1000 ms
   * { [FX_DISPATCH_ASYNC]: [FX_DELAY, [1000, "ok"], EV_SUCCESS, EV_ERROR] }
   * ```
   *
   * #### `FX_FETCH`
   *
   * Async side effect. Only to be used in conjunction with
   * `FX_DISPATCH_ASYNC`. Performs `fetch()` HTTP request and triggers
   * success with received response, or if there was an error with
   * response's `statusText`. The error event is only triggered if the
   * fetched response's `ok` field is non-truthy.
   *
   * - https://developer.mozilla.org/en-US/docs/Web/API/Response/ok
   * - https://developer.mozilla.org/en-US/docs/Web/API/Response/statusText
   *
   * ```
   * // fetches "foo.json" and then dispatches EV_SUCCESS or EV_ERROR event
   * { [FX_DISPATCH_ASYNC]: [FX_FETCH, "foo.json", EV_SUCCESS, EV_ERROR] }
   * ```
   */


  addBuiltIns() {
    this.addEffects({
      [api.FX_DISPATCH]: [e => this.dispatch(e), -999],
      [api.FX_DISPATCH_ASYNC]: [([id, arg, success, err]) => {
        const fx = this.effects[id];

        if (fx) {
          const p = fx(arg, this);

          if ((0, _checks.isPromise)(p)) {
            p.then(res => this.dispatch([success, res])).catch(e => this.dispatch([err, e]));
          } else {
            console.warn("async effect did not return Promise");
          }
        } else {
          console.warn(`skipping invalid async effect: ${id}`);
        }
      }, -999],
      [api.FX_DELAY]: [([x, body]) => new Promise(res => setTimeout(() => res(body), x)), 1000],
      [api.FX_FETCH]: [req => fetch(req).then(resp => {
        if (!resp.ok) {
          throw new Error(resp.statusText);
        }

        return resp;
      }), 1000]
    });
  }

  addHandler(id, spec) {
    const iceps = (0, _checks.isArray)(spec) ? spec.map(asInterceptor) : (0, _checks.isFunction)(spec) ? [{
      pre: spec
    }] : [spec];

    if (iceps.length > 0) {
      if (this.handlers[id]) {
        this.removeHandler(id);
        console.warn(`overriding handler for ID: ${id}`);
      }

      this.handlers[id] = iceps;
    } else {
      (0, _errors.illegalArgs)(`no handlers in spec for ID: ${id}`);
    }
  }

  addHandlers(specs) {
    for (let id in specs) {
      this.addHandler(id, specs[id]);
    }
  }

  addEffect(id, fx, priority = 1) {
    if (this.effects[id]) {
      this.removeEffect(id);
      console.warn(`overriding effect for ID: ${id}`);
    }

    this.effects[id] = fx;
    const p = [id, priority];
    const priors = this.priorities;

    for (let i = 0; i < priors.length; i++) {
      if (p[1] < priors[i][1]) {
        priors.splice(i, 0, p);
        return;
      }
    }

    priors.push(p);
  }

  addEffects(specs) {
    for (let id in specs) {
      const fx = specs[id];

      if ((0, _checks.isArray)(fx)) {
        this.addEffect(id, fx[0], fx[1]);
      } else {
        this.addEffect(id, fx);
      }
    }
  }
  /**
   * Prepends given interceptors (or interceptor functions) to
   * selected handlers. If no handler IDs are given, applies
   * instrumentation to all currently registered handlers.
   *
   * @param inject
   * @param ids
   */


  instrumentWith(inject, ids) {
    const iceps = inject.map(asInterceptor);
    const handlers = this.handlers;

    for (let id of ids || Object.keys(handlers)) {
      const h = handlers[id];

      if (h) {
        handlers[id] = iceps.concat(h);
      }
    }
  }

  removeHandler(id) {
    delete this.handlers[id];
  }

  removeHandlers(ids) {
    for (let id of ids) {
      this.removeHandler(id);
    }
  }

  removeEffect(id) {
    delete this.effects[id];
    const p = this.priorities;

    for (let i = p.length - 1; i >= 0; i--) {
      if (id === p[i][0]) {
        p.splice(i, 1);
        return;
      }
    }
  }

  removeEffects(ids) {
    for (let id of ids) {
      this.removeEffect(id);
    }
  }
  /**
   * If called during event processing, returns current side effect
   * accumulator / interceptor context. Otherwise returns nothing.
   */


  context() {
    return this.currCtx;
  }
  /**
   * Adds given events to event queue to be processed by
   * `processQueue()` later on. It's the user's responsibility to call
   * that latter function repeatedly in a timely manner, preferably
   * via `requestAnimationFrame()` or similar.
   *
   * @param e
   */


  dispatch(...e) {
    this.eventQueue.push(...e);
  }
  /**
   * Adds given events to whatever is the current event queue. If
   * triggered via the `FX_DISPATCH_NOW` side effect from an event
   * handler / interceptor, the event will still be executed in the
   * currently active batch / frame. If called from elsewhere, the
   * result is the same as calling `dispatch()`.
   *
   * @param e
   */


  dispatchNow(...e) {
    (this.currQueue || this.eventQueue).push(...e);
  }
  /**
   * Dispatches given event after `delay` milliseconds (by default
   * 17). Note: Since events are only processed by calling
   * `processQueue()`, it's the user's responsibility to call that
   * latter function repeatedly in a timely manner, preferably via
   * `requestAnimationFrame()` or similar.
   *
   * @param e
   * @param delay
   */


  dispatchLater(e, delay = 17) {
    setTimeout(() => this.dispatch(e), delay);
  }
  /**
   * Triggers processing of current event queue and returns `true` if
   * any events have been processed.
   *
   * If an event handler triggers the `FX_DISPATCH_NOW` side effect,
   * the new event will be added to the currently processed batch and
   * therefore executed in the same frame. Also see `dispatchNow()`.
   *
   * An optional `ctx` (context) object can be provided, which is used
   * to collect any side effect definitions during processing. This
   * can be useful for debugging, inspection or post-processing
   * purposes.
   *
   * @param ctx
   */


  processQueue(ctx) {
    if (this.eventQueue.length > 0) {
      this.currQueue = [...this.eventQueue];
      this.eventQueue.length = 0;
      ctx = this.currCtx = ctx || {};

      for (let e of this.currQueue) {
        this.processEvent(ctx, e);
      }

      this.currQueue = this.currCtx = undefined;
      this.processEffects(ctx);
      return true;
    }

    return false;
  }
  /**
   * Processes a single event using its configured handler/interceptor
   * chain. Logs warning message and skips processing if no handler is
   * available for the event type.
   *
   * The array of interceptors is processed in bi-directional order.
   * First any `pre` interceptors are processed in forward order. Then
   * `post` interceptors are processed in reverse.
   *
   * Each interceptor can return a result object of side effects,
   * which are being merged and collected for `processEffects()`.
   *
   * Any interceptor can trigger zero or more known side effects, each
   * (side effect) will be collected in an array to support multiple
   * invocations of the same effect type per frame. If no side effects
   * are requested, an interceptor can return `undefined`.
   *
   * Processing of the current event stops immediately, if an
   * interceptor sets the `FX_CANCEL` side effect key to `true`.
   * However, the results of any previous interceptors (incl. the one
   * which cancelled) are kept and processed further as usual.
   *
   * @param ctx
   * @param e
   */


  processEvent(ctx, e) {
    const iceps = this.handlers[e[0]];

    if (!iceps) {
      console.warn(`missing handler for event type: ${e[0].toString()}`);
      return;
    }

    const n = iceps.length - 1;
    let hasPost = false;

    for (let i = 0; i <= n && !ctx[FX_CANCEL]; i++) {
      const icep = iceps[i];

      if (icep.pre) {
        this.mergeEffects(ctx, icep.pre(ctx[FX_STATE], e, this, ctx));
      }

      hasPost = hasPost || !!icep.post;
    }

    if (!hasPost) {
      return;
    }

    for (let i = n; i >= 0 && !ctx[FX_CANCEL]; i--) {
      const icep = iceps[i];

      if (icep.post) {
        this.mergeEffects(ctx, icep.post(ctx[FX_STATE], e, this, ctx));
      }
    }
  }
  /**
   * Takes a collection of side effects generated during event
   * processing and applies them in order of configured priorities.
   *
   * @param ctx
   */


  processEffects(ctx) {
    const effects = this.effects;

    for (let p of this.priorities) {
      const id = p[0];
      const val = ctx[id];

      if (val !== undefined) {
        const fn = effects[id];

        if (id !== FX_STATE) {
          for (let v of val) {
            fn(v, this, ctx);
          }
        } else {
          fn(val, this, ctx);
        }
      }
    }
  }
  /**
   * Merges the new side effects returned from an interceptor into the
   * internal effect accumulator.
   *
   * Any events assigned to the `FX_DISPATCH_NOW` effect key are
   * immediately added to the currently active event batch.
   *
   * If an interceptor wishes to cause multiple invocations of a
   * single side effect type (e.g. dispatch multiple other events), it
   * MUST return an array of these values. The only exceptions to this
   * are the following effects, which for obvious reasons can only
   * accept a single value.
   *
   * **Note:** the `FX_STATE` effect is not actually defined by this
   * class here, but is supported to avoid code duplication in
   * `StatefulEventBus`.
   *
   * - `FX_CANCEL`
   * - `FX_STATE`
   *
   * Because of this support (multiple values), the value of a single
   * side effect MUST NOT be a nested array itself, or rather its
   * first item can't be an array.
   *
   * For example:
   *
   * ```
   * // interceptor result map to dispatch a single event
   * { [FX_DISPATCH]: ["foo", "bar"]}
   *
   * // result map format to dispatch multiple events
   * { [FX_DISPATCH]: [ ["foo", "bar"], ["baz", "beep"] ]}
   * ```
   *
   * Any `null` / `undefined` values directly assigned to a side
   * effect are ignored and will not trigger the effect.
   *
   * @param fx
   * @param ret
   */


  mergeEffects(ctx, ret) {
    if (!ret) {
      return;
    }

    for (let k in ret) {
      const v = ret[k];

      if (v == null) {
        continue;
      }

      if (k === FX_STATE || k === FX_CANCEL) {
        ctx[k] = v;
      } else if (k === FX_DISPATCH_NOW) {
        if ((0, _checks.isArray)(v[0])) {
          for (let e of v) {
            e && this.dispatchNow(e);
          }
        } else {
          this.dispatchNow(v);
        }
      } else {
        ctx[k] || (ctx[k] = []);

        if ((0, _checks.isArray)(v[0])) {
          for (let e of v) {
            e !== undefined && ctx[k].push(e);
          }
        } else {
          ctx[k].push(v);
        }
      }
    }
  }

}
/**
 * Stateful version of `StatelessEventBus`. Wraps an `IAtom` state
 * container (Atom/Cursor) and provides additional pre-defined event
 * handlers and side effects to manipulate wrapped state. Prefer this
 * as the default implementation for most use cases.
 */


exports.StatelessEventBus = StatelessEventBus;

class EventBus extends StatelessEventBus {
  /**
   * Creates a new event bus instance with given parent state, handler
   * and effect definitions (all optional). If no state is given,
   * automatically creates an `Atom` with empty state object.
   *
   * In addition to the user provided handlers & effects, a number of
   * built-ins are added automatically. See `addBuiltIns()`. User
   * handlers can override built-ins.
   *
   * @param state
   * @param handlers
   * @param effects
   */
  constructor(state, handlers, effects) {
    super(handlers, effects);
    this.state = state || new _atom.Atom({});
  }
  /**
   * Returns value of internal state. Shorthand for:
   * `bus.state.deref()`
   */


  deref() {
    return this.state.deref();
  }
  /**
   * Adds same built-in event & side effect handlers as in
   * `StatelessEventBus.addBuiltIns()` and the following additions:
   *
   * ### Handlers
   *
   * #### `EV_SET_VALUE`
   *
   * Resets state path to provided value. See `setIn()`.
   *
   * Example event definition:
   * ```
   * [EV_SET_VALUE, ["path.to.value", val]]
   * ```
   *
   * #### `EV_UPDATE_VALUE`
   *
   * Updates a state path's value with provided function and optional
   * extra arguments. See `updateIn()`.
   *
   * Example event definition:
   * ```
   * [EV_UPDATE_VALUE, ["path.to.value", (x, y) => x + y, 1]]
   * ```
   *
   * #### `EV_TOGGLE_VALUE`
   *
   * Negates a boolean state value at given path.
   *
   * Example event definition:
   * ```
   * [EV_TOGGLE_VALUE, "path.to.value"]
   * ```
   *
   * #### `EV_UNDO`
   *
   * Calls `ctx[id].undo()` and uses return value as new state.
   * Assumes `ctx[id]` is a @thi.ng/atom `History` instance, provided
   * via e.g. `processQueue({ history })`. The event can be triggered
   * with or without ID. By default `"history"` is used as default key
   * to lookup the `History` instance. Furthermore, an additional
   * event can be triggered based on if a previous state has been
   * restored or not (basically, if the undo was successful). This is
   * useful for resetting/re-initializing stateful resources after a
   * successful undo action or to notify the user that no more undo's
   * are possible. The new event will be processed in the same frame
   * and has access to the (possibly) restored state. The event
   * structure for these options is shown below:
   *
   * ```
   * // using default ID
   * bus.dispatch([EV_UNDO]);
   *
   * // using custom history ID
   * bus.dispatch([EV_UNDO, ["custom"]]);
   *
   * // using custom ID and dispatch another event after undo
   * bus.dispatch([EV_UNDO, ["custom", ["ev-undo-success"], ["ev-undo-fail"]]]);
   * ```
   *
   * #### `EV_REDO`
   *
   * Similar to `EV_UNDO`, but for redo actions.
   *
   * ### Side effects
   *
   * #### `FX_STATE`
   *
   * Resets state atom to provided value (only a single update per
   * processing frame).
   */


  addBuiltIns() {
    super.addBuiltIns(); // handlers

    this.addHandlers({
      [api.EV_SET_VALUE]: (state, [_, [path, val]]) => ({
        [FX_STATE]: (0, _paths.setIn)(state, path, val)
      }),
      [api.EV_UPDATE_VALUE]: (state, [_, [path, fn, ...args]]) => ({
        [FX_STATE]: (0, _paths.updateIn)(state, path, fn, ...args)
      }),
      [api.EV_TOGGLE_VALUE]: (state, [_, path]) => ({
        [FX_STATE]: (0, _paths.updateIn)(state, path, x => !x)
      }),
      [api.EV_UNDO]: undoHandler("undo"),
      [api.EV_REDO]: undoHandler("redo")
    }); // effects

    this.addEffects({
      [FX_STATE]: [state => this.state.reset(state), -1000]
    });
  }
  /**
   * Triggers processing of current event queue and returns `true` if
   * the any of the processed events caused a state change.
   *
   * If an event handler triggers the `FX_DISPATCH_NOW` side effect,
   * the new event will be added to the currently processed batch and
   * therefore executed in the same frame. Also see `dispatchNow()`.
   *
   * If the optional `ctx` arg is provided it will be merged into the
   * `InterceptorContext` object passed to each interceptor. Since the
   * merged object is also used to collect triggered side effects,
   * care must be taken that there're no key name clashes.
   *
   * In order to use the built-in `EV_UNDO`, `EV_REDO` events, users
   * MUST provide a @thi.ng/atom History (or compatible undo history
   * instance) via the `ctx` arg, e.g.
   *
   * ```
   * bus.processQueue({ history });
   * ```
   */


  processQueue(ctx) {
    if (this.eventQueue.length > 0) {
      const prev = this.state.deref();
      this.currQueue = [...this.eventQueue];
      this.eventQueue.length = 0;
      ctx = this.currCtx = Object.assign({}, ctx, {
        [FX_STATE]: prev
      });

      for (let e of this.currQueue) {
        this.processEvent(ctx, e);
      }

      this.currQueue = this.currCtx = undefined;
      this.processEffects(ctx);
      return this.state.deref() !== prev;
    }

    return false;
  }

}

exports.EventBus = EventBus;

const asInterceptor = i => (0, _checks.isFunction)(i) ? {
  pre: i
} : i;

const undoHandler = action => (_, [__, ev], bus, ctx) => {
  let id = ev ? ev[0] : "history";

  if ((0, _checks.implementsFunction)(ctx[id], action)) {
    const ok = ctx[id][action]();
    return {
      [FX_STATE]: bus.state.deref(),
      [FX_DISPATCH_NOW]: ev ? ok !== undefined ? ev[1] : ev[2] : undefined
    };
  } else {
    console.warn("no history in context");
  }
};
},{"@thi.ng/atom":"node_modules/@thi.ng/atom/index.js","@thi.ng/checks":"node_modules/@thi.ng/checks/index.js","@thi.ng/errors":"node_modules/@thi.ng/errors/index.js","@thi.ng/paths":"node_modules/@thi.ng/paths/index.js","./api":"node_modules/@thi.ng/interceptors/api.js"}],"node_modules/@thi.ng/interceptors/interceptors.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.valueUpdater = exports.valueSetter = exports.ensureParamRange = exports.ensureStateRange = exports.ensureStateGreaterThan = exports.ensureStateLessThan = exports.ensurePred = exports.snapshot = exports.dispatchNow = exports.dispatch = exports.forwardSideFx = exports.trace = void 0;

var _paths = require("@thi.ng/paths");

var _api = require("./api");

/**
 * Debug interceptor to log the current event to the console.
 */
const trace = (_, e) => console.log("event:", e);
/**
 * Higher-order interceptor. Returns interceptor which unpacks payload
 * from event and assigns it as is to given side effect ID. Assigns
 * `true` to side effect if event has no payload.
 *
 * @param fxID side effect ID
 */


exports.trace = trace;

const forwardSideFx = fxID => (_, [__, body]) => ({
  [fxID]: body !== undefined ? body : true
});
/**
 * Higher-order interceptor. Returns interceptor which assigns given
 * event to `FX_DISPATCH` side effect.
 *
 * @param event
 */


exports.forwardSideFx = forwardSideFx;

const dispatch = event => () => ({
  [_api.FX_DISPATCH]: event
});
/**
 * Higher-order interceptor. Returns interceptor which assigns given
 * event to `FX_DISPATCH_NOW` side effect.
 *
 * @param event
 */


exports.dispatch = dispatch;

const dispatchNow = event => () => ({
  [_api.FX_DISPATCH_NOW]: event
});
/**
 * Higher-order interceptor. Returns interceptor which calls
 * `ctx[id].record()`, where `ctx` is the currently active
 * `InterceptorContext` passed to all event handlers and `ctx[id]` is
 * assumed to be a @thi.ng/atom `History` instance, passed to
 * `processQueue()`. The default ID for the history instance is
 * `"history"`.
 *
 * Example usage:
 *
 * ```
 * state = new Atom({});
 * history = new History(state);
 * bus = new EventBus(state);
 * // register event handler
 * // each time the `foo` event is triggered, a snapshot of
 * // current app state is recorded first
 * bus.addHandlers({
 *  foo: [snapshot(), valueSetter("foo")]
 * });
 * ...
 * // trigger event
 * bus.dispatch(["foo", 23]);
 *
 * // pass history instance via interceptor context to handlers
 * bus.processQueue({ history });
 * ```
 *
 * @param id
 */


exports.dispatchNow = dispatchNow;

const snapshot = (id = "history") => (_, __, ___, ctx) => ctx[id].record();
/**
 * Higher-order interceptor for validation purposes. Takes a predicate
 * function and an optional interceptor function, which will only be
 * called if the predicate fails for a given event. By default the
 * `FX_CANCEL` side effect is triggered if the predicate failed, thus
 * ensuring the actual event handler for the failed event will not be
 * executed anymore. However, this can be overridden using the error
 * interceptor's result, which is merged into the result of this
 * interceptor.
 *
 * The error interceptor can return any number of other side effects and
 * so be used to dispatch alternative events instead, for example:
 *
 * ```
 * // this interceptor will cause cancellation of current event
 * // and trigger an "error" event instead
 * ensurePred(
 *   // a dummy predicate which always fails
 *   () => false
 *   // error interceptor fn
 *   () => ({[FX_DISPATCH_NOW]: ["error", "reason"]})
 * )
 * ```
 *
 * Note: For this interceptor to work as expected, it needs to be
 * provided BEFORE the main handler in the interceptor list for a given
 * event, i.e.
 *
 * ```
 * [
 *    ensurePred((state, e) => false),
 *    // actual event handler
 *    (state, e) => console.log("no one never calls me")
 * ]
 * ```
 *
 * @param pred predicate applied to given state & event
 * @param err interceptor triggered on predicate failure
 */


exports.snapshot = snapshot;

const ensurePred = (pred, err) => (state, e, bus) => !pred(state, e, bus) ? Object.assign({
  [_api.FX_CANCEL]: true
}, err ? err(state, e, bus) : null) : undefined;
/**
 * Specialization of `ensurePred()` to ensure a state value is less than
 * given max at the time when the event is being processed. The optional
 * `path` fn is used to extract or produce the path for the state value
 * to be validated. If omitted, the event's payload item is interpreted
 * as the value path.
 *
 * For example, without a provided `path` function and for an event of
 * this form: `["event-id", "foo.bar"]`, the term `"foo.bar"` would be
 * interpreted as path.
 *
 * If the event has this shape: `["event-id", ["foo.bar", 23]]`, we must
 * provide `(e) => e[1][0]` as path function to extract `"foo.bar"` from
 * the event.
 *
 * @param max
 * @param path path extractor
 * @param err error interceptor
 */


exports.ensurePred = ensurePred;

const ensureStateLessThan = (max, path, err) => ensurePred((state, e) => (0, _paths.getIn)(state, path ? path(e) : e[1]) < max, err);
/**
 * Specialization of `ensurePred()` to ensure a state value is greater
 * than given min. See `ensureStateLessThan()` for further details.
 *
 * @param min
 * @param path path extractor
 * @param err error interceptor
 */


exports.ensureStateLessThan = ensureStateLessThan;

const ensureStateGreaterThan = (min, path, err) => ensurePred((state, e) => (0, _paths.getIn)(state, path ? path(e) : e[1]) > min, err);
/**
 * Specialization of `ensurePred()` to ensure a state value is within
 * given `min` / `max` closed interval. See `ensureStateLessThan()` for
 * further details.
 *
 * @param min
 * @param max
 * @param path path extractor
 * @param err error interceptor
 */


exports.ensureStateGreaterThan = ensureStateGreaterThan;

const ensureStateRange = (min, max, path, err) => ensurePred((state, e) => {
  const x = (0, _paths.getIn)(state, path ? path(e) : e[1]);
  return x >= min && x <= max;
}, err);
/**
 * Specialization of `ensurePred()` to ensure an event's payload value
 * is within given `min` / `max` closed interval. By default, assumes
 * event format like: `[event-id, value]`. However if `value` is given,
 * the provided function can be used to extract the value to be
 * validated from any event. If the value is outside the given interval,
 * triggers `FX_CANCEL` side effect and if `err` is given, the error
 * interceptor can return any number of other side effects and so be
 * used to dispatch alternative events instead.
 *
 * @param min
 * @param max
 * @param value event value extractor
 * @param err error interceptor
 */


exports.ensureStateRange = ensureStateRange;

const ensureParamRange = (min, max, value, err) => ensurePred((_, e) => {
  const x = value ? value(e) : e[1];
  return x >= min && x <= max;
}, err);
/**
 * Higher-order interceptor. Returns new interceptor to set state value
 * at provided path. This allows for dedicated events to set state
 * values more concisely, e.g. given this event definition:
 *
 * ```
 * setFoo: valueSetter("foo.bar")
 * ```
 *
 * ...the `setFoo` event then can be triggered like so to update the
 * state value at `foo.bar`:
 *
 * ```
 * bus.dispatch(["setFoo", 23])
 * ```
 *
 * @param path
 * @param tx
 */


exports.ensureParamRange = ensureParamRange;

const valueSetter = (path, tx) => {
  const $ = (0, _paths.setter)(path);
  return (state, [_, val]) => ({
    [_api.FX_STATE]: $(state, tx ? tx(val) : val)
  });
};
/**
 * Higher-order interceptor. Returns new interceptor to update state
 * value at provided path with given function. This allows for dedicated
 * events to update state values more concisely, e.g. given this event
 * definition:
 *
 * ```
 * incFoo: valueUpdater("foo.bar", (x, y) => x + y)
 * ```
 *
 * ...the `incFoo` event then can be triggered like so to update the
 * state value at `foo.bar` (where `1` is the extra arg provided to the
 * update fn:
 *
 * ```
 * bus.dispatch(["incFoo", 1]) // results in value = value + 1
 * ```
 *
 * @param path
 * @param fn
 */


exports.valueSetter = valueSetter;

const valueUpdater = (path, fn) => {
  const $ = (0, _paths.updater)(path, fn);
  return (state, [_, ...args]) => ({
    [_api.FX_STATE]: $(state, ...args)
  });
};

exports.valueUpdater = valueUpdater;
},{"@thi.ng/paths":"node_modules/@thi.ng/paths/index.js","./api":"node_modules/@thi.ng/interceptors/api.js"}],"node_modules/@thi.ng/interceptors/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _api = require("./api");

Object.keys(_api).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _api[key];
    }
  });
});

var _eventBus = require("./event-bus");

Object.keys(_eventBus).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _eventBus[key];
    }
  });
});

var _interceptors = require("./interceptors");

Object.keys(_interceptors).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _interceptors[key];
    }
  });
});
},{"./api":"node_modules/@thi.ng/interceptors/api.js","./event-bus":"node_modules/@thi.ng/interceptors/event-bus.js","./interceptors":"node_modules/@thi.ng/interceptors/interceptors.js"}],"node_modules/@thi.ng/router/api.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EVENT_ROUTE_FAILED = exports.EVENT_ROUTE_CHANGED = void 0;

/**
 * ID of event being triggered by `router.match()`
 */
const EVENT_ROUTE_CHANGED = "route-changed";
exports.EVENT_ROUTE_CHANGED = EVENT_ROUTE_CHANGED;
const EVENT_ROUTE_FAILED = "route-failed";
exports.EVENT_ROUTE_FAILED = EVENT_ROUTE_FAILED;
},{}],"node_modules/@thi.ng/router/basic.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BasicRouter = void 0;

var _api = require("@thi.ng/api");

var _checks = require("@thi.ng/checks");

var _equiv = require("@thi.ng/equiv");

var _errors = require("@thi.ng/errors");

var _api2 = require("./api");

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

let BasicRouter = class BasicRouter {
  constructor(config) {
    config.authenticator = config.authenticator || ((route, _, params) => ({
      id: route.id,
      title: route.title,
      params
    }));

    config.prefix = config.prefix === undefined ? "/" : config.prefix;
    config.separator = config.separator || "/";
    this.config = config;
  } // mixin


  addListener(_, __, ___) {
    return false;
  }

  removeListener(_, __, ___) {
    return false;
  }

  notify(_) {}

  start() {
    if (this.config.initialRouteID) {
      const route = this.routeForID(this.config.initialRouteID);
      this.current = {
        id: route.id,
        title: route.title,
        params: {}
      };
      this.notify({
        id: _api2.EVENT_ROUTE_CHANGED,
        value: this.current
      });
    }
  }
  /**
   * Main router function. Attempts to match given input string
   * against all configured routes. If none matches, falls back
   * to default route. Before returning, triggers event with
   * return value as well.
   *
   * @param raw route path to match
   */


  route(src) {
    if (src.charAt(0) === "#") {
      src = src.substr(1);
    }

    src = src.substr(this.config.prefix.length);
    const routes = this.config.routes,
          curr = src.split(this.config.separator);
    let match;

    for (let i = 0, n = routes.length; i < n; i++) {
      const route = routes[i],
            m = this.matchRoute(curr, route);

      if (m) {
        match = m;
        break;
      }
    }

    if (!match) {
      if (!this.handleRouteFailure()) {
        return;
      }

      const route = this.routeForID(this.config.defaultRouteID);
      match = {
        id: route.id,
        title: route.title,
        params: {}
      };
    }

    if (!(0, _equiv.equiv)(match, this.current)) {
      this.current = match;
      this.notify({
        id: _api2.EVENT_ROUTE_CHANGED,
        value: match
      });
    }

    return match;
  }

  format(...args) {
    let [id, params, hash] = args;
    let match;

    switch (args.length) {
      case 3:
        match = {
          id,
          params
        };
        break;

      case 2:
        if ((0, _checks.isString)(id)) {
          match = {
            id,
            params
          };
        } else {
          hash = params;
          match = id;
        }

        break;

      case 1:
        match = (0, _checks.isString)(id) ? {
          id
        } : id;
        break;

      default:
        (0, _errors.illegalArity)(args.length);
    }

    const route = this.routeForID(match.id);

    if (route) {
      const params = match.params || {};
      return (hash ? "#" : "") + this.config.prefix + route.match.map(x => x.charAt(0) === "?" ? (x = params[x.substr(1)]) != null ? x : "NULL" : x).join(this.config.separator);
    } else {
      (0, _errors.illegalArgs)(`invalid route ID: ${match.id.toString()}`);
    }
  }

  routeForID(id) {
    return this.config.routes.find(route => route.id === id);
  }

  matchRoute(curr, route) {
    const match = route.match,
          n = match.length;

    if (curr.length === n) {
      const params = {};

      for (let i = 0; i < n; i++) {
        const m = match[i];

        if (m.charAt(0) === "?") {
          params[m.substr(1)] = curr[i];
        } else if (curr[i] !== m) {
          return;
        }
      }

      if (route.validate && !this.validateRouteParams(params, route.validate)) {
        return;
      }

      return route.auth ? this.config.authenticator(route, curr, params) : {
        id: route.id,
        title: route.title,
        params
      };
    }
  }

  validateRouteParams(params, validators) {
    for (let id in validators) {
      if (params[id] !== undefined) {
        const val = validators[id];

        if (val.coerce) {
          params[id] = val.coerce(params[id]);
        }

        if (val.check && !val.check(params[id])) {
          return false;
        }
      }
    }

    return true;
  }

  handleRouteFailure() {
    return true;
  }

};
exports.BasicRouter = BasicRouter;
exports.BasicRouter = BasicRouter = __decorate([_api.INotifyMixin], BasicRouter);
},{"@thi.ng/api":"node_modules/@thi.ng/api/index.js","@thi.ng/checks":"node_modules/@thi.ng/checks/index.js","@thi.ng/equiv":"node_modules/@thi.ng/equiv/index.js","@thi.ng/errors":"node_modules/@thi.ng/errors/index.js","./api":"node_modules/@thi.ng/router/api.js"}],"node_modules/@thi.ng/router/history.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HTMLRouter = void 0;

var _checks = require("@thi.ng/checks");

var _equiv = require("@thi.ng/equiv");

var _errors = require("@thi.ng/errors");

var _basic = require("./basic");

class HTMLRouter extends _basic.BasicRouter {
  constructor(config) {
    super(config);
    this.useFragment = config.useFragment !== false;
  }

  start() {
    window.addEventListener("popstate", this.handlePopChange());

    if (this.useFragment) {
      window.addEventListener("hashchange", this.handleHashChange());
    }

    if (this.config.initialRouteID) {
      const route = this.routeForID(this.config.initialRouteID);
      this.route(this.format({
        id: route.id,
        title: route.title
      }));
    } else {
      this.route(this.useFragment ? location.hash : location.pathname);
    }
  }

  release() {
    window.removeEventListener("popstate", this.popHandler);

    if (this.useFragment) {
      window.removeEventListener("hashchange", this.hashHandler);
    }
  }
  /**
   * Like `BasicRouter.route()`, but takes additional arg to control
   * if this routing operation should manipulate the browser's `history`.
   * If called from userland, this normally is true. However, we want
   * to avoid this if called from this router's own event handlers.
   *
   * @param raw
   * @param pushState
   */


  route(src, pushState = true) {
    const old = this.current,
          route = super.route(src);

    if (!(0, _equiv.equiv)(route, old)) {
      this.currentPath = this.format(route);

      if (pushState) {
        history.pushState(this.currentPath, route.title || window.document.title || "", this.currentPath);
      }
    }

    return route;
  }

  routeTo(route) {
    if (this.useFragment) {
      location.hash = route;
    }

    this.route(route);
  }

  format(...args) {
    let match;

    switch (args.length) {
      case 2:
        match = {
          id: args[0],
          params: args[1]
        };
        break;

      case 1:
        match = (0, _checks.isString)(args[0]) ? {
          id: args[0]
        } : args[0];
        break;

      default:
        (0, _errors.illegalArity)(args.length);
    }

    return super.format(match, this.useFragment);
  }

  handlePopChange() {
    return this.popHandler = this.popHandler || (e => {
      this.route(e.state || (this.useFragment ? location.hash : location.pathname), false);
    }).bind(this);
  }

  handleHashChange() {
    return this.hashHandler = this.hashHandler || (e => {
      if (!this.ignoreHashChange) {
        const hash = e.newURL.substr(e.newURL.indexOf("#"));

        if (hash !== this.currentPath) {
          this.route(hash, false);
        }
      }
    }).bind(this);
  }

  handleRouteFailure() {
    this.ignoreHashChange = true;
    location.hash = this.format({
      id: this.routeForID(this.config.defaultRouteID).id
    });
    this.ignoreHashChange = false;
    return true;
  }

}

exports.HTMLRouter = HTMLRouter;
},{"@thi.ng/checks":"node_modules/@thi.ng/checks/index.js","@thi.ng/equiv":"node_modules/@thi.ng/equiv/index.js","@thi.ng/errors":"node_modules/@thi.ng/errors/index.js","./basic":"node_modules/@thi.ng/router/basic.js"}],"node_modules/@thi.ng/router/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _api = require("./api");

Object.keys(_api).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _api[key];
    }
  });
});

var _basic = require("./basic");

Object.keys(_basic).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _basic[key];
    }
  });
});

var _history = require("./history");

Object.keys(_history).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _history[key];
    }
  });
});
},{"./api":"node_modules/@thi.ng/router/api.js","./basic":"node_modules/@thi.ng/router/basic.js","./history":"node_modules/@thi.ng/router/history.js"}],"src/effects.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ROUTE_TO = exports.JSON = void 0;
const JSON = "load-json";
exports.JSON = JSON;
const ROUTE_TO = "route-to";
exports.ROUTE_TO = ROUTE_TO;
},{}],"src/events.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEBUG = exports.TOGGLE_WECHAT = exports.NEXT_FEATURED_PROJECT = exports.LOAD_PROJECTS_ERROR = exports.RECEIVE_PROJECTS = exports.PARSE_PROJECTS = exports.LOAD_PROJECTS = exports.TOGGLE_NAV_GROUP = exports.ROUTE_TO = exports.RESIZE = void 0;
const RESIZE = 'resize';
exports.RESIZE = RESIZE;
const ROUTE_TO = "route-to";
exports.ROUTE_TO = ROUTE_TO;
const TOGGLE_NAV_GROUP = 'toggle-nav-group';
exports.TOGGLE_NAV_GROUP = TOGGLE_NAV_GROUP;
const LOAD_PROJECTS = 'load-projects';
exports.LOAD_PROJECTS = LOAD_PROJECTS;
const PARSE_PROJECTS = 'parse-projects';
exports.PARSE_PROJECTS = PARSE_PROJECTS;
const RECEIVE_PROJECTS = 'receive-projects';
exports.RECEIVE_PROJECTS = RECEIVE_PROJECTS;
const LOAD_PROJECTS_ERROR = 'load-projects-erroe';
exports.LOAD_PROJECTS_ERROR = LOAD_PROJECTS_ERROR;
const NEXT_FEATURED_PROJECT = 'next-featured-project';
exports.NEXT_FEATURED_PROJECT = NEXT_FEATURED_PROJECT;
const TOGGLE_WECHAT = 'toggle-wechat';
exports.TOGGLE_WECHAT = TOGGLE_WECHAT;
const DEBUG = 'debug';
exports.DEBUG = DEBUG;
},{}],"src/routes.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JOIN = exports.CONTACT = exports.GROUP = exports.ABOUT = exports.NEWS = exports.NEWS_LIST = exports.WORK_GALLERY = exports.WORK_DETAIL = exports.WORKS_TABLE = exports.WORKS_LIST = exports.HOME = void 0;
const HOME = {
  id: "home",
  match: ["home"]
};
exports.HOME = HOME;
const WORKS_LIST = {
  id: "works-list",
  match: ["works", "?type"]
};
exports.WORKS_LIST = WORKS_LIST;
const WORKS_TABLE = {
  id: "works-table",
  match: ["works"]
};
exports.WORKS_TABLE = WORKS_TABLE;
const WORK_DETAIL = {
  id: "work",
  match: ["work", "?id"]
};
exports.WORK_DETAIL = WORK_DETAIL;
const WORK_GALLERY = {
  id: 'gallery',
  match: ["gallery", "?id", "?index"]
};
exports.WORK_GALLERY = WORK_GALLERY;
const NEWS_LIST = {
  id: "news-list",
  match: ["news"]
};
exports.NEWS_LIST = NEWS_LIST;
const NEWS = {
  id: "news",
  match: ["news", "?id"]
};
exports.NEWS = NEWS;
const ABOUT = {
  id: "about",
  match: ["about"]
};
exports.ABOUT = ABOUT;
const GROUP = {
  id: "group",
  match: ["group"]
};
exports.GROUP = GROUP;
const CONTACT = {
  id: "contact",
  match: ["contact"]
};
exports.CONTACT = CONTACT;
const JOIN = {
  id: "join",
  match: ["join"]
};
exports.JOIN = JOIN;
},{}],"node_modules/@thi.ng/hdom-components/utils/merge-attribs.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mergeAttribs = void 0;

/**
 * Helper function to immutably merge attribs from two sources and
 * concatenate their `class` values and merge their `style` maps (if
 * present). Returns merged result object.
 *
 * @param base base attribs
 * @param xs overrides
 */
const mergeAttribs = (base, xs) => {
  if (!xs) return base;
  const res = Object.assign({}, base, xs);
  base.class && xs.class && (res.class = base.class + " " + xs.class);
  base.style && xs.style && (res.style = Object.assign({}, base.style, xs.style));
  return res;
};

exports.mergeAttribs = mergeAttribs;
},{}],"node_modules/@thi.ng/hdom-components/button.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.button = void 0;

var _mergeAttribs = require("./utils/merge-attribs");

/**
 * Higher order function to create a new stateless button component,
 * pre-configured via user supplied options. The returned component
 * function accepts the following arguments:
 *
 * - hdom context object (unused)
 * - partial `ButtonArgs` object (extra attribs, onclick, disabled)
 * - body content (varargs)
 *
 * Any `attribs` provided as arg via `ButtonArgs` are merged with the
 * default options provided to the HOF. The `disabled` arg decides which
 * button version to create. The button can have any number of body
 * elements (e.g. icon and label), given as varargs.
 */
const button = opts => {
  // init with defaults
  opts = Object.assign({
    tag: "a",
    tagDisabled: "span",
    preventDefault: true,
    attribs: {}
  }, opts);
  !opts.attribs.role && (opts.attribs.role = "button");
  return (_, args, ...body) => args.disabled ? [opts.tagDisabled, Object.assign({}, (0, _mergeAttribs.mergeAttribs)(opts.attribsDisabled, args.attribs), {
    disabled: true
  }), ...body] : [opts.tag, Object.assign({}, (0, _mergeAttribs.mergeAttribs)(opts.attribs, args.attribs), {
    onclick: opts.preventDefault ? e => (e.preventDefault(), args.onclick(e)) : args.onclick
  }), ...body];
};

exports.button = button;
},{"./utils/merge-attribs":"node_modules/@thi.ng/hdom-components/utils/merge-attribs.js"}],"node_modules/@thi.ng/hdom-components/button-group.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buttonGroup = void 0;

var _mergeAttribs = require("./utils/merge-attribs");

/**
 * Higher order function to create a new stateless button group
 * component, pre-configured via user supplied options. The returned
 * component function accepts the following arguments:
 *
 * - hdom context object (unused)
 * - partial `ButtonGroupArgs` object (extra attribs, disabled flag)
 * - button group items (varargs)
 *
 * Any `attribs` provided as arg via `ButtonGroupArgs` are merged with
 * the default options provided to the HOF. If `disabled` is true, ALL
 * buttons in the group will be disabled, regardless of their individual
 * settings. The group can have any number of elements, given as
 * varargs.
 *
 * @param opts
 */
const buttonGroup = opts => (_, args, ...buttons) => ["div", (0, _mergeAttribs.mergeAttribs)(opts.attribs, args.attribs), ...groupBody(opts, args.disabled, buttons)];

exports.buttonGroup = buttonGroup;

const groupBody = (opts, disabled, buttons) => {
  switch (buttons.length) {
    case 0:
      return;

    case 1:
      return [bt(opts.inner || opts.first, disabled, buttons[0])];

    case 2:
      return [bt(opts.first, disabled, buttons[0]), bt(opts.last || opts.first, disabled, buttons[1])];

    default:
      {
        const res = [bt(opts.first, disabled, buttons[0])];
        const el = opts.inner || opts.first;
        const n = buttons.length - 1;

        for (let i = 1; i < n; i++) {
          res[i] = bt(el, disabled, buttons[i]);
        }

        res[n] = bt(opts.last || opts.first, disabled, buttons[n]);
        return res;
      }
  }
};

const bt = (el, disabled, bt) => disabled ? [el, Object.assign({}, bt[0], {
  disabled: true
}), ...bt.slice(1)] : [el, ...bt];
},{"./utils/merge-attribs":"node_modules/@thi.ng/hdom-components/utils/merge-attribs.js"}],"node_modules/@thi.ng/hdom-components/canvas.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.adaptDPI = exports.canvas2D = exports.canvasWebGL2 = exports.canvasWebGL = void 0;

/**
 * Configurable canvas component. Used as common base for `canvasWebGL`
 * and `canvas2D` wrappers.
 *
 * @param type canvas context type
 * @param handlers user handlers
 * @param opts canvas context creation options
 */
const _canvas = (type, handlers, opts) => {
  let el, ctx;
  let frame = 0;
  let time = 0;
  return {
    init(_el, hctx, ...args) {
      el = _el;
      adaptDPI(el, el.width, el.height);
      ctx = el.getContext(type, opts);
      time = Date.now();
      handlers.init && handlers.init(el, ctx, hctx, ...args);
      handlers.update && handlers.update(el, ctx, hctx, time, frame++, ...args);
    },

    render(hctx, ...args) {
      ctx && handlers.update && handlers.update(el, ctx, hctx, Date.now() - time, frame++, ...args);
      return ["canvas", args[0]];
    },

    release(hctx, ...args) {
      handlers.release && handlers.release(el, ctx, hctx, ...args);
    }

  };
};
/**
 * Higher order WebGL canvas component delegating to user provided
 * handlers.
 *
 * Note: Since this is an higher order component, if used within a
 * non-static parent component, this function itself cannot be directly
 * inlined into hdom tree and must be initialized prior/outside, however
 * the returned component can be used as normal.
 *
 * ```
 * const glcanvas = canvasWebGL({
 *   render(canv, gl, hctx, time, frame, ...args) {
 *     const col = 0.5 + 0.5 * Math.sin(time);
 *     gl.clearColor(col, col, col, 1);
 *   }
 * });
 * ...
 * [glcanvas, {id: "foo", width: 640, height: 480}]
 * ```
 *
 * @param handlers user provided handlers
 * @param opts canvas context creation options
 */


const canvasWebGL = (handlers, opts) => _canvas("webgl", handlers, opts);
/**
 * Same as `canvasWebGL` but targets WebGL2.
 *
 * @param handlers user provided handlers
 * @param opts canvas context creation options
 */


exports.canvasWebGL = canvasWebGL;

const canvasWebGL2 = (handlers, opts) => _canvas("webgl2", handlers, opts);
/**
 * Similar to `canvasWebGL`, but targets default 2D drawing context.
 *
 * @param handlers user provided handlers
 * @param glopts canvas context creation options
 */


exports.canvasWebGL2 = canvasWebGL2;

const canvas2D = (handlers, opts) => _canvas("2d", handlers, opts);
/**
 * Sets the canvas size to given `width` & `height` and adjusts style to
 * compensate for HDPI devices. Note: For 2D canvases, this will
 * automatically clear any prior canvas content.
 *
 * @param canvas
 * @param width uncompensated pixel width
 * @param height uncompensated pixel height
 */


exports.canvas2D = canvas2D;

const adaptDPI = (canvas, width, height) => {
  const dpr = window.devicePixelRatio || 1;

  if (dpr != 1) {
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
  }

  canvas.width = width * dpr;
  canvas.height = height * dpr;
  return dpr;
};

exports.adaptDPI = adaptDPI;
},{}],"node_modules/@thi.ng/hdom-components/dropdown.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.groupedDropdown = exports.dropdown = exports.optgroup = exports.option = void 0;

const option = ([value, label, disabled], sel) => ["option", {
  value,
  disabled: !!disabled,
  selected: value === sel
}, label];

exports.option = option;

const optgroup = (attribs, options, sel) => ["optgroup", Object.assign({}, attribs, {
  label: attribs.label || "--"
}), ...options.map(o => option(o, sel))];

exports.optgroup = optgroup;

const dropdown = (_, attribs, options, sel) => ["select", attribs, ...options.map(o => option(o, sel))];

exports.dropdown = dropdown;

const groupedDropdown = (_, attribs, groups, sel) => ["select", attribs, ...groups.map(o => optgroup(o[0], o[1], sel))];

exports.groupedDropdown = groupedDropdown;
},{}],"node_modules/@thi.ng/transducers-stats/mse.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mse = void 0;

/**
 * Computes mean square error of given array.
 *
 * @param window
 * @param mean
 */
const mse = (window, mean) => {
  let sum = 0;

  for (let i = window.length - 1; i >= 0; i--) {
    sum += Math.pow(window[i] - mean, 2);
  }

  return sum;
};

exports.mse = mse;
},{}],"node_modules/@thi.ng/transducers-stats/sma.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sma = sma;

var _dcons = require("@thi.ng/dcons");

var _errors = require("@thi.ng/errors");

var _transducers = require("@thi.ng/transducers");

function sma(period, src) {
  if (src) {
    return (0, _transducers.iterator1)(sma(period), src);
  }

  period |= 0;
  period < 2 && (0, _errors.illegalArgs)("period must be >= 2");
  return rfn => {
    const reduce = rfn[2];
    const window = new _dcons.DCons();
    let sum = 0;
    return (0, _transducers.compR)(rfn, (acc, x) => {
      window.push(x);
      const n = window.length;
      sum += x;
      n > period && (sum -= window.drop());
      return n >= period ? reduce(acc, sum / period) : acc;
    });
  };
}
},{"@thi.ng/dcons":"node_modules/@thi.ng/dcons/index.js","@thi.ng/errors":"node_modules/@thi.ng/errors/index.js","@thi.ng/transducers":"node_modules/@thi.ng/transducers/index.js"}],"node_modules/@thi.ng/transducers-stats/bollinger.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bollinger = bollinger;

var _transducers = require("@thi.ng/transducers");

var _mse = require("./mse");

var _sma = require("./sma");

function bollinger(...args) {
  const iter = (0, _transducers.$iter)(bollinger, args);

  if (iter) {
    return iter;
  }

  const period = args[0] || 20;
  const sd = args[1] || 2;
  return (0, _transducers.comp)((0, _transducers.multiplex)((0, _transducers.partition)(period, 1), (0, _sma.sma)(period)), (0, _transducers.drop)(period - 1), (0, _transducers.map)(([window, mean]) => {
    const std = Math.sqrt((0, _mse.mse)(window, mean) / period) * sd;
    const min = mean - std;
    const max = mean + std;
    const pb = (window[period - 1] - min) / (max - min);
    return {
      min,
      max,
      mean,
      pb
    };
  }));
}
},{"@thi.ng/transducers":"node_modules/@thi.ng/transducers/index.js","./mse":"node_modules/@thi.ng/transducers-stats/mse.js","./sma":"node_modules/@thi.ng/transducers-stats/sma.js"}],"node_modules/@thi.ng/transducers-stats/bounds.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bounds = void 0;

/**
 * Computes min / max values of given array.
 *
 * @param window
 */
const bounds = window => {
  let min = window[0];
  let max = min;

  for (let i = window.length - 1; i > 0; i--) {
    const v = window[i];
    min = Math.min(min, v);
    max = Math.max(max, v);
  }

  return [min, max];
};

exports.bounds = bounds;
},{}],"node_modules/@thi.ng/transducers-stats/donchian.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.donchian = donchian;

var _transducers = require("@thi.ng/transducers");

var _bounds = require("./bounds");

function donchian(period, src) {
  return src ? (0, _transducers.iterator)(donchian(period), src) : (0, _transducers.comp)((0, _transducers.partition)(period, 1), (0, _transducers.map)(_bounds.bounds));
}
},{"@thi.ng/transducers":"node_modules/@thi.ng/transducers/index.js","./bounds":"node_modules/@thi.ng/transducers-stats/bounds.js"}],"node_modules/@thi.ng/transducers-stats/ema.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ema = ema;

var _errors = require("@thi.ng/errors");

var _transducers = require("@thi.ng/transducers");

function ema(period, src) {
  if (src) {
    return (0, _transducers.iterator1)(ema(period), src);
  }

  period |= 0;
  period < 2 && (0, _errors.illegalArgs)("period must be >= 2");
  const k = 2 / (period + 1);
  return rfn => {
    const reduce = rfn[2];
    let window = [];
    let sum = 0;
    let ema;
    return (0, _transducers.compR)(rfn, (acc, x) => {
      if (ema != null) {
        ema += (x - ema) * k;
        return rfn[2](acc, ema);
      } else {
        window.push(x);
        sum += x;

        if (window.length == period) {
          ema = sum / period;
          window = null;
          return reduce(acc, ema);
        }

        return acc;
      }
    });
  };
}
},{"@thi.ng/errors":"node_modules/@thi.ng/errors/index.js","@thi.ng/transducers":"node_modules/@thi.ng/transducers/index.js"}],"node_modules/@thi.ng/transducers-stats/dot.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dot = void 0;

/**
 * Computes dot product of 2 arrays. Assumes `a` and `b` are equal
 * sized, but only considers length of `a`.
 *
 * @param a
 * @param b
 */
const dot = (a, b) => {
  let sum = 0;

  for (let i = a.length - 1; i >= 0; i--) {
    sum += a[i] * b[i];
  }

  return sum;
};

exports.dot = dot;
},{}],"node_modules/@thi.ng/transducers-stats/wma.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wma = wma;

var _checks = require("@thi.ng/checks");

var _transducers = require("@thi.ng/transducers");

var _dot = require("./dot");

function wma(weights, src) {
  if (src) {
    return (0, _transducers.iterator1)(wma(weights), src);
  }

  let period, wsum;

  if ((0, _checks.isNumber)(weights)) {
    period = weights | 0;
    weights = [...(0, _transducers.range)(1, period + 1)];
    wsum = period * (period + 1) / 2;
  } else {
    period = weights.length;
    wsum = weights.reduce((acc, x) => acc + x, 0);
  }

  return (0, _transducers.comp)((0, _transducers.partition)(period, 1), (0, _transducers.map)(window => (0, _dot.dot)(window, weights) / wsum));
}
},{"@thi.ng/checks":"node_modules/@thi.ng/checks/index.js","@thi.ng/transducers":"node_modules/@thi.ng/transducers/index.js","./dot":"node_modules/@thi.ng/transducers-stats/dot.js"}],"node_modules/@thi.ng/transducers-stats/hma.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hma = hma;

var _transducers = require("@thi.ng/transducers");

var _wma = require("./wma");

function hma(period, src) {
  return src ? (0, _transducers.iterator1)(hma(period), src) : (0, _transducers.comp)((0, _transducers.multiplex)((0, _wma.wma)(period / 2 | 0), (0, _wma.wma)(period)), (0, _transducers.drop)(period - 1), (0, _transducers.map)(w => 2 * w[0] - w[1]), (0, _wma.wma)(Math.sqrt(period)));
}
},{"@thi.ng/transducers":"node_modules/@thi.ng/transducers/index.js","./wma":"node_modules/@thi.ng/transducers-stats/wma.js"}],"node_modules/@thi.ng/transducers-stats/macd.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.macd = macd;

var _transducers = require("@thi.ng/transducers");

var _ema = require("./ema");

function macd(...args) {
  return (0, _transducers.$iter)(macd, args) || (rfn => {
    const reduce = rfn[2];
    const maFast = (0, _transducers.step)((0, _ema.ema)(args[0] || 12));
    const maSlow = (0, _transducers.step)((0, _ema.ema)(args[1] || 26));
    const maSmooth = (0, _transducers.step)((0, _ema.ema)(args[2] || 9));
    return (0, _transducers.compR)(rfn, (acc, x) => {
      const fast = maFast(x);
      const slow = maSlow(x);
      if (slow == null) return acc;
      const macd = fast - slow;
      const signal = maSmooth(macd);
      if (signal == null) return acc;
      return reduce(acc, {
        macd,
        signal,
        div: macd - signal,
        fast,
        slow
      });
    });
  });
}
},{"@thi.ng/transducers":"node_modules/@thi.ng/transducers/index.js","./ema":"node_modules/@thi.ng/transducers-stats/ema.js"}],"node_modules/@thi.ng/transducers-stats/momentum.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.momentum = momentum;

var _dcons = require("@thi.ng/dcons");

var _errors = require("@thi.ng/errors");

var _transducers = require("@thi.ng/transducers");

function momentum(period, src) {
  if (src) {
    return (0, _transducers.iterator1)(momentum(period), src);
  }

  period |= 0;
  period < 1 && (0, _errors.illegalArgs)("period must be >= 1");
  return rfn => {
    const reduce = rfn[2];
    const window = new _dcons.DCons();
    return (0, _transducers.compR)(rfn, (acc, x) => {
      window.push(x);

      if (window.length <= period) {
        return acc;
      }

      const prev = window.drop();
      return reduce(acc, x - prev);
    });
  };
}
},{"@thi.ng/dcons":"node_modules/@thi.ng/dcons/index.js","@thi.ng/errors":"node_modules/@thi.ng/errors/index.js","@thi.ng/transducers":"node_modules/@thi.ng/transducers/index.js"}],"node_modules/@thi.ng/transducers-stats/roc.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.roc = roc;

var _dcons = require("@thi.ng/dcons");

var _errors = require("@thi.ng/errors");

var _transducers = require("@thi.ng/transducers");

function roc(period, src) {
  if (src) {
    return (0, _transducers.iterator1)(roc(period), src);
  }

  period < 1 && (0, _errors.illegalArgs)("period must be >= 1");
  return rfn => {
    const reduce = rfn[2];
    const window = new _dcons.DCons();
    return (0, _transducers.compR)(rfn, (acc, x) => {
      window.push(x);

      if (window.length <= period) {
        return acc;
      }

      const prev = window.drop();
      return reduce(acc, (x - prev) / prev);
    });
  };
}
},{"@thi.ng/dcons":"node_modules/@thi.ng/dcons/index.js","@thi.ng/errors":"node_modules/@thi.ng/errors/index.js","@thi.ng/transducers":"node_modules/@thi.ng/transducers/index.js"}],"node_modules/@thi.ng/transducers-stats/rsi.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rsi = rsi;

var _transducers = require("@thi.ng/transducers");

var _momentum = require("./momentum");

var _sma = require("./sma");

function rsi(period, src) {
  return src ? (0, _transducers.iterator1)(rsi(period), src) : (0, _transducers.comp)((0, _momentum.momentum)(1), (0, _transducers.multiplex)((0, _transducers.comp)((0, _transducers.map)(x => x > 0 ? x : 0), (0, _sma.sma)(period)), (0, _transducers.comp)((0, _transducers.map)(x => x < 0 ? -x : 0), (0, _sma.sma)(period))), (0, _transducers.drop)(period - 1), (0, _transducers.map)(hl => 100 - 100 / (1 + hl[0] / Math.max(1e-6, hl[1]))));
}
},{"@thi.ng/transducers":"node_modules/@thi.ng/transducers/index.js","./momentum":"node_modules/@thi.ng/transducers-stats/momentum.js","./sma":"node_modules/@thi.ng/transducers-stats/sma.js"}],"node_modules/@thi.ng/transducers-stats/sd.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sd = sd;

var _transducers = require("@thi.ng/transducers");

var _mse = require("./mse");

var _sma = require("./sma");

function sd(...args) {
  const iter = (0, _transducers.$iter)(sd, args);

  if (iter) {
    return iter;
  }

  const period = args[0] || 20;
  const scale = args[1] || 1;
  return (0, _transducers.comp)((0, _transducers.multiplex)((0, _transducers.partition)(period, 1), (0, _sma.sma)(period)), (0, _transducers.drop)(period - 1), (0, _transducers.map)(([window, mean]) => Math.sqrt((0, _mse.mse)(window, mean) / period) * scale));
}
},{"@thi.ng/transducers":"node_modules/@thi.ng/transducers/index.js","./mse":"node_modules/@thi.ng/transducers-stats/mse.js","./sma":"node_modules/@thi.ng/transducers-stats/sma.js"}],"node_modules/@thi.ng/transducers-stats/stochastic.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stochastic = stochastic;

var _transducers = require("@thi.ng/transducers");

var _donchian = require("./donchian");

var _sma = require("./sma");

function stochastic(...args) {
  return (0, _transducers.$iter)(stochastic, args) || (rfn => {
    const reduce = rfn[2];
    const xfD = (0, _transducers.step)((0, _donchian.donchian)(args[0] || 5));
    const ma1 = (0, _transducers.step)((0, _sma.sma)(args[1] || 3));
    const ma2 = (0, _transducers.step)((0, _sma.sma)(args[2] || 3));
    return (0, _transducers.compR)(rfn, (acc, x) => {
      const b = xfD(x);
      if (b == null) return acc;
      const k = (x - b[0]) / (b[1] - b[0]);
      const d1 = ma1(k);
      if (d1 == null) return acc;
      const d2 = ma2(d1);
      if (d2 == null) return acc;
      return reduce(acc, {
        k,
        d1,
        d2
      });
    });
  });
}
},{"@thi.ng/transducers":"node_modules/@thi.ng/transducers/index.js","./donchian":"node_modules/@thi.ng/transducers-stats/donchian.js","./sma":"node_modules/@thi.ng/transducers-stats/sma.js"}],"node_modules/@thi.ng/transducers-stats/trix.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.trix = trix;

var _transducers = require("@thi.ng/transducers");

var _ema = require("./ema");

var _roc = require("./roc");

function trix(period, src) {
  return src ? (0, _transducers.iterator1)(trix(period), src) : (0, _transducers.comp)((0, _ema.ema)(period), (0, _ema.ema)(period), (0, _ema.ema)(period), (0, _roc.roc)(1));
}
},{"@thi.ng/transducers":"node_modules/@thi.ng/transducers/index.js","./ema":"node_modules/@thi.ng/transducers-stats/ema.js","./roc":"node_modules/@thi.ng/transducers-stats/roc.js"}],"node_modules/@thi.ng/transducers-stats/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bollinger = require("./bollinger");

Object.keys(_bollinger).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _bollinger[key];
    }
  });
});

var _donchian = require("./donchian");

Object.keys(_donchian).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _donchian[key];
    }
  });
});

var _ema = require("./ema");

Object.keys(_ema).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _ema[key];
    }
  });
});

var _hma = require("./hma");

Object.keys(_hma).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _hma[key];
    }
  });
});

var _macd = require("./macd");

Object.keys(_macd).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _macd[key];
    }
  });
});

var _momentum = require("./momentum");

Object.keys(_momentum).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _momentum[key];
    }
  });
});

var _roc = require("./roc");

Object.keys(_roc).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _roc[key];
    }
  });
});

var _rsi = require("./rsi");

Object.keys(_rsi).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _rsi[key];
    }
  });
});

var _sd = require("./sd");

Object.keys(_sd).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _sd[key];
    }
  });
});

var _sma = require("./sma");

Object.keys(_sma).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _sma[key];
    }
  });
});

var _stochastic = require("./stochastic");

Object.keys(_stochastic).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _stochastic[key];
    }
  });
});

var _trix = require("./trix");

Object.keys(_trix).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _trix[key];
    }
  });
});

var _wma = require("./wma");

Object.keys(_wma).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _wma[key];
    }
  });
});

var _bounds = require("./bounds");

Object.keys(_bounds).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _bounds[key];
    }
  });
});

var _dot = require("./dot");

Object.keys(_dot).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _dot[key];
    }
  });
});

var _mse = require("./mse");

Object.keys(_mse).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _mse[key];
    }
  });
});
},{"./bollinger":"node_modules/@thi.ng/transducers-stats/bollinger.js","./donchian":"node_modules/@thi.ng/transducers-stats/donchian.js","./ema":"node_modules/@thi.ng/transducers-stats/ema.js","./hma":"node_modules/@thi.ng/transducers-stats/hma.js","./macd":"node_modules/@thi.ng/transducers-stats/macd.js","./momentum":"node_modules/@thi.ng/transducers-stats/momentum.js","./roc":"node_modules/@thi.ng/transducers-stats/roc.js","./rsi":"node_modules/@thi.ng/transducers-stats/rsi.js","./sd":"node_modules/@thi.ng/transducers-stats/sd.js","./sma":"node_modules/@thi.ng/transducers-stats/sma.js","./stochastic":"node_modules/@thi.ng/transducers-stats/stochastic.js","./trix":"node_modules/@thi.ng/transducers-stats/trix.js","./wma":"node_modules/@thi.ng/transducers-stats/wma.js","./bounds":"node_modules/@thi.ng/transducers-stats/bounds.js","./dot":"node_modules/@thi.ng/transducers-stats/dot.js","./mse":"node_modules/@thi.ng/transducers-stats/mse.js"}],"node_modules/@thi.ng/math/api.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EPS = exports.SIXTH = exports.TWO_THIRD = exports.THIRD = exports.SQRT2_3 = exports.SQRT2_2 = exports.SQRT3 = exports.SQRT2 = exports.PHI = exports.RAD2DEG = exports.DEG2RAD = exports.INV_HALF_PI = exports.INV_TAU = exports.INV_PI = exports.SIXTH_PI = exports.QUARTER_PI = exports.THIRD_PI = exports.HALF_PI = exports.TAU = exports.PI = void 0;
const PI = Math.PI;
exports.PI = PI;
const TAU = PI * 2;
exports.TAU = TAU;
const HALF_PI = PI / 2;
exports.HALF_PI = HALF_PI;
const THIRD_PI = PI / 3;
exports.THIRD_PI = THIRD_PI;
const QUARTER_PI = PI / 4;
exports.QUARTER_PI = QUARTER_PI;
const SIXTH_PI = PI / 6;
exports.SIXTH_PI = SIXTH_PI;
const INV_PI = 1 / PI;
exports.INV_PI = INV_PI;
const INV_TAU = 1 / TAU;
exports.INV_TAU = INV_TAU;
const INV_HALF_PI = 1 / HALF_PI;
exports.INV_HALF_PI = INV_HALF_PI;
const DEG2RAD = PI / 180;
exports.DEG2RAD = DEG2RAD;
const RAD2DEG = 180 / PI;
exports.RAD2DEG = RAD2DEG;
const PHI = (1 + Math.sqrt(5)) / 2;
exports.PHI = PHI;
const SQRT2 = Math.SQRT2;
exports.SQRT2 = SQRT2;
const SQRT3 = Math.sqrt(3);
exports.SQRT3 = SQRT3;
const SQRT2_2 = SQRT2 / 2;
exports.SQRT2_2 = SQRT2_2;
const SQRT2_3 = SQRT3 / 2;
exports.SQRT2_3 = SQRT2_3;
const THIRD = 1 / 3;
exports.THIRD = THIRD;
const TWO_THIRD = 2 / 3;
exports.TWO_THIRD = TWO_THIRD;
const SIXTH = 1 / 6;
exports.SIXTH = SIXTH;
let EPS = 1e-6;
exports.EPS = EPS;
},{}],"node_modules/@thi.ng/math/abs.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sign = exports.absDiff = void 0;

var _api = require("./api");

const absDiff = (x, y) => Math.abs(x - y);

exports.absDiff = absDiff;

const sign = (x, eps = _api.EPS) => x > eps ? 1 : x < -eps ? -1 : 0;

exports.sign = sign;
},{"./api":"node_modules/@thi.ng/math/api.js"}],"node_modules/@thi.ng/math/angle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fastSin = exports.fastCos = exports.normCos = exports.loc = exports.cot = exports.sec = exports.csc = exports.rad = exports.deg = exports.quadrant = exports.atan2Abs = exports.angleDist = exports.absInnerAngle = exports.absTheta = exports.cossin = exports.sincos = void 0;

var _api = require("./api");

/**
 * Returns vector of `[sin(theta)*n, cos(theta)*n]`.
 *
 * @param theta
 * @param n
 */
const sincos = (theta, n = 1) => [Math.sin(theta) * n, Math.cos(theta) * n];
/**
 * Returns vector of `[cos(theta)*n, sin(theta)*n]`.
 *
 * @param theta
 * @param n
 */


exports.sincos = sincos;

const cossin = (theta, n = 1) => [Math.cos(theta) * n, Math.sin(theta) * n];
/**
 * Projects `theta` into [0 .. 2π] interval.
 *
 * @param theta
 */


exports.cossin = cossin;

const absTheta = theta => (theta %= _api.TAU, theta < 0 ? _api.TAU + theta : theta);

exports.absTheta = absTheta;

const absInnerAngle = theta => (theta = Math.abs(theta), theta > _api.PI ? _api.TAU - theta : theta);
/**
 * Returns smallest absolute angle difference between `a` and `b`.
 * Result will be in [0 .. π] interval.
 *
 * @param a
 * @param b
 */


exports.absInnerAngle = absInnerAngle;

const angleDist = (a, b) => absInnerAngle(absTheta(b % _api.TAU - a % _api.TAU));
/**
 * Like `Math.atan2`, but always returns angle in [0 .. TAU) interval.
 *
 * @param y
 * @param x
 */


exports.angleDist = angleDist;

const atan2Abs = (y, x) => absTheta(Math.atan2(y, x));
/**
 * Returns quadrant ID (0-3) of given angle (in radians).
 *
 * @param theta
 */


exports.atan2Abs = atan2Abs;

const quadrant = theta => absTheta(theta) * _api.INV_HALF_PI | 0;
/**
 * Converts angle to degrees.
 *
 * @param theta angle in radians
 */


exports.quadrant = quadrant;

const deg = theta => theta * _api.RAD2DEG;
/**
 * Converts angle to radians.
 *
 * @param theta angle in degrees
 */


exports.deg = deg;

const rad = theta => theta * _api.DEG2RAD;
/**
 * Cosecant. Approaches `±Infinity` for `theta` near multiples of π.
 *
 * @param theta angle in radians
 */


exports.rad = rad;

const csc = theta => 1 / Math.sin(theta);
/**
 * Secant. Approaches `±Infinity` for `theta` near π/2 ± nπ
 *
 * @param theta angle in radians
 */


exports.csc = csc;

const sec = theta => 1 / Math.cos(theta);
/**
 * Cotangent. Approaches `±Infinity` for `theta` near multiples of π.
 *
 * @param theta angle in radians
 */


exports.sec = sec;

const cot = theta => 1 / Math.tan(theta);
/**
 * Law of Cosines. Takes length of two sides of a triangle and the inner
 * angle (in radians) between them. Returns length of third side.
 *
 * @param a
 * @param b
 * @param gamma
 */


exports.cot = cot;

const loc = (a, b, gamma) => Math.sqrt(a * a + b * b - 2 * a * b * Math.cos(gamma));
/**
 * Approximates cos(xπ) for x in [-1,1]
 *
 * @param x
 */


exports.loc = loc;

const normCos = x => {
  const x2 = x * x;
  return 1.0 + x2 * (-4 + 2 * x2);
};

exports.normCos = normCos;

const __fastCos = x => {
  const x2 = x * x;
  return 0.99940307 + x2 * (-0.49558072 + 0.03679168 * x2);
};
/**
 * Fast cosine approximation using `normCos()` (polynomial). Max. error
 * ~0.00059693
 *
 * In [0 .. 2π] interval, approx. 18-20% faster than `Math.cos` on V8.
 *
 * @param theta in radians
 */


const fastCos = theta => {
  theta %= _api.TAU;
  theta < 0 && (theta = -theta);

  switch (theta * _api.INV_HALF_PI | 0) {
    case 0:
      return __fastCos(theta);

    case 1:
      return -__fastCos(_api.PI - theta);

    case 2:
      return -__fastCos(theta - _api.PI);

    default:
      return __fastCos(_api.TAU - theta);
  }
};
/**
 * @see fastCos
 *
 * @param theta in radians
 */


exports.fastCos = fastCos;

const fastSin = theta => fastCos(_api.HALF_PI - theta);

exports.fastSin = fastSin;
},{"./api":"node_modules/@thi.ng/math/api.js"}],"node_modules/@thi.ng/math/eqdelta.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.eqDeltaFixed = exports.eqDelta = void 0;

var _api = require("./api");

const abs = Math.abs;
const max = Math.max;
/**
 * Checks if `|a - b| <= ε` and adapts given epsilon value to the given
 * arguments:
 *
 * ε is factored with the largest absolute value of `a` or `b` (but
 * never lesser than the given `eps` value):
 *
 * `ε = ε * max(1, |a|, |b|)`
 *
 * @param a left value
 * @param b right value
 * @param eps epsilon / tolerance, default `1e-6`
 */

const eqDelta = (a, b, eps = _api.EPS) => abs(a - b) <= eps * max(1, abs(a), abs(b));
/**
 * Similar to `eqDelta()`, but used given `eps` as is.
 *
 * @param a left value
 * @param b right value
 * @param eps epsilon / tolerance, default `1e-6`
 */


exports.eqDelta = eqDelta;

const eqDeltaFixed = (a, b, eps = _api.EPS) => abs(a - b) <= eps;

exports.eqDeltaFixed = eqDeltaFixed;
},{"./api":"node_modules/@thi.ng/math/api.js"}],"node_modules/@thi.ng/math/interval.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.inOpenRange = exports.inRange = exports.foldback = exports.absMax = exports.absMin = exports.sclamp = exports.smax = exports.smin = exports.max4id = exports.max3id = exports.max2id = exports.min4id = exports.min3id = exports.min2id = exports.wrap11 = exports.wrap01 = exports.wrap = exports.clamp11 = exports.clamp01 = exports.clamp = void 0;

/**
 * Clamps value `x` to given closed interval.
 *
 * @param x value to clamp
 * @param min lower bound
 * @param max upper bound
 */
const clamp = (x, min, max) => x < min ? min : x > max ? max : x;

exports.clamp = clamp;

const clamp01 = x => x < 0 ? 0 : x > 1 ? 1 : x;

exports.clamp01 = clamp01;

const clamp11 = x => x < -1 ? -1 : x > 1 ? 1 : x;

exports.clamp11 = clamp11;

const wrap = (x, min, max) => x < min ? x - min + max : x >= max ? x - max + min : x;

exports.wrap = wrap;

const wrap01 = x => x < 0 ? x + 1 : x >= 1 ? x - 1 : x;

exports.wrap01 = wrap01;

const wrap11 = x => x < -1 ? x + 2 : x >= 1 ? x - 2 : x;

exports.wrap11 = wrap11;

const min2id = (a, b) => a <= b ? 0 : 1;

exports.min2id = min2id;

const min3id = (a, b, c) => a <= b ? a <= c ? 0 : 2 : b <= c ? 1 : 2;

exports.min3id = min3id;

const min4id = (a, b, c, d) => a <= b ? a <= c ? a <= d ? 0 : 3 : c <= d ? 2 : 3 : b <= c ? b <= d ? 1 : 3 : c <= d ? 2 : 3;

exports.min4id = min4id;

const max2id = (a, b) => a >= b ? 0 : 1;

exports.max2id = max2id;

const max3id = (a, b, c) => a >= b ? a >= c ? 0 : 2 : b >= c ? 1 : 2;

exports.max3id = max3id;

const max4id = (a, b, c, d) => a >= b ? a >= c ? a >= d ? 0 : 3 : c >= d ? 2 : 3 : b >= c ? b >= d ? 1 : 3 : c >= d ? 2 : 3;
/**
 * See `smax()`.
 *
 * @param a
 * @param b
 * @param k smooth exponent (MUST be > 0)
 */


exports.max4id = max4id;

const smin = (a, b, k) => smax(a, b, -k);
/**
 * Smooth maximum. Note: Result values will be slightly larger than max
 * value near max(a,b) + eps due to exponential decay. Higher `k` values
 * reduce the error, but also reduce the smoothing. Recommended k=16.
 *
 * https://en.wikipedia.org/wiki/Smooth_maximum
 *
 * @param a
 * @param b
 * @param k smooth exponent (MUST be > 0)
 */


exports.smin = smin;

const smax = (a, b, k) => {
  const ea = Math.exp(a * k);
  const eb = Math.exp(b * k);
  return (a * ea + b * eb) / (ea + eb);
};
/**
 * Same as `smin(smax(x, min, k), max, k)`.
 *
 * @param x
 * @param min
 * @param max
 * @param k
 */


exports.smax = smax;

const sclamp = (x, min, max, k) => smin(smax(x, min, k), max, k);

exports.sclamp = sclamp;

const absMin = (a, b) => Math.abs(a) < Math.abs(b) ? a : b;

exports.absMin = absMin;

const absMax = (a, b) => Math.abs(a) > Math.abs(b) ? a : b;
/**
 * http://www.musicdsp.org/showone.php?id=203
 *
 * @param e
 * @param x
 */


exports.absMax = absMax;

const foldback = (e, x) => x < -e || x > e ? Math.abs(Math.abs((x - e) % (4 * e)) - 2 * e) - e : x;
/**
 * Returns true iff `x` is in closed interval `[min .. max]`
 *
 * @param x
 * @param min
 * @param max
 */


exports.foldback = foldback;

const inRange = (x, min, max) => x >= min && x <= max;
/**
 * Returns true iff `x` is in open interval `(min .. max)`
 *
 * @param x
 * @param min
 * @param max
 */


exports.inRange = inRange;

const inOpenRange = (x, min, max) => x > min && x < max;

exports.inOpenRange = inOpenRange;
},{}],"node_modules/@thi.ng/math/fit.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fit11 = exports.fit10 = exports.fit01 = exports.fitClamped = exports.fit = exports.norm = void 0;

var _interval = require("./interval");

/**
 * Returns normalized value of `x` WRT to interval `a .. b`. If `a`
 * equals `b`, returns 0.
 *
 * @param x
 * @param a
 * @param b
 */
const norm = (x, a, b) => b !== a ? (x - a) / (b - a) : 0;

exports.norm = norm;

const fit = (x, a, b, c, d) => c + (d - c) * norm(x, a, b);

exports.fit = fit;

const fitClamped = (x, a, b, c, d) => c + (d - c) * (0, _interval.clamp01)(norm(x, a, b));

exports.fitClamped = fitClamped;

const fit01 = (x, a, b) => a + (b - a) * (0, _interval.clamp01)(x);

exports.fit01 = fit01;

const fit10 = (x, a, b) => b + (a - b) * (0, _interval.clamp01)(x);

exports.fit10 = fit10;

const fit11 = (x, a, b) => a + (b - a) * (0.5 + 0.5 * (0, _interval.clamp11)(x));

exports.fit11 = fit11;
},{"./interval":"node_modules/@thi.ng/math/interval.js"}],"node_modules/@thi.ng/math/min-error.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.minError = void 0;

var _api = require("./api");

/**
 * Recursively evaluates function `fn` for `res` uniformly spaced values
 * `t` in the closed parametric interval `[start,end]` and computes
 * corresponding sample values `p`. For each `p` then calls `error`
 * function to compute the error to query target value `q` and
 * eventually returns the `t` producing the overall minimum error. At
 * each level of recursion the search interval is increasingly narrowed
 * / centered around the best `t` of the current iteration.
 *
 * The search is terminated early if the best error value is less than
 * `eps`.
 *
 * The interval end points `start` and `end` MUST be normalized values
 * in the closed [0,1] interval.
 *
 * @param fn function to evaluate
 * @param error error function
 * @param q target value
 * @param res number of samples per interval
 * @param iter max number of iterations / recursion limit
 * @param start interval start
 * @param end interval end
 */
const minError = (fn, error, q, res = 16, iter = 8, start = 0, end = 1, eps = _api.EPS) => {
  if (iter <= 0) return (start + end) / 2;
  const delta = (end - start) / res;
  let minT = start;
  let minE = Infinity;

  for (let i = 0; i <= res; i++) {
    const t = start + i * delta;
    const e = error(q, fn(t));

    if (e < minE) {
      if (e <= eps) return t;
      minE = e;
      minT = t;
    }
  }

  return minError(fn, error, q, res, iter - 1, Math.max(minT - delta, 0), Math.min(minT + delta, 1));
};

exports.minError = minError;
},{"./api":"node_modules/@thi.ng/math/api.js"}],"node_modules/@thi.ng/math/mix.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sinc = exports.cubicPulse = exports.parabola = exports.gain = exports.impulse = exports.ease = exports.bounce = exports.decimated = exports.cosine = exports.circular = exports.tween = exports.mixCubic = exports.mixQuadratic = exports.mixBilinear = exports.mix = void 0;

var _api = require("./api");

const mix = (a, b, t) => a + (b - a) * t;
/**
 * ```
 * c    d
 * +----+
 * |    |
 * +----+
 * a    b
 * ```
 *
 * @param a BL value
 * @param b BR value
 * @param c TL value
 * @param d TR value
 * @param u 1st interpolation factor
 * @param v 2nd interpolation factor
 */


exports.mix = mix;

const mixBilinear = (a, b, c, d, u, v) => mix(mix(a, b, u), mix(c, d, u), v);

exports.mixBilinear = mixBilinear;

const mixQuadratic = (a, b, c, t) => {
  const s = 1 - t;
  return a * s * s + b * 2 * s * t + c * t * t;
};

exports.mixQuadratic = mixQuadratic;

const mixCubic = (a, b, c, d, t) => {
  const t2 = t * t;
  const s = 1 - t;
  const s2 = s * s;
  return a * s2 * s + b * 3 * s2 * t + c * 3 * t2 * s + d * t2 * t;
};

exports.mixCubic = mixCubic;

const tween = (f, from, to) => t => mix(from, to, f(t));
/**
 * Circular interpolation: `sqrt(1 - (1 - t)^2)`
 *
 * @param t interpolation factor (0.0 .. 1.0)
 */


exports.tween = tween;

const circular = t => {
  t = 1 - t;
  return Math.sqrt(1 - t * t);
};

exports.circular = circular;

const cosine = t => 1 - (Math.cos(t * _api.PI) * 0.5 + 0.5);

exports.cosine = cosine;

const decimated = (n, t) => Math.floor(t * n) / n;

exports.decimated = decimated;

const bounce = (k, amp, t) => {
  const tk = t * k;
  return 1 - amp * Math.sin(tk) / tk * Math.cos(t * _api.HALF_PI);
};
/**
 * HOF exponential easing.
 *
 * - `ease = 1` -> linear
 * - `ease > 1` -> ease in
 * - `ease < 1` -> ease out
 *
 * @param ease easing behavior [0.0 .. ∞]
 * @param t
 */


exports.bounce = bounce;

const ease = (ease, t) => Math.pow(t, ease);
/**
 * HOF impulse generator. Peaks at `t=1/k`
 *
 * @param k impulse width (higher values => shorter impulse)
 */


exports.ease = ease;

const impulse = (k, t) => {
  const h = k * t;
  return h * Math.exp(1 - h);
};

exports.impulse = impulse;

const gain = (k, t) => t < 0.5 ? 0.5 * Math.pow(2 * t, k) : 1 - 0.5 * Math.pow(2 - 2 * t, k);

exports.gain = gain;

const parabola = (k, t) => Math.pow(4.0 * t * (1.0 - t), k);

exports.parabola = parabola;

const cubicPulse = (w, c, t) => {
  t = Math.abs(t - c);
  return t > w ? 0 : (t /= w, 1 - t * t * (3 - 2 * t));
};

exports.cubicPulse = cubicPulse;

const sinc = (k, t) => {
  t = _api.PI * (k * t - 1.0);
  return Math.sin(t) / t;
};

exports.sinc = sinc;
},{"./api":"node_modules/@thi.ng/math/api.js"}],"node_modules/@thi.ng/math/prec.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.roundEps = exports.roundTo = exports.trunc = exports.fract = exports.fmod = void 0;

var _api = require("./api");

/**
 * Returns `a - b * floor(a/b)`
 *
 * @param a
 * @param b
 */
const fmod = (a, b) => a - b * Math.floor(a / b);

exports.fmod = fmod;

const fract = x => x - Math.floor(x);

exports.fract = fract;

const trunc = x => x < 0 ? Math.ceil(x) : Math.floor(x);

exports.trunc = trunc;

const roundTo = (x, prec = 1) => Math.round(x / prec) * prec;
/**
 * Only rounds `x` to nearest int if `fract(x)` < `eps` or > `1-eps`.
 *
 * @param x
 * @param eps
 */


exports.roundTo = roundTo;

const roundEps = (x, eps = _api.EPS) => {
  const f = fract(x);
  return f <= eps || f >= 1 - eps ? Math.round(x) : x;
};

exports.roundEps = roundEps;
},{"./api":"node_modules/@thi.ng/math/api.js"}],"node_modules/@thi.ng/math/ratio.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.simplifyRatio = void 0;

const simplifyRatio = (num, denom) => {
  let e1 = Math.abs(num);
  let e2 = Math.abs(denom);

  while (true) {
    if (e1 < e2) {
      const t = e1;
      e1 = e2;
      e2 = t;
    }

    const r = e1 % e2;

    if (r) {
      e1 = r;
    } else {
      return [num / e2, denom / e2];
    }
  }
};

exports.simplifyRatio = simplifyRatio;
},{}],"node_modules/@thi.ng/math/solve.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.solveCubic = exports.solveQuadratic = exports.solveLinear = exports.derivative = void 0;

var _api = require("./api");

/**
 * Produces a new function which computes derivative of the given
 * single-arg function. The extra optional arg `eps` is used to
 * define the step width for computing derived values:
 *
 * `f'(x) = (f(x + eps) - f(x)) / eps`
 *
 * The original function is assumed to be fully differentiable
 * in the interval the returned function is going to be used.
 * No validity checks of any form are done.
 *
 * https://en.wikipedia.org/wiki/Derivative#Continuity_and_differentiability
 *
 * @param fn
 * @param eps
 */
const derivative = (f, eps = _api.EPS) => x => (f(x + eps) - f(x)) / eps;
/**
 * Computes solution for linear equation: `ax + b = 0`.
 *
 * Note: `a` MUST NOT be zero.
 *
 * @param a slope
 * @param b constant offset
 */


exports.derivative = derivative;

const solveLinear = (a, b) => -b / a;
/**
 * Computes solutions for quadratic equation: `ax^2 + bx + c = 0`.
 * Returns array of real solutions.
 * Note: `a` MUST NOT be zero. If the quadratic term is missing,
 * use `solveLinear` instead.
 *
 * https://en.wikipedia.org/wiki/Quadratic_function
 * https://en.wikipedia.org/wiki/Quadratic_equation
 *
 * @param a quadratic coefficient
 * @param b linear coefficient
 * @param c constant offset
 * @param eps tolerance to determine multiple roots
 */


exports.solveLinear = solveLinear;

const solveQuadratic = (a, b, c, eps = 1e-9) => {
  const d = 2 * a;
  let r = b * b - 4 * a * c;
  return r < 0 ? [] : r < eps ? [-b / d] : (r = Math.sqrt(r), [(-b - r) / d, (-b + r) / d]);
};
/**
 * Computes solutions for quadratic equation: `ax^3 + bx^2 + c*x + d = 0`.
 * Returns array of solutions, both real & imaginary.
 * Note: `a` MUST NOT be zero. If the cubic term is missing (i.e. zero),
 * use `solveQuadratic` or `solveLinear` instead.
 *
 * https://en.wikipedia.org/wiki/Cubic_function
 *
 * @param a cubic coefficient
 * @param b quadratic coefficient
 * @param c linear coefficient
 * @param d constant offset
 * @param eps tolerance to determine multiple roots
 */


exports.solveQuadratic = solveQuadratic;

const solveCubic = (a, b, c, d, eps = 1e-9) => {
  const aa = a * a;
  const bb = b * b;
  const ba3 = b / (3 * a);
  const p = (3 * a * c - bb) / (3 * aa);
  const q = (2 * bb * b - 9 * a * b * c + 27 * aa * d) / (27 * aa * a);

  if (Math.abs(p) < eps) {
    return [Math.cbrt(-q) - ba3];
  } else if (Math.abs(q) < eps) {
    return p < 0 ? [-Math.sqrt(-p) - ba3, -ba3, Math.sqrt(-p) - ba3] : [-ba3];
  } else {
    const denom = q * q / 4 + p * p * p / 27;

    if (Math.abs(denom) < eps) {
      return [-1.5 * q / p - ba3, 3 * q / p - ba3];
    } else if (denom > 0) {
      const u = Math.cbrt(-q / 2 - Math.sqrt(denom));
      return [u - p / (3 * u) - ba3];
    } else {
      const u = 2 * Math.sqrt(-p / 3),
            t = Math.acos(3 * q / p / u) / 3,
            k = 2 * Math.PI / 3;
      return [u * Math.cos(t) - ba3, u * Math.cos(t - k) - ba3, u * Math.cos(t - 2 * k) - ba3];
    }
  }
};

exports.solveCubic = solveCubic;
},{"./api":"node_modules/@thi.ng/math/api.js"}],"node_modules/@thi.ng/math/step.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expStep = exports.smootherStep = exports.smoothStep = exports.step = void 0;

var _interval = require("./interval");

/**
 * Step/threshold function.
 *
 * @param edge threshold
 * @param x test value
 * @returns 0, if `x < e`, else 1
 */
const step = (edge, x) => x < edge ? 0 : 1;
/**
 * GLSL-style smoothStep threshold function.
 *
 * @param edge lower threshold
 * @param edge2 upper threshold
 * @param x test value
 * @returns 0, if `x < edge1`, 1 if `x > edge2`, else sigmoid interpolation
 */


exports.step = step;

const smoothStep = (edge, edge2, x) => {
  x = (0, _interval.clamp01)((x - edge) / (edge2 - edge));
  return (3 - 2 * x) * x * x;
};
/**
 * Similar to `smoothStep()` but using different polynomial.
 *
 * @param edge
 * @param edge2
 * @param x
 */


exports.smoothStep = smoothStep;

const smootherStep = (edge, edge2, x) => {
  x = (0, _interval.clamp01)((x - edge) / (edge2 - edge));
  return x * x * x * (x * (x * 6 - 15) + 10);
};
/**
 * Exponential ramp with variable shape, e.g.
 *
 * - S-curve: k=8, n=4
 * - Step near 1.0: k=8, n=20
 * - Pulse: k=0.005, n=-10
 * - Ease-in: k=0.5, n=0.25
 *
 * @param k
 * @param n
 * @param x
 */


exports.smootherStep = smootherStep;

const expStep = (k, n, x) => 1 - Math.exp(-k * Math.pow(x, n));

exports.expStep = expStep;
},{"./interval":"node_modules/@thi.ng/math/interval.js"}],"node_modules/@thi.ng/math/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _api = require("./api");

Object.keys(_api).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _api[key];
    }
  });
});

var _abs = require("./abs");

Object.keys(_abs).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _abs[key];
    }
  });
});

var _angle = require("./angle");

Object.keys(_angle).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _angle[key];
    }
  });
});

var _eqdelta = require("./eqdelta");

Object.keys(_eqdelta).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _eqdelta[key];
    }
  });
});

var _fit = require("./fit");

Object.keys(_fit).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _fit[key];
    }
  });
});

var _interval = require("./interval");

Object.keys(_interval).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _interval[key];
    }
  });
});

var _minError = require("./min-error");

Object.keys(_minError).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _minError[key];
    }
  });
});

var _mix = require("./mix");

Object.keys(_mix).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _mix[key];
    }
  });
});

var _prec = require("./prec");

Object.keys(_prec).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _prec[key];
    }
  });
});

var _ratio = require("./ratio");

Object.keys(_ratio).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _ratio[key];
    }
  });
});

var _solve = require("./solve");

Object.keys(_solve).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _solve[key];
    }
  });
});

var _step = require("./step");

Object.keys(_step).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _step[key];
    }
  });
});
},{"./api":"node_modules/@thi.ng/math/api.js","./abs":"node_modules/@thi.ng/math/abs.js","./angle":"node_modules/@thi.ng/math/angle.js","./eqdelta":"node_modules/@thi.ng/math/eqdelta.js","./fit":"node_modules/@thi.ng/math/fit.js","./interval":"node_modules/@thi.ng/math/interval.js","./min-error":"node_modules/@thi.ng/math/min-error.js","./mix":"node_modules/@thi.ng/math/mix.js","./prec":"node_modules/@thi.ng/math/prec.js","./ratio":"node_modules/@thi.ng/math/ratio.js","./solve":"node_modules/@thi.ng/math/solve.js","./step":"node_modules/@thi.ng/math/step.js"}],"node_modules/@thi.ng/hdom-components/sparkline.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sparkline = void 0;

var _math = require("@thi.ng/math");

var _transducers = require("@thi.ng/transducers");

/**
 * Customizable, stateless SVG sparkline component.
 *
 * @param _ hdom context object (ignored)
 * @param opts config options
 * @param vals data values
 */
const sparkline = (_, opts, vals) => {
  opts = Object.assign({
    min: 0,
    max: 100,
    width: 50,
    height: 16,
    col: "red",
    r: 1.5
  }, opts);
  const n = vals.length;
  const s = opts.width / n;
  const r = opts.r;
  const h = opts.height - r;
  return ["svg", {
    width: opts.width + 2 * r,
    height: opts.height,
    stroke: opts.col,
    fill: "none"
  }, ["polyline", {
    points: (0, _transducers.str)(",", (0, _transducers.mapIndexed)((i, y) => [i * s | 0, (0, _math.fitClamped)(y, opts.min, opts.max, h, r) | 0], 0, vals))
  }], ["circle", {
    cx: (n - 1) * s | 0,
    cy: (0, _math.fitClamped)(vals[n - 1], opts.min, opts.max, h, r) | 0,
    r,
    fill: opts.col
  }]];
};

exports.sparkline = sparkline;
},{"@thi.ng/math":"node_modules/@thi.ng/math/index.js","@thi.ng/transducers":"node_modules/@thi.ng/transducers/index.js"}],"node_modules/@thi.ng/hdom-components/fps-counter.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fpsCounter = void 0;

var _transducers = require("@thi.ng/transducers");

var _transducersStats = require("@thi.ng/transducers-stats");

var _sparkline = require("./sparkline");

/**
 * Customizable FPS counter with sparkline visualization of N previous
 * frames.
 *
 * @param opts
 */
const fpsCounter = opts => {
  opts = Object.assign({
    history: 25,
    smooth: 5,
    labelPeriod: 250,
    sparkline: {}
  }, opts);
  return {
    init() {
      this.last = Date.now();
      this.lastLabel = this.last;
      this.buffer = [];
      this.ma = (0, _transducers.step)((0, _transducersStats.sma)(opts.smooth));
    },

    render() {
      const t = Date.now();
      const fps = 1000 / (t - this.last);
      this.last = t;
      if (!this.buffer) return ["div"];
      const smoothFps = this.ma(fps);
      if (!smoothFps) return ["div"];
      this.buffer.push(smoothFps);
      this.buffer.length > opts.history && this.buffer.shift();
      const updateLabel = t - this.lastLabel > opts.labelPeriod;
      updateLabel && (this.lastLabel = t);
      return ["div", [_sparkline.sparkline, Object.assign({
        min: 0,
        max: 65
      }, opts.sparkline), this.buffer], ["span", {
        __skip: !updateLabel
      }, smoothFps ? smoothFps.toFixed(2) + " fps" : ""]];
    }

  };
};

exports.fpsCounter = fpsCounter;
},{"@thi.ng/transducers":"node_modules/@thi.ng/transducers/index.js","@thi.ng/transducers-stats":"node_modules/@thi.ng/transducers-stats/index.js","./sparkline":"node_modules/@thi.ng/hdom-components/sparkline.js"}],"node_modules/@thi.ng/hdom-components/link.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.appLink = exports.link = void 0;

var _checks = require("@thi.ng/checks");

const link = (attribs, body) => ["a", (0, _checks.isString)(attribs) ? {
  href: attribs
} : attribs, body];

exports.link = link;

const appLink = (_, attribs, onclick, body) => ["a", Object.assign({
  href: "#",
  onclick: e => {
    e.preventDefault();
    onclick(e);
  }
}, attribs), body];

exports.appLink = appLink;
},{"@thi.ng/checks":"node_modules/@thi.ng/checks/index.js"}],"node_modules/@thi.ng/hdom-components/notification.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.notification = void 0;

var _link = require("./link");

/**
 * Higher order function to create a new stateless notification
 * component, pre-configured via user supplied options. The returned
 * component function accepts the following arguments:
 *
 * - hdom context object (unused)
 * - partial `NotificationArgs` object (extra attribs, onclose handler)
 * - body content
 *
 * Any `attribs` provided as arg via `NotificationArgs` are merged with
 * the default options provided to the HOF. If the notification body
 * consists of multiple elements then they will need to be wrapped in a
 * container element.
 *
 * @param opts
 */
const notification = opts => {
  return (_, args, body) => ["div", Object.assign({}, opts.attribs, args.attribs), opts.icon, body, opts.close && args.onclose ? [_link.appLink, opts.attribsClose, args.onclose, opts.close] : undefined];
};

exports.notification = notification;
},{"./link":"node_modules/@thi.ng/hdom-components/link.js"}],"node_modules/@thi.ng/hdom-components/pager.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pager = void 0;

var _transducers = require("@thi.ng/transducers");

/**
 * Higher order container component for paged navigation buttons. The
 * returned component function takes these arguments:
 *
 * - `ctx` - hdom context object
 * - `id` - current page ID (zero-based)
 * - `numItems` - current number of items
 * - `pageLen` - number of items per page (only used for calculation)
 * - `maxButtons` - number of page buttons to show (default: 5). If
 *   zero, only the prev / next and first / last buttons will be shown.
 *
 * If there are more pages than the specified number, only the
 * neighboring page IDs (relative to the current page) are shown. E.g.
 * If there are 10 pages, the current page ID is 5 and 3 visible page
 * buttons then the pager will look like this (the `|` character here
 * indicates button group boundaries):
 *
 * ```
 * << < | 4 5 6 | > >>
 * ```
 *
 * Providing `pageLen` and `maxButtons` as arguments allows to
 * dynamically control the number of page buttons at runtime, e.g. in
 * response to window resizing.
 *
 * Yields a component of page buttons and prev / next and first / last
 * navigation buttons. The actual button and button group components are
 * defined via the user supplied options. The first / prev and next /
 * last nav buttons are paired within inner `div` elements (one per
 * pair) and can be styled (or hidden) separately.
 *
 * ```
 * // initialization
 * const mypager = pager({
 *   button: (i, curr, max, label, disabled) =>
 *     ["a", {href: `/page/${i}`, disabled}, label]
 * });
 *
 * // usage
 * [mypager, currPage, currNumItems, 10, 5]
 * ```
 *
 * @param opts
 */
const pager = opts => {
  opts = Object.assign({
    root: (_, ...body) => ["div.pager", ...body],
    groupPrev: (_, ...bts) => ["div.pager-prev", ...bts],
    groupNext: (_, ...bts) => ["div.pager-next", ...bts],
    groupPages: (_, ...bts) => ["div.pager-pages", ...bts],
    navStep: 1,
    labelFirst: "<<",
    labelPrev: "<",
    labelNext: ">",
    labelLast: ">>"
  }, opts);
  return (_, id, num, pageLen = 10, maxBts = 5) => {
    const bt = opts.button;
    const step = opts.navStep;
    const maxID = Math.floor(Math.max(0, num - 1) / pageLen);
    id = Math.max(Math.min(id, maxID), 0);
    return [opts.root, [opts.groupPrev, bt(0, id, maxID, opts.labelFirst, !id), bt(Math.max(id - step, 0), id, maxID, opts.labelPrev, !id)], [opts.groupPages, (0, _transducers.map)(i => bt(i, id, maxID, i + 1, i === id), pageRange(id, maxID, maxBts))], [opts.groupNext, bt(Math.min(id + step, maxID), id, maxID, opts.labelNext, id >= maxID), bt(maxID, id, maxID, opts.labelLast, id >= maxID)]];
  };
};

exports.pager = pager;

const pageRange = (id, maxID, maxBt) => {
  if (maxID > maxBt - 1) {
    const from = Math.max(Math.min(id - (maxBt >> 1), maxID - maxBt + 1), 0);
    return (0, _transducers.range)(from, from + maxBt);
  }

  return (0, _transducers.range)(0, maxID + 1);
};
},{"@thi.ng/transducers":"node_modules/@thi.ng/transducers/index.js"}],"node_modules/@thi.ng/hdom-components/title.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.title = void 0;

/**
 * Configurable Higher order title with optional subtitle component. The
 * returned component function takes two args: title, subtitle.
 *
 * ```
 * const h1 = title();
 * const h2 = title({ element: "h2", attribs: { class: "blue" }});
 *
 * [h1, "Hello world", "Once upon a time..."]
 *
 * [h2, "Chapter 1", "Once upon a time..."]
 * ```
 *
 * @param opts
 */
const title = opts => {
  opts = Object.assign({
    element: "h1",
    attribs: {},
    subElement: "small",
    subAttribs: {}
  }, opts);
  return (_, title, subtitle) => [opts.element, opts.attribs, title, subtitle ? [opts.subElement, opts.subAttribs, subtitle] : undefined];
};

exports.title = title;
},{}],"node_modules/@thi.ng/hdom-components/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _button = require("./button");

Object.keys(_button).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _button[key];
    }
  });
});

var _buttonGroup = require("./button-group");

Object.keys(_buttonGroup).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _buttonGroup[key];
    }
  });
});

var _canvas = require("./canvas");

Object.keys(_canvas).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _canvas[key];
    }
  });
});

var _dropdown = require("./dropdown");

Object.keys(_dropdown).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _dropdown[key];
    }
  });
});

var _fpsCounter = require("./fps-counter");

Object.keys(_fpsCounter).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _fpsCounter[key];
    }
  });
});

var _link = require("./link");

Object.keys(_link).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _link[key];
    }
  });
});

var _notification = require("./notification");

Object.keys(_notification).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _notification[key];
    }
  });
});

var _pager = require("./pager");

Object.keys(_pager).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _pager[key];
    }
  });
});

var _sparkline = require("./sparkline");

Object.keys(_sparkline).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _sparkline[key];
    }
  });
});

var _title = require("./title");

Object.keys(_title).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _title[key];
    }
  });
});

var _mergeAttribs = require("./utils/merge-attribs");

Object.keys(_mergeAttribs).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _mergeAttribs[key];
    }
  });
});
},{"./button":"node_modules/@thi.ng/hdom-components/button.js","./button-group":"node_modules/@thi.ng/hdom-components/button-group.js","./canvas":"node_modules/@thi.ng/hdom-components/canvas.js","./dropdown":"node_modules/@thi.ng/hdom-components/dropdown.js","./fps-counter":"node_modules/@thi.ng/hdom-components/fps-counter.js","./link":"node_modules/@thi.ng/hdom-components/link.js","./notification":"node_modules/@thi.ng/hdom-components/notification.js","./pager":"node_modules/@thi.ng/hdom-components/pager.js","./sparkline":"node_modules/@thi.ng/hdom-components/sparkline.js","./title":"node_modules/@thi.ng/hdom-components/title.js","./utils/merge-attribs":"node_modules/@thi.ng/hdom-components/utils/merge-attribs.js"}],"src/components/route-link.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.routeLink = void 0;

var _hdomComponents = require("@thi.ng/hdom-components");

var ev = _interopRequireWildcard(require("../events"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const routeLink = ({
  bus
}, attribs, route, body) => [_hdomComponents.appLink, attribs, () => bus.dispatch([ev.ROUTE_TO, route]), body];

exports.routeLink = routeLink;
},{"@thi.ng/hdom-components":"node_modules/@thi.ng/hdom-components/index.js","../events":"src/events.ts"}],"src/components/nav.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nav = exports.navSwitch = void 0;

var _hdomComponents = require("@thi.ng/hdom-components");

var _interceptors = require("@thi.ng/interceptors");

var _transducers = require("@thi.ng/transducers");

var _routeLink = require("./route-link");

const navSwitch = ({
  ui,
  bus
}) => [_hdomComponents.appLink, ui.nav.switch, () => bus.dispatch([_interceptors.EV_TOGGLE_VALUE, 'nav.visible']), ['span', ui.icons.menu]];

exports.navSwitch = navSwitch;

const navItemGroup = ({
  ui,
  views
}, item) => {
  return ['li', ui.nav.item, ['div', {}, [_routeLink.routeLink, item.active ? ui.nav.linkActive : ui.nav.link, item.route, views.en.deref() ? item.name : item.nameCN], item.active ? ['ul', ui.nav.subContent, ...(0, _transducers.map)(item => [navItem, item], item.children)] : null]];
};

const navItem = ({
  ui,
  views
}, item) => ['li', ui.nav.item, [_routeLink.routeLink, item.active ? ui.nav.linkActive : ui.nav.link, item.route, (views.en.deref() ? item.name : item.nameCN).toUpperCase()]];

const navContent = ({
  ui,
  views,
  bus
}) => ['ul', ui.nav.content, ...(0, _transducers.mapIndexed)((i, item) => [item.hasOwnProperty('children') ? navItemGroup : navItem, item, i], views.nav.deref().items), ['li', ui.nav.item, [_hdomComponents.appLink, ui.nav.link, () => {
  document.title = views.en.deref() ? '另奕可能设计_新商业 X 感官空间设计品牌 | 新零售空间设计 | 专卖店设计 | 网红餐饮店面设计 | airbnb民宿设计 | 品牌升级' : 'ALTERNABILITY DESIGN';
  bus.dispatch([_interceptors.EV_TOGGLE_VALUE, 'en']);
}, views.en.deref() ? '中文' : 'EN']]];

const nav = ({
  ui,
  views
}) => {
  const show = views.isLarge.deref() || views.nav.deref().visible;
  return show ? ['div', ui.nav.container, navContent] : null;
};

exports.nav = nav;
},{"@thi.ng/hdom-components":"node_modules/@thi.ng/hdom-components/index.js","@thi.ng/interceptors":"node_modules/@thi.ng/interceptors/index.js","@thi.ng/transducers":"node_modules/@thi.ng/transducers/index.js","./route-link":"src/components/route-link.ts"}],"src/components/copyright.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.copyright = void 0;

const copyright = ({
  ui
}) => ['div', ui.copyright, ['div', 'Copyright © 2019 ALTERNABILITY DESIGN，All rights reserved. 粤ICP备19055289号'], ['div', '本网站所涉及设计方案、展示图片、文字等著作权及署名权，归另奕可能所有，未经许可禁止使用，侵权必究。']];

exports.copyright = copyright;
},{}],"assets/images/logo.png":[function(require,module,exports) {
module.exports = "/logo.3f4a1874.png";
},{}],"src/components/root.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.root = root;

var routes = _interopRequireWildcard(require("../routes"));

var _routeLink = require("./route-link");

var _nav = require("./nav");

var _copyright = require("./copyright");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const logoPic = require('../../assets/images/logo.png');

const logo = ({
  ui
}) => [_routeLink.routeLink, ui.logo, [routes.HOME.id, null], ['span', 'ALTERNABILITY DESIGN']];

const logoCN = ({
  ui
}) => [_routeLink.routeLink, ui.logo, [routes.HOME.id, null], ['div', ['img', Object.assign({}, ui.logoPic, {
  src: logoPic
})]]];

const header = ({
  ui,
  views
}) => ['div', ui.header, views.en.deref() ? logo : logoCN, _nav.navSwitch];

function root({
  ui,
  views
}) {
  return ['div', ui.root, views.routeComponent, _nav.nav, header, _copyright.copyright];
}
},{"../routes":"src/routes.ts","./route-link":"src/components/route-link.ts","./nav":"src/components/nav.ts","./copyright":"src/components/copyright.ts","../../assets/images/logo.png":"assets/images/logo.png"}],"src/app.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.App = void 0;

var _rstream = require("@thi.ng/rstream");

var _atom = require("@thi.ng/atom");

var _checks = require("@thi.ng/checks");

var _hdom = require("@thi.ng/hdom");

var _interceptors = require("@thi.ng/interceptors");

var _router = require("@thi.ng/router");

var fx = _interopRequireWildcard(require("./effects"));

var ev = _interopRequireWildcard(require("./events"));

var _root = require("./components/root");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

class App {
  constructor(config) {
    this.config = config;
    this.state = new _atom.Atom(config.initialState || {});
    this.ctx = {
      bus: new _interceptors.EventBus(this.state, config.events, config.effects),
      views: {},
      ui: config.ui
    };
    this.addViews(this.config.views);
    this.router = new _router.HTMLRouter(config.router);
    this.router.addListener(_router.EVENT_ROUTE_CHANGED, e => this.ctx.bus.dispatch([_router.EVENT_ROUTE_CHANGED, e.value]));
    this.ctx.bus.addEffect(fx.ROUTE_TO, ([id, params]) => this.router.routeTo(this.router.format(id, params)));
    this.addViews({
      route: "route",
      routeComponent: ["route.id", id => (this.config.components[id] || (() => ["div", `missing component for route: ${id}`]))(this.ctx)]
    });
  }

  addViews(specs) {
    const views = this.ctx.views;

    for (let id in specs) {
      const spec = specs[id];

      if ((0, _checks.isArray)(spec)) {
        views[id] = this.state.addView(spec[0], spec[1]);
      } else {
        views[id] = this.state.addView(spec);
      }
    }
  }

  start() {
    this.router.start();
    const {
      bus
    } = this.ctx;
    (0, _rstream.fromEvent)(window, 'resize').subscribe({
      next() {
        bus.dispatch([ev.RESIZE, window.matchMedia('(min-width: 60em)').matches]);
      }

    });
    bus.dispatch([ev.RESIZE, window.matchMedia('(min-width: 60em)').matches]);
    bus.dispatch([ev.LOAD_PROJECTS]);
    const root = this.rootComponent();
    let first = true;
    (0, _hdom.start)(_ => {
      if (this.ctx.bus.processQueue() || first) {
        first = false;
        return root;
      }
    }, {
      root: this.config.domRoot,
      ctx: this.ctx
    });
  }

  rootComponent() {
    const {
      ui
    } = this.ctx;
    return ['div', ui.app, _root.root];
  }

}

exports.App = App;
},{"@thi.ng/rstream":"node_modules/@thi.ng/rstream/index.js","@thi.ng/atom":"node_modules/@thi.ng/atom/index.js","@thi.ng/checks":"node_modules/@thi.ng/checks/index.js","@thi.ng/hdom":"node_modules/@thi.ng/hdom/index.js","@thi.ng/interceptors":"node_modules/@thi.ng/interceptors/index.js","@thi.ng/router":"node_modules/@thi.ng/router/index.js","./effects":"src/effects.ts","./events":"src/events.ts","./components/root":"src/components/root.ts"}],"node_modules/process/browser.js":[function(require,module,exports) {

// shim for using process in browser
var process = module.exports = {}; // cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}

function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}

(function () {
  try {
    if (typeof setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
    } else {
      cachedSetTimeout = defaultSetTimout;
    }
  } catch (e) {
    cachedSetTimeout = defaultSetTimout;
  }

  try {
    if (typeof clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
    } else {
      cachedClearTimeout = defaultClearTimeout;
    }
  } catch (e) {
    cachedClearTimeout = defaultClearTimeout;
  }
})();

function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  } // if setTimeout wasn't available but was latter defined


  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}

function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  } // if clearTimeout wasn't available but was latter defined


  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}

var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }

  draining = false;

  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }

  if (queue.length) {
    drainQueue();
  }
}

function drainQueue() {
  if (draining) {
    return;
  }

  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;

  while (len) {
    currentQueue = queue;
    queue = [];

    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }

    queueIndex = -1;
    len = queue.length;
  }

  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}

process.nextTick = function (fun) {
  var args = new Array(arguments.length - 1);

  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }

  queue.push(new Item(fun, args));

  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
}; // v8 likes predictible objects


function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}

Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};

process.title = 'browser';
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues

process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
  return [];
};

process.binding = function (name) {
  throw new Error('process.binding is not supported');
};

process.cwd = function () {
  return '/';
};

process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};

process.umask = function () {
  return 0;
};
},{}],"src/utils.ts":[function(require,module,exports) {
var process = require("process");
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jsonReader = exports.resourceFetcher = exports.readJson = exports.resource = void 0;

var _interceptors = require("@thi.ng/interceptors");

const resource = path => `https://iwongharvey.github.io/alternability${path}`;

exports.resource = resource;

const readJson = (res, cb) => {
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let data = '';

  const process = ({
    done,
    value
  }) => {
    if (done) {
      cb(JSON.parse(data.replace(/(?:\r\n|\r|\n)/g, '')));
    } else {
      data += decoder.decode(value);
      return reader.read().then(process);
    }
  };

  reader.read().then(process);
};

exports.readJson = readJson;

const resourceFetcher = (path, success, error) => () => ({
  [_interceptors.FX_DISPATCH_ASYNC]: [_interceptors.FX_FETCH, resource(path), success, error]
});

exports.resourceFetcher = resourceFetcher;

const jsonReader = cb => (state, [_, res], bus) => {
  readJson(res, db => bus.dispatch(cb(db)));
  return state;
};

exports.jsonReader = jsonReader;
},{"@thi.ng/interceptors":"node_modules/@thi.ng/interceptors/index.js","process":"node_modules/process/browser.js"}],"src/components/home.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.home = home;

var ev = _interopRequireWildcard(require("../events"));

var routes = _interopRequireWildcard(require("../routes"));

var _routeLink = require("./route-link");

var _utils = require("../utils");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const delayImg = {
  init() {},

  render({
    ui,
    bus,
    views
  }, project) {
    return ['img', Object.assign({}, ui.homeGalleryImg, {
      key: project.id,
      src: (0, _utils.resource)(project.images[0]),
      onload: e => {
        e.target.classList.remove('o-0');

        if (views.isLarge.deref()) {
          e.target.classList.add('fade-in-out');
          this.timeout = setTimeout(() => {
            bus.dispatch([ev.NEXT_FEATURED_PROJECT]);
          }, 5000);
        }
      }
    })];
  },

  release({
    views
  }) {
    if (views.isLarge.deref()) {
      clearTimeout(this.timeout);
    }
  }

};

const featuredProjects = ({
  ui,
  views
}) => {
  const cur = views.currentFeatured.deref();
  const pid = views.featured.deref()[cur];
  const projects = views.projects.deref();
  const route = [routes.WORK_GALLERY.id, {
    id: pid,
    index: 0
  }];
  return ['div', ui.gallery, [_routeLink.routeLink, {}, route, [delayImg, projects[pid]]]];
};

function home({
  ui,
  views,
  bus
}) {
  if (!views.isLarge.deref()) {
    bus.dispatch([ev.ROUTE_TO, [routes.WORKS_LIST.id, {
      type: 'all'
    }]]);
  } else {
    return () => ['div', ui.home, views.featured.deref().length > 0 ? [featuredProjects] : null];
  }
}
},{"../events":"src/events.ts","../routes":"src/routes.ts","./route-link":"src/components/route-link.ts","../utils":"src/utils.ts"}],"src/components/contact.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.contact = contact;

function contact({
  ui
}) {
  return () => ['div', ui.contact, ['div', ui.contentOne, ['div', ui.title, 'Contact Us'], ['div', ui.specform, 'Tel:', '(+86) 135 3399 1206', 'Email:', ['a', {
    href: 'mailto:info@i-ana.com'
  }, 'info@i-ana.com'], 'Addr:', `3A01, Block 1-2, Sihai City, No. 390, East Hanxi Avenue, Panyu District Guangzhou`]]];
}
},{}],"assets/images/wechat.jpg":[function(require,module,exports) {
module.exports = "/wechat.8523a6b8.jpg";
},{}],"src/components/join.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.join = join;

var _interceptors = require("@thi.ng/interceptors");

var _wechat = _interopRequireDefault(require("../../assets/images/wechat.jpg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function join() {
  return ({
    ui,
    views,
    bus
  }) => {
    const showWechat = views.showWechat.deref();
    return ['div', ui.join, ['div', ui.contentLeft, ['section', ui.section, ['div', ui.title, '简介 | Intro'], ['div', ui.paragraph, ['div', '另奕可能'], ['div', '新商业 X 感官空间 设计品牌']], ['div', ui.paragraph, ['div', 'ALTERNABILITY DESIGN'], ['div', 'Another possibility of creative Design']]], ['section', ui.section, ['div', ui.title, '联络 | Contact'], ['div', 'anadesign@126.com (项目 / project)'], ['div', 'info@i-ana.com (媒体 / press)'], ['div', 'wangdeccom (微信 / wechat）']], ['section', ui.section, ['div', ui.title, '地址 | Address'], ['div', '广州市 番禺区汉溪大道东390号 四海城1-2座 3A01'], ['div', '3A01,Block 1-2,Sihai City ,No. 390, East Hanxi Avenue, Panyu District, Guangzhou,China']], ['section', ui.section, ['div', ui.title, '订阅 | Follow Us'], ['div', ['div', {
      style: {
        display: 'inline-block'
      },
      onmouseenter: () => bus.dispatch([_interceptors.EV_TOGGLE_VALUE, 'showWechat']),
      onmouseleave: () => bus.dispatch([_interceptors.EV_SET_VALUE, ['showWechat', false]])
    }, ['span', ui.icons.wechat], '另奕可能'], ['div', ['a', Object.assign({
      href: 'http://weibo.com/alternability'
    }, ui.link), ['span', ui.icons.weibo], '另奕可能']], ['div', ['a', Object.assign({
      href: 'https://www.instagram.com/alternability/'
    }, ui.link), ['span', ui.icons.instagram], 'ALTERNABILITY DESIGN']]], showWechat ? ['img', Object.assign({}, ui.wechatImg, {
      src: _wechat.default
    })] : null]], ['div', ui.contentRight, ['section', ui.section, ['div', ui.title, '工作 | Jobs'], ['div', ui.headline, '“18-25岁对未来和设计充满想象。”'], ['div', '效果图设计师'], ['div', '施工图设计师'], ['div', '平面设计师']], ['section', ui.section, ['div', ui.title, '了解更多 | More +'], ['div', ui.paragraph, ['div', '邀请您加入我们！'], ['div', '有意者请将个人简历和作品集（含学历及详细的工作经历）发至邮箱：anadesign@126.com'], ['div', 'Invite you to join us!'], ['div', 'Interested parties please send your resume and portfolio (including academic qualifications and detailed work experience) to the email address: anadesign@126.com']], ['div', ui.paragraph, ['div', '请注明申请职位以及期望薪金，我们将尽快与适合的申请者取得联系并安排面试'], ['div', 'Please indicate the application position and expected salary, we will contact the appropriate applicant as soon as possible and arrange an interview.']]], views.isLarge.deref() ? null : ['section', ui.section, ['div', 'Copyright © 2019 ALTERNABILITY DESIGN，All rights reserved. 粤ICP备19055289号'], ['div', '本网站所涉及设计方案、展示图片、文字等著作权及署名权，归另奕可能所有，未经许可禁止使用，侵权必究。']]]];
  };
}
},{"@thi.ng/interceptors":"node_modules/@thi.ng/interceptors/index.js","../../assets/images/wechat.jpg":"assets/images/wechat.jpg"}],"src/components/work-spec.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.workSpec = void 0;

var _transducers = require("@thi.ng/transducers");

const description = text => (0, _transducers.map)(line => ['p', line], text.split('<br />'));

const CATEGORIES = {
  'OFFICE': '办公',
  'SHOP': '零售',
  'RESTAURANT': '餐饮',
  'HOTEL': '酒店',
  'HOUSE': '私宅',
  'BUILDING': '建筑',
  'BRANDING': '品牌'
};

const workSpec = ({
  ui,
  views
}, project, showDesc = false) => {
  const en = views.en.deref();
  return ['div', ['div', ui.project.title, en ? project.title : project.title_cn], showDesc ? ['div', ui.project.desc, description(en ? project.description : project.description_cn)] : null, ['div', ui.project.spec, ['div', en ? 'Client: ' : '委托单位: ', en ? project.client : project.client_cn], project.area ? ['div', en ? 'Area: ' : '项目面积: ', project.area] : null, ['div', en ? 'Category: ' : '项目类型: ', en ? project.category : CATEGORIES[project.category]], ['div', en ? 'Designer: ' : '主设计师: ', en ? project.designer : project.designer_cn], project.members ? ['div', en ? 'Members: ' : '设计团队: ', en ? project.members : project.members_cn] : null, project.construction ? ['div', en ? 'Construction: ' : '施工单位: ', en ? project.construction : project.construction_cn] : null, project.constructor ? ['div', en ? 'Constructor: ' : '施工团队: ', en ? project.constructor : project.constructor_cn] : null, ['div', en ? 'Design Date: ' : '设计时间: ', `${project.date.getFullYear()}-${project.date.getMonth()}`], ['div', en ? 'Construction Date: ' : '施工时间: ', `${project.date.getFullYear()}-${project.date.getMonth()}`], ['div', en ? 'Location: ' : '项目地点: ', en ? project.location : project.location_cn]]];
};

exports.workSpec = workSpec;
},{"@thi.ng/transducers":"node_modules/@thi.ng/transducers/index.js"}],"src/components/work-list.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.workList = exports.projectReels = exports.projectThumbs = exports.projectThumb = void 0;

var _transducers = require("@thi.ng/transducers");

var _routeLink = require("./route-link");

var _utils = require("../utils");

var routes = _interopRequireWildcard(require("../routes"));

var _workSpec = require("./work-spec");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const projectThumb = ({
  ui
}, project) => {
  const route = [routes.WORK_DETAIL.id, {
    id: project.id
  }];
  return ['div', ui.project.thumbContainer, [_routeLink.routeLink, {}, route, ['img', Object.assign({}, ui.project.thumbImg, {
    src: (0, _utils.resource)(project.cover)
  })]], [_routeLink.routeLink, ui.project.thumbTitle, route, project.title]];
};

exports.projectThumb = projectThumb;

const projectThumbs = ({
  ui,
  views
}, pids) => {
  const projects = views.projects.deref();
  const projects1 = [...(0, _transducers.map)(pid => projects[pid], pids)].sort((p1, p2) => p1['date'] > p2['date'] ? -1 : 1);
  return ['ul', ui.project.thumbList, ...(0, _transducers.map)(proj => ['li', ui.project.thumbItem, [projectThumb, proj]], projects1)];
};

exports.projectThumbs = projectThumbs;

const projectImage = ({
  ui
}, project, index) => {
  const route = [routes.WORK_GALLERY.id, {
    id: project.id,
    index
  }];
  const url = project.images[index];
  return [_routeLink.routeLink, {}, route, ['img', Object.assign({}, ui.project.image, {
    key: url,
    src: (0, _utils.resource)(url)
  })]];
};

const projectInfo = ({
  ui
}, project) => {
  return ['div', ui.project.info, [_workSpec.workSpec, project, false], ['div', ...(0, _transducers.mapIndexed)((i, _) => [projectImage, project, i], project.images)]];
};

const projectDetail = ({
  ui,
  views
}, pid) => {
  const project = views.projects.deref()[pid];
  return project ? ['div', Object.assign({}, ui.workDetail, {
    key: pid
  }), [projectInfo, project]] : null;
};

const projectRealShow = ({
  ui
}, project) => {
  const route = [routes.WORK_DETAIL.id, {
    id: project.id
  }];
  return ['div', ui.project.reelItem, [_routeLink.routeLink, ui.project.reelImage, route, ['img', Object.assign({}, ui.project.reelImage, {
    src: (0, _utils.resource)(project.cover)
  })]], [_routeLink.routeLink, ui.project.reelTitle, route, project.title]];
};

const projectReels = ({
  ui,
  views
}) => {
  const group = views.group.deref();
  const pids = views.projectGroups.deref()[group] || [];
  const projects = views.projects.deref();
  const projects1 = [...(0, _transducers.filter)(proj => group == 'all' || pids.includes(proj['id']), (0, _transducers.vals)(projects))].sort((p1, p2) => p1['date'] > p2['date'] ? -1 : 1);
  return ['div', ui.workDetail, ...(0, _transducers.map)(proj => [projectRealShow, proj], projects1)];
};

exports.projectReels = projectReels;

const workList = ({
  ui,
  views
}) => () => {
  const pid = views.project.deref();
  const group = views.group.deref();
  const pids = views.projectGroups.deref()[group] || [];
  return ['div', ui.workList, ['div', ui.workListThumb, [projectThumbs, pids]], pid ? [projectDetail, views.project.deref()] : [projectReels]];
};

exports.workList = workList;
},{"@thi.ng/transducers":"node_modules/@thi.ng/transducers/index.js","./route-link":"src/components/route-link.ts","../utils":"src/utils.ts","../routes":"src/routes.ts","./work-spec":"src/components/work-spec.ts"}],"src/components/work-table.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.workTable = void 0;

var _transducers = require("@thi.ng/transducers");

var _workList = require("./work-list");

const TAGS = {
  'Innovation office': '创新办公',
  'Clothing showroom': '服饰SHOWROOM',
  'Restaurant & coffee & tea': '网红餐饮&茶饮',
  'Shopmall & entertainment & Sports': '购物&娱乐&运动',
  'Exhibition hall & furniture': '展厅&家居',
  'Hotle & inn': '精品酒店&民宿',
  'Interesting buildings': '有趣建筑',
  'Elaborate Residential': '逼格住宅'
};

const projectGroup = ({
  ui
}, name, pids) => ['div', ui.project.group, ['div', ui.project.category, name], [_workList.projectThumbs, pids]];

const workTable = () => ({
  ui,
  views
}) => {
  const tags = views.tags.deref();
  return ['div', ui.workList, ['div', ui.workListThumbTable, ...(0, _transducers.transduce)((0, _transducers.comp)((0, _transducers.map)(tag => {
    return [tag, tags[tag] || []];
  }), (0, _transducers.filter)(([name, pids]) => name != 'all' && pids.length > 0), (0, _transducers.map)(([name, pids]) => {
    return [projectGroup, views.en.deref() ? name : TAGS[name], pids];
  })), (0, _transducers.push)(), (0, _transducers.keys)(TAGS))], [_workList.projectReels]];
};

exports.workTable = workTable;
},{"@thi.ng/transducers":"node_modules/@thi.ng/transducers/index.js","./work-list":"src/components/work-list.ts"}],"src/components/gallery.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gallery = gallery;

var _utils = require("../utils");

var routes = _interopRequireWildcard(require("../routes"));

var _routeLink = require("./route-link");

var _workSpec = require("./work-spec");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const cycle = (n, i) => i > n - 1 ? 0 : i < 0 ? n - 1 : i;

const galleryImage = ({
  ui,
  views
}) => {
  const pid = views.project.deref();
  const project = views.projects.deref()[pid];

  if (project) {
    const index = views.galleryImage.deref();
    const images = project['images'];

    const route = i => [routes.WORK_GALLERY.id, {
      id: pid,
      index: cycle(images.length, index + i)
    }];

    return ['div', ui.gallery, ['img', Object.assign({}, ui.galleryImg, {
      src: (0, _utils.resource)(images[index])
    })], [_routeLink.routeLink, ui.gallerySwitchLeft, route(-1)], [_routeLink.routeLink, ui.gallerySwitchRight, route(1)], ['div', ui.galleryInfo, [_workSpec.workSpec, project, true]]];
  }
};

function gallery({
  ui
}) {
  return () => ['div', ui.home, [galleryImage]];
}
},{"../utils":"src/utils.ts","../routes":"src/routes.ts","./route-link":"src/components/route-link.ts","./work-spec":"src/components/work-spec.ts"}],"src/config.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CONFIG = void 0;

var _interceptors = require("@thi.ng/interceptors");

var _transducers = require("@thi.ng/transducers");

var _paths = require("@thi.ng/paths");

var _router = require("@thi.ng/router");

var routes = _interopRequireWildcard(require("./routes"));

var fx = _interopRequireWildcard(require("./effects"));

var ev = _interopRequireWildcard(require("./events"));

var _home = require("./components/home");

var _contact = require("./components/contact");

var _join = require("./components/join");

var _workList = require("./components/work-list");

var _workTable = require("./components/work-table");

var _gallery = require("./components/gallery");

var _utils = require("./utils");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const WORK_ITEMS = [{
  type: 'ALL',
  name: 'ALL',
  nameCN: '商业',
  route: [routes.WORKS_TABLE.id, undefined],
  match: ({
    id
  }) => id == routes.WORKS_TABLE.id
}, {
  type: 'OFFICE',
  name: 'OFFICE',
  nameCN: '办公'
}, {
  type: 'SHOP',
  name: 'SHOP',
  nameCN: '零售'
}, {
  type: 'RESTAURANT',
  name: 'RESTAURANT',
  nameCN: '餐饮'
}, {
  type: 'HOTEL',
  name: 'HOTEL',
  nameCN: '酒店'
}, {
  type: 'HOUSE',
  name: 'HOUSE',
  nameCN: '私宅'
}, {
  type: 'BUILDING',
  name: 'BUILDING',
  nameCN: '建筑'
}, {
  type: 'BRANDING',
  name: 'BRANDING',
  nameCN: '品牌'
}];
const NAV_ITEMS = [{
  name: 'WORKS',
  nameCN: '作品',
  route: [routes.WORKS_LIST.id, {
    type: 'all'
  }],
  match: ({
    id
  }) => routes.WORKS_TABLE.id == id || routes.WORKS_LIST.id == id || routes.WORK_DETAIL.id == id,
  children: [...(0, _transducers.map)(item => ({
    name: item.name,
    nameCN: item.nameCN,
    route: item['route'] || [routes.WORKS_LIST.id, {
      type: item.type
    }],
    match: item['match'] ? item['match'] : ({
      id,
      params
    }) => id == routes.WORKS_LIST.id && params.type == item.type
  }), WORK_ITEMS)]
}, {
  name: 'ABOUT',
  nameCN: '关于',
  route: [routes.JOIN.id, null],
  match: ({
    id
  }) => id == routes.JOIN.id
}];

const isNavItemGroup = group => group.hasOwnProperty('children');

const getNavItems = route => [...(0, _transducers.map)(item => {
  item['active'] = false;

  if (isNavItemGroup(item)) {
    item['active'] = item.match(route);
    item.children.forEach(c => c['active'] = c.match(route));
  } else {
    item['active'] = item['match'](route);
  }

  return item;
}, NAV_ITEMS)];

const parseDate = date => {
  const a = date.split(/[^0-9]/);
  return new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]);
};

const parseProjects = projects => [...(0, _transducers.map)(proj => {
  proj['date'] = parseDate(proj['date']);
  proj['construction_date'] = parseDate(proj['construction_date']);
  return proj;
}, projects)];

const CONFIG = {
  router: {
    useFragment: true,
    defaultRouteID: routes.HOME.id,
    routes: [routes.HOME, routes.WORKS_LIST, routes.WORKS_TABLE, routes.WORK_DETAIL, routes.WORK_GALLERY, routes.CONTACT, routes.JOIN]
  },
  events: {
    [_router.EVENT_ROUTE_CHANGED]: [(0, _interceptors.valueSetter)("route"), (state, [_, route]) => {
      const state1 = (0, _paths.setIn)(state, 'nav.items', getNavItems(route));
      return {
        [_interceptors.FX_STATE]: (0, _paths.setIn)(state1, 'nav.visible', false)
      };
    }, (state, [_, route]) => {
      let state1 = state;
      state1 = (0, _paths.setIn)(state1, 'currentFeatured', 0);

      if (route.id == routes.WORK_DETAIL.id) {
        state1 = (0, _paths.setIn)(state1, 'project', route.params.id);
      } else if (route.id == routes.WORK_GALLERY.id) {
        state1 = (0, _paths.setIn)(state1, 'project', route.params.id);
        state1 = (0, _paths.setIn)(state1, 'galleryImage', parseInt(route.params.index));
      } else if (route.id == routes.WORKS_LIST.id) {
        state1 = (0, _paths.setIn)(state1, 'project', undefined);
        state1 = (0, _paths.setIn)(state1, 'group', route.params.type);
      } else if (route.id == routes.WORKS_TABLE.id) {
        state1 = (0, _paths.setIn)(state1, 'group', 'all');
      }

      return {
        [_interceptors.FX_STATE]: state1
      };
    }],
    [ev.ROUTE_TO]: (_, [__, route]) => ({
      [fx.ROUTE_TO]: route
    }),
    [ev.RESIZE]: (0, _interceptors.valueSetter)('isLarge'),
    [ev.LOAD_PROJECTS]: [(0, _utils.resourceFetcher)('/projects/index.html', ev.PARSE_PROJECTS, ev.LOAD_PROJECTS_ERROR)],
    [ev.PARSE_PROJECTS]: (0, _utils.jsonReader)(db => [ev.RECEIVE_PROJECTS, parseProjects(db.projects)]),
    [ev.RECEIVE_PROJECTS]: (state, [_, projects]) => {
      const projs = (0, _transducers.transduce)((0, _transducers.map)(proj => [proj['id'], proj]), (0, _transducers.assocObj)(), projects);
      const state1 = (0, _paths.setIn)(state, 'projects', projs);
      const groups = (0, _transducers.groupByObj)({
        key: p => p['category'],
        group: (0, _transducers.compR)((0, _transducers.push)(), (acc, x) => (acc.push(x['id']), acc))
      }, projects);
      groups['all'] = Object.keys(projs);
      const state2 = (0, _paths.setIn)(state1, 'projectGroups', groups);
      const featured = (0, _transducers.transduce)((0, _transducers.comp)((0, _transducers.filter)(p => p['featured']), (0, _transducers.map)(p => p['id'])), (0, _transducers.push)(), projects);
      const state3 = (0, _paths.setIn)(state2, 'featured', featured.reverse());
      const tags = new Set([...(0, _transducers.map)(t => t.trim(), (0, _transducers.mapcat)(p => p['tags'], projects))]);
      const byTags = (0, _transducers.transduce)((0, _transducers.map)(t => [t, [...(0, _transducers.map)(p => p['id'], (0, _transducers.filter)(p => p['tags'].includes(t), projects))]]), (0, _transducers.assocObj)(), tags);
      const state4 = (0, _paths.setIn)(state3, 'tags', byTags);
      return {
        [_interceptors.FX_STATE]: (0, _paths.setIn)(state4, 'initialized', true)
      };
    },
    [ev.LOAD_PROJECTS_ERROR]: _interceptors.trace,
    [ev.NEXT_FEATURED_PROJECT]: (state, _) => {
      let state1 = state;
      const route = (0, _paths.getIn)(state, 'route');

      if (route.id == routes.HOME.id) {
        const featured = (0, _paths.getIn)(state, 'featured');
        state1 = (0, _paths.updateIn)(state1, 'currentFeatured', v => featured.length > 0 ? (v + 1) % featured.length : 0);
        return {
          [_interceptors.FX_STATE]: state1
        };
      }
    },
    [ev.DEBUG]: _interceptors.trace
  },
  effects: {},
  components: {
    [routes.HOME.id]: _home.home,
    [routes.WORKS_LIST.id]: _workList.workList,
    [routes.WORKS_TABLE.id]: _workTable.workTable,
    [routes.WORK_DETAIL.id]: _workList.workList,
    [routes.WORK_GALLERY.id]: _gallery.gallery,
    [routes.CONTACT.id]: _contact.contact,
    [routes.JOIN.id]: _join.join
  },
  domRoot: "app",
  initialState: {
    initialized: false,
    nav: {
      visible: true,
      items: NAV_ITEMS
    },
    isLarge: false,
    project: undefined,
    projects: {},
    projectGroups: {},
    group: 'all',
    tags: {},
    currentFeatured: 0,
    featured: [],
    showWechat: false,
    en: false
  },
  views: {
    initialized: 'initialized',
    nav: 'nav',
    isLarge: 'isLarge',
    project: 'project',
    projects: 'projects',
    projectGroups: 'projectGroups',
    tags: 'tags',
    group: 'group',
    currentFeatured: 'currentFeatured',
    featured: 'featured',
    galleryImage: 'galleryImage',
    showWechat: 'showWechat',
    en: 'en'
  },
  ui: {
    app: {
      class: 'fonts f6 relative dark-gray lh-copy h-100 left-0 right-0 fixed'
    },
    copyright: {
      class: 'dn db-l absolute-l bottom-1-l left-1-l left-2-l f8 mid-gray'
    },
    social: {
      class: 'absolute bottom-2 light-silver w-100 tc f7'
    },
    link: {
      class: 'link'
    },
    icons: {
      menu: {
        class: 'menu icon'
      },
      wechat: {
        class: 'wechat icon'
      },
      weibo: {
        class: 'weibo icon'
      },
      instagram: {
        class: 'instagram icon'
      }
    },
    root: {
      class: 'relative h-100 w-100'
    },
    header: {
      class: 'header pa4 fixed'
    },
    logo: {
      class: 'f4 absolute v-center link'
    },
    logoPic: {
      class: 'h2 logo-pic'
    },
    nav: {
      container: {
        class: 'nav relative'
      },
      switch: {
        class: 'right-1 link absolute f5 dn-l v-center'
      },
      content: {
        class: 'ph4 ma0 w3 list pa0'
      },
      item: {
        class: 'mv1'
      },
      link: {
        class: 'link hover-b nowrap'
      },
      linkActive: {
        class: 'b link nowrap'
      },
      subContent: {
        class: 'ml3 list pa0'
      }
    },
    home: {
      class: 'content'
    },
    gallery: {
      class: 'h-100'
    },
    homeGalleryImg: {
      class: 'absolute cover h-100 w-100 top-0 left-0 o-0'
    },
    galleryImg: {
      class: 'absolute cover h-100 w-100 top-0 left-0'
    },
    gallerySwitchLeft: {
      class: 'absolute w-50 h-100 left-0 w-resize'
    },
    gallerySwitchRight: {
      class: 'absolute w-50 h-100 right-0 e-resize'
    },
    galleryInfo: {
      class: 'absolute left-2 left-50-l top-60 h-40 overflow-y-scroll no-scrollbar'
    },
    workList: {
      class: 'work-list'
    },
    workListThumb: {
      class: 'work-list-thumb pl2 pt2-l overflow-x-hidden overflow-y-scroll no-scrollbar'
    },
    workListThumbTable: {
      class: 'work-list-thumb overflow-x-hidden overflow-y-scroll no-scrollbar pl2 work-thumb-table'
    },
    workDetail: {
      class: 'work-detail overflow-scroll overflow-x-hidden no-scrollbar'
    },
    project: {
      group: {
        class: 'mb2'
      },
      category: {
        class: 'mb1 f7'
      },
      thumbList: {
        class: 'list dg thumb-grid ma0 pa0'
      },
      thumbItem: {
        class: 'w3 h3 w4-l h4-l'
      },
      thumbContainer: {
        class: 'relative img-link h-100 overflow-visible'
      },
      thumbTitle: {
        class: 'no-underline absolute vh-center tc o-0 img-link--title white nus'
      },
      thumbImg: {
        class: 'db img-link--img w-100 h-100 absolute shit'
      },
      reelItem: {
        class: 'h-100 img-link relative'
      },
      reelTitle: {
        class: 'o-0 img-link--title absolute vh-center tc no-underline white nus'
      },
      reelImage: {
        class: 'img-link--img w-100 h-100 cover'
      },
      info: {
        class: ''
      },
      title: {
        class: 'f5 mv4-l mb3 mt0 mt1-l'
      },
      desc: {
        class: 'mb4'
      },
      spec: {
        class: 'f7 mb3'
      },
      image: {
        class: 'db img mb1'
      }
    },
    contact: {
      class: 'content grid dg'
    },
    contentLeft: {
      class: 'content-left ph4 mt1-l'
    },
    contentRight: {
      class: 'content-right2 ph4 mt1-5-l'
    },
    section: {
      class: 'mb4 relative'
    },
    headline: {
      class: 'mb4'
    },
    paragraph: {
      clasS: 'mb4'
    },
    join: {
      class: 'join dg overflow-scroll overflow-x-hidden no-scrollbar'
    },
    title: {
      class: 'mb4 b'
    },
    specform: {
      class: 'dg spec-grid'
    },
    wechatImg: {
      class: 'absolute db left-1 wechat-img'
    }
  }
};
exports.CONFIG = CONFIG;
},{"@thi.ng/interceptors":"node_modules/@thi.ng/interceptors/index.js","@thi.ng/transducers":"node_modules/@thi.ng/transducers/index.js","@thi.ng/paths":"node_modules/@thi.ng/paths/index.js","@thi.ng/router":"node_modules/@thi.ng/router/index.js","./routes":"src/routes.ts","./effects":"src/effects.ts","./events":"src/events.ts","./components/home":"src/components/home.ts","./components/contact":"src/components/contact.ts","./components/join":"src/components/join.ts","./components/work-list":"src/components/work-list.ts","./components/work-table":"src/components/work-table.ts","./components/gallery":"src/components/gallery.ts","./utils":"src/utils.ts"}],"src/index.ts":[function(require,module,exports) {
"use strict";

var _app = require("./app");

var _config = require("./config");

new _app.App(_config.CONFIG).start();
},{"./app":"src/app.ts","./config":"src/config.ts"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51692" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.ts"], null)
//# sourceMappingURL=/src.f10117fe.js.map