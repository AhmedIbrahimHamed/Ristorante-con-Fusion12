import React, { Component } from 'react'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem, Modal, ModalBody, ModalHeader, Button, Row, Col, Label
} from 'reactstrap'
import { LocalForm, Control, Errors } from 'react-redux-form'
import { Link } from 'react-router-dom'
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

function RenderDish({ dish }) {
    return (
        <Card>
            <CardImg top src={baseUrl + dish.image} alt={dish.name} />
            <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
    )
}

function RenderComments({comments, postComment, dishId}) {
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
            <CommentForm dishId={dishId} postComment={postComment} />
        </div>
    )

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

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleCommentSumbit(values) {
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
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
                                    <Label htmlFor={"author"} md={3}>Your Name</Label>
                                    <Col xs={12}>
                                        <Control.text model=".author" id="author" name="author"
                                            className="form-control"
                                            validators={{ minLength: minLength(3), maxLength: maxLength(15) }} />
                                        <Errors className="text-danger"
                                            model=".author"
                                            show="touched"
                                            messages={{
                                                minLength: 'Must be greater than 2 characters ',
                                                maxLength: 'Must be 15 characters or less '
                                            }} />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor={"comment"} md={3}>Comment</Label>
                                    <Col xs={12}>
                                        <Control.textarea model=".comment" id="comment" name="comment"
                                            className="form-control" rows={6} />
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
   
    if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.dish != null) {
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
                        <RenderComments comments={props.comments}
                            postComment={props.postComment}
                            dishId={props.dish.id}
                        />
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }

}

export default DishDetail 
