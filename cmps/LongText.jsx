export function LongText({ text }) {


    function getText() {
        if (text.length < 50) return text
        else return `${text.substring(0, 48)}...`
    }


    return getText()

}

