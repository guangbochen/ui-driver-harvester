"use strict";

define("nodes/components/driver-harvester/component", ["exports", "shared/mixins/node-driver"], function (exports, _nodeDriver) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var LAYOUT = "PHNlY3Rpb24gY2xhc3M9Imhvcml6b250YWwtZm9ybSI+CiAge3sjYWNjb3JkaW9uLWxpc3Qgc2hvd0V4cGFuZEFsbD1mYWxzZSBhcyB8IGFsIGV4cGFuZEZuIHx9fQogICAge3shLS0gVGhpcyBsaW5lIHNob3dzIHRoZSBkcml2ZXIgdGl0bGUgd2hpY2ggeW91IGRvbid0IGhhdmUgdG8gY2hhbmdlIGl0IC0tfX0KICAgIDxkaXYgY2xhc3M9Im92ZXItaHIgbWItMjAiPjxzcGFuPnt7ZHJpdmVyT3B0aW9uc1RpdGxlfX08L3NwYW4+PC9kaXY+CgogICAge3sjYWNjb3JkaW9uLWxpc3QtaXRlbQogICAgICB0aXRsZT0odCAibm9kZURyaXZlci5oYXJ2ZXN0ZXIuYWNjZXNzLnRpdGxlIikKICAgICAgZGV0YWlsPSh0ICJub2RlRHJpdmVyLmhhcnZlc3Rlci5hY2Nlc3MuZGV0YWlsIikKICAgICAgZXhwYW5kQWxsPWV4cGFuZEFsbAogICAgICBleHBhbmQ9KGFjdGlvbiBleHBhbmRGbikKICAgICAgZXhwYW5kT25Jbml0PXRydWUKICAgIH19CgogICAgICA8ZGl2IGNsYXNzPSJyb3ciPgogICAgICAgIDxkaXYgY2xhc3M9ImNvbCBzcGFuLTYiPgogICAgICAgICAgPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPgogICAgICAgICAgICB7e3QgIm5vZGVEcml2ZXIuaGFydmVzdGVyLmhvc3QubGFiZWwifX17e2ZpZWxkLXJlcXVpcmVkfX0KICAgICAgICAgIDwvbGFiZWw+CiAgICAgICAgICB7e2lucHV0CiAgICAgICAgICAgIGNsYXNzTmFtZXM9ImZvcm0tY29udHJvbCIKICAgICAgICAgICAgaWQ9InNlcnZlci11cmwiCiAgICAgICAgICAgIHZhbHVlPWNvbmZpZy5ob3N0CiAgICAgICAgICAgIHBsYWNlaG9sZGVyPSh0ICJub2RlRHJpdmVyLmhhcnZlc3Rlci5ob3N0LnBsYWNlaG9sZGVyIikKICAgICAgICAgIH19CiAgICAgICAgPC9kaXY+CiAgICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tNiI+CiAgICAgICAgICA8bGFiZWwgY2xhc3M9ImFjYy1sYWJlbCI+CiAgICAgICAgICAgIHt7dCAibm9kZURyaXZlci5oYXJ2ZXN0ZXIucG9ydC5sYWJlbCJ9fXt7ZmllbGQtcmVxdWlyZWR9fQogICAgICAgICAgPC9sYWJlbD4KICAgICAgICAgIHt7aW5wdXQtaW50ZWdlcgogICAgICAgICAgICBtaW49MQogICAgICAgICAgICBtYXg9NjU1MzUKICAgICAgICAgICAgY2xhc3M9ImZvcm0tY29udHJvbCIKICAgICAgICAgICAgdmFsdWU9Y29uZmlnLnBvcnQKICAgICAgICAgIH19CiAgICAgICAgPC9kaXY+CiAgICAgIDwvZGl2PgoKICAgICAgPGRpdiBjbGFzcz0icm93Ij4KICAgICAgICA8ZGl2IGNsYXNzPSJjb2wgc3Bhbi02Ij4KICAgICAgICAgIDxsYWJlbCBjbGFzcz0iYWNjLWxhYmVsIj4KICAgICAgICAgICAge3t0ICJub2RlRHJpdmVyLmhhcnZlc3Rlci51c2VybmFtZS5sYWJlbCJ9fXt7ZmllbGQtcmVxdWlyZWR9fQogICAgICAgICAgPC9sYWJlbD4KICAgICAgICAgIHt7aW5wdXQKICAgICAgICAgICAgdHlwZT0idGV4dCIKICAgICAgICAgICAgdmFsdWU9Y29uZmlnLnVzZXJuYW1lCiAgICAgICAgICAgIGNsYXNzTmFtZXM9ImZvcm0tY29udHJvbCIKICAgICAgICAgIH19CiAgICAgICAgPC9kaXY+CgogICAgICAgIDxkaXYgY2xhc3M9ImNvbCBzcGFuLTYiPgogICAgICAgICAgPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPgogICAgICAgICAgICB7e3QgIm5vZGVEcml2ZXIuaGFydmVzdGVyLnBhc3N3b3JkLmxhYmVsIn19e3tmaWVsZC1yZXF1aXJlZH19CiAgICAgICAgICA8L2xhYmVsPgogICAgICAgICAge3tpbnB1dAogICAgICAgICAgICB0eXBlPSJwYXNzd29yZCIKICAgICAgICAgICAgdmFsdWU9Y29uZmlnLnBhc3N3b3JkCiAgICAgICAgICAgIGNsYXNzTmFtZXM9ImZvcm0tY29udHJvbCIKICAgICAgICAgIH19CiAgICAgICAgPC9kaXY+CiAgICAgIDwvZGl2PgoKICAgIHt7L2FjY29yZGlvbi1saXN0LWl0ZW19fQoKICAgIHt7I2FjY29yZGlvbi1saXN0LWl0ZW0KICAgICAgdGl0bGU9KHQgIm5vZGVEcml2ZXIuaGFydmVzdGVyLmluc3RhbmNlLnRpdGxlIikKICAgICAgZGV0YWlsPSh0ICJub2RlRHJpdmVyLmhhcnZlc3Rlci5pbnN0YW5jZS5kZXRhaWwiKQogICAgICBleHBhbmRBbGw9ZXhwYW5kQWxsCiAgICAgIGV4cGFuZD0oYWN0aW9uIGV4cGFuZEZuKQogICAgICBleHBhbmRPbkluaXQ9dHJ1ZQogICAgfX0KICAgICAgPGRpdiBjbGFzcz0icm93Ij4KICAgICAgICA8ZGl2IGNsYXNzPSJjb2wgc3Bhbi02Ij4KICAgICAgICAgIDxsYWJlbCBjbGFzcz0iYWNjLWxhYmVsIj4KICAgICAgICAgICAge3t0ICJub2RlRHJpdmVyLmhhcnZlc3Rlci5jcHVDb3VudC5sYWJlbCJ9fXt7ZmllbGQtcmVxdWlyZWR9fQogICAgICAgICAgPC9sYWJlbD4KICAgICAgICAgIDxkaXYgY2xhc3M9ImlucHV0LWdyb3VwIj4KICAgICAgICAgICAge3tpbnB1dC1pbnRlZ2VyCiAgICAgICAgICAgICAgbWluPTEKICAgICAgICAgICAgICBtYXg9MzIKICAgICAgICAgICAgICB2YWx1ZT1jb25maWcuY3B1Q291bnQKICAgICAgICAgICAgICBjbGFzc05hbWVzPSJmb3JtLWNvbnRyb2wiCiAgICAgICAgICAgIH19CiAgICAgICAgICAgIDxkaXYgY2xhc3M9ImlucHV0LWdyb3VwLWFkZG9uIGJnLWRlZmF1bHQiPgogICAgICAgICAgICAgIHt7dCAibm9kZURyaXZlci5oYXJ2ZXN0ZXIuY3B1Q291bnQudW5pdCIgY29yZXM9Y29uZmlnLmNwdUNvdW50fX0KICAgICAgICAgICAgPC9kaXY+CiAgICAgICAgICA8L2Rpdj4KICAgICAgICA8L2Rpdj4KCiAgICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tNiI+CiAgICAgICAgICA8bGFiZWwgY2xhc3M9ImFjYy1sYWJlbCI+CiAgICAgICAgICAgIHt7dCAibm9kZURyaXZlci5oYXJ2ZXN0ZXIubWVtb3J5U2l6ZS5sYWJlbCJ9fXt7ZmllbGQtcmVxdWlyZWR9fQogICAgICAgICAgPC9sYWJlbD4KICAgICAgICAgIDxkaXYgY2xhc3M9ImlucHV0LWdyb3VwIj4KICAgICAgICAgICAge3tpbnB1dC1pbnRlZ2VyCiAgICAgICAgICAgICAgbWluPTEKICAgICAgICAgICAgICB2YWx1ZT1jb25maWcubWVtb3J5U2l6ZQogICAgICAgICAgICAgIGNsYXNzTmFtZXM9ImZvcm0tY29udHJvbCIKICAgICAgICAgICAgfX0KICAgICAgICAgICAgPGRpdiBjbGFzcz0iaW5wdXQtZ3JvdXAtYWRkb24gYmctZGVmYXVsdCI+CiAgICAgICAgICAgICAge3t0ICJub2RlRHJpdmVyLmhhcnZlc3Rlci5tZW1vcnlTaXplLnVuaXQifX0KICAgICAgICAgICAgPC9kaXY+CiAgICAgICAgICA8L2Rpdj4KICAgICAgICA8L2Rpdj4KICAgICAgPC9kaXY+CgogICAgICA8ZGl2IGNsYXNzPSJyb3ciPgogICAgICAgIDxkaXYgY2xhc3M9ImNvbCBzcGFuLTYiPgogICAgICAgICAgPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPgogICAgICAgICAgICB7e3QgIm5vZGVEcml2ZXIuaGFydmVzdGVyLmRpc2tTaXplLmxhYmVsIn19e3tmaWVsZC1yZXF1aXJlZH19CiAgICAgICAgICA8L2xhYmVsPgogICAgICAgICAgPGRpdiBjbGFzcz0iaW5wdXQtZ3JvdXAiPgogICAgICAgICAgICB7e2lucHV0LWludGVnZXIKICAgICAgICAgICAgICBtaW49MQogICAgICAgICAgICAgIHZhbHVlPWNvbmZpZy5kaXNrU2l6ZQogICAgICAgICAgICAgIGNsYXNzTmFtZXM9ImZvcm0tY29udHJvbCIKICAgICAgICAgICAgfX0KICAgICAgICAgICAgPGRpdiBjbGFzcz0iaW5wdXQtZ3JvdXAtYWRkb24gYmctZGVmYXVsdCI+CiAgICAgICAgICAgICAge3t0ICJub2RlRHJpdmVyLmhhcnZlc3Rlci5kaXNrU2l6ZS51bml0In19CiAgICAgICAgICAgIDwvZGl2PgogICAgICAgICAgPC9kaXY+CiAgICAgICAgPC9kaXY+CgogICAgICAgIDxkaXYgY2xhc3M9ImNvbCBzcGFuLTYiPgogICAgICAgICAgPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPgogICAgICAgICAgICB7e3QgIm5vZGVEcml2ZXIuaGFydmVzdGVyLmRpc2tCdXMubGFiZWwifX17e2ZpZWxkLXJlcXVpcmVkfX0KICAgICAgICAgIDwvbGFiZWw+CiAgICAgICAgICA8TmV3U2VsZWN0CiAgICAgICAgICAgIEBjbGFzcz0iZm9ybS1jb250cm9sIgogICAgICAgICAgICBAdXNlQ29udGVudEZvckRlZmF1bHRWYWx1ZT17e3RydWV9fQogICAgICAgICAgICBAY29udGVudD17e2J1c0NvbnRlbnR9fQogICAgICAgICAgICBAdmFsdWU9e3tjb25maWcuZGlza0J1c319CiAgICAgICAgICAvPgogICAgICAgIDwvZGl2PgogICAgICA8L2Rpdj4KCiAgICAgIDxkaXYgY2xhc3M9InJvdyI+CiAgICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tNiI+CiAgICAgICAgICA8bGFiZWwgY2xhc3M9ImFjYy1sYWJlbCI+CiAgICAgICAgICAgIHt7dCAibm9kZURyaXZlci5oYXJ2ZXN0ZXIuaW1hZ2VOYW1lLmxhYmVsIn19e3tmaWVsZC1yZXF1aXJlZH19CiAgICAgICAgICA8L2xhYmVsPgogICAgICAgICAge3tpbnB1dAogICAgICAgICAgICB0eXBlPSJ0ZXh0IgogICAgICAgICAgICB2YWx1ZT1jb25maWcuaW1hZ2VOYW1lCiAgICAgICAgICAgIGNsYXNzTmFtZXM9ImZvcm0tY29udHJvbCIKICAgICAgICAgIH19CiAgICAgICAgPC9kaXY+CgogICAgICAgIDxkaXYgY2xhc3M9ImNvbCBzcGFuLTYiPgogICAgICAgICAgPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPgogICAgICAgICAgICB7e3QgIm5vZGVEcml2ZXIuaGFydmVzdGVyLnNzaFVzZXIubGFiZWwifX17e2ZpZWxkLXJlcXVpcmVkfX0KICAgICAgICAgIDwvbGFiZWw+CiAgICAgICAgICB7e2lucHV0CiAgICAgICAgICAgIHR5cGU9InRleHQiCiAgICAgICAgICAgIHZhbHVlPWNvbmZpZy5zc2hVc2VyCiAgICAgICAgICAgIGNsYXNzTmFtZXM9ImZvcm0tY29udHJvbCIKICAgICAgICAgIH19CiAgICAgICAgPC9kaXY+CiAgICAgIDwvZGl2PgogICAge3svYWNjb3JkaW9uLWxpc3QtaXRlbX19CiAgICAKICB7ey9hY2NvcmRpb24tbGlzdH19CgogIDxkaXYgY2xhc3M9Im92ZXItaHIiPgogICAgPHNwYW4+CiAgICAgIHt7dGVtcGxhdGVPcHRpb25zVGl0bGV9fQogICAgPC9zcGFuPgogIDwvZGl2PgoKICB7e2Zvcm0tbmFtZS1kZXNjcmlwdGlvbgogICAgbW9kZWw9bW9kZWwKICAgIG5hbWVSZXF1aXJlZD10cnVlCiAgICByb3dDbGFzcz0icm93IG1iLTEwIgogIH19CgogIHt7Zm9ybS11c2VyLWxhYmVscwogICAgaW5pdGlhbExhYmVscz1sYWJlbFJlc291cmNlLmxhYmVscwogICAgc2V0TGFiZWxzPShhY3Rpb24gInNldExhYmVscyIpCiAgICBleHBhbmQ9KGFjdGlvbiBleHBhbmRGbikKICB9fQoKICB7e2Zvcm0tbm9kZS10YWludHMKICAgIG1vZGVsPW1vZGVsCiAgICBleHBhbmQ9KGFjdGlvbiBleHBhbmRGbikKICB9fQoKICB7e2Zvcm0tZW5naW5lLW9wdHMKICAgIG1hY2hpbmU9bW9kZWwKICAgIHNob3dFbmdpbmVVcmw9c2hvd0VuZ2luZVVybAogIH19CgogIHt7dG9wLWVycm9ycyBlcnJvcnM9ZXJyb3JzfX0KCiAge3tzYXZlLWNhbmNlbCBzYXZlPShhY3Rpb24gInNhdmUiKSBjYW5jZWw9KGFjdGlvbiAiY2FuY2VsIikgZWRpdGluZz1lZGl0aW5nIH19Cjwvc2VjdGlvbj4=";
  var computed = Ember.computed;
  var observer = Ember.observer;
  var get = Ember.get;
  var set = Ember.set;
  var setProperties = Ember.setProperties;
  var alias = Ember.computed.alias;
  var service = Ember.inject.service;
  var EmberPromise = Ember.RSVP.Promise;
  var all = Ember.RSVP.all;
  var next = Ember.run.next;
  var languages = {
    'en-us': {
      "nodeDriver": {
        "harvester": {
          "cloudconfig": {
            "label": "Cloud Config YAML"
          },
          "imageName": {
            "label": "Image"
          },
          "diskBus": {
            "label": "Bus"
          },
          "access": {
            "title": "1. Account Access",
            "detail": "Configure where to find the Harvester server"
          },
          "instance": {
            "title": "2. Instance Options",
            "detail": "Choose the size and OS of the virtual machine"
          },
          "host": {
            "label": "Harvester Host",
            "placeholder": "harvester.domain.com"
          },
          "port": {
            "label": "Port"
          },
          "username": {
            "label": "Username"
          },
          "sshUser": {
            "label": "SSH User"
          },
          "password": {
            "label": "Password"
          },
          "cpuCount": {
            "label": "CPUs",
            "unit": "{cores, plural, =1 {Core} other {Cores}}"
          },
          "memorySize": {
            "label": "Memory",
            "unit": "GiB"
          },
          "diskSize": {
            "label": "Disk",
            "unit": "GiB"
          },
          "cloudConfig": {
            "label": "Cloud config"
          },
          "cloudinit": {
            "label": "Cloud Init"
          }
        }
      }
    },
    'zh-hans': {
      "nodeDriver": {
        "harvester": {
          "cloudconfig": {
            "label": "Cloud Config YAML"
          },
          "imageName": {
            "label": "镜像"
          },
          "diskBus": {
            "label": "Bus"
          },
          "access": {
            "title": "1. 帐户访问",
            "detail": "配置在哪里查找 Harvester 服务器"
          },
          "instance": {
            "title": "2. 实例配置",
            "detail": "选择虚拟机的大小和操作系统"
          },
          "host": {
            "label": "Harvester 服务器",
            "placeholder": "Harvester主机名/IP"
          },
          "port": {
            "label": "端口"
          },
          "username": {
            "label": "用户名"
          },
          "sshUser": {
            "label": "SSH 名称"
          },
          "password": {
            "label": "密码"
          },
          "cpuCount": {
            "label": "CPUs",
            "unit": "{cores, plural, =1 {Core} other {Cores}}"
          },
          "memorySize": {
            "label": "内存",
            "unit": "GiB"
          },
          "diskSize": {
            "label": "磁盘",
            "unit": "GiB"
          },
          "cloudConfig": {
            "label": "Cloud config"
          },
          "cloudinit": {
            "label": "Cloud Init"
          }
        }
      }
    }
  };
  var BUS_OPTION = [{
    label: 'VirtIO',
    value: 'virtio'
  }, {
    label: 'SATA',
    value: 'sata'
  }, {
    label: 'SCSI',
    value: 'scsi'
  }];
  exports.default = Ember.Component.extend(_nodeDriver.default, {
    driverName: 'harvester',
    config: alias('model.harvesterConfig'),
    app: service(),
    busContent: BUS_OPTION,
    configField: 'harvesterConfig',
    lanChanged: null,
    refresh: false,
    init: function init() {
      var decodedLayout = window.atob(LAYOUT);
      var template = Ember.HTMLBars.compile(decodedLayout, {
        moduleName: 'nodes/components/driver-harvester/template'
      });
      set(this, 'layout', template);

      this._super.apply(this, arguments);

      var lang = get(this, 'session.language');
      get(this, 'intl.locale');
      this.loadLanguage(lang);
    },
    bootstrap: function bootstrap() {
      var config = get(this, 'globalStore').createRecord({
        type: 'harvesterConfig',
        host: '',
        port: 30443,
        username: '',
        password: '',
        cpuCount: 2,
        memorySize: 4,
        diskSize: 10,
        diskBus: 'virtio',
        imageName: '',
        sshUser: '',
        cloudConfig: '#cloud-config\n\n'
      });
      set(this, 'model.harvesterConfig', config);
    },
    validate: function validate() {
      this._super();

      var errors = get(this, 'errors') || [];
      var intl = get(this, 'intl');

      if (!get(this, 'model.name')) {
        errors.push(intl.t("nodeDriver.nameError"));
      }

      if (!get(this, 'config.host')) {
        errors.push(intl.t('generic.required', {
          key: intl.t("nodeDriver.harvester.host.label")
        }));
      }

      if (!get(this, 'config.username')) {
        errors.push(intl.t('generic.required', {
          key: intl.t("nodeDriver.harvester.username.label")
        }));
      }

      if (!get(this, 'config.password')) {
        errors.push(intl.t('generic.required', {
          key: intl.t("nodeDriver.harvester.password.label")
        }));
      }

      if (!get(this, 'config.diskBus')) {
        errors.push(intl.t('generic.required', {
          key: intl.t("nodeDriver.harvester.diskBus.label")
        }));
      }

      if (!get(this, 'config.imageName')) {
        errors.push(intl.t('generic.required', {
          key: intl.t("nodeDriver.harvester.imageName.label")
        }));
      }

      if (!get(this, 'config.sshUser')) {
        errors.push(intl.t('generic.required', {
          key: intl.t("nodeDriver.harvester.sshUser.label")
        }));
      }

      if (get(errors, 'length')) {
        set(this, 'errors', errors);
        return false;
      } else {
        set(this, 'errors', null);
        return true;
      }
    },
    loadLanguage: function loadLanguage(lang) {
      var _this = this;

      var translation = languages[lang] || languages['en-us'];
      var intl = get(this, 'intl');

      if (intl.addTranslation) {
        intl.addTranslation(lang, 'nodeDriver.harvester', translation.nodeDriver.harvester);
      } else {
        intl.addTranslations(lang, translation);
      }

      intl.translationsFor(lang);
      set(this, 'refresh', false);
      next(function () {
        set(_this, 'refresh', true);
        set(_this, 'lanChanged', +new Date());
      });
    },
    languageDidChanged: observer('intl.locale', function () {
      var lang = get(this, 'intl.locale');

      if (lang) {
        this.loadLanguage(lang[0]);
      }
    })
  });
});;
"use strict";

define("ui/components/driver-harvester/component", ["exports", "nodes/components/driver-harvester/component"], function (exports, _component) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return _component.default;
    }
  });
});