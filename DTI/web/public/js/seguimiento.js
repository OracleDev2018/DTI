 function llenarListaIndicadoresDefinidos() {
    $.ajax({
      url: Routing.generate('ajax_indicadores_definidos'),
      type: 'POST',
      dataType: 'json',
      data: {
        idProyecto: obtenerIdProyecto(),
      }
    })
    .done(function(response) {
      // console.log(response);
      $("#listaIndicadoresDefinidos").empty();
      if (response==null) {
        $("#abrirModalSeguimientoIndicador").attr('disabled', 'disabled');
        $("#tituloIndicadoresDefinidos").append('Debe definir primero un indicador')

      }else {
        $(response).each(function(index, el) {
          $("#abrirModalSeguimientoIndicador").removeAttr('disabled');
          $("#tituloIndicadoresDefinidos").append('Seleccione su indicadore definido ');

          $("#listaIndicadoresDefinidos").append(
            '<option value='+el.id+'>'+el.nombre+'</option>'
          );
        });

      }

    })
    .fail(function() {
      console.log("error");
    })
    .always(function() {
      console.log("complete");
    });
  }
$("body").on('click','#abrirModalSeguimientoIndicador', function() {
  var idIndicadorSeleccionado;
  idIndicadorSeleccionado=obtenerSeleccionado("listaIndicadoresDefinidos").value;
  $("#modalAgregarDatos").modal("show");
});
