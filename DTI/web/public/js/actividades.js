$(document).ready(function() {
  actualizarPredecesora();
  //actualizamos la lista de actividades recien recargada la pagina
  actualizarParent(1);
  //actualizar el calendario
  actualizarCalendario();
  limpiarModal();
//EVENTOS EN LA VISTA
  $('#modalActividad').on('hidden.bs.modal', function (e) {
      limpiarModal();
    });
  $("body").on('click', '#abrirModalActividad' ,function (event) {
    $("#guardarActividades").attr('value', 'Guardar');
  });
  //ajax para guardar actividades
  $("#guardarActividades").click(function(e){
      e.preventDefault();
      var accion, nombreAct, descripcionAct,fechaInicioAct, fechaFinAct,predecesoraAct, cantidadAct,duracion, idActividad;
      nombreAct=  $('#nombreActividad').val().trim();
      descripcionAct=$('#descripcionActividad').val().trim();
      fechaInicioAct= $('#fechaInicial').val().trim();
      fechaFinAct=$('#fechaFinal').val().trim();
      predecesoraAct=$('#actPredecesora').val().trim();
      cantidadAct=$('#resultado').html().trim();
      accion=$("#guardarActividades").attr("value");
      idActividad=$("#idActividad").attr('value');

    if( nombreAct==''|| descripcionAct == '' || fechaInicioAct == '' || fechaFinAct ==  '' || cantidadAct == '' ){
      swal("Lo sentimos :(","Debe llenar todos los campos");
    }
    else {
      $.ajax({
        type:'POST',
        url: Routing.generate('actividad_ajax_agregar'),
        data:{
          "nombreActividad":  nombreAct,
          "descripcionActividad":descripcionAct,
          "fechaInicio":fechaInicioAct,
          "fechaFinAct":  fechaFinAct,
          "actividadPredecesora":  predecesoraAct,
          "duracion":cantidadAct,
          "accion":accion,
          "idActividad":idActividad,
          "idProyecto":obtenerIdProyecto(),

        },
        dataType:'json',
        success: function(response){

          $('#nombreActividad').val("");
          $('#descripcionActividad').val("");
          $('#fechaInicial').val("");
          $('#fechaFinal').val("");
          $('#actPredecesora').val("");
          $('#resultado').html("");
          $("#modalActividad").modal('hide');
          calcularDuracionActividadPadre(response);

          //actualizamos los parent en lista de actividades
          actualizarParent(1);
          actualizarCalendario();
        //funcion que actualiza las actividades en el select
        actualizarPredecesora();

        } // fin del success
      })//fin del ajax
    }// fin del else

   });// fin del click function de guardar actividades

   //Ajax para editar actividades
  $("body").on('click', 'li.editarActividad' ,function (event) {
     event.preventDefault();
     //Recuperamos el id de la actividad que será editada
     var idActividad=$(this).children("a").attr("href");
     $("#guardarActividades").attr('value', 'editar');

     $.ajax({
       type:'POST',
         url: Routing.generate('actividad_ajax_editar'),
       data:{
         //enviamos el id de la actividad a editar
         "idActividad":  idActividad,
       },
       dataType:'json',
     success: function(response){

       $('#nombreActividad').val(response.nombreActividad);
       $('#descripcionActividad').val(response.descripcionActividad);
       $('#fechaInicial').val(response.fechaInicio);
       $('#fechaFinal').val(response.fechaFin);
       $('#resultado').text(response.duracion);
       $('#actPredecesora').val(response.padre);
       $('#idActividad').attr('value',response.id);
       $("#modalActividad").modal();

       // funcion que devuelve la actividad padre de la actividad a editar
       // devuelve la lista de actividades tambien, pero excluyendo la actividad a editar
       // al enviar como parametro un numero 2
       llenarActividadPredecesora(response.padre,idActividad,2);

       // recalcularemos la duracion de la actividad padre
       calcularDuracionActividadPadre(idActividad);

     } // fin del success

     })//fin del ajax
   });
  $("body").on('click', 'li.eliminarActividad' ,function (event) {
     event.preventDefault();
     //Recuperamos el id de la actividad que será editada
     var idActividad=$(this).children("a").attr("href");

     //emitimos una alerta de que se borrara en cascada
       swal({
       title: "¿Seguro que desea continuar?",
       text: "Se borrará la actividad y sus subactividades",
       type: "warning",
       showCancelButton: true,
       confirmButtonColor: "#DD6B55",
       confirmButtonText: "¡Adelante!",
       cancelButtonText: "Cancelar",
       closeOnConfirm: false,
       closeOnCancel: false },

       function(isConfirm){
         if (isConfirm) {
                 //se ejecuta el ajax tras la confirmacion
                     $.ajax({
                       type: 'POST',
                       url: Routing.generate('actividad_ajax_eliminar'),
                       data: {
                                "idActividad" : idActividad,
                             },
                       dataType: 'json',
                       success: function(response) {
                         $("#"+response.idActividad).remove();
                         //actualizamos los parent en lista de actividades
                         actualizarParent(1);

                         //funcion que actualiza las actividades en el select
                         actualizarPredecesora();

                     }//fin del success
                   }); //fin del ajax

           swal("¡Hecho!",
             "Borrado correctamente.",
             "success");
         } else {
           swal({
             title: "Cancelado",
             text: "Se cerrará en 1 segundo.",
             timer: 1000,
             showConfirmButton: false
           });
         }
       });




     });//fin de eliminar

 //FUNCIONES DENTRO DE LA VISTA
  function limpiarModal(){
    $('#nombreActividad').val("");
    $('#descripcionActividad').val("");
    $('#fechaInicial').val("");
    $('#fechaFinal').val("");
    $('#actPredecesora').val("");
    $('#resultado').html("");
    $('#idActividad').attr('value','');
  }
  // funcion que actualiza las actividades predecesoras del  modal
  function actualizarPredecesora(){

    $.ajax({
        type:'POST',
        url: Routing.generate('actividad_ajax_obtener_actividad'),
        data:{
          "idProyecto":obtenerIdProyecto(),
        },
        dataType:'json',
        success:function(response){
          $("#actPredecesora").empty();
           $(response).each(function (index, el) {
            $("#actPredecesora").append(
              "<option value='"+ el.id +"'>"+el.nombre+"</option>"
            );
           });
        }
      });
    }
  //funcion que actualiza y devuele todas las actividades y su respectiva jerarquia de hijos
  function actualizarParent(parametro){
              $.ajax({
                type:'POST',
                url: Routing.generate('actividad_ajax_obtener_actividad'),
                data:{
                  "parametroAjax":  parametro,
                  "idProyecto":obtenerIdProyecto(),
                    },
                    dataType:'json',
                    success: function(response){
                      var noEncontrados=[];
                      // console.log("Actividades");
                      // console.log(response);
                      // console.log("Fin actividades");

                      $("#demo").empty();
                      //Funcion que devuelve los hijos a sus padres
                      $(response).each(function(index, el) {

                      if (el.parent==0) {

                        $("#demo").append(

                        "  <div class='accordion-group padre'>" +
                             "<div class='accordion-heading area'>"+
                                 "<a class='accordion-toggle' data-toggle='collapse' href='#"+el.id+"'>"+el.nombre+"</a>" +

                                 "   <div class='accordion-inner'>"+
                                         " <ul class='nav nav-list'>"+
                                             " <li>"+
                                                 " <a href='#'><i class='icon-chevron-right'>"+ "</i> "+
                                                 "Inicio: "+el.fechaInicio+"</a>"+
                                             " </li>"+

                                             " <li>"+
                                                  "<a href= '#'><i class='icon-chevron-right'>"+ " </i>"+
                                                    "Fin: "+el.fechaFin+"</a>"+
                                              "</li>"+
                                          "</ul>"+
                                     "</div>"+

                                 "<div class='dropdown edit drop'>"+//boton de edicion
                                 "  <a class='dropdown-toggle icon-pencil' data-toggle='dropdown' href='#' style='font-style: italic'></a>"+

                                   "<ul class='dropdown-menu dropmenu'>"+
                                      "  <li class='editarActividad'>"+
                                       "    <a href='"+el.id+"'><i class='icon-pencil'></i> Editar</a>"+
                                       "</li>"+

                                     "  <li class='divider'></li>"  +
                                     "  <li class='eliminarActividad'>"+
                                       "<a  href='"+el.id+"'><i class='icon-remove'></i> Eliminar</a>"+
                                       "</li>"+
                                   "</ul>"+

                               "</div>"+//Boton de edicion


                              "</div>"+

                             "<div class='accordion-body collapse' id='"+ el.id+"'>"+
                                 "<div class='accordion-inner' >"+

                                 "</div>"+
                             "</div>"+
                         "</div>"
                              );

                        }else{
                          if ( !($("#"+el.parent+"> .accordion-inner").length )) {
                                noEncontrados.push(el.parent);
                              }
                       $("#"+el.parent+"> .accordion-inner").append(
                         "<div class='accordion-group hijo'>" +
                              "<div class='accordion-heading equipamento'>"+
                                  "<a class='accordion-toggle' data-toggle='collapse' href='#"+el.id+"'>"+el.nombre+"</a>" +
                                  "   <div class='accordion-inner'>"+
                                        " <ul class='nav nav-list'>"+
                                            " <li>"+
                                                " <a href='#'><i class='icon-chevron-right'>"+ "</i> "+
                                                "Inicio: "+el.fechaInicio+"</a>"+
                                            " </li>"+

                                            " <li>"+
                                                 "<a href= '#'><i class='icon-chevron-right'>"+ " </i>"+
                                                   "Fin: "+el.fechaFin+"</a>"+
                                             "</li>"+
                                         "</ul>"+
                                      "</div>"+

                                  "<div class='dropdown edit drop'>"+//boton de edicion
                                  "  <a class='dropdown-toggle icon-pencil' data-toggle='dropdown' href='#' style='font-style: italic'></a>"+

                                    "<ul class='dropdown-menu dropmenu'>"+
                                       "  <li class='editarActividad'>"+
                                        "    <a href='"+el.id+"'><i class='icon-pencil'></i> Editar</a>"+
                                        "</li>"+

                                      "  <li class='divider'></li>"  +
                                      "  <li class='eliminarActividad'>"+
                                            "<a  href='"+el.id+"'><i class='icon-remove'></i> Eliminar</a>"+
                                        "</li>"+
                                    "</ul>"+
                                "</div>"+//Boton de edicion
                               "</div>"+


                              "<div class='accordion-body collapse' id='"+ el.id+"'>"+
                                  "<div class='accordion-inner'>"+
                               "</div>"+
                              "</div>"+
                          "</div>"
                       );// fin del append  del el.parent
                     }

                   } // fin del funcion response


                 );//fin del each response


                   $(noEncontrados).each(function(index, el) {
                         console.log(el);
                     $("#"+el.parent+"> .accordion-inner").append(
                       "<div class='accordion-group hijo'>" +
                            "<div class='accordion-heading equipamento'>"+
                                "<a class='accordion-toggle' data-toggle='collapse' href='#"+el.id+"'>"+el.nombre+"</a>" +
                                "   <div class='accordion-inner'>"+
                                      " <ul class='nav nav-list'>"+
                                          " <li>"+
                                              " <a href='#'><i class='icon-chevron-right'>"+ "</i> "+
                                              "Inicio: "+el.fechaInicio+"</a>"+
                                          " </li>"+

                                          " <li>"+
                                               "<a href= '#'><i class='icon-chevron-right'>"+ " </i>"+
                                                 "Fin: "+el.fechaFin+"</a>"+
                                           "</li>"+
                                       "</ul>"+
                                    "</div>"+

                                "<div class='dropdown edit drop'>"+//boton de edicion
                                "  <a class='dropdown-toggle icon-pencil' data-toggle='dropdown' href='#' style='font-style: italic'></a>"+

                                  "<ul class='dropdown-menu dropmenu'>"+
                                     "  <li class='editarActividad'>"+
                                      "    <a href='"+el.id+"'><i class='icon-pencil'></i> Editar</a>"+
                                      "</li>"+

                                    "  <li class='divider'></li>"  +
                                    "  <li class='eliminarActividad'>"+
                                          "<a  href='"+el.id+"'><i class='icon-remove'></i> Eliminar</a>"+
                                      "</li>"+
                                  "</ul>"+
                              "</div>"+//Boton de edicion
                             "</div>"+


                            "<div class='accordion-body collapse' id='"+ el.id+"'>"+
                                "<div class='accordion-inner'>"+
                             "</div>"+
                            "</div>"+
                        "</div>"
                     );// fin del append  del el.parent
                   });



               }//fin del success
             });//fin del ajax
           }
  function llenarActividadPredecesora(idActividadPredecesora, idActividad,parametro){
      $.ajax({
        type:'POST',
          url: Routing.generate('actividad_ajax_obtener_actividad'),
          data:{
            "idActividad":  idActividad,
            "parametroAjax":  parametro,
            "idProyecto":obtenerIdProyecto(),
            },
          dataType:'json',
        success: function(response){
          $("#actPredecesora").empty();
           $(response).each(function (index, el) {
              //si el id que se recoge es iual al de actividad predecesora se muestra entonces como actividad seleccionada
               if (el.id==idActividadPredecesora) {
               $("#actPredecesora").append(
                 "<option selected value='"+ el.id +"'>"+el.nombre+"</option>"
               );
             }else {
               // mostramos todas las actividades excluyendo la actividad predecesora, ya que no puede ser predecesora
               //ella misma
               $("#actPredecesora").append(
                 "<option value='"+ el.id +"'>"+el.nombre+"</option>"
               );
             }
           });

        } // fin del success
        })//

    }//fin de la funcion llenarActividadPredecesora
  //inicio de la funcion calcular duracion actividad padre a partir de un id de un hijo
  function calcularDuracionActividadPadre(idActividad){
    $.ajax({
      type:'POST',
        url: Routing.generate('actividad_ajax_calcular_duracion'),
        data:{
          "idActividad":  idActividad,
          },
        dataType:'json',
      success: function(response){
        // $("#actPredecesora").empty();
        console.log(response);
        // swal("fechas",response);

      } // fin del success
      })//
  }//fin de la funcion obtener duracion actividad padre
  //ajax actualizar Calendario
  function actualizarCalendario() {
      $.ajax({
        url:  Routing.generate('ajax_calendario'),
        type: 'POST',
        dataType: 'json',
        data:{
          "idProyecto":obtenerIdProyecto(),           
        },
      })
      .done(function(response) {
        crearCalendario(response);
        // console.log(response);
      })
      .fail(function() {
        console.log("error");
      })
      .always(function() {
        console.log("complete");
      });
    }
  function crearCalendario(elementos) {
    // página cargada, inicializamos el calendario...
      var actividades=new Array();
      $(elementos).each(function(index, el) {
          actividades.push({
                title:el.tittle,
                start:el.start,
                end:el.end
            });
      });
        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();
        $('#calendario').empty();
        var calendario=$('#calendario').fullCalendar({
          header: {
              left: 'prev,next today',
              center: 'title',
              right: 'month,basicWeek,basicDay'
          },
          navLinks: true, // can click day/week names to navigate views
      		eventLimit: true, // allow "more" link when too many events
          editable: false,
          droppable: false, // this allows things to be dropped onto the calendar !!!
          events: actividades,
        });
      }


});// fin del document ready
