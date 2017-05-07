import React, {PropTypes} from "react";
import BaseComponent from "../../components/BaseComponent";
import decorators from '../../Util/decorators';
import * as antd from 'antd';

@decorators.transformEventHOCDecorator
export default class Button extends BaseComponent {
    render() {
        const {events, title, text, ...dirtyProps} = this.props;
        const spreadableProps = this.stripIrrelevantProps(dirtyProps);
        return (
            <antd.Button {...spreadableProps} {...events}>
                {title || text}
            </antd.Button>
        );
    }
}

Button.propTypes = {
    /**
     * 设置按钮文字， 优先级大于text
     */
    title: PropTypes.string,
};