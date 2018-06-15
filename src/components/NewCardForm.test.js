import React from 'react';
import { shallow } from 'enzyme';
import NewCardForm from './NewCardForm';

describe('NewCardForm', () => {
  test('that it matches an existing snapshot', () => {
    const wrapper = shallow(<NewCardForm addCardCallback={ ()=> {} }/>);
    expect(wrapper).toMatchSnapshot();
  })

  test('when a user enters a message in the text field the field is updated', () => {
    const wrapper = shallow(<NewCardForm addCardCallback={ ()=> {} }/>);
    let textField = wrapper.find('textarea')
    textField.simulate('change', {
      target: {
        name: 'text',
        value: 'this is a test note',
      },
    });
    wrapper.update();
    textField = wrapper.find('textarea')
    expect(textField.getElement().props.value).toEqual('this is a test note');
  });

  test('NewCardForm can submit', () => {
    const mockAddCardCallback = jest.fn();
    const wrapper = shallow(<NewCardForm addCardCallback={ mockAddCardCallback } />);
    wrapper.find('textarea').simulate('change', {
      target: {
        name: 'text',
        value: 'adding message',
      }
    });
    wrapper.update();
    wrapper.find('form').simulate('submit', {
      preventDefault: () => {},
    })
    wrapper.update();
    const textField = wrapper.find('textarea')
    expect(textField.getElement().props.value).toEqual('');
    expect(mockAddCardCallback).toHaveBeenCalled();
    expect(mockAddCardCallback.mock.calls[0][0]).toEqual({
      text: 'adding message',
      emoji: '',
    });
  });
});
