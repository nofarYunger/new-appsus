import { EmailList } from './cmps/EmailList.jsx'
import { EventBusService } from '../../services/EventBusService.js'
import { EmailSideBar } from './cmps/EmailSideBar.jsx'
import { EmailService } from './services/EmailService.js'


export class EmailApp extends React.Component {


    state = {
        emails: []
    }

    componentDidMount() {
        this.loadEmails()
        this.unsubscribeOnDelete = EventBusService.on('delete', (emailId) => {
            EmailService.deleteEmail(emailId)
            this.loadEmails()
        });
        this.unsubscribeOnFiter = EventBusService.on('filterBy', (value) => {
            this.onSetFilter(value)
        });
    }


    componentWillUnmount() {
        this.unsubscribeOnDelete();
        this.unsubscribeOnFiter()
    }


    loadEmails = () => {
        EmailService.query().then(emails =>
            this.setState({ emails })
        )
    }

    onSetFilter = (key) => {
        EmailService.filterBy(key)
            .then(emails => this.setState({ emails }))
    }

    onSetSort = (value) => {
        EmailService.sortBy(value)
            .then(emails => this.setState({ emails }))

    }




    render() {
        return (

            <section className="EmailApp-wrapper">
                {/* <EmailFilter callback={this.onSetFilter} /> */}
                <EmailSideBar callback={this.onSetSort} />
                <EmailList emails={this.state.emails} />

            </section>

        );

    }

}