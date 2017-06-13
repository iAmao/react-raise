/* global expect:true */
/* global shallow:true */
/* global mount:true */

import React from 'react';//eslint-disable-line

import Home from '../../src/components/Home.component';

describe('<Home />', () => {
  it('should have a heading text', () => {
    const wrapper = shallow(
      <Home />
    );
    expect(wrapper.find('.heading')).to.have.length(1);
  });
});
