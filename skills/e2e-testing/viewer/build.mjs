// E2E テスト仕様のビューアのビルド。生成物なので、手で編集しない。
// 元のソースはリポジトリの viewer/(入口は viewer/src/build.ts)。作り直すには viewer/ で `pnpm run bundle` を実行する。
import { createRequire as __bannerCreateRequire } from 'node:module';
const require = __bannerCreateRequire(import.meta.url);
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __commonJS = (cb, mod) => function __require2() {
  try {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  } catch (e) {
    throw mod = 0, e;
  }
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/.pnpm/react@19.3.1/node_modules/react/cjs/react.production.js
var require_react_production = __commonJS({
  "node_modules/.pnpm/react@19.3.1/node_modules/react/cjs/react.production.js"(exports) {
    "use strict";
    var REACT_ELEMENT_TYPE = /* @__PURE__ */ Symbol.for("react.transitional.element");
    var REACT_PORTAL_TYPE = /* @__PURE__ */ Symbol.for("react.portal");
    var REACT_FRAGMENT_TYPE = /* @__PURE__ */ Symbol.for("react.fragment");
    var REACT_STRICT_MODE_TYPE = /* @__PURE__ */ Symbol.for("react.strict_mode");
    var REACT_PROFILER_TYPE = /* @__PURE__ */ Symbol.for("react.profiler");
    var REACT_CONSUMER_TYPE = /* @__PURE__ */ Symbol.for("react.consumer");
    var REACT_CONTEXT_TYPE = /* @__PURE__ */ Symbol.for("react.context");
    var REACT_FORWARD_REF_TYPE = /* @__PURE__ */ Symbol.for("react.forward_ref");
    var REACT_SUSPENSE_TYPE = /* @__PURE__ */ Symbol.for("react.suspense");
    var REACT_MEMO_TYPE = /* @__PURE__ */ Symbol.for("react.memo");
    var REACT_LAZY_TYPE = /* @__PURE__ */ Symbol.for("react.lazy");
    var REACT_ACTIVITY_TYPE = /* @__PURE__ */ Symbol.for("react.activity");
    var REACT_VIEW_TRANSITION_TYPE = /* @__PURE__ */ Symbol.for("react.view_transition");
    var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
    function getIteratorFn(maybeIterable) {
      if (null === maybeIterable || "object" !== typeof maybeIterable) return null;
      maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
      return "function" === typeof maybeIterable ? maybeIterable : null;
    }
    var ReactNoopUpdateQueue = {
      isMounted: function() {
        return false;
      },
      enqueueForceUpdate: function() {
      },
      enqueueReplaceState: function() {
      },
      enqueueSetState: function() {
      }
    };
    var assign = Object.assign;
    var emptyObject = {};
    function Component(props, context, updater) {
      this.props = props;
      this.context = context;
      this.refs = emptyObject;
      this.updater = updater || ReactNoopUpdateQueue;
    }
    Component.prototype.isReactComponent = {};
    Component.prototype.setState = function(partialState, callback) {
      if ("object" !== typeof partialState && "function" !== typeof partialState && null != partialState)
        throw Error(
          "takes an object of state variables to update or a function which returns an object of state variables."
        );
      this.updater.enqueueSetState(this, partialState, callback, "setState");
    };
    Component.prototype.forceUpdate = function(callback) {
      this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
    };
    function ComponentDummy() {
    }
    ComponentDummy.prototype = Component.prototype;
    function PureComponent(props, context, updater) {
      this.props = props;
      this.context = context;
      this.refs = emptyObject;
      this.updater = updater || ReactNoopUpdateQueue;
    }
    var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
    pureComponentPrototype.constructor = PureComponent;
    assign(pureComponentPrototype, Component.prototype);
    pureComponentPrototype.isPureReactComponent = true;
    var isArrayImpl = Array.isArray;
    function noop() {
    }
    var ReactSharedInternals = { H: null, A: null, T: null, S: null };
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    function ReactElement(type, key, props) {
      var refProp = props.ref;
      return {
        $$typeof: REACT_ELEMENT_TYPE,
        type,
        key,
        ref: void 0 !== refProp ? refProp : null,
        props
      };
    }
    function cloneAndReplaceKey(oldElement, newKey) {
      return ReactElement(oldElement.type, newKey, oldElement.props);
    }
    function isValidElement(object) {
      return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    function escape(key) {
      var escaperLookup = { "=": "=0", ":": "=2" };
      return "$" + key.replace(/[=:]/g, function(match) {
        return escaperLookup[match];
      });
    }
    var userProvidedKeyEscapeRegex = /\/+/g;
    function getElementKey(element, index) {
      return "object" === typeof element && null !== element && null != element.key ? escape("" + element.key) : index.toString(36);
    }
    function resolveThenable(thenable) {
      switch (thenable.status) {
        case "fulfilled":
          return thenable.value;
        case "rejected":
          throw thenable.reason;
        default:
          switch ("string" === typeof thenable.status ? thenable.then(noop, noop) : (thenable.status = "pending", thenable.then(
            function(fulfilledValue) {
              "pending" === thenable.status && (thenable.status = "fulfilled", thenable.value = fulfilledValue);
            },
            function(error) {
              "pending" === thenable.status && (thenable.status = "rejected", thenable.reason = error);
            }
          )), thenable.status) {
            case "fulfilled":
              return thenable.value;
            case "rejected":
              throw thenable.reason;
          }
      }
      throw thenable;
    }
    function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
      var type = typeof children;
      if ("undefined" === type || "boolean" === type) children = null;
      var invokeCallback = false;
      if (null === children) invokeCallback = true;
      else
        switch (type) {
          case "bigint":
          case "string":
          case "number":
            invokeCallback = true;
            break;
          case "object":
            switch (children.$$typeof) {
              case REACT_ELEMENT_TYPE:
              case REACT_PORTAL_TYPE:
                invokeCallback = true;
                break;
              case REACT_LAZY_TYPE:
                return invokeCallback = children._init, mapIntoArray(
                  invokeCallback(children._payload),
                  array,
                  escapedPrefix,
                  nameSoFar,
                  callback
                );
            }
        }
      if (invokeCallback)
        return callback = callback(children), invokeCallback = "" === nameSoFar ? "." + getElementKey(children, 0) : nameSoFar, isArrayImpl(callback) ? (escapedPrefix = "", null != invokeCallback && (escapedPrefix = invokeCallback.replace(userProvidedKeyEscapeRegex, "$&/") + "/"), mapIntoArray(callback, array, escapedPrefix, "", function(c) {
          return c;
        })) : null != callback && (isValidElement(callback) && (callback = cloneAndReplaceKey(
          callback,
          escapedPrefix + (null == callback.key || children && children.key === callback.key ? "" : ("" + callback.key).replace(
            userProvidedKeyEscapeRegex,
            "$&/"
          ) + "/") + invokeCallback
        )), array.push(callback)), 1;
      invokeCallback = 0;
      var nextNamePrefix = "" === nameSoFar ? "." : nameSoFar + ":";
      if (isArrayImpl(children))
        for (var i = 0; i < children.length; i++)
          nameSoFar = children[i], type = nextNamePrefix + getElementKey(nameSoFar, i), invokeCallback += mapIntoArray(
            nameSoFar,
            array,
            escapedPrefix,
            type,
            callback
          );
      else if (i = getIteratorFn(children), "function" === typeof i)
        for (children = i.call(children), i = 0; !(nameSoFar = children.next()).done; )
          nameSoFar = nameSoFar.value, type = nextNamePrefix + getElementKey(nameSoFar, i++), invokeCallback += mapIntoArray(
            nameSoFar,
            array,
            escapedPrefix,
            type,
            callback
          );
      else if ("object" === type) {
        if ("function" === typeof children.then)
          return mapIntoArray(
            resolveThenable(children),
            array,
            escapedPrefix,
            nameSoFar,
            callback
          );
        array = String(children);
        throw Error(
          "Objects are not valid as a React child (found: " + ("[object Object]" === array ? "object with keys {" + Object.keys(children).join(", ") + "}" : array) + "). If you meant to render a collection of children, use an array instead."
        );
      }
      return invokeCallback;
    }
    function mapChildren(children, func, context) {
      if (null == children) return children;
      var result = [], count = 0;
      mapIntoArray(children, result, "", "", function(child) {
        return func.call(context, child, count++);
      });
      return result;
    }
    function lazyInitializer(payload) {
      if (-1 === payload._status) {
        var ctor = payload._result, thenable = ctor();
        thenable.then(
          function(moduleObject) {
            if (0 === payload._status || -1 === payload._status)
              payload._status = 1, payload._result = moduleObject, void 0 === thenable.status && (thenable.status = "fulfilled", thenable.value = moduleObject);
          },
          function(error) {
            if (0 === payload._status || -1 === payload._status)
              payload._status = 2, payload._result = error, void 0 === thenable.status && (thenable.status = "rejected", thenable.reason = error);
          }
        );
        -1 === payload._status && (payload._status = 0, payload._result = thenable);
      }
      if (1 === payload._status) return payload._result.default;
      throw payload._result;
    }
    var reportGlobalError = "function" === typeof reportError ? reportError : function(error) {
      if ("object" === typeof window && "function" === typeof window.ErrorEvent) {
        var event = new window.ErrorEvent("error", {
          bubbles: true,
          cancelable: true,
          message: "object" === typeof error && null !== error && "string" === typeof error.message ? String(error.message) : String(error),
          error
        });
        if (!window.dispatchEvent(event)) return;
      } else if ("object" === typeof process && "function" === typeof process.emit) {
        process.emit("uncaughtException", error);
        return;
      }
      console.error(error);
    };
    function startTransition(scope) {
      var prevTransition = ReactSharedInternals.T, currentTransition = {};
      currentTransition.types = null !== prevTransition ? prevTransition.types : null;
      ReactSharedInternals.T = currentTransition;
      try {
        var returnValue = scope(), onStartTransitionFinish = ReactSharedInternals.S;
        null !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue);
        "object" === typeof returnValue && null !== returnValue && "function" === typeof returnValue.then && returnValue.then(noop, reportGlobalError);
      } catch (error) {
        reportGlobalError(error);
      } finally {
        null !== prevTransition && null !== currentTransition.types && (prevTransition.types = currentTransition.types), ReactSharedInternals.T = prevTransition;
      }
    }
    function addTransitionType(type) {
      var transition = ReactSharedInternals.T;
      if (null !== transition) {
        var transitionTypes = transition.types;
        null === transitionTypes ? transition.types = [type] : -1 === transitionTypes.indexOf(type) && transitionTypes.push(type);
      } else startTransition(addTransitionType.bind(null, type));
    }
    var Children = {
      map: mapChildren,
      forEach: function(children, forEachFunc, forEachContext) {
        mapChildren(
          children,
          function() {
            forEachFunc.apply(this, arguments);
          },
          forEachContext
        );
      },
      count: function(children) {
        var n = 0;
        mapChildren(children, function() {
          n++;
        });
        return n;
      },
      toArray: function(children) {
        return mapChildren(children, function(child) {
          return child;
        }) || [];
      },
      only: function(children) {
        if (!isValidElement(children))
          throw Error(
            "React.Children.only expected to receive a single React element child."
          );
        return children;
      }
    };
    exports.Activity = REACT_ACTIVITY_TYPE;
    exports.Children = Children;
    exports.Component = Component;
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.Profiler = REACT_PROFILER_TYPE;
    exports.PureComponent = PureComponent;
    exports.StrictMode = REACT_STRICT_MODE_TYPE;
    exports.Suspense = REACT_SUSPENSE_TYPE;
    exports.ViewTransition = REACT_VIEW_TRANSITION_TYPE;
    exports.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ReactSharedInternals;
    exports.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function(size) {
        return ReactSharedInternals.H.useMemoCache(size);
      }
    };
    exports.addTransitionType = addTransitionType;
    exports.cache = function(fn) {
      return function() {
        return fn.apply(null, arguments);
      };
    };
    exports.cacheSignal = function() {
      return null;
    };
    exports.cloneElement = function(element, config, children) {
      if (null === element || void 0 === element)
        throw Error(
          "The argument must be a React element, but you passed " + element + "."
        );
      var props = assign({}, element.props), key = element.key;
      if (null != config)
        for (propName in void 0 !== config.key && (key = "" + config.key), config)
          !hasOwnProperty.call(config, propName) || "key" === propName || "__self" === propName || "__source" === propName || "ref" === propName && void 0 === config.ref || (props[propName] = config[propName]);
      var propName = arguments.length - 2;
      if (1 === propName) props.children = children;
      else if (1 < propName) {
        for (var childArray = Array(propName), i = 0; i < propName; i++)
          childArray[i] = arguments[i + 2];
        props.children = childArray;
      }
      return ReactElement(element.type, key, props);
    };
    exports.createContext = function(defaultValue) {
      defaultValue = {
        $$typeof: REACT_CONTEXT_TYPE,
        _currentValue: defaultValue,
        _currentValue2: defaultValue,
        _threadCount: 0,
        Provider: null,
        Consumer: null
      };
      defaultValue.Provider = defaultValue;
      defaultValue.Consumer = {
        $$typeof: REACT_CONSUMER_TYPE,
        _context: defaultValue
      };
      return defaultValue;
    };
    exports.createElement = function(type, config, children) {
      var propName, props = {}, key = null;
      if (null != config)
        for (propName in void 0 !== config.key && (key = "" + config.key), config)
          hasOwnProperty.call(config, propName) && "key" !== propName && "__self" !== propName && "__source" !== propName && (props[propName] = config[propName]);
      var childrenLength = arguments.length - 2;
      if (1 === childrenLength) props.children = children;
      else if (1 < childrenLength) {
        for (var childArray = Array(childrenLength), i = 0; i < childrenLength; i++)
          childArray[i] = arguments[i + 2];
        props.children = childArray;
      }
      if (type && type.defaultProps)
        for (propName in childrenLength = type.defaultProps, childrenLength)
          void 0 === props[propName] && (props[propName] = childrenLength[propName]);
      return ReactElement(type, key, props);
    };
    exports.createRef = function() {
      return { current: null };
    };
    exports.forwardRef = function(render) {
      return { $$typeof: REACT_FORWARD_REF_TYPE, render };
    };
    exports.isValidElement = isValidElement;
    exports.lazy = function(ctor) {
      return {
        $$typeof: REACT_LAZY_TYPE,
        _payload: { _status: -1, _result: ctor },
        _init: lazyInitializer
      };
    };
    exports.memo = function(type, compare) {
      return {
        $$typeof: REACT_MEMO_TYPE,
        type,
        compare: void 0 === compare ? null : compare
      };
    };
    exports.startTransition = startTransition;
    exports.unstable_useCacheRefresh = function() {
      return ReactSharedInternals.H.useCacheRefresh();
    };
    exports.use = function(usable) {
      return ReactSharedInternals.H.use(usable);
    };
    exports.useActionState = function(action, initialState, permalink) {
      return ReactSharedInternals.H.useActionState(action, initialState, permalink);
    };
    exports.useCallback = function(callback, deps) {
      return ReactSharedInternals.H.useCallback(callback, deps);
    };
    exports.useContext = function(Context) {
      return ReactSharedInternals.H.useContext(Context);
    };
    exports.useDebugValue = function() {
    };
    exports.useDeferredValue = function(value, initialValue) {
      return ReactSharedInternals.H.useDeferredValue(value, initialValue);
    };
    exports.useEffect = function(create, deps) {
      return ReactSharedInternals.H.useEffect(create, deps);
    };
    exports.useEffectEvent = function(callback) {
      return ReactSharedInternals.H.useEffectEvent(callback);
    };
    exports.useId = function() {
      return ReactSharedInternals.H.useId();
    };
    exports.useImperativeHandle = function(ref, create, deps) {
      return ReactSharedInternals.H.useImperativeHandle(ref, create, deps);
    };
    exports.useInsertionEffect = function(create, deps) {
      return ReactSharedInternals.H.useInsertionEffect(create, deps);
    };
    exports.useLayoutEffect = function(create, deps) {
      return ReactSharedInternals.H.useLayoutEffect(create, deps);
    };
    exports.useMemo = function(create, deps) {
      return ReactSharedInternals.H.useMemo(create, deps);
    };
    exports.useOptimistic = function(passthrough, reducer) {
      return ReactSharedInternals.H.useOptimistic(passthrough, reducer);
    };
    exports.useReducer = function(reducer, initialArg, init) {
      return ReactSharedInternals.H.useReducer(reducer, initialArg, init);
    };
    exports.useRef = function(initialValue) {
      return ReactSharedInternals.H.useRef(initialValue);
    };
    exports.useState = function(initialState) {
      return ReactSharedInternals.H.useState(initialState);
    };
    exports.useSyncExternalStore = function(subscribe, getSnapshot, getServerSnapshot) {
      return ReactSharedInternals.H.useSyncExternalStore(
        subscribe,
        getSnapshot,
        getServerSnapshot
      );
    };
    exports.useTransition = function() {
      return ReactSharedInternals.H.useTransition();
    };
    exports.version = "19.3.1";
  }
});

// node_modules/.pnpm/react@19.3.1/node_modules/react/index.js
var require_react = __commonJS({
  "node_modules/.pnpm/react@19.3.1/node_modules/react/index.js"(exports, module) {
    "use strict";
    if (true) {
      module.exports = require_react_production();
    } else {
      module.exports = null;
    }
  }
});

// node_modules/.pnpm/react-dom@19.3.1_react@19.3.1/node_modules/react-dom/cjs/react-dom.production.js
var require_react_dom_production = __commonJS({
  "node_modules/.pnpm/react-dom@19.3.1_react@19.3.1/node_modules/react-dom/cjs/react-dom.production.js"(exports) {
    "use strict";
    var React = require_react();
    function formatProdErrorMessage(code) {
      var url = "https://react.dev/errors/" + code;
      if (1 < arguments.length) {
        url += "?args[]=" + encodeURIComponent(arguments[1]);
        for (var i = 2; i < arguments.length; i++)
          url += "&args[]=" + encodeURIComponent(arguments[i]);
      }
      return "Minified React error #" + code + "; visit " + url + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
    }
    function noop() {
    }
    var Internals = {
      d: {
        f: noop,
        r: function() {
          throw Error(formatProdErrorMessage(522));
        },
        D: noop,
        C: noop,
        L: noop,
        m: noop,
        X: noop,
        S: noop,
        M: noop
      },
      p: 0,
      findDOMNode: null
    };
    var REACT_PORTAL_TYPE = /* @__PURE__ */ Symbol.for("react.portal");
    var REACT_RECOVERABLE_TYPE = /* @__PURE__ */ Symbol.for("react.recoverable");
    var REACT_OPTIMISTIC_KEY = /* @__PURE__ */ Symbol.for("react.optimistic_key");
    function createPortal$1(children, containerInfo, implementation) {
      var key = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
      return {
        $$typeof: REACT_PORTAL_TYPE,
        key: null == key ? null : key === REACT_OPTIMISTIC_KEY ? REACT_OPTIMISTIC_KEY : "" + key,
        children,
        containerInfo,
        implementation
      };
    }
    var ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
    function getCrossOriginStringAs(as, input) {
      if ("font" === as) return "";
      if ("string" === typeof input)
        return "use-credentials" === input ? input : "";
    }
    exports.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Internals;
    exports.browser = function(reason) {
      return { $$typeof: REACT_RECOVERABLE_TYPE, _reason: reason };
    };
    exports.createPortal = function(children, container) {
      var key = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
      if (!container || 1 !== container.nodeType && 9 !== container.nodeType && 11 !== container.nodeType)
        throw Error(formatProdErrorMessage(299));
      return createPortal$1(children, container, null, key);
    };
    exports.flushSync = function(fn) {
      var previousTransition = ReactSharedInternals.T, previousUpdatePriority = Internals.p;
      try {
        if (ReactSharedInternals.T = null, Internals.p = 2, fn) return fn();
      } finally {
        ReactSharedInternals.T = previousTransition, Internals.p = previousUpdatePriority, Internals.d.f();
      }
    };
    exports.preconnect = function(href, options) {
      "string" === typeof href && (options ? (options = options.crossOrigin, options = "string" === typeof options ? "use-credentials" === options ? options : "" : void 0) : options = null, Internals.d.C(href, options));
    };
    exports.prefetchDNS = function(href) {
      "string" === typeof href && Internals.d.D(href);
    };
    exports.preinit = function(href, options) {
      if ("string" === typeof href && options && "string" === typeof options.as) {
        var as = options.as, crossOrigin = getCrossOriginStringAs(as, options.crossOrigin), integrity = "string" === typeof options.integrity ? options.integrity : void 0, fetchPriority = "string" === typeof options.fetchPriority ? options.fetchPriority : void 0;
        "style" === as ? Internals.d.S(
          href,
          "string" === typeof options.precedence ? options.precedence : void 0,
          {
            crossOrigin,
            integrity,
            fetchPriority
          }
        ) : "script" === as && Internals.d.X(href, {
          crossOrigin,
          integrity,
          fetchPriority,
          nonce: "string" === typeof options.nonce ? options.nonce : void 0
        });
      }
    };
    exports.preinitModule = function(href, options) {
      if ("string" === typeof href)
        if ("object" === typeof options && null !== options) {
          if (null == options.as || "script" === options.as) {
            var crossOrigin = getCrossOriginStringAs(
              options.as,
              options.crossOrigin
            );
            Internals.d.M(href, {
              crossOrigin,
              integrity: "string" === typeof options.integrity ? options.integrity : void 0,
              nonce: "string" === typeof options.nonce ? options.nonce : void 0,
              fetchPriority: "string" === typeof options.fetchPriority ? options.fetchPriority : void 0
            });
          }
        } else null == options && Internals.d.M(href);
    };
    exports.preload = function(href, options) {
      if ("string" === typeof href && "object" === typeof options && null !== options && "string" === typeof options.as) {
        var as = options.as, crossOrigin = getCrossOriginStringAs(as, options.crossOrigin);
        Internals.d.L(href, as, {
          crossOrigin,
          integrity: "string" === typeof options.integrity ? options.integrity : void 0,
          nonce: "string" === typeof options.nonce ? options.nonce : void 0,
          type: "string" === typeof options.type ? options.type : void 0,
          fetchPriority: "string" === typeof options.fetchPriority ? options.fetchPriority : void 0,
          referrerPolicy: "string" === typeof options.referrerPolicy ? options.referrerPolicy : void 0,
          imageSrcSet: "string" === typeof options.imageSrcSet ? options.imageSrcSet : void 0,
          imageSizes: "string" === typeof options.imageSizes ? options.imageSizes : void 0,
          media: "string" === typeof options.media ? options.media : void 0
        });
      }
    };
    exports.preloadModule = function(href, options) {
      if ("string" === typeof href)
        if (options) {
          var crossOrigin = getCrossOriginStringAs(options.as, options.crossOrigin);
          Internals.d.m(href, {
            as: "string" === typeof options.as && "script" !== options.as ? options.as : void 0,
            crossOrigin,
            integrity: "string" === typeof options.integrity ? options.integrity : void 0,
            nonce: "string" === typeof options.nonce ? options.nonce : void 0,
            fetchPriority: "string" === typeof options.fetchPriority ? options.fetchPriority : void 0
          });
        } else Internals.d.m(href);
    };
    exports.requestFormReset = function(form) {
      Internals.d.r(form);
    };
    exports.unstable_batchedUpdates = function(fn, a) {
      return fn(a);
    };
    exports.useFormState = function(action, initialState, permalink) {
      return ReactSharedInternals.H.useFormState(action, initialState, permalink);
    };
    exports.useFormStatus = function() {
      return ReactSharedInternals.H.useHostTransitionStatus();
    };
    exports.version = "19.3.1";
  }
});

// node_modules/.pnpm/react-dom@19.3.1_react@19.3.1/node_modules/react-dom/index.js
var require_react_dom = __commonJS({
  "node_modules/.pnpm/react-dom@19.3.1_react@19.3.1/node_modules/react-dom/index.js"(exports, module) {
    "use strict";
    function checkDCE() {
      if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") {
        return;
      }
      if (false) {
        throw new Error("^_^");
      }
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
      } catch (err) {
        console.error(err);
      }
    }
    if (true) {
      checkDCE();
      module.exports = require_react_dom_production();
    } else {
      module.exports = null;
    }
  }
});

// node_modules/.pnpm/react-dom@19.3.1_react@19.3.1/node_modules/react-dom/cjs/react-dom-server-legacy.node.production.js
var require_react_dom_server_legacy_node_production = __commonJS({
  "node_modules/.pnpm/react-dom@19.3.1_react@19.3.1/node_modules/react-dom/cjs/react-dom-server-legacy.node.production.js"(exports) {
    "use strict";
    var React = require_react();
    var ReactDOM = require_react_dom();
    var REACT_ELEMENT_TYPE = /* @__PURE__ */ Symbol.for("react.transitional.element");
    var REACT_PORTAL_TYPE = /* @__PURE__ */ Symbol.for("react.portal");
    var REACT_FRAGMENT_TYPE = /* @__PURE__ */ Symbol.for("react.fragment");
    var REACT_STRICT_MODE_TYPE = /* @__PURE__ */ Symbol.for("react.strict_mode");
    var REACT_PROFILER_TYPE = /* @__PURE__ */ Symbol.for("react.profiler");
    var REACT_CONSUMER_TYPE = /* @__PURE__ */ Symbol.for("react.consumer");
    var REACT_CONTEXT_TYPE = /* @__PURE__ */ Symbol.for("react.context");
    var REACT_FORWARD_REF_TYPE = /* @__PURE__ */ Symbol.for("react.forward_ref");
    var REACT_SUSPENSE_TYPE = /* @__PURE__ */ Symbol.for("react.suspense");
    var REACT_SUSPENSE_LIST_TYPE = /* @__PURE__ */ Symbol.for("react.suspense_list");
    var REACT_MEMO_TYPE = /* @__PURE__ */ Symbol.for("react.memo");
    var REACT_LAZY_TYPE = /* @__PURE__ */ Symbol.for("react.lazy");
    var REACT_SCOPE_TYPE = /* @__PURE__ */ Symbol.for("react.scope");
    var REACT_ACTIVITY_TYPE = /* @__PURE__ */ Symbol.for("react.activity");
    var REACT_LEGACY_HIDDEN_TYPE = /* @__PURE__ */ Symbol.for("react.legacy_hidden");
    var REACT_MEMO_CACHE_SENTINEL = /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel");
    var REACT_VIEW_TRANSITION_TYPE = /* @__PURE__ */ Symbol.for("react.view_transition");
    var REACT_RECOVERABLE_TYPE = /* @__PURE__ */ Symbol.for("react.recoverable");
    var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
    function getIteratorFn(maybeIterable) {
      if (null === maybeIterable || "object" !== typeof maybeIterable) return null;
      maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
      return "function" === typeof maybeIterable ? maybeIterable : null;
    }
    var REACT_OPTIMISTIC_KEY = /* @__PURE__ */ Symbol.for("react.optimistic_key");
    var isArrayImpl = Array.isArray;
    function murmurhash3_32_gc(key, seed) {
      var remainder = key.length & 3;
      var bytes = key.length - remainder;
      var h1 = seed;
      for (seed = 0; seed < bytes; ) {
        var k1 = key.charCodeAt(seed) & 255 | (key.charCodeAt(++seed) & 255) << 8 | (key.charCodeAt(++seed) & 255) << 16 | (key.charCodeAt(++seed) & 255) << 24;
        ++seed;
        k1 = 3432918353 * (k1 & 65535) + ((3432918353 * (k1 >>> 16) & 65535) << 16) & 4294967295;
        k1 = k1 << 15 | k1 >>> 17;
        k1 = 461845907 * (k1 & 65535) + ((461845907 * (k1 >>> 16) & 65535) << 16) & 4294967295;
        h1 ^= k1;
        h1 = h1 << 13 | h1 >>> 19;
        h1 = 5 * (h1 & 65535) + ((5 * (h1 >>> 16) & 65535) << 16) & 4294967295;
        h1 = (h1 & 65535) + 27492 + (((h1 >>> 16) + 58964 & 65535) << 16);
      }
      k1 = 0;
      switch (remainder) {
        case 3:
          k1 ^= (key.charCodeAt(seed + 2) & 255) << 16;
        case 2:
          k1 ^= (key.charCodeAt(seed + 1) & 255) << 8;
        case 1:
          k1 ^= key.charCodeAt(seed) & 255, k1 = 3432918353 * (k1 & 65535) + ((3432918353 * (k1 >>> 16) & 65535) << 16) & 4294967295, k1 = k1 << 15 | k1 >>> 17, h1 ^= 461845907 * (k1 & 65535) + ((461845907 * (k1 >>> 16) & 65535) << 16) & 4294967295;
      }
      h1 ^= key.length;
      h1 ^= h1 >>> 16;
      h1 = 2246822507 * (h1 & 65535) + ((2246822507 * (h1 >>> 16) & 65535) << 16) & 4294967295;
      h1 ^= h1 >>> 13;
      h1 = 3266489909 * (h1 & 65535) + ((3266489909 * (h1 >>> 16) & 65535) << 16) & 4294967295;
      return (h1 ^ h1 >>> 16) >>> 0;
    }
    var assign = Object.assign;
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var VALID_ATTRIBUTE_NAME_REGEX = RegExp(
      "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
    );
    var illegalAttributeNameCache = {};
    var validatedAttributeNameCache = {};
    function isAttributeNameSafe(attributeName) {
      if (hasOwnProperty.call(validatedAttributeNameCache, attributeName))
        return true;
      if (hasOwnProperty.call(illegalAttributeNameCache, attributeName)) return false;
      if (VALID_ATTRIBUTE_NAME_REGEX.test(attributeName))
        return validatedAttributeNameCache[attributeName] = true;
      illegalAttributeNameCache[attributeName] = true;
      return false;
    }
    var unitlessNumbers = new Set(
      "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
        " "
      )
    );
    var aliases = /* @__PURE__ */ new Map([
      ["acceptCharset", "accept-charset"],
      ["htmlFor", "for"],
      ["httpEquiv", "http-equiv"],
      ["crossOrigin", "crossorigin"],
      ["accentHeight", "accent-height"],
      ["alignmentBaseline", "alignment-baseline"],
      ["arabicForm", "arabic-form"],
      ["baselineShift", "baseline-shift"],
      ["capHeight", "cap-height"],
      ["clipPath", "clip-path"],
      ["clipRule", "clip-rule"],
      ["colorInterpolation", "color-interpolation"],
      ["colorInterpolationFilters", "color-interpolation-filters"],
      ["colorProfile", "color-profile"],
      ["colorRendering", "color-rendering"],
      ["dominantBaseline", "dominant-baseline"],
      ["enableBackground", "enable-background"],
      ["fillOpacity", "fill-opacity"],
      ["fillRule", "fill-rule"],
      ["floodColor", "flood-color"],
      ["floodOpacity", "flood-opacity"],
      ["fontFamily", "font-family"],
      ["fontSize", "font-size"],
      ["fontSizeAdjust", "font-size-adjust"],
      ["fontStretch", "font-stretch"],
      ["fontStyle", "font-style"],
      ["fontVariant", "font-variant"],
      ["fontWeight", "font-weight"],
      ["glyphName", "glyph-name"],
      ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
      ["glyphOrientationVertical", "glyph-orientation-vertical"],
      ["horizAdvX", "horiz-adv-x"],
      ["horizOriginX", "horiz-origin-x"],
      ["imageRendering", "image-rendering"],
      ["letterSpacing", "letter-spacing"],
      ["lightingColor", "lighting-color"],
      ["markerEnd", "marker-end"],
      ["markerMid", "marker-mid"],
      ["markerStart", "marker-start"],
      ["maskType", "mask-type"],
      ["overlinePosition", "overline-position"],
      ["overlineThickness", "overline-thickness"],
      ["paintOrder", "paint-order"],
      ["panose-1", "panose-1"],
      ["pointerEvents", "pointer-events"],
      ["renderingIntent", "rendering-intent"],
      ["shapeRendering", "shape-rendering"],
      ["stopColor", "stop-color"],
      ["stopOpacity", "stop-opacity"],
      ["strikethroughPosition", "strikethrough-position"],
      ["strikethroughThickness", "strikethrough-thickness"],
      ["strokeDasharray", "stroke-dasharray"],
      ["strokeDashoffset", "stroke-dashoffset"],
      ["strokeLinecap", "stroke-linecap"],
      ["strokeLinejoin", "stroke-linejoin"],
      ["strokeMiterlimit", "stroke-miterlimit"],
      ["strokeOpacity", "stroke-opacity"],
      ["strokeWidth", "stroke-width"],
      ["textAnchor", "text-anchor"],
      ["textDecoration", "text-decoration"],
      ["textRendering", "text-rendering"],
      ["transformOrigin", "transform-origin"],
      ["underlinePosition", "underline-position"],
      ["underlineThickness", "underline-thickness"],
      ["unicodeBidi", "unicode-bidi"],
      ["unicodeRange", "unicode-range"],
      ["unitsPerEm", "units-per-em"],
      ["vAlphabetic", "v-alphabetic"],
      ["vHanging", "v-hanging"],
      ["vIdeographic", "v-ideographic"],
      ["vMathematical", "v-mathematical"],
      ["vectorEffect", "vector-effect"],
      ["vertAdvY", "vert-adv-y"],
      ["vertOriginX", "vert-origin-x"],
      ["vertOriginY", "vert-origin-y"],
      ["wordSpacing", "word-spacing"],
      ["writingMode", "writing-mode"],
      ["xmlnsXlink", "xmlns:xlink"],
      ["xHeight", "x-height"]
    ]);
    var matchHtmlRegExp = /["'&<>]/;
    function escapeTextForBrowser(text) {
      if ("boolean" === typeof text || "number" === typeof text || "bigint" === typeof text)
        return "" + text;
      text = "" + text;
      var match = matchHtmlRegExp.exec(text);
      if (match) {
        var html = "", index, lastIndex = 0;
        for (index = match.index; index < text.length; index++) {
          switch (text.charCodeAt(index)) {
            case 34:
              match = "&quot;";
              break;
            case 38:
              match = "&amp;";
              break;
            case 39:
              match = "&#x27;";
              break;
            case 60:
              match = "&lt;";
              break;
            case 62:
              match = "&gt;";
              break;
            default:
              continue;
          }
          lastIndex !== index && (html += text.slice(lastIndex, index));
          lastIndex = index + 1;
          html += match;
        }
        text = lastIndex !== index ? html + text.slice(lastIndex, index) : html;
      }
      return text;
    }
    var uppercasePattern = /([A-Z])/g;
    var msPattern = /^ms-/;
    var isJavaScriptProtocol = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
    function sanitizeURL(url) {
      return isJavaScriptProtocol.test("" + url) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : url;
    }
    var ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
    var ReactDOMSharedInternals = ReactDOM.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
    var sharedNotPendingObject = {
      pending: false,
      data: null,
      method: null,
      action: null
    };
    var previousDispatcher = ReactDOMSharedInternals.d;
    ReactDOMSharedInternals.d = {
      f: previousDispatcher.f,
      r: previousDispatcher.r,
      D: prefetchDNS,
      C: preconnect,
      L: preload,
      m: preloadModule,
      X: preinitScript,
      S: preinitStyle,
      M: preinitModuleScript
    };
    var PRELOAD_NO_CREDS = [];
    var currentlyFlushingRenderState = null;
    var scriptRegex = /(<\/|<)(s)(cript)/gi;
    function scriptReplacer(match, prefix2, s, suffix2) {
      return "" + prefix2 + ("s" === s ? "\\u0073" : "\\u0053") + suffix2;
    }
    function createResumableState(identifierPrefix, externalRuntimeConfig, bootstrapScriptContent, bootstrapScripts, bootstrapModules) {
      return {
        idPrefix: void 0 === identifierPrefix ? "" : identifierPrefix,
        nextFormID: 0,
        streamingFormat: 0,
        bootstrapScriptContent,
        bootstrapScripts,
        bootstrapModules,
        instructions: 0,
        hasBody: false,
        hasHtml: false,
        unknownResources: {},
        dnsResources: {},
        connectResources: { default: {}, anonymous: {}, credentials: {} },
        imageResources: {},
        styleResources: {},
        scriptResources: {},
        moduleUnknownResources: {},
        moduleScriptResources: {}
      };
    }
    function createFormatContext(insertionMode, selectedValue, tagScope, viewTransition) {
      return {
        insertionMode,
        selectedValue,
        tagScope,
        viewTransition
      };
    }
    function getChildFormatContext(parentContext, type, props) {
      var subtreeScope = parentContext.tagScope & -25;
      switch (type) {
        case "noscript":
          return createFormatContext(2, null, subtreeScope | 1, null);
        case "select":
          return createFormatContext(
            2,
            null != props.value ? props.value : props.defaultValue,
            subtreeScope,
            null
          );
        case "svg":
          return createFormatContext(4, null, subtreeScope, null);
        case "picture":
          return createFormatContext(2, null, subtreeScope | 2, null);
        case "math":
          return createFormatContext(5, null, subtreeScope, null);
        case "foreignObject":
          return createFormatContext(2, null, subtreeScope, null);
        case "table":
          return createFormatContext(6, null, subtreeScope, null);
        case "thead":
        case "tbody":
        case "tfoot":
          return createFormatContext(7, null, subtreeScope, null);
        case "colgroup":
          return createFormatContext(9, null, subtreeScope, null);
        case "tr":
          return createFormatContext(8, null, subtreeScope, null);
        case "head":
          if (2 > parentContext.insertionMode)
            return createFormatContext(3, null, subtreeScope, null);
          break;
        case "html":
          if (0 === parentContext.insertionMode)
            return createFormatContext(1, null, subtreeScope, null);
      }
      return 6 <= parentContext.insertionMode || 2 > parentContext.insertionMode ? createFormatContext(2, null, subtreeScope, null) : null !== parentContext.viewTransition || parentContext.tagScope !== subtreeScope ? createFormatContext(
        parentContext.insertionMode,
        parentContext.selectedValue,
        subtreeScope,
        null
      ) : parentContext;
    }
    function getSuspenseViewTransition(parentViewTransition) {
      return null === parentViewTransition ? null : {
        update: parentViewTransition.update,
        enter: "none",
        exit: "none",
        share: parentViewTransition.update,
        parentEnter: "none",
        parentExit: "none",
        name: parentViewTransition.autoName,
        autoName: parentViewTransition.autoName,
        nameIdx: 0
      };
    }
    function getSuspenseFallbackFormatContext(resumableState, parentContext) {
      parentContext.tagScope & 32 && (resumableState.instructions |= 128);
      return createFormatContext(
        parentContext.insertionMode,
        parentContext.selectedValue,
        parentContext.tagScope | 12,
        getSuspenseViewTransition(parentContext.viewTransition)
      );
    }
    function getSuspenseContentFormatContext(resumableState, parentContext) {
      resumableState = getSuspenseViewTransition(parentContext.viewTransition);
      var subtreeScope = parentContext.tagScope | 16;
      null !== resumableState && "none" !== resumableState.share && (subtreeScope |= 64);
      return createFormatContext(
        parentContext.insertionMode,
        parentContext.selectedValue,
        subtreeScope,
        resumableState
      );
    }
    function makeId(resumableState, treeId, localId) {
      resumableState = "_" + resumableState.idPrefix + "R_" + treeId;
      0 < localId && (resumableState += "H" + localId.toString(32));
      return resumableState + "_";
    }
    function pushViewTransitionAttributes(target, formatContext) {
      formatContext = formatContext.viewTransition;
      null !== formatContext && ("auto" !== formatContext.name && (pushStringAttribute(
        target,
        "vt-name",
        0 === formatContext.nameIdx ? formatContext.name : formatContext.name + "_" + formatContext.nameIdx
      ), formatContext.nameIdx++), pushStringAttribute(target, "vt-update", formatContext.update), "none" !== formatContext.enter && pushStringAttribute(target, "vt-enter", formatContext.enter), "none" !== formatContext.exit && pushStringAttribute(target, "vt-exit", formatContext.exit), "none" !== formatContext.share && pushStringAttribute(target, "vt-share", formatContext.share));
    }
    var styleNameCache = /* @__PURE__ */ new Map();
    function pushStyleAttribute(target, style) {
      if ("object" !== typeof style)
        throw Error(
          "The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX."
        );
      var isFirst = true, styleName;
      for (styleName in style)
        if (hasOwnProperty.call(style, styleName)) {
          var styleValue = style[styleName];
          if (null != styleValue && "boolean" !== typeof styleValue && "" !== styleValue) {
            if (0 === styleName.indexOf("--")) {
              var nameChunk = escapeTextForBrowser(styleName);
              styleValue = escapeTextForBrowser(("" + styleValue).trim());
            } else
              nameChunk = styleNameCache.get(styleName), void 0 === nameChunk && (nameChunk = escapeTextForBrowser(
                styleName.replace(uppercasePattern, "-$1").toLowerCase().replace(msPattern, "-ms-")
              ), styleNameCache.set(styleName, nameChunk)), styleValue = "number" === typeof styleValue ? 0 === styleValue || unitlessNumbers.has(styleName) ? "" + styleValue : styleValue + "px" : escapeTextForBrowser(("" + styleValue).trim());
            isFirst ? (isFirst = false, target.push(' style="', nameChunk, ":", styleValue)) : target.push(";", nameChunk, ":", styleValue);
          }
        }
      isFirst || target.push('"');
    }
    function pushBooleanAttribute(target, name, value) {
      value && "function" !== typeof value && "symbol" !== typeof value && target.push(" ", name, '=""');
    }
    function pushStringAttribute(target, name, value) {
      "function" !== typeof value && "symbol" !== typeof value && "boolean" !== typeof value && target.push(" ", name, '="', escapeTextForBrowser(value), '"');
    }
    var actionJavaScriptURL = escapeTextForBrowser(
      "javascript:throw new Error('React form unexpectedly submitted.')"
    );
    function pushAdditionalFormField(value, key) {
      this.push('<input type="hidden"');
      validateAdditionalFormField(value);
      pushStringAttribute(this, "name", key);
      pushStringAttribute(this, "value", value);
      this.push("/>");
    }
    function validateAdditionalFormField(value) {
      if ("string" !== typeof value)
        throw Error(
          "File/Blob fields are not yet supported in progressive forms. Will fallback to client hydration."
        );
    }
    function getCustomFormFields(resumableState, formAction) {
      if ("function" === typeof formAction.$$FORM_ACTION) {
        var id = resumableState.nextFormID++;
        resumableState = resumableState.idPrefix + id;
        try {
          var customFields = formAction.$$FORM_ACTION(resumableState);
          if (customFields) {
            var formData = customFields.data;
            null != formData && formData.forEach(validateAdditionalFormField);
          }
          return customFields;
        } catch (x) {
          if ("object" === typeof x && null !== x && "function" === typeof x.then)
            throw x;
        }
      }
      return null;
    }
    function pushFormActionAttribute(target, resumableState, renderState, formAction, formEncType, formMethod, formTarget, name) {
      var formData = null;
      if ("function" === typeof formAction) {
        var customFields = getCustomFormFields(resumableState, formAction);
        null !== customFields ? (name = customFields.name, formAction = customFields.action || "", formEncType = customFields.encType, formMethod = customFields.method, formTarget = customFields.target, formData = customFields.data) : (target.push(" ", "formAction", '="', actionJavaScriptURL, '"'), formTarget = formMethod = formEncType = formAction = name = null, injectFormReplayingRuntime(resumableState, renderState));
      }
      null != name && pushAttribute(target, "name", name);
      null != formAction && pushAttribute(target, "formAction", formAction);
      null != formEncType && pushAttribute(target, "formEncType", formEncType);
      null != formMethod && pushAttribute(target, "formMethod", formMethod);
      null != formTarget && pushAttribute(target, "formTarget", formTarget);
      return formData;
    }
    function pushAttribute(target, name, value) {
      switch (name) {
        case "className":
          pushStringAttribute(target, "class", value);
          break;
        case "tabIndex":
          pushStringAttribute(target, "tabindex", value);
          break;
        case "dir":
        case "role":
        case "viewBox":
        case "width":
        case "height":
          pushStringAttribute(target, name, value);
          break;
        case "style":
          pushStyleAttribute(target, value);
          break;
        case "src":
        case "href":
          if ("" === value) break;
        case "action":
        case "formAction":
          if (null == value || "function" === typeof value || "symbol" === typeof value || "boolean" === typeof value)
            break;
          value = sanitizeURL("" + value);
          target.push(" ", name, '="', escapeTextForBrowser(value), '"');
          break;
        case "defaultValue":
        case "defaultChecked":
        case "innerHTML":
        case "suppressContentEditableWarning":
        case "suppressHydrationWarning":
        case "ref":
          break;
        case "autoFocus":
        case "multiple":
        case "muted":
          pushBooleanAttribute(target, name.toLowerCase(), value);
          break;
        case "xlinkHref":
          if ("function" === typeof value || "symbol" === typeof value || "boolean" === typeof value)
            break;
          value = sanitizeURL("" + value);
          target.push(" ", "xlink:href", '="', escapeTextForBrowser(value), '"');
          break;
        case "contentEditable":
        case "spellCheck":
        case "draggable":
        case "value":
        case "autoReverse":
        case "externalResourcesRequired":
        case "focusable":
        case "preserveAlpha":
          "function" !== typeof value && "symbol" !== typeof value && target.push(" ", name, '="', escapeTextForBrowser(value), '"');
          break;
        case "inert":
        case "allowFullScreen":
        case "async":
        case "autoPlay":
        case "controls":
        case "credentialless":
        case "default":
        case "defer":
        case "disabled":
        case "disablePictureInPicture":
        case "disableRemotePlayback":
        case "formNoValidate":
        case "hidden":
        case "loop":
        case "noModule":
        case "noValidate":
        case "open":
        case "playsInline":
        case "readOnly":
        case "required":
        case "reversed":
        case "scoped":
        case "seamless":
        case "itemScope":
          value && "function" !== typeof value && "symbol" !== typeof value && target.push(" ", name, '=""');
          break;
        case "capture":
        case "download":
          true === value ? target.push(" ", name, '=""') : false !== value && "function" !== typeof value && "symbol" !== typeof value && target.push(" ", name, '="', escapeTextForBrowser(value), '"');
          break;
        case "cols":
        case "rows":
        case "size":
        case "span":
          "function" !== typeof value && "symbol" !== typeof value && !isNaN(value) && 1 <= value && target.push(" ", name, '="', escapeTextForBrowser(value), '"');
          break;
        case "rowSpan":
        case "start":
          "function" === typeof value || "symbol" === typeof value || isNaN(value) || target.push(" ", name, '="', escapeTextForBrowser(value), '"');
          break;
        case "xlinkActuate":
          pushStringAttribute(target, "xlink:actuate", value);
          break;
        case "xlinkArcrole":
          pushStringAttribute(target, "xlink:arcrole", value);
          break;
        case "xlinkRole":
          pushStringAttribute(target, "xlink:role", value);
          break;
        case "xlinkShow":
          pushStringAttribute(target, "xlink:show", value);
          break;
        case "xlinkTitle":
          pushStringAttribute(target, "xlink:title", value);
          break;
        case "xlinkType":
          pushStringAttribute(target, "xlink:type", value);
          break;
        case "xmlBase":
          pushStringAttribute(target, "xml:base", value);
          break;
        case "xmlLang":
          pushStringAttribute(target, "xml:lang", value);
          break;
        case "xmlSpace":
          pushStringAttribute(target, "xml:space", value);
          break;
        default:
          if (!(2 < name.length) || "o" !== name[0] && "O" !== name[0] || "n" !== name[1] && "N" !== name[1]) {
            if (name = aliases.get(name) || name, isAttributeNameSafe(name)) {
              switch (typeof value) {
                case "function":
                case "symbol":
                  return;
                case "boolean":
                  var prefix$8 = name.toLowerCase().slice(0, 5);
                  if ("data-" !== prefix$8 && "aria-" !== prefix$8) return;
              }
              target.push(" ", name, '="', escapeTextForBrowser(value), '"');
            }
          }
      }
    }
    function pushInnerHTML(target, innerHTML, children) {
      if (null != innerHTML) {
        if (null != children)
          throw Error(
            "Can only set one of `children` or `props.dangerouslySetInnerHTML`."
          );
        if ("object" !== typeof innerHTML || !("__html" in innerHTML))
          throw Error(
            "`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://react.dev/link/dangerously-set-inner-html for more information."
          );
        innerHTML = innerHTML.__html;
        null !== innerHTML && void 0 !== innerHTML && target.push("" + innerHTML);
      }
    }
    function flattenOptionChildren(children) {
      var content = "";
      React.Children.forEach(children, function(child) {
        null != child && (content += child);
      });
      return content;
    }
    function injectFormReplayingRuntime(resumableState, renderState) {
      if (0 === (resumableState.instructions & 16)) {
        resumableState.instructions |= 16;
        var preamble = renderState.preamble, bootstrapChunks = renderState.bootstrapChunks;
        (preamble.htmlChunks || preamble.headChunks) && 0 === bootstrapChunks.length ? (bootstrapChunks.push(renderState.startInlineScript), pushCompletedShellIdAttribute(bootstrapChunks, resumableState), bootstrapChunks.push(
          ">",
          `addEventListener("submit",function(a){if(!a.defaultPrevented){var b=a.target,d=a.submitter,c=b.action,e=d;if(d){var f=d.getAttribute("formAction");null!=f&&(c=f,e=null)}"javascript:throw new Error('React form unexpectedly submitted.')"===c&&(a.preventDefault(),a=new FormData(b,e),c=b.ownerDocument||b,(c.$$reactFormReplay=c.$$reactFormReplay||[]).push(b,d,a))}});`,
          "</script>"
        )) : bootstrapChunks.unshift(
          renderState.startInlineScript,
          ">",
          `addEventListener("submit",function(a){if(!a.defaultPrevented){var b=a.target,d=a.submitter,c=b.action,e=d;if(d){var f=d.getAttribute("formAction");null!=f&&(c=f,e=null)}"javascript:throw new Error('React form unexpectedly submitted.')"===c&&(a.preventDefault(),a=new FormData(b,e),c=b.ownerDocument||b,(c.$$reactFormReplay=c.$$reactFormReplay||[]).push(b,d,a))}});`,
          "</script>"
        );
      }
    }
    function pushLinkImpl(target, props) {
      target.push(startChunkForTag("link"));
      for (var propKey in props)
        if (hasOwnProperty.call(props, propKey)) {
          var propValue = props[propKey];
          if (null != propValue)
            switch (propKey) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(
                  "link is a self-closing tag and must neither have `children` nor use `dangerouslySetInnerHTML`."
                );
              default:
                pushAttribute(target, propKey, propValue);
            }
        }
      target.push("/>");
      return null;
    }
    var styleRegex = /(<\/|<)(s)(tyle)/gi;
    function styleReplacer(match, prefix2, s, suffix2) {
      return "" + prefix2 + ("s" === s ? "\\73 " : "\\53 ") + suffix2;
    }
    function pushSelfClosing(target, props, tag, formatContext) {
      target.push(startChunkForTag(tag));
      for (var propKey in props)
        if (hasOwnProperty.call(props, propKey)) {
          var propValue = props[propKey];
          if (null != propValue)
            switch (propKey) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(
                  tag + " is a self-closing tag and must neither have `children` nor use `dangerouslySetInnerHTML`."
                );
              default:
                pushAttribute(target, propKey, propValue);
            }
        }
      pushViewTransitionAttributes(target, formatContext);
      target.push("/>");
      return null;
    }
    function pushTitleImpl(target, props) {
      target.push(startChunkForTag("title"));
      var children = null, innerHTML = null, propKey;
      for (propKey in props)
        if (hasOwnProperty.call(props, propKey)) {
          var propValue = props[propKey];
          if (null != propValue)
            switch (propKey) {
              case "children":
                children = propValue;
                break;
              case "dangerouslySetInnerHTML":
                innerHTML = propValue;
                break;
              default:
                pushAttribute(target, propKey, propValue);
            }
        }
      target.push(">");
      props = Array.isArray(children) ? 2 > children.length ? children[0] : null : children;
      "function" !== typeof props && "symbol" !== typeof props && null !== props && void 0 !== props && target.push(escapeTextForBrowser("" + props));
      pushInnerHTML(target, innerHTML, children);
      target.push(endChunkForTag("title"));
      return null;
    }
    function pushScriptImpl(target, props) {
      target.push(startChunkForTag("script"));
      var children = null, innerHTML = null, propKey;
      for (propKey in props)
        if (hasOwnProperty.call(props, propKey)) {
          var propValue = props[propKey];
          if (null != propValue)
            switch (propKey) {
              case "children":
                children = propValue;
                break;
              case "dangerouslySetInnerHTML":
                innerHTML = propValue;
                break;
              default:
                pushAttribute(target, propKey, propValue);
            }
        }
      target.push(">");
      pushInnerHTML(target, innerHTML, children);
      "string" === typeof children && target.push(("" + children).replace(scriptRegex, scriptReplacer));
      target.push(endChunkForTag("script"));
      return null;
    }
    function pushStartSingletonElement(target, props, tag, formatContext) {
      target.push(startChunkForTag(tag));
      var innerHTML = tag = null, propKey;
      for (propKey in props)
        if (hasOwnProperty.call(props, propKey)) {
          var propValue = props[propKey];
          if (null != propValue)
            switch (propKey) {
              case "children":
                tag = propValue;
                break;
              case "dangerouslySetInnerHTML":
                innerHTML = propValue;
                break;
              default:
                pushAttribute(target, propKey, propValue);
            }
        }
      pushViewTransitionAttributes(target, formatContext);
      target.push(">");
      pushInnerHTML(target, innerHTML, tag);
      return tag;
    }
    function pushStartGenericElement(target, props, tag, formatContext) {
      target.push(startChunkForTag(tag));
      var innerHTML = tag = null, propKey;
      for (propKey in props)
        if (hasOwnProperty.call(props, propKey)) {
          var propValue = props[propKey];
          if (null != propValue)
            switch (propKey) {
              case "children":
                tag = propValue;
                break;
              case "dangerouslySetInnerHTML":
                innerHTML = propValue;
                break;
              default:
                pushAttribute(target, propKey, propValue);
            }
        }
      pushViewTransitionAttributes(target, formatContext);
      target.push(">");
      pushInnerHTML(target, innerHTML, tag);
      return "string" === typeof tag ? (target.push(escapeTextForBrowser(tag)), null) : tag;
    }
    var VALID_TAG_REGEX = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/;
    var validatedTagCache = /* @__PURE__ */ new Map();
    function startChunkForTag(tag) {
      var tagStartChunk = validatedTagCache.get(tag);
      if (void 0 === tagStartChunk) {
        if (!VALID_TAG_REGEX.test(tag)) throw Error("Invalid tag: " + tag);
        tagStartChunk = "<" + tag;
        validatedTagCache.set(tag, tagStartChunk);
      }
      return tagStartChunk;
    }
    function pushStartInstance(target$jscomp$0, type, props, resumableState, renderState, preambleState, hoistableState, formatContext, textEmbedded) {
      switch (type) {
        case "div":
        case "span":
        case "svg":
        case "path":
          break;
        case "a":
          target$jscomp$0.push(startChunkForTag("a"));
          var children = null, innerHTML = null, propKey;
          for (propKey in props)
            if (hasOwnProperty.call(props, propKey)) {
              var propValue = props[propKey];
              if (null != propValue)
                switch (propKey) {
                  case "children":
                    children = propValue;
                    break;
                  case "dangerouslySetInnerHTML":
                    innerHTML = propValue;
                    break;
                  case "href":
                    "" === propValue ? pushStringAttribute(target$jscomp$0, "href", "") : pushAttribute(target$jscomp$0, propKey, propValue);
                    break;
                  default:
                    pushAttribute(target$jscomp$0, propKey, propValue);
                }
            }
          pushViewTransitionAttributes(target$jscomp$0, formatContext);
          target$jscomp$0.push(">");
          pushInnerHTML(target$jscomp$0, innerHTML, children);
          if ("string" === typeof children) {
            target$jscomp$0.push(escapeTextForBrowser(children));
            var JSCompiler_inline_result = null;
          } else JSCompiler_inline_result = children;
          return JSCompiler_inline_result;
        case "g":
        case "p":
        case "li":
          break;
        case "select":
          target$jscomp$0.push(startChunkForTag("select"));
          var children$jscomp$0 = null, innerHTML$jscomp$0 = null, propKey$jscomp$0;
          for (propKey$jscomp$0 in props)
            if (hasOwnProperty.call(props, propKey$jscomp$0)) {
              var propValue$jscomp$0 = props[propKey$jscomp$0];
              if (null != propValue$jscomp$0)
                switch (propKey$jscomp$0) {
                  case "children":
                    children$jscomp$0 = propValue$jscomp$0;
                    break;
                  case "dangerouslySetInnerHTML":
                    innerHTML$jscomp$0 = propValue$jscomp$0;
                    break;
                  case "defaultValue":
                  case "value":
                    break;
                  default:
                    pushAttribute(
                      target$jscomp$0,
                      propKey$jscomp$0,
                      propValue$jscomp$0
                    );
                }
            }
          pushViewTransitionAttributes(target$jscomp$0, formatContext);
          target$jscomp$0.push(">");
          pushInnerHTML(target$jscomp$0, innerHTML$jscomp$0, children$jscomp$0);
          return children$jscomp$0;
        case "option":
          var selectedValue = formatContext.selectedValue;
          target$jscomp$0.push(startChunkForTag("option"));
          var children$jscomp$1 = null, value = null, selected = null, innerHTML$jscomp$1 = null, propKey$jscomp$1;
          for (propKey$jscomp$1 in props)
            if (hasOwnProperty.call(props, propKey$jscomp$1)) {
              var propValue$jscomp$1 = props[propKey$jscomp$1];
              if (null != propValue$jscomp$1)
                switch (propKey$jscomp$1) {
                  case "children":
                    children$jscomp$1 = propValue$jscomp$1;
                    break;
                  case "selected":
                    selected = propValue$jscomp$1;
                    break;
                  case "dangerouslySetInnerHTML":
                    innerHTML$jscomp$1 = propValue$jscomp$1;
                    break;
                  case "value":
                    value = propValue$jscomp$1;
                  default:
                    pushAttribute(
                      target$jscomp$0,
                      propKey$jscomp$1,
                      propValue$jscomp$1
                    );
                }
            }
          if (null != selectedValue) {
            var stringValue = null !== value ? "" + value : flattenOptionChildren(children$jscomp$1);
            if (isArrayImpl(selectedValue))
              for (var i = 0; i < selectedValue.length; i++) {
                if ("" + selectedValue[i] === stringValue) {
                  target$jscomp$0.push(' selected=""');
                  break;
                }
              }
            else
              "" + selectedValue === stringValue && target$jscomp$0.push(' selected=""');
          } else selected && target$jscomp$0.push(' selected=""');
          target$jscomp$0.push(">");
          pushInnerHTML(target$jscomp$0, innerHTML$jscomp$1, children$jscomp$1);
          return children$jscomp$1;
        case "textarea":
          target$jscomp$0.push(startChunkForTag("textarea"));
          var value$jscomp$0 = null, defaultValue = null, children$jscomp$2 = null, propKey$jscomp$2;
          for (propKey$jscomp$2 in props)
            if (hasOwnProperty.call(props, propKey$jscomp$2)) {
              var propValue$jscomp$2 = props[propKey$jscomp$2];
              if (null != propValue$jscomp$2)
                switch (propKey$jscomp$2) {
                  case "children":
                    children$jscomp$2 = propValue$jscomp$2;
                    break;
                  case "value":
                    value$jscomp$0 = propValue$jscomp$2;
                    break;
                  case "defaultValue":
                    defaultValue = propValue$jscomp$2;
                    break;
                  case "dangerouslySetInnerHTML":
                    throw Error(
                      "`dangerouslySetInnerHTML` does not make sense on <textarea>."
                    );
                  default:
                    pushAttribute(
                      target$jscomp$0,
                      propKey$jscomp$2,
                      propValue$jscomp$2
                    );
                }
            }
          null === value$jscomp$0 && null !== defaultValue && (value$jscomp$0 = defaultValue);
          pushViewTransitionAttributes(target$jscomp$0, formatContext);
          target$jscomp$0.push(">");
          if (null != children$jscomp$2) {
            if (null != value$jscomp$0)
              throw Error(
                "If you supply `defaultValue` on a <textarea>, do not pass children."
              );
            if (isArrayImpl(children$jscomp$2)) {
              if (1 < children$jscomp$2.length)
                throw Error("<textarea> can only have at most one child.");
              value$jscomp$0 = "" + children$jscomp$2[0];
            }
            value$jscomp$0 = "" + children$jscomp$2;
          }
          "string" === typeof value$jscomp$0 && "\n" === value$jscomp$0[0] && target$jscomp$0.push("\n");
          null !== value$jscomp$0 && target$jscomp$0.push(escapeTextForBrowser("" + value$jscomp$0));
          return null;
        case "input":
          target$jscomp$0.push(startChunkForTag("input"));
          var name = null, formAction = null, formEncType = null, formMethod = null, formTarget = null, value$jscomp$1 = null, defaultValue$jscomp$0 = null, checked = null, defaultChecked = null, propKey$jscomp$3;
          for (propKey$jscomp$3 in props)
            if (hasOwnProperty.call(props, propKey$jscomp$3)) {
              var propValue$jscomp$3 = props[propKey$jscomp$3];
              if (null != propValue$jscomp$3)
                switch (propKey$jscomp$3) {
                  case "children":
                  case "dangerouslySetInnerHTML":
                    throw Error(
                      "input is a self-closing tag and must neither have `children` nor use `dangerouslySetInnerHTML`."
                    );
                  case "name":
                    name = propValue$jscomp$3;
                    break;
                  case "formAction":
                    formAction = propValue$jscomp$3;
                    break;
                  case "formEncType":
                    formEncType = propValue$jscomp$3;
                    break;
                  case "formMethod":
                    formMethod = propValue$jscomp$3;
                    break;
                  case "formTarget":
                    formTarget = propValue$jscomp$3;
                    break;
                  case "defaultChecked":
                    defaultChecked = propValue$jscomp$3;
                    break;
                  case "defaultValue":
                    defaultValue$jscomp$0 = propValue$jscomp$3;
                    break;
                  case "checked":
                    checked = propValue$jscomp$3;
                    break;
                  case "value":
                    value$jscomp$1 = propValue$jscomp$3;
                    break;
                  default:
                    pushAttribute(
                      target$jscomp$0,
                      propKey$jscomp$3,
                      propValue$jscomp$3
                    );
                }
            }
          var formData = pushFormActionAttribute(
            target$jscomp$0,
            resumableState,
            renderState,
            formAction,
            formEncType,
            formMethod,
            formTarget,
            name
          );
          null !== checked ? pushBooleanAttribute(target$jscomp$0, "checked", checked) : null !== defaultChecked && pushBooleanAttribute(target$jscomp$0, "checked", defaultChecked);
          null !== value$jscomp$1 ? pushAttribute(target$jscomp$0, "value", value$jscomp$1) : null !== defaultValue$jscomp$0 && pushAttribute(target$jscomp$0, "value", defaultValue$jscomp$0);
          pushViewTransitionAttributes(target$jscomp$0, formatContext);
          target$jscomp$0.push("/>");
          null != formData && formData.forEach(pushAdditionalFormField, target$jscomp$0);
          return null;
        case "button":
          target$jscomp$0.push(startChunkForTag("button"));
          var children$jscomp$3 = null, innerHTML$jscomp$2 = null, name$jscomp$0 = null, formAction$jscomp$0 = null, formEncType$jscomp$0 = null, formMethod$jscomp$0 = null, formTarget$jscomp$0 = null, propKey$jscomp$4;
          for (propKey$jscomp$4 in props)
            if (hasOwnProperty.call(props, propKey$jscomp$4)) {
              var propValue$jscomp$4 = props[propKey$jscomp$4];
              if (null != propValue$jscomp$4)
                switch (propKey$jscomp$4) {
                  case "children":
                    children$jscomp$3 = propValue$jscomp$4;
                    break;
                  case "dangerouslySetInnerHTML":
                    innerHTML$jscomp$2 = propValue$jscomp$4;
                    break;
                  case "name":
                    name$jscomp$0 = propValue$jscomp$4;
                    break;
                  case "formAction":
                    formAction$jscomp$0 = propValue$jscomp$4;
                    break;
                  case "formEncType":
                    formEncType$jscomp$0 = propValue$jscomp$4;
                    break;
                  case "formMethod":
                    formMethod$jscomp$0 = propValue$jscomp$4;
                    break;
                  case "formTarget":
                    formTarget$jscomp$0 = propValue$jscomp$4;
                    break;
                  default:
                    pushAttribute(
                      target$jscomp$0,
                      propKey$jscomp$4,
                      propValue$jscomp$4
                    );
                }
            }
          var formData$jscomp$0 = pushFormActionAttribute(
            target$jscomp$0,
            resumableState,
            renderState,
            formAction$jscomp$0,
            formEncType$jscomp$0,
            formMethod$jscomp$0,
            formTarget$jscomp$0,
            name$jscomp$0
          );
          pushViewTransitionAttributes(target$jscomp$0, formatContext);
          target$jscomp$0.push(">");
          null != formData$jscomp$0 && formData$jscomp$0.forEach(pushAdditionalFormField, target$jscomp$0);
          pushInnerHTML(target$jscomp$0, innerHTML$jscomp$2, children$jscomp$3);
          if ("string" === typeof children$jscomp$3) {
            target$jscomp$0.push(escapeTextForBrowser(children$jscomp$3));
            var JSCompiler_inline_result$jscomp$0 = null;
          } else JSCompiler_inline_result$jscomp$0 = children$jscomp$3;
          return JSCompiler_inline_result$jscomp$0;
        case "form":
          target$jscomp$0.push(startChunkForTag("form"));
          var children$jscomp$4 = null, innerHTML$jscomp$3 = null, formAction$jscomp$1 = null, formEncType$jscomp$1 = null, formMethod$jscomp$1 = null, formTarget$jscomp$1 = null, propKey$jscomp$5;
          for (propKey$jscomp$5 in props)
            if (hasOwnProperty.call(props, propKey$jscomp$5)) {
              var propValue$jscomp$5 = props[propKey$jscomp$5];
              if (null != propValue$jscomp$5)
                switch (propKey$jscomp$5) {
                  case "children":
                    children$jscomp$4 = propValue$jscomp$5;
                    break;
                  case "dangerouslySetInnerHTML":
                    innerHTML$jscomp$3 = propValue$jscomp$5;
                    break;
                  case "action":
                    formAction$jscomp$1 = propValue$jscomp$5;
                    break;
                  case "encType":
                    formEncType$jscomp$1 = propValue$jscomp$5;
                    break;
                  case "method":
                    formMethod$jscomp$1 = propValue$jscomp$5;
                    break;
                  case "target":
                    formTarget$jscomp$1 = propValue$jscomp$5;
                    break;
                  default:
                    pushAttribute(
                      target$jscomp$0,
                      propKey$jscomp$5,
                      propValue$jscomp$5
                    );
                }
            }
          var formData$jscomp$1 = null, formActionName = null;
          if ("function" === typeof formAction$jscomp$1) {
            var customFields = getCustomFormFields(
              resumableState,
              formAction$jscomp$1
            );
            null !== customFields ? (formAction$jscomp$1 = customFields.action || "", formEncType$jscomp$1 = customFields.encType, formMethod$jscomp$1 = customFields.method, formTarget$jscomp$1 = customFields.target, formData$jscomp$1 = customFields.data, formActionName = customFields.name) : (target$jscomp$0.push(
              " ",
              "action",
              '="',
              actionJavaScriptURL,
              '"'
            ), formTarget$jscomp$1 = formMethod$jscomp$1 = formEncType$jscomp$1 = formAction$jscomp$1 = null, injectFormReplayingRuntime(resumableState, renderState));
          }
          null != formAction$jscomp$1 && pushAttribute(target$jscomp$0, "action", formAction$jscomp$1);
          null != formEncType$jscomp$1 && pushAttribute(target$jscomp$0, "encType", formEncType$jscomp$1);
          null != formMethod$jscomp$1 && pushAttribute(target$jscomp$0, "method", formMethod$jscomp$1);
          null != formTarget$jscomp$1 && pushAttribute(target$jscomp$0, "target", formTarget$jscomp$1);
          pushViewTransitionAttributes(target$jscomp$0, formatContext);
          target$jscomp$0.push(">");
          null !== formActionName && (target$jscomp$0.push('<input type="hidden"'), pushStringAttribute(target$jscomp$0, "name", formActionName), target$jscomp$0.push("/>"), null != formData$jscomp$1 && formData$jscomp$1.forEach(pushAdditionalFormField, target$jscomp$0));
          pushInnerHTML(target$jscomp$0, innerHTML$jscomp$3, children$jscomp$4);
          if ("string" === typeof children$jscomp$4) {
            target$jscomp$0.push(escapeTextForBrowser(children$jscomp$4));
            var JSCompiler_inline_result$jscomp$1 = null;
          } else JSCompiler_inline_result$jscomp$1 = children$jscomp$4;
          return JSCompiler_inline_result$jscomp$1;
        case "menuitem":
          target$jscomp$0.push(startChunkForTag("menuitem"));
          for (var propKey$jscomp$6 in props)
            if (hasOwnProperty.call(props, propKey$jscomp$6)) {
              var propValue$jscomp$6 = props[propKey$jscomp$6];
              if (null != propValue$jscomp$6)
                switch (propKey$jscomp$6) {
                  case "children":
                  case "dangerouslySetInnerHTML":
                    throw Error(
                      "menuitems cannot have `children` nor `dangerouslySetInnerHTML`."
                    );
                  default:
                    pushAttribute(
                      target$jscomp$0,
                      propKey$jscomp$6,
                      propValue$jscomp$6
                    );
                }
            }
          pushViewTransitionAttributes(target$jscomp$0, formatContext);
          target$jscomp$0.push(">");
          return null;
        case "object":
          target$jscomp$0.push(startChunkForTag("object"));
          var children$jscomp$5 = null, innerHTML$jscomp$4 = null, propKey$jscomp$7;
          for (propKey$jscomp$7 in props)
            if (hasOwnProperty.call(props, propKey$jscomp$7)) {
              var propValue$jscomp$7 = props[propKey$jscomp$7];
              if (null != propValue$jscomp$7)
                switch (propKey$jscomp$7) {
                  case "children":
                    children$jscomp$5 = propValue$jscomp$7;
                    break;
                  case "dangerouslySetInnerHTML":
                    innerHTML$jscomp$4 = propValue$jscomp$7;
                    break;
                  case "data":
                    var sanitizedValue = sanitizeURL("" + propValue$jscomp$7);
                    if ("" === sanitizedValue) break;
                    target$jscomp$0.push(
                      " ",
                      "data",
                      '="',
                      escapeTextForBrowser(sanitizedValue),
                      '"'
                    );
                    break;
                  default:
                    pushAttribute(
                      target$jscomp$0,
                      propKey$jscomp$7,
                      propValue$jscomp$7
                    );
                }
            }
          pushViewTransitionAttributes(target$jscomp$0, formatContext);
          target$jscomp$0.push(">");
          pushInnerHTML(target$jscomp$0, innerHTML$jscomp$4, children$jscomp$5);
          if ("string" === typeof children$jscomp$5) {
            target$jscomp$0.push(escapeTextForBrowser(children$jscomp$5));
            var JSCompiler_inline_result$jscomp$2 = null;
          } else JSCompiler_inline_result$jscomp$2 = children$jscomp$5;
          return JSCompiler_inline_result$jscomp$2;
        case "title":
          var noscriptTagInScope = formatContext.tagScope & 1, isFallback = formatContext.tagScope & 4;
          if (4 === formatContext.insertionMode || noscriptTagInScope || null != props.itemProp)
            var JSCompiler_inline_result$jscomp$3 = pushTitleImpl(
              target$jscomp$0,
              props
            );
          else
            isFallback ? JSCompiler_inline_result$jscomp$3 = null : (pushTitleImpl(renderState.hoistableChunks, props), JSCompiler_inline_result$jscomp$3 = void 0);
          return JSCompiler_inline_result$jscomp$3;
        case "link":
          var noscriptTagInScope$jscomp$0 = formatContext.tagScope & 1, isFallback$jscomp$0 = formatContext.tagScope & 4, rel = props.rel, href = props.href, precedence = props.precedence;
          if (4 === formatContext.insertionMode || noscriptTagInScope$jscomp$0 || null != props.itemProp || "string" !== typeof rel || "string" !== typeof href || "" === href) {
            pushLinkImpl(target$jscomp$0, props);
            var JSCompiler_inline_result$jscomp$4 = null;
          } else if ("stylesheet" === props.rel)
            if ("string" !== typeof precedence || null != props.disabled || props.onLoad || props.onError)
              JSCompiler_inline_result$jscomp$4 = pushLinkImpl(
                target$jscomp$0,
                props
              );
            else {
              var styleQueue = renderState.styles.get(precedence), resourceState = resumableState.styleResources.hasOwnProperty(href) ? resumableState.styleResources[href] : void 0;
              if (null !== resourceState) {
                resumableState.styleResources[href] = null;
                styleQueue || (styleQueue = {
                  precedence: escapeTextForBrowser(precedence),
                  rules: [],
                  hrefs: [],
                  sheets: /* @__PURE__ */ new Map()
                }, renderState.styles.set(precedence, styleQueue));
                var resource = {
                  state: 0,
                  props: assign({}, props, {
                    "data-precedence": props.precedence,
                    precedence: null
                  })
                };
                if (resourceState) {
                  2 === resourceState.length && adoptPreloadCredentials(resource.props, resourceState);
                  var preloadResource = renderState.preloads.stylesheets.get(href);
                  preloadResource && 0 < preloadResource.length ? preloadResource.length = 0 : resource.state = 1;
                }
                styleQueue.sheets.set(href, resource);
                hoistableState && hoistableState.stylesheets.add(resource);
              } else if (styleQueue) {
                var resource$9 = styleQueue.sheets.get(href);
                resource$9 && hoistableState && hoistableState.stylesheets.add(resource$9);
              }
              textEmbedded && target$jscomp$0.push("<!-- -->");
              JSCompiler_inline_result$jscomp$4 = null;
            }
          else
            props.onLoad || props.onError ? JSCompiler_inline_result$jscomp$4 = pushLinkImpl(
              target$jscomp$0,
              props
            ) : (textEmbedded && target$jscomp$0.push("<!-- -->"), JSCompiler_inline_result$jscomp$4 = isFallback$jscomp$0 ? null : pushLinkImpl(renderState.hoistableChunks, props));
          return JSCompiler_inline_result$jscomp$4;
        case "script":
          var noscriptTagInScope$jscomp$1 = formatContext.tagScope & 1, asyncProp = props.async;
          if ("string" !== typeof props.src || !props.src || !asyncProp || "function" === typeof asyncProp || "symbol" === typeof asyncProp || props.onLoad || props.onError || 4 === formatContext.insertionMode || noscriptTagInScope$jscomp$1 || null != props.itemProp)
            var JSCompiler_inline_result$jscomp$5 = pushScriptImpl(
              target$jscomp$0,
              props
            );
          else {
            var key = props.src;
            if ("module" === props.type) {
              var resources = resumableState.moduleScriptResources;
              var preloads = renderState.preloads.moduleScripts;
            } else
              resources = resumableState.scriptResources, preloads = renderState.preloads.scripts;
            var resourceState$jscomp$0 = resources.hasOwnProperty(key) ? resources[key] : void 0;
            if (null !== resourceState$jscomp$0) {
              resources[key] = null;
              var scriptProps = props;
              if (resourceState$jscomp$0) {
                2 === resourceState$jscomp$0.length && (scriptProps = assign({}, props), adoptPreloadCredentials(scriptProps, resourceState$jscomp$0));
                var preloadResource$jscomp$0 = preloads.get(key);
                preloadResource$jscomp$0 && (preloadResource$jscomp$0.length = 0);
              }
              var resource$jscomp$0 = [];
              renderState.scripts.add(resource$jscomp$0);
              pushScriptImpl(resource$jscomp$0, scriptProps);
            }
            textEmbedded && target$jscomp$0.push("<!-- -->");
            JSCompiler_inline_result$jscomp$5 = null;
          }
          return JSCompiler_inline_result$jscomp$5;
        case "style":
          var noscriptTagInScope$jscomp$2 = formatContext.tagScope & 1, precedence$jscomp$0 = props.precedence, href$jscomp$0 = props.href, nonce = props.nonce;
          if (4 === formatContext.insertionMode || noscriptTagInScope$jscomp$2 || null != props.itemProp || "string" !== typeof precedence$jscomp$0 || "string" !== typeof href$jscomp$0 || "" === href$jscomp$0) {
            target$jscomp$0.push(startChunkForTag("style"));
            var children$jscomp$6 = null, innerHTML$jscomp$5 = null, propKey$jscomp$8;
            for (propKey$jscomp$8 in props)
              if (hasOwnProperty.call(props, propKey$jscomp$8)) {
                var propValue$jscomp$8 = props[propKey$jscomp$8];
                if (null != propValue$jscomp$8)
                  switch (propKey$jscomp$8) {
                    case "children":
                      children$jscomp$6 = propValue$jscomp$8;
                      break;
                    case "dangerouslySetInnerHTML":
                      innerHTML$jscomp$5 = propValue$jscomp$8;
                      break;
                    default:
                      pushAttribute(
                        target$jscomp$0,
                        propKey$jscomp$8,
                        propValue$jscomp$8
                      );
                  }
              }
            target$jscomp$0.push(">");
            var child = Array.isArray(children$jscomp$6) ? 2 > children$jscomp$6.length ? children$jscomp$6[0] : null : children$jscomp$6;
            "function" !== typeof child && "symbol" !== typeof child && null !== child && void 0 !== child && target$jscomp$0.push(("" + child).replace(styleRegex, styleReplacer));
            pushInnerHTML(target$jscomp$0, innerHTML$jscomp$5, children$jscomp$6);
            target$jscomp$0.push(endChunkForTag("style"));
            var JSCompiler_inline_result$jscomp$6 = null;
          } else {
            var styleQueue$jscomp$0 = renderState.styles.get(precedence$jscomp$0);
            if (null !== (resumableState.styleResources.hasOwnProperty(href$jscomp$0) ? resumableState.styleResources[href$jscomp$0] : void 0)) {
              resumableState.styleResources[href$jscomp$0] = null;
              styleQueue$jscomp$0 || (styleQueue$jscomp$0 = {
                precedence: escapeTextForBrowser(precedence$jscomp$0),
                rules: [],
                hrefs: [],
                sheets: /* @__PURE__ */ new Map()
              }, renderState.styles.set(precedence$jscomp$0, styleQueue$jscomp$0));
              var nonceStyle = renderState.nonce.style;
              if (!nonceStyle || nonceStyle === nonce) {
                styleQueue$jscomp$0.hrefs.push(escapeTextForBrowser(href$jscomp$0));
                var target = styleQueue$jscomp$0.rules, children$jscomp$7 = null, innerHTML$jscomp$6 = null, propKey$jscomp$9;
                for (propKey$jscomp$9 in props)
                  if (hasOwnProperty.call(props, propKey$jscomp$9)) {
                    var propValue$jscomp$9 = props[propKey$jscomp$9];
                    if (null != propValue$jscomp$9)
                      switch (propKey$jscomp$9) {
                        case "children":
                          children$jscomp$7 = propValue$jscomp$9;
                          break;
                        case "dangerouslySetInnerHTML":
                          innerHTML$jscomp$6 = propValue$jscomp$9;
                      }
                  }
                var child$jscomp$0 = Array.isArray(children$jscomp$7) ? 2 > children$jscomp$7.length ? children$jscomp$7[0] : null : children$jscomp$7;
                "function" !== typeof child$jscomp$0 && "symbol" !== typeof child$jscomp$0 && null !== child$jscomp$0 && void 0 !== child$jscomp$0 && target.push(
                  ("" + child$jscomp$0).replace(styleRegex, styleReplacer)
                );
                pushInnerHTML(target, innerHTML$jscomp$6, children$jscomp$7);
              }
            }
            styleQueue$jscomp$0 && hoistableState && hoistableState.styles.add(styleQueue$jscomp$0);
            textEmbedded && target$jscomp$0.push("<!-- -->");
            JSCompiler_inline_result$jscomp$6 = void 0;
          }
          return JSCompiler_inline_result$jscomp$6;
        case "meta":
          var noscriptTagInScope$jscomp$3 = formatContext.tagScope & 1, isFallback$jscomp$1 = formatContext.tagScope & 4;
          if (4 === formatContext.insertionMode || noscriptTagInScope$jscomp$3 || null != props.itemProp)
            var JSCompiler_inline_result$jscomp$7 = pushSelfClosing(
              target$jscomp$0,
              props,
              "meta",
              formatContext
            );
          else
            textEmbedded && target$jscomp$0.push("<!-- -->"), JSCompiler_inline_result$jscomp$7 = isFallback$jscomp$1 ? null : "string" === typeof props.charSet ? pushSelfClosing(
              renderState.charsetChunks,
              props,
              "meta",
              formatContext
            ) : "viewport" === props.name ? pushSelfClosing(
              renderState.viewportChunks,
              props,
              "meta",
              formatContext
            ) : pushSelfClosing(
              renderState.hoistableChunks,
              props,
              "meta",
              formatContext
            );
          return JSCompiler_inline_result$jscomp$7;
        case "listing":
        case "pre":
          target$jscomp$0.push(startChunkForTag(type));
          var children$jscomp$8 = null, innerHTML$jscomp$7 = null, propKey$jscomp$10;
          for (propKey$jscomp$10 in props)
            if (hasOwnProperty.call(props, propKey$jscomp$10)) {
              var propValue$jscomp$10 = props[propKey$jscomp$10];
              if (null != propValue$jscomp$10)
                switch (propKey$jscomp$10) {
                  case "children":
                    children$jscomp$8 = propValue$jscomp$10;
                    break;
                  case "dangerouslySetInnerHTML":
                    innerHTML$jscomp$7 = propValue$jscomp$10;
                    break;
                  default:
                    pushAttribute(
                      target$jscomp$0,
                      propKey$jscomp$10,
                      propValue$jscomp$10
                    );
                }
            }
          pushViewTransitionAttributes(target$jscomp$0, formatContext);
          target$jscomp$0.push(">");
          if (null != innerHTML$jscomp$7) {
            if (null != children$jscomp$8)
              throw Error(
                "Can only set one of `children` or `props.dangerouslySetInnerHTML`."
              );
            if ("object" !== typeof innerHTML$jscomp$7 || !("__html" in innerHTML$jscomp$7))
              throw Error(
                "`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://react.dev/link/dangerously-set-inner-html for more information."
              );
            var html = innerHTML$jscomp$7.__html;
            null !== html && void 0 !== html && ("string" === typeof html && 0 < html.length && "\n" === html[0] ? target$jscomp$0.push("\n", html) : target$jscomp$0.push("" + html));
          }
          "string" === typeof children$jscomp$8 && "\n" === children$jscomp$8[0] && target$jscomp$0.push("\n");
          return children$jscomp$8;
        case "img":
          var pictureOrNoScriptTagInScope = formatContext.tagScope & 3, src = props.src, srcSet = props.srcSet;
          if (!("lazy" === props.loading || !src && !srcSet || "string" !== typeof src && null != src || "string" !== typeof srcSet && null != srcSet || "low" === props.fetchPriority || pictureOrNoScriptTagInScope) && ("string" !== typeof src || ":" !== src[4] || "d" !== src[0] && "D" !== src[0] || "a" !== src[1] && "A" !== src[1] || "t" !== src[2] && "T" !== src[2] || "a" !== src[3] && "A" !== src[3]) && ("string" !== typeof srcSet || ":" !== srcSet[4] || "d" !== srcSet[0] && "D" !== srcSet[0] || "a" !== srcSet[1] && "A" !== srcSet[1] || "t" !== srcSet[2] && "T" !== srcSet[2] || "a" !== srcSet[3] && "A" !== srcSet[3])) {
            null !== hoistableState && formatContext.tagScope & 64 && (hoistableState.suspenseyImages = true);
            var sizes = "string" === typeof props.sizes ? props.sizes : void 0, key$jscomp$0 = srcSet ? srcSet + "\n" + (sizes || "") : src, promotablePreloads = renderState.preloads.images, resource$jscomp$1 = promotablePreloads.get(key$jscomp$0);
            if (resource$jscomp$1) {
              if ("high" === props.fetchPriority || 10 > renderState.highImagePreloads.size)
                promotablePreloads.delete(key$jscomp$0), renderState.highImagePreloads.add(resource$jscomp$1);
            } else if (!resumableState.imageResources.hasOwnProperty(key$jscomp$0)) {
              resumableState.imageResources[key$jscomp$0] = PRELOAD_NO_CREDS;
              var input = props.crossOrigin;
              var JSCompiler_inline_result$jscomp$8 = "string" === typeof input ? "use-credentials" === input ? input : "" : void 0;
              var headers = renderState.headers, header;
              headers && 0 < headers.remainingCapacity && "string" !== typeof props.srcSet && ("high" === props.fetchPriority || 500 > headers.highImagePreloads.length) && (header = getPreloadAsHeader(src, "image", {
                imageSrcSet: props.srcSet,
                imageSizes: props.sizes,
                crossOrigin: JSCompiler_inline_result$jscomp$8,
                integrity: props.integrity,
                nonce: props.nonce,
                type: props.type,
                fetchPriority: props.fetchPriority,
                referrerPolicy: props.referrerPolicy
              }), 0 <= (headers.remainingCapacity -= header.length + 2)) ? (renderState.resets.image[key$jscomp$0] = PRELOAD_NO_CREDS, headers.highImagePreloads && (headers.highImagePreloads += ", "), headers.highImagePreloads += header) : (resource$jscomp$1 = [], pushLinkImpl(resource$jscomp$1, {
                rel: "preload",
                as: "image",
                href: srcSet ? void 0 : src,
                imageSrcSet: srcSet,
                imageSizes: sizes,
                crossOrigin: JSCompiler_inline_result$jscomp$8,
                integrity: props.integrity,
                type: props.type,
                fetchPriority: props.fetchPriority,
                referrerPolicy: props.referrerPolicy
              }), "high" === props.fetchPriority || 10 > renderState.highImagePreloads.size ? renderState.highImagePreloads.add(resource$jscomp$1) : (renderState.bulkPreloads.add(resource$jscomp$1), promotablePreloads.set(key$jscomp$0, resource$jscomp$1)));
            }
          }
          return pushSelfClosing(target$jscomp$0, props, "img", formatContext);
        case "base":
        case "area":
        case "br":
        case "col":
        case "embed":
        case "hr":
        case "keygen":
        case "param":
        case "source":
        case "track":
        case "wbr":
          return pushSelfClosing(target$jscomp$0, props, type, formatContext);
        case "annotation-xml":
        case "color-profile":
        case "font-face":
        case "font-face-src":
        case "font-face-uri":
        case "font-face-format":
        case "font-face-name":
        case "missing-glyph":
          break;
        case "head":
          if (2 > formatContext.insertionMode) {
            var preamble = preambleState || renderState.preamble;
            if (preamble.headChunks)
              throw Error("The `<head>` tag may only be rendered once.");
            null !== preambleState && target$jscomp$0.push("<!--head-->");
            preamble.headChunks = [];
            var JSCompiler_inline_result$jscomp$9 = pushStartSingletonElement(
              preamble.headChunks,
              props,
              "head",
              formatContext
            );
          } else
            JSCompiler_inline_result$jscomp$9 = pushStartGenericElement(
              target$jscomp$0,
              props,
              "head",
              formatContext
            );
          return JSCompiler_inline_result$jscomp$9;
        case "body":
          if (2 > formatContext.insertionMode) {
            var preamble$jscomp$0 = preambleState || renderState.preamble;
            if (preamble$jscomp$0.bodyChunks)
              throw Error("The `<body>` tag may only be rendered once.");
            null !== preambleState && target$jscomp$0.push("<!--body-->");
            preamble$jscomp$0.bodyChunks = [];
            var JSCompiler_inline_result$jscomp$10 = pushStartSingletonElement(
              preamble$jscomp$0.bodyChunks,
              props,
              "body",
              formatContext
            );
          } else
            JSCompiler_inline_result$jscomp$10 = pushStartGenericElement(
              target$jscomp$0,
              props,
              "body",
              formatContext
            );
          return JSCompiler_inline_result$jscomp$10;
        case "html":
          if (0 === formatContext.insertionMode) {
            var preamble$jscomp$1 = preambleState || renderState.preamble;
            if (preamble$jscomp$1.htmlChunks)
              throw Error("The `<html>` tag may only be rendered once.");
            null !== preambleState && target$jscomp$0.push("<!--html-->");
            preamble$jscomp$1.htmlChunks = [""];
            var JSCompiler_inline_result$jscomp$11 = pushStartSingletonElement(
              preamble$jscomp$1.htmlChunks,
              props,
              "html",
              formatContext
            );
          } else
            JSCompiler_inline_result$jscomp$11 = pushStartGenericElement(
              target$jscomp$0,
              props,
              "html",
              formatContext
            );
          return JSCompiler_inline_result$jscomp$11;
        default:
          if (-1 !== type.indexOf("-")) {
            target$jscomp$0.push(startChunkForTag(type));
            var children$jscomp$9 = null, innerHTML$jscomp$8 = null, propKey$jscomp$11;
            for (propKey$jscomp$11 in props)
              if (hasOwnProperty.call(props, propKey$jscomp$11)) {
                var propValue$jscomp$11 = props[propKey$jscomp$11];
                if (null != propValue$jscomp$11) {
                  var attributeName = propKey$jscomp$11;
                  switch (propKey$jscomp$11) {
                    case "children":
                      children$jscomp$9 = propValue$jscomp$11;
                      break;
                    case "dangerouslySetInnerHTML":
                      innerHTML$jscomp$8 = propValue$jscomp$11;
                      break;
                    case "style":
                      pushStyleAttribute(target$jscomp$0, propValue$jscomp$11);
                      break;
                    case "suppressContentEditableWarning":
                    case "suppressHydrationWarning":
                    case "ref":
                      break;
                    case "className":
                      attributeName = "class";
                    default:
                      if (isAttributeNameSafe(propKey$jscomp$11) && "function" !== typeof propValue$jscomp$11 && "symbol" !== typeof propValue$jscomp$11 && false !== propValue$jscomp$11) {
                        if (true === propValue$jscomp$11) propValue$jscomp$11 = "";
                        else if ("object" === typeof propValue$jscomp$11) continue;
                        target$jscomp$0.push(
                          " ",
                          attributeName,
                          '="',
                          escapeTextForBrowser(propValue$jscomp$11),
                          '"'
                        );
                      }
                  }
                }
              }
            pushViewTransitionAttributes(target$jscomp$0, formatContext);
            target$jscomp$0.push(">");
            pushInnerHTML(target$jscomp$0, innerHTML$jscomp$8, children$jscomp$9);
            return children$jscomp$9;
          }
      }
      return pushStartGenericElement(target$jscomp$0, props, type, formatContext);
    }
    var endTagCache = /* @__PURE__ */ new Map();
    function endChunkForTag(tag) {
      var chunk = endTagCache.get(tag);
      void 0 === chunk && (chunk = "</" + tag + ">", endTagCache.set(tag, chunk));
      return chunk;
    }
    function hoistPreambleState(renderState, preambleState) {
      renderState = renderState.preamble;
      null === renderState.htmlChunks && preambleState.htmlChunks && (renderState.htmlChunks = preambleState.htmlChunks);
      null === renderState.headChunks && preambleState.headChunks && (renderState.headChunks = preambleState.headChunks);
      null === renderState.bodyChunks && preambleState.bodyChunks && (renderState.bodyChunks = preambleState.bodyChunks);
    }
    function writeBootstrap(destination, renderState) {
      renderState = renderState.bootstrapChunks;
      for (var i = 0; i < renderState.length - 1; i++)
        destination.push(renderState[i]);
      return i < renderState.length ? (i = renderState[i], renderState.length = 0, destination.push(i)) : true;
    }
    function writeStartPendingSuspenseBoundary(destination, renderState, id) {
      destination.push('<!--$?--><template id="');
      if (null === id)
        throw Error(
          "An ID must have been assigned before we can complete the boundary."
        );
      destination.push(renderState.boundaryPrefix);
      renderState = id.toString(16);
      destination.push(renderState);
      return destination.push('"></template>');
    }
    function writeStartSegment(destination, renderState, formatContext, id) {
      switch (formatContext.insertionMode) {
        case 0:
        case 1:
        case 3:
        case 2:
          return destination.push('<div hidden id="'), destination.push(renderState.segmentPrefix), renderState = id.toString(16), destination.push(renderState), destination.push('">');
        case 4:
          return destination.push('<svg aria-hidden="true" style="display:none" id="'), destination.push(renderState.segmentPrefix), renderState = id.toString(16), destination.push(renderState), destination.push('">');
        case 5:
          return destination.push('<math aria-hidden="true" style="display:none" id="'), destination.push(renderState.segmentPrefix), renderState = id.toString(16), destination.push(renderState), destination.push('">');
        case 6:
          return destination.push('<table hidden id="'), destination.push(renderState.segmentPrefix), renderState = id.toString(16), destination.push(renderState), destination.push('">');
        case 7:
          return destination.push('<table hidden><tbody id="'), destination.push(renderState.segmentPrefix), renderState = id.toString(16), destination.push(renderState), destination.push('">');
        case 8:
          return destination.push('<table hidden><tr id="'), destination.push(renderState.segmentPrefix), renderState = id.toString(16), destination.push(renderState), destination.push('">');
        case 9:
          return destination.push('<table hidden><colgroup id="'), destination.push(renderState.segmentPrefix), renderState = id.toString(16), destination.push(renderState), destination.push('">');
        default:
          throw Error("Unknown insertion mode. This is a bug in React.");
      }
    }
    function writeEndSegment(destination, formatContext) {
      switch (formatContext.insertionMode) {
        case 0:
        case 1:
        case 3:
        case 2:
          return destination.push("</div>");
        case 4:
          return destination.push("</svg>");
        case 5:
          return destination.push("</math>");
        case 6:
          return destination.push("</table>");
        case 7:
          return destination.push("</tbody></table>");
        case 8:
          return destination.push("</tr></table>");
        case 9:
          return destination.push("</colgroup></table>");
        default:
          throw Error("Unknown insertion mode. This is a bug in React.");
      }
    }
    var regexForJSStringsInInstructionScripts = /[<\u2028\u2029]/g;
    function escapeJSStringsForInstructionScripts(input) {
      return JSON.stringify(input).replace(
        regexForJSStringsInInstructionScripts,
        function(match) {
          switch (match) {
            case "<":
              return "\\u003c";
            case "\u2028":
              return "\\u2028";
            case "\u2029":
              return "\\u2029";
            default:
              throw Error(
                "escapeJSStringsForInstructionScripts encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React"
              );
          }
        }
      );
    }
    var regexForJSStringsInScripts = /[&><\u2028\u2029]/g;
    function escapeJSObjectForInstructionScripts(input) {
      return JSON.stringify(input).replace(
        regexForJSStringsInScripts,
        function(match) {
          switch (match) {
            case "&":
              return "\\u0026";
            case ">":
              return "\\u003e";
            case "<":
              return "\\u003c";
            case "\u2028":
              return "\\u2028";
            case "\u2029":
              return "\\u2029";
            default:
              throw Error(
                "escapeJSObjectForInstructionScripts encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React"
              );
          }
        }
      );
    }
    var currentlyRenderingBoundaryHasStylesToHoist = false;
    var destinationHasCapacity = true;
    function flushStyleTagsLateForBoundary(styleQueue) {
      var rules = styleQueue.rules, hrefs = styleQueue.hrefs, i = 0;
      if (hrefs.length) {
        this.push(currentlyFlushingRenderState.startInlineStyle);
        this.push(' media="not all" data-precedence="');
        this.push(styleQueue.precedence);
        for (this.push('" data-href="'); i < hrefs.length - 1; i++)
          this.push(hrefs[i]), this.push(" ");
        this.push(hrefs[i]);
        this.push('">');
        for (i = 0; i < rules.length; i++) this.push(rules[i]);
        destinationHasCapacity = this.push("</style>");
        currentlyRenderingBoundaryHasStylesToHoist = true;
        rules.length = 0;
        hrefs.length = 0;
      }
    }
    function hasStylesToHoist(stylesheet) {
      return 2 !== stylesheet.state ? currentlyRenderingBoundaryHasStylesToHoist = true : false;
    }
    function writeHoistablesForBoundary(destination, hoistableState, renderState) {
      currentlyRenderingBoundaryHasStylesToHoist = false;
      destinationHasCapacity = true;
      currentlyFlushingRenderState = renderState;
      hoistableState.styles.forEach(flushStyleTagsLateForBoundary, destination);
      currentlyFlushingRenderState = null;
      hoistableState.stylesheets.forEach(hasStylesToHoist);
      currentlyRenderingBoundaryHasStylesToHoist && (renderState.stylesToHoist = true);
      return destinationHasCapacity;
    }
    function flushResource(resource) {
      for (var i = 0; i < resource.length; i++) this.push(resource[i]);
      resource.length = 0;
    }
    var stylesheetFlushingQueue = [];
    function flushStyleInPreamble(stylesheet) {
      pushLinkImpl(stylesheetFlushingQueue, stylesheet.props);
      for (var i = 0; i < stylesheetFlushingQueue.length; i++)
        this.push(stylesheetFlushingQueue[i]);
      stylesheetFlushingQueue.length = 0;
      stylesheet.state = 2;
    }
    function flushStylesInPreamble(styleQueue) {
      var hasStylesheets = 0 < styleQueue.sheets.size;
      styleQueue.sheets.forEach(flushStyleInPreamble, this);
      styleQueue.sheets.clear();
      var rules = styleQueue.rules, hrefs = styleQueue.hrefs;
      if (!hasStylesheets || hrefs.length) {
        this.push(currentlyFlushingRenderState.startInlineStyle);
        this.push(' data-precedence="');
        this.push(styleQueue.precedence);
        styleQueue = 0;
        if (hrefs.length) {
          for (this.push('" data-href="'); styleQueue < hrefs.length - 1; styleQueue++)
            this.push(hrefs[styleQueue]), this.push(" ");
          this.push(hrefs[styleQueue]);
        }
        this.push('">');
        for (styleQueue = 0; styleQueue < rules.length; styleQueue++)
          this.push(rules[styleQueue]);
        this.push("</style>");
        rules.length = 0;
        hrefs.length = 0;
      }
    }
    function preloadLateStyle(stylesheet) {
      if (0 === stylesheet.state) {
        stylesheet.state = 1;
        var props = stylesheet.props;
        pushLinkImpl(stylesheetFlushingQueue, {
          rel: "preload",
          as: "style",
          href: stylesheet.props.href,
          crossOrigin: props.crossOrigin,
          fetchPriority: props.fetchPriority,
          integrity: props.integrity,
          media: props.media,
          hrefLang: props.hrefLang,
          referrerPolicy: props.referrerPolicy
        });
        for (stylesheet = 0; stylesheet < stylesheetFlushingQueue.length; stylesheet++)
          this.push(stylesheetFlushingQueue[stylesheet]);
        stylesheetFlushingQueue.length = 0;
      }
    }
    function preloadLateStyles(styleQueue) {
      styleQueue.sheets.forEach(preloadLateStyle, this);
      styleQueue.sheets.clear();
    }
    function pushCompletedShellIdAttribute(target, resumableState) {
      0 === (resumableState.instructions & 32) && (resumableState.instructions |= 32, target.push(
        ' id="',
        escapeTextForBrowser("_" + resumableState.idPrefix + "R_"),
        '"'
      ));
    }
    function writeStyleResourceDependenciesInJS(destination, hoistableState) {
      destination.push("[");
      var nextArrayOpenBrackChunk = "[";
      hoistableState.stylesheets.forEach(function(resource) {
        if (2 !== resource.state)
          if (3 === resource.state)
            destination.push(nextArrayOpenBrackChunk), resource = escapeJSObjectForInstructionScripts(
              "" + resource.props.href
            ), destination.push(resource), destination.push("]"), nextArrayOpenBrackChunk = ",[";
          else {
            destination.push(nextArrayOpenBrackChunk);
            var precedence = resource.props["data-precedence"], props = resource.props, coercedHref = sanitizeURL("" + resource.props.href);
            coercedHref = escapeJSObjectForInstructionScripts(coercedHref);
            destination.push(coercedHref);
            precedence = "" + precedence;
            destination.push(",");
            precedence = escapeJSObjectForInstructionScripts(precedence);
            destination.push(precedence);
            for (var propKey in props)
              if (hasOwnProperty.call(props, propKey) && (precedence = props[propKey], null != precedence))
                switch (propKey) {
                  case "href":
                  case "rel":
                  case "precedence":
                  case "data-precedence":
                    break;
                  case "children":
                  case "dangerouslySetInnerHTML":
                    throw Error(
                      "link is a self-closing tag and must neither have `children` nor use `dangerouslySetInnerHTML`."
                    );
                  default:
                    writeStyleResourceAttributeInJS(
                      destination,
                      propKey,
                      precedence
                    );
                }
            destination.push("]");
            nextArrayOpenBrackChunk = ",[";
            resource.state = 3;
          }
      });
      destination.push("]");
    }
    function writeStyleResourceAttributeInJS(destination, name, value) {
      var attributeName = name.toLowerCase();
      switch (typeof value) {
        case "function":
        case "symbol":
          return;
      }
      switch (name) {
        case "innerHTML":
        case "dangerouslySetInnerHTML":
        case "suppressContentEditableWarning":
        case "suppressHydrationWarning":
        case "style":
        case "ref":
          return;
        case "className":
          attributeName = "class";
          name = "" + value;
          break;
        case "hidden":
          if (false === value) return;
          name = "";
          break;
        case "src":
        case "href":
          value = sanitizeURL(value);
          name = "" + value;
          break;
        default:
          if (2 < name.length && ("o" === name[0] || "O" === name[0]) && ("n" === name[1] || "N" === name[1]) || !isAttributeNameSafe(name))
            return;
          name = "" + value;
      }
      destination.push(",");
      attributeName = escapeJSObjectForInstructionScripts(attributeName);
      destination.push(attributeName);
      destination.push(",");
      attributeName = escapeJSObjectForInstructionScripts(name);
      destination.push(attributeName);
    }
    function createHoistableState() {
      return { styles: /* @__PURE__ */ new Set(), stylesheets: /* @__PURE__ */ new Set(), suspenseyImages: false };
    }
    function prefetchDNS(href) {
      var request = currentRequest ? currentRequest : null;
      if (request) {
        var resumableState = request.resumableState, renderState = request.renderState;
        if ("string" === typeof href && href) {
          if (!resumableState.dnsResources.hasOwnProperty(href)) {
            resumableState.dnsResources[href] = null;
            resumableState = renderState.headers;
            var header, JSCompiler_temp;
            if (JSCompiler_temp = resumableState && 0 < resumableState.remainingCapacity)
              JSCompiler_temp = (header = "<" + ("" + href).replace(
                regexForHrefInLinkHeaderURLContext,
                escapeHrefForLinkHeaderURLContextReplacer
              ) + ">; rel=dns-prefetch", 0 <= (resumableState.remainingCapacity -= header.length + 2));
            JSCompiler_temp ? (renderState.resets.dns[href] = null, resumableState.preconnects && (resumableState.preconnects += ", "), resumableState.preconnects += header) : (header = [], pushLinkImpl(header, { href, rel: "dns-prefetch" }), renderState.preconnects.add(header));
          }
          enqueueFlush(request);
        }
      } else previousDispatcher.D(href);
    }
    function preconnect(href, crossOrigin) {
      var request = currentRequest ? currentRequest : null;
      if (request) {
        var resumableState = request.resumableState, renderState = request.renderState;
        if ("string" === typeof href && href) {
          var bucket = "use-credentials" === crossOrigin ? "credentials" : "string" === typeof crossOrigin ? "anonymous" : "default";
          if (!resumableState.connectResources[bucket].hasOwnProperty(href)) {
            resumableState.connectResources[bucket][href] = null;
            resumableState = renderState.headers;
            var header, JSCompiler_temp;
            if (JSCompiler_temp = resumableState && 0 < resumableState.remainingCapacity) {
              JSCompiler_temp = "<" + ("" + href).replace(
                regexForHrefInLinkHeaderURLContext,
                escapeHrefForLinkHeaderURLContextReplacer
              ) + ">; rel=preconnect";
              if ("string" === typeof crossOrigin) {
                var escapedCrossOrigin = ("" + crossOrigin).replace(
                  regexForLinkHeaderQuotedParamValueContext,
                  escapeStringForLinkHeaderQuotedParamValueContextReplacer
                );
                JSCompiler_temp += '; crossorigin="' + escapedCrossOrigin + '"';
              }
              JSCompiler_temp = (header = JSCompiler_temp, 0 <= (resumableState.remainingCapacity -= header.length + 2));
            }
            JSCompiler_temp ? (renderState.resets.connect[bucket][href] = null, resumableState.preconnects && (resumableState.preconnects += ", "), resumableState.preconnects += header) : (bucket = [], pushLinkImpl(bucket, {
              rel: "preconnect",
              href,
              crossOrigin
            }), renderState.preconnects.add(bucket));
          }
          enqueueFlush(request);
        }
      } else previousDispatcher.C(href, crossOrigin);
    }
    function preload(href, as, options) {
      var request = currentRequest ? currentRequest : null;
      if (request) {
        var resumableState = request.resumableState, renderState = request.renderState;
        if (as && href) {
          switch (as) {
            case "image":
              if (options) {
                var imageSrcSet = options.imageSrcSet;
                var imageSizes = options.imageSizes;
                var fetchPriority = options.fetchPriority;
              }
              var key = imageSrcSet ? imageSrcSet + "\n" + (imageSizes || "") : href;
              if (resumableState.imageResources.hasOwnProperty(key)) return;
              resumableState.imageResources[key] = PRELOAD_NO_CREDS;
              resumableState = renderState.headers;
              var header;
              resumableState && 0 < resumableState.remainingCapacity && "string" !== typeof imageSrcSet && "high" === fetchPriority && (header = getPreloadAsHeader(href, as, options), 0 <= (resumableState.remainingCapacity -= header.length + 2)) ? (renderState.resets.image[key] = PRELOAD_NO_CREDS, resumableState.highImagePreloads && (resumableState.highImagePreloads += ", "), resumableState.highImagePreloads += header) : (resumableState = [], pushLinkImpl(
                resumableState,
                assign(
                  { rel: "preload", href: imageSrcSet ? void 0 : href, as },
                  options
                )
              ), "high" === fetchPriority ? renderState.highImagePreloads.add(resumableState) : (renderState.bulkPreloads.add(resumableState), renderState.preloads.images.set(key, resumableState)));
              break;
            case "style":
              if (resumableState.styleResources.hasOwnProperty(href)) return;
              imageSrcSet = [];
              pushLinkImpl(
                imageSrcSet,
                assign({ rel: "preload", href, as }, options)
              );
              resumableState.styleResources[href] = !options || "string" !== typeof options.crossOrigin && "string" !== typeof options.integrity ? PRELOAD_NO_CREDS : [options.crossOrigin, options.integrity];
              renderState.preloads.stylesheets.set(href, imageSrcSet);
              renderState.bulkPreloads.add(imageSrcSet);
              break;
            case "script":
              if (resumableState.scriptResources.hasOwnProperty(href)) return;
              imageSrcSet = [];
              renderState.preloads.scripts.set(href, imageSrcSet);
              renderState.bulkPreloads.add(imageSrcSet);
              pushLinkImpl(
                imageSrcSet,
                assign({ rel: "preload", href, as }, options)
              );
              resumableState.scriptResources[href] = !options || "string" !== typeof options.crossOrigin && "string" !== typeof options.integrity ? PRELOAD_NO_CREDS : [options.crossOrigin, options.integrity];
              break;
            default:
              if (resumableState.unknownResources.hasOwnProperty(as)) {
                if (imageSrcSet = resumableState.unknownResources[as], imageSrcSet.hasOwnProperty(href))
                  return;
              } else
                imageSrcSet = {}, resumableState.unknownResources[as] = imageSrcSet;
              imageSrcSet[href] = PRELOAD_NO_CREDS;
              if ((resumableState = renderState.headers) && 0 < resumableState.remainingCapacity && "font" === as && (key = getPreloadAsHeader(href, as, options), 0 <= (resumableState.remainingCapacity -= key.length + 2)))
                renderState.resets.font[href] = PRELOAD_NO_CREDS, resumableState.fontPreloads && (resumableState.fontPreloads += ", "), resumableState.fontPreloads += key;
              else
                switch (resumableState = [], href = assign({ rel: "preload", href, as }, options), pushLinkImpl(resumableState, href), as) {
                  case "font":
                    renderState.fontPreloads.add(resumableState);
                    break;
                  default:
                    renderState.bulkPreloads.add(resumableState);
                }
          }
          enqueueFlush(request);
        }
      } else previousDispatcher.L(href, as, options);
    }
    function preloadModule(href, options) {
      var request = currentRequest ? currentRequest : null;
      if (request) {
        var resumableState = request.resumableState, renderState = request.renderState;
        if (href) {
          var as = options && "string" === typeof options.as ? options.as : "script";
          switch (as) {
            case "script":
              if (resumableState.moduleScriptResources.hasOwnProperty(href)) return;
              as = [];
              resumableState.moduleScriptResources[href] = !options || "string" !== typeof options.crossOrigin && "string" !== typeof options.integrity ? PRELOAD_NO_CREDS : [options.crossOrigin, options.integrity];
              renderState.preloads.moduleScripts.set(href, as);
              break;
            default:
              if (resumableState.moduleUnknownResources.hasOwnProperty(as)) {
                var resources = resumableState.moduleUnknownResources[as];
                if (resources.hasOwnProperty(href)) return;
              } else
                resources = {}, resumableState.moduleUnknownResources[as] = resources;
              as = [];
              resources[href] = PRELOAD_NO_CREDS;
          }
          pushLinkImpl(as, assign({ rel: "modulepreload", href }, options));
          renderState.bulkPreloads.add(as);
          enqueueFlush(request);
        }
      } else previousDispatcher.m(href, options);
    }
    function preinitStyle(href, precedence, options) {
      var request = currentRequest ? currentRequest : null;
      if (request) {
        var resumableState = request.resumableState, renderState = request.renderState;
        if (href) {
          precedence = precedence || "default";
          var styleQueue = renderState.styles.get(precedence), resourceState = resumableState.styleResources.hasOwnProperty(href) ? resumableState.styleResources[href] : void 0;
          null !== resourceState && (resumableState.styleResources[href] = null, styleQueue || (styleQueue = {
            precedence: escapeTextForBrowser(precedence),
            rules: [],
            hrefs: [],
            sheets: /* @__PURE__ */ new Map()
          }, renderState.styles.set(precedence, styleQueue)), precedence = {
            state: 0,
            props: assign(
              { rel: "stylesheet", href, "data-precedence": precedence },
              options
            )
          }, resourceState && (2 === resourceState.length && adoptPreloadCredentials(precedence.props, resourceState), (renderState = renderState.preloads.stylesheets.get(href)) && 0 < renderState.length ? renderState.length = 0 : precedence.state = 1), styleQueue.sheets.set(href, precedence), enqueueFlush(request));
        }
      } else previousDispatcher.S(href, precedence, options);
    }
    function preinitScript(src, options) {
      var request = currentRequest ? currentRequest : null;
      if (request) {
        var resumableState = request.resumableState, renderState = request.renderState;
        if (src) {
          var resourceState = resumableState.scriptResources.hasOwnProperty(src) ? resumableState.scriptResources[src] : void 0;
          null !== resourceState && (resumableState.scriptResources[src] = null, options = assign({ src, async: true }, options), resourceState && (2 === resourceState.length && adoptPreloadCredentials(options, resourceState), src = renderState.preloads.scripts.get(src)) && (src.length = 0), src = [], renderState.scripts.add(src), pushScriptImpl(src, options), enqueueFlush(request));
        }
      } else previousDispatcher.X(src, options);
    }
    function preinitModuleScript(src, options) {
      var request = currentRequest ? currentRequest : null;
      if (request) {
        var resumableState = request.resumableState, renderState = request.renderState;
        if (src) {
          var resourceState = resumableState.moduleScriptResources.hasOwnProperty(
            src
          ) ? resumableState.moduleScriptResources[src] : void 0;
          null !== resourceState && (resumableState.moduleScriptResources[src] = null, options = assign({ src, type: "module", async: true }, options), resourceState && (2 === resourceState.length && adoptPreloadCredentials(options, resourceState), src = renderState.preloads.moduleScripts.get(src)) && (src.length = 0), src = [], renderState.scripts.add(src), pushScriptImpl(src, options), enqueueFlush(request));
        }
      } else previousDispatcher.M(src, options);
    }
    function adoptPreloadCredentials(target, preloadState) {
      null == target.crossOrigin && (target.crossOrigin = preloadState[0]);
      null == target.integrity && (target.integrity = preloadState[1]);
    }
    function getPreloadAsHeader(href, as, params) {
      href = ("" + href).replace(
        regexForHrefInLinkHeaderURLContext,
        escapeHrefForLinkHeaderURLContextReplacer
      );
      as = ("" + as).replace(
        regexForLinkHeaderQuotedParamValueContext,
        escapeStringForLinkHeaderQuotedParamValueContextReplacer
      );
      as = "<" + href + '>; rel=preload; as="' + as + '"';
      for (var paramName in params)
        hasOwnProperty.call(params, paramName) && (href = params[paramName], "string" === typeof href && (as += "; " + paramName.toLowerCase() + '="' + ("" + href).replace(
          regexForLinkHeaderQuotedParamValueContext,
          escapeStringForLinkHeaderQuotedParamValueContextReplacer
        ) + '"'));
      return as;
    }
    var regexForHrefInLinkHeaderURLContext = /[<>\r\n]/g;
    function escapeHrefForLinkHeaderURLContextReplacer(match) {
      switch (match) {
        case "<":
          return "%3C";
        case ">":
          return "%3E";
        case "\n":
          return "%0A";
        case "\r":
          return "%0D";
        default:
          throw Error(
            "escapeLinkHrefForHeaderContextReplacer encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React"
          );
      }
    }
    var regexForLinkHeaderQuotedParamValueContext = /["';,\r\n]/g;
    function escapeStringForLinkHeaderQuotedParamValueContextReplacer(match) {
      switch (match) {
        case '"':
          return "%22";
        case "'":
          return "%27";
        case ";":
          return "%3B";
        case ",":
          return "%2C";
        case "\n":
          return "%0A";
        case "\r":
          return "%0D";
        default:
          throw Error(
            "escapeStringForLinkHeaderQuotedParamValueContextReplacer encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React"
          );
      }
    }
    function hoistStyleQueueDependency(styleQueue) {
      this.styles.add(styleQueue);
    }
    function hoistStylesheetDependency(stylesheet) {
      this.stylesheets.add(stylesheet);
    }
    function hoistHoistables(parentState, childState) {
      childState.styles.forEach(hoistStyleQueueDependency, parentState);
      childState.stylesheets.forEach(hoistStylesheetDependency, parentState);
      childState.suspenseyImages && (parentState.suspenseyImages = true);
    }
    function createRenderState(resumableState, generateStaticMarkup) {
      var idPrefix = resumableState.idPrefix, bootstrapChunks = [], bootstrapScriptContent = resumableState.bootstrapScriptContent, bootstrapScripts = resumableState.bootstrapScripts, bootstrapModules = resumableState.bootstrapModules;
      void 0 !== bootstrapScriptContent && (bootstrapChunks.push("<script"), pushCompletedShellIdAttribute(bootstrapChunks, resumableState), bootstrapChunks.push(
        ">",
        ("" + bootstrapScriptContent).replace(scriptRegex, scriptReplacer),
        "</script>"
      ));
      bootstrapScriptContent = idPrefix + "P:";
      var JSCompiler_object_inline_segmentPrefix_1724 = idPrefix + "S:";
      idPrefix += "B:";
      var JSCompiler_object_inline_preconnects_1738 = /* @__PURE__ */ new Set(), JSCompiler_object_inline_fontPreloads_1739 = /* @__PURE__ */ new Set(), JSCompiler_object_inline_highImagePreloads_1740 = /* @__PURE__ */ new Set(), JSCompiler_object_inline_styles_1741 = /* @__PURE__ */ new Map(), JSCompiler_object_inline_bootstrapScripts_1742 = /* @__PURE__ */ new Set(), JSCompiler_object_inline_scripts_1743 = /* @__PURE__ */ new Set(), JSCompiler_object_inline_bulkPreloads_1744 = /* @__PURE__ */ new Set(), JSCompiler_object_inline_preloads_1745 = {
        images: /* @__PURE__ */ new Map(),
        stylesheets: /* @__PURE__ */ new Map(),
        scripts: /* @__PURE__ */ new Map(),
        moduleScripts: /* @__PURE__ */ new Map()
      };
      if (void 0 !== bootstrapScripts)
        for (var i = 0; i < bootstrapScripts.length; i++) {
          var scriptConfig = bootstrapScripts[i], src, crossOrigin = void 0, integrity = void 0, props = {
            rel: "preload",
            as: "script",
            fetchPriority: "low",
            nonce: void 0
          };
          "string" === typeof scriptConfig ? props.href = src = scriptConfig : (props.href = src = scriptConfig.src, props.integrity = integrity = "string" === typeof scriptConfig.integrity ? scriptConfig.integrity : void 0, props.crossOrigin = crossOrigin = "string" === typeof scriptConfig || null == scriptConfig.crossOrigin ? void 0 : "use-credentials" === scriptConfig.crossOrigin ? "use-credentials" : "");
          scriptConfig = resumableState;
          var href = src;
          scriptConfig.scriptResources[href] = null;
          scriptConfig.moduleScriptResources[href] = null;
          scriptConfig = [];
          pushLinkImpl(scriptConfig, props);
          JSCompiler_object_inline_bootstrapScripts_1742.add(scriptConfig);
          bootstrapChunks.push('<script src="', escapeTextForBrowser(src), '"');
          "string" === typeof integrity && bootstrapChunks.push(
            ' integrity="',
            escapeTextForBrowser(integrity),
            '"'
          );
          "string" === typeof crossOrigin && bootstrapChunks.push(
            ' crossorigin="',
            escapeTextForBrowser(crossOrigin),
            '"'
          );
          pushCompletedShellIdAttribute(bootstrapChunks, resumableState);
          bootstrapChunks.push(' async=""></script>');
        }
      if (void 0 !== bootstrapModules)
        for (bootstrapScripts = 0; bootstrapScripts < bootstrapModules.length; bootstrapScripts++)
          props = bootstrapModules[bootstrapScripts], crossOrigin = src = void 0, integrity = {
            rel: "modulepreload",
            fetchPriority: "low",
            nonce: void 0
          }, "string" === typeof props ? integrity.href = i = props : (integrity.href = i = props.src, integrity.integrity = crossOrigin = "string" === typeof props.integrity ? props.integrity : void 0, integrity.crossOrigin = src = "string" === typeof props || null == props.crossOrigin ? void 0 : "use-credentials" === props.crossOrigin ? "use-credentials" : ""), props = resumableState, scriptConfig = i, props.scriptResources[scriptConfig] = null, props.moduleScriptResources[scriptConfig] = null, props = [], pushLinkImpl(props, integrity), JSCompiler_object_inline_bootstrapScripts_1742.add(props), bootstrapChunks.push(
            '<script type="module" src="',
            escapeTextForBrowser(i),
            '"'
          ), "string" === typeof crossOrigin && bootstrapChunks.push(
            ' integrity="',
            escapeTextForBrowser(crossOrigin),
            '"'
          ), "string" === typeof src && bootstrapChunks.push(
            ' crossorigin="',
            escapeTextForBrowser(src),
            '"'
          ), pushCompletedShellIdAttribute(bootstrapChunks, resumableState), bootstrapChunks.push(' async=""></script>');
      return {
        placeholderPrefix: bootstrapScriptContent,
        segmentPrefix: JSCompiler_object_inline_segmentPrefix_1724,
        boundaryPrefix: idPrefix,
        startInlineScript: "<script",
        startInlineStyle: "<style",
        preamble: { htmlChunks: null, headChunks: null, bodyChunks: null },
        externalRuntimeScript: null,
        bootstrapChunks,
        importMapChunks: [],
        onHeaders: void 0,
        headers: null,
        resets: {
          font: {},
          dns: {},
          connect: { default: {}, anonymous: {}, credentials: {} },
          image: {},
          style: {}
        },
        charsetChunks: [],
        viewportChunks: [],
        hoistableChunks: [],
        preconnects: JSCompiler_object_inline_preconnects_1738,
        fontPreloads: JSCompiler_object_inline_fontPreloads_1739,
        highImagePreloads: JSCompiler_object_inline_highImagePreloads_1740,
        styles: JSCompiler_object_inline_styles_1741,
        bootstrapScripts: JSCompiler_object_inline_bootstrapScripts_1742,
        scripts: JSCompiler_object_inline_scripts_1743,
        bulkPreloads: JSCompiler_object_inline_bulkPreloads_1744,
        preloads: JSCompiler_object_inline_preloads_1745,
        nonce: { script: void 0, style: void 0 },
        stylesToHoist: false,
        generateStaticMarkup
      };
    }
    function pushTextInstance(target, text, renderState, textEmbedded) {
      if (renderState.generateStaticMarkup)
        return target.push(escapeTextForBrowser(text)), false;
      "" === text ? target = textEmbedded : (textEmbedded && target.push("<!-- -->"), target.push(escapeTextForBrowser(text)), target = true);
      return target;
    }
    function pushSegmentFinale(target, renderState, lastPushedText, textEmbedded) {
      renderState.generateStaticMarkup || lastPushedText && textEmbedded && target.push("<!-- -->");
    }
    var bind = Function.prototype.bind;
    var REACT_CLIENT_REFERENCE = /* @__PURE__ */ Symbol.for("react.client.reference");
    function getComponentNameFromType(type) {
      if (null == type) return null;
      if ("function" === typeof type)
        return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
      if ("string" === typeof type) return type;
      switch (type) {
        case REACT_FRAGMENT_TYPE:
          return "Fragment";
        case REACT_PROFILER_TYPE:
          return "Profiler";
        case REACT_STRICT_MODE_TYPE:
          return "StrictMode";
        case REACT_SUSPENSE_TYPE:
          return "Suspense";
        case REACT_SUSPENSE_LIST_TYPE:
          return "SuspenseList";
        case REACT_ACTIVITY_TYPE:
          return "Activity";
        case REACT_VIEW_TRANSITION_TYPE:
          return "ViewTransition";
      }
      if ("object" === typeof type)
        switch (type.$$typeof) {
          case REACT_PORTAL_TYPE:
            return "Portal";
          case REACT_CONTEXT_TYPE:
            return type.displayName || "Context";
          case REACT_CONSUMER_TYPE:
            return (type._context.displayName || "Context") + ".Consumer";
          case REACT_FORWARD_REF_TYPE:
            var innerType = type.render;
            type = type.displayName;
            type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
            return type;
          case REACT_MEMO_TYPE:
            return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
          case REACT_LAZY_TYPE:
            innerType = type._payload;
            type = type._init;
            try {
              return getComponentNameFromType(type(innerType));
            } catch (x) {
            }
        }
      return null;
    }
    var emptyContextObject = {};
    var currentActiveSnapshot = null;
    function popToNearestCommonAncestor(prev, next) {
      if (prev !== next) {
        prev.context._currentValue2 = prev.parentValue;
        prev = prev.parent;
        var parentNext = next.parent;
        if (null === prev) {
          if (null !== parentNext)
            throw Error(
              "The stacks must reach the root at the same time. This is a bug in React."
            );
        } else {
          if (null === parentNext)
            throw Error(
              "The stacks must reach the root at the same time. This is a bug in React."
            );
          popToNearestCommonAncestor(prev, parentNext);
        }
        next.context._currentValue2 = next.value;
      }
    }
    function popAllPrevious(prev) {
      prev.context._currentValue2 = prev.parentValue;
      prev = prev.parent;
      null !== prev && popAllPrevious(prev);
    }
    function pushAllNext(next) {
      var parentNext = next.parent;
      null !== parentNext && pushAllNext(parentNext);
      next.context._currentValue2 = next.value;
    }
    function popPreviousToCommonLevel(prev, next) {
      prev.context._currentValue2 = prev.parentValue;
      prev = prev.parent;
      if (null === prev)
        throw Error(
          "The depth must equal at least at zero before reaching the root. This is a bug in React."
        );
      prev.depth === next.depth ? popToNearestCommonAncestor(prev, next) : popPreviousToCommonLevel(prev, next);
    }
    function popNextToCommonLevel(prev, next) {
      var parentNext = next.parent;
      if (null === parentNext)
        throw Error(
          "The depth must equal at least at zero before reaching the root. This is a bug in React."
        );
      prev.depth === parentNext.depth ? popToNearestCommonAncestor(prev, parentNext) : popNextToCommonLevel(prev, parentNext);
      next.context._currentValue2 = next.value;
    }
    function switchContext(newSnapshot) {
      var prev = currentActiveSnapshot;
      prev !== newSnapshot && (null === prev ? pushAllNext(newSnapshot) : null === newSnapshot ? popAllPrevious(prev) : prev.depth === newSnapshot.depth ? popToNearestCommonAncestor(prev, newSnapshot) : prev.depth > newSnapshot.depth ? popPreviousToCommonLevel(prev, newSnapshot) : popNextToCommonLevel(prev, newSnapshot), currentActiveSnapshot = newSnapshot);
    }
    var classComponentUpdater = {
      enqueueSetState: function(inst, payload) {
        inst = inst._reactInternals;
        null !== inst.queue && inst.queue.push(payload);
      },
      enqueueReplaceState: function(inst, payload) {
        inst = inst._reactInternals;
        inst.replace = true;
        inst.queue = [payload];
      },
      enqueueForceUpdate: function() {
      }
    };
    var emptyTreeContext = { id: 1, overflow: "" };
    function getTreeId(context) {
      var overflow = context.overflow;
      context = context.id;
      return (context & ~(1 << 32 - clz32(context) - 1)).toString(32) + overflow;
    }
    function pushTreeContext(baseContext, totalChildren, index) {
      var baseIdWithLeadingBit = baseContext.id;
      baseContext = baseContext.overflow;
      var baseLength = 32 - clz32(baseIdWithLeadingBit) - 1;
      baseIdWithLeadingBit &= ~(1 << baseLength);
      index += 1;
      var length = 32 - clz32(totalChildren) + baseLength;
      if (30 < length) {
        var numberOfOverflowBits = baseLength - baseLength % 5;
        length = (baseIdWithLeadingBit & (1 << numberOfOverflowBits) - 1).toString(32);
        baseIdWithLeadingBit >>= numberOfOverflowBits;
        baseLength -= numberOfOverflowBits;
        return {
          id: 1 << 32 - clz32(totalChildren) + baseLength | index << baseLength | baseIdWithLeadingBit,
          overflow: length + baseContext
        };
      }
      return {
        id: 1 << length | index << baseLength | baseIdWithLeadingBit,
        overflow: baseContext
      };
    }
    var clz32 = Math.clz32 ? Math.clz32 : clz32Fallback;
    var log = Math.log;
    var LN2 = Math.LN2;
    function clz32Fallback(x) {
      x >>>= 0;
      return 0 === x ? 32 : 31 - (log(x) / LN2 | 0) | 0;
    }
    function noop() {
    }
    var SuspenseException = Error(
      "Suspense Exception: This is not a real error! It's an implementation detail of `use` to interrupt the current render. You must either rethrow it immediately, or move the `use` call outside of the `try/catch` block. Capturing without rethrowing will lead to unexpected behavior.\n\nTo handle async errors, wrap your component in an error boundary, or call the promise's `.catch` method and pass the result to `use`."
    );
    function trackUsedThenable(thenableState2, thenable, index) {
      index = thenableState2[index];
      void 0 === index ? thenableState2.push(thenable) : index !== thenable && (thenable.then(noop, noop), thenable = index);
      switch (thenable.status) {
        case "fulfilled":
          return thenable.value;
        case "rejected":
          thenableState2 = thenable.reason;
          if (void 0 === thenableState2 && !("reason" in thenable))
            throw Error(
              "A rejected Promise was passed to React without a `reason` property. React threw a generic error from where the Promise was used to assist in identifying the problematic Promise. Make sure that instrumented Promises correctly set the `reason` property when setting `status` to `'rejected'`."
            );
          throw thenableState2;
        default:
          "string" === typeof thenable.status ? thenable.then(noop, noop) : (thenableState2 = thenable, thenableState2.status = "pending", thenableState2.then(
            function(fulfilledValue) {
              if ("pending" === thenable.status) {
                var fulfilledThenable = thenable;
                fulfilledThenable.status = "fulfilled";
                fulfilledThenable.value = fulfilledValue;
              }
            },
            function(error) {
              if ("pending" === thenable.status) {
                var rejectedThenable = thenable;
                rejectedThenable.status = "rejected";
                rejectedThenable.reason = error;
              }
            }
          ));
          switch (thenable.status) {
            case "fulfilled":
              return thenable.value;
            case "rejected":
              throw thenable.reason;
          }
          suspendedThenable = thenable;
          throw SuspenseException;
      }
    }
    var suspendedThenable = null;
    function getSuspendedThenable() {
      if (null === suspendedThenable)
        throw Error(
          "Expected a suspended thenable. This is a bug in React. Please file an issue."
        );
      var thenable = suspendedThenable;
      suspendedThenable = null;
      return thenable;
    }
    function is(x, y) {
      return x === y && (0 !== x || 1 / x === 1 / y) || x !== x && y !== y;
    }
    var objectIs = "function" === typeof Object.is ? Object.is : is;
    var currentlyRenderingComponent = null;
    var currentlyRenderingTask = null;
    var currentlyRenderingRequest = null;
    var currentlyRenderingKeyPath = null;
    var firstWorkInProgressHook = null;
    var workInProgressHook = null;
    var isReRender = false;
    var didScheduleRenderPhaseUpdate = false;
    var localIdCounter = 0;
    var actionStateCounter = 0;
    var actionStateMatchingIndex = -1;
    var thenableIndexCounter = 0;
    var thenableState = null;
    function createRecoverableError(recoverable) {
      recoverable = recoverable._reason;
      if ("function" === typeof recoverable)
        try {
          var initializedReason = recoverable();
        } catch ($jscomp$unused$catch) {
          initializedReason = "The reason for browser-only rendering could not be determined because its initializer threw.";
        }
      else initializedReason = recoverable;
      initializedReason = Error(
        "Browser-only rendering was requested by `browser()`.",
        void 0 === recoverable ? void 0 : { cause: initializedReason }
      );
      Object.defineProperty(initializedReason, REACT_RECOVERABLE_TYPE, {
        value: true
      });
      return initializedReason;
    }
    function isRecoverableError(error) {
      return "object" !== typeof error || null === error ? false : true === error[REACT_RECOVERABLE_TYPE];
    }
    function cloneRecoverableErrorAsFatal(recoverableError) {
      var fatalRecoverableError = Error(
        "The server render could not complete because client rendering was requested outside a Suspense boundary. See this error's cause for additional details.",
        hasOwnProperty.call(recoverableError, "cause") ? { cause: recoverableError.cause } : void 0
      );
      recoverableError = recoverableError.stack;
      if (void 0 !== recoverableError) {
        var frameStart = recoverableError.indexOf("\n");
        fatalRecoverableError.stack = fatalRecoverableError.name + ": " + fatalRecoverableError.message + (-1 === frameStart ? "" : recoverableError.slice(frameStart));
      } else fatalRecoverableError.stack = void 0;
      return fatalRecoverableError;
    }
    var renderPhaseUpdates = null;
    var numberOfReRenders = 0;
    function resolveCurrentlyRenderingComponent() {
      if (null === currentlyRenderingComponent)
        throw Error(
          "Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem."
        );
      return currentlyRenderingComponent;
    }
    function createHook() {
      if (0 < numberOfReRenders)
        throw Error("Rendered more hooks than during the previous render");
      return { memoizedState: null, queue: null, next: null };
    }
    function createWorkInProgressHook() {
      null === workInProgressHook ? null === firstWorkInProgressHook ? (isReRender = false, firstWorkInProgressHook = workInProgressHook = createHook()) : (isReRender = true, workInProgressHook = firstWorkInProgressHook) : null === workInProgressHook.next ? (isReRender = false, workInProgressHook = workInProgressHook.next = createHook()) : (isReRender = true, workInProgressHook = workInProgressHook.next);
      return workInProgressHook;
    }
    function getThenableStateAfterSuspending() {
      var state = thenableState;
      thenableState = null;
      return state;
    }
    function resetHooksState() {
      currentlyRenderingKeyPath = currentlyRenderingRequest = currentlyRenderingTask = currentlyRenderingComponent = null;
      didScheduleRenderPhaseUpdate = false;
      firstWorkInProgressHook = null;
      numberOfReRenders = 0;
      workInProgressHook = renderPhaseUpdates = null;
    }
    function basicStateReducer(state, action) {
      return "function" === typeof action ? action(state) : action;
    }
    function useReducer(reducer, initialArg, init) {
      currentlyRenderingComponent = resolveCurrentlyRenderingComponent();
      workInProgressHook = createWorkInProgressHook();
      if (isReRender) {
        var queue = workInProgressHook.queue;
        initialArg = queue.dispatch;
        if (null !== renderPhaseUpdates && (init = renderPhaseUpdates.get(queue), void 0 !== init)) {
          renderPhaseUpdates.delete(queue);
          queue = workInProgressHook.memoizedState;
          do
            queue = reducer(queue, init.action), init = init.next;
          while (null !== init);
          workInProgressHook.memoizedState = queue;
          return [queue, initialArg];
        }
        return [workInProgressHook.memoizedState, initialArg];
      }
      reducer = reducer === basicStateReducer ? "function" === typeof initialArg ? initialArg() : initialArg : void 0 !== init ? init(initialArg) : initialArg;
      workInProgressHook.memoizedState = reducer;
      reducer = workInProgressHook.queue = { last: null, dispatch: null };
      reducer = reducer.dispatch = dispatchAction.bind(
        null,
        currentlyRenderingComponent,
        reducer
      );
      return [workInProgressHook.memoizedState, reducer];
    }
    function useMemo(nextCreate, deps) {
      currentlyRenderingComponent = resolveCurrentlyRenderingComponent();
      workInProgressHook = createWorkInProgressHook();
      deps = void 0 === deps ? null : deps;
      if (null !== workInProgressHook) {
        var prevState = workInProgressHook.memoizedState;
        if (null !== prevState && null !== deps) {
          var prevDeps = prevState[1];
          a: if (null === prevDeps) prevDeps = false;
          else {
            for (var i = 0; i < prevDeps.length && i < deps.length; i++)
              if (!objectIs(deps[i], prevDeps[i])) {
                prevDeps = false;
                break a;
              }
            prevDeps = true;
          }
          if (prevDeps) return prevState[0];
        }
      }
      nextCreate = nextCreate();
      workInProgressHook.memoizedState = [nextCreate, deps];
      return nextCreate;
    }
    function dispatchAction(componentIdentity, queue, action) {
      if (25 <= numberOfReRenders)
        throw Error(
          "Too many re-renders. React limits the number of renders to prevent an infinite loop."
        );
      if (componentIdentity === currentlyRenderingComponent)
        if (didScheduleRenderPhaseUpdate = true, componentIdentity = { action, next: null }, null === renderPhaseUpdates && (renderPhaseUpdates = /* @__PURE__ */ new Map()), action = renderPhaseUpdates.get(queue), void 0 === action)
          renderPhaseUpdates.set(queue, componentIdentity);
        else {
          for (queue = action; null !== queue.next; ) queue = queue.next;
          queue.next = componentIdentity;
        }
    }
    function throwOnUseEffectEventCall() {
      throw Error(
        "A function wrapped in useEffectEvent can't be called during rendering."
      );
    }
    function unsupportedStartTransition() {
      throw Error("startTransition cannot be called during server rendering.");
    }
    function unsupportedSetOptimisticState() {
      throw Error("Cannot update optimistic state while rendering.");
    }
    function useActionState(action, initialState, permalink) {
      resolveCurrentlyRenderingComponent();
      var actionStateHookIndex = actionStateCounter++, request = currentlyRenderingRequest;
      if ("function" === typeof action.$$FORM_ACTION) {
        var nextPostbackStateKey = null, componentKeyPath = currentlyRenderingKeyPath;
        request = request.formState;
        var isSignatureEqual = action.$$IS_SIGNATURE_EQUAL;
        if (null !== request && "function" === typeof isSignatureEqual) {
          var postbackKey = request[1];
          isSignatureEqual.call(action, request[2], request[3]) && (nextPostbackStateKey = void 0 !== permalink ? "p" + permalink : "k" + murmurhash3_32_gc(
            JSON.stringify([componentKeyPath, null, actionStateHookIndex]),
            0
          ), postbackKey === nextPostbackStateKey && (actionStateMatchingIndex = actionStateHookIndex, initialState = request[0]));
        }
        var boundAction = action.bind(null, initialState);
        action = function(payload) {
          boundAction(payload);
        };
        "function" === typeof boundAction.$$FORM_ACTION && (action.$$FORM_ACTION = function(prefix2) {
          prefix2 = boundAction.$$FORM_ACTION(prefix2);
          void 0 !== permalink && (permalink += "", prefix2.action = permalink);
          var formData = prefix2.data;
          formData && (null === nextPostbackStateKey && (nextPostbackStateKey = void 0 !== permalink ? "p" + permalink : "k" + murmurhash3_32_gc(
            JSON.stringify([
              componentKeyPath,
              null,
              actionStateHookIndex
            ]),
            0
          )), formData.append("$ACTION_KEY", nextPostbackStateKey));
          return prefix2;
        });
        return [initialState, action, false];
      }
      var boundAction$22 = action.bind(null, initialState);
      return [
        initialState,
        function(payload) {
          boundAction$22(payload);
        },
        false
      ];
    }
    function unwrapThenable(thenable) {
      var index = thenableIndexCounter;
      thenableIndexCounter += 1;
      null === thenableState && (thenableState = []);
      return trackUsedThenable(thenableState, thenable, index);
    }
    function unsupportedRefresh() {
      throw Error("Cache cannot be refreshed during server rendering.");
    }
    var HooksDispatcher = {
      readContext: function(context) {
        return context._currentValue2;
      },
      use: function(usable) {
        if (null !== usable && "object" === typeof usable) {
          if ("function" === typeof usable.then) return unwrapThenable(usable);
          if (usable.$$typeof === REACT_RECOVERABLE_TYPE)
            throw createRecoverableError(usable);
          if (usable.$$typeof === REACT_CONTEXT_TYPE)
            return usable._currentValue2;
        }
        throw Error("An unsupported type was passed to use(): " + String(usable));
      },
      useContext: function(context) {
        resolveCurrentlyRenderingComponent();
        return context._currentValue2;
      },
      useMemo,
      useReducer,
      useRef: function(initialValue) {
        currentlyRenderingComponent = resolveCurrentlyRenderingComponent();
        workInProgressHook = createWorkInProgressHook();
        var previousRef = workInProgressHook.memoizedState;
        return null === previousRef ? (initialValue = { current: initialValue }, workInProgressHook.memoizedState = initialValue) : previousRef;
      },
      useState: function(initialState) {
        return useReducer(basicStateReducer, initialState);
      },
      useInsertionEffect: noop,
      useLayoutEffect: noop,
      useCallback: function(callback, deps) {
        return useMemo(function() {
          return callback;
        }, deps);
      },
      useImperativeHandle: noop,
      useEffect: noop,
      useDebugValue: noop,
      useDeferredValue: function(value, initialValue) {
        resolveCurrentlyRenderingComponent();
        return void 0 !== initialValue ? initialValue : value;
      },
      useTransition: function() {
        resolveCurrentlyRenderingComponent();
        return [false, unsupportedStartTransition];
      },
      useId: function() {
        var treeId = getTreeId(currentlyRenderingTask.treeContext), resumableState = currentResumableState;
        if (null === resumableState)
          throw Error(
            "Invalid hook call. Hooks can only be called inside of the body of a function component."
          );
        var localId = localIdCounter++;
        return makeId(resumableState, treeId, localId);
      },
      useSyncExternalStore: function(subscribe, getSnapshot, getServerSnapshot) {
        if (void 0 === getServerSnapshot)
          throw Error(
            "Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering."
          );
        return getServerSnapshot();
      },
      useOptimistic: function(passthrough) {
        resolveCurrentlyRenderingComponent();
        return [passthrough, unsupportedSetOptimisticState];
      },
      useActionState,
      useFormState: useActionState,
      useHostTransitionStatus: function() {
        resolveCurrentlyRenderingComponent();
        return sharedNotPendingObject;
      },
      useMemoCache: function(size) {
        for (var data = Array(size), i = 0; i < size; i++)
          data[i] = REACT_MEMO_CACHE_SENTINEL;
        return data;
      },
      useCacheRefresh: function() {
        return unsupportedRefresh;
      },
      useEffectEvent: function() {
        return throwOnUseEffectEventCall;
      }
    };
    var currentResumableState = null;
    var DefaultAsyncDispatcher = {
      getCacheForType: function() {
        throw Error("Not implemented.");
      },
      cacheSignal: function() {
        throw Error("Not implemented.");
      }
    };
    var prefix;
    var suffix;
    function describeBuiltInComponentFrame(name) {
      if (void 0 === prefix)
        try {
          throw Error();
        } catch (x) {
          var match = x.stack.trim().match(/\n( *(at )?)/);
          prefix = match && match[1] || "";
          suffix = -1 < x.stack.indexOf("\n    at") ? " (<anonymous>)" : -1 < x.stack.indexOf("@") ? "@unknown:0:0" : "";
        }
      return "\n" + prefix + name + suffix;
    }
    var reentry = false;
    function describeNativeComponentFrame(fn, construct) {
      if (!fn || reentry) return "";
      reentry = true;
      var previousPrepareStackTrace = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      try {
        var RunInRootFrame = {
          DetermineComponentFrameRoot: function() {
            try {
              if (construct) {
                var Fake = function() {
                  throw Error();
                };
                Object.defineProperty(Fake.prototype, "props", {
                  set: function() {
                    throw Error();
                  }
                });
                if ("object" === typeof Reflect && Reflect.construct) {
                  try {
                    Reflect.construct(Fake, []);
                  } catch (x) {
                    var control = x;
                  }
                  Reflect.construct(fn, [], Fake);
                } else {
                  try {
                    Fake.call();
                  } catch (x$24) {
                    control = x$24;
                  }
                  Fake = false;
                  try {
                    var prevProps = Object.getOwnPropertyDescriptor(
                      fn.prototype,
                      "props"
                    );
                    Object.defineProperty(fn.prototype, "props", {
                      configurable: true,
                      set: function() {
                        throw Error();
                      }
                    });
                    Fake = true;
                    new fn();
                  } finally {
                    Fake && (void 0 !== prevProps ? Object.defineProperty(fn.prototype, "props", prevProps) : delete fn.prototype.props);
                  }
                }
              } else {
                try {
                  throw Error();
                } catch (x$25) {
                  control = x$25;
                }
                (Fake = fn()) && "function" === typeof Fake.catch && Fake.catch(function() {
                });
              }
            } catch (sample) {
              if (sample && control && "string" === typeof sample.stack)
                return [sample.stack, control.stack];
            }
            return [null, null];
          }
        };
        RunInRootFrame.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
        var namePropDescriptor = Object.getOwnPropertyDescriptor(
          RunInRootFrame.DetermineComponentFrameRoot,
          "name"
        );
        namePropDescriptor && namePropDescriptor.configurable && Object.defineProperty(
          RunInRootFrame.DetermineComponentFrameRoot,
          "name",
          { value: "DetermineComponentFrameRoot" }
        );
        var _RunInRootFrame$Deter = RunInRootFrame.DetermineComponentFrameRoot(), sampleStack = _RunInRootFrame$Deter[0], controlStack = _RunInRootFrame$Deter[1];
        if (sampleStack && controlStack) {
          var sampleLines = sampleStack.split("\n"), controlLines = controlStack.split("\n");
          for (namePropDescriptor = RunInRootFrame = 0; RunInRootFrame < sampleLines.length && !sampleLines[RunInRootFrame].includes("DetermineComponentFrameRoot"); )
            RunInRootFrame++;
          for (; namePropDescriptor < controlLines.length && !controlLines[namePropDescriptor].includes(
            "DetermineComponentFrameRoot"
          ); )
            namePropDescriptor++;
          if (RunInRootFrame === sampleLines.length || namePropDescriptor === controlLines.length)
            for (RunInRootFrame = sampleLines.length - 1, namePropDescriptor = controlLines.length - 1; 1 <= RunInRootFrame && 0 <= namePropDescriptor && sampleLines[RunInRootFrame] !== controlLines[namePropDescriptor]; )
              namePropDescriptor--;
          for (; 1 <= RunInRootFrame && 0 <= namePropDescriptor; RunInRootFrame--, namePropDescriptor--)
            if (sampleLines[RunInRootFrame] !== controlLines[namePropDescriptor]) {
              if (1 !== RunInRootFrame || 1 !== namePropDescriptor) {
                do
                  if (RunInRootFrame--, namePropDescriptor--, 0 > namePropDescriptor || sampleLines[RunInRootFrame] !== controlLines[namePropDescriptor]) {
                    var frame = "\n" + sampleLines[RunInRootFrame].replace(" at new ", " at ");
                    fn.displayName && frame.includes("<anonymous>") && (frame = frame.replace("<anonymous>", fn.displayName));
                    return frame;
                  }
                while (1 <= RunInRootFrame && 0 <= namePropDescriptor);
              }
              break;
            }
        }
      } finally {
        reentry = false, Error.prepareStackTrace = previousPrepareStackTrace;
      }
      return (previousPrepareStackTrace = fn ? fn.displayName || fn.name : "") ? describeBuiltInComponentFrame(previousPrepareStackTrace) : "";
    }
    function describeComponentStackByType(type) {
      if ("string" === typeof type) return describeBuiltInComponentFrame(type);
      if ("function" === typeof type)
        return type.prototype && type.prototype.isReactComponent ? describeNativeComponentFrame(type, true) : describeNativeComponentFrame(type, false);
      if ("object" === typeof type && null !== type) {
        switch (type.$$typeof) {
          case REACT_FORWARD_REF_TYPE:
            return describeNativeComponentFrame(type.render, false);
          case REACT_MEMO_TYPE:
            return describeNativeComponentFrame(type.type, false);
          case REACT_LAZY_TYPE:
            var lazyComponent = type, payload = lazyComponent._payload;
            lazyComponent = lazyComponent._init;
            try {
              type = lazyComponent(payload);
            } catch (x) {
              return describeBuiltInComponentFrame("Lazy");
            }
            return describeComponentStackByType(type);
        }
        if ("string" === typeof type.name) {
          a: {
            payload = type.name;
            lazyComponent = type.env;
            var location = type.debugLocation;
            if (null != location && (type = Error.prepareStackTrace, Error.prepareStackTrace = void 0, location = location.stack, Error.prepareStackTrace = type, location.startsWith("Error: react-stack-top-frame\n") && (location = location.slice(29)), type = location.indexOf("\n"), -1 !== type && (location = location.slice(type + 1)), type = location.indexOf("react_stack_bottom_frame"), -1 !== type && (type = location.lastIndexOf("\n", type)), type = -1 !== type ? location = location.slice(0, type) : "", location = type.lastIndexOf("\n"), type = -1 === location ? type : type.slice(location + 1), -1 !== type.indexOf(payload))) {
              payload = "\n" + type;
              break a;
            }
            payload = describeBuiltInComponentFrame(
              payload + (lazyComponent ? " [" + lazyComponent + "]" : "")
            );
          }
          return payload;
        }
      }
      switch (type) {
        case REACT_SUSPENSE_LIST_TYPE:
          return describeBuiltInComponentFrame("SuspenseList");
        case REACT_SUSPENSE_TYPE:
          return describeBuiltInComponentFrame("Suspense");
        case REACT_VIEW_TRANSITION_TYPE:
          return describeBuiltInComponentFrame("ViewTransition");
      }
      return "";
    }
    function isEligibleForOutlining(request, boundary) {
      return (500 < boundary.byteSize || boundary.defer) && null === boundary.preamble;
    }
    function defaultErrorHandler(error) {
      if ("object" === typeof error && null !== error && "string" === typeof error.environmentName) {
        var JSCompiler_inline_result = error.environmentName;
        error = [error].slice(0);
        "string" === typeof error[0] ? error.splice(
          0,
          1,
          "[%s] " + error[0],
          " " + JSCompiler_inline_result + " "
        ) : error.splice(0, 0, "[%s]", " " + JSCompiler_inline_result + " ");
        error.unshift(console);
        JSCompiler_inline_result = bind.apply(console.error, error);
        JSCompiler_inline_result();
      } else console.error(error);
      return null;
    }
    function RequestInstance(resumableState, renderState, rootFormatContext, progressiveChunkSize, onError2, onBrowserBailout, onAllReady, onShellReady, onShellError, onFatalError, formState) {
      var abortSet = /* @__PURE__ */ new Set();
      this.destination = null;
      this.flushScheduled = false;
      this.resumableState = resumableState;
      this.renderState = renderState;
      this.rootFormatContext = rootFormatContext;
      this.progressiveChunkSize = void 0 === progressiveChunkSize ? 12800 : progressiveChunkSize;
      this.status = 10;
      this.fatalError = null;
      this.aborted = false;
      this.pendingRootTasks = this.allPendingTasks = this.nextSegmentId = 0;
      this.completedPreambleSegments = this.completedRootSegment = null;
      this.byteSize = 0;
      this.abortableTasks = abortSet;
      this.pingedTasks = [];
      this.currentTask = null;
      this.clientRenderedBoundaries = [];
      this.completedBoundaries = [];
      this.partialBoundaries = [];
      this.postponedState = this.trackedPostpones = null;
      this.onError = void 0 === onError2 ? defaultErrorHandler : onError2;
      this.onBrowserBailout = void 0 === onBrowserBailout ? noop : onBrowserBailout;
      this.onAllReady = void 0 === onAllReady ? noop : onAllReady;
      this.onShellReady = void 0 === onShellReady ? noop : onShellReady;
      this.onShellError = void 0 === onShellError ? noop : onShellError;
      this.onFatalError = void 0 === onFatalError ? noop : onFatalError;
      this.renderLifetimeController = null;
      this.formState = void 0 === formState ? null : formState;
    }
    function createRequest(children, resumableState, renderState, rootFormatContext, progressiveChunkSize, onError2, onBrowserBailout, onAllReady, onShellReady, onShellError, onFatalError, formState) {
      resumableState = new RequestInstance(
        resumableState,
        renderState,
        rootFormatContext,
        progressiveChunkSize,
        onError2,
        onBrowserBailout,
        onAllReady,
        onShellReady,
        onShellError,
        onFatalError,
        formState
      );
      renderState = createPendingSegment(
        resumableState,
        0,
        null,
        rootFormatContext,
        false,
        false
      );
      renderState.parentFlushed = true;
      children = createRenderTask(
        resumableState,
        null,
        children,
        -1,
        null,
        renderState,
        null,
        null,
        resumableState.abortableTasks,
        null,
        rootFormatContext,
        null,
        emptyTreeContext,
        null,
        null
      );
      pushComponentStack(children);
      resumableState.pingedTasks.push(children);
      return resumableState;
    }
    var currentRequest = null;
    function pingTask(request, task) {
      request.pingedTasks.push(task);
      1 === request.pingedTasks.length && (request.flushScheduled = null !== request.destination, performWork(request));
    }
    function createSuspenseBoundary(request, row, fallbackAbortableTasks, preamble, defer) {
      fallbackAbortableTasks = {
        status: 0,
        rootSegmentID: -1,
        parentFlushed: false,
        pendingTasks: 0,
        row,
        completedSegments: [],
        byteSize: 0,
        defer,
        fallbackAbortableTasks,
        errorDigest: null,
        contentState: createHoistableState(),
        fallbackState: createHoistableState(),
        preamble,
        tracked: null
      };
      null !== row && (row.pendingTasks++, preamble = row.boundaries, null !== preamble && (request.allPendingTasks++, fallbackAbortableTasks.pendingTasks++, preamble.push(fallbackAbortableTasks)), request = row.inheritedHoistables, null !== request && hoistHoistables(fallbackAbortableTasks.contentState, request));
      return fallbackAbortableTasks;
    }
    function createRenderTask(request, thenableState2, node, childIndex, blockedBoundary, blockedSegment, blockedPreamble, hoistableState, abortSet, keyPath, formatContext, context, treeContext, row, componentStack) {
      request.allPendingTasks++;
      null === blockedBoundary ? request.pendingRootTasks++ : blockedBoundary.pendingTasks++;
      null !== row && row.pendingTasks++;
      var task = {
        replay: null,
        node,
        childIndex,
        ping: {
          resolve: function() {
            return pingTask(request, task);
          },
          reject: function(error) {
            request.aborted ? task.abortSet.delete(task) && finishAbortedTask(task, request, error) : pingTask(request, task);
          }
        },
        blockedBoundary,
        blockedSegment,
        blockedPreamble,
        hoistableState,
        abortSet,
        keyPath,
        formatContext,
        context,
        treeContext,
        row,
        componentStack,
        thenableState: thenableState2
      };
      abortSet.add(task);
      return task;
    }
    function createReplayTask(request, thenableState2, replay, node, childIndex, blockedBoundary, hoistableState, abortSet, keyPath, formatContext, context, treeContext, row, componentStack) {
      request.allPendingTasks++;
      null === blockedBoundary ? request.pendingRootTasks++ : blockedBoundary.pendingTasks++;
      null !== row && row.pendingTasks++;
      replay.pendingTasks++;
      var task = {
        replay,
        node,
        childIndex,
        ping: {
          resolve: function() {
            return pingTask(request, task);
          },
          reject: function(error) {
            request.aborted ? task.abortSet.delete(task) && finishAbortedTask(task, request, error) : pingTask(request, task);
          }
        },
        blockedBoundary,
        blockedSegment: null,
        blockedPreamble: null,
        hoistableState,
        abortSet,
        keyPath,
        formatContext,
        context,
        treeContext,
        row,
        componentStack,
        thenableState: thenableState2
      };
      abortSet.add(task);
      return task;
    }
    function createPendingSegment(request, index, boundary, parentFormatContext, lastPushedText, textEmbedded) {
      return {
        status: 0,
        parentFlushed: false,
        id: -1,
        index,
        chunks: [],
        children: [],
        preambleChildren: [],
        parentFormatContext,
        boundary,
        lastPushedText,
        textEmbedded
      };
    }
    function pushComponentStack(task) {
      var node = task.node;
      if ("object" === typeof node && null !== node)
        switch (node.$$typeof) {
          case REACT_ELEMENT_TYPE:
            task.componentStack = { parent: task.componentStack, type: node.type };
        }
    }
    function replaceSuspenseComponentStackWithSuspenseFallbackStack(componentStack) {
      return null === componentStack ? null : { parent: componentStack.parent, type: "Suspense Fallback" };
    }
    function getThrownInfo(node$jscomp$0) {
      var errorInfo = {};
      node$jscomp$0 && Object.defineProperty(errorInfo, "componentStack", {
        configurable: true,
        enumerable: true,
        get: function() {
          try {
            var info = "", node = node$jscomp$0;
            do
              info += describeComponentStackByType(node.type), node = node.parent;
            while (node);
            var JSCompiler_inline_result = info;
          } catch (x) {
            JSCompiler_inline_result = "\nError generating stack: " + x.message + "\n" + x.stack;
          }
          Object.defineProperty(errorInfo, "componentStack", {
            value: JSCompiler_inline_result
          });
          return JSCompiler_inline_result;
        }
      });
      return errorInfo;
    }
    function logRecoverableError(request, error, errorInfo) {
      if (isRecoverableError(error))
        return request = request.onBrowserBailout, request(error, errorInfo), "";
      request = request.onError;
      error = request(error, errorInfo);
      if (null == error || "string" === typeof error)
        return "" === error ? void 0 : error;
    }
    function fatalError(request, error) {
      var onShellError = request.onShellError, onFatalError = request.onFatalError;
      0 !== request.pendingRootTasks && onShellError(error);
      onFatalError(error);
      endRenderLifetime(request);
      null !== request.destination ? (request.status = 13, request.destination.destroy(error)) : (request.status = 12, request.aborted || (request.fatalError = error));
    }
    function finishSuspenseListRow(request, row) {
      unblockSuspenseListRow(request, row.next, row.hoistables);
    }
    function unblockSuspenseListRow(request, unblockedRow, inheritedHoistables) {
      for (; null !== unblockedRow; ) {
        null !== inheritedHoistables && (hoistHoistables(unblockedRow.hoistables, inheritedHoistables), unblockedRow.inheritedHoistables = inheritedHoistables);
        var unblockedBoundaries = unblockedRow.boundaries;
        if (null !== unblockedBoundaries) {
          unblockedRow.boundaries = null;
          for (var i = 0; i < unblockedBoundaries.length; i++) {
            var unblockedBoundary = unblockedBoundaries[i];
            null !== inheritedHoistables && hoistHoistables(unblockedBoundary.contentState, inheritedHoistables);
            finishedTask(request, unblockedBoundary, null, null);
          }
        }
        unblockedRow.pendingTasks--;
        if (0 < unblockedRow.pendingTasks) break;
        inheritedHoistables = unblockedRow.hoistables;
        unblockedRow = unblockedRow.next;
      }
    }
    function tryToResolveTogetherRow(request, togetherRow) {
      var boundaries = togetherRow.boundaries;
      if (null !== boundaries && togetherRow.pendingTasks === boundaries.length) {
        for (var allCompleteAndInlinable = true, i = 0; i < boundaries.length; i++) {
          var rowBoundary = boundaries[i];
          if (1 !== rowBoundary.pendingTasks || rowBoundary.parentFlushed || isEligibleForOutlining(request, rowBoundary)) {
            allCompleteAndInlinable = false;
            break;
          }
        }
        allCompleteAndInlinable && unblockSuspenseListRow(request, togetherRow, togetherRow.hoistables);
      }
    }
    function createSuspenseListRow(previousRow) {
      var newRow = {
        pendingTasks: 1,
        boundaries: null,
        hoistables: createHoistableState(),
        inheritedHoistables: null,
        together: false,
        next: null
      };
      null !== previousRow && 0 < previousRow.pendingTasks && (newRow.pendingTasks++, newRow.boundaries = [], previousRow.next = newRow);
      return newRow;
    }
    function renderSuspenseListRows(request, task, keyPath, rows, revealOrder) {
      var prevKeyPath = task.keyPath, prevTreeContext = task.treeContext, prevRow = task.row;
      task.keyPath = keyPath;
      keyPath = rows.length;
      var previousSuspenseListRow = null;
      if (null !== task.replay) {
        var resumeSlots = task.replay.slots;
        if (null !== resumeSlots && "object" === typeof resumeSlots)
          for (var n = 0; n < keyPath; n++) {
            var i = "backwards" !== revealOrder && "unstable_legacy-backwards" !== revealOrder ? n : keyPath - 1 - n, node = rows[i];
            task.row = previousSuspenseListRow = createSuspenseListRow(
              previousSuspenseListRow
            );
            task.treeContext = pushTreeContext(prevTreeContext, keyPath, i);
            var resumeSegmentID = resumeSlots[i];
            "number" === typeof resumeSegmentID ? (resumeNode(request, task, resumeSegmentID, node, i), delete resumeSlots[i]) : renderNode(request, task, node, i);
            0 === --previousSuspenseListRow.pendingTasks && finishSuspenseListRow(request, previousSuspenseListRow);
          }
        else
          for (resumeSlots = 0; resumeSlots < keyPath; resumeSlots++)
            n = "backwards" !== revealOrder && "unstable_legacy-backwards" !== revealOrder ? resumeSlots : keyPath - 1 - resumeSlots, i = rows[n], task.row = previousSuspenseListRow = createSuspenseListRow(previousSuspenseListRow), task.treeContext = pushTreeContext(prevTreeContext, keyPath, n), renderNode(request, task, i, n), 0 === --previousSuspenseListRow.pendingTasks && finishSuspenseListRow(request, previousSuspenseListRow);
      } else if ("backwards" !== revealOrder && "unstable_legacy-backwards" !== revealOrder)
        for (revealOrder = 0; revealOrder < keyPath; revealOrder++)
          resumeSlots = rows[revealOrder], task.row = previousSuspenseListRow = createSuspenseListRow(previousSuspenseListRow), task.treeContext = pushTreeContext(
            prevTreeContext,
            keyPath,
            revealOrder
          ), renderNode(request, task, resumeSlots, revealOrder), 0 === --previousSuspenseListRow.pendingTasks && finishSuspenseListRow(request, previousSuspenseListRow);
      else {
        resumeSlots = task.blockedSegment;
        n = resumeSlots.children.length;
        i = resumeSlots.chunks.length;
        for (node = 0; node < keyPath; node++) {
          resumeSegmentID = "unstable_legacy-backwards" === revealOrder ? keyPath - 1 - node : node;
          var node$39 = rows[resumeSegmentID];
          task.row = previousSuspenseListRow = createSuspenseListRow(
            previousSuspenseListRow
          );
          task.treeContext = pushTreeContext(
            prevTreeContext,
            keyPath,
            resumeSegmentID
          );
          var newSegment = createPendingSegment(
            request,
            i,
            null,
            task.formatContext,
            0 === resumeSegmentID ? resumeSlots.lastPushedText : true,
            true
          );
          resumeSlots.children.splice(n, 0, newSegment);
          task.blockedSegment = newSegment;
          try {
            renderNode(request, task, node$39, resumeSegmentID), pushSegmentFinale(
              newSegment.chunks,
              request.renderState,
              newSegment.lastPushedText,
              newSegment.textEmbedded
            ), newSegment.status = 1, 0 === --previousSuspenseListRow.pendingTasks && finishSuspenseListRow(request, previousSuspenseListRow);
          } catch (thrownValue) {
            throw newSegment.status = request.aborted ? 3 : 4, thrownValue;
          }
        }
        task.blockedSegment = resumeSlots;
        resumeSlots.lastPushedText = false;
      }
      null !== prevRow && null !== previousSuspenseListRow && 0 < previousSuspenseListRow.pendingTasks && (prevRow.pendingTasks++, previousSuspenseListRow.next = prevRow);
      task.treeContext = prevTreeContext;
      task.row = prevRow;
      task.keyPath = prevKeyPath;
    }
    function renderWithHooks(request, task, keyPath, Component, props, secondArg) {
      var prevThenableState = task.thenableState;
      task.thenableState = null;
      currentlyRenderingComponent = {};
      currentlyRenderingTask = task;
      currentlyRenderingRequest = request;
      currentlyRenderingKeyPath = keyPath;
      actionStateCounter = localIdCounter = 0;
      actionStateMatchingIndex = -1;
      thenableIndexCounter = 0;
      thenableState = prevThenableState;
      for (request = Component(props, secondArg); didScheduleRenderPhaseUpdate; )
        didScheduleRenderPhaseUpdate = false, actionStateCounter = localIdCounter = 0, actionStateMatchingIndex = -1, thenableIndexCounter = 0, numberOfReRenders += 1, workInProgressHook = null, request = Component(props, secondArg);
      resetHooksState();
      return request;
    }
    function finishFunctionComponent(request, task, keyPath, children, hasId, actionStateCount, actionStateMatchingIndex2) {
      var didEmitActionStateMarkers = false;
      if (0 !== actionStateCount && null !== request.formState) {
        var segment = task.blockedSegment;
        if (null !== segment) {
          didEmitActionStateMarkers = true;
          segment = segment.chunks;
          for (var i = 0; i < actionStateCount; i++)
            i === actionStateMatchingIndex2 ? segment.push("<!--F!-->") : segment.push("<!--F-->");
        }
      }
      actionStateCount = task.keyPath;
      task.keyPath = keyPath;
      hasId ? (keyPath = task.treeContext, task.treeContext = pushTreeContext(keyPath, 1, 0), renderNode(request, task, children, -1), task.treeContext = keyPath) : didEmitActionStateMarkers ? renderNode(request, task, children, -1) : renderNodeDestructive(request, task, children, -1);
      task.keyPath = actionStateCount;
    }
    function renderElement(request, task, keyPath, type, props, ref) {
      if ("function" === typeof type)
        if (type.prototype && type.prototype.isReactComponent) {
          var newProps = props;
          if ("ref" in props) {
            newProps = {};
            for (var propName in props)
              "ref" !== propName && (newProps[propName] = props[propName]);
          }
          var defaultProps = type.defaultProps;
          if (defaultProps) {
            newProps === props && (newProps = assign({}, newProps, props));
            for (var propName$44 in defaultProps)
              void 0 === newProps[propName$44] && (newProps[propName$44] = defaultProps[propName$44]);
          }
          var JSCompiler_inline_result = newProps;
          var context = emptyContextObject, contextType = type.contextType;
          "object" === typeof contextType && null !== contextType && (context = contextType._currentValue2);
          var JSCompiler_inline_result$jscomp$0 = new type(
            JSCompiler_inline_result,
            context
          );
          var initialState = void 0 !== JSCompiler_inline_result$jscomp$0.state ? JSCompiler_inline_result$jscomp$0.state : null;
          JSCompiler_inline_result$jscomp$0.updater = classComponentUpdater;
          JSCompiler_inline_result$jscomp$0.props = JSCompiler_inline_result;
          JSCompiler_inline_result$jscomp$0.state = initialState;
          var internalInstance = { queue: [], replace: false };
          JSCompiler_inline_result$jscomp$0._reactInternals = internalInstance;
          var contextType$jscomp$0 = type.contextType;
          JSCompiler_inline_result$jscomp$0.context = "object" === typeof contextType$jscomp$0 && null !== contextType$jscomp$0 ? contextType$jscomp$0._currentValue2 : emptyContextObject;
          var getDerivedStateFromProps = type.getDerivedStateFromProps;
          if ("function" === typeof getDerivedStateFromProps) {
            var partialState = getDerivedStateFromProps(
              JSCompiler_inline_result,
              initialState
            );
            var JSCompiler_inline_result$jscomp$1 = null === partialState || void 0 === partialState ? initialState : assign({}, initialState, partialState);
            JSCompiler_inline_result$jscomp$0.state = JSCompiler_inline_result$jscomp$1;
          }
          if ("function" !== typeof type.getDerivedStateFromProps && "function" !== typeof JSCompiler_inline_result$jscomp$0.getSnapshotBeforeUpdate && ("function" === typeof JSCompiler_inline_result$jscomp$0.UNSAFE_componentWillMount || "function" === typeof JSCompiler_inline_result$jscomp$0.componentWillMount)) {
            var oldState = JSCompiler_inline_result$jscomp$0.state;
            "function" === typeof JSCompiler_inline_result$jscomp$0.componentWillMount && JSCompiler_inline_result$jscomp$0.componentWillMount();
            "function" === typeof JSCompiler_inline_result$jscomp$0.UNSAFE_componentWillMount && JSCompiler_inline_result$jscomp$0.UNSAFE_componentWillMount();
            oldState !== JSCompiler_inline_result$jscomp$0.state && classComponentUpdater.enqueueReplaceState(
              JSCompiler_inline_result$jscomp$0,
              JSCompiler_inline_result$jscomp$0.state,
              null
            );
            if (null !== internalInstance.queue && 0 < internalInstance.queue.length) {
              var oldQueue = internalInstance.queue, oldReplace = internalInstance.replace;
              internalInstance.queue = null;
              internalInstance.replace = false;
              if (oldReplace && 1 === oldQueue.length)
                JSCompiler_inline_result$jscomp$0.state = oldQueue[0];
              else {
                for (var nextState = oldReplace ? oldQueue[0] : JSCompiler_inline_result$jscomp$0.state, dontMutate = true, i = oldReplace ? 1 : 0; i < oldQueue.length; i++) {
                  var partial = oldQueue[i], partialState$jscomp$0 = "function" === typeof partial ? partial.call(
                    JSCompiler_inline_result$jscomp$0,
                    nextState,
                    JSCompiler_inline_result,
                    void 0
                  ) : partial;
                  null != partialState$jscomp$0 && (dontMutate ? (dontMutate = false, nextState = assign({}, nextState, partialState$jscomp$0)) : assign(nextState, partialState$jscomp$0));
                }
                JSCompiler_inline_result$jscomp$0.state = nextState;
              }
            } else internalInstance.queue = null;
          }
          var nextChildren = JSCompiler_inline_result$jscomp$0.render();
          if (request.aborted) throw null;
          var prevKeyPath = task.keyPath;
          task.keyPath = keyPath;
          renderNodeDestructive(request, task, nextChildren, -1);
          task.keyPath = prevKeyPath;
        } else {
          var value = renderWithHooks(request, task, keyPath, type, props, void 0);
          if (request.aborted) throw null;
          finishFunctionComponent(
            request,
            task,
            keyPath,
            value,
            0 !== localIdCounter,
            actionStateCounter,
            actionStateMatchingIndex
          );
        }
      else if ("string" === typeof type) {
        var segment = task.blockedSegment;
        if (null === segment) {
          var children = props.children, prevContext = task.formatContext, prevKeyPath$jscomp$0 = task.keyPath;
          task.formatContext = getChildFormatContext(prevContext, type, props);
          task.keyPath = keyPath;
          renderNode(request, task, children, -1);
          task.formatContext = prevContext;
          task.keyPath = prevKeyPath$jscomp$0;
        } else {
          var children$41 = pushStartInstance(
            segment.chunks,
            type,
            props,
            request.resumableState,
            request.renderState,
            task.blockedPreamble,
            task.hoistableState,
            task.formatContext,
            segment.lastPushedText
          );
          segment.lastPushedText = false;
          var prevContext$42 = task.formatContext, prevKeyPath$43 = task.keyPath;
          task.keyPath = keyPath;
          if (3 === (task.formatContext = getChildFormatContext(
            prevContext$42,
            type,
            props
          )).insertionMode) {
            var preambleSegment = createPendingSegment(
              request,
              0,
              null,
              task.formatContext,
              false,
              false
            );
            segment.preambleChildren.push(preambleSegment);
            task.blockedSegment = preambleSegment;
            try {
              renderNode(request, task, children$41, -1), pushSegmentFinale(
                preambleSegment.chunks,
                request.renderState,
                preambleSegment.lastPushedText,
                preambleSegment.textEmbedded
              ), preambleSegment.status = 1;
            } finally {
              task.blockedSegment = segment;
            }
          } else renderNode(request, task, children$41, -1);
          task.formatContext = prevContext$42;
          task.keyPath = prevKeyPath$43;
          a: {
            var target = segment.chunks, resumableState = request.resumableState;
            switch (type) {
              case "title":
              case "style":
              case "script":
              case "area":
              case "base":
              case "br":
              case "col":
              case "embed":
              case "hr":
              case "img":
              case "input":
              case "keygen":
              case "link":
              case "meta":
              case "param":
              case "source":
              case "track":
              case "wbr":
                break a;
              case "body":
                if (1 >= prevContext$42.insertionMode) {
                  resumableState.hasBody = true;
                  break a;
                }
                break;
              case "html":
                if (0 === prevContext$42.insertionMode) {
                  resumableState.hasHtml = true;
                  break a;
                }
                break;
              case "head":
                if (1 >= prevContext$42.insertionMode) break a;
            }
            target.push(endChunkForTag(type));
          }
          segment.lastPushedText = false;
        }
      } else {
        switch (type) {
          case REACT_LEGACY_HIDDEN_TYPE:
          case REACT_STRICT_MODE_TYPE:
          case REACT_PROFILER_TYPE:
          case REACT_FRAGMENT_TYPE:
            var prevKeyPath$jscomp$1 = task.keyPath;
            task.keyPath = keyPath;
            renderNodeDestructive(request, task, props.children, -1);
            task.keyPath = prevKeyPath$jscomp$1;
            return;
          case REACT_ACTIVITY_TYPE:
            var segment$jscomp$0 = task.blockedSegment;
            if (null === segment$jscomp$0) {
              if ("hidden" !== props.mode) {
                var prevKeyPath$jscomp$2 = task.keyPath;
                task.keyPath = keyPath;
                renderNode(request, task, props.children, -1);
                task.keyPath = prevKeyPath$jscomp$2;
              }
            } else if ("hidden" !== props.mode) {
              request.renderState.generateStaticMarkup || segment$jscomp$0.chunks.push("<!--&-->");
              segment$jscomp$0.lastPushedText = false;
              var prevKeyPath$46 = task.keyPath;
              task.keyPath = keyPath;
              renderNode(request, task, props.children, -1);
              task.keyPath = prevKeyPath$46;
              request.renderState.generateStaticMarkup || segment$jscomp$0.chunks.push("<!--/&-->");
              segment$jscomp$0.lastPushedText = false;
            }
            return;
          case REACT_SUSPENSE_LIST_TYPE:
            a: {
              var children$jscomp$0 = props.children, revealOrder = props.revealOrder;
              if ("independent" !== revealOrder && "together" !== revealOrder) {
                if (isArrayImpl(children$jscomp$0)) {
                  renderSuspenseListRows(
                    request,
                    task,
                    keyPath,
                    children$jscomp$0,
                    revealOrder
                  );
                  break a;
                }
                var iteratorFn = getIteratorFn(children$jscomp$0);
                if (iteratorFn) {
                  var iterator = iteratorFn.call(children$jscomp$0);
                  if (iterator) {
                    var step = iterator.next();
                    if (!step.done) {
                      do
                        step = iterator.next();
                      while (!step.done);
                      renderSuspenseListRows(
                        request,
                        task,
                        keyPath,
                        children$jscomp$0,
                        revealOrder
                      );
                    }
                    break a;
                  }
                }
              }
              if ("together" === revealOrder) {
                var prevKeyPath$40 = task.keyPath, prevRow = task.row, newRow = task.row = createSuspenseListRow(null);
                newRow.boundaries = [];
                newRow.together = true;
                task.keyPath = keyPath;
                renderNodeDestructive(request, task, children$jscomp$0, -1);
                0 === --newRow.pendingTasks && finishSuspenseListRow(request, newRow);
                task.keyPath = prevKeyPath$40;
                task.row = prevRow;
                null !== prevRow && 0 < newRow.pendingTasks && (prevRow.pendingTasks++, newRow.next = prevRow);
              } else {
                var prevKeyPath$jscomp$3 = task.keyPath;
                task.keyPath = keyPath;
                renderNodeDestructive(request, task, children$jscomp$0, -1);
                task.keyPath = prevKeyPath$jscomp$3;
              }
            }
            return;
          case REACT_VIEW_TRANSITION_TYPE:
            var prevContext$jscomp$0 = task.formatContext, prevKeyPath$jscomp$4 = task.keyPath;
            var resumableState$jscomp$0 = request.resumableState;
            if (null == props.name || "auto" === props.name) {
              var treeId = getTreeId(task.treeContext);
              makeId(resumableState$jscomp$0, treeId, 0);
            }
            task.formatContext = prevContext$jscomp$0;
            task.keyPath = keyPath;
            if (null != props.name && "auto" !== props.name)
              renderNodeDestructive(request, task, props.children, -1);
            else {
              var prevTreeContext = task.treeContext;
              task.treeContext = pushTreeContext(prevTreeContext, 1, 0);
              renderNode(request, task, props.children, -1);
              task.treeContext = prevTreeContext;
            }
            task.formatContext = prevContext$jscomp$0;
            task.keyPath = prevKeyPath$jscomp$4;
            return;
          case REACT_SCOPE_TYPE:
            throw Error("ReactDOMServer does not yet support scope components.");
          case REACT_SUSPENSE_TYPE:
            a: if (null !== task.replay) {
              var prevKeyPath$26 = task.keyPath, prevContext$27 = task.formatContext, prevRow$28 = task.row;
              task.keyPath = keyPath;
              task.formatContext = getSuspenseContentFormatContext(
                request.resumableState,
                prevContext$27
              );
              task.row = null;
              var content$29 = props.children;
              try {
                renderNode(request, task, content$29, -1);
              } finally {
                task.keyPath = prevKeyPath$26, task.formatContext = prevContext$27, task.row = prevRow$28;
              }
            } else {
              var prevKeyPath$jscomp$5 = task.keyPath, prevContext$jscomp$1 = task.formatContext, prevRow$jscomp$0 = task.row, parentBoundary = task.blockedBoundary, parentPreamble = task.blockedPreamble, parentHoistableState = task.hoistableState, parentSegment = task.blockedSegment, fallback = props.fallback, content = props.children, fallbackAbortSet = /* @__PURE__ */ new Set(), newBoundary = createSuspenseBoundary(
                request,
                task.row,
                fallbackAbortSet,
                null,
                false
              ), boundarySegment = createPendingSegment(
                request,
                parentSegment.chunks.length,
                newBoundary,
                task.formatContext,
                false,
                false
              );
              parentSegment.children.push(boundarySegment);
              parentSegment.lastPushedText = false;
              var contentRootSegment = createPendingSegment(
                request,
                0,
                null,
                task.formatContext,
                false,
                false
              );
              contentRootSegment.parentFlushed = true;
              var trackedPostpones = request.trackedPostpones;
              if (null !== trackedPostpones) {
                var suspenseComponentStack = task.componentStack, fallbackKeyPath = [keyPath[0], "Suspense Fallback", keyPath[2]];
                if (null !== trackedPostpones) {
                  var fallbackReplayNode = [
                    fallbackKeyPath[1],
                    fallbackKeyPath[2],
                    [],
                    null
                  ];
                  trackedPostpones.workingMap.set(
                    fallbackKeyPath,
                    fallbackReplayNode
                  );
                  newBoundary.tracked = {
                    contentKeyPath: keyPath,
                    fallbackNode: fallbackReplayNode
                  };
                }
                task.blockedSegment = boundarySegment;
                task.blockedPreamble = null === newBoundary.preamble ? null : newBoundary.preamble.fallback;
                task.keyPath = fallbackKeyPath;
                task.formatContext = getSuspenseFallbackFormatContext(
                  request.resumableState,
                  prevContext$jscomp$1
                );
                task.componentStack = replaceSuspenseComponentStackWithSuspenseFallbackStack(
                  suspenseComponentStack
                );
                try {
                  renderNode(request, task, fallback, -1), pushSegmentFinale(
                    boundarySegment.chunks,
                    request.renderState,
                    boundarySegment.lastPushedText,
                    boundarySegment.textEmbedded
                  ), boundarySegment.status = 1;
                } catch (thrownValue) {
                  throw boundarySegment.status = request.aborted ? 3 : 4, thrownValue;
                } finally {
                  task.blockedSegment = parentSegment, task.blockedPreamble = parentPreamble, task.keyPath = prevKeyPath$jscomp$5, task.formatContext = prevContext$jscomp$1;
                }
                var suspendedPrimaryTask = createRenderTask(
                  request,
                  null,
                  content,
                  -1,
                  newBoundary,
                  contentRootSegment,
                  null === newBoundary.preamble ? null : newBoundary.preamble.content,
                  newBoundary.contentState,
                  task.abortSet,
                  keyPath,
                  getSuspenseContentFormatContext(
                    request.resumableState,
                    task.formatContext
                  ),
                  task.context,
                  task.treeContext,
                  null,
                  suspenseComponentStack
                );
                pushComponentStack(suspendedPrimaryTask);
                request.pingedTasks.push(suspendedPrimaryTask);
              } else {
                task.blockedBoundary = newBoundary;
                task.blockedPreamble = null === newBoundary.preamble ? null : newBoundary.preamble.content;
                task.hoistableState = newBoundary.contentState;
                task.blockedSegment = contentRootSegment;
                task.keyPath = keyPath;
                task.formatContext = getSuspenseContentFormatContext(
                  request.resumableState,
                  prevContext$jscomp$1
                );
                task.row = null;
                try {
                  if (renderNode(request, task, content, -1), pushSegmentFinale(
                    contentRootSegment.chunks,
                    request.renderState,
                    contentRootSegment.lastPushedText,
                    contentRootSegment.textEmbedded
                  ), contentRootSegment.status = 1, queueCompletedSegment(newBoundary, contentRootSegment), 0 === newBoundary.pendingTasks && 0 === newBoundary.status) {
                    if (newBoundary.status = 1, !isEligibleForOutlining(request, newBoundary)) {
                      null !== prevRow$jscomp$0 && 0 === --prevRow$jscomp$0.pendingTasks && finishSuspenseListRow(request, prevRow$jscomp$0);
                      0 === request.pendingRootTasks && task.blockedPreamble && preparePreamble(request);
                      break a;
                    }
                  } else
                    null !== prevRow$jscomp$0 && prevRow$jscomp$0.together && tryToResolveTogetherRow(request, prevRow$jscomp$0);
                } catch (thrownValue$30) {
                  newBoundary.status = 4;
                  if (request.aborted) {
                    contentRootSegment.status = 3;
                    var error = request.fatalError;
                  } else contentRootSegment.status = 4, error = thrownValue$30;
                  var thrownInfo = getThrownInfo(task.componentStack), errorDigest = logRecoverableError(request, error, thrownInfo);
                  newBoundary.errorDigest = errorDigest;
                  untrackBoundary(request, newBoundary);
                } finally {
                  task.blockedBoundary = parentBoundary, task.blockedPreamble = parentPreamble, task.hoistableState = parentHoistableState, task.blockedSegment = parentSegment, task.keyPath = prevKeyPath$jscomp$5, task.formatContext = prevContext$jscomp$1, task.row = prevRow$jscomp$0;
                }
                var suspendedFallbackTask = createRenderTask(
                  request,
                  null,
                  fallback,
                  -1,
                  parentBoundary,
                  boundarySegment,
                  null === newBoundary.preamble ? null : newBoundary.preamble.fallback,
                  newBoundary.fallbackState,
                  fallbackAbortSet,
                  [keyPath[0], "Suspense Fallback", keyPath[2]],
                  getSuspenseFallbackFormatContext(
                    request.resumableState,
                    task.formatContext
                  ),
                  task.context,
                  task.treeContext,
                  task.row,
                  replaceSuspenseComponentStackWithSuspenseFallbackStack(
                    task.componentStack
                  )
                );
                pushComponentStack(suspendedFallbackTask);
                request.pingedTasks.push(suspendedFallbackTask);
              }
            }
            return;
        }
        if ("object" === typeof type && null !== type)
          switch (type.$$typeof) {
            case REACT_FORWARD_REF_TYPE:
              if ("ref" in props) {
                var propsWithoutRef = {};
                for (var key in props)
                  "ref" !== key && (propsWithoutRef[key] = props[key]);
              } else propsWithoutRef = props;
              var children$jscomp$1 = renderWithHooks(
                request,
                task,
                keyPath,
                type.render,
                propsWithoutRef,
                ref
              );
              finishFunctionComponent(
                request,
                task,
                keyPath,
                children$jscomp$1,
                0 !== localIdCounter,
                actionStateCounter,
                actionStateMatchingIndex
              );
              return;
            case REACT_MEMO_TYPE:
              renderElement(request, task, keyPath, type.type, props, ref);
              return;
            case REACT_CONTEXT_TYPE:
              var children$jscomp$2 = props.children, prevKeyPath$jscomp$6 = task.keyPath, nextValue = props.value;
              var prevValue = type._currentValue2;
              type._currentValue2 = nextValue;
              var prevNode = currentActiveSnapshot, newNode = {
                parent: prevNode,
                depth: null === prevNode ? 0 : prevNode.depth + 1,
                context: type,
                parentValue: prevValue,
                value: nextValue
              };
              currentActiveSnapshot = newNode;
              task.context = newNode;
              task.keyPath = keyPath;
              renderNodeDestructive(request, task, children$jscomp$2, -1);
              var prevSnapshot = currentActiveSnapshot;
              if (null === prevSnapshot)
                throw Error(
                  "Tried to pop a Context at the root of the app. This is a bug in React."
                );
              prevSnapshot.context._currentValue2 = prevSnapshot.parentValue;
              var JSCompiler_inline_result$jscomp$2 = currentActiveSnapshot = prevSnapshot.parent;
              task.context = JSCompiler_inline_result$jscomp$2;
              task.keyPath = prevKeyPath$jscomp$6;
              return;
            case REACT_CONSUMER_TYPE:
              var render = props.children, newChildren = render(type._context._currentValue2), prevKeyPath$jscomp$7 = task.keyPath;
              task.keyPath = keyPath;
              renderNodeDestructive(request, task, newChildren, -1);
              task.keyPath = prevKeyPath$jscomp$7;
              return;
            case REACT_LAZY_TYPE:
              var init = type._init;
              var Component = init(type._payload);
              if (request.aborted) throw null;
              renderElement(request, task, keyPath, Component, props, ref);
              return;
          }
        throw Error(
          "Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: " + ((null == type ? type : typeof type) + ".")
        );
      }
    }
    function resumeNode(request, task, segmentId, node, childIndex) {
      var prevReplay = task.replay, blockedBoundary = task.blockedBoundary, resumedSegment = createPendingSegment(
        request,
        0,
        null,
        task.formatContext,
        false,
        false
      );
      resumedSegment.id = segmentId;
      resumedSegment.parentFlushed = true;
      try {
        task.replay = null, task.blockedSegment = resumedSegment, renderNode(request, task, node, childIndex), resumedSegment.status = 1, null === blockedBoundary ? request.completedRootSegment = resumedSegment : (queueCompletedSegment(blockedBoundary, resumedSegment), blockedBoundary.parentFlushed && request.partialBoundaries.push(blockedBoundary));
      } finally {
        task.replay = prevReplay, task.blockedSegment = null;
      }
    }
    function renderNodeDestructive(request, task, node, childIndex) {
      null !== task.replay && "number" === typeof task.replay.slots ? resumeNode(request, task, task.replay.slots, node, childIndex) : (task.node = node, task.childIndex = childIndex, node = task.componentStack, pushComponentStack(task), retryNode(request, task), task.componentStack = node);
    }
    function retryNode(request, task) {
      var node = task.node, childIndex = task.childIndex;
      if (null !== node) {
        if ("object" === typeof node) {
          switch (node.$$typeof) {
            case REACT_ELEMENT_TYPE:
              var type = node.type, key = node.key, props = node.props;
              node = props.ref;
              var ref = void 0 !== node ? node : null, name = getComponentNameFromType(type), keyOrIndex = null == key || key === REACT_OPTIMISTIC_KEY ? -1 === childIndex ? 0 : childIndex : key;
              key = [task.keyPath, name, keyOrIndex];
              if (null !== task.replay)
                a: {
                  var replay = task.replay;
                  childIndex = replay.nodes;
                  for (node = 0; node < childIndex.length; node++) {
                    var node$jscomp$0 = childIndex[node];
                    if (keyOrIndex === node$jscomp$0[1]) {
                      if (4 === node$jscomp$0.length) {
                        if (null !== name && name !== node$jscomp$0[0])
                          throw Error(
                            "Expected the resume to render <" + node$jscomp$0[0] + "> in this slot but instead it rendered <" + name + ">. The tree doesn't match so React will fallback to client rendering."
                          );
                        var childNodes = node$jscomp$0[2], childSlots = node$jscomp$0[3], currentNode = task.node;
                        task.replay = {
                          nodes: childNodes,
                          slots: childSlots,
                          pendingTasks: 1
                        };
                        try {
                          renderElement(request, task, key, type, props, ref);
                          if (1 === task.replay.pendingTasks && 0 < task.replay.nodes.length)
                            throw Error(
                              "Couldn't find all resumable slots by key/index during replaying. The tree doesn't match so React will fallback to client rendering."
                            );
                          task.replay.pendingTasks--;
                        } catch (x) {
                          if ("object" === typeof x && null !== x && (x === SuspenseException || "function" === typeof x.then || "Maximum call stack size exceeded" === x.message))
                            throw task.node === currentNode ? task.replay = replay : childIndex.splice(node, 1), x;
                          task.replay.pendingTasks--;
                          key = getThrownInfo(task.componentStack);
                          currentNode = request;
                          props = task.blockedBoundary;
                          request = request.aborted ? request.fatalError : x;
                          key = logRecoverableError(currentNode, request, key);
                          abortRemainingReplayNodes(
                            currentNode,
                            props,
                            childNodes,
                            childSlots,
                            request,
                            key
                          );
                        }
                        task.replay = replay;
                      } else {
                        if (type !== REACT_SUSPENSE_TYPE)
                          throw Error(
                            "Expected the resume to render <Suspense> in this slot but instead it rendered <" + (getComponentNameFromType(type) || "Unknown") + ">. The tree doesn't match so React will fallback to client rendering."
                          );
                        b: {
                          replay = node$jscomp$0[5];
                          type = node$jscomp$0[2];
                          ref = node$jscomp$0[3];
                          name = null === node$jscomp$0[4] ? [] : node$jscomp$0[4][2];
                          node$jscomp$0 = null === node$jscomp$0[4] ? null : node$jscomp$0[4][3];
                          keyOrIndex = task.keyPath;
                          var prevContext = task.formatContext, prevRow = task.row, previousReplaySet = task.replay, parentBoundary = task.blockedBoundary, parentHoistableState = task.hoistableState, content = props.children;
                          props = props.fallback;
                          var fallbackAbortSet = /* @__PURE__ */ new Set(), resumedBoundary = createSuspenseBoundary(
                            request,
                            task.row,
                            fallbackAbortSet,
                            null,
                            false
                          );
                          resumedBoundary.parentFlushed = true;
                          resumedBoundary.rootSegmentID = replay;
                          task.blockedBoundary = resumedBoundary;
                          task.hoistableState = resumedBoundary.contentState;
                          task.keyPath = key;
                          task.formatContext = getSuspenseContentFormatContext(
                            request.resumableState,
                            prevContext
                          );
                          task.row = null;
                          task.replay = {
                            nodes: type,
                            slots: ref,
                            pendingTasks: 1
                          };
                          try {
                            renderNode(request, task, content, -1);
                            if (1 === task.replay.pendingTasks && 0 < task.replay.nodes.length)
                              throw Error(
                                "Couldn't find all resumable slots by key/index during replaying. The tree doesn't match so React will fallback to client rendering."
                              );
                            task.replay.pendingTasks--;
                            if (0 === resumedBoundary.pendingTasks && 0 === resumedBoundary.status) {
                              resumedBoundary.status = 1;
                              request.completedBoundaries.push(resumedBoundary);
                              break b;
                            }
                          } catch (thrownValue) {
                            resumedBoundary.status = 4, childNodes = request.aborted ? request.fatalError : thrownValue, childSlots = getThrownInfo(task.componentStack), currentNode = logRecoverableError(
                              request,
                              childNodes,
                              childSlots
                            ), resumedBoundary.errorDigest = currentNode, task.replay.pendingTasks--, request.clientRenderedBoundaries.push(
                              resumedBoundary
                            );
                          } finally {
                            task.blockedBoundary = parentBoundary, task.hoistableState = parentHoistableState, task.replay = previousReplaySet, task.keyPath = keyOrIndex, task.formatContext = prevContext, task.row = prevRow;
                          }
                          childNodes = createReplayTask(
                            request,
                            null,
                            { nodes: name, slots: node$jscomp$0, pendingTasks: 0 },
                            props,
                            -1,
                            parentBoundary,
                            resumedBoundary.fallbackState,
                            fallbackAbortSet,
                            [key[0], "Suspense Fallback", key[2]],
                            getSuspenseFallbackFormatContext(
                              request.resumableState,
                              task.formatContext
                            ),
                            task.context,
                            task.treeContext,
                            task.row,
                            replaceSuspenseComponentStackWithSuspenseFallbackStack(
                              task.componentStack
                            )
                          );
                          pushComponentStack(childNodes);
                          request.pingedTasks.push(childNodes);
                        }
                      }
                      childIndex.splice(node, 1);
                      break a;
                    }
                  }
                }
              else renderElement(request, task, key, type, props, ref);
              return;
            case REACT_PORTAL_TYPE:
              throw Error(
                "Portals are not currently supported by the server renderer. Render them conditionally so that they only appear on the client render."
              );
            case REACT_LAZY_TYPE:
              childNodes = node._init;
              node = childNodes(node._payload);
              if (request.aborted) throw null;
              renderNodeDestructive(request, task, node, childIndex);
              return;
          }
          if (isArrayImpl(node)) {
            renderChildrenArray(request, task, node, childIndex);
            return;
          }
          if (childNodes = getIteratorFn(node)) {
            if (childNodes = childNodes.call(node)) {
              node = childNodes.next();
              if (!node.done) {
                childSlots = [];
                do
                  childSlots.push(node.value), node = childNodes.next();
                while (!node.done);
                renderChildrenArray(request, task, childSlots, childIndex);
              }
              return;
            }
          }
          if ("function" === typeof node.then)
            return task.thenableState = null, renderNodeDestructive(request, task, unwrapThenable(node), childIndex);
          if (node.$$typeof === REACT_CONTEXT_TYPE)
            return renderNodeDestructive(
              request,
              task,
              node._currentValue2,
              childIndex
            );
          childIndex = Object.prototype.toString.call(node);
          throw Error(
            "Objects are not valid as a React child (found: " + ("[object Object]" === childIndex ? "object with keys {" + Object.keys(node).join(", ") + "}" : childIndex) + "). If you meant to render a collection of children, use an array instead."
          );
        }
        if ("string" === typeof node)
          childIndex = task.blockedSegment, null !== childIndex && (childIndex.lastPushedText = pushTextInstance(
            childIndex.chunks,
            node,
            request.renderState,
            childIndex.lastPushedText
          ));
        else if ("number" === typeof node || "bigint" === typeof node)
          childIndex = task.blockedSegment, null !== childIndex && (childIndex.lastPushedText = pushTextInstance(
            childIndex.chunks,
            "" + node,
            request.renderState,
            childIndex.lastPushedText
          ));
      }
    }
    function renderChildrenArray(request, task, children, childIndex) {
      var prevKeyPath = task.keyPath;
      if (-1 !== childIndex && (task.keyPath = [task.keyPath, "Fragment", childIndex], null !== task.replay)) {
        for (var replay = task.replay, replayNodes = replay.nodes, j = 0; j < replayNodes.length; j++) {
          var node = replayNodes[j];
          if (node[1] === childIndex) {
            childIndex = node[2];
            node = node[3];
            task.replay = { nodes: childIndex, slots: node, pendingTasks: 1 };
            try {
              renderChildrenArray(request, task, children, -1);
              if (1 === task.replay.pendingTasks && 0 < task.replay.nodes.length)
                throw Error(
                  "Couldn't find all resumable slots by key/index during replaying. The tree doesn't match so React will fallback to client rendering."
                );
              task.replay.pendingTasks--;
            } catch (x) {
              if ("object" === typeof x && null !== x && (x === SuspenseException || "function" === typeof x.then))
                throw x;
              task.replay.pendingTasks--;
              var thrownInfo = getThrownInfo(task.componentStack);
              children = request;
              var boundary = task.blockedBoundary;
              request = request.aborted ? request.fatalError : x;
              thrownInfo = logRecoverableError(children, request, thrownInfo);
              abortRemainingReplayNodes(
                children,
                boundary,
                childIndex,
                node,
                request,
                thrownInfo
              );
            }
            task.replay = replay;
            replayNodes.splice(j, 1);
            break;
          }
        }
        task.keyPath = prevKeyPath;
        return;
      }
      replay = task.treeContext;
      replayNodes = children.length;
      if (null !== task.replay && (j = task.replay.slots, null !== j && "object" === typeof j)) {
        for (childIndex = 0; childIndex < replayNodes; childIndex++)
          node = children[childIndex], task.treeContext = pushTreeContext(replay, replayNodes, childIndex), boundary = j[childIndex], "number" === typeof boundary ? (resumeNode(request, task, boundary, node, childIndex), delete j[childIndex]) : renderNode(request, task, node, childIndex);
        task.treeContext = replay;
        task.keyPath = prevKeyPath;
        return;
      }
      for (j = 0; j < replayNodes; j++)
        childIndex = children[j], task.treeContext = pushTreeContext(replay, replayNodes, j), renderNode(request, task, childIndex, j);
      task.treeContext = replay;
      task.keyPath = prevKeyPath;
    }
    function trackPostponedBoundary(request, trackedPostpones, boundary) {
      boundary.status = 5;
      boundary.rootSegmentID = request.nextSegmentId++;
      var tracked = boundary.tracked;
      if (null === tracked)
        throw Error(
          "It should not be possible to postpone at the root. This is a bug in React."
        );
      request = tracked.contentKeyPath;
      if (null === request)
        throw Error(
          "It should not be possible to postpone at the root. This is a bug in React."
        );
      tracked = tracked.fallbackNode;
      var children = [], boundaryNode = trackedPostpones.workingMap.get(request);
      if (void 0 === boundaryNode)
        return boundary = [
          request[1],
          request[2],
          children,
          null,
          tracked,
          boundary.rootSegmentID
        ], trackedPostpones.workingMap.set(request, boundary), addToReplayParent(boundary, request[0], trackedPostpones), boundary;
      boundaryNode[4] = tracked;
      boundaryNode[5] = boundary.rootSegmentID;
      return boundaryNode;
    }
    function trackPostpone(request, trackedPostpones, task, segment) {
      segment.status = 5;
      var keyPath = task.keyPath, boundary = task.blockedBoundary;
      if (null === boundary)
        segment.id = request.nextSegmentId++, trackedPostpones.rootSlots = segment.id, null !== request.completedRootSegment && (request.completedRootSegment.status = 5);
      else {
        if (null !== boundary && 0 === boundary.status) {
          var boundaryNode = trackPostponedBoundary(
            request,
            trackedPostpones,
            boundary
          );
          if (null !== boundary.tracked && boundary.tracked.contentKeyPath === keyPath && -1 === task.childIndex) {
            -1 === segment.id && (segment.id = segment.parentFlushed ? boundary.rootSegmentID : request.nextSegmentId++);
            boundaryNode[3] = segment.id;
            return;
          }
        }
        -1 === segment.id && (segment.id = segment.parentFlushed && null !== boundary ? boundary.rootSegmentID : request.nextSegmentId++);
        if (-1 === task.childIndex)
          null === keyPath ? trackedPostpones.rootSlots = segment.id : (task = trackedPostpones.workingMap.get(keyPath), void 0 === task ? (task = [keyPath[1], keyPath[2], [], segment.id], addToReplayParent(task, keyPath[0], trackedPostpones)) : task[3] = segment.id);
        else {
          if (null === keyPath)
            if (request = trackedPostpones.rootSlots, null === request)
              request = trackedPostpones.rootSlots = {};
            else {
              if ("number" === typeof request)
                throw Error(
                  "It should not be possible to postpone both at the root of an element as well as a slot below. This is a bug in React."
                );
            }
          else if (boundary = trackedPostpones.workingMap, boundaryNode = boundary.get(keyPath), void 0 === boundaryNode)
            request = {}, boundaryNode = [keyPath[1], keyPath[2], [], request], boundary.set(keyPath, boundaryNode), addToReplayParent(boundaryNode, keyPath[0], trackedPostpones);
          else if (request = boundaryNode[3], null === request)
            request = boundaryNode[3] = {};
          else if ("number" === typeof request)
            throw Error(
              "It should not be possible to postpone both at the root of an element as well as a slot below. This is a bug in React."
            );
          request[task.childIndex] = segment.id;
        }
      }
    }
    function untrackBoundary(request, boundary) {
      request = request.trackedPostpones;
      null !== request && (boundary = boundary.tracked, null !== boundary && (boundary = boundary.contentKeyPath, null !== boundary && (request = request.workingMap.get(boundary), void 0 !== request && (request.length = 4, request[2] = [], request[3] = null))));
    }
    function spawnNewSuspendedReplayTask(request, task, thenableState2) {
      return createReplayTask(
        request,
        thenableState2,
        task.replay,
        task.node,
        task.childIndex,
        task.blockedBoundary,
        task.hoistableState,
        task.abortSet,
        task.keyPath,
        task.formatContext,
        task.context,
        task.treeContext,
        task.row,
        task.componentStack
      );
    }
    function spawnNewSuspendedRenderTask(request, task, thenableState2) {
      var segment = task.blockedSegment, newSegment = createPendingSegment(
        request,
        segment.chunks.length,
        null,
        task.formatContext,
        segment.lastPushedText,
        true
      );
      segment.children.push(newSegment);
      segment.lastPushedText = false;
      return createRenderTask(
        request,
        thenableState2,
        task.node,
        task.childIndex,
        task.blockedBoundary,
        newSegment,
        task.blockedPreamble,
        task.hoistableState,
        task.abortSet,
        task.keyPath,
        task.formatContext,
        task.context,
        task.treeContext,
        task.row,
        task.componentStack
      );
    }
    function renderNode(request, task, node, childIndex) {
      var previousFormatContext = task.formatContext, previousContext = task.context, previousKeyPath = task.keyPath, previousTreeContext = task.treeContext, previousComponentStack = task.componentStack, segment = task.blockedSegment;
      if (null === segment) {
        segment = task.replay;
        try {
          return renderNodeDestructive(request, task, node, childIndex);
        } catch (thrownValue) {
          if (resetHooksState(), node = thrownValue === SuspenseException ? getSuspendedThenable() : thrownValue, !request.aborted && "object" === typeof node && null !== node) {
            if ("function" === typeof node.then) {
              childIndex = thrownValue === SuspenseException ? getThenableStateAfterSuspending() : null;
              request = spawnNewSuspendedReplayTask(request, task, childIndex).ping;
              node.then(request.resolve, request.reject);
              task.formatContext = previousFormatContext;
              task.context = previousContext;
              task.keyPath = previousKeyPath;
              task.treeContext = previousTreeContext;
              task.componentStack = previousComponentStack;
              task.replay = segment;
              switchContext(previousContext);
              return;
            }
            if ("Maximum call stack size exceeded" === node.message) {
              node = thrownValue === SuspenseException ? getThenableStateAfterSuspending() : null;
              node = spawnNewSuspendedReplayTask(request, task, node);
              request.pingedTasks.push(node);
              task.formatContext = previousFormatContext;
              task.context = previousContext;
              task.keyPath = previousKeyPath;
              task.treeContext = previousTreeContext;
              task.componentStack = previousComponentStack;
              task.replay = segment;
              switchContext(previousContext);
              return;
            }
          }
        }
      } else {
        var childrenLength = segment.children.length, chunkLength = segment.chunks.length;
        try {
          return renderNodeDestructive(request, task, node, childIndex);
        } catch (thrownValue$63) {
          if (resetHooksState(), segment.children.length = childrenLength, segment.chunks.length = chunkLength, node = thrownValue$63 === SuspenseException ? getSuspendedThenable() : thrownValue$63, !request.aborted && "object" === typeof node && null !== node) {
            if ("function" === typeof node.then) {
              segment = node;
              node = thrownValue$63 === SuspenseException ? getThenableStateAfterSuspending() : null;
              request = spawnNewSuspendedRenderTask(request, task, node).ping;
              segment.then(request.resolve, request.reject);
              task.formatContext = previousFormatContext;
              task.context = previousContext;
              task.keyPath = previousKeyPath;
              task.treeContext = previousTreeContext;
              task.componentStack = previousComponentStack;
              switchContext(previousContext);
              return;
            }
            if ("Maximum call stack size exceeded" === node.message) {
              segment = thrownValue$63 === SuspenseException ? getThenableStateAfterSuspending() : null;
              segment = spawnNewSuspendedRenderTask(request, task, segment);
              request.pingedTasks.push(segment);
              task.formatContext = previousFormatContext;
              task.context = previousContext;
              task.keyPath = previousKeyPath;
              task.treeContext = previousTreeContext;
              task.componentStack = previousComponentStack;
              switchContext(previousContext);
              return;
            }
          }
        }
      }
      task.formatContext = previousFormatContext;
      task.context = previousContext;
      task.keyPath = previousKeyPath;
      task.treeContext = previousTreeContext;
      switchContext(previousContext);
      throw node;
    }
    function abortTaskSoft(task) {
      var boundary = task.blockedBoundary, segment = task.blockedSegment;
      null !== segment && (segment.status = 3, finishedTask(this, boundary, task.row, segment));
    }
    function abortRemainingReplayNodes(request$jscomp$0, boundary, nodes, slots, error, errorDigest$jscomp$0) {
      for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        if (4 === node.length)
          abortRemainingReplayNodes(
            request$jscomp$0,
            boundary,
            node[2],
            node[3],
            error,
            errorDigest$jscomp$0
          );
        else {
          node = node[5];
          var request = request$jscomp$0, errorDigest = errorDigest$jscomp$0, resumedBoundary = createSuspenseBoundary(
            request,
            null,
            /* @__PURE__ */ new Set(),
            null,
            false
          );
          resumedBoundary.parentFlushed = true;
          resumedBoundary.rootSegmentID = node;
          resumedBoundary.status = 4;
          resumedBoundary.errorDigest = errorDigest;
          resumedBoundary.parentFlushed && request.clientRenderedBoundaries.push(resumedBoundary);
        }
      }
      nodes.length = 0;
      if (null !== slots) {
        if (null === boundary)
          throw Error(
            "We should not have any resumable nodes in the shell. This is a bug in React."
          );
        4 !== boundary.status && (boundary.status = 4, boundary.errorDigest = errorDigest$jscomp$0, boundary.parentFlushed && request$jscomp$0.clientRenderedBoundaries.push(boundary));
        if ("object" === typeof slots) for (var index in slots) delete slots[index];
      }
    }
    function abortTask(task, request) {
      if (task !== request.currentTask) {
        var boundary = task.blockedBoundary;
        task = task.blockedSegment;
        null !== task && (task.status = 3);
        null !== boundary && boundary.fallbackAbortableTasks.forEach(function(fallbackTask) {
          return abortTask(fallbackTask, request);
        });
      }
    }
    function finishAbortedTask(task, request, error) {
      if (task !== request.currentTask) {
        var boundary = task.blockedBoundary, segment = task.blockedSegment;
        if (null === segment || 3 === segment.status) {
          var errorInfo = getThrownInfo(task.componentStack), isRecoverableReason = isRecoverableError(error);
          if (null === boundary) {
            boundary = task.replay;
            if (null === boundary) {
              isRecoverableReason || null === request.trackedPostpones || null === segment ? isRecoverableReason ? (task = cloneRecoverableErrorAsFatal(error), logRecoverableError(request, task, errorInfo), 12 !== request.status && 13 !== request.status && fatalError(request, task)) : (logRecoverableError(request, error, errorInfo), 12 !== request.status && 13 !== request.status && fatalError(request, error)) : (boundary = request.trackedPostpones, logRecoverableError(request, error, errorInfo), trackPostpone(request, boundary, task, segment), finishedTask(request, null, task.row, segment));
              return;
            }
            12 !== request.status && 13 !== request.status && (boundary.pendingTasks--, 0 === boundary.pendingTasks && 0 < boundary.nodes.length && (errorInfo = logRecoverableError(request, error, errorInfo), abortRemainingReplayNodes(
              request,
              null,
              boundary.nodes,
              boundary.slots,
              error,
              errorInfo
            )), request.pendingRootTasks--, 0 === request.pendingRootTasks && completeShell(request));
          } else {
            var trackedPostpones$64 = request.trackedPostpones;
            if (4 !== boundary.status) {
              if (!isRecoverableReason && null !== trackedPostpones$64 && null !== segment)
                return logRecoverableError(request, error, errorInfo), trackPostpone(request, trackedPostpones$64, task, segment), boundary.fallbackAbortableTasks.forEach(function(fallbackTask) {
                  return finishAbortedTask(fallbackTask, request, error);
                }), boundary.fallbackAbortableTasks.clear(), finishedTask(request, boundary, task.row, segment);
              boundary.status = 4;
              errorInfo = logRecoverableError(request, error, errorInfo);
              boundary.errorDigest = errorInfo;
              untrackBoundary(request, boundary);
              boundary.parentFlushed && request.clientRenderedBoundaries.push(boundary);
            }
            boundary.pendingTasks--;
            errorInfo = boundary.row;
            null !== errorInfo && 0 === --errorInfo.pendingTasks && finishSuspenseListRow(request, errorInfo);
            boundary.fallbackAbortableTasks.forEach(function(fallbackTask) {
              return finishAbortedTask(fallbackTask, request, error);
            });
            boundary.fallbackAbortableTasks.clear();
          }
          task = task.row;
          null !== task && 0 === --task.pendingTasks && finishSuspenseListRow(request, task);
          request.allPendingTasks--;
          0 === request.allPendingTasks && completeAll(request);
        }
      }
    }
    function safelyEmitEarlyPreloads(request, shellComplete) {
      try {
        var renderState = request.renderState, onHeaders = renderState.onHeaders;
        if (onHeaders) {
          var headers = renderState.headers;
          if (headers) {
            renderState.headers = null;
            var linkHeader = headers.preconnects;
            headers.fontPreloads && (linkHeader && (linkHeader += ", "), linkHeader += headers.fontPreloads);
            headers.highImagePreloads && (linkHeader && (linkHeader += ", "), linkHeader += headers.highImagePreloads);
            if (!shellComplete) {
              var queueIter = renderState.styles.values(), queueStep = queueIter.next();
              b: for (; 0 < headers.remainingCapacity && !queueStep.done; queueStep = queueIter.next())
                for (var sheetIter = queueStep.value.sheets.values(), sheetStep = sheetIter.next(); 0 < headers.remainingCapacity && !sheetStep.done; sheetStep = sheetIter.next()) {
                  var sheet = sheetStep.value, props = sheet.props, key = props.href, props$jscomp$0 = sheet.props, header = getPreloadAsHeader(props$jscomp$0.href, "style", {
                    crossOrigin: props$jscomp$0.crossOrigin,
                    integrity: props$jscomp$0.integrity,
                    nonce: props$jscomp$0.nonce,
                    type: props$jscomp$0.type,
                    fetchPriority: props$jscomp$0.fetchPriority,
                    referrerPolicy: props$jscomp$0.referrerPolicy,
                    media: props$jscomp$0.media
                  });
                  if (0 <= (headers.remainingCapacity -= header.length + 2))
                    renderState.resets.style[key] = PRELOAD_NO_CREDS, linkHeader && (linkHeader += ", "), linkHeader += header, renderState.resets.style[key] = "string" === typeof props.crossOrigin || "string" === typeof props.integrity ? [props.crossOrigin, props.integrity] : PRELOAD_NO_CREDS;
                  else break b;
                }
            }
            linkHeader ? onHeaders({ Link: linkHeader }) : onHeaders({});
          }
        }
      } catch (error) {
        logRecoverableError(request, error, {});
      }
    }
    function completeShell(request) {
      null === request.trackedPostpones && safelyEmitEarlyPreloads(request, true);
      null === request.trackedPostpones && preparePreamble(request);
      request = request.onShellReady;
      request();
    }
    function completeAll(request) {
      safelyEmitEarlyPreloads(
        request,
        null === request.trackedPostpones ? true : null === request.completedRootSegment || 5 !== request.completedRootSegment.status
      );
      preparePreamble(request);
      request = request.onAllReady;
      request();
    }
    function queueCompletedSegment(boundary, segment) {
      if (0 === segment.chunks.length && 1 === segment.children.length && null === segment.children[0].boundary && -1 === segment.children[0].id) {
        var childSegment = segment.children[0];
        childSegment.id = segment.id;
        childSegment.parentFlushed = true;
        1 !== childSegment.status && 3 !== childSegment.status && 4 !== childSegment.status || queueCompletedSegment(boundary, childSegment);
      } else boundary.completedSegments.push(segment);
    }
    function finishedTask(request, boundary, row, segment) {
      null !== row && (0 === --row.pendingTasks ? finishSuspenseListRow(request, row) : row.together && tryToResolveTogetherRow(request, row));
      request.allPendingTasks--;
      if (null === boundary) {
        if (null !== segment && segment.parentFlushed) {
          if (null !== request.completedRootSegment)
            throw Error(
              "There can only be one root segment. This is a bug in React."
            );
          request.completedRootSegment = segment;
        }
        request.pendingRootTasks--;
        0 === request.pendingRootTasks && completeShell(request);
      } else if (boundary.pendingTasks--, 4 !== boundary.status)
        if (0 === boundary.pendingTasks)
          if (0 === boundary.status && (boundary.status = 1), null !== segment && segment.parentFlushed && (1 === segment.status || 3 === segment.status) && queueCompletedSegment(boundary, segment), boundary.parentFlushed && request.completedBoundaries.push(boundary), 1 === boundary.status)
            row = boundary.row, null !== row && hoistHoistables(row.hoistables, boundary.contentState), isEligibleForOutlining(request, boundary) || (request.allPendingTasks++, boundary.fallbackAbortableTasks.forEach(abortTaskSoft, request), boundary.fallbackAbortableTasks.clear(), null !== row && 0 === --row.pendingTasks && finishSuspenseListRow(request, row), request.allPendingTasks--), 0 === request.pendingRootTasks && null === request.trackedPostpones && null !== boundary.preamble && preparePreamble(request);
          else {
            if (5 === boundary.status && (boundary = boundary.row, null !== boundary)) {
              if (null !== request.trackedPostpones) {
                row = request.trackedPostpones;
                var postponedRow = boundary.next;
                if (null !== postponedRow && (segment = postponedRow.boundaries, null !== segment))
                  for (postponedRow.boundaries = null, postponedRow = 0; postponedRow < segment.length; postponedRow++) {
                    var postponedBoundary = segment[postponedRow];
                    trackPostponedBoundary(request, row, postponedBoundary);
                    finishedTask(request, postponedBoundary, null, null);
                  }
              }
              request.allPendingTasks++;
              0 === --boundary.pendingTasks && finishSuspenseListRow(request, boundary);
              request.allPendingTasks--;
            }
          }
        else
          null === segment || !segment.parentFlushed || 1 !== segment.status && 3 !== segment.status || (queueCompletedSegment(boundary, segment), 1 === boundary.completedSegments.length && boundary.parentFlushed && request.partialBoundaries.push(boundary)), boundary = boundary.row, null !== boundary && boundary.together && tryToResolveTogetherRow(request, boundary);
      0 === request.allPendingTasks && completeAll(request);
    }
    function performWork(request$jscomp$1) {
      if (!(request$jscomp$1.aborted || 11 < request$jscomp$1.status)) {
        var prevContext = currentActiveSnapshot, prevDispatcher = ReactSharedInternals.H;
        ReactSharedInternals.H = HooksDispatcher;
        var prevAsyncDispatcher = ReactSharedInternals.A;
        ReactSharedInternals.A = DefaultAsyncDispatcher;
        var prevRequest = currentRequest;
        currentRequest = request$jscomp$1;
        var prevResumableState = currentResumableState;
        currentResumableState = request$jscomp$1.resumableState;
        try {
          var pingedTasks = request$jscomp$1.pingedTasks, i;
          for (i = 0; i < pingedTasks.length; i++) {
            var task = pingedTasks[i], request = request$jscomp$1, segment = task.blockedSegment;
            if (null === segment)
              a: {
                if (0 !== task.replay.pendingTasks) {
                  var prevTask = request.currentTask;
                  request.currentTask = task;
                  switchContext(task.context);
                  var startNode = task.node;
                  try {
                    "number" === typeof task.replay.slots ? resumeNode(
                      request,
                      task,
                      task.replay.slots,
                      task.node,
                      task.childIndex
                    ) : retryNode(request, task);
                    if (1 === task.replay.pendingTasks && 0 < task.replay.nodes.length)
                      throw Error(
                        "Couldn't find all resumable slots by key/index during replaying. The tree doesn't match so React will fallback to client rendering."
                      );
                    task.replay.pendingTasks--;
                    task.abortSet.delete(task);
                    finishedTask(request, task.blockedBoundary, task.row, null);
                  } catch (thrownValue) {
                    resetHooksState();
                    var x = thrownValue === SuspenseException ? getSuspendedThenable() : thrownValue;
                    if (request.aborted) {
                      thrownValue === SuspenseException && (task.thenableState = getThenableStateAfterSuspending());
                      request.currentTask = prevTask;
                      var request$jscomp$0 = request;
                      abortTask(task, request$jscomp$0);
                      task.abortSet.delete(task);
                      finishAbortedTask(
                        task,
                        request$jscomp$0,
                        request$jscomp$0.fatalError
                      );
                    } else {
                      if ("object" === typeof x && null !== x) {
                        if ("function" === typeof x.then) {
                          var ping = task.ping;
                          x.then(ping.resolve, ping.reject);
                          task.thenableState = thrownValue === SuspenseException ? getThenableStateAfterSuspending() : null;
                          break a;
                        }
                        if ("Maximum call stack size exceeded" === x.message && task.node !== startNode) {
                          task.thenableState = null;
                          request.pingedTasks.push(task);
                          break a;
                        }
                      }
                      task.replay.pendingTasks--;
                      task.abortSet.delete(task);
                      var errorInfo = getThrownInfo(task.componentStack);
                      request$jscomp$0 = request;
                      var boundary = task.blockedBoundary, error$jscomp$0 = request.aborted ? request.fatalError : x, replayNodes = task.replay.nodes, resumeSlots = task.replay.slots, errorDigest = logRecoverableError(
                        request$jscomp$0,
                        error$jscomp$0,
                        errorInfo
                      );
                      abortRemainingReplayNodes(
                        request$jscomp$0,
                        boundary,
                        replayNodes,
                        resumeSlots,
                        error$jscomp$0,
                        errorDigest
                      );
                      request.pendingRootTasks--;
                      0 === request.pendingRootTasks && completeShell(request);
                      request.allPendingTasks--;
                      0 === request.allPendingTasks && completeAll(request);
                    }
                  } finally {
                    request.currentTask = prevTask;
                  }
                }
              }
            else
              a: if (request$jscomp$0 = segment, 0 === request$jscomp$0.status) {
                var prevTask$jscomp$0 = request.currentTask;
                request.currentTask = task;
                switchContext(task.context);
                var childrenLength = request$jscomp$0.children.length, chunkLength = request$jscomp$0.chunks.length, startNode$jscomp$0 = task.node;
                try {
                  retryNode(request, task), pushSegmentFinale(
                    request$jscomp$0.chunks,
                    request.renderState,
                    request$jscomp$0.lastPushedText,
                    request$jscomp$0.textEmbedded
                  ), task.abortSet.delete(task), request$jscomp$0.status = 1, finishedTask(
                    request,
                    task.blockedBoundary,
                    task.row,
                    request$jscomp$0
                  );
                } catch (thrownValue) {
                  resetHooksState();
                  request$jscomp$0.children.length = childrenLength;
                  request$jscomp$0.chunks.length = chunkLength;
                  var x$jscomp$0 = thrownValue === SuspenseException ? getSuspendedThenable() : thrownValue;
                  if (request.aborted)
                    thrownValue === SuspenseException && (task.thenableState = getThenableStateAfterSuspending()), request.currentTask = prevTask$jscomp$0, request$jscomp$0 = request, abortTask(task, request$jscomp$0), task.abortSet.delete(task), finishAbortedTask(
                      task,
                      request$jscomp$0,
                      request$jscomp$0.fatalError
                    );
                  else {
                    if ("object" === typeof x$jscomp$0 && null !== x$jscomp$0) {
                      if ("function" === typeof x$jscomp$0.then) {
                        request$jscomp$0.status = 0;
                        task.thenableState = thrownValue === SuspenseException ? getThenableStateAfterSuspending() : null;
                        var ping$jscomp$0 = task.ping;
                        x$jscomp$0.then(
                          ping$jscomp$0.resolve,
                          ping$jscomp$0.reject
                        );
                        break a;
                      }
                      if ("Maximum call stack size exceeded" === x$jscomp$0.message && task.node !== startNode$jscomp$0) {
                        request$jscomp$0.status = 0;
                        task.thenableState = null;
                        request.pingedTasks.push(task);
                        break a;
                      }
                    }
                    var errorInfo$jscomp$0 = getThrownInfo(task.componentStack);
                    task.abortSet.delete(task);
                    request$jscomp$0.status = 4;
                    var boundary$jscomp$0 = task.blockedBoundary, row = task.row;
                    null !== row && 0 === --row.pendingTasks && finishSuspenseListRow(request, row);
                    request.allPendingTasks--;
                    if (null === boundary$jscomp$0)
                      if (isRecoverableError(x$jscomp$0)) {
                        var fatalRecoverableError = cloneRecoverableErrorAsFatal(x$jscomp$0);
                        logRecoverableError(
                          request,
                          fatalRecoverableError,
                          errorInfo$jscomp$0
                        );
                        fatalError(request, fatalRecoverableError);
                      } else
                        logRecoverableError(
                          request,
                          x$jscomp$0,
                          errorInfo$jscomp$0
                        ), fatalError(request, x$jscomp$0);
                    else {
                      var errorDigest$jscomp$0 = logRecoverableError(
                        request,
                        x$jscomp$0,
                        errorInfo$jscomp$0
                      );
                      boundary$jscomp$0.pendingTasks--;
                      if (4 !== boundary$jscomp$0.status) {
                        boundary$jscomp$0.status = 4;
                        boundary$jscomp$0.errorDigest = errorDigest$jscomp$0;
                        untrackBoundary(request, boundary$jscomp$0);
                        var boundaryRow = boundary$jscomp$0.row;
                        null !== boundaryRow && (request.allPendingTasks++, 0 === --boundaryRow.pendingTasks && finishSuspenseListRow(request, boundaryRow), request.allPendingTasks--);
                        boundary$jscomp$0.parentFlushed && request.clientRenderedBoundaries.push(boundary$jscomp$0);
                        0 === request.pendingRootTasks && null === request.trackedPostpones && null !== boundary$jscomp$0.preamble && preparePreamble(request);
                      }
                      0 === request.allPendingTasks && completeAll(request);
                    }
                  }
                } finally {
                  request.currentTask = prevTask$jscomp$0;
                }
              }
          }
          pingedTasks.splice(0, i);
          null !== request$jscomp$1.destination && flushCompletedQueues(request$jscomp$1, request$jscomp$1.destination);
        } catch (error) {
          logRecoverableError(request$jscomp$1, error, {}), fatalError(request$jscomp$1, error);
        } finally {
          currentResumableState = prevResumableState, ReactSharedInternals.H = prevDispatcher, ReactSharedInternals.A = prevAsyncDispatcher, prevDispatcher === HooksDispatcher && switchContext(prevContext), currentRequest = prevRequest;
        }
      }
    }
    function preparePreambleFromSubtree(request, segment, collectedPreambleSegments) {
      segment.preambleChildren.length && collectedPreambleSegments.push(segment.preambleChildren);
      for (var pendingPreambles = false, i = 0; i < segment.children.length; i++)
        pendingPreambles = preparePreambleFromSegment(
          request,
          segment.children[i],
          collectedPreambleSegments
        ) || pendingPreambles;
      return pendingPreambles;
    }
    function preparePreambleFromSegment(request, segment, collectedPreambleSegments) {
      var boundary = segment.boundary;
      if (null === boundary)
        return preparePreambleFromSubtree(
          request,
          segment,
          collectedPreambleSegments
        );
      var preamble = boundary.preamble;
      if (null === preamble) return false;
      switch (boundary.status) {
        case 1:
          hoistPreambleState(request.renderState, preamble.content);
          request.byteSize += boundary.byteSize;
          segment = boundary.completedSegments[0];
          if (!segment)
            throw Error(
              "A previously unvisited boundary must have exactly one root segment. This is a bug in React."
            );
          return preparePreambleFromSubtree(
            request,
            segment,
            collectedPreambleSegments
          );
        case 5:
          if (null !== request.trackedPostpones) return true;
        case 4:
          if (1 === segment.status)
            return hoistPreambleState(request.renderState, preamble.fallback), preparePreambleFromSubtree(
              request,
              segment,
              collectedPreambleSegments
            );
        default:
          return true;
      }
    }
    function preparePreamble(request) {
      if (request.completedRootSegment && null === request.completedPreambleSegments) {
        var collectedPreambleSegments = [], originalRequestByteSize = request.byteSize, hasPendingPreambles = preparePreambleFromSegment(
          request,
          request.completedRootSegment,
          collectedPreambleSegments
        ), preamble = request.renderState.preamble;
        false === hasPendingPreambles || preamble.headChunks && preamble.bodyChunks ? request.completedPreambleSegments = collectedPreambleSegments : request.byteSize = originalRequestByteSize;
      }
    }
    function flushSubtree(request, destination, segment, hoistableState) {
      segment.parentFlushed = true;
      switch (segment.status) {
        case 0:
          segment.id = request.nextSegmentId++;
        case 5:
          return hoistableState = segment.id, segment.lastPushedText = false, segment.textEmbedded = false, request = request.renderState, destination.push('<template id="'), destination.push(request.placeholderPrefix), request = hoistableState.toString(16), destination.push(request), destination.push('"></template>');
        case 1:
          segment.status = 2;
          var r = true, chunks = segment.chunks, chunkIdx = 0;
          segment = segment.children;
          for (var childIdx = 0; childIdx < segment.length; childIdx++) {
            for (r = segment[childIdx]; chunkIdx < r.index; chunkIdx++)
              destination.push(chunks[chunkIdx]);
            r = flushSegment(request, destination, r, hoistableState);
          }
          for (; chunkIdx < chunks.length - 1; chunkIdx++)
            destination.push(chunks[chunkIdx]);
          chunkIdx < chunks.length && (r = destination.push(chunks[chunkIdx]));
          return r;
        case 3:
          return true;
        default:
          throw Error(
            "Aborted, errored or already flushed boundaries should not be flushed again. This is a bug in React."
          );
      }
    }
    var flushedByteSize = 0;
    function flushSegment(request, destination, segment, hoistableState) {
      var boundary = segment.boundary;
      if (null === boundary)
        return flushSubtree(request, destination, segment, hoistableState);
      segment.boundary = null;
      boundary.parentFlushed = true;
      if (4 === boundary.status) {
        var row = boundary.row;
        null !== row && 0 === --row.pendingTasks && finishSuspenseListRow(request, row);
        request.renderState.generateStaticMarkup || (boundary = boundary.errorDigest, destination.push("<!--$!-->"), destination.push("<template"), null != boundary && (destination.push(' data-dgst="'), boundary = escapeTextForBrowser(boundary), destination.push(boundary), destination.push('"')), destination.push("></template>"));
        flushSubtree(request, destination, segment, hoistableState);
        request = request.renderState.generateStaticMarkup ? true : destination.push("<!--/$-->");
        return request;
      }
      if (1 !== boundary.status)
        return 0 === boundary.status && (boundary.rootSegmentID = request.nextSegmentId++), 0 < boundary.completedSegments.length && request.partialBoundaries.push(boundary), writeStartPendingSuspenseBoundary(
          destination,
          request.renderState,
          boundary.rootSegmentID
        ), hoistableState && hoistHoistables(hoistableState, boundary.fallbackState), flushSubtree(request, destination, segment, hoistableState), destination.push("<!--/$-->");
      if (!flushingPartialBoundaries && isEligibleForOutlining(request, boundary) && (flushedByteSize + boundary.byteSize > request.progressiveChunkSize || boundary.defer))
        return boundary.rootSegmentID = request.nextSegmentId++, request.completedBoundaries.push(boundary), writeStartPendingSuspenseBoundary(
          destination,
          request.renderState,
          boundary.rootSegmentID
        ), flushSubtree(request, destination, segment, hoistableState), destination.push("<!--/$-->");
      flushedByteSize += boundary.byteSize;
      hoistableState && hoistHoistables(hoistableState, boundary.contentState);
      segment = boundary.row;
      null !== segment && isEligibleForOutlining(request, boundary) && 0 === --segment.pendingTasks && finishSuspenseListRow(request, segment);
      request.renderState.generateStaticMarkup || destination.push("<!--$-->");
      segment = boundary.completedSegments;
      if (1 !== segment.length)
        throw Error(
          "A previously unvisited boundary must have exactly one root segment. This is a bug in React."
        );
      flushSegment(request, destination, segment[0], hoistableState);
      request = request.renderState.generateStaticMarkup ? true : destination.push("<!--/$-->");
      return request;
    }
    function flushSegmentContainer(request, destination, segment, hoistableState) {
      writeStartSegment(
        destination,
        request.renderState,
        segment.parentFormatContext,
        segment.id
      );
      flushSegment(request, destination, segment, hoistableState);
      return writeEndSegment(destination, segment.parentFormatContext);
    }
    function flushCompletedBoundary(request, destination, boundary) {
      flushedByteSize = boundary.byteSize;
      for (var completedSegments = boundary.completedSegments, i = 0; i < completedSegments.length; i++)
        flushPartiallyCompletedSegment(
          request,
          destination,
          boundary,
          completedSegments[i]
        );
      completedSegments.length = 0;
      completedSegments = boundary.row;
      null !== completedSegments && isEligibleForOutlining(request, boundary) && 0 === --completedSegments.pendingTasks && finishSuspenseListRow(request, completedSegments);
      writeHoistablesForBoundary(
        destination,
        boundary.contentState,
        request.renderState
      );
      completedSegments = request.resumableState;
      request = request.renderState;
      i = boundary.rootSegmentID;
      boundary = boundary.contentState;
      var requiresStyleInsertion = request.stylesToHoist, requiresViewTransitions = 0 !== (completedSegments.instructions & 128);
      request.stylesToHoist = false;
      destination.push(request.startInlineScript);
      destination.push(">");
      requiresStyleInsertion ? (0 === (completedSegments.instructions & 4) && (completedSegments.instructions |= 4, destination.push(
        '$RX=function(b,c,d,e,f){var a=document.getElementById(b);a&&(b=a.previousSibling,b.data="$!",a=a.dataset,null!=c&&(a.dgst=c),d&&(a.msg=d),e&&(a.stck=e),f&&(a.cstck=f),b._reactRetry&&b._reactRetry())};'
      )), 0 === (completedSegments.instructions & 2) && (completedSegments.instructions |= 2, destination.push(
        '$RB=[];$RV=function(a){$RT=performance.now();for(var b=0;b<a.length;b+=2){var c=a[b],e=a[b+1];null!==e.parentNode&&e.parentNode.removeChild(e);var f=c.parentNode;if(f){var g=c.previousSibling,h=0;do{if(c&&8===c.nodeType){var d=c.data;if("/$"===d||"/&"===d)if(0===h)break;else h--;else"$"!==d&&"$?"!==d&&"$~"!==d&&"$!"!==d&&"&"!==d||h++}d=c.nextSibling;f.removeChild(c);c=d}while(c);for(;e.firstChild;)f.insertBefore(e.firstChild,c);g.data="$";g._reactRetry&&requestAnimationFrame(g._reactRetry)}}a.length=0};\n$RC=function(a,b){if(b=document.getElementById(b))(a=document.getElementById(a))?(a.previousSibling.data="$~",$RB.push(a,b),2===$RB.length&&("number"!==typeof $RT?requestAnimationFrame($RV.bind(null,$RB)):(a=performance.now(),setTimeout($RV.bind(null,$RB),2300>a&&2E3<a?2300-a:$RT+300-a)))):b.parentNode.removeChild(b)};'
      )), requiresViewTransitions && 0 === (completedSegments.instructions & 256) && (completedSegments.instructions |= 256, destination.push(
        `$RV=function(B,g){function h(a,c){var e=a.getAttribute(c);e&&(c=a.style,l.push(a,c.viewTransitionName,c.viewTransitionClass),"auto"!==e&&(c.viewTransitionClass=e),(a=a.getAttribute("vt-name"))||(a="_T_"+N++ +"_"),a=CSS.escape(a)!==a?"r-"+btoa(a).replace(/=/g,""):a,c.viewTransitionName=a,C=!0)}var C=!1,N=0,l=[];try{var f=document.__reactViewTransition;if(f){f.finished.finally($RV.bind(null,g));return}var m=new Map;for(f=1;f<g.length;f+=2)for(var k=g[f].querySelectorAll("[vt-share]"),d=0;d<k.length;d++){var b=k[d];m.set(b.getAttribute("vt-name"),b)}var u=[];for(k=0;k<g.length;k+=2){var D=g[k],x=D.parentNode;if(x){var v=x.getBoundingClientRect();if(v.left||v.top||v.width||v.height){b=D;for(f=0;b;){if(8===b.nodeType){var t=b.data;if("/$"===t)if(0===f)break;else f--;else"$"!==t&&"$?"!==t&&"$~"!==t&&"$!"!==t||f++}else if(1===b.nodeType){d=b;var E=d.getAttribute("vt-name"),y=m.get(E);h(d,y?"vt-share":"vt-exit");y&&(h(y,"vt-share"),m.set(E,null));for(var F=d.querySelectorAll("[vt-share]"),
z=0;z<F.length;z++){var G=F[z],H=G.getAttribute("vt-name"),I=m.get(H);I&&(h(G,"vt-share"),h(I,"vt-share"),m.set(H,null))}var J=d.querySelectorAll("[vt-parent-exit]");for(d=0;d<J.length;d++)h(J[d],"vt-parent-exit")}b=b.nextSibling}for(var K=g[k+1],n=K.firstElementChild;n;){null!==m.get(n.getAttribute("vt-name"))&&h(n,"vt-enter");var L=n.querySelectorAll("[vt-parent-enter]");for(b=0;b<L.length;b++)h(L[b],"vt-parent-enter");n=n.nextElementSibling}b=x;do for(var p=b.firstElementChild;p;){var M=p.getAttribute("vt-update");
M&&"none"!==M&&!l.includes(p)&&h(p,"vt-update");p=p.nextElementSibling}while((b=b.parentNode)&&1===b.nodeType&&"none"!==b.getAttribute("vt-update"));u.push.apply(u,K.querySelectorAll('img[src]:not([loading="lazy"])'))}}}if(C){var A=document.__reactViewTransition=document.startViewTransition({update:function(){B(g);for(var a=[document.documentElement.clientHeight,document.fonts.ready],c={},e=0;e<u.length;c={g:c.g},e++)if(c.g=u[e],!c.g.complete){var q=c.g.getBoundingClientRect();0<q.bottom&&0<q.right&&
q.top<window.innerHeight&&q.left<window.innerWidth&&(q=new Promise(function(w){return function(r){w.g.addEventListener("load",r);w.g.addEventListener("error",r)}}(c)),a.push(q))}return Promise.race([Promise.all(a),new Promise(function(w){var r=performance.now();setTimeout(w,2300>r&&2E3<r?2300-r:500)})])},types:[]});A.ready.finally(function(){for(var a=l.length-3;0<=a;a-=3){var c=l[a],e=c.style;e.viewTransitionName=l[a+1];e.viewTransitionClass=l[a+1];""===c.getAttribute("style")&&c.removeAttribute("style")}});
A.finished.finally(function(){document.__reactViewTransition===A&&(document.__reactViewTransition=null)});$RB=[];return}}catch(a){}B(g)}.bind(null,$RV);`
      )), 0 === (completedSegments.instructions & 8) ? (completedSegments.instructions |= 8, destination.push(
        '$RM=new Map;$RR=function(n,w,p){function u(q){this._p=null;q()}for(var r=new Map,t=document,h,b,e=t.querySelectorAll("link[data-precedence],style[data-precedence]"),v=[],k=0;b=e[k++];)"not all"===b.getAttribute("media")?v.push(b):("LINK"===b.tagName&&$RM.set(b.getAttribute("href"),b),r.set(b.dataset.precedence,h=b));e=0;b=[];var l,a;for(k=!0;;){if(k){var f=p[e++];if(!f){k=!1;e=0;continue}var c=!1,m=0;var d=f[m++];if(a=$RM.get(d)){var g=a._p;c=!0}else{a=t.createElement("link");a.href=d;a.rel=\n"stylesheet";for(a.dataset.precedence=l=f[m++];g=f[m++];)a.setAttribute(g,f[m++]);g=a._p=new Promise(function(q,x){a.onload=u.bind(a,q);a.onerror=u.bind(a,x)});$RM.set(d,a)}d=a.getAttribute("media");!g||d&&!matchMedia(d).matches||b.push(g);if(c)continue}else{a=v[e++];if(!a)break;l=a.getAttribute("data-precedence");a.removeAttribute("media")}c=r.get(l)||h;c===h&&(h=a);r.set(l,a);c?c.parentNode.insertBefore(a,c.nextSibling):(c=t.head,c.insertBefore(a,c.firstChild))}if(p=document.getElementById(n))p.previousSibling.data=\n"$~";Promise.all(b).then($RC.bind(null,n,w),$RX.bind(null,n,"CSS failed to load"))};$RR("'
      )) : destination.push('$RR("')) : (0 === (completedSegments.instructions & 2) && (completedSegments.instructions |= 2, destination.push(
        '$RB=[];$RV=function(a){$RT=performance.now();for(var b=0;b<a.length;b+=2){var c=a[b],e=a[b+1];null!==e.parentNode&&e.parentNode.removeChild(e);var f=c.parentNode;if(f){var g=c.previousSibling,h=0;do{if(c&&8===c.nodeType){var d=c.data;if("/$"===d||"/&"===d)if(0===h)break;else h--;else"$"!==d&&"$?"!==d&&"$~"!==d&&"$!"!==d&&"&"!==d||h++}d=c.nextSibling;f.removeChild(c);c=d}while(c);for(;e.firstChild;)f.insertBefore(e.firstChild,c);g.data="$";g._reactRetry&&requestAnimationFrame(g._reactRetry)}}a.length=0};\n$RC=function(a,b){if(b=document.getElementById(b))(a=document.getElementById(a))?(a.previousSibling.data="$~",$RB.push(a,b),2===$RB.length&&("number"!==typeof $RT?requestAnimationFrame($RV.bind(null,$RB)):(a=performance.now(),setTimeout($RV.bind(null,$RB),2300>a&&2E3<a?2300-a:$RT+300-a)))):b.parentNode.removeChild(b)};'
      )), requiresViewTransitions && 0 === (completedSegments.instructions & 256) && (completedSegments.instructions |= 256, destination.push(
        `$RV=function(B,g){function h(a,c){var e=a.getAttribute(c);e&&(c=a.style,l.push(a,c.viewTransitionName,c.viewTransitionClass),"auto"!==e&&(c.viewTransitionClass=e),(a=a.getAttribute("vt-name"))||(a="_T_"+N++ +"_"),a=CSS.escape(a)!==a?"r-"+btoa(a).replace(/=/g,""):a,c.viewTransitionName=a,C=!0)}var C=!1,N=0,l=[];try{var f=document.__reactViewTransition;if(f){f.finished.finally($RV.bind(null,g));return}var m=new Map;for(f=1;f<g.length;f+=2)for(var k=g[f].querySelectorAll("[vt-share]"),d=0;d<k.length;d++){var b=k[d];m.set(b.getAttribute("vt-name"),b)}var u=[];for(k=0;k<g.length;k+=2){var D=g[k],x=D.parentNode;if(x){var v=x.getBoundingClientRect();if(v.left||v.top||v.width||v.height){b=D;for(f=0;b;){if(8===b.nodeType){var t=b.data;if("/$"===t)if(0===f)break;else f--;else"$"!==t&&"$?"!==t&&"$~"!==t&&"$!"!==t||f++}else if(1===b.nodeType){d=b;var E=d.getAttribute("vt-name"),y=m.get(E);h(d,y?"vt-share":"vt-exit");y&&(h(y,"vt-share"),m.set(E,null));for(var F=d.querySelectorAll("[vt-share]"),
z=0;z<F.length;z++){var G=F[z],H=G.getAttribute("vt-name"),I=m.get(H);I&&(h(G,"vt-share"),h(I,"vt-share"),m.set(H,null))}var J=d.querySelectorAll("[vt-parent-exit]");for(d=0;d<J.length;d++)h(J[d],"vt-parent-exit")}b=b.nextSibling}for(var K=g[k+1],n=K.firstElementChild;n;){null!==m.get(n.getAttribute("vt-name"))&&h(n,"vt-enter");var L=n.querySelectorAll("[vt-parent-enter]");for(b=0;b<L.length;b++)h(L[b],"vt-parent-enter");n=n.nextElementSibling}b=x;do for(var p=b.firstElementChild;p;){var M=p.getAttribute("vt-update");
M&&"none"!==M&&!l.includes(p)&&h(p,"vt-update");p=p.nextElementSibling}while((b=b.parentNode)&&1===b.nodeType&&"none"!==b.getAttribute("vt-update"));u.push.apply(u,K.querySelectorAll('img[src]:not([loading="lazy"])'))}}}if(C){var A=document.__reactViewTransition=document.startViewTransition({update:function(){B(g);for(var a=[document.documentElement.clientHeight,document.fonts.ready],c={},e=0;e<u.length;c={g:c.g},e++)if(c.g=u[e],!c.g.complete){var q=c.g.getBoundingClientRect();0<q.bottom&&0<q.right&&
q.top<window.innerHeight&&q.left<window.innerWidth&&(q=new Promise(function(w){return function(r){w.g.addEventListener("load",r);w.g.addEventListener("error",r)}}(c)),a.push(q))}return Promise.race([Promise.all(a),new Promise(function(w){var r=performance.now();setTimeout(w,2300>r&&2E3<r?2300-r:500)})])},types:[]});A.ready.finally(function(){for(var a=l.length-3;0<=a;a-=3){var c=l[a],e=c.style;e.viewTransitionName=l[a+1];e.viewTransitionClass=l[a+1];""===c.getAttribute("style")&&c.removeAttribute("style")}});
A.finished.finally(function(){document.__reactViewTransition===A&&(document.__reactViewTransition=null)});$RB=[];return}}catch(a){}B(g)}.bind(null,$RV);`
      )), destination.push('$RC("'));
      completedSegments = i.toString(16);
      destination.push(request.boundaryPrefix);
      destination.push(completedSegments);
      destination.push('","');
      destination.push(request.segmentPrefix);
      destination.push(completedSegments);
      requiresStyleInsertion ? (destination.push('",'), writeStyleResourceDependenciesInJS(destination, boundary)) : destination.push('"');
      boundary = destination.push(")</script>");
      return writeBootstrap(destination, request) && boundary;
    }
    function flushPartiallyCompletedSegment(request, destination, boundary, segment) {
      if (2 === segment.status) return true;
      var hoistableState = boundary.contentState, segmentID = segment.id;
      if (-1 === segmentID) {
        if (-1 === (segment.id = boundary.rootSegmentID))
          throw Error(
            "A root segment ID must have been assigned by now. This is a bug in React."
          );
        return flushSegmentContainer(request, destination, segment, hoistableState);
      }
      if (segmentID === boundary.rootSegmentID)
        return flushSegmentContainer(request, destination, segment, hoistableState);
      flushSegmentContainer(request, destination, segment, hoistableState);
      boundary = request.resumableState;
      request = request.renderState;
      destination.push(request.startInlineScript);
      destination.push(">");
      0 === (boundary.instructions & 1) ? (boundary.instructions |= 1, destination.push(
        '$RS=function(a,b){a=document.getElementById(a);b=document.getElementById(b);for(a.parentNode.removeChild(a);a.firstChild;)b.parentNode.insertBefore(a.firstChild,b);b.parentNode.removeChild(b)};$RS("'
      )) : destination.push('$RS("');
      destination.push(request.segmentPrefix);
      segmentID = segmentID.toString(16);
      destination.push(segmentID);
      destination.push('","');
      destination.push(request.placeholderPrefix);
      destination.push(segmentID);
      destination = destination.push('")</script>');
      return destination;
    }
    var flushingPartialBoundaries = false;
    function flushCompletedQueues(request, destination) {
      try {
        if (!(0 < request.pendingRootTasks)) {
          var i, completedRootSegment = request.completedRootSegment;
          if (null !== completedRootSegment) {
            if (5 === completedRootSegment.status) return;
            var completedPreambleSegments = request.completedPreambleSegments;
            if (null === completedPreambleSegments) return;
            flushedByteSize = request.byteSize;
            var resumableState = request.resumableState, renderState = request.renderState, preamble = renderState.preamble, htmlChunks = preamble.htmlChunks, headChunks = preamble.headChunks, i$jscomp$0;
            if (htmlChunks) {
              for (i$jscomp$0 = 0; i$jscomp$0 < htmlChunks.length; i$jscomp$0++)
                destination.push(htmlChunks[i$jscomp$0]);
              if (headChunks)
                for (i$jscomp$0 = 0; i$jscomp$0 < headChunks.length; i$jscomp$0++)
                  destination.push(headChunks[i$jscomp$0]);
              else {
                var chunk = startChunkForTag("head");
                destination.push(chunk);
                destination.push(">");
              }
            } else if (headChunks)
              for (i$jscomp$0 = 0; i$jscomp$0 < headChunks.length; i$jscomp$0++)
                destination.push(headChunks[i$jscomp$0]);
            var charsetChunks = renderState.charsetChunks;
            for (i$jscomp$0 = 0; i$jscomp$0 < charsetChunks.length; i$jscomp$0++)
              destination.push(charsetChunks[i$jscomp$0]);
            charsetChunks.length = 0;
            renderState.preconnects.forEach(flushResource, destination);
            renderState.preconnects.clear();
            var viewportChunks = renderState.viewportChunks;
            for (i$jscomp$0 = 0; i$jscomp$0 < viewportChunks.length; i$jscomp$0++)
              destination.push(viewportChunks[i$jscomp$0]);
            viewportChunks.length = 0;
            renderState.fontPreloads.forEach(flushResource, destination);
            renderState.fontPreloads.clear();
            renderState.highImagePreloads.forEach(flushResource, destination);
            renderState.highImagePreloads.clear();
            currentlyFlushingRenderState = renderState;
            renderState.styles.forEach(flushStylesInPreamble, destination);
            currentlyFlushingRenderState = null;
            var importMapChunks = renderState.importMapChunks;
            for (i$jscomp$0 = 0; i$jscomp$0 < importMapChunks.length; i$jscomp$0++)
              destination.push(importMapChunks[i$jscomp$0]);
            importMapChunks.length = 0;
            renderState.bootstrapScripts.forEach(flushResource, destination);
            renderState.scripts.forEach(flushResource, destination);
            renderState.scripts.clear();
            renderState.bulkPreloads.forEach(flushResource, destination);
            renderState.bulkPreloads.clear();
            resumableState.instructions |= 32;
            var hoistableChunks = renderState.hoistableChunks;
            for (i$jscomp$0 = 0; i$jscomp$0 < hoistableChunks.length; i$jscomp$0++)
              destination.push(hoistableChunks[i$jscomp$0]);
            for (resumableState = hoistableChunks.length = 0; resumableState < completedPreambleSegments.length; resumableState++) {
              var segments = completedPreambleSegments[resumableState];
              for (renderState = 0; renderState < segments.length; renderState++)
                flushSegment(request, destination, segments[renderState], null);
            }
            var preamble$jscomp$0 = request.renderState.preamble, headChunks$jscomp$0 = preamble$jscomp$0.headChunks;
            if (preamble$jscomp$0.htmlChunks || headChunks$jscomp$0) {
              var chunk$jscomp$0 = endChunkForTag("head");
              destination.push(chunk$jscomp$0);
            }
            var bodyChunks = preamble$jscomp$0.bodyChunks;
            if (bodyChunks)
              for (completedPreambleSegments = 0; completedPreambleSegments < bodyChunks.length; completedPreambleSegments++)
                destination.push(bodyChunks[completedPreambleSegments]);
            flushSegment(request, destination, completedRootSegment, null);
            request.completedRootSegment = null;
            var renderState$jscomp$0 = request.renderState;
            if (0 !== request.allPendingTasks || 0 !== request.clientRenderedBoundaries.length || 0 !== request.completedBoundaries.length || null !== request.trackedPostpones && (0 !== request.trackedPostpones.rootNodes.length || null !== request.trackedPostpones.rootSlots)) {
              var resumableState$jscomp$0 = request.resumableState;
              if (0 === (resumableState$jscomp$0.instructions & 64)) {
                resumableState$jscomp$0.instructions |= 64;
                destination.push(renderState$jscomp$0.startInlineScript);
                if (0 === (resumableState$jscomp$0.instructions & 32)) {
                  resumableState$jscomp$0.instructions |= 32;
                  var shellId = "_" + resumableState$jscomp$0.idPrefix + "R_";
                  destination.push(' id="');
                  var chunk$jscomp$1 = escapeTextForBrowser(shellId);
                  destination.push(chunk$jscomp$1);
                  destination.push('"');
                }
                destination.push(">");
                destination.push(
                  "requestAnimationFrame(function(){$RT=performance.now()});"
                );
                destination.push("</script>");
              }
            }
            writeBootstrap(destination, renderState$jscomp$0);
          }
          var renderState$jscomp$1 = request.renderState;
          completedRootSegment = 0;
          var viewportChunks$jscomp$0 = renderState$jscomp$1.viewportChunks;
          for (completedRootSegment = 0; completedRootSegment < viewportChunks$jscomp$0.length; completedRootSegment++)
            destination.push(viewportChunks$jscomp$0[completedRootSegment]);
          viewportChunks$jscomp$0.length = 0;
          renderState$jscomp$1.preconnects.forEach(flushResource, destination);
          renderState$jscomp$1.preconnects.clear();
          renderState$jscomp$1.fontPreloads.forEach(flushResource, destination);
          renderState$jscomp$1.fontPreloads.clear();
          renderState$jscomp$1.highImagePreloads.forEach(
            flushResource,
            destination
          );
          renderState$jscomp$1.highImagePreloads.clear();
          renderState$jscomp$1.styles.forEach(preloadLateStyles, destination);
          renderState$jscomp$1.scripts.forEach(flushResource, destination);
          renderState$jscomp$1.scripts.clear();
          renderState$jscomp$1.bulkPreloads.forEach(flushResource, destination);
          renderState$jscomp$1.bulkPreloads.clear();
          var hoistableChunks$jscomp$0 = renderState$jscomp$1.hoistableChunks;
          for (completedRootSegment = 0; completedRootSegment < hoistableChunks$jscomp$0.length; completedRootSegment++)
            destination.push(hoistableChunks$jscomp$0[completedRootSegment]);
          hoistableChunks$jscomp$0.length = 0;
          var clientRenderedBoundaries = request.clientRenderedBoundaries;
          for (i = 0; i < clientRenderedBoundaries.length; i++) {
            var boundary = clientRenderedBoundaries[i];
            renderState$jscomp$1 = destination;
            var resumableState$jscomp$1 = request.resumableState, renderState$jscomp$2 = request.renderState, id = boundary.rootSegmentID, errorDigest = boundary.errorDigest;
            renderState$jscomp$1.push(renderState$jscomp$2.startInlineScript);
            renderState$jscomp$1.push(">");
            0 === (resumableState$jscomp$1.instructions & 4) ? (resumableState$jscomp$1.instructions |= 4, renderState$jscomp$1.push(
              '$RX=function(b,c,d,e,f){var a=document.getElementById(b);a&&(b=a.previousSibling,b.data="$!",a=a.dataset,null!=c&&(a.dgst=c),d&&(a.msg=d),e&&(a.stck=e),f&&(a.cstck=f),b._reactRetry&&b._reactRetry())};;$RX("'
            )) : renderState$jscomp$1.push('$RX("');
            renderState$jscomp$1.push(renderState$jscomp$2.boundaryPrefix);
            var chunk$jscomp$2 = id.toString(16);
            renderState$jscomp$1.push(chunk$jscomp$2);
            renderState$jscomp$1.push('"');
            if (null != errorDigest)
              if (renderState$jscomp$1.push(","), null == errorDigest)
                renderState$jscomp$1.push("null");
              else {
                var chunk$jscomp$3 = escapeJSStringsForInstructionScripts(errorDigest);
                renderState$jscomp$1.push(chunk$jscomp$3);
              }
            var JSCompiler_inline_result = renderState$jscomp$1.push(")</script>");
            if (!JSCompiler_inline_result) {
              request.destination = null;
              i++;
              clientRenderedBoundaries.splice(0, i);
              return;
            }
          }
          clientRenderedBoundaries.splice(0, i);
          var completedBoundaries = request.completedBoundaries;
          for (i = 0; i < completedBoundaries.length; i++)
            if (!flushCompletedBoundary(request, destination, completedBoundaries[i])) {
              request.destination = null;
              i++;
              completedBoundaries.splice(0, i);
              return;
            }
          completedBoundaries.splice(0, i);
          flushingPartialBoundaries = true;
          var partialBoundaries = request.partialBoundaries;
          for (i = 0; i < partialBoundaries.length; i++) {
            var boundary$70 = partialBoundaries[i];
            a: {
              clientRenderedBoundaries = request;
              boundary = destination;
              flushedByteSize = boundary$70.byteSize;
              var completedSegments = boundary$70.completedSegments;
              for (JSCompiler_inline_result = 0; JSCompiler_inline_result < completedSegments.length; JSCompiler_inline_result++)
                if (!flushPartiallyCompletedSegment(
                  clientRenderedBoundaries,
                  boundary,
                  boundary$70,
                  completedSegments[JSCompiler_inline_result]
                )) {
                  JSCompiler_inline_result++;
                  completedSegments.splice(0, JSCompiler_inline_result);
                  var JSCompiler_inline_result$jscomp$0 = false;
                  break a;
                }
              completedSegments.splice(0, JSCompiler_inline_result);
              var row = boundary$70.row;
              null !== row && row.together && 1 === boundary$70.pendingTasks && (1 === row.pendingTasks ? unblockSuspenseListRow(
                clientRenderedBoundaries,
                row,
                row.hoistables
              ) : row.pendingTasks--);
              JSCompiler_inline_result$jscomp$0 = writeHoistablesForBoundary(
                boundary,
                boundary$70.contentState,
                clientRenderedBoundaries.renderState
              );
            }
            if (!JSCompiler_inline_result$jscomp$0) {
              request.destination = null;
              i++;
              partialBoundaries.splice(0, i);
              return;
            }
          }
          partialBoundaries.splice(0, i);
          flushingPartialBoundaries = false;
          var largeBoundaries = request.completedBoundaries;
          for (i = 0; i < largeBoundaries.length; i++)
            if (!flushCompletedBoundary(request, destination, largeBoundaries[i])) {
              request.destination = null;
              i++;
              largeBoundaries.splice(0, i);
              return;
            }
          largeBoundaries.splice(0, i);
        }
      } finally {
        flushingPartialBoundaries = false, i = request.postponedState, null !== i && (i.nextSegmentId = request.nextSegmentId), 0 === request.allPendingTasks && 0 === request.clientRenderedBoundaries.length && 0 === request.completedBoundaries.length && (request.flushScheduled = false, i = request.resumableState, i.hasBody && (partialBoundaries = endChunkForTag("body"), destination.push(partialBoundaries)), i.hasHtml && (i = endChunkForTag("html"), destination.push(i)), endRenderLifetime(request), request.status = 13, destination.push(null), request.destination = null);
      }
    }
    function enqueueFlush(request) {
      if (false === request.flushScheduled && 0 === request.pingedTasks.length && null !== request.destination) {
        request.flushScheduled = true;
        var destination = request.destination;
        destination ? flushCompletedQueues(request, destination) : request.flushScheduled = false;
      }
    }
    function startFlowing(request, destination) {
      if (12 === request.status)
        request.status = 13, request = request.fatalError, isRecoverableError(request) && (request = cloneRecoverableErrorAsFatal(request)), destination.destroy(request);
      else if (13 !== request.status && null === request.destination) {
        request.destination = destination;
        try {
          flushCompletedQueues(request, destination);
        } catch (error$72) {
          logRecoverableError(request, error$72, {}), fatalError(request, error$72);
        }
      }
    }
    function finishAbort(request, abortableTasks) {
      try {
        if (0 < abortableTasks.size) {
          var error = request.fatalError;
          abortableTasks.forEach(function(task) {
            return finishAbortedTask(task, request, error);
          });
          abortableTasks.clear();
        }
        null !== request.destination && flushCompletedQueues(request, request.destination);
      } catch (error$73) {
        logRecoverableError(request, error$73, {}), fatalError(request, error$73);
      }
    }
    function endRenderLifetime(request) {
      request = request.renderLifetimeController;
      null !== request && request.abort("The render ended.");
    }
    function abort(request, reason) {
      if (!(request.aborted || 11 !== request.status && 10 !== request.status)) {
        endRenderLifetime(request);
        var isRecoverableReason = "object" === typeof reason && null !== reason && reason.$$typeof === REACT_RECOVERABLE_TYPE;
        request.aborted = true;
        reason = isRecoverableReason ? createRecoverableError(reason) : void 0 === reason ? Error("The render was aborted by the server without a reason.") : "object" === typeof reason && null !== reason && "function" === typeof reason.then ? Error("The render was aborted by the server with a promise.") : reason;
        request.fatalError = reason;
        reason = request.abortableTasks;
        reason.forEach(function(task) {
          return abortTask(task, request);
        });
        finishAbort(request, reason);
      }
    }
    function addToReplayParent(node, parentKeyPath, trackedPostpones) {
      if (null === parentKeyPath) trackedPostpones.rootNodes.push(node);
      else {
        var workingMap = trackedPostpones.workingMap, parentNode = workingMap.get(parentKeyPath);
        void 0 === parentNode && (parentNode = [parentKeyPath[1], parentKeyPath[2], [], null], workingMap.set(parentKeyPath, parentNode), addToReplayParent(parentNode, parentKeyPath[0], trackedPostpones));
        parentNode[2].push(node);
      }
    }
    function onError() {
    }
    function renderToStringImpl(children, options, generateStaticMarkup, abortReason) {
      var didFatal = false, fatalError2 = null, result = "", readyToStream = false;
      options = createResumableState(options ? options.identifierPrefix : void 0);
      children = createRequest(
        children,
        options,
        createRenderState(options, generateStaticMarkup),
        createFormatContext(0, null, 0, null),
        Infinity,
        onError,
        void 0,
        void 0,
        function() {
          readyToStream = true;
        },
        void 0,
        void 0,
        void 0
      );
      children.flushScheduled = null !== children.destination;
      performWork(children);
      10 === children.status && (children.status = 11);
      null === children.trackedPostpones && safelyEmitEarlyPreloads(children, 0 === children.pendingRootTasks);
      abort(children, abortReason);
      startFlowing(children, {
        push: function(chunk) {
          null !== chunk && (result += chunk);
          return true;
        },
        destroy: function(error) {
          didFatal = true;
          fatalError2 = error;
        }
      });
      if (didFatal && fatalError2 !== abortReason) throw fatalError2;
      if (!readyToStream)
        throw Error(
          "A component suspended while responding to synchronous input. This will cause the UI to be replaced with a loading indicator. To fix, updates that suspend should be wrapped with startTransition."
        );
      return result;
    }
    exports.renderToStaticMarkup = function(children, options) {
      return renderToStringImpl(
        children,
        options,
        true,
        'The server used "renderToStaticMarkup" which does not support Suspense. If you intended to have the server wait for the suspended component please switch to "renderToPipeableStream" which supports Suspense on the server'
      );
    };
    exports.renderToString = function(children, options) {
      return renderToStringImpl(
        children,
        options,
        false,
        'The server used "renderToString" which does not support Suspense. If you intended for this Suspense boundary to render the fallback content on the server consider throwing an Error somewhere within the Suspense boundary. If you intended to have the server wait for the suspended component please switch to "renderToPipeableStream" which supports Suspense on the server'
      );
    };
    exports.version = "19.3.1";
  }
});

// node_modules/.pnpm/react-dom@19.3.1_react@19.3.1/node_modules/react-dom/cjs/react-dom-server.node.production.js
var require_react_dom_server_node_production = __commonJS({
  "node_modules/.pnpm/react-dom@19.3.1_react@19.3.1/node_modules/react-dom/cjs/react-dom-server.node.production.js"(exports) {
    "use strict";
    var util = __require("util");
    var crypto2 = __require("crypto");
    var async_hooks = __require("async_hooks");
    var React = require_react();
    var ReactDOM = require_react_dom();
    var stream = __require("stream");
    var REACT_ELEMENT_TYPE = /* @__PURE__ */ Symbol.for("react.transitional.element");
    var REACT_PORTAL_TYPE = /* @__PURE__ */ Symbol.for("react.portal");
    var REACT_FRAGMENT_TYPE = /* @__PURE__ */ Symbol.for("react.fragment");
    var REACT_STRICT_MODE_TYPE = /* @__PURE__ */ Symbol.for("react.strict_mode");
    var REACT_PROFILER_TYPE = /* @__PURE__ */ Symbol.for("react.profiler");
    var REACT_CONSUMER_TYPE = /* @__PURE__ */ Symbol.for("react.consumer");
    var REACT_CONTEXT_TYPE = /* @__PURE__ */ Symbol.for("react.context");
    var REACT_FORWARD_REF_TYPE = /* @__PURE__ */ Symbol.for("react.forward_ref");
    var REACT_SUSPENSE_TYPE = /* @__PURE__ */ Symbol.for("react.suspense");
    var REACT_SUSPENSE_LIST_TYPE = /* @__PURE__ */ Symbol.for("react.suspense_list");
    var REACT_MEMO_TYPE = /* @__PURE__ */ Symbol.for("react.memo");
    var REACT_LAZY_TYPE = /* @__PURE__ */ Symbol.for("react.lazy");
    var REACT_SCOPE_TYPE = /* @__PURE__ */ Symbol.for("react.scope");
    var REACT_ACTIVITY_TYPE = /* @__PURE__ */ Symbol.for("react.activity");
    var REACT_LEGACY_HIDDEN_TYPE = /* @__PURE__ */ Symbol.for("react.legacy_hidden");
    var REACT_MEMO_CACHE_SENTINEL = /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel");
    var REACT_VIEW_TRANSITION_TYPE = /* @__PURE__ */ Symbol.for("react.view_transition");
    var REACT_RECOVERABLE_TYPE = /* @__PURE__ */ Symbol.for("react.recoverable");
    var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
    function getIteratorFn(maybeIterable) {
      if (null === maybeIterable || "object" !== typeof maybeIterable) return null;
      maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
      return "function" === typeof maybeIterable ? maybeIterable : null;
    }
    var REACT_OPTIMISTIC_KEY = /* @__PURE__ */ Symbol.for("react.optimistic_key");
    var isArrayImpl = Array.isArray;
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var supportsArrayBufferDetached = hasOwnProperty.call(
      ArrayBuffer.prototype,
      "detached"
    );
    var scheduleMicrotask = queueMicrotask;
    function flushBuffered(destination) {
      "function" === typeof destination.flush && destination.flush();
    }
    var currentView = null;
    var writtenBytes = 0;
    var destinationHasCapacity$1 = true;
    function writeChunk(destination, chunk) {
      if ("string" === typeof chunk) {
        if (0 !== chunk.length)
          if (4096 < 3 * chunk.length)
            0 < writtenBytes && (writeToDestination(
              destination,
              currentView.subarray(0, writtenBytes)
            ), currentView = new Uint8Array(4096), writtenBytes = 0), writeToDestination(destination, chunk);
          else {
            var target = currentView;
            0 < writtenBytes && (target = currentView.subarray(writtenBytes));
            target = textEncoder.encodeInto(chunk, target);
            var read = target.read;
            writtenBytes += target.written;
            read < chunk.length && (writeToDestination(
              destination,
              currentView.subarray(0, writtenBytes)
            ), currentView = new Uint8Array(4096), writtenBytes = textEncoder.encodeInto(
              chunk.slice(read),
              currentView
            ).written);
            4096 === writtenBytes && (writeToDestination(destination, currentView), currentView = new Uint8Array(4096), writtenBytes = 0);
          }
      } else if (0 === chunk.byteLength) {
        if (supportsArrayBufferDetached && chunk.buffer.detached)
          throw Error(
            "Cannot transport a detached buffer. This usually happens when trying to transport multiple buffer-spanning views on the same underyling buffer. Either reuse the exact same view by identity or copy the underlying buffer manually via `view.slice()`."
          );
      } else
        4096 < chunk.byteLength ? (0 < writtenBytes && (writeToDestination(
          destination,
          currentView.subarray(0, writtenBytes)
        ), currentView = new Uint8Array(4096), writtenBytes = 0), writeToDestination(destination, chunk)) : (target = currentView.length - writtenBytes, target < chunk.byteLength && (0 === target ? writeToDestination(destination, currentView) : (currentView.set(chunk.subarray(0, target), writtenBytes), writtenBytes += target, writeToDestination(destination, currentView), chunk = chunk.subarray(target)), currentView = new Uint8Array(4096), writtenBytes = 0), currentView.set(chunk, writtenBytes), writtenBytes += chunk.byteLength, 4096 === writtenBytes && (writeToDestination(destination, currentView), currentView = new Uint8Array(4096), writtenBytes = 0));
    }
    function writeToDestination(destination, view) {
      destination = destination.write(view);
      destinationHasCapacity$1 = destinationHasCapacity$1 && destination;
    }
    function writeChunkAndReturn(destination, chunk) {
      writeChunk(destination, chunk);
      return destinationHasCapacity$1;
    }
    function completeWriting(destination) {
      currentView && 0 < writtenBytes && destination.write(currentView.subarray(0, writtenBytes));
      currentView = null;
      writtenBytes = 0;
      destinationHasCapacity$1 = true;
    }
    var textEncoder = new util.TextEncoder();
    function stringToPrecomputedChunk(content) {
      return textEncoder.encode(content);
    }
    function byteLengthOfChunk(chunk) {
      return "string" === typeof chunk ? Buffer.byteLength(chunk, "utf8") : chunk.byteLength;
    }
    var assign = Object.assign;
    var VALID_ATTRIBUTE_NAME_REGEX = RegExp(
      "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
    );
    var illegalAttributeNameCache = {};
    var validatedAttributeNameCache = {};
    function isAttributeNameSafe(attributeName) {
      if (hasOwnProperty.call(validatedAttributeNameCache, attributeName))
        return true;
      if (hasOwnProperty.call(illegalAttributeNameCache, attributeName)) return false;
      if (VALID_ATTRIBUTE_NAME_REGEX.test(attributeName))
        return validatedAttributeNameCache[attributeName] = true;
      illegalAttributeNameCache[attributeName] = true;
      return false;
    }
    var unitlessNumbers = new Set(
      "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
        " "
      )
    );
    var aliases = /* @__PURE__ */ new Map([
      ["acceptCharset", "accept-charset"],
      ["htmlFor", "for"],
      ["httpEquiv", "http-equiv"],
      ["crossOrigin", "crossorigin"],
      ["accentHeight", "accent-height"],
      ["alignmentBaseline", "alignment-baseline"],
      ["arabicForm", "arabic-form"],
      ["baselineShift", "baseline-shift"],
      ["capHeight", "cap-height"],
      ["clipPath", "clip-path"],
      ["clipRule", "clip-rule"],
      ["colorInterpolation", "color-interpolation"],
      ["colorInterpolationFilters", "color-interpolation-filters"],
      ["colorProfile", "color-profile"],
      ["colorRendering", "color-rendering"],
      ["dominantBaseline", "dominant-baseline"],
      ["enableBackground", "enable-background"],
      ["fillOpacity", "fill-opacity"],
      ["fillRule", "fill-rule"],
      ["floodColor", "flood-color"],
      ["floodOpacity", "flood-opacity"],
      ["fontFamily", "font-family"],
      ["fontSize", "font-size"],
      ["fontSizeAdjust", "font-size-adjust"],
      ["fontStretch", "font-stretch"],
      ["fontStyle", "font-style"],
      ["fontVariant", "font-variant"],
      ["fontWeight", "font-weight"],
      ["glyphName", "glyph-name"],
      ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
      ["glyphOrientationVertical", "glyph-orientation-vertical"],
      ["horizAdvX", "horiz-adv-x"],
      ["horizOriginX", "horiz-origin-x"],
      ["imageRendering", "image-rendering"],
      ["letterSpacing", "letter-spacing"],
      ["lightingColor", "lighting-color"],
      ["markerEnd", "marker-end"],
      ["markerMid", "marker-mid"],
      ["markerStart", "marker-start"],
      ["maskType", "mask-type"],
      ["overlinePosition", "overline-position"],
      ["overlineThickness", "overline-thickness"],
      ["paintOrder", "paint-order"],
      ["panose-1", "panose-1"],
      ["pointerEvents", "pointer-events"],
      ["renderingIntent", "rendering-intent"],
      ["shapeRendering", "shape-rendering"],
      ["stopColor", "stop-color"],
      ["stopOpacity", "stop-opacity"],
      ["strikethroughPosition", "strikethrough-position"],
      ["strikethroughThickness", "strikethrough-thickness"],
      ["strokeDasharray", "stroke-dasharray"],
      ["strokeDashoffset", "stroke-dashoffset"],
      ["strokeLinecap", "stroke-linecap"],
      ["strokeLinejoin", "stroke-linejoin"],
      ["strokeMiterlimit", "stroke-miterlimit"],
      ["strokeOpacity", "stroke-opacity"],
      ["strokeWidth", "stroke-width"],
      ["textAnchor", "text-anchor"],
      ["textDecoration", "text-decoration"],
      ["textRendering", "text-rendering"],
      ["transformOrigin", "transform-origin"],
      ["underlinePosition", "underline-position"],
      ["underlineThickness", "underline-thickness"],
      ["unicodeBidi", "unicode-bidi"],
      ["unicodeRange", "unicode-range"],
      ["unitsPerEm", "units-per-em"],
      ["vAlphabetic", "v-alphabetic"],
      ["vHanging", "v-hanging"],
      ["vIdeographic", "v-ideographic"],
      ["vMathematical", "v-mathematical"],
      ["vectorEffect", "vector-effect"],
      ["vertAdvY", "vert-adv-y"],
      ["vertOriginX", "vert-origin-x"],
      ["vertOriginY", "vert-origin-y"],
      ["wordSpacing", "word-spacing"],
      ["writingMode", "writing-mode"],
      ["xmlnsXlink", "xmlns:xlink"],
      ["xHeight", "x-height"]
    ]);
    var matchHtmlRegExp = /["'&<>]/;
    function escapeTextForBrowser(text) {
      if ("boolean" === typeof text || "number" === typeof text || "bigint" === typeof text)
        return "" + text;
      text = "" + text;
      var match = matchHtmlRegExp.exec(text);
      if (match) {
        var html = "", index, lastIndex = 0;
        for (index = match.index; index < text.length; index++) {
          switch (text.charCodeAt(index)) {
            case 34:
              match = "&quot;";
              break;
            case 38:
              match = "&amp;";
              break;
            case 39:
              match = "&#x27;";
              break;
            case 60:
              match = "&lt;";
              break;
            case 62:
              match = "&gt;";
              break;
            default:
              continue;
          }
          lastIndex !== index && (html += text.slice(lastIndex, index));
          lastIndex = index + 1;
          html += match;
        }
        text = lastIndex !== index ? html + text.slice(lastIndex, index) : html;
      }
      return text;
    }
    var uppercasePattern = /([A-Z])/g;
    var msPattern = /^ms-/;
    var isJavaScriptProtocol = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
    function sanitizeURL(url) {
      return isJavaScriptProtocol.test("" + url) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : url;
    }
    var ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
    var ReactDOMSharedInternals = ReactDOM.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
    var sharedNotPendingObject = {
      pending: false,
      data: null,
      method: null,
      action: null
    };
    var previousDispatcher = ReactDOMSharedInternals.d;
    ReactDOMSharedInternals.d = {
      f: previousDispatcher.f,
      r: previousDispatcher.r,
      D: prefetchDNS,
      C: preconnect,
      L: preload,
      m: preloadModule,
      X: preinitScript,
      S: preinitStyle,
      M: preinitModuleScript
    };
    var PRELOAD_NO_CREDS = [];
    var currentlyFlushingRenderState = null;
    stringToPrecomputedChunk('"></template>');
    var startInlineScript = stringToPrecomputedChunk("<script");
    var endInlineScript = stringToPrecomputedChunk("</script>");
    var startScriptSrc = stringToPrecomputedChunk('<script src="');
    var startModuleSrc = stringToPrecomputedChunk('<script type="module" src="');
    var scriptNonce = stringToPrecomputedChunk(' nonce="');
    var scriptIntegirty = stringToPrecomputedChunk(' integrity="');
    var scriptCrossOrigin = stringToPrecomputedChunk(' crossorigin="');
    var endAsyncScript = stringToPrecomputedChunk(' async=""></script>');
    var startInlineStyle = stringToPrecomputedChunk("<style");
    var scriptRegex = /(<\/|<)(s)(cript)/gi;
    function scriptReplacer(match, prefix2, s, suffix2) {
      return "" + prefix2 + ("s" === s ? "\\u0073" : "\\u0053") + suffix2;
    }
    var importMapScriptStart = stringToPrecomputedChunk(
      '<script type="importmap">'
    );
    var importMapScriptEnd = stringToPrecomputedChunk("</script>");
    function createRenderState(resumableState, nonce, externalRuntimeConfig, importMap, onHeaders, maxHeadersLength) {
      externalRuntimeConfig = "string" === typeof nonce ? nonce : nonce && nonce.script;
      var inlineScriptWithNonce = void 0 === externalRuntimeConfig ? startInlineScript : stringToPrecomputedChunk(
        '<script nonce="' + escapeTextForBrowser(externalRuntimeConfig) + '"'
      ), nonceStyle = "string" === typeof nonce ? void 0 : nonce && nonce.style, inlineStyleWithNonce = void 0 === nonceStyle ? startInlineStyle : stringToPrecomputedChunk(
        '<style nonce="' + escapeTextForBrowser(nonceStyle) + '"'
      ), idPrefix = resumableState.idPrefix, bootstrapChunks = [], bootstrapScriptContent = resumableState.bootstrapScriptContent, bootstrapScripts = resumableState.bootstrapScripts, bootstrapModules = resumableState.bootstrapModules;
      void 0 !== bootstrapScriptContent && (bootstrapChunks.push(inlineScriptWithNonce), pushCompletedShellIdAttribute(bootstrapChunks, resumableState), bootstrapChunks.push(
        endOfStartTag,
        ("" + bootstrapScriptContent).replace(scriptRegex, scriptReplacer),
        endInlineScript
      ));
      bootstrapScriptContent = [];
      void 0 !== importMap && (bootstrapScriptContent.push(
        void 0 === externalRuntimeConfig ? importMapScriptStart : stringToPrecomputedChunk(
          '<script type="importmap" nonce="' + escapeTextForBrowser(externalRuntimeConfig) + '">'
        )
      ), bootstrapScriptContent.push(
        ("" + JSON.stringify(importMap)).replace(scriptRegex, scriptReplacer)
      ), bootstrapScriptContent.push(importMapScriptEnd));
      importMap = onHeaders ? {
        preconnects: "",
        fontPreloads: "",
        highImagePreloads: "",
        remainingCapacity: 2 + ("number" === typeof maxHeadersLength ? maxHeadersLength : 2e3)
      } : null;
      onHeaders = {
        placeholderPrefix: stringToPrecomputedChunk(idPrefix + "P:"),
        segmentPrefix: stringToPrecomputedChunk(idPrefix + "S:"),
        boundaryPrefix: stringToPrecomputedChunk(idPrefix + "B:"),
        startInlineScript: inlineScriptWithNonce,
        startInlineStyle: inlineStyleWithNonce,
        preamble: createPreambleState(),
        externalRuntimeScript: null,
        bootstrapChunks,
        importMapChunks: bootstrapScriptContent,
        onHeaders,
        headers: importMap,
        resets: {
          font: {},
          dns: {},
          connect: { default: {}, anonymous: {}, credentials: {} },
          image: {},
          style: {}
        },
        charsetChunks: [],
        viewportChunks: [],
        hoistableChunks: [],
        preconnects: /* @__PURE__ */ new Set(),
        fontPreloads: /* @__PURE__ */ new Set(),
        highImagePreloads: /* @__PURE__ */ new Set(),
        styles: /* @__PURE__ */ new Map(),
        bootstrapScripts: /* @__PURE__ */ new Set(),
        scripts: /* @__PURE__ */ new Set(),
        bulkPreloads: /* @__PURE__ */ new Set(),
        preloads: {
          images: /* @__PURE__ */ new Map(),
          stylesheets: /* @__PURE__ */ new Map(),
          scripts: /* @__PURE__ */ new Map(),
          moduleScripts: /* @__PURE__ */ new Map()
        },
        nonce: { script: externalRuntimeConfig, style: nonceStyle },
        hoistableState: null,
        stylesToHoist: false
      };
      if (void 0 !== bootstrapScripts)
        for (importMap = 0; importMap < bootstrapScripts.length; importMap++)
          idPrefix = bootstrapScripts[importMap], nonceStyle = inlineScriptWithNonce = void 0, inlineStyleWithNonce = {
            rel: "preload",
            as: "script",
            fetchPriority: "low",
            nonce
          }, "string" === typeof idPrefix ? inlineStyleWithNonce.href = maxHeadersLength = idPrefix : (inlineStyleWithNonce.href = maxHeadersLength = idPrefix.src, inlineStyleWithNonce.integrity = nonceStyle = "string" === typeof idPrefix.integrity ? idPrefix.integrity : void 0, inlineStyleWithNonce.crossOrigin = inlineScriptWithNonce = "string" === typeof idPrefix || null == idPrefix.crossOrigin ? void 0 : "use-credentials" === idPrefix.crossOrigin ? "use-credentials" : ""), idPrefix = resumableState, bootstrapScriptContent = maxHeadersLength, idPrefix.scriptResources[bootstrapScriptContent] = null, idPrefix.moduleScriptResources[bootstrapScriptContent] = null, idPrefix = [], pushLinkImpl(idPrefix, inlineStyleWithNonce), onHeaders.bootstrapScripts.add(idPrefix), bootstrapChunks.push(
            startScriptSrc,
            escapeTextForBrowser(maxHeadersLength),
            attributeEnd
          ), externalRuntimeConfig && bootstrapChunks.push(
            scriptNonce,
            escapeTextForBrowser(externalRuntimeConfig),
            attributeEnd
          ), "string" === typeof nonceStyle && bootstrapChunks.push(
            scriptIntegirty,
            escapeTextForBrowser(nonceStyle),
            attributeEnd
          ), "string" === typeof inlineScriptWithNonce && bootstrapChunks.push(
            scriptCrossOrigin,
            escapeTextForBrowser(inlineScriptWithNonce),
            attributeEnd
          ), pushCompletedShellIdAttribute(bootstrapChunks, resumableState), bootstrapChunks.push(endAsyncScript);
      if (void 0 !== bootstrapModules)
        for (nonce = 0; nonce < bootstrapModules.length; nonce++)
          nonceStyle = bootstrapModules[nonce], maxHeadersLength = importMap = void 0, inlineScriptWithNonce = {
            rel: "modulepreload",
            fetchPriority: "low",
            nonce: externalRuntimeConfig
          }, "string" === typeof nonceStyle ? inlineScriptWithNonce.href = bootstrapScripts = nonceStyle : (inlineScriptWithNonce.href = bootstrapScripts = nonceStyle.src, inlineScriptWithNonce.integrity = maxHeadersLength = "string" === typeof nonceStyle.integrity ? nonceStyle.integrity : void 0, inlineScriptWithNonce.crossOrigin = importMap = "string" === typeof nonceStyle || null == nonceStyle.crossOrigin ? void 0 : "use-credentials" === nonceStyle.crossOrigin ? "use-credentials" : ""), nonceStyle = resumableState, inlineStyleWithNonce = bootstrapScripts, nonceStyle.scriptResources[inlineStyleWithNonce] = null, nonceStyle.moduleScriptResources[inlineStyleWithNonce] = null, nonceStyle = [], pushLinkImpl(nonceStyle, inlineScriptWithNonce), onHeaders.bootstrapScripts.add(nonceStyle), bootstrapChunks.push(
            startModuleSrc,
            escapeTextForBrowser(bootstrapScripts),
            attributeEnd
          ), externalRuntimeConfig && bootstrapChunks.push(
            scriptNonce,
            escapeTextForBrowser(externalRuntimeConfig),
            attributeEnd
          ), "string" === typeof maxHeadersLength && bootstrapChunks.push(
            scriptIntegirty,
            escapeTextForBrowser(maxHeadersLength),
            attributeEnd
          ), "string" === typeof importMap && bootstrapChunks.push(
            scriptCrossOrigin,
            escapeTextForBrowser(importMap),
            attributeEnd
          ), pushCompletedShellIdAttribute(bootstrapChunks, resumableState), bootstrapChunks.push(endAsyncScript);
      return onHeaders;
    }
    function createResumableState(identifierPrefix, externalRuntimeConfig, bootstrapScriptContent, bootstrapScripts, bootstrapModules) {
      return {
        idPrefix: void 0 === identifierPrefix ? "" : identifierPrefix,
        nextFormID: 0,
        streamingFormat: 0,
        bootstrapScriptContent,
        bootstrapScripts,
        bootstrapModules,
        instructions: 0,
        hasBody: false,
        hasHtml: false,
        unknownResources: {},
        dnsResources: {},
        connectResources: { default: {}, anonymous: {}, credentials: {} },
        imageResources: {},
        styleResources: {},
        scriptResources: {},
        moduleUnknownResources: {},
        moduleScriptResources: {}
      };
    }
    function createPreambleState() {
      return { htmlChunks: null, headChunks: null, bodyChunks: null };
    }
    function createFormatContext(insertionMode, selectedValue, tagScope, viewTransition) {
      return {
        insertionMode,
        selectedValue,
        tagScope,
        viewTransition
      };
    }
    function createRootFormatContext(namespaceURI) {
      return createFormatContext(
        "http://www.w3.org/2000/svg" === namespaceURI ? 4 : "http://www.w3.org/1998/Math/MathML" === namespaceURI ? 5 : 0,
        null,
        0,
        null
      );
    }
    function getChildFormatContext(parentContext, type, props) {
      var subtreeScope = parentContext.tagScope & -25;
      switch (type) {
        case "noscript":
          return createFormatContext(2, null, subtreeScope | 1, null);
        case "select":
          return createFormatContext(
            2,
            null != props.value ? props.value : props.defaultValue,
            subtreeScope,
            null
          );
        case "svg":
          return createFormatContext(4, null, subtreeScope, null);
        case "picture":
          return createFormatContext(2, null, subtreeScope | 2, null);
        case "math":
          return createFormatContext(5, null, subtreeScope, null);
        case "foreignObject":
          return createFormatContext(2, null, subtreeScope, null);
        case "table":
          return createFormatContext(6, null, subtreeScope, null);
        case "thead":
        case "tbody":
        case "tfoot":
          return createFormatContext(7, null, subtreeScope, null);
        case "colgroup":
          return createFormatContext(9, null, subtreeScope, null);
        case "tr":
          return createFormatContext(8, null, subtreeScope, null);
        case "head":
          if (2 > parentContext.insertionMode)
            return createFormatContext(3, null, subtreeScope, null);
          break;
        case "html":
          if (0 === parentContext.insertionMode)
            return createFormatContext(1, null, subtreeScope, null);
      }
      return 6 <= parentContext.insertionMode || 2 > parentContext.insertionMode ? createFormatContext(2, null, subtreeScope, null) : null !== parentContext.viewTransition || parentContext.tagScope !== subtreeScope ? createFormatContext(
        parentContext.insertionMode,
        parentContext.selectedValue,
        subtreeScope,
        null
      ) : parentContext;
    }
    function getSuspenseViewTransition(parentViewTransition) {
      return null === parentViewTransition ? null : {
        update: parentViewTransition.update,
        enter: "none",
        exit: "none",
        share: parentViewTransition.update,
        parentEnter: "none",
        parentExit: "none",
        name: parentViewTransition.autoName,
        autoName: parentViewTransition.autoName,
        nameIdx: 0
      };
    }
    function getSuspenseFallbackFormatContext(resumableState, parentContext) {
      parentContext.tagScope & 32 && (resumableState.instructions |= 128);
      return createFormatContext(
        parentContext.insertionMode,
        parentContext.selectedValue,
        parentContext.tagScope | 12,
        getSuspenseViewTransition(parentContext.viewTransition)
      );
    }
    function getSuspenseContentFormatContext(resumableState, parentContext) {
      resumableState = getSuspenseViewTransition(parentContext.viewTransition);
      var subtreeScope = parentContext.tagScope | 16;
      null !== resumableState && "none" !== resumableState.share && (subtreeScope |= 64);
      return createFormatContext(
        parentContext.insertionMode,
        parentContext.selectedValue,
        subtreeScope,
        resumableState
      );
    }
    function makeId(resumableState, treeId, localId) {
      resumableState = "_" + resumableState.idPrefix + "R_" + treeId;
      0 < localId && (resumableState += "H" + localId.toString(32));
      return resumableState + "_";
    }
    var textSeparator = stringToPrecomputedChunk("<!-- -->");
    function pushTextInstance(target, text, renderState, textEmbedded) {
      if ("" === text) return textEmbedded;
      textEmbedded && target.push(textSeparator);
      target.push(escapeTextForBrowser(text));
      return true;
    }
    function pushViewTransitionAttributes(target, formatContext) {
      formatContext = formatContext.viewTransition;
      null !== formatContext && ("auto" !== formatContext.name && (pushStringAttribute(
        target,
        "vt-name",
        0 === formatContext.nameIdx ? formatContext.name : formatContext.name + "_" + formatContext.nameIdx
      ), formatContext.nameIdx++), pushStringAttribute(target, "vt-update", formatContext.update), "none" !== formatContext.enter && pushStringAttribute(target, "vt-enter", formatContext.enter), "none" !== formatContext.exit && pushStringAttribute(target, "vt-exit", formatContext.exit), "none" !== formatContext.share && pushStringAttribute(target, "vt-share", formatContext.share));
    }
    var styleNameCache = /* @__PURE__ */ new Map();
    var styleAttributeStart = stringToPrecomputedChunk(' style="');
    var styleAssign = stringToPrecomputedChunk(":");
    var styleSeparator = stringToPrecomputedChunk(";");
    function pushStyleAttribute(target, style) {
      if ("object" !== typeof style)
        throw Error(
          "The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX."
        );
      var isFirst = true, styleName;
      for (styleName in style)
        if (hasOwnProperty.call(style, styleName)) {
          var styleValue = style[styleName];
          if (null != styleValue && "boolean" !== typeof styleValue && "" !== styleValue) {
            if (0 === styleName.indexOf("--")) {
              var nameChunk = escapeTextForBrowser(styleName);
              styleValue = escapeTextForBrowser(("" + styleValue).trim());
            } else
              nameChunk = styleNameCache.get(styleName), void 0 === nameChunk && (nameChunk = stringToPrecomputedChunk(
                escapeTextForBrowser(
                  styleName.replace(uppercasePattern, "-$1").toLowerCase().replace(msPattern, "-ms-")
                )
              ), styleNameCache.set(styleName, nameChunk)), styleValue = "number" === typeof styleValue ? 0 === styleValue || unitlessNumbers.has(styleName) ? "" + styleValue : styleValue + "px" : escapeTextForBrowser(("" + styleValue).trim());
            isFirst ? (isFirst = false, target.push(
              styleAttributeStart,
              nameChunk,
              styleAssign,
              styleValue
            )) : target.push(styleSeparator, nameChunk, styleAssign, styleValue);
          }
        }
      isFirst || target.push(attributeEnd);
    }
    var attributeSeparator = stringToPrecomputedChunk(" ");
    var attributeAssign = stringToPrecomputedChunk('="');
    var attributeEnd = stringToPrecomputedChunk('"');
    var attributeEmptyString = stringToPrecomputedChunk('=""');
    function pushBooleanAttribute(target, name, value) {
      value && "function" !== typeof value && "symbol" !== typeof value && target.push(attributeSeparator, name, attributeEmptyString);
    }
    function pushStringAttribute(target, name, value) {
      "function" !== typeof value && "symbol" !== typeof value && "boolean" !== typeof value && target.push(
        attributeSeparator,
        name,
        attributeAssign,
        escapeTextForBrowser(value),
        attributeEnd
      );
    }
    var actionJavaScriptURL = stringToPrecomputedChunk(
      escapeTextForBrowser(
        "javascript:throw new Error('React form unexpectedly submitted.')"
      )
    );
    var startHiddenInputChunk = stringToPrecomputedChunk('<input type="hidden"');
    function pushAdditionalFormField(value, key) {
      this.push(startHiddenInputChunk);
      validateAdditionalFormField(value);
      pushStringAttribute(this, "name", key);
      pushStringAttribute(this, "value", value);
      this.push(endOfStartTagSelfClosing);
    }
    function validateAdditionalFormField(value) {
      if ("string" !== typeof value)
        throw Error(
          "File/Blob fields are not yet supported in progressive forms. Will fallback to client hydration."
        );
    }
    function getCustomFormFields(resumableState, formAction) {
      if ("function" === typeof formAction.$$FORM_ACTION) {
        var id = resumableState.nextFormID++;
        resumableState = resumableState.idPrefix + id;
        try {
          var customFields = formAction.$$FORM_ACTION(resumableState);
          if (customFields) {
            var formData = customFields.data;
            null != formData && formData.forEach(validateAdditionalFormField);
          }
          return customFields;
        } catch (x) {
          if ("object" === typeof x && null !== x && "function" === typeof x.then)
            throw x;
        }
      }
      return null;
    }
    function pushFormActionAttribute(target, resumableState, renderState, formAction, formEncType, formMethod, formTarget, name) {
      var formData = null;
      if ("function" === typeof formAction) {
        var customFields = getCustomFormFields(resumableState, formAction);
        null !== customFields ? (name = customFields.name, formAction = customFields.action || "", formEncType = customFields.encType, formMethod = customFields.method, formTarget = customFields.target, formData = customFields.data) : (target.push(
          attributeSeparator,
          "formAction",
          attributeAssign,
          actionJavaScriptURL,
          attributeEnd
        ), formTarget = formMethod = formEncType = formAction = name = null, injectFormReplayingRuntime(resumableState, renderState));
      }
      null != name && pushAttribute(target, "name", name);
      null != formAction && pushAttribute(target, "formAction", formAction);
      null != formEncType && pushAttribute(target, "formEncType", formEncType);
      null != formMethod && pushAttribute(target, "formMethod", formMethod);
      null != formTarget && pushAttribute(target, "formTarget", formTarget);
      return formData;
    }
    function pushAttribute(target, name, value) {
      switch (name) {
        case "className":
          pushStringAttribute(target, "class", value);
          break;
        case "tabIndex":
          pushStringAttribute(target, "tabindex", value);
          break;
        case "dir":
        case "role":
        case "viewBox":
        case "width":
        case "height":
          pushStringAttribute(target, name, value);
          break;
        case "style":
          pushStyleAttribute(target, value);
          break;
        case "src":
        case "href":
          if ("" === value) break;
        case "action":
        case "formAction":
          if (null == value || "function" === typeof value || "symbol" === typeof value || "boolean" === typeof value)
            break;
          value = sanitizeURL("" + value);
          target.push(
            attributeSeparator,
            name,
            attributeAssign,
            escapeTextForBrowser(value),
            attributeEnd
          );
          break;
        case "defaultValue":
        case "defaultChecked":
        case "innerHTML":
        case "suppressContentEditableWarning":
        case "suppressHydrationWarning":
        case "ref":
          break;
        case "autoFocus":
        case "multiple":
        case "muted":
          pushBooleanAttribute(target, name.toLowerCase(), value);
          break;
        case "xlinkHref":
          if ("function" === typeof value || "symbol" === typeof value || "boolean" === typeof value)
            break;
          value = sanitizeURL("" + value);
          target.push(
            attributeSeparator,
            "xlink:href",
            attributeAssign,
            escapeTextForBrowser(value),
            attributeEnd
          );
          break;
        case "contentEditable":
        case "spellCheck":
        case "draggable":
        case "value":
        case "autoReverse":
        case "externalResourcesRequired":
        case "focusable":
        case "preserveAlpha":
          "function" !== typeof value && "symbol" !== typeof value && target.push(
            attributeSeparator,
            name,
            attributeAssign,
            escapeTextForBrowser(value),
            attributeEnd
          );
          break;
        case "inert":
        case "allowFullScreen":
        case "async":
        case "autoPlay":
        case "controls":
        case "credentialless":
        case "default":
        case "defer":
        case "disabled":
        case "disablePictureInPicture":
        case "disableRemotePlayback":
        case "formNoValidate":
        case "hidden":
        case "loop":
        case "noModule":
        case "noValidate":
        case "open":
        case "playsInline":
        case "readOnly":
        case "required":
        case "reversed":
        case "scoped":
        case "seamless":
        case "itemScope":
          value && "function" !== typeof value && "symbol" !== typeof value && target.push(attributeSeparator, name, attributeEmptyString);
          break;
        case "capture":
        case "download":
          true === value ? target.push(attributeSeparator, name, attributeEmptyString) : false !== value && "function" !== typeof value && "symbol" !== typeof value && target.push(
            attributeSeparator,
            name,
            attributeAssign,
            escapeTextForBrowser(value),
            attributeEnd
          );
          break;
        case "cols":
        case "rows":
        case "size":
        case "span":
          "function" !== typeof value && "symbol" !== typeof value && !isNaN(value) && 1 <= value && target.push(
            attributeSeparator,
            name,
            attributeAssign,
            escapeTextForBrowser(value),
            attributeEnd
          );
          break;
        case "rowSpan":
        case "start":
          "function" === typeof value || "symbol" === typeof value || isNaN(value) || target.push(
            attributeSeparator,
            name,
            attributeAssign,
            escapeTextForBrowser(value),
            attributeEnd
          );
          break;
        case "xlinkActuate":
          pushStringAttribute(target, "xlink:actuate", value);
          break;
        case "xlinkArcrole":
          pushStringAttribute(target, "xlink:arcrole", value);
          break;
        case "xlinkRole":
          pushStringAttribute(target, "xlink:role", value);
          break;
        case "xlinkShow":
          pushStringAttribute(target, "xlink:show", value);
          break;
        case "xlinkTitle":
          pushStringAttribute(target, "xlink:title", value);
          break;
        case "xlinkType":
          pushStringAttribute(target, "xlink:type", value);
          break;
        case "xmlBase":
          pushStringAttribute(target, "xml:base", value);
          break;
        case "xmlLang":
          pushStringAttribute(target, "xml:lang", value);
          break;
        case "xmlSpace":
          pushStringAttribute(target, "xml:space", value);
          break;
        default:
          if (!(2 < name.length) || "o" !== name[0] && "O" !== name[0] || "n" !== name[1] && "N" !== name[1]) {
            if (name = aliases.get(name) || name, isAttributeNameSafe(name)) {
              switch (typeof value) {
                case "function":
                case "symbol":
                  return;
                case "boolean":
                  var prefix$8 = name.toLowerCase().slice(0, 5);
                  if ("data-" !== prefix$8 && "aria-" !== prefix$8) return;
              }
              target.push(
                attributeSeparator,
                name,
                attributeAssign,
                escapeTextForBrowser(value),
                attributeEnd
              );
            }
          }
      }
    }
    var endOfStartTag = stringToPrecomputedChunk(">");
    var endOfStartTagSelfClosing = stringToPrecomputedChunk("/>");
    function pushInnerHTML(target, innerHTML, children) {
      if (null != innerHTML) {
        if (null != children)
          throw Error(
            "Can only set one of `children` or `props.dangerouslySetInnerHTML`."
          );
        if ("object" !== typeof innerHTML || !("__html" in innerHTML))
          throw Error(
            "`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://react.dev/link/dangerously-set-inner-html for more information."
          );
        innerHTML = innerHTML.__html;
        null !== innerHTML && void 0 !== innerHTML && target.push("" + innerHTML);
      }
    }
    function flattenOptionChildren(children) {
      var content = "";
      React.Children.forEach(children, function(child) {
        null != child && (content += child);
      });
      return content;
    }
    var selectedMarkerAttribute = stringToPrecomputedChunk(' selected=""');
    var formReplayingRuntimeScript = stringToPrecomputedChunk(
      `addEventListener("submit",function(a){if(!a.defaultPrevented){var b=a.target,d=a.submitter,c=b.action,e=d;if(d){var f=d.getAttribute("formAction");null!=f&&(c=f,e=null)}"javascript:throw new Error('React form unexpectedly submitted.')"===c&&(a.preventDefault(),a=new FormData(b,e),c=b.ownerDocument||b,(c.$$reactFormReplay=c.$$reactFormReplay||[]).push(b,d,a))}});`
    );
    function injectFormReplayingRuntime(resumableState, renderState) {
      if (0 === (resumableState.instructions & 16)) {
        resumableState.instructions |= 16;
        var preamble = renderState.preamble, bootstrapChunks = renderState.bootstrapChunks;
        (preamble.htmlChunks || preamble.headChunks) && 0 === bootstrapChunks.length ? (bootstrapChunks.push(renderState.startInlineScript), pushCompletedShellIdAttribute(bootstrapChunks, resumableState), bootstrapChunks.push(
          endOfStartTag,
          formReplayingRuntimeScript,
          endInlineScript
        )) : bootstrapChunks.unshift(
          renderState.startInlineScript,
          endOfStartTag,
          formReplayingRuntimeScript,
          endInlineScript
        );
      }
    }
    var formStateMarkerIsMatching = stringToPrecomputedChunk("<!--F!-->");
    var formStateMarkerIsNotMatching = stringToPrecomputedChunk("<!--F-->");
    function pushLinkImpl(target, props) {
      target.push(startChunkForTag("link"));
      for (var propKey in props)
        if (hasOwnProperty.call(props, propKey)) {
          var propValue = props[propKey];
          if (null != propValue)
            switch (propKey) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(
                  "link is a self-closing tag and must neither have `children` nor use `dangerouslySetInnerHTML`."
                );
              default:
                pushAttribute(target, propKey, propValue);
            }
        }
      target.push(endOfStartTagSelfClosing);
      return null;
    }
    var styleRegex = /(<\/|<)(s)(tyle)/gi;
    function styleReplacer(match, prefix2, s, suffix2) {
      return "" + prefix2 + ("s" === s ? "\\73 " : "\\53 ") + suffix2;
    }
    function pushSelfClosing(target, props, tag, formatContext) {
      target.push(startChunkForTag(tag));
      for (var propKey in props)
        if (hasOwnProperty.call(props, propKey)) {
          var propValue = props[propKey];
          if (null != propValue)
            switch (propKey) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(
                  tag + " is a self-closing tag and must neither have `children` nor use `dangerouslySetInnerHTML`."
                );
              default:
                pushAttribute(target, propKey, propValue);
            }
        }
      pushViewTransitionAttributes(target, formatContext);
      target.push(endOfStartTagSelfClosing);
      return null;
    }
    function pushTitleImpl(target, props) {
      target.push(startChunkForTag("title"));
      var children = null, innerHTML = null, propKey;
      for (propKey in props)
        if (hasOwnProperty.call(props, propKey)) {
          var propValue = props[propKey];
          if (null != propValue)
            switch (propKey) {
              case "children":
                children = propValue;
                break;
              case "dangerouslySetInnerHTML":
                innerHTML = propValue;
                break;
              default:
                pushAttribute(target, propKey, propValue);
            }
        }
      target.push(endOfStartTag);
      props = Array.isArray(children) ? 2 > children.length ? children[0] : null : children;
      "function" !== typeof props && "symbol" !== typeof props && null !== props && void 0 !== props && target.push(escapeTextForBrowser("" + props));
      pushInnerHTML(target, innerHTML, children);
      target.push(endChunkForTag("title"));
      return null;
    }
    var headPreambleContributionChunk = stringToPrecomputedChunk("<!--head-->");
    var bodyPreambleContributionChunk = stringToPrecomputedChunk("<!--body-->");
    var htmlPreambleContributionChunk = stringToPrecomputedChunk("<!--html-->");
    function pushScriptImpl(target, props) {
      target.push(startChunkForTag("script"));
      var children = null, innerHTML = null, propKey;
      for (propKey in props)
        if (hasOwnProperty.call(props, propKey)) {
          var propValue = props[propKey];
          if (null != propValue)
            switch (propKey) {
              case "children":
                children = propValue;
                break;
              case "dangerouslySetInnerHTML":
                innerHTML = propValue;
                break;
              default:
                pushAttribute(target, propKey, propValue);
            }
        }
      target.push(endOfStartTag);
      pushInnerHTML(target, innerHTML, children);
      "string" === typeof children && target.push(("" + children).replace(scriptRegex, scriptReplacer));
      target.push(endChunkForTag("script"));
      return null;
    }
    function pushStartSingletonElement(target, props, tag, formatContext) {
      target.push(startChunkForTag(tag));
      var innerHTML = tag = null, propKey;
      for (propKey in props)
        if (hasOwnProperty.call(props, propKey)) {
          var propValue = props[propKey];
          if (null != propValue)
            switch (propKey) {
              case "children":
                tag = propValue;
                break;
              case "dangerouslySetInnerHTML":
                innerHTML = propValue;
                break;
              default:
                pushAttribute(target, propKey, propValue);
            }
        }
      pushViewTransitionAttributes(target, formatContext);
      target.push(endOfStartTag);
      pushInnerHTML(target, innerHTML, tag);
      return tag;
    }
    function pushStartGenericElement(target, props, tag, formatContext) {
      target.push(startChunkForTag(tag));
      var innerHTML = tag = null, propKey;
      for (propKey in props)
        if (hasOwnProperty.call(props, propKey)) {
          var propValue = props[propKey];
          if (null != propValue)
            switch (propKey) {
              case "children":
                tag = propValue;
                break;
              case "dangerouslySetInnerHTML":
                innerHTML = propValue;
                break;
              default:
                pushAttribute(target, propKey, propValue);
            }
        }
      pushViewTransitionAttributes(target, formatContext);
      target.push(endOfStartTag);
      pushInnerHTML(target, innerHTML, tag);
      return "string" === typeof tag ? (target.push(escapeTextForBrowser(tag)), null) : tag;
    }
    var leadingNewline = stringToPrecomputedChunk("\n");
    var VALID_TAG_REGEX = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/;
    var validatedTagCache = /* @__PURE__ */ new Map();
    function startChunkForTag(tag) {
      var tagStartChunk = validatedTagCache.get(tag);
      if (void 0 === tagStartChunk) {
        if (!VALID_TAG_REGEX.test(tag)) throw Error("Invalid tag: " + tag);
        tagStartChunk = stringToPrecomputedChunk("<" + tag);
        validatedTagCache.set(tag, tagStartChunk);
      }
      return tagStartChunk;
    }
    var doctypeChunk = stringToPrecomputedChunk("<!DOCTYPE html>");
    function pushStartInstance(target$jscomp$0, type, props, resumableState, renderState, preambleState, hoistableState, formatContext, textEmbedded) {
      switch (type) {
        case "div":
        case "span":
        case "svg":
        case "path":
          break;
        case "a":
          target$jscomp$0.push(startChunkForTag("a"));
          var children = null, innerHTML = null, propKey;
          for (propKey in props)
            if (hasOwnProperty.call(props, propKey)) {
              var propValue = props[propKey];
              if (null != propValue)
                switch (propKey) {
                  case "children":
                    children = propValue;
                    break;
                  case "dangerouslySetInnerHTML":
                    innerHTML = propValue;
                    break;
                  case "href":
                    "" === propValue ? pushStringAttribute(target$jscomp$0, "href", "") : pushAttribute(target$jscomp$0, propKey, propValue);
                    break;
                  default:
                    pushAttribute(target$jscomp$0, propKey, propValue);
                }
            }
          pushViewTransitionAttributes(target$jscomp$0, formatContext);
          target$jscomp$0.push(endOfStartTag);
          pushInnerHTML(target$jscomp$0, innerHTML, children);
          if ("string" === typeof children) {
            target$jscomp$0.push(escapeTextForBrowser(children));
            var JSCompiler_inline_result = null;
          } else JSCompiler_inline_result = children;
          return JSCompiler_inline_result;
        case "g":
        case "p":
        case "li":
          break;
        case "select":
          target$jscomp$0.push(startChunkForTag("select"));
          var children$jscomp$0 = null, innerHTML$jscomp$0 = null, propKey$jscomp$0;
          for (propKey$jscomp$0 in props)
            if (hasOwnProperty.call(props, propKey$jscomp$0)) {
              var propValue$jscomp$0 = props[propKey$jscomp$0];
              if (null != propValue$jscomp$0)
                switch (propKey$jscomp$0) {
                  case "children":
                    children$jscomp$0 = propValue$jscomp$0;
                    break;
                  case "dangerouslySetInnerHTML":
                    innerHTML$jscomp$0 = propValue$jscomp$0;
                    break;
                  case "defaultValue":
                  case "value":
                    break;
                  default:
                    pushAttribute(
                      target$jscomp$0,
                      propKey$jscomp$0,
                      propValue$jscomp$0
                    );
                }
            }
          pushViewTransitionAttributes(target$jscomp$0, formatContext);
          target$jscomp$0.push(endOfStartTag);
          pushInnerHTML(target$jscomp$0, innerHTML$jscomp$0, children$jscomp$0);
          return children$jscomp$0;
        case "option":
          var selectedValue = formatContext.selectedValue;
          target$jscomp$0.push(startChunkForTag("option"));
          var children$jscomp$1 = null, value = null, selected = null, innerHTML$jscomp$1 = null, propKey$jscomp$1;
          for (propKey$jscomp$1 in props)
            if (hasOwnProperty.call(props, propKey$jscomp$1)) {
              var propValue$jscomp$1 = props[propKey$jscomp$1];
              if (null != propValue$jscomp$1)
                switch (propKey$jscomp$1) {
                  case "children":
                    children$jscomp$1 = propValue$jscomp$1;
                    break;
                  case "selected":
                    selected = propValue$jscomp$1;
                    break;
                  case "dangerouslySetInnerHTML":
                    innerHTML$jscomp$1 = propValue$jscomp$1;
                    break;
                  case "value":
                    value = propValue$jscomp$1;
                  default:
                    pushAttribute(
                      target$jscomp$0,
                      propKey$jscomp$1,
                      propValue$jscomp$1
                    );
                }
            }
          if (null != selectedValue) {
            var stringValue = null !== value ? "" + value : flattenOptionChildren(children$jscomp$1);
            if (isArrayImpl(selectedValue))
              for (var i = 0; i < selectedValue.length; i++) {
                if ("" + selectedValue[i] === stringValue) {
                  target$jscomp$0.push(selectedMarkerAttribute);
                  break;
                }
              }
            else
              "" + selectedValue === stringValue && target$jscomp$0.push(selectedMarkerAttribute);
          } else selected && target$jscomp$0.push(selectedMarkerAttribute);
          target$jscomp$0.push(endOfStartTag);
          pushInnerHTML(target$jscomp$0, innerHTML$jscomp$1, children$jscomp$1);
          return children$jscomp$1;
        case "textarea":
          target$jscomp$0.push(startChunkForTag("textarea"));
          var value$jscomp$0 = null, defaultValue = null, children$jscomp$2 = null, propKey$jscomp$2;
          for (propKey$jscomp$2 in props)
            if (hasOwnProperty.call(props, propKey$jscomp$2)) {
              var propValue$jscomp$2 = props[propKey$jscomp$2];
              if (null != propValue$jscomp$2)
                switch (propKey$jscomp$2) {
                  case "children":
                    children$jscomp$2 = propValue$jscomp$2;
                    break;
                  case "value":
                    value$jscomp$0 = propValue$jscomp$2;
                    break;
                  case "defaultValue":
                    defaultValue = propValue$jscomp$2;
                    break;
                  case "dangerouslySetInnerHTML":
                    throw Error(
                      "`dangerouslySetInnerHTML` does not make sense on <textarea>."
                    );
                  default:
                    pushAttribute(
                      target$jscomp$0,
                      propKey$jscomp$2,
                      propValue$jscomp$2
                    );
                }
            }
          null === value$jscomp$0 && null !== defaultValue && (value$jscomp$0 = defaultValue);
          pushViewTransitionAttributes(target$jscomp$0, formatContext);
          target$jscomp$0.push(endOfStartTag);
          if (null != children$jscomp$2) {
            if (null != value$jscomp$0)
              throw Error(
                "If you supply `defaultValue` on a <textarea>, do not pass children."
              );
            if (isArrayImpl(children$jscomp$2)) {
              if (1 < children$jscomp$2.length)
                throw Error("<textarea> can only have at most one child.");
              value$jscomp$0 = "" + children$jscomp$2[0];
            }
            value$jscomp$0 = "" + children$jscomp$2;
          }
          "string" === typeof value$jscomp$0 && "\n" === value$jscomp$0[0] && target$jscomp$0.push(leadingNewline);
          null !== value$jscomp$0 && target$jscomp$0.push(escapeTextForBrowser("" + value$jscomp$0));
          return null;
        case "input":
          target$jscomp$0.push(startChunkForTag("input"));
          var name = null, formAction = null, formEncType = null, formMethod = null, formTarget = null, value$jscomp$1 = null, defaultValue$jscomp$0 = null, checked = null, defaultChecked = null, propKey$jscomp$3;
          for (propKey$jscomp$3 in props)
            if (hasOwnProperty.call(props, propKey$jscomp$3)) {
              var propValue$jscomp$3 = props[propKey$jscomp$3];
              if (null != propValue$jscomp$3)
                switch (propKey$jscomp$3) {
                  case "children":
                  case "dangerouslySetInnerHTML":
                    throw Error(
                      "input is a self-closing tag and must neither have `children` nor use `dangerouslySetInnerHTML`."
                    );
                  case "name":
                    name = propValue$jscomp$3;
                    break;
                  case "formAction":
                    formAction = propValue$jscomp$3;
                    break;
                  case "formEncType":
                    formEncType = propValue$jscomp$3;
                    break;
                  case "formMethod":
                    formMethod = propValue$jscomp$3;
                    break;
                  case "formTarget":
                    formTarget = propValue$jscomp$3;
                    break;
                  case "defaultChecked":
                    defaultChecked = propValue$jscomp$3;
                    break;
                  case "defaultValue":
                    defaultValue$jscomp$0 = propValue$jscomp$3;
                    break;
                  case "checked":
                    checked = propValue$jscomp$3;
                    break;
                  case "value":
                    value$jscomp$1 = propValue$jscomp$3;
                    break;
                  default:
                    pushAttribute(
                      target$jscomp$0,
                      propKey$jscomp$3,
                      propValue$jscomp$3
                    );
                }
            }
          var formData = pushFormActionAttribute(
            target$jscomp$0,
            resumableState,
            renderState,
            formAction,
            formEncType,
            formMethod,
            formTarget,
            name
          );
          null !== checked ? pushBooleanAttribute(target$jscomp$0, "checked", checked) : null !== defaultChecked && pushBooleanAttribute(target$jscomp$0, "checked", defaultChecked);
          null !== value$jscomp$1 ? pushAttribute(target$jscomp$0, "value", value$jscomp$1) : null !== defaultValue$jscomp$0 && pushAttribute(target$jscomp$0, "value", defaultValue$jscomp$0);
          pushViewTransitionAttributes(target$jscomp$0, formatContext);
          target$jscomp$0.push(endOfStartTagSelfClosing);
          null != formData && formData.forEach(pushAdditionalFormField, target$jscomp$0);
          return null;
        case "button":
          target$jscomp$0.push(startChunkForTag("button"));
          var children$jscomp$3 = null, innerHTML$jscomp$2 = null, name$jscomp$0 = null, formAction$jscomp$0 = null, formEncType$jscomp$0 = null, formMethod$jscomp$0 = null, formTarget$jscomp$0 = null, propKey$jscomp$4;
          for (propKey$jscomp$4 in props)
            if (hasOwnProperty.call(props, propKey$jscomp$4)) {
              var propValue$jscomp$4 = props[propKey$jscomp$4];
              if (null != propValue$jscomp$4)
                switch (propKey$jscomp$4) {
                  case "children":
                    children$jscomp$3 = propValue$jscomp$4;
                    break;
                  case "dangerouslySetInnerHTML":
                    innerHTML$jscomp$2 = propValue$jscomp$4;
                    break;
                  case "name":
                    name$jscomp$0 = propValue$jscomp$4;
                    break;
                  case "formAction":
                    formAction$jscomp$0 = propValue$jscomp$4;
                    break;
                  case "formEncType":
                    formEncType$jscomp$0 = propValue$jscomp$4;
                    break;
                  case "formMethod":
                    formMethod$jscomp$0 = propValue$jscomp$4;
                    break;
                  case "formTarget":
                    formTarget$jscomp$0 = propValue$jscomp$4;
                    break;
                  default:
                    pushAttribute(
                      target$jscomp$0,
                      propKey$jscomp$4,
                      propValue$jscomp$4
                    );
                }
            }
          var formData$jscomp$0 = pushFormActionAttribute(
            target$jscomp$0,
            resumableState,
            renderState,
            formAction$jscomp$0,
            formEncType$jscomp$0,
            formMethod$jscomp$0,
            formTarget$jscomp$0,
            name$jscomp$0
          );
          pushViewTransitionAttributes(target$jscomp$0, formatContext);
          target$jscomp$0.push(endOfStartTag);
          null != formData$jscomp$0 && formData$jscomp$0.forEach(pushAdditionalFormField, target$jscomp$0);
          pushInnerHTML(target$jscomp$0, innerHTML$jscomp$2, children$jscomp$3);
          if ("string" === typeof children$jscomp$3) {
            target$jscomp$0.push(escapeTextForBrowser(children$jscomp$3));
            var JSCompiler_inline_result$jscomp$0 = null;
          } else JSCompiler_inline_result$jscomp$0 = children$jscomp$3;
          return JSCompiler_inline_result$jscomp$0;
        case "form":
          target$jscomp$0.push(startChunkForTag("form"));
          var children$jscomp$4 = null, innerHTML$jscomp$3 = null, formAction$jscomp$1 = null, formEncType$jscomp$1 = null, formMethod$jscomp$1 = null, formTarget$jscomp$1 = null, propKey$jscomp$5;
          for (propKey$jscomp$5 in props)
            if (hasOwnProperty.call(props, propKey$jscomp$5)) {
              var propValue$jscomp$5 = props[propKey$jscomp$5];
              if (null != propValue$jscomp$5)
                switch (propKey$jscomp$5) {
                  case "children":
                    children$jscomp$4 = propValue$jscomp$5;
                    break;
                  case "dangerouslySetInnerHTML":
                    innerHTML$jscomp$3 = propValue$jscomp$5;
                    break;
                  case "action":
                    formAction$jscomp$1 = propValue$jscomp$5;
                    break;
                  case "encType":
                    formEncType$jscomp$1 = propValue$jscomp$5;
                    break;
                  case "method":
                    formMethod$jscomp$1 = propValue$jscomp$5;
                    break;
                  case "target":
                    formTarget$jscomp$1 = propValue$jscomp$5;
                    break;
                  default:
                    pushAttribute(
                      target$jscomp$0,
                      propKey$jscomp$5,
                      propValue$jscomp$5
                    );
                }
            }
          var formData$jscomp$1 = null, formActionName = null;
          if ("function" === typeof formAction$jscomp$1) {
            var customFields = getCustomFormFields(
              resumableState,
              formAction$jscomp$1
            );
            null !== customFields ? (formAction$jscomp$1 = customFields.action || "", formEncType$jscomp$1 = customFields.encType, formMethod$jscomp$1 = customFields.method, formTarget$jscomp$1 = customFields.target, formData$jscomp$1 = customFields.data, formActionName = customFields.name) : (target$jscomp$0.push(
              attributeSeparator,
              "action",
              attributeAssign,
              actionJavaScriptURL,
              attributeEnd
            ), formTarget$jscomp$1 = formMethod$jscomp$1 = formEncType$jscomp$1 = formAction$jscomp$1 = null, injectFormReplayingRuntime(resumableState, renderState));
          }
          null != formAction$jscomp$1 && pushAttribute(target$jscomp$0, "action", formAction$jscomp$1);
          null != formEncType$jscomp$1 && pushAttribute(target$jscomp$0, "encType", formEncType$jscomp$1);
          null != formMethod$jscomp$1 && pushAttribute(target$jscomp$0, "method", formMethod$jscomp$1);
          null != formTarget$jscomp$1 && pushAttribute(target$jscomp$0, "target", formTarget$jscomp$1);
          pushViewTransitionAttributes(target$jscomp$0, formatContext);
          target$jscomp$0.push(endOfStartTag);
          null !== formActionName && (target$jscomp$0.push(startHiddenInputChunk), pushStringAttribute(target$jscomp$0, "name", formActionName), target$jscomp$0.push(endOfStartTagSelfClosing), null != formData$jscomp$1 && formData$jscomp$1.forEach(pushAdditionalFormField, target$jscomp$0));
          pushInnerHTML(target$jscomp$0, innerHTML$jscomp$3, children$jscomp$4);
          if ("string" === typeof children$jscomp$4) {
            target$jscomp$0.push(escapeTextForBrowser(children$jscomp$4));
            var JSCompiler_inline_result$jscomp$1 = null;
          } else JSCompiler_inline_result$jscomp$1 = children$jscomp$4;
          return JSCompiler_inline_result$jscomp$1;
        case "menuitem":
          target$jscomp$0.push(startChunkForTag("menuitem"));
          for (var propKey$jscomp$6 in props)
            if (hasOwnProperty.call(props, propKey$jscomp$6)) {
              var propValue$jscomp$6 = props[propKey$jscomp$6];
              if (null != propValue$jscomp$6)
                switch (propKey$jscomp$6) {
                  case "children":
                  case "dangerouslySetInnerHTML":
                    throw Error(
                      "menuitems cannot have `children` nor `dangerouslySetInnerHTML`."
                    );
                  default:
                    pushAttribute(
                      target$jscomp$0,
                      propKey$jscomp$6,
                      propValue$jscomp$6
                    );
                }
            }
          pushViewTransitionAttributes(target$jscomp$0, formatContext);
          target$jscomp$0.push(endOfStartTag);
          return null;
        case "object":
          target$jscomp$0.push(startChunkForTag("object"));
          var children$jscomp$5 = null, innerHTML$jscomp$4 = null, propKey$jscomp$7;
          for (propKey$jscomp$7 in props)
            if (hasOwnProperty.call(props, propKey$jscomp$7)) {
              var propValue$jscomp$7 = props[propKey$jscomp$7];
              if (null != propValue$jscomp$7)
                switch (propKey$jscomp$7) {
                  case "children":
                    children$jscomp$5 = propValue$jscomp$7;
                    break;
                  case "dangerouslySetInnerHTML":
                    innerHTML$jscomp$4 = propValue$jscomp$7;
                    break;
                  case "data":
                    var sanitizedValue = sanitizeURL("" + propValue$jscomp$7);
                    if ("" === sanitizedValue) break;
                    target$jscomp$0.push(
                      attributeSeparator,
                      "data",
                      attributeAssign,
                      escapeTextForBrowser(sanitizedValue),
                      attributeEnd
                    );
                    break;
                  default:
                    pushAttribute(
                      target$jscomp$0,
                      propKey$jscomp$7,
                      propValue$jscomp$7
                    );
                }
            }
          pushViewTransitionAttributes(target$jscomp$0, formatContext);
          target$jscomp$0.push(endOfStartTag);
          pushInnerHTML(target$jscomp$0, innerHTML$jscomp$4, children$jscomp$5);
          if ("string" === typeof children$jscomp$5) {
            target$jscomp$0.push(escapeTextForBrowser(children$jscomp$5));
            var JSCompiler_inline_result$jscomp$2 = null;
          } else JSCompiler_inline_result$jscomp$2 = children$jscomp$5;
          return JSCompiler_inline_result$jscomp$2;
        case "title":
          var noscriptTagInScope = formatContext.tagScope & 1, isFallback = formatContext.tagScope & 4;
          if (4 === formatContext.insertionMode || noscriptTagInScope || null != props.itemProp)
            var JSCompiler_inline_result$jscomp$3 = pushTitleImpl(
              target$jscomp$0,
              props
            );
          else
            isFallback ? JSCompiler_inline_result$jscomp$3 = null : (pushTitleImpl(renderState.hoistableChunks, props), JSCompiler_inline_result$jscomp$3 = void 0);
          return JSCompiler_inline_result$jscomp$3;
        case "link":
          var noscriptTagInScope$jscomp$0 = formatContext.tagScope & 1, isFallback$jscomp$0 = formatContext.tagScope & 4, rel = props.rel, href = props.href, precedence = props.precedence;
          if (4 === formatContext.insertionMode || noscriptTagInScope$jscomp$0 || null != props.itemProp || "string" !== typeof rel || "string" !== typeof href || "" === href) {
            pushLinkImpl(target$jscomp$0, props);
            var JSCompiler_inline_result$jscomp$4 = null;
          } else if ("stylesheet" === props.rel)
            if ("string" !== typeof precedence || null != props.disabled || props.onLoad || props.onError)
              JSCompiler_inline_result$jscomp$4 = pushLinkImpl(
                target$jscomp$0,
                props
              );
            else {
              var styleQueue = renderState.styles.get(precedence), resourceState = resumableState.styleResources.hasOwnProperty(href) ? resumableState.styleResources[href] : void 0;
              if (null !== resourceState) {
                resumableState.styleResources[href] = null;
                styleQueue || (styleQueue = {
                  precedence: escapeTextForBrowser(precedence),
                  rules: [],
                  hrefs: [],
                  sheets: /* @__PURE__ */ new Map()
                }, renderState.styles.set(precedence, styleQueue));
                var resource = {
                  state: 0,
                  props: assign({}, props, {
                    "data-precedence": props.precedence,
                    precedence: null
                  })
                };
                if (resourceState) {
                  2 === resourceState.length && adoptPreloadCredentials(resource.props, resourceState);
                  var preloadResource = renderState.preloads.stylesheets.get(href);
                  preloadResource && 0 < preloadResource.length ? preloadResource.length = 0 : resource.state = 1;
                }
                styleQueue.sheets.set(href, resource);
                hoistableState && hoistableState.stylesheets.add(resource);
              } else if (styleQueue) {
                var resource$9 = styleQueue.sheets.get(href);
                resource$9 && hoistableState && hoistableState.stylesheets.add(resource$9);
              }
              textEmbedded && target$jscomp$0.push(textSeparator);
              JSCompiler_inline_result$jscomp$4 = null;
            }
          else
            props.onLoad || props.onError ? JSCompiler_inline_result$jscomp$4 = pushLinkImpl(
              target$jscomp$0,
              props
            ) : (textEmbedded && target$jscomp$0.push(textSeparator), JSCompiler_inline_result$jscomp$4 = isFallback$jscomp$0 ? null : pushLinkImpl(renderState.hoistableChunks, props));
          return JSCompiler_inline_result$jscomp$4;
        case "script":
          var noscriptTagInScope$jscomp$1 = formatContext.tagScope & 1, asyncProp = props.async;
          if ("string" !== typeof props.src || !props.src || !asyncProp || "function" === typeof asyncProp || "symbol" === typeof asyncProp || props.onLoad || props.onError || 4 === formatContext.insertionMode || noscriptTagInScope$jscomp$1 || null != props.itemProp)
            var JSCompiler_inline_result$jscomp$5 = pushScriptImpl(
              target$jscomp$0,
              props
            );
          else {
            var key = props.src;
            if ("module" === props.type) {
              var resources = resumableState.moduleScriptResources;
              var preloads = renderState.preloads.moduleScripts;
            } else
              resources = resumableState.scriptResources, preloads = renderState.preloads.scripts;
            var resourceState$jscomp$0 = resources.hasOwnProperty(key) ? resources[key] : void 0;
            if (null !== resourceState$jscomp$0) {
              resources[key] = null;
              var scriptProps = props;
              if (resourceState$jscomp$0) {
                2 === resourceState$jscomp$0.length && (scriptProps = assign({}, props), adoptPreloadCredentials(scriptProps, resourceState$jscomp$0));
                var preloadResource$jscomp$0 = preloads.get(key);
                preloadResource$jscomp$0 && (preloadResource$jscomp$0.length = 0);
              }
              var resource$jscomp$0 = [];
              renderState.scripts.add(resource$jscomp$0);
              pushScriptImpl(resource$jscomp$0, scriptProps);
            }
            textEmbedded && target$jscomp$0.push(textSeparator);
            JSCompiler_inline_result$jscomp$5 = null;
          }
          return JSCompiler_inline_result$jscomp$5;
        case "style":
          var noscriptTagInScope$jscomp$2 = formatContext.tagScope & 1, precedence$jscomp$0 = props.precedence, href$jscomp$0 = props.href, nonce = props.nonce;
          if (4 === formatContext.insertionMode || noscriptTagInScope$jscomp$2 || null != props.itemProp || "string" !== typeof precedence$jscomp$0 || "string" !== typeof href$jscomp$0 || "" === href$jscomp$0) {
            target$jscomp$0.push(startChunkForTag("style"));
            var children$jscomp$6 = null, innerHTML$jscomp$5 = null, propKey$jscomp$8;
            for (propKey$jscomp$8 in props)
              if (hasOwnProperty.call(props, propKey$jscomp$8)) {
                var propValue$jscomp$8 = props[propKey$jscomp$8];
                if (null != propValue$jscomp$8)
                  switch (propKey$jscomp$8) {
                    case "children":
                      children$jscomp$6 = propValue$jscomp$8;
                      break;
                    case "dangerouslySetInnerHTML":
                      innerHTML$jscomp$5 = propValue$jscomp$8;
                      break;
                    default:
                      pushAttribute(
                        target$jscomp$0,
                        propKey$jscomp$8,
                        propValue$jscomp$8
                      );
                  }
              }
            target$jscomp$0.push(endOfStartTag);
            var child = Array.isArray(children$jscomp$6) ? 2 > children$jscomp$6.length ? children$jscomp$6[0] : null : children$jscomp$6;
            "function" !== typeof child && "symbol" !== typeof child && null !== child && void 0 !== child && target$jscomp$0.push(("" + child).replace(styleRegex, styleReplacer));
            pushInnerHTML(target$jscomp$0, innerHTML$jscomp$5, children$jscomp$6);
            target$jscomp$0.push(endChunkForTag("style"));
            var JSCompiler_inline_result$jscomp$6 = null;
          } else {
            var styleQueue$jscomp$0 = renderState.styles.get(precedence$jscomp$0);
            if (null !== (resumableState.styleResources.hasOwnProperty(href$jscomp$0) ? resumableState.styleResources[href$jscomp$0] : void 0)) {
              resumableState.styleResources[href$jscomp$0] = null;
              styleQueue$jscomp$0 || (styleQueue$jscomp$0 = {
                precedence: escapeTextForBrowser(precedence$jscomp$0),
                rules: [],
                hrefs: [],
                sheets: /* @__PURE__ */ new Map()
              }, renderState.styles.set(precedence$jscomp$0, styleQueue$jscomp$0));
              var nonceStyle = renderState.nonce.style;
              if (!nonceStyle || nonceStyle === nonce) {
                styleQueue$jscomp$0.hrefs.push(escapeTextForBrowser(href$jscomp$0));
                var target = styleQueue$jscomp$0.rules, children$jscomp$7 = null, innerHTML$jscomp$6 = null, propKey$jscomp$9;
                for (propKey$jscomp$9 in props)
                  if (hasOwnProperty.call(props, propKey$jscomp$9)) {
                    var propValue$jscomp$9 = props[propKey$jscomp$9];
                    if (null != propValue$jscomp$9)
                      switch (propKey$jscomp$9) {
                        case "children":
                          children$jscomp$7 = propValue$jscomp$9;
                          break;
                        case "dangerouslySetInnerHTML":
                          innerHTML$jscomp$6 = propValue$jscomp$9;
                      }
                  }
                var child$jscomp$0 = Array.isArray(children$jscomp$7) ? 2 > children$jscomp$7.length ? children$jscomp$7[0] : null : children$jscomp$7;
                "function" !== typeof child$jscomp$0 && "symbol" !== typeof child$jscomp$0 && null !== child$jscomp$0 && void 0 !== child$jscomp$0 && target.push(
                  ("" + child$jscomp$0).replace(styleRegex, styleReplacer)
                );
                pushInnerHTML(target, innerHTML$jscomp$6, children$jscomp$7);
              }
            }
            styleQueue$jscomp$0 && hoistableState && hoistableState.styles.add(styleQueue$jscomp$0);
            textEmbedded && target$jscomp$0.push(textSeparator);
            JSCompiler_inline_result$jscomp$6 = void 0;
          }
          return JSCompiler_inline_result$jscomp$6;
        case "meta":
          var noscriptTagInScope$jscomp$3 = formatContext.tagScope & 1, isFallback$jscomp$1 = formatContext.tagScope & 4;
          if (4 === formatContext.insertionMode || noscriptTagInScope$jscomp$3 || null != props.itemProp)
            var JSCompiler_inline_result$jscomp$7 = pushSelfClosing(
              target$jscomp$0,
              props,
              "meta",
              formatContext
            );
          else
            textEmbedded && target$jscomp$0.push(textSeparator), JSCompiler_inline_result$jscomp$7 = isFallback$jscomp$1 ? null : "string" === typeof props.charSet ? pushSelfClosing(
              renderState.charsetChunks,
              props,
              "meta",
              formatContext
            ) : "viewport" === props.name ? pushSelfClosing(
              renderState.viewportChunks,
              props,
              "meta",
              formatContext
            ) : pushSelfClosing(
              renderState.hoistableChunks,
              props,
              "meta",
              formatContext
            );
          return JSCompiler_inline_result$jscomp$7;
        case "listing":
        case "pre":
          target$jscomp$0.push(startChunkForTag(type));
          var children$jscomp$8 = null, innerHTML$jscomp$7 = null, propKey$jscomp$10;
          for (propKey$jscomp$10 in props)
            if (hasOwnProperty.call(props, propKey$jscomp$10)) {
              var propValue$jscomp$10 = props[propKey$jscomp$10];
              if (null != propValue$jscomp$10)
                switch (propKey$jscomp$10) {
                  case "children":
                    children$jscomp$8 = propValue$jscomp$10;
                    break;
                  case "dangerouslySetInnerHTML":
                    innerHTML$jscomp$7 = propValue$jscomp$10;
                    break;
                  default:
                    pushAttribute(
                      target$jscomp$0,
                      propKey$jscomp$10,
                      propValue$jscomp$10
                    );
                }
            }
          pushViewTransitionAttributes(target$jscomp$0, formatContext);
          target$jscomp$0.push(endOfStartTag);
          if (null != innerHTML$jscomp$7) {
            if (null != children$jscomp$8)
              throw Error(
                "Can only set one of `children` or `props.dangerouslySetInnerHTML`."
              );
            if ("object" !== typeof innerHTML$jscomp$7 || !("__html" in innerHTML$jscomp$7))
              throw Error(
                "`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://react.dev/link/dangerously-set-inner-html for more information."
              );
            var html = innerHTML$jscomp$7.__html;
            null !== html && void 0 !== html && ("string" === typeof html && 0 < html.length && "\n" === html[0] ? target$jscomp$0.push(leadingNewline, html) : target$jscomp$0.push("" + html));
          }
          "string" === typeof children$jscomp$8 && "\n" === children$jscomp$8[0] && target$jscomp$0.push(leadingNewline);
          return children$jscomp$8;
        case "img":
          var pictureOrNoScriptTagInScope = formatContext.tagScope & 3, src = props.src, srcSet = props.srcSet;
          if (!("lazy" === props.loading || !src && !srcSet || "string" !== typeof src && null != src || "string" !== typeof srcSet && null != srcSet || "low" === props.fetchPriority || pictureOrNoScriptTagInScope) && ("string" !== typeof src || ":" !== src[4] || "d" !== src[0] && "D" !== src[0] || "a" !== src[1] && "A" !== src[1] || "t" !== src[2] && "T" !== src[2] || "a" !== src[3] && "A" !== src[3]) && ("string" !== typeof srcSet || ":" !== srcSet[4] || "d" !== srcSet[0] && "D" !== srcSet[0] || "a" !== srcSet[1] && "A" !== srcSet[1] || "t" !== srcSet[2] && "T" !== srcSet[2] || "a" !== srcSet[3] && "A" !== srcSet[3])) {
            null !== hoistableState && formatContext.tagScope & 64 && (hoistableState.suspenseyImages = true);
            var sizes = "string" === typeof props.sizes ? props.sizes : void 0, key$jscomp$0 = srcSet ? srcSet + "\n" + (sizes || "") : src, promotablePreloads = renderState.preloads.images, resource$jscomp$1 = promotablePreloads.get(key$jscomp$0);
            if (resource$jscomp$1) {
              if ("high" === props.fetchPriority || 10 > renderState.highImagePreloads.size)
                promotablePreloads.delete(key$jscomp$0), renderState.highImagePreloads.add(resource$jscomp$1);
            } else if (!resumableState.imageResources.hasOwnProperty(key$jscomp$0)) {
              resumableState.imageResources[key$jscomp$0] = PRELOAD_NO_CREDS;
              var input = props.crossOrigin;
              var JSCompiler_inline_result$jscomp$8 = "string" === typeof input ? "use-credentials" === input ? input : "" : void 0;
              var headers = renderState.headers, header;
              headers && 0 < headers.remainingCapacity && "string" !== typeof props.srcSet && ("high" === props.fetchPriority || 500 > headers.highImagePreloads.length) && (header = getPreloadAsHeader(src, "image", {
                imageSrcSet: props.srcSet,
                imageSizes: props.sizes,
                crossOrigin: JSCompiler_inline_result$jscomp$8,
                integrity: props.integrity,
                nonce: props.nonce,
                type: props.type,
                fetchPriority: props.fetchPriority,
                referrerPolicy: props.referrerPolicy
              }), 0 <= (headers.remainingCapacity -= header.length + 2)) ? (renderState.resets.image[key$jscomp$0] = PRELOAD_NO_CREDS, headers.highImagePreloads && (headers.highImagePreloads += ", "), headers.highImagePreloads += header) : (resource$jscomp$1 = [], pushLinkImpl(resource$jscomp$1, {
                rel: "preload",
                as: "image",
                href: srcSet ? void 0 : src,
                imageSrcSet: srcSet,
                imageSizes: sizes,
                crossOrigin: JSCompiler_inline_result$jscomp$8,
                integrity: props.integrity,
                type: props.type,
                fetchPriority: props.fetchPriority,
                referrerPolicy: props.referrerPolicy
              }), "high" === props.fetchPriority || 10 > renderState.highImagePreloads.size ? renderState.highImagePreloads.add(resource$jscomp$1) : (renderState.bulkPreloads.add(resource$jscomp$1), promotablePreloads.set(key$jscomp$0, resource$jscomp$1)));
            }
          }
          return pushSelfClosing(target$jscomp$0, props, "img", formatContext);
        case "base":
        case "area":
        case "br":
        case "col":
        case "embed":
        case "hr":
        case "keygen":
        case "param":
        case "source":
        case "track":
        case "wbr":
          return pushSelfClosing(target$jscomp$0, props, type, formatContext);
        case "annotation-xml":
        case "color-profile":
        case "font-face":
        case "font-face-src":
        case "font-face-uri":
        case "font-face-format":
        case "font-face-name":
        case "missing-glyph":
          break;
        case "head":
          if (2 > formatContext.insertionMode) {
            var preamble = preambleState || renderState.preamble;
            if (preamble.headChunks)
              throw Error("The `<head>` tag may only be rendered once.");
            null !== preambleState && target$jscomp$0.push(headPreambleContributionChunk);
            preamble.headChunks = [];
            var JSCompiler_inline_result$jscomp$9 = pushStartSingletonElement(
              preamble.headChunks,
              props,
              "head",
              formatContext
            );
          } else
            JSCompiler_inline_result$jscomp$9 = pushStartGenericElement(
              target$jscomp$0,
              props,
              "head",
              formatContext
            );
          return JSCompiler_inline_result$jscomp$9;
        case "body":
          if (2 > formatContext.insertionMode) {
            var preamble$jscomp$0 = preambleState || renderState.preamble;
            if (preamble$jscomp$0.bodyChunks)
              throw Error("The `<body>` tag may only be rendered once.");
            null !== preambleState && target$jscomp$0.push(bodyPreambleContributionChunk);
            preamble$jscomp$0.bodyChunks = [];
            var JSCompiler_inline_result$jscomp$10 = pushStartSingletonElement(
              preamble$jscomp$0.bodyChunks,
              props,
              "body",
              formatContext
            );
          } else
            JSCompiler_inline_result$jscomp$10 = pushStartGenericElement(
              target$jscomp$0,
              props,
              "body",
              formatContext
            );
          return JSCompiler_inline_result$jscomp$10;
        case "html":
          if (0 === formatContext.insertionMode) {
            var preamble$jscomp$1 = preambleState || renderState.preamble;
            if (preamble$jscomp$1.htmlChunks)
              throw Error("The `<html>` tag may only be rendered once.");
            null !== preambleState && target$jscomp$0.push(htmlPreambleContributionChunk);
            preamble$jscomp$1.htmlChunks = [doctypeChunk];
            var JSCompiler_inline_result$jscomp$11 = pushStartSingletonElement(
              preamble$jscomp$1.htmlChunks,
              props,
              "html",
              formatContext
            );
          } else
            JSCompiler_inline_result$jscomp$11 = pushStartGenericElement(
              target$jscomp$0,
              props,
              "html",
              formatContext
            );
          return JSCompiler_inline_result$jscomp$11;
        default:
          if (-1 !== type.indexOf("-")) {
            target$jscomp$0.push(startChunkForTag(type));
            var children$jscomp$9 = null, innerHTML$jscomp$8 = null, propKey$jscomp$11;
            for (propKey$jscomp$11 in props)
              if (hasOwnProperty.call(props, propKey$jscomp$11)) {
                var propValue$jscomp$11 = props[propKey$jscomp$11];
                if (null != propValue$jscomp$11) {
                  var attributeName = propKey$jscomp$11;
                  switch (propKey$jscomp$11) {
                    case "children":
                      children$jscomp$9 = propValue$jscomp$11;
                      break;
                    case "dangerouslySetInnerHTML":
                      innerHTML$jscomp$8 = propValue$jscomp$11;
                      break;
                    case "style":
                      pushStyleAttribute(target$jscomp$0, propValue$jscomp$11);
                      break;
                    case "suppressContentEditableWarning":
                    case "suppressHydrationWarning":
                    case "ref":
                      break;
                    case "className":
                      attributeName = "class";
                    default:
                      if (isAttributeNameSafe(propKey$jscomp$11) && "function" !== typeof propValue$jscomp$11 && "symbol" !== typeof propValue$jscomp$11 && false !== propValue$jscomp$11) {
                        if (true === propValue$jscomp$11) propValue$jscomp$11 = "";
                        else if ("object" === typeof propValue$jscomp$11) continue;
                        target$jscomp$0.push(
                          attributeSeparator,
                          attributeName,
                          attributeAssign,
                          escapeTextForBrowser(propValue$jscomp$11),
                          attributeEnd
                        );
                      }
                  }
                }
              }
            pushViewTransitionAttributes(target$jscomp$0, formatContext);
            target$jscomp$0.push(endOfStartTag);
            pushInnerHTML(target$jscomp$0, innerHTML$jscomp$8, children$jscomp$9);
            return children$jscomp$9;
          }
      }
      return pushStartGenericElement(target$jscomp$0, props, type, formatContext);
    }
    var endTagCache = /* @__PURE__ */ new Map();
    function endChunkForTag(tag) {
      var chunk = endTagCache.get(tag);
      void 0 === chunk && (chunk = stringToPrecomputedChunk("</" + tag + ">"), endTagCache.set(tag, chunk));
      return chunk;
    }
    function hoistPreambleState(renderState, preambleState) {
      renderState = renderState.preamble;
      null === renderState.htmlChunks && preambleState.htmlChunks && (renderState.htmlChunks = preambleState.htmlChunks);
      null === renderState.headChunks && preambleState.headChunks && (renderState.headChunks = preambleState.headChunks);
      null === renderState.bodyChunks && preambleState.bodyChunks && (renderState.bodyChunks = preambleState.bodyChunks);
    }
    function writeBootstrap(destination, renderState) {
      renderState = renderState.bootstrapChunks;
      for (var i = 0; i < renderState.length - 1; i++)
        writeChunk(destination, renderState[i]);
      return i < renderState.length ? (i = renderState[i], renderState.length = 0, writeChunkAndReturn(destination, i)) : true;
    }
    var shellTimeRuntimeScript = stringToPrecomputedChunk(
      "requestAnimationFrame(function(){$RT=performance.now()});"
    );
    var placeholder1 = stringToPrecomputedChunk('<template id="');
    var placeholder2 = stringToPrecomputedChunk('"></template>');
    var startActivityBoundary = stringToPrecomputedChunk("<!--&-->");
    var endActivityBoundary = stringToPrecomputedChunk("<!--/&-->");
    var startCompletedSuspenseBoundary = stringToPrecomputedChunk("<!--$-->");
    var startPendingSuspenseBoundary1 = stringToPrecomputedChunk(
      '<!--$?--><template id="'
    );
    var startPendingSuspenseBoundary2 = stringToPrecomputedChunk('"></template>');
    var startClientRenderedSuspenseBoundary = stringToPrecomputedChunk("<!--$!-->");
    var endSuspenseBoundary = stringToPrecomputedChunk("<!--/$-->");
    var clientRenderedSuspenseBoundaryError1 = stringToPrecomputedChunk("<template");
    var clientRenderedSuspenseBoundaryErrorAttrInterstitial = stringToPrecomputedChunk('"');
    var clientRenderedSuspenseBoundaryError1A = stringToPrecomputedChunk(' data-dgst="');
    stringToPrecomputedChunk(' data-msg="');
    stringToPrecomputedChunk(' data-stck="');
    stringToPrecomputedChunk(' data-cstck="');
    var clientRenderedSuspenseBoundaryError2 = stringToPrecomputedChunk("></template>");
    function writeStartPendingSuspenseBoundary(destination, renderState, id) {
      writeChunk(destination, startPendingSuspenseBoundary1);
      if (null === id)
        throw Error(
          "An ID must have been assigned before we can complete the boundary."
        );
      writeChunk(destination, renderState.boundaryPrefix);
      writeChunk(destination, id.toString(16));
      return writeChunkAndReturn(destination, startPendingSuspenseBoundary2);
    }
    var startSegmentHTML = stringToPrecomputedChunk('<div hidden id="');
    var startSegmentHTML2 = stringToPrecomputedChunk('">');
    var endSegmentHTML = stringToPrecomputedChunk("</div>");
    var startSegmentSVG = stringToPrecomputedChunk(
      '<svg aria-hidden="true" style="display:none" id="'
    );
    var startSegmentSVG2 = stringToPrecomputedChunk('">');
    var endSegmentSVG = stringToPrecomputedChunk("</svg>");
    var startSegmentMathML = stringToPrecomputedChunk(
      '<math aria-hidden="true" style="display:none" id="'
    );
    var startSegmentMathML2 = stringToPrecomputedChunk('">');
    var endSegmentMathML = stringToPrecomputedChunk("</math>");
    var startSegmentTable = stringToPrecomputedChunk('<table hidden id="');
    var startSegmentTable2 = stringToPrecomputedChunk('">');
    var endSegmentTable = stringToPrecomputedChunk("</table>");
    var startSegmentTableBody = stringToPrecomputedChunk('<table hidden><tbody id="');
    var startSegmentTableBody2 = stringToPrecomputedChunk('">');
    var endSegmentTableBody = stringToPrecomputedChunk("</tbody></table>");
    var startSegmentTableRow = stringToPrecomputedChunk('<table hidden><tr id="');
    var startSegmentTableRow2 = stringToPrecomputedChunk('">');
    var endSegmentTableRow = stringToPrecomputedChunk("</tr></table>");
    var startSegmentColGroup = stringToPrecomputedChunk(
      '<table hidden><colgroup id="'
    );
    var startSegmentColGroup2 = stringToPrecomputedChunk('">');
    var endSegmentColGroup = stringToPrecomputedChunk("</colgroup></table>");
    function writeStartSegment(destination, renderState, formatContext, id) {
      switch (formatContext.insertionMode) {
        case 0:
        case 1:
        case 3:
        case 2:
          return writeChunk(destination, startSegmentHTML), writeChunk(destination, renderState.segmentPrefix), writeChunk(destination, id.toString(16)), writeChunkAndReturn(destination, startSegmentHTML2);
        case 4:
          return writeChunk(destination, startSegmentSVG), writeChunk(destination, renderState.segmentPrefix), writeChunk(destination, id.toString(16)), writeChunkAndReturn(destination, startSegmentSVG2);
        case 5:
          return writeChunk(destination, startSegmentMathML), writeChunk(destination, renderState.segmentPrefix), writeChunk(destination, id.toString(16)), writeChunkAndReturn(destination, startSegmentMathML2);
        case 6:
          return writeChunk(destination, startSegmentTable), writeChunk(destination, renderState.segmentPrefix), writeChunk(destination, id.toString(16)), writeChunkAndReturn(destination, startSegmentTable2);
        case 7:
          return writeChunk(destination, startSegmentTableBody), writeChunk(destination, renderState.segmentPrefix), writeChunk(destination, id.toString(16)), writeChunkAndReturn(destination, startSegmentTableBody2);
        case 8:
          return writeChunk(destination, startSegmentTableRow), writeChunk(destination, renderState.segmentPrefix), writeChunk(destination, id.toString(16)), writeChunkAndReturn(destination, startSegmentTableRow2);
        case 9:
          return writeChunk(destination, startSegmentColGroup), writeChunk(destination, renderState.segmentPrefix), writeChunk(destination, id.toString(16)), writeChunkAndReturn(destination, startSegmentColGroup2);
        default:
          throw Error("Unknown insertion mode. This is a bug in React.");
      }
    }
    function writeEndSegment(destination, formatContext) {
      switch (formatContext.insertionMode) {
        case 0:
        case 1:
        case 3:
        case 2:
          return writeChunkAndReturn(destination, endSegmentHTML);
        case 4:
          return writeChunkAndReturn(destination, endSegmentSVG);
        case 5:
          return writeChunkAndReturn(destination, endSegmentMathML);
        case 6:
          return writeChunkAndReturn(destination, endSegmentTable);
        case 7:
          return writeChunkAndReturn(destination, endSegmentTableBody);
        case 8:
          return writeChunkAndReturn(destination, endSegmentTableRow);
        case 9:
          return writeChunkAndReturn(destination, endSegmentColGroup);
        default:
          throw Error("Unknown insertion mode. This is a bug in React.");
      }
    }
    var completeSegmentScript1Full = stringToPrecomputedChunk(
      '$RS=function(a,b){a=document.getElementById(a);b=document.getElementById(b);for(a.parentNode.removeChild(a);a.firstChild;)b.parentNode.insertBefore(a.firstChild,b);b.parentNode.removeChild(b)};$RS("'
    );
    var completeSegmentScript1Partial = stringToPrecomputedChunk('$RS("');
    var completeSegmentScript2 = stringToPrecomputedChunk('","');
    var completeSegmentScriptEnd = stringToPrecomputedChunk('")</script>');
    stringToPrecomputedChunk('<template data-rsi="" data-sid="');
    stringToPrecomputedChunk('" data-pid="');
    var completeBoundaryScriptFunctionOnly = stringToPrecomputedChunk(
      '$RB=[];$RV=function(a){$RT=performance.now();for(var b=0;b<a.length;b+=2){var c=a[b],e=a[b+1];null!==e.parentNode&&e.parentNode.removeChild(e);var f=c.parentNode;if(f){var g=c.previousSibling,h=0;do{if(c&&8===c.nodeType){var d=c.data;if("/$"===d||"/&"===d)if(0===h)break;else h--;else"$"!==d&&"$?"!==d&&"$~"!==d&&"$!"!==d&&"&"!==d||h++}d=c.nextSibling;f.removeChild(c);c=d}while(c);for(;e.firstChild;)f.insertBefore(e.firstChild,c);g.data="$";g._reactRetry&&requestAnimationFrame(g._reactRetry)}}a.length=0};\n$RC=function(a,b){if(b=document.getElementById(b))(a=document.getElementById(a))?(a.previousSibling.data="$~",$RB.push(a,b),2===$RB.length&&("number"!==typeof $RT?requestAnimationFrame($RV.bind(null,$RB)):(a=performance.now(),setTimeout($RV.bind(null,$RB),2300>a&&2E3<a?2300-a:$RT+300-a)))):b.parentNode.removeChild(b)};'
    );
    var completeBoundaryScript1Partial = stringToPrecomputedChunk('$RC("');
    var completeBoundaryWithStylesScript1FullPartial = stringToPrecomputedChunk(
      '$RM=new Map;$RR=function(n,w,p){function u(q){this._p=null;q()}for(var r=new Map,t=document,h,b,e=t.querySelectorAll("link[data-precedence],style[data-precedence]"),v=[],k=0;b=e[k++];)"not all"===b.getAttribute("media")?v.push(b):("LINK"===b.tagName&&$RM.set(b.getAttribute("href"),b),r.set(b.dataset.precedence,h=b));e=0;b=[];var l,a;for(k=!0;;){if(k){var f=p[e++];if(!f){k=!1;e=0;continue}var c=!1,m=0;var d=f[m++];if(a=$RM.get(d)){var g=a._p;c=!0}else{a=t.createElement("link");a.href=d;a.rel=\n"stylesheet";for(a.dataset.precedence=l=f[m++];g=f[m++];)a.setAttribute(g,f[m++]);g=a._p=new Promise(function(q,x){a.onload=u.bind(a,q);a.onerror=u.bind(a,x)});$RM.set(d,a)}d=a.getAttribute("media");!g||d&&!matchMedia(d).matches||b.push(g);if(c)continue}else{a=v[e++];if(!a)break;l=a.getAttribute("data-precedence");a.removeAttribute("media")}c=r.get(l)||h;c===h&&(h=a);r.set(l,a);c?c.parentNode.insertBefore(a,c.nextSibling):(c=t.head,c.insertBefore(a,c.firstChild))}if(p=document.getElementById(n))p.previousSibling.data=\n"$~";Promise.all(b).then($RC.bind(null,n,w),$RX.bind(null,n,"CSS failed to load"))};$RR("'
    );
    var completeBoundaryWithStylesScript1Partial = stringToPrecomputedChunk('$RR("');
    var completeBoundaryScript2 = stringToPrecomputedChunk('","');
    var completeBoundaryScript3a = stringToPrecomputedChunk('",');
    var completeBoundaryScript3b = stringToPrecomputedChunk('"');
    var completeBoundaryScriptEnd = stringToPrecomputedChunk(")</script>");
    stringToPrecomputedChunk('<template data-rci="" data-bid="');
    stringToPrecomputedChunk('<template data-rri="" data-bid="');
    stringToPrecomputedChunk('" data-sid="');
    stringToPrecomputedChunk('" data-sty="');
    var clientRenderScriptFunctionOnly = stringToPrecomputedChunk(
      '$RX=function(b,c,d,e,f){var a=document.getElementById(b);a&&(b=a.previousSibling,b.data="$!",a=a.dataset,null!=c&&(a.dgst=c),d&&(a.msg=d),e&&(a.stck=e),f&&(a.cstck=f),b._reactRetry&&b._reactRetry())};'
    );
    var clientRenderScript1Full = stringToPrecomputedChunk(
      '$RX=function(b,c,d,e,f){var a=document.getElementById(b);a&&(b=a.previousSibling,b.data="$!",a=a.dataset,null!=c&&(a.dgst=c),d&&(a.msg=d),e&&(a.stck=e),f&&(a.cstck=f),b._reactRetry&&b._reactRetry())};;$RX("'
    );
    var clientRenderScript1Partial = stringToPrecomputedChunk('$RX("');
    var clientRenderScript1A = stringToPrecomputedChunk('"');
    var clientRenderErrorScriptArgInterstitial = stringToPrecomputedChunk(",");
    var clientRenderErrorScriptNull = stringToPrecomputedChunk("null");
    var clientRenderScriptEnd = stringToPrecomputedChunk(")</script>");
    stringToPrecomputedChunk('<template data-rxi="" data-bid="');
    stringToPrecomputedChunk('" data-dgst="');
    stringToPrecomputedChunk('" data-msg="');
    stringToPrecomputedChunk('" data-stck="');
    stringToPrecomputedChunk('" data-cstck="');
    var regexForJSStringsInInstructionScripts = /[<\u2028\u2029]/g;
    function escapeJSStringsForInstructionScripts(input) {
      return JSON.stringify(input).replace(
        regexForJSStringsInInstructionScripts,
        function(match) {
          switch (match) {
            case "<":
              return "\\u003c";
            case "\u2028":
              return "\\u2028";
            case "\u2029":
              return "\\u2029";
            default:
              throw Error(
                "escapeJSStringsForInstructionScripts encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React"
              );
          }
        }
      );
    }
    var regexForJSStringsInScripts = /[&><\u2028\u2029]/g;
    function escapeJSObjectForInstructionScripts(input) {
      return JSON.stringify(input).replace(
        regexForJSStringsInScripts,
        function(match) {
          switch (match) {
            case "&":
              return "\\u0026";
            case ">":
              return "\\u003e";
            case "<":
              return "\\u003c";
            case "\u2028":
              return "\\u2028";
            case "\u2029":
              return "\\u2029";
            default:
              throw Error(
                "escapeJSObjectForInstructionScripts encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React"
              );
          }
        }
      );
    }
    var lateStyleTagResourceOpen1 = stringToPrecomputedChunk(
      ' media="not all" data-precedence="'
    );
    var lateStyleTagResourceOpen2 = stringToPrecomputedChunk('" data-href="');
    var lateStyleTagResourceOpen3 = stringToPrecomputedChunk('">');
    var lateStyleTagTemplateClose = stringToPrecomputedChunk("</style>");
    var currentlyRenderingBoundaryHasStylesToHoist = false;
    var destinationHasCapacity = true;
    function flushStyleTagsLateForBoundary(styleQueue) {
      var rules = styleQueue.rules, hrefs = styleQueue.hrefs, i = 0;
      if (hrefs.length) {
        writeChunk(this, currentlyFlushingRenderState.startInlineStyle);
        writeChunk(this, lateStyleTagResourceOpen1);
        writeChunk(this, styleQueue.precedence);
        for (writeChunk(this, lateStyleTagResourceOpen2); i < hrefs.length - 1; i++)
          writeChunk(this, hrefs[i]), writeChunk(this, spaceSeparator);
        writeChunk(this, hrefs[i]);
        writeChunk(this, lateStyleTagResourceOpen3);
        for (i = 0; i < rules.length; i++) writeChunk(this, rules[i]);
        destinationHasCapacity = writeChunkAndReturn(
          this,
          lateStyleTagTemplateClose
        );
        currentlyRenderingBoundaryHasStylesToHoist = true;
        rules.length = 0;
        hrefs.length = 0;
      }
    }
    function hasStylesToHoist(stylesheet) {
      return 2 !== stylesheet.state ? currentlyRenderingBoundaryHasStylesToHoist = true : false;
    }
    function writeHoistablesForBoundary(destination, hoistableState, renderState) {
      currentlyRenderingBoundaryHasStylesToHoist = false;
      destinationHasCapacity = true;
      currentlyFlushingRenderState = renderState;
      hoistableState.styles.forEach(flushStyleTagsLateForBoundary, destination);
      currentlyFlushingRenderState = null;
      hoistableState.stylesheets.forEach(hasStylesToHoist);
      currentlyRenderingBoundaryHasStylesToHoist && (renderState.stylesToHoist = true);
      return destinationHasCapacity;
    }
    function flushResource(resource) {
      for (var i = 0; i < resource.length; i++) writeChunk(this, resource[i]);
      resource.length = 0;
    }
    var stylesheetFlushingQueue = [];
    function flushStyleInPreamble(stylesheet) {
      pushLinkImpl(stylesheetFlushingQueue, stylesheet.props);
      for (var i = 0; i < stylesheetFlushingQueue.length; i++)
        writeChunk(this, stylesheetFlushingQueue[i]);
      stylesheetFlushingQueue.length = 0;
      stylesheet.state = 2;
    }
    var styleTagResourceOpen1 = stringToPrecomputedChunk(' data-precedence="');
    var styleTagResourceOpen2 = stringToPrecomputedChunk('" data-href="');
    var spaceSeparator = stringToPrecomputedChunk(" ");
    var styleTagResourceOpen3 = stringToPrecomputedChunk('">');
    var styleTagResourceClose = stringToPrecomputedChunk("</style>");
    function flushStylesInPreamble(styleQueue) {
      var hasStylesheets = 0 < styleQueue.sheets.size;
      styleQueue.sheets.forEach(flushStyleInPreamble, this);
      styleQueue.sheets.clear();
      var rules = styleQueue.rules, hrefs = styleQueue.hrefs;
      if (!hasStylesheets || hrefs.length) {
        writeChunk(this, currentlyFlushingRenderState.startInlineStyle);
        writeChunk(this, styleTagResourceOpen1);
        writeChunk(this, styleQueue.precedence);
        styleQueue = 0;
        if (hrefs.length) {
          for (writeChunk(this, styleTagResourceOpen2); styleQueue < hrefs.length - 1; styleQueue++)
            writeChunk(this, hrefs[styleQueue]), writeChunk(this, spaceSeparator);
          writeChunk(this, hrefs[styleQueue]);
        }
        writeChunk(this, styleTagResourceOpen3);
        for (styleQueue = 0; styleQueue < rules.length; styleQueue++)
          writeChunk(this, rules[styleQueue]);
        writeChunk(this, styleTagResourceClose);
        rules.length = 0;
        hrefs.length = 0;
      }
    }
    function preloadLateStyle(stylesheet) {
      if (0 === stylesheet.state) {
        stylesheet.state = 1;
        var props = stylesheet.props;
        pushLinkImpl(stylesheetFlushingQueue, {
          rel: "preload",
          as: "style",
          href: stylesheet.props.href,
          crossOrigin: props.crossOrigin,
          fetchPriority: props.fetchPriority,
          integrity: props.integrity,
          media: props.media,
          hrefLang: props.hrefLang,
          referrerPolicy: props.referrerPolicy
        });
        for (stylesheet = 0; stylesheet < stylesheetFlushingQueue.length; stylesheet++)
          writeChunk(this, stylesheetFlushingQueue[stylesheet]);
        stylesheetFlushingQueue.length = 0;
      }
    }
    function preloadLateStyles(styleQueue) {
      styleQueue.sheets.forEach(preloadLateStyle, this);
      styleQueue.sheets.clear();
    }
    stringToPrecomputedChunk('<link rel="expect" href="#');
    stringToPrecomputedChunk('" blocking="render"/>');
    var completedShellIdAttributeStart = stringToPrecomputedChunk(' id="');
    function pushCompletedShellIdAttribute(target, resumableState) {
      0 === (resumableState.instructions & 32) && (resumableState.instructions |= 32, target.push(
        completedShellIdAttributeStart,
        escapeTextForBrowser("_" + resumableState.idPrefix + "R_"),
        attributeEnd
      ));
    }
    var arrayFirstOpenBracket = stringToPrecomputedChunk("[");
    var arraySubsequentOpenBracket = stringToPrecomputedChunk(",[");
    var arrayInterstitial = stringToPrecomputedChunk(",");
    var arrayCloseBracket = stringToPrecomputedChunk("]");
    function writeStyleResourceDependenciesInJS(destination, hoistableState) {
      writeChunk(destination, arrayFirstOpenBracket);
      var nextArrayOpenBrackChunk = arrayFirstOpenBracket;
      hoistableState.stylesheets.forEach(function(resource) {
        if (2 !== resource.state)
          if (3 === resource.state)
            writeChunk(destination, nextArrayOpenBrackChunk), writeChunk(
              destination,
              escapeJSObjectForInstructionScripts("" + resource.props.href)
            ), writeChunk(destination, arrayCloseBracket), nextArrayOpenBrackChunk = arraySubsequentOpenBracket;
          else {
            writeChunk(destination, nextArrayOpenBrackChunk);
            var precedence = resource.props["data-precedence"], props = resource.props, coercedHref = sanitizeURL("" + resource.props.href);
            writeChunk(
              destination,
              escapeJSObjectForInstructionScripts(coercedHref)
            );
            precedence = "" + precedence;
            writeChunk(destination, arrayInterstitial);
            writeChunk(
              destination,
              escapeJSObjectForInstructionScripts(precedence)
            );
            for (var propKey in props)
              if (hasOwnProperty.call(props, propKey) && (precedence = props[propKey], null != precedence))
                switch (propKey) {
                  case "href":
                  case "rel":
                  case "precedence":
                  case "data-precedence":
                    break;
                  case "children":
                  case "dangerouslySetInnerHTML":
                    throw Error(
                      "link is a self-closing tag and must neither have `children` nor use `dangerouslySetInnerHTML`."
                    );
                  default:
                    writeStyleResourceAttributeInJS(
                      destination,
                      propKey,
                      precedence
                    );
                }
            writeChunk(destination, arrayCloseBracket);
            nextArrayOpenBrackChunk = arraySubsequentOpenBracket;
            resource.state = 3;
          }
      });
      writeChunk(destination, arrayCloseBracket);
    }
    function writeStyleResourceAttributeInJS(destination, name, value) {
      var attributeName = name.toLowerCase();
      switch (typeof value) {
        case "function":
        case "symbol":
          return;
      }
      switch (name) {
        case "innerHTML":
        case "dangerouslySetInnerHTML":
        case "suppressContentEditableWarning":
        case "suppressHydrationWarning":
        case "style":
        case "ref":
          return;
        case "className":
          attributeName = "class";
          name = "" + value;
          break;
        case "hidden":
          if (false === value) return;
          name = "";
          break;
        case "src":
        case "href":
          value = sanitizeURL(value);
          name = "" + value;
          break;
        default:
          if (2 < name.length && ("o" === name[0] || "O" === name[0]) && ("n" === name[1] || "N" === name[1]) || !isAttributeNameSafe(name))
            return;
          name = "" + value;
      }
      writeChunk(destination, arrayInterstitial);
      writeChunk(destination, escapeJSObjectForInstructionScripts(attributeName));
      writeChunk(destination, arrayInterstitial);
      writeChunk(destination, escapeJSObjectForInstructionScripts(name));
    }
    function createHoistableState() {
      return { styles: /* @__PURE__ */ new Set(), stylesheets: /* @__PURE__ */ new Set(), suspenseyImages: false };
    }
    function prefetchDNS(href) {
      var request = resolveRequest();
      if (request) {
        var resumableState = request.resumableState, renderState = request.renderState;
        if ("string" === typeof href && href) {
          if (!resumableState.dnsResources.hasOwnProperty(href)) {
            resumableState.dnsResources[href] = null;
            resumableState = renderState.headers;
            var header, JSCompiler_temp;
            if (JSCompiler_temp = resumableState && 0 < resumableState.remainingCapacity)
              JSCompiler_temp = (header = "<" + ("" + href).replace(
                regexForHrefInLinkHeaderURLContext,
                escapeHrefForLinkHeaderURLContextReplacer
              ) + ">; rel=dns-prefetch", 0 <= (resumableState.remainingCapacity -= header.length + 2));
            JSCompiler_temp ? (renderState.resets.dns[href] = null, resumableState.preconnects && (resumableState.preconnects += ", "), resumableState.preconnects += header) : (header = [], pushLinkImpl(header, { href, rel: "dns-prefetch" }), renderState.preconnects.add(header));
          }
          enqueueFlush(request);
        }
      } else previousDispatcher.D(href);
    }
    function preconnect(href, crossOrigin) {
      var request = resolveRequest();
      if (request) {
        var resumableState = request.resumableState, renderState = request.renderState;
        if ("string" === typeof href && href) {
          var bucket = "use-credentials" === crossOrigin ? "credentials" : "string" === typeof crossOrigin ? "anonymous" : "default";
          if (!resumableState.connectResources[bucket].hasOwnProperty(href)) {
            resumableState.connectResources[bucket][href] = null;
            resumableState = renderState.headers;
            var header, JSCompiler_temp;
            if (JSCompiler_temp = resumableState && 0 < resumableState.remainingCapacity) {
              JSCompiler_temp = "<" + ("" + href).replace(
                regexForHrefInLinkHeaderURLContext,
                escapeHrefForLinkHeaderURLContextReplacer
              ) + ">; rel=preconnect";
              if ("string" === typeof crossOrigin) {
                var escapedCrossOrigin = ("" + crossOrigin).replace(
                  regexForLinkHeaderQuotedParamValueContext,
                  escapeStringForLinkHeaderQuotedParamValueContextReplacer
                );
                JSCompiler_temp += '; crossorigin="' + escapedCrossOrigin + '"';
              }
              JSCompiler_temp = (header = JSCompiler_temp, 0 <= (resumableState.remainingCapacity -= header.length + 2));
            }
            JSCompiler_temp ? (renderState.resets.connect[bucket][href] = null, resumableState.preconnects && (resumableState.preconnects += ", "), resumableState.preconnects += header) : (bucket = [], pushLinkImpl(bucket, {
              rel: "preconnect",
              href,
              crossOrigin
            }), renderState.preconnects.add(bucket));
          }
          enqueueFlush(request);
        }
      } else previousDispatcher.C(href, crossOrigin);
    }
    function preload(href, as, options) {
      var request = resolveRequest();
      if (request) {
        var resumableState = request.resumableState, renderState = request.renderState;
        if (as && href) {
          switch (as) {
            case "image":
              if (options) {
                var imageSrcSet = options.imageSrcSet;
                var imageSizes = options.imageSizes;
                var fetchPriority = options.fetchPriority;
              }
              var key = imageSrcSet ? imageSrcSet + "\n" + (imageSizes || "") : href;
              if (resumableState.imageResources.hasOwnProperty(key)) return;
              resumableState.imageResources[key] = PRELOAD_NO_CREDS;
              resumableState = renderState.headers;
              var header;
              resumableState && 0 < resumableState.remainingCapacity && "string" !== typeof imageSrcSet && "high" === fetchPriority && (header = getPreloadAsHeader(href, as, options), 0 <= (resumableState.remainingCapacity -= header.length + 2)) ? (renderState.resets.image[key] = PRELOAD_NO_CREDS, resumableState.highImagePreloads && (resumableState.highImagePreloads += ", "), resumableState.highImagePreloads += header) : (resumableState = [], pushLinkImpl(
                resumableState,
                assign(
                  { rel: "preload", href: imageSrcSet ? void 0 : href, as },
                  options
                )
              ), "high" === fetchPriority ? renderState.highImagePreloads.add(resumableState) : (renderState.bulkPreloads.add(resumableState), renderState.preloads.images.set(key, resumableState)));
              break;
            case "style":
              if (resumableState.styleResources.hasOwnProperty(href)) return;
              imageSrcSet = [];
              pushLinkImpl(
                imageSrcSet,
                assign({ rel: "preload", href, as }, options)
              );
              resumableState.styleResources[href] = !options || "string" !== typeof options.crossOrigin && "string" !== typeof options.integrity ? PRELOAD_NO_CREDS : [options.crossOrigin, options.integrity];
              renderState.preloads.stylesheets.set(href, imageSrcSet);
              renderState.bulkPreloads.add(imageSrcSet);
              break;
            case "script":
              if (resumableState.scriptResources.hasOwnProperty(href)) return;
              imageSrcSet = [];
              renderState.preloads.scripts.set(href, imageSrcSet);
              renderState.bulkPreloads.add(imageSrcSet);
              pushLinkImpl(
                imageSrcSet,
                assign({ rel: "preload", href, as }, options)
              );
              resumableState.scriptResources[href] = !options || "string" !== typeof options.crossOrigin && "string" !== typeof options.integrity ? PRELOAD_NO_CREDS : [options.crossOrigin, options.integrity];
              break;
            default:
              if (resumableState.unknownResources.hasOwnProperty(as)) {
                if (imageSrcSet = resumableState.unknownResources[as], imageSrcSet.hasOwnProperty(href))
                  return;
              } else
                imageSrcSet = {}, resumableState.unknownResources[as] = imageSrcSet;
              imageSrcSet[href] = PRELOAD_NO_CREDS;
              if ((resumableState = renderState.headers) && 0 < resumableState.remainingCapacity && "font" === as && (key = getPreloadAsHeader(href, as, options), 0 <= (resumableState.remainingCapacity -= key.length + 2)))
                renderState.resets.font[href] = PRELOAD_NO_CREDS, resumableState.fontPreloads && (resumableState.fontPreloads += ", "), resumableState.fontPreloads += key;
              else
                switch (resumableState = [], href = assign({ rel: "preload", href, as }, options), pushLinkImpl(resumableState, href), as) {
                  case "font":
                    renderState.fontPreloads.add(resumableState);
                    break;
                  default:
                    renderState.bulkPreloads.add(resumableState);
                }
          }
          enqueueFlush(request);
        }
      } else previousDispatcher.L(href, as, options);
    }
    function preloadModule(href, options) {
      var request = resolveRequest();
      if (request) {
        var resumableState = request.resumableState, renderState = request.renderState;
        if (href) {
          var as = options && "string" === typeof options.as ? options.as : "script";
          switch (as) {
            case "script":
              if (resumableState.moduleScriptResources.hasOwnProperty(href)) return;
              as = [];
              resumableState.moduleScriptResources[href] = !options || "string" !== typeof options.crossOrigin && "string" !== typeof options.integrity ? PRELOAD_NO_CREDS : [options.crossOrigin, options.integrity];
              renderState.preloads.moduleScripts.set(href, as);
              break;
            default:
              if (resumableState.moduleUnknownResources.hasOwnProperty(as)) {
                var resources = resumableState.moduleUnknownResources[as];
                if (resources.hasOwnProperty(href)) return;
              } else
                resources = {}, resumableState.moduleUnknownResources[as] = resources;
              as = [];
              resources[href] = PRELOAD_NO_CREDS;
          }
          pushLinkImpl(as, assign({ rel: "modulepreload", href }, options));
          renderState.bulkPreloads.add(as);
          enqueueFlush(request);
        }
      } else previousDispatcher.m(href, options);
    }
    function preinitStyle(href, precedence, options) {
      var request = resolveRequest();
      if (request) {
        var resumableState = request.resumableState, renderState = request.renderState;
        if (href) {
          precedence = precedence || "default";
          var styleQueue = renderState.styles.get(precedence), resourceState = resumableState.styleResources.hasOwnProperty(href) ? resumableState.styleResources[href] : void 0;
          null !== resourceState && (resumableState.styleResources[href] = null, styleQueue || (styleQueue = {
            precedence: escapeTextForBrowser(precedence),
            rules: [],
            hrefs: [],
            sheets: /* @__PURE__ */ new Map()
          }, renderState.styles.set(precedence, styleQueue)), precedence = {
            state: 0,
            props: assign(
              { rel: "stylesheet", href, "data-precedence": precedence },
              options
            )
          }, resourceState && (2 === resourceState.length && adoptPreloadCredentials(precedence.props, resourceState), (renderState = renderState.preloads.stylesheets.get(href)) && 0 < renderState.length ? renderState.length = 0 : precedence.state = 1), styleQueue.sheets.set(href, precedence), enqueueFlush(request));
        }
      } else previousDispatcher.S(href, precedence, options);
    }
    function preinitScript(src, options) {
      var request = resolveRequest();
      if (request) {
        var resumableState = request.resumableState, renderState = request.renderState;
        if (src) {
          var resourceState = resumableState.scriptResources.hasOwnProperty(src) ? resumableState.scriptResources[src] : void 0;
          null !== resourceState && (resumableState.scriptResources[src] = null, options = assign({ src, async: true }, options), resourceState && (2 === resourceState.length && adoptPreloadCredentials(options, resourceState), src = renderState.preloads.scripts.get(src)) && (src.length = 0), src = [], renderState.scripts.add(src), pushScriptImpl(src, options), enqueueFlush(request));
        }
      } else previousDispatcher.X(src, options);
    }
    function preinitModuleScript(src, options) {
      var request = resolveRequest();
      if (request) {
        var resumableState = request.resumableState, renderState = request.renderState;
        if (src) {
          var resourceState = resumableState.moduleScriptResources.hasOwnProperty(
            src
          ) ? resumableState.moduleScriptResources[src] : void 0;
          null !== resourceState && (resumableState.moduleScriptResources[src] = null, options = assign({ src, type: "module", async: true }, options), resourceState && (2 === resourceState.length && adoptPreloadCredentials(options, resourceState), src = renderState.preloads.moduleScripts.get(src)) && (src.length = 0), src = [], renderState.scripts.add(src), pushScriptImpl(src, options), enqueueFlush(request));
        }
      } else previousDispatcher.M(src, options);
    }
    function adoptPreloadCredentials(target, preloadState) {
      null == target.crossOrigin && (target.crossOrigin = preloadState[0]);
      null == target.integrity && (target.integrity = preloadState[1]);
    }
    function getPreloadAsHeader(href, as, params) {
      href = ("" + href).replace(
        regexForHrefInLinkHeaderURLContext,
        escapeHrefForLinkHeaderURLContextReplacer
      );
      as = ("" + as).replace(
        regexForLinkHeaderQuotedParamValueContext,
        escapeStringForLinkHeaderQuotedParamValueContextReplacer
      );
      as = "<" + href + '>; rel=preload; as="' + as + '"';
      for (var paramName in params)
        hasOwnProperty.call(params, paramName) && (href = params[paramName], "string" === typeof href && (as += "; " + paramName.toLowerCase() + '="' + ("" + href).replace(
          regexForLinkHeaderQuotedParamValueContext,
          escapeStringForLinkHeaderQuotedParamValueContextReplacer
        ) + '"'));
      return as;
    }
    var regexForHrefInLinkHeaderURLContext = /[<>\r\n]/g;
    function escapeHrefForLinkHeaderURLContextReplacer(match) {
      switch (match) {
        case "<":
          return "%3C";
        case ">":
          return "%3E";
        case "\n":
          return "%0A";
        case "\r":
          return "%0D";
        default:
          throw Error(
            "escapeLinkHrefForHeaderContextReplacer encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React"
          );
      }
    }
    var regexForLinkHeaderQuotedParamValueContext = /["';,\r\n]/g;
    function escapeStringForLinkHeaderQuotedParamValueContextReplacer(match) {
      switch (match) {
        case '"':
          return "%22";
        case "'":
          return "%27";
        case ";":
          return "%3B";
        case ",":
          return "%2C";
        case "\n":
          return "%0A";
        case "\r":
          return "%0D";
        default:
          throw Error(
            "escapeStringForLinkHeaderQuotedParamValueContextReplacer encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React"
          );
      }
    }
    function hoistStyleQueueDependency(styleQueue) {
      this.styles.add(styleQueue);
    }
    function hoistStylesheetDependency(stylesheet) {
      this.stylesheets.add(stylesheet);
    }
    function hoistHoistables(parentState, childState) {
      childState.styles.forEach(hoistStyleQueueDependency, parentState);
      childState.stylesheets.forEach(hoistStylesheetDependency, parentState);
      childState.suspenseyImages && (parentState.suspenseyImages = true);
    }
    function hasSuspenseyContent(hoistableState, flushingInShell) {
      return flushingInShell ? hoistableState.suspenseyImages : 0 < hoistableState.stylesheets.size || hoistableState.suspenseyImages;
    }
    var bind = Function.prototype.bind;
    var requestStorage = new async_hooks.AsyncLocalStorage();
    var REACT_CLIENT_REFERENCE = /* @__PURE__ */ Symbol.for("react.client.reference");
    function getComponentNameFromType(type) {
      if (null == type) return null;
      if ("function" === typeof type)
        return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
      if ("string" === typeof type) return type;
      switch (type) {
        case REACT_FRAGMENT_TYPE:
          return "Fragment";
        case REACT_PROFILER_TYPE:
          return "Profiler";
        case REACT_STRICT_MODE_TYPE:
          return "StrictMode";
        case REACT_SUSPENSE_TYPE:
          return "Suspense";
        case REACT_SUSPENSE_LIST_TYPE:
          return "SuspenseList";
        case REACT_ACTIVITY_TYPE:
          return "Activity";
        case REACT_VIEW_TRANSITION_TYPE:
          return "ViewTransition";
      }
      if ("object" === typeof type)
        switch (type.$$typeof) {
          case REACT_PORTAL_TYPE:
            return "Portal";
          case REACT_CONTEXT_TYPE:
            return type.displayName || "Context";
          case REACT_CONSUMER_TYPE:
            return (type._context.displayName || "Context") + ".Consumer";
          case REACT_FORWARD_REF_TYPE:
            var innerType = type.render;
            type = type.displayName;
            type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
            return type;
          case REACT_MEMO_TYPE:
            return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
          case REACT_LAZY_TYPE:
            innerType = type._payload;
            type = type._init;
            try {
              return getComponentNameFromType(type(innerType));
            } catch (x) {
            }
        }
      return null;
    }
    var emptyContextObject = {};
    var currentActiveSnapshot = null;
    function popToNearestCommonAncestor(prev, next) {
      if (prev !== next) {
        prev.context._currentValue = prev.parentValue;
        prev = prev.parent;
        var parentNext = next.parent;
        if (null === prev) {
          if (null !== parentNext)
            throw Error(
              "The stacks must reach the root at the same time. This is a bug in React."
            );
        } else {
          if (null === parentNext)
            throw Error(
              "The stacks must reach the root at the same time. This is a bug in React."
            );
          popToNearestCommonAncestor(prev, parentNext);
        }
        next.context._currentValue = next.value;
      }
    }
    function popAllPrevious(prev) {
      prev.context._currentValue = prev.parentValue;
      prev = prev.parent;
      null !== prev && popAllPrevious(prev);
    }
    function pushAllNext(next) {
      var parentNext = next.parent;
      null !== parentNext && pushAllNext(parentNext);
      next.context._currentValue = next.value;
    }
    function popPreviousToCommonLevel(prev, next) {
      prev.context._currentValue = prev.parentValue;
      prev = prev.parent;
      if (null === prev)
        throw Error(
          "The depth must equal at least at zero before reaching the root. This is a bug in React."
        );
      prev.depth === next.depth ? popToNearestCommonAncestor(prev, next) : popPreviousToCommonLevel(prev, next);
    }
    function popNextToCommonLevel(prev, next) {
      var parentNext = next.parent;
      if (null === parentNext)
        throw Error(
          "The depth must equal at least at zero before reaching the root. This is a bug in React."
        );
      prev.depth === parentNext.depth ? popToNearestCommonAncestor(prev, parentNext) : popNextToCommonLevel(prev, parentNext);
      next.context._currentValue = next.value;
    }
    function switchContext(newSnapshot) {
      var prev = currentActiveSnapshot;
      prev !== newSnapshot && (null === prev ? pushAllNext(newSnapshot) : null === newSnapshot ? popAllPrevious(prev) : prev.depth === newSnapshot.depth ? popToNearestCommonAncestor(prev, newSnapshot) : prev.depth > newSnapshot.depth ? popPreviousToCommonLevel(prev, newSnapshot) : popNextToCommonLevel(prev, newSnapshot), currentActiveSnapshot = newSnapshot);
    }
    var classComponentUpdater = {
      enqueueSetState: function(inst, payload) {
        inst = inst._reactInternals;
        null !== inst.queue && inst.queue.push(payload);
      },
      enqueueReplaceState: function(inst, payload) {
        inst = inst._reactInternals;
        inst.replace = true;
        inst.queue = [payload];
      },
      enqueueForceUpdate: function() {
      }
    };
    var emptyTreeContext = { id: 1, overflow: "" };
    function getTreeId(context) {
      var overflow = context.overflow;
      context = context.id;
      return (context & ~(1 << 32 - clz32(context) - 1)).toString(32) + overflow;
    }
    function pushTreeContext(baseContext, totalChildren, index) {
      var baseIdWithLeadingBit = baseContext.id;
      baseContext = baseContext.overflow;
      var baseLength = 32 - clz32(baseIdWithLeadingBit) - 1;
      baseIdWithLeadingBit &= ~(1 << baseLength);
      index += 1;
      var length = 32 - clz32(totalChildren) + baseLength;
      if (30 < length) {
        var numberOfOverflowBits = baseLength - baseLength % 5;
        length = (baseIdWithLeadingBit & (1 << numberOfOverflowBits) - 1).toString(32);
        baseIdWithLeadingBit >>= numberOfOverflowBits;
        baseLength -= numberOfOverflowBits;
        return {
          id: 1 << 32 - clz32(totalChildren) + baseLength | index << baseLength | baseIdWithLeadingBit,
          overflow: length + baseContext
        };
      }
      return {
        id: 1 << length | index << baseLength | baseIdWithLeadingBit,
        overflow: baseContext
      };
    }
    var clz32 = Math.clz32 ? Math.clz32 : clz32Fallback;
    var log = Math.log;
    var LN2 = Math.LN2;
    function clz32Fallback(x) {
      x >>>= 0;
      return 0 === x ? 32 : 31 - (log(x) / LN2 | 0) | 0;
    }
    function noop() {
    }
    var SuspenseException = Error(
      "Suspense Exception: This is not a real error! It's an implementation detail of `use` to interrupt the current render. You must either rethrow it immediately, or move the `use` call outside of the `try/catch` block. Capturing without rethrowing will lead to unexpected behavior.\n\nTo handle async errors, wrap your component in an error boundary, or call the promise's `.catch` method and pass the result to `use`."
    );
    function trackUsedThenable(thenableState2, thenable, index) {
      index = thenableState2[index];
      void 0 === index ? thenableState2.push(thenable) : index !== thenable && (thenable.then(noop, noop), thenable = index);
      switch (thenable.status) {
        case "fulfilled":
          return thenable.value;
        case "rejected":
          thenableState2 = thenable.reason;
          if (void 0 === thenableState2 && !("reason" in thenable))
            throw Error(
              "A rejected Promise was passed to React without a `reason` property. React threw a generic error from where the Promise was used to assist in identifying the problematic Promise. Make sure that instrumented Promises correctly set the `reason` property when setting `status` to `'rejected'`."
            );
          throw thenableState2;
        default:
          "string" === typeof thenable.status ? thenable.then(noop, noop) : (thenableState2 = thenable, thenableState2.status = "pending", thenableState2.then(
            function(fulfilledValue) {
              if ("pending" === thenable.status) {
                var fulfilledThenable = thenable;
                fulfilledThenable.status = "fulfilled";
                fulfilledThenable.value = fulfilledValue;
              }
            },
            function(error) {
              if ("pending" === thenable.status) {
                var rejectedThenable = thenable;
                rejectedThenable.status = "rejected";
                rejectedThenable.reason = error;
              }
            }
          ));
          switch (thenable.status) {
            case "fulfilled":
              return thenable.value;
            case "rejected":
              throw thenable.reason;
          }
          suspendedThenable = thenable;
          throw SuspenseException;
      }
    }
    var suspendedThenable = null;
    function getSuspendedThenable() {
      if (null === suspendedThenable)
        throw Error(
          "Expected a suspended thenable. This is a bug in React. Please file an issue."
        );
      var thenable = suspendedThenable;
      suspendedThenable = null;
      return thenable;
    }
    function is(x, y) {
      return x === y && (0 !== x || 1 / x === 1 / y) || x !== x && y !== y;
    }
    var objectIs = "function" === typeof Object.is ? Object.is : is;
    var currentlyRenderingComponent = null;
    var currentlyRenderingTask = null;
    var currentlyRenderingRequest = null;
    var currentlyRenderingKeyPath = null;
    var firstWorkInProgressHook = null;
    var workInProgressHook = null;
    var isReRender = false;
    var didScheduleRenderPhaseUpdate = false;
    var localIdCounter = 0;
    var actionStateCounter = 0;
    var actionStateMatchingIndex = -1;
    var thenableIndexCounter = 0;
    var thenableState = null;
    function createRecoverableError(recoverable) {
      recoverable = recoverable._reason;
      if ("function" === typeof recoverable)
        try {
          var initializedReason = recoverable();
        } catch ($jscomp$unused$catch) {
          initializedReason = "The reason for browser-only rendering could not be determined because its initializer threw.";
        }
      else initializedReason = recoverable;
      initializedReason = Error(
        "Browser-only rendering was requested by `browser()`.",
        void 0 === recoverable ? void 0 : { cause: initializedReason }
      );
      Object.defineProperty(initializedReason, REACT_RECOVERABLE_TYPE, {
        value: true
      });
      return initializedReason;
    }
    function isRecoverableError(error) {
      return "object" !== typeof error || null === error ? false : true === error[REACT_RECOVERABLE_TYPE];
    }
    function cloneRecoverableErrorAsFatal(recoverableError) {
      var fatalRecoverableError = Error(
        "The server render could not complete because client rendering was requested outside a Suspense boundary. See this error's cause for additional details.",
        hasOwnProperty.call(recoverableError, "cause") ? { cause: recoverableError.cause } : void 0
      );
      recoverableError = recoverableError.stack;
      if (void 0 !== recoverableError) {
        var frameStart = recoverableError.indexOf("\n");
        fatalRecoverableError.stack = fatalRecoverableError.name + ": " + fatalRecoverableError.message + (-1 === frameStart ? "" : recoverableError.slice(frameStart));
      } else fatalRecoverableError.stack = void 0;
      return fatalRecoverableError;
    }
    var renderPhaseUpdates = null;
    var numberOfReRenders = 0;
    function resolveCurrentlyRenderingComponent() {
      if (null === currentlyRenderingComponent)
        throw Error(
          "Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem."
        );
      return currentlyRenderingComponent;
    }
    function createHook() {
      if (0 < numberOfReRenders)
        throw Error("Rendered more hooks than during the previous render");
      return { memoizedState: null, queue: null, next: null };
    }
    function createWorkInProgressHook() {
      null === workInProgressHook ? null === firstWorkInProgressHook ? (isReRender = false, firstWorkInProgressHook = workInProgressHook = createHook()) : (isReRender = true, workInProgressHook = firstWorkInProgressHook) : null === workInProgressHook.next ? (isReRender = false, workInProgressHook = workInProgressHook.next = createHook()) : (isReRender = true, workInProgressHook = workInProgressHook.next);
      return workInProgressHook;
    }
    function getThenableStateAfterSuspending() {
      var state = thenableState;
      thenableState = null;
      return state;
    }
    function resetHooksState() {
      currentlyRenderingKeyPath = currentlyRenderingRequest = currentlyRenderingTask = currentlyRenderingComponent = null;
      didScheduleRenderPhaseUpdate = false;
      firstWorkInProgressHook = null;
      numberOfReRenders = 0;
      workInProgressHook = renderPhaseUpdates = null;
    }
    function basicStateReducer(state, action) {
      return "function" === typeof action ? action(state) : action;
    }
    function useReducer(reducer, initialArg, init) {
      currentlyRenderingComponent = resolveCurrentlyRenderingComponent();
      workInProgressHook = createWorkInProgressHook();
      if (isReRender) {
        var queue = workInProgressHook.queue;
        initialArg = queue.dispatch;
        if (null !== renderPhaseUpdates && (init = renderPhaseUpdates.get(queue), void 0 !== init)) {
          renderPhaseUpdates.delete(queue);
          queue = workInProgressHook.memoizedState;
          do
            queue = reducer(queue, init.action), init = init.next;
          while (null !== init);
          workInProgressHook.memoizedState = queue;
          return [queue, initialArg];
        }
        return [workInProgressHook.memoizedState, initialArg];
      }
      reducer = reducer === basicStateReducer ? "function" === typeof initialArg ? initialArg() : initialArg : void 0 !== init ? init(initialArg) : initialArg;
      workInProgressHook.memoizedState = reducer;
      reducer = workInProgressHook.queue = { last: null, dispatch: null };
      reducer = reducer.dispatch = dispatchAction.bind(
        null,
        currentlyRenderingComponent,
        reducer
      );
      return [workInProgressHook.memoizedState, reducer];
    }
    function useMemo(nextCreate, deps) {
      currentlyRenderingComponent = resolveCurrentlyRenderingComponent();
      workInProgressHook = createWorkInProgressHook();
      deps = void 0 === deps ? null : deps;
      if (null !== workInProgressHook) {
        var prevState = workInProgressHook.memoizedState;
        if (null !== prevState && null !== deps) {
          var prevDeps = prevState[1];
          a: if (null === prevDeps) prevDeps = false;
          else {
            for (var i = 0; i < prevDeps.length && i < deps.length; i++)
              if (!objectIs(deps[i], prevDeps[i])) {
                prevDeps = false;
                break a;
              }
            prevDeps = true;
          }
          if (prevDeps) return prevState[0];
        }
      }
      nextCreate = nextCreate();
      workInProgressHook.memoizedState = [nextCreate, deps];
      return nextCreate;
    }
    function dispatchAction(componentIdentity, queue, action) {
      if (25 <= numberOfReRenders)
        throw Error(
          "Too many re-renders. React limits the number of renders to prevent an infinite loop."
        );
      if (componentIdentity === currentlyRenderingComponent)
        if (didScheduleRenderPhaseUpdate = true, componentIdentity = { action, next: null }, null === renderPhaseUpdates && (renderPhaseUpdates = /* @__PURE__ */ new Map()), action = renderPhaseUpdates.get(queue), void 0 === action)
          renderPhaseUpdates.set(queue, componentIdentity);
        else {
          for (queue = action; null !== queue.next; ) queue = queue.next;
          queue.next = componentIdentity;
        }
    }
    function throwOnUseEffectEventCall() {
      throw Error(
        "A function wrapped in useEffectEvent can't be called during rendering."
      );
    }
    function unsupportedStartTransition() {
      throw Error("startTransition cannot be called during server rendering.");
    }
    function unsupportedSetOptimisticState() {
      throw Error("Cannot update optimistic state while rendering.");
    }
    function createPostbackActionStateKey(permalink, componentKeyPath, hookIndex) {
      if (void 0 !== permalink) return "p" + permalink;
      permalink = JSON.stringify([componentKeyPath, null, hookIndex]);
      componentKeyPath = crypto2.createHash("md5");
      componentKeyPath.update(permalink);
      return "k" + componentKeyPath.digest("hex");
    }
    function useActionState(action, initialState, permalink) {
      resolveCurrentlyRenderingComponent();
      var actionStateHookIndex = actionStateCounter++, request = currentlyRenderingRequest;
      if ("function" === typeof action.$$FORM_ACTION) {
        var nextPostbackStateKey = null, componentKeyPath = currentlyRenderingKeyPath;
        request = request.formState;
        var isSignatureEqual = action.$$IS_SIGNATURE_EQUAL;
        if (null !== request && "function" === typeof isSignatureEqual) {
          var postbackKey = request[1];
          isSignatureEqual.call(action, request[2], request[3]) && (nextPostbackStateKey = createPostbackActionStateKey(
            permalink,
            componentKeyPath,
            actionStateHookIndex
          ), postbackKey === nextPostbackStateKey && (actionStateMatchingIndex = actionStateHookIndex, initialState = request[0]));
        }
        var boundAction = action.bind(null, initialState);
        action = function(payload) {
          boundAction(payload);
        };
        "function" === typeof boundAction.$$FORM_ACTION && (action.$$FORM_ACTION = function(prefix2) {
          prefix2 = boundAction.$$FORM_ACTION(prefix2);
          void 0 !== permalink && (permalink += "", prefix2.action = permalink);
          var formData = prefix2.data;
          formData && (null === nextPostbackStateKey && (nextPostbackStateKey = createPostbackActionStateKey(
            permalink,
            componentKeyPath,
            actionStateHookIndex
          )), formData.append("$ACTION_KEY", nextPostbackStateKey));
          return prefix2;
        });
        return [initialState, action, false];
      }
      var boundAction$22 = action.bind(null, initialState);
      return [
        initialState,
        function(payload) {
          boundAction$22(payload);
        },
        false
      ];
    }
    function unwrapThenable(thenable) {
      var index = thenableIndexCounter;
      thenableIndexCounter += 1;
      null === thenableState && (thenableState = []);
      return trackUsedThenable(thenableState, thenable, index);
    }
    function unsupportedRefresh() {
      throw Error("Cache cannot be refreshed during server rendering.");
    }
    var HooksDispatcher = {
      readContext: function(context) {
        return context._currentValue;
      },
      use: function(usable) {
        if (null !== usable && "object" === typeof usable) {
          if ("function" === typeof usable.then) return unwrapThenable(usable);
          if (usable.$$typeof === REACT_RECOVERABLE_TYPE)
            throw createRecoverableError(usable);
          if (usable.$$typeof === REACT_CONTEXT_TYPE) return usable._currentValue;
        }
        throw Error("An unsupported type was passed to use(): " + String(usable));
      },
      useContext: function(context) {
        resolveCurrentlyRenderingComponent();
        return context._currentValue;
      },
      useMemo,
      useReducer,
      useRef: function(initialValue) {
        currentlyRenderingComponent = resolveCurrentlyRenderingComponent();
        workInProgressHook = createWorkInProgressHook();
        var previousRef = workInProgressHook.memoizedState;
        return null === previousRef ? (initialValue = { current: initialValue }, workInProgressHook.memoizedState = initialValue) : previousRef;
      },
      useState: function(initialState) {
        return useReducer(basicStateReducer, initialState);
      },
      useInsertionEffect: noop,
      useLayoutEffect: noop,
      useCallback: function(callback, deps) {
        return useMemo(function() {
          return callback;
        }, deps);
      },
      useImperativeHandle: noop,
      useEffect: noop,
      useDebugValue: noop,
      useDeferredValue: function(value, initialValue) {
        resolveCurrentlyRenderingComponent();
        return void 0 !== initialValue ? initialValue : value;
      },
      useTransition: function() {
        resolveCurrentlyRenderingComponent();
        return [false, unsupportedStartTransition];
      },
      useId: function() {
        var treeId = getTreeId(currentlyRenderingTask.treeContext), resumableState = currentResumableState;
        if (null === resumableState)
          throw Error(
            "Invalid hook call. Hooks can only be called inside of the body of a function component."
          );
        var localId = localIdCounter++;
        return makeId(resumableState, treeId, localId);
      },
      useSyncExternalStore: function(subscribe, getSnapshot, getServerSnapshot) {
        if (void 0 === getServerSnapshot)
          throw Error(
            "Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering."
          );
        return getServerSnapshot();
      },
      useOptimistic: function(passthrough) {
        resolveCurrentlyRenderingComponent();
        return [passthrough, unsupportedSetOptimisticState];
      },
      useActionState,
      useFormState: useActionState,
      useHostTransitionStatus: function() {
        resolveCurrentlyRenderingComponent();
        return sharedNotPendingObject;
      },
      useMemoCache: function(size) {
        for (var data = Array(size), i = 0; i < size; i++)
          data[i] = REACT_MEMO_CACHE_SENTINEL;
        return data;
      },
      useCacheRefresh: function() {
        return unsupportedRefresh;
      },
      useEffectEvent: function() {
        return throwOnUseEffectEventCall;
      }
    };
    var currentResumableState = null;
    var DefaultAsyncDispatcher = {
      getCacheForType: function() {
        throw Error("Not implemented.");
      },
      cacheSignal: function() {
        throw Error("Not implemented.");
      }
    };
    function prepareStackTrace(error, structuredStackTrace) {
      error = (error.name || "Error") + ": " + (error.message || "");
      for (var i = 0; i < structuredStackTrace.length; i++)
        error += "\n    at " + structuredStackTrace[i].toString();
      return error;
    }
    var prefix;
    var suffix;
    function describeBuiltInComponentFrame(name) {
      if (void 0 === prefix)
        try {
          throw Error();
        } catch (x) {
          var match = x.stack.trim().match(/\n( *(at )?)/);
          prefix = match && match[1] || "";
          suffix = -1 < x.stack.indexOf("\n    at") ? " (<anonymous>)" : -1 < x.stack.indexOf("@") ? "@unknown:0:0" : "";
        }
      return "\n" + prefix + name + suffix;
    }
    var reentry = false;
    function describeNativeComponentFrame(fn, construct) {
      if (!fn || reentry) return "";
      reentry = true;
      var previousPrepareStackTrace = Error.prepareStackTrace;
      Error.prepareStackTrace = prepareStackTrace;
      try {
        var RunInRootFrame = {
          DetermineComponentFrameRoot: function() {
            try {
              if (construct) {
                var Fake = function() {
                  throw Error();
                };
                Object.defineProperty(Fake.prototype, "props", {
                  set: function() {
                    throw Error();
                  }
                });
                if ("object" === typeof Reflect && Reflect.construct) {
                  try {
                    Reflect.construct(Fake, []);
                  } catch (x) {
                    var control = x;
                  }
                  Reflect.construct(fn, [], Fake);
                } else {
                  try {
                    Fake.call();
                  } catch (x$24) {
                    control = x$24;
                  }
                  Fake = false;
                  try {
                    var prevProps = Object.getOwnPropertyDescriptor(
                      fn.prototype,
                      "props"
                    );
                    Object.defineProperty(fn.prototype, "props", {
                      configurable: true,
                      set: function() {
                        throw Error();
                      }
                    });
                    Fake = true;
                    new fn();
                  } finally {
                    Fake && (void 0 !== prevProps ? Object.defineProperty(fn.prototype, "props", prevProps) : delete fn.prototype.props);
                  }
                }
              } else {
                try {
                  throw Error();
                } catch (x$25) {
                  control = x$25;
                }
                (Fake = fn()) && "function" === typeof Fake.catch && Fake.catch(function() {
                });
              }
            } catch (sample) {
              if (sample && control && "string" === typeof sample.stack)
                return [sample.stack, control.stack];
            }
            return [null, null];
          }
        };
        RunInRootFrame.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
        var namePropDescriptor = Object.getOwnPropertyDescriptor(
          RunInRootFrame.DetermineComponentFrameRoot,
          "name"
        );
        namePropDescriptor && namePropDescriptor.configurable && Object.defineProperty(
          RunInRootFrame.DetermineComponentFrameRoot,
          "name",
          { value: "DetermineComponentFrameRoot" }
        );
        var _RunInRootFrame$Deter = RunInRootFrame.DetermineComponentFrameRoot(), sampleStack = _RunInRootFrame$Deter[0], controlStack = _RunInRootFrame$Deter[1];
        if (sampleStack && controlStack) {
          var sampleLines = sampleStack.split("\n"), controlLines = controlStack.split("\n");
          for (namePropDescriptor = RunInRootFrame = 0; RunInRootFrame < sampleLines.length && !sampleLines[RunInRootFrame].includes("DetermineComponentFrameRoot"); )
            RunInRootFrame++;
          for (; namePropDescriptor < controlLines.length && !controlLines[namePropDescriptor].includes(
            "DetermineComponentFrameRoot"
          ); )
            namePropDescriptor++;
          if (RunInRootFrame === sampleLines.length || namePropDescriptor === controlLines.length)
            for (RunInRootFrame = sampleLines.length - 1, namePropDescriptor = controlLines.length - 1; 1 <= RunInRootFrame && 0 <= namePropDescriptor && sampleLines[RunInRootFrame] !== controlLines[namePropDescriptor]; )
              namePropDescriptor--;
          for (; 1 <= RunInRootFrame && 0 <= namePropDescriptor; RunInRootFrame--, namePropDescriptor--)
            if (sampleLines[RunInRootFrame] !== controlLines[namePropDescriptor]) {
              if (1 !== RunInRootFrame || 1 !== namePropDescriptor) {
                do
                  if (RunInRootFrame--, namePropDescriptor--, 0 > namePropDescriptor || sampleLines[RunInRootFrame] !== controlLines[namePropDescriptor]) {
                    var frame = "\n" + sampleLines[RunInRootFrame].replace(" at new ", " at ");
                    fn.displayName && frame.includes("<anonymous>") && (frame = frame.replace("<anonymous>", fn.displayName));
                    return frame;
                  }
                while (1 <= RunInRootFrame && 0 <= namePropDescriptor);
              }
              break;
            }
        }
      } finally {
        reentry = false, Error.prepareStackTrace = previousPrepareStackTrace;
      }
      return (previousPrepareStackTrace = fn ? fn.displayName || fn.name : "") ? describeBuiltInComponentFrame(previousPrepareStackTrace) : "";
    }
    function describeComponentStackByType(type) {
      if ("string" === typeof type) return describeBuiltInComponentFrame(type);
      if ("function" === typeof type)
        return type.prototype && type.prototype.isReactComponent ? describeNativeComponentFrame(type, true) : describeNativeComponentFrame(type, false);
      if ("object" === typeof type && null !== type) {
        switch (type.$$typeof) {
          case REACT_FORWARD_REF_TYPE:
            return describeNativeComponentFrame(type.render, false);
          case REACT_MEMO_TYPE:
            return describeNativeComponentFrame(type.type, false);
          case REACT_LAZY_TYPE:
            var lazyComponent = type, payload = lazyComponent._payload;
            lazyComponent = lazyComponent._init;
            try {
              type = lazyComponent(payload);
            } catch (x) {
              return describeBuiltInComponentFrame("Lazy");
            }
            return describeComponentStackByType(type);
        }
        if ("string" === typeof type.name) {
          a: {
            payload = type.name;
            lazyComponent = type.env;
            var location = type.debugLocation;
            if (null != location && (type = Error.prepareStackTrace, Error.prepareStackTrace = prepareStackTrace, location = location.stack, Error.prepareStackTrace = type, location.startsWith("Error: react-stack-top-frame\n") && (location = location.slice(29)), type = location.indexOf("\n"), -1 !== type && (location = location.slice(type + 1)), type = location.indexOf("react_stack_bottom_frame"), -1 !== type && (type = location.lastIndexOf("\n", type)), type = -1 !== type ? location = location.slice(0, type) : "", location = type.lastIndexOf("\n"), type = -1 === location ? type : type.slice(location + 1), -1 !== type.indexOf(payload))) {
              payload = "\n" + type;
              break a;
            }
            payload = describeBuiltInComponentFrame(
              payload + (lazyComponent ? " [" + lazyComponent + "]" : "")
            );
          }
          return payload;
        }
      }
      switch (type) {
        case REACT_SUSPENSE_LIST_TYPE:
          return describeBuiltInComponentFrame("SuspenseList");
        case REACT_SUSPENSE_TYPE:
          return describeBuiltInComponentFrame("Suspense");
        case REACT_VIEW_TRANSITION_TYPE:
          return describeBuiltInComponentFrame("ViewTransition");
      }
      return "";
    }
    function getViewTransitionClassName(defaultClass, eventClass) {
      defaultClass = null == defaultClass || "string" === typeof defaultClass ? defaultClass : defaultClass.default;
      eventClass = null == eventClass || "string" === typeof eventClass ? eventClass : eventClass.default;
      return null == eventClass ? "auto" === defaultClass ? null : defaultClass : "auto" === eventClass ? null : eventClass;
    }
    function isEligibleForOutlining(request, boundary) {
      return (500 < boundary.byteSize || hasSuspenseyContent(boundary.contentState, false) || boundary.defer) && null === boundary.preamble;
    }
    function defaultErrorHandler(error) {
      if ("object" === typeof error && null !== error && "string" === typeof error.environmentName) {
        var JSCompiler_inline_result = error.environmentName;
        error = [error].slice(0);
        "string" === typeof error[0] ? error.splice(
          0,
          1,
          "\x1B[0m\x1B[7m%c%s\x1B[0m%c " + error[0],
          "background: #e6e6e6;background: light-dark(rgba(0,0,0,0.1), rgba(255,255,255,0.25));color: #000000;color: light-dark(#000000, #ffffff);border-radius: 2px",
          " " + JSCompiler_inline_result + " ",
          ""
        ) : error.splice(
          0,
          0,
          "\x1B[0m\x1B[7m%c%s\x1B[0m%c",
          "background: #e6e6e6;background: light-dark(rgba(0,0,0,0.1), rgba(255,255,255,0.25));color: #000000;color: light-dark(#000000, #ffffff);border-radius: 2px",
          " " + JSCompiler_inline_result + " ",
          ""
        );
        error.unshift(console);
        JSCompiler_inline_result = bind.apply(console.error, error);
        JSCompiler_inline_result();
      } else console.error(error);
      return null;
    }
    function RequestInstance(resumableState, renderState, rootFormatContext, progressiveChunkSize, onError, onBrowserBailout, onAllReady, onShellReady, onShellError, onFatalError, formState) {
      var abortSet = /* @__PURE__ */ new Set();
      this.destination = null;
      this.flushScheduled = false;
      this.resumableState = resumableState;
      this.renderState = renderState;
      this.rootFormatContext = rootFormatContext;
      this.progressiveChunkSize = void 0 === progressiveChunkSize ? 12800 : progressiveChunkSize;
      this.status = 10;
      this.fatalError = null;
      this.aborted = false;
      this.pendingRootTasks = this.allPendingTasks = this.nextSegmentId = 0;
      this.completedPreambleSegments = this.completedRootSegment = null;
      this.byteSize = 0;
      this.abortableTasks = abortSet;
      this.pingedTasks = [];
      this.currentTask = null;
      this.clientRenderedBoundaries = [];
      this.completedBoundaries = [];
      this.partialBoundaries = [];
      this.postponedState = this.trackedPostpones = null;
      this.onError = void 0 === onError ? defaultErrorHandler : onError;
      this.onBrowserBailout = void 0 === onBrowserBailout ? noop : onBrowserBailout;
      this.onAllReady = void 0 === onAllReady ? noop : onAllReady;
      this.onShellReady = void 0 === onShellReady ? noop : onShellReady;
      this.onShellError = void 0 === onShellError ? noop : onShellError;
      this.onFatalError = void 0 === onFatalError ? noop : onFatalError;
      this.renderLifetimeController = null;
      this.formState = void 0 === formState ? null : formState;
    }
    function createRequest(children, resumableState, renderState, rootFormatContext, progressiveChunkSize, onError, onBrowserBailout, onAllReady, onShellReady, onShellError, onFatalError, formState) {
      resumableState = new RequestInstance(
        resumableState,
        renderState,
        rootFormatContext,
        progressiveChunkSize,
        onError,
        onBrowserBailout,
        onAllReady,
        onShellReady,
        onShellError,
        onFatalError,
        formState
      );
      renderState = createPendingSegment(
        resumableState,
        0,
        null,
        rootFormatContext,
        false,
        false
      );
      renderState.parentFlushed = true;
      children = createRenderTask(
        resumableState,
        null,
        children,
        -1,
        null,
        renderState,
        null,
        null,
        resumableState.abortableTasks,
        null,
        rootFormatContext,
        null,
        emptyTreeContext,
        null,
        null
      );
      pushComponentStack(children);
      resumableState.pingedTasks.push(children);
      return resumableState;
    }
    function createPrerenderRequest(children, resumableState, renderState, rootFormatContext, progressiveChunkSize, onError, onBrowserBailout, onAllReady, onShellReady, onShellError, onFatalError) {
      children = createRequest(
        children,
        resumableState,
        renderState,
        rootFormatContext,
        progressiveChunkSize,
        onError,
        onBrowserBailout,
        onAllReady,
        onShellReady,
        onShellError,
        onFatalError,
        void 0
      );
      children.trackedPostpones = {
        workingMap: /* @__PURE__ */ new Map(),
        rootNodes: [],
        rootSlots: null
      };
      return children;
    }
    function resumeRequest(children, postponedState, renderState, onError, onBrowserBailout, onAllReady, onShellReady, onShellError, onFatalError) {
      renderState = new RequestInstance(
        postponedState.resumableState,
        renderState,
        postponedState.rootFormatContext,
        postponedState.progressiveChunkSize,
        onError,
        onBrowserBailout,
        onAllReady,
        onShellReady,
        onShellError,
        onFatalError,
        null
      );
      renderState.nextSegmentId = postponedState.nextSegmentId;
      if ("number" === typeof postponedState.replaySlots)
        return onError = createPendingSegment(
          renderState,
          0,
          null,
          postponedState.rootFormatContext,
          false,
          false
        ), onError.parentFlushed = true, children = createRenderTask(
          renderState,
          null,
          children,
          -1,
          null,
          onError,
          null,
          null,
          renderState.abortableTasks,
          null,
          postponedState.rootFormatContext,
          null,
          emptyTreeContext,
          null,
          null
        ), pushComponentStack(children), renderState.pingedTasks.push(children), renderState;
      children = createReplayTask(
        renderState,
        null,
        {
          nodes: postponedState.replayNodes,
          slots: postponedState.replaySlots,
          pendingTasks: 0
        },
        children,
        -1,
        null,
        null,
        renderState.abortableTasks,
        null,
        postponedState.rootFormatContext,
        null,
        emptyTreeContext,
        null,
        null
      );
      pushComponentStack(children);
      renderState.pingedTasks.push(children);
      return renderState;
    }
    function resumeAndPrerenderRequest(children, postponedState, renderState, onError, onBrowserBailout, onAllReady, onShellReady, onShellError, onFatalError) {
      children = resumeRequest(
        children,
        postponedState,
        renderState,
        onError,
        onBrowserBailout,
        onAllReady,
        onShellReady,
        onShellError,
        onFatalError
      );
      children.trackedPostpones = {
        workingMap: /* @__PURE__ */ new Map(),
        rootNodes: [],
        rootSlots: null
      };
      return children;
    }
    var currentRequest = null;
    function resolveRequest() {
      if (currentRequest) return currentRequest;
      var store = requestStorage.getStore();
      return store ? store : null;
    }
    function pingTask(request, task) {
      request.pingedTasks.push(task);
      1 === request.pingedTasks.length && (request.flushScheduled = null !== request.destination, null !== request.trackedPostpones || 10 === request.status ? scheduleMicrotask(function() {
        return performWork(request);
      }) : setImmediate(function() {
        return performWork(request);
      }));
    }
    function createSuspenseBoundary(request, row, fallbackAbortableTasks, preamble, defer) {
      fallbackAbortableTasks = {
        status: 0,
        rootSegmentID: -1,
        parentFlushed: false,
        pendingTasks: 0,
        row,
        completedSegments: [],
        byteSize: 0,
        defer,
        fallbackAbortableTasks,
        errorDigest: null,
        contentState: createHoistableState(),
        fallbackState: createHoistableState(),
        preamble,
        tracked: null
      };
      null !== row && (row.pendingTasks++, preamble = row.boundaries, null !== preamble && (request.allPendingTasks++, fallbackAbortableTasks.pendingTasks++, preamble.push(fallbackAbortableTasks)), request = row.inheritedHoistables, null !== request && hoistHoistables(fallbackAbortableTasks.contentState, request));
      return fallbackAbortableTasks;
    }
    function createRenderTask(request, thenableState2, node, childIndex, blockedBoundary, blockedSegment, blockedPreamble, hoistableState, abortSet, keyPath, formatContext, context, treeContext, row, componentStack) {
      request.allPendingTasks++;
      null === blockedBoundary ? request.pendingRootTasks++ : blockedBoundary.pendingTasks++;
      null !== row && row.pendingTasks++;
      var task = {
        replay: null,
        node,
        childIndex,
        ping: {
          resolve: function() {
            return pingTask(request, task);
          },
          reject: function(error) {
            request.aborted ? task.abortSet.delete(task) && finishAbortedTask(task, request, error) : pingTask(request, task);
          }
        },
        blockedBoundary,
        blockedSegment,
        blockedPreamble,
        hoistableState,
        abortSet,
        keyPath,
        formatContext,
        context,
        treeContext,
        row,
        componentStack,
        thenableState: thenableState2
      };
      abortSet.add(task);
      return task;
    }
    function createReplayTask(request, thenableState2, replay, node, childIndex, blockedBoundary, hoistableState, abortSet, keyPath, formatContext, context, treeContext, row, componentStack) {
      request.allPendingTasks++;
      null === blockedBoundary ? request.pendingRootTasks++ : blockedBoundary.pendingTasks++;
      null !== row && row.pendingTasks++;
      replay.pendingTasks++;
      var task = {
        replay,
        node,
        childIndex,
        ping: {
          resolve: function() {
            return pingTask(request, task);
          },
          reject: function(error) {
            request.aborted ? task.abortSet.delete(task) && finishAbortedTask(task, request, error) : pingTask(request, task);
          }
        },
        blockedBoundary,
        blockedSegment: null,
        blockedPreamble: null,
        hoistableState,
        abortSet,
        keyPath,
        formatContext,
        context,
        treeContext,
        row,
        componentStack,
        thenableState: thenableState2
      };
      abortSet.add(task);
      return task;
    }
    function createPendingSegment(request, index, boundary, parentFormatContext, lastPushedText, textEmbedded) {
      return {
        status: 0,
        parentFlushed: false,
        id: -1,
        index,
        chunks: [],
        children: [],
        preambleChildren: [],
        parentFormatContext,
        boundary,
        lastPushedText,
        textEmbedded
      };
    }
    function pushComponentStack(task) {
      var node = task.node;
      if ("object" === typeof node && null !== node)
        switch (node.$$typeof) {
          case REACT_ELEMENT_TYPE:
            task.componentStack = { parent: task.componentStack, type: node.type };
        }
    }
    function replaceSuspenseComponentStackWithSuspenseFallbackStack(componentStack) {
      return null === componentStack ? null : { parent: componentStack.parent, type: "Suspense Fallback" };
    }
    function getThrownInfo(node$jscomp$0) {
      var errorInfo = {};
      node$jscomp$0 && Object.defineProperty(errorInfo, "componentStack", {
        configurable: true,
        enumerable: true,
        get: function() {
          try {
            var info = "", node = node$jscomp$0;
            do
              info += describeComponentStackByType(node.type), node = node.parent;
            while (node);
            var JSCompiler_inline_result = info;
          } catch (x) {
            JSCompiler_inline_result = "\nError generating stack: " + x.message + "\n" + x.stack;
          }
          Object.defineProperty(errorInfo, "componentStack", {
            value: JSCompiler_inline_result
          });
          return JSCompiler_inline_result;
        }
      });
      return errorInfo;
    }
    function logRecoverableError(request, error, errorInfo) {
      if (isRecoverableError(error))
        return request = request.onBrowserBailout, request(error, errorInfo), "";
      request = request.onError;
      error = request(error, errorInfo);
      if (null == error || "string" === typeof error)
        return "" === error ? void 0 : error;
    }
    function fatalError(request, error) {
      var onShellError = request.onShellError, onFatalError = request.onFatalError;
      0 !== request.pendingRootTasks && onShellError(error);
      onFatalError(error);
      endRenderLifetime(request);
      null !== request.destination ? (request.status = 13, request.destination.destroy(error)) : (request.status = 12, request.aborted || (request.fatalError = error));
    }
    function finishSuspenseListRow(request, row) {
      unblockSuspenseListRow(request, row.next, row.hoistables);
    }
    function unblockSuspenseListRow(request, unblockedRow, inheritedHoistables) {
      for (; null !== unblockedRow; ) {
        null !== inheritedHoistables && (hoistHoistables(unblockedRow.hoistables, inheritedHoistables), unblockedRow.inheritedHoistables = inheritedHoistables);
        var unblockedBoundaries = unblockedRow.boundaries;
        if (null !== unblockedBoundaries) {
          unblockedRow.boundaries = null;
          for (var i = 0; i < unblockedBoundaries.length; i++) {
            var unblockedBoundary = unblockedBoundaries[i];
            null !== inheritedHoistables && hoistHoistables(unblockedBoundary.contentState, inheritedHoistables);
            finishedTask(request, unblockedBoundary, null, null);
          }
        }
        unblockedRow.pendingTasks--;
        if (0 < unblockedRow.pendingTasks) break;
        inheritedHoistables = unblockedRow.hoistables;
        unblockedRow = unblockedRow.next;
      }
    }
    function tryToResolveTogetherRow(request, togetherRow) {
      var boundaries = togetherRow.boundaries;
      if (null !== boundaries && togetherRow.pendingTasks === boundaries.length) {
        for (var allCompleteAndInlinable = true, i = 0; i < boundaries.length; i++) {
          var rowBoundary = boundaries[i];
          if (1 !== rowBoundary.pendingTasks || rowBoundary.parentFlushed || isEligibleForOutlining(request, rowBoundary)) {
            allCompleteAndInlinable = false;
            break;
          }
        }
        allCompleteAndInlinable && unblockSuspenseListRow(request, togetherRow, togetherRow.hoistables);
      }
    }
    function createSuspenseListRow(previousRow) {
      var newRow = {
        pendingTasks: 1,
        boundaries: null,
        hoistables: createHoistableState(),
        inheritedHoistables: null,
        together: false,
        next: null
      };
      null !== previousRow && 0 < previousRow.pendingTasks && (newRow.pendingTasks++, newRow.boundaries = [], previousRow.next = newRow);
      return newRow;
    }
    function renderSuspenseListRows(request, task, keyPath, rows, revealOrder) {
      var prevKeyPath = task.keyPath, prevTreeContext = task.treeContext, prevRow = task.row;
      task.keyPath = keyPath;
      keyPath = rows.length;
      var previousSuspenseListRow = null;
      if (null !== task.replay) {
        var resumeSlots = task.replay.slots;
        if (null !== resumeSlots && "object" === typeof resumeSlots)
          for (var n = 0; n < keyPath; n++) {
            var i = "backwards" !== revealOrder && "unstable_legacy-backwards" !== revealOrder ? n : keyPath - 1 - n, node = rows[i];
            task.row = previousSuspenseListRow = createSuspenseListRow(
              previousSuspenseListRow
            );
            task.treeContext = pushTreeContext(prevTreeContext, keyPath, i);
            var resumeSegmentID = resumeSlots[i];
            "number" === typeof resumeSegmentID ? (resumeNode(request, task, resumeSegmentID, node, i), delete resumeSlots[i]) : renderNode(request, task, node, i);
            0 === --previousSuspenseListRow.pendingTasks && finishSuspenseListRow(request, previousSuspenseListRow);
          }
        else
          for (resumeSlots = 0; resumeSlots < keyPath; resumeSlots++)
            n = "backwards" !== revealOrder && "unstable_legacy-backwards" !== revealOrder ? resumeSlots : keyPath - 1 - resumeSlots, i = rows[n], task.row = previousSuspenseListRow = createSuspenseListRow(previousSuspenseListRow), task.treeContext = pushTreeContext(prevTreeContext, keyPath, n), renderNode(request, task, i, n), 0 === --previousSuspenseListRow.pendingTasks && finishSuspenseListRow(request, previousSuspenseListRow);
      } else if ("backwards" !== revealOrder && "unstable_legacy-backwards" !== revealOrder)
        for (revealOrder = 0; revealOrder < keyPath; revealOrder++)
          resumeSlots = rows[revealOrder], task.row = previousSuspenseListRow = createSuspenseListRow(previousSuspenseListRow), task.treeContext = pushTreeContext(
            prevTreeContext,
            keyPath,
            revealOrder
          ), renderNode(request, task, resumeSlots, revealOrder), 0 === --previousSuspenseListRow.pendingTasks && finishSuspenseListRow(request, previousSuspenseListRow);
      else {
        resumeSlots = task.blockedSegment;
        n = resumeSlots.children.length;
        i = resumeSlots.chunks.length;
        for (node = 0; node < keyPath; node++) {
          resumeSegmentID = "unstable_legacy-backwards" === revealOrder ? keyPath - 1 - node : node;
          var node$40 = rows[resumeSegmentID];
          task.row = previousSuspenseListRow = createSuspenseListRow(
            previousSuspenseListRow
          );
          task.treeContext = pushTreeContext(
            prevTreeContext,
            keyPath,
            resumeSegmentID
          );
          var newSegment = createPendingSegment(
            request,
            i,
            null,
            task.formatContext,
            0 === resumeSegmentID ? resumeSlots.lastPushedText : true,
            true
          );
          resumeSlots.children.splice(n, 0, newSegment);
          task.blockedSegment = newSegment;
          try {
            renderNode(request, task, node$40, resumeSegmentID), newSegment.lastPushedText && newSegment.textEmbedded && newSegment.chunks.push(textSeparator), newSegment.status = 1, finishedSegment(request, task.blockedBoundary, newSegment), 0 === --previousSuspenseListRow.pendingTasks && finishSuspenseListRow(request, previousSuspenseListRow);
          } catch (thrownValue) {
            throw newSegment.status = request.aborted ? 3 : 4, thrownValue;
          }
        }
        task.blockedSegment = resumeSlots;
        resumeSlots.lastPushedText = false;
      }
      null !== prevRow && null !== previousSuspenseListRow && 0 < previousSuspenseListRow.pendingTasks && (prevRow.pendingTasks++, previousSuspenseListRow.next = prevRow);
      task.treeContext = prevTreeContext;
      task.row = prevRow;
      task.keyPath = prevKeyPath;
    }
    function renderWithHooks(request, task, keyPath, Component, props, secondArg) {
      var prevThenableState = task.thenableState;
      task.thenableState = null;
      currentlyRenderingComponent = {};
      currentlyRenderingTask = task;
      currentlyRenderingRequest = request;
      currentlyRenderingKeyPath = keyPath;
      actionStateCounter = localIdCounter = 0;
      actionStateMatchingIndex = -1;
      thenableIndexCounter = 0;
      thenableState = prevThenableState;
      for (request = Component(props, secondArg); didScheduleRenderPhaseUpdate; )
        didScheduleRenderPhaseUpdate = false, actionStateCounter = localIdCounter = 0, actionStateMatchingIndex = -1, thenableIndexCounter = 0, numberOfReRenders += 1, workInProgressHook = null, request = Component(props, secondArg);
      resetHooksState();
      return request;
    }
    function finishFunctionComponent(request, task, keyPath, children, hasId, actionStateCount, actionStateMatchingIndex2) {
      var didEmitActionStateMarkers = false;
      if (0 !== actionStateCount && null !== request.formState) {
        var segment = task.blockedSegment;
        if (null !== segment) {
          didEmitActionStateMarkers = true;
          segment = segment.chunks;
          for (var i = 0; i < actionStateCount; i++)
            i === actionStateMatchingIndex2 ? segment.push(formStateMarkerIsMatching) : segment.push(formStateMarkerIsNotMatching);
        }
      }
      actionStateCount = task.keyPath;
      task.keyPath = keyPath;
      hasId ? (keyPath = task.treeContext, task.treeContext = pushTreeContext(keyPath, 1, 0), renderNode(request, task, children, -1), task.treeContext = keyPath) : didEmitActionStateMarkers ? renderNode(request, task, children, -1) : renderNodeDestructive(request, task, children, -1);
      task.keyPath = actionStateCount;
    }
    function renderElement(request, task, keyPath, type, props, ref) {
      if ("function" === typeof type)
        if (type.prototype && type.prototype.isReactComponent) {
          var newProps = props;
          if ("ref" in props) {
            newProps = {};
            for (var propName in props)
              "ref" !== propName && (newProps[propName] = props[propName]);
          }
          var defaultProps = type.defaultProps;
          if (defaultProps) {
            newProps === props && (newProps = assign({}, newProps, props));
            for (var propName$45 in defaultProps)
              void 0 === newProps[propName$45] && (newProps[propName$45] = defaultProps[propName$45]);
          }
          var JSCompiler_inline_result = newProps;
          var context = emptyContextObject, contextType = type.contextType;
          "object" === typeof contextType && null !== contextType && (context = contextType._currentValue);
          var JSCompiler_inline_result$jscomp$0 = new type(
            JSCompiler_inline_result,
            context
          );
          var initialState = void 0 !== JSCompiler_inline_result$jscomp$0.state ? JSCompiler_inline_result$jscomp$0.state : null;
          JSCompiler_inline_result$jscomp$0.updater = classComponentUpdater;
          JSCompiler_inline_result$jscomp$0.props = JSCompiler_inline_result;
          JSCompiler_inline_result$jscomp$0.state = initialState;
          var internalInstance = { queue: [], replace: false };
          JSCompiler_inline_result$jscomp$0._reactInternals = internalInstance;
          var contextType$jscomp$0 = type.contextType;
          JSCompiler_inline_result$jscomp$0.context = "object" === typeof contextType$jscomp$0 && null !== contextType$jscomp$0 ? contextType$jscomp$0._currentValue : emptyContextObject;
          var getDerivedStateFromProps = type.getDerivedStateFromProps;
          if ("function" === typeof getDerivedStateFromProps) {
            var partialState = getDerivedStateFromProps(
              JSCompiler_inline_result,
              initialState
            );
            var JSCompiler_inline_result$jscomp$1 = null === partialState || void 0 === partialState ? initialState : assign({}, initialState, partialState);
            JSCompiler_inline_result$jscomp$0.state = JSCompiler_inline_result$jscomp$1;
          }
          if ("function" !== typeof type.getDerivedStateFromProps && "function" !== typeof JSCompiler_inline_result$jscomp$0.getSnapshotBeforeUpdate && ("function" === typeof JSCompiler_inline_result$jscomp$0.UNSAFE_componentWillMount || "function" === typeof JSCompiler_inline_result$jscomp$0.componentWillMount)) {
            var oldState = JSCompiler_inline_result$jscomp$0.state;
            "function" === typeof JSCompiler_inline_result$jscomp$0.componentWillMount && JSCompiler_inline_result$jscomp$0.componentWillMount();
            "function" === typeof JSCompiler_inline_result$jscomp$0.UNSAFE_componentWillMount && JSCompiler_inline_result$jscomp$0.UNSAFE_componentWillMount();
            oldState !== JSCompiler_inline_result$jscomp$0.state && classComponentUpdater.enqueueReplaceState(
              JSCompiler_inline_result$jscomp$0,
              JSCompiler_inline_result$jscomp$0.state,
              null
            );
            if (null !== internalInstance.queue && 0 < internalInstance.queue.length) {
              var oldQueue = internalInstance.queue, oldReplace = internalInstance.replace;
              internalInstance.queue = null;
              internalInstance.replace = false;
              if (oldReplace && 1 === oldQueue.length)
                JSCompiler_inline_result$jscomp$0.state = oldQueue[0];
              else {
                for (var nextState = oldReplace ? oldQueue[0] : JSCompiler_inline_result$jscomp$0.state, dontMutate = true, i = oldReplace ? 1 : 0; i < oldQueue.length; i++) {
                  var partial = oldQueue[i], partialState$jscomp$0 = "function" === typeof partial ? partial.call(
                    JSCompiler_inline_result$jscomp$0,
                    nextState,
                    JSCompiler_inline_result,
                    void 0
                  ) : partial;
                  null != partialState$jscomp$0 && (dontMutate ? (dontMutate = false, nextState = assign({}, nextState, partialState$jscomp$0)) : assign(nextState, partialState$jscomp$0));
                }
                JSCompiler_inline_result$jscomp$0.state = nextState;
              }
            } else internalInstance.queue = null;
          }
          var nextChildren = JSCompiler_inline_result$jscomp$0.render();
          if (request.aborted) throw null;
          var prevKeyPath = task.keyPath;
          task.keyPath = keyPath;
          renderNodeDestructive(request, task, nextChildren, -1);
          task.keyPath = prevKeyPath;
        } else {
          var value = renderWithHooks(request, task, keyPath, type, props, void 0);
          if (request.aborted) throw null;
          finishFunctionComponent(
            request,
            task,
            keyPath,
            value,
            0 !== localIdCounter,
            actionStateCounter,
            actionStateMatchingIndex
          );
        }
      else if ("string" === typeof type) {
        var segment = task.blockedSegment;
        if (null === segment) {
          var children = props.children, prevContext = task.formatContext, prevKeyPath$jscomp$0 = task.keyPath;
          task.formatContext = getChildFormatContext(prevContext, type, props);
          task.keyPath = keyPath;
          renderNode(request, task, children, -1);
          task.formatContext = prevContext;
          task.keyPath = prevKeyPath$jscomp$0;
        } else {
          var children$42 = pushStartInstance(
            segment.chunks,
            type,
            props,
            request.resumableState,
            request.renderState,
            task.blockedPreamble,
            task.hoistableState,
            task.formatContext,
            segment.lastPushedText
          );
          segment.lastPushedText = false;
          var prevContext$43 = task.formatContext, prevKeyPath$44 = task.keyPath;
          task.keyPath = keyPath;
          if (3 === (task.formatContext = getChildFormatContext(
            prevContext$43,
            type,
            props
          )).insertionMode) {
            var preambleSegment = createPendingSegment(
              request,
              0,
              null,
              task.formatContext,
              false,
              false
            );
            segment.preambleChildren.push(preambleSegment);
            task.blockedSegment = preambleSegment;
            try {
              renderNode(request, task, children$42, -1), preambleSegment.lastPushedText && preambleSegment.textEmbedded && preambleSegment.chunks.push(textSeparator), preambleSegment.status = 1, finishedSegment(request, task.blockedBoundary, preambleSegment);
            } finally {
              task.blockedSegment = segment;
            }
          } else renderNode(request, task, children$42, -1);
          task.formatContext = prevContext$43;
          task.keyPath = prevKeyPath$44;
          a: {
            var target = segment.chunks, resumableState = request.resumableState;
            switch (type) {
              case "title":
              case "style":
              case "script":
              case "area":
              case "base":
              case "br":
              case "col":
              case "embed":
              case "hr":
              case "img":
              case "input":
              case "keygen":
              case "link":
              case "meta":
              case "param":
              case "source":
              case "track":
              case "wbr":
                break a;
              case "body":
                if (1 >= prevContext$43.insertionMode) {
                  resumableState.hasBody = true;
                  break a;
                }
                break;
              case "html":
                if (0 === prevContext$43.insertionMode) {
                  resumableState.hasHtml = true;
                  break a;
                }
                break;
              case "head":
                if (1 >= prevContext$43.insertionMode) break a;
            }
            target.push(endChunkForTag(type));
          }
          segment.lastPushedText = false;
        }
      } else {
        switch (type) {
          case REACT_LEGACY_HIDDEN_TYPE:
          case REACT_STRICT_MODE_TYPE:
          case REACT_PROFILER_TYPE:
          case REACT_FRAGMENT_TYPE:
            var prevKeyPath$jscomp$1 = task.keyPath;
            task.keyPath = keyPath;
            renderNodeDestructive(request, task, props.children, -1);
            task.keyPath = prevKeyPath$jscomp$1;
            return;
          case REACT_ACTIVITY_TYPE:
            var segment$jscomp$0 = task.blockedSegment;
            if (null === segment$jscomp$0) {
              if ("hidden" !== props.mode) {
                var prevKeyPath$jscomp$2 = task.keyPath;
                task.keyPath = keyPath;
                renderNode(request, task, props.children, -1);
                task.keyPath = prevKeyPath$jscomp$2;
              }
            } else if ("hidden" !== props.mode) {
              segment$jscomp$0.chunks.push(startActivityBoundary);
              segment$jscomp$0.lastPushedText = false;
              var prevKeyPath$47 = task.keyPath;
              task.keyPath = keyPath;
              renderNode(request, task, props.children, -1);
              task.keyPath = prevKeyPath$47;
              segment$jscomp$0.chunks.push(endActivityBoundary);
              segment$jscomp$0.lastPushedText = false;
            }
            return;
          case REACT_SUSPENSE_LIST_TYPE:
            a: {
              var children$jscomp$0 = props.children, revealOrder = props.revealOrder;
              if ("independent" !== revealOrder && "together" !== revealOrder) {
                if (isArrayImpl(children$jscomp$0)) {
                  renderSuspenseListRows(
                    request,
                    task,
                    keyPath,
                    children$jscomp$0,
                    revealOrder
                  );
                  break a;
                }
                var iteratorFn = getIteratorFn(children$jscomp$0);
                if (iteratorFn) {
                  var iterator = iteratorFn.call(children$jscomp$0);
                  if (iterator) {
                    var step = iterator.next();
                    if (!step.done) {
                      do
                        step = iterator.next();
                      while (!step.done);
                      renderSuspenseListRows(
                        request,
                        task,
                        keyPath,
                        children$jscomp$0,
                        revealOrder
                      );
                    }
                    break a;
                  }
                }
              }
              if ("together" === revealOrder) {
                var prevKeyPath$41 = task.keyPath, prevRow = task.row, newRow = task.row = createSuspenseListRow(null);
                newRow.boundaries = [];
                newRow.together = true;
                task.keyPath = keyPath;
                renderNodeDestructive(request, task, children$jscomp$0, -1);
                0 === --newRow.pendingTasks && finishSuspenseListRow(request, newRow);
                task.keyPath = prevKeyPath$41;
                task.row = prevRow;
                null !== prevRow && 0 < newRow.pendingTasks && (prevRow.pendingTasks++, newRow.next = prevRow);
              } else {
                var prevKeyPath$jscomp$3 = task.keyPath;
                task.keyPath = keyPath;
                renderNodeDestructive(request, task, children$jscomp$0, -1);
                task.keyPath = prevKeyPath$jscomp$3;
              }
            }
            return;
          case REACT_VIEW_TRANSITION_TYPE:
            var prevContext$jscomp$0 = task.formatContext, prevKeyPath$jscomp$4 = task.keyPath;
            var resumableState$jscomp$0 = request.resumableState;
            if (null != props.name && "auto" !== props.name)
              var JSCompiler_inline_result$jscomp$2 = props.name;
            else {
              var treeId = getTreeId(task.treeContext);
              JSCompiler_inline_result$jscomp$2 = makeId(
                resumableState$jscomp$0,
                treeId,
                0
              );
            }
            var autoName = JSCompiler_inline_result$jscomp$2, resumableState$jscomp$1 = request.resumableState, update = getViewTransitionClassName(props.default, props.update), enter = getViewTransitionClassName(props.default, props.enter), exit = getViewTransitionClassName(props.default, props.exit), share = getViewTransitionClassName(props.default, props.share), name = props.name;
            null == update && (update = "auto");
            null == enter && (enter = "auto");
            null == exit && (exit = "auto");
            if (null == name) {
              var parentViewTransition = prevContext$jscomp$0.viewTransition;
              null !== parentViewTransition ? (name = parentViewTransition.name, share = parentViewTransition.share) : (name = "auto", share = "none");
            } else
              null == share && (share = "auto"), prevContext$jscomp$0.tagScope & 4 && (resumableState$jscomp$1.instructions |= 128);
            prevContext$jscomp$0.tagScope & 8 ? resumableState$jscomp$1.instructions |= 128 : exit = "none";
            prevContext$jscomp$0.tagScope & 16 ? resumableState$jscomp$1.instructions |= 128 : enter = "none";
            var viewTransition = {
              update,
              enter,
              exit,
              share,
              parentEnter: "none",
              parentExit: "none",
              name,
              autoName,
              nameIdx: 0
            }, subtreeScope = prevContext$jscomp$0.tagScope & -25;
            subtreeScope = "none" !== update ? subtreeScope | 32 : subtreeScope & -33;
            "none" !== enter && (subtreeScope |= 64);
            var JSCompiler_inline_result$jscomp$3 = createFormatContext(
              prevContext$jscomp$0.insertionMode,
              prevContext$jscomp$0.selectedValue,
              subtreeScope,
              viewTransition
            );
            task.formatContext = JSCompiler_inline_result$jscomp$3;
            task.keyPath = keyPath;
            if (null != props.name && "auto" !== props.name)
              renderNodeDestructive(request, task, props.children, -1);
            else {
              var prevTreeContext = task.treeContext;
              task.treeContext = pushTreeContext(prevTreeContext, 1, 0);
              renderNode(request, task, props.children, -1);
              task.treeContext = prevTreeContext;
            }
            task.formatContext = prevContext$jscomp$0;
            task.keyPath = prevKeyPath$jscomp$4;
            return;
          case REACT_SCOPE_TYPE:
            throw Error("ReactDOMServer does not yet support scope components.");
          case REACT_SUSPENSE_TYPE:
            a: if (null !== task.replay) {
              var prevKeyPath$27 = task.keyPath, prevContext$28 = task.formatContext, prevRow$29 = task.row;
              task.keyPath = keyPath;
              task.formatContext = getSuspenseContentFormatContext(
                request.resumableState,
                prevContext$28
              );
              task.row = null;
              var content$30 = props.children;
              try {
                renderNode(request, task, content$30, -1);
              } finally {
                task.keyPath = prevKeyPath$27, task.formatContext = prevContext$28, task.row = prevRow$29;
              }
            } else {
              var prevKeyPath$jscomp$5 = task.keyPath, prevContext$jscomp$1 = task.formatContext, prevRow$jscomp$0 = task.row, parentBoundary = task.blockedBoundary, parentPreamble = task.blockedPreamble, parentHoistableState = task.hoistableState, parentSegment = task.blockedSegment, fallback = props.fallback, content = props.children, fallbackAbortSet = /* @__PURE__ */ new Set(), newBoundary = createSuspenseBoundary(
                request,
                task.row,
                fallbackAbortSet,
                2 > task.formatContext.insertionMode ? {
                  content: createPreambleState(),
                  fallback: createPreambleState()
                } : null,
                false
              ), boundarySegment = createPendingSegment(
                request,
                parentSegment.chunks.length,
                newBoundary,
                task.formatContext,
                false,
                false
              );
              parentSegment.children.push(boundarySegment);
              parentSegment.lastPushedText = false;
              var contentRootSegment = createPendingSegment(
                request,
                0,
                null,
                task.formatContext,
                false,
                false
              );
              contentRootSegment.parentFlushed = true;
              var trackedPostpones = request.trackedPostpones;
              if (null !== trackedPostpones) {
                var suspenseComponentStack = task.componentStack, fallbackKeyPath = [keyPath[0], "Suspense Fallback", keyPath[2]];
                if (null !== trackedPostpones) {
                  var fallbackReplayNode = [
                    fallbackKeyPath[1],
                    fallbackKeyPath[2],
                    [],
                    null
                  ];
                  trackedPostpones.workingMap.set(
                    fallbackKeyPath,
                    fallbackReplayNode
                  );
                  newBoundary.tracked = {
                    contentKeyPath: keyPath,
                    fallbackNode: fallbackReplayNode
                  };
                }
                task.blockedSegment = boundarySegment;
                task.blockedPreamble = null === newBoundary.preamble ? null : newBoundary.preamble.fallback;
                task.keyPath = fallbackKeyPath;
                task.formatContext = getSuspenseFallbackFormatContext(
                  request.resumableState,
                  prevContext$jscomp$1
                );
                task.componentStack = replaceSuspenseComponentStackWithSuspenseFallbackStack(
                  suspenseComponentStack
                );
                try {
                  renderNode(request, task, fallback, -1), boundarySegment.lastPushedText && boundarySegment.textEmbedded && boundarySegment.chunks.push(textSeparator), boundarySegment.status = 1, finishedSegment(request, parentBoundary, boundarySegment);
                } catch (thrownValue) {
                  throw boundarySegment.status = request.aborted ? 3 : 4, thrownValue;
                } finally {
                  task.blockedSegment = parentSegment, task.blockedPreamble = parentPreamble, task.keyPath = prevKeyPath$jscomp$5, task.formatContext = prevContext$jscomp$1;
                }
                var suspendedPrimaryTask = createRenderTask(
                  request,
                  null,
                  content,
                  -1,
                  newBoundary,
                  contentRootSegment,
                  null === newBoundary.preamble ? null : newBoundary.preamble.content,
                  newBoundary.contentState,
                  task.abortSet,
                  keyPath,
                  getSuspenseContentFormatContext(
                    request.resumableState,
                    task.formatContext
                  ),
                  task.context,
                  task.treeContext,
                  null,
                  suspenseComponentStack
                );
                pushComponentStack(suspendedPrimaryTask);
                request.pingedTasks.push(suspendedPrimaryTask);
              } else {
                task.blockedBoundary = newBoundary;
                task.blockedPreamble = null === newBoundary.preamble ? null : newBoundary.preamble.content;
                task.hoistableState = newBoundary.contentState;
                task.blockedSegment = contentRootSegment;
                task.keyPath = keyPath;
                task.formatContext = getSuspenseContentFormatContext(
                  request.resumableState,
                  prevContext$jscomp$1
                );
                task.row = null;
                try {
                  if (renderNode(request, task, content, -1), contentRootSegment.lastPushedText && contentRootSegment.textEmbedded && contentRootSegment.chunks.push(textSeparator), contentRootSegment.status = 1, finishedSegment(request, newBoundary, contentRootSegment), queueCompletedSegment(newBoundary, contentRootSegment), 0 === newBoundary.pendingTasks && 0 === newBoundary.status) {
                    if (newBoundary.status = 1, !isEligibleForOutlining(request, newBoundary)) {
                      null !== prevRow$jscomp$0 && 0 === --prevRow$jscomp$0.pendingTasks && finishSuspenseListRow(request, prevRow$jscomp$0);
                      0 === request.pendingRootTasks && task.blockedPreamble && preparePreamble(request);
                      break a;
                    }
                  } else
                    null !== prevRow$jscomp$0 && prevRow$jscomp$0.together && tryToResolveTogetherRow(request, prevRow$jscomp$0);
                } catch (thrownValue$31) {
                  newBoundary.status = 4;
                  if (request.aborted) {
                    contentRootSegment.status = 3;
                    var error = request.fatalError;
                  } else contentRootSegment.status = 4, error = thrownValue$31;
                  var thrownInfo = getThrownInfo(task.componentStack), errorDigest = logRecoverableError(request, error, thrownInfo);
                  newBoundary.errorDigest = errorDigest;
                  untrackBoundary(request, newBoundary);
                } finally {
                  task.blockedBoundary = parentBoundary, task.blockedPreamble = parentPreamble, task.hoistableState = parentHoistableState, task.blockedSegment = parentSegment, task.keyPath = prevKeyPath$jscomp$5, task.formatContext = prevContext$jscomp$1, task.row = prevRow$jscomp$0;
                }
                var suspendedFallbackTask = createRenderTask(
                  request,
                  null,
                  fallback,
                  -1,
                  parentBoundary,
                  boundarySegment,
                  null === newBoundary.preamble ? null : newBoundary.preamble.fallback,
                  newBoundary.fallbackState,
                  fallbackAbortSet,
                  [keyPath[0], "Suspense Fallback", keyPath[2]],
                  getSuspenseFallbackFormatContext(
                    request.resumableState,
                    task.formatContext
                  ),
                  task.context,
                  task.treeContext,
                  task.row,
                  replaceSuspenseComponentStackWithSuspenseFallbackStack(
                    task.componentStack
                  )
                );
                pushComponentStack(suspendedFallbackTask);
                request.pingedTasks.push(suspendedFallbackTask);
              }
            }
            return;
        }
        if ("object" === typeof type && null !== type)
          switch (type.$$typeof) {
            case REACT_FORWARD_REF_TYPE:
              if ("ref" in props) {
                var propsWithoutRef = {};
                for (var key in props)
                  "ref" !== key && (propsWithoutRef[key] = props[key]);
              } else propsWithoutRef = props;
              var children$jscomp$1 = renderWithHooks(
                request,
                task,
                keyPath,
                type.render,
                propsWithoutRef,
                ref
              );
              finishFunctionComponent(
                request,
                task,
                keyPath,
                children$jscomp$1,
                0 !== localIdCounter,
                actionStateCounter,
                actionStateMatchingIndex
              );
              return;
            case REACT_MEMO_TYPE:
              renderElement(request, task, keyPath, type.type, props, ref);
              return;
            case REACT_CONTEXT_TYPE:
              var children$jscomp$2 = props.children, prevKeyPath$jscomp$6 = task.keyPath, nextValue = props.value;
              var prevValue = type._currentValue;
              type._currentValue = nextValue;
              var prevNode = currentActiveSnapshot, newNode = {
                parent: prevNode,
                depth: null === prevNode ? 0 : prevNode.depth + 1,
                context: type,
                parentValue: prevValue,
                value: nextValue
              };
              currentActiveSnapshot = newNode;
              task.context = newNode;
              task.keyPath = keyPath;
              renderNodeDestructive(request, task, children$jscomp$2, -1);
              var prevSnapshot = currentActiveSnapshot;
              if (null === prevSnapshot)
                throw Error(
                  "Tried to pop a Context at the root of the app. This is a bug in React."
                );
              prevSnapshot.context._currentValue = prevSnapshot.parentValue;
              var JSCompiler_inline_result$jscomp$4 = currentActiveSnapshot = prevSnapshot.parent;
              task.context = JSCompiler_inline_result$jscomp$4;
              task.keyPath = prevKeyPath$jscomp$6;
              return;
            case REACT_CONSUMER_TYPE:
              var render = props.children, newChildren = render(type._context._currentValue), prevKeyPath$jscomp$7 = task.keyPath;
              task.keyPath = keyPath;
              renderNodeDestructive(request, task, newChildren, -1);
              task.keyPath = prevKeyPath$jscomp$7;
              return;
            case REACT_LAZY_TYPE:
              var init = type._init;
              var Component = init(type._payload);
              if (request.aborted) throw null;
              renderElement(request, task, keyPath, Component, props, ref);
              return;
          }
        throw Error(
          "Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: " + ((null == type ? type : typeof type) + ".")
        );
      }
    }
    function resumeNode(request, task, segmentId, node, childIndex) {
      var prevReplay = task.replay, blockedBoundary = task.blockedBoundary, resumedSegment = createPendingSegment(
        request,
        0,
        null,
        task.formatContext,
        false,
        false
      );
      resumedSegment.id = segmentId;
      resumedSegment.parentFlushed = true;
      try {
        task.replay = null, task.blockedSegment = resumedSegment, renderNode(request, task, node, childIndex), resumedSegment.status = 1, finishedSegment(request, blockedBoundary, resumedSegment), null === blockedBoundary ? request.completedRootSegment = resumedSegment : (queueCompletedSegment(blockedBoundary, resumedSegment), blockedBoundary.parentFlushed && request.partialBoundaries.push(blockedBoundary));
      } finally {
        task.replay = prevReplay, task.blockedSegment = null;
      }
    }
    function renderNodeDestructive(request, task, node, childIndex) {
      null !== task.replay && "number" === typeof task.replay.slots ? resumeNode(request, task, task.replay.slots, node, childIndex) : (task.node = node, task.childIndex = childIndex, node = task.componentStack, pushComponentStack(task), retryNode(request, task), task.componentStack = node);
    }
    function retryNode(request, task) {
      var node = task.node, childIndex = task.childIndex;
      if (null !== node) {
        if ("object" === typeof node) {
          switch (node.$$typeof) {
            case REACT_ELEMENT_TYPE:
              var type = node.type, key = node.key, props = node.props;
              node = props.ref;
              var ref = void 0 !== node ? node : null, name = getComponentNameFromType(type), keyOrIndex = null == key || key === REACT_OPTIMISTIC_KEY ? -1 === childIndex ? 0 : childIndex : key;
              key = [task.keyPath, name, keyOrIndex];
              if (null !== task.replay)
                a: {
                  var replay = task.replay;
                  childIndex = replay.nodes;
                  for (node = 0; node < childIndex.length; node++) {
                    var node$jscomp$0 = childIndex[node];
                    if (keyOrIndex === node$jscomp$0[1]) {
                      if (4 === node$jscomp$0.length) {
                        if (null !== name && name !== node$jscomp$0[0])
                          throw Error(
                            "Expected the resume to render <" + node$jscomp$0[0] + "> in this slot but instead it rendered <" + name + ">. The tree doesn't match so React will fallback to client rendering."
                          );
                        var childNodes = node$jscomp$0[2], childSlots = node$jscomp$0[3], currentNode = task.node;
                        task.replay = {
                          nodes: childNodes,
                          slots: childSlots,
                          pendingTasks: 1
                        };
                        try {
                          renderElement(request, task, key, type, props, ref);
                          if (1 === task.replay.pendingTasks && 0 < task.replay.nodes.length)
                            throw Error(
                              "Couldn't find all resumable slots by key/index during replaying. The tree doesn't match so React will fallback to client rendering."
                            );
                          task.replay.pendingTasks--;
                        } catch (x) {
                          if ("object" === typeof x && null !== x && (x === SuspenseException || "function" === typeof x.then || "Maximum call stack size exceeded" === x.message))
                            throw task.node === currentNode ? task.replay = replay : childIndex.splice(node, 1), x;
                          task.replay.pendingTasks--;
                          key = getThrownInfo(task.componentStack);
                          currentNode = request;
                          props = task.blockedBoundary;
                          request = request.aborted ? request.fatalError : x;
                          key = logRecoverableError(currentNode, request, key);
                          abortRemainingReplayNodes(
                            currentNode,
                            props,
                            childNodes,
                            childSlots,
                            request,
                            key
                          );
                        }
                        task.replay = replay;
                      } else {
                        if (type !== REACT_SUSPENSE_TYPE)
                          throw Error(
                            "Expected the resume to render <Suspense> in this slot but instead it rendered <" + (getComponentNameFromType(type) || "Unknown") + ">. The tree doesn't match so React will fallback to client rendering."
                          );
                        b: {
                          replay = node$jscomp$0[5];
                          type = node$jscomp$0[2];
                          ref = node$jscomp$0[3];
                          name = null === node$jscomp$0[4] ? [] : node$jscomp$0[4][2];
                          node$jscomp$0 = null === node$jscomp$0[4] ? null : node$jscomp$0[4][3];
                          keyOrIndex = task.keyPath;
                          var prevContext = task.formatContext, prevRow = task.row, previousReplaySet = task.replay, parentBoundary = task.blockedBoundary, parentHoistableState = task.hoistableState, content = props.children;
                          props = props.fallback;
                          var fallbackAbortSet = /* @__PURE__ */ new Set(), resumedBoundary = createSuspenseBoundary(
                            request,
                            task.row,
                            fallbackAbortSet,
                            2 > task.formatContext.insertionMode ? {
                              content: createPreambleState(),
                              fallback: createPreambleState()
                            } : null,
                            false
                          );
                          resumedBoundary.parentFlushed = true;
                          resumedBoundary.rootSegmentID = replay;
                          task.blockedBoundary = resumedBoundary;
                          task.hoistableState = resumedBoundary.contentState;
                          task.keyPath = key;
                          task.formatContext = getSuspenseContentFormatContext(
                            request.resumableState,
                            prevContext
                          );
                          task.row = null;
                          task.replay = {
                            nodes: type,
                            slots: ref,
                            pendingTasks: 1
                          };
                          try {
                            renderNode(request, task, content, -1);
                            if (1 === task.replay.pendingTasks && 0 < task.replay.nodes.length)
                              throw Error(
                                "Couldn't find all resumable slots by key/index during replaying. The tree doesn't match so React will fallback to client rendering."
                              );
                            task.replay.pendingTasks--;
                            if (0 === resumedBoundary.pendingTasks && 0 === resumedBoundary.status) {
                              resumedBoundary.status = 1;
                              request.completedBoundaries.push(resumedBoundary);
                              break b;
                            }
                          } catch (thrownValue) {
                            resumedBoundary.status = 4, childNodes = request.aborted ? request.fatalError : thrownValue, childSlots = getThrownInfo(task.componentStack), currentNode = logRecoverableError(
                              request,
                              childNodes,
                              childSlots
                            ), resumedBoundary.errorDigest = currentNode, task.replay.pendingTasks--, request.clientRenderedBoundaries.push(
                              resumedBoundary
                            );
                          } finally {
                            task.blockedBoundary = parentBoundary, task.hoistableState = parentHoistableState, task.replay = previousReplaySet, task.keyPath = keyOrIndex, task.formatContext = prevContext, task.row = prevRow;
                          }
                          childNodes = createReplayTask(
                            request,
                            null,
                            { nodes: name, slots: node$jscomp$0, pendingTasks: 0 },
                            props,
                            -1,
                            parentBoundary,
                            resumedBoundary.fallbackState,
                            fallbackAbortSet,
                            [key[0], "Suspense Fallback", key[2]],
                            getSuspenseFallbackFormatContext(
                              request.resumableState,
                              task.formatContext
                            ),
                            task.context,
                            task.treeContext,
                            task.row,
                            replaceSuspenseComponentStackWithSuspenseFallbackStack(
                              task.componentStack
                            )
                          );
                          pushComponentStack(childNodes);
                          request.pingedTasks.push(childNodes);
                        }
                      }
                      childIndex.splice(node, 1);
                      break a;
                    }
                  }
                }
              else renderElement(request, task, key, type, props, ref);
              return;
            case REACT_PORTAL_TYPE:
              throw Error(
                "Portals are not currently supported by the server renderer. Render them conditionally so that they only appear on the client render."
              );
            case REACT_LAZY_TYPE:
              childNodes = node._init;
              node = childNodes(node._payload);
              if (request.aborted) throw null;
              renderNodeDestructive(request, task, node, childIndex);
              return;
          }
          if (isArrayImpl(node)) {
            renderChildrenArray(request, task, node, childIndex);
            return;
          }
          if (childNodes = getIteratorFn(node)) {
            if (childNodes = childNodes.call(node)) {
              node = childNodes.next();
              if (!node.done) {
                childSlots = [];
                do
                  childSlots.push(node.value), node = childNodes.next();
                while (!node.done);
                renderChildrenArray(request, task, childSlots, childIndex);
              }
              return;
            }
          }
          if ("function" === typeof node.then)
            return task.thenableState = null, renderNodeDestructive(request, task, unwrapThenable(node), childIndex);
          if (node.$$typeof === REACT_CONTEXT_TYPE)
            return renderNodeDestructive(
              request,
              task,
              node._currentValue,
              childIndex
            );
          childIndex = Object.prototype.toString.call(node);
          throw Error(
            "Objects are not valid as a React child (found: " + ("[object Object]" === childIndex ? "object with keys {" + Object.keys(node).join(", ") + "}" : childIndex) + "). If you meant to render a collection of children, use an array instead."
          );
        }
        if ("string" === typeof node)
          childIndex = task.blockedSegment, null !== childIndex && (childIndex.lastPushedText = pushTextInstance(
            childIndex.chunks,
            node,
            request.renderState,
            childIndex.lastPushedText
          ));
        else if ("number" === typeof node || "bigint" === typeof node)
          childIndex = task.blockedSegment, null !== childIndex && (childIndex.lastPushedText = pushTextInstance(
            childIndex.chunks,
            "" + node,
            request.renderState,
            childIndex.lastPushedText
          ));
      }
    }
    function renderChildrenArray(request, task, children, childIndex) {
      var prevKeyPath = task.keyPath;
      if (-1 !== childIndex && (task.keyPath = [task.keyPath, "Fragment", childIndex], null !== task.replay)) {
        for (var replay = task.replay, replayNodes = replay.nodes, j = 0; j < replayNodes.length; j++) {
          var node = replayNodes[j];
          if (node[1] === childIndex) {
            childIndex = node[2];
            node = node[3];
            task.replay = { nodes: childIndex, slots: node, pendingTasks: 1 };
            try {
              renderChildrenArray(request, task, children, -1);
              if (1 === task.replay.pendingTasks && 0 < task.replay.nodes.length)
                throw Error(
                  "Couldn't find all resumable slots by key/index during replaying. The tree doesn't match so React will fallback to client rendering."
                );
              task.replay.pendingTasks--;
            } catch (x) {
              if ("object" === typeof x && null !== x && (x === SuspenseException || "function" === typeof x.then))
                throw x;
              task.replay.pendingTasks--;
              var thrownInfo = getThrownInfo(task.componentStack);
              children = request;
              var boundary = task.blockedBoundary;
              request = request.aborted ? request.fatalError : x;
              thrownInfo = logRecoverableError(children, request, thrownInfo);
              abortRemainingReplayNodes(
                children,
                boundary,
                childIndex,
                node,
                request,
                thrownInfo
              );
            }
            task.replay = replay;
            replayNodes.splice(j, 1);
            break;
          }
        }
        task.keyPath = prevKeyPath;
        return;
      }
      replay = task.treeContext;
      replayNodes = children.length;
      if (null !== task.replay && (j = task.replay.slots, null !== j && "object" === typeof j)) {
        for (childIndex = 0; childIndex < replayNodes; childIndex++)
          node = children[childIndex], task.treeContext = pushTreeContext(replay, replayNodes, childIndex), boundary = j[childIndex], "number" === typeof boundary ? (resumeNode(request, task, boundary, node, childIndex), delete j[childIndex]) : renderNode(request, task, node, childIndex);
        task.treeContext = replay;
        task.keyPath = prevKeyPath;
        return;
      }
      for (j = 0; j < replayNodes; j++)
        childIndex = children[j], task.treeContext = pushTreeContext(replay, replayNodes, j), renderNode(request, task, childIndex, j);
      task.treeContext = replay;
      task.keyPath = prevKeyPath;
    }
    function trackPostponedBoundary(request, trackedPostpones, boundary) {
      boundary.status = 5;
      boundary.rootSegmentID = request.nextSegmentId++;
      var tracked = boundary.tracked;
      if (null === tracked)
        throw Error(
          "It should not be possible to postpone at the root. This is a bug in React."
        );
      request = tracked.contentKeyPath;
      if (null === request)
        throw Error(
          "It should not be possible to postpone at the root. This is a bug in React."
        );
      tracked = tracked.fallbackNode;
      var children = [], boundaryNode = trackedPostpones.workingMap.get(request);
      if (void 0 === boundaryNode)
        return boundary = [
          request[1],
          request[2],
          children,
          null,
          tracked,
          boundary.rootSegmentID
        ], trackedPostpones.workingMap.set(request, boundary), addToReplayParent(boundary, request[0], trackedPostpones), boundary;
      boundaryNode[4] = tracked;
      boundaryNode[5] = boundary.rootSegmentID;
      return boundaryNode;
    }
    function trackPostpone(request, trackedPostpones, task, segment) {
      segment.status = 5;
      var keyPath = task.keyPath, boundary = task.blockedBoundary;
      if (null === boundary)
        segment.id = request.nextSegmentId++, trackedPostpones.rootSlots = segment.id, null !== request.completedRootSegment && (request.completedRootSegment.status = 5);
      else {
        if (null !== boundary && 0 === boundary.status) {
          var boundaryNode = trackPostponedBoundary(
            request,
            trackedPostpones,
            boundary
          );
          if (null !== boundary.tracked && boundary.tracked.contentKeyPath === keyPath && -1 === task.childIndex) {
            -1 === segment.id && (segment.id = segment.parentFlushed ? boundary.rootSegmentID : request.nextSegmentId++);
            boundaryNode[3] = segment.id;
            return;
          }
        }
        -1 === segment.id && (segment.id = segment.parentFlushed && null !== boundary ? boundary.rootSegmentID : request.nextSegmentId++);
        if (-1 === task.childIndex)
          null === keyPath ? trackedPostpones.rootSlots = segment.id : (task = trackedPostpones.workingMap.get(keyPath), void 0 === task ? (task = [keyPath[1], keyPath[2], [], segment.id], addToReplayParent(task, keyPath[0], trackedPostpones)) : task[3] = segment.id);
        else {
          if (null === keyPath)
            if (request = trackedPostpones.rootSlots, null === request)
              request = trackedPostpones.rootSlots = {};
            else {
              if ("number" === typeof request)
                throw Error(
                  "It should not be possible to postpone both at the root of an element as well as a slot below. This is a bug in React."
                );
            }
          else if (boundary = trackedPostpones.workingMap, boundaryNode = boundary.get(keyPath), void 0 === boundaryNode)
            request = {}, boundaryNode = [keyPath[1], keyPath[2], [], request], boundary.set(keyPath, boundaryNode), addToReplayParent(boundaryNode, keyPath[0], trackedPostpones);
          else if (request = boundaryNode[3], null === request)
            request = boundaryNode[3] = {};
          else if ("number" === typeof request)
            throw Error(
              "It should not be possible to postpone both at the root of an element as well as a slot below. This is a bug in React."
            );
          request[task.childIndex] = segment.id;
        }
      }
    }
    function untrackBoundary(request, boundary) {
      request = request.trackedPostpones;
      null !== request && (boundary = boundary.tracked, null !== boundary && (boundary = boundary.contentKeyPath, null !== boundary && (request = request.workingMap.get(boundary), void 0 !== request && (request.length = 4, request[2] = [], request[3] = null))));
    }
    function spawnNewSuspendedReplayTask(request, task, thenableState2) {
      return createReplayTask(
        request,
        thenableState2,
        task.replay,
        task.node,
        task.childIndex,
        task.blockedBoundary,
        task.hoistableState,
        task.abortSet,
        task.keyPath,
        task.formatContext,
        task.context,
        task.treeContext,
        task.row,
        task.componentStack
      );
    }
    function spawnNewSuspendedRenderTask(request, task, thenableState2) {
      var segment = task.blockedSegment, newSegment = createPendingSegment(
        request,
        segment.chunks.length,
        null,
        task.formatContext,
        segment.lastPushedText,
        true
      );
      segment.children.push(newSegment);
      segment.lastPushedText = false;
      return createRenderTask(
        request,
        thenableState2,
        task.node,
        task.childIndex,
        task.blockedBoundary,
        newSegment,
        task.blockedPreamble,
        task.hoistableState,
        task.abortSet,
        task.keyPath,
        task.formatContext,
        task.context,
        task.treeContext,
        task.row,
        task.componentStack
      );
    }
    function renderNode(request, task, node, childIndex) {
      var previousFormatContext = task.formatContext, previousContext = task.context, previousKeyPath = task.keyPath, previousTreeContext = task.treeContext, previousComponentStack = task.componentStack, segment = task.blockedSegment;
      if (null === segment) {
        segment = task.replay;
        try {
          return renderNodeDestructive(request, task, node, childIndex);
        } catch (thrownValue) {
          if (resetHooksState(), node = thrownValue === SuspenseException ? getSuspendedThenable() : thrownValue, !request.aborted && "object" === typeof node && null !== node) {
            if ("function" === typeof node.then) {
              childIndex = thrownValue === SuspenseException ? getThenableStateAfterSuspending() : null;
              request = spawnNewSuspendedReplayTask(request, task, childIndex).ping;
              node.then(request.resolve, request.reject);
              task.formatContext = previousFormatContext;
              task.context = previousContext;
              task.keyPath = previousKeyPath;
              task.treeContext = previousTreeContext;
              task.componentStack = previousComponentStack;
              task.replay = segment;
              switchContext(previousContext);
              return;
            }
            if ("Maximum call stack size exceeded" === node.message) {
              node = thrownValue === SuspenseException ? getThenableStateAfterSuspending() : null;
              node = spawnNewSuspendedReplayTask(request, task, node);
              request.pingedTasks.push(node);
              task.formatContext = previousFormatContext;
              task.context = previousContext;
              task.keyPath = previousKeyPath;
              task.treeContext = previousTreeContext;
              task.componentStack = previousComponentStack;
              task.replay = segment;
              switchContext(previousContext);
              return;
            }
          }
        }
      } else {
        var childrenLength = segment.children.length, chunkLength = segment.chunks.length;
        try {
          return renderNodeDestructive(request, task, node, childIndex);
        } catch (thrownValue$64) {
          if (resetHooksState(), segment.children.length = childrenLength, segment.chunks.length = chunkLength, node = thrownValue$64 === SuspenseException ? getSuspendedThenable() : thrownValue$64, !request.aborted && "object" === typeof node && null !== node) {
            if ("function" === typeof node.then) {
              segment = node;
              node = thrownValue$64 === SuspenseException ? getThenableStateAfterSuspending() : null;
              request = spawnNewSuspendedRenderTask(request, task, node).ping;
              segment.then(request.resolve, request.reject);
              task.formatContext = previousFormatContext;
              task.context = previousContext;
              task.keyPath = previousKeyPath;
              task.treeContext = previousTreeContext;
              task.componentStack = previousComponentStack;
              switchContext(previousContext);
              return;
            }
            if ("Maximum call stack size exceeded" === node.message) {
              segment = thrownValue$64 === SuspenseException ? getThenableStateAfterSuspending() : null;
              segment = spawnNewSuspendedRenderTask(request, task, segment);
              request.pingedTasks.push(segment);
              task.formatContext = previousFormatContext;
              task.context = previousContext;
              task.keyPath = previousKeyPath;
              task.treeContext = previousTreeContext;
              task.componentStack = previousComponentStack;
              switchContext(previousContext);
              return;
            }
          }
        }
      }
      task.formatContext = previousFormatContext;
      task.context = previousContext;
      task.keyPath = previousKeyPath;
      task.treeContext = previousTreeContext;
      switchContext(previousContext);
      throw node;
    }
    function abortTaskSoft(task) {
      var boundary = task.blockedBoundary, segment = task.blockedSegment;
      null !== segment && (segment.status = 3, finishedTask(this, boundary, task.row, segment));
    }
    function abortRemainingReplayNodes(request$jscomp$0, boundary, nodes, slots, error, errorDigest$jscomp$0) {
      for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        if (4 === node.length)
          abortRemainingReplayNodes(
            request$jscomp$0,
            boundary,
            node[2],
            node[3],
            error,
            errorDigest$jscomp$0
          );
        else {
          node = node[5];
          var request = request$jscomp$0, errorDigest = errorDigest$jscomp$0, resumedBoundary = createSuspenseBoundary(
            request,
            null,
            /* @__PURE__ */ new Set(),
            null,
            false
          );
          resumedBoundary.parentFlushed = true;
          resumedBoundary.rootSegmentID = node;
          resumedBoundary.status = 4;
          resumedBoundary.errorDigest = errorDigest;
          resumedBoundary.parentFlushed && request.clientRenderedBoundaries.push(resumedBoundary);
        }
      }
      nodes.length = 0;
      if (null !== slots) {
        if (null === boundary)
          throw Error(
            "We should not have any resumable nodes in the shell. This is a bug in React."
          );
        4 !== boundary.status && (boundary.status = 4, boundary.errorDigest = errorDigest$jscomp$0, boundary.parentFlushed && request$jscomp$0.clientRenderedBoundaries.push(boundary));
        if ("object" === typeof slots) for (var index in slots) delete slots[index];
      }
    }
    function abortTask(task, request) {
      if (task !== request.currentTask) {
        var boundary = task.blockedBoundary;
        task = task.blockedSegment;
        null !== task && (task.status = 3);
        null !== boundary && boundary.fallbackAbortableTasks.forEach(function(fallbackTask) {
          return abortTask(fallbackTask, request);
        });
      }
    }
    function finishAbortedTask(task, request, error) {
      if (task !== request.currentTask) {
        var boundary = task.blockedBoundary, segment = task.blockedSegment;
        if (null === segment || 3 === segment.status) {
          var errorInfo = getThrownInfo(task.componentStack), isRecoverableReason = isRecoverableError(error);
          if (null === boundary) {
            boundary = task.replay;
            if (null === boundary) {
              isRecoverableReason || null === request.trackedPostpones || null === segment ? isRecoverableReason ? (task = cloneRecoverableErrorAsFatal(error), logRecoverableError(request, task, errorInfo), 12 !== request.status && 13 !== request.status && fatalError(request, task)) : (logRecoverableError(request, error, errorInfo), 12 !== request.status && 13 !== request.status && fatalError(request, error)) : (boundary = request.trackedPostpones, logRecoverableError(request, error, errorInfo), trackPostpone(request, boundary, task, segment), finishedTask(request, null, task.row, segment));
              return;
            }
            12 !== request.status && 13 !== request.status && (boundary.pendingTasks--, 0 === boundary.pendingTasks && 0 < boundary.nodes.length && (errorInfo = logRecoverableError(request, error, errorInfo), abortRemainingReplayNodes(
              request,
              null,
              boundary.nodes,
              boundary.slots,
              error,
              errorInfo
            )), request.pendingRootTasks--, 0 === request.pendingRootTasks && completeShell(request));
          } else {
            var trackedPostpones$65 = request.trackedPostpones;
            if (4 !== boundary.status) {
              if (!isRecoverableReason && null !== trackedPostpones$65 && null !== segment)
                return logRecoverableError(request, error, errorInfo), trackPostpone(request, trackedPostpones$65, task, segment), boundary.fallbackAbortableTasks.forEach(function(fallbackTask) {
                  return finishAbortedTask(fallbackTask, request, error);
                }), boundary.fallbackAbortableTasks.clear(), finishedTask(request, boundary, task.row, segment);
              boundary.status = 4;
              errorInfo = logRecoverableError(request, error, errorInfo);
              boundary.errorDigest = errorInfo;
              untrackBoundary(request, boundary);
              boundary.parentFlushed && request.clientRenderedBoundaries.push(boundary);
            }
            boundary.pendingTasks--;
            errorInfo = boundary.row;
            null !== errorInfo && 0 === --errorInfo.pendingTasks && finishSuspenseListRow(request, errorInfo);
            boundary.fallbackAbortableTasks.forEach(function(fallbackTask) {
              return finishAbortedTask(fallbackTask, request, error);
            });
            boundary.fallbackAbortableTasks.clear();
          }
          task = task.row;
          null !== task && 0 === --task.pendingTasks && finishSuspenseListRow(request, task);
          request.allPendingTasks--;
          0 === request.allPendingTasks && completeAll(request);
        }
      }
    }
    function safelyEmitEarlyPreloads(request, shellComplete) {
      try {
        var renderState = request.renderState, onHeaders = renderState.onHeaders;
        if (onHeaders) {
          var headers = renderState.headers;
          if (headers) {
            renderState.headers = null;
            var linkHeader = headers.preconnects;
            headers.fontPreloads && (linkHeader && (linkHeader += ", "), linkHeader += headers.fontPreloads);
            headers.highImagePreloads && (linkHeader && (linkHeader += ", "), linkHeader += headers.highImagePreloads);
            if (!shellComplete) {
              var queueIter = renderState.styles.values(), queueStep = queueIter.next();
              b: for (; 0 < headers.remainingCapacity && !queueStep.done; queueStep = queueIter.next())
                for (var sheetIter = queueStep.value.sheets.values(), sheetStep = sheetIter.next(); 0 < headers.remainingCapacity && !sheetStep.done; sheetStep = sheetIter.next()) {
                  var sheet = sheetStep.value, props = sheet.props, key = props.href, props$jscomp$0 = sheet.props, header = getPreloadAsHeader(props$jscomp$0.href, "style", {
                    crossOrigin: props$jscomp$0.crossOrigin,
                    integrity: props$jscomp$0.integrity,
                    nonce: props$jscomp$0.nonce,
                    type: props$jscomp$0.type,
                    fetchPriority: props$jscomp$0.fetchPriority,
                    referrerPolicy: props$jscomp$0.referrerPolicy,
                    media: props$jscomp$0.media
                  });
                  if (0 <= (headers.remainingCapacity -= header.length + 2))
                    renderState.resets.style[key] = PRELOAD_NO_CREDS, linkHeader && (linkHeader += ", "), linkHeader += header, renderState.resets.style[key] = "string" === typeof props.crossOrigin || "string" === typeof props.integrity ? [props.crossOrigin, props.integrity] : PRELOAD_NO_CREDS;
                  else break b;
                }
            }
            linkHeader ? onHeaders({ Link: linkHeader }) : onHeaders({});
          }
        }
      } catch (error) {
        logRecoverableError(request, error, {});
      }
    }
    function completeShell(request) {
      null === request.trackedPostpones && safelyEmitEarlyPreloads(request, true);
      null === request.trackedPostpones && preparePreamble(request);
      request = request.onShellReady;
      request();
    }
    function completeAll(request) {
      safelyEmitEarlyPreloads(
        request,
        null === request.trackedPostpones ? true : null === request.completedRootSegment || 5 !== request.completedRootSegment.status
      );
      preparePreamble(request);
      request = request.onAllReady;
      request();
    }
    function queueCompletedSegment(boundary, segment) {
      if (0 === segment.chunks.length && 1 === segment.children.length && null === segment.children[0].boundary && -1 === segment.children[0].id) {
        var childSegment = segment.children[0];
        childSegment.id = segment.id;
        childSegment.parentFlushed = true;
        1 !== childSegment.status && 3 !== childSegment.status && 4 !== childSegment.status || queueCompletedSegment(boundary, childSegment);
      } else boundary.completedSegments.push(segment);
    }
    function finishedSegment(request, boundary, segment) {
      if (null !== byteLengthOfChunk) {
        segment = segment.chunks;
        for (var segmentByteSize = 0, i = 0; i < segment.length; i++)
          segmentByteSize += byteLengthOfChunk(segment[i]);
        null === boundary ? request.byteSize += segmentByteSize : boundary.byteSize += segmentByteSize;
      }
    }
    function finishedTask(request, boundary, row, segment) {
      null !== row && (0 === --row.pendingTasks ? finishSuspenseListRow(request, row) : row.together && tryToResolveTogetherRow(request, row));
      request.allPendingTasks--;
      if (null === boundary) {
        if (null !== segment && segment.parentFlushed) {
          if (null !== request.completedRootSegment)
            throw Error(
              "There can only be one root segment. This is a bug in React."
            );
          request.completedRootSegment = segment;
        }
        request.pendingRootTasks--;
        0 === request.pendingRootTasks && completeShell(request);
      } else if (boundary.pendingTasks--, 4 !== boundary.status)
        if (0 === boundary.pendingTasks)
          if (0 === boundary.status && (boundary.status = 1), null !== segment && segment.parentFlushed && (1 === segment.status || 3 === segment.status) && queueCompletedSegment(boundary, segment), boundary.parentFlushed && request.completedBoundaries.push(boundary), 1 === boundary.status)
            row = boundary.row, null !== row && hoistHoistables(row.hoistables, boundary.contentState), isEligibleForOutlining(request, boundary) || (request.allPendingTasks++, boundary.fallbackAbortableTasks.forEach(abortTaskSoft, request), boundary.fallbackAbortableTasks.clear(), null !== row && 0 === --row.pendingTasks && finishSuspenseListRow(request, row), request.allPendingTasks--), 0 === request.pendingRootTasks && null === request.trackedPostpones && null !== boundary.preamble && preparePreamble(request);
          else {
            if (5 === boundary.status && (boundary = boundary.row, null !== boundary)) {
              if (null !== request.trackedPostpones) {
                row = request.trackedPostpones;
                var postponedRow = boundary.next;
                if (null !== postponedRow && (segment = postponedRow.boundaries, null !== segment))
                  for (postponedRow.boundaries = null, postponedRow = 0; postponedRow < segment.length; postponedRow++) {
                    var postponedBoundary = segment[postponedRow];
                    trackPostponedBoundary(request, row, postponedBoundary);
                    finishedTask(request, postponedBoundary, null, null);
                  }
              }
              request.allPendingTasks++;
              0 === --boundary.pendingTasks && finishSuspenseListRow(request, boundary);
              request.allPendingTasks--;
            }
          }
        else
          null === segment || !segment.parentFlushed || 1 !== segment.status && 3 !== segment.status || (queueCompletedSegment(boundary, segment), 1 === boundary.completedSegments.length && boundary.parentFlushed && request.partialBoundaries.push(boundary)), boundary = boundary.row, null !== boundary && boundary.together && tryToResolveTogetherRow(request, boundary);
      0 === request.allPendingTasks && completeAll(request);
    }
    function performWork(request$jscomp$1) {
      if (!(request$jscomp$1.aborted || 11 < request$jscomp$1.status)) {
        var prevContext = currentActiveSnapshot, prevDispatcher = ReactSharedInternals.H;
        ReactSharedInternals.H = HooksDispatcher;
        var prevAsyncDispatcher = ReactSharedInternals.A;
        ReactSharedInternals.A = DefaultAsyncDispatcher;
        var prevRequest = currentRequest;
        currentRequest = request$jscomp$1;
        var prevResumableState = currentResumableState;
        currentResumableState = request$jscomp$1.resumableState;
        try {
          var pingedTasks = request$jscomp$1.pingedTasks, i;
          for (i = 0; i < pingedTasks.length; i++) {
            var task = pingedTasks[i], request = request$jscomp$1, segment = task.blockedSegment;
            if (null === segment)
              a: {
                if (0 !== task.replay.pendingTasks) {
                  var prevTask = request.currentTask;
                  request.currentTask = task;
                  switchContext(task.context);
                  var startNode = task.node;
                  try {
                    "number" === typeof task.replay.slots ? resumeNode(
                      request,
                      task,
                      task.replay.slots,
                      task.node,
                      task.childIndex
                    ) : retryNode(request, task);
                    if (1 === task.replay.pendingTasks && 0 < task.replay.nodes.length)
                      throw Error(
                        "Couldn't find all resumable slots by key/index during replaying. The tree doesn't match so React will fallback to client rendering."
                      );
                    task.replay.pendingTasks--;
                    task.abortSet.delete(task);
                    finishedTask(request, task.blockedBoundary, task.row, null);
                  } catch (thrownValue) {
                    resetHooksState();
                    var x = thrownValue === SuspenseException ? getSuspendedThenable() : thrownValue;
                    if (request.aborted) {
                      thrownValue === SuspenseException && (task.thenableState = getThenableStateAfterSuspending());
                      request.currentTask = prevTask;
                      var request$jscomp$0 = request;
                      abortTask(task, request$jscomp$0);
                      task.abortSet.delete(task);
                      finishAbortedTask(
                        task,
                        request$jscomp$0,
                        request$jscomp$0.fatalError
                      );
                    } else {
                      if ("object" === typeof x && null !== x) {
                        if ("function" === typeof x.then) {
                          var ping = task.ping;
                          x.then(ping.resolve, ping.reject);
                          task.thenableState = thrownValue === SuspenseException ? getThenableStateAfterSuspending() : null;
                          break a;
                        }
                        if ("Maximum call stack size exceeded" === x.message && task.node !== startNode) {
                          task.thenableState = null;
                          request.pingedTasks.push(task);
                          break a;
                        }
                      }
                      task.replay.pendingTasks--;
                      task.abortSet.delete(task);
                      var errorInfo = getThrownInfo(task.componentStack);
                      request$jscomp$0 = request;
                      var boundary = task.blockedBoundary, error$jscomp$0 = request.aborted ? request.fatalError : x, replayNodes = task.replay.nodes, resumeSlots = task.replay.slots, errorDigest = logRecoverableError(
                        request$jscomp$0,
                        error$jscomp$0,
                        errorInfo
                      );
                      abortRemainingReplayNodes(
                        request$jscomp$0,
                        boundary,
                        replayNodes,
                        resumeSlots,
                        error$jscomp$0,
                        errorDigest
                      );
                      request.pendingRootTasks--;
                      0 === request.pendingRootTasks && completeShell(request);
                      request.allPendingTasks--;
                      0 === request.allPendingTasks && completeAll(request);
                    }
                  } finally {
                    request.currentTask = prevTask;
                  }
                }
              }
            else
              a: if (request$jscomp$0 = segment, 0 === request$jscomp$0.status) {
                var prevTask$jscomp$0 = request.currentTask;
                request.currentTask = task;
                switchContext(task.context);
                var childrenLength = request$jscomp$0.children.length, chunkLength = request$jscomp$0.chunks.length, startNode$jscomp$0 = task.node;
                try {
                  retryNode(request, task), request$jscomp$0.lastPushedText && request$jscomp$0.textEmbedded && request$jscomp$0.chunks.push(textSeparator), task.abortSet.delete(task), request$jscomp$0.status = 1, finishedSegment(
                    request,
                    task.blockedBoundary,
                    request$jscomp$0
                  ), finishedTask(
                    request,
                    task.blockedBoundary,
                    task.row,
                    request$jscomp$0
                  );
                } catch (thrownValue) {
                  resetHooksState();
                  request$jscomp$0.children.length = childrenLength;
                  request$jscomp$0.chunks.length = chunkLength;
                  var x$jscomp$0 = thrownValue === SuspenseException ? getSuspendedThenable() : thrownValue;
                  if (request.aborted)
                    thrownValue === SuspenseException && (task.thenableState = getThenableStateAfterSuspending()), request.currentTask = prevTask$jscomp$0, request$jscomp$0 = request, abortTask(task, request$jscomp$0), task.abortSet.delete(task), finishAbortedTask(
                      task,
                      request$jscomp$0,
                      request$jscomp$0.fatalError
                    );
                  else {
                    if ("object" === typeof x$jscomp$0 && null !== x$jscomp$0) {
                      if ("function" === typeof x$jscomp$0.then) {
                        request$jscomp$0.status = 0;
                        task.thenableState = thrownValue === SuspenseException ? getThenableStateAfterSuspending() : null;
                        var ping$jscomp$0 = task.ping;
                        x$jscomp$0.then(
                          ping$jscomp$0.resolve,
                          ping$jscomp$0.reject
                        );
                        break a;
                      }
                      if ("Maximum call stack size exceeded" === x$jscomp$0.message && task.node !== startNode$jscomp$0) {
                        request$jscomp$0.status = 0;
                        task.thenableState = null;
                        request.pingedTasks.push(task);
                        break a;
                      }
                    }
                    var errorInfo$jscomp$0 = getThrownInfo(task.componentStack);
                    task.abortSet.delete(task);
                    request$jscomp$0.status = 4;
                    var boundary$jscomp$0 = task.blockedBoundary, row = task.row;
                    null !== row && 0 === --row.pendingTasks && finishSuspenseListRow(request, row);
                    request.allPendingTasks--;
                    if (null === boundary$jscomp$0)
                      if (isRecoverableError(x$jscomp$0)) {
                        var fatalRecoverableError = cloneRecoverableErrorAsFatal(x$jscomp$0);
                        logRecoverableError(
                          request,
                          fatalRecoverableError,
                          errorInfo$jscomp$0
                        );
                        fatalError(request, fatalRecoverableError);
                      } else
                        logRecoverableError(
                          request,
                          x$jscomp$0,
                          errorInfo$jscomp$0
                        ), fatalError(request, x$jscomp$0);
                    else {
                      var errorDigest$jscomp$0 = logRecoverableError(
                        request,
                        x$jscomp$0,
                        errorInfo$jscomp$0
                      );
                      boundary$jscomp$0.pendingTasks--;
                      if (4 !== boundary$jscomp$0.status) {
                        boundary$jscomp$0.status = 4;
                        boundary$jscomp$0.errorDigest = errorDigest$jscomp$0;
                        untrackBoundary(request, boundary$jscomp$0);
                        var boundaryRow = boundary$jscomp$0.row;
                        null !== boundaryRow && (request.allPendingTasks++, 0 === --boundaryRow.pendingTasks && finishSuspenseListRow(request, boundaryRow), request.allPendingTasks--);
                        boundary$jscomp$0.parentFlushed && request.clientRenderedBoundaries.push(boundary$jscomp$0);
                        0 === request.pendingRootTasks && null === request.trackedPostpones && null !== boundary$jscomp$0.preamble && preparePreamble(request);
                      }
                      0 === request.allPendingTasks && completeAll(request);
                    }
                  }
                } finally {
                  request.currentTask = prevTask$jscomp$0;
                }
              }
          }
          pingedTasks.splice(0, i);
          null !== request$jscomp$1.destination && flushCompletedQueues(request$jscomp$1, request$jscomp$1.destination);
        } catch (error) {
          logRecoverableError(request$jscomp$1, error, {}), fatalError(request$jscomp$1, error);
        } finally {
          currentResumableState = prevResumableState, ReactSharedInternals.H = prevDispatcher, ReactSharedInternals.A = prevAsyncDispatcher, prevDispatcher === HooksDispatcher && switchContext(prevContext), currentRequest = prevRequest;
        }
      }
    }
    function preparePreambleFromSubtree(request, segment, collectedPreambleSegments) {
      segment.preambleChildren.length && collectedPreambleSegments.push(segment.preambleChildren);
      for (var pendingPreambles = false, i = 0; i < segment.children.length; i++)
        pendingPreambles = preparePreambleFromSegment(
          request,
          segment.children[i],
          collectedPreambleSegments
        ) || pendingPreambles;
      return pendingPreambles;
    }
    function preparePreambleFromSegment(request, segment, collectedPreambleSegments) {
      var boundary = segment.boundary;
      if (null === boundary)
        return preparePreambleFromSubtree(
          request,
          segment,
          collectedPreambleSegments
        );
      var preamble = boundary.preamble;
      if (null === preamble) return false;
      switch (boundary.status) {
        case 1:
          hoistPreambleState(request.renderState, preamble.content);
          request.byteSize += boundary.byteSize;
          segment = boundary.completedSegments[0];
          if (!segment)
            throw Error(
              "A previously unvisited boundary must have exactly one root segment. This is a bug in React."
            );
          return preparePreambleFromSubtree(
            request,
            segment,
            collectedPreambleSegments
          );
        case 5:
          if (null !== request.trackedPostpones) return true;
        case 4:
          if (1 === segment.status)
            return hoistPreambleState(request.renderState, preamble.fallback), preparePreambleFromSubtree(
              request,
              segment,
              collectedPreambleSegments
            );
        default:
          return true;
      }
    }
    function preparePreamble(request) {
      if (request.completedRootSegment && null === request.completedPreambleSegments) {
        var collectedPreambleSegments = [], originalRequestByteSize = request.byteSize, hasPendingPreambles = preparePreambleFromSegment(
          request,
          request.completedRootSegment,
          collectedPreambleSegments
        ), preamble = request.renderState.preamble;
        false === hasPendingPreambles || preamble.headChunks && preamble.bodyChunks ? request.completedPreambleSegments = collectedPreambleSegments : request.byteSize = originalRequestByteSize;
      }
    }
    function flushSubtree(request, destination, segment, hoistableState) {
      segment.parentFlushed = true;
      switch (segment.status) {
        case 0:
          segment.id = request.nextSegmentId++;
        case 5:
          return hoistableState = segment.id, segment.lastPushedText = false, segment.textEmbedded = false, request = request.renderState, writeChunk(destination, placeholder1), writeChunk(destination, request.placeholderPrefix), request = hoistableState.toString(16), writeChunk(destination, request), writeChunkAndReturn(destination, placeholder2);
        case 1:
          segment.status = 2;
          var r = true, chunks = segment.chunks, chunkIdx = 0;
          segment = segment.children;
          for (var childIdx = 0; childIdx < segment.length; childIdx++) {
            for (r = segment[childIdx]; chunkIdx < r.index; chunkIdx++)
              writeChunk(destination, chunks[chunkIdx]);
            r = flushSegment(request, destination, r, hoistableState);
          }
          for (; chunkIdx < chunks.length - 1; chunkIdx++)
            writeChunk(destination, chunks[chunkIdx]);
          chunkIdx < chunks.length && (r = writeChunkAndReturn(destination, chunks[chunkIdx]));
          return r;
        case 3:
          return true;
        default:
          throw Error(
            "Aborted, errored or already flushed boundaries should not be flushed again. This is a bug in React."
          );
      }
    }
    var flushedByteSize = 0;
    function flushSegment(request, destination, segment, hoistableState) {
      var boundary = segment.boundary;
      if (null === boundary)
        return flushSubtree(request, destination, segment, hoistableState);
      segment.boundary = null;
      boundary.parentFlushed = true;
      if (4 === boundary.status) {
        var row = boundary.row;
        null !== row && 0 === --row.pendingTasks && finishSuspenseListRow(request, row);
        boundary = boundary.errorDigest;
        writeChunkAndReturn(destination, startClientRenderedSuspenseBoundary);
        writeChunk(destination, clientRenderedSuspenseBoundaryError1);
        null != boundary && (writeChunk(destination, clientRenderedSuspenseBoundaryError1A), writeChunk(destination, escapeTextForBrowser(boundary)), writeChunk(
          destination,
          clientRenderedSuspenseBoundaryErrorAttrInterstitial
        ));
        writeChunkAndReturn(destination, clientRenderedSuspenseBoundaryError2);
        flushSubtree(request, destination, segment, hoistableState);
      } else if (1 !== boundary.status)
        0 === boundary.status && (boundary.rootSegmentID = request.nextSegmentId++), 0 < boundary.completedSegments.length && request.partialBoundaries.push(boundary), writeStartPendingSuspenseBoundary(
          destination,
          request.renderState,
          boundary.rootSegmentID
        ), hoistableState && hoistHoistables(hoistableState, boundary.fallbackState), flushSubtree(request, destination, segment, hoistableState);
      else if (!flushingPartialBoundaries && isEligibleForOutlining(request, boundary) && (flushedByteSize + boundary.byteSize > request.progressiveChunkSize || hasSuspenseyContent(boundary.contentState, flushingShell) || boundary.defer))
        boundary.rootSegmentID = request.nextSegmentId++, request.completedBoundaries.push(boundary), writeStartPendingSuspenseBoundary(
          destination,
          request.renderState,
          boundary.rootSegmentID
        ), flushSubtree(request, destination, segment, hoistableState);
      else {
        flushedByteSize += boundary.byteSize;
        hoistableState && hoistHoistables(hoistableState, boundary.contentState);
        segment = boundary.row;
        null !== segment && isEligibleForOutlining(request, boundary) && 0 === --segment.pendingTasks && finishSuspenseListRow(request, segment);
        writeChunkAndReturn(destination, startCompletedSuspenseBoundary);
        segment = boundary.completedSegments;
        if (1 !== segment.length)
          throw Error(
            "A previously unvisited boundary must have exactly one root segment. This is a bug in React."
          );
        flushSegment(request, destination, segment[0], hoistableState);
      }
      return writeChunkAndReturn(destination, endSuspenseBoundary);
    }
    function flushSegmentContainer(request, destination, segment, hoistableState) {
      writeStartSegment(
        destination,
        request.renderState,
        segment.parentFormatContext,
        segment.id
      );
      flushSegment(request, destination, segment, hoistableState);
      return writeEndSegment(destination, segment.parentFormatContext);
    }
    function flushCompletedBoundary(request, destination, boundary) {
      flushedByteSize = boundary.byteSize;
      for (var completedSegments = boundary.completedSegments, i = 0; i < completedSegments.length; i++)
        flushPartiallyCompletedSegment(
          request,
          destination,
          boundary,
          completedSegments[i]
        );
      completedSegments.length = 0;
      completedSegments = boundary.row;
      null !== completedSegments && isEligibleForOutlining(request, boundary) && 0 === --completedSegments.pendingTasks && finishSuspenseListRow(request, completedSegments);
      writeHoistablesForBoundary(
        destination,
        boundary.contentState,
        request.renderState
      );
      completedSegments = request.resumableState;
      request = request.renderState;
      i = boundary.rootSegmentID;
      boundary = boundary.contentState;
      var requiresStyleInsertion = request.stylesToHoist, requiresViewTransitions = 0 !== (completedSegments.instructions & 128);
      request.stylesToHoist = false;
      writeChunk(destination, request.startInlineScript);
      writeChunk(destination, endOfStartTag);
      requiresStyleInsertion ? (0 === (completedSegments.instructions & 4) && (completedSegments.instructions |= 4, writeChunk(destination, clientRenderScriptFunctionOnly)), 0 === (completedSegments.instructions & 2) && (completedSegments.instructions |= 2, writeChunk(destination, completeBoundaryScriptFunctionOnly)), requiresViewTransitions && 0 === (completedSegments.instructions & 256) && (completedSegments.instructions |= 256, writeChunk(
        destination,
        `$RV=function(B,g){function h(a,c){var e=a.getAttribute(c);e&&(c=a.style,l.push(a,c.viewTransitionName,c.viewTransitionClass),"auto"!==e&&(c.viewTransitionClass=e),(a=a.getAttribute("vt-name"))||(a="_T_"+N++ +"_"),a=CSS.escape(a)!==a?"r-"+btoa(a).replace(/=/g,""):a,c.viewTransitionName=a,C=!0)}var C=!1,N=0,l=[];try{var f=document.__reactViewTransition;if(f){f.finished.finally($RV.bind(null,g));return}var m=new Map;for(f=1;f<g.length;f+=2)for(var k=g[f].querySelectorAll("[vt-share]"),d=0;d<k.length;d++){var b=k[d];m.set(b.getAttribute("vt-name"),b)}var u=[];for(k=0;k<g.length;k+=2){var D=g[k],x=D.parentNode;if(x){var v=x.getBoundingClientRect();if(v.left||v.top||v.width||v.height){b=D;for(f=0;b;){if(8===b.nodeType){var t=b.data;if("/$"===t)if(0===f)break;else f--;else"$"!==t&&"$?"!==t&&"$~"!==t&&"$!"!==t||f++}else if(1===b.nodeType){d=b;var E=d.getAttribute("vt-name"),y=m.get(E);h(d,y?"vt-share":"vt-exit");y&&(h(y,"vt-share"),m.set(E,null));for(var F=d.querySelectorAll("[vt-share]"),
z=0;z<F.length;z++){var G=F[z],H=G.getAttribute("vt-name"),I=m.get(H);I&&(h(G,"vt-share"),h(I,"vt-share"),m.set(H,null))}var J=d.querySelectorAll("[vt-parent-exit]");for(d=0;d<J.length;d++)h(J[d],"vt-parent-exit")}b=b.nextSibling}for(var K=g[k+1],n=K.firstElementChild;n;){null!==m.get(n.getAttribute("vt-name"))&&h(n,"vt-enter");var L=n.querySelectorAll("[vt-parent-enter]");for(b=0;b<L.length;b++)h(L[b],"vt-parent-enter");n=n.nextElementSibling}b=x;do for(var p=b.firstElementChild;p;){var M=p.getAttribute("vt-update");
M&&"none"!==M&&!l.includes(p)&&h(p,"vt-update");p=p.nextElementSibling}while((b=b.parentNode)&&1===b.nodeType&&"none"!==b.getAttribute("vt-update"));u.push.apply(u,K.querySelectorAll('img[src]:not([loading="lazy"])'))}}}if(C){var A=document.__reactViewTransition=document.startViewTransition({update:function(){B(g);for(var a=[document.documentElement.clientHeight,document.fonts.ready],c={},e=0;e<u.length;c={g:c.g},e++)if(c.g=u[e],!c.g.complete){var q=c.g.getBoundingClientRect();0<q.bottom&&0<q.right&&
q.top<window.innerHeight&&q.left<window.innerWidth&&(q=new Promise(function(w){return function(r){w.g.addEventListener("load",r);w.g.addEventListener("error",r)}}(c)),a.push(q))}return Promise.race([Promise.all(a),new Promise(function(w){var r=performance.now();setTimeout(w,2300>r&&2E3<r?2300-r:500)})])},types:[]});A.ready.finally(function(){for(var a=l.length-3;0<=a;a-=3){var c=l[a],e=c.style;e.viewTransitionName=l[a+1];e.viewTransitionClass=l[a+1];""===c.getAttribute("style")&&c.removeAttribute("style")}});
A.finished.finally(function(){document.__reactViewTransition===A&&(document.__reactViewTransition=null)});$RB=[];return}}catch(a){}B(g)}.bind(null,$RV);`
      )), 0 === (completedSegments.instructions & 8) ? (completedSegments.instructions |= 8, writeChunk(destination, completeBoundaryWithStylesScript1FullPartial)) : writeChunk(destination, completeBoundaryWithStylesScript1Partial)) : (0 === (completedSegments.instructions & 2) && (completedSegments.instructions |= 2, writeChunk(destination, completeBoundaryScriptFunctionOnly)), requiresViewTransitions && 0 === (completedSegments.instructions & 256) && (completedSegments.instructions |= 256, writeChunk(
        destination,
        `$RV=function(B,g){function h(a,c){var e=a.getAttribute(c);e&&(c=a.style,l.push(a,c.viewTransitionName,c.viewTransitionClass),"auto"!==e&&(c.viewTransitionClass=e),(a=a.getAttribute("vt-name"))||(a="_T_"+N++ +"_"),a=CSS.escape(a)!==a?"r-"+btoa(a).replace(/=/g,""):a,c.viewTransitionName=a,C=!0)}var C=!1,N=0,l=[];try{var f=document.__reactViewTransition;if(f){f.finished.finally($RV.bind(null,g));return}var m=new Map;for(f=1;f<g.length;f+=2)for(var k=g[f].querySelectorAll("[vt-share]"),d=0;d<k.length;d++){var b=k[d];m.set(b.getAttribute("vt-name"),b)}var u=[];for(k=0;k<g.length;k+=2){var D=g[k],x=D.parentNode;if(x){var v=x.getBoundingClientRect();if(v.left||v.top||v.width||v.height){b=D;for(f=0;b;){if(8===b.nodeType){var t=b.data;if("/$"===t)if(0===f)break;else f--;else"$"!==t&&"$?"!==t&&"$~"!==t&&"$!"!==t||f++}else if(1===b.nodeType){d=b;var E=d.getAttribute("vt-name"),y=m.get(E);h(d,y?"vt-share":"vt-exit");y&&(h(y,"vt-share"),m.set(E,null));for(var F=d.querySelectorAll("[vt-share]"),
z=0;z<F.length;z++){var G=F[z],H=G.getAttribute("vt-name"),I=m.get(H);I&&(h(G,"vt-share"),h(I,"vt-share"),m.set(H,null))}var J=d.querySelectorAll("[vt-parent-exit]");for(d=0;d<J.length;d++)h(J[d],"vt-parent-exit")}b=b.nextSibling}for(var K=g[k+1],n=K.firstElementChild;n;){null!==m.get(n.getAttribute("vt-name"))&&h(n,"vt-enter");var L=n.querySelectorAll("[vt-parent-enter]");for(b=0;b<L.length;b++)h(L[b],"vt-parent-enter");n=n.nextElementSibling}b=x;do for(var p=b.firstElementChild;p;){var M=p.getAttribute("vt-update");
M&&"none"!==M&&!l.includes(p)&&h(p,"vt-update");p=p.nextElementSibling}while((b=b.parentNode)&&1===b.nodeType&&"none"!==b.getAttribute("vt-update"));u.push.apply(u,K.querySelectorAll('img[src]:not([loading="lazy"])'))}}}if(C){var A=document.__reactViewTransition=document.startViewTransition({update:function(){B(g);for(var a=[document.documentElement.clientHeight,document.fonts.ready],c={},e=0;e<u.length;c={g:c.g},e++)if(c.g=u[e],!c.g.complete){var q=c.g.getBoundingClientRect();0<q.bottom&&0<q.right&&
q.top<window.innerHeight&&q.left<window.innerWidth&&(q=new Promise(function(w){return function(r){w.g.addEventListener("load",r);w.g.addEventListener("error",r)}}(c)),a.push(q))}return Promise.race([Promise.all(a),new Promise(function(w){var r=performance.now();setTimeout(w,2300>r&&2E3<r?2300-r:500)})])},types:[]});A.ready.finally(function(){for(var a=l.length-3;0<=a;a-=3){var c=l[a],e=c.style;e.viewTransitionName=l[a+1];e.viewTransitionClass=l[a+1];""===c.getAttribute("style")&&c.removeAttribute("style")}});
A.finished.finally(function(){document.__reactViewTransition===A&&(document.__reactViewTransition=null)});$RB=[];return}}catch(a){}B(g)}.bind(null,$RV);`
      )), writeChunk(destination, completeBoundaryScript1Partial));
      completedSegments = i.toString(16);
      writeChunk(destination, request.boundaryPrefix);
      writeChunk(destination, completedSegments);
      writeChunk(destination, completeBoundaryScript2);
      writeChunk(destination, request.segmentPrefix);
      writeChunk(destination, completedSegments);
      requiresStyleInsertion ? (writeChunk(destination, completeBoundaryScript3a), writeStyleResourceDependenciesInJS(destination, boundary)) : writeChunk(destination, completeBoundaryScript3b);
      boundary = writeChunkAndReturn(destination, completeBoundaryScriptEnd);
      return writeBootstrap(destination, request) && boundary;
    }
    function flushPartiallyCompletedSegment(request, destination, boundary, segment) {
      if (2 === segment.status) return true;
      var hoistableState = boundary.contentState, segmentID = segment.id;
      if (-1 === segmentID) {
        if (-1 === (segment.id = boundary.rootSegmentID))
          throw Error(
            "A root segment ID must have been assigned by now. This is a bug in React."
          );
        return flushSegmentContainer(request, destination, segment, hoistableState);
      }
      if (segmentID === boundary.rootSegmentID)
        return flushSegmentContainer(request, destination, segment, hoistableState);
      flushSegmentContainer(request, destination, segment, hoistableState);
      boundary = request.resumableState;
      request = request.renderState;
      writeChunk(destination, request.startInlineScript);
      writeChunk(destination, endOfStartTag);
      0 === (boundary.instructions & 1) ? (boundary.instructions |= 1, writeChunk(destination, completeSegmentScript1Full)) : writeChunk(destination, completeSegmentScript1Partial);
      writeChunk(destination, request.segmentPrefix);
      segmentID = segmentID.toString(16);
      writeChunk(destination, segmentID);
      writeChunk(destination, completeSegmentScript2);
      writeChunk(destination, request.placeholderPrefix);
      writeChunk(destination, segmentID);
      destination = writeChunkAndReturn(destination, completeSegmentScriptEnd);
      return destination;
    }
    var flushingPartialBoundaries = false;
    var flushingShell = false;
    function flushCompletedQueues(request, destination) {
      currentView = new Uint8Array(4096);
      writtenBytes = 0;
      destinationHasCapacity$1 = true;
      try {
        if (!(0 < request.pendingRootTasks)) {
          var i, completedRootSegment = request.completedRootSegment;
          if (null !== completedRootSegment) {
            if (5 === completedRootSegment.status) return;
            var completedPreambleSegments = request.completedPreambleSegments;
            if (null === completedPreambleSegments) return;
            flushedByteSize = request.byteSize;
            var resumableState = request.resumableState, renderState = request.renderState, preamble = renderState.preamble, htmlChunks = preamble.htmlChunks, headChunks = preamble.headChunks, i$jscomp$0;
            if (htmlChunks) {
              for (i$jscomp$0 = 0; i$jscomp$0 < htmlChunks.length; i$jscomp$0++)
                writeChunk(destination, htmlChunks[i$jscomp$0]);
              if (headChunks)
                for (i$jscomp$0 = 0; i$jscomp$0 < headChunks.length; i$jscomp$0++)
                  writeChunk(destination, headChunks[i$jscomp$0]);
              else
                writeChunk(destination, startChunkForTag("head")), writeChunk(destination, endOfStartTag);
            } else if (headChunks)
              for (i$jscomp$0 = 0; i$jscomp$0 < headChunks.length; i$jscomp$0++)
                writeChunk(destination, headChunks[i$jscomp$0]);
            var charsetChunks = renderState.charsetChunks;
            for (i$jscomp$0 = 0; i$jscomp$0 < charsetChunks.length; i$jscomp$0++)
              writeChunk(destination, charsetChunks[i$jscomp$0]);
            charsetChunks.length = 0;
            renderState.preconnects.forEach(flushResource, destination);
            renderState.preconnects.clear();
            var viewportChunks = renderState.viewportChunks;
            for (i$jscomp$0 = 0; i$jscomp$0 < viewportChunks.length; i$jscomp$0++)
              writeChunk(destination, viewportChunks[i$jscomp$0]);
            viewportChunks.length = 0;
            renderState.fontPreloads.forEach(flushResource, destination);
            renderState.fontPreloads.clear();
            renderState.highImagePreloads.forEach(flushResource, destination);
            renderState.highImagePreloads.clear();
            currentlyFlushingRenderState = renderState;
            renderState.styles.forEach(flushStylesInPreamble, destination);
            currentlyFlushingRenderState = null;
            var importMapChunks = renderState.importMapChunks;
            for (i$jscomp$0 = 0; i$jscomp$0 < importMapChunks.length; i$jscomp$0++)
              writeChunk(destination, importMapChunks[i$jscomp$0]);
            importMapChunks.length = 0;
            renderState.bootstrapScripts.forEach(flushResource, destination);
            renderState.scripts.forEach(flushResource, destination);
            renderState.scripts.clear();
            renderState.bulkPreloads.forEach(flushResource, destination);
            renderState.bulkPreloads.clear();
            htmlChunks || headChunks || (resumableState.instructions |= 32);
            var hoistableChunks = renderState.hoistableChunks;
            for (i$jscomp$0 = 0; i$jscomp$0 < hoistableChunks.length; i$jscomp$0++)
              writeChunk(destination, hoistableChunks[i$jscomp$0]);
            for (resumableState = hoistableChunks.length = 0; resumableState < completedPreambleSegments.length; resumableState++) {
              var segments = completedPreambleSegments[resumableState];
              for (renderState = 0; renderState < segments.length; renderState++)
                flushSegment(request, destination, segments[renderState], null);
            }
            var preamble$jscomp$0 = request.renderState.preamble, headChunks$jscomp$0 = preamble$jscomp$0.headChunks;
            (preamble$jscomp$0.htmlChunks || headChunks$jscomp$0) && writeChunk(destination, endChunkForTag("head"));
            var bodyChunks = preamble$jscomp$0.bodyChunks;
            if (bodyChunks)
              for (completedPreambleSegments = 0; completedPreambleSegments < bodyChunks.length; completedPreambleSegments++)
                writeChunk(destination, bodyChunks[completedPreambleSegments]);
            flushingShell = true;
            flushSegment(request, destination, completedRootSegment, null);
            flushingShell = false;
            request.completedRootSegment = null;
            var renderState$jscomp$0 = request.renderState;
            if (0 !== request.allPendingTasks || 0 !== request.clientRenderedBoundaries.length || 0 !== request.completedBoundaries.length || null !== request.trackedPostpones && (0 !== request.trackedPostpones.rootNodes.length || null !== request.trackedPostpones.rootSlots)) {
              var resumableState$jscomp$0 = request.resumableState;
              if (0 === (resumableState$jscomp$0.instructions & 64)) {
                resumableState$jscomp$0.instructions |= 64;
                writeChunk(destination, renderState$jscomp$0.startInlineScript);
                if (0 === (resumableState$jscomp$0.instructions & 32)) {
                  resumableState$jscomp$0.instructions |= 32;
                  var shellId = "_" + resumableState$jscomp$0.idPrefix + "R_";
                  writeChunk(destination, completedShellIdAttributeStart);
                  writeChunk(destination, escapeTextForBrowser(shellId));
                  writeChunk(destination, attributeEnd);
                }
                writeChunk(destination, endOfStartTag);
                writeChunk(destination, shellTimeRuntimeScript);
                writeChunkAndReturn(destination, endInlineScript);
              }
            }
            writeBootstrap(destination, renderState$jscomp$0);
          }
          var renderState$jscomp$1 = request.renderState;
          completedRootSegment = 0;
          var viewportChunks$jscomp$0 = renderState$jscomp$1.viewportChunks;
          for (completedRootSegment = 0; completedRootSegment < viewportChunks$jscomp$0.length; completedRootSegment++)
            writeChunk(destination, viewportChunks$jscomp$0[completedRootSegment]);
          viewportChunks$jscomp$0.length = 0;
          renderState$jscomp$1.preconnects.forEach(flushResource, destination);
          renderState$jscomp$1.preconnects.clear();
          renderState$jscomp$1.fontPreloads.forEach(flushResource, destination);
          renderState$jscomp$1.fontPreloads.clear();
          renderState$jscomp$1.highImagePreloads.forEach(
            flushResource,
            destination
          );
          renderState$jscomp$1.highImagePreloads.clear();
          renderState$jscomp$1.styles.forEach(preloadLateStyles, destination);
          renderState$jscomp$1.scripts.forEach(flushResource, destination);
          renderState$jscomp$1.scripts.clear();
          renderState$jscomp$1.bulkPreloads.forEach(flushResource, destination);
          renderState$jscomp$1.bulkPreloads.clear();
          var hoistableChunks$jscomp$0 = renderState$jscomp$1.hoistableChunks;
          for (completedRootSegment = 0; completedRootSegment < hoistableChunks$jscomp$0.length; completedRootSegment++)
            writeChunk(destination, hoistableChunks$jscomp$0[completedRootSegment]);
          hoistableChunks$jscomp$0.length = 0;
          var clientRenderedBoundaries = request.clientRenderedBoundaries;
          for (i = 0; i < clientRenderedBoundaries.length; i++) {
            var boundary = clientRenderedBoundaries[i];
            renderState$jscomp$1 = destination;
            var resumableState$jscomp$1 = request.resumableState, renderState$jscomp$2 = request.renderState, id = boundary.rootSegmentID, errorDigest = boundary.errorDigest;
            writeChunk(
              renderState$jscomp$1,
              renderState$jscomp$2.startInlineScript
            );
            writeChunk(renderState$jscomp$1, endOfStartTag);
            0 === (resumableState$jscomp$1.instructions & 4) ? (resumableState$jscomp$1.instructions |= 4, writeChunk(renderState$jscomp$1, clientRenderScript1Full)) : writeChunk(renderState$jscomp$1, clientRenderScript1Partial);
            writeChunk(renderState$jscomp$1, renderState$jscomp$2.boundaryPrefix);
            writeChunk(renderState$jscomp$1, id.toString(16));
            writeChunk(renderState$jscomp$1, clientRenderScript1A);
            null != errorDigest && (writeChunk(
              renderState$jscomp$1,
              clientRenderErrorScriptArgInterstitial
            ), null == errorDigest ? writeChunk(renderState$jscomp$1, clientRenderErrorScriptNull) : writeChunk(
              renderState$jscomp$1,
              escapeJSStringsForInstructionScripts(errorDigest)
            ));
            var JSCompiler_inline_result = writeChunkAndReturn(
              renderState$jscomp$1,
              clientRenderScriptEnd
            );
            if (!JSCompiler_inline_result) {
              request.destination = null;
              i++;
              clientRenderedBoundaries.splice(0, i);
              return;
            }
          }
          clientRenderedBoundaries.splice(0, i);
          var completedBoundaries = request.completedBoundaries;
          for (i = 0; i < completedBoundaries.length; i++)
            if (!flushCompletedBoundary(request, destination, completedBoundaries[i])) {
              request.destination = null;
              i++;
              completedBoundaries.splice(0, i);
              return;
            }
          completedBoundaries.splice(0, i);
          completeWriting(destination);
          currentView = new Uint8Array(4096);
          writtenBytes = 0;
          flushingPartialBoundaries = destinationHasCapacity$1 = true;
          var partialBoundaries = request.partialBoundaries;
          for (i = 0; i < partialBoundaries.length; i++) {
            var boundary$71 = partialBoundaries[i];
            a: {
              clientRenderedBoundaries = request;
              boundary = destination;
              flushedByteSize = boundary$71.byteSize;
              var completedSegments = boundary$71.completedSegments;
              for (JSCompiler_inline_result = 0; JSCompiler_inline_result < completedSegments.length; JSCompiler_inline_result++)
                if (!flushPartiallyCompletedSegment(
                  clientRenderedBoundaries,
                  boundary,
                  boundary$71,
                  completedSegments[JSCompiler_inline_result]
                )) {
                  JSCompiler_inline_result++;
                  completedSegments.splice(0, JSCompiler_inline_result);
                  var JSCompiler_inline_result$jscomp$0 = false;
                  break a;
                }
              completedSegments.splice(0, JSCompiler_inline_result);
              var row = boundary$71.row;
              null !== row && row.together && 1 === boundary$71.pendingTasks && (1 === row.pendingTasks ? unblockSuspenseListRow(
                clientRenderedBoundaries,
                row,
                row.hoistables
              ) : row.pendingTasks--);
              JSCompiler_inline_result$jscomp$0 = writeHoistablesForBoundary(
                boundary,
                boundary$71.contentState,
                clientRenderedBoundaries.renderState
              );
            }
            if (!JSCompiler_inline_result$jscomp$0) {
              request.destination = null;
              i++;
              partialBoundaries.splice(0, i);
              return;
            }
          }
          partialBoundaries.splice(0, i);
          flushingPartialBoundaries = false;
          var largeBoundaries = request.completedBoundaries;
          for (i = 0; i < largeBoundaries.length; i++)
            if (!flushCompletedBoundary(request, destination, largeBoundaries[i])) {
              request.destination = null;
              i++;
              largeBoundaries.splice(0, i);
              return;
            }
          largeBoundaries.splice(0, i);
        }
      } finally {
        flushingPartialBoundaries = false, i = request.postponedState, null !== i && (i.nextSegmentId = request.nextSegmentId), 0 === request.allPendingTasks && 0 === request.clientRenderedBoundaries.length && 0 === request.completedBoundaries.length ? (request.flushScheduled = false, i = request.resumableState, i.hasBody && writeChunk(destination, endChunkForTag("body")), i.hasHtml && writeChunk(destination, endChunkForTag("html")), completeWriting(destination), flushBuffered(destination), endRenderLifetime(request), request.status = 13, destination.end(), request.destination = null) : (completeWriting(destination), flushBuffered(destination));
      }
    }
    function startWork(request) {
      request.flushScheduled = null !== request.destination;
      scheduleMicrotask(function() {
        return requestStorage.run(request, performWork, request);
      });
      setImmediate(function() {
        10 === request.status && (request.status = 11);
        null === request.trackedPostpones && requestStorage.run(
          request,
          enqueueEarlyPreloadsAfterInitialWork,
          request
        );
      });
    }
    function enqueueEarlyPreloadsAfterInitialWork(request) {
      safelyEmitEarlyPreloads(request, 0 === request.pendingRootTasks);
    }
    function enqueueFlush(request) {
      false === request.flushScheduled && 0 === request.pingedTasks.length && null !== request.destination && (request.flushScheduled = true, setImmediate(function() {
        var destination = request.destination;
        destination ? flushCompletedQueues(request, destination) : request.flushScheduled = false;
      }));
    }
    function startFlowing(request, destination) {
      if (12 === request.status)
        request.status = 13, request = request.fatalError, isRecoverableError(request) && (request = cloneRecoverableErrorAsFatal(request)), destination.destroy(request);
      else if (13 !== request.status && null === request.destination) {
        request.destination = destination;
        try {
          flushCompletedQueues(request, destination);
        } catch (error$73) {
          logRecoverableError(request, error$73, {}), fatalError(request, error$73);
        }
      }
    }
    function finishAbort(request, abortableTasks) {
      try {
        if (0 < abortableTasks.size) {
          var error = request.fatalError;
          abortableTasks.forEach(function(task) {
            return finishAbortedTask(task, request, error);
          });
          abortableTasks.clear();
        }
        null !== request.destination && flushCompletedQueues(request, request.destination);
      } catch (error$74) {
        logRecoverableError(request, error$74, {}), fatalError(request, error$74);
      }
    }
    function endRenderLifetime(request) {
      request = request.renderLifetimeController;
      null !== request && request.abort("The render ended.");
    }
    function attachAbortSignal(request, signal) {
      if (signal.aborted) abort(request, signal.reason);
      else {
        var renderLifetimeController = new AbortController();
        request.renderLifetimeController = renderLifetimeController;
        signal.addEventListener(
          "abort",
          function() {
            abort(request, signal.reason);
          },
          { signal: renderLifetimeController.signal }
        );
      }
    }
    function abort(request, reason) {
      if (!(request.aborted || 11 !== request.status && 10 !== request.status)) {
        endRenderLifetime(request);
        var isRecoverableReason = "object" === typeof reason && null !== reason && reason.$$typeof === REACT_RECOVERABLE_TYPE;
        request.aborted = true;
        reason = isRecoverableReason ? createRecoverableError(reason) : void 0 === reason ? Error("The render was aborted by the server without a reason.") : "object" === typeof reason && null !== reason && "function" === typeof reason.then ? Error("The render was aborted by the server with a promise.") : reason;
        request.fatalError = reason;
        var abortableTasks = request.abortableTasks;
        abortableTasks.forEach(function(task) {
          return abortTask(task, request);
        });
        setImmediate(function() {
          return finishAbort(request, abortableTasks);
        });
      }
    }
    function addToReplayParent(node, parentKeyPath, trackedPostpones) {
      if (null === parentKeyPath) trackedPostpones.rootNodes.push(node);
      else {
        var workingMap = trackedPostpones.workingMap, parentNode = workingMap.get(parentKeyPath);
        void 0 === parentNode && (parentNode = [parentKeyPath[1], parentKeyPath[2], [], null], workingMap.set(parentKeyPath, parentNode), addToReplayParent(parentNode, parentKeyPath[0], trackedPostpones));
        parentNode[2].push(node);
      }
    }
    function getPostponedState(request) {
      var trackedPostpones = request.trackedPostpones;
      if (null === trackedPostpones || 0 === trackedPostpones.rootNodes.length && null === trackedPostpones.rootSlots)
        return request.trackedPostpones = null;
      var hasFlushableShell = null === request.completedRootSegment || 5 !== request.completedRootSegment.status && null !== request.completedPreambleSegments;
      if (hasFlushableShell) {
        var nextSegmentId = request.nextSegmentId;
        var replaySlots = trackedPostpones.rootSlots;
        var resumableState = request.resumableState;
        resumableState.bootstrapScriptContent = void 0;
        resumableState.bootstrapScripts = void 0;
        resumableState.bootstrapModules = void 0;
      } else {
        nextSegmentId = 0;
        replaySlots = -1;
        resumableState = request.resumableState;
        var renderState = request.renderState;
        resumableState.nextFormID = 0;
        resumableState.hasBody = false;
        resumableState.hasHtml = false;
        resumableState.unknownResources = { font: renderState.resets.font };
        resumableState.dnsResources = renderState.resets.dns;
        resumableState.connectResources = renderState.resets.connect;
        resumableState.imageResources = renderState.resets.image;
        resumableState.styleResources = renderState.resets.style;
        resumableState.scriptResources = {};
        resumableState.moduleUnknownResources = {};
        resumableState.moduleScriptResources = {};
        resumableState.instructions = 0;
      }
      trackedPostpones = {
        nextSegmentId,
        rootFormatContext: request.rootFormatContext,
        progressiveChunkSize: request.progressiveChunkSize,
        resumableState: request.resumableState,
        replayNodes: trackedPostpones.rootNodes,
        replaySlots
      };
      hasFlushableShell && (request.postponedState = trackedPostpones);
      return trackedPostpones;
    }
    function ensureCorrectIsomorphicReactVersion() {
      var isomorphicReactPackageVersion = React.version;
      if ("19.3.1" !== isomorphicReactPackageVersion)
        throw Error(
          'Incompatible React versions: The "react" and "react-dom" packages must have the exact same version. Instead got:\n  - react:      ' + (isomorphicReactPackageVersion + "\n  - react-dom:  19.3.1\nLearn more: https://react.dev/warnings/version-mismatch")
        );
    }
    ensureCorrectIsomorphicReactVersion();
    function createDrainHandler(destination, request) {
      return function() {
        return startFlowing(request, destination);
      };
    }
    function createCancelHandler(request, reason) {
      return function() {
        request.destination = null;
        abort(request, Error(reason));
      };
    }
    function createRequestImpl(children, options) {
      var resumableState = createResumableState(
        options ? options.identifierPrefix : void 0,
        options ? options.unstable_externalRuntimeSrc : void 0,
        options ? options.bootstrapScriptContent : void 0,
        options ? options.bootstrapScripts : void 0,
        options ? options.bootstrapModules : void 0
      );
      return createRequest(
        children,
        resumableState,
        createRenderState(
          resumableState,
          options ? options.nonce : void 0,
          options ? options.unstable_externalRuntimeSrc : void 0,
          options ? options.importMap : void 0,
          options ? options.onHeaders : void 0,
          options ? options.maxHeadersLength : void 0
        ),
        createRootFormatContext(options ? options.namespaceURI : void 0),
        options ? options.progressiveChunkSize : void 0,
        options ? options.onError : void 0,
        options ? options.onBrowserBailout : void 0,
        options ? options.onAllReady : void 0,
        options ? options.onShellReady : void 0,
        options ? options.onShellError : void 0,
        void 0,
        options ? options.formState : void 0
      );
    }
    function createFakeWritableFromReadableStreamController$1(controller) {
      return {
        write: function(chunk) {
          "string" === typeof chunk && (chunk = textEncoder.encode(chunk));
          controller.enqueue(chunk);
          return true;
        },
        end: function() {
          controller.close();
        },
        destroy: function(error) {
          "function" === typeof controller.error ? controller.error(error) : controller.close();
        }
      };
    }
    function resumeRequestImpl(children, postponedState, options) {
      return resumeRequest(
        children,
        postponedState,
        createRenderState(
          postponedState.resumableState,
          options ? options.nonce : void 0,
          void 0,
          void 0,
          void 0,
          void 0
        ),
        options ? options.onError : void 0,
        options ? options.onBrowserBailout : void 0,
        options ? options.onAllReady : void 0,
        options ? options.onShellReady : void 0,
        options ? options.onShellError : void 0,
        void 0
      );
    }
    ensureCorrectIsomorphicReactVersion();
    function createFakeWritableFromReadableStreamController(controller) {
      return {
        write: function(chunk) {
          "string" === typeof chunk && (chunk = textEncoder.encode(chunk));
          controller.enqueue(chunk);
          return true;
        },
        end: function() {
          controller.close();
        },
        destroy: function(error) {
          "function" === typeof controller.error ? controller.error(error) : controller.close();
        }
      };
    }
    function createFakeWritableFromReadable(readable) {
      return {
        write: function(chunk) {
          return readable.push(chunk);
        },
        end: function() {
          readable.push(null);
        },
        destroy: function(error) {
          readable.destroy(error);
        }
      };
    }
    exports.prerender = function(children, options) {
      return new Promise(function(resolve, reject) {
        var onHeaders = options ? options.onHeaders : void 0, onHeadersImpl;
        onHeaders && (onHeadersImpl = function(headersDescriptor) {
          onHeaders(new Headers(headersDescriptor));
        });
        var resources = createResumableState(
          options ? options.identifierPrefix : void 0,
          options ? options.unstable_externalRuntimeSrc : void 0,
          options ? options.bootstrapScriptContent : void 0,
          options ? options.bootstrapScripts : void 0,
          options ? options.bootstrapModules : void 0
        ), request = createPrerenderRequest(
          children,
          resources,
          createRenderState(
            resources,
            void 0,
            options ? options.unstable_externalRuntimeSrc : void 0,
            options ? options.importMap : void 0,
            onHeadersImpl,
            options ? options.maxHeadersLength : void 0
          ),
          createRootFormatContext(options ? options.namespaceURI : void 0),
          options ? options.progressiveChunkSize : void 0,
          options ? options.onError : void 0,
          options ? options.onBrowserBailout : void 0,
          function() {
            var writable, stream2 = new ReadableStream(
              {
                type: "bytes",
                start: function(controller) {
                  writable = createFakeWritableFromReadableStreamController(controller);
                },
                pull: function() {
                  startFlowing(request, writable);
                },
                cancel: function(reason) {
                  request.destination = null;
                  abort(request, reason);
                }
              },
              { highWaterMark: 0 }
            );
            stream2 = { postponed: getPostponedState(request), prelude: stream2 };
            resolve(stream2);
          },
          void 0,
          void 0,
          reject
        );
        options && options.signal && attachAbortSignal(request, options.signal);
        startWork(request);
      });
    };
    exports.prerenderToNodeStream = function(children, options) {
      return new Promise(function(resolve, reject) {
        var resumableState = createResumableState(
          options ? options.identifierPrefix : void 0,
          options ? options.unstable_externalRuntimeSrc : void 0,
          options ? options.bootstrapScriptContent : void 0,
          options ? options.bootstrapScripts : void 0,
          options ? options.bootstrapModules : void 0
        ), request = createPrerenderRequest(
          children,
          resumableState,
          createRenderState(
            resumableState,
            void 0,
            options ? options.unstable_externalRuntimeSrc : void 0,
            options ? options.importMap : void 0,
            options ? options.onHeaders : void 0,
            options ? options.maxHeadersLength : void 0
          ),
          createRootFormatContext(options ? options.namespaceURI : void 0),
          options ? options.progressiveChunkSize : void 0,
          options ? options.onError : void 0,
          options ? options.onBrowserBailout : void 0,
          function() {
            var readable = new stream.Readable({
              read: function() {
                startFlowing(request, writable);
              }
            }), writable = createFakeWritableFromReadable(readable);
            readable = {
              postponed: getPostponedState(request),
              prelude: readable
            };
            resolve(readable);
          },
          void 0,
          void 0,
          reject
        );
        options && options.signal && attachAbortSignal(request, options.signal);
        startWork(request);
      });
    };
    exports.renderToPipeableStream = function(children, options) {
      var request = createRequestImpl(children, options), hasStartedFlowing = false;
      startWork(request);
      return {
        pipe: function(destination) {
          if (hasStartedFlowing)
            throw Error(
              "React currently only supports piping to one writable stream."
            );
          hasStartedFlowing = true;
          safelyEmitEarlyPreloads(
            request,
            null === request.trackedPostpones ? 0 === request.pendingRootTasks : null === request.completedRootSegment ? 0 === request.pendingRootTasks : 5 !== request.completedRootSegment.status
          );
          startFlowing(request, destination);
          destination.on("drain", createDrainHandler(destination, request));
          destination.on(
            "error",
            createCancelHandler(
              request,
              "The destination stream errored while writing data."
            )
          );
          destination.on(
            "close",
            createCancelHandler(request, "The destination stream closed early.")
          );
          return destination;
        },
        abort: function(reason) {
          abort(request, reason);
        }
      };
    };
    exports.renderToReadableStream = function(children, options) {
      return new Promise(function(resolve, reject) {
        var onFatalError, onAllReady, allReady = new Promise(function(res, rej) {
          onAllReady = res;
          onFatalError = rej;
        }), onHeaders = options ? options.onHeaders : void 0, onHeadersImpl;
        onHeaders && (onHeadersImpl = function(headersDescriptor) {
          onHeaders(new Headers(headersDescriptor));
        });
        var resumableState = createResumableState(
          options ? options.identifierPrefix : void 0,
          options ? options.unstable_externalRuntimeSrc : void 0,
          options ? options.bootstrapScriptContent : void 0,
          options ? options.bootstrapScripts : void 0,
          options ? options.bootstrapModules : void 0
        ), request = createRequest(
          children,
          resumableState,
          createRenderState(
            resumableState,
            options ? options.nonce : void 0,
            options ? options.unstable_externalRuntimeSrc : void 0,
            options ? options.importMap : void 0,
            onHeadersImpl,
            options ? options.maxHeadersLength : void 0
          ),
          createRootFormatContext(options ? options.namespaceURI : void 0),
          options ? options.progressiveChunkSize : void 0,
          options ? options.onError : void 0,
          options ? options.onBrowserBailout : void 0,
          onAllReady,
          function() {
            var writable, stream2 = new ReadableStream(
              {
                type: "bytes",
                start: function(controller) {
                  writable = createFakeWritableFromReadableStreamController$1(
                    controller
                  );
                },
                pull: function() {
                  startFlowing(request, writable);
                },
                cancel: function(reason) {
                  request.destination = null;
                  abort(request, reason);
                }
              },
              { highWaterMark: 0 }
            );
            stream2.allReady = allReady;
            resolve(stream2);
          },
          function(error) {
            allReady.catch(function() {
            });
            reject(error);
          },
          onFatalError,
          options ? options.formState : void 0
        );
        options && options.signal && attachAbortSignal(request, options.signal);
        startWork(request);
      });
    };
    exports.resume = function(children, postponedState, options) {
      return new Promise(function(resolve, reject) {
        var onFatalError, onAllReady, allReady = new Promise(function(res, rej) {
          onAllReady = res;
          onFatalError = rej;
        }), request = resumeRequest(
          children,
          postponedState,
          createRenderState(
            postponedState.resumableState,
            options ? options.nonce : void 0,
            void 0,
            void 0,
            void 0,
            void 0
          ),
          options ? options.onError : void 0,
          options ? options.onBrowserBailout : void 0,
          onAllReady,
          function() {
            var writable, stream2 = new ReadableStream(
              {
                type: "bytes",
                start: function(controller) {
                  writable = createFakeWritableFromReadableStreamController$1(
                    controller
                  );
                },
                pull: function() {
                  startFlowing(request, writable);
                },
                cancel: function(reason) {
                  request.destination = null;
                  abort(request, reason);
                }
              },
              { highWaterMark: 0 }
            );
            stream2.allReady = allReady;
            resolve(stream2);
          },
          function(error) {
            allReady.catch(function() {
            });
            reject(error);
          },
          onFatalError
        );
        options && options.signal && attachAbortSignal(request, options.signal);
        startWork(request);
      });
    };
    exports.resumeAndPrerender = function(children, postponedState, options) {
      return new Promise(function(resolve, reject) {
        var request = resumeAndPrerenderRequest(
          children,
          postponedState,
          createRenderState(
            postponedState.resumableState,
            void 0,
            void 0,
            void 0,
            void 0,
            void 0
          ),
          options ? options.onError : void 0,
          options ? options.onBrowserBailout : void 0,
          function() {
            var writable, stream2 = new ReadableStream(
              {
                type: "bytes",
                start: function(controller) {
                  writable = createFakeWritableFromReadableStreamController(controller);
                },
                pull: function() {
                  startFlowing(request, writable);
                },
                cancel: function(reason) {
                  request.destination = null;
                  abort(request, reason);
                }
              },
              { highWaterMark: 0 }
            );
            stream2 = { postponed: getPostponedState(request), prelude: stream2 };
            resolve(stream2);
          },
          void 0,
          void 0,
          reject
        );
        options && options.signal && attachAbortSignal(request, options.signal);
        startWork(request);
      });
    };
    exports.resumeAndPrerenderToNodeStream = function(children, postponedState, options) {
      return new Promise(function(resolve, reject) {
        var request = resumeAndPrerenderRequest(
          children,
          postponedState,
          createRenderState(
            postponedState.resumableState,
            void 0,
            void 0,
            void 0,
            void 0,
            void 0
          ),
          options ? options.onError : void 0,
          options ? options.onBrowserBailout : void 0,
          function() {
            var readable = new stream.Readable({
              read: function() {
                startFlowing(request, writable);
              }
            }), writable = createFakeWritableFromReadable(readable);
            readable = { postponed: getPostponedState(request), prelude: readable };
            resolve(readable);
          },
          void 0,
          void 0,
          reject
        );
        options && options.signal && attachAbortSignal(request, options.signal);
        startWork(request);
      });
    };
    exports.resumeToPipeableStream = function(children, postponedState, options) {
      var request = resumeRequestImpl(children, postponedState, options), hasStartedFlowing = false;
      startWork(request);
      return {
        pipe: function(destination) {
          if (hasStartedFlowing)
            throw Error(
              "React currently only supports piping to one writable stream."
            );
          hasStartedFlowing = true;
          startFlowing(request, destination);
          destination.on("drain", createDrainHandler(destination, request));
          destination.on(
            "error",
            createCancelHandler(
              request,
              "The destination stream errored while writing data."
            )
          );
          destination.on(
            "close",
            createCancelHandler(request, "The destination stream closed early.")
          );
          return destination;
        },
        abort: function(reason) {
          abort(request, reason);
        }
      };
    };
    exports.version = "19.3.1";
  }
});

// node_modules/.pnpm/react-dom@19.3.1_react@19.3.1/node_modules/react-dom/server.node.js
var require_server_node = __commonJS({
  "node_modules/.pnpm/react-dom@19.3.1_react@19.3.1/node_modules/react-dom/server.node.js"(exports) {
    "use strict";
    var l;
    var s;
    if (true) {
      l = require_react_dom_server_legacy_node_production();
      s = require_react_dom_server_node_production();
    } else {
      l = null;
      s = null;
    }
    exports.version = l.version;
    exports.renderToString = l.renderToString;
    exports.renderToStaticMarkup = l.renderToStaticMarkup;
    exports.renderToPipeableStream = s.renderToPipeableStream;
    exports.renderToReadableStream = s.renderToReadableStream;
    exports.resumeToPipeableStream = s.resumeToPipeableStream;
    exports.resume = s.resume;
  }
});

// node_modules/.pnpm/react@19.3.1/node_modules/react/cjs/react-jsx-runtime.production.js
var require_react_jsx_runtime_production = __commonJS({
  "node_modules/.pnpm/react@19.3.1/node_modules/react/cjs/react-jsx-runtime.production.js"(exports) {
    "use strict";
    var REACT_ELEMENT_TYPE = /* @__PURE__ */ Symbol.for("react.transitional.element");
    var REACT_FRAGMENT_TYPE = /* @__PURE__ */ Symbol.for("react.fragment");
    function jsxProd(type, config, maybeKey) {
      var key = null;
      void 0 !== maybeKey && (key = "" + maybeKey);
      void 0 !== config.key && (key = "" + config.key);
      if ("key" in config) {
        maybeKey = {};
        for (var propName in config)
          "key" !== propName && (maybeKey[propName] = config[propName]);
      } else maybeKey = config;
      config = maybeKey.ref;
      return {
        $$typeof: REACT_ELEMENT_TYPE,
        type,
        key,
        ref: void 0 !== config ? config : null,
        props: maybeKey
      };
    }
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsx = jsxProd;
    exports.jsxs = jsxProd;
  }
});

// node_modules/.pnpm/react@19.3.1/node_modules/react/jsx-runtime.js
var require_jsx_runtime = __commonJS({
  "node_modules/.pnpm/react@19.3.1/node_modules/react/jsx-runtime.js"(exports, module) {
    "use strict";
    if (true) {
      module.exports = require_react_jsx_runtime_production();
    } else {
      module.exports = null;
    }
  }
});

// src/build.ts
import process4 from "node:process";

// src/csv.ts
var HEADER = ["\u7A2E\u5225", "ID", "\u6A5F\u80FD", "\u72B6\u614B", "\u672C\u6587", "\u624B\u9806", "\u5F15\u7528\u5143", "\u30B3\u30E1\u30F3\u30C8(\u4FEE\u6B63\u306E\u4F9D\u983C)"];
var BOM = "\uFEFF";
var RECORD_SEPARATOR = "\r\n";
function cell(value) {
  return /[",\r\n]/.test(value) ? `"${value.replaceAll('"', '""')}"` : value;
}
function csvRows(data) {
  return [...data.features.flatMap((feature) => [feature.row, ...feature.items]), ...data.candidates.map((candidate) => candidate.row)];
}
function toCsv(rows) {
  const records = [HEADER, ...rows.map((r) => [r.kind, r.id, r.feature, r.status, r.body, r.steps, r.source, ""])];
  return `${BOM}${records.map((record) => record.map(cell).join(",")).join(RECORD_SEPARATOR)}${RECORD_SEPARATOR}`;
}

// src/document.tsx
var import_server = __toESM(require_server_node(), 1);

// node_modules/.pnpm/@fontsource-variable+atkinson-hyperlegible-next@5.3.0/node_modules/@fontsource-variable/atkinson-hyperlegible-next/files/atkinson-hyperlegible-next-latin-wght-normal.woff2
var atkinson_hyperlegible_next_latin_wght_normal_default = "data:font/woff2;base64,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";

// src/font.ts
var fontFaceCss = [
  "/* Atkinson Hyperlegible Next: Copyright 2020-2024 The Atkinson Hyperlegible Next Project Authors (https://github.com/googlefonts/atkinson-hyperlegible-next)",
  "   SIL Open Font License 1.1 https://openfontlicense.org */",
  "@font-face {",
  '  font-family: "Atkinson Hyperlegible Next";',
  "  font-style: normal;",
  "  font-weight: 200 800;",
  "  font-display: swap;",
  `  src: url("${atkinson_hyperlegible_next_latin_wght_normal_default}") format("woff2");`,
  "  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;",
  "}"
].join("\n");

// src/styles.css
var styles_default = '/* \u8272\u3002\u7D19(\u5730)\u30FB\u58A8(\u6587\u5B57\u3068\u592A\u3044\u7F6B)\u30FB\u9752\u925B\u7B46(\u30AD\u30FC\u30EF\u30FC\u30C9\u30FB\u30EA\u30F3\u30AF\u30FB\u30D5\u30A9\u30FC\u30AB\u30B9\u67A0\u30FB\u3064\u307E\u307F)\u30FB\u8981\u4EF6\u306E\u5730\u30FB\u7F6B\u30FB\u8584\u58A8(slug \u3068\u88DC\u8DB3)\u30FB\u6731(fail)\u30FB\u78BA\u8A8D\u3057\u305F\u3044\u3053\u3068\u306E\u5730 */\n:root {\n  --paper: #ffffff;\n  --ink: #1d2433;\n  --pencil: #2457a6;\n  --requirement: #eef3fb;\n  --rule: #c9d3e3;\n  --muted: #5b6475;\n  --fail: #b3261e;\n  --question: #fff4d6;\n}\n/* \u82F1\u5B57\u3068\u6570\u5B57\u306F\u540C\u68B1\u306E\u66F8\u4F53\u3001\u65E5\u672C\u8A9E\u306F OS \u306E\u66F8\u4F53\u3002\u6570\u5B57\u306E\u5E45\u3092\u305D\u308D\u3048\u3001ID \u3068\u4EF6\u6570\u306E\u6841\u3092\u7E26\u306B\u305D\u308D\u3048\u308B */\nbody {\n  font-family:\n    "Atkinson Hyperlegible Next", "Hiragino Sans", "Hiragino Kaku Gothic ProN", "Yu Gothic UI", "Yu Gothic", Meiryo, "Noto Sans CJK JP",\n    "Noto Sans JP", sans-serif;\n  font-variant-numeric: tabular-nums;\n  font-size: 16px;\n  line-height: 1.7;\n  margin: 2rem;\n  background: var(--paper);\n  color: var(--ink);\n}\nh1 {\n  font-size: 36px;\n  font-weight: 700;\n  letter-spacing: -0.01em;\n  line-height: 1.2;\n  margin: 0 0 0.75rem;\n}\n/* \u30DA\u30FC\u30B8\u306E\u5148\u982D\u306E\u4EF6\u6570\u30FB\u30C6\u30B9\u30C8\u306E\u7D50\u679C\u30FBCSV \u3078\u306E\u30EA\u30F3\u30AF\u30FB\u4FDD\u5B58\u306E\u3057\u304B\u305F */\nmain > p {\n  margin: 0.25rem 0;\n}\n.note {\n  font-size: 14px;\n  color: var(--muted);\n}\na {\n  color: var(--pencil);\n}\na:focus-visible {\n  outline: 2px solid var(--pencil);\n  outline-offset: 2px;\n}\n/* \u7D50\u679C\u306E fail \u3068\u3001\u4EF6\u6570\u306E\u4E2D\u306E fail N */\n.fail {\n  color: var(--fail);\n  font-weight: 700;\n}\n/* \u6A5F\u80FD\u540D\u3068\u5019\u88DC\u306E\u540D\u524D\u306E\u4E0B\u306B\u5C0F\u3055\u304F\u51FA\u3059 slug */\n.slug {\n  display: block;\n  font-size: 14px;\n  color: var(--muted);\n}\n/* \u4E00\u89A7\u8868\u306E\u8AAC\u660E\u3002\u72ED\u3044\u753B\u9762\u3067\u8868\u3092\u4E2D\u8EAB\u306E\u5E45\u306B\u3057\u3066\u3082\u30011 \u884C\u306B\u4F38\u3070\u3055\u306A\u3044 */\n.summary {\n  max-width: 24em;\n}\n/* \u30B7\u30CA\u30EA\u30AA\u306E\u7D50\u679C\u306E\u7406\u7531\u3068\u3001\u30C6\u30B9\u30C8\u30D5\u30A1\u30A4\u30EB\u3078\u306E\u30EA\u30F3\u30AF\u3002\u30D1\u30B9\u306F\u7A7A\u767D\u304C\u7121\u3044\u306E\u3067\u3001\u5217\u306E\u5E45\u306B\u53CE\u307E\u308B\u3088\u3046\u3069\u3053\u3067\u3067\u3082\u6298\u308A\u8FD4\u3059 */\n.reason {\n  font-size: 14px;\n}\n.spec-link {\n  font-size: 14px;\n  overflow-wrap: anywhere;\n}\n/* \u6A5F\u80FD\u306E\u4E00\u89A7\u8868\u3068\u3001\u6A5F\u80FD\u3054\u3068\u306E\u8981\u4EF6\u3068\u30B7\u30CA\u30EA\u30AA\u306E\u8868\u306E\u5916\u67A0\u3002\u5217\u3092\u5E83\u3052\u3066\u8868\u304C\u753B\u9762\u3088\u308A\u5E83\u304F\u306A\u3063\u305F\u3089\u3001\u3053\u3053\u3067\u6A2A\u306B\u30B9\u30AF\u30ED\u30FC\u30EB\u3059\u308B */\n.table-scroll {\n  overflow-x: auto;\n  margin: 1rem 0;\n}\ntable {\n  border-collapse: collapse;\n}\n/* break-word \u306F\u81EA\u52D5\u306E\u5217\u306E\u5E45\u3092\u5909\u3048\u305A\u3001\u5217\u306E\u5E45\u3092\u72ED\u3081\u305F\u3068\u304D\u3060\u3051\u9577\u3044\u8A9E\u3092\u6298\u308A\u8FD4\u3059\u3002\u7E26\u306E\u7F6B\u306F\u3001\u5E45\u3092\u5909\u3048\u3089\u308C\u308B\u5217\u306E\u5883\u76EE\u304C\u898B\u3048\u308B\u3088\u3046\u7F6B\u306E\u8272\u3067\u6B8B\u3059 */\nth,\ntd {\n  border: 1px solid var(--rule);\n  padding: 0.5rem 0.75rem;\n  text-align: left;\n  vertical-align: top;\n  overflow-wrap: break-word;\n}\n/* \u898B\u51FA\u3057\u306F\u5730\u3092\u4ED8\u3051\u305A\u3001\u58A8\u306E\u592A\u5B57\u3068\u4E0B\u306E\u592A\u3044\u7F6B\u3067\u672C\u6587\u3068\u5206\u3051\u308B */\nth {\n  position: relative;\n  color: var(--ink);\n  font-weight: 700;\n  border-bottom: 2px solid var(--ink);\n}\n/* \u4EF6\u6570\u306F\u53F3\u306B\u5BC4\u305B\u3001\u6841\u3092\u305D\u308D\u3048\u308B */\nth.number,\ntd.number {\n  text-align: right;\n}\n/* \u5217\u306E\u5E45\u3092\u5909\u3048\u308B\u3064\u307E\u307F\u3002column-resize.ts \u304C\u898B\u51FA\u3057\u306E\u30BB\u30EB\u306E\u53F3\u7AEF\u306B\u8DB3\u3059\u3002\u666E\u6BB5\u306F\u7F6B\u306E\u8272\u306E\u7D30\u3044\u7DDA\u3001\u6307\u3057\u305F\u3068\u304D\u3068\u30D5\u30A9\u30FC\u30AB\u30B9\u3067\u9752\u925B\u7B46\u306E\u592A\u3044\u7DDA\u306B\u3059\u308B */\n.col-resize {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  width: 0.5rem;\n  cursor: col-resize;\n  touch-action: none;\n}\n.col-resize::after {\n  content: "";\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  right: 0;\n  width: 1px;\n  background: var(--rule);\n}\n.col-resize:focus-visible {\n  outline: 2px solid var(--pencil);\n  outline-offset: -2px;\n}\n.col-resize:hover::after,\n.col-resize:focus-visible::after {\n  width: 2px;\n  background: var(--pencil);\n}\n/* \u624B\u9806\u306E\u4E2D\u306E DataTable \u3068 Examples \u306E\u8868\u3002\u5916\u306E\u8868\u306E\u5217\u306E\u5E45\u306B\u53CE\u307E\u308B\u3088\u3046\u3001\u9577\u3044\u30BB\u30EB\u306F\u3069\u3053\u3067\u3067\u3082\u6298\u308A\u8FD4\u3059 */\n.step-table {\n  margin: 0.25rem 0;\n}\n.step-table th,\n.step-table td {\n  padding: 0.25rem 0.5rem;\n  overflow-wrap: anywhere;\n}\n/* \u8981\u4EF6\u306E\u884C\u306F\u6DE1\u3044\u9752\u306E\u5730\u3068\u4E0A\u306E\u592A\u3044\u7F6B\u3067\u3001\u914D\u4E0B\u306E\u30B7\u30CA\u30EA\u30AA\u306E\u884C\u3068\u5206\u3051\u308B\u3002\u624B\u9806\u306E\u4E2D\u306E\u8868\u306E\u30BB\u30EB\u306B\u306F\u5F53\u3066\u306A\u3044 */\ntr.requirement > td {\n  background: var(--requirement);\n  border-top: 2px solid var(--ink);\n}\n/* \u6A5F\u80FD\u306E\u7BC0\u306E\u8981\u4EF6\u3068\u30B7\u30CA\u30EA\u30AA\u306E\u8868\u306F\u3001\u30DA\u30FC\u30B8\u306E\u5E45\u3044\u3063\u3071\u3044\u306B\u63CF\u304F\u3002\u5217\u306E\u5E45\u306F ViewerPage.tsx \u306E colgroup \u3067\u6C7A\u3081\u3001\u4E2D\u8EAB\u3067\u306F\u5909\u3048\u306A\u3044 */\nsection > .table-scroll > table {\n  width: 100%;\n  table-layout: fixed;\n}\n/* \u6A5F\u80FD\u306E\u7BC0\u306E\u8868\u306E ID(1 \u5217\u76EE)\u306F\u6298\u308A\u8FD4\u3055\u306A\u3044\u3002REQ-001-1 \u304C REQ-001- \u3068 1 \u306B\u5206\u304B\u308C\u308B\u3068\u3001\u5225\u306E ID \u306B\u8AAD\u3081\u308B\u3002\u624B\u9806\u306E\u4E2D\u306E\u8868\u306E 1 \u5217\u76EE\u306F\u542B\u3081\u306A\u3044 */\nsection > .table-scroll > table > tbody > tr > td:first-child {\n  white-space: nowrap;\n}\n.text {\n  white-space: pre-wrap;\n}\n/* \u884C\u982D\u306E\u30AD\u30FC\u30EF\u30FC\u30C9\u3068\u672C\u6587\u306E 2 \u5217\u3002\u30AD\u30FC\u30EF\u30FC\u30C9\u306E\u5217\u306F\u305D\u306E\u30BB\u30EB\u3067\u6700\u9577\u306E\u30AD\u30FC\u30EF\u30FC\u30C9\u306E\u5E45\u306B\u3057\u3066\u53F3\u306B\u5BC4\u305B\u3001\u672C\u6587\u30FB\u624B\u9806\u306E\u8868\u30FBDocString \u306E\u5DE6\u7AEF\u3092 1 \u672C\u306E\u7DDA\u306B\u305D\u308D\u3048\u308B\u3002\n   \u533A\u5207\u308A\u306E\u7A7A\u767D\u3092\u30B0\u30EA\u30C3\u30C9\u306E\u9805\u76EE\u306B\u3057\u306A\u3044\u3088\u3046\u3001\u7A7A\u767D\u306F\u8A70\u3081\u308B(\u672C\u6587\u306E\u4E2D\u306E\u7A7A\u767D\u306F .keyword-text \u3067\u4FDD\u3064) */\n.keyword-grid {\n  display: grid;\n  grid-template-columns: max-content minmax(0, 1fr);\n  column-gap: 0.5rem;\n  align-items: baseline;\n  white-space: normal;\n}\n.keyword-line {\n  display: contents;\n}\n.keyword {\n  grid-column: 1;\n  text-align: right;\n  white-space: nowrap;\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--pencil);\n}\n.keyword-text {\n  grid-column: 2;\n  white-space: pre-wrap;\n}\n/* DocString\u3002\u533A\u5207\u308A\u884C\u3092\u542B\u3081\u3066\u6539\u884C\u3092\u4FDD\u3061\u3001\u6587\u5B57\u306F\u5468\u308A\u3068\u540C\u3058\u306B\u3059\u308B */\n.doc-string {\n  margin: 0;\n  font-family: inherit;\n  white-space: pre-wrap;\n}\n.keyword-grid > .step-table,\n.keyword-grid > .doc-string {\n  grid-column: 2;\n}\n/* \u6A5F\u80FD\u306E\u7BC0\u3002\u4E0A\u306E\u592A\u3044\u7F6B\u3067\u524D\u306E\u7BC0\u3068\u5206\u3051\u308B */\nsection {\n  margin-top: 3rem;\n  padding-top: 1rem;\n  border-top: 3px solid var(--ink);\n}\nh2 {\n  font-size: 21px;\n  font-weight: 700;\n  line-height: 1.4;\n  margin: 0 0 0.75rem;\n}\nh2 .status {\n  margin-left: 0.5rem;\n  font-size: 14px;\n  font-weight: 400;\n  color: var(--muted);\n}\n.status-mark {\n  margin-right: 0.25em;\n}\n/* \u7167\u5408\u30C4\u30FC\u30EB\u306E\u4E0D\u6574\u5408\u306E\u7BC0\u3068\u3001\u6A5F\u80FD\u306B\u3059\u308B\u304B\u6C7A\u307E\u3063\u3066\u3044\u306A\u3044\u3082\u306E\u306E\u8868\u3002\u6A5F\u80FD\u306E\u7BC0\u3088\u308A\u524D\u306B\u7F6E\u304F\u306E\u3067\u3001\u4E0A\u306E\u4F59\u767D\u3067\u524D\u306E\u3082\u306E\u3068\u5206\u3051\u308B */\n.notices > h2,\n.candidates > h2 {\n  margin-top: 2rem;\n}\n/* \u5BFE\u8C61\u3068\u6839\u62E0\u306B\u306F\u3001\u7A7A\u767D\u306E\u7121\u3044\u9577\u3044\u30D1\u30B9\u3084 URL \u304C\u5165\u308A\u3046\u308B\u3002\u3069\u3053\u3067\u3067\u3082\u6298\u308A\u8FD4\u3057\u3001\u8868\u3092\u5916\u67A0\u306E\u5E45\u306B\u53CE\u3081\u308B */\n.notices td:last-child,\n.candidates td:last-child {\n  overflow-wrap: anywhere;\n}\n/* 640px \u4EE5\u4E0A\u3067\u306F\u3001\u4E0D\u6574\u5408\u306E\u7A2E\u5225\u3068\u6A5F\u80FD\u3092 1 \u884C\u306B\u4FDD\u3061\u3001\u5BFE\u8C61\u306E\u5217\u3092\u6298\u308A\u8FD4\u3059\u3002640px \u672A\u6E80\u3067\u306F\u3001\u3069\u306E\u5217\u3082\u6298\u308A\u8FD4\u3057\u3066\u753B\u9762\u306E\u5E45\u306B\u53CE\u3081\u308B */\n@media (min-width: 640px) {\n  .notices td:not(:last-child) {\n    white-space: nowrap;\n  }\n}\n/* \u6A5F\u80FD\u306E\u4E00\u89A7\u8868\u306F\u8AAC\u660E\u306E\u5217\u3060\u3051\u3092\u6298\u308A\u8FD4\u3059\u3002\u8AAC\u660E\u306E\u5217\u3092\u8DB3\u3057\u3066\u8868\u304C\u5916\u67A0\u306E\u5E45\u306B\u5C4A\u3044\u3066\u3082\u3001\u6A5F\u80FD\u540D\u30FB\u72B6\u614B\u30FB\u4EF6\u6570\u30FB\u7D50\u679C\u30FB\u898B\u51FA\u3057\u3092 1 \u884C\u306B\u4FDD\u3064 */\nmain > .table-scroll > table th,\nmain > .table-scroll > table td {\n  white-space: nowrap;\n}\nmain > .table-scroll > table .summary {\n  white-space: normal;\n}\n/* \u6A5F\u80FD\u306E\u7BC0\u306E\u6982\u8981\u30FB\u542B\u3080\u30FB\u542B\u307E\u306A\u3044\u30FB\u6839\u62E0\u30FB\u78BA\u8A8D\u3057\u305F\u3044\u3053\u3068\u30FB\u6C7A\u3081\u305F\u3053\u3068\u30FBBackground\u30FB\u5F15\u7528\u5143\u3002\u540D\u524D\u3068\u5024\u306E 2 \u5217 */\n.details {\n  display: grid;\n  grid-template-columns: max-content minmax(0, 1fr);\n  column-gap: 1.5rem;\n  row-gap: 0.5rem;\n  align-items: baseline;\n  margin: 0 0 1rem;\n}\n.details > div {\n  display: contents;\n}\n.details dt {\n  font-size: 14px;\n  color: var(--muted);\n}\n.details dd {\n  margin: 0;\n}\n/* \u78BA\u8A8D\u3057\u305F\u3044\u3053\u3068\u306F\u3001\u5730\u306E\u8272\u3067\u76EE\u7ACB\u305F\u305B\u308B */\n.details dd.questions {\n  background: var(--question);\n  padding: 0.25rem 0.5rem;\n}\n/* \u542B\u3080\u30FB\u542B\u307E\u306A\u3044\u30FB\u6839\u62E0\u30FB\u78BA\u8A8D\u3057\u305F\u3044\u3053\u3068\u3068\u3001\u5019\u88DC\u306E\u6839\u62E0\u306E\u7B87\u6761\u66F8\u304D\u3002\u4F59\u767D\u3092\u8A70\u3081\u308B */\n.details ul,\n.candidates ul {\n  margin: 0;\n  padding-left: 1.25em;\n}\n/*\n  640px \u672A\u6E80\u3067\u306F\u540D\u524D\u306E\u4E0B\u306B\u5024\u3092\u7A4D\u3080\u3002\u8868\u306F\u753B\u9762\u306E\u5E45\u306B\u7E2E\u3081\u305A\u3001\u5916\u67A0\u3067\u6A2A\u306B\u30B9\u30AF\u30ED\u30FC\u30EB\u3059\u308B\u3002\n  \u6A5F\u80FD\u306E\u4E00\u89A7\u8868\u306F\u4E2D\u8EAB\u306E\u5E45\u3092\u4FDD\u3061\u3001\u6A5F\u80FD\u306E\u7BC0\u306E\u8868\u306F 30:40:15:15 \u306E\u5217\u304C\u8AAD\u3081\u308B\u5E45\u3092\u4E0B\u9650\u306B\u3059\u308B\n*/\n@media (max-width: 639.98px) {\n  .details {\n    grid-template-columns: minmax(0, 1fr);\n    row-gap: 0.25rem;\n  }\n  main > .table-scroll > table {\n    width: max-content;\n  }\n  section > .table-scroll > table {\n    min-width: 48rem;\n  }\n}\n';

// src/ViewerPage.tsx
var import_react = __toESM(require_react(), 1);

// src/ears.ts
var KEYWORDS = ["WHEN", "WHILE", "WHERE", "IF", "THEN", "SHALL"];
var AFTER_THEN_RE = /(?:^|\s)THEN$/;
var LEADING_KEYWORD_RE = /^(?:THEN\s+the|WHEN|WHILE|WHERE|IF|THEN|SHALL|the|The)(?=\s|$)/;
function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function splitRequirement(text, app) {
  const keyword = `(?=(?:${KEYWORDS.join("|")})(?:\\s|$))`;
  const subject = `(?<subject>the\\s+${escapeRegExp(app)})(?=\\s|$)`;
  const marker = new RegExp(`(?<=\\S)(?<space>\\s+)(?:${keyword}|${subject})`, "g");
  const lines = [];
  let start = 0;
  for (const match of text.matchAll(marker)) {
    if (match.groups?.subject !== void 0 && AFTER_THEN_RE.test(text.slice(0, match.index))) continue;
    lines.push(text.slice(start, match.index));
    start = match.index + (match.groups?.space.length ?? 0);
  }
  lines.push(text.slice(start));
  return lines;
}
function splitKeyword(line) {
  const keyword = LEADING_KEYWORD_RE.exec(line)?.[0];
  if (keyword === void 0) return { keyword: "", text: line };
  return { keyword, text: line.slice(keyword.length).trimStart() };
}

// src/ViewerPage.tsx
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
function countOf(items, kind) {
  return items.filter((row) => row.kind === kind).length;
}
function idColumnWidth(items) {
  const chars = Math.max(0, ...items.map((row) => row.id.length));
  return `calc(${chars + 1}ch + 1.5rem + 1px)`;
}
var STATUS_MARKS = { \u672A\u7740\u624B: "\u25CB", \u5B9A\u7FA9\u6E08\u307F: "\u25D0", \u30C6\u30B9\u30C8\u6E08\u307F: "\u25CF", \u5BFE\u8C61\u5916: "\u2715" };
var EMPTY_NOTES = { \u672A\u7740\u624B: "\u8981\u4EF6\u3068\u30B7\u30CA\u30EA\u30AA\u306F\u307E\u3060\u3042\u308A\u307E\u305B\u3093\u3002", \u5BFE\u8C61\u5916: "\u30C6\u30B9\u30C8\u306E\u5BFE\u8C61\u304B\u3089\u5916\u3057\u3066\u3044\u307E\u3059\u3002" };
var COUNT_LABELS = [
  ["pass", "pass"],
  ["fail", "fail"],
  ["knownBug", "\u65E2\u77E5\u30D0\u30B0"],
  ["ungenerated", "\u672A\u751F\u6210"],
  ["notRun", "\u672A\u5B9F\u884C"]
];
function Status({ status }) {
  const mark = STATUS_MARKS[status];
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "status", children: [
    mark !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "status-mark", "aria-hidden": "true", children: mark }),
    status
  ] });
}
function Counts({ counts, withZero = false }) {
  const parts = COUNT_LABELS.filter(([key]) => withZero || counts[key] > 0);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: parts.map(([key, label], index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [
    index > 0 && "\u3001",
    key === "fail" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "fail", children: `${label} ${counts[key]}` }) : `${label} ${counts[key]}`
  ] }, key)) });
}
function RunSummary({ lastRun, totals }) {
  if (lastRun === null) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "\u5168\u4F53\u5B9F\u884C\u306E\u7D50\u679C\u306F\u307E\u3060\u3042\u308A\u307E\u305B\u3093\u3002" });
  const startTime = lastRun.startTime === null ? "" : `(${lastRun.startTime})`;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
    `\u6700\u5F8C\u306E\u5168\u4F53\u5B9F\u884C: ${lastRun.runId}${startTime}\u3002`,
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Counts, { counts: totals, withZero: true }),
    "\u3002"
  ] });
}
function BulletList({ items }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: Array.from(items.entries(), ([position, item]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: item }, position)) });
}
function ViewerPage({ app, lastRun, totals, notices, features, candidates }) {
  const items = features.flatMap((feature) => feature.items);
  const idWidth = idColumnWidth(items);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: app }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: `E2E \u30C6\u30B9\u30C8\u306E\u4ED5\u69D8\u3002\u6A5F\u80FD ${features.length}\u3001\u8981\u4EF6 ${countOf(items, "\u8981\u4EF6")}\u3001\u30B7\u30CA\u30EA\u30AA ${countOf(items, "\u30B7\u30CA\u30EA\u30AA")}\u3002` }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RunSummary, { lastRun, totals }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
      "\u30EC\u30D3\u30E5\u30FC\u7528\u306E CSV: ",
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", { href: "review.csv", children: "review.csv" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "note", children: "\u30B3\u30E1\u30F3\u30C8\u306E\u5217\u306B\u4FEE\u6B63\u306E\u4F9D\u983C\u3092\u66F8\u304D\u3001Excel \u3067\u306F\u300CCSV UTF-8\u300D\u3092\u9078\u3093\u3067 features/viewer/ \u306E\u5916\u306B\u4FDD\u5B58\u3059\u308B" }),
    notices.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Notices, { notices }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "table-scroll", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", { className: "resizable", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "\u6A5F\u80FD\u540D" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "\u72B6\u614B" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "\u8AAC\u660E" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "number", children: "\u8981\u4EF6\u6570" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "number", children: "\u30B7\u30CA\u30EA\u30AA\u6570" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "\u7D50\u679C" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "\u78BA\u8A8D\u3057\u305F\u3044\u3053\u3068" })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: features.map(({ row, summary, questions, counts, items: featureItems }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", { href: `#${row.id}`, children: row.feature }),
          " ",
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "slug", children: row.id })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Status, { status: row.status }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "summary", children: summary }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { className: "number", children: countOf(featureItems, "\u8981\u4EF6") }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { className: "number", children: countOf(featureItems, "\u30B7\u30CA\u30EA\u30AA") }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: counts !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Counts, { counts }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: questions.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", { href: `#${row.id}`, children: `${questions.length} \u4EF6` }) })
      ] }, row.id)) })
    ] }) }),
    candidates.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Candidates, { candidates }),
    features.map((feature) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeatureSection, { app, idWidth, feature }, feature.row.id))
  ] });
}
function Notices({ notices }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "notices", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "\u7167\u5408\u30C4\u30FC\u30EB\u306E\u4E0D\u6574\u5408" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "table-scroll", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "\u7A2E\u5225" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "\u6A5F\u80FD" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "\u5BFE\u8C61" })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: Array.from(notices.entries(), ([position, { kind, feature, target }]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: kind }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: feature }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: target })
      ] }, position)) })
    ] }) })
  ] });
}
function Candidates({ candidates }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "candidates", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "\u6A5F\u80FD\u306B\u3059\u308B\u304B\u6C7A\u307E\u3063\u3066\u3044\u306A\u3044\u3082\u306E" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "table-scroll", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "\u540D\u524D" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "\u7406\u7531" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "\u6839\u62E0" })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: candidates.map(({ row, reason, sources }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [
          row.feature,
          " ",
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "slug", children: row.id })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: reason }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: sources.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BulletList, { items: sources }) })
      ] }, row.id)) })
    ] }) })
  ] });
}
function KeywordLine({ className, keyword, separator, text }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: `keyword-line ${className}`, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "keyword", children: keyword }),
    separator,
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "keyword-text", children: text })
  ] });
}
function RequirementText({ text, app }) {
  const lines = splitRequirement(text, app).map(splitKeyword);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "keyword-grid", children: Array.from(lines.entries(), ([position, line]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [
    position > 0 && " ",
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      KeywordLine,
      {
        className: "ears-line",
        keyword: line.keyword,
        separator: line.keyword !== "" && line.text !== "" ? " " : "",
        text: line.text
      }
    )
  ] }, position)) });
}
function ResultCell({ result }) {
  if (result.kind === "requirement") return result.untested ? "\u672A\u751F\u6210" : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Counts, { counts: result.counts });
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    result.outcome === "fail" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { className: "fail", children: "fail" }) : result.outcome,
    result.reason !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "reason", children: result.reason }),
    result.specs.map((spec) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", { className: "spec-link", href: spec.href, title: spec.path, children: spec.path }) }, spec.path))
  ] });
}
function FeatureSection({ app, idWidth, feature }) {
  const { row, summary, includes, excludes, sources, questions, decided, items } = feature;
  const list = (values) => values.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BulletList, { items: values });
  const details = [
    { term: "\u6982\u8981", content: summary !== "" && summary },
    { term: "\u542B\u3080", content: list(includes) },
    { term: "\u542B\u307E\u306A\u3044", content: list(excludes) },
    { term: "\u6839\u62E0", content: list(sources) },
    { term: "\u78BA\u8A8D\u3057\u305F\u3044\u3053\u3068", content: list(questions), className: "questions" },
    { term: "\u6C7A\u3081\u305F\u3053\u3068", content: decided !== "" && decided },
    { term: "Background", content: row.stepBlocks.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Steps, { blocks: row.stepBlocks }) },
    { term: "\u5F15\u7528\u5143", content: row.source !== "" && row.source }
  ].filter(({ content }) => content !== false);
  const emptyNote = items.length === 0 ? EMPTY_NOTES[row.status] : void 0;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { id: row.id, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: [
      row.feature,
      " ",
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Status, { status: row.status })
    ] }),
    details.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", { className: "details", children: details.map(({ term, content, className }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: term }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { className: className === void 0 ? "text" : `text ${className}`, children: content })
    ] }, term)) }),
    emptyNote !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "note", children: emptyNote }),
    items.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "table-scroll", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", { className: "resizable", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("colgroup", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("col", { style: { width: idWidth } }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("col", { style: { width: "30%" } }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("col", { style: { width: "40%" } }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("col", { style: { width: "15%" } }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("col", { style: { width: "15%" } })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "ID" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "\u672C\u6587" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "\u624B\u9806" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "\u5F15\u7528\u5143" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "\u7D50\u679C" })
      ] }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { className: item.kind === "\u8981\u4EF6" ? "requirement" : void 0, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: item.id }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { className: "text", children: item.kind === "\u8981\u4EF6" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequirementText, { text: item.body, app }) : item.body }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { className: "text", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Steps, { blocks: item.stepBlocks }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { className: "text", children: item.source }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResultCell, { result: item.result }) })
      ] }, item.id)) })
    ] }) })
  ] });
}
function Steps({ blocks }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "keyword-grid", children: Array.from(blocks.entries(), ([position, block]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [
    position > 0 && "\n",
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepBlockView, { block })
  ] }, position)) });
}
function StepBlockView({ block }) {
  if (block.kind === "table") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepTable, { rows: block.rows });
  if (block.kind === "docString") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", { className: "doc-string", children: block.text });
  const keyword = block.keyword.trimEnd();
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeywordLine, { className: "step-line", keyword, separator: block.keyword.slice(keyword.length), text: block.text });
}
function StepTable({ rows }) {
  const [header = [], ...body] = rows;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", { className: "step-table", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: Array.from(header.entries(), ([column, value]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { scope: "col", children: value }, column)) }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: Array.from(body.entries(), ([line, cells]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: Array.from(cells.entries(), ([column, value]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: value }, column)) }, line)) })
  ] });
}

// src/document.tsx
var import_jsx_runtime2 = __toESM(require_jsx_runtime(), 1);
function Document({ title, children }) {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("html", { lang: "ja", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("head", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("title", { children: title }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("style", { children: fontFaceCss }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("style", { children: styles_default })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("body", { children: [
      children,
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("script", { children: '(() => {\n  // src/column-resize.ts\n  var KEY_STEPS = { ArrowLeft: -16, ArrowRight: 16 };\n  var MIN_WIDTH_EM = 4;\n  var MAX_WIDTH_PX = Number.MAX_SAFE_INTEGER;\n  function enableColumnResize(root) {\n    for (const table of root.querySelectorAll("table.resizable")) makeResizable(table);\n  }\n  function makeResizable(table) {\n    const doc = table.ownerDocument;\n    const headers = [...table.tHead?.rows[0]?.cells ?? []];\n    const minWidth = Number.parseFloat(getComputedStyle(table).fontSize) * MIN_WIDTH_EM;\n    let fixed = null;\n    const widthOf = (index) => fixed?.widths[index] ?? headers[index].getBoundingClientRect().width;\n    const resize = (index, width) => {\n      if (fixed === null) {\n        const widths = headers.map((th) => th.getBoundingClientRect().width);\n        const colgroup = table.querySelector(":scope > colgroup") ?? table.insertBefore(doc.createElement("colgroup"), table.firstChild);\n        const existing = [...colgroup.querySelectorAll(":scope > col")];\n        const cols = widths.map((w, column) => {\n          const col = existing[column] ?? colgroup.appendChild(doc.createElement("col"));\n          col.style.width = `${w}px`;\n          return col;\n        });\n        fixed = { cols, widths, tableWidth: table.getBoundingClientRect().width };\n        table.style.tableLayout = "fixed";\n        table.style.width = `${fixed.tableWidth}px`;\n      }\n      const current = fixed.widths[index];\n      const next = Math.max(Math.min(minWidth, current), width);\n      fixed.widths[index] = next;\n      fixed.tableWidth += next - current;\n      fixed.cols[index].style.width = `${next}px`;\n      table.style.width = `${fixed.tableWidth}px`;\n      return next;\n    };\n    headers.forEach((th, index) => {\n      const name = th.textContent?.trim() ?? "";\n      th.setAttribute("aria-label", name);\n      const handle = doc.createElement("span");\n      handle.className = "col-resize";\n      handle.tabIndex = 0;\n      handle.setAttribute("role", "separator");\n      handle.setAttribute("aria-orientation", "vertical");\n      handle.setAttribute("aria-label", `\\u300C${name}\\u300D\\u306E\\u5217\\u306E\\u5E45`);\n      handle.setAttribute("aria-valuemin", String(Math.round(minWidth)));\n      handle.setAttribute("aria-valuemax", String(MAX_WIDTH_PX));\n      const show = (width) => {\n        const px = Math.round(width);\n        handle.setAttribute("aria-valuenow", String(px));\n        handle.setAttribute("aria-valuetext", `${px}px`);\n      };\n      show(widthOf(index));\n      handle.addEventListener("pointerdown", (event) => {\n        if (event.button !== 0) return;\n        event.preventDefault();\n        const startX = event.clientX;\n        const startWidth = widthOf(index);\n        const move = (e) => show(resize(index, startWidth + e.clientX - startX));\n        const end = () => {\n          doc.removeEventListener("pointermove", move);\n          doc.removeEventListener("pointerup", end);\n          doc.removeEventListener("pointercancel", end);\n        };\n        doc.addEventListener("pointermove", move);\n        doc.addEventListener("pointerup", end);\n        doc.addEventListener("pointercancel", end);\n      });\n      handle.addEventListener("keydown", (event) => {\n        const step = KEY_STEPS[event.key];\n        if (step === void 0) return;\n        event.preventDefault();\n        show(resize(index, widthOf(index) + step));\n      });\n      th.append(handle);\n    });\n  }\n\n  // column-resize-entry.ts\n  enableColumnResize(document);\n})();\n' })
    ] })
  ] });
}
function renderHtml(data) {
  const markup = (0, import_server.renderToStaticMarkup)(
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Document, { title: data.app, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ViewerPage, { ...data }) })
  );
  return `<!doctype html>${markup.replace(/<tr(?=[\s>])/g, "\n<tr")}`;
}

// src/output.ts
import { randomBytes } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import process2 from "node:process";
var WORK_PREFIX = ".viewer-";
var STALE_MS = 60 * 60 * 1e3;
function messageOf(e) {
  return e instanceof Error ? e.message : String(e);
}
function workName(kind) {
  return `${WORK_PREFIX}${kind}${randomBytes(6).toString("hex")}`;
}
function removeQuietly(dir) {
  try {
    fs.rmSync(dir, { recursive: true, force: true });
  } catch {
  }
}
function removeStaleWorkDirs(featuresDir) {
  const now = Date.now();
  for (const entry of fs.readdirSync(featuresDir, { withFileTypes: true })) {
    if (!entry.isDirectory() || !entry.name.startsWith(WORK_PREFIX)) continue;
    const dir = path.join(featuresDir, entry.name);
    try {
      if (now - fs.statSync(dir).mtimeMs >= STALE_MS) removeQuietly(dir);
    } catch {
    }
  }
}
function replaceOutput(root, files) {
  const featuresDir = path.join(root, "features");
  const rel = (dir) => `${path.relative(root, dir).split(path.sep).join("/")}/`;
  removeStaleWorkDirs(featuresDir);
  const work = path.join(featuresDir, workName(""));
  fs.mkdirSync(work);
  for (const [name, text] of Object.entries(files)) fs.writeFileSync(path.join(work, name), text);
  const output = path.join(featuresDir, "viewer");
  const old = path.join(featuresDir, workName("old-"));
  const hadOutput = fs.existsSync(output);
  if (hadOutput) {
    try {
      fs.renameSync(output, old);
    } catch (e) {
      removeQuietly(work);
      throw new Error(
        `features/viewer/ \u3092\u5165\u308C\u66FF\u3048\u3089\u308C\u306A\u3044(${messageOf(e)})\u3002features/viewer/ \u306E\u4E2D\u306E\u30D5\u30A1\u30A4\u30EB\u3092\u958B\u3044\u3066\u3044\u308B\u30A2\u30D7\u30EA\u3092\u9589\u3058\u3066\u304B\u3089\u3001\u30D3\u30EB\u30C9\u3057\u76F4\u3059`
      );
    }
  }
  try {
    fs.renameSync(work, output);
  } catch (e) {
    let restored = !hadOutput;
    if (hadOutput) {
      try {
        fs.renameSync(old, output);
        restored = true;
      } catch {
      }
    }
    if (!restored) {
      throw new Error(`features/viewer/ \u3092\u66F8\u3051\u306A\u3044(${messageOf(e)})\u3002\u524D\u56DE\u306E\u51FA\u529B\u306F ${rel(old)}\u3001\u4ECA\u56DE\u306E\u51FA\u529B\u306F ${rel(work)} \u306B\u6B8B\u3063\u3066\u3044\u308B`);
    }
    removeQuietly(work);
    throw new Error(`features/viewer/ \u3092\u66F8\u3051\u306A\u3044(${messageOf(e)})`);
  }
  if (hadOutput) {
    try {
      fs.rmSync(old, { recursive: true, force: true, maxRetries: 10, retryDelay: 200 });
    } catch (e) {
      process2.stderr.write(`${rel(old)} \u3092\u6D88\u305B\u306A\u304B\u3063\u305F(${messageOf(e)})
`);
    }
  }
}

// src/rows.ts
import fs3 from "node:fs";
import path3 from "node:path";

// node_modules/.pnpm/@cucumber+gherkin@42.0.1/node_modules/@cucumber/gherkin/dist/AstNode.js
var AstNode = class {
  ruleType;
  // biome-ignore lint/suspicious/noExplicitAny: keys and values are heterogeneous AST entries
  subItems = /* @__PURE__ */ new Map();
  constructor(ruleType) {
    this.ruleType = ruleType;
  }
  // biome-ignore lint/suspicious/noExplicitAny: keys and values are heterogeneous AST entries
  add(type, obj) {
    let items = this.subItems.get(type);
    if (items === void 0) {
      items = [];
      this.subItems.set(type, items);
    }
    items.push(obj);
  }
  getSingle(ruleType) {
    return (this.subItems.get(ruleType) || [])[0];
  }
  getItems(ruleType) {
    return this.subItems.get(ruleType) || [];
  }
  getToken(tokenType) {
    return (this.subItems.get(tokenType) || [])[0];
  }
  getTokens(tokenType) {
    return this.subItems.get(tokenType) || [];
  }
};

// node_modules/.pnpm/@cucumber+gherkin@42.0.1/node_modules/@cucumber/gherkin/dist/Errors.js
var Errors_exports = {};
__export(Errors_exports, {
  AstBuilderException: () => AstBuilderException,
  CompositeParserException: () => CompositeParserException,
  GherkinException: () => GherkinException,
  NoSuchLanguageException: () => NoSuchLanguageException,
  ParserException: () => ParserException
});
var GherkinException = class extends Error {
  errors;
  location;
  constructor(message) {
    super(message);
    const actualProto = new.target.prototype;
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(this, actualProto);
    } else {
      this.__proto__ = actualProto;
    }
  }
  static _create(message, location) {
    const column = location != null ? location.column || 0 : -1;
    const line = location != null ? location.line || 0 : -1;
    const m = `(${line}:${column}): ${message}`;
    const err = new this(m);
    err.location = location;
    return err;
  }
};
var ParserException = class _ParserException extends GherkinException {
  static create(message, line, column) {
    const err = new _ParserException(`(${line}:${column}): ${message}`);
    err.location = { line, column };
    return err;
  }
};
var CompositeParserException = class _CompositeParserException extends GherkinException {
  static create(errors) {
    const message = `Parser errors:
${errors.map((e) => e.message).join("\n")}`;
    const err = new _CompositeParserException(message);
    err.errors = errors;
    return err;
  }
};
var AstBuilderException = class _AstBuilderException extends GherkinException {
  static create(message, location) {
    return _AstBuilderException._create(message, location);
  }
};
var NoSuchLanguageException = class _NoSuchLanguageException extends GherkinException {
  static create(language, location) {
    const message = `Language not supported: ${language}`;
    return _NoSuchLanguageException._create(message, location);
  }
};

// node_modules/.pnpm/@cucumber+gherkin@42.0.1/node_modules/@cucumber/gherkin/dist/TokenExceptions.js
var UnexpectedTokenException = class _UnexpectedTokenException extends GherkinException {
  static create(token, expectedTokenTypes) {
    const message = `expected: ${expectedTokenTypes.join(", ")}, got '${token.getTokenValue().trim()}'`;
    const location = tokenLocation(token);
    return _UnexpectedTokenException._create(message, location);
  }
};
var UnexpectedEOFException = class _UnexpectedEOFException extends GherkinException {
  static create(token, expectedTokenTypes) {
    const message = `unexpected end of file, expected: ${expectedTokenTypes.join(", ")}`;
    const location = tokenLocation(token);
    return _UnexpectedEOFException._create(message, location);
  }
};
function tokenLocation(token) {
  return token.location?.line && token.line && token.line.indent !== void 0 ? {
    line: token.location.line,
    column: token.line.indent + 1
  } : token.location;
}

// node_modules/.pnpm/@cucumber+gherkin@42.0.1/node_modules/@cucumber/gherkin/dist/TokenScanner.js
var TokenScanner = class {
  makeToken;
  lineNumber = 0;
  lines;
  constructor(source, makeToken) {
    this.makeToken = makeToken;
    this.lines = source.split(/\r?\n/);
    if (this.lines.length > 0 && this.lines[this.lines.length - 1].trim() === "") {
      this.lines.pop();
    }
  }
  read() {
    const line = this.lines[this.lineNumber++];
    const location = {
      line: this.lineNumber
    };
    return this.makeToken(line, location);
  }
};

// node_modules/.pnpm/@cucumber+gherkin@42.0.1/node_modules/@cucumber/gherkin/dist/countSymbols.js
var regexAstralSymbols = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
function countSymbols(s) {
  return s.replace(regexAstralSymbols, "_").length;
}

// node_modules/.pnpm/@cucumber+gherkin@42.0.1/node_modules/@cucumber/gherkin/dist/GherkinLine.js
var GherkinLine = class {
  lineText;
  lineNumber;
  trimmedLineText;
  isEmpty;
  indent;
  column;
  text;
  constructor(lineText, lineNumber) {
    this.lineText = lineText;
    this.lineNumber = lineNumber;
    this.trimmedLineText = lineText.replace(/^\s+/g, "");
    this.isEmpty = this.trimmedLineText.length === 0;
    this.indent = countSymbols(lineText) - countSymbols(this.trimmedLineText);
  }
  startsWith(prefix) {
    return this.trimmedLineText.indexOf(prefix) === 0;
  }
  startsWithTitleKeyword(keyword) {
    return this.startsWith(`${keyword}:`);
  }
  match(regexp) {
    return this.trimmedLineText.match(regexp);
  }
  getLineText(indentToRemove) {
    if (indentToRemove < 0 || indentToRemove > this.indent) {
      return this.trimmedLineText;
    } else {
      return this.lineText.substring(indentToRemove);
    }
  }
  getRestTrimmed(length) {
    return this.trimmedLineText.substring(length).trim();
  }
  getTableCells() {
    const cells = [];
    let col = 0;
    let startCol = col + 1;
    let cell2 = "";
    let firstCell = true;
    while (col < this.trimmedLineText.length) {
      let chr = this.trimmedLineText[col];
      col++;
      if (chr === "|") {
        if (firstCell) {
          firstCell = false;
        } else {
          const trimmedLeft = cell2.replace(/^[ \t\v\f\r\u0085\u00A0]*/g, "");
          const trimmed = trimmedLeft.replace(/[ \t\v\f\r\u0085\u00A0]*$/g, "");
          const cellIndent = cell2.length - trimmedLeft.length;
          const span = {
            column: this.indent + startCol + cellIndent,
            text: trimmed
          };
          cells.push(span);
        }
        cell2 = "";
        startCol = col + 1;
      } else if (chr === "\\") {
        chr = this.trimmedLineText[col];
        col += 1;
        if (chr === "n") {
          cell2 += "\n";
        } else {
          if (chr !== "|" && chr !== "\\") {
            cell2 += "\\";
          }
          cell2 += chr;
        }
      } else {
        cell2 += chr;
      }
    }
    return cells;
  }
};

// node_modules/.pnpm/@cucumber+gherkin@42.0.1/node_modules/@cucumber/gherkin/dist/Parser.js
var Token = class {
  line;
  location;
  isEof;
  matchedText;
  matchedType;
  matchedItems;
  matchedKeyword;
  matchedIndent;
  matchedGherkinDialect;
  matchedKeywordType;
  constructor(line, location) {
    this.line = line;
    this.location = location;
    this.isEof = !line;
  }
  getTokenValue() {
    return this.isEof ? "EOF" : this.line.getLineText(-1);
  }
};
var TokenType;
(function(TokenType2) {
  TokenType2[TokenType2["None"] = 0] = "None";
  TokenType2[TokenType2["EOF"] = 1] = "EOF";
  TokenType2[TokenType2["Empty"] = 2] = "Empty";
  TokenType2[TokenType2["Comment"] = 3] = "Comment";
  TokenType2[TokenType2["TagLine"] = 4] = "TagLine";
  TokenType2[TokenType2["FeatureLine"] = 5] = "FeatureLine";
  TokenType2[TokenType2["RuleLine"] = 6] = "RuleLine";
  TokenType2[TokenType2["BackgroundLine"] = 7] = "BackgroundLine";
  TokenType2[TokenType2["ScenarioLine"] = 8] = "ScenarioLine";
  TokenType2[TokenType2["ExamplesLine"] = 9] = "ExamplesLine";
  TokenType2[TokenType2["StepLine"] = 10] = "StepLine";
  TokenType2[TokenType2["DocStringSeparator"] = 11] = "DocStringSeparator";
  TokenType2[TokenType2["TableRow"] = 12] = "TableRow";
  TokenType2[TokenType2["Language"] = 13] = "Language";
  TokenType2[TokenType2["Other"] = 14] = "Other";
})(TokenType || (TokenType = {}));
var RuleType;
(function(RuleType2) {
  RuleType2[RuleType2["None"] = 0] = "None";
  RuleType2[RuleType2["_EOF"] = 1] = "_EOF";
  RuleType2[RuleType2["_Empty"] = 2] = "_Empty";
  RuleType2[RuleType2["_Comment"] = 3] = "_Comment";
  RuleType2[RuleType2["_TagLine"] = 4] = "_TagLine";
  RuleType2[RuleType2["_FeatureLine"] = 5] = "_FeatureLine";
  RuleType2[RuleType2["_RuleLine"] = 6] = "_RuleLine";
  RuleType2[RuleType2["_BackgroundLine"] = 7] = "_BackgroundLine";
  RuleType2[RuleType2["_ScenarioLine"] = 8] = "_ScenarioLine";
  RuleType2[RuleType2["_ExamplesLine"] = 9] = "_ExamplesLine";
  RuleType2[RuleType2["_StepLine"] = 10] = "_StepLine";
  RuleType2[RuleType2["_DocStringSeparator"] = 11] = "_DocStringSeparator";
  RuleType2[RuleType2["_TableRow"] = 12] = "_TableRow";
  RuleType2[RuleType2["_Language"] = 13] = "_Language";
  RuleType2[RuleType2["_Other"] = 14] = "_Other";
  RuleType2[RuleType2["GherkinDocument"] = 15] = "GherkinDocument";
  RuleType2[RuleType2["Feature"] = 16] = "Feature";
  RuleType2[RuleType2["FeatureHeader"] = 17] = "FeatureHeader";
  RuleType2[RuleType2["Rule"] = 18] = "Rule";
  RuleType2[RuleType2["RuleHeader"] = 19] = "RuleHeader";
  RuleType2[RuleType2["Background"] = 20] = "Background";
  RuleType2[RuleType2["ScenarioDefinition"] = 21] = "ScenarioDefinition";
  RuleType2[RuleType2["Scenario"] = 22] = "Scenario";
  RuleType2[RuleType2["ExamplesDefinition"] = 23] = "ExamplesDefinition";
  RuleType2[RuleType2["Examples"] = 24] = "Examples";
  RuleType2[RuleType2["ExamplesTable"] = 25] = "ExamplesTable";
  RuleType2[RuleType2["Step"] = 26] = "Step";
  RuleType2[RuleType2["StepArg"] = 27] = "StepArg";
  RuleType2[RuleType2["DataTableAndMaybeDocString"] = 28] = "DataTableAndMaybeDocString";
  RuleType2[RuleType2["DocStringAndMaybeDataTable"] = 29] = "DocStringAndMaybeDataTable";
  RuleType2[RuleType2["DataTable"] = 30] = "DataTable";
  RuleType2[RuleType2["DocString"] = 31] = "DocString";
  RuleType2[RuleType2["Tags"] = 32] = "Tags";
  RuleType2[RuleType2["DescriptionHelper"] = 33] = "DescriptionHelper";
  RuleType2[RuleType2["Description"] = 34] = "Description";
})(RuleType || (RuleType = {}));
var Parser = class {
  builder;
  tokenMatcher;
  stopAtFirstError = false;
  context;
  constructor(builder, tokenMatcher) {
    this.builder = builder;
    this.tokenMatcher = tokenMatcher;
  }
  parse(gherkinSource) {
    const tokenScanner = new TokenScanner(gherkinSource, (line, location) => {
      const gherkinLine = line === null || line === void 0 ? null : new GherkinLine(line, location.line);
      return new Token(gherkinLine, location);
    });
    this.builder.reset();
    this.tokenMatcher.reset();
    this.context = {
      tokenScanner,
      tokenQueue: [],
      errors: []
    };
    this.startRule(this.context, RuleType.GherkinDocument);
    let state = 0;
    let token = null;
    while (true) {
      token = this.readToken(this.context);
      state = this.matchToken(state, token, this.context);
      if (token.isEof)
        break;
    }
    this.endRule(this.context);
    if (this.context.errors.length > 0) {
      throw CompositeParserException.create(this.context.errors);
    }
    return this.getResult();
  }
  addError(context, error) {
    if (!context.errors.map((e) => {
      return e.message;
    }).includes(error.message)) {
      context.errors.push(error);
      if (context.errors.length > 10)
        throw CompositeParserException.create(context.errors);
    }
  }
  startRule(context, ruleType) {
    this.handleAstError(context, () => this.builder.startRule(ruleType));
  }
  endRule(context) {
    this.handleAstError(context, () => this.builder.endRule());
  }
  build(context, token) {
    this.handleAstError(context, () => this.builder.build(token));
  }
  getResult() {
    return this.builder.getResult();
  }
  handleAstError(context, action) {
    this.handleExternalError(context, true, action);
  }
  handleExternalError(context, defaultValue, action) {
    if (this.stopAtFirstError)
      return action();
    try {
      return action();
    } catch (e) {
      if (e instanceof CompositeParserException) {
        e.errors.forEach((error) => this.addError(context, error));
      } else if (e instanceof ParserException || e instanceof AstBuilderException || e instanceof UnexpectedTokenException || e instanceof NoSuchLanguageException) {
        this.addError(context, e);
      } else {
        throw e;
      }
    }
    return defaultValue;
  }
  readToken(context) {
    return context.tokenQueue.length > 0 ? context.tokenQueue.shift() : context.tokenScanner.read();
  }
  matchToken(state, token, context) {
    switch (state) {
      case 0:
        return this.matchTokenAt_0(token, context);
      case 1:
        return this.matchTokenAt_1(token, context);
      case 2:
        return this.matchTokenAt_2(token, context);
      case 3:
        return this.matchTokenAt_3(token, context);
      case 4:
        return this.matchTokenAt_4(token, context);
      case 5:
        return this.matchTokenAt_5(token, context);
      case 6:
        return this.matchTokenAt_6(token, context);
      case 7:
        return this.matchTokenAt_7(token, context);
      case 8:
        return this.matchTokenAt_8(token, context);
      case 9:
        return this.matchTokenAt_9(token, context);
      case 10:
        return this.matchTokenAt_10(token, context);
      case 11:
        return this.matchTokenAt_11(token, context);
      case 12:
        return this.matchTokenAt_12(token, context);
      case 13:
        return this.matchTokenAt_13(token, context);
      case 14:
        return this.matchTokenAt_14(token, context);
      case 15:
        return this.matchTokenAt_15(token, context);
      case 16:
        return this.matchTokenAt_16(token, context);
      case 17:
        return this.matchTokenAt_17(token, context);
      case 18:
        return this.matchTokenAt_18(token, context);
      case 19:
        return this.matchTokenAt_19(token, context);
      case 20:
        return this.matchTokenAt_20(token, context);
      case 21:
        return this.matchTokenAt_21(token, context);
      case 22:
        return this.matchTokenAt_22(token, context);
      case 23:
        return this.matchTokenAt_23(token, context);
      case 24:
        return this.matchTokenAt_24(token, context);
      case 25:
        return this.matchTokenAt_25(token, context);
      case 26:
        return this.matchTokenAt_26(token, context);
      case 27:
        return this.matchTokenAt_27(token, context);
      case 28:
        return this.matchTokenAt_28(token, context);
      case 29:
        return this.matchTokenAt_29(token, context);
      case 30:
        return this.matchTokenAt_30(token, context);
      case 31:
        return this.matchTokenAt_31(token, context);
      case 32:
        return this.matchTokenAt_32(token, context);
      case 33:
        return this.matchTokenAt_33(token, context);
      case 34:
        return this.matchTokenAt_34(token, context);
      case 35:
        return this.matchTokenAt_35(token, context);
      case 36:
        return this.matchTokenAt_36(token, context);
      case 37:
        return this.matchTokenAt_37(token, context);
      case 38:
        return this.matchTokenAt_38(token, context);
      case 39:
        return this.matchTokenAt_39(token, context);
      case 40:
        return this.matchTokenAt_40(token, context);
      case 41:
        return this.matchTokenAt_41(token, context);
      case 43:
        return this.matchTokenAt_43(token, context);
      case 44:
        return this.matchTokenAt_44(token, context);
      case 45:
        return this.matchTokenAt_45(token, context);
      case 46:
        return this.matchTokenAt_46(token, context);
      case 47:
        return this.matchTokenAt_47(token, context);
      case 48:
        return this.matchTokenAt_48(token, context);
      case 49:
        return this.matchTokenAt_49(token, context);
      case 50:
        return this.matchTokenAt_50(token, context);
      case 51:
        return this.matchTokenAt_51(token, context);
      case 52:
        return this.matchTokenAt_52(token, context);
      case 53:
        return this.matchTokenAt_53(token, context);
      case 54:
        return this.matchTokenAt_54(token, context);
      default:
        throw new Error("Unknown state: " + state);
    }
  }
  // Start
  matchTokenAt_0(token, context) {
    if (this.match_EOF(context, token)) {
      this.build(context, token);
      return 42;
    }
    if (this.match_Language(context, token)) {
      this.startRule(context, RuleType.Feature);
      this.startRule(context, RuleType.FeatureHeader);
      this.build(context, token);
      return 1;
    }
    if (this.match_TagLine(context, token)) {
      this.startRule(context, RuleType.Feature);
      this.startRule(context, RuleType.FeatureHeader);
      this.startRule(context, RuleType.Tags);
      this.build(context, token);
      return 2;
    }
    if (this.match_FeatureLine(context, token)) {
      this.startRule(context, RuleType.Feature);
      this.startRule(context, RuleType.FeatureHeader);
      this.build(context, token);
      return 3;
    }
    if (this.match_Comment(context, token)) {
      this.build(context, token);
      return 0;
    }
    if (this.match_Empty(context, token)) {
      this.build(context, token);
      return 0;
    }
    const expectedTokens = ["#EOF", "#Language", "#TagLine", "#FeatureLine", "#Comment", "#Empty"];
    const error = token.isEof ? UnexpectedEOFException.create(token, expectedTokens) : UnexpectedTokenException.create(token, expectedTokens);
    if (this.stopAtFirstError)
      throw error;
    this.addError(context, error);
    return 0;
  }
  // GherkinDocument:0>Feature:0>FeatureHeader:0>#Language:0
  matchTokenAt_1(token, context) {
    if (this.match_TagLine(context, token)) {
      this.startRule(context, RuleType.Tags);
      this.build(context, token);
      return 2;
    }
    if (this.match_FeatureLine(context, token)) {
      this.build(context, token);
      return 3;
    }
    if (this.match_Comment(context, token)) {
      this.build(context, token);
      return 1;
    }
    if (this.match_Empty(context, token)) {
      this.build(context, token);
      return 1;
    }
    const expectedTokens = ["#TagLine", "#FeatureLine", "#Comment", "#Empty"];
    const error = token.isEof ? UnexpectedEOFException.create(token, expectedTokens) : UnexpectedTokenException.create(token, expectedTokens);
    if (this.stopAtFirstError)
      throw error;
    this.addError(context, error);
    return 1;
  }
  // GherkinDocument:0>Feature:0>FeatureHeader:1>Tags:0>#TagLine:0
  matchTokenAt_2(token, context) {
    if (this.match_TagLine(context, token)) {
      this.build(context, token);
      return 2;
    }
    if (this.match_FeatureLine(context, token)) {
      this.endRule(context);
      this.build(context, token);
      return 3;
    }
    if (this.match_Comment(context, token)) {
      this.build(context, token);
      return 2;
    }
    if (this.match_Empty(context, token)) {
      this.build(context, token);
      return 2;
    }
    const expectedTokens = ["#TagLine", "#FeatureLine", "#Comment", "#Empty"];
    const error = token.isEof ? UnexpectedEOFException.create(token, expectedTokens) : UnexpectedTokenException.create(token, expectedTokens);
    if (this.stopAtFirstError)
      throw error;
    this.addError(context, error);
    return 2;
  }
  // GherkinDocument:0>Feature:0>FeatureHeader:2>#FeatureLine:0
  matchTokenAt_3(token, context) {
    if (this.match_EOF(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.build(context, token);
      return 42;
    }
    if (this.match_Empty(context, token)) {
      this.build(context, token);
      return 3;
    }
    if (this.match_Comment(context, token)) {
      this.startRule(context, RuleType.Description);
      this.build(context, token);
      return 4;
    }
    if (this.match_BackgroundLine(context, token)) {
      this.endRule(context);
      this.startRule(context, RuleType.Background);
      this.build(context, token);
      return 5;
    }
    if (this.match_TagLine(context, token)) {
      if (this.lookahead_0(context, token)) {
        this.endRule(context);
        this.startRule(context, RuleType.ScenarioDefinition);
        this.startRule(context, RuleType.Tags);
        this.build(context, token);
        return 11;
      }
    }
    if (this.match_TagLine(context, token)) {
      this.endRule(context);
      this.startRule(context, RuleType.Rule);
      this.startRule(context, RuleType.RuleHeader);
      this.startRule(context, RuleType.Tags);
      this.build(context, token);
      return 22;
    }
    if (this.match_ScenarioLine(context, token)) {
      this.endRule(context);
      this.startRule(context, RuleType.ScenarioDefinition);
      this.startRule(context, RuleType.Scenario);
      this.build(context, token);
      return 12;
    }
    if (this.match_RuleLine(context, token)) {
      this.endRule(context);
      this.startRule(context, RuleType.Rule);
      this.startRule(context, RuleType.RuleHeader);
      this.build(context, token);
      return 23;
    }
    if (this.match_Other(context, token)) {
      this.startRule(context, RuleType.Description);
      this.build(context, token);
      return 4;
    }
    const expectedTokens = ["#EOF", "#Empty", "#Comment", "#BackgroundLine", "#TagLine", "#ScenarioLine", "#RuleLine", "#Other"];
    const error = token.isEof ? UnexpectedEOFException.create(token, expectedTokens) : UnexpectedTokenException.create(token, expectedTokens);
    if (this.stopAtFirstError)
      throw error;
    this.addError(context, error);
    return 3;
  }
  // GherkinDocument:0>Feature:0>FeatureHeader:3>DescriptionHelper:1>Description:0>__alt1:0>#Other:0
  matchTokenAt_4(token, context) {
    if (this.match_EOF(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.build(context, token);
      return 42;
    }
    if (this.match_Comment(context, token)) {
      this.build(context, token);
      return 4;
    }
    if (this.match_BackgroundLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.Background);
      this.build(context, token);
      return 5;
    }
    if (this.match_TagLine(context, token)) {
      if (this.lookahead_0(context, token)) {
        this.endRule(context);
        this.endRule(context);
        this.startRule(context, RuleType.ScenarioDefinition);
        this.startRule(context, RuleType.Tags);
        this.build(context, token);
        return 11;
      }
    }
    if (this.match_TagLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.Rule);
      this.startRule(context, RuleType.RuleHeader);
      this.startRule(context, RuleType.Tags);
      this.build(context, token);
      return 22;
    }
    if (this.match_ScenarioLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.ScenarioDefinition);
      this.startRule(context, RuleType.Scenario);
      this.build(context, token);
      return 12;
    }
    if (this.match_RuleLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.Rule);
      this.startRule(context, RuleType.RuleHeader);
      this.build(context, token);
      return 23;
    }
    if (this.match_Other(context, token)) {
      this.build(context, token);
      return 4;
    }
    const expectedTokens = ["#EOF", "#Comment", "#BackgroundLine", "#TagLine", "#ScenarioLine", "#RuleLine", "#Other"];
    const error = token.isEof ? UnexpectedEOFException.create(token, expectedTokens) : UnexpectedTokenException.create(token, expectedTokens);
    if (this.stopAtFirstError)
      throw error;
    this.addError(context, error);
    return 4;
  }
  // GherkinDocument:0>Feature:1>Background:0>#BackgroundLine:0
  matchTokenAt_5(token, context) {
    if (this.match_EOF(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.build(context, token);
      return 42;
    }
    if (this.match_Empty(context, token)) {
      this.build(context, token);
      return 5;
    }
    if (this.match_Comment(context, token)) {
      this.startRule(context, RuleType.Description);
      this.build(context, token);
      return 6;
    }
    if (this.match_StepLine(context, token)) {
      this.startRule(context, RuleType.Step);
      this.build(context, token);
      return 7;
    }
    if (this.match_TagLine(context, token)) {
      if (this.lookahead_0(context, token)) {
        this.endRule(context);
        this.startRule(context, RuleType.ScenarioDefinition);
        this.startRule(context, RuleType.Tags);
        this.build(context, token);
        return 11;
      }
    }
    if (this.match_TagLine(context, token)) {
      this.endRule(context);
      this.startRule(context, RuleType.Rule);
      this.startRule(context, RuleType.RuleHeader);
      this.startRule(context, RuleType.Tags);
      this.build(context, token);
      return 22;
    }
    if (this.match_ScenarioLine(context, token)) {
      this.endRule(context);
      this.startRule(context, RuleType.ScenarioDefinition);
      this.startRule(context, RuleType.Scenario);
      this.build(context, token);
      return 12;
    }
    if (this.match_RuleLine(context, token)) {
      this.endRule(context);
      this.startRule(context, RuleType.Rule);
      this.startRule(context, RuleType.RuleHeader);
      this.build(context, token);
      return 23;
    }
    if (this.match_Other(context, token)) {
      this.startRule(context, RuleType.Description);
      this.build(context, token);
      return 6;
    }
    const expectedTokens = ["#EOF", "#Empty", "#Comment", "#StepLine", "#TagLine", "#ScenarioLine", "#RuleLine", "#Other"];
    const error = token.isEof ? UnexpectedEOFException.create(token, expectedTokens) : UnexpectedTokenException.create(token, expectedTokens);
    if (this.stopAtFirstError)
      throw error;
    this.addError(context, error);
    return 5;
  }
  // GherkinDocument:0>Feature:1>Background:1>DescriptionHelper:1>Description:0>__alt1:0>#Other:0
  matchTokenAt_6(token, context) {
    if (this.match_EOF(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.build(context, token);
      return 42;
    }
    if (this.match_Comment(context, token)) {
      this.build(context, token);
      return 6;
    }
    if (this.match_StepLine(context, token)) {
      this.endRule(context);
      this.startRule(context, RuleType.Step);
      this.build(context, token);
      return 7;
    }
    if (this.match_TagLine(context, token)) {
      if (this.lookahead_0(context, token)) {
        this.endRule(context);
        this.endRule(context);
        this.startRule(context, RuleType.ScenarioDefinition);
        this.startRule(context, RuleType.Tags);
        this.build(context, token);
        return 11;
      }
    }
    if (this.match_TagLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.Rule);
      this.startRule(context, RuleType.RuleHeader);
      this.startRule(context, RuleType.Tags);
      this.build(context, token);
      return 22;
    }
    if (this.match_ScenarioLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.ScenarioDefinition);
      this.startRule(context, RuleType.Scenario);
      this.build(context, token);
      return 12;
    }
    if (this.match_RuleLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.Rule);
      this.startRule(context, RuleType.RuleHeader);
      this.build(context, token);
      return 23;
    }
    if (this.match_Other(context, token)) {
      this.build(context, token);
      return 6;
    }
    const expectedTokens = ["#EOF", "#Comment", "#StepLine", "#TagLine", "#ScenarioLine", "#RuleLine", "#Other"];
    const error = token.isEof ? UnexpectedEOFException.create(token, expectedTokens) : UnexpectedTokenException.create(token, expectedTokens);
    if (this.stopAtFirstError)
      throw error;
    this.addError(context, error);
    return 6;
  }
  // GherkinDocument:0>Feature:1>Background:2>Step:0>#StepLine:0
  matchTokenAt_7(token, context) {
    if (this.match_EOF(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.build(context, token);
      return 42;
    }
    if (this.match_TableRow(context, token)) {
      this.startRule(context, RuleType.DataTable);
      this.build(context, token);
      return 8;
    }
    if (this.match_DocStringSeparator(context, token)) {
      this.startRule(context, RuleType.DocString);
      this.build(context, token);
      return 52;
    }
    if (this.match_StepLine(context, token)) {
      this.endRule(context);
      this.startRule(context, RuleType.Step);
      this.build(context, token);
      return 7;
    }
    if (this.match_TagLine(context, token)) {
      if (this.lookahead_0(context, token)) {
        this.endRule(context);
        this.endRule(context);
        this.startRule(context, RuleType.ScenarioDefinition);
        this.startRule(context, RuleType.Tags);
        this.build(context, token);
        return 11;
      }
    }
    if (this.match_TagLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.Rule);
      this.startRule(context, RuleType.RuleHeader);
      this.startRule(context, RuleType.Tags);
      this.build(context, token);
      return 22;
    }
    if (this.match_ScenarioLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.ScenarioDefinition);
      this.startRule(context, RuleType.Scenario);
      this.build(context, token);
      return 12;
    }
    if (this.match_RuleLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.Rule);
      this.startRule(context, RuleType.RuleHeader);
      this.build(context, token);
      return 23;
    }
    if (this.match_Comment(context, token)) {
      this.build(context, token);
      return 7;
    }
    if (this.match_Empty(context, token)) {
      this.build(context, token);
      return 7;
    }
    const expectedTokens = ["#EOF", "#TableRow", "#DocStringSeparator", "#StepLine", "#TagLine", "#ScenarioLine", "#RuleLine", "#Comment", "#Empty"];
    const error = token.isEof ? UnexpectedEOFException.create(token, expectedTokens) : UnexpectedTokenException.create(token, expectedTokens);
    if (this.stopAtFirstError)
      throw error;
    this.addError(context, error);
    return 7;
  }
  // GherkinDocument:0>Feature:1>Background:2>Step:1>StepArg:0>__alt0:0>DataTableAndMaybeDocString:0>DataTable:0>#TableRow:0
  matchTokenAt_8(token, context) {
    if (this.match_EOF(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.build(context, token);
      return 42;
    }
    if (this.match_TableRow(context, token)) {
      this.build(context, token);
      return 8;
    }
    if (this.match_DocStringSeparator(context, token)) {
      this.endRule(context);
      this.startRule(context, RuleType.DocString);
      this.build(context, token);
      return 9;
    }
    if (this.match_StepLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.Step);
      this.build(context, token);
      return 7;
    }
    if (this.match_TagLine(context, token)) {
      if (this.lookahead_0(context, token)) {
        this.endRule(context);
        this.endRule(context);
        this.endRule(context);
        this.startRule(context, RuleType.ScenarioDefinition);
        this.startRule(context, RuleType.Tags);
        this.build(context, token);
        return 11;
      }
    }
    if (this.match_TagLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.Rule);
      this.startRule(context, RuleType.RuleHeader);
      this.startRule(context, RuleType.Tags);
      this.build(context, token);
      return 22;
    }
    if (this.match_ScenarioLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.ScenarioDefinition);
      this.startRule(context, RuleType.Scenario);
      this.build(context, token);
      return 12;
    }
    if (this.match_RuleLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.Rule);
      this.startRule(context, RuleType.RuleHeader);
      this.build(context, token);
      return 23;
    }
    if (this.match_Comment(context, token)) {
      this.build(context, token);
      return 8;
    }
    if (this.match_Empty(context, token)) {
      this.build(context, token);
      return 8;
    }
    const expectedTokens = ["#EOF", "#TableRow", "#DocStringSeparator", "#StepLine", "#TagLine", "#ScenarioLine", "#RuleLine", "#Comment", "#Empty"];
    const error = token.isEof ? UnexpectedEOFException.create(token, expectedTokens) : UnexpectedTokenException.create(token, expectedTokens);
    if (this.stopAtFirstError)
      throw error;
    this.addError(context, error);
    return 8;
  }
  // GherkinDocument:0>Feature:1>Background:2>Step:1>StepArg:0>__alt0:0>DataTableAndMaybeDocString:1>DocString:0>#DocStringSeparator:0
  matchTokenAt_9(token, context) {
    if (this.match_DocStringSeparator(context, token)) {
      this.build(context, token);
      return 10;
    }
    if (this.match_Other(context, token)) {
      this.build(context, token);
      return 9;
    }
    const expectedTokens = ["#DocStringSeparator", "#Other"];
    const error = token.isEof ? UnexpectedEOFException.create(token, expectedTokens) : UnexpectedTokenException.create(token, expectedTokens);
    if (this.stopAtFirstError)
      throw error;
    this.addError(context, error);
    return 9;
  }
  // GherkinDocument:0>Feature:1>Background:2>Step:1>StepArg:0>__alt0:0>DataTableAndMaybeDocString:1>DocString:2>#DocStringSeparator:0
  matchTokenAt_10(token, context) {
    if (this.match_EOF(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.build(context, token);
      return 42;
    }
    if (this.match_StepLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.Step);
      this.build(context, token);
      return 7;
    }
    if (this.match_TagLine(context, token)) {
      if (this.lookahead_0(context, token)) {
        this.endRule(context);
        this.endRule(context);
        this.endRule(context);
        this.startRule(context, RuleType.ScenarioDefinition);
        this.startRule(context, RuleType.Tags);
        this.build(context, token);
        return 11;
      }
    }
    if (this.match_TagLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.Rule);
      this.startRule(context, RuleType.RuleHeader);
      this.startRule(context, RuleType.Tags);
      this.build(context, token);
      return 22;
    }
    if (this.match_ScenarioLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.ScenarioDefinition);
      this.startRule(context, RuleType.Scenario);
      this.build(context, token);
      return 12;
    }
    if (this.match_RuleLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.Rule);
      this.startRule(context, RuleType.RuleHeader);
      this.build(context, token);
      return 23;
    }
    if (this.match_Comment(context, token)) {
      this.build(context, token);
      return 10;
    }
    if (this.match_Empty(context, token)) {
      this.build(context, token);
      return 10;
    }
    const expectedTokens = ["#EOF", "#StepLine", "#TagLine", "#ScenarioLine", "#RuleLine", "#Comment", "#Empty"];
    const error = token.isEof ? UnexpectedEOFException.create(token, expectedTokens) : UnexpectedTokenException.create(token, expectedTokens);
    if (this.stopAtFirstError)
      throw error;
    this.addError(context, error);
    return 10;
  }
  // GherkinDocument:0>Feature:2>ScenarioDefinition:0>Tags:0>#TagLine:0
  matchTokenAt_11(token, context) {
    if (this.match_TagLine(context, token)) {
      this.build(context, token);
      return 11;
    }
    if (this.match_ScenarioLine(context, token)) {
      this.endRule(context);
      this.startRule(context, RuleType.Scenario);
      this.build(context, token);
      return 12;
    }
    if (this.match_Comment(context, token)) {
      this.build(context, token);
      return 11;
    }
    if (this.match_Empty(context, token)) {
      this.build(context, token);
      return 11;
    }
    const expectedTokens = ["#TagLine", "#ScenarioLine", "#Comment", "#Empty"];
    const error = token.isEof ? UnexpectedEOFException.create(token, expectedTokens) : UnexpectedTokenException.create(token, expectedTokens);
    if (this.stopAtFirstError)
      throw error;
    this.addError(context, error);
    return 11;
  }
  // GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:0>#ScenarioLine:0
  matchTokenAt_12(token, context) {
    if (this.match_EOF(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.build(context, token);
      return 42;
    }
    if (this.match_Empty(context, token)) {
      this.build(context, token);
      return 12;
    }
    if (this.match_Comment(context, token)) {
      this.startRule(context, RuleType.Description);
      this.build(context, token);
      return 13;
    }
    if (this.match_StepLine(context, token)) {
      this.startRule(context, RuleType.Step);
      this.build(context, token);
      return 14;
    }
    if (this.match_TagLine(context, token)) {
      if (this.lookahead_1(context, token)) {
        this.startRule(context, RuleType.ExamplesDefinition);
        this.startRule(context, RuleType.Tags);
        this.build(context, token);
        return 18;
      }
    }
    if (this.match_TagLine(context, token)) {
      if (this.lookahead_0(context, token)) {
        this.endRule(context);
        this.endRule(context);
        this.startRule(context, RuleType.ScenarioDefinition);
        this.startRule(context, RuleType.Tags);
        this.build(context, token);
        return 11;
      }
    }
    if (this.match_TagLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.Rule);
      this.startRule(context, RuleType.RuleHeader);
      this.startRule(context, RuleType.Tags);
      this.build(context, token);
      return 22;
    }
    if (this.match_ExamplesLine(context, token)) {
      this.startRule(context, RuleType.ExamplesDefinition);
      this.startRule(context, RuleType.Examples);
      this.build(context, token);
      return 19;
    }
    if (this.match_ScenarioLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.ScenarioDefinition);
      this.startRule(context, RuleType.Scenario);
      this.build(context, token);
      return 12;
    }
    if (this.match_RuleLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.Rule);
      this.startRule(context, RuleType.RuleHeader);
      this.build(context, token);
      return 23;
    }
    if (this.match_Other(context, token)) {
      this.startRule(context, RuleType.Description);
      this.build(context, token);
      return 13;
    }
    const expectedTokens = ["#EOF", "#Empty", "#Comment", "#StepLine", "#TagLine", "#ExamplesLine", "#ScenarioLine", "#RuleLine", "#Other"];
    const error = token.isEof ? UnexpectedEOFException.create(token, expectedTokens) : UnexpectedTokenException.create(token, expectedTokens);
    if (this.stopAtFirstError)
      throw error;
    this.addError(context, error);
    return 12;
  }
  // GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:1>DescriptionHelper:1>Description:0>__alt1:0>#Other:0
  matchTokenAt_13(token, context) {
    if (this.match_EOF(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.build(context, token);
      return 42;
    }
    if (this.match_Comment(context, token)) {
      this.build(context, token);
      return 13;
    }
    if (this.match_StepLine(context, token)) {
      this.endRule(context);
      this.startRule(context, RuleType.Step);
      this.build(context, token);
      return 14;
    }
    if (this.match_TagLine(context, token)) {
      if (this.lookahead_1(context, token)) {
        this.endRule(context);
        this.startRule(context, RuleType.ExamplesDefinition);
        this.startRule(context, RuleType.Tags);
        this.build(context, token);
        return 18;
      }
    }
    if (this.match_TagLine(context, token)) {
      if (this.lookahead_0(context, token)) {
        this.endRule(context);
        this.endRule(context);
        this.endRule(context);
        this.startRule(context, RuleType.ScenarioDefinition);
        this.startRule(context, RuleType.Tags);
        this.build(context, token);
        return 11;
      }
    }
    if (this.match_TagLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.Rule);
      this.startRule(context, RuleType.RuleHeader);
      this.startRule(context, RuleType.Tags);
      this.build(context, token);
      return 22;
    }
    if (this.match_ExamplesLine(context, token)) {
      this.endRule(context);
      this.startRule(context, RuleType.ExamplesDefinition);
      this.startRule(context, RuleType.Examples);
      this.build(context, token);
      return 19;
    }
    if (this.match_ScenarioLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.ScenarioDefinition);
      this.startRule(context, RuleType.Scenario);
      this.build(context, token);
      return 12;
    }
    if (this.match_RuleLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.Rule);
      this.startRule(context, RuleType.RuleHeader);
      this.build(context, token);
      return 23;
    }
    if (this.match_Other(context, token)) {
      this.build(context, token);
      return 13;
    }
    const expectedTokens = ["#EOF", "#Comment", "#StepLine", "#TagLine", "#ExamplesLine", "#ScenarioLine", "#RuleLine", "#Other"];
    const error = token.isEof ? UnexpectedEOFException.create(token, expectedTokens) : UnexpectedTokenException.create(token, expectedTokens);
    if (this.stopAtFirstError)
      throw error;
    this.addError(context, error);
    return 13;
  }
  // GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:2>Step:0>#StepLine:0
  matchTokenAt_14(token, context) {
    if (this.match_EOF(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.build(context, token);
      return 42;
    }
    if (this.match_TableRow(context, token)) {
      this.startRule(context, RuleType.DataTable);
      this.build(context, token);
      return 15;
    }
    if (this.match_DocStringSeparator(context, token)) {
      this.startRule(context, RuleType.DocString);
      this.build(context, token);
      return 49;
    }
    if (this.match_StepLine(context, token)) {
      this.endRule(context);
      this.startRule(context, RuleType.Step);
      this.build(context, token);
      return 14;
    }
    if (this.match_TagLine(context, token)) {
      if (this.lookahead_1(context, token)) {
        this.endRule(context);
        this.startRule(context, RuleType.ExamplesDefinition);
        this.startRule(context, RuleType.Tags);
        this.build(context, token);
        return 18;
      }
    }
    if (this.match_TagLine(context, token)) {
      if (this.lookahead_0(context, token)) {
        this.endRule(context);
        this.endRule(context);
        this.endRule(context);
        this.startRule(context, RuleType.ScenarioDefinition);
        this.startRule(context, RuleType.Tags);
        this.build(context, token);
        return 11;
      }
    }
    if (this.match_TagLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.Rule);
      this.startRule(context, RuleType.RuleHeader);
      this.startRule(context, RuleType.Tags);
      this.build(context, token);
      return 22;
    }
    if (this.match_ExamplesLine(context, token)) {
      this.endRule(context);
      this.startRule(context, RuleType.ExamplesDefinition);
      this.startRule(context, RuleType.Examples);
      this.build(context, token);
      return 19;
    }
    if (this.match_ScenarioLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.ScenarioDefinition);
      this.startRule(context, RuleType.Scenario);
      this.build(context, token);
      return 12;
    }
    if (this.match_RuleLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.Rule);
      this.startRule(context, RuleType.RuleHeader);
      this.build(context, token);
      return 23;
    }
    if (this.match_Comment(context, token)) {
      this.build(context, token);
      return 14;
    }
    if (this.match_Empty(context, token)) {
      this.build(context, token);
      return 14;
    }
    const expectedTokens = ["#EOF", "#TableRow", "#DocStringSeparator", "#StepLine", "#TagLine", "#ExamplesLine", "#ScenarioLine", "#RuleLine", "#Comment", "#Empty"];
    const error = token.isEof ? UnexpectedEOFException.create(token, expectedTokens) : UnexpectedTokenException.create(token, expectedTokens);
    if (this.stopAtFirstError)
      throw error;
    this.addError(context, error);
    return 14;
  }
  // GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:2>Step:1>StepArg:0>__alt0:0>DataTableAndMaybeDocString:0>DataTable:0>#TableRow:0
  matchTokenAt_15(token, context) {
    if (this.match_EOF(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.build(context, token);
      return 42;
    }
    if (this.match_TableRow(context, token)) {
      this.build(context, token);
      return 15;
    }
    if (this.match_DocStringSeparator(context, token)) {
      this.endRule(context);
      this.startRule(context, RuleType.DocString);
      this.build(context, token);
      return 16;
    }
    if (this.match_StepLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.Step);
      this.build(context, token);
      return 14;
    }
    if (this.match_TagLine(context, token)) {
      if (this.lookahead_1(context, token)) {
        this.endRule(context);
        this.endRule(context);
        this.startRule(context, RuleType.ExamplesDefinition);
        this.startRule(context, RuleType.Tags);
        this.build(context, token);
        return 18;
      }
    }
    if (this.match_TagLine(context, token)) {
      if (this.lookahead_0(context, token)) {
        this.endRule(context);
        this.endRule(context);
        this.endRule(context);
        this.endRule(context);
        this.startRule(context, RuleType.ScenarioDefinition);
        this.startRule(context, RuleType.Tags);
        this.build(context, token);
        return 11;
      }
    }
    if (this.match_TagLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.Rule);
      this.startRule(context, RuleType.RuleHeader);
      this.startRule(context, RuleType.Tags);
      this.build(context, token);
      return 22;
    }
    if (this.match_ExamplesLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.ExamplesDefinition);
      this.startRule(context, RuleType.Examples);
      this.build(context, token);
      return 19;
    }
    if (this.match_ScenarioLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.ScenarioDefinition);
      this.startRule(context, RuleType.Scenario);
      this.build(context, token);
      return 12;
    }
    if (this.match_RuleLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.Rule);
      this.startRule(context, RuleType.RuleHeader);
      this.build(context, token);
      return 23;
    }
    if (this.match_Comment(context, token)) {
      this.build(context, token);
      return 15;
    }
    if (this.match_Empty(context, token)) {
      this.build(context, token);
      return 15;
    }
    const expectedTokens = ["#EOF", "#TableRow", "#DocStringSeparator", "#StepLine", "#TagLine", "#ExamplesLine", "#ScenarioLine", "#RuleLine", "#Comment", "#Empty"];
    const error = token.isEof ? UnexpectedEOFException.create(token, expectedTokens) : UnexpectedTokenException.create(token, expectedTokens);
    if (this.stopAtFirstError)
      throw error;
    this.addError(context, error);
    return 15;
  }
  // GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:2>Step:1>StepArg:0>__alt0:0>DataTableAndMaybeDocString:1>DocString:0>#DocStringSeparator:0
  matchTokenAt_16(token, context) {
    if (this.match_DocStringSeparator(context, token)) {
      this.build(context, token);
      return 17;
    }
    if (this.match_Other(context, token)) {
      this.build(context, token);
      return 16;
    }
    const expectedTokens = ["#DocStringSeparator", "#Other"];
    const error = token.isEof ? UnexpectedEOFException.create(token, expectedTokens) : UnexpectedTokenException.create(token, expectedTokens);
    if (this.stopAtFirstError)
      throw error;
    this.addError(context, error);
    return 16;
  }
  // GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:2>Step:1>StepArg:0>__alt0:0>DataTableAndMaybeDocString:1>DocString:2>#DocStringSeparator:0
  matchTokenAt_17(token, context) {
    if (this.match_EOF(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.build(context, token);
      return 42;
    }
    if (this.match_StepLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.Step);
      this.build(context, token);
      return 14;
    }
    if (this.match_TagLine(context, token)) {
      if (this.lookahead_1(context, token)) {
        this.endRule(context);
        this.endRule(context);
        this.startRule(context, RuleType.ExamplesDefinition);
        this.startRule(context, RuleType.Tags);
        this.build(context, token);
        return 18;
      }
    }
    if (this.match_TagLine(context, token)) {
      if (this.lookahead_0(context, token)) {
        this.endRule(context);
        this.endRule(context);
        this.endRule(context);
        this.endRule(context);
        this.startRule(context, RuleType.ScenarioDefinition);
        this.startRule(context, RuleType.Tags);
        this.build(context, token);
        return 11;
      }
    }
    if (this.match_TagLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.Rule);
      this.startRule(context, RuleType.RuleHeader);
      this.startRule(context, RuleType.Tags);
      this.build(context, token);
      return 22;
    }
    if (this.match_ExamplesLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.ExamplesDefinition);
      this.startRule(context, RuleType.Examples);
      this.build(context, token);
      return 19;
    }
    if (this.match_ScenarioLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.ScenarioDefinition);
      this.startRule(context, RuleType.Scenario);
      this.build(context, token);
      return 12;
    }
    if (this.match_RuleLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.Rule);
      this.startRule(context, RuleType.RuleHeader);
      this.build(context, token);
      return 23;
    }
    if (this.match_Comment(context, token)) {
      this.build(context, token);
      return 17;
    }
    if (this.match_Empty(context, token)) {
      this.build(context, token);
      return 17;
    }
    const expectedTokens = ["#EOF", "#StepLine", "#TagLine", "#ExamplesLine", "#ScenarioLine", "#RuleLine", "#Comment", "#Empty"];
    const error = token.isEof ? UnexpectedEOFException.create(token, expectedTokens) : UnexpectedTokenException.create(token, expectedTokens);
    if (this.stopAtFirstError)
      throw error;
    this.addError(context, error);
    return 17;
  }
  // GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:3>ExamplesDefinition:0>Tags:0>#TagLine:0
  matchTokenAt_18(token, context) {
    if (this.match_TagLine(context, token)) {
      this.build(context, token);
      return 18;
    }
    if (this.match_ExamplesLine(context, token)) {
      this.endRule(context);
      this.startRule(context, RuleType.Examples);
      this.build(context, token);
      return 19;
    }
    if (this.match_Comment(context, token)) {
      this.build(context, token);
      return 18;
    }
    if (this.match_Empty(context, token)) {
      this.build(context, token);
      return 18;
    }
    const expectedTokens = ["#TagLine", "#ExamplesLine", "#Comment", "#Empty"];
    const error = token.isEof ? UnexpectedEOFException.create(token, expectedTokens) : UnexpectedTokenException.create(token, expectedTokens);
    if (this.stopAtFirstError)
      throw error;
    this.addError(context, error);
    return 18;
  }
  // GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:3>ExamplesDefinition:1>Examples:0>#ExamplesLine:0
  matchTokenAt_19(token, context) {
    if (this.match_EOF(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.build(context, token);
      return 42;
    }
    if (this.match_Empty(context, token)) {
      this.build(context, token);
      return 19;
    }
    if (this.match_Comment(context, token)) {
      this.startRule(context, RuleType.Description);
      this.build(context, token);
      return 20;
    }
    if (this.match_TableRow(context, token)) {
      this.startRule(context, RuleType.ExamplesTable);
      this.build(context, token);
      return 21;
    }
    if (this.match_TagLine(context, token)) {
      if (this.lookahead_1(context, token)) {
        this.endRule(context);
        this.endRule(context);
        this.startRule(context, RuleType.ExamplesDefinition);
        this.startRule(context, RuleType.Tags);
        this.build(context, token);
        return 18;
      }
    }
    if (this.match_TagLine(context, token)) {
      if (this.lookahead_0(context, token)) {
        this.endRule(context);
        this.endRule(context);
        this.endRule(context);
        this.endRule(context);
        this.startRule(context, RuleType.ScenarioDefinition);
        this.startRule(context, RuleType.Tags);
        this.build(context, token);
        return 11;
      }
    }
    if (this.match_TagLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.Rule);
      this.startRule(context, RuleType.RuleHeader);
      this.startRule(context, RuleType.Tags);
      this.build(context, token);
      return 22;
    }
    if (this.match_ExamplesLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.ExamplesDefinition);
      this.startRule(context, RuleType.Examples);
      this.build(context, token);
      return 19;
    }
    if (this.match_ScenarioLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.ScenarioDefinition);
      this.startRule(context, RuleType.Scenario);
      this.build(context, token);
      return 12;
    }
    if (this.match_RuleLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.Rule);
      this.startRule(context, RuleType.RuleHeader);
      this.build(context, token);
      return 23;
    }
    if (this.match_Other(context, token)) {
      this.startRule(context, RuleType.Description);
      this.build(context, token);
      return 20;
    }
    const expectedTokens = ["#EOF", "#Empty", "#Comment", "#TableRow", "#TagLine", "#ExamplesLine", "#ScenarioLine", "#RuleLine", "#Other"];
    const error = token.isEof ? UnexpectedEOFException.create(token, expectedTokens) : UnexpectedTokenException.create(token, expectedTokens);
    if (this.stopAtFirstError)
      throw error;
    this.addError(context, error);
    return 19;
  }
  // GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:3>ExamplesDefinition:1>Examples:1>DescriptionHelper:1>Description:0>__alt1:0>#Other:0
  matchTokenAt_20(token, context) {
    if (this.match_EOF(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.build(context, token);
      return 42;
    }
    if (this.match_Comment(context, token)) {
      this.build(context, token);
      return 20;
    }
    if (this.match_TableRow(context, token)) {
      this.endRule(context);
      this.startRule(context, RuleType.ExamplesTable);
      this.build(context, token);
      return 21;
    }
    if (this.match_TagLine(context, token)) {
      if (this.lookahead_1(context, token)) {
        this.endRule(context);
        this.endRule(context);
        this.endRule(context);
        this.startRule(context, RuleType.ExamplesDefinition);
        this.startRule(context, RuleType.Tags);
        this.build(context, token);
        return 18;
      }
    }
    if (this.match_TagLine(context, token)) {
      if (this.lookahead_0(context, token)) {
        this.endRule(context);
        this.endRule(context);
        this.endRule(context);
        this.endRule(context);
        this.endRule(context);
        this.startRule(context, RuleType.ScenarioDefinition);
        this.startRule(context, RuleType.Tags);
        this.build(context, token);
        return 11;
      }
    }
    if (this.match_TagLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.Rule);
      this.startRule(context, RuleType.RuleHeader);
      this.startRule(context, RuleType.Tags);
      this.build(context, token);
      return 22;
    }
    if (this.match_ExamplesLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.ExamplesDefinition);
      this.startRule(context, RuleType.Examples);
      this.build(context, token);
      return 19;
    }
    if (this.match_ScenarioLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.ScenarioDefinition);
      this.startRule(context, RuleType.Scenario);
      this.build(context, token);
      return 12;
    }
    if (this.match_RuleLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.Rule);
      this.startRule(context, RuleType.RuleHeader);
      this.build(context, token);
      return 23;
    }
    if (this.match_Other(context, token)) {
      this.build(context, token);
      return 20;
    }
    const expectedTokens = ["#EOF", "#Comment", "#TableRow", "#TagLine", "#ExamplesLine", "#ScenarioLine", "#RuleLine", "#Other"];
    const error = token.isEof ? UnexpectedEOFException.create(token, expectedTokens) : UnexpectedTokenException.create(token, expectedTokens);
    if (this.stopAtFirstError)
      throw error;
    this.addError(context, error);
    return 20;
  }
  // GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:3>ExamplesDefinition:1>Examples:2>ExamplesTable:0>#TableRow:0
  matchTokenAt_21(token, context) {
    if (this.match_EOF(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.build(context, token);
      return 42;
    }
    if (this.match_TableRow(context, token)) {
      this.build(context, token);
      return 21;
    }
    if (this.match_TagLine(context, token)) {
      if (this.lookahead_1(context, token)) {
        this.endRule(context);
        this.endRule(context);
        this.endRule(context);
        this.startRule(context, RuleType.ExamplesDefinition);
        this.startRule(context, RuleType.Tags);
        this.build(context, token);
        return 18;
      }
    }
    if (this.match_TagLine(context, token)) {
      if (this.lookahead_0(context, token)) {
        this.endRule(context);
        this.endRule(context);
        this.endRule(context);
        this.endRule(context);
        this.endRule(context);
        this.startRule(context, RuleType.ScenarioDefinition);
        this.startRule(context, RuleType.Tags);
        this.build(context, token);
        return 11;
      }
    }
    if (this.match_TagLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.Rule);
      this.startRule(context, RuleType.RuleHeader);
      this.startRule(context, RuleType.Tags);
      this.build(context, token);
      return 22;
    }
    if (this.match_ExamplesLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.ExamplesDefinition);
      this.startRule(context, RuleType.Examples);
      this.build(context, token);
      return 19;
    }
    if (this.match_ScenarioLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.ScenarioDefinition);
      this.startRule(context, RuleType.Scenario);
      this.build(context, token);
      return 12;
    }
    if (this.match_RuleLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.Rule);
      this.startRule(context, RuleType.RuleHeader);
      this.build(context, token);
      return 23;
    }
    if (this.match_Comment(context, token)) {
      this.build(context, token);
      return 21;
    }
    if (this.match_Empty(context, token)) {
      this.build(context, token);
      return 21;
    }
    const expectedTokens = ["#EOF", "#TableRow", "#TagLine", "#ExamplesLine", "#ScenarioLine", "#RuleLine", "#Comment", "#Empty"];
    const error = token.isEof ? UnexpectedEOFException.create(token, expectedTokens) : UnexpectedTokenException.create(token, expectedTokens);
    if (this.stopAtFirstError)
      throw error;
    this.addError(context, error);
    return 21;
  }
  // GherkinDocument:0>Feature:3>Rule:0>RuleHeader:0>Tags:0>#TagLine:0
  matchTokenAt_22(token, context) {
    if (this.match_TagLine(context, token)) {
      this.build(context, token);
      return 22;
    }
    if (this.match_RuleLine(context, token)) {
      this.endRule(context);
      this.build(context, token);
      return 23;
    }
    if (this.match_Comment(context, token)) {
      this.build(context, token);
      return 22;
    }
    if (this.match_Empty(context, token)) {
      this.build(context, token);
      return 22;
    }
    const expectedTokens = ["#TagLine", "#RuleLine", "#Comment", "#Empty"];
    const error = token.isEof ? UnexpectedEOFException.create(token, expectedTokens) : UnexpectedTokenException.create(token, expectedTokens);
    if (this.stopAtFirstError)
      throw error;
    this.addError(context, error);
    return 22;
  }
  // GherkinDocument:0>Feature:3>Rule:0>RuleHeader:1>#RuleLine:0
  matchTokenAt_23(token, context) {
    if (this.match_EOF(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.build(context, token);
      return 42;
    }
    if (this.match_Empty(context, token)) {
      this.build(context, token);
      return 23;
    }
    if (this.match_Comment(context, token)) {
      this.startRule(context, RuleType.Description);
      this.build(context, token);
      return 24;
    }
    if (this.match_BackgroundLine(context, token)) {
      this.endRule(context);
      this.startRule(context, RuleType.Background);
      this.build(context, token);
      return 25;
    }
    if (this.match_TagLine(context, token)) {
      if (this.lookahead_0(context, token)) {
        this.endRule(context);
        this.startRule(context, RuleType.ScenarioDefinition);
        this.startRule(context, RuleType.Tags);
        this.build(context, token);
        return 31;
      }
    }
    if (this.match_TagLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.Rule);
      this.startRule(context, RuleType.RuleHeader);
      this.startRule(context, RuleType.Tags);
      this.build(context, token);
      return 22;
    }
    if (this.match_ScenarioLine(context, token)) {
      this.endRule(context);
      this.startRule(context, RuleType.ScenarioDefinition);
      this.startRule(context, RuleType.Scenario);
      this.build(context, token);
      return 32;
    }
    if (this.match_RuleLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.Rule);
      this.startRule(context, RuleType.RuleHeader);
      this.build(context, token);
      return 23;
    }
    if (this.match_Other(context, token)) {
      this.startRule(context, RuleType.Description);
      this.build(context, token);
      return 24;
    }
    const expectedTokens = ["#EOF", "#Empty", "#Comment", "#BackgroundLine", "#TagLine", "#ScenarioLine", "#RuleLine", "#Other"];
    const error = token.isEof ? UnexpectedEOFException.create(token, expectedTokens) : UnexpectedTokenException.create(token, expectedTokens);
    if (this.stopAtFirstError)
      throw error;
    this.addError(context, error);
    return 23;
  }
  // GherkinDocument:0>Feature:3>Rule:0>RuleHeader:2>DescriptionHelper:1>Description:0>__alt1:0>#Other:0
  matchTokenAt_24(token, context) {
    if (this.match_EOF(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.build(context, token);
      return 42;
    }
    if (this.match_Comment(context, token)) {
      this.build(context, token);
      return 24;
    }
    if (this.match_BackgroundLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.Background);
      this.build(context, token);
      return 25;
    }
    if (this.match_TagLine(context, token)) {
      if (this.lookahead_0(context, token)) {
        this.endRule(context);
        this.endRule(context);
        this.startRule(context, RuleType.ScenarioDefinition);
        this.startRule(context, RuleType.Tags);
        this.build(context, token);
        return 31;
      }
    }
    if (this.match_TagLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.Rule);
      this.startRule(context, RuleType.RuleHeader);
      this.startRule(context, RuleType.Tags);
      this.build(context, token);
      return 22;
    }
    if (this.match_ScenarioLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.ScenarioDefinition);
      this.startRule(context, RuleType.Scenario);
      this.build(context, token);
      return 32;
    }
    if (this.match_RuleLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.Rule);
      this.startRule(context, RuleType.RuleHeader);
      this.build(context, token);
      return 23;
    }
    if (this.match_Other(context, token)) {
      this.build(context, token);
      return 24;
    }
    const expectedTokens = ["#EOF", "#Comment", "#BackgroundLine", "#TagLine", "#ScenarioLine", "#RuleLine", "#Other"];
    const error = token.isEof ? UnexpectedEOFException.create(token, expectedTokens) : UnexpectedTokenException.create(token, expectedTokens);
    if (this.stopAtFirstError)
      throw error;
    this.addError(context, error);
    return 24;
  }
  // GherkinDocument:0>Feature:3>Rule:1>Background:0>#BackgroundLine:0
  matchTokenAt_25(token, context) {
    if (this.match_EOF(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.build(context, token);
      return 42;
    }
    if (this.match_Empty(context, token)) {
      this.build(context, token);
      return 25;
    }
    if (this.match_Comment(context, token)) {
      this.startRule(context, RuleType.Description);
      this.build(context, token);
      return 26;
    }
    if (this.match_StepLine(context, token)) {
      this.startRule(context, RuleType.Step);
      this.build(context, token);
      return 27;
    }
    if (this.match_TagLine(context, token)) {
      if (this.lookahead_0(context, token)) {
        this.endRule(context);
        this.startRule(context, RuleType.ScenarioDefinition);
        this.startRule(context, RuleType.Tags);
        this.build(context, token);
        return 31;
      }
    }
    if (this.match_TagLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.Rule);
      this.startRule(context, RuleType.RuleHeader);
      this.startRule(context, RuleType.Tags);
      this.build(context, token);
      return 22;
    }
    if (this.match_ScenarioLine(context, token)) {
      this.endRule(context);
      this.startRule(context, RuleType.ScenarioDefinition);
      this.startRule(context, RuleType.Scenario);
      this.build(context, token);
      return 32;
    }
    if (this.match_RuleLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.Rule);
      this.startRule(context, RuleType.RuleHeader);
      this.build(context, token);
      return 23;
    }
    if (this.match_Other(context, token)) {
      this.startRule(context, RuleType.Description);
      this.build(context, token);
      return 26;
    }
    const expectedTokens = ["#EOF", "#Empty", "#Comment", "#StepLine", "#TagLine", "#ScenarioLine", "#RuleLine", "#Other"];
    const error = token.isEof ? UnexpectedEOFException.create(token, expectedTokens) : UnexpectedTokenException.create(token, expectedTokens);
    if (this.stopAtFirstError)
      throw error;
    this.addError(context, error);
    return 25;
  }
  // GherkinDocument:0>Feature:3>Rule:1>Background:1>DescriptionHelper:1>Description:0>__alt1:0>#Other:0
  matchTokenAt_26(token, context) {
    if (this.match_EOF(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.build(context, token);
      return 42;
    }
    if (this.match_Comment(context, token)) {
      this.build(context, token);
      return 26;
    }
    if (this.match_StepLine(context, token)) {
      this.endRule(context);
      this.startRule(context, RuleType.Step);
      this.build(context, token);
      return 27;
    }
    if (this.match_TagLine(context, token)) {
      if (this.lookahead_0(context, token)) {
        this.endRule(context);
        this.endRule(context);
        this.startRule(context, RuleType.ScenarioDefinition);
        this.startRule(context, RuleType.Tags);
        this.build(context, token);
        return 31;
      }
    }
    if (this.match_TagLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.Rule);
      this.startRule(context, RuleType.RuleHeader);
      this.startRule(context, RuleType.Tags);
      this.build(context, token);
      return 22;
    }
    if (this.match_ScenarioLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.ScenarioDefinition);
      this.startRule(context, RuleType.Scenario);
      this.build(context, token);
      return 32;
    }
    if (this.match_RuleLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.Rule);
      this.startRule(context, RuleType.RuleHeader);
      this.build(context, token);
      return 23;
    }
    if (this.match_Other(context, token)) {
      this.build(context, token);
      return 26;
    }
    const expectedTokens = ["#EOF", "#Comment", "#StepLine", "#TagLine", "#ScenarioLine", "#RuleLine", "#Other"];
    const error = token.isEof ? UnexpectedEOFException.create(token, expectedTokens) : UnexpectedTokenException.create(token, expectedTokens);
    if (this.stopAtFirstError)
      throw error;
    this.addError(context, error);
    return 26;
  }
  // GherkinDocument:0>Feature:3>Rule:1>Background:2>Step:0>#StepLine:0
  matchTokenAt_27(token, context) {
    if (this.match_EOF(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.build(context, token);
      return 42;
    }
    if (this.match_TableRow(context, token)) {
      this.startRule(context, RuleType.DataTable);
      this.build(context, token);
      return 28;
    }
    if (this.match_DocStringSeparator(context, token)) {
      this.startRule(context, RuleType.DocString);
      this.build(context, token);
      return 46;
    }
    if (this.match_StepLine(context, token)) {
      this.endRule(context);
      this.startRule(context, RuleType.Step);
      this.build(context, token);
      return 27;
    }
    if (this.match_TagLine(context, token)) {
      if (this.lookahead_0(context, token)) {
        this.endRule(context);
        this.endRule(context);
        this.startRule(context, RuleType.ScenarioDefinition);
        this.startRule(context, RuleType.Tags);
        this.build(context, token);
        return 31;
      }
    }
    if (this.match_TagLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.Rule);
      this.startRule(context, RuleType.RuleHeader);
      this.startRule(context, RuleType.Tags);
      this.build(context, token);
      return 22;
    }
    if (this.match_ScenarioLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.ScenarioDefinition);
      this.startRule(context, RuleType.Scenario);
      this.build(context, token);
      return 32;
    }
    if (this.match_RuleLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.Rule);
      this.startRule(context, RuleType.RuleHeader);
      this.build(context, token);
      return 23;
    }
    if (this.match_Comment(context, token)) {
      this.build(context, token);
      return 27;
    }
    if (this.match_Empty(context, token)) {
      this.build(context, token);
      return 27;
    }
    const expectedTokens = ["#EOF", "#TableRow", "#DocStringSeparator", "#StepLine", "#TagLine", "#ScenarioLine", "#RuleLine", "#Comment", "#Empty"];
    const error = token.isEof ? UnexpectedEOFException.create(token, expectedTokens) : UnexpectedTokenException.create(token, expectedTokens);
    if (this.stopAtFirstError)
      throw error;
    this.addError(context, error);
    return 27;
  }
  // GherkinDocument:0>Feature:3>Rule:1>Background:2>Step:1>StepArg:0>__alt0:0>DataTableAndMaybeDocString:0>DataTable:0>#TableRow:0
  matchTokenAt_28(token, context) {
    if (this.match_EOF(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.build(context, token);
      return 42;
    }
    if (this.match_TableRow(context, token)) {
      this.build(context, token);
      return 28;
    }
    if (this.match_DocStringSeparator(context, token)) {
      this.endRule(context);
      this.startRule(context, RuleType.DocString);
      this.build(context, token);
      return 29;
    }
    if (this.match_StepLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.Step);
      this.build(context, token);
      return 27;
    }
    if (this.match_TagLine(context, token)) {
      if (this.lookahead_0(context, token)) {
        this.endRule(context);
        this.endRule(context);
        this.endRule(context);
        this.startRule(context, RuleType.ScenarioDefinition);
        this.startRule(context, RuleType.Tags);
        this.build(context, token);
        return 31;
      }
    }
    if (this.match_TagLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.Rule);
      this.startRule(context, RuleType.RuleHeader);
      this.startRule(context, RuleType.Tags);
      this.build(context, token);
      return 22;
    }
    if (this.match_ScenarioLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.ScenarioDefinition);
      this.startRule(context, RuleType.Scenario);
      this.build(context, token);
      return 32;
    }
    if (this.match_RuleLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.Rule);
      this.startRule(context, RuleType.RuleHeader);
      this.build(context, token);
      return 23;
    }
    if (this.match_Comment(context, token)) {
      this.build(context, token);
      return 28;
    }
    if (this.match_Empty(context, token)) {
      this.build(context, token);
      return 28;
    }
    const expectedTokens = ["#EOF", "#TableRow", "#DocStringSeparator", "#StepLine", "#TagLine", "#ScenarioLine", "#RuleLine", "#Comment", "#Empty"];
    const error = token.isEof ? UnexpectedEOFException.create(token, expectedTokens) : UnexpectedTokenException.create(token, expectedTokens);
    if (this.stopAtFirstError)
      throw error;
    this.addError(context, error);
    return 28;
  }
  // GherkinDocument:0>Feature:3>Rule:1>Background:2>Step:1>StepArg:0>__alt0:0>DataTableAndMaybeDocString:1>DocString:0>#DocStringSeparator:0
  matchTokenAt_29(token, context) {
    if (this.match_DocStringSeparator(context, token)) {
      this.build(context, token);
      return 30;
    }
    if (this.match_Other(context, token)) {
      this.build(context, token);
      return 29;
    }
    const expectedTokens = ["#DocStringSeparator", "#Other"];
    const error = token.isEof ? UnexpectedEOFException.create(token, expectedTokens) : UnexpectedTokenException.create(token, expectedTokens);
    if (this.stopAtFirstError)
      throw error;
    this.addError(context, error);
    return 29;
  }
  // GherkinDocument:0>Feature:3>Rule:1>Background:2>Step:1>StepArg:0>__alt0:0>DataTableAndMaybeDocString:1>DocString:2>#DocStringSeparator:0
  matchTokenAt_30(token, context) {
    if (this.match_EOF(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.build(context, token);
      return 42;
    }
    if (this.match_StepLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.Step);
      this.build(context, token);
      return 27;
    }
    if (this.match_TagLine(context, token)) {
      if (this.lookahead_0(context, token)) {
        this.endRule(context);
        this.endRule(context);
        this.endRule(context);
        this.startRule(context, RuleType.ScenarioDefinition);
        this.startRule(context, RuleType.Tags);
        this.build(context, token);
        return 31;
      }
    }
    if (this.match_TagLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.Rule);
      this.startRule(context, RuleType.RuleHeader);
      this.startRule(context, RuleType.Tags);
      this.build(context, token);
      return 22;
    }
    if (this.match_ScenarioLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.ScenarioDefinition);
      this.startRule(context, RuleType.Scenario);
      this.build(context, token);
      return 32;
    }
    if (this.match_RuleLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.Rule);
      this.startRule(context, RuleType.RuleHeader);
      this.build(context, token);
      return 23;
    }
    if (this.match_Comment(context, token)) {
      this.build(context, token);
      return 30;
    }
    if (this.match_Empty(context, token)) {
      this.build(context, token);
      return 30;
    }
    const expectedTokens = ["#EOF", "#StepLine", "#TagLine", "#ScenarioLine", "#RuleLine", "#Comment", "#Empty"];
    const error = token.isEof ? UnexpectedEOFException.create(token, expectedTokens) : UnexpectedTokenException.create(token, expectedTokens);
    if (this.stopAtFirstError)
      throw error;
    this.addError(context, error);
    return 30;
  }
  // GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:0>Tags:0>#TagLine:0
  matchTokenAt_31(token, context) {
    if (this.match_TagLine(context, token)) {
      this.build(context, token);
      return 31;
    }
    if (this.match_ScenarioLine(context, token)) {
      this.endRule(context);
      this.startRule(context, RuleType.Scenario);
      this.build(context, token);
      return 32;
    }
    if (this.match_Comment(context, token)) {
      this.build(context, token);
      return 31;
    }
    if (this.match_Empty(context, token)) {
      this.build(context, token);
      return 31;
    }
    const expectedTokens = ["#TagLine", "#ScenarioLine", "#Comment", "#Empty"];
    const error = token.isEof ? UnexpectedEOFException.create(token, expectedTokens) : UnexpectedTokenException.create(token, expectedTokens);
    if (this.stopAtFirstError)
      throw error;
    this.addError(context, error);
    return 31;
  }
  // GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:0>#ScenarioLine:0
  matchTokenAt_32(token, context) {
    if (this.match_EOF(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.build(context, token);
      return 42;
    }
    if (this.match_Empty(context, token)) {
      this.build(context, token);
      return 32;
    }
    if (this.match_Comment(context, token)) {
      this.startRule(context, RuleType.Description);
      this.build(context, token);
      return 33;
    }
    if (this.match_StepLine(context, token)) {
      this.startRule(context, RuleType.Step);
      this.build(context, token);
      return 34;
    }
    if (this.match_TagLine(context, token)) {
      if (this.lookahead_1(context, token)) {
        this.startRule(context, RuleType.ExamplesDefinition);
        this.startRule(context, RuleType.Tags);
        this.build(context, token);
        return 38;
      }
    }
    if (this.match_TagLine(context, token)) {
      if (this.lookahead_0(context, token)) {
        this.endRule(context);
        this.endRule(context);
        this.startRule(context, RuleType.ScenarioDefinition);
        this.startRule(context, RuleType.Tags);
        this.build(context, token);
        return 31;
      }
    }
    if (this.match_TagLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.Rule);
      this.startRule(context, RuleType.RuleHeader);
      this.startRule(context, RuleType.Tags);
      this.build(context, token);
      return 22;
    }
    if (this.match_ExamplesLine(context, token)) {
      this.startRule(context, RuleType.ExamplesDefinition);
      this.startRule(context, RuleType.Examples);
      this.build(context, token);
      return 39;
    }
    if (this.match_ScenarioLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.ScenarioDefinition);
      this.startRule(context, RuleType.Scenario);
      this.build(context, token);
      return 32;
    }
    if (this.match_RuleLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.Rule);
      this.startRule(context, RuleType.RuleHeader);
      this.build(context, token);
      return 23;
    }
    if (this.match_Other(context, token)) {
      this.startRule(context, RuleType.Description);
      this.build(context, token);
      return 33;
    }
    const expectedTokens = ["#EOF", "#Empty", "#Comment", "#StepLine", "#TagLine", "#ExamplesLine", "#ScenarioLine", "#RuleLine", "#Other"];
    const error = token.isEof ? UnexpectedEOFException.create(token, expectedTokens) : UnexpectedTokenException.create(token, expectedTokens);
    if (this.stopAtFirstError)
      throw error;
    this.addError(context, error);
    return 32;
  }
  // GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:1>DescriptionHelper:1>Description:0>__alt1:0>#Other:0
  matchTokenAt_33(token, context) {
    if (this.match_EOF(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.build(context, token);
      return 42;
    }
    if (this.match_Comment(context, token)) {
      this.build(context, token);
      return 33;
    }
    if (this.match_StepLine(context, token)) {
      this.endRule(context);
      this.startRule(context, RuleType.Step);
      this.build(context, token);
      return 34;
    }
    if (this.match_TagLine(context, token)) {
      if (this.lookahead_1(context, token)) {
        this.endRule(context);
        this.startRule(context, RuleType.ExamplesDefinition);
        this.startRule(context, RuleType.Tags);
        this.build(context, token);
        return 38;
      }
    }
    if (this.match_TagLine(context, token)) {
      if (this.lookahead_0(context, token)) {
        this.endRule(context);
        this.endRule(context);
        this.endRule(context);
        this.startRule(context, RuleType.ScenarioDefinition);
        this.startRule(context, RuleType.Tags);
        this.build(context, token);
        return 31;
      }
    }
    if (this.match_TagLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.Rule);
      this.startRule(context, RuleType.RuleHeader);
      this.startRule(context, RuleType.Tags);
      this.build(context, token);
      return 22;
    }
    if (this.match_ExamplesLine(context, token)) {
      this.endRule(context);
      this.startRule(context, RuleType.ExamplesDefinition);
      this.startRule(context, RuleType.Examples);
      this.build(context, token);
      return 39;
    }
    if (this.match_ScenarioLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.ScenarioDefinition);
      this.startRule(context, RuleType.Scenario);
      this.build(context, token);
      return 32;
    }
    if (this.match_RuleLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.Rule);
      this.startRule(context, RuleType.RuleHeader);
      this.build(context, token);
      return 23;
    }
    if (this.match_Other(context, token)) {
      this.build(context, token);
      return 33;
    }
    const expectedTokens = ["#EOF", "#Comment", "#StepLine", "#TagLine", "#ExamplesLine", "#ScenarioLine", "#RuleLine", "#Other"];
    const error = token.isEof ? UnexpectedEOFException.create(token, expectedTokens) : UnexpectedTokenException.create(token, expectedTokens);
    if (this.stopAtFirstError)
      throw error;
    this.addError(context, error);
    return 33;
  }
  // GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:2>Step:0>#StepLine:0
  matchTokenAt_34(token, context) {
    if (this.match_EOF(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.build(context, token);
      return 42;
    }
    if (this.match_TableRow(context, token)) {
      this.startRule(context, RuleType.DataTable);
      this.build(context, token);
      return 35;
    }
    if (this.match_DocStringSeparator(context, token)) {
      this.startRule(context, RuleType.DocString);
      this.build(context, token);
      return 43;
    }
    if (this.match_StepLine(context, token)) {
      this.endRule(context);
      this.startRule(context, RuleType.Step);
      this.build(context, token);
      return 34;
    }
    if (this.match_TagLine(context, token)) {
      if (this.lookahead_1(context, token)) {
        this.endRule(context);
        this.startRule(context, RuleType.ExamplesDefinition);
        this.startRule(context, RuleType.Tags);
        this.build(context, token);
        return 38;
      }
    }
    if (this.match_TagLine(context, token)) {
      if (this.lookahead_0(context, token)) {
        this.endRule(context);
        this.endRule(context);
        this.endRule(context);
        this.startRule(context, RuleType.ScenarioDefinition);
        this.startRule(context, RuleType.Tags);
        this.build(context, token);
        return 31;
      }
    }
    if (this.match_TagLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.Rule);
      this.startRule(context, RuleType.RuleHeader);
      this.startRule(context, RuleType.Tags);
      this.build(context, token);
      return 22;
    }
    if (this.match_ExamplesLine(context, token)) {
      this.endRule(context);
      this.startRule(context, RuleType.ExamplesDefinition);
      this.startRule(context, RuleType.Examples);
      this.build(context, token);
      return 39;
    }
    if (this.match_ScenarioLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.ScenarioDefinition);
      this.startRule(context, RuleType.Scenario);
      this.build(context, token);
      return 32;
    }
    if (this.match_RuleLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.Rule);
      this.startRule(context, RuleType.RuleHeader);
      this.build(context, token);
      return 23;
    }
    if (this.match_Comment(context, token)) {
      this.build(context, token);
      return 34;
    }
    if (this.match_Empty(context, token)) {
      this.build(context, token);
      return 34;
    }
    const expectedTokens = ["#EOF", "#TableRow", "#DocStringSeparator", "#StepLine", "#TagLine", "#ExamplesLine", "#ScenarioLine", "#RuleLine", "#Comment", "#Empty"];
    const error = token.isEof ? UnexpectedEOFException.create(token, expectedTokens) : UnexpectedTokenException.create(token, expectedTokens);
    if (this.stopAtFirstError)
      throw error;
    this.addError(context, error);
    return 34;
  }
  // GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:2>Step:1>StepArg:0>__alt0:0>DataTableAndMaybeDocString:0>DataTable:0>#TableRow:0
  matchTokenAt_35(token, context) {
    if (this.match_EOF(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.build(context, token);
      return 42;
    }
    if (this.match_TableRow(context, token)) {
      this.build(context, token);
      return 35;
    }
    if (this.match_DocStringSeparator(context, token)) {
      this.endRule(context);
      this.startRule(context, RuleType.DocString);
      this.build(context, token);
      return 36;
    }
    if (this.match_StepLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.Step);
      this.build(context, token);
      return 34;
    }
    if (this.match_TagLine(context, token)) {
      if (this.lookahead_1(context, token)) {
        this.endRule(context);
        this.endRule(context);
        this.startRule(context, RuleType.ExamplesDefinition);
        this.startRule(context, RuleType.Tags);
        this.build(context, token);
        return 38;
      }
    }
    if (this.match_TagLine(context, token)) {
      if (this.lookahead_0(context, token)) {
        this.endRule(context);
        this.endRule(context);
        this.endRule(context);
        this.endRule(context);
        this.startRule(context, RuleType.ScenarioDefinition);
        this.startRule(context, RuleType.Tags);
        this.build(context, token);
        return 31;
      }
    }
    if (this.match_TagLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.Rule);
      this.startRule(context, RuleType.RuleHeader);
      this.startRule(context, RuleType.Tags);
      this.build(context, token);
      return 22;
    }
    if (this.match_ExamplesLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.ExamplesDefinition);
      this.startRule(context, RuleType.Examples);
      this.build(context, token);
      return 39;
    }
    if (this.match_ScenarioLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.ScenarioDefinition);
      this.startRule(context, RuleType.Scenario);
      this.build(context, token);
      return 32;
    }
    if (this.match_RuleLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.Rule);
      this.startRule(context, RuleType.RuleHeader);
      this.build(context, token);
      return 23;
    }
    if (this.match_Comment(context, token)) {
      this.build(context, token);
      return 35;
    }
    if (this.match_Empty(context, token)) {
      this.build(context, token);
      return 35;
    }
    const expectedTokens = ["#EOF", "#TableRow", "#DocStringSeparator", "#StepLine", "#TagLine", "#ExamplesLine", "#ScenarioLine", "#RuleLine", "#Comment", "#Empty"];
    const error = token.isEof ? UnexpectedEOFException.create(token, expectedTokens) : UnexpectedTokenException.create(token, expectedTokens);
    if (this.stopAtFirstError)
      throw error;
    this.addError(context, error);
    return 35;
  }
  // GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:2>Step:1>StepArg:0>__alt0:0>DataTableAndMaybeDocString:1>DocString:0>#DocStringSeparator:0
  matchTokenAt_36(token, context) {
    if (this.match_DocStringSeparator(context, token)) {
      this.build(context, token);
      return 37;
    }
    if (this.match_Other(context, token)) {
      this.build(context, token);
      return 36;
    }
    const expectedTokens = ["#DocStringSeparator", "#Other"];
    const error = token.isEof ? UnexpectedEOFException.create(token, expectedTokens) : UnexpectedTokenException.create(token, expectedTokens);
    if (this.stopAtFirstError)
      throw error;
    this.addError(context, error);
    return 36;
  }
  // GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:2>Step:1>StepArg:0>__alt0:0>DataTableAndMaybeDocString:1>DocString:2>#DocStringSeparator:0
  matchTokenAt_37(token, context) {
    if (this.match_EOF(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.build(context, token);
      return 42;
    }
    if (this.match_StepLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.Step);
      this.build(context, token);
      return 34;
    }
    if (this.match_TagLine(context, token)) {
      if (this.lookahead_1(context, token)) {
        this.endRule(context);
        this.endRule(context);
        this.startRule(context, RuleType.ExamplesDefinition);
        this.startRule(context, RuleType.Tags);
        this.build(context, token);
        return 38;
      }
    }
    if (this.match_TagLine(context, token)) {
      if (this.lookahead_0(context, token)) {
        this.endRule(context);
        this.endRule(context);
        this.endRule(context);
        this.endRule(context);
        this.startRule(context, RuleType.ScenarioDefinition);
        this.startRule(context, RuleType.Tags);
        this.build(context, token);
        return 31;
      }
    }
    if (this.match_TagLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.Rule);
      this.startRule(context, RuleType.RuleHeader);
      this.startRule(context, RuleType.Tags);
      this.build(context, token);
      return 22;
    }
    if (this.match_ExamplesLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.ExamplesDefinition);
      this.startRule(context, RuleType.Examples);
      this.build(context, token);
      return 39;
    }
    if (this.match_ScenarioLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.ScenarioDefinition);
      this.startRule(context, RuleType.Scenario);
      this.build(context, token);
      return 32;
    }
    if (this.match_RuleLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.Rule);
      this.startRule(context, RuleType.RuleHeader);
      this.build(context, token);
      return 23;
    }
    if (this.match_Comment(context, token)) {
      this.build(context, token);
      return 37;
    }
    if (this.match_Empty(context, token)) {
      this.build(context, token);
      return 37;
    }
    const expectedTokens = ["#EOF", "#StepLine", "#TagLine", "#ExamplesLine", "#ScenarioLine", "#RuleLine", "#Comment", "#Empty"];
    const error = token.isEof ? UnexpectedEOFException.create(token, expectedTokens) : UnexpectedTokenException.create(token, expectedTokens);
    if (this.stopAtFirstError)
      throw error;
    this.addError(context, error);
    return 37;
  }
  // GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:3>ExamplesDefinition:0>Tags:0>#TagLine:0
  matchTokenAt_38(token, context) {
    if (this.match_TagLine(context, token)) {
      this.build(context, token);
      return 38;
    }
    if (this.match_ExamplesLine(context, token)) {
      this.endRule(context);
      this.startRule(context, RuleType.Examples);
      this.build(context, token);
      return 39;
    }
    if (this.match_Comment(context, token)) {
      this.build(context, token);
      return 38;
    }
    if (this.match_Empty(context, token)) {
      this.build(context, token);
      return 38;
    }
    const expectedTokens = ["#TagLine", "#ExamplesLine", "#Comment", "#Empty"];
    const error = token.isEof ? UnexpectedEOFException.create(token, expectedTokens) : UnexpectedTokenException.create(token, expectedTokens);
    if (this.stopAtFirstError)
      throw error;
    this.addError(context, error);
    return 38;
  }
  // GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:3>ExamplesDefinition:1>Examples:0>#ExamplesLine:0
  matchTokenAt_39(token, context) {
    if (this.match_EOF(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.build(context, token);
      return 42;
    }
    if (this.match_Empty(context, token)) {
      this.build(context, token);
      return 39;
    }
    if (this.match_Comment(context, token)) {
      this.startRule(context, RuleType.Description);
      this.build(context, token);
      return 40;
    }
    if (this.match_TableRow(context, token)) {
      this.startRule(context, RuleType.ExamplesTable);
      this.build(context, token);
      return 41;
    }
    if (this.match_TagLine(context, token)) {
      if (this.lookahead_1(context, token)) {
        this.endRule(context);
        this.endRule(context);
        this.startRule(context, RuleType.ExamplesDefinition);
        this.startRule(context, RuleType.Tags);
        this.build(context, token);
        return 38;
      }
    }
    if (this.match_TagLine(context, token)) {
      if (this.lookahead_0(context, token)) {
        this.endRule(context);
        this.endRule(context);
        this.endRule(context);
        this.endRule(context);
        this.startRule(context, RuleType.ScenarioDefinition);
        this.startRule(context, RuleType.Tags);
        this.build(context, token);
        return 31;
      }
    }
    if (this.match_TagLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.Rule);
      this.startRule(context, RuleType.RuleHeader);
      this.startRule(context, RuleType.Tags);
      this.build(context, token);
      return 22;
    }
    if (this.match_ExamplesLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.ExamplesDefinition);
      this.startRule(context, RuleType.Examples);
      this.build(context, token);
      return 39;
    }
    if (this.match_ScenarioLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.ScenarioDefinition);
      this.startRule(context, RuleType.Scenario);
      this.build(context, token);
      return 32;
    }
    if (this.match_RuleLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.Rule);
      this.startRule(context, RuleType.RuleHeader);
      this.build(context, token);
      return 23;
    }
    if (this.match_Other(context, token)) {
      this.startRule(context, RuleType.Description);
      this.build(context, token);
      return 40;
    }
    const expectedTokens = ["#EOF", "#Empty", "#Comment", "#TableRow", "#TagLine", "#ExamplesLine", "#ScenarioLine", "#RuleLine", "#Other"];
    const error = token.isEof ? UnexpectedEOFException.create(token, expectedTokens) : UnexpectedTokenException.create(token, expectedTokens);
    if (this.stopAtFirstError)
      throw error;
    this.addError(context, error);
    return 39;
  }
  // GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:3>ExamplesDefinition:1>Examples:1>DescriptionHelper:1>Description:0>__alt1:0>#Other:0
  matchTokenAt_40(token, context) {
    if (this.match_EOF(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.build(context, token);
      return 42;
    }
    if (this.match_Comment(context, token)) {
      this.build(context, token);
      return 40;
    }
    if (this.match_TableRow(context, token)) {
      this.endRule(context);
      this.startRule(context, RuleType.ExamplesTable);
      this.build(context, token);
      return 41;
    }
    if (this.match_TagLine(context, token)) {
      if (this.lookahead_1(context, token)) {
        this.endRule(context);
        this.endRule(context);
        this.endRule(context);
        this.startRule(context, RuleType.ExamplesDefinition);
        this.startRule(context, RuleType.Tags);
        this.build(context, token);
        return 38;
      }
    }
    if (this.match_TagLine(context, token)) {
      if (this.lookahead_0(context, token)) {
        this.endRule(context);
        this.endRule(context);
        this.endRule(context);
        this.endRule(context);
        this.endRule(context);
        this.startRule(context, RuleType.ScenarioDefinition);
        this.startRule(context, RuleType.Tags);
        this.build(context, token);
        return 31;
      }
    }
    if (this.match_TagLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.Rule);
      this.startRule(context, RuleType.RuleHeader);
      this.startRule(context, RuleType.Tags);
      this.build(context, token);
      return 22;
    }
    if (this.match_ExamplesLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.ExamplesDefinition);
      this.startRule(context, RuleType.Examples);
      this.build(context, token);
      return 39;
    }
    if (this.match_ScenarioLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.ScenarioDefinition);
      this.startRule(context, RuleType.Scenario);
      this.build(context, token);
      return 32;
    }
    if (this.match_RuleLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.Rule);
      this.startRule(context, RuleType.RuleHeader);
      this.build(context, token);
      return 23;
    }
    if (this.match_Other(context, token)) {
      this.build(context, token);
      return 40;
    }
    const expectedTokens = ["#EOF", "#Comment", "#TableRow", "#TagLine", "#ExamplesLine", "#ScenarioLine", "#RuleLine", "#Other"];
    const error = token.isEof ? UnexpectedEOFException.create(token, expectedTokens) : UnexpectedTokenException.create(token, expectedTokens);
    if (this.stopAtFirstError)
      throw error;
    this.addError(context, error);
    return 40;
  }
  // GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:3>ExamplesDefinition:1>Examples:2>ExamplesTable:0>#TableRow:0
  matchTokenAt_41(token, context) {
    if (this.match_EOF(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.build(context, token);
      return 42;
    }
    if (this.match_TableRow(context, token)) {
      this.build(context, token);
      return 41;
    }
    if (this.match_TagLine(context, token)) {
      if (this.lookahead_1(context, token)) {
        this.endRule(context);
        this.endRule(context);
        this.endRule(context);
        this.startRule(context, RuleType.ExamplesDefinition);
        this.startRule(context, RuleType.Tags);
        this.build(context, token);
        return 38;
      }
    }
    if (this.match_TagLine(context, token)) {
      if (this.lookahead_0(context, token)) {
        this.endRule(context);
        this.endRule(context);
        this.endRule(context);
        this.endRule(context);
        this.endRule(context);
        this.startRule(context, RuleType.ScenarioDefinition);
        this.startRule(context, RuleType.Tags);
        this.build(context, token);
        return 31;
      }
    }
    if (this.match_TagLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.Rule);
      this.startRule(context, RuleType.RuleHeader);
      this.startRule(context, RuleType.Tags);
      this.build(context, token);
      return 22;
    }
    if (this.match_ExamplesLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.ExamplesDefinition);
      this.startRule(context, RuleType.Examples);
      this.build(context, token);
      return 39;
    }
    if (this.match_ScenarioLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.ScenarioDefinition);
      this.startRule(context, RuleType.Scenario);
      this.build(context, token);
      return 32;
    }
    if (this.match_RuleLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.Rule);
      this.startRule(context, RuleType.RuleHeader);
      this.build(context, token);
      return 23;
    }
    if (this.match_Comment(context, token)) {
      this.build(context, token);
      return 41;
    }
    if (this.match_Empty(context, token)) {
      this.build(context, token);
      return 41;
    }
    const expectedTokens = ["#EOF", "#TableRow", "#TagLine", "#ExamplesLine", "#ScenarioLine", "#RuleLine", "#Comment", "#Empty"];
    const error = token.isEof ? UnexpectedEOFException.create(token, expectedTokens) : UnexpectedTokenException.create(token, expectedTokens);
    if (this.stopAtFirstError)
      throw error;
    this.addError(context, error);
    return 41;
  }
  // GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:2>Step:1>StepArg:0>__alt0:1>DocStringAndMaybeDataTable:0>DocString:0>#DocStringSeparator:0
  matchTokenAt_43(token, context) {
    if (this.match_DocStringSeparator(context, token)) {
      this.build(context, token);
      return 44;
    }
    if (this.match_Other(context, token)) {
      this.build(context, token);
      return 43;
    }
    const expectedTokens = ["#DocStringSeparator", "#Other"];
    const error = token.isEof ? UnexpectedEOFException.create(token, expectedTokens) : UnexpectedTokenException.create(token, expectedTokens);
    if (this.stopAtFirstError)
      throw error;
    this.addError(context, error);
    return 43;
  }
  // GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:2>Step:1>StepArg:0>__alt0:1>DocStringAndMaybeDataTable:0>DocString:2>#DocStringSeparator:0
  matchTokenAt_44(token, context) {
    if (this.match_EOF(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.build(context, token);
      return 42;
    }
    if (this.match_TableRow(context, token)) {
      this.endRule(context);
      this.startRule(context, RuleType.DataTable);
      this.build(context, token);
      return 45;
    }
    if (this.match_StepLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.Step);
      this.build(context, token);
      return 34;
    }
    if (this.match_TagLine(context, token)) {
      if (this.lookahead_1(context, token)) {
        this.endRule(context);
        this.endRule(context);
        this.startRule(context, RuleType.ExamplesDefinition);
        this.startRule(context, RuleType.Tags);
        this.build(context, token);
        return 38;
      }
    }
    if (this.match_TagLine(context, token)) {
      if (this.lookahead_0(context, token)) {
        this.endRule(context);
        this.endRule(context);
        this.endRule(context);
        this.endRule(context);
        this.startRule(context, RuleType.ScenarioDefinition);
        this.startRule(context, RuleType.Tags);
        this.build(context, token);
        return 31;
      }
    }
    if (this.match_TagLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.Rule);
      this.startRule(context, RuleType.RuleHeader);
      this.startRule(context, RuleType.Tags);
      this.build(context, token);
      return 22;
    }
    if (this.match_ExamplesLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.ExamplesDefinition);
      this.startRule(context, RuleType.Examples);
      this.build(context, token);
      return 39;
    }
    if (this.match_ScenarioLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.ScenarioDefinition);
      this.startRule(context, RuleType.Scenario);
      this.build(context, token);
      return 32;
    }
    if (this.match_RuleLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.Rule);
      this.startRule(context, RuleType.RuleHeader);
      this.build(context, token);
      return 23;
    }
    if (this.match_Comment(context, token)) {
      this.build(context, token);
      return 44;
    }
    if (this.match_Empty(context, token)) {
      this.build(context, token);
      return 44;
    }
    const expectedTokens = ["#EOF", "#TableRow", "#StepLine", "#TagLine", "#ExamplesLine", "#ScenarioLine", "#RuleLine", "#Comment", "#Empty"];
    const error = token.isEof ? UnexpectedEOFException.create(token, expectedTokens) : UnexpectedTokenException.create(token, expectedTokens);
    if (this.stopAtFirstError)
      throw error;
    this.addError(context, error);
    return 44;
  }
  // GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:2>Step:1>StepArg:0>__alt0:1>DocStringAndMaybeDataTable:1>DataTable:0>#TableRow:0
  matchTokenAt_45(token, context) {
    if (this.match_EOF(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.build(context, token);
      return 42;
    }
    if (this.match_TableRow(context, token)) {
      this.build(context, token);
      return 45;
    }
    if (this.match_StepLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.Step);
      this.build(context, token);
      return 34;
    }
    if (this.match_TagLine(context, token)) {
      if (this.lookahead_1(context, token)) {
        this.endRule(context);
        this.endRule(context);
        this.startRule(context, RuleType.ExamplesDefinition);
        this.startRule(context, RuleType.Tags);
        this.build(context, token);
        return 38;
      }
    }
    if (this.match_TagLine(context, token)) {
      if (this.lookahead_0(context, token)) {
        this.endRule(context);
        this.endRule(context);
        this.endRule(context);
        this.endRule(context);
        this.startRule(context, RuleType.ScenarioDefinition);
        this.startRule(context, RuleType.Tags);
        this.build(context, token);
        return 31;
      }
    }
    if (this.match_TagLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.Rule);
      this.startRule(context, RuleType.RuleHeader);
      this.startRule(context, RuleType.Tags);
      this.build(context, token);
      return 22;
    }
    if (this.match_ExamplesLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.ExamplesDefinition);
      this.startRule(context, RuleType.Examples);
      this.build(context, token);
      return 39;
    }
    if (this.match_ScenarioLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.ScenarioDefinition);
      this.startRule(context, RuleType.Scenario);
      this.build(context, token);
      return 32;
    }
    if (this.match_RuleLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.Rule);
      this.startRule(context, RuleType.RuleHeader);
      this.build(context, token);
      return 23;
    }
    if (this.match_Comment(context, token)) {
      this.build(context, token);
      return 45;
    }
    if (this.match_Empty(context, token)) {
      this.build(context, token);
      return 45;
    }
    const expectedTokens = ["#EOF", "#TableRow", "#StepLine", "#TagLine", "#ExamplesLine", "#ScenarioLine", "#RuleLine", "#Comment", "#Empty"];
    const error = token.isEof ? UnexpectedEOFException.create(token, expectedTokens) : UnexpectedTokenException.create(token, expectedTokens);
    if (this.stopAtFirstError)
      throw error;
    this.addError(context, error);
    return 45;
  }
  // GherkinDocument:0>Feature:3>Rule:1>Background:2>Step:1>StepArg:0>__alt0:1>DocStringAndMaybeDataTable:0>DocString:0>#DocStringSeparator:0
  matchTokenAt_46(token, context) {
    if (this.match_DocStringSeparator(context, token)) {
      this.build(context, token);
      return 47;
    }
    if (this.match_Other(context, token)) {
      this.build(context, token);
      return 46;
    }
    const expectedTokens = ["#DocStringSeparator", "#Other"];
    const error = token.isEof ? UnexpectedEOFException.create(token, expectedTokens) : UnexpectedTokenException.create(token, expectedTokens);
    if (this.stopAtFirstError)
      throw error;
    this.addError(context, error);
    return 46;
  }
  // GherkinDocument:0>Feature:3>Rule:1>Background:2>Step:1>StepArg:0>__alt0:1>DocStringAndMaybeDataTable:0>DocString:2>#DocStringSeparator:0
  matchTokenAt_47(token, context) {
    if (this.match_EOF(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.build(context, token);
      return 42;
    }
    if (this.match_TableRow(context, token)) {
      this.endRule(context);
      this.startRule(context, RuleType.DataTable);
      this.build(context, token);
      return 48;
    }
    if (this.match_StepLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.Step);
      this.build(context, token);
      return 27;
    }
    if (this.match_TagLine(context, token)) {
      if (this.lookahead_0(context, token)) {
        this.endRule(context);
        this.endRule(context);
        this.endRule(context);
        this.startRule(context, RuleType.ScenarioDefinition);
        this.startRule(context, RuleType.Tags);
        this.build(context, token);
        return 31;
      }
    }
    if (this.match_TagLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.Rule);
      this.startRule(context, RuleType.RuleHeader);
      this.startRule(context, RuleType.Tags);
      this.build(context, token);
      return 22;
    }
    if (this.match_ScenarioLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.ScenarioDefinition);
      this.startRule(context, RuleType.Scenario);
      this.build(context, token);
      return 32;
    }
    if (this.match_RuleLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.Rule);
      this.startRule(context, RuleType.RuleHeader);
      this.build(context, token);
      return 23;
    }
    if (this.match_Comment(context, token)) {
      this.build(context, token);
      return 47;
    }
    if (this.match_Empty(context, token)) {
      this.build(context, token);
      return 47;
    }
    const expectedTokens = ["#EOF", "#TableRow", "#StepLine", "#TagLine", "#ScenarioLine", "#RuleLine", "#Comment", "#Empty"];
    const error = token.isEof ? UnexpectedEOFException.create(token, expectedTokens) : UnexpectedTokenException.create(token, expectedTokens);
    if (this.stopAtFirstError)
      throw error;
    this.addError(context, error);
    return 47;
  }
  // GherkinDocument:0>Feature:3>Rule:1>Background:2>Step:1>StepArg:0>__alt0:1>DocStringAndMaybeDataTable:1>DataTable:0>#TableRow:0
  matchTokenAt_48(token, context) {
    if (this.match_EOF(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.build(context, token);
      return 42;
    }
    if (this.match_TableRow(context, token)) {
      this.build(context, token);
      return 48;
    }
    if (this.match_StepLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.Step);
      this.build(context, token);
      return 27;
    }
    if (this.match_TagLine(context, token)) {
      if (this.lookahead_0(context, token)) {
        this.endRule(context);
        this.endRule(context);
        this.endRule(context);
        this.startRule(context, RuleType.ScenarioDefinition);
        this.startRule(context, RuleType.Tags);
        this.build(context, token);
        return 31;
      }
    }
    if (this.match_TagLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.Rule);
      this.startRule(context, RuleType.RuleHeader);
      this.startRule(context, RuleType.Tags);
      this.build(context, token);
      return 22;
    }
    if (this.match_ScenarioLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.ScenarioDefinition);
      this.startRule(context, RuleType.Scenario);
      this.build(context, token);
      return 32;
    }
    if (this.match_RuleLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.Rule);
      this.startRule(context, RuleType.RuleHeader);
      this.build(context, token);
      return 23;
    }
    if (this.match_Comment(context, token)) {
      this.build(context, token);
      return 48;
    }
    if (this.match_Empty(context, token)) {
      this.build(context, token);
      return 48;
    }
    const expectedTokens = ["#EOF", "#TableRow", "#StepLine", "#TagLine", "#ScenarioLine", "#RuleLine", "#Comment", "#Empty"];
    const error = token.isEof ? UnexpectedEOFException.create(token, expectedTokens) : UnexpectedTokenException.create(token, expectedTokens);
    if (this.stopAtFirstError)
      throw error;
    this.addError(context, error);
    return 48;
  }
  // GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:2>Step:1>StepArg:0>__alt0:1>DocStringAndMaybeDataTable:0>DocString:0>#DocStringSeparator:0
  matchTokenAt_49(token, context) {
    if (this.match_DocStringSeparator(context, token)) {
      this.build(context, token);
      return 50;
    }
    if (this.match_Other(context, token)) {
      this.build(context, token);
      return 49;
    }
    const expectedTokens = ["#DocStringSeparator", "#Other"];
    const error = token.isEof ? UnexpectedEOFException.create(token, expectedTokens) : UnexpectedTokenException.create(token, expectedTokens);
    if (this.stopAtFirstError)
      throw error;
    this.addError(context, error);
    return 49;
  }
  // GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:2>Step:1>StepArg:0>__alt0:1>DocStringAndMaybeDataTable:0>DocString:2>#DocStringSeparator:0
  matchTokenAt_50(token, context) {
    if (this.match_EOF(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.build(context, token);
      return 42;
    }
    if (this.match_TableRow(context, token)) {
      this.endRule(context);
      this.startRule(context, RuleType.DataTable);
      this.build(context, token);
      return 51;
    }
    if (this.match_StepLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.Step);
      this.build(context, token);
      return 14;
    }
    if (this.match_TagLine(context, token)) {
      if (this.lookahead_1(context, token)) {
        this.endRule(context);
        this.endRule(context);
        this.startRule(context, RuleType.ExamplesDefinition);
        this.startRule(context, RuleType.Tags);
        this.build(context, token);
        return 18;
      }
    }
    if (this.match_TagLine(context, token)) {
      if (this.lookahead_0(context, token)) {
        this.endRule(context);
        this.endRule(context);
        this.endRule(context);
        this.endRule(context);
        this.startRule(context, RuleType.ScenarioDefinition);
        this.startRule(context, RuleType.Tags);
        this.build(context, token);
        return 11;
      }
    }
    if (this.match_TagLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.Rule);
      this.startRule(context, RuleType.RuleHeader);
      this.startRule(context, RuleType.Tags);
      this.build(context, token);
      return 22;
    }
    if (this.match_ExamplesLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.ExamplesDefinition);
      this.startRule(context, RuleType.Examples);
      this.build(context, token);
      return 19;
    }
    if (this.match_ScenarioLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.ScenarioDefinition);
      this.startRule(context, RuleType.Scenario);
      this.build(context, token);
      return 12;
    }
    if (this.match_RuleLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.Rule);
      this.startRule(context, RuleType.RuleHeader);
      this.build(context, token);
      return 23;
    }
    if (this.match_Comment(context, token)) {
      this.build(context, token);
      return 50;
    }
    if (this.match_Empty(context, token)) {
      this.build(context, token);
      return 50;
    }
    const expectedTokens = ["#EOF", "#TableRow", "#StepLine", "#TagLine", "#ExamplesLine", "#ScenarioLine", "#RuleLine", "#Comment", "#Empty"];
    const error = token.isEof ? UnexpectedEOFException.create(token, expectedTokens) : UnexpectedTokenException.create(token, expectedTokens);
    if (this.stopAtFirstError)
      throw error;
    this.addError(context, error);
    return 50;
  }
  // GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:2>Step:1>StepArg:0>__alt0:1>DocStringAndMaybeDataTable:1>DataTable:0>#TableRow:0
  matchTokenAt_51(token, context) {
    if (this.match_EOF(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.build(context, token);
      return 42;
    }
    if (this.match_TableRow(context, token)) {
      this.build(context, token);
      return 51;
    }
    if (this.match_StepLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.Step);
      this.build(context, token);
      return 14;
    }
    if (this.match_TagLine(context, token)) {
      if (this.lookahead_1(context, token)) {
        this.endRule(context);
        this.endRule(context);
        this.startRule(context, RuleType.ExamplesDefinition);
        this.startRule(context, RuleType.Tags);
        this.build(context, token);
        return 18;
      }
    }
    if (this.match_TagLine(context, token)) {
      if (this.lookahead_0(context, token)) {
        this.endRule(context);
        this.endRule(context);
        this.endRule(context);
        this.endRule(context);
        this.startRule(context, RuleType.ScenarioDefinition);
        this.startRule(context, RuleType.Tags);
        this.build(context, token);
        return 11;
      }
    }
    if (this.match_TagLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.Rule);
      this.startRule(context, RuleType.RuleHeader);
      this.startRule(context, RuleType.Tags);
      this.build(context, token);
      return 22;
    }
    if (this.match_ExamplesLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.ExamplesDefinition);
      this.startRule(context, RuleType.Examples);
      this.build(context, token);
      return 19;
    }
    if (this.match_ScenarioLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.ScenarioDefinition);
      this.startRule(context, RuleType.Scenario);
      this.build(context, token);
      return 12;
    }
    if (this.match_RuleLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.Rule);
      this.startRule(context, RuleType.RuleHeader);
      this.build(context, token);
      return 23;
    }
    if (this.match_Comment(context, token)) {
      this.build(context, token);
      return 51;
    }
    if (this.match_Empty(context, token)) {
      this.build(context, token);
      return 51;
    }
    const expectedTokens = ["#EOF", "#TableRow", "#StepLine", "#TagLine", "#ExamplesLine", "#ScenarioLine", "#RuleLine", "#Comment", "#Empty"];
    const error = token.isEof ? UnexpectedEOFException.create(token, expectedTokens) : UnexpectedTokenException.create(token, expectedTokens);
    if (this.stopAtFirstError)
      throw error;
    this.addError(context, error);
    return 51;
  }
  // GherkinDocument:0>Feature:1>Background:2>Step:1>StepArg:0>__alt0:1>DocStringAndMaybeDataTable:0>DocString:0>#DocStringSeparator:0
  matchTokenAt_52(token, context) {
    if (this.match_DocStringSeparator(context, token)) {
      this.build(context, token);
      return 53;
    }
    if (this.match_Other(context, token)) {
      this.build(context, token);
      return 52;
    }
    const expectedTokens = ["#DocStringSeparator", "#Other"];
    const error = token.isEof ? UnexpectedEOFException.create(token, expectedTokens) : UnexpectedTokenException.create(token, expectedTokens);
    if (this.stopAtFirstError)
      throw error;
    this.addError(context, error);
    return 52;
  }
  // GherkinDocument:0>Feature:1>Background:2>Step:1>StepArg:0>__alt0:1>DocStringAndMaybeDataTable:0>DocString:2>#DocStringSeparator:0
  matchTokenAt_53(token, context) {
    if (this.match_EOF(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.build(context, token);
      return 42;
    }
    if (this.match_TableRow(context, token)) {
      this.endRule(context);
      this.startRule(context, RuleType.DataTable);
      this.build(context, token);
      return 54;
    }
    if (this.match_StepLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.Step);
      this.build(context, token);
      return 7;
    }
    if (this.match_TagLine(context, token)) {
      if (this.lookahead_0(context, token)) {
        this.endRule(context);
        this.endRule(context);
        this.endRule(context);
        this.startRule(context, RuleType.ScenarioDefinition);
        this.startRule(context, RuleType.Tags);
        this.build(context, token);
        return 11;
      }
    }
    if (this.match_TagLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.Rule);
      this.startRule(context, RuleType.RuleHeader);
      this.startRule(context, RuleType.Tags);
      this.build(context, token);
      return 22;
    }
    if (this.match_ScenarioLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.ScenarioDefinition);
      this.startRule(context, RuleType.Scenario);
      this.build(context, token);
      return 12;
    }
    if (this.match_RuleLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.Rule);
      this.startRule(context, RuleType.RuleHeader);
      this.build(context, token);
      return 23;
    }
    if (this.match_Comment(context, token)) {
      this.build(context, token);
      return 53;
    }
    if (this.match_Empty(context, token)) {
      this.build(context, token);
      return 53;
    }
    const expectedTokens = ["#EOF", "#TableRow", "#StepLine", "#TagLine", "#ScenarioLine", "#RuleLine", "#Comment", "#Empty"];
    const error = token.isEof ? UnexpectedEOFException.create(token, expectedTokens) : UnexpectedTokenException.create(token, expectedTokens);
    if (this.stopAtFirstError)
      throw error;
    this.addError(context, error);
    return 53;
  }
  // GherkinDocument:0>Feature:1>Background:2>Step:1>StepArg:0>__alt0:1>DocStringAndMaybeDataTable:1>DataTable:0>#TableRow:0
  matchTokenAt_54(token, context) {
    if (this.match_EOF(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.build(context, token);
      return 42;
    }
    if (this.match_TableRow(context, token)) {
      this.build(context, token);
      return 54;
    }
    if (this.match_StepLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.Step);
      this.build(context, token);
      return 7;
    }
    if (this.match_TagLine(context, token)) {
      if (this.lookahead_0(context, token)) {
        this.endRule(context);
        this.endRule(context);
        this.endRule(context);
        this.startRule(context, RuleType.ScenarioDefinition);
        this.startRule(context, RuleType.Tags);
        this.build(context, token);
        return 11;
      }
    }
    if (this.match_TagLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.Rule);
      this.startRule(context, RuleType.RuleHeader);
      this.startRule(context, RuleType.Tags);
      this.build(context, token);
      return 22;
    }
    if (this.match_ScenarioLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.ScenarioDefinition);
      this.startRule(context, RuleType.Scenario);
      this.build(context, token);
      return 12;
    }
    if (this.match_RuleLine(context, token)) {
      this.endRule(context);
      this.endRule(context);
      this.endRule(context);
      this.startRule(context, RuleType.Rule);
      this.startRule(context, RuleType.RuleHeader);
      this.build(context, token);
      return 23;
    }
    if (this.match_Comment(context, token)) {
      this.build(context, token);
      return 54;
    }
    if (this.match_Empty(context, token)) {
      this.build(context, token);
      return 54;
    }
    const expectedTokens = ["#EOF", "#TableRow", "#StepLine", "#TagLine", "#ScenarioLine", "#RuleLine", "#Comment", "#Empty"];
    const error = token.isEof ? UnexpectedEOFException.create(token, expectedTokens) : UnexpectedTokenException.create(token, expectedTokens);
    if (this.stopAtFirstError)
      throw error;
    this.addError(context, error);
    return 54;
  }
  match_EOF(context, token) {
    return this.handleExternalError(context, false, () => this.tokenMatcher.match_EOF(token));
  }
  match_Empty(context, token) {
    if (token.isEof)
      return false;
    return this.handleExternalError(context, false, () => this.tokenMatcher.match_Empty(token));
  }
  match_Comment(context, token) {
    if (token.isEof)
      return false;
    return this.handleExternalError(context, false, () => this.tokenMatcher.match_Comment(token));
  }
  match_TagLine(context, token) {
    if (token.isEof)
      return false;
    return this.handleExternalError(context, false, () => this.tokenMatcher.match_TagLine(token));
  }
  match_FeatureLine(context, token) {
    if (token.isEof)
      return false;
    return this.handleExternalError(context, false, () => this.tokenMatcher.match_FeatureLine(token));
  }
  match_RuleLine(context, token) {
    if (token.isEof)
      return false;
    return this.handleExternalError(context, false, () => this.tokenMatcher.match_RuleLine(token));
  }
  match_BackgroundLine(context, token) {
    if (token.isEof)
      return false;
    return this.handleExternalError(context, false, () => this.tokenMatcher.match_BackgroundLine(token));
  }
  match_ScenarioLine(context, token) {
    if (token.isEof)
      return false;
    return this.handleExternalError(context, false, () => this.tokenMatcher.match_ScenarioLine(token));
  }
  match_ExamplesLine(context, token) {
    if (token.isEof)
      return false;
    return this.handleExternalError(context, false, () => this.tokenMatcher.match_ExamplesLine(token));
  }
  match_StepLine(context, token) {
    if (token.isEof)
      return false;
    return this.handleExternalError(context, false, () => this.tokenMatcher.match_StepLine(token));
  }
  match_DocStringSeparator(context, token) {
    if (token.isEof)
      return false;
    return this.handleExternalError(context, false, () => this.tokenMatcher.match_DocStringSeparator(token));
  }
  match_TableRow(context, token) {
    if (token.isEof)
      return false;
    return this.handleExternalError(context, false, () => this.tokenMatcher.match_TableRow(token));
  }
  match_Language(context, token) {
    if (token.isEof)
      return false;
    return this.handleExternalError(context, false, () => this.tokenMatcher.match_Language(token));
  }
  match_Other(context, token) {
    if (token.isEof)
      return false;
    return this.handleExternalError(context, false, () => this.tokenMatcher.match_Other(token));
  }
  lookahead_0(context, currentToken) {
    let token;
    const queue = [];
    let match = false;
    do {
      token = this.readToken(this.context);
      queue.push(token);
      if (this.match_ScenarioLine(context, token)) {
        match = true;
        break;
      }
    } while (this.match_Empty(context, token) || this.match_Comment(context, token) || this.match_TagLine(context, token));
    context.tokenQueue = context.tokenQueue.concat(queue);
    return match;
  }
  lookahead_1(context, currentToken) {
    let token;
    const queue = [];
    let match = false;
    do {
      token = this.readToken(this.context);
      queue.push(token);
      if (this.match_ExamplesLine(context, token)) {
        match = true;
        break;
      }
    } while (this.match_Empty(context, token) || this.match_Comment(context, token) || this.match_TagLine(context, token));
    context.tokenQueue = context.tokenQueue.concat(queue);
    return match;
  }
};

// node_modules/.pnpm/@cucumber+gherkin@42.0.1/node_modules/@cucumber/gherkin/dist/AstBuilder.js
var AstBuilder = class {
  stack;
  comments;
  newId;
  constructor(newId) {
    this.newId = newId;
    if (!newId) {
      throw new Error("No newId");
    }
    this.reset();
  }
  reset() {
    this.stack = [new AstNode(RuleType.None)];
    this.comments = [];
  }
  startRule(ruleType) {
    this.stack.push(new AstNode(ruleType));
  }
  endRule() {
    const node = this.stack.pop();
    const transformedNode = this.transformNode(node);
    this.currentNode().add(node.ruleType, transformedNode);
  }
  build(token) {
    if (token.matchedType === TokenType.Comment) {
      this.comments.push({
        location: this.getLocation(token),
        text: token.matchedText
      });
    } else {
      this.currentNode().add(token.matchedType, token);
    }
  }
  getResult() {
    return this.currentNode().getSingle(RuleType.GherkinDocument);
  }
  currentNode() {
    return this.stack[this.stack.length - 1];
  }
  getLocation(token, column) {
    return !column ? token.location : { line: token.location.line, column };
  }
  getTags(node) {
    const tags = [];
    const tagsNode = node.getSingle(RuleType.Tags);
    if (!tagsNode) {
      return tags;
    }
    const tokens = tagsNode.getTokens(TokenType.TagLine);
    for (const token of tokens) {
      for (const tagItem of token.matchedItems) {
        tags.push({
          location: this.getLocation(token, tagItem.column),
          name: tagItem.text,
          id: this.newId()
        });
      }
    }
    return tags;
  }
  getCells(tableRowToken) {
    return tableRowToken.matchedItems.map((cellItem) => ({
      location: this.getLocation(tableRowToken, cellItem.column),
      value: cellItem.text
    }));
  }
  getDescription(node) {
    return node.getSingle(RuleType.Description) || "";
  }
  getSteps(node) {
    return node.getItems(RuleType.Step);
  }
  getTableRows(node) {
    const rows = node.getTokens(TokenType.TableRow).map((token) => ({
      id: this.newId(),
      location: this.getLocation(token),
      cells: this.getCells(token)
    }));
    this.ensureCellCount(rows);
    return rows.length === 0 ? [] : rows;
  }
  ensureCellCount(rows) {
    if (rows.length === 0) {
      return;
    }
    const cellCount = rows[0].cells.length;
    rows.forEach((row) => {
      if (row.cells.length !== cellCount) {
        throw AstBuilderException.create("inconsistent cell count within the table", row.location);
      }
    });
  }
  transformNode(node) {
    switch (node.ruleType) {
      case RuleType.Step: {
        const stepLine = node.getToken(TokenType.StepLine);
        const dataTable = node.getSingle(RuleType.DataTable);
        const docString = node.getSingle(RuleType.DocString);
        const location = this.getLocation(stepLine);
        const step = {
          id: this.newId(),
          location,
          keyword: stepLine.matchedKeyword,
          keywordType: stepLine.matchedKeywordType,
          text: stepLine.matchedText,
          dataTable,
          docString
        };
        return step;
      }
      case RuleType.DocString: {
        const separatorToken = node.getTokens(TokenType.DocStringSeparator)[0];
        const mediaType = separatorToken.matchedText.length > 0 ? separatorToken.matchedText : void 0;
        const lineTokens = node.getTokens(TokenType.Other);
        const content = lineTokens.map((t) => t.matchedText).join("\n");
        const result = {
          location: this.getLocation(separatorToken),
          content,
          delimiter: separatorToken.matchedKeyword
        };
        if (mediaType) {
          result.mediaType = mediaType;
        }
        return result;
      }
      case RuleType.DataTable: {
        const rows = this.getTableRows(node);
        const dataTable = {
          location: rows[0].location,
          rows
        };
        return dataTable;
      }
      case RuleType.Background: {
        const backgroundLine = node.getToken(TokenType.BackgroundLine);
        const description = this.getDescription(node);
        const steps = this.getSteps(node);
        const background = {
          id: this.newId(),
          location: this.getLocation(backgroundLine),
          keyword: backgroundLine.matchedKeyword,
          name: backgroundLine.matchedText,
          description,
          steps
        };
        return background;
      }
      case RuleType.ScenarioDefinition: {
        const tags = this.getTags(node);
        const scenarioNode = node.getSingle(RuleType.Scenario);
        const scenarioLine = scenarioNode.getToken(TokenType.ScenarioLine);
        const description = this.getDescription(scenarioNode);
        const steps = this.getSteps(scenarioNode);
        const examples = scenarioNode.getItems(RuleType.ExamplesDefinition);
        const scenario = {
          id: this.newId(),
          tags,
          location: this.getLocation(scenarioLine),
          keyword: scenarioLine.matchedKeyword,
          name: scenarioLine.matchedText,
          description,
          steps,
          examples
        };
        return scenario;
      }
      case RuleType.ExamplesDefinition: {
        const tags = this.getTags(node);
        const examplesNode = node.getSingle(RuleType.Examples);
        const examplesLine = examplesNode.getToken(TokenType.ExamplesLine);
        const description = this.getDescription(examplesNode);
        const examplesTable = examplesNode.getSingle(RuleType.ExamplesTable);
        const examples = {
          id: this.newId(),
          tags,
          location: this.getLocation(examplesLine),
          keyword: examplesLine.matchedKeyword,
          name: examplesLine.matchedText,
          description,
          tableHeader: examplesTable ? examplesTable[0] : void 0,
          tableBody: examplesTable ? examplesTable.slice(1) : []
        };
        return examples;
      }
      case RuleType.ExamplesTable: {
        return this.getTableRows(node);
      }
      case RuleType.Description: {
        let lineTokens = node.getTokens(TokenType.Other);
        let end = lineTokens.length;
        while (end > 0 && lineTokens[end - 1].line.trimmedLineText === "") {
          end--;
        }
        lineTokens = lineTokens.slice(0, end);
        return lineTokens.map((token) => token.matchedText).join("\n");
      }
      case RuleType.Feature: {
        const header = node.getSingle(RuleType.FeatureHeader);
        if (!header) {
          return null;
        }
        const tags = this.getTags(header);
        const featureLine = header.getToken(TokenType.FeatureLine);
        if (!featureLine) {
          return null;
        }
        const children = [];
        const background = node.getSingle(RuleType.Background);
        if (background) {
          children.push({
            background
          });
        }
        for (const scenario of node.getItems(RuleType.ScenarioDefinition)) {
          children.push({
            scenario
          });
        }
        for (const rule of node.getItems(RuleType.Rule)) {
          children.push({
            rule
          });
        }
        const description = this.getDescription(header);
        const language = featureLine.matchedGherkinDialect;
        const feature = {
          tags,
          location: this.getLocation(featureLine),
          language,
          keyword: featureLine.matchedKeyword,
          name: featureLine.matchedText,
          description,
          children
        };
        return feature;
      }
      case RuleType.Rule: {
        const header = node.getSingle(RuleType.RuleHeader);
        if (!header) {
          return null;
        }
        const ruleLine = header.getToken(TokenType.RuleLine);
        if (!ruleLine) {
          return null;
        }
        const tags = this.getTags(header);
        const children = [];
        const background = node.getSingle(RuleType.Background);
        if (background) {
          children.push({
            background
          });
        }
        for (const scenario of node.getItems(RuleType.ScenarioDefinition)) {
          children.push({
            scenario
          });
        }
        const description = this.getDescription(header);
        const rule = {
          id: this.newId(),
          location: this.getLocation(ruleLine),
          keyword: ruleLine.matchedKeyword,
          name: ruleLine.matchedText,
          description,
          children,
          tags
        };
        return rule;
      }
      case RuleType.GherkinDocument: {
        const feature = node.getSingle(RuleType.Feature);
        const gherkinDocument = {
          feature,
          comments: this.comments
        };
        return gherkinDocument;
      }
      default:
        return node;
    }
  }
};

// node_modules/.pnpm/@cucumber+messages@34.2.1/node_modules/@cucumber/messages/dist/messages.js
var AttachmentContentEncoding;
(function(AttachmentContentEncoding2) {
  AttachmentContentEncoding2["IDENTITY"] = "IDENTITY";
  AttachmentContentEncoding2["BASE64"] = "BASE64";
})(AttachmentContentEncoding || (AttachmentContentEncoding = {}));
var HookType;
(function(HookType2) {
  HookType2["BEFORE_TEST_RUN"] = "BEFORE_TEST_RUN";
  HookType2["AFTER_TEST_RUN"] = "AFTER_TEST_RUN";
  HookType2["BEFORE_TEST_CASE"] = "BEFORE_TEST_CASE";
  HookType2["AFTER_TEST_CASE"] = "AFTER_TEST_CASE";
  HookType2["BEFORE_TEST_STEP"] = "BEFORE_TEST_STEP";
  HookType2["AFTER_TEST_STEP"] = "AFTER_TEST_STEP";
})(HookType || (HookType = {}));
var PickleStepType;
(function(PickleStepType2) {
  PickleStepType2["UNKNOWN"] = "Unknown";
  PickleStepType2["CONTEXT"] = "Context";
  PickleStepType2["ACTION"] = "Action";
  PickleStepType2["OUTCOME"] = "Outcome";
})(PickleStepType || (PickleStepType = {}));
var SourceMediaType;
(function(SourceMediaType2) {
  SourceMediaType2["TEXT_X_CUCUMBER_GHERKIN_PLAIN"] = "text/x.cucumber.gherkin+plain";
  SourceMediaType2["TEXT_X_CUCUMBER_GHERKIN_MARKDOWN"] = "text/x.cucumber.gherkin+markdown";
})(SourceMediaType || (SourceMediaType = {}));
var StepDefinitionPatternType;
(function(StepDefinitionPatternType2) {
  StepDefinitionPatternType2["CUCUMBER_EXPRESSION"] = "CUCUMBER_EXPRESSION";
  StepDefinitionPatternType2["REGULAR_EXPRESSION"] = "REGULAR_EXPRESSION";
})(StepDefinitionPatternType || (StepDefinitionPatternType = {}));
var StepKeywordType;
(function(StepKeywordType2) {
  StepKeywordType2["UNKNOWN"] = "Unknown";
  StepKeywordType2["CONTEXT"] = "Context";
  StepKeywordType2["ACTION"] = "Action";
  StepKeywordType2["OUTCOME"] = "Outcome";
  StepKeywordType2["CONJUNCTION"] = "Conjunction";
})(StepKeywordType || (StepKeywordType = {}));
var TestStepResultStatus;
(function(TestStepResultStatus2) {
  TestStepResultStatus2["UNKNOWN"] = "UNKNOWN";
  TestStepResultStatus2["PASSED"] = "PASSED";
  TestStepResultStatus2["SKIPPED"] = "SKIPPED";
  TestStepResultStatus2["PENDING"] = "PENDING";
  TestStepResultStatus2["UNDEFINED"] = "UNDEFINED";
  TestStepResultStatus2["AMBIGUOUS"] = "AMBIGUOUS";
  TestStepResultStatus2["FAILED"] = "FAILED";
})(TestStepResultStatus || (TestStepResultStatus = {}));

// node_modules/.pnpm/@cucumber+messages@34.2.1/node_modules/@cucumber/messages/dist/IdGenerator.js
var IdGenerator_exports = {};
__export(IdGenerator_exports, {
  incrementing: () => incrementing,
  uuid: () => uuid
});
function uuid() {
  return () => crypto.randomUUID();
}
function incrementing() {
  let next = 0;
  return () => (next++).toString();
}

// node_modules/.pnpm/@cucumber+gherkin@42.0.1/node_modules/@cucumber/gherkin/dist/compareStepKeywords.js
function compareStepKeywords(a, b) {
  return b.length - a.length;
}

// node_modules/.pnpm/@cucumber+gherkin@42.0.1/node_modules/@cucumber/gherkin/dist/gherkin-languages.json
var gherkin_languages_default = {
  af: {
    and: [
      "* ",
      "En "
    ],
    background: [
      "Agtergrond"
    ],
    but: [
      "* ",
      "Maar "
    ],
    examples: [
      "Voorbeelde"
    ],
    feature: [
      "Funksie",
      "Besigheid Behoefte",
      "Vermo\xEB"
    ],
    given: [
      "* ",
      "Gegewe "
    ],
    name: "Afrikaans",
    native: "Afrikaans",
    rule: [
      "Re\xEBl",
      "Reel"
    ],
    scenario: [
      "Voorbeeld",
      "Situasie"
    ],
    scenarioOutline: [
      "Situasie Uiteensetting"
    ],
    then: [
      "* ",
      "Dan "
    ],
    when: [
      "* ",
      "Wanneer "
    ]
  },
  am: {
    and: [
      "* ",
      "\u0535\u057E "
    ],
    background: [
      "\u053F\u0578\u0576\u057F\u0565\u0584\u057D\u057F"
    ],
    but: [
      "* ",
      "\u0532\u0561\u0575\u0581 "
    ],
    examples: [
      "\u0555\u0580\u056B\u0576\u0561\u056F\u0576\u0565\u0580"
    ],
    feature: [
      "\u0556\u0578\u0582\u0576\u056F\u0581\u056B\u0578\u0576\u0561\u056C\u0578\u0582\u0569\u0575\u0578\u0582\u0576",
      "\u0540\u0561\u057F\u056F\u0578\u0582\u0569\u0575\u0578\u0582\u0576"
    ],
    given: [
      "* ",
      "\u0534\u056B\u0581\u0578\u0582\u0584 "
    ],
    name: "Armenian",
    native: "\u0570\u0561\u0575\u0565\u0580\u0565\u0576",
    rule: [
      "Rule"
    ],
    scenario: [
      "\u0555\u0580\u056B\u0576\u0561\u056F",
      "\u054D\u0581\u0565\u0576\u0561\u0580"
    ],
    scenarioOutline: [
      "\u054D\u0581\u0565\u0576\u0561\u0580\u056B \u056F\u0561\u057C\u0578\u0582\u0581\u057E\u0561\u0581\u0584\u0568"
    ],
    then: [
      "* ",
      "\u0531\u057A\u0561 "
    ],
    when: [
      "* ",
      "\u0535\u0569\u0565 ",
      "\u0535\u0580\u0562 "
    ]
  },
  an: {
    and: [
      "* ",
      "Y ",
      "E "
    ],
    background: [
      "Antecedents"
    ],
    but: [
      "* ",
      "Pero "
    ],
    examples: [
      "Eixemplos"
    ],
    feature: [
      "Caracteristica"
    ],
    given: [
      "* ",
      "Dau ",
      "Dada ",
      "Daus ",
      "Dadas "
    ],
    name: "Aragonese",
    native: "Aragon\xE9s",
    rule: [
      "Rule"
    ],
    scenario: [
      "Eixemplo",
      "Caso"
    ],
    scenarioOutline: [
      "Esquema del caso"
    ],
    then: [
      "* ",
      "Alavez ",
      "Allora ",
      "Antonces "
    ],
    when: [
      "* ",
      "Cuan "
    ]
  },
  ar: {
    and: [
      "* ",
      "\u0648 "
    ],
    background: [
      "\u0627\u0644\u062E\u0644\u0641\u064A\u0629"
    ],
    but: [
      "* ",
      "\u0644\u0643\u0646 "
    ],
    examples: [
      "\u0627\u0645\u062B\u0644\u0629"
    ],
    feature: [
      "\u062E\u0627\u0635\u064A\u0629"
    ],
    given: [
      "* ",
      "\u0628\u0641\u0631\u0636 "
    ],
    name: "Arabic",
    native: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629",
    rule: [
      "Rule"
    ],
    scenario: [
      "\u0645\u062B\u0627\u0644",
      "\u0633\u064A\u0646\u0627\u0631\u064A\u0648"
    ],
    scenarioOutline: [
      "\u0633\u064A\u0646\u0627\u0631\u064A\u0648 \u0645\u062E\u0637\u0637"
    ],
    then: [
      "* ",
      "\u0627\u0630\u0627\u064B ",
      "\u062B\u0645 "
    ],
    when: [
      "* ",
      "\u0645\u062A\u0649 ",
      "\u0639\u0646\u062F\u0645\u0627 "
    ]
  },
  ast: {
    and: [
      "* ",
      "Y ",
      "Ya "
    ],
    background: [
      "Antecedentes"
    ],
    but: [
      "* ",
      "Peru "
    ],
    examples: [
      "Exemplos"
    ],
    feature: [
      "Carauter\xEDstica"
    ],
    given: [
      "* ",
      "D\xE1u ",
      "Dada ",
      "Daos ",
      "Daes "
    ],
    name: "Asturian",
    native: "asturianu",
    rule: [
      "Rule"
    ],
    scenario: [
      "Exemplo",
      "Casu"
    ],
    scenarioOutline: [
      "Esbozu del casu"
    ],
    then: [
      "* ",
      "Ent\xF3s "
    ],
    when: [
      "* ",
      "Cuando "
    ]
  },
  az: {
    and: [
      "* ",
      "V\u0259 ",
      "H\u0259m "
    ],
    background: [
      "Ke\xE7mi\u015F",
      "Kontekst"
    ],
    but: [
      "* ",
      "Amma ",
      "Ancaq "
    ],
    examples: [
      "N\xFCmun\u0259l\u0259r"
    ],
    feature: [
      "\xD6z\u0259llik"
    ],
    given: [
      "* ",
      "Tutaq ki ",
      "Verilir "
    ],
    name: "Azerbaijani",
    native: "Az\u0259rbaycanca",
    rule: [
      "Rule"
    ],
    scenario: [
      "N\xFCmun\u0259",
      "Ssenari"
    ],
    scenarioOutline: [
      "Ssenarinin strukturu"
    ],
    then: [
      "* ",
      "O halda "
    ],
    when: [
      "* ",
      "\u018Fg\u0259r ",
      "N\u0259 vaxt ki "
    ]
  },
  be: {
    and: [
      "* ",
      "I ",
      "\u0414\u044B ",
      "\u0422\u0430\u043A\u0441\u0430\u043C\u0430 "
    ],
    background: [
      "\u041A\u0430\u043D\u0442\u044D\u043A\u0441\u0442"
    ],
    but: [
      "* ",
      "\u0410\u043B\u0435 ",
      "\u0406\u043D\u0430\u043A\u0448 "
    ],
    examples: [
      "\u041F\u0440\u044B\u043A\u043B\u0430\u0434\u044B"
    ],
    feature: [
      "\u0424\u0443\u043D\u043A\u0446\u044B\u044F\u043D\u0430\u043B\u044C\u043D\u0430\u0441\u0446\u044C",
      "\u0424\u0456\u0447\u0430"
    ],
    given: [
      "* ",
      "\u041D\u044F\u0445\u0430\u0439 ",
      "\u0414\u0430\u0434\u0437\u0435\u043D\u0430 "
    ],
    name: "Belarusian",
    native: "\u0411\u0435\u043B\u0430\u0440\u0443\u0441\u043A\u0430\u044F",
    rule: [
      "\u041F\u0440\u0430\u0432\u0456\u043B\u044B"
    ],
    scenario: [
      "\u0421\u0446\u044D\u043D\u0430\u0440\u044B\u0439",
      "C\u0446\u044D\u043D\u0430\u0440"
    ],
    scenarioOutline: [
      "\u0428\u0430\u0431\u043B\u043E\u043D \u0441\u0446\u044D\u043D\u0430\u0440\u044B\u044F",
      "\u0423\u0437\u043E\u0440 \u0441\u0446\u044D\u043D\u0430\u0440\u0430"
    ],
    then: [
      "* ",
      "\u0422\u0430\u0434\u044B "
    ],
    when: [
      "* ",
      "\u041A\u0430\u043B\u0456 "
    ]
  },
  bg: {
    and: [
      "* ",
      "\u0418 "
    ],
    background: [
      "\u041F\u0440\u0435\u0434\u0438\u0441\u0442\u043E\u0440\u0438\u044F"
    ],
    but: [
      "* ",
      "\u041D\u043E "
    ],
    examples: [
      "\u041F\u0440\u0438\u043C\u0435\u0440\u0438"
    ],
    feature: [
      "\u0424\u0443\u043D\u043A\u0446\u0438\u043E\u043D\u0430\u043B\u043D\u043E\u0441\u0442"
    ],
    given: [
      "* ",
      "\u0414\u0430\u0434\u0435\u043D\u043E "
    ],
    name: "Bulgarian",
    native: "\u0431\u044A\u043B\u0433\u0430\u0440\u0441\u043A\u0438",
    rule: [
      "\u041F\u0440\u0430\u0432\u0438\u043B\u043E"
    ],
    scenario: [
      "\u041F\u0440\u0438\u043C\u0435\u0440",
      "\u0421\u0446\u0435\u043D\u0430\u0440\u0438\u0439"
    ],
    scenarioOutline: [
      "\u0420\u0430\u043C\u043A\u0430 \u043D\u0430 \u0441\u0446\u0435\u043D\u0430\u0440\u0438\u0439"
    ],
    then: [
      "* ",
      "\u0422\u043E "
    ],
    when: [
      "* ",
      "\u041A\u043E\u0433\u0430\u0442\u043E "
    ]
  },
  bm: {
    and: [
      "* ",
      "Dan "
    ],
    background: [
      "Latar Belakang"
    ],
    but: [
      "* ",
      "Tetapi ",
      "Tapi "
    ],
    examples: [
      "Contoh"
    ],
    feature: [
      "Fungsi"
    ],
    given: [
      "* ",
      "Diberi ",
      "Bagi "
    ],
    name: "Malay",
    native: "Bahasa Melayu",
    rule: [
      "Rule"
    ],
    scenario: [
      "Senario",
      "Situasi",
      "Keadaan"
    ],
    scenarioOutline: [
      "Kerangka Senario",
      "Kerangka Situasi",
      "Kerangka Keadaan",
      "Garis Panduan Senario"
    ],
    then: [
      "* ",
      "Maka ",
      "Kemudian "
    ],
    when: [
      "* ",
      "Apabila "
    ]
  },
  bs: {
    and: [
      "* ",
      "I ",
      "A "
    ],
    background: [
      "Pozadina"
    ],
    but: [
      "* ",
      "Ali "
    ],
    examples: [
      "Primjeri"
    ],
    feature: [
      "Karakteristika"
    ],
    given: [
      "* ",
      "Dato "
    ],
    name: "Bosnian",
    native: "Bosanski",
    rule: [
      "Rule"
    ],
    scenario: [
      "Primjer",
      "Scenariju",
      "Scenario"
    ],
    scenarioOutline: [
      "Scenariju-obris",
      "Scenario-outline"
    ],
    then: [
      "* ",
      "Zatim "
    ],
    when: [
      "* ",
      "Kada "
    ]
  },
  ca: {
    and: [
      "* ",
      "I "
    ],
    background: [
      "Rerefons",
      "Antecedents"
    ],
    but: [
      "* ",
      "Per\xF2 "
    ],
    examples: [
      "Exemples"
    ],
    feature: [
      "Caracter\xEDstica",
      "Funcionalitat"
    ],
    given: [
      "* ",
      "Donat ",
      "Donada ",
      "At\xE8s ",
      "Atesa "
    ],
    name: "Catalan",
    native: "catal\xE0",
    rule: [
      "Rule"
    ],
    scenario: [
      "Exemple",
      "Escenari"
    ],
    scenarioOutline: [
      "Esquema de l'escenari"
    ],
    then: [
      "* ",
      "Aleshores ",
      "Cal "
    ],
    when: [
      "* ",
      "Quan "
    ]
  },
  cs: {
    and: [
      "* ",
      "A tak\xE9 ",
      "A "
    ],
    background: [
      "Pozad\xED",
      "Kontext"
    ],
    but: [
      "* ",
      "Ale "
    ],
    examples: [
      "P\u0159\xEDklady"
    ],
    feature: [
      "Po\u017Eadavek"
    ],
    given: [
      "* ",
      "Pokud ",
      "Za p\u0159edpokladu "
    ],
    name: "Czech",
    native: "\u010Cesky",
    rule: [
      "Pravidlo"
    ],
    scenario: [
      "P\u0159\xEDklad",
      "Sc\xE9n\xE1\u0159"
    ],
    scenarioOutline: [
      "N\xE1\u010Drt Sc\xE9n\xE1\u0159e",
      "Osnova sc\xE9n\xE1\u0159e"
    ],
    then: [
      "* ",
      "Pak "
    ],
    when: [
      "* ",
      "Kdy\u017E "
    ]
  },
  "cy-GB": {
    and: [
      "* ",
      "A "
    ],
    background: [
      "Cefndir"
    ],
    but: [
      "* ",
      "Ond "
    ],
    examples: [
      "Enghreifftiau"
    ],
    feature: [
      "Arwedd"
    ],
    given: [
      "* ",
      "Anrhegedig a "
    ],
    name: "Welsh",
    native: "Cymraeg",
    rule: [
      "Rule"
    ],
    scenario: [
      "Enghraifft",
      "Scenario"
    ],
    scenarioOutline: [
      "Scenario Amlinellol"
    ],
    then: [
      "* ",
      "Yna "
    ],
    when: [
      "* ",
      "Pryd "
    ]
  },
  da: {
    and: [
      "* ",
      "Og "
    ],
    background: [
      "Baggrund"
    ],
    but: [
      "* ",
      "Men "
    ],
    examples: [
      "Eksempler"
    ],
    feature: [
      "Egenskab"
    ],
    given: [
      "* ",
      "Givet "
    ],
    name: "Danish",
    native: "dansk",
    rule: [
      "Regel"
    ],
    scenario: [
      "Eksempel",
      "Scenarie"
    ],
    scenarioOutline: [
      "Abstrakt Scenario"
    ],
    then: [
      "* ",
      "S\xE5 "
    ],
    when: [
      "* ",
      "N\xE5r "
    ]
  },
  de: {
    and: [
      "* ",
      "Und "
    ],
    background: [
      "Grundlage",
      "Hintergrund",
      "Voraussetzungen",
      "Vorbedingungen"
    ],
    but: [
      "* ",
      "Aber "
    ],
    examples: [
      "Beispiele"
    ],
    feature: [
      "Funktionalit\xE4t",
      "Funktion"
    ],
    given: [
      "* ",
      "Angenommen ",
      "Gegeben sei ",
      "Gegeben seien "
    ],
    name: "German",
    native: "Deutsch",
    rule: [
      "Rule",
      "Regel"
    ],
    scenario: [
      "Beispiel",
      "Szenario"
    ],
    scenarioOutline: [
      "Szenariogrundriss",
      "Szenarien"
    ],
    then: [
      "* ",
      "Dann "
    ],
    when: [
      "* ",
      "Wenn "
    ]
  },
  el: {
    and: [
      "* ",
      "\u039A\u03B1\u03B9 "
    ],
    background: [
      "\u03A5\u03C0\u03CC\u03B2\u03B1\u03B8\u03C1\u03BF"
    ],
    but: [
      "* ",
      "\u0391\u03BB\u03BB\u03AC "
    ],
    examples: [
      "\u03A0\u03B1\u03C1\u03B1\u03B4\u03B5\u03AF\u03B3\u03BC\u03B1\u03C4\u03B1",
      "\u03A3\u03B5\u03BD\u03AC\u03C1\u03B9\u03B1"
    ],
    feature: [
      "\u0394\u03C5\u03BD\u03B1\u03C4\u03CC\u03C4\u03B7\u03C4\u03B1",
      "\u039B\u03B5\u03B9\u03C4\u03BF\u03C5\u03C1\u03B3\u03AF\u03B1"
    ],
    given: [
      "* ",
      "\u0394\u03B5\u03B4\u03BF\u03BC\u03AD\u03BD\u03BF\u03C5 "
    ],
    name: "Greek",
    native: "\u0395\u03BB\u03BB\u03B7\u03BD\u03B9\u03BA\u03AC",
    rule: [
      "Rule"
    ],
    scenario: [
      "\u03A0\u03B1\u03C1\u03AC\u03B4\u03B5\u03B9\u03B3\u03BC\u03B1",
      "\u03A3\u03B5\u03BD\u03AC\u03C1\u03B9\u03BF"
    ],
    scenarioOutline: [
      "\u03A0\u03B5\u03C1\u03B9\u03B3\u03C1\u03B1\u03C6\u03AE \u03A3\u03B5\u03BD\u03B1\u03C1\u03AF\u03BF\u03C5",
      "\u03A0\u03B5\u03C1\u03AF\u03B3\u03C1\u03B1\u03BC\u03BC\u03B1 \u03A3\u03B5\u03BD\u03B1\u03C1\u03AF\u03BF\u03C5"
    ],
    then: [
      "* ",
      "\u03A4\u03CC\u03C4\u03B5 "
    ],
    when: [
      "* ",
      "\u038C\u03C4\u03B1\u03BD "
    ]
  },
  em: {
    and: [
      "* ",
      "\u{1F602}"
    ],
    background: [
      "\u{1F4A4}"
    ],
    but: [
      "* ",
      "\u{1F614}"
    ],
    examples: [
      "\u{1F4D3}"
    ],
    feature: [
      "\u{1F4DA}"
    ],
    given: [
      "* ",
      "\u{1F610}"
    ],
    name: "Emoji",
    native: "\u{1F600}",
    rule: [
      "Rule"
    ],
    scenario: [
      "\u{1F952}",
      "\u{1F4D5}"
    ],
    scenarioOutline: [
      "\u{1F4D6}"
    ],
    then: [
      "* ",
      "\u{1F64F}"
    ],
    when: [
      "* ",
      "\u{1F3AC}"
    ]
  },
  en: {
    and: [
      "* ",
      "And "
    ],
    background: [
      "Background"
    ],
    but: [
      "* ",
      "But "
    ],
    examples: [
      "Examples",
      "Scenarios"
    ],
    feature: [
      "Feature",
      "Business Need",
      "Ability"
    ],
    given: [
      "* ",
      "Given "
    ],
    name: "English",
    native: "English",
    rule: [
      "Rule"
    ],
    scenario: [
      "Example",
      "Scenario"
    ],
    scenarioOutline: [
      "Scenario Outline",
      "Scenario Template"
    ],
    then: [
      "* ",
      "Then "
    ],
    when: [
      "* ",
      "When "
    ]
  },
  "en-Scouse": {
    and: [
      "* ",
      "An "
    ],
    background: [
      "Dis is what went down"
    ],
    but: [
      "* ",
      "Buh "
    ],
    examples: [
      "Examples"
    ],
    feature: [
      "Feature"
    ],
    given: [
      "* ",
      "Givun ",
      "Youse know when youse got "
    ],
    name: "Scouse",
    native: "Scouse",
    rule: [
      "Rule"
    ],
    scenario: [
      "The thing of it is"
    ],
    scenarioOutline: [
      "Wharrimean is"
    ],
    then: [
      "* ",
      "Dun ",
      "Den youse gotta "
    ],
    when: [
      "* ",
      "Wun ",
      "Youse know like when "
    ]
  },
  "en-au": {
    and: [
      "* ",
      "Too right "
    ],
    background: [
      "First off"
    ],
    but: [
      "* ",
      "Yeah nah "
    ],
    examples: [
      "You'll wanna"
    ],
    feature: [
      "Pretty much"
    ],
    given: [
      "* ",
      "Y'know "
    ],
    name: "Australian",
    native: "Australian",
    rule: [
      "Rule"
    ],
    scenario: [
      "Awww, look mate"
    ],
    scenarioOutline: [
      "Reckon it's like"
    ],
    then: [
      "* ",
      "But at the end of the day I reckon "
    ],
    when: [
      "* ",
      "It's just unbelievable "
    ]
  },
  "en-lol": {
    and: [
      "* ",
      "AN "
    ],
    background: [
      "B4"
    ],
    but: [
      "* ",
      "BUT "
    ],
    examples: [
      "EXAMPLZ"
    ],
    feature: [
      "OH HAI"
    ],
    given: [
      "* ",
      "I CAN HAZ "
    ],
    name: "LOLCAT",
    native: "LOLCAT",
    rule: [
      "Rule"
    ],
    scenario: [
      "MISHUN"
    ],
    scenarioOutline: [
      "MISHUN SRSLY"
    ],
    then: [
      "* ",
      "DEN "
    ],
    when: [
      "* ",
      "WEN "
    ]
  },
  "en-old": {
    and: [
      "* ",
      "Ond ",
      "7 "
    ],
    background: [
      "Aer",
      "\xC6r"
    ],
    but: [
      "* ",
      "Ac "
    ],
    examples: [
      "Se the",
      "Se \xFEe",
      "Se \xF0e"
    ],
    feature: [
      "Hwaet",
      "Hw\xE6t"
    ],
    given: [
      "* ",
      "Thurh ",
      "\xDEurh ",
      "\xD0urh "
    ],
    name: "Old English",
    native: "Englisc",
    rule: [
      "Rule"
    ],
    scenario: [
      "Swa"
    ],
    scenarioOutline: [
      "Swa hwaer swa",
      "Swa hw\xE6r swa"
    ],
    then: [
      "* ",
      "Tha ",
      "\xDEa ",
      "\xD0a ",
      "Tha the ",
      "\xDEa \xFEe ",
      "\xD0a \xF0e "
    ],
    when: [
      "* ",
      "B\xE6\xFEsealf ",
      "B\xE6\xFEsealfa ",
      "B\xE6\xFEsealfe ",
      "Ciric\xE6w ",
      "Ciric\xE6we ",
      "Ciric\xE6wa "
    ]
  },
  "en-pirate": {
    and: [
      "* ",
      "Aye "
    ],
    background: [
      "Yo-ho-ho"
    ],
    but: [
      "* ",
      "Avast! "
    ],
    examples: [
      "Dead men tell no tales"
    ],
    feature: [
      "Ahoy matey!"
    ],
    given: [
      "* ",
      "Gangway! "
    ],
    name: "Pirate",
    native: "Pirate",
    rule: [
      "Rule"
    ],
    scenario: [
      "Heave to"
    ],
    scenarioOutline: [
      "Shiver me timbers"
    ],
    then: [
      "* ",
      "Let go and haul "
    ],
    when: [
      "* ",
      "Blimey! "
    ]
  },
  "en-tx": {
    and: [
      "Come hell or high water "
    ],
    background: [
      "Lemme tell y'all a story"
    ],
    but: [
      "Well now hold on, I'll you what "
    ],
    examples: [
      "Now that's a story longer than a cattle drive in July"
    ],
    feature: [
      "This ain\u2019t my first rodeo",
      "All gussied up"
    ],
    given: [
      "Fixin' to ",
      "All git out "
    ],
    name: "Texas",
    native: "Texas",
    rule: [
      "Rule "
    ],
    scenario: [
      "All hat and no cattle"
    ],
    scenarioOutline: [
      "Serious as a snake bite",
      "Busy as a hound in flea season"
    ],
    then: [
      "There\u2019s no tree but bears some fruit "
    ],
    when: [
      "Quick out of the chute "
    ]
  },
  eo: {
    and: [
      "* ",
      "Kaj "
    ],
    background: [
      "Fono"
    ],
    but: [
      "* ",
      "Sed "
    ],
    examples: [
      "Ekzemploj"
    ],
    feature: [
      "Trajto"
    ],
    given: [
      "* ",
      "Donita\u0135o ",
      "Komence "
    ],
    name: "Esperanto",
    native: "Esperanto",
    rule: [
      "Regulo"
    ],
    scenario: [
      "Ekzemplo",
      "Scenaro",
      "Kazo"
    ],
    scenarioOutline: [
      "Konturo de la scenaro",
      "Skizo",
      "Kazo-skizo"
    ],
    then: [
      "* ",
      "Do "
    ],
    when: [
      "* ",
      "Se "
    ]
  },
  es: {
    and: [
      "* ",
      "Y ",
      "E "
    ],
    background: [
      "Antecedentes"
    ],
    but: [
      "* ",
      "Pero "
    ],
    examples: [
      "Ejemplos"
    ],
    feature: [
      "Caracter\xEDstica",
      "Necesidad del negocio",
      "Requisito"
    ],
    given: [
      "* ",
      "Dado ",
      "Dada ",
      "Dados ",
      "Dadas "
    ],
    name: "Spanish",
    native: "espa\xF1ol",
    rule: [
      "Regla",
      "Regla de negocio"
    ],
    scenario: [
      "Ejemplo",
      "Escenario"
    ],
    scenarioOutline: [
      "Esquema del escenario"
    ],
    then: [
      "* ",
      "Entonces "
    ],
    when: [
      "* ",
      "Cuando "
    ]
  },
  et: {
    and: [
      "* ",
      "Ja "
    ],
    background: [
      "Taust"
    ],
    but: [
      "* ",
      "Kuid "
    ],
    examples: [
      "Juhtumid"
    ],
    feature: [
      "Omadus"
    ],
    given: [
      "* ",
      "Eeldades "
    ],
    name: "Estonian",
    native: "eesti keel",
    rule: [
      "Reegel"
    ],
    scenario: [
      "Juhtum",
      "Stsenaarium"
    ],
    scenarioOutline: [
      "Raamjuhtum",
      "Raamstsenaarium"
    ],
    then: [
      "* ",
      "Siis "
    ],
    when: [
      "* ",
      "Kui "
    ]
  },
  fa: {
    and: [
      "* ",
      "\u0648 "
    ],
    background: [
      "\u0632\u0645\u06CC\u0646\u0647",
      "\u067E\u06CC\u0634 \u0632\u0645\u06CC\u0646\u0647",
      "\u0645\u0642\u062F\u0645\u0627\u062A"
    ],
    but: [
      "* ",
      "\u0627\u0645\u0627 "
    ],
    examples: [
      "\u0646\u0645\u0648\u0646\u0647 \u0647\u0627"
    ],
    feature: [
      "\u0648\u06CC\u0698\u06AF\u06CC",
      "\u0642\u0627\u0628\u0644\u06CC\u062A"
    ],
    given: [
      "* ",
      "\u0628\u0627 \u0641\u0631\u0636 ",
      "\u0641\u0631\u0636 \u06A9\u0646\u06CC\u062F ",
      "\u0628\u0627 \u062F\u0631 \u0646\u0638\u0631 \u06AF\u0631\u0641\u062A\u0646 "
    ],
    name: "Persian",
    native: "\u0641\u0627\u0631\u0633\u06CC",
    rule: [
      "\u0642\u0627\u0646\u0648\u0646"
    ],
    scenario: [
      "\u0645\u062B\u0627\u0644",
      "\u0633\u0646\u0627\u0631\u06CC\u0648"
    ],
    scenarioOutline: [
      "\u0627\u0644\u06AF\u0648\u06CC \u0633\u0646\u0627\u0631\u06CC\u0648"
    ],
    then: [
      "* ",
      "\u0622\u0646\u06AF\u0627\u0647 ",
      "\u0633\u067E\u0633 ",
      "\u0627\u0646\u062A\u0638\u0627\u0631 \u0645\u06CC \u0631\u0648\u062F "
    ],
    when: [
      "* ",
      "\u0647\u0646\u06AF\u0627\u0645\u06CC ",
      "\u0648\u0642\u062A\u06CC "
    ]
  },
  fi: {
    and: [
      "* ",
      "Ja "
    ],
    background: [
      "Tausta"
    ],
    but: [
      "* ",
      "Mutta "
    ],
    examples: [
      "Tapaukset"
    ],
    feature: [
      "Ominaisuus"
    ],
    given: [
      "* ",
      "Oletetaan "
    ],
    name: "Finnish",
    native: "suomi",
    rule: [
      "Rule"
    ],
    scenario: [
      "Tapaus"
    ],
    scenarioOutline: [
      "Tapausaihio"
    ],
    then: [
      "* ",
      "Niin "
    ],
    when: [
      "* ",
      "Kun "
    ]
  },
  fr: {
    and: [
      "* ",
      "Et que ",
      "Et qu'",
      "Et "
    ],
    background: [
      "Contexte"
    ],
    but: [
      "* ",
      "Mais que ",
      "Mais qu'",
      "Mais "
    ],
    examples: [
      "Exemples"
    ],
    feature: [
      "Fonctionnalit\xE9"
    ],
    given: [
      "* ",
      "Soit ",
      "Sachant que ",
      "Sachant qu'",
      "Sachant ",
      "Etant donn\xE9 que ",
      "Etant donn\xE9 qu'",
      "Etant donn\xE9 ",
      "Etant donn\xE9e ",
      "Etant donn\xE9s ",
      "Etant donn\xE9es ",
      "\xC9tant donn\xE9 que ",
      "\xC9tant donn\xE9 qu'",
      "\xC9tant donn\xE9 ",
      "\xC9tant donn\xE9e ",
      "\xC9tant donn\xE9s ",
      "\xC9tant donn\xE9es "
    ],
    name: "French",
    native: "fran\xE7ais",
    rule: [
      "R\xE8gle"
    ],
    scenario: [
      "Exemple",
      "Sc\xE9nario"
    ],
    scenarioOutline: [
      "Plan du sc\xE9nario",
      "Plan du Sc\xE9nario"
    ],
    then: [
      "* ",
      "Alors ",
      "Donc "
    ],
    when: [
      "* ",
      "Quand ",
      "Lorsque ",
      "Lorsqu'"
    ]
  },
  ga: {
    and: [
      "* ",
      "Agus "
    ],
    background: [
      "C\xFAlra"
    ],
    but: [
      "* ",
      "Ach "
    ],
    examples: [
      "Sampla\xED"
    ],
    feature: [
      "Gn\xE9"
    ],
    given: [
      "* ",
      "Cuir i gc\xE1s go ",
      "Cuir i gc\xE1s nach ",
      "Cuir i gc\xE1s gur ",
      "Cuir i gc\xE1s n\xE1r "
    ],
    name: "Irish",
    native: "Gaeilge",
    rule: [
      "Riail"
    ],
    scenario: [
      "Sampla",
      "C\xE1s"
    ],
    scenarioOutline: [
      "C\xE1s Achomair"
    ],
    then: [
      "* ",
      "Ansin "
    ],
    when: [
      "* ",
      "Nuair a ",
      "Nuair nach ",
      "Nuair ba ",
      "Nuair n\xE1r "
    ]
  },
  gj: {
    and: [
      "* ",
      "\u0A85\u0AA8\u0AC7 "
    ],
    background: [
      "\u0AAC\u0AC7\u0A95\u0A97\u0ACD\u0AB0\u0ABE\u0A89\u0AA8\u0ACD\u0AA1"
    ],
    but: [
      "* ",
      "\u0AAA\u0AA3 "
    ],
    examples: [
      "\u0A89\u0AA6\u0ABE\u0AB9\u0AB0\u0AA3\u0ACB"
    ],
    feature: [
      "\u0AB2\u0A95\u0ACD\u0AB7\u0AA3",
      "\u0AB5\u0ACD\u0AAF\u0ABE\u0AAA\u0ABE\u0AB0 \u0A9C\u0AB0\u0AC2\u0AB0",
      "\u0A95\u0ACD\u0AB7\u0AAE\u0AA4\u0ABE"
    ],
    given: [
      "* ",
      "\u0A86\u0AAA\u0AC7\u0AB2 \u0A9B\u0AC7 "
    ],
    name: "Gujarati",
    native: "\u0A97\u0AC1\u0A9C\u0AB0\u0ABE\u0AA4\u0AC0",
    rule: [
      "\u0AA8\u0ABF\u0AAF\u0AAE"
    ],
    scenario: [
      "\u0A89\u0AA6\u0ABE\u0AB9\u0AB0\u0AA3",
      "\u0AB8\u0ACD\u0AA5\u0ABF\u0AA4\u0ABF"
    ],
    scenarioOutline: [
      "\u0AAA\u0AB0\u0ABF\u0AA6\u0ACD\u0AA6\u0AB6\u0ACD\u0AAF \u0AB0\u0AC2\u0AAA\u0AB0\u0AC7\u0A96\u0ABE",
      "\u0AAA\u0AB0\u0ABF\u0AA6\u0ACD\u0AA6\u0AB6\u0ACD\u0AAF \u0AA2\u0ABE\u0A82\u0A9A\u0ACB"
    ],
    then: [
      "* ",
      "\u0AAA\u0A9B\u0AC0 "
    ],
    when: [
      "* ",
      "\u0A95\u0ACD\u0AAF\u0ABE\u0AB0\u0AC7 "
    ]
  },
  gl: {
    and: [
      "* ",
      "E "
    ],
    background: [
      "Contexto"
    ],
    but: [
      "* ",
      "Mais ",
      "Pero "
    ],
    examples: [
      "Exemplos"
    ],
    feature: [
      "Caracter\xEDstica"
    ],
    given: [
      "* ",
      "Dado ",
      "Dada ",
      "Dados ",
      "Dadas "
    ],
    name: "Galician",
    native: "galego",
    rule: [
      "Rule"
    ],
    scenario: [
      "Exemplo",
      "Escenario"
    ],
    scenarioOutline: [
      "Esbozo do escenario"
    ],
    then: [
      "* ",
      "Ent\xF3n ",
      "Logo "
    ],
    when: [
      "* ",
      "Cando "
    ]
  },
  he: {
    and: [
      "* ",
      "\u05D5\u05D2\u05DD "
    ],
    background: [
      "\u05E8\u05E7\u05E2"
    ],
    but: [
      "* ",
      "\u05D0\u05D1\u05DC "
    ],
    examples: [
      "\u05D3\u05D5\u05D2\u05DE\u05D0\u05D5\u05EA"
    ],
    feature: [
      "\u05EA\u05DB\u05D5\u05E0\u05D4"
    ],
    given: [
      "* ",
      "\u05D1\u05D4\u05D9\u05E0\u05EA\u05DF "
    ],
    name: "Hebrew",
    native: "\u05E2\u05D1\u05E8\u05D9\u05EA",
    rule: [
      "\u05DB\u05DC\u05DC"
    ],
    scenario: [
      "\u05D3\u05D5\u05D2\u05DE\u05D0",
      "\u05EA\u05E8\u05D7\u05D9\u05E9"
    ],
    scenarioOutline: [
      "\u05EA\u05D1\u05E0\u05D9\u05EA \u05EA\u05E8\u05D7\u05D9\u05E9"
    ],
    then: [
      "* ",
      "\u05D0\u05D6 ",
      "\u05D0\u05D6\u05D9 "
    ],
    when: [
      "* ",
      "\u05DB\u05D0\u05E9\u05E8 "
    ]
  },
  hi: {
    and: [
      "* ",
      "\u0914\u0930 ",
      "\u0924\u0925\u093E "
    ],
    background: [
      "\u092A\u0943\u0937\u094D\u0920\u092D\u0942\u092E\u093F"
    ],
    but: [
      "* ",
      "\u092A\u0930 ",
      "\u092A\u0930\u0928\u094D\u0924\u0941 ",
      "\u0915\u093F\u0928\u094D\u0924\u0941 "
    ],
    examples: [
      "\u0909\u0926\u093E\u0939\u0930\u0923"
    ],
    feature: [
      "\u0930\u0942\u092A \u0932\u0947\u0916"
    ],
    given: [
      "* ",
      "\u0905\u0917\u0930 ",
      "\u092F\u0926\u093F ",
      "\u091A\u0942\u0902\u0915\u093F "
    ],
    name: "Hindi",
    native: "\u0939\u093F\u0902\u0926\u0940",
    rule: [
      "\u0928\u093F\u092F\u092E"
    ],
    scenario: [
      "\u092A\u0930\u093F\u0926\u0943\u0936\u094D\u092F"
    ],
    scenarioOutline: [
      "\u092A\u0930\u093F\u0926\u0943\u0936\u094D\u092F \u0930\u0942\u092A\u0930\u0947\u0916\u093E"
    ],
    then: [
      "* ",
      "\u0924\u092C ",
      "\u0924\u0926\u093E "
    ],
    when: [
      "* ",
      "\u091C\u092C ",
      "\u0915\u0926\u093E "
    ]
  },
  hr: {
    and: [
      "* ",
      "I "
    ],
    background: [
      "Pozadina"
    ],
    but: [
      "* ",
      "Ali "
    ],
    examples: [
      "Primjeri",
      "Scenariji"
    ],
    feature: [
      "Osobina",
      "Mogu\u0107nost",
      "Mogucnost"
    ],
    given: [
      "* ",
      "Zadan ",
      "Zadani ",
      "Zadano ",
      "Ukoliko "
    ],
    name: "Croatian",
    native: "hrvatski",
    rule: [
      "Rule"
    ],
    scenario: [
      "Primjer",
      "Scenarij"
    ],
    scenarioOutline: [
      "Skica",
      "Koncept"
    ],
    then: [
      "* ",
      "Onda "
    ],
    when: [
      "* ",
      "Kada ",
      "Kad "
    ]
  },
  ht: {
    and: [
      "* ",
      "Ak ",
      "Epi ",
      "E "
    ],
    background: [
      "Kont\xE8ks",
      "Istorik"
    ],
    but: [
      "* ",
      "Men "
    ],
    examples: [
      "Egzanp"
    ],
    feature: [
      "Karakteristik",
      "Mak",
      "Fonksyonalite"
    ],
    given: [
      "* ",
      "Sipoze ",
      "Sipoze ke ",
      "Sipoze Ke "
    ],
    name: "Creole",
    native: "krey\xF2l",
    rule: [
      "Rule"
    ],
    scenario: [
      "Senaryo"
    ],
    scenarioOutline: [
      "Plan senaryo",
      "Plan Senaryo",
      "Senaryo deskripsyon",
      "Senaryo Deskripsyon",
      "Dyagram senaryo",
      "Dyagram Senaryo"
    ],
    then: [
      "* ",
      "L\xE8 sa a ",
      "Le sa a "
    ],
    when: [
      "* ",
      "L\xE8 ",
      "Le "
    ]
  },
  hu: {
    and: [
      "* ",
      "\xC9s "
    ],
    background: [
      "H\xE1tt\xE9r"
    ],
    but: [
      "* ",
      "De "
    ],
    examples: [
      "P\xE9ld\xE1k"
    ],
    feature: [
      "Jellemz\u0151"
    ],
    given: [
      "* ",
      "Amennyiben ",
      "Adott "
    ],
    name: "Hungarian",
    native: "magyar",
    rule: [
      "Szab\xE1ly"
    ],
    scenario: [
      "P\xE9lda",
      "Forgat\xF3k\xF6nyv"
    ],
    scenarioOutline: [
      "Forgat\xF3k\xF6nyv v\xE1zlat"
    ],
    then: [
      "* ",
      "Akkor "
    ],
    when: [
      "* ",
      "Majd ",
      "Ha ",
      "Amikor "
    ]
  },
  id: {
    and: [
      "* ",
      "Dan "
    ],
    background: [
      "Dasar",
      "Latar Belakang"
    ],
    but: [
      "* ",
      "Tapi ",
      "Tetapi "
    ],
    examples: [
      "Contoh",
      "Misal"
    ],
    feature: [
      "Fitur"
    ],
    given: [
      "* ",
      "Dengan ",
      "Diketahui ",
      "Diasumsikan ",
      "Bila ",
      "Jika "
    ],
    name: "Indonesian",
    native: "Bahasa Indonesia",
    rule: [
      "Rule",
      "Aturan"
    ],
    scenario: [
      "Skenario"
    ],
    scenarioOutline: [
      "Skenario konsep",
      "Garis-Besar Skenario"
    ],
    then: [
      "* ",
      "Maka ",
      "Kemudian "
    ],
    when: [
      "* ",
      "Ketika "
    ]
  },
  is: {
    and: [
      "* ",
      "Og "
    ],
    background: [
      "Bakgrunnur"
    ],
    but: [
      "* ",
      "En "
    ],
    examples: [
      "D\xE6mi",
      "Atbur\xF0ar\xE1sir"
    ],
    feature: [
      "Eiginleiki"
    ],
    given: [
      "* ",
      "Ef "
    ],
    name: "Icelandic",
    native: "\xCDslenska",
    rule: [
      "Rule"
    ],
    scenario: [
      "Atbur\xF0ar\xE1s"
    ],
    scenarioOutline: [
      "L\xFDsing Atbur\xF0ar\xE1sar",
      "L\xFDsing D\xE6ma"
    ],
    then: [
      "* ",
      "\xDE\xE1 "
    ],
    when: [
      "* ",
      "\xDEegar "
    ]
  },
  it: {
    and: [
      "* ",
      "E ",
      "Ed "
    ],
    background: [
      "Contesto"
    ],
    but: [
      "* ",
      "Ma "
    ],
    examples: [
      "Esempi"
    ],
    feature: [
      "Funzionalit\xE0",
      "Esigenza di Business",
      "Abilit\xE0"
    ],
    given: [
      "* ",
      "Dato ",
      "Data ",
      "Dati ",
      "Date "
    ],
    name: "Italian",
    native: "italiano",
    rule: [
      "Regola"
    ],
    scenario: [
      "Esempio",
      "Scenario"
    ],
    scenarioOutline: [
      "Schema dello scenario"
    ],
    then: [
      "* ",
      "Allora "
    ],
    when: [
      "* ",
      "Quando "
    ]
  },
  ja: {
    and: [
      "* ",
      "\u4E14\u3064",
      "\u304B\u3064"
    ],
    background: [
      "\u80CC\u666F"
    ],
    but: [
      "* ",
      "\u7136\u3057",
      "\u3057\u304B\u3057",
      "\u4F46\u3057",
      "\u305F\u3060\u3057"
    ],
    examples: [
      "\u4F8B",
      "\u30B5\u30F3\u30D7\u30EB"
    ],
    feature: [
      "\u30D5\u30A3\u30FC\u30C1\u30E3",
      "\u6A5F\u80FD"
    ],
    given: [
      "* ",
      "\u524D\u63D0"
    ],
    name: "Japanese",
    native: "\u65E5\u672C\u8A9E",
    rule: [
      "\u30EB\u30FC\u30EB"
    ],
    scenario: [
      "\u30B7\u30CA\u30EA\u30AA"
    ],
    scenarioOutline: [
      "\u30B7\u30CA\u30EA\u30AA\u30A2\u30A6\u30C8\u30E9\u30A4\u30F3",
      "\u30B7\u30CA\u30EA\u30AA\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8",
      "\u30C6\u30F3\u30D7\u30EC",
      "\u30B7\u30CA\u30EA\u30AA\u30C6\u30F3\u30D7\u30EC"
    ],
    then: [
      "* ",
      "\u306A\u3089\u3070"
    ],
    when: [
      "* ",
      "\u3082\u3057"
    ]
  },
  jv: {
    and: [
      "* ",
      "Lan "
    ],
    background: [
      "Dasar"
    ],
    but: [
      "* ",
      "Tapi ",
      "Nanging ",
      "Ananging "
    ],
    examples: [
      "Conto",
      "Contone"
    ],
    feature: [
      "Fitur"
    ],
    given: [
      "* ",
      "Nalika ",
      "Nalikaning "
    ],
    name: "Javanese",
    native: "Basa Jawa",
    rule: [
      "Rule"
    ],
    scenario: [
      "Skenario"
    ],
    scenarioOutline: [
      "Konsep skenario"
    ],
    then: [
      "* ",
      "Njuk ",
      "Banjur "
    ],
    when: [
      "* ",
      "Manawa ",
      "Menawa "
    ]
  },
  ka: {
    and: [
      "* ",
      "\u10D3\u10D0 ",
      "\u10D0\u10E1\u10D4\u10D5\u10D4 "
    ],
    background: [
      "\u10D9\u10DD\u10DC\u10E2\u10D4\u10E5\u10E1\u10E2\u10D8"
    ],
    but: [
      "* ",
      "\u10DB\u10D0\u10D2\u10E0\u10D0\u10DB ",
      "\u10D7\u10E3\u10DB\u10EA\u10D0 "
    ],
    examples: [
      "\u10DB\u10D0\u10D2\u10D0\u10DA\u10D8\u10D7\u10D4\u10D1\u10D8"
    ],
    feature: [
      "\u10D7\u10D5\u10D8\u10E1\u10D4\u10D1\u10D0",
      "\u10DB\u10DD\u10D7\u10EE\u10DD\u10D5\u10DC\u10D0"
    ],
    given: [
      "* ",
      "\u10DB\u10DD\u10EA\u10D4\u10DB\u10E3\u10DA\u10D8 ",
      "\u10DB\u10DD\u10EA\u10D4\u10DB\u10E3\u10DA\u10D8\u10D0 ",
      "\u10D5\u10D7\u10E5\u10D5\u10D0\u10D7 "
    ],
    name: "Georgian",
    native: "\u10E5\u10D0\u10E0\u10D7\u10E3\u10DA\u10D8",
    rule: [
      "\u10EC\u10D4\u10E1\u10D8"
    ],
    scenario: [
      "\u10DB\u10D0\u10D2\u10D0\u10DA\u10D8\u10D7\u10D0\u10D3",
      "\u10DB\u10D0\u10D2\u10D0\u10DA\u10D8\u10D7\u10D8",
      "\u10DB\u10D0\u10D2",
      "\u10E1\u10EA\u10D4\u10DC\u10D0\u10E0\u10D8"
    ],
    scenarioOutline: [
      "\u10E1\u10EA\u10D4\u10DC\u10D0\u10E0\u10D8\u10E1 \u10DC\u10D8\u10DB\u10E3\u10E8\u10D8",
      "\u10E1\u10EA\u10D4\u10DC\u10D0\u10E0\u10D8\u10E1 \u10E8\u10D0\u10D1\u10DA\u10DD\u10DC\u10D8",
      "\u10DC\u10D8\u10DB\u10E3\u10E8\u10D8",
      "\u10E8\u10D0\u10D1\u10DA\u10DD\u10DC\u10D8"
    ],
    then: [
      "* ",
      "\u10DB\u10D0\u10E8\u10D8\u10DC "
    ],
    when: [
      "* ",
      "\u10E0\u10DD\u10D3\u10D4\u10E1\u10D0\u10EA ",
      "\u10E0\u10DD\u10EA\u10D0 ",
      "\u10E0\u10DD\u10D2\u10DD\u10E0\u10EA \u10D9\u10D8 ",
      "\u10D7\u10E3 "
    ]
  },
  kn: {
    and: [
      "* ",
      "\u0CAE\u0CA4\u0CCD\u0CA4\u0CC1 "
    ],
    background: [
      "\u0CB9\u0CBF\u0CA8\u0CCD\u0CA8\u0CC6\u0CB2\u0CC6"
    ],
    but: [
      "* ",
      "\u0C86\u0CA6\u0CB0\u0CC6 "
    ],
    examples: [
      "\u0C89\u0CA6\u0CBE\u0CB9\u0CB0\u0CA3\u0CC6\u0C97\u0CB3\u0CC1"
    ],
    feature: [
      "\u0CB9\u0CC6\u0C9A\u0CCD\u0C9A\u0CB3"
    ],
    given: [
      "* ",
      "\u0CA8\u0CBF\u0CD5\u0CA1\u0CBF\u0CA6 "
    ],
    name: "Kannada",
    native: "\u0C95\u0CA8\u0CCD\u0CA8\u0CA1",
    rule: [
      "Rule"
    ],
    scenario: [
      "\u0C89\u0CA6\u0CBE\u0CB9\u0CB0\u0CA3\u0CC6",
      "\u0C95\u0CA5\u0CBE\u0CB8\u0CBE\u0CB0\u0CBE\u0C82\u0CB6"
    ],
    scenarioOutline: [
      "\u0CB5\u0CBF\u0CB5\u0CB0\u0CA3\u0CC6"
    ],
    then: [
      "* ",
      "\u0CA8\u0C82\u0CA4\u0CB0 "
    ],
    when: [
      "* ",
      "\u0CB8\u0CCD\u0CA5\u0CBF\u0CA4\u0CBF\u0CAF\u0CA8\u0CCD\u0CA8\u0CC1 "
    ]
  },
  ko: {
    and: [
      "* ",
      "\uADF8\uB9AC\uACE0 "
    ],
    background: [
      "\uBC30\uACBD"
    ],
    but: [
      "* ",
      "\uD558\uC9C0\uB9CC ",
      "\uB2E8 "
    ],
    examples: [
      "\uC608"
    ],
    feature: [
      "\uAE30\uB2A5"
    ],
    given: [
      "* ",
      "\uC870\uAC74 ",
      "\uBA3C\uC800 "
    ],
    name: "Korean",
    native: "\uD55C\uAD6D\uC5B4",
    rule: [
      "\uADDC\uCE59"
    ],
    scenario: [
      "\uC2DC\uB098\uB9AC\uC624"
    ],
    scenarioOutline: [
      "\uC2DC\uB098\uB9AC\uC624 \uAC1C\uC694"
    ],
    then: [
      "* ",
      "\uADF8\uB7EC\uBA74 "
    ],
    when: [
      "* ",
      "\uB9CC\uC77C ",
      "\uB9CC\uC57D "
    ]
  },
  lt: {
    and: [
      "* ",
      "Ir "
    ],
    background: [
      "Kontekstas"
    ],
    but: [
      "* ",
      "Bet "
    ],
    examples: [
      "Pavyzd\u017Eiai",
      "Scenarijai",
      "Variantai"
    ],
    feature: [
      "Savyb\u0117"
    ],
    given: [
      "* ",
      "Duota "
    ],
    name: "Lithuanian",
    native: "lietuvi\u0173 kalba",
    rule: [
      "Rule"
    ],
    scenario: [
      "Pavyzdys",
      "Scenarijus"
    ],
    scenarioOutline: [
      "Scenarijaus \u0161ablonas"
    ],
    then: [
      "* ",
      "Tada "
    ],
    when: [
      "* ",
      "Kai "
    ]
  },
  lu: {
    and: [
      "* ",
      "an ",
      "a "
    ],
    background: [
      "Hannergrond"
    ],
    but: [
      "* ",
      "awer ",
      "m\xE4 "
    ],
    examples: [
      "Beispiller"
    ],
    feature: [
      "Funktionalit\xE9it"
    ],
    given: [
      "* ",
      "ugeholl "
    ],
    name: "Luxemburgish",
    native: "L\xEBtzebuergesch",
    rule: [
      "Rule"
    ],
    scenario: [
      "Beispill",
      "Szenario"
    ],
    scenarioOutline: [
      "Plang vum Szenario"
    ],
    then: [
      "* ",
      "dann "
    ],
    when: [
      "* ",
      "wann "
    ]
  },
  lv: {
    and: [
      "* ",
      "Un "
    ],
    background: [
      "Konteksts",
      "Situ\u0101cija"
    ],
    but: [
      "* ",
      "Bet "
    ],
    examples: [
      "Piem\u0113ri",
      "Paraugs"
    ],
    feature: [
      "Funkcionalit\u0101te",
      "F\u012B\u010Da"
    ],
    given: [
      "* ",
      "Kad "
    ],
    name: "Latvian",
    native: "latvie\u0161u",
    rule: [
      "Rule"
    ],
    scenario: [
      "Piem\u0113rs",
      "Scen\u0101rijs"
    ],
    scenarioOutline: [
      "Scen\u0101rijs p\u0113c parauga"
    ],
    then: [
      "* ",
      "Tad "
    ],
    when: [
      "* ",
      "Ja "
    ]
  },
  "mk-Cyrl": {
    and: [
      "* ",
      "\u0418 "
    ],
    background: [
      "\u041A\u043E\u043D\u0442\u0435\u043A\u0441\u0442",
      "\u0421\u043E\u0434\u0440\u0436\u0438\u043D\u0430"
    ],
    but: [
      "* ",
      "\u041D\u043E "
    ],
    examples: [
      "\u041F\u0440\u0438\u043C\u0435\u0440\u0438",
      "\u0421\u0446\u0435\u043D\u0430\u0440\u0438\u0458\u0430"
    ],
    feature: [
      "\u0424\u0443\u043D\u043A\u0446\u0438\u043E\u043D\u0430\u043B\u043D\u043E\u0441\u0442",
      "\u0411\u0438\u0437\u043D\u0438\u0441 \u043F\u043E\u0442\u0440\u0435\u0431\u0430",
      "\u041C\u043E\u0436\u043D\u043E\u0441\u0442"
    ],
    given: [
      "* ",
      "\u0414\u0430\u0434\u0435\u043D\u043E ",
      "\u0414\u0430\u0434\u0435\u043D\u0430 "
    ],
    name: "Macedonian",
    native: "\u041C\u0430\u043A\u0435\u0434\u043E\u043D\u0441\u043A\u0438",
    rule: [
      "Rule"
    ],
    scenario: [
      "\u041F\u0440\u0438\u043C\u0435\u0440",
      "\u0421\u0446\u0435\u043D\u0430\u0440\u0438\u043E",
      "\u041D\u0430 \u043F\u0440\u0438\u043C\u0435\u0440"
    ],
    scenarioOutline: [
      "\u041F\u0440\u0435\u0433\u043B\u0435\u0434 \u043D\u0430 \u0441\u0446\u0435\u043D\u0430\u0440\u0438\u0458\u0430",
      "\u0421\u043A\u0438\u0446\u0430",
      "\u041A\u043E\u043D\u0446\u0435\u043F\u0442"
    ],
    then: [
      "* ",
      "\u0422\u043E\u0433\u0430\u0448 "
    ],
    when: [
      "* ",
      "\u041A\u043E\u0433\u0430 "
    ]
  },
  "mk-Latn": {
    and: [
      "* ",
      "I "
    ],
    background: [
      "Kontekst",
      "Sodrzhina"
    ],
    but: [
      "* ",
      "No "
    ],
    examples: [
      "Primeri",
      "Scenaria"
    ],
    feature: [
      "Funkcionalnost",
      "Biznis potreba",
      "Mozhnost"
    ],
    given: [
      "* ",
      "Dadeno ",
      "Dadena "
    ],
    name: "Macedonian (Latin)",
    native: "Makedonski (Latinica)",
    rule: [
      "Rule"
    ],
    scenario: [
      "Scenario",
      "Na primer"
    ],
    scenarioOutline: [
      "Pregled na scenarija",
      "Skica",
      "Koncept"
    ],
    then: [
      "* ",
      "Togash "
    ],
    when: [
      "* ",
      "Koga "
    ]
  },
  mn: {
    and: [
      "* ",
      "\u041C\u04E9\u043D ",
      "\u0422\u044D\u0433\u044D\u044D\u0434 "
    ],
    background: [
      "\u0410\u0433\u0443\u0443\u043B\u0433\u0430"
    ],
    but: [
      "* ",
      "\u0413\u044D\u0445\u0434\u044D\u044D ",
      "\u0425\u0430\u0440\u0438\u043D "
    ],
    examples: [
      "\u0422\u0443\u0445\u0430\u0439\u043B\u0431\u0430\u043B"
    ],
    feature: [
      "\u0424\u0443\u043D\u043A\u0446",
      "\u0424\u0443\u043D\u043A\u0446\u0438\u043E\u043D\u0430\u043B"
    ],
    given: [
      "* ",
      "\u04E8\u0433\u04E9\u0433\u0434\u0441\u04E9\u043D \u043D\u044C ",
      "\u0410\u043D\u0445 "
    ],
    name: "Mongolian",
    native: "\u043C\u043E\u043D\u0433\u043E\u043B",
    rule: [
      "Rule"
    ],
    scenario: [
      "\u0421\u0446\u0435\u043D\u0430\u0440"
    ],
    scenarioOutline: [
      "\u0421\u0446\u0435\u043D\u0430\u0440\u044B\u043D \u0442\u04E9\u043B\u04E9\u0432\u043B\u04E9\u0433\u04E9\u04E9"
    ],
    then: [
      "* ",
      "\u0422\u044D\u0433\u044D\u0445\u044D\u0434 ",
      "\u04AE\u04AF\u043D\u0438\u0439 \u0434\u0430\u0440\u0430\u0430 "
    ],
    when: [
      "* ",
      "\u0425\u044D\u0440\u044D\u0432 "
    ]
  },
  ne: {
    and: [
      "* ",
      "\u0930 ",
      "\u0905\u0928\u093F "
    ],
    background: [
      "\u092A\u0943\u0937\u094D\u0920\u092D\u0942\u092E\u0940"
    ],
    but: [
      "* ",
      "\u0924\u0930 "
    ],
    examples: [
      "\u0909\u0926\u093E\u0939\u0930\u0923",
      "\u0909\u0926\u093E\u0939\u0930\u0923\u0939\u0930\u0941"
    ],
    feature: [
      "\u0938\u0941\u0935\u093F\u0927\u093E",
      "\u0935\u093F\u0936\u0947\u0937\u0924\u093E"
    ],
    given: [
      "* ",
      "\u0926\u093F\u0907\u090F\u0915\u094B ",
      "\u0926\u093F\u090F\u0915\u094B ",
      "\u092F\u0926\u093F "
    ],
    name: "Nepali",
    native: "\u0928\u0947\u092A\u093E\u0932\u0940",
    rule: [
      "\u0928\u093F\u092F\u092E"
    ],
    scenario: [
      "\u092A\u0930\u093F\u0926\u0943\u0936\u094D\u092F"
    ],
    scenarioOutline: [
      "\u092A\u0930\u093F\u0926\u0943\u0936\u094D\u092F \u0930\u0942\u092A\u0930\u0947\u0916\u093E"
    ],
    then: [
      "* ",
      "\u0924\u094D\u092F\u0938\u092A\u091B\u093F ",
      "\u0905\u0928\u0940 "
    ],
    when: [
      "* ",
      "\u091C\u092C "
    ]
  },
  nl: {
    and: [
      "* ",
      "En "
    ],
    background: [
      "Achtergrond"
    ],
    but: [
      "* ",
      "Maar "
    ],
    examples: [
      "Voorbeelden"
    ],
    feature: [
      "Functionaliteit"
    ],
    given: [
      "* ",
      "Gegeven ",
      "Stel "
    ],
    name: "Dutch",
    native: "Nederlands",
    rule: [
      "Regel"
    ],
    scenario: [
      "Voorbeeld",
      "Scenario"
    ],
    scenarioOutline: [
      "Abstract Scenario"
    ],
    then: [
      "* ",
      "Dan "
    ],
    when: [
      "* ",
      "Als ",
      "Wanneer "
    ]
  },
  no: {
    and: [
      "* ",
      "Og "
    ],
    background: [
      "Bakgrunn"
    ],
    but: [
      "* ",
      "Men "
    ],
    examples: [
      "Eksempler"
    ],
    feature: [
      "Egenskap"
    ],
    given: [
      "* ",
      "Gitt "
    ],
    name: "Norwegian",
    native: "norsk",
    rule: [
      "Regel"
    ],
    scenario: [
      "Eksempel",
      "Scenario"
    ],
    scenarioOutline: [
      "Scenariomal",
      "Abstrakt Scenario"
    ],
    then: [
      "* ",
      "S\xE5 "
    ],
    when: [
      "* ",
      "N\xE5r "
    ]
  },
  pa: {
    and: [
      "* ",
      "\u0A05\u0A24\u0A47 "
    ],
    background: [
      "\u0A2A\u0A3F\u0A1B\u0A4B\u0A15\u0A5C"
    ],
    but: [
      "* ",
      "\u0A2A\u0A30 "
    ],
    examples: [
      "\u0A09\u0A26\u0A3E\u0A39\u0A30\u0A28\u0A3E\u0A02"
    ],
    feature: [
      "\u0A16\u0A3E\u0A38\u0A40\u0A05\u0A24",
      "\u0A2E\u0A41\u0A39\u0A3E\u0A02\u0A26\u0A30\u0A3E",
      "\u0A28\u0A15\u0A36 \u0A28\u0A41\u0A39\u0A3E\u0A30"
    ],
    given: [
      "* ",
      "\u0A1C\u0A47\u0A15\u0A30 ",
      "\u0A1C\u0A3F\u0A35\u0A47\u0A02 \u0A15\u0A3F "
    ],
    name: "Panjabi",
    native: "\u0A2A\u0A70\u0A1C\u0A3E\u0A2C\u0A40",
    rule: [
      "Rule"
    ],
    scenario: [
      "\u0A09\u0A26\u0A3E\u0A39\u0A30\u0A28",
      "\u0A2A\u0A1F\u0A15\u0A25\u0A3E"
    ],
    scenarioOutline: [
      "\u0A2A\u0A1F\u0A15\u0A25\u0A3E \u0A22\u0A3E\u0A02\u0A1A\u0A3E",
      "\u0A2A\u0A1F\u0A15\u0A25\u0A3E \u0A30\u0A42\u0A2A \u0A30\u0A47\u0A16\u0A3E"
    ],
    then: [
      "* ",
      "\u0A24\u0A26 "
    ],
    when: [
      "* ",
      "\u0A1C\u0A26\u0A4B\u0A02 "
    ]
  },
  pl: {
    and: [
      "* ",
      "Oraz ",
      "I "
    ],
    background: [
      "Za\u0142o\u017Cenia"
    ],
    but: [
      "* ",
      "Ale "
    ],
    examples: [
      "Przyk\u0142ady"
    ],
    feature: [
      "W\u0142a\u015Bciwo\u015B\u0107",
      "Funkcja",
      "Aspekt",
      "Potrzeba biznesowa"
    ],
    given: [
      "* ",
      "Zak\u0142adaj\u0105c ",
      "Maj\u0105c ",
      "Zak\u0142adaj\u0105c, \u017Ce "
    ],
    name: "Polish",
    native: "polski",
    rule: [
      "Zasada",
      "Regu\u0142a"
    ],
    scenario: [
      "Przyk\u0142ad",
      "Scenariusz"
    ],
    scenarioOutline: [
      "Szablon scenariusza"
    ],
    then: [
      "* ",
      "Wtedy "
    ],
    when: [
      "* ",
      "Je\u017Celi ",
      "Je\u015Bli ",
      "Gdy ",
      "Kiedy "
    ]
  },
  pt: {
    and: [
      "* ",
      "E "
    ],
    background: [
      "Contexto",
      "Cen\xE1rio de Fundo",
      "Cenario de Fundo",
      "Fundo"
    ],
    but: [
      "* ",
      "Mas "
    ],
    examples: [
      "Exemplos",
      "Cen\xE1rios",
      "Cenarios"
    ],
    feature: [
      "Funcionalidade",
      "Caracter\xEDstica",
      "Caracteristica"
    ],
    given: [
      "* ",
      "Dado ",
      "Dada ",
      "Dados ",
      "Dadas "
    ],
    name: "Portuguese",
    native: "portugu\xEAs",
    rule: [
      "Regra"
    ],
    scenario: [
      "Exemplo",
      "Cen\xE1rio",
      "Cenario"
    ],
    scenarioOutline: [
      "Esquema do Cen\xE1rio",
      "Esquema do Cenario",
      "Delinea\xE7\xE3o do Cen\xE1rio",
      "Delineacao do Cenario"
    ],
    then: [
      "* ",
      "Ent\xE3o ",
      "Entao "
    ],
    when: [
      "* ",
      "Quando "
    ]
  },
  ro: {
    and: [
      "* ",
      "Si ",
      "\u0218i ",
      "\u015Ei "
    ],
    background: [
      "Context"
    ],
    but: [
      "* ",
      "Dar "
    ],
    examples: [
      "Exemple"
    ],
    feature: [
      "Functionalitate",
      "Func\u021Bionalitate",
      "Func\u0163ionalitate"
    ],
    given: [
      "* ",
      "Date fiind ",
      "Dat fiind ",
      "Dat\u0103 fiind",
      "Dati fiind ",
      "Da\u021Bi fiind ",
      "Da\u0163i fiind "
    ],
    name: "Romanian",
    native: "rom\xE2n\u0103",
    rule: [
      "Rule"
    ],
    scenario: [
      "Exemplu",
      "Scenariu"
    ],
    scenarioOutline: [
      "Structura scenariu",
      "Structur\u0103 scenariu"
    ],
    then: [
      "* ",
      "Atunci "
    ],
    when: [
      "* ",
      "Cand ",
      "C\xE2nd "
    ]
  },
  ru: {
    and: [
      "* ",
      "\u0418 ",
      "\u041A \u0442\u043E\u043C\u0443 \u0436\u0435 ",
      "\u0422\u0430\u043A\u0436\u0435 "
    ],
    background: [
      "\u041F\u0440\u0435\u0434\u044B\u0441\u0442\u043E\u0440\u0438\u044F",
      "\u041A\u043E\u043D\u0442\u0435\u043A\u0441\u0442"
    ],
    but: [
      "* ",
      "\u041D\u043E ",
      "\u0410 ",
      "\u0418\u043D\u0430\u0447\u0435 "
    ],
    examples: [
      "\u041F\u0440\u0438\u043C\u0435\u0440\u044B",
      "\u0417\u043D\u0430\u0447\u0435\u043D\u0438\u044F"
    ],
    feature: [
      "\u0424\u0443\u043D\u043A\u0446\u0438\u044F",
      "\u0424\u0443\u043D\u043A\u0446\u0438\u043E\u043D\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u044C",
      "\u0424\u0443\u043D\u043A\u0446\u0438\u043E\u043D\u0430\u043B",
      "\u0421\u0432\u043E\u0439\u0441\u0442\u0432\u043E",
      "\u0424\u0438\u0447\u0430"
    ],
    given: [
      "* ",
      "\u0414\u043E\u043F\u0443\u0441\u0442\u0438\u043C ",
      "\u0414\u0430\u043D\u043E ",
      "\u041F\u0443\u0441\u0442\u044C "
    ],
    name: "Russian",
    native: "\u0440\u0443\u0441\u0441\u043A\u0438\u0439",
    rule: [
      "\u041F\u0440\u0430\u0432\u0438\u043B\u043E"
    ],
    scenario: [
      "\u041F\u0440\u0438\u043C\u0435\u0440",
      "\u0421\u0446\u0435\u043D\u0430\u0440\u0438\u0439"
    ],
    scenarioOutline: [
      "\u0421\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0430 \u0441\u0446\u0435\u043D\u0430\u0440\u0438\u044F",
      "\u0428\u0430\u0431\u043B\u043E\u043D \u0441\u0446\u0435\u043D\u0430\u0440\u0438\u044F"
    ],
    then: [
      "* ",
      "\u0422\u043E ",
      "\u0417\u0430\u0442\u0435\u043C ",
      "\u0422\u043E\u0433\u0434\u0430 "
    ],
    when: [
      "* ",
      "\u041A\u043E\u0433\u0434\u0430 ",
      "\u0415\u0441\u043B\u0438 "
    ]
  },
  sk: {
    and: [
      "* ",
      "A ",
      "A tie\u017E ",
      "A taktie\u017E ",
      "A z\xE1rove\u0148 "
    ],
    background: [
      "Pozadie"
    ],
    but: [
      "* ",
      "Ale "
    ],
    examples: [
      "Pr\xEDklady"
    ],
    feature: [
      "Po\u017Eiadavka",
      "Funkcia",
      "Vlastnos\u0165"
    ],
    given: [
      "* ",
      "Pokia\u013E ",
      "Za predpokladu "
    ],
    name: "Slovak",
    native: "Slovensky",
    rule: [
      "Rule"
    ],
    scenario: [
      "Pr\xEDklad",
      "Scen\xE1r"
    ],
    scenarioOutline: [
      "N\xE1\u010Drt Scen\xE1ru",
      "N\xE1\u010Drt Scen\xE1ra",
      "Osnova Scen\xE1ra"
    ],
    then: [
      "* ",
      "Tak ",
      "Potom "
    ],
    when: [
      "* ",
      "Ke\u010F ",
      "Ak "
    ]
  },
  sl: {
    and: [
      "In ",
      "Ter "
    ],
    background: [
      "Kontekst",
      "Osnova",
      "Ozadje"
    ],
    but: [
      "Toda ",
      "Ampak ",
      "Vendar "
    ],
    examples: [
      "Primeri",
      "Scenariji"
    ],
    feature: [
      "Funkcionalnost",
      "Funkcija",
      "Mo\u017Enosti",
      "Moznosti",
      "Lastnost",
      "Zna\u010Dilnost"
    ],
    given: [
      "Dano ",
      "Podano ",
      "Zaradi ",
      "Privzeto "
    ],
    name: "Slovenian",
    native: "Slovenski",
    rule: [
      "Rule"
    ],
    scenario: [
      "Primer",
      "Scenarij"
    ],
    scenarioOutline: [
      "Struktura scenarija",
      "Skica",
      "Koncept",
      "Oris scenarija",
      "Osnutek"
    ],
    then: [
      "Nato ",
      "Potem ",
      "Takrat "
    ],
    when: [
      "Ko ",
      "Ce ",
      "\u010Ce ",
      "Kadar "
    ]
  },
  "sr-Cyrl": {
    and: [
      "* ",
      "\u0418 "
    ],
    background: [
      "\u041A\u043E\u043D\u0442\u0435\u043A\u0441\u0442",
      "\u041E\u0441\u043D\u043E\u0432\u0430",
      "\u041F\u043E\u0437\u0430\u0434\u0438\u043D\u0430"
    ],
    but: [
      "* ",
      "\u0410\u043B\u0438 "
    ],
    examples: [
      "\u041F\u0440\u0438\u043C\u0435\u0440\u0438",
      "\u0421\u0446\u0435\u043D\u0430\u0440\u0438\u0458\u0438"
    ],
    feature: [
      "\u0424\u0443\u043D\u043A\u0446\u0438\u043E\u043D\u0430\u043B\u043D\u043E\u0441\u0442",
      "\u041C\u043E\u0433\u0443\u045B\u043D\u043E\u0441\u0442",
      "\u041E\u0441\u043E\u0431\u0438\u043D\u0430"
    ],
    given: [
      "* ",
      "\u0417\u0430 \u0434\u0430\u0442\u043E ",
      "\u0417\u0430 \u0434\u0430\u0442\u0435 ",
      "\u0417\u0430 \u0434\u0430\u0442\u0438 "
    ],
    name: "Serbian",
    native: "\u0421\u0440\u043F\u0441\u043A\u0438",
    rule: [
      "\u041F\u0440\u0430\u0432\u0438\u043B\u043E"
    ],
    scenario: [
      "\u0421\u0446\u0435\u043D\u0430\u0440\u0438\u043E",
      "\u041F\u0440\u0438\u043C\u0435\u0440"
    ],
    scenarioOutline: [
      "\u0421\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0430 \u0441\u0446\u0435\u043D\u0430\u0440\u0438\u0458\u0430",
      "\u0421\u043A\u0438\u0446\u0430",
      "\u041A\u043E\u043D\u0446\u0435\u043F\u0442"
    ],
    then: [
      "* ",
      "\u041E\u043D\u0434\u0430 "
    ],
    when: [
      "* ",
      "\u041A\u0430\u0434\u0430 ",
      "\u041A\u0430\u0434 "
    ]
  },
  "sr-Latn": {
    and: [
      "* ",
      "I "
    ],
    background: [
      "Kontekst",
      "Osnova",
      "Pozadina"
    ],
    but: [
      "* ",
      "Ali "
    ],
    examples: [
      "Primeri",
      "Scenariji"
    ],
    feature: [
      "Funkcionalnost",
      "Mogu\u0107nost",
      "Mogucnost",
      "Osobina"
    ],
    given: [
      "* ",
      "Za dato ",
      "Za date ",
      "Za dati "
    ],
    name: "Serbian (Latin)",
    native: "Srpski (Latinica)",
    rule: [
      "Pravilo"
    ],
    scenario: [
      "Scenario",
      "Primer"
    ],
    scenarioOutline: [
      "Struktura scenarija",
      "Skica",
      "Koncept"
    ],
    then: [
      "* ",
      "Onda "
    ],
    when: [
      "* ",
      "Kada ",
      "Kad "
    ]
  },
  sv: {
    and: [
      "* ",
      "Och "
    ],
    background: [
      "Bakgrund"
    ],
    but: [
      "* ",
      "Men "
    ],
    examples: [
      "Exempel"
    ],
    feature: [
      "Egenskap"
    ],
    given: [
      "* ",
      "Givet "
    ],
    name: "Swedish",
    native: "Svenska",
    rule: [
      "Regel"
    ],
    scenario: [
      "Scenario"
    ],
    scenarioOutline: [
      "Abstrakt Scenario",
      "Scenariomall"
    ],
    then: [
      "* ",
      "S\xE5 "
    ],
    when: [
      "* ",
      "N\xE4r "
    ]
  },
  ta: {
    and: [
      "* ",
      "\u0BAE\u0BC7\u0BB2\u0BC1\u0BAE\u0BCD ",
      "\u0BAE\u0BB1\u0BCD\u0BB1\u0BC1\u0BAE\u0BCD "
    ],
    background: [
      "\u0BAA\u0BBF\u0BA9\u0BCD\u0BA9\u0BA3\u0BBF"
    ],
    but: [
      "* ",
      "\u0B86\u0BA9\u0BBE\u0BB2\u0BCD "
    ],
    examples: [
      "\u0B8E\u0B9F\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1\u0B95\u0BCD\u0B95\u0BBE\u0B9F\u0BCD\u0B9F\u0BC1\u0B95\u0BB3\u0BCD",
      "\u0B95\u0BBE\u0B9F\u0BCD\u0B9A\u0BBF\u0B95\u0BB3\u0BCD",
      "\u0BA8\u0BBF\u0BB2\u0BC8\u0BAE\u0BC8\u0B95\u0BB3\u0BBF\u0BB2\u0BCD"
    ],
    feature: [
      "\u0B85\u0BAE\u0BCD\u0B9A\u0BAE\u0BCD",
      "\u0BB5\u0BA3\u0BBF\u0B95 \u0BA4\u0BC7\u0BB5\u0BC8",
      "\u0BA4\u0BBF\u0BB1\u0BA9\u0BCD"
    ],
    given: [
      "* ",
      "\u0B95\u0BC6\u0BBE\u0B9F\u0BC1\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F "
    ],
    name: "Tamil",
    native: "\u0BA4\u0BAE\u0BBF\u0BB4\u0BCD",
    rule: [
      "Rule"
    ],
    scenario: [
      "\u0B89\u0BA4\u0BBE\u0BB0\u0BA3\u0BAE\u0BBE\u0B95",
      "\u0B95\u0BBE\u0B9F\u0BCD\u0B9A\u0BBF"
    ],
    scenarioOutline: [
      "\u0B95\u0BBE\u0B9F\u0BCD\u0B9A\u0BBF \u0B9A\u0BC1\u0BB0\u0BC1\u0B95\u0BCD\u0B95\u0BAE\u0BCD",
      "\u0B95\u0BBE\u0B9F\u0BCD\u0B9A\u0BBF \u0BB5\u0BBE\u0BB0\u0BCD\u0BAA\u0BCD\u0BAA\u0BC1\u0BB0\u0BC1"
    ],
    then: [
      "* ",
      "\u0B85\u0BAA\u0BCD\u0BAA\u0BC6\u0BBE\u0BB4\u0BC1\u0BA4\u0BC1 "
    ],
    when: [
      "* ",
      "\u0B8E\u0BAA\u0BCD\u0BAA\u0BC7\u0BBE\u0BA4\u0BC1 "
    ]
  },
  th: {
    and: [
      "* ",
      "\u0E41\u0E25\u0E30 "
    ],
    background: [
      "\u0E41\u0E19\u0E27\u0E04\u0E34\u0E14"
    ],
    but: [
      "* ",
      "\u0E41\u0E15\u0E48 "
    ],
    examples: [
      "\u0E0A\u0E38\u0E14\u0E02\u0E2D\u0E07\u0E15\u0E31\u0E27\u0E2D\u0E22\u0E48\u0E32\u0E07",
      "\u0E0A\u0E38\u0E14\u0E02\u0E2D\u0E07\u0E40\u0E2B\u0E15\u0E38\u0E01\u0E32\u0E23\u0E13\u0E4C"
    ],
    feature: [
      "\u0E42\u0E04\u0E23\u0E07\u0E2B\u0E25\u0E31\u0E01",
      "\u0E04\u0E27\u0E32\u0E21\u0E15\u0E49\u0E2D\u0E07\u0E01\u0E32\u0E23\u0E17\u0E32\u0E07\u0E18\u0E38\u0E23\u0E01\u0E34\u0E08",
      "\u0E04\u0E27\u0E32\u0E21\u0E2A\u0E32\u0E21\u0E32\u0E23\u0E16"
    ],
    given: [
      "* ",
      "\u0E01\u0E33\u0E2B\u0E19\u0E14\u0E43\u0E2B\u0E49 "
    ],
    name: "Thai",
    native: "\u0E44\u0E17\u0E22",
    rule: [
      "Rule"
    ],
    scenario: [
      "\u0E40\u0E2B\u0E15\u0E38\u0E01\u0E32\u0E23\u0E13\u0E4C"
    ],
    scenarioOutline: [
      "\u0E2A\u0E23\u0E38\u0E1B\u0E40\u0E2B\u0E15\u0E38\u0E01\u0E32\u0E23\u0E13\u0E4C",
      "\u0E42\u0E04\u0E23\u0E07\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E02\u0E2D\u0E07\u0E40\u0E2B\u0E15\u0E38\u0E01\u0E32\u0E23\u0E13\u0E4C"
    ],
    then: [
      "* ",
      "\u0E14\u0E31\u0E07\u0E19\u0E31\u0E49\u0E19 "
    ],
    when: [
      "* ",
      "\u0E40\u0E21\u0E37\u0E48\u0E2D "
    ]
  },
  te: {
    and: [
      "* ",
      "\u0C2E\u0C30\u0C3F\u0C2F\u0C41 "
    ],
    background: [
      "\u0C28\u0C47\u0C2A\u0C25\u0C4D\u0C2F\u0C02"
    ],
    but: [
      "* ",
      "\u0C15\u0C3E\u0C28\u0C3F "
    ],
    examples: [
      "\u0C09\u0C26\u0C3E\u0C39\u0C30\u0C23\u0C32\u0C41"
    ],
    feature: [
      "\u0C17\u0C41\u0C23\u0C2E\u0C41"
    ],
    given: [
      "* ",
      "\u0C1A\u0C46\u0C2A\u0C4D\u0C2A\u0C2C\u0C21\u0C3F\u0C28\u0C26\u0C3F "
    ],
    name: "Telugu",
    native: "\u0C24\u0C46\u0C32\u0C41\u0C17\u0C41",
    rule: [
      "Rule"
    ],
    scenario: [
      "\u0C09\u0C26\u0C3E\u0C39\u0C30\u0C23",
      "\u0C38\u0C28\u0C4D\u0C28\u0C3F\u0C35\u0C47\u0C36\u0C02"
    ],
    scenarioOutline: [
      "\u0C15\u0C25\u0C28\u0C02"
    ],
    then: [
      "* ",
      "\u0C05\u0C2A\u0C4D\u0C2A\u0C41\u0C21\u0C41 "
    ],
    when: [
      "* ",
      "\u0C08 \u0C2A\u0C30\u0C3F\u0C38\u0C4D\u0C25\u0C3F\u0C24\u0C3F\u0C32\u0C4B "
    ]
  },
  tlh: {
    and: [
      "* ",
      "'ej ",
      "latlh "
    ],
    background: [
      "mo'"
    ],
    but: [
      "* ",
      "'ach ",
      "'a "
    ],
    examples: [
      "ghantoH",
      "lutmey"
    ],
    feature: [
      "Qap",
      "Qu'meH 'ut",
      "perbogh",
      "poQbogh malja'",
      "laH"
    ],
    given: [
      "* ",
      "ghu' noblu' ",
      "DaH ghu' bejlu' "
    ],
    name: "Klingon",
    native: "tlhIngan",
    rule: [
      "Rule"
    ],
    scenario: [
      "lut"
    ],
    scenarioOutline: [
      "lut chovnatlh"
    ],
    then: [
      "* ",
      "vaj "
    ],
    when: [
      "* ",
      "qaSDI' "
    ]
  },
  tr: {
    and: [
      "* ",
      "Ve ",
      "Hem de ",
      "Bir de ",
      "Ayr\u0131ca ",
      "\u0130laveten ",
      "Buna ek olarak "
    ],
    background: [
      "Ge\xE7mi\u015F",
      "Arka Plan",
      "\xD6n Ko\u015Ful",
      "\xD6nko\u015Ful",
      "\xD6nceki Durum",
      "Giri\u015F",
      "Mukaddime",
      "Mevcut Durum"
    ],
    but: [
      "* ",
      "Fakat ",
      "Ama ",
      "Ancak ",
      "Yaln\u0131z ",
      "Lakin ",
      "Me\u011Fer ki ",
      "Buna mukabil ",
      "Aksi halde "
    ],
    examples: [
      "\xD6rnekler",
      "De\u011Ferler"
    ],
    feature: [
      "\xD6zellik",
      "\u0130\u015F Gereksinimi",
      "Gereksinim",
      "\u0130\u015Flev",
      "Kullan\u0131c\u0131 Hikayesi",
      "Yetenek",
      "Teknik Gereksinim"
    ],
    given: [
      "* ",
      "Mevcut ",
      "\xD6nceden ",
      "Ge\xE7mi\u015Fte ",
      "Daha \xF6nce ",
      "Halihaz\u0131rda ",
      "Zaten ",
      "Sistemde ",
      "Diyelim ki ",
      "Varsayal\u0131m ki ",
      "Farz edelim ki ",
      "Kabul edelim ki ",
      "Ba\u015Flang\u0131\xE7ta ",
      "Varsay\u0131lan olarak ",
      "Biliniyor ki "
    ],
    name: "Turkish",
    native: "T\xFCrk\xE7e",
    rule: [
      "Kural",
      "\u0130\u015F Kural\u0131",
      "Kaide",
      "H\xFCk\xFCm",
      "Madde"
    ],
    scenario: [
      "\xD6rnek",
      "Senaryo",
      "Durum",
      "Vaka"
    ],
    scenarioOutline: [
      "Senaryo tasla\u011F\u0131",
      "Senaryo \u015Fablonu"
    ],
    then: [
      "* ",
      "Beklenen ",
      "O zaman ",
      "Sonu\xE7 olarak ",
      "B\xF6ylece ",
      "Bunun \xFCzerine ",
      "Bu durumda ",
      "O takdirde ",
      "\u015Eu halde ",
      "Netice itibariyle ",
      "Buna binaen "
    ],
    when: [
      "* ",
      "E\u011Fer ",
      "E\u011Fer ki ",
      "Ne zaman ",
      "Ne zaman ki ",
      "\u015Eayet "
    ]
  },
  tt: {
    and: [
      "* ",
      "\u04BA\u04D9\u043C ",
      "\u0412\u04D9 "
    ],
    background: [
      "\u041A\u0435\u0440\u0435\u0448"
    ],
    but: [
      "* ",
      "\u041B\u04D9\u043A\u0438\u043D ",
      "\u04D8\u043C\u043C\u0430 "
    ],
    examples: [
      "\u04AE\u0440\u043D\u04D9\u043A\u043B\u04D9\u0440",
      "\u041C\u0438\u0441\u0430\u043B\u043B\u0430\u0440"
    ],
    feature: [
      "\u041C\u04E9\u043C\u043A\u0438\u043D\u043B\u0435\u043A",
      "\u04AE\u0437\u0435\u043D\u0447\u04D9\u043B\u0435\u043A\u043B\u0435\u043B\u0435\u043A"
    ],
    given: [
      "* ",
      "\u04D8\u0439\u0442\u0438\u043A "
    ],
    name: "Tatar",
    native: "\u0422\u0430\u0442\u0430\u0440\u0447\u0430",
    rule: [
      "Rule"
    ],
    scenario: [
      "\u0421\u0446\u0435\u043D\u0430\u0440\u0438\u0439"
    ],
    scenarioOutline: [
      "\u0421\u0446\u0435\u043D\u0430\u0440\u0438\u0439\u043D\u044B\u04A3 \u0442\u04E9\u0437\u0435\u043B\u0435\u0448\u0435"
    ],
    then: [
      "* ",
      "\u041D\u04D9\u0442\u0438\u0497\u04D9\u0434\u04D9 "
    ],
    when: [
      "* ",
      "\u04D8\u0433\u04D9\u0440 "
    ]
  },
  uk: {
    and: [
      "* ",
      "\u0406 ",
      "\u0410 \u0442\u0430\u043A\u043E\u0436 ",
      "\u0422\u0430 "
    ],
    background: [
      "\u041F\u0435\u0440\u0435\u0434\u0443\u043C\u043E\u0432\u0430"
    ],
    but: [
      "* ",
      "\u0410\u043B\u0435 "
    ],
    examples: [
      "\u041F\u0440\u0438\u043A\u043B\u0430\u0434\u0438"
    ],
    feature: [
      "\u0424\u0443\u043D\u043A\u0446\u0456\u043E\u043D\u0430\u043B"
    ],
    given: [
      "* ",
      "\u041F\u0440\u0438\u043F\u0443\u0441\u0442\u0438\u043C\u043E ",
      "\u041F\u0440\u0438\u043F\u0443\u0441\u0442\u0438\u043C\u043E, \u0449\u043E ",
      "\u041D\u0435\u0445\u0430\u0439 ",
      "\u0414\u0430\u043D\u043E "
    ],
    name: "Ukrainian",
    native: "\u0423\u043A\u0440\u0430\u0457\u043D\u0441\u044C\u043A\u0430",
    rule: [
      "Rule"
    ],
    scenario: [
      "\u041F\u0440\u0438\u043A\u043B\u0430\u0434",
      "\u0421\u0446\u0435\u043D\u0430\u0440\u0456\u0439"
    ],
    scenarioOutline: [
      "\u0421\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0430 \u0441\u0446\u0435\u043D\u0430\u0440\u0456\u044E"
    ],
    then: [
      "* ",
      "\u0422\u043E ",
      "\u0422\u043E\u0434\u0456 "
    ],
    when: [
      "* ",
      "\u042F\u043A\u0449\u043E ",
      "\u041A\u043E\u043B\u0438 "
    ]
  },
  ur: {
    and: [
      "* ",
      "\u0627\u0648\u0631 "
    ],
    background: [
      "\u067E\u0633 \u0645\u0646\u0638\u0631"
    ],
    but: [
      "* ",
      "\u0644\u06CC\u06A9\u0646 "
    ],
    examples: [
      "\u0645\u062B\u0627\u0644\u06CC\u06BA"
    ],
    feature: [
      "\u0635\u0644\u0627\u062D\u06CC\u062A",
      "\u06A9\u0627\u0631\u0648\u0628\u0627\u0631 \u06A9\u06CC \u0636\u0631\u0648\u0631\u062A",
      "\u062E\u0635\u0648\u0635\u06CC\u062A"
    ],
    given: [
      "* ",
      "\u0627\u06AF\u0631 ",
      "\u0628\u0627\u0644\u0641\u0631\u0636 ",
      "\u0641\u0631\u0636 \u06A9\u06CC\u0627 "
    ],
    name: "Urdu",
    native: "\u0627\u0631\u062F\u0648",
    rule: [
      "Rule"
    ],
    scenario: [
      "\u0645\u0646\u0638\u0631\u0646\u0627\u0645\u06C1"
    ],
    scenarioOutline: [
      "\u0645\u0646\u0638\u0631 \u0646\u0627\u0645\u06D2 \u06A9\u0627 \u062E\u0627\u06A9\u06C1"
    ],
    then: [
      "* ",
      "\u067E\u06BE\u0631 ",
      "\u062A\u0628 "
    ],
    when: [
      "* ",
      "\u062C\u0628 "
    ]
  },
  uz: {
    and: [
      "* ",
      "\u0412\u0430 "
    ],
    background: [
      "\u0422\u0430\u0440\u0438\u0445"
    ],
    but: [
      "* ",
      "\u041B\u0435\u043A\u0438\u043D ",
      "\u0411\u0438\u0440\u043E\u043A ",
      "\u0410\u043C\u043C\u043E "
    ],
    examples: [
      "\u041C\u0438\u0441\u043E\u043B\u043B\u0430\u0440"
    ],
    feature: [
      "\u0424\u0443\u043D\u043A\u0446\u0438\u043E\u043D\u0430\u043B"
    ],
    given: [
      "* ",
      "Belgilangan "
    ],
    name: "Uzbek",
    native: "\u0423\u0437\u0431\u0435\u043A\u0447\u0430",
    rule: [
      "Rule"
    ],
    scenario: [
      "\u0421\u0446\u0435\u043D\u0430\u0440\u0438\u0439"
    ],
    scenarioOutline: [
      "\u0421\u0446\u0435\u043D\u0430\u0440\u0438\u0439 \u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0430\u0441\u0438"
    ],
    then: [
      "* ",
      "\u0423\u043D\u0434\u0430 "
    ],
    when: [
      "* ",
      "\u0410\u0433\u0430\u0440 "
    ]
  },
  vi: {
    and: [
      "* ",
      "V\xE0 "
    ],
    background: [
      "B\u1ED1i c\u1EA3nh"
    ],
    but: [
      "* ",
      "Nh\u01B0ng "
    ],
    examples: [
      "D\u1EEF li\u1EC7u"
    ],
    feature: [
      "T\xEDnh n\u0103ng"
    ],
    given: [
      "* ",
      "Bi\u1EBFt ",
      "Cho "
    ],
    name: "Vietnamese",
    native: "Ti\u1EBFng Vi\u1EC7t",
    rule: [
      "Quy t\u1EAFc"
    ],
    scenario: [
      "T\xECnh hu\u1ED1ng",
      "K\u1ECBch b\u1EA3n"
    ],
    scenarioOutline: [
      "Khung t\xECnh hu\u1ED1ng",
      "Khung k\u1ECBch b\u1EA3n"
    ],
    then: [
      "* ",
      "Th\xEC "
    ],
    when: [
      "* ",
      "Khi "
    ]
  },
  "zh-CN": {
    and: [
      "* ",
      "\u800C\u4E14",
      "\u5E76\u4E14",
      "\u540C\u65F6"
    ],
    background: [
      "\u80CC\u666F"
    ],
    but: [
      "* ",
      "\u4F46\u662F"
    ],
    examples: [
      "\u4F8B\u5B50"
    ],
    feature: [
      "\u529F\u80FD"
    ],
    given: [
      "* ",
      "\u5047\u5982",
      "\u5047\u8BBE",
      "\u5047\u5B9A"
    ],
    name: "Chinese simplified",
    native: "\u7B80\u4F53\u4E2D\u6587",
    rule: [
      "Rule",
      "\u89C4\u5219"
    ],
    scenario: [
      "\u573A\u666F",
      "\u5267\u672C"
    ],
    scenarioOutline: [
      "\u573A\u666F\u5927\u7EB2",
      "\u5267\u672C\u5927\u7EB2"
    ],
    then: [
      "* ",
      "\u90A3\u4E48"
    ],
    when: [
      "* ",
      "\u5F53"
    ]
  },
  ml: {
    and: [
      "* ",
      "\u0D12\u0D2A\u0D4D\u0D2A\u0D02"
    ],
    background: [
      "\u0D2A\u0D36\u0D4D\u0D1A\u0D3E\u0D24\u0D4D\u0D24\u0D32\u0D02"
    ],
    but: [
      "* ",
      "\u0D2A\u0D15\u0D4D\u0D37\u0D47"
    ],
    examples: [
      "\u0D09\u0D26\u0D3E\u0D39\u0D30\u0D23\u0D19\u0D4D\u0D19\u0D7E"
    ],
    feature: [
      "\u0D38\u0D35\u0D3F\u0D36\u0D47\u0D37\u0D24"
    ],
    given: [
      "* ",
      "\u0D28\u0D7D\u0D15\u0D3F\u0D2F\u0D24\u0D4D"
    ],
    name: "Malayalam",
    native: "\u0D2E\u0D32\u0D2F\u0D3E\u0D33\u0D02",
    rule: [
      "\u0D28\u0D3F\u0D2F\u0D2E\u0D02"
    ],
    scenario: [
      "\u0D30\u0D02\u0D17\u0D02"
    ],
    scenarioOutline: [
      "\u0D38\u0D3E\u0D39\u0D1A\u0D30\u0D4D\u0D2F\u0D24\u0D4D\u0D24\u0D3F\u0D28\u0D4D\u0D31\u0D46 \u0D30\u0D42\u0D2A\u0D30\u0D47\u0D16"
    ],
    then: [
      "* ",
      "\u0D2A\u0D3F\u0D28\u0D4D\u0D28\u0D46"
    ],
    when: [
      "\u0D0E\u0D2A\u0D4D\u0D2A\u0D47\u0D3E\u0D7E"
    ]
  },
  "zh-TW": {
    and: [
      "* ",
      "\u800C\u4E14",
      "\u4E26\u4E14",
      "\u540C\u6642"
    ],
    background: [
      "\u80CC\u666F"
    ],
    but: [
      "* ",
      "\u4F46\u662F"
    ],
    examples: [
      "\u4F8B\u5B50"
    ],
    feature: [
      "\u529F\u80FD"
    ],
    given: [
      "* ",
      "\u5047\u5982",
      "\u5047\u8A2D",
      "\u5047\u5B9A"
    ],
    name: "Chinese traditional",
    native: "\u7E41\u9AD4\u4E2D\u6587",
    rule: [
      "Rule"
    ],
    scenario: [
      "\u5834\u666F",
      "\u5287\u672C"
    ],
    scenarioOutline: [
      "\u5834\u666F\u5927\u7DB1",
      "\u5287\u672C\u5927\u7DB1"
    ],
    then: [
      "* ",
      "\u90A3\u9EBC"
    ],
    when: [
      "* ",
      "\u7576"
    ]
  },
  mr: {
    and: [
      "* ",
      "\u0906\u0923\u093F ",
      "\u0924\u0938\u0947\u091A "
    ],
    background: [
      "\u092A\u093E\u0930\u094D\u0936\u094D\u0935\u092D\u0942\u092E\u0940"
    ],
    but: [
      "* ",
      "\u092A\u0923 ",
      "\u092A\u0930\u0902\u0924\u0941 "
    ],
    examples: [
      "\u0909\u0926\u093E\u0939\u0930\u0923"
    ],
    feature: [
      "\u0935\u0948\u0936\u093F\u0937\u094D\u091F\u094D\u092F",
      "\u0938\u0941\u0935\u093F\u0927\u093E"
    ],
    given: [
      "* ",
      "\u091C\u0930",
      "\u0926\u093F\u0932\u0947\u0932\u094D\u092F\u093E \u092A\u094D\u0930\u092E\u093E\u0923\u0947 "
    ],
    name: "Marathi",
    native: "\u092E\u0930\u093E\u0920\u0940",
    rule: [
      "\u0928\u093F\u092F\u092E"
    ],
    scenario: [
      "\u092A\u0930\u093F\u0926\u0943\u0936\u094D\u092F"
    ],
    scenarioOutline: [
      "\u092A\u0930\u093F\u0926\u0943\u0936\u094D\u092F \u0930\u0942\u092A\u0930\u0947\u0916\u093E"
    ],
    then: [
      "* ",
      "\u092E\u0917 ",
      "\u0924\u0947\u0935\u094D\u0939\u093E "
    ],
    when: [
      "* ",
      "\u091C\u0947\u0935\u094D\u0939\u093E "
    ]
  },
  amh: {
    and: [
      "* ",
      "\u12A5\u1293 "
    ],
    background: [
      "\u1245\u12F5\u1218 \u1201\u1294\u1273",
      "\u1218\u1290\u123B",
      "\u1218\u1290\u123B \u1200\u1233\u1265"
    ],
    but: [
      "* ",
      "\u130D\u1295 "
    ],
    examples: [
      "\u121D\u1233\u120C\u12CE\u127D",
      "\u1201\u1293\u1274\u12CE\u127D"
    ],
    feature: [
      "\u1235\u122B",
      "\u12E8\u1270\u1348\u1208\u1308\u12CD \u1235\u122B",
      "\u12E8\u121A\u1348\u1208\u1308\u12CD \u12F5\u122D\u130A\u1275"
    ],
    given: [
      "* ",
      "\u12E8\u1270\u1230\u1320 "
    ],
    name: "Amharic",
    native: "\u12A0\u121B\u122D\u129B",
    rule: [
      "\u1205\u130D"
    ],
    scenario: [
      "\u121D\u1233\u120C",
      "\u1201\u1293\u1274"
    ],
    scenarioOutline: [
      "\u1201\u1293\u1274 \u12DD\u122D\u12DD\u122D",
      "\u1201\u1293\u1274 \u12A0\u1265\u1290\u1275"
    ],
    then: [
      "* ",
      "\u12A8\u12DA\u12EB "
    ],
    when: [
      "* ",
      "\u1218\u127C "
    ]
  }
};

// node_modules/.pnpm/@cucumber+gherkin@42.0.1/node_modules/@cucumber/gherkin/dist/GherkinClassicTokenMatcher.js
var DIALECT_DICT = gherkin_languages_default;
var LANGUAGE_PATTERN = /^\s*#\s*language\s*:\s*([a-zA-Z\-_]+)\s*$/;
function addKeywordTypeMappings(h, keywords, keywordType) {
  for (const k of keywords) {
    if (!(k in h)) {
      h[k] = [];
    }
    h[k].push(keywordType);
  }
}
var GherkinClassicTokenMatcher = class {
  defaultDialectName;
  dialect;
  dialectName;
  activeDocStringSeparator;
  indentToRemove;
  keywordTypesMap;
  sortedStepKeywords;
  constructor(defaultDialectName = "en") {
    this.defaultDialectName = defaultDialectName;
    this.reset();
  }
  changeDialect(newDialectName, location) {
    const newDialect = DIALECT_DICT[newDialectName];
    if (!newDialect) {
      throw NoSuchLanguageException.create(newDialectName, location);
    }
    this.dialectName = newDialectName;
    this.dialect = newDialect;
    this.initializeKeywordTypes();
    this.initializeSortedStepKeywords();
  }
  reset() {
    if (this.dialectName !== this.defaultDialectName) {
      this.changeDialect(this.defaultDialectName);
    }
    this.activeDocStringSeparator = null;
    this.indentToRemove = 0;
  }
  initializeKeywordTypes() {
    this.keywordTypesMap = {};
    addKeywordTypeMappings(this.keywordTypesMap, this.dialect.given, StepKeywordType.CONTEXT);
    addKeywordTypeMappings(this.keywordTypesMap, this.dialect.when, StepKeywordType.ACTION);
    addKeywordTypeMappings(this.keywordTypesMap, this.dialect.then, StepKeywordType.OUTCOME);
    addKeywordTypeMappings(this.keywordTypesMap, [].concat(this.dialect.and).concat(this.dialect.but), StepKeywordType.CONJUNCTION);
  }
  initializeSortedStepKeywords() {
    this.sortedStepKeywords = [].concat(this.dialect.given).concat(this.dialect.when).concat(this.dialect.then).concat(this.dialect.and).concat(this.dialect.but).sort(compareStepKeywords);
  }
  match_TagLine(token) {
    if (token.line.startsWith("@")) {
      this.setTokenMatched(token, TokenType.TagLine, null, null, null, null, this.getTags(token.line));
      return true;
    }
    return false;
  }
  match_FeatureLine(token) {
    return this.matchTitleLine(token, TokenType.FeatureLine, this.dialect.feature);
  }
  match_ScenarioLine(token) {
    return this.matchTitleLine(token, TokenType.ScenarioLine, this.dialect.scenario) || this.matchTitleLine(token, TokenType.ScenarioLine, this.dialect.scenarioOutline);
  }
  match_BackgroundLine(token) {
    return this.matchTitleLine(token, TokenType.BackgroundLine, this.dialect.background);
  }
  match_ExamplesLine(token) {
    return this.matchTitleLine(token, TokenType.ExamplesLine, this.dialect.examples);
  }
  match_RuleLine(token) {
    return this.matchTitleLine(token, TokenType.RuleLine, this.dialect.rule);
  }
  match_TableRow(token) {
    if (token.line.startsWith("|")) {
      this.setTokenMatched(token, TokenType.TableRow, null, null, null, null, token.line.getTableCells());
      return true;
    }
    return false;
  }
  match_Empty(token) {
    if (token.line.isEmpty) {
      this.setTokenMatched(token, TokenType.Empty, null, null, 0);
      return true;
    }
    return false;
  }
  match_Comment(token) {
    if (token.line.startsWith("#")) {
      const text = token.line.getLineText(0);
      this.setTokenMatched(token, TokenType.Comment, text, null, 0);
      return true;
    }
    return false;
  }
  match_Language(token) {
    const match = token.line.trimmedLineText.match(LANGUAGE_PATTERN);
    if (match) {
      const newDialectName = match[1];
      this.setTokenMatched(token, TokenType.Language, newDialectName);
      this.changeDialect(newDialectName, token.location);
      return true;
    }
    return false;
  }
  match_DocStringSeparator(token) {
    return this.activeDocStringSeparator == null ? (
      // open
      this._match_DocStringSeparator(token, '"""', true) || this._match_DocStringSeparator(token, "```", true)
    ) : (
      // close
      this._match_DocStringSeparator(token, this.activeDocStringSeparator, false)
    );
  }
  _match_DocStringSeparator(token, separator, isOpen) {
    if (token.line.startsWith(separator)) {
      let mediaType = null;
      if (isOpen) {
        mediaType = token.line.getRestTrimmed(separator.length);
        this.activeDocStringSeparator = separator;
        this.indentToRemove = token.line.indent;
      } else {
        this.activeDocStringSeparator = null;
        this.indentToRemove = 0;
      }
      this.setTokenMatched(token, TokenType.DocStringSeparator, mediaType, separator);
      return true;
    }
    return false;
  }
  match_EOF(token) {
    if (token.isEof) {
      this.setTokenMatched(token, TokenType.EOF);
      return true;
    }
    return false;
  }
  match_StepLine(token) {
    for (const keyword of this.sortedStepKeywords) {
      if (token.line.startsWith(keyword)) {
        const title = token.line.getRestTrimmed(keyword.length);
        const keywordTypes = this.keywordTypesMap[keyword];
        let keywordType = keywordTypes[0];
        if (keywordTypes.length > 1) {
          keywordType = StepKeywordType.UNKNOWN;
        }
        this.setTokenMatched(token, TokenType.StepLine, title, keyword, null, keywordType);
        return true;
      }
    }
    return false;
  }
  match_Other(token) {
    const text = token.line.getLineText(this.indentToRemove);
    this.setTokenMatched(token, TokenType.Other, this.unescapeDocString(text), null, 0);
    return true;
  }
  getTags(line) {
    const uncommentedLine = line.trimmedLineText.split(/\s#/g, 2)[0];
    let column = line.indent + 1;
    const items = uncommentedLine.split("@");
    const tags = [];
    for (let i = 0; i < items.length; i++) {
      const item = items[i].trimRight();
      if (item.length === 0) {
        continue;
      }
      if (!item.match(/^\S+$/)) {
        throw ParserException.create("A tag may not contain whitespace", line.lineNumber, column);
      }
      const span = { column, text: `@${item}` };
      tags.push(span);
      column += countSymbols(items[i]) + 1;
    }
    return tags;
  }
  matchTitleLine(token, tokenType, keywords) {
    for (const keyword of keywords) {
      if (token.line.startsWithTitleKeyword(keyword)) {
        const title = token.line.getRestTrimmed(keyword.length + ":".length);
        this.setTokenMatched(token, tokenType, title, keyword);
        return true;
      }
    }
    return false;
  }
  setTokenMatched(token, matchedType, text, keyword, indent, keywordType, items) {
    token.matchedType = matchedType;
    token.matchedText = text;
    token.matchedKeyword = keyword;
    token.matchedKeywordType = keywordType;
    token.matchedIndent = typeof indent === "number" ? indent : token.line == null ? 0 : token.line.indent;
    token.matchedItems = items || [];
    token.location.column = token.matchedIndent + 1;
    token.matchedGherkinDialect = this.dialectName;
  }
  unescapeDocString(text) {
    if (this.activeDocStringSeparator === '"""') {
      return text.replace('\\"\\"\\"', '"""');
    }
    if (this.activeDocStringSeparator === "```") {
      return text.replace("\\`\\`\\`", "```");
    }
    return text;
  }
};

// node_modules/.pnpm/@cucumber+gherkin@42.0.1/node_modules/@cucumber/gherkin/dist/GherkinInMarkdownTokenMatcher.js
var KeywordPrefix;
(function(KeywordPrefix2) {
  KeywordPrefix2["BULLET"] = "^(\\s*[*+-]\\s*)";
  KeywordPrefix2["HEADER"] = "^(#{1,6}\\s)";
})(KeywordPrefix || (KeywordPrefix = {}));

// node_modules/.pnpm/@cucumber+gherkin@42.0.1/node_modules/@cucumber/gherkin/dist/pickles/compile.js
var pickleStepTypeFromKeyword = {
  [StepKeywordType.UNKNOWN]: PickleStepType.UNKNOWN,
  [StepKeywordType.CONTEXT]: PickleStepType.CONTEXT,
  [StepKeywordType.ACTION]: PickleStepType.ACTION,
  [StepKeywordType.OUTCOME]: PickleStepType.OUTCOME,
  [StepKeywordType.CONJUNCTION]: null
};

// ../skills/e2e-testing/scripts/e2e-trace.mts
import fs2 from "node:fs";
import path2 from "node:path";
import process3 from "node:process";
var FatalError = class extends Error {
};
function describeError(e) {
  return e instanceof Error ? e.message : String(e);
}
function errnoCode(e) {
  return typeof e === "object" && e !== null && "code" in e && typeof e.code === "string" ? e.code : void 0;
}
var FEATURES_DIR = "features";
var FEATURE_EXT = ".feature";
var SOURCE_COMMENT_RE = /^#\s*引用元:\s*(.+)$/;
var TAG_LINE_RE = /^@\S+(?:\s+@\S+)*$/;
var TAG_ID_RE = /^@REQ-\d+-\d+$/;
var FEATURE_LINE_RE = /^Feature:\s*(.*)$/;
var RULE_WITH_ID_RE = /^Rule:\s*(REQ-\d+)\s+(.+)$/;
var RULE_LINE_RE = /^Rule:\s*(.*)$/;
var SCENARIO_LINE_RE = /^Scenario( Outline)?:\s*(.*)$/;
var NAME_LEADING_ID_RE = /^(REQ-\d+-\d+)(?=\s|$)/;
function requirementPartOf(scenarioId) {
  return scenarioId.slice(0, scenarioId.lastIndexOf("-"));
}
function judgeScenarioId(tagIds, nameId, rule) {
  if (tagIds.length === 0) return { kind: "missing", reason: "\u30BF\u30B0\u7121\u3057" };
  if (tagIds.length >= 2) return { kind: "missing", reason: "\u30BF\u30B0\u306E ID \u304C\u8907\u6570" };
  const id = tagIds[0];
  if (nameId === null) return { kind: "missing", reason: "\u540D\u524D\u5148\u982D\u306B ID \u7121\u3057" };
  if (nameId !== id) return { kind: "missing", reason: "\u30BF\u30B0\u3068\u540D\u524D\u306E ID \u304C\u7570\u306A\u308B" };
  if (rule === null) return { kind: "missing", reason: "Rule \u5916" };
  if (rule.requirementId === null) return { kind: "missing", reason: "Rule \u306B\u8981\u4EF6 ID \u7121\u3057" };
  if (requirementPartOf(id) !== rule.requirementId) return { kind: "missing", reason: "\u8981\u4EF6\u756A\u53F7\u304C Rule \u3068\u7570\u306A\u308B" };
  return { kind: "valid", id };
}
function parseFeature(relPath, slug, text) {
  const feature = { path: relPath, slug, name: slug, source: null, rules: [], scenarios: [] };
  let currentRule = null;
  let pendingSource = null;
  let pendingTags = [];
  const lines = text.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    const lineNo = i + 1;
    if (line === "") continue;
    const sourceMatch = SOURCE_COMMENT_RE.exec(line);
    if (sourceMatch) {
      pendingSource = sourceMatch[1].trim();
      continue;
    }
    if (line.startsWith("#")) continue;
    if (TAG_LINE_RE.test(line)) {
      pendingTags.push(...line.split(/\s+/));
      continue;
    }
    const featureMatch = FEATURE_LINE_RE.exec(line);
    if (featureMatch) {
      if (featureMatch[1] !== "") feature.name = featureMatch[1];
      feature.source = pendingSource;
      pendingSource = null;
      pendingTags = [];
      continue;
    }
    const ruleMatch = RULE_LINE_RE.exec(line);
    if (ruleMatch) {
      const withId = RULE_WITH_ID_RE.exec(line);
      currentRule = {
        requirementId: withId ? withId[1] : null,
        text: withId ? withId[2] : ruleMatch[1],
        line: lineNo,
        source: pendingSource
      };
      feature.rules.push(currentRule);
      pendingSource = null;
      pendingTags = [];
      continue;
    }
    if (line.startsWith("Background:") || line.startsWith("Examples:")) {
      pendingSource = null;
      pendingTags = [];
      continue;
    }
    const scenarioMatch = SCENARIO_LINE_RE.exec(line);
    if (scenarioMatch) {
      const rawName = scenarioMatch[2];
      const idMatch = NAME_LEADING_ID_RE.exec(rawName);
      const nameId = idMatch ? idMatch[1] : null;
      const tagIds = pendingTags.filter((t) => TAG_ID_RE.test(t)).map((t) => t.slice(1));
      feature.scenarios.push({
        rawName,
        displayName: nameId ? rawName.slice(nameId.length).trim() : rawName,
        line: lineNo,
        isOutline: scenarioMatch[1] !== void 0,
        tags: pendingTags,
        tagIds,
        nameId,
        rule: currentRule,
        source: pendingSource ?? currentRule?.source ?? feature.source,
        ownSource: pendingSource,
        idJudgment: judgeScenarioId(tagIds, nameId, currentRule)
      });
      pendingSource = null;
      pendingTags = [];
    }
  }
  return feature;
}
function readFeatureFiles(root) {
  let names;
  try {
    names = fs2.readdirSync(path2.join(root, FEATURES_DIR), { withFileTypes: true }).filter((entry) => !entry.isDirectory() && entry.name.endsWith(FEATURE_EXT)).map((entry) => entry.name).sort();
  } catch (e) {
    if (errnoCode(e) === "ENOENT") return [];
    throw new FatalError(`${FEATURES_DIR} \u3092\u8AAD\u3081\u307E\u305B\u3093: ${describeError(e)}`);
  }
  return names.map((name) => {
    const relPath = path2.posix.join(FEATURES_DIR, name);
    let text;
    try {
      text = fs2.readFileSync(path2.join(root, FEATURES_DIR, name), "utf8");
    } catch (e) {
      throw new FatalError(`${relPath} \u3092\u8AAD\u3081\u307E\u305B\u3093: ${describeError(e)}`);
    }
    return parseFeature(relPath, name.slice(0, -FEATURE_EXT.length), text);
  });
}
var SPECS_DIR = "tests/e2e";
var SPEC_EXT = ".spec.ts";
var STRING_LITERAL_RE = /'(?:[^'\\\n]|\\.)*'|"(?:[^"\\\n]|\\.)*"|`(?:[^`\\]|\\[\s\S])*`/;
var STRING_LITERAL_GLOBAL_RE = new RegExp(STRING_LITERAL_RE.source, "g");
var TEST_DECLARATION_RE = new RegExp(
  String.raw`\btest(?:\.(?:fail|fixme|skip|only))?\s*\(\s*(${STRING_LITERAL_RE.source})\s*(?:,\s*(\{[^}]*\}))?`,
  "g"
);
var TAG_PROPERTY_RE = new RegExp(String.raw`\btag\s*:\s*(?:(${STRING_LITERAL_RE.source})|\[([^\]]*)\])`);
function literalContent(literal) {
  return literal.slice(1, -1);
}
function lineNumberAt(text, index) {
  let line = 1;
  for (let i = 0; i < index; i++) {
    if (text.charCodeAt(i) === 10) line++;
  }
  return line;
}
function extractTagIds(details) {
  const match = TAG_PROPERTY_RE.exec(details);
  if (!match) return [];
  const literals = match[1] !== void 0 ? [match[1]] : [...match[2].matchAll(STRING_LITERAL_GLOBAL_RE)].map((m) => m[0]);
  return literals.map(literalContent).filter((value) => TAG_ID_RE.test(value)).map((value) => value.slice(1));
}
function parseSpec(relPath, slug, text) {
  const tests = [];
  for (const match of text.matchAll(TEST_DECLARATION_RE)) {
    const literal = match[1];
    const name = literalContent(literal);
    const idSource = literal.startsWith("`") ? name.split("${")[0] : name;
    const idMatch = NAME_LEADING_ID_RE.exec(idSource);
    tests.push({
      name,
      nameId: idMatch ? idMatch[1] : null,
      tagIds: match[2] === void 0 ? [] : extractTagIds(match[2]),
      line: lineNumberAt(text, match.index)
    });
  }
  return { path: relPath, slug, tests };
}
function readDirEntries(root, relDir) {
  try {
    return fs2.readdirSync(path2.join(root, relDir), { withFileTypes: true });
  } catch (e) {
    throw new FatalError(`${relDir} \u3092\u8AAD\u3081\u307E\u305B\u3093: ${describeError(e)}`);
  }
}
function collectSpecPaths(root, relDir, out) {
  for (const entry of readDirEntries(root, relDir)) {
    const rel = path2.posix.join(relDir, entry.name);
    if (entry.isDirectory()) {
      collectSpecPaths(root, rel, out);
    } else if (entry.name.endsWith(SPEC_EXT)) {
      out.push(rel);
    }
  }
}
function readSpecFiles(root) {
  try {
    fs2.statSync(path2.join(root, SPECS_DIR));
  } catch (e) {
    if (errnoCode(e) === "ENOENT") return [];
  }
  const relPaths = [];
  collectSpecPaths(root, SPECS_DIR, relPaths);
  relPaths.sort();
  return relPaths.map((relPath) => {
    let text;
    try {
      text = fs2.readFileSync(path2.join(root, relPath), "utf8");
    } catch (e) {
      throw new FatalError(`${relPath} \u3092\u8AAD\u3081\u307E\u305B\u3093: ${describeError(e)}`);
    }
    const under = relPath.slice(SPECS_DIR.length + 1);
    const slash = under.indexOf("/");
    return parseSpec(relPath, slash === -1 ? "" : under.slice(0, slash), text);
  });
}
var FEATURE_MAP_PATH = "features/feature-map.json";
var STATUSES = ["\u672A\u7740\u624B", "\u5B9A\u7FA9\u6E08\u307F", "\u30C6\u30B9\u30C8\u6E08\u307F", "\u5BFE\u8C61\u5916"];
var STATUSES_WITH_FEATURE = ["\u5B9A\u7FA9\u6E08\u307F", "\u30C6\u30B9\u30C8\u6E08\u307F"];
function isStringArray(value) {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}
var requiredString = (value) => {
  if (value === void 0 || value === "") return "\u304C\u7121\u3044";
  return typeof value === "string" ? null : "\u304C\u6587\u5B57\u5217\u3067\u306A\u3044";
};
var optionalString = (value) => value === void 0 || typeof value === "string" ? null : "\u304C\u6587\u5B57\u5217\u3067\u306A\u3044";
var optionalStringArray = (value) => value === void 0 || isStringArray(value) ? null : "\u304C\u6587\u5B57\u5217\u306E\u914D\u5217\u3067\u306A\u3044";
var optionalObject = (value) => value === void 0 || isRecord(value) ? null : "\u304C\u30AA\u30D6\u30B8\u30A7\u30AF\u30C8\u3067\u306A\u3044";
var requiredStringList = (value) => {
  if (value === void 0) return "\u304C\u7121\u3044";
  if (!isStringArray(value)) return "\u304C\u6587\u5B57\u5217\u306E\u914D\u5217\u3067\u306A\u3044";
  return value.length === 0 ? "\u304C\u7A7A" : null;
};
var statusRule = (value) => {
  const error = requiredString(value);
  if (error !== null) return error;
  return STATUSES.includes(value) ? null : `\u306E\u300C${value}\u300D\u304C ${STATUSES.join("\u30FB")} \u306E\u3069\u308C\u3067\u3082\u306A\u3044`;
};
var TOP_LEVEL_FIELDS = [
  ["app", requiredString],
  ["roles", optionalStringArray],
  ["baseline_data", optionalString],
  ["coverage", optionalObject]
];
var FEATURE_FIELDS = [
  ["name", requiredString],
  ["slug", requiredString],
  ["status", statusRule],
  ["summary", requiredString],
  ["includes", requiredStringList],
  ["excludes", optionalStringArray],
  ["sources", optionalStringArray],
  ["questions", optionalStringArray],
  ["decided", optionalString]
];
var CANDIDATE_FIELDS = [
  ["name", requiredString],
  ["slug", requiredString],
  ["reason", requiredString],
  ["sources", optionalStringArray]
];
function checkFields(record, fields, prefix, feature, problems) {
  for (const [name, rule] of fields) {
    const error = rule(record[name]);
    if (error !== null) problems.push({ feature, message: `${prefix}${name} ${error}` });
  }
}
function checkItems(map, key, required, fields, problems) {
  const value = map[key];
  if (value === void 0) {
    if (required) problems.push({ feature: "\u2014", message: `${key} \u304C\u7121\u3044` });
    return;
  }
  if (!Array.isArray(value)) {
    problems.push({ feature: "\u2014", message: `${key} \u304C\u914D\u5217\u3067\u306A\u3044` });
    return;
  }
  value.forEach((item, index) => {
    const where = `${key}[${index}]`;
    if (!isRecord(item)) {
      problems.push({ feature: "\u2014", message: `${where} \u304C\u30AA\u30D6\u30B8\u30A7\u30AF\u30C8\u3067\u306A\u3044` });
      return;
    }
    const feature = typeof item.name === "string" && item.name !== "" ? item.name : "\u2014";
    checkFields(item, fields, `${where}.`, feature, problems);
  });
}
function readFeatureMap(root) {
  let text;
  try {
    text = fs2.readFileSync(path2.join(root, FEATURE_MAP_PATH), "utf8");
  } catch (e) {
    if (errnoCode(e) === "ENOENT") return { missing: true, map: null, problems: [] };
    return { missing: false, map: null, problems: [{ feature: "\u2014", message: `\u3092\u8AAD\u3081\u306A\u3044(${describeError(e)})` }] };
  }
  let parsed;
  try {
    parsed = JSON.parse(text.replace(/^\uFEFF/, ""));
  } catch (e) {
    return { missing: false, map: null, problems: [{ feature: "\u2014", message: `\u3092 JSON \u3068\u3057\u3066\u8AAD\u3081\u306A\u3044(${describeError(e)})` }] };
  }
  if (!isRecord(parsed)) return { missing: false, map: null, problems: [{ feature: "\u2014", message: "\u306E\u4E2D\u8EAB\u304C\u30AA\u30D6\u30B8\u30A7\u30AF\u30C8\u3067\u306A\u3044" }] };
  const problems = [];
  checkFields(parsed, TOP_LEVEL_FIELDS, "", "\u2014", problems);
  checkItems(parsed, "features", true, FEATURE_FIELDS, problems);
  checkItems(parsed, "candidates", false, CANDIDATE_FIELDS, problems);
  return { missing: false, map: problems.length === 0 ? parsed : null, problems };
}
function indexScenarios(features) {
  const index = /* @__PURE__ */ new Map();
  for (const feature of features) {
    for (const scenario of feature.scenarios) {
      if (scenario.idJudgment.kind !== "valid") continue;
      const entries = index.get(scenario.idJudgment.id) ?? [];
      entries.push({ feature, scenario });
      index.set(scenario.idJudgment.id, entries);
    }
  }
  return index;
}
function classifyTest(test, scenarioIndex) {
  const { nameId, tagIds } = test;
  if (nameId === null && tagIds.length === 0) return { kind: "orphan" };
  if (nameId === null || tagIds.length !== 1 || tagIds[0] !== nameId) return { kind: "mismatch" };
  return scenarioIndex.has(nameId) ? { kind: "bound", id: nameId } : { kind: "unknown", id: nameId };
}
function matchScenariosAndTests(features, specs) {
  const scenarioIndex = indexScenarios(features);
  const tests = [];
  const boundSpecPaths = /* @__PURE__ */ new Map();
  for (const spec of specs) {
    for (const test of spec.tests) {
      const classification = classifyTest(test, scenarioIndex);
      tests.push({ spec, test, classification });
      if (classification.kind !== "bound") continue;
      const paths = boundSpecPaths.get(classification.id) ?? [];
      if (!paths.includes(spec.path)) paths.push(spec.path);
      boundSpecPaths.set(classification.id, paths);
    }
  }
  return { scenarioIndex, tests, boundSpecPaths };
}
function boundSpecPathsOf(source, scenario) {
  return scenario.idJudgment.kind === "valid" ? source.boundSpecPaths.get(scenario.idJudgment.id) ?? [] : [];
}
var INCONSISTENCY_KINDS = [
  "\u672A\u751F\u6210",
  "\u5B64\u7ACB\u30C6\u30B9\u30C8",
  "\u4E0D\u660E ID \u53C2\u7167",
  "ID \u4E0D\u4E00\u81F4",
  "\u91CD\u8907 ID",
  "ID \u672A\u4ED8\u4E0E",
  "feature-map \u306E\u5F62\u5F0F",
  "feature-map \u306B\u7121\u3044 .feature",
  ".feature \u306E\u7121\u3044\u6A5F\u80FD",
  "slug \u306E\u91CD\u306A\u308A"
];
function compareInconsistencies(a, b) {
  const kindDiff = INCONSISTENCY_KINDS.indexOf(a.kind) - INCONSISTENCY_KINDS.indexOf(b.kind);
  if (kindDiff !== 0) return kindDiff;
  if (a.sortPath !== b.sortPath) return a.sortPath < b.sortPath ? -1 : 1;
  if (a.sortLine !== b.sortLine) return a.sortLine - b.sortLine;
  return a.target < b.target ? -1 : a.target > b.target ? 1 : 0;
}
function makeFeatureNameOfSlug(features, map) {
  const mapNames = /* @__PURE__ */ new Map();
  for (const item of map?.features ?? []) {
    if (!mapNames.has(item.slug)) mapNames.set(item.slug, item.name);
  }
  const featureNames = new Map(features.map((feature) => [feature.slug, feature.name]));
  return (slug) => slug === "" ? "\u2014" : mapNames.get(slug) ?? featureNames.get(slug) ?? slug;
}
function detectUngenerated(features, match, featureNameOfSlug) {
  const result = [];
  for (const feature of features) {
    const featureName = featureNameOfSlug(feature.slug);
    for (const rule of feature.rules) {
      if (rule.requirementId === null) continue;
      const hasBound = feature.scenarios.some((s) => s.rule === rule && boundSpecPathsOf(match, s).length > 0);
      if (hasBound) continue;
      result.push({
        kind: "\u672A\u751F\u6210",
        origin: "feature",
        feature: featureName,
        target: `${rule.requirementId}(\u914D\u4E0B\u306E\u30B7\u30CA\u30EA\u30AA\u306B\u30C6\u30B9\u30C8\u304C\u7121\u3044)`,
        sortPath: feature.path,
        sortLine: rule.line
      });
    }
    for (const scenario of feature.scenarios) {
      if (scenario.idJudgment.kind !== "valid" || boundSpecPathsOf(match, scenario).length > 0) continue;
      result.push({
        kind: "\u672A\u751F\u6210",
        origin: "feature",
        feature: featureName,
        target: `${scenario.idJudgment.id} ${scenario.displayName}`,
        sortPath: feature.path,
        sortLine: scenario.line
      });
    }
  }
  return result;
}
function describeTestClassification({ spec, test, classification }) {
  const where = `${spec.path} L${test.line}`;
  switch (classification.kind) {
    case "bound":
      return null;
    case "orphan":
      return { kind: "\u5B64\u7ACB\u30C6\u30B9\u30C8", target: `${where} test\u300C${test.name}\u300D` };
    case "unknown":
      return { kind: "\u4E0D\u660E ID \u53C2\u7167", target: `${where} ${classification.id}` };
    case "mismatch": {
      const tag = test.tagIds.length > 0 ? test.tagIds.join(", ") : "\u2014";
      return { kind: "ID \u4E0D\u4E00\u81F4", target: `${where} \u540D\u524D: ${test.nameId ?? "\u2014"} / tag: ${tag}` };
    }
  }
}
function detectTestSideInconsistencies(match, featureNameOfSlug) {
  const result = [];
  for (const classified of match.tests) {
    const described = describeTestClassification(classified);
    if (described === null) continue;
    result.push({
      ...described,
      origin: "test",
      feature: featureNameOfSlug(classified.spec.slug),
      sortPath: classified.spec.path,
      sortLine: classified.test.line
    });
  }
  return result;
}
function featureSideDuplicate(id, places, featureNameOfSlug) {
  return {
    kind: "\u91CD\u8907 ID",
    origin: "feature",
    feature: [...new Set(places.map((p) => featureNameOfSlug(p.feature.slug)))].join(" / "),
    target: `${id}: ${places.map((p) => `${p.feature.path} L${p.line}`).join(", ")}`,
    sortPath: places[0].feature.path,
    sortLine: places[0].line
  };
}
function detectDuplicateIds(features, match, featureNameOfSlug) {
  const result = [];
  for (const [id, entries] of match.scenarioIndex) {
    if (entries.length < 2) continue;
    result.push(
      featureSideDuplicate(
        id,
        entries.map((e) => ({ feature: e.feature, line: e.scenario.line })),
        featureNameOfSlug
      )
    );
  }
  const rulesById = /* @__PURE__ */ new Map();
  for (const feature of features) {
    for (const rule of feature.rules) {
      if (rule.requirementId === null) continue;
      const places = rulesById.get(rule.requirementId) ?? [];
      places.push({ feature, line: rule.line });
      rulesById.set(rule.requirementId, places);
    }
  }
  for (const [id, places] of rulesById) {
    if (places.length >= 2) result.push(featureSideDuplicate(id, places, featureNameOfSlug));
  }
  for (const [id, paths] of match.boundSpecPaths) {
    if (paths.length < 2) continue;
    const first = match.tests.find((t) => t.classification.kind === "bound" && t.classification.id === id);
    result.push({
      kind: "\u91CD\u8907 ID",
      origin: "test",
      feature: featureNameOfSlug(first?.spec.slug ?? ""),
      target: `${id}: ${paths.join(", ")}`,
      sortPath: paths[0],
      sortLine: first?.test.line ?? 0
    });
  }
  return result;
}
function detectMissingIds(features, featureNameOfSlug) {
  const result = [];
  for (const feature of features) {
    const featureName = featureNameOfSlug(feature.slug);
    for (const rule of feature.rules) {
      if (rule.requirementId !== null) continue;
      result.push({
        kind: "ID \u672A\u4ED8\u4E0E",
        origin: "feature",
        feature: featureName,
        target: `${feature.path} L${rule.line} Rule\u300C${rule.text}\u300D(\u540D\u524D\u5148\u982D\u306B\u8981\u4EF6 ID \u7121\u3057)`,
        sortPath: feature.path,
        sortLine: rule.line
      });
    }
    for (const scenario of feature.scenarios) {
      if (scenario.idJudgment.kind !== "missing") continue;
      result.push({
        kind: "ID \u672A\u4ED8\u4E0E",
        origin: "feature",
        feature: featureName,
        target: `${feature.path} L${scenario.line} Scenario\u300C${scenario.rawName}\u300D(${scenario.idJudgment.reason})`,
        sortPath: feature.path,
        sortLine: scenario.line
      });
    }
  }
  return result;
}
function detectFeatureMapFormat(features, reading) {
  const problems = reading.missing && features.length > 0 ? [{ feature: "\u2014", message: "\u304C\u7121\u3044" }] : reading.problems;
  return problems.map((problem, index) => ({
    kind: "feature-map \u306E\u5F62\u5F0F",
    origin: "feature-map",
    feature: problem.feature,
    target: `${FEATURE_MAP_PATH} ${problem.message}`,
    sortPath: FEATURE_MAP_PATH,
    sortLine: index + 1
  }));
}
function detectFeaturesOutsideMap(features, map, featureNameOfSlug) {
  const slugs = new Set(map.features.map((item) => item.slug));
  return features.filter((feature) => !slugs.has(feature.slug)).map((feature) => ({
    kind: "feature-map \u306B\u7121\u3044 .feature",
    origin: "feature",
    feature: featureNameOfSlug(feature.slug),
    target: `${feature.path}(feature-map \u306B slug \u304C ${feature.slug} \u306E\u6A5F\u80FD\u304C\u7121\u3044)`,
    sortPath: feature.path,
    sortLine: 0
  }));
}
function detectFeaturesWithoutFile(features, map) {
  const slugs = new Set(features.map((feature) => feature.slug));
  return map.features.filter((item) => STATUSES_WITH_FEATURE.includes(item.status) && !slugs.has(item.slug)).map((item, index) => ({
    kind: ".feature \u306E\u7121\u3044\u6A5F\u80FD",
    origin: "feature-map",
    feature: item.name,
    target: `${FEATURES_DIR}/${item.slug}${FEATURE_EXT} \u304C\u7121\u3044(\u72B6\u614B\u304C ${item.status})`,
    sortPath: FEATURE_MAP_PATH,
    sortLine: index + 1
  }));
}
function detectSlugOverlaps(map) {
  const bySlug = /* @__PURE__ */ new Map();
  const add = (slug, name, place) => {
    const items = bySlug.get(slug) ?? [];
    items.push({ name, place });
    bySlug.set(slug, items);
  };
  for (const [index, item] of map.features.entries()) add(item.slug, item.name, `features[${index}]`);
  for (const [index, item] of (map.candidates ?? []).entries()) add(item.slug, item.name, `candidates[${index}]`);
  const result = [];
  for (const [slug, items] of bySlug) {
    if (items.length < 2) continue;
    result.push({
      kind: "slug \u306E\u91CD\u306A\u308A",
      origin: "feature-map",
      feature: [...new Set(items.map((item) => item.name))].join(" / "),
      target: `${slug}: ${items.map((item) => item.place).join(", ")}`,
      sortPath: FEATURE_MAP_PATH,
      sortLine: result.length + 1
    });
  }
  return result;
}
function detectInconsistencies(features, match, reading) {
  const { map } = reading;
  const featureNameOfSlug = makeFeatureNameOfSlug(features, map);
  const mapChecks = map === null ? [] : [
    ...detectFeaturesOutsideMap(features, map, featureNameOfSlug),
    ...detectFeaturesWithoutFile(features, map),
    ...detectSlugOverlaps(map)
  ];
  return [
    ...detectUngenerated(features, match, featureNameOfSlug),
    ...detectTestSideInconsistencies(match, featureNameOfSlug),
    ...detectDuplicateIds(features, match, featureNameOfSlug),
    ...detectMissingIds(features, featureNameOfSlug),
    ...detectFeatureMapFormat(features, reading),
    ...mapChecks
  ].sort(compareInconsistencies);
}
function inspect(root = process3.cwd()) {
  const features = readFeatureFiles(root);
  const specs = readSpecFiles(root);
  const reading = readFeatureMap(root);
  const match = matchScenariosAndTests(features, specs);
  return {
    featureMap: reading.map,
    features,
    boundSpecPaths: match.boundSpecPaths,
    inconsistencies: detectInconsistencies(features, match, reading)
  };
}
function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
var OUTCOME_COUNT_KEYS = {
  pass: "pass",
  fail: "fail",
  \u65E2\u77E5\u30D0\u30B0: "knownBug",
  \u672A\u751F\u6210: "ungenerated",
  \u672A\u5B9F\u884C: "notRun"
};
function emptyCounts() {
  return { requirements: 0, testedRequirements: 0, scenarios: 0, pass: 0, fail: 0, knownBug: 0, ungenerated: 0, notRun: 0 };
}
function outcomeOf(scenario, inspection, scenarioResults) {
  if (scenario.idJudgment.kind !== "valid" || boundSpecPathsOf(inspection, scenario).length === 0) {
    return { outcome: "\u672A\u751F\u6210", reason: null };
  }
  const recorded = Object.hasOwn(scenarioResults, scenario.idJudgment.id) ? scenarioResults[scenario.idJudgment.id] : void 0;
  if (recorded === void 0) return { outcome: "\u672A\u5B9F\u884C", reason: null };
  switch (recorded.result) {
    case "pass":
      return { outcome: "pass", reason: null };
    case "fail":
      return { outcome: "fail", reason: recorded.reason ?? null };
    case "known-bug":
      return { outcome: "\u65E2\u77E5\u30D0\u30B0", reason: recorded.reason ?? null };
  }
}
function deriveResults(inspection, scenarioResults) {
  const scenarios = /* @__PURE__ */ new Map();
  const counts = /* @__PURE__ */ new Map();
  for (const feature of inspection.features) {
    const featureCounts = emptyCounts();
    for (const rule of feature.rules) {
      if (rule.requirementId === null) continue;
      featureCounts.requirements++;
      if (feature.scenarios.some((s) => s.rule === rule && boundSpecPathsOf(inspection, s).length > 0)) featureCounts.testedRequirements++;
    }
    for (const scenario of feature.scenarios) {
      const outcome = outcomeOf(scenario, inspection, scenarioResults);
      scenarios.set(scenario, outcome);
      featureCounts.scenarios++;
      featureCounts[OUTCOME_COUNT_KEYS[outcome.outcome]]++;
    }
    counts.set(feature.slug, featureCounts);
  }
  const mismatches = [];
  for (const item of inspection.featureMap?.features ?? []) {
    if (item.status !== "\u30C6\u30B9\u30C8\u6E08\u307F") continue;
    const featureCounts = counts.get(item.slug);
    if (featureCounts === void 0 || featureCounts.fail === 0 && featureCounts.ungenerated === 0) continue;
    mismatches.push({ slug: item.slug, name: item.name, fail: featureCounts.fail, ungenerated: featureCounts.ungenerated });
  }
  return { scenarios, counts, mismatches };
}
var LAST_RUN_PATH = path2.posix.join(FEATURES_DIR, "last-run.json");
var WRITTEN_LINE = `\u66F8\u304D\u51FA\u3057: ${LAST_RUN_PATH}`;
if (false) {
  process3.exitCode = main(process3.argv.slice(2));
}

// src/rows.ts
var FEATURE_MAP = "features/feature-map.json";
var LAST_RUN = "features/last-run.json";
var STOPPING_KINDS = [
  "ID \u672A\u4ED8\u4E0E",
  "feature-map \u306E\u5F62\u5F0F",
  "feature-map \u306B\u7121\u3044 .feature",
  ".feature \u306E\u7121\u3044\u6A5F\u80FD",
  "slug \u306E\u91CD\u306A\u308A"
];
var RECORDED_RESULTS = ["pass", "fail", "known-bug"];
var OUTCOME_KEYS = {
  pass: "pass",
  fail: "fail",
  \u65E2\u77E5\u30D0\u30B0: "knownBug",
  \u672A\u751F\u6210: "ungenerated",
  \u672A\u5B9F\u884C: "notRun"
};
var ROOT_FROM_OUTPUT = "../../";
var TOOL_ONLY_CAUSE = "\u7167\u5408\u30C4\u30FC\u30EB\u3060\u3051\u304C\u8AAD\u3093\u3060\u884C\u3002DocString \u306E\u4E2D\u306E\u884C\u982D\u306E Scenario: \u304B Rule: \u304C\u539F\u56E0\u306B\u306A\u308A\u3046\u308B";
var PARSER_ONLY_CAUSE = "Gherkin \u306E\u30D1\u30FC\u30B5\u30FC\u3060\u3051\u304C\u8AAD\u3093\u3060\u884C\u3002Example: \u306A\u3069\u306E\u898F\u7D04\u306B\u7121\u3044\u30AD\u30FC\u30EF\u30FC\u30C9\u304C\u539F\u56E0\u306B\u306A\u308A\u3046\u308B";
var parser = new Parser(new AstBuilder(IdGenerator_exports.incrementing()), new GherkinClassicTokenMatcher());
function loadViewerData(root) {
  const inspection = inspect(root);
  const map = featureMapOrThrow(inspection);
  const lastRun = readLastRun(root);
  const derived = deriveResults(inspection, lastRun.scenarios);
  const parsed = parseFeatures(root, inspection.features);
  const outcome = (scenario) => outcomeOf2(derived, scenario);
  return {
    app: map.app,
    lastRun: lastRun.lastRun,
    totals: countOutcomes([...derived.scenarios.values()]),
    // 止める不整合は featureMapOrThrow で投げ終えている。未生成は結果の列に出すので、節には入れない
    notices: [...inspection.inconsistencies.filter((i) => i.kind !== "\u672A\u751F\u6210").map(toNotice), ...derived.mismatches.map(mismatchNotice)],
    features: map.features.map((item) => {
      const file = inspection.features.find((f) => f.slug === item.slug);
      const parsedFeature = parsed.get(item.slug);
      const items = file && parsedFeature ? file.rules.flatMap((rule) => ruleRows(item.name, file, rule, parsedFeature, inspection, outcome)) : [];
      return featureView(item, file, parsedFeature?.background ?? [], items, file?.scenarios.map(outcome) ?? []);
    }),
    candidates: (map.candidates ?? []).map(candidateView)
  };
}
function isStopping(inconsistency) {
  return STOPPING_KINDS.includes(inconsistency.kind) || inconsistency.kind === "\u91CD\u8907 ID" && inconsistency.origin === "feature";
}
function featureMapOrThrow(inspection) {
  const stopping = inspection.inconsistencies.filter(isStopping);
  if (stopping.length > 0) throw new Error(stopping.map((i) => `${i.kind}: ${i.feature}: ${i.target}`).join("\n"));
  if (inspection.featureMap === null) throw new Error(`${FEATURE_MAP} \u304C\u7121\u3044`);
  return inspection.featureMap;
}
function toNotice({ kind, feature, target }) {
  return { kind, feature, target };
}
function mismatchNotice({ name, fail, ungenerated }) {
  const parts = [fail > 0 ? `fail ${fail}` : null, ungenerated > 0 ? `\u672A\u751F\u6210 ${ungenerated}` : null].filter((part) => part !== null);
  return { kind: "\u72B6\u614B\u3068\u7D50\u679C\u306E\u98DF\u3044\u9055\u3044", feature: name, target: `\u30C6\u30B9\u30C8\u6E08\u307F \u306A\u306E\u306B ${parts.join("\u3001")}` };
}
function isRecord2(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function messageOf2(e) {
  return e instanceof Error ? e.message : String(e);
}
function readLastRun(root) {
  let text;
  try {
    text = readText(path3.join(root, ...LAST_RUN.split("/")));
  } catch (e) {
    if (isRecord2(e) && e.code === "ENOENT") return { lastRun: null, scenarios: {} };
    throw new Error(`${LAST_RUN} \u3092\u8AAD\u3081\u306A\u3044: ${messageOf2(e)}`);
  }
  let value;
  try {
    value = JSON.parse(text);
  } catch (e) {
    throw new Error(`${LAST_RUN} \u3092\u8AAD\u3081\u306A\u3044: JSON \u3068\u3057\u3066\u8AAD\u3081\u306A\u3044(${messageOf2(e)})`);
  }
  if (!isRecord2(value) || !isRecord2(value.scenarios)) throw new Error(`${LAST_RUN} \u3092\u8AAD\u3081\u306A\u3044: scenarios \u304C\u30AA\u30D6\u30B8\u30A7\u30AF\u30C8\u3067\u306A\u3044`);
  const scenarios = {};
  for (const [id, item] of Object.entries(value.scenarios)) {
    if (!isRecord2(item)) continue;
    const result = RECORDED_RESULTS.find((r) => r === item.result);
    if (result === void 0) continue;
    scenarios[id] = typeof item.reason === "string" ? { result, reason: item.reason } : { result };
  }
  const lastRun = {
    runId: typeof value.runId === "string" ? value.runId : "\u2014",
    startTime: typeof value.startTime === "string" ? value.startTime : null
  };
  return { lastRun, scenarios };
}
function parseFeatures(root, files) {
  const syntaxErrors = [];
  const docs = [];
  for (const file of files) {
    try {
      docs.push({ file, children: parser.parse(readText(path3.join(root, ...file.path.split("/")))).feature?.children ?? [] });
    } catch (error) {
      if (!(error instanceof Errors_exports.CompositeParserException)) throw error;
      syntaxErrors.push(...error.errors.map((e) => `${file.path}: ${e.message}`));
    }
  }
  if (syntaxErrors.length > 0) throw new Error(syntaxErrors.join("\n"));
  const mismatches = [];
  const parsed = /* @__PURE__ */ new Map();
  for (const { file, children } of docs) {
    const rules = /* @__PURE__ */ new Map();
    const scenarios = /* @__PURE__ */ new Map();
    for (const child of children) {
      if (child.scenario) scenarios.set(child.scenario.location.line, child.scenario);
      if (!child.rule) continue;
      rules.set(child.rule.location.line, child.rule);
      for (const { scenario } of child.rule.children) {
        if (scenario) scenarios.set(scenario.location.line, scenario);
      }
    }
    mismatches.push(...readingMismatches(file, /* @__PURE__ */ new Set([...rules.keys(), ...scenarios.keys()])));
    parsed.set(file.slug, { background: backgroundBlocks(children), rules, scenarios });
  }
  if (mismatches.length > 0) throw new Error(mismatches.join("\n"));
  return parsed;
}
function readingMismatches(file, parserLines) {
  const toolLines = /* @__PURE__ */ new Set([...file.rules.map((rule) => rule.line), ...file.scenarios.map((scenario) => scenario.line)]);
  const found = [
    ...[...toolLines].filter((line) => !parserLines.has(line)).map((line) => ({ line, cause: TOOL_ONLY_CAUSE })),
    ...[...parserLines].filter((line) => !toolLines.has(line)).map((line) => ({ line, cause: PARSER_ONLY_CAUSE }))
  ];
  return found.sort((a, b) => a.line - b.line).map(({ line, cause }) => `${file.path}:${line}: \u7167\u5408\u30C4\u30FC\u30EB\u3068 Gherkin \u306E\u8AAD\u307F\u53D6\u308A\u304C\u98DF\u3044\u9055\u3046(${cause})`);
}
function outcomeOf2(derived, scenario) {
  const outcome = derived.scenarios.get(scenario);
  if (outcome === void 0) throw new Error(`${scenario.rawName} \u306E\u6700\u65B0\u7D50\u679C\u304C\u7121\u3044`);
  return outcome;
}
function countOutcomes(outcomes) {
  const counts = { pass: 0, fail: 0, knownBug: 0, ungenerated: 0, notRun: 0 };
  for (const { outcome } of outcomes) counts[OUTCOME_KEYS[outcome]]++;
  return counts;
}
function labeledLines(items) {
  return items.filter(([, value]) => value !== "").map(([label, value]) => `${label}: ${value}`).join("\n");
}
function featureView(item, file, background, items, outcomes) {
  const lists = { includes: item.includes, excludes: item.excludes ?? [], sources: item.sources ?? [], questions: item.questions ?? [] };
  const decided = item.decided ?? "";
  const body = labeledLines([
    ["\u6982\u8981", item.summary],
    ["\u542B\u3080", lists.includes.join("\u3001")],
    ["\u542B\u307E\u306A\u3044", lists.excludes.join("\u3001")],
    ["\u6839\u62E0", lists.sources.join("\u3001")],
    ["\u78BA\u8A8D\u3057\u305F\u3044\u3053\u3068", lists.questions.join("\u3001")],
    ["\u6C7A\u3081\u305F\u3053\u3068", decided]
  ]);
  return {
    row: {
      kind: "\u6A5F\u80FD",
      id: item.slug,
      feature: item.name,
      status: item.status,
      body,
      ...stepFields(background),
      source: file?.source ?? ""
    },
    summary: item.summary,
    ...lists,
    decided,
    counts: item.status === "\u672A\u7740\u624B" || item.status === "\u5BFE\u8C61\u5916" ? null : countOutcomes(outcomes),
    items
  };
}
function ruleRows(featureName, file, rule, parsed, inspection, outcome) {
  const scenarios = file.scenarios.filter((scenario) => scenario.rule === rule);
  const outcomes = scenarios.map(outcome);
  const parsedRule = parsed.rules.get(rule.line);
  const requirement = {
    kind: "\u8981\u4EF6",
    id: rule.requirementId ?? "",
    feature: featureName,
    status: "",
    body: rule.text,
    ...stepFields(parsedRule ? backgroundBlocks(parsedRule.children) : []),
    source: rule.source ?? "",
    // 有効な ID のシナリオ(ID 未付与は止めている)が 未生成 なのは、テストファイルが結ばれていないときだけ
    result: { kind: "requirement", counts: countOutcomes(outcomes), untested: outcomes.every((o) => o.outcome === "\u672A\u751F\u6210") }
  };
  return [
    requirement,
    ...scenarios.map((scenario, index) => {
      const id = scenario.idJudgment.kind === "valid" ? scenario.idJudgment.id : "";
      const parsedScenario = parsed.scenarios.get(scenario.line);
      const specs = (inspection.boundSpecPaths.get(id) ?? []).map((specPath) => ({
        path: specPath,
        href: `${ROOT_FROM_OUTPUT}${specPath}`
      }));
      return {
        kind: "\u30B7\u30CA\u30EA\u30AA",
        id,
        feature: featureName,
        status: "",
        body: scenario.displayName,
        ...stepFields(
          parsedScenario ? [...parsedScenario.steps.flatMap(stepBlocks), ...parsedScenario.examples.flatMap(examplesBlocks)] : []
        ),
        source: scenario.ownSource ?? "",
        result: { kind: "scenario", outcome: outcomes[index].outcome, reason: outcomes[index].reason, specs }
      };
    })
  ];
}
function candidateView(candidate) {
  const sources = candidate.sources ?? [];
  const body = labeledLines([
    ["\u7406\u7531", candidate.reason],
    ["\u6839\u62E0", sources.join("\u3001")]
  ]);
  return {
    row: { kind: "\u5019\u88DC", id: candidate.slug, feature: candidate.name, status: "", body, source: "", ...stepFields([]) },
    reason: candidate.reason,
    sources
  };
}
function readText(file) {
  return fs3.readFileSync(file, "utf8").replace(/^\uFEFF/, "").replaceAll("\r\n", "\n");
}
function stepFields(blocks) {
  const lines = blocks.flatMap((block) => {
    if (block.kind === "table") return block.rows.map(tableRowLine);
    if (block.kind === "line") return [`${block.keyword}${block.text}`];
    return [block.text];
  });
  return { steps: lines.join("\n"), stepBlocks: blocks };
}
function backgroundBlocks(children) {
  const background = children.find((child) => child.background)?.background;
  return background ? background.steps.flatMap(stepBlocks) : [];
}
function cellValues(row) {
  return row.cells.map((cell2) => cell2.value);
}
function tableRowLine(cells) {
  const escaped = cells.map((value) => value.replaceAll("\\", "\\\\").replaceAll("|", "\\|").replaceAll("\n", "\\n"));
  return `| ${escaped.join(" | ")} |`;
}
function stepBlocks(step) {
  const blocks = [{ kind: "line", keyword: step.keyword, text: step.text }];
  if (step.dataTable) blocks.push({ kind: "table", rows: step.dataTable.rows.map(cellValues) });
  if (step.docString) {
    const { delimiter, mediaType, content } = step.docString;
    const lines = [`${delimiter}${mediaType ?? ""}`, ...content === "" ? [] : content.split("\n"), delimiter];
    blocks.push({ kind: "docString", text: lines.join("\n") });
  }
  return blocks;
}
function examplesBlocks(examples) {
  const title = { kind: "line", keyword: "", text: `${examples.keyword}:${examples.name ? ` ${examples.name}` : ""}` };
  if (!examples.tableHeader) return [title];
  return [title, { kind: "table", rows: [examples.tableHeader, ...examples.tableBody].map(cellValues) }];
}

// src/build.ts
function main() {
  try {
    const root = process4.cwd();
    const data = loadViewerData(root);
    replaceOutput(root, { "index.html": renderHtml(data), "review.csv": toCsv(csvRows(data)) });
    const items = data.features.flatMap((feature) => feature.items);
    const count = (kind) => items.filter((item) => item.kind === kind).length;
    console.log(`features/viewer/ \u3092\u66F4\u65B0\u3057\u305F(\u6A5F\u80FD ${data.features.length}\u3001\u8981\u4EF6 ${count("\u8981\u4EF6")}\u3001\u30B7\u30CA\u30EA\u30AA ${count("\u30B7\u30CA\u30EA\u30AA")})`);
    return 0;
  } catch (e) {
    process4.stderr.write(`${e instanceof Error ? e.message : String(e)}
`);
    return 1;
  }
}
process4.exitCode = main();
/*! Bundled license information:

react/cjs/react.production.js:
  (**
   * @license React
   * react.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom.production.js:
  (**
   * @license React
   * react-dom.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom-server-legacy.node.production.js:
  (**
   * @license React
   * react-dom-server-legacy.node.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom-server.node.production.js:
  (**
   * @license React
   * react-dom-server.node.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react/cjs/react-jsx-runtime.production.js:
  (**
   * @license React
   * react-jsx-runtime.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/

// このファイルに取り込んだパッケージのライセンス
//
// @cucumber/gherkin@42.0.1(MIT)
//
// MIT License
//
// Copyright (c) 2017 Cucumber Ltd, Gaspar Nagy, Björn Rasmusson, Peter Sergeant, and contributors
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
//
// @cucumber/messages@34.2.1(MIT)
//
// MIT License
//
// Copyright (c) 2018 Cucumber Ltd and contributors
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
//
// @fontsource-variable/atkinson-hyperlegible-next@5.3.0(OFL-1.1)
//
// Copyright 2020-2024 The Atkinson Hyperlegible Next Project Authors (https://github.com/googlefonts/atkinson-hyperlegible-next) AtkinsonHyperlegibleNext-Italic[wght].ttf: Copyright 2020-2024 The Atkinson Hyperlegible Next Project Authors (https://github.com/googlefonts/atkinson-hyperlegible-next)
//
// This Font Software is licensed under the SIL Open Font License, Version 1.1.
// This license is copied below, and is also available with a FAQ at:
// http://scripts.sil.org/OFL
//
//
// -----------------------------------------------------------
// SIL OPEN FONT LICENSE Version 1.1 - 26 February 2007
// -----------------------------------------------------------
//
// PREAMBLE
// The goals of the Open Font License (OFL) are to stimulate worldwide
// development of collaborative font projects, to support the font creation
// efforts of academic and linguistic communities, and to provide a free and
// open framework in which fonts may be shared and improved in partnership
// with others.
//
// The OFL allows the licensed fonts to be used, studied, modified and
// redistributed freely as long as they are not sold by themselves. The
// fonts, including any derivative works, can be bundled, embedded,
// redistributed and/or sold with any software provided that any reserved
// names are not used by derivative works. The fonts and derivatives,
// however, cannot be released under any other type of license. The
// requirement for fonts to remain under this license does not apply
// to any document created using the fonts or their derivatives.
//
// DEFINITIONS
// "Font Software" refers to the set of files released by the Copyright
// Holder(s) under this license and clearly marked as such. This may
// include source files, build scripts and documentation.
//
// "Reserved Font Name" refers to any names specified as such after the
// copyright statement(s).
//
// "Original Version" refers to the collection of Font Software components as
// distributed by the Copyright Holder(s).
//
// "Modified Version" refers to any derivative made by adding to, deleting,
// or substituting -- in part or in whole -- any of the components of the
// Original Version, by changing formats or by porting the Font Software to a
// new environment.
//
// "Author" refers to any designer, engineer, programmer, technical
// writer or other person who contributed to the Font Software.
//
// PERMISSION & CONDITIONS
// Permission is hereby granted, free of charge, to any person obtaining
// a copy of the Font Software, to use, study, copy, merge, embed, modify,
// redistribute, and sell modified and unmodified copies of the Font
// Software, subject to the following conditions:
//
// 1) Neither the Font Software nor any of its individual components,
// in Original or Modified Versions, may be sold by itself.
//
// 2) Original or Modified Versions of the Font Software may be bundled,
// redistributed and/or sold with any software, provided that each copy
// contains the above copyright notice and this license. These can be
// included either as stand-alone text files, human-readable headers or
// in the appropriate machine-readable metadata fields within text or
// binary files as long as those fields can be easily viewed by the user.
//
// 3) No Modified Version of the Font Software may use the Reserved Font
// Name(s) unless explicit written permission is granted by the corresponding
// Copyright Holder. This restriction only applies to the primary font name as
// presented to the users.
//
// 4) The name(s) of the Copyright Holder(s) or the Author(s) of the Font
// Software shall not be used to promote, endorse or advertise any
// Modified Version, except to acknowledge the contribution(s) of the
// Copyright Holder(s) and the Author(s) or with their explicit written
// permission.
//
// 5) The Font Software, modified or unmodified, in part or in whole,
// must be distributed entirely under this license, and must not be
// distributed under any other license. The requirement for fonts to
// remain under this license does not apply to any document created
// using the Font Software.
//
// TERMINATION
// This license becomes null and void if any of the above conditions are
// not met.
//
// DISCLAIMER
// THE FONT SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO ANY WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT
// OF COPYRIGHT, PATENT, TRADEMARK, OR OTHER RIGHT. IN NO EVENT SHALL THE
// COPYRIGHT HOLDER BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
// INCLUDING ANY GENERAL, SPECIAL, INDIRECT, INCIDENTAL, OR CONSEQUENTIAL
// DAMAGES, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF THE USE OR INABILITY TO USE THE FONT SOFTWARE OR FROM
// OTHER DEALINGS IN THE FONT SOFTWARE.
//
// react-dom@19.3.1(MIT)
//
// MIT License
//
// Copyright (c) Meta Platforms, Inc. and affiliates.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
//
// react@19.3.1(MIT)
//
// MIT License
//
// Copyright (c) Meta Platforms, Inc. and affiliates.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
