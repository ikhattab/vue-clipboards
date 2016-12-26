/*!
 * vue-clipboards v0.2.4
 * (c) 2016 卓文理 <531840344@qq.com>
 * Released under the MIT License.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.vueClipboard = factory());
}(this, (function () { 'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};





















var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

















var set = function set(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};

/**
 * @author: 卓文理
 * @email : 531840344@qq.com
 * @desc  : VueClipboard
 */

var Clipboard = require('clipboard');

if (!Clipboard) {
    throw new Error('[vue-clipboards] cannot locate Clipboard.');
}

var VueClipboard = function (Vue) {
    var clipboards = void 0;

    Vue.directive('clipboard', {
        bind: function bind(container, binding, vnode) {
            var value = binding.value;

            var option = {};

            if (value && typeof value === 'string') {
                option.text = function () {
                    return value;
                };
            }

            clipboards = new Clipboard(container, option);

            var componentOptions = vnode.componentOptions,
                data = vnode.data;

            var listeners = componentOptions ? componentOptions.listeners : null;
            var on = data ? data.on : null;
            var events = listeners ? listeners : on ? on : null;

            if (events && (typeof events === 'undefined' ? 'undefined' : _typeof(events)) === 'object' && Object.keys(events).length) {
                Object.keys(events).map(function (cb) {
                    return clipboards.on(cb, events[cb].fn);
                });
            }
        },
        unbind: function unbind() {
            if (clipboards && clipboards.destroy) {
                clipboards.destroy();
            }
        },

        update: function update(container, binding, vnode) {
            binding.def.unbind();
            binding.def.bind(container, binding, vnode);
        }
    });
};

/**
 * @author: 卓文理
 * @email : 531840344@qq.com
 * @desc  : index
 */

function plugin(Vue) {
    var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (plugin.installed) {
        console.warn('[vue-clipboards] already installed.');
    }

    VueClipboard(Vue);
}

if (typeof define === 'function' && define.amd) {
    define([], function () {
        return { plugin: plugin };
    });
} else if (window.Vue) {
    window.Vue.use(plugin);
}

return plugin;

})));
