import { jsdom } from 'jsdom'; //eslint-disable-line
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import faker from 'faker';
import * as chai from 'chai';
import sinon from 'sinon';
import moxios from 'moxios';
import { mount, shallow, render } from 'enzyme';

const exposedProperties = ['window', 'navigator', 'document'];

global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.window.localStorage = {
  getItem() {
    return 'abc';
  }
};

global.sinon = sinon;
global.expect = chai.expect;
global.thunk = thunk;
global.configureMockStore = configureMockStore;
global.nock = nock;
global.mount = mount;
global.shallow = shallow;
global.render = render;
global.faker = faker;
global.moxios = moxios;
global.navigator = {
  userAgent: 'node.js'
};
