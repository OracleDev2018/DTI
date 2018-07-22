$("body").on('click',"button#agregarObjetivo",function () {
 var objetivo;
 objetivo=$("#squirrelbundle_objetivo_descripcionObjetivo").val().trim();

 if(objetivo==''){
   swal("Oops", "Por favor ingrese todos los datos", "error")
 }else {
     $.ajax({
       url: Routing.generate('ajax_agregar_objetivo'),
       type: 'POST',
       dataType: 'JSON',
       data: {
         "descripcion": objetivo,
         "idProyecto":obtenerIdProyecto(),
       }
     })
     .done(function() {
       $("#modalObjetivo").modal('hide');
       limpiarModalObjetivoAgregar();
      actualizarTabla();
     })
     .fail(function() {
       console.log("error button#agregarObjetivo");
     });
   }
 });
$("body").on('click', "button.updateObj",function() {
   var idObjetivo;
    idObjetivo=$(this).attr('id');
    $.ajax({
      type: 'POST',
      url: Routing.generate('ajax_obtener_objetivo') ,
      data: {
               "idObjetivo" : idObjetivo,
            },
      dataType: 'json',
      success: function(response) {

        $("#descripcion").val(response.descripcion);
        $("#myModal").modal();
        $("#myModal").on('shown.bs.modal', function () {
          $('#descripcion').focus()
        });
        $("#editarModalObj").attr("value", response.idObjetivo);
    }});
  });
$("body").on('click', "button.deleteObj",function() {
 var idObjetivo;
   idObjetivo=$(this).attr('id');
   $.ajax({
     type: 'POST',
     url: Routing.generate('ajax_eliminar_objetivo') ,
     data: {
              "idObjetivo" : idObjetivo,
           },
     dataType: 'json',
     success: function(response) {
      actualizarTabla();
   }});

});
$("body").on("click", "button#editarModalObj", function(){
 var idObjetivo, descripcion;
    idObjetivo=$(this).attr('value');

   descripcion=$("#descripcion").val().trim();
   if(descripcion==""){
     swal('oops',"Por favor Asegurate de llenar todos los campos correctamente", 'error');
   }else{

   $.ajax({
     type: 'POST',
     url: Routing.generate('ajax_editar_objetivo') ,
     data: {
              "idObjetivo" : idObjetivo,
              "descripcion":descripcion,
           },
     dataType: 'json',
     success: function(response) {
       $("#myModal").modal('hide');
       $("#descripcion"+response.idObjetivo).text(response.descripcion);
       limpiarModalObjetivoAgregar();

   }});
 }

});
function limpiarModalObjetivoAgregar() {
  $('#squirrelbundle_objetivo_descripcionObjetivo').val("");
};
function limpiarModalObjetivoEditar() {
  $('#descripcion').empty();
};
function actualizarTabla () {
    // var idproyecto=$("#squirrelbundle_objetivo_idProyecto").val();

    $.ajax({
      url:  Routing.generate('ajax_obtener_lista_objetivo') ,
      type: 'POST',
      dataType: 'JSON',
      data: {"idProyecto": obtenerIdProyecto(),}
    })
    .done(function(response) {

      $('#objetivos').empty();

      $(response).each(function(index, el) {

        // {% if estado.nombreEstado !='cancelado' %}
        $('#objetivos').append(
          "<tr id='"+el.id+"'>"+
            "<td ><p class='col-md-10' id='descripcion"+el.id+"'> "+el.descripcionObjetivo +"</p></td>"+
           "    <td>"+
               "  <button type='button'  data-uid='1' class='updateObj btn btn-success btn-sm' id='"+el.id+"'>"+
                    "<span class='glyphicon glyphicon-pencil'></span>"+
                  "</a>"+
                "</button>"+
              "</td>"+
               "<td>"+
                 "<button type='button'  data-target='#delete' data-uid='1' class='delete deleteObj btn btn-primary btn-sm' id='"+el.id+"'>"+
                   "<span class='glyphicon glyphicon-trash'></span>"+
                 "</button>"+
               "</td>"+
          "</tr>"
        );


        //   {% else %}
        //   $('#objetivos').append(
        //     "<tr id='"+el.id+"'>"+
        //    "   <td ><p class='col-md-10' id='descripcion"+el.id+"'> "+el.descripcionObjetivo +"</p></td>"+
        //     "</tr>"
        //   );
        //
        // {% endif %}


      });

    })
    .fail(function() {
      console.log("error");
    });
 }
