import React, {Component} from "reactn";

export default class Member extends Component {
    constructor() {
        super();
        this.state = {
            events: [],
            categories: [],
            categorie: "",
            category_id: "",
            location: "",
            current_page: 1,
            events_per_page: 8,
            scroll: false
        }
    }

    componentDidMount = () => {
        this.getEventId();
    }
    getEventId = () => {
        this.getEventInfo(window.location.href.slice(28))
    }

    getEventInfo(id) {

    }
    getVenue = (id) => {

    }
    render() {
        return(
            <h4>Member page</h4>
        )
    }
}