
export function BookAddOption({ options, callBack }) {


    function getOptForDisplay() {
        console.log(options);
        return options.map(option => {
            return <li key={option.volumeInfo.id} >{<button className="addBookBtn" onClick={() => callBack(option)}><i class="fas fa-plus"></i></button>} {option.volumeInfo.title} </li>
        })
    }


    return (
        <ul>
            {getOptForDisplay()}
        </ul>
    );
}