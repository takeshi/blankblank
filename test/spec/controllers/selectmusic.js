'use strict';

describe('Controller: SelectmusicCtrl', function () {

  // load the controller's module
  beforeEach(module('yukiApp'));

  var SelectmusicCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SelectmusicCtrl = $controller('SelectmusicCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
