"use strict";

var _alias = _interopRequireDefault(require("../alias"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

jest.unmock('../alias');
describe('alias', function () {
  describe('#set', function () {
    it('should set a value', function () {
      expect(function () {
        _alias["default"].set('abc', 123);
      }).not.toThrow();
    });
  });
  describe('#get', function () {
    it('should get a value', function () {
      _alias["default"].set('abc', 123);

      expect(_alias["default"].get('abc')).toEqual(123);
    });
  });
});