import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {getFirestore, provideFirestore} from "@angular/fire/firestore";
import {FIREBASE_OPTIONS} from "@angular/fire/compat";
import {environment} from "./enviroment";

const FIREBASE_PROVIDERS = [
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    {provide: FIREBASE_OPTIONS, useValue: environment.firebase}
]

export {FIREBASE_PROVIDERS};

