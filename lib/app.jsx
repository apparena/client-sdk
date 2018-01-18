import React from 'react';
import PropTypes from 'prop-types';
import ReactComponent from 'apparena-patterns-react/_patterns/react-utils/component';
import WidgetContainer from './widgetContainer';

export default class App extends ReactComponent {
    static propTypes = {
        foo: PropTypes.bool
    };

    getInitState() {
        this.renderWidget = ::this.renderWidget;
        return {
            widgets: []
        };
    }

    componentDidMount() {
        this.setState({
            widgets: [
                {
                    src: 'http://widget/main.js',
                    position: 'bottom left',
                    timeout: 2000
                }
                // {
                //     src: 'http://widget/main.js',
                //     position: 'bottom right',
                //     timeout: 4000
                // },
                // {
                //     src: 'http://widget/main.js',
                //     position: 'top right',
                //     timeout: 6000
                // },
                // {
                //     src: 'http://widget/main.js',
                //     position: 'top left',
                //     timeout: 8000
                // },
                // {
                //     src: 'http://widget/main.js',
                //     position: 'center',
                //     timeout: 10000
                // }
            ]
        });
    }

    renderWidget(widget, index) {
        return (
            <WidgetContainer
                index={index + 1}
                key={index}
                {...widget}
            />
        );
    }

    /**
     * React default render function
     * @returns {null||xml}
     */
    render() {
        const {widgets} = this.state;
        if (widgets.length) {
            return widgets.map(this.renderWidget);
        }
        return null;
    }
}