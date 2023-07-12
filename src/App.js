import  React  from 'react'
import axios from 'axios';
import './App.css';

// function App() {
//   return (
//     <div className="App">
//     </div>
//   );
// }
// const testData = [
//   {name: "Dan Abramov", avatar_url: "https://avatars0.githubusercontent.com/u/810438?v=4", company: "Facebook"},
//   {name: "Sophie Alpert", avatar_url: "https://avatars2.githubusercontent.com/u/6820?v=4", company: "Facebook"},
//   {name: "Sebastian Markbåge", avatar_url: "https://avatars2.githubusercontent.com/u/63648?v=4", company: "Facebook"},
// ];

const CardList=(props)=>(
  <div>
    {props.profiles.map(profile =>  <Card key={profile.id} {...profile}/>)}
</div>
)
 
class Form extends React.Component{
  // userNameInput=React.createRef();
  state={
    userName:""
  }
  handleSubmit=async(event)=>{
    event.preventDefault();
   const res=await axios.get(`https:/api.github.com/users/${this.state.userName}`)
    // console.log(this.userNameInput.current.value)
    // console.log(this.state.userName)
    this.props.onSubmit(res.data)
    this.setState({userName:""})
  }
  render()
  {
    return(
      <form onSubmit={this.handleSubmit}>
        {/* <input type="text"  placeholder='Github username' required ref={this.userNameInput} style={{ marginLeft:10}}/> */}
        <input type="text"  placeholder='Github username' required  value={this.state.userName} onChange={event=>this.setState({userName:event.target.value})} style={{ marginLeft:10}}/>
        <button>Add Card</button>
      </form>
    )
  }
}
class App extends React.Component{
  // constructor(props){
  //   super(props);
  //     this.state={
  //       profiles:testData
  //     };
  //   }
  state={
    profiles:[]
  }
 
 addNewProfile=(profileData)=>{
  
  console.log(profileData)
  this.setState(prevState=>({profiles:[...prevState.profiles,profileData]}))
  console.log(this.state.profiles)
  }
  render(){
     return( 
     <div className="App">
     <h1 className='text-center my-5'> {this.props.title}</h1>
     <Form onSubmit={this.addNewProfile}/>
     <CardList profiles={this.state.profiles}/>
   </div>
   )
  }
}
class Card extends React.Component{
  render()
  {
    const profile=this.props

    return(
      <div className="github-profile" style={{margin:'1rem'}}><img src={profile.avatar_url} style={{height:'100px'}} />
      <div className="info" style={{display:'inline-block', marginLeft:10}}>
        <div className="name" style={{fontSize : '125%'}}>{profile.name}</div>
        <div className="company">{profile.company}</div>
      </div>
      </div>
    )
  }
}

// class App extends React.Component{
//   render(){
//     return(
//       <div style={{color:Math.random()< 0.5 ? 'green' : 'red'}}>
//         How do you like this?
//       </div>
//     )
//   }
// }
export default App;
