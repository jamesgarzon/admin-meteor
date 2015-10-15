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
