// eslint-disable-next-line
/// <reference types="Cypress" />

describe('Home 视图测试', () => {
  it('切换至 Page 视图', () => {
    cy.visit('http://localhost:5000')
    // expect(true).to.equal(true)

    cy.contains('> To Page').click()

    // 应该存在一个包含'/commands/actions'的新URL
    cy.url().should('include', '/Page')

    // 获取一个输入, 输入进去并且验证文本值已经更新了
    cy.get('.page > input')
      .type('hello cypress !')
      .should('have.value', 'hello cypress !')
  })
})
