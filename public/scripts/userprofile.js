const {VictoryLine} = Victory;

// Idea for this taken from this stackoverflow post:
// http://stackoverflow.com/questions/14467433/currency-formatting-in-javascript
function formatNumberStringAsCurrency(numberString) {
  var numberWithCommas =numberString.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
  return `$${numberWithCommas}`
};

var AllUserStats = React.createClass({
  loadUsers: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(users) {
        this.setState({users: users});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {users: []};
  },
  componentDidMount: function() {
    this.loadUsers();
  },
  render: function() {
    if(this.state.users.length == 0) {
      return <div>No users!</div>
    }

      return (
        <div>
          { this.state.users.map(function(user) {
            return <UserStatsBox key={ user.id } user={ user }/>
          })}
        </div>
      );
  }
});

var UserStatsBox = React.createClass({
  render: function() {
    return (
      <div className="cardBackground">
        <div className="cardContainer">
          <UserIdentification avatar={ this.props.user.avatar } name={ this.props.user["name"] }
                              occupation={ this.props.user.occupation } />
          <ConversionsChart conversionsByDay={ this.props.user.conversionsByDay } />
          <div id="right">
            <NamedStatistic statNumber={ this.props.user.impressionCount } statName="impressions" statType="impressions" />
            <NamedStatistic statNumber={ this.props.user.conversionCount } statName="conversions" statType="conversions" />
          </div>
          <h2 className="stats revenue">{ formatNumberStringAsCurrency(this.props.user.revenue || "") }</h2>
        </div>
      </div>
    );
  }
});

var ConversionsChart = React.createClass({
  render: function() {
    return (
      <div id="left">
          <VictoryLine
            data={ this.props.conversionsByDay }
            x={ "date" }
            y={ "conversions" }
            height={ 80 }
            width= { 300 }
          />
      </div>
    );
  }
})

var UserIdentification = React.createClass({
  render: function() {
    return (
      <div className="userIdentification">
        <UserPhoto photoUrl={ this.props.avatar } userName={ this.props["name"] }/>
        <h1>{ this.props["name"] }</h1>
        <h3 className="occupation">{ this.props.occupation }</h3>
      </div>
    );
  }
})

var UserPhoto = React.createClass({
  loadProfilePhoto: function() {
    $.ajax({
      url: this.props.photoUrl,
      cache: false,
      success: function(info) {
        this.setState({loadProfilePhoto: true});
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({loadProfilePhoto: false});
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {loadProfilePhoto: false};
  },
  componentDidMount: function() {
    if (this.props.photoUrl != "") {
      this.loadProfilePhoto();
    }
  },
  render: function() {
    if (this.state.loadProfilePhoto) {
      return (
        <img className="profilePicture" src={ this.props.photoUrl } />
      );
    } else {
      return (
        <PhotoPlaceholder userName={ this.props.userName } />
      );
    }
  }
})

var PhotoPlaceholder = React.createClass({
  render: function() {
    var colorChoices = ["#9a5cb4", "#3a99d8", "#ff6600", "#009933"]
    var randomColor = colorChoices[Math.floor(Math.random() * 4)];
    var style = {
      backgroundColor: randomColor
    }

    return (
      <div className="profilePicture" style={ style }>
        <div className="profilePicturePlaceholderText">{ this.props.userName.charAt(0) }</div>
      </div>
    );
  }
});

var NamedStatistic = React.createClass({
  render: function() {
      return (
        <div className="stats">
          <h3 className={ this.props.statType }>{ this.props.statNumber }</h3>
          <h4>{ this.props.statName }</h4>
        </div>
      );
  }
});

ReactDOM.render(
  <AllUserStats url="/users" />,
  document.getElementById('content')
);
