import React, {setGlobal} from 'reactn';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import App from './App';

setGlobal({
    isLoggedIn: false,
    app_key: "nCWfP5cZNWNHqSPB",
    api: "http://api.eventful.com/json/events/",
    // fb_key: 
})

ReactDOM.render(<Router><App /></Router>, document.getElementById('root'));
