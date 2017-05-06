"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function handleArguments(nodes) {
    return nodes.map(function (node) {
        return interpret(node);
    });
}
/**
 * MemberExpression
 */
function handleMemberExpression(node) {
    return {
        $$type: node.type,
        object: interpret(node.object),
        property: interpret(node.property)
    };
}
/**
 * ArrayExpression
 */
function handleArrayExpression(node) {
    var elements = node.elements;
    return elements.map(function (element) {
        return element.quasis.map(function (quasis) {
            return {
                $$type: quasis.type,
                value: quasis.value.raw
            };
        });
    });
}
/**
 * ObjectExpression
 */
function handleObjectExpression(node) {
    return node.properties.map(function (property) {
        return interpret(property);
    });
}
/**
 * 简化注释结构
 */
function transformLeadingComments(leadingComments) {
    return leadingComments.map(function (leadingComment) {
        return leadingComment.value;
    });
}
/**
 * ObjectProperty
 */
function handleProperty(node) {
    return {
        $$type: node.type,
        key: interpret(node.key),
        value: interpret(node.value),
        leadingComments: transformLeadingComments(node.leadingComments)
    };
}
/**
 * CallExpression
 */
function handleCallExpression(node) {
    return {
        $$type: node.type,
        callee: handleMemberExpression(node.callee),
        arguments: handleArguments(node.arguments)
    };
}
/**
 * Identifier
 */
function handlerIdentifier(node) {
    return {
        $$type: node.type,
        name: node.name
    };
}
/**
 * TemplateLiteral
 */
function handleTemplateLiteral(node) {
    return {
        $$type: node.type,
        value: node.value.raw
    };
}
function interpret(node) {
    var type = node.type;
    switch (type) {
        case "MemberExpression":
            return handleMemberExpression(node);
        case "Identifier":
            return handlerIdentifier(node);
        case "ArrayExpression":
            return handleArrayExpression(node);
        case "ObjectExpression":
            return handleObjectExpression(node);
        case "Property":
            return handleProperty(node);
        case "CallExpression":
            return handleCallExpression(node);
        case "TemplateLiteral":
            return handleTemplateLiteral(node);
        default:
            throw new Error("Unhandled expression. Node type = " + type + ".\r\nPlease contact the author.");
    }
}
exports.default = interpret;
//# sourceMappingURL=interpret.js.map