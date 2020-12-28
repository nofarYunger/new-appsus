import { EmailFilter } from "../Apps/EmailApp/cmps/EmailFilter.jsx";
import { NoteFilter } from "../Apps/NoteApp/cmps/NoteFilter.jsx";
import { BookFilter } from "../Apps/BookApp/cmps/BookFilter.jsx";

const { NavLink, withRouter } = ReactRouterDOM;


export class _AppHeader extends React.Component {

    state = {
        pathname: ''
    }


    // refUl = React.createRef();

    componentDidUpdate(prevProps, prevState) {

        const { pathname } = this.props.location
        console.log(pathname);
        if (prevState.pathname === pathname) return
        this.setState({ pathname })
    }
    // menuOpen = () => {
    //     console.log('hi');
    //     this.refUl.current.className = "apps-uldis"
    // }


    render() {
        const { pathname } = this.state
        console.log('pathname:', pathname);
        return (<section className="AppHeader ">



            <header className="flex-row">
                <span className="flex-row" ><NavLink to={'/'}> <img className="logo" src="assets/imgs/logo.png" />  </NavLink>
                    <h1 className="logo">Appsus</h1> </span>



                {/* {/* <div onClick={this.menuOpen} className={"apps"}><i className="fas fa-th"></i></div> */}
                <ul ref={this.refUl} className="apps-uldis">
                    <NavLink to={'/Note'}><li><i className="far fa-sticky-note"></i></li></NavLink>
                    <NavLink to={'/Email'}><li><i className="far fa-envelope"></i></li></NavLink>
                    <NavLink to={'/Book'}> <li><i className="fas fa-book"></i></li></NavLink>
                    <li>
                        {pathname === '/Email' && <EmailFilter />}
                        {pathname === '/Note' && <NoteFilter />}
                        {pathname === '/Book' && <BookFilter />}
                    </li>

                </ul>
            </header>

        </section >
        )
    }


}


export const AppHeader = withRouter(_AppHeader);


