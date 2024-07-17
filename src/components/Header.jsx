export function Header ( {headerTitle} ) {
    return (
        <header className="d-flex justify-content-around align-items-center w3-white w3-border-top w3-border-bottom">
            <h1 className="text-uppercase w3-large">{headerTitle}</h1>
            <img src="/logo-titbit.png" alt="Logo Titbit" width="65" height='auto' />
        </header>
    )
}