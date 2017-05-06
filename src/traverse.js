"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var babylon = require("babylon");
var babel_traverse_1 = require("babel-traverse");
var interpret_1 = require("./interpret");
/**
 * 获取代码的抽象语法树
 * @param code 代码
 */
function getAstByCode(code) {
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
function traverse(code, indicator, propertyName) {
    if (propertyName === void 0) { propertyName = "propTypes"; }
    var ast = getAstByCode(code);
    var result = [];
    babel_traverse_1.default(ast, {
        AssignmentExpression: function (path) {
            var leftNode = path.node.left;
            var rightNode = path.node.right;
            var leftObject = leftNode.object;
            var leftProperty = leftNode.property;
            if (leftObject.name === indicator && leftProperty.name === propertyName) {
                result.push(interpret_1.default(rightNode));
            }
        }
    });
    return result;
}
exports.default = traverse;
//# sourceMappingURL=traverse.js.map