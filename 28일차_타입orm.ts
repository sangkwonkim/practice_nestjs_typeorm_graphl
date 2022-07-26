// WHERE ( `LiveClassMain`.`id` = ? AND `LiveClassMain__existPeriodStyle`.`isValid` = true OR `LiveClassMain__notExistPeriodStyle__notExistPeriodStyleItems`.`isValid` = true ) 
// AND ( `LiveClassMain`.`id` IN (1) ) -- PARAMETERS: [3]

// where: (qb) => {
//     qb.where('LiveClassMain.id = :id', { id: liveClassMain.id })
//       .andWhere('LiveClassMain__existPeriodStyle.isValid = true')
//       .orWhere(
//         'LiveClassMain__notExistPeriodStyle__notExistPeriodStyleItems.isValid = true',
//       );
//   },



// WHERE ( (`LiveClassMain__existPeriodStyle`.`isValid` = true OR `LiveClassMain__notExistPeriodStyle__notExistPeriodStyleItems`.`isValid` = true) 
// AND `LiveClassMain`.`id` = ? ) AND ( `LiveClassMain`.`id` IN (4) ) -- PARAMETERS: [4]

// const result = await manager.findOne(LiveClassMain, {
//     where: (qb) => {
//       qb.where('(LiveClassMain__existPeriodStyle.isValid = true OR LiveClassMain__notExistPeriodStyle__notExistPeriodStyleItems.isValid = true)')
//       .andWhere('LiveClassMain.id = :id', { id: liveClassMain.id })
//     },