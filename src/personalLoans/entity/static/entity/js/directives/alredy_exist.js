app.directive("warrantexist", function() {
    return {
        restrict: "A",

        require: "ngModel",

        link: function(scope, element, attributes, ngModel) {
            ngModel.$validators.warrantexist = function(modelValue) {
                return scope.vm.errors.warrant.indexOf(modelValue) === -1;
            }
        }
    };
});

app.directive("authexist", function() {
    return {
        restrict: "A",

        require: "ngModel",

        link: function(scope, element, attributes, ngModel) {
            ngModel.$validators.authexist = function(modelValue) {
                return scope.vm.errors.authorization.indexOf(modelValue) === -1;
            }
        }
    };
});
