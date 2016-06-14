import React from 'react';


let monthNames = [
  "January", "February", "March",
  "April", "May", "June", "July",
  "August", "September", "October",
  "November", "December"
];

let dayNames = [
    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
]

export default class StarWarsProfile extends React.Component {

  constructor(props) {
    super(props);
    
    this._formatDate = this._formatDate.bind(this);
  }

  _formatDate(date) {
    var released = new Date(date);
    var day = released.getDay();
    var date = released.getDate();
    var month = released.getMonth();
    var year = released.getFullYear();
    return `${dayNames[day]}, ${monthNames[month]} ${date} ${year}`
  }

  render() {

    let { profileReducer } = this.props

    if (!profileReducer) {
        return null;
    }

    let {films, name} = profileReducer

    return (
      <div className="profile">
        <h3>{name}</h3>
        {
            profileReducer.filmsData.map((film, i) => {

                var releaseDate = this._formatDate(film.release_date)

                return (
                    <div key={i}>
                        <h4>
                            {film.title}
                        </h4>
                        <date>{releaseDate}</date>

                    </div>
                )
            })
        }
      </div>
    );
  }
}
