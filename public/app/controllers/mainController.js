app.controller('MainController',
['$scope','$http',function($scope,$http){

    $scope.nameMethod = 'GET '; //used to display  -> default
    $scope.methods =['GET','HEAD','POST','PUT','DELETE','TRACE','OPTIONS','CONNECT','PATCH'];
    $scope.contentType = ["JSON","XML","text/plain"];
    $scope.history = [];

    $scope.request ={};
    $scope.request.method = 'GET';
    $scope.request.headers = [{}];

    $scope.updateMethod = function(method){
        $scope.nameMethod = method + ' ';
        $scope.request.method = method;
    };

    $scope.addHeader = function(){
        $scope.request.headers.push({});
    }

    $scope.removeHeader = function(index){
        $scope.request.headers.splice(index,1);
    }


    $scope.controlBody = function(withToast){
        var body = $scope.request.data;
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
                    $scope.request.data = beautifyJSON($scope.request.data);
                    break;
                case 'XML':
                    $scope.request.data = beautifyXML($scope.request.data)
                    break;
            }
        }else{
            toastr.error('Your body is invalid can\'t beautify.');
        }
    }

    $scope.send = function(){
        $scope.history.push($scope.request);
        $scope.request.headers.push({'Access-Control-Allow-Origin':'*'});
        console.log($scope.request);
        $http($scope.request)
            .then(function(response){
                //success
                $scope.response = response;
            },function(response){
                //error
                console.log(response);
            })
    }


}]);