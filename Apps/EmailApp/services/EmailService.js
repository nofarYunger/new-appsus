import { UtilService } from '../../../services/UtilService.js'
import { StorageService } from '../../../services/StorageService.js'

export const EmailService = {
    query,
    getEmailById,
    deleteEmail,
    updateIsRead,
    add,
    filterBy,
    sortBy,
    updateImportance,
    addReply

}


const EMAIL_KEY = 'emailsDB'
var gEmails;
_getEmails()

function _getEmails() {
    gEmails = StorageService.load(EMAIL_KEY)
    if (!gEmails || !gEmails.length) {
        gEmails = [{
            subject: 'Wassap?',
            body: 'Pick up!',
            from: 'Yonit',
            id: UtilService.makeId(),
            isRead: false,
            sentAt: 1551133930594,
            isImportant: false,
            replys: [{ subject: 'important!', body: `n iconic phonetic notation, the shapes of the phonetic characters are designed so that they visually represent the position of articulators in the vocal tract. This is unlike alphabetic notation, where the correspondence between character shape and articulator position is arbitrary. ` }, { subject: 'your worng!', body: `It is generally understood that the aims of lexicography versus chemical nomenclature vary and are to an extent at odds. Dictionaries of words, whether in traditional print or on the web, collect and report the meanings of words as their uses appear and change over time. For web dictionaries with limited or no formal editorial process, definitions —in this case, definitions of chemical names and terms— can change rapidly without concern for the formal or historical meanings. Chemical nomenclature on the other hand (with IUPAC nomenclature as the best example)` }]

        },
        {
            subject: 'hey',
            body: 'have you seen my last edits on our project? wating for your reply',
            from: 'Nofar',
            id: UtilService.makeId(),
            isRead: false,
            sentAt: 155113400000,
            isImportant: false

        },

        {
            subject: 'where are you???',
            body: 'The International Phonetic Alphabet (IPA) is the most widely used and well-known of present-day phonetic alphabets, and has a long history. It was created in the nineteenth century by European language teachers and linguists. It soon developed beyond its original purpose as a tool of foreign language pedagogy and is now also used extensively as a practical alphabet of phoneticians and linguists. It is found in many dictionaries, where it is used to indicate the pronunciation of words, but most American dictionaries for native English-speakers, e.g., American Heritage Dictionary of the English Language, Random House Dictionary of the English Language, Webster\'s Third New International Dictionary, avoid phonetic transcription and instead employ respelling systems based on the English alphabet, with diacritical marks over the vowels and stress marks.[6] (See Pronunciation respelling for English for a generic version',
            from: 'Dad',
            id: UtilService.makeId(),
            isRead: false,
            sentAt: 1551133050594,
            isImportant: false

        },

        {
            subject: 'come home',
            body: 'i need you to come early today the internet is down and i need your help',
            from: 'Mom',
            id: UtilService.makeId(),
            isRead: false,
            sentAt: 1551132930594
        },

        {
            subject: 'hey?',
            body: 'pop that !',
            from: 'Michal',
            id: UtilService.makeId(),
            isRead: false,
            sentAt: 1551133931114,
            isImportant: false

        },
        {
            subject: 'Lorem!',
            body: `
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestias ipsa vero quisquam voluptatum suscipit nesciunt recusandae distinctio minus nam doloremque. Eos saepe quia placeat facilis harum, dolore doloribus incidunt laborum?`,
            from: 'ipsum',
            id: UtilService.makeId(),
            isRead: false,
            sentAt: 1541133931114,
            isImportant: false

        },
        {
            subject: 'Lorem!',
            body: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestias ipsa vero quisquam voluptatum suscipit nesciunt recusandae distinctio minus nam doloremque. Eos saepe quia placeat facilis harum, dolore doloribus incidunt laborum?`,
            from: 'ipsum',
            id: UtilService.makeId(),
            isRead: false,
            sentAt: 1541133931114,
            isImportant: false

        },
        {
            subject: 'Lorem!',
            body: `
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestias ipsa vero quisquam voluptatum suscipit nesciunt recusandae distinctio minus nam doloremque. Eos saepe quia placeat facilis harum, dolore doloribus incidunt laborum?`,
            from: 'ipsum',
            id: UtilService.makeId(),
            isRead: false,
            sentAt: 1541133931114,
            isImportant: false

        },
        {
            subject: 'Lorem!',
            body: `
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestias ipsa vero quisquam voluptatum suscipit nesciunt recusandae distinctio minus nam doloremque. Eos saepe quia placeat facilis harum, dolore doloribus incidunt laborum?`,
            from: 'ipsum',
            id: UtilService.makeId(),
            isRead: false,
            sentAt: 1541133931114,
            isImportant: false

        },


        ]

        StorageService.save(EMAIL_KEY, gEmails)
    }

}

function query() {
    return Promise.resolve(gEmails)
}

function getEmailById(emailId) {
    const email = gEmails.find(email => email.id === emailId)
    return Promise.resolve(emails)
}


function deleteEmail(emailId) {
    console.log('email deleted:', emailId);
    const idx = _getEmailIdxById(emailId)
    let copy = [...gEmails]
    copy.splice(idx, 1)
    gEmails = copy
    StorageService.save(EMAIL_KEY, gEmails)
}

function updateIsRead(emailId) {
    const idx = _getEmailIdxById(emailId)
    let copyEmails = [...gEmails]
    copyEmails[idx].isRead = true
    gEmails = copyEmails
    StorageService.save(EMAIL_KEY, gEmails)

}

function add(email) {
    const newEmail = {
        subject: email.subject,
        body: email.body,
        from: email.from,
        id: UtilService.makeId(),
        isRead: false,
        sentAt: Date.now(),
        isImportant: false
    }
    let copyEmails = [...gEmails]
    copyEmails = [newEmail, ...copyEmails]
    gEmails = copyEmails
    StorageService.save(EMAIL_KEY, gEmails)

    return Promise.resolve()
}

function filterBy(key) {

    const filterRegex = new RegExp(key, 'i');
    var emails = gEmails.filter(email => {
        return filterRegex.test(email.from) || filterRegex.test(email.body) || filterRegex.test(email.subject)
    })
    return Promise.resolve(emails)
}


function sortBy(value) {
    let emails;
    if (value === 'date') emails = _sortByDate()
    else if (value === 'unread') emails = _sortByRead()
    else if (value === 'importance') emails = _sortByImportance()
    return Promise.resolve(emails)
}


function _sortByRead() {
    let emails = gEmails.sort((email1, email2) => {
        if (email1.isRead && !email2.isRead) return 1
        if (!email1.isRead && email2.isRead) return -1
        else return 0
    })
    return emails
}

function _sortByImportance() {
    let emails = gEmails.sort((email1, email2) => {
        if (email1.isImportant && !email2.isImportant) return -1
        if (!email1.isImportant && email2.isImportant) return 1
        else return 0
    })
    return emails
}

function _sortByDate() {
    let emails = gEmails.sort((email1, email2) => {
        if (email1.sentAt > email2.sentAt) return -1
        if (email1.sentAt > email2.sentAt) return 1
        else return 0
    })
    return emails
}

function _getEmailIdxById(emailId) {
    return gEmails.findIndex(email => email.id === emailId)
}

function updateImportance(emailId) {
    const idx = _getEmailIdxById(emailId)
    let copyEmails = [...gEmails]
    copyEmails[idx].isImportant = !gEmails[idx].isImportant
    gEmails = copyEmails
    StorageService.save(EMAIL_KEY, gEmails)
}

function addReply(reply, emailId) {
    console.log('reply', reply);
    console.log('emailId', emailId);
    const idx = _getEmailIdxById(emailId)
    let copyEmails = [...gEmails]
    let replys = copyEmails[idx].replys
    if (!replys) copyEmails[idx].replys = []

    copyEmails[idx].replys.unshift(reply)

    gEmails = copyEmails
    StorageService.save(EMAIL_KEY, gEmails)

}