
import styled from "styled-components";
import React, { useState } from "react";
import Axios from "axios";
import MovieComponent from "./Componenets/MovieComponent";
import MovieInfoComponent from "./Componenets/MovieInfoComponents";
export const API_KEY = "3b951cf6";
const Container = styled.div`
display:flex;
flex-direction:column;
`;
const Header = styled.div`
// display:flex;
flex-direction:row;
background-color:blue;
color:white;
padding:10px;
font-size:40px;
font-weight:bold;
box-shadow:0 3px 6px 0 #555;


justify-content: center;


`;
const AppName = styled.div`
display:flex;
allign-item:center;
justify-content:center;


`;

const SearchBox = styled.div`
display:flex;
flex-direction:row;
padding:10px 10px;
background-color:white;
border-radius:10px;
margin-left:1100px;
width:20%;
allign-item:center;
position:fixed; 
 top:10px;



`;
const SearchIcon = styled.img`
width:32px;
height:32px;
`;
const SearchInput = styled.input`
color:black;
font-size:16px;
font-weight:bold;
border:none;
outline:none;
margin-left:15px;
`;
const MovieListContainer = styled.div`

display:flex;
flex-direction:row;
flex-wrap:wrap;
padding:30px;
justify-content:space-evenly;
gap:24px;
`;
const Button = styled.button`
  /* Adapt the colors based on primary prop */
  background: ${props => props.primary ? "palevioletred" : "white"};
  color: ${props => props.primary ? "white" : "palevioletred"};

  font-size: 22px;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 1px;
`;

function App() {
  const [searchQuery, updateSearchQuery] = useState();
  const [timeoutId, updatetimeoutId] = useState();
  const [movieList, updateMovieList] = useState();
  const [selectedMovie, onMovieSelect] = useState()

  const fetchData = async (searchString) => {
    const response = await Axios.get(
      `https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`
    );
    console.log(response);
    updateMovieList(response.data.Search)

  };

  const onTextChange = (event) => {
    clearTimeout(timeoutId);
    updateSearchQuery(event.target.value);
    const timeout = setTimeout(() => fetchData(event.target.value), 500);
    updatetimeoutId(timeout)
  };
  return (

    <Container>
      <Header>
        {/* <button type="button" class="btn btn-primary">Primary</button> */}
        <a href="https://react-form-registration.herokuapp.com/">
          <Button primary>Login/Signup</Button>
        </a>

        <AppName>The Movie app</AppName>
        <SearchBox>
          <SearchIcon src="/search-icon.svg" />
          <SearchInput
            placeholder="Search Movies"
            value={searchQuery}
            onChange={onTextChange}


          />
        </SearchBox>
      </Header>
      {selectedMovie && <MovieInfoComponent selectedMovie={selectedMovie} />}
      <MovieListContainer>
        {
          movieList?.length ? movieList.map((movie, index) => (<MovieComponent key={index} movie={movie} onMovieSelect={onMovieSelect} />)) : "No Movie found"
        }


        {/* <MovieComponent /> */}
      </MovieListContainer>

    </Container>

  );
}

export default App;
