$(document).ready(function(){	
	calculadora.init();
});
	

var calculadora = (function(){
    // Objeto la cual establecemos valores que vamos a usar mas adelante en este ámbito.
    var st = {
		resultado : "",
		resultadoOperacion : 0,
		signoMemoria : "",
		varAlt : 0,
		puntoCount : 0,
		ele : document.getElementsByClassName("tecla")
    };
   
    // Objeto vacío que guardará elementos que se manejan por HTML.
    var dom = function(){
		for( var i = 0; i < st.ele.length; i++){
			st.ele[i].addEventListener("mousedown",mdown);
			st.ele[i].addEventListener("mouseup",mup);				
			varAlt = st.ele[i].alt;
			if(varAlt < 10 && varAlt >= 0){
				st.ele[i].addEventListener("click",agregarNumero);			
			}

			if(varAlt == "punto"){
				st.ele[i].addEventListener("click",punto);			
			}		
			
			if(varAlt == "mas" || varAlt == "menos" || varAlt == "por" || varAlt == "dividido"){
				st.ele[i].addEventListener("click",operacion);
			}

			if(varAlt == "igual"){
				st.ele[i].addEventListener("click",total);			
			}
			
			if(varAlt == "On"){
				st.ele[i].addEventListener("click",limpiar);			
			}

			if(varAlt == "signo"){
				st.ele[i].addEventListener("click",signo);			
			}			
		}				
	};

	/* inicio: Funcionalidad*/		
	var mdown = function(t){
		var tecla = (this.alt != undefined ? this : document.getElementById(t));
		tecla.style.padding = "2px";
		console.log("var teclita down: ", tecla);		
	}	
	
	var mup = function (t){
		var tecla = (this.alt != undefined ? this : document.getElementById(t));
		tecla.style.padding = "0px";
		console.log("var teclita up: ", tecla);		
	}
	
	var agregarNumero = function (t){	
		var tecla = (this.alt != undefined ? this.alt : t);
	
		if(st.resultado.toString().length < 8){				
			if(st.resultado == 0 && tecla == 0){
			}else{
				st.resultado = st.resultado.toString() + tecla;
				document.getElementById("display").innerHTML = st.resultado;									
			}		
		}
	}
	
	var limpiar = function(){
		st.resultado = "";
		st.resultadoOperacion = 0;
		st.puntoCount = 0;
		document.getElementById("display").innerHTML = 0;			
	}
	
	var total = function(){		
		switch(st.signoMemoria){
			case "mas":					
				st.resultadoOperacion = Number(st.resultadoOperacion) + Number(document.getElementById("display").innerHTML);
			break;
			case "menos":
				st.resultadoOperacion = Number(st.resultadoOperacion) - Number(document.getElementById("display").innerHTML);
			break;
			case "por":
				st.resultadoOperacion = Number(st.resultadoOperacion) * Number(document.getElementById("display").innerHTML);
			break;
			case "dividido":
				st.resultadoOperacion = Number(st.resultadoOperacion) / Number(document.getElementById("display").innerHTML);
			break;	
		}			
		document.getElementById("display").innerHTML = st.resultadoOperacion;	
	}
	
	var punto = function(){
		if(st.puntoCount == 0){
			st.resultado = st.resultado.toString() + ".";
			document.getElementById("display").innerHTML = st.resultado;
			st.puntoCount++;
		}		
	}
	
	var signo = function(){		
		st.resultado = Number(st.resultado) * -1;
		document.getElementById("display").innerHTML = st.resultado;		
	}

	var mostrarteclar = function (event){
		var tecla = event.which || event.keyCode;
		document.querySelector("textarea").innerHTML = "tecla = " + String.fromCharCode(tecla);
		if(tecla <= 57 && tecla >= 48){
			agregarNumero(String.fromCharCode(tecla));
			mdown(String.fromCharCode(tecla));
			mup(String.fromCharCode(tecla));
		}else if(tecla == 43){
		// suma	
			operacion("mas");
		}else if(tecla == 45){
		// resta
			operacion("menos");	
		}else if (tecla == 42){
		// multi 
			operacion("por");		
		}else if (tecla == 47){
		// div
			operacion("dividido");		
		}else if (tecla == 61 || tecla == 13){
		// igual 			
			total();
		}else if (tecla == 95){
		// Guion bajo para negativo
			signo();
		}else if(tecla == 46){
		// punto
			punto();
		}		
	}
	/* Fin: Funcionalidad */
	
	/* Inicio: Operaciones */
	var operacion = function(t){
		var mensaje = "";
		if(st.resultadoOperacion > 0){
			switch(st.signoMemoria){
				case "mas":					
					st.resultadoOperacion = Number(st.resultadoOperacion) + Number(document.getElementById("display").innerHTML);
				break;
				case "menos":
					st.resultadoOperacion = Number(st.resultadoOperacion) - Number(document.getElementById("display").innerHTML);
				break;
				case "por":
					st.resultadoOperacion = Number(st.resultadoOperacion) * Number(document.getElementById("display").innerHTML);
				break;
				case "dividido":
					if(st.resultadoOperacion > 0){
						st.resultadoOperacion = Number(st.resultadoOperacion) / Number(document.getElementById("display").innerHTML);
					}else{
						mensaje = "no se puede dividir una cantidad igual a 0 o menor que ella";	
					}			
				break;
			}
		}else{			
			st.resultadoOperacion = document.getElementById("display").innerHTML;
		}		
		document.getElementById("display").innerHTML = mensaje;									
		
		st.signoMemoria = (this.alt != undefined ? this.alt : t);	
		st.resultado = "";
	}
	/* Fin: Operaciones */	
		
    // Función que inicializará los funciones decritas anteriormente.
    var initialize = function(){
        dom();
		document.onkeypress= mostrarteclar;
    };

    /* Retorna un objeto literal con el método init haciendo referencia a la 
       función initialize. */
    return{
        init:initialize
    }
})();

