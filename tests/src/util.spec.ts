import {expect} from 'chai';
import * as fs from 'fs';
import traverse from '../../src/traverse';
import * as path from 'path';
import util from '../../src/util';

describe('util', () => {
    describe('extractComment', () => {
        it('inline，基础用例', () => {
            const targetPath = path.resolve(__dirname, `comments/inline.js`);
            const comment = fs.readFileSync(targetPath).toString();
            expect(util.extractComment(comment)).to.be.equal(`inline`);
        });
        it('inline2，含有符号@', () => {
            const targetPath = path.resolve(__dirname, `comments/inline2.js`);
            const comment = fs.readFileSync(targetPath).toString();
            expect(util.extractComment(comment)).to.be.equal(`inline@qq.com`);
        });
        it('block，基础用例', () => {
            const targetPath = path.resolve(__dirname, `comments/block.js`);
            const comment = fs.readFileSync(targetPath).toString();
            expect(util.extractComment(comment)).to.be.equal(`block`);
        });
        it('block2，含有符号@', () => {
            const targetPath = path.resolve(__dirname, `comments/block2.js`);
            const comment = fs.readFileSync(targetPath).toString();
            expect(util.extractComment(comment)).to.be.equal(`block@qq.com`);
        });
        it('block3，含有中文', () => {
            const targetPath = path.resolve(__dirname, `comments/block3.js`);
            const comment = fs.readFileSync(targetPath).toString();
            expect(util.extractComment(comment)).to.be.equal(`抽象语法树AST做出来的东西还不错哦`);
        });
        it('block4，不应该包含特殊符号', () => {
            const targetPath = path.resolve(__dirname, `comments/block4.js`);
            const comment = fs.readFileSync(targetPath).toString();
            expect(util.extractComment(comment)).to.be.equal(`不应该包含特殊符号`);
        });
        it('block5，折行注释', () => {
            const targetPath = path.resolve(__dirname, `comments/block5.js`);
            const comment = fs.readFileSync(targetPath).toString();
            expect(util.extractComment(comment)).to.be.equal(`这个\r\n还是不错的`);
        });
        it('block6，折行注释并应该忽略第一个特殊符号', () => {
            const targetPath = path.resolve(__dirname, `comments/block6.js`);
            const comment = fs.readFileSync(targetPath).toString();
            expect(util.extractComment(comment)).to.be.equal(`这个\r\n是不错的`);
        });
    });
});