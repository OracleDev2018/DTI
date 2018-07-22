$(document).ready(function() {
  obtenerEstados();
  $('.form_date_filtro').datetimepicker({
    language:  'es',
    weekStart: 1,
    todayBtn:  1,
    autoclose: 1,
    todayHighlight: 1,
    startView: 2,
    minView: 2,
    forceParse: 0
    });
});

$("body").on('click','li.pasos', function() {
  swal(
       'Oops...',
       'Debes de agregar un proyeto para poder continuar!',
       'warning'
     );
});



$("body").on('click',"input#agregarProyecto", function (event) {
  event.preventDefault();
  var tema, nombre, justificacion, resultado, presupuesto, categoria;
  nombre=$("#squirrelbundle_proyecto_nombreProyecto").val();
  tema=$("#squirrelbundle_proyecto_temaProyecto").val();
  justificacion=$("#squirrelbundle_proyecto_justificacionProyecto").val();
  resultado=$("#squirrelbundle_proyecto_resultadosEsperados").val();
  presupuesto=$("#squirrelbundle_proyecto_presupuesto").val();
  categoria=$("#squirrelbundle_proyecto_idCategoriaProyecto").val();
  idUsuario=obtenerIdUsuario();

  if (tema==""|| nombre==""|| justificacion==""|| resultado==""|| presupuesto==""|| categoria=="") {
    swal("oops", "llenar todos los campos", "error");

  }else{
  $.ajax({
    url: Routing.generate('ajax_proyecto_agregar'),
    type: 'POST',
    dataType: 'JSON',
    data: {
     "nombre" :nombre,
     "tema":tema,
     "justificacion":justificacion,
     "resultado":resultado,
     "presupuesto":presupuesto,
     "categoria":categoria,
     "idUsuario":idUsuario,
   },
  })
  .done(function(response) {
    idPro=response;
    swal({
      position: 'center',
      type: 'success',
      title: 'Se ha agregado su proyecto. Puede continuar editando',
      showConfirmButton: false,
      timer: 1500
    });
     $('#main-content').load("/proyecto/"+idPro+"/edit");
  })
  .fail(function() {
    console.log("error");
  })
  .always(function() {
    console.log("complete");
  });
 }
});
$("body").on('click', 'button#editarProyecto', function (e) {
   e.preventDefault();


   var tema, nombre, justificacion, resultadosEsperados, presupuesto, idCategoria;
   tema=$("#squirrelbundle_proyecto_temaProyecto").val().trim();
   nombre=$("#squirrelbundle_proyecto_nombreProyecto").val().trim();
   justificacion=$("#squirrelbundle_proyecto_justificacionProyecto").val().trim();
   resultadosEsperados=$("#squirrelbundle_proyecto_resultadosEsperados").val().trim();
   presupuesto=$("#squirrelbundle_proyecto_presupuesto").val().trim();
   idCategoria=$("#squirrelbundle_proyecto_idCategoriaProyecto").val().trim();
   if (tema==""|| nombre==""|| justificacion==""|| resultadosEsperados==""|| presupuesto==""|| idCategoria=="") {
     swal("oops", "llenar todos los campos", "error");

   }else {
     $.ajax({
       url:Routing.generate('ajax_proyecto_editar'),
       type: 'POST',
       dataType: 'json',
       data: {
         "tema":tema,
         "nombre":nombre,
         "justificacion": justificacion,
         "resultadosEsperados":resultadosEsperados,
         "presupuesto":presupuesto,
         "idCategoria":idCategoria,
         "idProyecto":obtenerIdProyecto(),
       }
     })
     .done(function(response) {
       idPro=response;
       swal({
         position: 'center',
         type: 'success',
         title: 'Se ha editado su proyecto',
         showConfirmButton: false,
         timer: 1500
       });
     })
     .fail(function() {
       console.log("error");
     })
     .always(function() {
       console.log("complete");
     });
 }


});


//FUNCIONES PARA EL FILTRADO DE PROYECTO



function obtenerEstados() {
  $.ajax({
    url: Routing.generate('ajax_obtener_estadoproyecto'),
    type: 'POST',
    dataType: 'JSON',

  })
  .done(function(response) {
      $(response).each(function(index, el) {
        $("#estados").append(
          "<div class='checkbox'>"+
              "<label>"+
                "  <input class='seleccionEstado' type='checkbox' value='"+el.nombre+"'>"+
                   el.nombre +
              "</label>"+
          "</div>"
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


function mostrarResultados(response) {
  if (response==null) {
    $("#noCoincidencias").remove();
    $("#tablaProyectos").append(
        "  <div class='alert alert-danger' role='alert' id='noCoincidencias'>No hay coincidencias en la búsqueda.</div>"
      );
  }else {
    $("#noCoincidencias").remove();
  }
  var idDeConsulta=[] , elementosDeLaTabla=[], ocultar=[], mostrar=[];
  $(response).each(function(index, el) {
    idDeConsulta.push(el.id.toString());
  });

  $("#tablaProyectos").find('tr').each(function(index1,elemento) {
    elementosDeLaTabla.push(elemento.id.toString());
  });

  $(elementosDeLaTabla).each(function(index, el) {
    if($.inArray(el, idDeConsulta)==-1){
      ocultar.push(el);
    }else {
      mostrar.push(el);

    };


  });
   $(ocultar).each(function(index, el) {
     $("#"+el).hide();
   });
   $(mostrar).each(function(index, el) {
     $("#"+el).show();
   });

}


function busqueda() {
  var nombre=$('#filtroNombre').val();
  var investigador= $('#filtroInvestigador').val();
  var estados=[];
  var fechaInicioAct= $('#fechaInicial').val().trim();
  var fechaFinAct=$('#fechaFinal').val().trim();
  $(" input.seleccionEstado:checked").each(function(index, el) {
     estados[index]=el.value;

  });
  $.ajax({
    url:Routing.generate('ajax_proyecto_filtrar'),
    type: 'POST',
    dataType: 'json',
    data: {
      'nombre':nombre,
      'investigador':investigador,
      'fechaFin':fechaFinAct,
      'fechaInicio':fechaInicioAct,
      'estado':JSON.stringify(estados),
    }
  })
  .done(function(response) {
    mostrarResultados(response);

  })
  .fail(function() {
    console.log("error");
  })
  .always(function() {
    console.log("complete");
  });
}


$('#mostrarTodos').on('click', function() {
  $("#noCoincidencias").remove();
  $("#tablaProyectos").find('tr').each(function(index,elemento) {
    $("#"+elemento.id).show();
  });
});
$('#filtroNombre').on('keyup', function() {
   busqueda();
 });
$('#filtroInvestigador').on('keyup', function() {
    busqueda();
});
$('body').on('change','input.seleccionEstado', function() {
    busqueda();
  });

$('body').on('change','input#fechaInicial', function() {
     busqueda();
});
$('body').on('change','input#fechaFinal', function() {
     busqueda();
});
