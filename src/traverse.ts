import * as babylon from 'babylon';
import babelTraverse from 'babel-traverse';
import {File, Identifier, MemberExpression, ObjectExpression} from 'babel-types';
import interpret from './interpret';

/**
 * 获取代码的抽象语法树
 * @param code 代码
 */
function getAstByCode(code: string): File {
    return babylon.parse(code, {
        sourceType: 'module',
        plugins: [
            'estree',
            'jsx',
            'flow',
            'doExpressions',
            'objectRestSpread',
            'decorators',
            'classProperties',
            'exportExtensions',
            'asyncGenerators',
            'functionBind',
            'functionSent',
            'dynamicImport'
        ]
    });
}

/**
 * 开始遍历Ast， 根据XXX.propTypes开始解析
 * @param code 代码的抽象语法树
 * @param indicator 解析标识字段
 * @param propertyName 解析标识字段
 */
export default function traverse(code: string, indicator: string, propertyName = `propTypes`) {
    const ast = getAstByCode(code);
    const result = [];
    babelTraverse(ast, {
        AssignmentExpression(path) {
            const leftNode = path.node.left as MemberExpression;
            const rightNode = path.node.right as ObjectExpression;
            const leftObject = leftNode.object as Identifier;
            const leftProperty = leftNode.property as Identifier;
            if (leftObject.name === indicator && leftProperty.name === propertyName) {
                result.push(interpret(rightNode));
            }
        }
    });
    return result;
}