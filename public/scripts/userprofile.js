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
            return <UserStatsBox user={ user }/>
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
          <NamedStatistic statNumber={ this.props.user.impressionCount } statName="impressions" statType="impressions" />
          <NamedStatistic statNumber={ this.props.user.conversionCount } statName="conversions" statType="conversions" />
          <h2 className="stats revenue">{ formatNumberStringAsCurrency(this.props.user.revenue || "") }</h2>
        </div>
      </div>
    );
  }
});

var UserIdentification = React.createClass({
  render: function() {
    return (
      <div>
        <UserPhoto photoUrl={ this.props.avatar }/>
        <h1>{ this.props["name"] }</h1>
        <h3>{ this.props.occupation }</h3>
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
    this.loadProfilePhoto();
  },
  render: function() {
    if (this.state.loadProfilePhoto) {
      return (
        <img className="profilePicture" src={ this.props.photoUrl }/>
      );
    } else {
      return (
        <div className="profilePicture">Failed!</div>
      );
    }
  }
})

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
  // <UserStatsBox url="/users/75"/>,
  document.getElementById('content')
);
