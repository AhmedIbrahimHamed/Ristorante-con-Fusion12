import React, { Component } from 'react'
import {Modal, ModalBody, ModalHeader, Button, Row, Col, Label} from 'reactstrap'
import {LocalForm, Control, Errors} from 'react-redux-form'

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

export class CommentForm extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            isModalOpen: false
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.handleCommentSumbit = this.handleCommentSumbit.bind(this);
    }

    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleCommentSumbit(values){
        alert('Current State is: ' + JSON.stringify(values));
        this.toggleModal();
    }
    
    render() {
        return (
            <React.Fragment>
                <Button outline onClick={this.toggleModal}><i className="fa fa-edit fa-lg"></i> Submit Comment</Button>
                <div className="col-md-9 mb-3">
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleCommentSumbit(values)}>
                            <Row className="form-group">
                                <Label htmlFor={"rating"} md={3}>Rating</Label>
                                <Col xs={12}>
                                    <Control.select model=".rating" id="rating" name="rating"
                                    className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor={"yourName"} md={3}>Your Name</Label>
                                <Col xs={12}>
                                    <Control.text model=".yourName" id="yourName" name="yourName"
                                    className="form-control"
                                    validators={{minLength: minLength(3),maxLength: maxLength(15)}}/>
                                    <Errors className="text-danger"
                                        model=".yourName"
                                        show="touched"
                                        messages={{
                                            minLength: 'Must be greater than 2 characters ',
                                            maxLength: 'Must be 15 characters or less '
                                        }}/>                                    
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor={"comment"} md={3}>Comment</Label>
                                <Col xs={12}>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                    className="form-control" rows={6}/>                                        
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={10}>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
                </div>
            </React.Fragment>
        )
    }
}

export default CommentForm
