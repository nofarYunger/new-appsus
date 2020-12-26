import { LongText } from "../../../cmps/LongText.jsx";
import { EmailService } from "../services/EmailService.js"
import { EmailDetails } from "./EmailDetails.jsx"

export class EmailPreview extends React.Component {


    state = {
        isImportant: this.props.email.isImportant,
        isEmailOpen: false,
    }



    get emailDate() {

        const emailTimeStamp = this.props.email.sentAt

        const emailDate = new Date(emailTimeStamp).toDateString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1").substring(4, 11)//like "dec 23"

        const emailTime = new Date(emailTimeStamp).toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1").substring(0, 5)//like "13:46"

        const todaysFullsDate = new Date().toDateString() //like "Wed Dec 23 2020"
        const emailsFullDate = new Date(emailTimeStamp).toDateString()

        if (emailsFullDate === todaysFullsDate) return emailTime // if the email was send today return the time
        else return emailDate // else return the date it was created
    }


    toggleDetails = () => {
        const isOpen = this.state.isEmailOpen
        this.setState({ isEmailOpen: !isOpen })
        const emailId = this.props.email.id
        EmailService.updateIsRead(emailId)
    }


    toggleStarEmail = (ev) => {
        ev.preventDefault();
        ev.stopPropagation()
        const { email } = this.props
        EmailService.updateImportance(email.id)
        this.setState({ isImportant: email.isImportant })
    }

    render() {
        const email = this.props.email
        const star = <i className="far fa-star"></i>
        const starImportant = <i className="fas fa-star"></i>
        var starBtn = (this.state.isImportant) ? starImportant : star
        return (

            <div className="EmailPreview">
                <div onClick={this.toggleDetails} className={`EmailPreviewShort flex-row ${!email.isRead && 'unRead'} ${this.state.isEmailOpen && 'emailOpen'}`}>

                    <div> <span className="readBtn" onClick={this.toggleStarEmail}>{starBtn}</span>
                        <span className="body"> <span className="subj"> {email.subject} </span><LongText text={email.body} /></span></div>
                    <div> <span className="from">{email.from}</span>
                        <span className="time">{this.emailDate}</span></div>
                </div>
                {this.state.isEmailOpen && <EmailDetails email={this.props.email} />}


            </div>

        );
    }
}


