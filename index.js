require('dotenv').config()
const express = require('express')
const { postgraphile } = require('postgraphile')
const ConnectionFilterPlugin = require("postgraphile-plugin-connection-filter");

const app = express()

app.use(
  postgraphile(process.env.POSTGRESQL_ADDON_URI, process.env.SCHEMA, {
    subscriptions: true,
    skipPlugins:[
      require('graphile-build').NodePlugin
    ],
    appendPlugins: [
      messageSubscriptionPlugin,
      require("postgraphile/plugins").TagsFilePlugin,
      require('@graphile-contrib/pg-simplify-inflector'),
      ConnectionFilterPlugin,
    ],
    dynamicJson: true,
    enableCors: true,
    enableQueryBatching: true,
    enhanceGraphiql: true,
    extendedErrors: ['hint', 'detail', 'errcode'],
    graphiql: true,
    // ignoreIndexes: false,
    ignoreRBAC: false,
    // jwtPgTypeIdentifier: 'app_public.jwt_token',
    // jwtSecret: 'SuperSecret!',
    // pgDefaultRole: 'capi_anon',
    legacyRelations: 'omit',
    setofFunctionsContainNulls: false,
    showErrorStack: 'json',
    subscriptions: true,
    watchPg: process.env.NODE_ENV == "development",
    allowExplain(req) { },
  })
);

app.listen(process.env.PORT, () => console.log("Server listening on port " + process.env.PORT));
