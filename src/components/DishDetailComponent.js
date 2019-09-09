import React from 'react'
import {Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem
} from 'reactstrap'
import {Link} from 'react-router-dom'


function RenderComments({comments}) {
    if (comments.length) {
        let commentList = comments.map(comObj => {
            var date = new Date(comObj.date).toDateString();
            return (
                <ul key={comObj.id} className="list-unstyled">
                    <li>{comObj.comment}</li>
                    <li>-- {comObj.author} ,{date}</li>
                </ul>)
        });
        return (
            <div>
                <h5>Comments</h5>
                {commentList}
            </div>)
    } else {
        return <div></div>
    }

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
