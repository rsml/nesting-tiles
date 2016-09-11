import React, { PropTypes, Component } from 'react';
import '.../../../styles/ContextMenu.css';

export default class ContextMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            'target': ''
        }
    }

    componentDidMount() {
        let context = document.getElementById('home-view');
        context.addEventListener('contextmenu', () => { this.openContextMenu(
                event) });
    }

    openContextMenu(event) {
        event.preventDefault();
        this.setState({ 'target': event.target });

        let xOffset = Math.max(document.documentElement.scrollLeft,
            document.body.scrollLeft);
        let yOffset = Math.max(document.documentElement.scrollTop, document
            .body.scrollTop);

        let menu = document.getElementById('contextMenu');

        menu.style.cssText =
            'left: ' + (event.clientX + xOffset) + 'px;' +
            'top: ' + (event.clientY + yOffset) + 'px;' +
            'visibility: visible;';
    }

    render() {
        return( <div id = 'contextMenu' > {
            this.props.items.map((item) => {
                let clickHandler = () => {
                    item.function(this.state.target);
                }
                let label = item.label;
                return(
                    <span onClick={clickHandler} key={label}>
                        {label}
                    </span>
                );
            })
        } </div>);
    }
}

ContextMenu.propTypes = {
    'actions': PropTypes.object.isRequired,
    'items': PropTypes.array.isRequired
}
