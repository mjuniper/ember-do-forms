import Ember from 'ember';
import layout from '../templates/components/do-control';
import hasOnlyEmberView from '../utils/has-only-ember-view';
import setDataTestSelector from '../utils/set-data-test-selector';

const {
  computed,
  Component,
  get,
  inject: { service },
  isEmpty
} = Ember;

const DoControlComponent = Component.extend({
  layout,
  tagName: '',

  config: service('ember-do-forms/config'),

  controlType: 'text',

  // For one-way-select
  promptIsSelectable: false,

  oneWayControl: computed('controlType', function() {
    return `one-way-${get(this, 'controlType')}`;
  }).readOnly(),

  init() {
    setDataTestSelector(this, {
      testSelector: 'do-control',
      autoTestSelector: get(this, 'config.autoDataTestSelectors'),
      testSelectorValue: get(this, 'propertyName')
    });

    this._super(...arguments);
    let defaultClasses = get(this, 'config.defaultClasses.control');

    if (isEmpty(this.classNames) || hasOnlyEmberView(this.classNames)) {
      this.classNames = this.classNames.concat(defaultClasses);
    }
  }
});

DoControlComponent.reopenClass({
  positionalParams: ['controlType', 'value']
});

export default DoControlComponent;
