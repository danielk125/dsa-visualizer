

function Card(props){
    const title = props.title;
    const text = props.text;
    const image = props.image;
    const func = props.onClick;

    return (
        <div className="card" onClick={func}>
            <img src={image} className="img"></img>
            <h1 style={{ fontSize: '26px'}}>{title}</h1>
            <p style={{ fontSize: '14px', textAlign: 'center'}}>{text}</p>
        </div>
    );
}

export default Card;