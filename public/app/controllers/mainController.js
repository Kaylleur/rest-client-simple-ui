app.controller('MainController',
['$scope',function($scope){
    $scope.methods =['GET','HEAD','POST','PUT','DELETE','TRACE','OPTIONS','CONNECT','PATCH'];

    $scope.nameMethod = 'GET ';

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
}]);