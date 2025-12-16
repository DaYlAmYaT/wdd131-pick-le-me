// Import express using ESM syntax
import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';

import routes from './src/controllers/routes.js'
import globalMiddleware from './src/middlewares/global.js';

// Import sessions
import session from 'express-session';
import connectPgSimple from 'connect-pg-simple';

// Import Database
import { setupDatabase, testConnection } from './src/models/setup.js';

// Import flash
import flash from './src/middlewares/flash.js';

/**
 * Declare Important Variables
 */
const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const NODE_ENV = process.env.NODE_ENV || 'production';

/**
 * Setup Express Server
 */
const app = express();

/**
 * Configure Express middleware
 */
const pgSession = connectPgSimple(session);

// Configure session middleware
app.use(session({
    store: new pgSession({
        conString: process.env.DB_URL,
        tableName: 'session', // The name for our "sessions" table in the db
        createTableIfMissing: true
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: NODE_ENV.includes('dev') !== true,
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
    }
}));
// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Tell Express where to find your templates
app.set('views', path.join(__dirname, 'src/views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/**
 * Global Middleware
 */
app.use(flash);
app.use(globalMiddleware);

/**
 * Declare Routes
 */

/**
 * Routes
 */
app.use('/', routes);

// Catch-all route for 404 errors
app.use((req, res, next) => {
    const err = new Error('Page Not Found');
    err.status = 404;
    next(err);
});

app.use((req, res, next) => {
    // Make NODE_ENV available to all templates
    res.locals.NODE_ENV = NODE_ENV.toLowerCase() || 'production';
    // Continue to the next middleware or route handler
    next();
});

// Global error handler
app.use((err, req, res, next) => {
    // Log error details for debugging
    console.error('Error occurred:', err.message);
    console.error('Stack trace:', err.stack);

    // Determine status and template
    const status = err.status || 500;
    const template = status === 404 ? '404' : '500';

    // Prepare data for the template
    const context = {
        title: status === 404 ? 'Page Not Found' : 'Server Error',
        error: err.message,
        stack: err.stack
    };

    // Render the appropriate error template
    res.status(status).render(`errors/${template}`, context);
});

// Start the server and listen on the specified port
app.listen(PORT, async () => {
    try {
        await testConnection();
        await setupDatabase();
        console.log(`Server is running on http://127.0.0.1:${PORT}/`);
    } catch (error) {
        console.error('Database setup failed:', error.message);
        process.exit(1);
    }
});