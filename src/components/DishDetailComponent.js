import React, {Component} from 'react'
import {Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem, Modal, ModalBody, ModalHeader, Button, Row, Col, Label
} from 'reactstrap'
import {LocalForm, Control, Errors} from 'react-redux-form'
import {Link} from 'react-router-dom'

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

function RenderComments({comments}) {
    var resultComments = <h3>Comments</h3>
    if (comments.length) {
        let commentList = comments.map(comObj => {
            var date = new Date(comObj.date).toDateString();
            return (
                <ul key={comObj.id} className="list-unstyled">
                    <li>{comObj.comment}</li>
                    <li>-- {comObj.author} ,{date}</li>
                </ul>)
        });
        resultComments = <div>
                            <h3>Comments</h3>
                            {commentList}
                        </div>
    }

    return (
        <div>
            {resultComments}
            <CommentForm />
        </div>
    )

}

function RenderDish({dish}){
    if (dish) {
        return (
            <Card>
                <CardImg width="100%" src={dish.image}></CardImg>
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        )
    } else {
        return <div></div>
    }
}


class CommentForm extends Component {

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


const DishDetail = (props) => {

    return (
        <div className="container">
        <div className="row">
            <Breadcrumb>
                <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
            </Breadcrumb>
            <div className="col-12">
                <h3>{props.dish.name}</h3>
                <hr />
            </div>                
        </div>
        <div className="row">
            <div className="col-12 col-md-5 m-1">
                <RenderDish dish={props.dish} />
            </div>
            <div className="col-12 col-md-5 m-1">
                <RenderComments comments={props.comments} />
            </div>
        </div>
        </div>
    );
    
}

export default DishDetail 
