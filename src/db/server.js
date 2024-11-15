const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const db = require('better-sqlite3')('database.db');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Create the table
const createUserTable = () => {
    const sql = `
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            password TEXT NOT NULL
        )
    `;
    db.prepare(sql).run();
};
createUserTable();

// Insert a new user with hashed password
app.post('/users', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);  // Hash password before storing it

        const sql = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
        const info = db.prepare(sql).run(name, email, hashedPassword);

        res.status(201).json({ id: info.lastInsertRowid });
    } catch (error) {
        console.error('Error hashing password:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log(email);
    

    // Find the user by email
    const sql = `SELECT * FROM users WHERE email = ?`;
    const user = db.prepare(sql).get(email);

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    try {
        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            // If password matches, return user info
            res.json({
                status: true,
                userId: user.id,
                username: user.name,
                email
            });
        } else {
            // Incorrect password
            res.status(401).json({ error: 'Incorrect password' });
        }
    } catch (error) {
        console.error('Error comparing passwords:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get all users
app.get('/users', (req, res) => {
    const sql = `SELECT * FROM users`;
    const rows = db.prepare(sql).all();
    res.json(rows);
});

// Get a user by id
app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const sql = `SELECT * FROM users WHERE id = ?`;
    const row = db.prepare(sql).get(id);

    if (row) { res.json(row); } 
    else { res.status(404).json({ error: 'User not found' }); }
});



// Update a user’s password by id (with hashed password)
app.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);  // Hash new password

        const sql = `UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?`;
        const info = db.prepare(sql).run(name, email, hashedPassword, id);

        if (info.changes > 0) {
            res.json({ message: 'User updated successfully' });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error hashing password:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete a user by id
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM users WHERE id = ?`;
    const info = db.prepare(sql).run(id);

    if (info.changes > 0) {
        res.json({ message: 'User deleted successfully' });
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});


////////////////////////////////////////////////////////////

const createTodosTable = () =>
{
    const sql = `
                CREATE TABLE IF NOT EXISTS todos (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    userId INTEGER REFERENCES users(id),
                    title TEXT NOT NULL,
                    completed BOOLEAN NOT NULL                   
                )
                ` ;   
    
    db.prepare(sql).run();
}
createTodosTable();

// Insert a new todo
app.post('/todos',  (req, res) => 
    {        
        const { userId, title, priority, completed } = req.body;    

        const sql = ` INSERT INTO todos (userId, title, priority, completed) VALUES (?, ?, ?, ?) `;
        const info = db.prepare(sql).run(userId, title, priority, completed);

        res.status(201).json({ id: info.lastInsertRowid });

        // const todos = db.prepare(`SELECT * FROM todos WHERE userId = ${userId} `).get(info.lastInsertRowid);
        // res.status(201).json(todos);
    });

// Get Todos for User
app.get('/todos',  (req, res) => 
    {    
        const todos = db.prepare(` SELECT * FROM todos `).all();
        res.json(todos);
    });

// Get Todos for User using userId
app.get('/todos/:userId',  (req, res) =>
    {        
        const { userId } = req.params;
        const todos = db.prepare(` SELECT * FROM todos WHERE userId = ? `).all(userId);
        res.json(todos);
    });
// Get Todos for User using userId & itemId
app.get('/todos/:userId/:id',  (req, res) =>
    {        
        const { userId, id } = req.params;
        const todos = db.prepare(` SELECT * FROM todos 
                                WHERE userId = ? AND id = ? `).all(userId, id);
        res.json(todos);
    });
    

app.delete('/todos/:id', (req, res) =>
    {
        const { id } = req.params;

        const sql = ` DELETE FROM todos WHERE id = ? `;
        const info = db.prepare(sql).run(id);

        if (info.changes > 0) 
        {    
            res.json({ message: 'Todo deleted successfully' });  
        } 
        else { res.status(404).json({ error: 'Todo not found' }); }
    });

// Update a todoItem by id
app.put('/todos/:userId/:id', (req, res) => 
    {
        const { userId ,id } = req.params;
        const { title, priority, completed } = req.body;
        const sql = ` UPDATE todos SET title = ?, priority = ?, completed = ?
                        WHERE userId = ? AND id = ? `;

        const info = db.prepare(sql).run(title, priority, completed, userId, id);

        if (info.changes > 0) 
        {   res.json({ message: 'Todo updated successfully' }); }
        else { res.status(404).json({ error: 'Todo not found' }); }
    });

app.listen(port, () => { console.log(`Server running at http://localhost:${port}`); })