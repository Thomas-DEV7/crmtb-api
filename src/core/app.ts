import express from 'express';
import { errorHandler } from '../shared/middlewares/errorHandler.js';
import { authRouter } from '../modules/auth/auth.http.js';
import { accountsRouter } from '../modules/accounts/accounts.http.js';
import { contactsRouter } from '../modules/contacts/contacts.http.js';
import { dealsRouter } from '../modules/deals/deals.http.js';
import { activitiesRouter } from '../modules/activities/activities.http.js';
import { stagesRouter } from '../modules/deals/stages.http.js';
export const app = express();
app.use(express.json());

app.get('/health', (_req, res) => res.json({ up: true, name: 'CRMTB API' }));

app.use('/auth', authRouter);
app.use('/accounts', accountsRouter);
app.use('/contacts', contactsRouter);
app.use('/deals', dealsRouter);
app.use('/stages', stagesRouter);
app.use('/activities', activitiesRouter);

app.use(errorHandler);
