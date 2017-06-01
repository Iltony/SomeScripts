var Card = (props) => {
 return (
 		<div style={{margin: '1em'}}>
      <img width="75" src={props.avatar_url} />
      <div style={{display:'inline-block', marginLeft: 10}}>
          <div style={{fontSize: '1.25em', fontWeight:'bold'}}>
            {props.name}
          </div>
      <div>
        {props.company}
      </div>
      </div>
    </div>
 );
}

let users = ["iltony","driden","esarachik"]

const CardList = (props) => {
	return (
  <div>

    {props.users.map(user => <Card "https://api.github.com/users/" + {user} />)}
  </div>);
}

// Render the component with the list of data and return 
ReactDOM.render(<CardList users={users}/>, mountNode);