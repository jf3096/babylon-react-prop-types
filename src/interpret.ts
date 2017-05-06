import {Node, ArrayExpression, MemberExpression, ObjectExpression, ObjectProperty, Comment, CallExpression, Identifier, Expression, TemplateLiteral, TemplateElement, Property} from 'babel-types';


function handleArguments(nodes) {
    return nodes.map((node) => {
        return interpret(node);
    })
}

/**
 * MemberExpression
 */
function handleMemberExpression(node: MemberExpression) {
    return {
        $$type: node.type,
        object: interpret(node.object),
        property: interpret(node.property)
    };
}

/**
 * ArrayExpression
 */
function handleArrayExpression(node: ArrayExpression) {
    const elements = node.elements as TemplateLiteral[];
    return elements.map((element: TemplateLiteral) => {
        return element.quasis.map((quasis: TemplateElement) => {
            return {
                $$type: quasis.type,
                value: quasis.value.raw
            }
        });
    });
}

/**
 * ObjectExpression
 */
function handleObjectExpression(node: ObjectExpression) {
    return node.properties.map((property) => {
        return interpret(property);
    });
}


/**
 * 简化注释结构
 */
function transformLeadingComments(leadingComments: Array<Comment>) {
    return leadingComments.map((leadingComment: Comment) => {
        return leadingComment.value;
    });
}

/**
 * ObjectProperty
 */
function handleProperty(node: Property) {
    return {
        $$type: node.type,
        key: interpret(node.key),
        value: interpret(node.value),
        leadingComments: transformLeadingComments(node.leadingComments)
    }
}

/**
 * CallExpression
 */
function handleCallExpression(node: CallExpression) {
    return {
        $$type: node.type,
        callee: handleMemberExpression(node.callee as MemberExpression),
        arguments: handleArguments(node.arguments)
    }
}

/**
 * Identifier
 */
function handlerIdentifier(node: Identifier) {
    return {
        $$type: node.type,
        name: node.name
    };
}

/**
 * TemplateLiteral
 */
function handleTemplateLiteral(node: TemplateElement) {
    return {
        $$type: node.type,
        value: node.value.raw
    }
}

export default function interpret(node: Node) {
    const {type} = node;
    switch (type) {
        case `MemberExpression`:
            return handleMemberExpression(node as MemberExpression);
        case `Identifier`:
            return handlerIdentifier(node as Identifier);
        case `ArrayExpression`:
            return handleArrayExpression(node as ArrayExpression);
        case `ObjectExpression`:
            return handleObjectExpression(node as ObjectExpression);
        case `Property`:
            return handleProperty(node as ObjectProperty);
        case `CallExpression`:
            return handleCallExpression(node as CallExpression);
        case `TemplateLiteral`:
            return handleTemplateLiteral(node as TemplateElement);
        default:
            throw new Error(`Unhandled expression. Node type = ${type}.\r\nPlease contact the author.`);
    }
}