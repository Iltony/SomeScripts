const Card = (props) => {
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

let data = [
{
  "name": "Antonio Rodriguez",
  "avatar_url": "https://avatars1.githubusercontent.com/u/14924015?v=3",
  "company": "Velocity Partners",
},
{
  "name": "Ignacio Loureiro",
  "avatar_url": "https://avatars1.githubusercontent.com/u/776982?v=3",
  "company": "Velocity Partners",
},
{
  "name": "Elias Sarachik",
  "avatar_url": "https://avatars1.githubusercontent.com/u/28905256?v=3",
  "company": "Velocity Partners",
}
]

const CardList = (props) => {
	return (
  <div>
    {props.cards.map(card => <Card {...card} />)}
  </div>);
}

// Render the component with the list of data and return 
ReactDOM.render(<CardList cards={data}/>, mountNode);