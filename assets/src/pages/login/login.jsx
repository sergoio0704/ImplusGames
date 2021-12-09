export const Login = () => {
    return (
        <div className="container">
            <form className="form" method="POST">
                <div className="input-group">
                    <label htmlFor="email" className="input-title">Email</label>
                    <input type="email" className="input-field" name="email" />
                </div>
                <div className="input-group">
                    <label htmlFor="password" className="input-title">Пароль</label>
                    <input type="password" className="input-field" name="password" />   
                </div>
                <button class="btn">Войти</button>
            </form>
        </div>
    )
}