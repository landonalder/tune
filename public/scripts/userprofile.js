var UserStatsBox = React.createClass({
  loadUserInfo: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(info) {
        this.setState({userInfo: info});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {userInfo: {}};
  },
  componentDidMount: function() {
    this.loadUserInfo();
  },
  render: function() {
    return (
      <div className="cardBackground">
        <div className="cardContainer">
          <UserIdentification avatar={ this.state.userInfo.avatar } name={ this.state.userInfo["name"]}
                              occupation={ this.state.userInfo.occupation } />
          <Statistic statNumber={ this.state.userInfo.impressionCount } statName="impressions" />
          <Statistic statNumber={ this.state.userInfo.conversionCount } statName="conversions" />
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
        <h2>{ this.props.occupation }</h2>
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

var Statistic = React.createClass({
  render: function() {
      return (
        <div className="stats">
          <h3>{ this.props.statNumber }</h3>
          <h4>{ this.props.statName }</h4>
        </div>
      );
  }
});

ReactDOM.render(
  // <CommentBox url="/api/comments" pollInterval={2000} />,
  <UserStatsBox url="/users/75"/>,
  document.getElementById('content')
);
