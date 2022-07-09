class FlavorForm extends React.Component{
    constructor(props){
      super(props)
      this.state = {value: 'coconut'}
      this.handleSubmit = this.handleSubmit.bind(this)
      this.handleChange = this.handleChange.bind(this)
    }
  
    handleChange(event){
      this.setState({
        value: event.target.value
      })
    }
  
    handleSubmit(event){
      alert("Your favorite flavor is: " + this.state.value)
      event.preventDefault()
    }
    render(){
      return(
        <form onSubmit={this.handleSubmit}>
          <label>
            Pick your favorite flavor:
            <select value={this.state.value} onChange={this.handleChange}>
              <option value="grapefruit">GrapeFruit</option>
              <option value="lime">Lime</option>
              <option value="coconut">Coconut</option>
              <option value="mango">Mango</option>
  
            </select>
          </label>
          <input type="submit" value="Submit"/>
        </form>
      )
    }
  }
  
  ReactDOM.render(
    <FlavorForm/>,
    document.getElementById('root')
  )