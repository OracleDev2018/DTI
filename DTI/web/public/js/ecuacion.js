$(document).ready(function() {
});
$("body").on("click","button.defVar",function(event) {
  var idLista, tipoVariable, seleccionado, idIndicador, nombreEcuacion;
   idLista=$(this).attr('id');
   tipoVariable=idLista.split('abrirModalDefinirVariable');
   $("#modalDefinicion").attr('value', tipoVariable[1]);
    verificarSiEstaDefinido();
     if ($("#guardarDefinicionVariable").val()=='guardar') {
       $("#modalDefinicion").modal("show");
     }else {
       $("#modalDefinicion").modal("show");
       idIndicador=obtenerSeleccionado("lista"+tipoVariable[1]).value;
       editar(idIndicador);


     }

});

function llenarModalEdicionEcuacionPredeterminada(response) {
    var nombreEcuacion;
      nombreEcuacion=response.nombreEcuacion;
      console.log(response);
      $("#listaEcuaciones").val(nombreEcuacion);
      // $("#bodyDefinicion").removeAttr('hidden');
      $("#ecuacion").load("/variable/ecuacion #"+nombreEcuacion, function () {
        actualizarElementosEcuaciones(response.idIndicador, nombreEcuacion);
        switch (nombreEcuacion) {
          case 'constante':
            break;
          case 'logaritmica':
          var aLogaritmo, bLogaritmo, elemento;

          $("#ecuacion #aLogaritmo >  option").each(function(index, el) {
            elemento=el;
            console.log(elemento);
          });



            break;
          case 'potencia':

           var nPotencia, aConstante, yPotencia;
             nPotencia=response.Exponente;
             aConstante=response.Constante;
             yPotencia=response.y;
             $("#aConstante").val(aConstante);
             $("#nPotencia").val(nPotencia);
             $('#yPotencia ').val(yPotencia);

            // console.log($("#yPotencia  option[value="+ yPotencia +"]").value);


            break;
          case 'raiz':
          var nIndice, cConstante, yRaiz;
          yRaiz=obtenerSeleccionado("yRaiz").value;//id de la variable que se asigna
          cConstante=$("#cConstante").val();
          nIndice=$("#nIndice").val();


            break;
          case 'cociente':
          var aDivision, bDivision;
            aDivision=obtenerSeleccionado("aDivision").value;//id de la variable que se asigna
            bDivision=obtenerSeleccionado("bDivision").value;//id de la variable que se asigna


            break;
          case 'producto':
          var aMultiplica, bMultiplicacion;
           aMultiplicacion=obtenerSeleccionado("aMultiplicacion").value;//id de la variable que se asigna
           bMultiplicacion=obtenerSeleccionado("bMultiplicacion").value;//id de la variable que se asigna

            break;
          case 'resta':
            var aResta, bResta;
             aResta=obtenerSeleccionado("aResta").value;//id de la variable que se asigna
             bResta=obtenerSeleccionado("bResta").value;//id de la variable que se asigna


            break;
          case 'suma':
          var aSuma, bSuma;
           aSuma=obtenerSeleccionado("aSuma").value;//id de la variable que se asigna
           bSuma=obtenerSeleccionado("bSuma").value;//id de la variable que se asigna


            break;
          case 'exponencial':
          var yExponencial;
          yExponencial=obtenerSeleccionado("yExponencial").value;//id de la variable que se asigna


        }
      });

}



function editar( idIndicador) {
  $.ajax({
    url: Routing.generate('ajax_obtener_ecuacion_predeterminada'),
    type: 'POST',
    dataType: 'json',
    data: {
      "idIndicador":idIndicador,
    }
  })
  .done(function(response) {
    console.log("success editar ecuacion");

    llenarModalEdicionEcuacionPredeterminada(response);
  })
  .fail(function() {
    console.log("error");
  })
  .always(function() {
    console.log("complete");
  });
}

function verificarSiEstaDefinido(idIndicador, tipoIndicador){

  if (idIndicador==null) {
       idIndicador=obtenerSeleccionado("lista"+$("#modalDefinicion").attr('value')).value;
  }
  if (tipoIndicador==null) {
    tipoIndicador=$("#modalDefinicion").attr('value');

  }
     $.ajax({
       url: Routing.generate('ajax_obtener_si_esta_definido'),
       type: 'POST',
       dataType: 'json',
       data: {
         "idIndicador":idIndicador,

       }
     })
     .done(function(response) {
      //  $("#definido").empty();
       $("#ecuacion").empty();
       limpiarListaEcuaciones();
       if (response.encontrado) {//El controlador devuelve true si el indicador ya tiene asignada una ecuación por defecto
         //  $("#bodyDefinicion").attr('hidden', 'true');
         $("#valorEsperadoIndicador").val(response.valorEsperado);
        //  editarVariable(response.nombre);
        //  llenarEditar(response.idEcuacion);
         $("#abrirModalDefinirVariable"+tipoIndicador).removeClass('btn-warning').addClass('btn-info');
         $("#abrirModalDefinirVariable"+tipoIndicador).html("<span class='glyphicon glyphicon-pencil'></span>Editar definición");
         $("#abrirModalDefinirVariable"+tipoIndicador).attr('value', 'editar');
         $("#valorEsperado").removeAttr('hidden');
         $("#guardarDefinicionVariable").attr('value', 'editar');

       }else {

         $("#valorEsperado").attr('hidden', 'true');
         $("#abrirModalDefinirVariable"+tipoIndicador).removeClass('btn-info').addClass('btn-warning');
         $("#abrirModalDefinirVariable"+tipoIndicador).html(" <span class='glyphicon glyphicon-ok' aria-hidden='true'></span>Definir Indicador");
         $("#abrirModalDefinirVariable"+tipoIndicador).attr('value', 'guardar');
         $("#guardarDefinicionVariable").attr('value', 'guardar');


       }
     })
     .fail(function() {
       console.log("error");
     })
     .always(function() {
       console.log("complete");
     });




}
function limpiarListaEcuaciones() {
  $("#listaEcuaciones").val('');
  $("#valorEsperadoIndicador").val('');
}




$("body").on('click','button#guardarDefinicionVariable', function () {

  var seleccionado, idIndicador, variableId, tipoEcuacion, valorEsperado;
   seleccionado=  obtenerSeleccionado("listaEcuaciones").value.toLowerCase();
   idIndicador=obtenerSeleccionado("lista"+$("#modalDefinicion").attr('value')).value;
   valorEsperado=$("#valorEsperadoIndicador").val();
   if (validarElemento(valorEsperado)) {
     guardarEcuacionesPredeterminadas(seleccionado, idIndicador, valorEsperado);
   }




});

function validarElemento(elemento){//Esta función valida si el elemento enviado no es null o vacío
  var esValido;
  if (elemento==""|| elemento==null) {
    swal("Lo sentimos","Debe llenar todos los campos","error");
    esValido=false;
  }else {
    esValido=true;
  }
  return esValido;
}

function validarNoNegativo(elemento) {
  var esValido;
  if (elemento<0) {
    swal("Lo sentimos",elemento+" Es un número negativo, debe ser positivo","error");
    esValido=false;
  }else {
    esValido=true;
  }
  return esValido;

}


function guardarEcuacionesPredeterminadas(seleccionado, idIndicador, valorEsperado){

      switch (seleccionado) {
        case 'constante':
        $.ajax({
          url: Routing.generate('ajax_guardar_ecuaciones_predeterminadas'),
          type: 'POST',
          dataType: 'json',
          data: {
            "seleccionado": seleccionado,
            "idIndicador":idIndicador,
            "valorEsperado":valorEsperado,

          }
        })
        .done(function() {
          console.log("success crear ecuacion");

          $("#modalDefinicion").modal("hide");

         verificarSiEstaDefinido(idIndicador,$("#modalDefinicion").attr('value'));

        })
        .fail(function() {
          console.log("error");
        })
        .always(function() {
          console.log("complete");
        });


          break;
        case 'logaritmica':
        var aLogaritmo, bLogaritmo;
          aLogaritmo=obtenerSeleccionado("aLogaritmo").value;//id de la variable que se asigna
          bLogaritmo=obtenerSeleccionado("bLogaritmo").value;//id de la variable que se asigna
          if (validarElemento(aLogaritmo)  && validarElemento(bLogaritmo)) {

              $.ajax({
                url: Routing.generate('ajax_guardar_ecuaciones_predeterminadas'),
                type: 'POST',
                dataType: 'json',
                data: {
                  "seleccionado": seleccionado,
                  "idIndicador":idIndicador,
                  "valorEsperado":valorEsperado,
                  "aLogaritmo":aLogaritmo,
                  "bLogaritmo":bLogaritmo,

                }
              })
              .done(function() {
                console.log("success");
                $("#modalDefinicion").modal("hide");
                verificarSiEstaDefinido(idIndicador,$("#modalDefinicion").attr('value'));

              })
              .fail(function() {
                console.log("error");
              })
              .always(function() {
                console.log("complete");
              });

          }

          break;
        case 'potencia':
         var nPotencia, aConstante, yPotencia;
         yPotencia=obtenerSeleccionado("yPotencia").value;//id de la variable que se asigna
         aConstante=$("#aConstante").val();
         nPotencia=$("#nPotencia").val();
         if (validarElemento(yPotencia)  && validarElemento(aConstante)&& validarElemento(nPotencia)) {
           $.ajax({
             url: Routing.generate('ajax_guardar_ecuaciones_predeterminadas'),
             type: 'POST',
             dataType: 'json',
             data: {
               "seleccionado": seleccionado,
               "idIndicador":idIndicador,
               "valorEsperado":valorEsperado,
               "yPotencia":yPotencia,
               "aConstante":aConstante,
               "nExponente":nPotencia,

             }
           })
           .done(function() {
             console.log("success");
             $("#modalDefinicion").modal("hide");
             verificarSiEstaDefinido(idIndicador,$("#modalDefinicion").attr('value'));

           })
           .fail(function() {
             console.log("error");
           })
           .always(function() {
             console.log("complete");
           });


         }


          break;
        case 'raiz':
        var nIndice, cConstante, yRaiz;
        yRaiz=obtenerSeleccionado("yRaiz").value;//id de la variable que se asigna
        cConstante=$("#cConstante").val();
        nIndice=$("#nIndice").val();
        if (validarElemento(yRaiz)  && validarElemento(cConstante) && validarNoNegativo(cConstante) && validarElemento(nIndice)) {
          $.ajax({
            url: Routing.generate('ajax_guardar_ecuaciones_predeterminadas'),
            type: 'POST',
            dataType: 'json',
            data: {
              "seleccionado": seleccionado,
              "idIndicador":idIndicador,
              "valorEsperado":valorEsperado,
              "yRaiz":yRaiz,
              "cConstante":cConstante,
              "nIndice":nIndice,

            }
          })
          .done(function() {
            console.log("success");
            $("#modalDefinicion").modal("hide");
            verificarSiEstaDefinido(idIndicador,$("#modalDefinicion").attr('value'));

          })
          .fail(function() {
            console.log("error");
          })
          .always(function() {
            console.log("complete");
          });

        }


          break;
        case 'cociente':
        var aDivision, bDivision;
          aDivision=obtenerSeleccionado("aDivision").value;//id de la variable que se asigna
          bDivision=obtenerSeleccionado("bDivision").value;//id de la variable que se asigna
          if (validarElemento(aDivision) && validarElemento(bDivision)) {
            $.ajax({
              url: Routing.generate('ajax_guardar_ecuaciones_predeterminadas'),
              type: 'POST',
              dataType: 'json',
              data: {
                "seleccionado": seleccionado,
                "idIndicador":idIndicador,
                "valorEsperado":valorEsperado,
                "aDivision":aDivision,
                "bDivision":bDivision,

              }
            })
            .done(function() {
              console.log("success");
              $("#modalDefinicion").modal("hide");
              verificarSiEstaDefinido(idIndicador,$("#modalDefinicion").attr('value'));

            })
            .fail(function() {
              console.log("error");
            })
            .always(function() {
              console.log("complete");
            });

          }


          break;
        case 'producto':
        var aMultiplica, bMultiplicacion;
         aMultiplicacion=obtenerSeleccionado("aMultiplicacion").value;//id de la variable que se asigna
         bMultiplicacion=obtenerSeleccionado("bMultiplicacion").value;//id de la variable que se asigna

         if (validarElemento(aMultiplicacion) && validarElemento(bMultiplicacion)) {
           $.ajax({
             url: Routing.generate('ajax_guardar_ecuaciones_predeterminadas'),
             type: 'POST',
             dataType: 'json',
             data: {
               "seleccionado": seleccionado,
               "yExponencial":yExponencial,
               "idIndicador":idIndicador,
               "valorEsperado":valorEsperado,
               "aMultiplicacion":aMultiplicacion,
               "bMultiplicacion":bMultiplicacion,

             }
           })
           .done(function() {
             console.log("success");
             $("#modalDefinicion").modal("hide");
             verificarSiEstaDefinido(idIndicador,$("#modalDefinicion").attr('value'));

           })
           .fail(function() {
             console.log("error");
           })
           .always(function() {
             console.log("complete");
           });

         }

          break;
        case 'resta':
          var aResta, bResta;
           aResta=obtenerSeleccionado("aResta").value;//id de la variable que se asigna
           bResta=obtenerSeleccionado("bResta").value;//id de la variable que se asigna
           if (validarElemento(aResta) && validarElemento(bResta)) {
             $.ajax({
               url: Routing.generate('ajax_guardar_ecuaciones_predeterminadas'),
               type: 'POST',
               dataType: 'json',
               data: {
                 "seleccionado": seleccionado,
                 "idIndicador":idIndicador,
                 "valorEsperado":valorEsperado,
                 "aResta":aResta,
                 "bResta":bResta,

               }
             })
             .done(function() {
               console.log("success");
               $("#modalDefinicion").modal("hide");
               verificarSiEstaDefinido(idIndicador,$("#modalDefinicion").attr('value'));

             })
             .fail(function() {
               console.log("error");
             })
             .always(function() {
               console.log("complete");
             });

           }

          break;
        case 'suma':
        var aSuma, bSuma;
         aSuma=obtenerSeleccionado("aSuma").value;//id de la variable que se asigna
         bSuma=obtenerSeleccionado("bSuma").value;//id de la variable que se asigna
         if (validarElemento(aSuma) && validarElemento(bSuma)) {
           $.ajax({
             url: Routing.generate('ajax_guardar_ecuaciones_predeterminadas'),
             type: 'POST',
             dataType: 'json',
             data: {
               "seleccionado": seleccionado,
               "idIndicador":idIndicador,
               "valorEsperado":valorEsperado,
               "aSuma":aSuma,
               "bSuma":bSuma,

             }
           })
           .done(function() {
             console.log("success");
             $("#modalDefinicion").modal("hide");
             verificarSiEstaDefinido(idIndicador,$("#modalDefinicion").attr('value'));

           })
           .fail(function() {
             console.log("error");
           })
           .always(function() {
             console.log("complete");
           });

         }


          break;
        case 'exponencial':
        var yExponencial;
        yExponencial=obtenerSeleccionado("yExponencial").value;//id de la variable que se asigna
        if (validarElemento(yExponencial)) {
          $.ajax({
            url: Routing.generate('ajax_guardar_ecuaciones_predeterminadas'),
            type: 'POST',
            dataType: 'json',
            data: {
              "seleccionado": seleccionado,
              "yExponencial":yExponencial,
              "idIndicador":idIndicador,
              "valorEsperado":valorEsperado,

            }
          })
          .done(function() {
            console.log("success");
            $("#modalDefinicion").modal("hide");
            verificarSiEstaDefinido(idIndicador,$("#modalDefinicion").attr('value'));

          })
          .fail(function() {
            console.log("error");
          })
          .always(function() {
            console.log("complete");
          });

        }

          break;
        default:

      }

}


function actualizarElementosEcuaciones(idIndicador, seleccionado){
  $.ajax({
      url:Routing.generate('ajax_actualizar_tabla_variables') ,
      type: 'POST',
      dataType: 'json',
      data: {
        "idIndicador":idIndicador,
      },
  })
  .done(function(response) {

    switch (seleccionado) {
      case 'exponencial':
      $("#yExponencial").empty();
      $("#yExponencial").append(
        "<option selected disabled value=''>Seleccione una variable para asignar</option>"
        );

      $(response).each(function(index, el) {
        $("#yExponencial").append(
          "<option value='"+el.id +"'>"+el.nombre+"</option>"
          );
        });


        break;
      case "potencia":
      $("#yPotencia").empty();
      $("#yPotencia").append(
        "<option selected  value=''>Seleccione una variable para asignar</option>"
        );

      $(response).each(function(index, el) {
        $("#yPotencia").append(
          "<option value='"+el.id +"'>"+el.nombre+"</option>"
          );
        });

        break;
      case "logaritmica":

      $("#aLogaritmo").empty();
      $("#bLogaritmo").empty();
      $("#aLogaritmo").append(
        "<option selected disabled value=''>Seleccione una variable para asignar</option>"
        );
      $("#bLogaritmo").append(
        "<option selected disabled value=''>Seleccione una variable para asignar</option>"
        );
      $(response).each(function(index, el) {
        $("#aLogaritmo").append(
          "<option value='"+el.id +"'>"+el.nombre+"</option>"
          );
        $("#bLogaritmo").append(
          "<option value='"+el.id +"'>"+el.nombre+"</option>"
          );
        });


        break;
      case 'raiz':
      $("#yRaiz").empty();
      $("#yRaiz").append(
        "<option selected disabled value=''>Seleccione una variable para asignar</option>"
        );
      $(response).each(function(index, el) {
        $("#yRaiz").append(
          "<option value='"+el.id +"'>"+el.nombre+"</option>"
          );

        });


        break;
      case 'cociente':
      $("#aDivision").empty();
      $("#bDivision").empty();
      $("#aDivision").append(
        "<option selected disabled value=''>Seleccione una variable para asignar</option>"
        );
      $("#bDivision").append(
        "<option selected disabled value=''>Seleccione una variable para asignar</option>"
        );
      $(response).each(function(index, el) {
        $("#aDivision").append(
          "<option value='"+el.id +"'>"+el.nombre+"</option>"
          );
        $("#bDivision").append(
          "<option value='"+el.id +"'>"+el.nombre+"</option>"
          );
        });


        break;
      case 'producto':
      $("#aMultiplicacion").empty();
      $("#bMultiplicacion").empty();
      $("#aMultiplicacion").append(
        "<option selected disabled value=''>Seleccione una variable para asignar</option>"
        );
      $("#bMultiplicacion").append(
        "<option selected disabled value=''>Seleccione una variable para asignar</option>"
        );
      $(response).each(function(index, el) {
        $("#aMultiplicacion").append(
          "<option value='"+el.id +"'>"+el.nombre+"</option>"
          );
        $("#bMultiplicacion").append(
          "<option value='"+el.id +"'>"+el.nombre+"</option>"
          );
        });


        break;
      case 'resta':
      $("#aResta").empty();
      $("#bResta").empty();
      $("#aResta").append(
        "<option selected disabled value=''>Seleccione una variable para asignar</option>"
        );
      $("#bResta").append(
        "<option selected disabled value=''>Seleccione una variable para asignar</option>"
        );
      $(response).each(function(index, el) {
        $("#aResta").append(
          "<option value='"+el.id +"'>"+el.nombre+"</option>"
          );
        $("#bResta").append(
          "<option value='"+el.id +"'>"+el.nombre+"</option>"
          );
        });

        break;
      case 'suma':
      $("#aSuma").empty();
      $("#bSuma").empty();
      $("#aSuma").append(
        "<option selected disabled value=''>Seleccione una variable para asignar</option>"
        );
      $("#bSuma").append(
        "<option selected disabled value=''>Seleccione una variable para asignar</option>"
        );
      $(response).each(function(index, el) {
        $("#aSuma").append(
          "<option value='"+el.id +"'>"+el.nombre+"</option>"
          );
        $("#bSuma").append(
          "<option value='"+el.id +"'>"+el.nombre+"</option>"
          );
        });
        return ;
      default:
        return;
    }


  })
  .fail(function() {
    console.log("error");
  })
  .always(function() {
    console.log("complete");
  });

}
