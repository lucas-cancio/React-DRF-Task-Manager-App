import './card.css'

const Card = ({children}) => {
    return (
        <div className="my-card">
            {children}
        </div>
    );
}

export default Card;