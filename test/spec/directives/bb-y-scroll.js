'use strict';

describe('Directive: bbYScroll', function () {

  // load the directive's module
  beforeEach(module('yukiApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<bb-y-scroll></bb-y-scroll>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the bbYScroll directive');
  }));
});
