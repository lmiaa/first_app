var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', function($scope,$http) {
    console.log("Hello World from controller");




var refresh=function(){
$http.get('/projectlist').then(function(response){
console.log("i got the data i requested");
$scope.projectlist=response.data;
$scope.project=null;
});
};

refresh();

$scope.addProject=function(){
console.log($scope.project);
$http.post('/projectlist',$scope.project).then(function(response){
console.log(response);
refresh();
});
};


$scope.remove=function(id){
console.log(id);
$http.delete('/projectlist/'+id).then(function(response){
refresh();
});
};


$scope.edit=function(id){
console.log(id);
$http.get('/projectlist/'+id).then(function(response){
$scope.project=response.data;

});
};

$scope.update=function(){
console.log($scope.project._id);
$http.put('/projectlist/'+$scope.project._id,$scope.project).then(function(response){
refresh();
});
};

$scope.deselect=function(){
$scope.project=null;
};

$scope.tasks=function(id){
window.location = "task.html";
window.sessionStorage.setItem("id",id);
};

});



myApp.controller('AppCtrltask', function($scope, $http) {
    console.log("Hello World from controller222");






$scope.id = window.sessionStorage.getItem("id");
console.log($scope.id);
$http.get('/tasklist/'+$scope.id).then(function(response){
console.log("helllooooo22");
$scope.tasklist=response.data;
$scope.task=null;

});


$scope.addtask=function(){
console.log($scope.task);
$http.post('/tasklist',{task:$scope.task,id:$scope.id}).then(function(response){
console.log(response);
window.location.reload();

//refresh();
});
};

$scope.removetask=function(id){
$http.delete('/tasklist/'+id).then(function(response){
console.log(response);
window.location.reload();
//refresh();
});
};

});

