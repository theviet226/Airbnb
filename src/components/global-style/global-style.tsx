import  {ReactNode,Fragment} from 'react';
import "./global-style.scss"

type Props ={
    children: ReactNode
}

export function GlobalStyle(props:Props){
    const {children} = props;
    return(
        <Fragment>{children}</Fragment>
    )
}