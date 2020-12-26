export class EmailUserReply extends React.Component {
    state = {
        reply: {
            subject: '',
            body: ''
        }
    }



    onChangeInput = (target) => {//on input change
        const value = target.value;
        console.log(value);

        const replyCopy = { ...this.state.reply };
        replyCopy[target.name] = value;

        this.setState({
            reply: replyCopy
        });
    };

    addReply = (ev) => {
        ev.preventDefault();
        console.log('added!');
        const { reply } = this.state
        this.props.callback(reply)
        this.setState({
            reply: {
                subject: '',
                body: ''
            }
        })
    }


    render() {
        const { reply } = this.state
        console.log(reply);
        return (

            <div className="EmailUserReply" >
                <form className="grid-form" onSubmit={this.addReply} >
                    <label className="reply-subj flex-row" > Subject:<input target="subject" type="text" name="subject" placeholder="Subject" value={reply.subject} onChange={(ev) => this.onChangeInput(ev.target)} /></label>
                    <label className="reply-body" >Message:</label> <textarea className="emailText" wrap="off" rows="50" cols="50" name="body" value={reply.body} onChange={(ev) => this.onChangeInput(ev.target)} placeholder="enter your message here..."></textarea>
                    <button className="send btn" type="submit">Send</button>
                </form>
            </div>
        );
    }
}

