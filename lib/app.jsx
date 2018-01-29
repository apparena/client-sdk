import React from 'react';
import PropTypes from 'prop-types';
import ReactComponent from 'apparena-patterns-react/_patterns/react-utils/component';
import WidgetContainer from './widgetFrameContainer';
import axios from 'axios';

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
        if (window.parent.aaDevWidgets) {
            this.setState({
                widgets: window.parent.aaDevWidgets
            });
        } else {
            if (window.analytics) {
                const {companyId, channelId} = window.analytics.options;
                const {context} = window.analytics.normalize({});
                const {page} = context;
                console.log(page);
                if (companyId && channelId) {
                    axios.get(`https://v25-stage.app-arena.com/companies/${companyId}/channels/${channelId}/widgets`)
                        .then((res) => {
                            this.setState({
                                widgets: res
                            });
                        })
                        .catch((err) => {

                        });
                }
            }
        }
    }

    /**
     * Check if the widget should be shown
     * @param rules
     * @returns {boolean}
     */
    checkWidgetRules(rules) {
        const result = rules.map((rule) => {
            return true;
        });
        return !result.includes(false);
    }

    renderWidget(widget, index) {
        const {appId, source, rules, settings, ...rest} = widget;
        if (this.checkWidgetRules(rules)) {
            return (
                <WidgetContainer
                    id={appId}
                    key={index}
                    source={source}
                    {...settings}
                    {...rest}
                />
            );
        }
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