import { EmailSort } from "./EmailSort.jsx";

const { Link } = ReactRouterDOM;

export function EmailSideBar({ callback }) {


    return (
        <section className="EmailSideBar">
            <aside className="asides">
                 <i className="humburger fas fa-bars"></i>

                <Link to='/Email/Compose'>
                    <div className="btn-side addMail"><i className="fas fa-envelope"></i>Compose</div>
                </Link>
                <EmailSort onSort={callback} />
            </aside>
        </section>
    )


}