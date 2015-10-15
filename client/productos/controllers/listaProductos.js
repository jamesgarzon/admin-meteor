// Controllador de listarProductos
angular.module('admin').controller('ListaProductosCtrl', ['$scope','$meteor','$log', function($scope,$meteor,$log){

  $scope.productos = $meteor.collection(Productos);

  $scope.remove= function (producto) {
    $scope.productos.splice($scope.productos.indexOf(producto),1);
  };

}]);
