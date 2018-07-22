$(document).ready(function() {
    actualizarListaPorTipo("Seguimiento");//Actualizando los botones para seleccionar cada indicador
    actualizarListaPorTipo("Resultado");

});

$("body").on("change","select#listaResultado",function(event) {

  $("#tituloResultado").empty();
    verificarSiEstaDefinido(obtenerSeleccionado("listaResultado").value, "Resultado");
  $("#tituloResultado").text("Su indicador seleccionado: "+obtenerSeleccionado("listaResultado").text);
    actualizarTablaVariables(obtenerSeleccionado("listaResultado").value, "Resultado");
    $("#abrirModalDefinirVariableResultado").attr('value', obtenerSeleccionado("listaResultado").value);


});
$("body").on("change","select#listaSeguimiento",function(event) {

  $("#tituloSeguimiento").empty();
  verificarSiEstaDefinido(obtenerSeleccionado("listaSeguimiento").value, "Seguimiento");
  $("#tituloSeguimiento").text("Su indicador seleccionado: "+obtenerSeleccionado("listaSeguimiento").text);
  actualizarTablaVariables(obtenerSeleccionado("listaSeguimiento").value, "Seguimiento");
  $("#abrirModalDefinirVariableSeguimiento").attr('value', obtenerSeleccionado("listaSeguimiento").value);

});

$("body").on("change","select#listaEcuaciones",function(event) {
  $("#ecuacion").empty();
  var seleccionado, tipoVariable;
  tipoVariable=$("#modalDefinicion").attr('value');
  idIndicador=obtenerSeleccionado("lista"+tipoVariable).value;
  seleccionado=obtenerSeleccionado("listaEcuaciones").value;
    $("#ecuacion").load("/variable/ecuacion #"+seleccionado.toLowerCase());
  actualizarElementosEcuaciones(idIndicador, seleccionado.toLowerCase());
  $("#valorEsperado").removeAttr('hidden');




});


$("body").on("click","button#guardarVariableResultadoModal",function(event) {
  var idVariable, nombreVariableResultado, descripcionVariableResultado, unidadDeMedidaVariableResultado ;
   nombreVariableResultado=$("#nombreVariableResultadoModal").val().trim();
   descripcionVariableResultado=$("#descripcionVariableResultadoModal").val().trim();
   unidadDeMedidaVariableResultado=$("#unidadDeMedidaVariableResultadoModal").val().trim();
  //  valorEsperadoVariableResultado=$("#valorEsperadoVariableResultadoModal").val().trim();
   if(validarModal("Resultado")){
     if ($(this).attr('value')=="guardar") {
         agregarVariable("Resultado", nombreVariableResultado, descripcionVariableResultado, unidadDeMedidaVariableResultado);
     }else {
       idVariable=$("#idVariable").val().trim();
       editarVariable("Resultado", nombreVariableResultado, descripcionVariableResultado, unidadDeMedidaVariableResultado,  idVariable);


     }

   };
});
$("body").on("click","button#guardarVariableSeguimientoModal",function(event) {
  var idVariable, nombreVariableSeguimiento, descripcionVariableSeguimiento, unidadDeMedidaVariableSeguimiento;
   nombreVariableSeguimiento=$("#nombreVariableSeguimientoModal").val().trim();
   descripcionVariableSeguimiento=$("#descripcionVariableSeguimientoModal").val().trim();
   unidadDeMedidaVariableSeguimiento=$("#unidadDeMedidaVariableSeguimientoModal").val();
  //  valorEsperadoVariableSeguimiento=$("#valorEsperadoVariableSeguimientoModal").val().trim();
   if(validarModal("Seguimiento")){
     if ($(this).attr('value')=="guardar") {
         agregarVariable("Seguimiento", nombreVariableSeguimiento, descripcionVariableSeguimiento, unidadDeMedidaVariableSeguimiento);
     }else {
       idVariable=$("#idVariable").val().trim();
       editarVariable("Seguimiento", nombreVariableSeguimiento, descripcionVariableSeguimiento, unidadDeMedidaVariableSeguimiento, idVariable);


     }

   };
});



$("body").on('click', "button#abrirModalVariableResultado", function(event){
  limpiarModal("Resultado");
  $("#guardarVariableResultadoModal").attr('value', 'guardar');
  obtenerUnidades("Resultado");
});
$("body").on('click', "button#abrirModalVariableSeguimiento", function(event){
  limpiarModal("Seguimiento");
  $("#guardarVariableSeguimientoModal").attr('value', 'guardar');
  obtenerUnidades("Seguimiento");
});



$("body").on('click', "button#cerrarModalVariableRes", function(event){
  limpiarModal("Resultado");
});
$("body").on('click', "button#cerrarModalVariableSeg", function(event){
  limpiarModal("Seguimiento");
});


$("body").on("click","button.updateVarResultado",function(event) {
  var idVariable;
  idVariable=$(this).attr('id');
  $("#guardarVariableResultadoModal").attr('value', 'editar');

  $.ajax({
    url:Routing.generate('ajax_obtener_variable') ,
    type: 'POST',
    dataType: 'json',
    data: {
      "idVariable":idVariable,
    },
  })
  .done(function(response) {
    console.log(response);

    $("#nombreVariableResultadoModal").val(response[0].nombre);
    $("#descripcionVariableResultadoModal").val(response[0].descripcion) ;
    // $("#valorEsperadoVariableResultadoModal").val(response[0].valorEsperado) ;
    $("#idVariable").val(response[0].id) ;
    $(response[1]).each(function(index, el) {
      if (response[0].unidadDeMedida==el.id) {
        $("#unidadDeMedidaVariableResultadoModal").append(
          "<option selected value='"+el.id+"'>"+el.nombre+"</option>"
        );
      }else {
        $("#unidadDeMedidaVariableResultadoModal").append(
          "<option value='"+el.id+"'>"+el.nombre+"</option>"
        );
      }


    });

    $("#modalVariableResultado").modal("show");
  })
  .fail(function() {
    console.log("error");
  })
  .always(function() {
    console.log("complete");
  });

});
$("body").on("click","button.updateVarSeguimiento",function(event) {
  var idVariable;
  idVariable=$(this).attr('id');
  $("#guardarVariableSeguimientoModal").attr('value', 'editar');

  $.ajax({
    url:Routing.generate('ajax_obtener_variable') ,
    type: 'POST',
    dataType: 'json',
    data: {
      "idVariable":idVariable,
    },
  })
  .done(function(response) {

    $("#nombreVariableSeguimientoModal").val(response[0].nombre);
    $("#descripcionVariableSeguimientoModal").val(response[0].descripcion) ;
    // $("#valorEsperadoVariableSeguimientoModal").val(response[0].valorEsperado) ;
    $("#idVariable").val(response[0].id) ;

    $(response[1]).each(function(index, el) {
      if (response[0].unidadDeMedida==el.id) {
        $("#unidadDeMedidaVariableSeguimientoModal").append(
          "<option selected value='"+el.id+"'>"+el.nombre+"</option>"
        );
      }else {
        $("#unidadDeMedidaVariableSeguimientoModal").append(
          "<option value='"+el.id+"'>"+el.nombre+"</option>"
        );
      }


    });

    $("#modalVariableSeguimiento").modal("show");
  })
  .fail(function() {
    console.log("error");
  })
  .always(function() {
    console.log("complete");
  });

  // $('#modalVariableSeguimiento').modal('show');
});

$("body").on("click","button.deleteVarResultado",function(event) {
  var idVariable;
  idVariable=$(this).attr('id');
  eliminarVariable(idVariable, "Resultado");

});
$("body").on("click","button.deleteVarSeguimiento",function(event) {
  var idVariable;
  idVariable=$(this).attr('id');
  eliminarVariable(idVariable, "Seguimiento");

});






function eliminarVariable(idVariable, tipoVariable){
  $.ajax({
    url:Routing.generate('ajax_eliminar_variable') ,
    type: 'POST',
    dataType: 'json',
    data: {
      "idVariable":idVariable,
    },
  })
  .done(function() {
    swal("success","success","success");
    actualizarTablaVariables(obtenerSeleccionado("lista"+tipoVariable).value, tipoVariable);
  })
  .fail(function() {
    console.log("error");
  })
  .always(function() {
    console.log("complete");
  });


}
function actualizarListaPorTipo(tipoIndicador){
  $.ajax({
    url:Routing.generate('ajax_obtener_lista_por_tipo') ,
    type: 'POST',
    dataType: 'json',
    data: {
      'tipoIndicador': tipoIndicador,
      'idProyecto':obtenerIdProyecto(),
  }
  })
  .done(function(response) {
    $("#lista"+tipoIndicador).empty();
    $(response).each(function(index, el) {
      $("#lista"+tipoIndicador).append(
        '<option value='+el.id+'>'+el.nombre+'</option>'
      );
    });
    if (obtenerSeleccionado("lista"+tipoIndicador)) {
        $("#titulo"+tipoIndicador).text("Su indicador seleccionado: "+obtenerSeleccionado("lista"+tipoIndicador).text);
        actualizarTablaVariables(obtenerSeleccionado("lista"+tipoIndicador).value, tipoIndicador);
        $("#abrirModalDefinirVariable"+tipoIndicador).attr('value', obtenerSeleccionado("lista"+tipoIndicador).value);
        verificarSiEstaDefinido(obtenerSeleccionado("lista"+tipoIndicador).value, tipoIndicador);

    }
  })
  .fail(function() {
    console.log("error");
  })
  .always(function() {
    // console.log("complete tipo");
  });
}
function obtenerSeleccionado(idLista) {
    var elemento=null, lista;
    lista=idLista.split('lista');//para saber si es lista de Seguimiento o de Resultado
    $("#"+idLista +" >  option:selected").each(function(index, el) {
      elemento=el;

    });
    if (elemento==null) {
      $("#abrirModalVariable"+lista[1]).attr('disabled', 'true');
      $("#abrirModalDefinirVariable"+lista[1]).attr('disabled', 'true');
      $("#titulo"+lista[1]).text("Debe agrear un indicador  de "+lista[1].toLowerCase()+" antes de continuar a agregar la variable");
      $("#mostrarVariables"+lista[1]).empty();
    }else {
      $("#abrirModalVariable"+lista[1]).removeAttr("disabled");
      $("#abrirModalDefinirVariable"+lista[1]).removeAttr("disabled");

      return elemento;
    }

  }
function agregarVariable(tipoVariable, nombreVariable, descripcionVariable, unidadDeMedidaVariable) {
  $.ajax({
    url:Routing.generate('ajax_agregar_variable') ,
    type: 'POST',
    dataType: 'json',
    data: {
      "nombreVariable" : nombreVariable,
      "descripcionVariable" : descripcionVariable,
      "unidadDeMedidaVariable":unidadDeMedidaVariable,
      // "valorEsperadoVariable":valorEsperadoVariable,
      "idIndicador":obtenerSeleccionado("lista"+tipoVariable).value,
    }
  })
  .done(function(response) {
    $('#modalVariable'+tipoVariable).modal('hide');
    limpiarModal(tipoVariable);
     swal("success","success","success");
     actualizarTablaVariables(obtenerSeleccionado("lista"+tipoVariable).value, tipoVariable);
  })
  .fail(function() {
    swal("error","Por favor verifica si los datos han sido ingresado correctamente.", "error");
  });

}
function editarVariable(tipoVariable, nombreVariable, descripcionVariable, unidadDeMedidaVariable, idVariable) {
  $.ajax({
    url:Routing.generate('ajax_editar_variable') ,
    type: 'POST',
    dataType: 'json',
    data: {
      "nombreVariable" : nombreVariable,
      "descripcionVariable" : descripcionVariable,
      "unidadDeMedidaVariable":unidadDeMedidaVariable,
      // "valorEsperadoVariable":valorEsperadoVariable,
      "idVariable":idVariable,
      "idIndicador":obtenerSeleccionado("lista"+tipoVariable).value,
    }
  })
  .done(function(response) {
    $('#modalVariable'+tipoVariable).modal('hide');
    limpiarModal(tipoVariable);
     swal("success","success","success");
     actualizarTablaVariables(obtenerSeleccionado("lista"+tipoVariable).value, tipoVariable);
  })
  .fail(function() {
    swal("error","Por favor verifica si los datos han sido ingresado correctamente.", "error");
  });

}
function validarModal(tipoVariable) {
  var nombreVariable, descripcionVariable, unidadDeMedidaVariable;
   nombreVariable=$("#nombreVariable" +tipoVariable+"Modal").val().trim();
   descripcionVariable=$("#descripcionVariable"+tipoVariable+"Modal").val().trim();
  //  unidadDeMedidaVariable=$("#unidadDeMedidaVariable"+tipoVariable+"Modal").val().trim();
  unidadDeMedidaVariable=$("#unidadDeMedidaVariable"+tipoVariable+"Modal").val();
  //  valorEsperadoVariable=$("#valorEsperadoVariable"+tipoVariable+"Modal").val().trim();
   if (nombreVariable=="" || descripcionVariable=="" || unidadDeMedidaVariable==null ) {
     swal("error", "error Debe llenar todos los campos", "error");
     return false;
   }else {
     return true;
   }
}
function limpiarModal(tipoVariable) {
  var nombreVariable, descripcionVariable, unidadDeMedidaVariable;
   $("#nombreVariable" +tipoVariable+"Modal").val("");
   $("#descripcionVariable"+tipoVariable+"Modal").val("");
   $("#unidadDeMedidaVariable"+tipoVariable+"Modal").empty();
  //  $("#valorEsperadoVariable"+tipoVariable+"Modal").val("");
   $("#idVariable").val("");

}
function actualizarTablaVariables(idIndicador, tipoVariable) {
  $.ajax({
    url:Routing.generate('ajax_actualizar_tabla_variables') ,
    type: 'POST',
    dataType: 'json',
    data: {
      "idIndicador":idIndicador,
    },


  })
  .done(function(response) {
    $("#mostrarVariables"+tipoVariable).empty();
    $(response).each(function(index, el) {
    // $("#mostrarVariables"+tipoVariable).append(
    //     "<tr>"+
    //       "<td>"+ el.nombre+" </td>"+
    //       "<td>" +el.descripcion+" </td>"+
    //       "<td>"+ el.unidadDeMedida+" </td>"+
    //       "<td>"+ el.valorEsperado+" </td>"+
    //       "<td>"+
    //       "  <button type='button'  data-uid='1' class='updateVar"+tipoVariable+" btn btn-success btn-sm' id='"+el.id+"'>"+
    //            "<span class='glyphicon glyphicon-pencil'></span>"+
    //          "</a>"+
    //        "</button>"+
    //      "</td>"+
    //       "<td>"+
    //         "<button type='button'  data-target='#delete' data-uid='1' class=' deleteVar"+tipoVariable+" btn btn-primary btn-sm' id='"+el.id+"'>"+
    //           "<span class='glyphicon glyphicon-trash'></span>"+
    //         "</button>"+
    //       "</td>"+
    //       "<td>"+
    //         "<button type='button'   data-uid='1' class='defVar btn btn-info btn-sm' id='"+el.id+"'>"+
    //         "<span class='glyphicon glyphicon-ok' aria-hidden='true'>Definir</span>"+
    //
    //         "</button>"+
    //       "</td>"+
    //     "</tr>"
    //
    //
    //   );
    //
    // });
    $("#mostrarVariables"+tipoVariable).append(
        "<tr>"+
          "<td>"+ el.nombre+" </td>"+
          "<td>" +el.descripcion+" </td>"+
          "<td>"+ el.unidadDeMedida+" </td>"+
          "<td>"+
          "  <button type='button'  data-uid='1' class='updateVar"+tipoVariable+" btn btn-success btn-sm' id='"+el.id+"'>"+
               "<span class='glyphicon glyphicon-pencil'></span>"+
             "</a>"+
           "</button>"+
         "</td>"+
          "<td>"+
            "<button type='button'  data-target='#delete' data-uid='1' class=' deleteVar"+tipoVariable+" btn btn-primary btn-sm' id='"+el.id+"'>"+
              "<span class='glyphicon glyphicon-trash'></span>"+
            "</button>"+
          "</td>"+

        "</tr>"


      );

    });
  })
  .fail(function() {
    console.log("error");
  });
}
function verificarExistenciaTipoIndicador(){
  $.ajax({
    url: Routing.generate("ajax_verificar_existencia_tipo_indicador"),
    type: 'POST',
    dataType: 'json',
  })
  .done(function() {
    console.log("success verificar tipo");
  })
  .fail(function() {
    console.log("error verificar existencia");
  })
  .always(function() {
    console.log("complete");
  });

}

function obtenerUnidades(tipoVariable){
  $.ajax({
    url: Routing.generate('ajax_obtener_unidades'),
    type: 'POST',
    dataType: 'json',
  })
  .done(function(response) {
    $("#unidadDeMedidaVariable"+tipoVariable+"Modal").empty();
    $("#unidadDeMedidaVariable"+tipoVariable+"Modal").append(
     "<option value=' ' disabled selected>Seleccione una unidad de medida</option>"
      );

     $(response).each(function(index, el) {
       $("#unidadDeMedidaVariable"+tipoVariable+"Modal").append(
        '<option value='+el.id+'>'+el.nombre+'</option>'
       );
     });

  })
  .fail(function() {
    console.log("error");
  })
  .always(function() {
    console.log("complete");
  });
}
