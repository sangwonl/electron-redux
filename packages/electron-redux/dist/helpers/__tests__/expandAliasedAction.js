"use strict";

var _createAliasedAction = _interopRequireDefault(require("../createAliasedAction"));

var _expandAliasedAction = _interopRequireDefault(require("../expandAliasedAction"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

jest.unmock('../../registry/alias');
jest.unmock('../createAliasedAction');
jest.unmock('../expandAliasedAction');
describe('expandAliasedAction', function () {
  var aliasedAction = (0, _createAliasedAction["default"])('TEST', function () {
    return action;
  });
  it('expands aliased action', function () {
    var action = {
      type: 'TEST'
    };

    var actionCreator = function actionCreator() {
      return action;
    };

    var aliasedAction = (0, _createAliasedAction["default"])('TEST', actionCreator);
    expect((0, _expandAliasedAction["default"])(aliasedAction())).toEqual(action);
  });
  it('expands aliased action forwarding arguments', function () {
    var action = {
      type: 'TEST',
      payload: {
        foo: 'bar'
      }
    };

    var actionCreator = function actionCreator(payload) {
      return {
        type: 'TEST',
        payload: payload
      };
    };

    var aliasedAction = (0, _createAliasedAction["default"])('TEST', actionCreator);
    expect((0, _expandAliasedAction["default"])(aliasedAction({
      foo: 'bar'
    }))).toEqual(action);
  });
  it('throws an error if no metadata is found', function () {
    var action = {
      type: 'TEST'
    };
    expect(function () {
      return (0, _expandAliasedAction["default"])(action);
    }).toThrowError('No trigger defined');
  });
  it('throws an error if no metadata trigger is found', function () {
    var action = {
      type: 'TEST',
      meta: {}
    };
    expect(function () {
      return (0, _expandAliasedAction["default"])(action);
    }).toThrowError('No trigger defined');
  });
  it('throws an error if no alias is found for given metadata trigger', function () {
    var action = {
      type: 'TEST',
      meta: {
        trigger: 'DOES_NOT_EXIST'
      }
    };
    expect(function () {
      return (0, _expandAliasedAction["default"])(action);
    }).toThrowError("Trigger alias DOES_NOT_EXIST not found");
  });
});