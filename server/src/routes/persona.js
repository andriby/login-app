const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt'); 
const pool = require('../db');

router.post('/register', async (req, res) => {
    const { 
        ci_persona, 
        nombre_persona, 
        apellido_persona, 
        fecha_nacimiento, 
        email, 
        password_usuario, 
        img_seguridad 
    } = req.body;

    try {
        const personCheck = await pool.query('SELECT * FROM persona WHERE ci_persona = $1', [ci_persona]);
        if (personCheck.rows.length > 0) {
            return res.status(400).json({ message: 'El CI de la persona ya está registrado.' });
        }

        await pool.query(
            'INSERT INTO persona (ci_persona, nombre_persona, apellido_persona, fecha_nacimiento) VALUES ($1, $2, $3, $4)',
            [ci_persona, nombre_persona, apellido_persona, fecha_nacimiento]
        );

        const hashedPassword = await bcrypt.hash(password_usuario, 10); 

        const result = await pool.query(
            'INSERT INTO usuario (ci_usuario, email, password_usuario, img_seguridad) VALUES ($1, $2, $3, $4) RETURNING *',
            [ci_persona, email, hashedPassword, img_seguridad]
        );

        res.status(201).json({ user: result.rows[0] });
    } catch (error) {
        if (error.code === '23505') {
            return res.status(400).json({ message: 'El CI de la persona ya está registrado.' });
        }
        console.error(error);
        res.status(500).send('Error al registrarse');
    }
});

router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM persona');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al consultar personas');
    }
});


module.exports = router;
