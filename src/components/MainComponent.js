import React, { Component } from 'react';
import Menu from './MenuComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import { DISHES } from '../shared/dishes';
import {LEADERS} from '../shared/leaders';
import {PROMOTIONS} from '../shared/promotions';
import { Switch, Route, Redirect } from 'react-router-dom';
import Contact from './ContactComponent';


class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES,
            leaders: LEADERS,
            promotions: PROMOTIONS
            // selectedDish: null
        };
    }

    // //Set dish id of selected dish to send to the DishDetailComponent.
    // onDishSelect(dishId) {
    //     this.setState({ selectedDish: dishId });
    // }

    render() {
        return (
            <div>
                <Header />
                <Switch>
                    <Route path='/home' component={() => <Home
                    dish={this.state.dishes.filter((dish) => dish.featured)[0]}
                    promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
                    leader={this.state.leaders.filter((leader) => leader.featured)[0]} />} />
                    <Route exact path='/menu' component={() => <Menu dishes={this.state.dishes} />} />
                    <Route exact path='/contactus' component={Contact}/>
                    <Redirect to="/home" />
                </Switch>

                <Footer />
            </div>
        );

    }

}

export default Main;
