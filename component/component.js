/*!!!!!!!!!!!Do not change anything between here (the DRIVERNAME placeholder will be automatically replaced at buildtime)!!!!!!!!!!!*/
import NodeDriver from 'shared/mixins/node-driver';

// do not remove LAYOUT, it is replaced at build time with a base64 representation of the template of the hbs template
// we do this to avoid converting template to a js file that returns a string and the cors issues that would come along with that
const LAYOUT;
/*!!!!!!!!!!!DO NOT CHANGE END!!!!!!!!!!!*/


/*!!!!!!!!!!!GLOBAL CONST START!!!!!!!!!!!*/
// EMBER API Access - if you need access to any of the Ember API's add them here in the same manner rather then import them via modules, since the dependencies exist in rancher we dont want to expor the modules in the amd def
const computed     = Ember.computed;
const observer     = Ember.observer;
const get          = Ember.get;
const set          = Ember.set;
const setProperties= Ember.setProperties;
const alias        = Ember.computed.alias;
const service      = Ember.inject.service;
const EmberPromise = Ember.RSVP.Promise;
const all          = Ember.RSVP.all;
const next         = Ember.run.next;
/*!!!!!!!!!!!GLOBAL CONST END!!!!!!!!!!!*/

const languages = {
  'en-us':   {"nodeDriver":{"harvester":{"cloudconfig":{"label":"Cloud Config YAML"},"imageName":{"label":"Image"},"diskBus":{"label":"Bus"},"access":{"title":"1. Account Access","detail":"Configure where to find the Harvester server"},"instance":{"title":"2. Instance Options","detail":"Choose the size and OS of the virtual machine"},"host":{"label":"Harvester Host","placeholder":"harvester.domain.com"},"port":{"label":"Port"},"username":{"label":"Username"},"sshUser":{"label":"SSH User"},"password":{"label":"Password"},"cpuCount":{"label":"CPUs","unit":"{cores, plural, =1 {Core} other {Cores}}"},"memorySize":{"label":"Memory","unit":"GiB"},"diskSize":{"label":"Disk","unit":"GiB"},"cloudConfig":{"label":"Cloud config"},"cloudinit":{"label":"Cloud Init"}}}},
  'zh-hans': {"nodeDriver":{"harvester":{"cloudconfig":{"label":"Cloud Config YAML"},"imageName":{"label":"镜像"},"diskBus":{"label":"Bus"},"access":{"title":"1. 帐户访问","detail":"配置在哪里查找 Harvester 服务器"},"instance":{"title":"2. 实例配置","detail":"选择虚拟机的大小和操作系统"},"host":{"label":"Harvester 服务器","placeholder":"Harvester主机名/IP"},"port":{"label":"端口"},"username":{"label":"用户名"},"sshUser":{"label":"SSH 名称"},"password":{"label":"密码"},"cpuCount":{"label":"CPUs","unit":"{cores, plural, =1 {Core} other {Cores}}"},"memorySize":{"label":"内存","unit":"GiB"},"diskSize":{"label":"磁盘","unit":"GiB"},"cloudConfig":{"label":"Cloud config"},"cloudinit":{"label":"Cloud Init"}}}}
};

const BUS_OPTION = [{
  label: 'VirtIO',
  value: 'virtio'
},
{
  label: 'SATA',
  value: 'sata'
},
{
  label: 'SCSI',
  value: 'scsi'
}];

/*!!!!!!!!!!!DO NOT CHANGE START!!!!!!!!!!!*/
export default Ember.Component.extend(NodeDriver, {
  driverName: '%%DRIVERNAME%%',
  config:     alias('model.%%DRIVERNAME%%Config'),
  app:        service(),

  busContent:     BUS_OPTION,
  configField:    'harvesterConfig',
  lanChanged:     null,
  refresh:        false,

  init() {
    // This does on the fly template compiling, if you mess with this :cry:
    const decodedLayout = window.atob(LAYOUT);
    const template      = Ember.HTMLBars.compile(decodedLayout, {
      moduleName: 'nodes/components/driver-%%DRIVERNAME%%/template'
    });
    set(this,'layout', template);

    this._super(...arguments);

    const lang = get(this, 'session.language');
    get(this, 'intl.locale');
    this.loadLanguage(lang);


  },
  /*!!!!!!!!!!!DO NOT CHANGE END!!!!!!!!!!!*/

  // Write your component here, starting with setting 'model' to a machine with your config populated
  bootstrap: function() {
    // bootstrap is called by rancher ui on 'init', you're better off doing your setup here rather then the init function to ensure everything is setup correctly
    let config = get(this, 'globalStore').createRecord({
      type: '%%DRIVERNAME%%Config',
      host:         '',
      port:         30443,
      username:     '',
      password:     '',
      cpuCount:     2,
      memorySize:   4,
      diskSize:     10,
      diskBus:      'virtio',
      imageName:    '',
      sshUser:      '',
      cloudConfig:  '#cloud-config\n\n',
    });

    set(this, 'model.%%DRIVERNAME%%Config', config);
  },

  // Add custom validation beyond what can be done from the config API schema
  validate() {
    // Get generic API validation errors
    this._super();
    var errors = get(this, 'errors')||[];
    const intl = get(this, 'intl');

    if ( !get(this, 'model.name') ) {
      errors.push(intl.t("nodeDriver.nameError"));
    }

    // Add more specific errors
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
    // Set the array of errors for display,
    // and return true if saving should continue.
    if ( get(errors, 'length') ) {
      set(this, 'errors', errors);
      return false;
    } else {
      set(this, 'errors', null);
      return true;
    }
  },

  // Any computed properties or custom logic can go here
  loadLanguage(lang) {
    const translation = languages[lang] || languages['en-us'];
    const intl = get(this, 'intl');

    if (intl.addTranslation) {
      intl.addTranslation(lang, 'nodeDriver.harvester', translation.nodeDriver.harvester);
    } else {
      intl.addTranslations(lang, translation);
    }
    intl.translationsFor(lang);
    set(this, 'refresh', false);
    next(() => {
      set(this, 'refresh', true);
      set(this, 'lanChanged', +new Date());
    });
  },

  languageDidChanged: observer('intl.locale', function() {
    const lang = get(this, 'intl.locale');
    if (lang) {
      this.loadLanguage(lang[0]);
    }
  }),
});
