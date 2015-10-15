Productos = new Mongo.Collection("productos");

  angular.module('admin',['angular-meteor','ui.router','ui.bootstrap']);

  angular.module('admin').config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
  function($urlRouterProvider, $stateProvider, $locationProvider){

    $locationProvider.html5Mode(true);

    $stateProvider
    .state('producto', {
      url: '/productos',
      templateUrl: 'lista-productos.ng.html',
      controller: 'ListaProductosCtrl'
    })
    .state('detalleProducto', {
      url: '/productos/:productoId',
      templateUrl: 'detalle-producto.ng.html',
      controller: 'DetalleProductoCtrl'
    });

    $urlRouterProvider.otherwise("/productos");
  }]);

  // Controllador de listarProductos
  angular.module('admin').controller('ListaProductosCtrl', ['$scope','$meteor','$log', function($scope,$meteor,$log){

    $scope.productos = $meteor.collection(Productos);

    $scope.remove= function (producto) {
      $scope.productos.splice($scope.productos.indexOf(producto),1);
    };

  }]);

  // Controlador de detalleProducto
  angular.module("admin").controller("DetalleProductoCtrl", ['$scope', '$stateParams','$meteor',
  function($scope, $stateParams, $meteor){

    $scope.productoId = $stateParams.productoId;
    // el parametro de false, se usa para indicar que no se hagan los cambios automaticos a medida que editan el producto
    $scope.producto = $meteor.object(Productos, $stateParams.productoId,false);

    $scope.guardar = function () {
      $scope.producto.save().then(function(numeroDeDocumentos){
        console.log('Se ha guardado el producto exitosamente, documentos afectatos: ', numeroDeDocumentos);
      }, function(error){
        console.log('Error al guardar el producto', error);
      });
    };

    $scope.restaurar = function () {
      $scope.producto.reset();
    };

  }]);


if (Meteor.isServer) {
  Meteor.startup(function(){
    if (Productos.find().count()===0) {
      var productos = [
        {'Codigo':1512, 'Descripcion':"Termocupla industrial R566", 'Stock':12, 'Iva':16, 'Venta':100000, 'Costo':50000}
      ];
      for (var i = 0; i < productos.length; i++) {
        Productos.insert(productos[i]);
      }
    }
  });
}
