var app = angular.module('belatrix', []);

app.controller("myCtrl", function ($scope) {
    $scope.firstName = "John";
    $scope.lastName = "Doe";
});

app.controller("testCtrl", function ($scope) {

    var departamento = {
        codigo: "01", nombre: "Lima"
    };
    var provincia = { codigo: "50", nombre: "Lima", departamento: departamento }
    var distrito = { codigo: "202", nombre: "La Molina", provincia: provincia };
    var distrito2 = { codigo: "203", nombre: "San Isidro", provincia: provincia };
    var distritos = [distrito, distrito2]

    $scope.ubigeos = distritos;
});

app.controller('MainCtrl', function ($scope) {
    $scope.showContent = function (content) {

        //divide los contenidos del archivo en lineas y las coloca en un array
        var cont = content.split("\n");
        var new_arr = [];
        var departamentos = [];
        var provincias = [];
        var distritos = [];
        var test = [];
        //recorre el array de lineas
        cont.forEach(function (element) {

            //proximas sentencias limpian los strings de caracteres secretos remanentes en la linea
            element = element.replace("\"\r", "");
            element = element.replace("\"", "");
            element = element.replace('"',"");
            

            var ubigeos = [];

            //divide la linea actual que contiene los elementos como tales de los objetos a ser guardados
            ubigeos = (element.split("/"));


            //creacion de departamento. Por formato de documento los dptos siempre deberian estar en el indice 0
            //remueve espacios en blanco al principio y final
            var trim_dept = ubigeos[0].trim()
            var departamento = crearObjeto(trim_dept.split(" "));
            //revisa si el codigo de departamento es valido antes de insertar
            if (departamento.codigo != -1) {
                insertar(departamentos, departamento);
            }

            //creacion de provincia. Por formato de documento las provincias siempre deberian estar en el indice 1
            //remueve los espacios blancos al principio y final del string que contiene la provincia    
            var trim_prov = ubigeos[1].trim();
            var provincia = crearObjeto(trim_prov.split(" "));
            //revisa si el codigo de la provincia es valido
            if (provincia.codigo != -1) {
                provincia.departamento = departamento;
                insertar(provincias, provincia);
            }

            //creacion de distrito. Por formato de documento, las provincias siempre deberian estar en el indice 2
            var trim_dist = ubigeos[2].trim();
            var distrito = crearObjeto(trim_dist.split(" "));
            //revisa si el codigo del distrito es valido
            if (distrito.codigo != -1) {
                distrito.provincia = provincia;
                insertar(distritos, distrito);
            }

            

            new_arr.push(trim_prov.split(" "));
            test.push(element);
        });

        
        provincias.shift();
        distritos.shift();
        $scope.content = departamentos;
        $scope.provincias = provincias;
        $scope.distritos = distritos;
    };
});

function crearProvincia(arr, departamento) {

    if (arr[0] != " " || arr[1] != " ") {


    }
}

//toma un array conteniendo las propiedades bases de los objetos ubigeos (codigo y nombre) y retorna un objeto estilo JSON con estas
//revisa si las propiedades no estan vacias antes de asignar y retornar
function crearObjeto(arr) {

    var objeto;
    if (arr[0] != " " && arr[1] != " ") {

        var codigo = arr[0];
        var nombre = arr.slice(1, arr.length).join(" ");
        objeto = { codigo: codigo, nombre: nombre };
        return objeto;
    }
    else {
        objeto = { codigo: -1, nombre: "NA" };
    }
    
    
}

//recibe un array y un elemento a ser insertado
//verifica si el elemento no esta presente y de ser asi lo inserta
//retorna el array despues de la verificacion (e insercion)
function insertar(arr, elemento) {

    var existe = false;
    if (isNaN(elemento.codigo)) {

        existe = true;
        
    }
    for (var i = 0; i < arr.length; i++) {

        if (arr[i].codigo === elemento.codigo) {

            existe = true;
            break;
        }
    }
    if (!existe) {

        arr.push(elemento);
    }
    //arr.push(elemento);
    return arr;
    
}
app.directive('onReadFile', function ($parse) {
    return {
        restrict: 'A',
        scope: {
            onReadFile: "&"
        },
        link: function (scope, element, attrs) {
            element.on('change', function (e) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    scope.$apply(function () {
                        scope.onReadFile({ $content: e.target.result });
                    });
                };
                reader.readAsText((e.srcElement || e.target).files[0]);
            });
        }
    };
});

