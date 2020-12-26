
import { EmailApp } from './Apps/EmailApp/EmailApp.jsx';
import { NoteApp } from './Apps/NoteApp/NoteApp.jsx';
import { AppHeader } from './cmps/AppHeader.jsx';
import { NoteAdd } from './Apps/NoteApp/cmps/NoteAdd.jsx';
import { EmailCompose } from './Apps/EmailApp/cmps/EmailCompose.jsx';
import { BookApp } from './Apps/BookApp/BookApp.jsx';
import { ReviewAdd } from './Apps/BookApp/cmps/BookAddReview.jsx';
import { BookDetails } from './Apps/BookApp/cmps/BookDetails.jsx';
import { Home } from './Pages/Home.jsx';



const Router = ReactRouterDOM.HashRouter;
const { Route, Switch } = ReactRouterDOM;

export class App extends React.Component {


    render() {
        return (
            <Router>
                <section className="app">

                    <AppHeader />
                    <Switch>

                        <Route path="/book/info/:bookId/editReview" component={ReviewAdd} />
                        <Route path="/book/info/:bookId" component={BookDetails} />
                        <Route path="/BooK" component={BookApp} />
                        <Route path="/Note/edit/:noteId?" component={NoteAdd} />
                        <Route path="/Note" component={NoteApp} />
                        <Route path="/Email/Compose" component={EmailCompose} />
                        <Route path="/Email" component={EmailApp} />
                        {/* <Route path="/About" component={About} /> */}
                        <Route path="/" component={Home} />
                    </Switch>

                </section>
            </Router>
        );
    }
}

