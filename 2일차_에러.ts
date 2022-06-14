// 기능 구현 중 발생한 에러

// 1. nestjs + graphql 에러
// /node_modules/@graphql-tools/schema/index.js:176
//                             throw new Error(`${typeName}.${fieldName} defined in resolvers, but not in schema`);
//                                   ^
// Error: Query.blahblah defined in resolvers, but not in schema
//     at addResolversToSchema (/node_modules/@graphql-tools/schema/index.js:176:35)
//     at makeExecutableSchema (/node_modules/@graphql-tools/schema/index.js:501:14)
//     at GraphQLFactory.mergeWithSchema (/node_modules/@nestjs/graphql/dist/graphql.factory.js:67:68)
//     at ApolloDriver.start (/node_modules/@nestjs/apollo/dist/drivers/apollo.driver.js:19:51)
//     at GraphQLModule.onModuleInit (/node_modules/@nestjs/graphql/dist/graphql.module.js:104:36)
//     at callModuleInitHook (/node_modules/@nestjs/core/hooks/on-module-init.hook.js:51:9)
//     at NestApplication.callInitHook (/node_modules/@nestjs/core/nest-application-context.js:178:13)
//     at NestApplication.init (/node_modules/@nestjs/core/nest-application.js:96:9)
//     at NestApplication.listen (/node_modules/@nestjs/core/nest-application.js:155:33)
//     at bootstrap (/src/main.ts:51:3)

// 해당 에러는 resolver에서는 blahblah 쿼리를 만들었지만 graphql 에서는 FaqSearchInput만 만들고 타입 쿼리에 만들어 주지 않아서 발생한 에러임

// 해당 graphql 파일의 쿼리에 blahblah를 추가함으로써 해결할 수 있었음



// 2. nestjs + graphql + typeorm 에러

// "message": "Abstract type \"blahblahblahResult\" was resolved to a type \"blahblahblah\" that does not exist inside the schema.",
//       "locations": [
//         {
//           "line": 2,
//           "column": 3
//         }
//       ],
//       "path": [
//         "blahblahblah"
//       ],
//       "extensions": {
//         "code": "INTERNAL_SERVER_ERROR",
//         "exception": {
//           "message": "Abstract type \"blahblahblahResult\" was resolved to a type \"blahblahblah\" that does not exist inside the schema.",
//           "locations": [
//             {
//               "line": 2,
//               "column": 3
//             }
//           ],

// blahblahblahResult가 blahblahblah로 resolved되었지만, 해당 타입을 존재하지 않아!

// blahblahblah는 typeorm을 이용해서 지정한 테이블명, __typename 인데 이 두개가 똑같아야 하지만 __typename 중간에 하나가 소문자로 작성하며 불일치하여 발생한 에러

// 해당 에러는 blahblah.entity에서 __typename을 맞춰줌으로써 해결할 수 있었음

// 처음 맞이한 에러여서 resolver나 service 리턴 값이 잘 못 된 건지 한참을 찾았는데 사수분깨서 도와주셔서 해결할 수 있었음
// 다음 날 아침에 와서 다시보니 was resolved to a type blahblahblah에서 한 번도 사용하지 않은 스펠링이 있어 바로 확인할 수 있었음
// 다음부터는 동일한 에러가 발생하지 않도록 유의하고, 이 기회를 통해 동일한 에러는 바로 해결할 수 있을 거 같음sad