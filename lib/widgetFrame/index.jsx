import React from 'react';
import PropTypes from 'prop-types';
import ReactComponent from 'apparena-patterns-react/_patterns/react-utils/component';

export default class Widget extends ReactComponent {
    static propTypes = {
        id: PropTypes.number.isRequired,
        refCallback: PropTypes.func.isRequired,
        frameActions: PropTypes.object.isRequired,
        source: PropTypes.string.isRequired
    };

    getInitState() {
        this.ref = ::this.ref;
    }

    componentDidMount() {
        this._frame.contentWindow.document.open('text/html', 'replace');
        this._frame.contentWindow.document.write('\n    <!doctype html>\n    <head></head>\n    <body>\n  <div id="widget-container">\n    </div>\n  </body>\n  </html>');
        this._frame.contentWindow.document.close();
        this._frame.contentWindow.analytics = window.parent.analytics || {};
        this._frame.contentWindow.frameActions = this.props.frameActions;
        this._frame.contentWindow.parent = {}; // Security mechanism to prevent communication with the parent frame
        const script = Widget.createFrameScript(this.props.source);
        this._frame.contentWindow.document.head.appendChild(script);
    }

    componentWillUnmount() {
        this._frame.remove();
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

    ref(ref) {
        this._frame = ref;
        this.props.refCallback(this._frame);
    }

    render() {
        return (
            <iframe id={`apparena-widget-frame-${this.props.id}`} frameBorder={0} allowFullScreen ref={this.ref} height="100%" width="100%"/>
        );
    }

}