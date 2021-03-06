import React, { Component } from 'react';
import { Container, Row } from 'reactstrap'
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { ListGroup, ListGroupItem } from 'reactstrap';


class GerenciamentoEquipamentos extends Component{

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            description: ''
        };

        this.state = {
          modal: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        fetch("http://localhost:3001/api/equipments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem("token")
            },
            body: JSON.stringify({
                "name": this.state.name,
                "description": this.state.description
            })
        }).then((response) => response.json()).then((json) => {
            if (json.success) {
                alert("Equipamento cadastrado com sucesso!")
                this.toggle();
            }
            else {
                alert("Não foi possível adicionar o equipamento.");
            }
        });

    }

    render(){
        return(
            <div>
                <Container>
                    <Row>
                        <Col sm="12" md={{ size: 3, offset: 9 }}><Button color="success" onClick={this.toggle}>Cadastrar Equipamento</Button></Col>
                        <Modal isOpen={this.state.modal} toggle={this.toggle}>
                            <Form onSubmit={this.handleSubmit}>
                                <ModalHeader toggle={this.toggle}>Cadastro de Equipamento</ModalHeader>
                                <ModalBody>
                                    <FormGroup>
                                        <Label for="name">Nome</Label>
                                        <Input
                                            type="text"
                                            name="name"
                                            onChange={(e) => this.setState({ name: e.target.value })}
                                            required />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="exampleText">Descrição</Label>
                                        <Input
                                            type="textarea"
                                            name="description"
                                            onChange={(e) => this.setState({ description: e.target.value })}
                                            required />
                                    </FormGroup>
                                </ModalBody>
                                <ModalFooter>
                                    <Button type="submit" color="success" >Cadastrar</Button>
                                </ModalFooter>
                            </Form>
                        </Modal>
                    </Row>
                    <Row>
                        <ListGroup>
                            <ListGroupItem></ListGroupItem>
                        </ListGroup>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default GerenciamentoEquipamentos;
