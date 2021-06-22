import React from "react";
import History from '../utils/history';

export class Redirect extends React.Component {

    constructor(props) {
        super(props);
    }

 componentDidMount() {
     History.push("/category/"+this.props.location.component);
 }

 render()
 {
     return(
         <div></div>
     );
 }
}
