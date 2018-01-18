import React from 'react';
import PropTypes from 'prop-types';
import ReactComponent from 'apparena-patterns-react/_patterns/react-utils/component';
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
        src: PropTypes.string.isRequired,
        position: PropTypes.oneOf(POSITION),
        index: PropTypes.number.isRequired,
        timeout: PropTypes.number
    };

    static defaultProps = {
        position: 'bottom left',
        timeout: 2000
    };

    getInitState() {
        return {
            position: []
        };
    }

    componentDidMount() {
        this._frame.contentWindow.document.open('text/html', 'replace');
        this._frame.contentWindow.document.write('\n    <!doctype html>\n    <head></head>\n    <body>\n  <div id="widget-container">\n    </div>\n  </body>\n  </html>');
        this._frame.contentWindow.document.close();
        this._frame.contentWindow.analytics = window.parent.analytics || {};
        const script = WidgetContainer.createFrameScript(this.props.src);
        this._frame.contentWindow.document.head.appendChild(script);
        setTimeout(() => {
            this.setState({
                position: this.getPositionClassName()
            });
        }, this.props.timeout);
    }

    getPositionClassName() {
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

    /**
     * Create FrameJS-SDK Script Tag
     * @param src
     * @private
     */
    static createFrameScript(src) {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.charset = 'utf-8';
        script.async = true;
        script.src = src;
        return script;
    };

    /**
     * React default render function
     * @returns {null||xml}
     */
    render() {
        const classname = cx(
            'apparena-widget-frame',
            this.props.position.includes('left') && 'left-before',
            this.props.position.includes('right') && 'right-before',
            this.props.position.includes('center') && 'center-before',
            ...this.state.position
        );
        return (
            <div className={classname}>
                <iframe id={`apparena-widget-frame-${this.props.index}`} frameBorder={0} allowFullScreen ref={(ref) => {this._frame = ref;}}/>
            </div>
        );
    }
}