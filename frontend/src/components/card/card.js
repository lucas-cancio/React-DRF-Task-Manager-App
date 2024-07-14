import { useTheme } from '../../store/themeContext';
import './card.css'


const Card = ({children}) => {

    const theme = useTheme();

    return (
        <div className={`my-card ${theme} rounded`} data-testid="CardBody">
            {children}
        </div>
    );
}

export default Card;