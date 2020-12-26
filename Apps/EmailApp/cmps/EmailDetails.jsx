
import { EventBusService } from '../../../services/EventBusService.js';
import { EmailService } from '../services/EmailService.js';
import { EmailUserReply } from './EmailUserReplay.jsx';
;


export class EmailDetails extends React.Component {

    state = {
        email: {},
        isReplyBoxOpen: false,
    };

    componentDidMount() {
        this.setState({ email: this.props.email })
    }

    deleteEmail = (ev) => {
        ev.preventDefault();
        const emailId = this.state.email.id
        EventBusService.emit('delete', emailId)
    }

    openReplyBox = (ev) => {
        ev.preventDefault();
        ev.stopPropagation()
        const isreply = this.state.isReplyBoxOpen
        this.setState({ isReplyBoxOpen: !isreply })
    }

    addReply = (reply) => {
        const { id } = this.state.email
        EmailService.addReply(reply, id)
    }


    render() {
        const email = this.state.email
        const { isReplyBoxOpen } = this.state
        if (!email) return null
        return (
            <div className={`EmailDetails`}  >
                <h1>{email.subject}</h1>
                <p><span>{email.from}</span> <span className="emailAddress">{`<${email.from}@gmail.com>`}</span></p>
                <p>{email.body}</p>
                {email.replys && email.replys.length > 0 && <div className="replys">  {/* render only if replys exist  */}
                    <h4>Replys:</h4>
                    {email.replys.map(reply => {
                        return (
                            <div className="reply">
                                <h1>{reply.subject}</h1>
                                <p>{reply.body} </p>
                            </div>)
                    })}
                </div>}
                <div className="emailDitBtns" >
                    <span onClick={(ev) => this.deleteEmail(ev)}><i className="fas fa-trash"></i></span>
                    <span onClick={(ev) => this.openReplyBox(ev)}><i className="fa fa-reply" aria="disabled"></i></span>
                </div>
                {isReplyBoxOpen && <EmailUserReply email={email} callback={this.addReply} />}
            </div>

        );
    }
}