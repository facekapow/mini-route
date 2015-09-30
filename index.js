'use strict';

var url = require('url');

function MiniRoute(server, opts) {
  var self = this;

  this._routes = {};

  var methods = [
    'checkout',
    'connect',
    'copy',
    'delete',
    'get',
    'head',
    'lock',
    'merge',
    'mkactivity',
    'mkcol',
    'move',
    'm-search',
    'notify',
    'options',
    'patch',
    'post',
    'propfind',
    'proppatch',
    'purge',
    'put',
    'report',
    'search',
    'subscribe',
    'trace',
    'unlock',
    'unsubscribe'
  ];

  for (var i = 0; i < methods.length; i++) {
    this._routes[methods[i]] = {};
  }

  this['checkout'] = function(path, handler) {
    if (!self._routes['checkout'][path]) {
      self._routes['checkout'][path] = [];
    }
    self._routes['checkout'][path].push(handler);
  }

  this['connect'] = function(path, handler) {
    if (!self._routes['connect'][path]) {
      self._routes['connect'][path] = [];
    }
    self._routes['connect'][path].push(handler);
  }

  this['copy'] = function(path, handler) {
    if (!self._routes['copy'][path]) {
      self._routes['copy'][path] = [];
    }
    self._routes['copy'][path].push(handler);
  }

  this['delete'] = function(path, handler) {
    if (!self._routes['delete'][path]) {
      self._routes['delete'][path] = [];
    }
    self._routes['delete'][path].push(handler);
  }

  this['get'] = function(path, handler) {
    if (!self._routes['get'][path]) {
      self._routes['get'][path] = [];
    }
    self._routes['get'][path].push(handler);
  }

  this['head'] = function(path, handler) {
    if (!self._routes['head'][path]) {
      self._routes['head'][path] = [];
    }
    self._routes['head'][path].push(handler);
  }

  this['lock'] = function(path, handler) {
    if (!self._routes['lock'][path]) {
      self._routes['lock'][path] = [];
    }
    self._routes['lock'][path].push(handler);
  }

  this['merge'] = function(path, handler) {
    if (!self._routes['merge'][path]) {
      self._routes['merge'][path] = [];
    }
    self._routes['merge'][path].push(handler);
  }

  this['mkactivity'] = function(path, handler) {
    if (!self._routes['mkactivity'][path]) {
      self._routes['mkactivity'][path] = [];
    }
    self._routes['mkactivity'][path].push(handler);
  }

  this['mkcol'] = function(path, handler) {
    if (!self._routes['mkcol'][path]) {
      self._routes['mkcol'][path] = [];
    }
    self._routes['mkcol'][path].push(handler);
  }

  this['move'] = function(path, handler) {
    if (!self._routes['move'][path]) {
      self._routes['move'][path] = [];
    }
    self._routes['move'][path].push(handler);
  }

  this['m-search'] = function(path, handler) {
    if (!self._routes['m-search'][path]) {
      self._routes['m-search'][path] = [];
    }
    self._routes['m-search'][path].push(handler);
  }

  this['notify'] = function(path, handler) {
    if (!self._routes['notify'][path]) {
      self._routes['notify'][path] = [];
    }
    self._routes['notify'][path].push(handler);
  }

  this['options'] = function(path, handler) {
    if (!self._routes['options'][path]) {
      self._routes['options'][path] = [];
    }
    self._routes['options'][path].push(handler);
  }

  this['patch'] = function(path, handler) {
    if (!self._routes['patch'][path]) {
      self._routes['patch'][path] = [];
    }
    self._routes['patch'][path].push(handler);
  }

  this['post'] = function(path, handler) {
    if (!self._routes['post'][path]) {
      self._routes['post'][path] = [];
    }
    self._routes['post'][path].push(handler);
  }

  this['propfind'] = function(path, handler) {
    if (!self._routes['propfind'][path]) {
      self._routes['propfind'][path] = [];
    }
    self._routes['propfind'][path].push(handler);
  }

  this['proppatch'] = function(path, handler) {
    if (!self._routes['proppatch'][path]) {
      self._routes['proppatch'][path] = [];
    }
    self._routes['proppatch'][path].push(handler);
  }

  this['purge'] = function(path, handler) {
    if (!self._routes['purge'][path]) {
      self._routes['purge'][path] = [];
    }
    self._routes['purge'][path].push(handler);
  }

  this['put'] = function(path, handler) {
    if (!self._routes['put'][path]) {
      self._routes['put'][path] = [];
    }
    self._routes['put'][path].push(handler);
  }

  this['report'] = function(path, handler) {
    if (!self._routes['report'][path]) {
      self._routes['report'][path] = [];
    }
    self._routes['report'][path].push(handler);
  }

  this['search'] = function(path, handler) {
    if (!self._routes['search'][path]) {
      self._routes['search'][path] = [];
    }
    self._routes['search'][path].push(handler);
  }

  this['subscribe'] = function(path, handler) {
    if (!self._routes['subscribe'][path]) {
      self._routes['subscribe'][path] = [];
    }
    self._routes['subscribe'][path].push(handler);
  }

  this['trace'] = function(path, handler) {
    if (!self._routes['trace'][path]) {
      self._routes['trace'][path] = [];
    }
    self._routes['trace'][path].push(handler);
  }

  this['unlock'] = function(path, handler) {
    if (!self._routes['unlock'][path]) {
      self._routes['unlock'][path] = [];
    }
    self._routes['unlock'][path].push(handler);
  }

  this['unsubscribe'] = function(path, handler) {
    if (!self._routes['unsubscribe'][path]) {
      self._routes['unsubscribe'][path] = [];
    }
    self._routes['unsubscribe'][path].push(handler);
  }

  this.remove = function(method, path, cb) {
    if (!self._routes[method][path]) {
      if (cb) cb(new Error('no such route.'));
      return;
    }
    self._routes[method][path] = null;
    cb(null);
  };

  server.on('request', function(req, res) {
    var method = req.method.toLowerCase();
    var path = url.parse(req.url).pathname;
    if (self._routes[method][path]) {
      for (var i = 0; i < self._routes[method][path].length; i++) {
        self._routes[method][path][i](req, res);
      }
    }
    if (opts && opts.notFound && opts.notFound === true) {
      if (!self._routes[method][path]) {
        res.statusCode = 404;
        res.end('404 not found.');
      }
    }
  });
}

module.exports = MiniRoute;
