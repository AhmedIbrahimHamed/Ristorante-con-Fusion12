import React, { Component } from 'react'
import { Card, CardImg, CardText, CardBody,
    CardTitle } from 'reactstrap'

export class DishDetail  extends Component {

    renderDish(){
        const dish = this.props.dish;
        if(dish){
            const comments = dish.comments;
            return(
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

                    <div className="col-12 col-md-5 m-1">
                        <h2>Comments</h2>
                        {comments.map(comObj => {
                            return (
                                <div key={comObj.id}>
                                    <p>{comObj.comment}</p>
                                    <p>-- {comObj.author} ,{comObj.date.substring(0,comObj.date.indexOf("T"))}</p>
                                </div>)
                        })}
                    </div>
                </div>
            )
        }else{
            return <div></div>
        }
    }
    
    render() {
        return (
            <div>
                {this.renderDish()}
            </div>
        )
    }
}

export default DishDetail 
