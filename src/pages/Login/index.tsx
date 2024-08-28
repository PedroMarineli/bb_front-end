const Login = () => {
    return (
        <div className="bg-black bg-opacity-30 fixed top-0 right-0 bottom-0 left-0">
            <div className="absolute top-44">
                <h3>Login</h3>
                <input type="text" placeholder="Id"/>
                <input type="text" placeholder="Senha"/>
                <span>Entrar</span>
            </div>
        </div>
    )
}

export default Login;