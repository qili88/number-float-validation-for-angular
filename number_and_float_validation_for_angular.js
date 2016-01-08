// error effects
// <style media="screen">
//     .input_error{
//         border-color:red !important;
//         box-shadow:0 0 10px red !important;
//     }
// </style>

//HTML
// <input type="text" class="form-control" ng-model="number" valid-number>
// <input type="text" class="form-control" ng-model="fload" valid-fload>


app.directive('validNumber', function($filter){
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, ctrl) {
            function inputValue(val) {
                if (val) {
                    var digits = val.replace(/[^0-9]/g, '');
                    if (digits !== val) {
                        element.addClass('input_error')
                    }
                    else{
                        element.removeClass('input_error')
                    }
                    return parseInt(digits,10);
                }
                return undefined;
            }
            ctrl.$parsers.push(inputValue);
        }
    };
});

app.directive('validFloat', function($filter) {
    var FLOAT_REGEXP_1 = /^\$?\d+.(\d{3})*(\,\d*)$/; //Numbers like: 1.123,56
    var FLOAT_REGEXP_2 = /^\$?\d+,(\d{3})*(\.\d*)$/; //Numbers like: 1,123.56
    var FLOAT_REGEXP_3 = /^\$?\d+(\.\d*)?$/; //Numbers like: 1123.56
    var FLOAT_REGEXP_4 = /^\$?\d+(\,\d*)?$/; //Numbers like: 1123,56

    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function (viewValue) {
                if (FLOAT_REGEXP_1.test(viewValue)) {
                    ctrl.$setValidity('float', true);
                    return parseFloat(viewValue.replace('.', '').replace(',', '.'));
                } else if (FLOAT_REGEXP_2.test(viewValue)) {
                    ctrl.$setValidity('float', true);
                    attrs.$set('style', 'border-color:rgb(102, 175, 233)')
                    return parseFloat(viewValue.replace(',', ''));
                } else if (FLOAT_REGEXP_3.test(viewValue)) {
                    ctrl.$setValidity('float', true);
                    attrs.$set('style', 'border-color:rgb(102, 175, 233)')
                    return parseFloat(viewValue);
                } else if (FLOAT_REGEXP_4.test(viewValue)) {
                    ctrl.$setValidity('float', true);
                    attrs.$set('style', 'border-color:rgb(102, 175, 233)')
                    return parseFloat(viewValue.replace(',', '.'));
                }else {
                    ctrl.$setValidity('float', false);
                    attrs.$set('style', 'border-color:red;box-shadow:0 0 10px red;')
                    return undefined;
                }
            });
            ctrl.$formatters.unshift(
                function (modelValue) {
                    return $filter('number')(parseFloat(modelValue) , 6);
                }
            );
        }
    };
});
