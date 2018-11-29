import Vue from 'vue'
import VeeValidate, {Validator} from 'vee-validate'

Vue.use(VeeValidate);

Validator.extend('truthy', {
  getMessage: field => 'The ' + field + ' value is not truthy.',
  validate: value => { return value.length === 11 && (/^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)) }
});

let instance = new Validator({ trueField: 'truthy' });

instance.extend('falsy', (value) => { return value.length === 11 && (/^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)) });

instance.attach({
  name: 'falseField',
  rules: 'falsy'
});
