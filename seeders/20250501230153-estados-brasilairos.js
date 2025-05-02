'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('States', [
      { nm_estado: 'Acre', sg_estado: 'AC' },
      { nm_estado: 'Alagoas', sg_estado: 'AL' },
      { nm_estado: 'Amapá', sg_estado: 'AP' },
      { nm_estado: 'Amazonas', sg_estado: 'AM' },
      { nm_estado: 'Bahia', sg_estado: 'BA' },
      { nm_estado: 'Ceará', sg_estado: 'CE' },
      { nm_estado: 'Distrito Federal', sg_estado: 'DF' },
      { nm_estado: 'Espírito Santo', sg_estado: 'ES' },
      { nm_estado: 'Goiás', sg_estado: 'GO' },
      { nm_estado: 'Maranhão', sg_estado: 'MA' },
      { nm_estado: 'Mato Grosso', sg_estado: 'MT' },
      { nm_estado: 'Mato Grosso do Sul', sg_estado: 'MS' },
      { nm_estado: 'Minas Gerais', sg_estado: 'MG' },
      { nm_estado: 'Pará', sg_estado: 'PA' },
      { nm_estado: 'Paraíba', sg_estado: 'PB' },
      { nm_estado: 'Paraná', sg_estado: 'PR' },
      { nm_estado: 'Pernambuco', sg_estado: 'PE' },
      { nm_estado: 'Piauí', sg_estado: 'PI' },
      { nm_estado: 'Rio de Janeiro', sg_estado: 'RJ' },
      { nm_estado: 'Rio Grande do Norte', sg_estado: 'RN' },
      { nm_estado: 'Rio Grande do Sul', sg_estado: 'RS' },
      { nm_estado: 'Rondônia', sg_estado: 'RO' },
      { nm_estado: 'Roraima', sg_estado: 'RR' },
      { nm_estado: 'Santa Catarina', sg_estado: 'SC' },
      { nm_estado: 'São Paulo', sg_estado: 'SP' },
      { nm_estado: 'Sergipe', sg_estado: 'SE' },
      { nm_estado: 'Tocantins', sg_estado: 'TO' },
    ], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('States', { sg_estado: [
      'AC', 'AL', 'AP', 'AM', 'BA',
      'CE', 'DF', 'ES', 'GO', 'MA',
      'MT', 'MS', 'MG', 'PA', 'PB',
      'PR', 'PE', 'PI', 'RJ', 'RN',
      'RS', 'RO', 'RR', 'SC', 'SP',
      'SE', 'TO'
    ] }, {});
  }
};