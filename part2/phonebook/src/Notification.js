import './App.css'
const Notification = ( {message, tip} ) => {
    if (message === null)  {
        return null
    }
    return (
        <div className={tip}>
            {message}
        </div>
    )
}

export default Notification