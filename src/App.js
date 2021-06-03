import React, {Component} from 'react';
import Register from './component/Register';
import {Button,ModalBody,Modal,ModalHeader,ModalFooter} from 'reactstrap';
import FormRegisterCompany from './component/FormRegisterCompany';


//Metodo principal de renderizacion de la pagina.
class App extends Component {


  
  state ={
    hiddenRegister:false,
    hiddenFormRegister:true,
    stateModal :false,
    NIT :'',
    result:[],
    valuesFormRegister : []
  }
  cerrarModal = ()=>{
    this.setState({stateModal: !this.state.stateModal})
  }
  validarRespuesta = (resultado) =>{
    if(resultado === undefined){
      return null;
    }
   if(!resultado){
    this.setState({stateModal: !this.state.stateModal})
   }   
   else{
     this.setState({hiddenRegister:true,hiddenFormRegister:false})
   }
   
  }

  show = () =>{
    this.setState({showRegister: false});
  }

  validarCompania = async () =>{
    const url = `https://localhost:5001/Api/Company/ValidateCompanyById?id=${this.state.NIT}`;
   
     const response = await fetch(url);
     const jsonResponse = await response.json();
     this.setState({result: jsonResponse})
     console.log(this.state.result.success);
      this.validarRespuesta(this.state.result.success)
    
  }
  valuesForm = (value) =>{
    this.setState({valuesFormRegister: [...this.state.valuesFormRegister, value]})
    console.log(this.state.valuesFormRegister);
  }
  datosBusqueda = (NIT) => {
    this.setState({
      NIT
    }, () =>{
      this.validarCompania();
    })
  }
  render() {
    return(
    <div className="app container mt-4 px-3">
        <div id="register" hidden={this.state.hiddenRegister}>          
          <Register
           datosBusqueda={this.datosBusqueda}
           />
           
        </div>
        <div id="formRegister" hidden={this.state.hiddenFormRegister}>
              <FormRegisterCompany
              valuesForm ={this.valuesForm}
              />
        </div>
        <div id="modalError">
          <Modal isOpen={this.state.stateModal}>
            <ModalHeader>
              Información
            </ModalHeader>
            <ModalBody> 
                La identificacion de la empresa no se ha encontrado.
            </ModalBody>
            <ModalFooter>
                <Button className="btn btn-dark btn-dark-sm" onClick={this.cerrarModal}>Cerrar</Button>
            </ModalFooter>         
          </Modal>
    </div>
        </div>
        
    );    
  }   
  
}

export default App;
