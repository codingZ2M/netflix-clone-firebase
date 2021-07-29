import React, {useEffect} from 'react'
import styled from 'styled-components';
import ImageSlider from './ImageSlider';
import Viewers from '../collections/Videos';
import Trending from '../collections/Trending';
import Action from '../collections/Action';
import TopRated from '../collections/TopRated';
import NetflixOriginals from '../collections/NetflixOriginals';

import { useDispatch, useSelector } from 'react-redux';
import db from '../data/Firebase';
import { setMovies } from '../../features/movie/movieSlice';
import {selectUserName} from '../../features/user/userSlice';


 const Home = (props) => {

    const dispatch = useDispatch();
    const userName = useSelector(selectUserName)  // React Hook
    let netflixOriginals = [];
    let actions = [];
    let topRated = [];
    let trending = [];
    
    useEffect( () => {
        db.collection('movies').onSnapshot( (snapshot) => {
                snapshot.docs.map( (doc) => {
                   console.log(netflixOriginals);
                    switch(doc.data().type) {
                        case 'Netflix Originals':
                           netflixOriginals = [...netflixOriginals, { id: doc.id, ...doc.data() }  ];
                        break;
                        case 'Action':
                            actions = [...actions, { id: doc.id, ...doc.data() }];
                        break;
                        case 'Top Rated':
                            topRated = [...topRated, { id: doc.id, ...doc.data() }];
                        break;
                        case 'Trending':
                            trending = [...trending, { id: doc.id, ...doc.data() }];
                        break;
                    
                    }
            });

            dispatch(
                setMovies({
                  netflixOriginals: netflixOriginals,
                  actions: actions,
                  topRated: topRated,
                  trending: trending,
                 
                })
              );

        }); 
    }, [ userName] );

    return (
        <Container>
                <ImageSlider/>
                <Viewers/>
                <NetflixOriginals/>
                <Action/>
                <TopRated/>
                <Trending/>
        </Container>
            
        
    )
}
export default Home;

const Container = styled.main`
    background-color:#0f0f0f;
    position: relative;          // An element’s original position remains in the flow of the document
    height: 100vh;    // https://developer.mozilla.org/en-US/docs/Web/CSS/calc()
    overflow-x: hidden;           // https://developer.mozilla.org/en-US/docs/Web/CSS/overflow
    display: block;               // https://developer.mozilla.org/en-US/search?q=display
    top:72px;                     // https://developer.mozilla.org/en-US/docs/Web/CSS/top
    padding: 0;    // https://developer.mozilla.org/en-US/docs/Web/CSS/padding
    *{
        -ms-overflow-style: none;
    }
    ::-webkit-scrollbar {
        display: none;
    }
`;