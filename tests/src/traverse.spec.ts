import {expect} from 'chai';
import * as fs from 'fs';
import traverse from '../../src/traverse';
import * as path from 'path';
import util from '../../src/util';

describe('traverse', () => {
    it('simple', () => {
        const targetPath = path.resolve(__dirname, `codes/simple.js`);
        const code = fs.readFileSync(targetPath).toString();
        const result = traverse(code, `Button`);
        const node = result[0][0];
        expect(node.key.name).to.be.equal(`title`);
        expect(node.value.object.name).to.be.equal(`PropTypes`);
        expect(node.value.property.name).to.be.equal(`string`);
        expect(util.extractComment(node.leadingComments[0])).to.be.equal(`设置按钮文字， 优先级大于text`);
    });
});