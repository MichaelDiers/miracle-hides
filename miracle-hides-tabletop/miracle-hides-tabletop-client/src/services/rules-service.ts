import IRules from '../types/irule';
import IRulesServiceResult from '../types/irules-service-result';

export default async function rulesService(): Promise<IRulesServiceResult> {
  return {
    headline: 'House Rules',
    rules: [
      {
        topic: 'Neutrals, Pro-Axis, Pro-Allies and Dutch Colonies',
        descriptions: [
          'You cannot build an Industrial Complex in a conquered territory in the same turn.',
          'Air force cannot end its turn in a conquered territory.',
          'You cannot blitz through these territories.',
          'Land units has to stop after conquering the first territory.',
        ],
      },
      {
        topic: 'Japan/USA-Neutrality',
        descriptions: [
          'US forces are not allowed to end its turn next to a territory owned by Japan.',
        ],
      },
      {
        topic: 'Scrambling',
        descriptions: [
          'If a player under attack wants to scramble fighters and the program does not support scrambling, you have to use the edit mode before the fight is starting.',
        ],
      },
      {
        topic: 'Conquer of Capitals',
        descriptions: [
          'If a capital is conquered the conqueror gets the cash and in addition the equivalent in money of not built units. The conquered loses both.'
        ],
      },
      {
        topic: 'Multinational Forces',
        descriptions: [
          'If you attack a territory that is occupied by multinational forces you have to declare war at each nation before the attack.'
        ],
      }
    ],
  };
}