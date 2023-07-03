import "./body.css"
let locker = 1;
export default function Body({advice,onClick,onload}){
    let width = window.innerWidth;
    let url = "";
    if(width<=800){
        url = "/pattern-divider-mobile.svg";
    }else{
        url = "/pattern-divider-desktop.svg";
    }
    if(locker){
        onload();
        locker--;
    }
    return (
        <div className="body">
            <div>
                <p className="adviceId">ADVICE #{advice.slip.id}</p>
                <p>{advice.slip.advice}</p>
                <img src={url} alt="sperator pattern" />
            </div>
            
            <button onClick={onClick}></button>
        </div>
    );
}