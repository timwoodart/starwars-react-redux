import React, {PropTypes, Component} from 'react';

export default class StarWarsLink extends Component {
  constructor(props) {
    super(props);
    this._onClick = this._onClick.bind(this);
  }

  _onClick(e, i) {
  	e.preventDefault();
  	let name = this.refs.starWarsLink.text;
  	let url = this.refs.starWarsLink.href;
  	this.props.handleClick(name, url);
  }

  render() {
  	const {name, url} = this.props;
    return (
    	<a href={url} ref='starWarsLink' onClick={this._onClick}>{name}</a>
    );
  }
}

StarWarsLink.PropTypes = {
	name: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired,
	handleClick: PropTypes.func.isRequired
}
