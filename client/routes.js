angular.module('admin').config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
function($urlRouterProvider, $stateProvider, $locationProvider){

  $locationProvider.html5Mode(true);

  $stateProvider
  .state('producto', {
    url: '/productos',
    templateUrl: 'client/productos/views/lista-productos.ng.html',
    controller: 'ListaProductosCtrl'
  })
  .state('detalleProducto', {
    url: '/productos/:productoId',
    templateUrl: 'client/productos/views/detalle-producto.ng.html',
    controller: 'DetalleProductoCtrl'
  });

  $urlRouterProvider.otherwise("/productos");
}]);
