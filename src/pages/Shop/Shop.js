import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CollectionOverview from '../../components/collection-overview/collection-overview';
import Collection from '../collection/collection';

const Shop = ({match}) =>{
    return (
        <div className ="shop-page">
            <Route exact path ={`${match.path}`} component= {CollectionOverview}  />
            <Route path = {`${match.path}/:collectionId`} component ={Collection}/>
        </div>
    )
}

export default Shop
