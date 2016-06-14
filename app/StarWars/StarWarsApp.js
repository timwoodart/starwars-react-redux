import React, {PropTypes, Component} from 'react';
import { connect } from 'react-redux';
import StarWarsLink from './StarWarsLink';
import StarWarsProfile from './StarWarsProfile';
import { updateProfile } from './StarWarsActions';

let createHandlers = function(dispatch) {
    let dispatchUpdate = function(payload) {
        dispatch(updateProfile(payload))
    }

    return {
        dispatchUpdate
    }
}

class StarWarsApp extends Component {
  constructor(props) {
    super(props);
    this.actionCreators = createHandlers(this.props.dispatch);
    this._handleClick = this._handleClick.bind(this);
    this._fetchFilmData = this._fetchFilmData.bind(this);
  }

  _handleClick(name, url) {

    fetch(url)
        .then(res => res.json())
        .then(json => {
            this._fetchFilmData(json)
        })
        .catch(error => {
            var err = {
                error
            }
            this.actionCreators.dispatchUpdate(err)
        })
  }

  _fetchFilmData(payload) {

        let filmsArray = [];

        // pull in all the films and update the state
        payload.films.map((film, i) => {
            filmsArray[i] = fetch(film)
                .then(res => res.json())
                .then(json => json)
                .catch(error => error)
        });

        Promise.all(filmsArray).then(values => {
            let profileReducerObj = {
                ...payload,
                filmsData: values
            }

            this.actionCreators.dispatchUpdate(profileReducerObj)
        })


  }

  render() {
        const { characterReducer, profileReducer, dispatch } = this.props;

        let characterData = characterReducer.characterData;

    return (
      <div>
        <h1>Star Wars</h1>

        <div className="characters-wrapper">
            {
                characterData.characters.map((character, i) => {
                    return (
                        <StarWarsLink key={`link-${i}`} handleClick={this._handleClick} {...character} />
                    )
                })
            }
        </div>

        <p className="summary">Click on a character to see the films they appeared in:</p>

        <StarWarsProfile {...profileReducer}/>
      </div>
    );
  }
}

StarWarsApp.propTypes = {
    characterReducer: PropTypes.object.isRequired
}

StarWarsApp.defaultProps = {
    characterReducer: {
        characterData: {
            characters: [
                { 
                    "name": "Luke Skywalker", 
                    "url": "https://swapi.co/api/people/1/" 
                }
            ]
        }
    }
}

function mapStateToProps(state) {

    const { characterReducer, profileReducer } = state
    return {
        characterReducer,
        profileReducer
    }

}
export default connect(mapStateToProps)(StarWarsApp)