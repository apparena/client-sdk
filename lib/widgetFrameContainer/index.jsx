import React from 'react';
import PropTypes from 'prop-types';
import ReactComponent from 'apparena-patterns-react/_patterns/react-utils/component';
import * as frameActions from './frameActions';
import Widget from '../widgetFrame';
import cx from 'classnames';

const POSITION = [
    'top left',
    'top right',
    'bottom left',
    'bottom right',
    'center'
];

export default class WidgetContainer extends ReactComponent {
    static propTypes = {
        source: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        timeout: PropTypes.number,
        position: PropTypes.oneOf(POSITION)
    };

    static defaultProps = {
        position: 'bottom left',
        timeout: 2000
    };

    getInitState() {
        this.refCallback = ::this.refCallback;
        this.hideWidget = ::this.hideWidget;
        this.resize = ::this.resize;
        this.changeStyle = ::this.changeStyle;
        return {
            show: true,
            transitionClass: [],
            style: {}
        };
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                transitionClass: this.getTransitionClass()
            });
        }, this.props.timeout);
    }

    refCallback(ref) {
        this._frame = ref;
    }

    hideWidget() {
        this.setState({
            show: false
        });
    }

    getTransitionClass() {
        let className = [];
        switch (this.props.position) {
            case 'top left':
                className.push('top');
                className.push('left');
                break;
            case 'top right':
                className.push('top');
                className.push('right');
                break;
            case 'bottom left':
                className.push('bottom');
                className.push('left');
                break;
            case 'bottom right':
                className.push('bottom');
                className.push('right');
                break;
            case 'center':
                className.push('center');
                break;
            default:
                className = [];
                break;
        }
        return className;
    }

    resize() {
        this.setState({
            style: {
                height: this._frame.contentDocument.documentElement.offsetHeight
            }
        });
    }

    changeStyle(style) {
        this.setState({
            style
        });
    }

    /**
     * React default render function
     * @returns {null||xml}
     */
    render() {
        if (this.state.show) {
            const className = cx(
                'apparena-widget-frame-container',
                this.props.position.includes('left') && 'left-before',
                this.props.position.includes('right') && 'right-before',
                this.props.position.includes('center') && 'center-before',
                ...this.state.transitionClass
            );
            return (
                <div className={className} style={this.state.style}>
                    <Widget
                        frameActions={{...frameActions, close: this.hideWidget, resize: this.resize, changeStyle: this.changeStyle}}
                        id={this.props.id}
                        source={this.props.source}
                        transitionClass={this.state.transitionClass}
                        refCallback={this.refCallback}
                    />
                </div>
            );
        }
        return null;
    }
}