class LoginControl extends React.Component{
    constructor(props){
        super(props)

        this.handleLoginClick = this.handleLoginClick.bind(this)
        this.handleLogoutClick = this.handleLogoutClick.bind(this)
        this.state = {isLoggedIn: false}

    }

    handleLoginClick(){
        this.setState({isLoggedIn: true}) //if click isLoggedIn set true
    }

    handleLogoutClick(){
        this.setState({isLoggedIn: false})
    }

    render(){
        const isLoggedIn = this.state.isLoggedIn //1. false
        let button;
        
        if(isLoggedIn){
            button = <LogoutButton onClick={this.handleLogoutClick}/>
        }else{
            button = <LoginButton onClick={this.handleLoginClick}/>//2. button renders LoginButton and Go to method handleLoginClick 

        }
    //4. isLoggedIn starts with false and go to greeting component 
        return(
            <div>
                <Greeting isLoggedIn={isLoggedIn}/> 
                {button}
            </div>
        )
    }
}


function UserGreeting(props){
    return <h1>Welcome back!</h1>
}

function GuestGreeting(props){
    return <h1>Please sign up.</h1>
}

function Greeting(props){
    const isLoggedIn = props.isLoggedIn //5. starts with false until I clicked the button 
    if(isLoggedIn){
        return <UserGreeting /> 
    }
    return <GuestGreeting /> //6. Established UserGreeting
}

function LoginButton(props){
    return (
        <button onClick={props.onClick}>
            Login
        </button>
    )
}

function LogoutButton(props){
    return (
        <button onClick={props.onClick}>
            Logout
        </button>
    )
}

ReactDOM.render(
    <LoginControl/>, document.getElementById('root')
)

