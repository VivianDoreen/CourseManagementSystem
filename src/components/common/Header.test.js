import React from 'react';
import { shallow, mount } from 'enzyme';
import Header from './Header';
import { MemoryRouter } from 'react-router-dom';

it('contains three navLinks with shallow', () => {
  const wrapper = shallow(<Header />);
  // console.log(wrapper.debug());
  expect(wrapper.find('NavLink').length).toBe(3);
});

it('contains three navlinks with mount', () => {
  const wrapper = mount(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  );
  expect(wrapper.find('a').length).toBe(3);
});
