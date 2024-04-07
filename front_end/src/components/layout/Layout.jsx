import './css/layout.css'

const Layout = ({children}) => {
    return (
        <>
            <main id='layout'>
                {children}
            </main>
        </>
    )
}

export default Layout