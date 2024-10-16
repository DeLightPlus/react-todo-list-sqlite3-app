const express = require('express');
const cors = require('cors');
const db = require('better-sqlite3')('database.db');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Create the table
const createUserTable = () => 
{
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



// Insert a new user
app.post('/users', (req, res) => 
    {
        const { name, email, password } = req.body;
        const sql = `  INSERT INTO users (name, email, password)
                    VALUES (?, ?, ?)  `;

        const info = db.prepare(sql).run(name, email, password);
        res.status(201).json({ id: info.lastInsertRowid });

    });

// Get all users
app.get('/users', (req, res) => 
    {
        const sql = ` SELECT * FROM users `;
        const rows = db.prepare(sql).all();
        res.json(rows);
    });

// Get a user by id
app.get('/users/:id', (req, res) => 
    {
        const { id } = req.params;
        const sql = ` SELECT * FROM users WHERE id = ? `;
        const row = db.prepare(sql).get(id);

        if (row) { res.json(row); } 
        else { res.status(404).json({ error: 'User not found' }); }
    });

// Update a user by id
app.put('/users/:id', (req, res) => 
    {
        const { id } = req.params;
        const { name, email, password } = req.body;
        const sql = ` UPDATE users SET name = ?, email = ?, password = ? WHERE id = ? `;

        const info = db.prepare(sql).run(name, email, password, id);

        if (info.changes > 0) 
        {  
            res.json({ message: 'User updated successfully' }); 
        }
        else { res.status(404).json({ error: 'User not found' }); }
    });

// Delete a user by id
app.delete('/users/:id', (req, res) =>
    {
        const { id } = req.params;
        const sql = ` DELETE FROM users WHERE id = ? `;
        const info = db.prepare(sql).run(id);

        if (info.changes > 0) 
        {    res.json({ message: 'User deleted successfully' });  } 
        else { res.status(404).json({ error: 'User not found' }); }
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