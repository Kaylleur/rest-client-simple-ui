app.controller('MainController',
['$scope',function($scope){

    $scope.nameMethod = 'GET '; //used to display  -> default

    $scope.methods =['GET','HEAD','POST','PUT','DELETE','TRACE','OPTIONS','CONNECT','PATCH'];
    $scope.contentType = ["JSON","XML","text/plain"];



    $scope.request ={};

    $scope.updateMethod = function(method){
        $scope.nameMethod = method + ' ';
    };

    $scope.headers = [{}];

    $scope.addHeader = function(){
        console.log($scope.headers);
        $scope.headers.push({});
    }

    $scope.removeHeader = function(index){
        console.log($scope.headers);
        $scope.headers.splice(index,1);
    }


    $scope.controlBody = function(withToast){
        var body = $scope.request.body;
        var res = null;
        if(body) {
            switch ($scope.request.contentType) {
                case "JSON" :
                    if(validator.isJSON(body))res = true;
                    else res = false;
                    break;
                case "XML" :
                    if(validateXML(body))res = true;
                    else res = false;
                    break;
                case "text/plain":
                    break;
            }
        }else $scope.bodyClass= "";
        //display
        if(res){
            $scope.bodyClass= "has-success";
            if(withToast)toastr.success('Your body is valid.');
        }else if(res === false) {
            $scope.bodyClass= "has-error";
            if(withToast)toastr.error('Body not valid !')
        }
        return res;
    }

    $scope.beautifyBody = function(){
        if($scope.controlBody(false)){
            switch ($scope.request.contentType) {
                case "JSON" :
                    $scope.request.body = beautifyJSON($scope.request.body);
                    break;
                case 'XML':
                    $scope.request.body = beautifyXML($scope.request.body)
                    break;
            }
        }else{
            toastr.error('Your body is invalid can\'t beautify.');
        }
    }



    //beautifier
    var beautifyXML = function(input){
        var formatted = '';
        var reg = /(>)(<)(\/*)/g;
        input = input.replace(reg, '$1\r\n$2$3');
        var pad = 0;
        jQuery.each(input.split('\r\n'), function(index, node) {
            var indent = 0;
            if (node.match( /.+<\/\w[^>]*>$/ )) {
                indent = 0;
            } else if (node.match( /^<\/\w/ )) {
                if (pad != 0) {
                    pad -= 1;
                }
            } else if (node.match( /^<\w[^>]*[^\/]>.*$/ )) {
                indent = 1;
            } else {
                indent = 0;
            }

            var padding = '';
            for (var i = 0; i < pad; i++) {
                padding += '  ';
            }

            formatted += padding + node + '\r\n';
            pad += indent;
        });
        return formatted;
    };

    var beautifyJSON = function(input){
        var json = eval("(" + input + ")");
        try {
            return JSON.stringify(json, undefined, 3);
        } catch (err) {
            console.log(err.message);
        }
    };
}]);