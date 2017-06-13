/* global expect:true */
/* global shallow:true */

import React from 'react';//eslint-disable-line

import About from '../../src/components/static/About.component';

describe('<About />', () => {
  it('should have a div', () => {
    const wrapper = shallow(<About />);
    expect(wrapper.find('div')).to.have.length(1);
  });
});
