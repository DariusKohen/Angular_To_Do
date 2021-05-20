import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// // Use the mongoose module for handling MongoDB connection
// import * as mongoose from 'mongoose'

// import * as dotenv from 'dotenv'
// // dotenv.config()

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule).catch(err => console.error(err))

// // Init and connect DataBase with URI 'MONGODB_URI' in env or a localhost one
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/blog', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true
// }, err => {
//   if (err) {
//     console.log("Error : " + err)
//   } else {
//     console.log("Connected to MongoDB")
//   }
// })
