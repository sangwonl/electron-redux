"use strict";

var _triggerAlias = _interopRequireDefault(require("../triggerAlias"));

var _alias = _interopRequireDefault(require("../../registry/alias"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

jest.unmock('../triggerAlias');
jest.unmock('../../helpers/expandAliasedAction');
describe('triggerAlias', function () {
  it('should pass an action through if not ALIAS', function () {
    var next = jest.fn();
    var action = {
      type: 'SOMETHING'
    };
    (0, _triggerAlias["default"])()(next)(action);
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(action);
  });
  it('should trigger an alias action', function () {
    var _expect;

    var next = jest.fn();
    var payload = [123];
    var action = {
      type: 'MY_ACTION',
      payload: 'awesome'
    };
    var trigger = jest.fn(function () {
      return action;
    });
    var aliasedAction = {
      type: 'ALIASED',
      payload: payload,
      meta: {
        trigger: 'MY_ACTION'
      }
    };

    _alias["default"].get.mockImplementation(function () {
      return trigger;
    });

    (0, _triggerAlias["default"])()(next)(aliasedAction);
    expect(trigger).toHaveBeenCalledTimes(1);

    (_expect = expect(trigger)).toHaveBeenCalledWith.apply(_expect, payload);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(action);
  });
  it('should trigger an alias action without payload', function () {
    var next = jest.fn();
    var action = {
      type: 'MY_ACTION',
      payload: 'awesome'
    };
    var trigger = jest.fn(function () {
      return action;
    });
    var aliasedAction = {
      type: 'ALIASED',
      meta: {
        trigger: 'MY_ACTION'
      }
    };

    _alias["default"].get.mockImplementation(function () {
      return trigger;
    });

    (0, _triggerAlias["default"])()(next)(aliasedAction);
    expect(trigger).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(action);
  });
  it('should throw an error when no meta defined', function () {
    var next = jest.fn();
    var payload = [123];
    var action = {
      type: 'MY_ACTION',
      payload: 'awesome'
    };
    var trigger = jest.fn(function () {
      return action;
    });
    var aliasedAction = {
      type: 'ALIASED',
      payload: payload
    };

    _alias["default"].get.mockImplementation(function () {
      return trigger;
    });

    expect(function () {
      (0, _triggerAlias["default"])()(next)(aliasedAction);
    }).toThrowError('No trigger defined');
  });
  it('should throw an error when no trigger defined', function () {
    var next = jest.fn();
    var payload = [123];
    var action = {
      type: 'MY_ACTION',
      payload: 'awesome'
    };
    var trigger = jest.fn(function () {
      return action;
    });
    var aliasedAction = {
      type: 'ALIASED',
      payload: payload,
      meta: {}
    };

    _alias["default"].get.mockImplementation(function () {
      return trigger;
    });

    expect(function () {
      (0, _triggerAlias["default"])()(next)(aliasedAction);
    }).toThrowError('No trigger defined');
  });
  it('should throw an error when trigger alias not defined', function () {
    var next = jest.fn();
    var payload = [123];
    var aliasedAction = {
      type: 'ALIASED',
      payload: payload,
      meta: {
        trigger: 'MY_OTHER_ACTION'
      }
    };

    _alias["default"].get.mockImplementation(function () {
      return undefined;
    });

    expect(function () {
      (0, _triggerAlias["default"])()(next)(aliasedAction);
    }).toThrowError('Trigger alias MY_OTHER_ACTION not found');
  });
});