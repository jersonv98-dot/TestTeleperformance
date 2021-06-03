import React, {Component} from 'react';

//Permite renderizar la vista  de registro en la pagina principal.
class Register extends Component{
    
    busquedaRef = React.createRef();
    getCompany = (e) =>{
        e.preventDefault();
         this.props.datosBusqueda(this.busquedaRef.current.value);
    }
    render(){
        return(
         <div className="container-fluid">
             <legend><strong>Inscripción al servicio:</strong></legend>
            <p className="">Ingrese el NIT de la persona natural o jurídica para la que realizara el trámite, sin incluir el digito de verificación. Luego seleccione <strong>Continuar</strong> para completar su solicitud.</p>
                <div>
                    <label className="">NIT:</label>
                    <p>{this.props.mensaje}</p>
                    <input ref={this.busquedaRef} type="text" placeholder="Ingresa el numero de identificacion..." className="form-control form-control-md mt-2" type="number"></input>                           
                </div>
                <div  id="buttonGroup" className="btn-group btn-group-sm justify-content-center mt-4" style={{width: "100%"}} >
                    <div className="p-1" style={{width: "50%"}}>
                        <button id="buttonContinue" className="btn btn-primary" onClick={this.getCompany} style={{width: "100%"}} type="submit">Continuar &gt;</button> 
                    </div>  
                    <div id="buttonBack" className="p-1" style={{width: "50%"}}>             
                        <button className="btn btn-dark" style={{width: "100%"}} >&lt; Regresar</button>
                    </div>                   
                </div> 
               
         </div>
                
        
        );
    }
}

export default Register;