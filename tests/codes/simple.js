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
    /**
     * 设置按钮文字
     */
    text: PropTypes.string,
    /**
     * 设置按钮类型，可选值为 primary dashed danger(版本 2.7 中增加) 或者不设
     */
    type: PropTypes.oneOf([`primary`, `dashed`, `danger`]),
    /**
     * 设置 button 原生的 type 值，可选值请参考 HTML 标准
     */
    htmlType: PropTypes.string,
    /**
     * 设置按钮的图标类型
     */
    icon: PropTypes.string,
    /**
     * 设置按钮形状，可选值为 circle 或者不设
     */
    shape: PropTypes.oneOf([`circle`]),
    /**
     * 设置按钮大小，可选值为 small large 或者不设
     */
    size: PropTypes.oneOf([`small`, `large`]),
    /**
     * 设置按钮载入状态, 类型boolean | { delay: number }
     */
    /**
     * 幽灵属性，使按钮背景透明，版本 2.7 中增加
     */
    ghost: PropTypes.bool,
    /**
     * 设置事件
     */
    events: PropTypes.shape({
        /**
         * click 事件的 handler
         */
        onClick: PropTypes.func
    })
};