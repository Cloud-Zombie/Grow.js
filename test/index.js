import Grow from '../lib/index';

/*
  Basic tests:
  * Events
*/

global.expect = require('chai').expect;

(function setup () {
  beforeEach(function() {

    // Setup test things
    // In the future we can test multiple different kinds of things!
    global.thing1 = {
      name: 'Light', // The display name for the thing.
      desription: 'An LED light with a basic on/off api.',
      // The username of the account you want this device to be added to.
      username: 'jake2@gmail.com',
      // Properties can be updated by the API
      properties: {
        state: 'off'
      },
      // Actions are the API of the thing.
      actions: {
        turn_light_on: {
          name: 'On', // Display name for the action
          description: 'Turns the light on.', // Optional description
          schedule: 'at 9:00am', // Optional scheduling using later.js
          function: function () {
            // The implementation of the action.
            return 'Light on';
          }
        },
        turn_light_off: {
          name: 'off',
          schedule: 'at 8:30pm', // Run this function at 8:30pm
          function: function () {
            return 'Light off';
          }
        },
        light_data: {
          name: 'Log light data',
          // type and template need for visualization component... HACK. 
          type: 'light',
          template: 'sensor',
          schedule: 'every 1 second',
          function: function () {
            return 'light data';
          }
        }
      }
    }
  });

  afterEach(function() {
    delete global.thing1;
  });
})();


describe('A feature test', () => {
  it('should have setup actions correctly', () => {
    let GrowInstance = new Grow(thing1);
    expect(GrowInstance.thing.callAction('turn_light_on')).to.equal('Light on');
    expect(GrowInstance.thing.callAction('turn_light_off')).to.equal('Light off');
  });

  it('should have setup actions correctly', () => {
    let GrowInstance = new Grow(thing1);
    GrowInstance.updateActionProperty('turn_light_on', 'schedule', 'at 10:00am');
    console.log(GrowInstance);
  });

  // TODO
  // it('should have setup events correctly', () => {
  //   var GrowInstance = new Grow(thing1);
  //   // expect(thing.constructor).to.have.been.calledOnce;
  // });

});