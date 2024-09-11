// routes/auth.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db'); 
const router = express.Router();

const JWT_SECRET = 'za63qj2p'; 

router.post('/', async (req, res) => {
    const { email, password_usuario } = req.body;

    try {
        const result = await pool.query('SELECT * FROM usuario WHERE email = $1', [email]);
        
        if (result.rows.length === 0) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        const user = result.rows[0];

        const validPassword_usuario = await bcrypt.compare(password_usuario, user.password_usuario);
        if (!validPassword_usuario) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        const token = jwt.sign({ id: user.id, ci_usuario: user.ci_usuario, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
        
        res.json({ token }); 
    } catch (error) {
        console.error(error);
        console.log('Plaintext Password:' + password_usuario);
        res.status(500).send('Error al iniciar sesión');
    }
});

router.post('/register', async (req, res) => {
    const { ci_usuario, email, password_usuario, img_seguridad } = req.body;

    try {
        const hashedPassword_usuario = await bcrypt.hash(password_usuario, 10);
        const result = await pool.query(
            'INSERT INTO usuarios (ci_usuario, email, password_usuario, img_seguridad) VALUES ($1, $2, $3, $4) RETURNING *',
            [ci_usuario, email, hashedPassword_usuario, img_seguridad]
        );
        
        res.status(201).json({ user: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al registrarse');
    }
});

module.exports = router; 
