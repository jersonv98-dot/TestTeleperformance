import React, {Component} from 'react';
import Select from 'react-select';
import {Input,Form, Label, Modal,ModalHeader,ModalBody,ModalFooter,Button} from 'reactstrap';

class FormRegisterCompany extends Component {

    tipoIdentificacion = React.createRef();
    state={
        indetifyTypes :[
            {
                value:"CC",
                label:"CEDULA DE CIUDADANIA"
            },
            {
                value:"CE",
                label:"CEDULA DE EXTRANJERIA"
            },
            {
                value:"NIT",
                label:"NIT"
            }
        ],
        showCompanyType: true,
        showPersonType: true,
        stateModal :false,
        IdentificationType: '',
        IdentificationNumber: '',
        CompanyName:'',
        FirstName:'',
        SecondName:'',
        FirstLastName:'',
        SecondLastName:'',
        Email:'',
        AuthorizeMesagesEmail:'',
        AuthorizeMessagesCell:'',
        result:[]
    }
     enviarForm = async() => {

        
        const uri = `https://localhost:5001/Api/Company/InsertCompany`;
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {   
                    IdentificationType: this.state.IdentificationType,
                    IdentificationNumber: this.state.IdentificationNumber,
                    CompanyName: this.state.CompanyName,
                    FirstName: this.state.FirstName,
                    SecondName: this.state.SecondName,
                    FirstLastName: this.state.FirstLastName,
                    SecondLastName : this.state.SecondLastName,
                    Email: this.state.Email,
                    AuthorizeMesagesEmail: this.state.AuthorizeMesagesEmail,
                    AuthorizeMessagesCell: this.state.AuthorizeMessagesCell
                })
        };
        const response = await fetch(uri, requestOptions)
        const jsonResponse = await response.json();
        this.setState({result : jsonResponse})
        this.validarRespuesta(this.state.result.success);
    }

    cerrarModal = ()=>{
        this.setState({stateModal: !this.state.stateModal})
      }
    validarRespuesta = (resultado) =>{
        console.log(resultado);
        if(resultado)
        this.setState({stateModal: !this.state.stateModal})
    }

    llenarForm = (event) =>{
        event.preventDefault();
        this.setState({
            IdentificationType : event.target[1].value,
            IdentificationNumber :event.target[2].value,
            CompanyName :event.target[3].value,
            FirstName :event.target[4].value,
            SecondName :event.target[5].value,
            FirstLastName :event.target[6].value,
            SecondLastName :event.target[7].value,
            Email :event.target[8].value,
            AuthorizeMesagesEmail :event.target[9].checked,
            AuthorizeMessagesCell :event.target[10].checked,

        }, ()=>{
            this.enviarForm();
        })
        
    }
    validarDocumento = (event) =>{
            if(event.value === "CC"){
                this.setState({
                    showPersonType:false,
                    showCompanyType : true
                })
            }
            else{
                this.setState({
                    showCompanyType:false,
                    showPersonType : true
                })
            }
    }
    
        render(){
        return(
            <div className="container-fluid">
                <legend><strong>Datos de la persona natural o jurídica que solicita el servicio de tramites virtuales:</strong></legend>
                
                    <Form onSubmit={this.llenarForm}>
                        <Label>Tipo de identificacion:</Label>
                        <Select options={this.state.indetifyTypes} name="tipoIdentificacion" onChange={(event) => this.validarDocumento(event)} />
                        <label >Numero de identificacion:</label>
                        <Input className="px-2" placeholder="Digite su numero de identificacion..." name="numIdentificacion" type="number"></Input>
                        <label hidden={this.state.showCompanyType}  >Nombre de la compañia:</label>
                        <Input placeholder="Teleperformance"  className="mt-1" name="nombreCompañia" hidden={this.state.showCompanyType}></Input> 
                        <label hidden={this.state.showPersonType} >Primer Nombre:</label>
                        <Input placeholder="TestTP" name="primerNombre" hidden={this.state.showPersonType}  ></Input>                    
                        <label hidden={this.state.showPersonType}  >Segundo Nombre:</label>
                        <Input placeholder="Test" name="segundoNombre" hidden={this.state.showPersonType}  ></Input>
                        <label hidden={this.state.showPersonType} >Primer Apellido:</label>
                        <Input placeholder="Front" name="primerApellido" hidden={this.state.showPersonType}  ></Input>  
                        <label hidden={this.state.showPersonType}  >Segundo Apellido:</label>
                        <Input placeholder="End" name="segundoApellido" hidden={this.state.showPersonType} ></Input>
                        <label  >Email:</label>
                        <Input  placeholder="example@example.com" name="email" type="email" ></Input>     
                  
                    <div className="form-check mt-3">
                        <Input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" name="autorizoSms" />
                        <Label className="form-check-label" >
                        Autorizo el envio de mensajes a mi telefono celular
                        </Label>
                    </div>
                    <div className="form-check mt-2">
                        <Input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" name="autorizoEmail"/>
                        <Label className="form-check-label" >
                        Autorizo el envio de mensajes a mi email
                        </Label>
                    </div>
                    <div  id="buttonGroup" className="btn-group btn-group-sm justify-content-center mt-4" style={{width: "100%"}} >
                    <div className="p-1" style={{width: "50%"}}>
                        <button id="buttonContinue" className="btn btn-primary" style={{width: "100%"}} type="submit">Continuar &gt;</button> 
                    </div>  
                    <div id="buttonBack" className="p-1" style={{width: "50%"}}>             
                        <button className="btn btn-dark" style={{width: "100%"}} type="submit">&lt; Regresar</button>
                    </div>                   
                </div>  
                </Form>
                <div id="modalError">
                    <Modal isOpen={this.state.stateModal}>
                        <ModalHeader>
                        Información
                        </ModalHeader>
                        <ModalBody> 
                            Se ha creado de manera exitosa el registro nuevo!
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

export default FormRegisterCompany;