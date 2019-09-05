import React, { Component } from 'react'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle
} from 'reactstrap'


function renderComments(dish) {
    const comments = dish.comments;
    if (comments) {
        let commentList = comments.map(comObj => {
            var date = new Date(comObj.date).toDateString();
            return (
                <ul key={comObj.id} className="list-unstyled">
                    <li>{comObj.comment}</li>
                    <li>-- {comObj.author} ,{date}</li>
                </ul>)
        });
        return (
            <div className="col-12 col-md-5 m-1">
                <h5>Comments</h5>
                {commentList}
            </div>)
    } else {
        return <div></div>
    }

}

function renderDish(dish){
    if (dish) {
        return (
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <Card>
                        <CardImg width="100%" src={dish.image}></CardImg>
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
                {renderComments(dish)}
            </div>
        )
    } else {
        return <div></div>
    }
}

const DishDetail = ({dish}) => {
    return (
        <div>
            {renderDish(dish)}
        </div>
    )
}

export default DishDetail 
