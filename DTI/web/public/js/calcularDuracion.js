function isValidDate(day,month,year)
	{
		var dteDate;
		month=month-1;
		dteDate=new Date(year,month,day);
		return ((day==dteDate.getDate()) && (month==dteDate.getMonth()) && (year==dteDate.getFullYear()));
	}

	/**
	 * Funcion para validar una fecha
	 * Tiene que recibir:
	 *  La fecha en formato español dd/mm/yyyy
	 * Devuelve:
	 *  true o false
	 */
	function validate_fecha(fecha)
	{
		var patron=new RegExp("^([0-9]{1,2})([-])([0-9]{1,2})([-])(19|20)+([0-9]{2})$");

		if(fecha.search(patron)==0)
		{
			var values=fecha.split("-");
			if(isValidDate(values[0],values[1],values[2]))
			{
				return true;
			}
		}
		return false;
	}

    function calcularDias(n)
    {
			var fechaInicial=document.getElementById("fechaInicial").value;
			var fechaFinal=document.getElementById("fechaFinal").value;
		var resultado="";
		if(validate_fecha(fechaInicial) && validate_fecha(fechaFinal))
		{
			inicial=fechaInicial.split("-");
			final=fechaFinal.split("-");
			// obtenemos las fechas en milisegundos
			var dateStart=new Date(inicial[2],(inicial[1]-1),inicial[0]);
            var dateEnd=new Date(final[2],(final[1]-1),final[0]);
	            if(dateStart<=dateEnd)
	            {
					// la diferencia entre las dos fechas, la dividimos entre 86400 segundos
					// que tiene un dia, y posteriormente entre 1000 ya que estamos
					// trabajando con milisegundos.
					// resultado="La diferencia es de "+(((dateEnd-dateStart)/86400)/1000)+" días";
	        resultado=(((dateEnd-dateStart)/86400)/1000);

				}else{
					if(n==1){

						swal("Lo sentimos :(","Debes agregar una fecha igual o  anterior a la fecha final");
						 $('#fechaInicial').val("");
					}
					else{
						swal("Lo sentimos :(","Debes agregar una fecha igual o  posterior a la fecha inicial");
						 $('#fechaFinal').val("");

			 				}
				}
		}else{
			if(!validate_fecha(fechaInicial))
			swal("Disculpa","Ingresa una fecha inicial");
			// if(!validate_fecha(fechaFinal))
			// swal("Lo sentimos :(","Debes Ingresar  fecha de inicio y fecha final de la actividad");
		}
		document.getElementById("resultado").innerHTML=resultado;
    }
