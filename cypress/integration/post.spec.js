

describe('POST /characters', function () {

    it('deve cadastrar um personagem', function () {

        const character = {
            name: 'Wanda Maximoff',
            alias: 'Feiticeira Escarlate',
            team: ['vingadores'],
            active: true
        }

        cy.postCharacter(character)
            .then(function (response) {
                expect(response.status).to.eql(201)
                cy.log(response.body.character_id)
                expect(response.body.character_id.length).to.eql(24)
            })
    })

    it('o campo name deve ser obrigatório', function () {
        const character = {
            alias: 'Vampira',
            team: ['x-men'],
            active: true
        }

        cy.postCharacter(character)
            .then(function (response) {
                expect(response.status).to.eql(400)
                expect(response.body.validation.body.message).to.eql('\"name\" is required')
            })

    })

    it('o campo alias deve ser obrigatório', function () {
        const character = {
            name: 'Anna Marie',
            team: ['x-men'],
            active: true
        }

        cy.postCharacter(character)
            .then(function (response) {
                expect(response.status).to.eql(400)
                expect(response.body.validation.body.message).to.eql('\"alias\" is required')
            })

    })

    it('o campo team deve ser obrigatório', function () {
        const character = {
            name: 'Anna Marie',
            alias: 'Vampira',
            active: true
        }

        cy.postCharacter(character)
            .then(function (response) {
                expect(response.status).to.eql(400)
                expect(response.body.validation.body.message).to.eql('\"team\" is required')
            })

    })

    it('o campo active deve ser obrigatório', function () {
        const character = {
            name: 'Anna Marie',
            alias: 'Vampira',
            team: ['x-men'],
        }

        cy.postCharacter(character)
            .then(function (response) {
                expect(response.status).to.eql(400)
                expect(response.body.validation.body.message).to.eql('\"active\" is required')
            })

    })

    context('quando o personagem já existe', function () {

        const character = {
            name: 'Pietro Maximoff',
            alias: 'Mercurio',
            team: ['vingadores da costa oeste', 'irmandade de mutantes'],
            active: true
        }

        before(function () {
            cy.postCharacter(character)
                .then(function (response) {
                    expect(response.status).to.eql(201)
                })
        })

        it('não deve cadastrar duplicado', function () {

            cy.postCharacter(character)
                .then(function (response) {
                    expect(response.status).to.eql(400)
                    expect(response.body.error).to.eql('Duplicate character')
                })
        })
    })
})
