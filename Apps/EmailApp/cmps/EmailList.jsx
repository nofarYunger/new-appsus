import { EmailPreview } from "./EmailPreview.jsx";

export function EmailList({ emails }) {

    return (
        <div className="EmailList">
            { emails.map(email => {
                return <EmailPreview key={email.id} email={email} />;
            })}
        </div>
    )
   

}